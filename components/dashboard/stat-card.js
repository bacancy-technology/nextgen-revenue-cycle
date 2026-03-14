import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { formatCompactNumber, formatCurrency } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export function StatCard({ metric }) {
  const isNumeric = typeof metric.value === "number";
  const isCurrency = metric.label.toLowerCase().includes("collections") || metric.label.toLowerCase().includes("a/r");
  const positive = metric.tone !== "warning";

  const displayValue = isNumeric
    ? isCurrency
      ? formatCurrency(metric.value)
      : formatCompactNumber(metric.value)
    : metric.value;

  return (
    <Card className="overflow-hidden">
      <CardContent className="space-y-4 p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">{metric.label}</p>
            <p className="mt-3 text-3xl font-semibold tracking-tight">{displayValue}</p>
          </div>
          <Badge variant={positive ? "success" : "warning"}>{metric.change}</Badge>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {positive ? (
            <ArrowUpRight className="h-4 w-4 text-emerald-500" />
          ) : (
            <ArrowDownRight className="h-4 w-4 text-amber-500" />
          )}
          Compared to prior 30-day cycle
        </div>
      </CardContent>
    </Card>
  );
}
