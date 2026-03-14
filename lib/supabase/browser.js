"use client";

import { createBrowserClient } from "@supabase/ssr";

let client;

export function createBrowserSupabaseClient() {
  if (client) {
    return client;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  client = createBrowserClient(supabaseUrl, supabaseKey);
  return client;
}
