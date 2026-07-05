"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ApiError } from "../../_lib/api";
import { signIn, signUp } from "../../_lib/auth-api";
import { useAuth } from "../../_context/AuthContext";
import BlobBackground from "../../_components/BlobBackground";

type Mode = "login" | "signup";

const LoginPage = () => {
  const router = useRouter();
  const { user, loading, applySession } = useAuth();
  const [mode, setMode] = useState<Mode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Already signed in → straight to the app.
  useEffect(() => {
    if (!loading && user) router.replace("/eventsocial/events");
  }, [loading, user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res =
        mode === "signup"
          ? await signUp({ name: name.trim(), email: email.trim(), password })
          : await signIn({ email: email.trim(), password });
      if (mode === "signup") toast.success("Account created — welcome!");
      applySession(res.user);
      router.replace("/eventsocial/events");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Something went wrong.");
      setSubmitting(false);
    }
  };

  const switchMode = (next: Mode) => {
    setMode(next);
    setError(null);
  };

  return (
    <main className="relative flex min-h-svh items-center justify-center bg-muted/30 p-4">
      <BlobBackground />
      <div className="relative w-full max-w-sm rounded-xl bg-background/70 p-6 shadow-xl shadow-black/10 backdrop-blur dark:ring-1 dark:ring-white/10">
        <h1 className="text-center text-2xl font-bold tracking-tight">
          EventSocial
        </h1>
        <p className="mt-1 text-center text-sm text-muted-foreground">
          Create events, invite people, join in.
        </p>

        <div className="relative mt-5 grid grid-cols-2 rounded-lg bg-muted/60 p-1 text-sm">
          {/* highlight pill that slides to the active tab */}
          <span
            aria-hidden
            className={cn(
              "absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-md gradient-cta transition-transform duration-300 ease-out",
              mode === "signup" && "translate-x-full",
            )}
          />
          {(["login", "signup"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => switchMode(m)}
              className={cn(
                "relative rounded-md py-1.5 capitalize transition-colors duration-300",
                mode === m
                  ? "font-medium text-white"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {m === "login" ? "Login" : "Sign up"}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {mode === "signup" && (
            <div className="space-y-1.5">
              <Label htmlFor="auth-name">Name</Label>
              <Input
                id="auth-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
              />
            </div>
          )}

          <div className="space-y-1.5">
            <Label htmlFor="auth-email">Email</Label>
            <Input
              id="auth-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="auth-password">Password</Label>
            <Input
              id="auth-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={
                mode === "signup" ? "At least 8 characters" : "Your password"
              }
              required
              minLength={8}
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button
            size="lg"
            type="submit"
            className="w-full gradient-cta shadow-lg shadow-violet-500/25"
            disabled={submitting}
          >
            {submitting
              ? "Please wait…"
              : mode === "login"
                ? "Login"
                : "Create account"}
          </Button>
        </form>
      </div>
    </main>
  );
};

export default LoginPage;
