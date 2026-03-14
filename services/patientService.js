import "server-only";

import { patients } from "@/lib/mock-data";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function getPatients() {
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    return { data: patients, source: "demo" };
  }

  const { data, error } = await supabase
    .from("patients")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data?.length) {
    return {
      data: patients,
      source: "demo",
      error: error?.message || null,
    };
  }

  return { data, source: "live" };
}

export async function getPatientById(id) {
  const patientSet = await getPatients();
  const patient = patientSet.data.find((item) => item.id === id) || patientSet.data[0];

  return {
    data: patient,
    source: patientSet.source,
    error: patientSet.error || null,
  };
}
