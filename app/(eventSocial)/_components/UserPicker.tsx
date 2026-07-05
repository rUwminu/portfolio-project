"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { X, CircleCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ApiError } from "../_lib/api";
import { searchUsers } from "../_lib/event-api";
import { useDebouncedValue } from "../_lib/hooks";
import type { UserSearchResult } from "../_lib/types";
import UserAvatar from "./UserAvatar";

/** Minimal user shape a tag needs — edit mode seeds these from event invites. */
export interface PickerUser {
  id: string;
  name: string;
  email?: string;
  isRemoveable: boolean;
}

interface UserPickerProps {
  value: PickerUser[];
  onChange: (users: PickerUser[]) => void;
  placeholder?: string;
}

/** Gmail-style recipient input: type to search users, picked ones render as tags. */
const UserPicker = ({ value, onChange, placeholder }: UserPickerProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<UserSearchResult[]>([]);
  const [open, setOpen] = useState(false);
  const [completedQuery, setCompletedQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 300);
  const containerRef = useRef<HTMLDivElement>(null);

  // A search is in flight until its query has been marked completed.
  const searching =
    debouncedQuery.trim() !== "" && debouncedQuery.trim() !== completedQuery;

  useEffect(() => {
    const q = debouncedQuery.trim();
    if (!q) return;

    const controller = new AbortController();
    searchUsers(q, controller.signal)
      .then((users) => {
        setResults(users);
        setOpen(true);
        setCompletedQuery(q);
      })
      .catch((err) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        if (err instanceof ApiError) toast.error(err.message);
        setCompletedQuery(q);
      });

    return () => controller.abort();
  }, [debouncedQuery]);

  // Close the dropdown on outside click.
  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  const handleQueryChange = (next: string) => {
    setQuery(next);
    if (!next.trim()) {
      setResults([]);
      setOpen(false);
    }
  };

  const selectedIds = new Set(value.map((u) => u.id));
  const options = results.filter((u) => !selectedIds.has(u.id));

  const addUser = (user: UserSearchResult) => {
    onChange([
      ...value,
      { id: user.id, name: user.name, email: user.email, isRemoveable: true },
    ]);
    setQuery("");
    setResults([]);
    setOpen(false);
  };

  const removeUser = (id: string) => onChange(value.filter((u) => u.id !== id));

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && query === "" && value.length > 0) {
      removeUser(value[value.length - 1].id);
    }
    if (e.key === "Escape") setOpen(false);
    if (e.key === "Enter") {
      e.preventDefault();
      if (open && options.length > 0) addUser(options[0]);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="flex min-h-9 flex-wrap items-center gap-1.5 rounded-lg border border-zinc-400 bg-transparent px-2 py-1.5 ">
        {value.map((user) => (
          <span
            key={user.id}
            className={cn(
              "flex items-center gap-1.5 rounded-full border border-zinc-400 p-1 pr-2 text-xs",
              !user.isRemoveable && "opacity-70",
            )}
          >
            <UserAvatar name={user.name} className="size-5 text-[10px]" />
            <span className="max-w-40 truncate font-medium">{user.name}</span>
            {user.isRemoveable ? (
              <button
                type="button"
                onClick={() => removeUser(user.id)}
                className="rounded-full p-0.5 text-muted-foreground hover:bg-background hover:text-foreground"
                aria-label={`Remove ${user.name}`}
              >
                <X className="size-3" />
              </button>
            ) : (
              <CircleCheck className="size-4 text-teal-600" />
            )}
          </span>
        ))}
        <Input
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => results.length > 0 && setOpen(true)}
          placeholder={
            value.length === 0 ? (placeholder ?? "Search users to invite…") : ""
          }
          className="h-6 min-w-32 flex-1 border-0 bg-transparent px-1 shadow-none focus-visible:ring-0 dark:bg-transparent"
        />
      </div>

      {open && (
        <div className="absolute z-30 mt-1 w-full overflow-hidden rounded-lg bg-white shadow-lg">
          {options.length === 0 ? (
            <p className="px-3 py-2 text-sm text-muted-foreground">
              {searching ? "Searching…" : "No users found"}
            </p>
          ) : (
            options.map((user) => (
              <button
                key={user.id}
                type="button"
                onClick={() => addUser(user)}
                className="flex w-full items-center gap-2 px-3 py-2 text-left hover:bg-muted "
              >
                <UserAvatar name={user.name} />
                <span className="min-w-0">
                  <span className="block truncate text-sm font-medium">
                    {user.name}
                  </span>
                  <span className="block truncate text-xs text-muted-foreground">
                    {user.email}
                  </span>
                </span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default UserPicker;
