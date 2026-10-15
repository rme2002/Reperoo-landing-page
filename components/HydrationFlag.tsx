"use client";

import { useEffect } from "react";

/** Marks the page hydrated, so the head script's reveal failsafe stands down. */
export function HydrationFlag() {
  useEffect(() => {
    document.documentElement.setAttribute("data-hydrated", "");
  }, []);
  return null;
}
