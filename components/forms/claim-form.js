"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const claimSchema = z.object({
  patient: z.string().min(2, "Patient name is required."),
  diagnosis: z.string().min(3, "Diagnosis code is required."),
  procedure: z.string().min(3, "Procedure code is required."),
  chargeAmount: z.coerce.number().min(1, "Charge amount must be greater than 0."),
  notes: z.string().optional(),
});

export function ClaimForm() {
  const [successMessage, setSuccessMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(claimSchema),
    defaultValues: {
      patient: "",
      diagnosis: "",
      procedure: "",
      chargeAmount: "",
      notes: "",
    },
  });

  return (
    <form
      className="grid gap-5"
      onSubmit={handleSubmit(() => {
        setSuccessMessage("Claim draft validated locally. Connect to Supabase claim insert for live submission.");
      })}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="patient">Patient</Label>
          <Input id="patient" placeholder="Olivia Bennett" {...register("patient")} />
          {errors.patient ? <p className="text-sm text-rose-600">{errors.patient.message}</p> : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="chargeAmount">Charge amount</Label>
          <Input id="chargeAmount" type="number" step="0.01" {...register("chargeAmount")} />
          {errors.chargeAmount ? (
            <p className="text-sm text-rose-600">{errors.chargeAmount.message}</p>
          ) : null}
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="diagnosis">Diagnosis code</Label>
          <Input id="diagnosis" placeholder="I10" {...register("diagnosis")} />
          {errors.diagnosis ? (
            <p className="text-sm text-rose-600">{errors.diagnosis.message}</p>
          ) : null}
        </div>
        <div className="space-y-2">
          <Label htmlFor="procedure">Procedure code</Label>
          <Input id="procedure" placeholder="99214" {...register("procedure")} />
          {errors.procedure ? (
            <p className="text-sm text-rose-600">{errors.procedure.message}</p>
          ) : null}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="notes">Claim notes</Label>
        <Textarea id="notes" placeholder="Include payer notes, modifiers, or appeal context." {...register("notes")} />
      </div>
      {successMessage ? <p className="text-sm text-emerald-600">{successMessage}</p> : null}
      <Button type="submit">Create claim draft</Button>
    </form>
  );
}
