import { apiFetch } from "./api";
import type { NotificationPaginated } from "./types";

const NOTIFICATION_BASE = "/api/notifications";

export const listNotifications = (
  page: number,
  limit = 10,
  signal?: AbortSignal,
) =>
  apiFetch<NotificationPaginated>(NOTIFICATION_BASE, {
    query: { page, limit },
    signal,
  });

export const getUnreadNotificationCount = () =>
  apiFetch<{ count: number }>(`${NOTIFICATION_BASE}/unread-count`);

export const markAllNotificationsRead = () =>
  apiFetch<{ unreadCount: number }>(`${NOTIFICATION_BASE}/read-all`, {
    method: "PATCH",
  });
