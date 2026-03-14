import { CollectionRateChart } from "@/components/charts/collection-rate-chart";
import { RevenueTrendChart } from "@/components/charts/revenue-trend-chart";
import { SectionHeader } from "@/components/dashboard/section-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { analyticsKpis, auditLogs, collectionRateData, revenueTrend } from "@/lib/mock-data";

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Analytics dashboard"
        title="KPI reporting for clean claims, denial rate, days in A/R, and revenue per provider."
        description="Turn operational data into a clear executive story without losing frontline detail."
        badge="Analytics + reporting"
      />

      <div className="grid gap-5 xl:grid-cols-4">
        {analyticsKpis.map((kpi) => (
          <Card key={kpi.label}>
            <CardContent className="p-6">
              <p className="text-sm text-muted-foreground">{kpi.label}</p>
              <p className="mt-3 text-3xl font-semibold">{kpi.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Revenue trend</CardTitle>
            <CardDescription>Executive view of production and collections.</CardDescription>
          </CardHeader>
          <CardContent>
            <RevenueTrendChart data={revenueTrend} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Collection rate</CardTitle>
            <CardDescription>Performance by payer segment.</CardDescription>
          </CardHeader>
          <CardContent>
            <CollectionRateChart data={collectionRateData} />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Audit and activity history</CardTitle>
          <CardDescription>Supports compliance, admin oversight, and workflow review.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {auditLogs.map((item) => (
            <div key={item.event} className="flex flex-col gap-1 rounded-[24px] border border-border/60 bg-background/80 p-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-medium">{item.event}</p>
              <p className="text-sm text-muted-foreground">
                {item.actor} · {item.time}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
