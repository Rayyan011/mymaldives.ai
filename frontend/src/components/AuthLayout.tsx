import { SignIn, SignUp } from '@clerk/react';

interface Props {
  mode: 'sign-in' | 'sign-up';
}

export default function AuthLayout({ mode }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-ocean-100 via-white to-ocean-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-ocean-900">MyMaldives.ai</h1>
          <p className="text-sm text-gray-500 mt-1">Your AI-powered Maldives travel advisor</p>
        </div>

        {mode === 'sign-in' ? (
          <SignIn
            routing="path"
            path="/sign-in"
            signUpUrl="/sign-up"
            forceRedirectUrl="/chat"
          />
        ) : (
          <SignUp
            routing="path"
            path="/sign-up"
            signInUrl="/sign-in"
            forceRedirectUrl="/chat"
          />
        )}
      </div>
    </div>
  );
}
