"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const forgotSchema = z.object({
  email: z.email("Enter a valid email address."),
});

export function ForgotPasswordForm() {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    setError,
  } = useForm({
    resolver: zodResolver(forgotSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = handleSubmit((values) => {
    startTransition(async () => {
      const supabase = createBrowserSupabaseClient();

      if (!supabase) {
        setError("root", {
          message: "Supabase environment variables are missing.",
        });
        return;
      }

      const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
        redirectTo: `${window.location.origin}/verify-email`,
      });

      if (error) {
        setError("root", { message: error.message });
      }
    });
  });

  return (
    <form className="space-y-5" onSubmit={onSubmit}>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="team@pulsehealth.com" {...register("email")} />
        {errors.email ? <p className="text-sm text-rose-600">{errors.email.message}</p> : null}
      </div>
      {errors.root ? <p className="text-sm text-rose-600">{errors.root.message}</p> : null}
      {isSubmitSuccessful ? (
        <p className="text-sm text-emerald-600">
          Password reset email sent. Follow the secure link to update access.
        </p>
      ) : null}
      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Sending link..." : "Send reset link"}
      </Button>
    </form>
  );
}
