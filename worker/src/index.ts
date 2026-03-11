import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { clerkMiddleware } from '@hono/clerk-auth';
import type { Env } from './types';
import { chatRoute } from './routes/chat';
import { bookingRoute } from './routes/booking';

const app = new Hono<{ Bindings: Env }>();

app.use('*', cors({
  origin: ['http://localhost:5173', 'https://mymaldives-ai.pages.dev'],
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

app.use('/api/*', clerkMiddleware());

app.route('/api/chat', chatRoute);
app.route('/api/booking', bookingRoute);

app.get('/health', (c) => c.json({ status: 'ok' }));

export default app;
