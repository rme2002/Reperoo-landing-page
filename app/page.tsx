import { Fragment, type ReactNode } from "react";
import { CallToAction } from "@/components/CallToAction/CallToAction";
import { Contact } from "@/components/Contact/Contact";
import { Faq } from "@/components/Faq/Faq";
import { Features } from "@/components/Features/Features";
import { Hero } from "@/components/Hero/Hero";
import { LatestPosts } from "@/components/LatestPosts";
import { LogoCloud } from "@/components/LogoCloud/LogoCloud";
import { Pricing } from "@/components/Pricing/Pricing";
import { Showcase } from "@/components/Showcase/Showcase";
import { Testimonials } from "@/components/Testimonials/Testimonials";
import { getPosts, home } from "@/lib/content";

type Block = { key: string; render: (soft: boolean) => ReactNode };

export default function HomePage() {
  const posts = getPosts().slice(0, home.blog.count);

  const blocks: (Block | false)[] = [
    home.testimonials.enabled && {
      key: "testimonials",
      render: (soft) => (
        <Testimonials testimonials={home.testimonials} soft={soft} />
      ),
    },
    home.showcase.enabled && {
      key: "showcase",
      render: (soft) => <Showcase showcase={home.showcase} soft={soft} />,
    },
    home.features.enabled && {
      key: "features",
      render: (soft) => <Features features={home.features} soft={soft} />,
    },
    home.pricing.enabled && {
      key: "pricing",
      render: (soft) => <Pricing pricing={home.pricing} soft={soft} />,
    },
    home.faq.enabled && {
      key: "faq",
      render: (soft) => <Faq faq={home.faq} soft={soft} />,
    },
    home.contact.enabled && {
      key: "contact",
      render: (soft) => <Contact contact={home.contact} soft={soft} />,
    },
    home.blog.enabled &&
      posts.length > 0 && {
        key: "blog",
        render: (soft) => (
          <LatestPosts blog={home.blog} posts={posts} soft={soft} />
        ),
      },
  ];
  const sections = blocks.filter((block): block is Block => Boolean(block));

  return (
    <>
      <Hero hero={home.hero} />
      {home.logos.enabled && <LogoCloud logos={home.logos} />}
      {sections.map((section, index) => (
        <Fragment key={section.key}>
          {section.key === "faq" && home.cta.enabled && (
            <CallToAction
              cta={home.cta}
              cms="Home page › Call to action banner"
            />
          )}
          {section.render(index % 2 === 1)}
        </Fragment>
      ))}
    </>
  );
}
