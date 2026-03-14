import "server-only";

import { invoices, payments } from "@/lib/mock-data";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function getPayments() {
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    return { data: payments, source: "demo" };
  }

  const { data, error } = await supabase
    .from("payments")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data?.length) {
    return { data: payments, source: "demo", error: error?.message || null };
  }

  return { data, source: "live" };
}

export async function getInvoices() {
  return {
    data: invoices,
    source: "demo",
  };
}
