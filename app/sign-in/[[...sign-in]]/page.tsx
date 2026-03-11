import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-lg font-semibold text-foreground">
            MyMaldives.ai
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Your AI-powered Maldives travel advisor
          </p>
        </div>
        <SignIn
          routing="path"
          path="/sign-in"
          signUpUrl="/sign-up"
          forceRedirectUrl="/chat"
        />
      </div>
    </div>
  );
}
