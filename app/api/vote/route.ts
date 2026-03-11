import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getVotesByChatId, voteMessage, getChatById } from "@/lib/db/queries";

export async function GET(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ votes: [] });
  }

  const url = new URL(req.url);
  const chatId = url.searchParams.get("chatId");
  if (!chatId) {
    return NextResponse.json({ error: "chatId required" }, { status: 400 });
  }

  const chat = await getChatById(chatId);
  if (!chat || chat.userId !== userId) {
    return NextResponse.json({ votes: [] });
  }

  const result = await getVotesByChatId(chatId);
  return NextResponse.json({ votes: result });
}

export async function PATCH(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { chatId, messageId, isUpvoted } = await req.json();
  if (!chatId || !messageId || typeof isUpvoted !== "boolean") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  await voteMessage({ chatId, messageId, isUpvoted });
  return NextResponse.json({ success: true });
}
