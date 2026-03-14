"use client";

import { useMemo, useState } from "react";
import { Filter, Search } from "lucide-react";
import { EmptyState } from "@/components/empty-state";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TablePagination } from "@/components/tables/table-pagination";
import { formatCurrency } from "@/lib/utils";

const PAGE_SIZE = 4;

function statusVariant(status) {
  if (status === "Denied") {
    return "danger";
  }

  if (status === "Appeal in review" || status === "Patient balance") {
    return "warning";
  }

  return "success";
}

export function ClaimsTable({ claims }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);

  const filteredClaims = useMemo(() => {
    return claims.filter((claim) => {
      const matchesQuery =
        claim.patient.toLowerCase().includes(query.toLowerCase()) ||
        claim.payer.toLowerCase().includes(query.toLowerCase()) ||
        claim.id.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = status === "all" ? true : claim.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [claims, query, status]);

  const totalPages = Math.max(1, Math.ceil(filteredClaims.length / PAGE_SIZE));
  const paginatedClaims = filteredClaims.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  if (!filteredClaims.length) {
    return (
      <EmptyState
        title="No claims found"
        description="Adjust filters to explore another payer, patient, or claim status."
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
            className="pl-10"
            placeholder="Search claim, patient, payer..."
          />
        </div>
        <div className="flex items-center gap-3">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <Select
            value={status}
            onValueChange={(value) => {
              setStatus(value);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="Submitted">Submitted</SelectItem>
              <SelectItem value="Denied">Denied</SelectItem>
              <SelectItem value="Accepted">Accepted</SelectItem>
              <SelectItem value="Appeal in review">Appeal in review</SelectItem>
              <SelectItem value="Patient balance">Patient balance</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Claim</TableHead>
            <TableHead>Payer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Owner</TableHead>
            <TableHead>Age</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedClaims.map((claim) => (
            <TableRow key={claim.id}>
              <TableCell>
                <p className="font-semibold">{claim.id}</p>
                <p className="text-xs text-muted-foreground">{claim.patient}</p>
              </TableCell>
              <TableCell>
                <p>{claim.payer}</p>
                <p className="text-xs text-muted-foreground">
                  {claim.denialReason || "No denial reason"}
                </p>
              </TableCell>
              <TableCell>
                <Badge variant={statusVariant(claim.status)}>{claim.status}</Badge>
              </TableCell>
              <TableCell>{claim.assignedTo}</TableCell>
              <TableCell>{claim.age}</TableCell>
              <TableCell className="text-right font-medium">
                {formatCurrency(claim.amount)}
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
