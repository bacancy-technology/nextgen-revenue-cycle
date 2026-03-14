import { LoginForm } from "@/components/forms/login-form";

export const metadata = {
  title: "Login | PulseRCM",
};

export default function LoginPage({ searchParams }) {
  return (
    <div className="flex h-full flex-1 flex-col gap-8">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">Sign in to PulseRCM</h1>
        <p className="text-sm text-muted-foreground">
          Access scheduling, claims, payments, analytics, and patient-facing workflows.
        </p>
      </div>
      <LoginForm redirectTo={searchParams?.redirectTo} />
    </div>
  );
}
