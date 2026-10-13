import "@mantine/core/styles.css";
import "./globals.css";
import React from "react";
import type { Metadata, Viewport } from "next";
import { MantineProvider, mantineHtmlProps } from "@mantine/core";
import { AnnouncementBar } from "@/components/AnnouncementBar/AnnouncementBar";
import { BackToTop } from "@/components/BackToTop";
import { CmsHintsToggle } from "@/components/CmsHints/CmsHintsToggle";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { site } from "@/lib/content";
import { withBasePath } from "@/lib/paths";
import { buildTheme } from "../theme";

const colorSchemeScript = `
try {
  var _colorScheme = window.localStorage.getItem("mantine-color-scheme-value");
  var colorScheme = _colorScheme === "light" || _colorScheme === "dark" || _colorScheme === "auto" ? _colorScheme : "auto";
  var computedColorScheme = colorScheme !== "auto" ? colorScheme : window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  document.documentElement.setAttribute("data-mantine-color-scheme", computedColorScheme);
} catch (e) {}
`;

export const metadata: Metadata = {
  title: { default: site.seo.title, template: `%s · ${site.name}` },
  description: site.seo.description,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { announcement } = site;

  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <script
          data-mantine-script
          dangerouslySetInnerHTML={{ __html: colorSchemeScript }}
        />
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
        <MantineProvider
          theme={buildTheme(site.primaryColor)}
          defaultColorScheme="auto"
        >
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
        </MantineProvider>
      </body>
    </html>
  );
}
