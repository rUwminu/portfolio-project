import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { countByStatus } from "../_utils/shared";
import { createInviteLinkAction } from "@/lib/actions/events";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import EventDetailInviteLinkCard from "./EventDetailInviteLinkCard";

const EventDetailContent = async ({
  userId,
  eventId,
}: {
  userId: string;
  eventId: string;
}) => {
  const row = await prisma.event.findFirst({
    where: { id: eventId },
    select: {
      id: true,
      ownerUserId: true,
      title: true,
      description: true,
      location: true,
      eventDate: true,
      invite: { select: { token: true } },
      rsvps: { select: { status: true } },
    },
  });
  const rsvpRows = await prisma.eventRsvp.findMany({
    where: { eventId },
    orderBy: { respondedAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      status: true,
      respondedAt: true,
    },
  });

  if (!row) {
    notFound();
  }

  const isOwner = row.ownerUserId === userId;
  const count = countByStatus(row.rsvps);
  const event = {
    ...row,
    location: row.location ? row.location : null,
    eventDate: row.eventDate ? row.eventDate.toISOString() : null,
    inviteToken: row.invite?.token ?? null,
    isOwner,
    ...count,
  };
  const rsvps = rsvpRows.map((r) => ({
    ...r,
    respondedAt: r.respondedAt.toISOString(),
  }));

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="pl-4 space-y-2 border-l-4 !border-fuchsia-400">
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-teal-200 text-zinc-800 font-semibold border-none">
              Going: {event.goingCount}
            </Badge>

            <Badge className="bg-amber-200 text-zinc-800 font-semibold border-none">
              Maybe: {event.maybeCount}
            </Badge>

            <Badge className="bg-zinc-200 text-zinc-800 font-semibold border-none">
              Not going: {event.notGoingCount}
            </Badge>
          </div>

          <h1 className="text-2xl font-semibold tracking-tight">
            {event.title}
          </h1>

          <p className="font-medium">
            {event.eventDate
              ? new Date(event.eventDate).toLocaleString()
              : "No date selected"}
            {event.location ? ` - ${event.location}` : ""}
          </p>

          {event.description ? <p>{event.description}</p> : null}
        </div>

        <Button asChild className="px-4 lg:px-6">
          <Link href={"/eventmaster/dashboard"}>Back</Link>
        </Button>
      </div>

      {isOwner ? (
        <EventDetailInviteLinkCard
          eventId={eventId}
          inviteToken={event.inviteToken}
        />
      ) : null}

      <Card className="bg-white text-zinc-900 gap-1 ring-0 border-0">
        <CardHeader>
          <CardTitle>Attendees</CardTitle>
        </CardHeader>

        <CardContent>
          {rsvps.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-zinc-900">Name</TableHead>

                  <TableHead className="text-zinc-900">Email</TableHead>

                  <TableHead className="text-zinc-900">Status</TableHead>

                  <TableHead className="text-zinc-900">Updated</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {rsvps.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell>{r.name}</TableCell>

                    <TableCell>{r.email}</TableCell>

                    <TableCell>
                      <Badge
                        className={`${
                          r.status === "going"
                            ? "bg-teal-200"
                            : r.status === "maybe"
                              ? "bg-amber-200"
                              : r.status === "not_going"
                                ? "bg-zinc-200"
                                : ""
                        } text-zinc-800 font-semibold border-none`}
                      >
                        {r.status === "going"
                          ? "Going"
                          : r.status === "maybe"
                            ? "Maybe"
                            : r.status === "not_going"
                              ? "Not Going"
                              : ""}
                      </Badge>
                    </TableCell>

                    <TableCell>
                      {new Date(r.respondedAt).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-zinc-600">No responses yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EventDetailContent;
