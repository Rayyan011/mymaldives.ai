"use client";

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ThemeToggle } from "./theme-toggle";

export function SidebarUserNav() {
  return (
    <div className="flex items-center justify-between border-t border-border px-3 py-2.5">
      <SignedIn>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
      <SignedOut>
        <SignInButton mode="redirect">
          <button className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
            Sign in
          </button>
        </SignInButton>
      </SignedOut>
      <ThemeToggle />
    </div>
  );
}
