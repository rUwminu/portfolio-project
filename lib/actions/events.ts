"use server";

import { prisma } from "../prisma";
import { getSession } from "../auth/server";

import { RsvpStatus } from "@/app/generated/prisma/enums";

const parseCreateEvent = (formData: FormData) => {
  const title = String(formData.get("title") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const eventDate = String(formData.get("eventDate") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();

  return {
    title,
    location: location.length ? location.slice(0, 200) : null,
    eventDate: eventDate.length ? eventDate : null,
    description: description.length ? description.slice(0, 2000) : null,
  };
};

export const createEventAction = async (formData: FormData) => {
  const session = await getSession();
  const userId = session.data?.user.id;
  const input = parseCreateEvent(formData);

  let resultId = "";

  try {
    const created = await prisma.event.create({
      data: {
        ownerUserId: userId,
        ...input,
        eventDate: input.eventDate ? new Date(input.eventDate) : null,
      },
    });

    resultId = created.id;
  } catch (error) {
    console.error(error);
  }

  return {
    id: resultId,
  };
};

export const createInviteLinkAction = async (eventId: string) => {
  const session = await getSession();
  const userId = session.data?.user.id;

  const own = await prisma.event.findFirst({
    where: { id: eventId, ownerUserId: userId },
    select: { id: true },
  });

  if (!own) {
    throw new Error("Event not found.");
  }

  const token = crypto.randomUUID().replace(/-/g, "");

  await prisma.eventInvite.upsert({
    where: { eventId: eventId },
    create: {
      eventId,
      token,
    },
    update: {
      token,
    },
  });

  return token;
};

export const submitRsvpAction = async (token: string, formData: FormData) => {
  const invite = await prisma.eventInvite.findFirst({
    where: { token },
    select: {
      id: true,
      event: {
        select: { id: true },
      },
    },
  });

  if (!invite) {
    throw new Error("Invite link is invalid!");
  }

  let resultId = "";
  const eventId = invite.event.id;
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const status = String(formData.get("status") ?? "").trim();
  const emailNormalized = email.toLowerCase();

  try {
    const created = await prisma.eventRsvp.upsert({
      where: {
        eventId_emailNormalized: {
          eventId,
          emailNormalized,
        },
      },
      create: {
        eventId,
        inviteId: invite.id,
        name,
        email,
        emailNormalized,
        status: status as RsvpStatus,
      },
      update: {
        name,
        status: status as RsvpStatus,
        respondedAt: new Date(),
      },
    });

    resultId = created.id;
  } catch (error) {
    console.error(error);
  }

  return {
    id: resultId,
  };
};
