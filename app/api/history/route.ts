import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getChatsByUserId } from "@/lib/db/queries";

export async function GET(req: Request) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ chats: [], hasMore: false });
  }

  const url = new URL(req.url);
  const limit = parseInt(url.searchParams.get("limit") ?? "20");
  const startingAfter = url.searchParams.get("starting_after") ?? undefined;

  const result = await getChatsByUserId({ userId, limit, startingAfter });
  return NextResponse.json(result);
}
