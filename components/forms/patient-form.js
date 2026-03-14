"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const patientSchema = z.object({
  fullName: z.string().min(2, "Patient name is required."),
  dob: z.string().min(1, "Date of birth is required."),
  payer: z.string().min(1, "Select an insurance payer."),
  notes: z.string().optional(),
});

export function PatientForm() {
  const [successMessage, setSuccessMessage] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      fullName: "",
      dob: "",
      payer: "",
      notes: "",
    },
  });

  return (
    <form
      className="grid gap-5"
      onSubmit={handleSubmit(() => {
        setSuccessMessage("Patient intake saved locally. Connect to Supabase insert to persist.");
      })}
    >
      <div className="space-y-2">
        <Label htmlFor="fullName">Patient name</Label>
        <Input id="fullName" placeholder="Olivia Bennett" {...register("fullName")} />
        {errors.fullName ? (
          <p className="text-sm text-rose-600">{errors.fullName.message}</p>
        ) : null}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="dob">Date of birth</Label>
          <Input id="dob" type="date" {...register("dob")} />
          {errors.dob ? <p className="text-sm text-rose-600">{errors.dob.message}</p> : null}
        </div>
        <div className="space-y-2">
          <Label>Primary insurance</Label>
          <Select onValueChange={(value) => setValue("payer", value, { shouldValidate: true })}>
            <SelectTrigger>
              <SelectValue placeholder="Choose payer" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Blue Cross PPO">Blue Cross PPO</SelectItem>
              <SelectItem value="Medicare">Medicare</SelectItem>
              <SelectItem value="United Healthcare">United Healthcare</SelectItem>
              <SelectItem value="Self-pay">Self-pay</SelectItem>
            </SelectContent>
          </Select>
          {errors.payer ? (
            <p className="text-sm text-rose-600">{errors.payer.message}</p>
          ) : null}
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="notes">Clinical or billing notes</Label>
        <Textarea
          id="notes"
          placeholder="Add intake notes, prior auth reminders, or document requests."
          {...register("notes")}
        />
      </div>
      {successMessage ? <p className="text-sm text-emerald-600">{successMessage}</p> : null}
      <Button type="submit">Save patient intake</Button>
    </form>
  );
}
