import "server-only";

import {
  analyticsKpis,
  appointments,
  arBuckets,
  collectionRateData,
  revenueTrend,
  summaryMetrics,
} from "@/lib/mock-data";

export async function getDashboardOverview() {
  return {
    metrics: summaryMetrics,
    revenueTrend,
    collectionRateData,
    arBuckets,
    appointments,
    analyticsKpis,
    source: "demo",
  };
}
