import { apiFetch } from "./api";
import { clearSession, saveSession } from "./token";
import type { Session, SessionUser } from "./types";

const AUTH_BASE = "/api/auth";

export interface SignUpInput {
  name: string;
  email: string;
  password: string;
}

export interface SignInInput {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: SessionUser;
}

/** Signs the user up and in, storing the returned bearer token + user. */
export const signUp = async (input: SignUpInput) => {
  const res = await apiFetch<AuthResponse>(`${AUTH_BASE}/sign-up/email`, {
    method: "POST",
    body: input,
  });
  saveSession(res.token, res.user);
  return res;
};

/** Signs the user in, storing the returned bearer token + user. */
export const signIn = async (input: SignInInput) => {
  const res = await apiFetch<AuthResponse>(`${AUTH_BASE}/sign-in/email`, {
    method: "POST",
    body: input,
  });
  saveSession(res.token, res.user);
  return res;
};

export const signOut = async () => {
  try {
    return await apiFetch<{ success: boolean }>(`${AUTH_BASE}/sign-out`, {
      method: "POST",
      body: {},
    });
  } finally {
    clearSession();
  }
};

/** Returns null when there is no active session. */
export const getSession = () =>
  apiFetch<Session | null>(`${AUTH_BASE}/get-session`);
