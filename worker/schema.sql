CREATE TABLE IF NOT EXISTS resorts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  atoll TEXT NOT NULL,
  island TEXT,
  star_rating INTEGER CHECK(star_rating BETWEEN 1 AND 5),
  price_range TEXT CHECK(price_range IN ('budget', 'mid', 'luxury', 'ultra-luxury')),
  description TEXT,
  highlights TEXT,
  transfer_type TEXT,
  transfer_time_minutes INTEGER,
  has_all_inclusive INTEGER DEFAULT 0,
  has_spa INTEGER DEFAULT 0,
  has_diving INTEGER DEFAULT 0,
  has_surfing INTEGER DEFAULT 0,
  has_kids_club INTEGER DEFAULT 0,
  has_overwater_villa INTEGER DEFAULT 0,
  honeymoon_friendly INTEGER DEFAULT 0,
  family_friendly INTEGER DEFAULT 0,
  website_url TEXT,
  image_url TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS user_profiles (
  clerk_user_id TEXT PRIMARY KEY,
  display_name TEXT,
  email TEXT,
  locale TEXT,
  country TEXT,
  birthday TEXT,
  interests TEXT,
  travel_style TEXT,
  social_data_raw TEXT,
  last_social_sync TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS chat_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  clerk_user_id TEXT,
  session_id TEXT NOT NULL,
  role TEXT NOT NULL CHECK(role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_chat_session ON chat_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_user ON chat_messages(clerk_user_id);
