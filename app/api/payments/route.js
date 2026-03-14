import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { getPayments } from "@/services/paymentService";

export async function GET() {
  const user = await getCurrentUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payments = await getPayments();
  return NextResponse.json(payments);
}
