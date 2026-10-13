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
      position={{ bottom: 20, left: "50%" }}
      style={{ transform: "translateX(-50%)" }}
    >
      <Button
        variant={active ? "filled" : "default"}
        radius="xl"
        size="xs"
        leftSection={
          active ? <IconPencilOff size={14} /> : <IconPencil size={14} />
        }
        onClick={() => setActive((value) => !value)}
      >
        {active ? "Hide editable areas" : "Show editable areas"}
      </Button>
    </Affix>
  );
}
