"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { groupChatsByDate } from "@/lib/utils";

interface Chat {
  id: string;
  title: string;
  createdAt: string | null;
}

function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

export function SidebarHistory() {
  const { isSignedIn } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [chats, setChats] = useState<Chat[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = useCallback(async () => {
    if (!isSignedIn) {
      setChats([]);
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("/api/history?limit=50");
      const data = await res.json();
      setChats(data.chats ?? []);
    } catch {
      setChats([]);
    } finally {
      setLoading(false);
    }
  }, [isSignedIn]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  // Listen for refresh events (after new chat created)
  useEffect(() => {
    const handler = () => fetchHistory();
    window.addEventListener("refresh-history", handler);
    return () => window.removeEventListener("refresh-history", handler);
  }, [fetchHistory]);

  const deleteChat = async (id: string) => {
    await fetch(`/api/chat/${id}`, { method: "DELETE" });
    setChats((prev) => prev.filter((c) => c.id !== id));
    if (pathname === `/chat/${id}`) {
      router.push("/chat");
    }
  };

  if (!isSignedIn) {
    return (
      <div className="px-2 py-8 text-center text-xs text-muted-foreground">
        Sign in to save your chats
      </div>
    );
  }

  if (loading) {
    return (
      <div className="space-y-2 px-1 py-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-8 rounded-lg bg-muted animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (chats.length === 0) {
    return (
      <div className="px-2 py-8 text-center text-xs text-muted-foreground">
        No chats yet. Start a conversation!
      </div>
    );
  }

  const groups = groupChatsByDate(chats);

  return (
    <div className="space-y-4 py-2">
      {groups.map((group) => (
        <div key={group.label}>
          <div className="px-2 py-1 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
            {group.label}
          </div>
          <div className="space-y-0.5">
            {group.chats.map((chat) => {
              const isActive = pathname === `/chat/${chat.id}`;
              return (
                <div
                  key={chat.id}
                  className={`group flex items-center gap-1 rounded-lg text-sm transition-colors ${
                    isActive
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  }`}
                >
                  <Link
                    href={`/chat/${chat.id}`}
                    className="flex-1 truncate px-2 py-1.5"
                  >
                    {chat.title}
                  </Link>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      deleteChat(chat.id);
                    }}
                    className="shrink-0 p-1.5 rounded text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Delete chat"
                  >
                    <TrashIcon />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
