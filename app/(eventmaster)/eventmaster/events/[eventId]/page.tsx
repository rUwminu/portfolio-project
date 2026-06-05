import React from "react";
import { getSession } from "@/lib/auth/server";

import EventDetailContent from "../../_components/EventDetailContent";

const EventDetailpage = async ({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) => {
  const { eventId } = await params;
  const session = await getSession();

  return (
    <EventDetailContent userId={session.data?.user.id} eventId={eventId} />
  );
};

export default EventDetailpage;
