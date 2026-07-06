"use client";

import { formatDateTime, useIsClient } from "../_lib/hooks";

interface LocalDateTimeProps {
  iso: string;
}

/**
 * `toLocaleString` resolves to the runtime's locale/timezone, so the server
 * (UTC on Render) and the visitor's browser can render different text for
 * the same instant. Rendering `null` until past hydration keeps the first
 * render identical on both sides.
 */
const LocalDateTime = ({ iso }: LocalDateTimeProps) => {
  const isClient = useIsClient();
  return <span>{isClient ? formatDateTime(iso) : null}</span>;
};

export default LocalDateTime;
