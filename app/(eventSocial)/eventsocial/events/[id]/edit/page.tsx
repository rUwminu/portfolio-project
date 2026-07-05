"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ApiError } from "../../../../_lib/api";
import { getEvent } from "../../../../_lib/event-api";
import { toDateTimeLocal } from "../../../../_lib/hooks";
import { useAuth } from "../../../../_context/AuthContext";
import EventForm, {
  type EventFormInitial,
} from "../../../../_components/EventForm";

const EditEventPage = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [initial, setInitial] = useState<EventFormInitial | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notOwner, setNotOwner] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    getEvent(id, controller.signal)
      .then((event) => {
        if (user && event.authorId !== user.id) {
          setNotOwner(true);
          return;
        }

        setInitial({
          name: event.name,
          description: event.description ?? "",
          startsAt: toDateTimeLocal(event.startDate),
          endsAt: toDateTimeLocal(event.endDate),
          joinPolicy: event.joinPolicy,
          // Owner always receives `rejectedUsers` too; accepted invitees are
          // already in `joinedUsers` and aren't re-seeded here.
          invitedUsers: [
            ...event.invitedUsers,
            ...(event.rejectedUsers ?? []),
          ].map((invitee) => ({
            id: invitee.id,
            name: invitee.name,
            isRemoveable: true,
          })),
        });
      })
      .catch((err) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError(
          err instanceof ApiError ? err.message : "Failed to load event.",
        );
      });
    return () => controller.abort();
  }, [id, user]);

  return (
    <main className="mx-auto max-w-6xl space-y-6 p-4">
      <Link
        href={`/eventsocial/events/${id}`}
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to event
      </Link>

      <div>
        <h1 className="text-2xl font-bold tracking-tight">Edit event</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Changing the invite list replaces it — removed users lose their
          invite.
        </p>
      </div>

      {notOwner ? (
        <p className="rounded-lg border border-border p-4 text-sm text-muted-foreground">
          Only the event owner can edit this event.
        </p>
      ) : error ? (
        <p className="rounded-lg border border-border p-4 text-sm text-destructive">
          {error}
        </p>
      ) : !initial ? (
        <div className="flex justify-center py-10">
          <div className="size-6 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent" />
        </div>
      ) : (
        <EventForm mode="edit" eventId={id} initial={initial} />
      )}
    </main>
  );
};

export default EditEventPage;
