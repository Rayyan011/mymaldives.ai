"use client";

import { useMemo } from "react";
import { Chat } from "@/components/chat";

export default function NewChatPage() {
  const id = useMemo(() => crypto.randomUUID(), []);
  return <Chat id={id} />;
}
