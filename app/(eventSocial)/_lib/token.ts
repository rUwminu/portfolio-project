/**
 * Bearer token + user storage. better-auth normally authenticates via a
 * session cookie, but this frontend avoids depending on cookies (users
 * frequently block/reject them), so instead we store the token and user from
 * the sign-in/sign-up response body ourselves. Storing the user alongside the
 * token lets the app hydrate synchronously on reload instead of blocking on a
 * `get-session` round-trip.
 */

import type { SessionUser } from "./types";

const TOKEN_KEY = "eventsocial_token";
const USER_KEY = "eventsocial_user";

export const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(TOKEN_KEY);
};

export const getStoredUser = (): SessionUser | null => {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SessionUser;
  } catch {
    return null;
  }
};

/** Persists the token + user together after a successful sign-in/sign-up. */
export const saveSession = (token: string, user: SessionUser): void => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(TOKEN_KEY, token);
  window.localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const clearSession = (): void => {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(USER_KEY);
};
