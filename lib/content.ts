import homeJson from "@/content/home.json";
import siteJson from "@/content/site.json";

export type Link = { label: string; href: string };

export type SiteContent = {
  name: string;
  logo?: string;
  primaryColor: string;
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
    stats: { value: string; label: string }[];
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

export const site = siteJson as SiteContent;
export const home = homeJson as HomeContent;
