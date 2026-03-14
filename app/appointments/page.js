import { BellRing, CalendarRange, Clock3 } from "lucide-react";
import { SectionHeader } from "@/components/dashboard/section-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { appointments } from "@/lib/mock-data";

export default function AppointmentsPage() {
  return (
    <div className="space-y-8">
      <SectionHeader
        eyebrow="Appointment scheduling"
        title="Keep providers full and every visit financially ready."
        description="Use a clean calendar-style workflow for reminders, waitlists, and appointment readiness across locations."
        badge="Scheduling + reminders"
      />

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>Today&apos;s schedule</CardTitle>
            <CardDescription>Priority appointments across practice locations.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="flex flex-col gap-4 rounded-[24px] border border-border/60 bg-background/80 p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-semibold">{appointment.patient}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {appointment.provider} · {appointment.type} · {appointment.location}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={appointment.status === "Confirmed" ? "success" : "warning"}>
                    {appointment.status}
                  </Badge>
                  <div className="rounded-2xl bg-secondary px-4 py-2 text-sm font-medium">
                    {appointment.time}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="grid gap-6">
          <Card>
            <CardContent className="flex items-start gap-4 p-6">
              <div className="rounded-3xl bg-primary/10 p-3 text-primary">
                <BellRing className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold">Reminder automation</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  18 SMS reminders and 6 voice reminders are queued for tomorrow&apos;s visits.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-start gap-4 p-6">
              <div className="rounded-3xl bg-primary/10 p-3 text-primary">
                <Clock3 className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold">Waitlist management</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Four patients are eligible for immediate fill if a provider cancellation occurs.
                </p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="flex items-start gap-4 p-6">
              <div className="rounded-3xl bg-primary/10 p-3 text-primary">
                <CalendarRange className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold">Provider capacity</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Dr. Shah is at 92% utilization while virtual sessions have 5 open slots.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
