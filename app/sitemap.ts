import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/content";
import { siteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => new URL(path, siteUrl).toString();
  return [
    { url: url("./") },
    { url: url("blog/") },
    { url: url("privacy/") },
    ...getPosts().map((post) => ({
      url: url(`blog/${post.slug}/`),
      lastModified: post.date || undefined,
    })),
  ];
}
