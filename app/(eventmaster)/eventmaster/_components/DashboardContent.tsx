import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import { countByStatus } from "../_utils/shared";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const DashboardContent = async ({
  userId,
  userEmail,
}: {
  userId: string;
  userEmail: string;
}) => {
  const myEvents = await prisma.event.findMany({
    where: { ownerUserId: userId },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      eventDate: true,
      location: true,
      rsvps: { select: { status: true } },
    },
  });

  const joinedEvents = await prisma.event.findMany({
    where: {
      rsvps: {
        some: {
          emailNormalized: userEmail.toLowerCase(),
        },
      },
    },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      eventDate: true,
      location: true,
      rsvps: { select: { status: true } },
    },
  });

  const myEventsFormatted = myEvents.map((e) => {
    return {
      ...e,
      location: e.location ? e.location : null,
      eventDate: e.eventDate ? e.eventDate.toISOString() : null,
      ...countByStatus(e.rsvps),
    };
  });
  const joinedEventsFormatted = joinedEvents.map((e) => {
    return {
      ...e,
      location: e.location ? e.location : null,
      eventDate: e.eventDate ? e.eventDate.toISOString() : null,
      ...countByStatus(e.rsvps),
    };
  });

  return (
    <div className="flex flex-col w-full">
      <div className="flex  flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl text-zinc-900 font-semibold tracking-tight">
              Your Events
            </h1>

            <p className="text-sm text-zinc-600">
              Track attendee responses and manage invite links.
            </p>
          </div>

          <Button asChild className="bg-zinc-900 hover:bg-fuchsia-400">
            <Link href={"/eventmaster/events/new"} className="font-semibold">
              Create Event
            </Link>
          </Button>
        </div>

        {/* List of event */}
        {myEventsFormatted.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
            {myEventsFormatted.map((e) => (
              <EventCard key={e.id} {...e} />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
            <EventCardEmpty />
          </div>
        )}
      </div>

      <div className="flex  flex-col gap-6 mt-14">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl text-zinc-900 font-semibold tracking-tight">
              Joined Events
            </h1>

            <p className="text-sm text-zinc-600">
              Track which event you have joined
            </p>
          </div>
        </div>

        {/* List of event */}
        {joinedEventsFormatted.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
            {joinedEventsFormatted.map((e) => (
              <EventCard key={e.id} {...e} />
            ))}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-3">
            <EventCardEmpty />
          </div>
        )}
      </div>
    </div>
  );
};

interface EventCardProps {
  id: string;
  title: string;
  location: string | null;
  eventDate: string | null;
  goingCount: number;
  maybeCount: number;
  notGoingCount: number;
}

const EventCard: React.FC<EventCardProps> = ({
  id,
  title,
  location,
  eventDate,
  goingCount,
  maybeCount,
  notGoingCount,
}) => {
  return (
    <Card className="bg-white ring-0 border-0">
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-lg text-zinc-900 font-medium">
            {title}
          </CardTitle>

          <Button size={"sm"} asChild className="bg-zinc-900 ">
            <Link
              href={`/eventmaster/events/${id}`}
              className="text-white font-semibold "
            >
              Open
            </Link>
          </Button>
        </div>

        <div className="flex items-center justify-start gap-1">
          <Badge className="bg-teal-200 text-zinc-800 font-semibold border-none">
            Going: {goingCount}
          </Badge>

          <Badge className="bg-amber-200 text-zinc-800 font-semibold border-none">
            Maybe: {maybeCount}
          </Badge>

          <Badge className="bg-zinc-200 text-zinc-800 font-semibold border-none">
            Not going: {notGoingCount}
          </Badge>
        </div>

        <p className="text-zinc-600 pt-1">
          {eventDate
            ? new Date(eventDate).toLocaleString()
            : "No date selected"}
          {location ? ` - ${location}` : ""}
        </p>
      </CardHeader>
    </Card>
  );
};

const EventCardEmpty = () => {
  return (
    <Card className="bg-white text-zinc-900 gap-1 ring-0 border-0">
      <CardHeader>
        <CardTitle>No events yet</CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-zinc-600">
          Create your first event to start collecting response.
        </p>
      </CardContent>
    </Card>
  );
};

export default DashboardContent;
