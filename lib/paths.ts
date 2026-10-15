/** Prefixes a root-relative path with the sub-path the site is served from. */
export function withBasePath(path: string) {
  return path.startsWith("/") && !path.startsWith("//")
    ? `${process.env.BASE_PATH ?? ""}${path}`
    : path;
}

/** Makes a bare CMS fragment such as "#contact" point at the home page. */
export function toHref(href: string) {
  return href.startsWith("#") ? `/${href}` : href;
}

/** True for internal links that jump to a section, which need a native anchor. */
export function isFragment(href: string) {
  return href.startsWith("/") && href.includes("#");
}
