import { useSyncExternalStore } from "react";
import { MOTION_KEY } from "./motion-key";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-motion"],
  });
  return () => observer.disconnect();
}

const isPaused = () =>
  document.documentElement.getAttribute("data-motion") === "paused";

/** Whether the visitor paused looping animations with the motion toggle. */
export function useMotionPaused() {
  return useSyncExternalStore(subscribe, isPaused, () => false);
}

export function setMotionPaused(paused: boolean) {
  const root = document.documentElement;
  if (paused) root.setAttribute("data-motion", "paused");
  else root.removeAttribute("data-motion");
  try {
    if (paused) localStorage.setItem(MOTION_KEY, "paused");
    else localStorage.removeItem(MOTION_KEY);
  } catch {}
}
