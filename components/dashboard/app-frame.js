import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";

export function AppFrame({ user, children }) {
  return (
    <div className="container py-6">
      <div className="dashboard-grid">
        <Sidebar />
        <div className="space-y-6">
          <Topbar user={user} />
          <div className="space-y-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
