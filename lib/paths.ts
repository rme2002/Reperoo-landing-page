/** Prefixes a root-relative path with the sub-path the site is served from. */
export function withBasePath(path: string) {
  return path.startsWith("/") && !path.startsWith("//")
    ? `${process.env.BASE_PATH ?? ""}${path}`
    : path;
}
