"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Affix, Button } from "@mantine/core";
import { IconPencil, IconPencilOff } from "@tabler/icons-react";

const subscribe = () => () => {};
const isAvailable = () =>
  process.env.NODE_ENV === "development" ||
  new URLSearchParams(window.location.search).has("editable");

/**
 * Outlines every region that is editable in Pages CMS, labelled with where to find it.
 * Shown in development, or on the live site with `?editable` in the URL.
 */
export function CmsHintsToggle() {
  const available = useSyncExternalStore(subscribe, isAvailable, () => false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    document.documentElement.toggleAttribute("data-cms-hints", active);
  }, [active]);

  if (!available) return null;

  return (
    <Affix
      position={{ bottom: 24, left: "50%" }}
      zIndex={150}
      style={{ transform: "translateX(-50%)" }}
    >
      <Button
        variant={active ? "filled" : "default"}
        radius="xl"
        leftSection={
          active ? <IconPencilOff size={16} /> : <IconPencil size={16} />
        }
        style={{ boxShadow: "var(--lp-elev-3)" }}
        onClick={() => setActive((value) => !value)}
      >
        {active ? "Hide editable areas" : "Show editable areas"}
      </Button>
    </Affix>
  );
}
