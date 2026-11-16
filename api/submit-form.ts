import type { VercelRequest, VercelResponse } from '@vercel/node';

type FormType = 'contact' | 'application';

interface FormSubmission {
  formType?: FormType;
  recaptchaToken?: string | null;
  website?: string;
  data?: Record<string, unknown>;
}

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const SCORE_THRESHOLD = 0.5;
const MAX_FIELD_LENGTH = 6000;

const RECIPIENTS: Record<FormType, string> = {
  contact: process.env.FORMSUBMIT_CONTACT_EMAIL || 'sales@vislybluq.com',
  application: process.env.FORMSUBMIT_APPLICATION_EMAIL || 'sales@vislybluq.com',
};

const RECAPTCHA_ACTIONS: Record<FormType, string[]> = {
  contact: ['contact_form', 'chat_escalation'],
  application: ['job_application'],
};

// Only these fields are forwarded. Anything else, including FormSubmit control fields such as
// _cc or _next, is dropped so the endpoint can't be used to send mail to other addresses.
const ALLOWED_FIELDS: Record<FormType, string[]> = {
  contact: ['name', 'email', 'company', 'phone', 'phone_metadata', 'service', 'message', 'source'],
  application: ['job_title', 'name', 'email', 'phone', 'phone_metadata', 'linkedin', 'message', 'resume_url'],
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Same-instance limit only; see the note on rateLimitMap in api/chat.ts.
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 10;

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

/** When reCAPTCHA is configured, a valid token is required. It is skipped only when no secret is set. */
async function verifyRecaptcha(token: unknown, allowedActions: string[]): Promise<{ success: boolean; reason?: string }> {
  if (!RECAPTCHA_SECRET_KEY) {
    console.warn('RECAPTCHA_SECRET_KEY is not set: form submissions are not bot-checked.');
    return { success: true };
  }
  if (typeof token !== 'string' || !token) return { success: false, reason: 'missing token' };

  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret: RECAPTCHA_SECRET_KEY, response: token }).toString(),
    });
    const result = (await response.json()) as { success: boolean; score?: number; action?: string };
    if (!result.success) return { success: false, reason: 'verification failed' };
    if (!result.action || !allowedActions.includes(result.action)) return { success: false, reason: `unexpected action ${result.action}` };
    if ((result.score ?? 0) < SCORE_THRESHOLD) return { success: false, reason: `low score ${result.score}` };
    return { success: true };
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return { success: false, reason: 'verification error' };
  }
}

function pickFields(formType: FormType, data: Record<string, unknown>): Record<string, string> {
  const clean: Record<string, string> = {};
  for (const field of ALLOWED_FIELDS[formType]) {
    const value = data[field];
    if (typeof value === 'string' && value.trim()) clean[field] = value.trim().slice(0, MAX_FIELD_LENGTH);
  }
  return clean;
}

async function submitToFormSubmit(recipient: string, payload: Record<string, string>): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(`https://formsubmit.co/ajax/${recipient}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Referer: 'https://www.vislybluq.com',
        Origin: 'https://www.vislybluq.com',
      },
      body: JSON.stringify(payload),
    });
    const text = await response.text();
    let result: { success?: string | boolean; message?: string } = {};
    try {
      result = JSON.parse(text);
    } catch {
      // FormSubmit sometimes answers with HTML.
    }
    // FormSubmit can answer 200 with success "false" (for example before the inbox is activated).
    if (response.ok && result.success !== 'false' && result.success !== false) return { success: true };
    console.error('FormSubmit rejected submission:', response.status, text.slice(0, 500));
    return { success: false, error: result.message || `FormSubmit returned ${response.status}` };
  } catch (error) {
    console.error('FormSubmit error:', error);
    return { success: false, error: 'Unable to reach the email service' };
  }
}

function autoResponse(formType: FormType, data: Record<string, string>): string {
  const whatsapp = '+234 814 269 5808';
  return formType === 'application'
    ? `Thank you for applying to VislyBluq for ${data.job_title || 'a role'}. We'll review your application and reply within 3 to 5 business days. Questions? WhatsApp us at ${whatsapp}.`
    : `Thank you for contacting VislyBluq. We've received your message and will reply within one working day. For anything urgent, WhatsApp us at ${whatsapp}.`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const ip = getClientIp(req);
  if (!checkRateLimit(ip)) return res.status(429).json({ error: 'Too many submissions. Please try again later.' });

  const submission = (req.body ?? {}) as FormSubmission;
  const formType = submission.formType;
  if (formType !== 'contact' && formType !== 'application') return res.status(400).json({ error: 'Invalid form type' });
  if (!submission.data || typeof submission.data !== 'object') return res.status(400).json({ error: 'Invalid submission data' });

  // Honeypot: real visitors never see this field. Report success so bots learn nothing.
  if (submission.website) return res.status(200).json({ success: true });

  const data = pickFields(formType, submission.data);
  if (!data.name || !data.email || !EMAIL_PATTERN.test(data.email) || !data.message) {
    return res.status(400).json({ error: 'Please fill in your name, a valid email and a message.' });
  }

  const verification = await verifyRecaptcha(submission.recaptchaToken, RECAPTCHA_ACTIONS[formType]);
  if (!verification.success) {
    console.warn(`reCAPTCHA rejected ${formType} submission:`, verification.reason);
    return res.status(403).json({ error: 'We could not verify this request. Please try again, or email us directly.' });
  }

  const subject =
    formType === 'application'
      ? `New application: ${data.job_title || 'General'} from ${data.name}`
      : `New enquiry from ${data.name}${data.source ? ` (${data.source})` : ''}`;

  const result = await submitToFormSubmit(RECIPIENTS[formType], {
    ...data,
    _subject: subject,
    _replyto: data.email,
    _template: 'table',
    _captcha: 'false',
    _autoresponse: autoResponse(formType, data),
    submitted_at: new Date().toISOString(),
  });

  if (!result.success) {
    return res.status(502).json({ error: 'Your message could not be sent. Please try again, or email us directly.' });
  }

  return res.status(200).json({ success: true });
}
