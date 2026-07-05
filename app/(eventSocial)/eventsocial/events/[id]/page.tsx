"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import EventDetailCard from "../../../_components/EventDetailCard";

const EventDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <main className="mx-auto max-w-6xl space-y-4 p-4 ">
      <Link
        href="/eventsocial/events"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Back to events
      </Link>

      <EventDetailCard eventId={id} wrapperClass="px-0" />
    </main>
  );
};

export default EventDetailPage;
