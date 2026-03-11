import { getAuth } from '@hono/clerk-auth';
import { HTTPException } from 'hono/http-exception';
import type { Context } from 'hono';

export function getOptionalUserId(c: Context): string | null {
  const auth = getAuth(c);
  return auth?.userId ?? null;
}

export function requireUserId(c: Context): string {
  const userId = getOptionalUserId(c);
  if (!userId) {
    throw new HTTPException(401, { message: 'Authentication required' });
  }
  return userId;
}
