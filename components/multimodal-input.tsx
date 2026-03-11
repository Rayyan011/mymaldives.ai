"use client";

import { useRef, type FormEvent, type KeyboardEvent } from "react";

interface Props {
  input: string;
  setInput: (value: string) => void;
  handleSubmit: (e: FormEvent) => void;
  disabled: boolean;
  isLoading: boolean;
  onSuggestion: (text: string) => void;
  showSuggestions: boolean;
  stop?: () => void;
}

const SUGGESTIONS = [
  { title: "Best resort for a honeymoon?", subtitle: "Romantic getaways" },
  { title: "Budget-friendly options", subtitle: "Great value resorts" },
  { title: "Family resorts with kids club", subtitle: "Fun for all ages" },
  { title: "Best diving resorts", subtitle: "Underwater adventures" },
];

function ArrowUpIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="19" x2="12" y2="5" />
      <polyline points="5 12 12 5 19 12" />
    </svg>
  );
}

function StopIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="6" width="12" height="12" rx="1" />
    </svg>
  );
}

export default function MultimodalInput({
  input,
  setInput,
  handleSubmit,
  disabled,
  isLoading,
  onSuggestion,
  showSuggestions,
  stop,
}: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    }
  };

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (input.trim() && !disabled) {
        handleSubmit(e as unknown as FormEvent);
        if (textareaRef.current) textareaRef.current.style.height = "auto";
      }
    }
  };

  return (
    <div className="relative flex w-full flex-col gap-4">
      {showSuggestions && (
        <div className="grid gap-2 sm:grid-cols-2">
          {SUGGESTIONS.map((s, i) => (
            <button
              key={s.title}
              onClick={() => onSuggestion(s.title)}
              disabled={disabled}
              className="h-auto w-full whitespace-normal rounded-xl border border-border bg-background p-3 text-left text-sm transition-colors hover:bg-muted disabled:opacity-50 animate-fade-in"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="font-medium text-foreground">{s.title}</div>
              <div className="text-xs text-muted-foreground">{s.subtitle}</div>
            </button>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="rounded-xl border border-border bg-background p-3 shadow-xs transition-all duration-200 focus-within:border-foreground/20 hover:border-muted-foreground/50">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              adjustHeight();
            }}
            onKeyDown={onKeyDown}
            placeholder="Send a message..."
            rows={1}
            className="w-full resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none disabled:opacity-50"
          />
          <div className="flex items-center justify-end pt-2">
            {isLoading ? (
              <button
                type="button"
                onClick={stop}
                className="flex size-8 items-center justify-center rounded-full bg-foreground text-background transition-colors hover:opacity-80"
              >
                <StopIcon />
              </button>
            ) : (
              <button
                type="submit"
                disabled={!input.trim()}
                className="flex size-8 items-center justify-center rounded-full bg-primary text-primary-foreground transition-colors hover:opacity-80 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ArrowUpIcon />
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
