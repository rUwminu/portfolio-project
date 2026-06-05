"use client";

import { useActionState } from "react";
import { createInviteLinkAction } from "@/lib/actions/events";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const EventDetailInviteLinkCard = ({
  eventId,
  inviteToken,
}: {
  eventId: string;
  inviteToken: string | null;
}) => {
  const [token, formAction, isPending] = useActionState(
    async (prev, formData) => {
      const result = await createInviteLinkAction(eventId);
      return result;
    },
    inviteToken,
  );

  const inviteUrl = token
    ? `${process.env.NEXT_PUBLIC_APP_URL ?? ""}/eventmaster/invite/${token}`
    : "";

  return (
    <Card className="bg-white gap-1 ring-0 border-0">
      <CardHeader className="text-lg text-zinc-900 font-semibold">
        Invite Link
      </CardHeader>

      <CardContent className="text-zinc-900 space-y-2">
        <p className="text-zinc-600">
          Share this link with guests so they can response without creating an
          account.
        </p>

        {inviteUrl ? (
          <p className="p-3 font-medium rounded-md border !border-zinc-400">
            {inviteUrl}
          </p>
        ) : (
          <p className="text-zinc-600">No invite link generated yet.</p>
        )}

        <form action={formAction}>
          <Button
            type="submit"
            disabled={isPending}
            className="bg-zinc-900 hover:bg-fuchsia-400"
          >
            {isPending ? "Generating..." : "Generate Link"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EventDetailInviteLinkCard;
