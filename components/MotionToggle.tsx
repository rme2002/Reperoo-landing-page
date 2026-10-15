"use client";

import { ActionIcon } from "@mantine/core";
import { IconPlayerPause, IconPlayerPlay } from "@tabler/icons-react";
import { setMotionPaused, useMotionPaused } from "@/lib/motion";
import classes from "./MotionToggle.module.css";

export function MotionToggle({
  pauseLabel,
  playLabel,
}: {
  pauseLabel: string;
  playLabel: string;
}) {
  const paused = useMotionPaused();
  return (
    <ActionIcon
      variant="default"
      size="xl"
      radius="xl"
      className={classes.toggle}
      aria-label={paused ? playLabel : pauseLabel}
      onClick={() => setMotionPaused(!paused)}
    >
      {paused ? (
        <IconPlayerPlay size={18} stroke={1.75} />
      ) : (
        <IconPlayerPause size={18} stroke={1.75} />
      )}
    </ActionIcon>
  );
}
