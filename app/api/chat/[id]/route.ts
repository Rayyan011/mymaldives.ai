import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { getChatById, deleteChatById } from "@/lib/db/queries";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const chat = await getChatById(id);
  if (!chat || chat.userId !== userId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await deleteChatById(id);
  return NextResponse.json({ success: true });
}
