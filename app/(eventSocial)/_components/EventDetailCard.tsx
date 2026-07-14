"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  ExternalLink,
  Pencil,
  ShieldBan,
  ShieldCheck,
  Trash2,
  UserPlus,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ApiError } from "../_lib/api";
import {
  banEvent,
  deleteEvent,
  getEvent,
  joinEvent,
  unbanEvent,
} from "../_lib/event-api";
import type { EventDetail } from "../_lib/types";
import LocalDateTime from "./LocalDateTime";
import { useAuth } from "../_context/AuthContext";
import BanDialog from "./BanDialog";
import UserAvatar from "./UserAvatar";
import { eventStatusBadges } from "./EventListPanel";

interface EventDetailCardProps {
  eventId: string | null;
  /** Compact = right pane on the home page (adds an "open full page" link). */
  compact?: boolean;
  /** Called after join/ban/unban/delete so the parent can refresh its list. */
  onChanged?: () => void;
  wrapperClass?: string;
}

const loadErrorMessage = (err: unknown): string =>
  err instanceof ApiError && err.status === 404
    ? "This event no longer exists or is hidden from you."
    : err instanceof ApiError
      ? err.message
      : "Failed to load event.";

const EventDetailCard = ({
  eventId,
  compact,
  onChanged,
  wrapperClass,
}: EventDetailCardProps) => {
  const { user } = useAuth();
  const router = useRouter();
  const [fetched, setFetched] = useState<EventDetail | null>(null);
  const [fetchError, setFetchError] = useState<{
    id: string;
    message: string;
  } | null>(null);
  const [acting, setActing] = useState(false);
  const [banAction, setBanAction] = useState<"ban" | "unban" | null>(null);

  /** Used by the join/ban/delete handlers to refresh after a mutation. */
  const reload = useCallback(async (id: string) => {
    try {
      const detail = await getEvent(id);
      setFetched(detail);
      setFetchError(null);
    } catch (err) {
      setFetchError({ id, message: loadErrorMessage(err) });
    }
  }, []);

  useEffect(() => {
    if (!eventId) return;
    const controller = new AbortController();
    getEvent(eventId, controller.signal)
      .then((detail) => {
        setFetched(detail);
        setFetchError(null);
      })
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setFetchError({ id: eventId, message: loadErrorMessage(err) });
      });
    return () => controller.abort();
  }, [eventId]);

  // Ignore data and errors left over from a previously selected event.
  const current = fetched && fetched.id === eventId ? fetched : null;
  const error =
    fetchError && fetchError.id === eventId ? fetchError.message : null;

  if (!eventId) {
    return (
      <div className="flex h-full items-center justify-center rounded-xl  p-8 text-sm text-muted-foreground">
        Select an event to see its details.
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full items-center justify-center rounded-xl  p-8 text-sm text-muted-foreground">
        {error}
      </div>
    );
  }

  if (!current) {
    return (
      <div className="flex h-full items-center justify-center rounded-xl  p-8">
        <div className="size-6 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
      </div>
    );
  }

  const event = current;
  const isOwner = user?.id === event.authorId;
  const isAdmin = user?.role === "ADMIN";
  const isParticipant = event.joinedUsers.some((u) => u.id === user?.id);
  // Once a user joins they should drop off the pending-invites list.
  const pendingInvitees = event.invitedUsers.filter(
    (invitee) => !event.joinedUsers.some((joined) => joined.id === invitee.id),
  );
  const isJoinable = event.joinPolicy === "OPEN" ? true : event.isJoinable;

  // The API folds "already ended" into isActive, so one check covers both.
  const joinDisabledReason = event.isBanned
    ? "Banned events cannot be joined"
    : !event.isActive
      ? "This event is closed or paused"
      : null;

  const handleJoin = async () => {
    setActing(true);
    try {
      await joinEvent(event.id);
      toast.success(`Joined “${event.name}”`);
      await reload(event.id);
      onChanged?.();
    } catch (err) {
      toast.error(
        err instanceof ApiError ? err.message : "Failed to join event.",
      );
    } finally {
      setActing(false);
    }
  };

  const handleBanConfirm = async (reason: string) => {
    if (!banAction) return;
    setActing(true);
    try {
      if (banAction === "ban") await banEvent(event.id, reason);
      else await unbanEvent(event.id, reason || undefined);
      toast.success(`Event ${banAction}ned`);
      setBanAction(null);
      await reload(event.id);
      onChanged?.();
    } catch (err) {
      toast.error(
        err instanceof ApiError ? err.message : `Failed to ${banAction} event.`,
      );
    } finally {
      setActing(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Delete “${event.name}”? This cannot be undone here.`))
      return;
    setActing(true);
    try {
      await deleteEvent(event.id);
      toast.success("Event deleted");
      onChanged?.();
      if (!compact) router.replace("/eventsocial/events");
    } catch (err) {
      toast.error(
        err instanceof ApiError ? err.message : "Failed to delete event.",
      );
    } finally {
      setActing(false);
    }
  };

  return (
    <div
      className={cn(
        "relative flex h-full flex-col gap-4 overflow-visible rounded-xl px-5 py-2",
        wrapperClass,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-2xl font-semibold">{event.name}</h2>
            {isOwner && <Badge variant="default">Your event</Badge>}
            {eventStatusBadges(event)}
          </div>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="size-4" />
              <LocalDateTime iso={event.startDate} /> →{" "}
              <LocalDateTime iso={event.endDate} />
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="size-4" />
              {event.joinedUsers.length} participant
              {event.joinedUsers.length === 1 ? "" : "s"}
            </span>
          </div>
        </div>
        {compact && (
          <Button
            asChild
            variant="ghost"
            size="icon-lg"
            aria-label="Open full page"
          >
            <Link href={`/eventsocial/events/${event.id}`}>
              <ExternalLink />
            </Link>
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {!isOwner && isJoinable && (
          <Button
            className="gradient-cta "
            onClick={handleJoin}
            disabled={acting || isParticipant || joinDisabledReason !== null}
          >
            <UserPlus data-icon="inline-start" />
            {isParticipant ? "Joined" : (joinDisabledReason ?? "Join event")}
          </Button>
        )}
        {isOwner && (
          <>
            <Button asChild variant="secondary">
              <Link href={`/eventsocial/events/${event.id}/edit`}>
                <Pencil data-icon="inline-start" />
                Edit
              </Link>
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={acting}
            >
              <Trash2 data-icon="inline-start" />
              Delete
            </Button>
          </>
        )}
        {isAdmin &&
          (event.isBanned ? (
            <Button
              variant="secondary"
              onClick={() => setBanAction("unban")}
              disabled={acting}
            >
              <ShieldCheck data-icon="inline-start" />
              Unban
            </Button>
          ) : (
            <Button
              variant="destructive"
              onClick={() => setBanAction("ban")}
              disabled={acting}
            >
              <ShieldBan data-icon="inline-start" />
              Ban
            </Button>
          ))}
      </div>

      <Separator />

      <div>
        <h3 className="text-sm font-medium text-muted-foreground">
          Description
        </h3>
        <p className="mt-1 whitespace-pre-wrap text-sm">
          {event.description || "No description."}
        </p>
      </div>

      <div>
        <h3 className="text-sm font-medium text-muted-foreground">
          Participants ({event.joinedUsers.length})
        </h3>
        {event.joinedUsers.length === 0 ? (
          <p className="mt-1 text-sm text-muted-foreground">
            No one has joined yet.
          </p>
        ) : (
          <div className="mt-2 flex flex-wrap gap-2">
            {event.joinedUsers.map((joined) => (
              <div
                key={joined.id}
                className="flex items-center gap-2 w-fit p-1 pr-3 text-sm border border-zinc-400 rounded-2xl"
              >
                <UserAvatar name={joined.name} className="size-6 text-[10px]" />
                {joined.name}
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h3 className="text-sm font-medium text-muted-foreground">
          Invites ({pendingInvitees.length + (event.rejectedUsers?.length ?? 0)}
          )
        </h3>
        {pendingInvitees.length === 0 &&
        (event.rejectedUsers?.length ?? 0) === 0 ? (
          <p className="mt-1 text-sm text-muted-foreground">No invites sent.</p>
        ) : (
          <div className="flex flex-wrap items-center gap-2 mt-2 ">
            {pendingInvitees.map((invitee) => (
              <div
                key={invitee.id}
                className="flex items-center gap-2 w-fit p-1 text-sm border border-zinc-400 rounded-2xl"
              >
                <UserAvatar
                  name={invitee.name}
                  className="size-6 text-[10px]"
                />
                <span className="truncate">{invitee.name}</span>
                <Badge variant="secondary">pending</Badge>
              </div>
            ))}
            {event.rejectedUsers?.map((invitee) => (
              <div
                key={invitee.id}
                className="flex items-center gap-2 w-fit p-1 text-sm border border-zinc-400 rounded-2xl"
              >
                <UserAvatar
                  name={invitee.name}
                  className="size-6 text-[10px]"
                />
                <span className="truncate">{invitee.name}</span>
                <Badge variant="destructive">declined</Badge>
              </div>
            ))}
          </div>
        )}
      </div>

      {banAction && (
        <BanDialog
          action={banAction}
          eventName={event.name}
          submitting={acting}
          onConfirm={handleBanConfirm}
          onClose={() => setBanAction(null)}
        />
      )}
    </div>
  );
};

export default EventDetailCard;
