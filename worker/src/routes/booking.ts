import { Hono } from 'hono';
import type { Env } from '../types';
import { requireUserId } from '../auth/clerk';
import { sendBookingEmail } from '../email/resend';

const bookingRoute = new Hono<{ Bindings: Env }>();

bookingRoute.post('/', async (c) => {
  const userId = requireUserId(c);

  const body = await c.req.json<{
    guestName: string;
    email: string;
    resortName: string;
    checkIn: string;
    checkOut: string;
    adults: number;
    children: number;
    budget: string;
    specialRequests: string;
  }>();

  if (!body.guestName || !body.email || !body.resortName || !body.checkIn || !body.checkOut) {
    return c.json({ error: 'Missing required fields' }, 400);
  }

  const success = await sendBookingEmail(c.env.RESEND_API_KEY, body);

  if (!success) {
    return c.json({ error: 'Failed to send booking inquiry' }, 500);
  }

  return c.json({ success: true, message: 'Booking inquiry sent! We\'ll be in touch soon.' });
});

export { bookingRoute };
