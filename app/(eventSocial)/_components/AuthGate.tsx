"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../_context/AuthContext";

/** Blocks rendering until the session is known; bounces to login when absent. */
const AuthGate = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) router.replace("/eventsocial/login");
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="flex min-h-svh items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthGate;
