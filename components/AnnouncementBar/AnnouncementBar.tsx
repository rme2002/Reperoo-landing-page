"use client";

import Link from "next/link";
import { CloseButton } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { IconArrowRight } from "@tabler/icons-react";
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
    <div className={classes.bar} data-cms="Site settings › Announcement bar">
      <p className={classes.content}>
        <span>{text}</span>
        {linkLabel && href && (
          <Link href={href} className={classes.link}>
            {linkLabel} <IconArrowRight size={14} />
          </Link>
        )}
      </p>
      <CloseButton
        size="sm"
        variant="transparent"
        className={classes.close}
        aria-label="Dismiss announcement"
        onClick={() => setDismissed(text)}
      />
    </div>
  );
}
