"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function Markdown({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      className="prose-custom"
      components={{
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-foreground hover:opacity-70"
          >
            {children}
          </a>
        ),
        code: ({ className, children, ...props }) => {
          const isInline = !className;
          if (isInline) {
            return (
              <code className="rounded bg-muted px-1 py-0.5 text-[0.85em] font-[family-name:var(--font-geist-mono)]" {...props}>
                {children}
              </code>
            );
          }
          return (
            <code className="font-[family-name:var(--font-geist-mono)]" {...props}>
              {children}
            </code>
          );
        },
        pre: ({ children }) => (
          <pre className="rounded-lg bg-muted p-3 overflow-x-auto text-sm">
            {children}
          </pre>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
