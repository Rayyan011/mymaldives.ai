"use client";

import { useState } from "react";

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ThumbsUpIcon({ filled }: { filled?: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
    </svg>
  );
}

function ThumbsDownIcon({ filled }: { filled?: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" />
    </svg>
  );
}

interface Props {
  role: string;
  content: string;
  chatId?: string;
  messageId: string;
  vote?: { isUpvoted: number };
  onVote?: (messageId: string, isUpvoted: boolean) => void;
}

export function MessageActions({
  role,
  content,
  messageId,
  vote,
  onVote,
}: Props) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
      <button
        onClick={copy}
        className="flex size-7 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        title="Copy"
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </button>

      {role === "assistant" && onVote && (
        <>
          <button
            onClick={() => onVote(messageId, true)}
            className={`flex size-7 items-center justify-center rounded-md transition-colors ${
              vote?.isUpvoted === 1
                ? "text-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
            title="Upvote"
          >
            <ThumbsUpIcon filled={vote?.isUpvoted === 1} />
          </button>
          <button
            onClick={() => onVote(messageId, false)}
            className={`flex size-7 items-center justify-center rounded-md transition-colors ${
              vote?.isUpvoted === 0
                ? "text-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }`}
            title="Downvote"
          >
            <ThumbsDownIcon filled={vote?.isUpvoted === 0} />
          </button>
        </>
      )}
    </div>
  );
}
