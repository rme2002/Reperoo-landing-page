"use client";

import { ActionIcon, Affix, Transition } from "@mantine/core";
import { useWindowScroll } from "@mantine/hooks";
import { IconArrowUp } from "@tabler/icons-react";

export function BackToTop() {
  const [scroll] = useWindowScroll();

  return (
    <Affix position={{ bottom: 24, right: 24 }} zIndex={150}>
      <Transition transition="slide-up" mounted={scroll.y > 600}>
        {(styles) => (
          <ActionIcon
            style={{ ...styles, boxShadow: "var(--lp-elev-3)" }}
            variant="default"
            size="xl"
            radius="xl"
            aria-label="Back to top"
            onClick={() => {
              window.scrollTo({ top: 0 });
              document.getElementById("main")?.focus({ preventScroll: true });
            }}
          >
            <IconArrowUp size={20} stroke={1.75} />
          </ActionIcon>
        )}
      </Transition>
    </Affix>
  );
}
