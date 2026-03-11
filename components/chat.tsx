"use client";

import { useState, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import { useRouter } from "next/navigation";
import { useAuth, SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import type { UIMessage } from "ai";
import ChatMessages from "./chat-messages";
import MultimodalInput from "./multimodal-input";
import BookingForm from "./booking-form";
import { SidebarToggle } from "./sidebar-toggle";

interface Props {
  id: string;
  initialMessages?: UIMessage[];
}

export function Chat({ id, initialMessages = [] }: Props) {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const hasNavigated = useRef(false);
  const [showBooking, setShowBooking] = useState(false);

  const {
    messages,
    input,
    setInput,
    handleSubmit,
    status,
    append,
    stop,
  } = useChat({
    id,
    api: "/api/chat",
    body: { id },
    initialMessages,
    onFinish: () => {
      // Navigate to chat URL and refresh sidebar after first response
      if (!hasNavigated.current && initialMessages.length === 0) {
        hasNavigated.current = true;
        window.history.replaceState(null, "", `/chat/${id}`);
        window.dispatchEvent(new Event("refresh-history"));
      }
    },
  });

  const isLoading = status === "streaming" || status === "submitted";

  return (
    <div className="flex h-full min-w-0 flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 flex items-center gap-2 bg-background px-2 py-1.5">
        <SidebarToggle />
        <div className="ml-auto flex items-center gap-2">
          <SignedIn>
            <button
              onClick={() => setShowBooking(true)}
              className="rounded-lg border border-border bg-background px-3 py-1 text-xs font-medium text-foreground hover:bg-muted transition-colors"
            >
              Book a Resort
            </button>
          </SignedIn>
          <SignedOut>
            <SignInButton mode="redirect">
              <button className="rounded-lg border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground hover:bg-muted transition-colors cursor-pointer">
                Sign in
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </header>

      {/* Messages */}
      <ChatMessages
        chatId={id}
        messages={messages}
        status={status}
        isAuthenticated={!!isSignedIn}
      />

      {/* Input */}
      <div className="sticky bottom-0 z-10 mx-auto flex w-full max-w-3xl gap-2 bg-background px-2 pb-3 md:px-4 md:pb-4">
        <MultimodalInput
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
          disabled={isLoading}
          isLoading={isLoading}
          onSuggestion={(text) => append({ role: "user", content: text })}
          showSuggestions={messages.length === 0}
          stop={stop}
        />
      </div>

      {/* Booking Modal */}
      {showBooking && (
        <BookingForm
          onClose={() => setShowBooking(false)}
          onSuccess={(msg) => {
            append({ role: "user", content: msg });
          }}
        />
      )}
    </div>
  );
}
