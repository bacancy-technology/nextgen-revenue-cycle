import "server-only";

import { redirect } from "next/navigation";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export const roles = {
  admin: "admin",
  billingStaff: "billing_staff",
  provider: "provider",
  patient: "patient",
};

export async function getCurrentUser() {
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    return null;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user || null;
}

export async function requireAuthenticatedUser() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return user;
}

export async function getCurrentUserRole() {
  const supabase = await createServerSupabaseClient();
  const user = await getCurrentUser();

  if (!supabase || !user) {
    return roles.billingStaff;
  }

  const { data, error } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (error || !data?.role) {
    return user.app_metadata?.role || roles.billingStaff;
  }

  return data.role;
}

export async function requireRole(allowedRoles) {
  const user = await requireAuthenticatedUser();
  const role = await getCurrentUserRole();

  if (!allowedRoles.includes(role)) {
    redirect("/dashboard?unauthorized=1");
  }

  return { user, role };
}
