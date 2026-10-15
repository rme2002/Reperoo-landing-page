import "@mantine/core/styles.css";
import "./globals.css";
import React from "react";
import type { Metadata, Viewport } from "next";
import { AnnouncementBar } from "@/components/AnnouncementBar/AnnouncementBar";
import { BackToTop } from "@/components/BackToTop";
import { CmsHintsToggle } from "@/components/CmsHints/CmsHintsToggle";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { Providers } from "@/components/Providers";
import { site } from "@/lib/content";
import { withBasePath } from "@/lib/paths";

export const metadata: Metadata = {
  title: { default: site.seo.title, template: `%s · ${site.name}` },
  description: site.seo.description,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
  themeColor: "#17110f",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { announcement } = site;

  return (
    <html lang="en" data-mantine-color-scheme="dark" suppressHydrationWarning>
      <head>
        <noscript>
          <style>
            {
              "[data-reveal] { opacity: 1 !important; transform: none !important; }"
            }
          </style>
        </noscript>
        <link rel="shortcut icon" href={withBasePath("/favicon.svg")} />
      </head>
      <body>
        <Providers>
          {announcement.enabled && announcement.text && (
            <AnnouncementBar
              text={announcement.text}
              linkLabel={announcement.linkLabel}
              href={announcement.href}
            />
          )}
          <Header
            name={site.name}
            logo={site.logo}
            navigation={site.navigation}
            cta={site.navCta}
          />
          <main>{children}</main>
          <Footer />
          <BackToTop />
          <CmsHintsToggle />
        </Providers>
      </body>
    </html>
  );
}
