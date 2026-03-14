import { ForgotPasswordForm } from "@/components/forms/forgot-password-form";

export const metadata = {
  title: "Forgot Password | PulseRCM",
};

export default function ForgotPasswordPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">Reset your password</h1>
        <p className="text-sm text-muted-foreground">
          We&apos;ll send a secure reset link to your email.
        </p>
      </div>
      <ForgotPasswordForm />
    </div>
  );
}
