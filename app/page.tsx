import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
} from "@clerk/nextjs";

export default function LandingPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      {/* Nav */}
      <nav className="flex items-center justify-between px-4 py-3 max-w-6xl mx-auto w-full">
        <span className="text-sm font-semibold">MyMaldives.ai</span>
        <div className="flex items-center gap-2">
          <SignedOut>
            <SignInButton mode="redirect">
              <button className="rounded-lg px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
          <Link
            href="/chat"
            className="rounded-lg border border-border bg-primary px-4 py-1.5 text-xs font-medium text-primary-foreground hover:opacity-90 transition-colors"
          >
            Start Chatting
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 pb-24">
        <div className="max-w-2xl text-center">
          <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
            Your AI-Powered
            <br />
            <span className="text-muted-foreground">
              Maldives Travel Advisor
            </span>
          </h1>
          <p className="mt-4 text-base text-muted-foreground max-w-lg mx-auto">
            Chat with our AI travel expert to find the perfect Maldives resort.
            Personalized recommendations based on your preferences, budget, and
            travel style.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/chat"
              className="rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-colors"
            >
              Start Chatting
            </Link>
            <SignedIn>
              <Link
                href="/chat"
                className="rounded-lg border border-border px-6 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                Continue Conversation
              </Link>
            </SignedIn>
            <SignedOut>
              <SignUpButton mode="redirect">
                <button className="rounded-lg border border-border px-6 py-2.5 text-sm font-medium text-foreground hover:bg-muted transition-colors cursor-pointer">
                  Sign Up Free
                </button>
              </SignUpButton>
            </SignedOut>
          </div>
        </div>
      </main>

      {/* Features */}
      <section className="border-t border-border bg-background px-6 py-16">
        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-3">
          {[
            {
              title: "AI-Powered Advice",
              desc: "Our AI knows 25+ Maldives resorts inside and out — from house reefs to honeymoon suites.",
            },
            {
              title: "Personalized for You",
              desc: "Sign in and get recommendations tailored to your travel style and preferences.",
            },
            {
              title: "Book in Seconds",
              desc: "Found the perfect resort? Send a booking inquiry directly from the chat.",
            },
          ].map((f) => (
            <div key={f.title}>
              <h3 className="text-sm font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
