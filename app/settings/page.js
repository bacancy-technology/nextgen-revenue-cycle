import { ShieldCheck, UsersRound } from "lucide-react";
import { SectionHeader } from "@/components/dashboard/section-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { roles } from "@/lib/auth";
import { auditLogs, userDirectory } from "@/lib/mock-data";

const roleDescriptions = [
  { role: roles.admin, description: "Manage org settings, users, policies, and audit logs." },
  { role: roles.billingStaff, description: "Run claims, payments, A/R follow-up, and reporting." },
  { role: roles.provider, description: "Review schedule, documentation, and coding support." },
  { role: roles.patient, description: "Access invoices, payments, and document uploads in portal." },
];

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Users and role management"
        title="Admin controls for permissions, audit logs, and secure operational settings."
        description="Manage access with role-aware architecture that maps directly to Supabase Auth and RLS policies."
        badge="Admin panel"
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Team directory</CardTitle>
            <CardDescription>Current access and workspace responsibilities.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {userDirectory.map((user) => (
              <div key={user.name} className="rounded-[24px] border border-border/60 bg-background/80 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.access}</p>
                  </div>
                  <Badge variant="outline">{user.role}</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Role definitions</CardTitle>
            <CardDescription>Suggested RBAC model for the healthcare SaaS workspace.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {roleDescriptions.map((role) => (
              <div key={role.role} className="rounded-[24px] border border-border/60 bg-background/80 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <UsersRound className="h-4 w-4 text-primary" />
                  <p className="font-semibold">{role.role}</p>
                </div>
                <p className="text-sm text-muted-foreground">{role.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Audit logs</CardTitle>
          <CardDescription>Immutable activity history for operational accountability.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {auditLogs.map((log) => (
            <div key={log.event} className="flex flex-col gap-2 rounded-[24px] border border-border/60 bg-background/80 p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-primary/10 p-2 text-primary">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-medium">{log.event}</p>
                  <p className="text-sm text-muted-foreground">{log.actor}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{log.time}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
