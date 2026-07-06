"use client";

import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Bell, Check, X } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ApiError } from "../_lib/api";
import { respondToInvite } from "../_lib/event-api";
import {
  listNotifications,
  markAllNotificationsRead,
} from "../_lib/notification-api";
import { useUnreadNotificationCount } from "../_lib/notification-socket";
import type { InviteStatus, NotificationItem } from "../_lib/types";
import LocalDateTime from "./LocalDateTime";
import UserAvatar from "./UserAvatar";

const PAGE_SIZE = 10;
const SCROLL_LOAD_THRESHOLD = 48;

type RespondableStatus = Extract<InviteStatus, "ACCEPTED" | "DECLINED">;

const notificationText = (n: NotificationItem): string =>
  n.type === "INVITE"
    ? `${n.actor.name} invited you to “${n.event.name}”`
    : `${n.actor.name} ${n.status === "ACCEPTED" ? "accepted" : "declined"} your invite to “${n.event.name}”`;

const NotificationBell = () => {
  const router = useRouter();
  const { unreadCount, setUnreadCount } = useUnreadNotificationCount(true);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<NotificationItem[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [respondingId, setRespondingId] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const loadPage = useCallback(async (nextPage: number) => {
    setLoading(true);
    try {
      const data = await listNotifications(nextPage, PAGE_SIZE);

      setItems((prev) =>
        nextPage === 1 ? data.items : [...prev, ...data.items],
      );
      setPage(data.meta.page);
      setTotalPages(data.meta.totalPages);
    } catch {
      toast.error("Failed to load notifications.");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleToggle = () => {
    const next = !open;
    setOpen(next);
    if (next) {
      void loadPage(1);
    }
  };

  const handleScroll = () => {
    const el = listRef.current;
    if (!el || loading || page >= totalPages) return;
    if (
      el.scrollHeight - el.scrollTop - el.clientHeight <
      SCROLL_LOAD_THRESHOLD
    ) {
      void loadPage(page + 1);
    }
  };

  const handleReadAll = async () => {
    try {
      const { unreadCount: next } = await markAllNotificationsRead();
      setUnreadCount(next);
      setItems((prev) =>
        prev.map((n) => ({ ...n, isRead: true, isNew: false })),
      );
    } catch {
      toast.error("Failed to mark notifications as read.");
    }
  };

  const handleRespond = async (
    n: NotificationItem,
    status: RespondableStatus,
  ) => {
    setRespondingId(n.id);
    try {
      await respondToInvite(n.event.id, status);
      setItems((prev) =>
        prev.map((x) => (x.id === n.id ? { ...x, status } : x)),
      );
      toast.success(
        status === "ACCEPTED" ? "Invite accepted" : "Invite declined",
      );
    } catch (err) {
      toast.error(
        err instanceof ApiError ? err.message : "Failed to respond to invite.",
      );
    } finally {
      setRespondingId(null);
    }
  };

  const handleNotificationClick = (n: NotificationItem) => {
    setOpen(false);
    router.push(`/eventsocial/events/${n.event.id}`);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={handleToggle}
        className="relative flex size-9 items-center justify-center rounded-full bg-zinc-100 outline-none hover:bg-zinc-200 focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Notifications"
      >
        <Bell className="size-4.5" />
        {unreadCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-semibold text-white">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-50 mt-2 w-80 rounded-lg bg-white p-1 shadow-lg">
            <div className="flex items-center justify-between border-b border-zinc-400 px-3 py-2">
              <p className="text-sm font-medium">Notifications</p>
              <Button
                variant="link"
                size="xs"
                onClick={handleReadAll}
                disabled={unreadCount === 0}
              >
                Read all
              </Button>
            </div>

            <div
              ref={listRef}
              onScroll={handleScroll}
              className="max-h-96 overflow-y-auto"
            >
              {items.length === 0 && !loading && (
                <p className="px-3 py-6 text-center text-sm text-muted-foreground">
                  No notifications yet.
                </p>
              )}

              {items.map((n) => {
                const respondedStatus = n.status;
                return (
                  <div
                    key={n.id}
                    onClick={() => handleNotificationClick(n)}
                    className={cn(
                      "flex cursor-pointer gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted",
                      n.isNew && "bg-violet-50",
                    )}
                  >
                    <UserAvatar
                      name={n.actor.name}
                      className="mt-0.5 size-7 shrink-0 text-[10px]"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="leading-snug">{notificationText(n)}</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        <LocalDateTime iso={n.createdAt} />
                      </p>

                      {n.type === "INVITE" &&
                        (respondedStatus ? (
                          <div className="flex items-center gap-2">
                            {n.event.isBanned && (
                              <Badge variant="destructive" className="mt-1.5">
                                Banned
                              </Badge>
                            )}

                            <Badge
                              variant={
                                respondedStatus === "ACCEPTED"
                                  ? "default"
                                  : "destructive"
                              }
                              className="mt-1.5"
                            >
                              {respondedStatus === "ACCEPTED"
                                ? "Accepted"
                                : "Declined"}
                            </Badge>
                          </div>
                        ) : !n.event.isBanned ? (
                          <div
                            className="mt-1.5 flex gap-1.5"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Button
                              size="xs"
                              variant="secondary"
                              disabled={respondingId === n.id}
                              onClick={() => handleRespond(n, "ACCEPTED")}
                            >
                              <Check data-icon="inline-start" />
                              Accept
                            </Button>
                            <Button
                              size="xs"
                              variant="destructive"
                              disabled={respondingId === n.id}
                              onClick={() => handleRespond(n, "DECLINED")}
                            >
                              <X data-icon="inline-start" />
                              Decline
                            </Button>
                          </div>
                        ) : (
                          <Badge variant="destructive" className="mt-1.5">
                            Banned
                          </Badge>
                        ))}
                    </div>
                  </div>
                );
              })}

              {loading && (
                <p className="py-3 text-center text-xs text-muted-foreground">
                  Loading…
                </p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationBell;
