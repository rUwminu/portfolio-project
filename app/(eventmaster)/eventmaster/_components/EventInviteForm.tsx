"use client";

import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { submitRsvpAction } from "@/lib/actions/events";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  status: z.enum(["going", "maybe", "not_going"]),
});

const EventInviteForm = ({ token }: { token: string }) => {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      status: "going" as "going" | "maybe" | "not_going",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const formData = new FormData();

      Object.entries(value).forEach(([key, val]) => formData.append(key, val));

      const result = await submitRsvpAction(token, formData);

      if (result && result.id) {
        router.push(`/eventmaster/invite/${token}?submitted=1`);
      }
    },
  });

  return (
    <form
      id="rsvp-form"
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
    >
      <FieldGroup>
        <form.Field
          name="name"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="Your name"
                  autoComplete="off"
                  className="!border-zinc-300"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />

        <form.Field
          name="email"
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  type="email"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="you@example.com"
                  autoComplete="off"
                  className="!border-zinc-300"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />

        <form.Field
          name="status"
          children={(field) => {
            return (
              <Field>
                <FieldLabel htmlFor={field.name}>Attendance</FieldLabel>
                <Select
                  value={field.state.value}
                  onValueChange={(val) =>
                    field.handleChange(val as "going" | "maybe" | "not_going")
                  }
                >
                  <SelectTrigger
                    id={field.name}
                    onBlur={field.handleBlur}
                    className="border !border-zinc-300"
                  >
                    <SelectValue placeholder="Select your attendance" />
                  </SelectTrigger>
                  <SelectContent className="bg-white shadow-md text-zinc-900">
                    <SelectItem value="going">Going</SelectItem>
                    <SelectItem value="maybe">Maybe</SelectItem>
                    <SelectItem value="not_going">Not going</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
            );
          }}
        />
      </FieldGroup>

      <div className="flex items-center gap-3 pt-4">
        <Button
          type="submit"
          form="rsvp-form"
          className="bg-zinc-900 hover:bg-fuchsia-400"
        >
          Submit RSVP
        </Button>
      </div>
    </form>
  );
};

export default EventInviteForm;
