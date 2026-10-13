"use client";

import { useState, type FormEvent } from "react";
import { Alert, Button, Stack, Textarea, TextInput } from "@mantine/core";
import { IconCircleCheck, IconSend } from "@tabler/icons-react";

type Values = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof Values, string>>;

const EMPTY: Values = { name: "", email: "", message: "" };

function validate(values: Values): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name";
  if (!/^\S+@\S+\.\S+$/.test(values.email))
    errors.email = "Please enter a valid email address";
  return errors;
}

/** Validates and simulates sending; there is no backend behind this demo form. */
export function ContactForm({
  buttonLabel,
  successMessage,
}: {
  buttonLabel: string;
  successMessage: string;
}) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const field = (name: keyof Values) => ({
    value: values[name],
    error: errors[name],
    onChange: (event: { currentTarget: { value: string } }) => {
      const value = event.currentTarget.value;
      setValues((current) => ({ ...current, [name]: value }));
      setErrors((current) => ({ ...current, [name]: undefined }));
    },
  });

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    setStatus("sending");
    await new Promise((resolve) => setTimeout(resolve, 900));
    setStatus("sent");
    setValues(EMPTY);
  }

  if (status === "sent") {
    return (
      <Alert
        variant="light"
        color="green"
        radius="md"
        icon={<IconCircleCheck />}
        title="You're on the list"
        withCloseButton
        onClose={() => setStatus("idle")}
      >
        {successMessage}
      </Alert>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate>
      <Stack gap="md">
        <TextInput
          label="Name"
          placeholder="Your name"
          size="md"
          {...field("name")}
        />
        <TextInput
          label="Email"
          placeholder="you@example.com"
          type="email"
          size="md"
          {...field("email")}
        />
        <Textarea
          label="Message (optional)"
          placeholder="Questions, or the drive you use"
          minRows={4}
          autosize
          size="md"
          {...field("message")}
        />
        <Button
          type="submit"
          size="md"
          loading={status === "sending"}
          rightSection={<IconSend size={16} />}
        >
          {buttonLabel}
        </Button>
      </Stack>
    </form>
  );
}
