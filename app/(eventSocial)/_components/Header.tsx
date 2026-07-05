"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "../_context/AuthContext";
import NotificationBell from "./NotificationBell";
import UserAvatar from "./UserAvatar";

const Header = () => {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleSignOut = async () => {
    setMenuOpen(false);
    await signOut();
    router.replace("/eventsocial/login");
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-6 px-4">
        <Link href="/eventsocial" className="text-lg font-bold tracking-tight">
          EventSocial
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <Link
            href="/eventsocial/events"
            className={cn(
              "text-muted-foreground transition-colors hover:text-foreground",
              pathname === "/eventsocial/events" &&
                "font-medium text-foreground",
            )}
          >
            Events
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <Button asChild size="sm" className="gradient-cta">
            <Link href="/eventsocial/events/create">
              <Plus data-icon="inline-start" />
              Create event
            </Link>
          </Button>

          {user && <NotificationBell />}

          {user && (
            <div className="relative">
              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Account menu"
              >
                <UserAvatar name={user.name} className="size-9" />
              </button>

              {menuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setMenuOpen(false)}
                  />
                  <div className="absolute right-0 z-50 mt-2 w-56 rounded-lg  bg-white p-1 shadow-lg">
                    <div className="border-b border-zinc-400 px-3 py-2">
                      <p className="truncate text-sm font-medium">
                        {user.name}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {user.email}
                      </p>
                      {user.role === "ADMIN" && (
                        <p className="mt-1 text-xs font-medium text-destructive">
                          Admin
                        </p>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="mt-1 w-full rounded-md px-3 py-2 text-left text-sm hover:bg-muted"
                    >
                      Sign out
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
