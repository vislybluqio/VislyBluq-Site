import type { VercelRequest, VercelResponse } from '@vercel/node';

interface RecaptchaVerifyResponse {
  success: boolean;
  score: number;
  action: string;
  challenge_ts: string;
  hostname: string;
  'error-codes'?: string[];
}

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;
const SCORE_THRESHOLD = 0.5; // Google's recommended default

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

  if (!RECAPTCHA_SECRET_KEY) {
    console.warn('reCAPTCHA secret key not configured');
    // Allow request to proceed if not configured
    return res.status(200).json({
      success: true,
      score: 1.0,
      message: 'reCAPTCHA not configured, bypassing verification',
    });
  }

  const { token, expectedAction } = req.body as {
    token?: string;
    expectedAction?: string;
  };

  if (!token) {
    return res.status(400).json({ error: 'reCAPTCHA token is required' });
  }

  try {
    // Verify token with Google
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

    if (!verifyResponse.ok) {
      throw new Error('Failed to verify reCAPTCHA');
    }

    const verifyData = (await verifyResponse.json()) as RecaptchaVerifyResponse;

    // Check if verification was successful
    if (!verifyData.success) {
      return res.status(400).json({
        success: false,
        error: 'reCAPTCHA verification failed',
        errorCodes: verifyData['error-codes'],
      });
    }

    // Verify action name matches (important security check)
    if (expectedAction && verifyData.action !== expectedAction) {
      return res.status(400).json({
        success: false,
        error: 'Action mismatch',
        expected: expectedAction,
        received: verifyData.action,
      });
    }

    // Check score threshold
    if (verifyData.score < SCORE_THRESHOLD) {
      console.warn(
        `Low reCAPTCHA score: ${verifyData.score} for action ${verifyData.action}`
      );
      return res.status(403).json({
        success: false,
        error: 'Suspicious activity detected',
        score: verifyData.score,
        message: 'Your submission appears suspicious. Please try again or contact us directly.',
      });
    }

    // Success!
    return res.status(200).json({
      success: true,
      score: verifyData.score,
      action: verifyData.action,
      message: 'Verification successful',
    });
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error during verification',
    });
  }
}
