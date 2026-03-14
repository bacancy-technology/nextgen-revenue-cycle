"use client";

import { Button } from "@/components/ui/button";

export function TablePagination({ page, totalPages, onPrevious, onNext }) {
  return (
    <div className="flex items-center justify-between gap-3 border-t border-border/60 pt-4">
      <p className="text-sm text-muted-foreground">
        Page {page} of {totalPages}
      </p>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" onClick={onPrevious} disabled={page === 1}>
          Previous
        </Button>
        <Button variant="outline" size="sm" onClick={onNext} disabled={page === totalPages}>
          Next
        </Button>
      </div>
    </div>
  );
}
