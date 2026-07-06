"use client";

import Link from "next/link";
import { CalendarDays, ExternalLink, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { EventItem, Paginated } from "../_lib/types";
import LocalDateTime from "./LocalDateTime";
import Pagination from "./Pagination";

export const SORT_OPTIONS = [
  { value: "createdAt:desc", label: "Newest created" },
  { value: "createdAt:asc", label: "Oldest created" },
  { value: "startDate:asc", label: "Start date — earliest" },
  { value: "startDate:desc", label: "Start date — latest" },
] as const;

export type SortValue = (typeof SORT_OPTIONS)[number]["value"];

interface EventListPanelProps {
  search: string;
  onSearchChange: (value: string) => void;
  sort: SortValue;
  onSortChange: (value: SortValue) => void;
  data: Paginated<EventItem> | null;
  loading: boolean;
  selectedId: string | null;
  onSelect: (id: string) => void;
  onPageChange: (page: number) => void;
}

export const eventStatusBadges = (event: EventItem) => (
  <>
    {event.isBanned && <Badge variant="destructive">Banned</Badge>}
    {!event.isActive && !event.isBanned && (
      <Badge variant="destructive">Closed</Badge>
    )}
    {event.joinPolicy === "INVITE_ONLY" && (
      <Badge variant="primary">Invite only</Badge>
    )}
  </>
);

const EventListPanel = ({
  search,
  onSearchChange,
  sort,
  onSortChange,
  data,
  loading,
  selectedId,
  onSelect,
  onPageChange,
}: EventListPanelProps) => {
  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex gap-2 ">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Filter events by name…"
            className="pl-8"
          />
        </div>

        <Select
          value={sort}
          onValueChange={(v) => onSortChange(v as SortValue)}
        >
          <SelectTrigger className="w-44 shrink-0 bg-zinc-100 border-0 hover:bg-zinc-300 cursor-pointer">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white ring-0 border-0 shadow-2xl">
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-1">
        {loading && !data && (
          <p className="py-8 text-center text-sm text-muted-foreground">
            Loading events…
          </p>
        )}

        {data && data.items.length === 0 && (
          <p className="py-8 text-center text-sm text-muted-foreground">
            No events found{search ? ` for “${search}”` : ""}.
          </p>
        )}

        {data?.items.map((event) => (
          <button
            key={event.id}
            type="button"
            onClick={() => onSelect(event.id)}
            className={cn(
              "group w-full rounded-lg p-3 text-left border border-zinc-400 hover:border-violet-400",
              selectedId === event.id &&
                "border-3 border-violet-600 bg-muted/60",
            )}
          >
            <div className="flex items-start justify-between gap-2">
              <p className="truncate font-medium">{event.name}</p>
              <Link
                href={`/eventsocial/events/${event.id}`}
                onClick={(e) => e.stopPropagation()}
                className="shrink-0 rounded p-0.5 text-muted-foreground opacity-0 transition-opacity hover:text-foreground group-hover:opacity-100"
                aria-label="Open event page"
              >
                <ExternalLink className="size-3.5" />
              </Link>
            </div>
            {event.description && (
              <p className="mt-0.5 line-clamp-2 text-sm text-muted-foreground">
                {event.description}
              </p>
            )}
            <div className="mt-2 flex flex-wrap items-center gap-1.5">
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <CalendarDays className="size-3.5" />
                <LocalDateTime iso={event.startDate} />
              </span>
              {eventStatusBadges(event)}
            </div>
          </button>
        ))}
      </div>

      {data && <Pagination meta={data.meta} onPageChange={onPageChange} />}
    </div>
  );
};

export default EventListPanel;
