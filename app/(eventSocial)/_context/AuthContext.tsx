"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getSession, signOut as signOutRequest } from "../_lib/auth-api";
import { useIsClient } from "../_lib/hooks";
import { clearSession, getStoredUser, getToken } from "../_lib/token";
import type { SessionUser } from "../_lib/types";

interface AuthContextValue {
  user: SessionUser | null;
  /** True only while a first-time (no cached user) session check is in flight. */
  loading: boolean;
  /** Call right after signIn/signUp resolves — updates context from the response directly, no extra round-trip. */
  applySession: (user: SessionUser) => void;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Hydrate synchronously from storage so a reload doesn't spin on the
  // get-session round-trip before rendering anything. The storage read
  // only happens on the client, so exposed values are gated by isClient
  // below — the server (and hydration-matching client render) always see
  // user: null / loading: false, avoiding a hydration mismatch.
  const isClient = useIsClient();
  const [user, setUser] = useState<SessionUser | null>(() => getStoredUser());
  const [loading, setLoading] = useState(() => getToken() !== null && getStoredUser() === null);

  // Silently re-validates against the server in the background. A cached
  // user is kept on network failure; it's only cleared when the server
  // explicitly says the session is gone.
  useEffect(() => {
    if (!getToken()) {
      setLoading(false);
      return;
    }
    let active = true;
    getSession()
      .then((session) => {
        if (!active) return;
        if (session?.user) {
          setUser(session.user);
        } else {
          clearSession();
          setUser(null);
        }
      })
      .catch(() => {
        // Network hiccup — keep the optimistic cached user logged in.
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  const applySession = useCallback((sessionUser: SessionUser) => {
    setUser(sessionUser);
  }, []);

  const signOut = useCallback(async () => {
    try {
      await signOutRequest();
    } finally {
      setUser(null);
    }
  }, []);

  const value = useMemo(
    () => ({
      user: isClient ? user : null,
      loading: isClient && loading,
      applySession,
      signOut,
    }),
    [isClient, user, loading, applySession, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
