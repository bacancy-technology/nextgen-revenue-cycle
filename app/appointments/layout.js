import { AppFrame } from "@/components/dashboard/app-frame";
import { requireAuthenticatedUser } from "@/lib/auth";

export default async function AppointmentsLayout({ children }) {
  const user = await requireAuthenticatedUser();
  return <AppFrame user={user}>{children}</AppFrame>;
}
