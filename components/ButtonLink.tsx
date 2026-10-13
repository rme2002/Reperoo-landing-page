"use client";

import Link from "next/link";
import { Button, type ButtonProps } from "@mantine/core";
import type { ReactNode } from "react";

/** A Mantine button that navigates with next/link; usable from server components. */
export function ButtonLink({
  href,
  ...props
}: ButtonProps & { href: string; children: ReactNode }) {
  return <Button component={Link} href={href} {...props} />;
}
