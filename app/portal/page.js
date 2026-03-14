import { Download, FileUp, Wallet } from "lucide-react";
import { SectionHeader } from "@/components/dashboard/section-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { invoices } from "@/lib/mock-data";
import { formatCurrency, formatDate } from "@/lib/utils";

export default function PortalPage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Patient portal"
        title="A simple, trustworthy self-service experience for invoices, payments, and documents."
        description="Keep the portal clean and accessible so patients can resolve balances quickly without staff intervention."
        badge="Patient experience"
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardContent className="flex items-start gap-4 p-6">
            <div className="rounded-3xl bg-primary/10 p-3 text-primary">
              <Wallet className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold">Make a payment</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Card and ACH checkout entry point for patient balances and installment plans.
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-start gap-4 p-6">
            <div className="rounded-3xl bg-primary/10 p-3 text-primary">
              <Download className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold">Download statements</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Clear invoice history, due dates, and printable statements.
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-start gap-4 p-6">
            <div className="rounded-3xl bg-primary/10 p-3 text-primary">
              <FileUp className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold">Upload documents</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Secure document handoff for insurance cards, IDs, or appeal support.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Open invoices</CardTitle>
          <CardDescription>Example patient-facing billing view.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {invoices.map((invoice) => (
            <div key={invoice.id} className="flex flex-col gap-4 rounded-[24px] border border-border/60 bg-background/80 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <p className="font-semibold">{invoice.id}</p>
                  <Badge variant="outline">{invoice.status}</Badge>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Due {formatDate(invoice.dueDate)} for {invoice.patient}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <p className="font-semibold">{formatCurrency(invoice.balance)}</p>
                <Button size="sm">Pay now</Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
