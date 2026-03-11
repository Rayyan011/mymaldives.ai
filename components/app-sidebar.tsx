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

      {/* Desktop spacer — pushes main content */}
      <div
        className="hidden md:block shrink-0 transition-[width] duration-200 ease-linear"
        style={{ width: isOpen ? "256px" : "0px" }}
      />

      {/* Sidebar panel */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 md:w-64 flex-col bg-muted/30 border-r border-border transition-[transform,left] duration-200 ease-linear
          ${isOpen ? "translate-x-0 md:translate-x-0 md:left-0" : "-translate-x-full md:translate-x-0 md:left-[-256px]"}`}
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
