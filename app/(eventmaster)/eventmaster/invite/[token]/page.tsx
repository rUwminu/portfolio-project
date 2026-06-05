import React from "react";
import EventInviteContent from "../../_components/EventInviteContent";

const EventInvitePage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ token: string }>;
  searchParams: Promise<{ submitted?: string }>;
}) => {
  const { token } = await params;
  const query = await searchParams;

  return (
    <EventInviteContent token={token} submitted={query.submitted === "1"} />
  );
};

export default EventInvitePage;
