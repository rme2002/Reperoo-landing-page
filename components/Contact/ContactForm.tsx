"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Alert, Button, Stack, Text, Textarea, TextInput } from "@mantine/core";
import { IconCircleCheck } from "@tabler/icons-react";
import type { HomeContent } from "@/lib/content";
import { SiteLink } from "../SiteLink";
import classes from "./Contact.module.css";

type Contact = HomeContent["contact"];
type Status = "idle" | "sending" | "sent" | "error";

const EMAIL = /^\S+@\S+\.\S+$/;

/** Waitlist form; posts to formAction, or simulates success in development. */
export function ContactForm({ contact }: { contact: Contact }) {
  const { form, formAction } = contact;
  const live = Boolean(formAction);
  const demo = !live && process.env.NODE_ENV !== "production";
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string>();
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    if (status === "sent") successRef.current?.focus();
  }, [status]);

  if (!live && !demo) {
    return <Text c="dimmed">{contact.closedMessage}</Text>;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const node = event.currentTarget;
    if (!EMAIL.test(email.trim())) {
      setEmailError(form.emailError);
      requestAnimationFrame(() =>
        node.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(),
      );
      return;
    }
    const data = new FormData(node);
    if (data.get("_gotcha")) {
      setStatus("sent");
      return;
    }
    setStatus("sending");
    if (!live) {
      await new Promise((resolve) => setTimeout(resolve, 900));
      setStatus("sent");
      return;
    }
    try {
      const response = await fetch(formAction as string, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      setStatus(response.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <Alert
        ref={successRef}
        tabIndex={-1}
        className={classes.success}
        variant="light"
        color="green"
        radius="md"
        icon={<IconCircleCheck />}
        title={form.successTitle}
      >
        {contact.successMessage}
      </Alert>
    );
  }

  return (
    <form
      ref={formRef}
      method="post"
      action={formAction || undefined}
      onSubmit={onSubmit}
      noValidate
    >
      <Stack gap="md">
        <TextInput
          label={form.emailLabel}
          name="email"
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          withAsterisk={false}
          size="md"
          value={email}
          error={emailError}
          onChange={(event) => {
            setEmail(event.currentTarget.value);
            setEmailError(undefined);
          }}
        />
        <TextInput
          label={form.nameLabel}
          name="name"
          autoComplete="name"
          size="md"
        />
        <Textarea
          label={form.messageLabel}
          name="message"
          minRows={2}
          autosize
          size="md"
        />
        <input
          type="text"
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          className="lp-visually-hidden"
        />
        {status === "error" && (
          <Alert color="red" variant="light" role="alert">
            {form.errorMessage}
          </Alert>
        )}
        <Button
          type="submit"
          size="md"
          fullWidth
          loading={status === "sending"}
        >
          {contact.buttonLabel}
        </Button>
        {contact.privacyNote && (
          <Text size="sm" c="dimmed">
            {contact.privacyNote}{" "}
            {contact.privacyLink?.label && contact.privacyLink.href && (
              <SiteLink
                href={contact.privacyLink.href}
                className={classes.inline}
              >
                {contact.privacyLink.label}
              </SiteLink>
            )}
          </Text>
        )}
      </Stack>
    </form>
  );
}
