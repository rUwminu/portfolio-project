"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ApiError } from "../_lib/api";
import { createEvent, updateEvent } from "../_lib/event-api";
import type { EventPayload, JoinPolicy } from "../_lib/types";
import UserPicker, { type PickerUser } from "./UserPicker";

export interface EventFormInitial {
  name: string;
  description: string;
  /** datetime-local formatted values */
  startsAt: string;
  endsAt: string;
  joinPolicy: JoinPolicy;
  invitedUsers: PickerUser[];
}

interface EventFormProps {
  mode: "create" | "edit";
  eventId?: string;
  initial?: EventFormInitial;
}

const EMPTY: EventFormInitial = {
  name: "",
  description: "",
  startsAt: "",
  endsAt: "",
  joinPolicy: "OPEN",
  invitedUsers: [],
};

/**
 * Maps API validation `property` names onto form fields. The API takes
 * `startsAt`/`endsAt`, matching the field names used here.
 */
type FieldErrors = Partial<Record<string, string>>;

const EventForm = ({ mode, eventId, initial }: EventFormProps) => {
  const router = useRouter();
  const [form, setForm] = useState<EventFormInitial>(initial ?? EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const set = <K extends keyof EventFormInitial>(key: K, value: EventFormInitial[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key === "invitedUsers" ? "inviteUserIds" : key]: undefined }));
  };

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    if (form.name.trim().length < 3) next.name = "Name must be at least 3 characters.";
    if (form.description.trim().length < 10)
      next.description = "Description must be at least 10 characters.";
    if (!form.startsAt) next.startsAt = "Start date is required.";
    if (!form.endsAt) next.endsAt = "End date is required.";
    if (
      form.startsAt &&
      form.endsAt &&
      new Date(form.endsAt).getTime() <= new Date(form.startsAt).getTime()
    ) {
      next.endsAt = "End date must be after the start date.";
    }
    if (form.joinPolicy === "INVITE_ONLY" && form.invitedUsers.length === 0) {
      next.inviteUserIds = "Invite-only events need at least one invited user.";
    }
    return next;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const clientErrors = validate();
    setErrors(clientErrors);
    if (Object.keys(clientErrors).length > 0) return;

    const payload: EventPayload = {
      name: form.name.trim(),
      description: form.description.trim(),
      startsAt: new Date(form.startsAt).toISOString(),
      endsAt: new Date(form.endsAt).toISOString(),
      joinPolicy: form.joinPolicy,
      inviteUserIds: form.invitedUsers.map((u) => u.id),
    };

    setSubmitting(true);
    try {
      if (mode === "create") {
        const created = await createEvent(payload);
        toast.success("Event created");
        router.push(`/eventsocial/events/${created.id}`);
      } else if (eventId) {
        await updateEvent(eventId, payload);
        toast.success("Event updated");
        router.push(`/eventsocial/events/${eventId}`);
      }
    } catch (err) {
      if (err instanceof ApiError) {
        if (err.issues.length > 0) setErrors(err.fieldErrors);
        toast.error(err.message);
      } else {
        toast.error("Something went wrong.");
      }
      setSubmitting(false);
    }
  };

  const fieldError = (key: string) =>
    errors[key] && <p className="text-xs text-destructive">{errors[key]}</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-1.5">
        <Label htmlFor="event-name">Name</Label>
        <Input
          id="event-name"
          value={form.name}
          onChange={(e) => set("name", e.target.value)}
          placeholder="e.g. Team Offsite"
        />
        {fieldError("name")}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="event-description">Description</Label>
        <Textarea
          id="event-description"
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          placeholder="What is this event about? (10–1000 characters)"
          rows={5}
        />
        {fieldError("description")}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="event-starts">Starts at</Label>
          <Input
            id="event-starts"
            type="datetime-local"
            value={form.startsAt}
            onChange={(e) => set("startsAt", e.target.value)}
          />
          {fieldError("startsAt")}
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="event-ends">Ends at</Label>
          <Input
            id="event-ends"
            type="datetime-local"
            value={form.endsAt}
            onChange={(e) => set("endsAt", e.target.value)}
          />
          {fieldError("endsAt")}
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>Who can join</Label>
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "text-sm transition-colors",
              form.joinPolicy === "OPEN"
                ? "font-medium text-violet-600"
                : "text-muted-foreground"
            )}
          >
            Anyone can join
          </span>
          <Switch
            checked={form.joinPolicy === "INVITE_ONLY"}
            onCheckedChange={(checked) =>
              set("joinPolicy", checked ? "INVITE_ONLY" : "OPEN")
            }
          />
          <span
            className={cn(
              "text-sm transition-colors",
              form.joinPolicy === "INVITE_ONLY"
                ? "font-medium text-violet-600"
                : "text-muted-foreground"
            )}
          >
            Invited only
          </span>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label>
          Invite users
          {form.joinPolicy === "OPEN" && (
            <span className="font-normal text-muted-foreground"> (optional)</span>
          )}
        </Label>
        <UserPicker
          value={form.invitedUsers}
          onChange={(users) => set("invitedUsers", users)}
        />
        {fieldError("inviteUserIds")}
      </div>

      <div className="flex gap-2 pt-2">
        <Button type="submit" className="gradient-cta" disabled={submitting}>
          {submitting
            ? "Saving…"
            : mode === "create"
              ? "Create event"
              : "Save changes"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={submitting}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default EventForm;
