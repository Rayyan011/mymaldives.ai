import { sqliteTable, text, integer, primaryKey } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const resorts = sqliteTable("resorts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  atoll: text("atoll").notNull(),
  island: text("island"),
  starRating: integer("star_rating"),
  priceRange: text("price_range"),
  description: text("description"),
  highlights: text("highlights"),
  transferType: text("transfer_type"),
  transferTimeMinutes: integer("transfer_time_minutes"),
  hasAllInclusive: integer("has_all_inclusive").default(0),
  hasSpa: integer("has_spa").default(0),
  hasDiving: integer("has_diving").default(0),
  hasSurfing: integer("has_surfing").default(0),
  hasKidsClub: integer("has_kids_club").default(0),
  hasOverwaterVilla: integer("has_overwater_villa").default(0),
  honeymoonFriendly: integer("honeymoon_friendly").default(0),
  familyFriendly: integer("family_friendly").default(0),
  websiteUrl: text("website_url"),
  imageUrl: text("image_url"),
  createdAt: text("created_at").default(sql`(datetime('now'))`),
});

export const userProfiles = sqliteTable("user_profiles", {
  clerkUserId: text("clerk_user_id").primaryKey(),
  displayName: text("display_name"),
  email: text("email"),
  locale: text("locale"),
  country: text("country"),
  birthday: text("birthday"),
  interests: text("interests"),
  travelStyle: text("travel_style"),
  composioResearch: text("composio_research"),
  socialDataRaw: text("social_data_raw"),
  lastSocialSync: text("last_social_sync"),
  createdAt: text("created_at").default(sql`(datetime('now'))`),
  updatedAt: text("updated_at").default(sql`(datetime('now'))`),
});

export const chats = sqliteTable("chats", {
  id: text("id").primaryKey(),
  userId: text("user_id"),
  title: text("title").notNull().default("New Chat"),
  visibility: text("visibility").notNull().default("private"),
  createdAt: text("created_at").default(sql`(datetime('now'))`),
  updatedAt: text("updated_at").default(sql`(datetime('now'))`),
});

export const messages = sqliteTable("messages", {
  id: text("id").primaryKey(),
  chatId: text("chat_id").notNull(),
  role: text("role").notNull(),
  content: text("content").notNull(),
  createdAt: text("created_at").default(sql`(datetime('now'))`),
});

export const votes = sqliteTable(
  "votes",
  {
    chatId: text("chat_id").notNull(),
    messageId: text("message_id").notNull(),
    isUpvoted: integer("is_upvoted").notNull(),
  },
  (table) => [primaryKey({ columns: [table.chatId, table.messageId] })]
);
