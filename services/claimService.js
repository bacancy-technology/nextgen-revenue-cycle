import "server-only";

import { claims, claimsFunnel, codingQueue, eligibilityChecks } from "@/lib/mock-data";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function getClaims() {
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    return { data: claims, source: "demo" };
  }

  const { data, error } = await supabase
    .from("claims")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data?.length) {
    return { data: claims, source: "demo", error: error?.message || null };
  }

  return { data, source: "live" };
}

export async function getClaimsWorkbench() {
  return {
    funnel: claimsFunnel,
    codingQueue,
    eligibilityChecks,
  };
}
