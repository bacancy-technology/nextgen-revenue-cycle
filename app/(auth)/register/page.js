import { RegisterForm } from "@/components/forms/register-form";

export const metadata = {
  title: "Register | PulseRCM",
};

export default function RegisterPage() {
  return (
    <div className="flex h-full flex-1 flex-col gap-8">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">Create your workspace</h1>
        <p className="text-sm text-muted-foreground">
          Invite your billing, provider, and operations teams into a shared RCM command center.
        </p>
      </div>
      <RegisterForm />
    </div>
  );
}
