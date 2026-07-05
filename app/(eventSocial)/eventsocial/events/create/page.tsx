"use client";

import EventForm from "../../../_components/EventForm";

const CreateEventPage = () => (
  <main className="mx-auto max-w-6xl space-y-6 p-4">
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Create event</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Set up your event and optionally invite people to it.
      </p>
    </div>
    <EventForm mode="create" />
  </main>
);

export default CreateEventPage;
