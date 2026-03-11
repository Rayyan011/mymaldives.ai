import { Link } from 'react-router-dom';
import { Show, SignInButton, SignUpButton } from '@clerk/react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-ocean-900 via-ocean-700 to-ocean-500 text-white">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <span className="text-xl font-bold">MyMaldives.ai</span>
        <div className="flex gap-3">
          <Show when="signed-out">
            <SignInButton mode="redirect">
              <button className="text-sm text-ocean-100 hover:text-white transition-colors cursor-pointer">
                Sign In
              </button>
            </SignInButton>
          </Show>
          <Link
            to="/chat"
            className="text-sm bg-white/20 hover:bg-white/30 px-4 py-1.5 rounded-full transition-colors"
          >
            Start Chatting
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <main className="max-w-4xl mx-auto px-6 pt-24 pb-32 text-center">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
          Your AI-Powered<br />
          <span className="text-ocean-300">Maldives Travel Advisor</span>
        </h1>
        <p className="text-lg text-ocean-100 max-w-2xl mx-auto mb-10">
          Chat with our AI travel expert to find the perfect Maldives resort.
          Get personalized recommendations based on your preferences, budget, and travel style.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/chat"
            className="bg-white text-ocean-900 px-8 py-3 rounded-full font-semibold hover:bg-ocean-100 transition-colors"
          >
            Start Chatting
          </Link>
          <Show when="signed-in">
            <Link
              to="/chat"
              className="border border-white/30 px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors"
            >
              Continue Your Conversation
            </Link>
          </Show>
          <Show when="signed-out">
            <SignUpButton mode="redirect">
              <button className="border border-white/30 px-8 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors cursor-pointer">
                Sign Up for Personalized Recs
              </button>
            </SignUpButton>
          </Show>
        </div>
      </main>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'AI-Powered Advice',
              desc: 'Our AI knows 25+ Maldives resorts inside and out — from house reefs to honeymoon suites.',
            },
            {
              title: 'Personalized for You',
              desc: 'Sign in with Google or social accounts and get recommendations tailored to your travel style.',
            },
            {
              title: 'Book in Seconds',
              desc: 'Found the perfect resort? Send a booking inquiry directly from the chat.',
            },
          ].map((f) => (
            <div key={f.title} className="bg-white/10 rounded-2xl p-6 backdrop-blur-sm">
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-sm text-ocean-100">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
