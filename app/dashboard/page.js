import { CalendarClock, ClipboardCheck, DatabaseZap, WalletCards } from "lucide-react";
import { ClaimsFunnelChart } from "@/components/charts/claims-funnel-chart";
import { CollectionRateChart } from "@/components/charts/collection-rate-chart";
import { RevenueTrendChart } from "@/components/charts/revenue-trend-chart";
import { SectionHeader } from "@/components/dashboard/section-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getClaimsWorkbench } from "@/services/claimService";
import { getDashboardOverview } from "@/services/dashboardService";

const workflowCards = [
  {
    title: "Claims ready for submit",
    value: "28",
    subtitle: "Batch submission before 2 PM",
    icon: ClipboardCheck,
  },
  {
    title: "Eligibility tasks",
    value: "6",
    subtitle: "Coverage issues need follow-up",
    icon: DatabaseZap,
  },
  {
    title: "Appointments today",
    value: "42",
    subtitle: "4 waitlist opportunities open",
    icon: CalendarClock,
  },
  {
    title: "Patient payments",
    value: "$14.2k",
    subtitle: "Posted across portal and ACH",
    icon: WalletCards,
  },
];

export default async function DashboardPage() {
  const [overview, claimsWorkbench] = await Promise.all([
    getDashboardOverview(),
    getClaimsWorkbench(),
  ]);

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Revenue command center"
        title="A healthcare billing dashboard built for daily execution."
        description="Track the revenue pulse, keep claims moving, surface A/R risk quickly, and reduce the time billing teams spend hopping between disconnected screens."
        badge={overview.source === "demo" ? "Demo dataset" : "Live dataset"}
      />

      <div className="grid gap-5 xl:grid-cols-4">
        {overview.metrics.map((metric) => (
          <StatCard key={metric.label} metric={metric} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.35fr_0.65fr]">
        <Card>
          <CardHeader>
            <CardTitle>Revenue trend</CardTitle>
            <CardDescription>Charges vs collections across the last seven months.</CardDescription>
          </CardHeader>
          <CardContent>
            <RevenueTrendChart data={overview.revenueTrend} />
          </CardContent>
        </Card>
        <div className="grid gap-6">
          {workflowCards.map((item) => (
            <Card key={item.title}>
              <CardContent className="flex items-center justify-between gap-4 p-6">
                <div>
                  <p className="text-sm text-muted-foreground">{item.title}</p>
                  <p className="mt-2 text-3xl font-semibold">{item.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{item.subtitle}</p>
                </div>
                <div className="rounded-3xl bg-primary/10 p-3 text-primary">
                  <item.icon className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Claims processing funnel</CardTitle>
            <CardDescription>From intake through payer payment.</CardDescription>
          </CardHeader>
          <CardContent>
            <ClaimsFunnelChart data={claimsWorkbench.funnel} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Collection rate by payer</CardTitle>
            <CardDescription>Shows where follow-up attention is needed most.</CardDescription>
          </CardHeader>
          <CardContent>
            <CollectionRateChart data={overview.collectionRateData} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>A/R aging summary</CardTitle>
            <CardDescription>Outstanding balances grouped by aging bucket.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-4">
            {overview.arBuckets.map((bucket) => (
              <div
                key={bucket.label}
                className="rounded-[24px] border border-border/60 bg-secondary/50 p-4"
              >
                <p className="text-sm text-muted-foreground">{bucket.label} days</p>
                <p className="mt-2 text-2xl font-semibold">${Math.round(bucket.amount / 1000)}k</p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Eligibility response viewer</CardTitle>
            <CardDescription>Latest coverage checks needing action.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {claimsWorkbench.eligibilityChecks.map((item) => (
              <div
                key={item.patient}
                className="rounded-[24px] border border-border/60 bg-background/80 p-4"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold">{item.patient}</p>
                  <Badge variant={item.response === "Active" ? "success" : "warning"}>
                    {item.response}
                  </Badge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Verified at {item.checkedAt}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
