import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getClaims } from "@/services/claimService";

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const claims = await getClaims();
  return NextResponse.json(claims);
}
