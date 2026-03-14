"use client";

import Link from "next/link";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const registerSchema = z
  .object({
    fullName: z.string().min(2, "Full name is required."),
    email: z.email("Enter a valid email address."),
    password: z.string().min(8, "Password must be at least 8 characters."),
    confirmPassword: z.string().min(8, "Confirm your password."),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export function RegisterForm() {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    setError,
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
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

      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            full_name: values.fullName,
            role: "billing_staff",
          },
          emailRedirectTo: `${window.location.origin}/verify-email`,
        },
      });

      if (error) {
        setError("root", { message: error.message });
      }
    });
  });

  return (
    <form className="flex flex-1 flex-col gap-5" onSubmit={onSubmit}>
      <div className="space-y-2">
        <Label htmlFor="fullName">Full name</Label>
        <Input id="fullName" placeholder="Ariana Reed" {...register("fullName")} />
        {errors.fullName ? (
          <p className="text-sm text-rose-600">{errors.fullName.message}</p>
        ) : null}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Work email</Label>
        <Input id="email" type="email" placeholder="operations@pulsehealth.com" {...register("email")} />
        {errors.email ? <p className="text-sm text-rose-600">{errors.email.message}</p> : null}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" {...register("password")} />
          {errors.password ? (
            <p className="text-sm text-rose-600">{errors.password.message}</p>
          ) : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <Input id="confirmPassword" type="password" {...register("confirmPassword")} />
          {errors.confirmPassword ? (
            <p className="text-sm text-rose-600">{errors.confirmPassword.message}</p>
          ) : null}
        </div>
      </div>
      {errors.root ? <p className="text-sm text-rose-600">{errors.root.message}</p> : null}
      {isSubmitSuccessful ? (
        <p className="text-sm text-emerald-600">
          Registration submitted. Check your email to verify the account.
        </p>
      ) : null}
      <div className="mt-auto space-y-4 pt-2">
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Creating workspace..." : "Create account"}
        </Button>
        <p className="text-sm text-muted-foreground">
          Already have access?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </form>
  );
}
