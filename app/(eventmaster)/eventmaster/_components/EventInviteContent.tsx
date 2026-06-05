import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import EventInviteForm from "./EventInviteForm";

const EventInviteContent = async ({
  token,
  submitted,
}: {
  token: string;
  submitted: boolean;
}) => {
  const row = await prisma.eventInvite.findFirst({
    where: { token },
    include: {
      event: {
        select: {
          id: true,
          title: true,
          description: true,
          location: true,
          eventDate: true,
        },
      },
    },
  });

  if (!row) {
    notFound();
  }

  const e = row?.event;
  const event = {
    ...e,
    location: e.location ? e.location : null,
    eventDate: e.eventDate ? e.eventDate.toISOString() : null,
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <Card className="text-zinc-900 bg-white ring-0">
        <CardHeader className="space-y-2">
          <Badge className="w-fit bg-fuchsia-400">RSVP</Badge>

          <CardTitle className="text-zinc-900">{event.title}</CardTitle>

          <p className="text-zinc-900 font-medium">
            {event.eventDate
              ? new Date(event.eventDate).toLocaleString()
              : "No date selected"}
            {event.location ? ` - ${event.location}` : ""}
          </p>

          {event.description ? (
            <p className="text-zinc-900">{event.description}</p>
          ) : null}
        </CardHeader>

        <CardContent className="space-y-2">
          {submitted ? (
            <p className="p-3 font-medium rounded-md border !border-zinc-400">
              Thanks. Your RSVP has been recorded (or updated)
            </p>
          ) : null}

          <EventInviteForm token={token} />
        </CardContent>
      </Card>
    </div>
  );
};

export default EventInviteContent;
