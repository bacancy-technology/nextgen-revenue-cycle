import { Bot, ScanSearch, SendHorizonal } from "lucide-react";
import { ClaimsFunnelChart } from "@/components/charts/claims-funnel-chart";
import { ClaimForm } from "@/components/forms/claim-form";
import { SectionHeader } from "@/components/dashboard/section-header";
import { ClaimsTable } from "@/components/tables/claims-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getClaims, getClaimsWorkbench } from "@/services/claimService";

export default async function ClaimsPage() {
  const [claimResult, workbench] = await Promise.all([getClaims(), getClaimsWorkbench()]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <SectionHeader
          eyebrow="Claims management"
          title="Create, submit, track, and recover claims from one workbench."
          description="Balance volume work with denial resolution, coding readiness, and batch submission visibility."
          badge={claimResult.source === "demo" ? "Demo dataset" : "Live dataset"}
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <SendHorizonal className="mr-2 h-4 w-4" />
              Create claim
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create claim</DialogTitle>
              <DialogDescription>
                Validate the coding payload before sending to a clearinghouse integration.
              </DialogDescription>
            </DialogHeader>
            <ClaimForm />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>Claims queue</CardTitle>
            <CardDescription>Search, filter, and review live claim statuses.</CardDescription>
          </CardHeader>
          <CardContent>
            <ClaimsTable claims={claimResult.data} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Claims funnel</CardTitle>
            <CardDescription>See how claims move from creation to payment.</CardDescription>
          </CardHeader>
          <CardContent>
            <ClaimsFunnelChart data={workbench.funnel} />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="coding">
        <TabsList>
          <TabsTrigger value="coding">Coding validation</TabsTrigger>
          <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
          <TabsTrigger value="denials">Denials</TabsTrigger>
        </TabsList>
        <TabsContent value="coding">
          <Card>
            <CardHeader>
              <CardTitle>Medical coding</CardTitle>
              <CardDescription>ICD-10 and procedure validation before submission.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-3">
              {workbench.codingQueue.map((item) => (
                <div key={`${item.diagnosis}-${item.procedure}`} className="rounded-[24px] border border-border/60 bg-background/80 p-4">
                  <div className="mb-3 flex items-center gap-2">
                    <Bot className="h-4 w-4 text-primary" />
                    <p className="font-semibold">{item.status}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">Diagnosis: {item.diagnosis}</p>
                  <p className="text-sm text-muted-foreground">Procedure: {item.procedure}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="eligibility">
          <Card>
            <CardHeader>
              <CardTitle>Insurance eligibility verification</CardTitle>
              <CardDescription>Recent responses and coverage risks.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-3">
              {workbench.eligibilityChecks.map((item) => (
                <div key={item.patient} className="rounded-[24px] border border-border/60 bg-background/80 p-4">
                  <p className="font-semibold">{item.patient}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{item.response}</p>
                  <p className="mt-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {item.checkedAt}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="denials">
          <Card>
            <CardHeader>
              <CardTitle>Denial management</CardTitle>
              <CardDescription>Work the highest-value exceptions first.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {claimResult.data
                .filter((claim) => claim.denialReason)
                .map((claim) => (
                  <div key={claim.id} className="flex flex-col gap-3 rounded-[24px] border border-border/60 bg-background/80 p-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-semibold">
                        {claim.id} · {claim.patient}
                      </p>
                      <p className="mt-2 text-sm text-muted-foreground">{claim.denialReason}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <ScanSearch className="h-4 w-4 text-primary" />
                      <span className="text-sm font-medium">{claim.assignedTo}</span>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
