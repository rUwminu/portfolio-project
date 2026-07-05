"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { getToken } from "./token";
import { getUnreadNotificationCount } from "./notification-api";

const SOCKET_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "https://nest-general-api.onrender.com";

/**
 * Bootstraps the unread count via REST, then keeps it live over the
 * notification gateway's `user:<id>` room (see nest-general-api's
 * NotificationGateway). `setUnreadCount` is exposed so callers can apply
 * optimistic updates (e.g. after "mark all read") without waiting on the
 * socket round-trip.
 */
export const useUnreadNotificationCount = (enabled: boolean) => {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    let cancelled = false;
    getUnreadNotificationCount()
      .then(({ count }) => {
        if (!cancelled) setUnreadCount(count);
      })
      .catch(() => {});

    const token = getToken();
    if (!token) return () => { cancelled = true; };

    const socket = io(SOCKET_URL, {
      auth: { token },
      transports: ["websocket"],
    });

    socket.on("notification:unread-count", (payload: { count: number }) => {
      setUnreadCount(payload.count);
    });

    return () => {
      cancelled = true;
      socket.disconnect();
    };
  }, [enabled]);

  return { unreadCount, setUnreadCount };
};
