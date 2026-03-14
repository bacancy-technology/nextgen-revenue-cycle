"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { EmptyState } from "@/components/empty-state";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TablePagination } from "@/components/tables/table-pagination";
import { formatCurrency, formatDate } from "@/lib/utils";

const PAGE_SIZE = 4;

export function PatientTable({ patients }) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filteredPatients = useMemo(() => {
    const value = query.toLowerCase();
    return patients.filter(
      (patient) =>
        patient.name.toLowerCase().includes(value) ||
        patient.payer.toLowerCase().includes(value) ||
        patient.provider.toLowerCase().includes(value)
    );
  }, [patients, query]);

  const totalPages = Math.max(1, Math.ceil(filteredPatients.length / PAGE_SIZE));
  const paginatedPatients = filteredPatients.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  if (!filteredPatients.length) {
    return (
      <div className="space-y-4">
        <div className="relative max-w-sm">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
            className="pl-10"
            placeholder="Search patients or payer..."
          />
        </div>
        <EmptyState
          title="No patients matched"
          description="Try another payer, provider, or patient name to refine the queue."
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative max-w-sm">
        <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setPage(1);
          }}
          className="pl-10"
          placeholder="Search patients or payer..."
        />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient</TableHead>
            <TableHead>Payer</TableHead>
            <TableHead>Provider</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Next appointment</TableHead>
            <TableHead className="text-right">Balance</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedPatients.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell>
                <Link href={`/patients/${patient.id}`} className="font-semibold hover:text-primary">
                  {patient.name}
                </Link>
                <p className="text-xs text-muted-foreground">{patient.mrn}</p>
              </TableCell>
              <TableCell>{patient.payer}</TableCell>
              <TableCell>{patient.provider}</TableCell>
              <TableCell>
                <Badge variant={patient.risk === "High" ? "warning" : "success"}>
                  {patient.status}
                </Badge>
              </TableCell>
              <TableCell>{formatDate(patient.nextAppointment)}</TableCell>
              <TableCell className="text-right font-medium">
                {formatCurrency(patient.balance)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        page={page}
        totalPages={totalPages}
        onPrevious={() => setPage((current) => Math.max(1, current - 1))}
        onNext={() => setPage((current) => Math.min(totalPages, current + 1))}
      />
    </div>
  );
}
