import type { VercelRequest, VercelResponse } from '@vercel/node';

interface RecaptchaVerifyResponse {
  success: boolean;
  score: number;
  action: string;
}

interface FormSubmission {
  formType: 'contact' | 'application' | 'newsletter';
  recaptchaToken?: string;
  data: Record<string, any>;
}

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const SCORE_THRESHOLD = 0.5;

// Email configuration
const EMAIL_ENDPOINTS = {
  contact: 'sales@vislybluq.com',
  application: 'hr@vislybluq.com',
  newsletter: 'info@vislybluq.com',
};

// Rate limiting
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 10; // Max 10 submissions per hour per IP

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

async function verifyRecaptcha(
  token: string,
  expectedAction: string
): Promise<{ success: boolean; score?: number; error?: string }> {
  if (!RECAPTCHA_SECRET_KEY) {
    console.warn('reCAPTCHA secret key not configured, bypassing verification');
    return { success: true, score: 1.0 };
  }

  try {
    const verifyResponse = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${RECAPTCHA_SECRET_KEY}&response=${token}`,
      }
    );

    const verifyData = (await verifyResponse.json()) as RecaptchaVerifyResponse;

    if (!verifyData.success) {
      return { success: false, error: 'reCAPTCHA verification failed' };
    }

    if (verifyData.action !== expectedAction) {
      return { success: false, error: 'Action mismatch' };
    }

    if (verifyData.score < SCORE_THRESHOLD) {
      return {
        success: false,
        score: verifyData.score,
        error: `Low score: ${verifyData.score}`,
      };
    }

    return { success: true, score: verifyData.score };
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return { success: false, error: 'Verification error' };
  }
}

async function submitToFormSubmit(
  email: string,
  data: Record<string, any>
): Promise<boolean> {
  try {
    const response = await fetch(`https://formsubmit.co/ajax/${email}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    });

    return response.ok;
  } catch (error) {
    console.error('FormSubmit error:', error);
    return false;
  }
}

function getAutoResponse(formType: string, data: Record<string, any>): string {
  const whatsapp = '+234 701 505 5319';

  switch (formType) {
    case 'contact':
      return `Thank you for contacting VislyBluq! We've received your inquiry about ${
        data.service || 'our services'
      }. Our sales team will review your message and respond within 24 hours. For urgent matters, feel free to WhatsApp us at ${whatsapp}.`;

    case 'application':
      return `Thank you for applying to VislyBluq! We've received your application for ${
        data.job_title || 'the position'
      }. Our HR team will review your application and respond within 3-5 business days. ${
        data.resume_url ? `Your resume: ${data.resume_url}` : ''
      } If you have any questions, feel free to WhatsApp us at ${whatsapp}.`;

    case 'newsletter':
      return `Thank you for subscribing to VislyBluq's newsletter! You'll receive weekly insights on technology, AI, and digital transformation. You can unsubscribe at any time.`;

    default:
      return 'Thank you for your submission!';
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Rate limiting
  const ip = getClientIp(req);
  if (!checkRateLimit(ip)) {
    return res.status(429).json({
      error: 'Too many submissions. Please try again later.',
    });
  }

  const submission = req.body as FormSubmission;

  if (!submission.formType || !submission.data) {
    return res.status(400).json({ error: 'Invalid submission data' });
  }

  // Verify reCAPTCHA if token provided
  if (submission.recaptchaToken) {
    const actionMap: Record<string, string> = {
      contact: 'contact_form',
      application: 'job_application',
      newsletter: 'newsletter_subscription',
    };

    const expectedAction = actionMap[submission.formType];
    const verification = await verifyRecaptcha(
      submission.recaptchaToken,
      expectedAction
    );

    if (!verification.success) {
      console.warn(
        `reCAPTCHA failed for ${submission.formType}:`,
        verification.error,
        `Score: ${verification.score}`
      );
      return res.status(403).json({
        error: 'Suspicious activity detected. Please try again or contact us directly.',
        details: verification.error,
      });
    }

    console.log(
      `reCAPTCHA passed for ${submission.formType} with score ${verification.score}`
    );
  }

  // Get recipient email
  const recipientEmail = EMAIL_ENDPOINTS[submission.formType];
  if (!recipientEmail) {
    return res.status(400).json({ error: 'Invalid form type' });
  }

  // Prepare data for FormSubmit
  const formSubmitData = {
    ...submission.data,
    _subject:
      submission.data._subject ||
      `New ${submission.formType} submission from ${
        submission.data.name || submission.data.email
      }`,
    _template: 'table',
    _autoresponse: getAutoResponse(submission.formType, submission.data),
    submission_time: new Date().toISOString(),
    ip_address: ip,
  };

  // Submit to FormSubmit
  const success = await submitToFormSubmit(recipientEmail, formSubmitData);

  if (!success) {
    return res.status(500).json({
      error: 'Failed to submit form. Please try again or contact us directly.',
    });
  }

  return res.status(200).json({
    success: true,
    message: 'Form submitted successfully',
  });
}
