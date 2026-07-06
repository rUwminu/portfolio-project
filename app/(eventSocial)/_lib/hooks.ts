"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * True once past hydration, false during SSR and the hydration-matching
 * client render. Use this to gate any client-only data (localStorage,
 * `window`, locale-dependent formatting) so the first render always matches
 * the server, avoiding hydration mismatches — the real value is swapped in
 * on the next render with no setState-in-effect involved.
 */
export const useIsClient = (): boolean =>
  useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

export const useDebouncedValue = <T>(value: T, delayMs = 350): T => {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(timer);
  }, [value, delayMs]);

  return debounced;
};

export const formatDateTime = (iso: string): string =>
  new Date(iso).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });

/** ISO string → value accepted by <input type="datetime-local"> (local time). */
export const toDateTimeLocal = (iso: string): string => {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
};
