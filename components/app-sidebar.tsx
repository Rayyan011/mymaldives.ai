"use client";

import Link from "next/link";
import { useSidebar } from "./sidebar-provider";
import { SidebarHistory } from "./sidebar-history";
import { SidebarUserNav } from "./sidebar-user-nav";

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

export function AppSidebar() {
  const { isOpen, close } = useSidebar();

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={close}
        />
      )}

      <aside
        className={`flex flex-col bg-muted/30 transition-all duration-200
          fixed inset-y-0 left-0 z-50 w-72 border-r border-border shadow-xl
          md:relative md:z-auto md:w-64 md:shadow-none md:shrink-0
          ${isOpen ? "translate-x-0" : "max-md:-translate-x-full md:w-0 md:overflow-hidden md:border-0"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-2 px-3 py-2.5">
          <Link
            href="/chat"
            className="text-sm font-semibold text-foreground hover:bg-muted rounded-lg px-2 py-1 transition-colors truncate"
          >
            MyMaldives.ai
          </Link>
          <Link
            href="/chat"
            className="flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors shrink-0"
            title="New chat"
          >
            <PlusIcon />
          </Link>
        </div>

        {/* Chat history */}
        <div className="flex-1 overflow-y-auto px-2">
          <SidebarHistory />
        </div>

        {/* Footer */}
        <SidebarUserNav />
      </aside>
    </>
  );
}
