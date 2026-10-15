import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import homeJson from "@/content/home.json";
import siteJson from "@/content/site.json";
import { withBasePath } from "./paths";

export type Link = { label: string; href: string };

export type SiteContent = {
  name: string;
  logo?: string;
  seo: { title: string; description: string };
  announcement: {
    enabled: boolean;
    text: string;
    linkLabel?: string;
    href?: string;
  };
  navigation: Link[];
  navCta?: Link;
  footer: {
    text: string;
    columns: { title: string; links: Link[] }[];
    socials: { platform: string; href: string }[];
    copyright: string;
  };
};

type Section = {
  enabled: boolean;
  eyebrow?: string;
  title: string;
  subtitle?: string;
};

export type HomeContent = {
  hero: {
    eyebrow?: string;
    title: string;
    subtitle?: string;
    primaryCta?: Link;
    secondaryCta?: Link;
    image?: string;
    imageAlt?: string;
    stats: { icon?: string; value: string; label: string }[];
  };
  logos: { enabled: boolean; title?: string; items: string[] };
  features: Section & {
    items: { icon: string; title: string; description: string }[];
  };
  showcase: Section & {
    items: {
      title: string;
      text: string;
      image?: string;
      imageAlt?: string;
      bullets: string[];
    }[];
  };
  testimonials: Section & {
    items: { quote: string; name: string; role?: string; avatar?: string }[];
  };
  pricing: Section & {
    currency: string;
    note?: string;
    plans: {
      name: string;
      description: string;
      price: number;
      priceSuffix?: string;
      badge?: string;
      features: string[];
      highlighted: boolean;
      ctaLabel: string;
      ctaHref: string;
    }[];
  };
  faq: Section & { items: { question: string; answer: string }[] };
  blog: Section & { count: number };
  cta: {
    enabled: boolean;
    title: string;
    text?: string;
    buttonLabel?: string;
    buttonHref?: string;
  };
  contact: Section & {
    text?: string;
    email?: string;
    phone?: string;
    address?: string;
    buttonLabel: string;
    successMessage: string;
  };
};

export type Post = {
  slug: string;
  title: string;
  date: string;
  author?: string;
  excerpt?: string;
  cover?: string;
  html: string;
};

export const site = siteJson as SiteContent;
export const home = homeJson as HomeContent;

const POSTS_DIR = path.join(process.cwd(), "content/posts");

function toIsoDate(value: unknown) {
  return value instanceof Date
    ? value.toISOString().slice(0, 10)
    : String(value ?? "");
}

function readPost(file: string): Post {
  const { data, content } = matter(
    fs.readFileSync(path.join(POSTS_DIR, file), "utf8"),
  );
  return {
    slug: file.replace(/\.md$/, ""),
    title: data.title || "Untitled",
    date: toIsoDate(data.date),
    author: data.author || undefined,
    excerpt: data.excerpt || undefined,
    cover: data.cover || undefined,
    html: marked
      .parse(content, { async: false })
      .replace(/(src|href)="\/(?!\/)/g, `$1="${withBasePath("/")}`),
  };
}

export function getPosts(): Post[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".md"))
    .map(readPost)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug: string) {
  return getPosts().find((post) => post.slug === slug);
}

export function formatDate(isoDate: string) {
  const date = new Date(isoDate);
  return Number.isNaN(date.getTime())
    ? isoDate
    : new Intl.DateTimeFormat("en-GB", {
        dateStyle: "long",
        timeZone: "UTC",
      }).format(date);
}
