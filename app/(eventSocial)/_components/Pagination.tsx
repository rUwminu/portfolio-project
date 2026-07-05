"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PageMeta } from "../_lib/types";

interface PaginationProps {
  meta: PageMeta;
  onPageChange: (page: number) => void;
}

/** Window of up to 5 page numbers centered on the current page. */
const pageWindow = (page: number, totalPages: number): number[] => {
  const start = Math.max(1, Math.min(page - 2, totalPages - 4));
  const end = Math.min(totalPages, start + 4);
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

const Pagination = ({ meta, onPageChange }: PaginationProps) => {
  const { page, totalPages, total } = meta;
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between gap-2 pt-2">
      <p className="text-xs text-muted-foreground">
        {total} event{total === 1 ? "" : "s"}
      </p>
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon-sm"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          aria-label="Previous page"
        >
          <ChevronLeft />
        </Button>
        {pageWindow(page, totalPages).map((p) => (
          <Button
            key={p}
            variant={p === page ? "secondary" : "ghost"}
            size="icon-sm"
            onClick={() => onPageChange(p)}
          >
            {p}
          </Button>
        ))}
        <Button
          variant="ghost"
          size="icon-sm"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
          aria-label="Next page"
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
