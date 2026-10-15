"use client";

import { useEffect, useState } from "react";
import { Affix, Button } from "@mantine/core";
import { IconPencil, IconPencilOff } from "@tabler/icons-react";

/** Outlines every region that is editable in Pages CMS, labelled with where to find it. */
export function CmsHintsToggle() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    document.documentElement.toggleAttribute("data-cms-hints", active);
  }, [active]);

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
