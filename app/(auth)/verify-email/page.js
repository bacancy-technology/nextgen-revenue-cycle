import Link from "next/link";
import { MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Verify Email | PulseRCM",
};

export default function VerifyEmailPage() {
  return (
    <div className="space-y-8 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-primary/10 text-primary">
        <MailCheck className="h-8 w-8" />
      </div>
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">Check your inbox</h1>
        <p className="text-sm text-muted-foreground">
          Verify the email link from Supabase to finish setup or reset access.
        </p>
      </div>
      <Button asChild>
        <Link href="/login">Return to sign in</Link>
      </Button>
    </div>
  );
}
