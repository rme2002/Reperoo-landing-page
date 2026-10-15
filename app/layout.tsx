import "@mantine/core/styles/baseline.css";
import "@mantine/core/styles/default-css-variables.css";
import "@mantine/core/styles/global.css";
import "@mantine/core/styles/UnstyledButton.css";
import "@mantine/core/styles/Button.css";
import "@mantine/core/styles/Loader.css";
import "@mantine/core/styles/ActionIcon.css";
import "@mantine/core/styles/CloseButton.css";
import "@mantine/core/styles/Burger.css";
import "@mantine/core/styles/Container.css";
import "@mantine/core/styles/Group.css";
import "@mantine/core/styles/Stack.css";
import "@mantine/core/styles/SimpleGrid.css";
import "@mantine/core/styles/Text.css";
import "@mantine/core/styles/Title.css";
import "@mantine/core/styles/Typography.css";
import "@mantine/core/styles/List.css";
import "@mantine/core/styles/Paper.css";
import "@mantine/core/styles/Overlay.css";
import "@mantine/core/styles/ModalBase.css";
import "@mantine/core/styles/Drawer.css";
import "@mantine/core/styles/ScrollArea.css";
import "@mantine/core/styles/Affix.css";
import "@mantine/core/styles/Accordion.css";
import "@mantine/core/styles/Avatar.css";
import "@mantine/core/styles/Badge.css";
import "@mantine/core/styles/Alert.css";
import "@mantine/core/styles/Input.css";
import "@mantine/core/styles/Marquee.css";
import "@mantine/core/styles/RollingNumber.css";
import "./globals.css";
import React from "react";
import type { Metadata, Viewport } from "next";
import { AnnouncementBar } from "@/components/AnnouncementBar/AnnouncementBar";
import { BackToTop } from "@/components/BackToTop";
import { CmsHintsToggle } from "@/components/CmsHints/CmsHintsToggle";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { HydrationFlag } from "@/components/HydrationFlag";
import { MOTION_KEY } from "@/lib/motion-key";
import { Providers } from "@/components/Providers";
import { site } from "@/lib/content";
import { withBasePath } from "@/lib/paths";
import { baseOpenGraph, ogImage, siteUrl } from "@/lib/seo";

const { announcement, ui } = site;
const showAnnouncement = announcement.enabled && Boolean(announcement.text);

// Runs before paint: flags JS for the reveal styles (undone if hydration never
// happens), and re-applies a stored motion pause and announcement dismissal.
const headScript = `(function(){
var d=document.documentElement;
d.setAttribute("data-js","");
setTimeout(function(){if(!d.hasAttribute("data-hydrated"))d.removeAttribute("data-js");},4000);
try{
if(localStorage.getItem(${JSON.stringify(MOTION_KEY)})==="paused")d.setAttribute("data-motion","paused");
${
  showAnnouncement
    ? `if(JSON.parse(localStorage.getItem("announcement-dismissed")||"null")===${JSON.stringify(announcement.text).replace(/</g, "\\u003c")})d.setAttribute("data-announcement-dismissed","");`
    : ""
}
}catch(e){}
})();`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: site.seo.title, template: `%s · ${site.name}` },
  description: site.seo.description,
  alternates: { canonical: "./" },
  openGraph: { ...baseOpenGraph, url: "./", images: [ogImage] },
  twitter: { card: "summary_large_image", images: [ogImage] },
  icons: {
    icon: { url: withBasePath("/icon.svg"), type: "image/svg+xml" },
    apple: withBasePath("/apple-touch-icon.png"),
  },
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
  return (
    <html
      lang="en"
      data-mantine-color-scheme="dark"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: headScript }} />
      </head>
      <body>
        <Providers>
          <HydrationFlag />
          <a href="#main" className="lp-skip">
            {ui.skipToContent}
          </a>
          {showAnnouncement && (
            <AnnouncementBar
              text={announcement.text}
              linkLabel={announcement.linkLabel}
              href={announcement.href}
              label={ui.announcement}
              dismissLabel={ui.dismissAnnouncement}
            />
          )}
          <Header
            name={site.name}
            logo={site.logo}
            navigation={site.navigation}
            cta={site.navCta}
            ui={ui}
          />
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <BackToTop label={ui.backToTop} />
          <CmsHintsToggle />
        </Providers>
      </body>
    </html>
  );
}
