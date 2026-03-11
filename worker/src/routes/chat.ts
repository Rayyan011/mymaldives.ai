import { Hono } from 'hono';
import type { Env } from '../types';
import { getOptionalUserId } from '../auth/clerk';
import { syncSocialProfile } from '../auth/social';
import { buildSystemPrompt } from '../ai/prompt';
import { runInference } from '../ai/inference';
import { getAllResortsSummary } from '../db/resorts';

const chatRoute = new Hono<{ Bindings: Env }>();

chatRoute.post('/', async (c) => {
  const { message, sessionId } = await c.req.json<{
    message: string;
    sessionId: string;
  }>();

  if (!message || !sessionId) {
    return c.json({ error: 'message and sessionId are required' }, 400);
  }

  const userId = getOptionalUserId(c);
  const db = c.env.DB;

  // Sync social profile if authenticated
  let userProfile = null;
  if (userId) {
    try {
      userProfile = await syncSocialProfile(c, userId, db);
    } catch {
      // Social sync failure shouldn't break chat
    }
  }

  // Load resort context
  const resortContext = await getAllResortsSummary(db);

  // Load chat history for this session
  const { results: history } = await db.prepare(
    'SELECT role, content FROM chat_messages WHERE session_id = ? ORDER BY created_at ASC LIMIT 20'
  ).bind(sessionId).all<{ role: string; content: string }>();

  // Build prompt and run inference
  const systemPrompt = buildSystemPrompt(userProfile, resortContext);
  const reply = await runInference(c.env.AI, systemPrompt, history, message);

  // Save both messages
  await db.batch([
    db.prepare(
      'INSERT INTO chat_messages (clerk_user_id, session_id, role, content) VALUES (?, ?, ?, ?)'
    ).bind(userId, sessionId, 'user', message),
    db.prepare(
      'INSERT INTO chat_messages (clerk_user_id, session_id, role, content) VALUES (?, ?, ?, ?)'
    ).bind(userId, sessionId, 'assistant', reply),
  ]);

  return c.json({ reply, sessionId });
});

export { chatRoute };
