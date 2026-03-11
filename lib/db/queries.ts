import { db } from "./index";
import { chats, messages, votes, resorts, userProfiles } from "./schema";
import { eq, desc, and, lt } from "drizzle-orm";

// ── Chats ──

export async function saveChat({
  id,
  userId,
  title,
}: {
  id: string;
  userId: string | null;
  title: string;
}) {
  await db.insert(chats).values({ id, userId, title });
}

export async function getChatById(id: string) {
  const result = await db.select().from(chats).where(eq(chats.id, id)).limit(1);
  return result[0] ?? null;
}

export async function getChatsByUserId({
  userId,
  limit = 20,
  startingAfter,
}: {
  userId: string;
  limit?: number;
  startingAfter?: string;
}) {
  if (startingAfter) {
    const cursor = await getChatById(startingAfter);
    if (cursor?.createdAt) {
      const result = await db
        .select()
        .from(chats)
        .where(and(eq(chats.userId, userId), lt(chats.createdAt, cursor.createdAt)))
        .orderBy(desc(chats.createdAt))
        .limit(limit + 1);
      return {
        chats: result.slice(0, limit),
        hasMore: result.length > limit,
      };
    }
  }

  const result = await db
    .select()
    .from(chats)
    .where(eq(chats.userId, userId))
    .orderBy(desc(chats.createdAt))
    .limit(limit + 1);
  return {
    chats: result.slice(0, limit),
    hasMore: result.length > limit,
  };
}

export async function deleteChatById(id: string) {
  await db.delete(votes).where(eq(votes.chatId, id));
  await db.delete(messages).where(eq(messages.chatId, id));
  await db.delete(chats).where(eq(chats.id, id));
}

export async function updateChatTitle(id: string, title: string) {
  await db
    .update(chats)
    .set({ title, updatedAt: new Date().toISOString() })
    .where(eq(chats.id, id));
}

// ── Messages ──

export async function saveMessages(
  msgs: { id: string; chatId: string; role: string; content: string }[]
) {
  if (msgs.length === 0) return;
  await db.insert(messages).values(msgs);
}

export async function getMessagesByChatId(chatId: string) {
  return db
    .select()
    .from(messages)
    .where(eq(messages.chatId, chatId))
    .orderBy(messages.createdAt);
}

// ── Votes ──

export async function getVotesByChatId(chatId: string) {
  return db.select().from(votes).where(eq(votes.chatId, chatId));
}

export async function voteMessage({
  chatId,
  messageId,
  isUpvoted,
}: {
  chatId: string;
  messageId: string;
  isUpvoted: boolean;
}) {
  await db
    .insert(votes)
    .values({ chatId, messageId, isUpvoted: isUpvoted ? 1 : 0 })
    .onConflictDoUpdate({
      target: [votes.chatId, votes.messageId],
      set: { isUpvoted: isUpvoted ? 1 : 0 },
    });
}

// ── Resorts ──

export async function getAllResorts() {
  return db.select().from(resorts);
}

// ── User profiles ──

export async function getUserProfile(userId: string) {
  const result = await db
    .select()
    .from(userProfiles)
    .where(eq(userProfiles.clerkUserId, userId))
    .limit(1);
  return result[0] ?? null;
}
