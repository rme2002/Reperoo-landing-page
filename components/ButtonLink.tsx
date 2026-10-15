"use client";

import Link from "next/link";
import { Button, type ButtonProps } from "@mantine/core";
import type { ReactNode } from "react";
import { isFragment, toHref, withBasePath } from "@/lib/paths";

/** A Mantine button for a CMS link; usable from server components. */
export function ButtonLink({
  href,
  ...props
}: ButtonProps & { href: string; children: ReactNode }) {
  const target = toHref(href);
  return isFragment(target) ? (
    <Button component="a" href={withBasePath(target)} {...props} />
  ) : (
    <Button component={Link} href={target} {...props} />
  );
}
