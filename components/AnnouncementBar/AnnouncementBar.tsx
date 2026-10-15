"use client";

import { CloseButton } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { IconArrowRight } from "@tabler/icons-react";
import { SiteLink } from "../SiteLink";
import classes from "./AnnouncementBar.module.css";

type AnnouncementBarProps = {
  text: string;
  linkLabel?: string;
  href?: string;
  label: string;
  dismissLabel: string;
};

export function AnnouncementBar({
  text,
  linkLabel,
  href,
  label,
  dismissLabel,
}: AnnouncementBarProps) {
  const [dismissed, setDismissed] = useLocalStorage({
    key: "announcement-dismissed",
    defaultValue: "",
  });

  if (dismissed === text) return null;

  return (
    <section
      className={classes.bar}
      aria-label={label}
      data-cms="Site settings › Announcement bar"
    >
      <p className={classes.content}>
        <span>{text}</span>
        {linkLabel && href && (
          <SiteLink href={href} className={classes.link}>
            {linkLabel}{" "}
            <IconArrowRight size={16} className="lp-arrow" aria-hidden />
          </SiteLink>
        )}
      </p>
      <CloseButton
        size="xl"
        iconSize={16}
        variant="subtle"
        className={classes.close}
        aria-label={dismissLabel}
        onClick={() => {
          document.documentElement.setAttribute(
            "data-announcement-dismissed",
            "",
          );
          setDismissed(text);
        }}
      />
    </section>
  );
}
