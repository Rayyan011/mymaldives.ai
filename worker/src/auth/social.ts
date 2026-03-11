import type { Context } from 'hono';

interface UserProfile {
  clerk_user_id: string;
  display_name: string | null;
  email: string | null;
  locale: string | null;
  country: string | null;
  birthday: string | null;
  interests: string | null;
  travel_style: string | null;
}

export async function syncSocialProfile(
  c: Context,
  userId: string,
  db: D1Database
): Promise<UserProfile | null> {
  // Check cache — skip if synced within 24h
  const existing = await db.prepare(
    `SELECT * FROM user_profiles WHERE clerk_user_id = ? AND last_social_sync > datetime('now', '-1 day')`
  ).bind(userId).first<UserProfile>();

  if (existing) return existing;

  const clerkClient = c.get('clerk');
  const profile: Partial<UserProfile> = { clerk_user_id: userId };

  // Google
  try {
    const tokenRes = await clerkClient.users.getUserOauthAccessToken(userId, 'oauth_google');
    const token = tokenRes.data?.[0]?.token;
    if (token) {
      const res = await fetch(
        'https://people.googleapis.com/v1/people/me?personFields=names,birthdays,locales',
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.ok) {
        const data = await res.json() as any;
        profile.display_name = data.names?.[0]?.displayName ?? null;
        profile.locale = data.locales?.[0]?.value ?? null;
        if (data.birthdays?.[0]?.date) {
          const bd = data.birthdays[0].date;
          profile.birthday = `${bd.year || '0000'}-${String(bd.month).padStart(2, '0')}-${String(bd.day).padStart(2, '0')}`;
        }
      }
    }
  } catch { /* user didn't sign in with Google */ }

  // Facebook
  try {
    const tokenRes = await clerkClient.users.getUserOauthAccessToken(userId, 'oauth_facebook');
    const token = tokenRes.data?.[0]?.token;
    if (token) {
      const res = await fetch(
        `https://graph.facebook.com/me?fields=name,hometown,location,birthday&access_token=${token}`
      );
      if (res.ok) {
        const data = await res.json() as any;
        if (!profile.display_name) profile.display_name = data.name ?? null;
        profile.country = data.hometown?.name || data.location?.name || null;
      }
    }
  } catch { /* user didn't sign in with Facebook */ }

  // Derive travel style from signals
  profile.travel_style = deriveTravelStyle(profile);

  // Upsert to D1
  await db.prepare(`
    INSERT INTO user_profiles (clerk_user_id, display_name, email, locale, country, birthday, interests, travel_style, last_social_sync)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, datetime('now'))
    ON CONFLICT(clerk_user_id) DO UPDATE SET
      display_name = COALESCE(excluded.display_name, user_profiles.display_name),
      locale = COALESCE(excluded.locale, user_profiles.locale),
      country = COALESCE(excluded.country, user_profiles.country),
      birthday = COALESCE(excluded.birthday, user_profiles.birthday),
      interests = COALESCE(excluded.interests, user_profiles.interests),
      travel_style = COALESCE(excluded.travel_style, user_profiles.travel_style),
      last_social_sync = datetime('now'),
      updated_at = datetime('now')
  `).bind(
    userId,
    profile.display_name ?? null,
    profile.email ?? null,
    profile.locale ?? null,
    profile.country ?? null,
    profile.birthday ?? null,
    profile.interests ?? null,
    profile.travel_style ?? null
  ).run();

  return await db.prepare('SELECT * FROM user_profiles WHERE clerk_user_id = ?')
    .bind(userId).first<UserProfile>();
}

function deriveTravelStyle(profile: Partial<UserProfile>): string {
  // Simple heuristic — can be expanded later
  if (profile.birthday) {
    const year = parseInt(profile.birthday.split('-')[0]);
    if (year > 0) {
      const age = new Date().getFullYear() - year;
      if (age < 35) return 'adventure';
      if (age >= 35 && age < 50) return 'relaxation';
    }
  }
  return 'relaxation';
}
