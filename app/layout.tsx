import "@mantine/core/styles.css";
import "./globals.css";
import React from "react";
import type { Metadata, Viewport } from "next";
import { AnnouncementBar } from "@/components/AnnouncementBar/AnnouncementBar";
import { BackToTop } from "@/components/BackToTop";
import { CmsHintsToggle } from "@/components/CmsHints/CmsHintsToggle";
import { Footer } from "@/components/Footer/Footer";
import { Header } from "@/components/Header/Header";
import { HydrationFlag } from "@/components/HydrationFlag";
import { Providers } from "@/components/Providers";
import { site } from "@/lib/content";
import { withBasePath } from "@/lib/paths";

const { announcement } = site;
const showAnnouncement = announcement.enabled && Boolean(announcement.text);

// Runs before paint: flags JS for the reveal styles (undone if hydration never
// happens), and re-applies a stored announcement dismissal.
const headScript = `(function(){
var d=document.documentElement;
d.setAttribute("data-js","");
setTimeout(function(){if(!d.hasAttribute("data-hydrated"))d.removeAttribute("data-js");},4000);
try{
${
  showAnnouncement
    ? `if(JSON.parse(localStorage.getItem("announcement-dismissed")||"null")===${JSON.stringify(announcement.text).replace(/</g, "\\u003c")})d.setAttribute("data-announcement-dismissed","");`
    : ""
}
}catch(e){}
})();`;

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
  return (
    <html
      lang="en"
      data-mantine-color-scheme="dark"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: headScript }} />
        <link rel="shortcut icon" href={withBasePath("/favicon.svg")} />
      </head>
      <body>
        <Providers>
          <HydrationFlag />
          <a href="#main" className="lp-skip">
            Skip to content
          </a>
          {showAnnouncement && (
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
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <BackToTop />
          <CmsHintsToggle />
        </Providers>
      </body>
    </html>
  );
}
