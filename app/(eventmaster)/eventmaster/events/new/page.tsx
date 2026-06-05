"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { createEventAction } from "@/lib/actions/events";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";

const formSchema = z.object({
  title: z
    .string()
    .min(5, "Event title must be at least 5 characters.")
    .max(100, "Event title must be at most 32 characters."),
  eventDate: z.string(),
  location: z.string(),
  description: z
    .string()
    .min(0, "")
    .max(100, "Description must be at most 100 characters."),
});

const NewEventPage = () => {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      title: "",
      eventDate: "",
      location: "",
      description: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const formData = new FormData();

      Object.entries(value).forEach(([key, val]) => {
        formData.append(key, val);
      });

      const result = await createEventAction(formData);

      if (result && result.id) {
        router.push(`/eventmaster/events/${result.id}`);
      }
    },
  });

  return (
    <div className="w-full mx-auto max-w-2xl">
      <Card className="w-full text-zinc-900 bg-white ring-0">
        <CardHeader>
          <CardTitle className="">Create Event</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            id="create-event-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <form.Field
                name="title"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Event Title</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Birthday party..."
                        autoComplete="off"
                        className="!border-zinc-300"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              <form.Field
                name="eventDate"
                children={(field) => {
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>
                        Date and time
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Optional location"
                        autoComplete="off"
                        type="datetime-local"
                        className="!border-zinc-300"
                      />
                      <FieldDescription>
                        Optional, you can set this later.
                      </FieldDescription>
                    </Field>
                  );
                }}
              />

              <form.Field
                name="location"
                children={(field) => {
                  return (
                    <Field>
                      <FieldLabel htmlFor={field.name}>Location</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Optional location"
                        autoComplete="off"
                        className="!border-zinc-300"
                      />
                    </Field>
                  );
                }}
              />

              <form.Field
                name="description"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                      <InputGroup>
                        <InputGroupTextarea
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="Optional details about the event"
                          rows={6}
                          className="min-h-24 resize-none  rounded-lg"
                          aria-invalid={isInvalid}
                        />
                        <InputGroupAddon align="block-end">
                          <InputGroupText className="tabular-nums">
                            {field.state.value.length}/100 characters
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
            </FieldGroup>

            <div className="flex items-center gap-3 pt-4">
              <Button
                type="submit"
                form="create-event-form"
                className="bg-zinc-900 hover:bg-fuchsia-400"
              >
                Create Event
              </Button>

              <Button
                type="button"
                className="text-zinc-900 bg-zinc-300 hover:bg-zinc-400"
              >
                <Link href={"/eventmaster/dashboard"}>Cancel</Link>
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewEventPage;
