"use client";

import type { ReactNode } from "react";
import { MantineProvider } from "@mantine/core";
import { cssVariablesResolver, theme } from "../theme";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MantineProvider
      theme={theme}
      cssVariablesResolver={cssVariablesResolver}
      forceColorScheme="dark"
    >
      {children}
    </MantineProvider>
  );
}
