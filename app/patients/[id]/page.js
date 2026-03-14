import Link from "next/link";
import { ArrowLeft, FileText, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getPatientById } from "@/services/patientService";
import { formatCurrency, formatDate } from "@/lib/utils";

export default async function PatientDetailsPage({ params }) {
  const patientResult = await getPatientById(params.id);
  const patient = patientResult.data;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center gap-4">
        <Button asChild variant="outline">
          <Link href="/patients">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to patients
          </Link>
        </Button>
        <Badge variant="outline">{patientResult.source === "demo" ? "Demo profile" : "Live profile"}</Badge>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>{patient.name}</CardTitle>
            <CardDescription>
              {patient.mrn} · {patient.payer} · {patient.provider}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[24px] border border-border/60 bg-secondary/40 p-4">
              <p className="text-sm text-muted-foreground">Date of birth</p>
              <p className="mt-2 font-semibold">{formatDate(patient.dob)}</p>
            </div>
            <div className="rounded-[24px] border border-border/60 bg-secondary/40 p-4">
              <p className="text-sm text-muted-foreground">Outstanding balance</p>
              <p className="mt-2 font-semibold">{formatCurrency(patient.balance)}</p>
            </div>
            <div className="rounded-[24px] border border-border/60 bg-secondary/40 p-4">
              <p className="text-sm text-muted-foreground">Next appointment</p>
              <p className="mt-2 font-semibold">{formatDate(patient.nextAppointment)}</p>
            </div>
            <div className="rounded-[24px] border border-border/60 bg-secondary/40 p-4">
              <p className="text-sm text-muted-foreground">Risk profile</p>
              <p className="mt-2 font-semibold">{patient.risk}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Insurance + demographics</CardTitle>
            <CardDescription>Key details needed for clean claim creation.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-[24px] border border-border/60 bg-background/80 p-4">
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="mt-2 font-semibold">{patient.phone}</p>
            </div>
            <div className="rounded-[24px] border border-border/60 bg-background/80 p-4">
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="mt-2 font-semibold">{patient.location}</p>
            </div>
            <div className="rounded-[24px] border border-border/60 bg-emerald-500/10 p-4">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                <ShieldCheck className="h-4 w-4" />
                Coverage and payer mapping are synced for this demo profile.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Document management</CardTitle>
            <CardDescription>Insurance cards, consents, and supporting files.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {patient.documents.map((document) => (
              <div
                key={document}
                className="flex items-center justify-between rounded-[24px] border border-border/60 bg-background/80 p-4"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl bg-primary/10 p-3 text-primary">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">{document}</p>
                    <p className="text-sm text-muted-foreground">Stored in Supabase bucket</p>
                  </div>
                </div>
                <Badge variant="success">Available</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Patient history</CardTitle>
            <CardDescription>Recent financial and operational events.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {patient.history.map((item) => (
              <div key={item} className="rounded-[24px] border border-border/60 bg-secondary/40 p-4">
                {item}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
