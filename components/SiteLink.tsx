import Link from "next/link";
import type { ComponentProps } from "react";
import { isFragment, toHref, withBasePath } from "@/lib/paths";

type SiteLinkProps = Omit<ComponentProps<"a">, "href"> & { href: string };

/**
 * A CMS link. Section links render a native anchor so the browser moves focus
 * into the section; everything else goes through next/link.
 */
export function SiteLink({ href, ...props }: SiteLinkProps) {
  const target = toHref(href);
  return isFragment(target) ? (
    <a href={withBasePath(target)} {...props} />
  ) : (
    <Link href={target} {...props} />
  );
}
