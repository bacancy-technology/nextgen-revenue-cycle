import { FilePlus2, ShieldAlert } from "lucide-react";
import { PatientForm } from "@/components/forms/patient-form";
import { SectionHeader } from "@/components/dashboard/section-header";
import { PatientTable } from "@/components/tables/patient-table";
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
import { getPatients } from "@/services/patientService";

export default async function PatientsPage() {
  const patientResult = await getPatients();

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <SectionHeader
          eyebrow="Patient management"
          title="Registration, demographics, payer details, and document readiness."
          description="Keep intake, insurance verification, and financial follow-up visible in one patient command table."
          badge={patientResult.source === "demo" ? "Demo dataset" : "Live Supabase data"}
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <FilePlus2 className="mr-2 h-4 w-4" />
              New patient
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Patient registration</DialogTitle>
              <DialogDescription>
                Capture intake essentials and wire the submit action to Supabase inserts.
              </DialogDescription>
            </DialogHeader>
            <PatientForm />
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Patient roster</CardTitle>
          <CardDescription>Search across active accounts, balances, and care readiness.</CardDescription>
        </CardHeader>
        <CardContent>
          <PatientTable patients={patientResult.data} />
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>High-priority follow-up</CardTitle>
            <CardDescription>Patients needing documents, authorization, or collections outreach.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-3">
            {patientResult.data.slice(0, 3).map((patient) => (
              <div key={patient.id} className="rounded-[24px] border border-border/60 bg-secondary/40 p-4">
                <p className="font-semibold">{patient.name}</p>
                <p className="mt-2 text-sm text-muted-foreground">{patient.status}</p>
                <p className="mt-4 text-sm">
                  <span className="font-medium">Documents:</span> {patient.documents.join(", ")}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Portal readiness</CardTitle>
            <CardDescription>Patients with secure self-service enabled.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="rounded-[24px] border border-emerald-500/20 bg-emerald-500/10 p-4">
              <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
                84% of active patients have portal invitations delivered.
              </p>
            </div>
            <div className="rounded-[24px] border border-amber-500/20 bg-amber-500/10 p-4">
              <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
                <ShieldAlert className="h-4 w-4" />
                <p className="text-sm font-medium">12 accounts still need document consent acknowledgement.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
