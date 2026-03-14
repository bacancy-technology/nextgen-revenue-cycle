import { ArrowRightLeft, CreditCard, Landmark, Receipt } from "lucide-react";
import { SectionHeader } from "@/components/dashboard/section-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getInvoices, getPayments } from "@/services/paymentService";
import { formatCurrency, formatDate } from "@/lib/utils";

export default async function PaymentsPage() {
  const [paymentResult, invoiceResult] = await Promise.all([getPayments(), getInvoices()]);

  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Payment processing"
        title="Collect, post, and reconcile patient and payer payments."
        description="Support credit card, ACH, ERA posting, statements, and patient portal payments within a single operational dashboard."
        badge={paymentResult.source === "demo" ? "Demo dataset" : "Live payments"}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {[
          { title: "Card payments", value: "$9.6k", icon: CreditCard },
          { title: "ACH collections", value: "$3.1k", icon: Landmark },
          { title: "ERA posted", value: "$18.4k", icon: ArrowRightLeft },
        ].map((item) => (
          <Card key={item.title}>
            <CardContent className="flex items-center justify-between gap-4 p-6">
              <div>
                <p className="text-sm text-muted-foreground">{item.title}</p>
                <p className="mt-2 text-3xl font-semibold">{item.value}</p>
              </div>
              <div className="rounded-3xl bg-primary/10 p-3 text-primary">
                <item.icon className="h-5 w-5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>Recent payment activity</CardTitle>
            <CardDescription>Latest settlement and posting events.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {paymentResult.data.map((payment) => (
              <div
                key={payment.id}
                className="flex flex-col gap-3 rounded-[24px] border border-border/60 bg-background/80 p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-semibold">{payment.patient}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {payment.source} · {formatDate(payment.date)}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge variant={payment.status === "Pending" ? "warning" : "success"}>
                    {payment.status}
                  </Badge>
                  <p className="font-semibold">{formatCurrency(payment.amount)}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Invoices + statements</CardTitle>
            <CardDescription>Outstanding balances ready for patient outreach.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {invoiceResult.data.map((invoice) => (
              <div key={invoice.id} className="rounded-[24px] border border-border/60 bg-background/80 p-5">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                      <Receipt className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-semibold">{invoice.patient}</p>
                      <p className="text-sm text-muted-foreground">{invoice.id}</p>
                    </div>
                  </div>
                  <Badge variant="outline">{invoice.status}</Badge>
                </div>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Due {formatDate(invoice.dueDate)}</span>
                  <span className="font-semibold">{formatCurrency(invoice.balance)}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
