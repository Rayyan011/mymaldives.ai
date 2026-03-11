import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getChatById, getMessagesByChatId } from "@/lib/db/queries";
import { Chat } from "@/components/chat";
import type { UIMessage } from "ai";

export default async function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const chat = await getChatById(id);

  if (!chat) {
    notFound();
  }

  // Private chats: only the owner can view
  const { userId } = await auth();
  if (chat.visibility === "private" && chat.userId !== userId) {
    notFound();
  }

  const dbMessages = await getMessagesByChatId(id);

  const initialMessages: UIMessage[] = dbMessages.map((m) => ({
    id: m.id,
    role: m.role as "user" | "assistant",
    content: m.content,
    parts: [{ type: "text" as const, text: m.content }],
  }));

  return <Chat id={id} initialMessages={initialMessages} />;
}
