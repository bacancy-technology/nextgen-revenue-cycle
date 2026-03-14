import { AppFrame } from "@/components/dashboard/app-frame";
import { requireAuthenticatedUser } from "@/lib/auth";

export default async function ClaimsLayout({ children }) {
  const user = await requireAuthenticatedUser();
  return <AppFrame user={user}>{children}</AppFrame>;
}
