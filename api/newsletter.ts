import { createHash } from 'node:crypto';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SCORE_THRESHOLD = 0.5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

// Same-instance limit only; see the note on rateLimitMap in api/chat.ts.
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function getClientIp(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') return forwarded.split(',')[0].trim();
  return req.socket?.remoteAddress || 'unknown';
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count += 1;
  return true;
}

// Every signup makes Mailchimp email the address given, so a missing token is rejected whenever
// reCAPTCHA is configured. Otherwise this endpoint could be used to send mail to strangers.
async function passesRecaptcha(token: unknown): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    console.warn('reCAPTCHA secret key not configured, skipping newsletter verification');
    return true;
  }
  if (typeof token !== 'string' || !token) return false;

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: token }).toString(),
    });
    const result = (await response.json()) as { success: boolean; score?: number; action?: string };
    return result.success && result.action === 'newsletter_subscription' && (result.score ?? 0) >= SCORE_THRESHOLD;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return false;
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.MAILCHIMP_API_KEY;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID;
  // Mailchimp keys end in the account's data center, e.g. "abc123-us21".
  const dataCenter = apiKey?.split('-')[1];
  if (!apiKey || !audienceId || !dataCenter) {
    console.error('Newsletter is not configured: set MAILCHIMP_API_KEY and MAILCHIMP_AUDIENCE_ID.');
    return res.status(503).json({ error: 'Newsletter signup is temporarily unavailable. Please try again later.' });
  }

  if (!checkRateLimit(getClientIp(req))) {
    return res.status(429).json({ error: 'Too many attempts. Please try again later.' });
  }

  const { email, consent, recaptchaToken, website } = (req.body ?? {}) as Record<string, unknown>;

  // Honeypot: bots fill the hidden field. Report success so they learn nothing, and add nobody.
  if (website) return res.status(200).json({ success: true });

  const normalizedEmail = typeof email === 'string' ? email.trim().toLowerCase() : '';
  if (!EMAIL_PATTERN.test(normalizedEmail) || normalizedEmail.length > 254) {
    return res.status(400).json({ error: 'Please enter a valid email address.' });
  }
  // Consent is checked here as well as in the form: nobody joins the list without opting in.
  if (consent !== true) {
    return res.status(400).json({ error: 'Please tick the box to confirm you want the newsletter.' });
  }
  if (!(await passesRecaptcha(recaptchaToken))) {
    return res.status(403).json({ error: 'We could not verify this request. Please try again.' });
  }

  const memberUrl = `https://${dataCenter}.api.mailchimp.com/3.0/lists/${audienceId}/members/${createHash('md5').update(normalizedEmail).digest('hex')}`;
  const headers = {
    Authorization: `Basic ${Buffer.from(`vislybluq:${apiKey}`).toString('base64')}`,
    'Content-Type': 'application/json',
  };

  try {
    // "pending" makes Mailchimp send its confirmation email; the contact only joins after clicking it.
    // status_if_new leaves anyone already on the list unchanged.
    const upsert = await fetch(memberUrl, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ email_address: normalizedEmail, status_if_new: 'pending', ip_signup: getClientIp(req) }),
    });

    if (!upsert.ok) {
      const detail = (await upsert.json().catch(() => ({}))) as { title?: string };
      console.error('Mailchimp rejected newsletter signup:', upsert.status, detail.title);
      return res.status(upsert.status === 400 ? 400 : 502).json({
        error: upsert.status === 400
          ? 'We could not subscribe this address. Please check it, or email us at info@vislybluq.com.'
          : 'Something went wrong. Please try again later.',
      });
    }

    // Someone who unsubscribed earlier has just opted in again, so send a new confirmation email.
    const member = (await upsert.json()) as { status?: string };
    if (member.status === 'unsubscribed') {
      const resubscribe = await fetch(memberUrl, { method: 'PATCH', headers, body: JSON.stringify({ status: 'pending' }) });
      if (!resubscribe.ok) console.error('Mailchimp rejected resubscribe:', resubscribe.status);
    }

    // The same reply for new and existing addresses, so this can't reveal who is on the list.
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Mailchimp request failed:', error);
    return res.status(502).json({ error: 'Something went wrong. Please try again later.' });
  }
}
