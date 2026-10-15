import { site } from "./content";

export const siteUrl = `${process.env.SITE_URL ?? "http://localhost:3000"}/`;

export const baseOpenGraph = {
  type: "website" as const,
  siteName: site.name,
  locale: "en_GB",
};

export const ogImage = {
  url: "og.png",
  width: 1200,
  height: 630,
  alt: site.seo.title,
};
