"use client";

import { CloseButton } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { IconArrowRight } from "@tabler/icons-react";
import { SiteLink } from "../SiteLink";
import classes from "./AnnouncementBar.module.css";

type AnnouncementBarProps = { text: string; linkLabel?: string; href?: string };

export function AnnouncementBar({
  text,
  linkLabel,
  href,
}: AnnouncementBarProps) {
  const [dismissed, setDismissed] = useLocalStorage({
    key: "announcement-dismissed",
    defaultValue: "",
  });

  if (dismissed === text) return null;

  return (
    <section
      className={classes.bar}
      aria-label="Announcement"
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
        aria-label="Dismiss announcement"
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
