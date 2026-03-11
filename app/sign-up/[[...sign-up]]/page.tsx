import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
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
        <SignUp
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
          forceRedirectUrl="/chat"
        />
      </div>
    </div>
  );
}
