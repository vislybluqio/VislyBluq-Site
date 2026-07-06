import type { VercelRequest, VercelResponse } from '@vercel/node';

type FeedbackRating = 'up' | 'down';

interface FeedbackPayload {
  rating?: FeedbackRating;
  language?: string;
  userMessage?: string;
  assistantMessage?: string;
  route?: string;
  sessionId?: string;
}

const MAX_TEXT_LEN = 4000;
const feedbackLog: Array<FeedbackPayload & { reward: number; createdAt: string; ip: string }> = [];

function getClientIp(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string') return forwarded.split(',')[0].trim();
  return req.socket?.remoteAddress || 'unknown';
}

function cleanText(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined;
  return value.slice(0, MAX_TEXT_LEN).trim();
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const body = req.body as FeedbackPayload;
  if (body.rating !== 'up' && body.rating !== 'down') {
    return res.status(400).json({ error: 'Invalid feedback rating' });
  }

  const entry = {
    rating: body.rating,
    reward: body.rating === 'up' ? 1 : -1,
    language: cleanText(body.language) || 'unknown',
    userMessage: cleanText(body.userMessage) || '',
    assistantMessage: cleanText(body.assistantMessage) || '',
    route: cleanText(body.route) || '/',
    sessionId: cleanText(body.sessionId) || 'anonymous',
    createdAt: new Date().toISOString(),
    ip: getClientIp(req),
  };

  feedbackLog.push(entry);
  if (feedbackLog.length > 500) feedbackLog.shift();

  console.info('VislyBluq AI feedback signal', {
    rating: entry.rating,
    reward: entry.reward,
    language: entry.language,
    route: entry.route,
    sessionId: entry.sessionId,
    createdAt: entry.createdAt,
    userPreview: entry.userMessage.slice(0, 160),
    assistantPreview: entry.assistantMessage.slice(0, 160),
  });

  return res.status(200).json({
    success: true,
    reward: entry.reward,
    message:
      entry.rating === 'up'
        ? 'Positive feedback logged for review.'
        : 'Negative feedback logged for review and improvement.',
  });
}
