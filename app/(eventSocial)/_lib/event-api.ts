import { apiFetch } from "./api";
import type {
  EventDetail,
  EventInvite,
  EventItem,
  EventPayload,
  InviteStatus,
  ListEventsQuery,
  Paginated,
  UserSearchResult,
} from "./types";

const EVENT_BASE = "/api/event";

export const listEvents = (query: ListEventsQuery = {}, signal?: AbortSignal) =>
  apiFetch<Paginated<EventItem>>(EVENT_BASE, { query: { ...query }, signal });

export const getEvent = (id: string, signal?: AbortSignal) =>
  apiFetch<EventDetail>(`${EVENT_BASE}/${id}`, { signal });

export const createEvent = (payload: EventPayload) =>
  apiFetch<EventItem>(EVENT_BASE, { method: "POST", body: payload });

export const updateEvent = (id: string, payload: Partial<EventPayload>) =>
  apiFetch<EventItem>(`${EVENT_BASE}/${id}`, { method: "PATCH", body: payload });

export const deleteEvent = (id: string) =>
  apiFetch<EventItem>(`${EVENT_BASE}/${id}`, { method: "DELETE" });

export const joinEvent = (id: string) =>
  apiFetch<unknown>(`${EVENT_BASE}/${id}/join`, { method: "POST" });

/** Replaces the full invite list (server diffs against current invites). */
export const replaceInvites = (id: string, userIds: string[]) =>
  apiFetch<unknown>(`${EVENT_BASE}/${id}/invites`, {
    method: "PUT",
    body: { userIds },
  });

export const respondToInvite = (id: string, status: Exclude<InviteStatus, "PENDING">) =>
  apiFetch<EventInvite>(`${EVENT_BASE}/${id}/invite/respond`, {
    method: "PATCH",
    body: { status },
  });

export const banEvent = (id: string, reason: string) =>
  apiFetch<EventItem>(`${EVENT_BASE}/${id}/ban`, {
    method: "POST",
    body: { reason },
  });

export const unbanEvent = (id: string, reason?: string) =>
  apiFetch<EventItem>(`${EVENT_BASE}/${id}/unban`, {
    method: "POST",
    body: reason ? { reason } : {},
  });

/** Used by the invite picker; returns up to 10 matches, excluding the caller. */
export const searchUsers = (q: string, signal?: AbortSignal) =>
  apiFetch<UserSearchResult[]>("/api/user/search", { query: { q }, signal });
