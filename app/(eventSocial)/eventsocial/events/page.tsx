"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { ApiError } from "../../_lib/api";
import { listEvents } from "../../_lib/event-api";
import { useDebouncedValue } from "../../_lib/hooks";
import type {
  EventItem,
  EventSortBy,
  Paginated,
  SortOrder,
} from "../../_lib/types";
import EventDetailCard from "../../_components/EventDetailCard";
import EventListPanel, {
  type SortValue,
} from "../../_components/EventListPanel";

const EventsHomePage = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortValue>("createdAt:desc");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<Paginated<EventItem> | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const debouncedSearch = useDebouncedValue(search);

  // Filter/sort changes restart from page 1.
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleSortChange = (value: SortValue) => {
    setSort(value);
    setPage(1);
  };

  useEffect(() => {
    const [sortBy, sortOrder] = sort.split(":") as [EventSortBy, SortOrder];
    const controller = new AbortController();

    listEvents(
      {
        page,
        limit: 10,
        search: debouncedSearch.trim() || undefined,
        sortBy,
        sortOrder,
      },
      controller.signal,
    )
      .then((result) => {
        setData(result);
        // Only auto-select on the very first load; afterwards the selection
        // stays put while pagination/filter/sort change the list around it.
        setSelectedId((prev) => prev ?? result.items[0]?.id ?? null);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        toast.error(
          err instanceof ApiError ? err.message : "Failed to load events.",
        );
        setLoading(false);
      });

    return () => controller.abort();
  }, [page, debouncedSearch, sort, refreshKey]);

  const refreshList = useCallback(() => setRefreshKey((k) => k + 1), []);

  return (
    <main className="mx-auto grid h-[calc(100svh-4rem)] max-w-6xl grid-cols-1 gap-4 p-4 lg:grid-cols-[minmax(20rem,26rem)_1fr]">
      <EventListPanel
        search={search}
        onSearchChange={handleSearchChange}
        sort={sort}
        onSortChange={handleSortChange}
        data={data}
        loading={loading}
        selectedId={selectedId}
        onSelect={setSelectedId}
        onPageChange={setPage}
      />
      <div className="hidden min-h-0 lg:block">
        <EventDetailCard eventId={selectedId} compact onChanged={refreshList} />
      </div>
    </main>
  );
};

export default EventsHomePage;
