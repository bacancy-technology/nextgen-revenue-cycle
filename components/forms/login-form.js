"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const loginSchema = z.object({
  email: z.email("Enter a valid email address."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});

export function LoginForm({ redirectTo }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
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

      const { error } = await supabase.auth.signInWithPassword(values);

      if (error) {
        setError("root", { message: error.message });
        return;
      }

      router.push(redirectTo || "/dashboard");
      router.refresh();
    });
  });

  return (
    <form className="flex flex-1 flex-col gap-5" onSubmit={onSubmit}>
      <div className="space-y-2">
        <Label htmlFor="email">Work email</Label>
        <Input id="email" type="email" placeholder="billing@pulsehealth.com" {...register("email")} />
        {errors.email ? <p className="text-sm text-rose-600">{errors.email.message}</p> : null}
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Link href="/forgot-password" className="text-sm text-primary hover:underline">
            Forgot password?
          </Link>
        </div>
        <Input id="password" type="password" placeholder="Enter your password" {...register("password")} />
        {errors.password ? (
          <p className="text-sm text-rose-600">{errors.password.message}</p>
        ) : null}
      </div>
      {errors.root ? <p className="text-sm text-rose-600">{errors.root.message}</p> : null}
      <div className="mt-auto space-y-4 pt-2">
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Signing in..." : "Sign in"}
        </Button>
      </div>
    </form>
  );
}
