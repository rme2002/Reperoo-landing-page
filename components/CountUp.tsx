"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { RollingNumber } from "@mantine/core";
import classes from "./CountUp.module.css";

const NUMBER = /^(\D*?)(\d+)(?:([.,])(\d{1,2}))?(\D*)$/;
const ROLL_MS = 900;

/** Shows a value such as "3" or "€3.50", rolling its number up once it scrolls into view. */
export function CountUp({
  value,
  className,
}: {
  value: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [phase, setPhase] = useState<"static" | "ready" | "rolling">("static");
  const match = value.trim().match(NUMBER);

  useEffect(() => {
    const node = ref.current;
    if (!node || !match) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      setPhase("rolling");
      timer = window.setTimeout(() => setPhase("static"), ROLL_MS + 100);
    });
    const frame = requestAnimationFrame(() => {
      setPhase("ready");
      observer.observe(node);
    });
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.clearTimeout(timer);
    };
    // The value is fixed for the page's lifetime; run once.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!match || phase === "static") {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  const [, prefix, whole, separator, fraction, suffix] = match;
  const digits = fraction ? `${whole}.${fraction}` : whole;

  return (
    <span ref={ref} className={className} data-rolling="">
      <span className={classes.value}>{value}</span>
      <span
        className={classes.rolling}
        aria-hidden
        style={{ "--count-width": `${value.length}ch` } as CSSProperties}
      >
        {prefix}
        <RollingNumber
          value={phase === "rolling" ? Number(digits) : 0}
          decimalScale={fraction?.length ?? 0}
          decimalSeparator={separator ?? "."}
          fixedDecimalScale
          animationDuration={ROLL_MS}
          timingFunction="cubic-bezier(0.22, 1, 0.36, 1)"
        />
        {suffix}
      </span>
    </span>
  );
}
