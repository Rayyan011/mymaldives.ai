"use client";

import { useEffect, useRef, useState } from "react";
import type { UIMessage } from "ai";
import { Markdown } from "./markdown";
import { MessageActions } from "./message-actions";

interface Props {
  chatId?: string;
  messages: UIMessage[];
  status: string;
  isAuthenticated?: boolean;
}

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0L9.79 6.21L16 8L9.79 9.79L8 16L6.21 9.79L0 8L6.21 6.21L8 0Z" />
    </svg>
  );
}

function ArrowDownIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <polyline points="19 12 12 19 5 12" />
    </svg>
  );
}

function ThinkingMessage() {
  return (
    <div className="flex items-start gap-3">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-full ring-1 ring-border">
        <SparkleIcon className="size-4 animate-pulse" />
      </div>
      <div className="flex items-center gap-1 pt-1.5 text-sm text-muted-foreground">
        <span>Thinking</span>
        <span className="flex gap-0.5">
          <span className="size-1 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="size-1 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="size-1 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
        </span>
      </div>
    </div>
  );
}

function Greeting() {
  return (
    <div className="mx-auto mt-4 flex size-full max-w-3xl flex-col justify-center px-4 md:mt-16 md:px-8 animate-fade-in">
      <div className="text-xl font-semibold md:text-2xl">Hello there!</div>
      <div className="text-xl text-muted-foreground md:text-2xl">
        How can I help you plan your Maldives trip?
      </div>
    </div>
  );
}

export default function ChatMessages({
  chatId,
  messages,
  status,
  isAuthenticated,
}: Props) {
  const endRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const [votes, setVotes] = useState<Record<string, { isUpvoted: number }>>({});

  // Fetch votes
  useEffect(() => {
    if (!chatId || !isAuthenticated) return;
    fetch(`/api/vote?chatId=${chatId}`)
      .then((r) => r.json())
      .then((data) => {
        const map: Record<string, { isUpvoted: number }> = {};
        for (const v of data.votes ?? []) {
          map[v.messageId] = { isUpvoted: v.isUpvoted };
        }
        setVotes(map);
      })
      .catch(() => {});
  }, [chatId, isAuthenticated, messages.length]);

  // Auto-scroll
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  // Track scroll position for "scroll to bottom" button
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handler = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      setShowScrollBtn(scrollHeight - scrollTop - clientHeight > 100);
    };
    container.addEventListener("scroll", handler);
    return () => container.removeEventListener("scroll", handler);
  }, []);

  const handleVote = async (messageId: string, isUpvoted: boolean) => {
    if (!chatId) return;
    setVotes((prev) => ({
      ...prev,
      [messageId]: { isUpvoted: isUpvoted ? 1 : 0 },
    }));
    await fetch("/api/vote", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chatId, messageId, isUpvoted }),
    });
  };

  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getTextContent = (msg: UIMessage) =>
    msg.parts
      .filter((p): p is Extract<typeof p, { type: "text" }> => p.type === "text")
      .map((p) => p.text)
      .join("");

  return (
    <div className="relative flex-1 bg-background">
      <div
        ref={containerRef}
        className="absolute inset-0 overflow-y-auto bg-background"
      >
        <div className="mx-auto flex min-w-0 max-w-3xl flex-col gap-4 px-2 py-4 md:gap-6 md:px-4">
          {messages.length === 0 && <Greeting />}

          {messages.map((msg) => {
            const textContent = getTextContent(msg);
            return (
              <div key={msg.id} className="group flex items-start gap-3">
                {msg.role === "user" ? (
                  <div className="flex w-full justify-end">
                    <div className="flex flex-col items-end gap-1">
                      <div className="max-w-[calc(100%-2.5rem)] rounded-2xl bg-[#006cff] px-3 py-2 text-sm text-white sm:max-w-[80%]">
                        <span className="whitespace-pre-wrap">
                          {textContent}
                        </span>
                      </div>
                      <MessageActions
                        role="user"
                        content={textContent}
                        messageId={msg.id}
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-full ring-1 ring-border">
                      <SparkleIcon className="size-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm leading-relaxed text-foreground">
                        <Markdown content={textContent} />
                      </div>
                      <div className="mt-1">
                        <MessageActions
                          role="assistant"
                          content={textContent}
                          messageId={msg.id}
                          vote={votes[msg.id]}
                          onVote={
                            isAuthenticated ? handleVote : undefined
                          }
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}

          {status === "submitted" &&
            messages[messages.length - 1]?.role !== "assistant" && (
              <ThinkingMessage />
            )}

          <div ref={endRef} />
        </div>
      </div>

      {/* Scroll to bottom */}
      {showScrollBtn && (
        <button
          onClick={scrollToBottom}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 flex size-8 items-center justify-center rounded-full border border-border bg-background shadow-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowDownIcon />
        </button>
      )}
    </div>
  );
}
