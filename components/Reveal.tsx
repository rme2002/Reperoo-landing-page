"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Fades its children up the first time they scroll into view.
 * Content stays visible when JavaScript is off: only `html[data-js]` hides it.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal={visible ? "visible" : "hidden"}
      style={{ transitionDelay: visible ? `${delay}ms` : undefined }}
      className={className}
    >
      {children}
    </div>
  );
}
