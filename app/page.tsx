import { CallToAction } from "@/components/CallToAction/CallToAction";
import { Contact } from "@/components/Contact/Contact";
import { Faq } from "@/components/Faq/Faq";
import { Features } from "@/components/Features/Features";
import { Hero } from "@/components/Hero/Hero";
import { LogoCloud } from "@/components/LogoCloud/LogoCloud";
import { Pricing } from "@/components/Pricing/Pricing";
import { Showcase } from "@/components/Showcase/Showcase";
import { Testimonials } from "@/components/Testimonials/Testimonials";
import { home } from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <Hero hero={home.hero} />
      {home.logos.enabled && <LogoCloud logos={home.logos} />}
      {home.features.enabled && <Features features={home.features} />}
      {home.showcase.enabled && <Showcase showcase={home.showcase} />}
      {home.testimonials.enabled && (
        <Testimonials testimonials={home.testimonials} />
      )}
      {home.pricing.enabled && <Pricing pricing={home.pricing} />}
      {home.faq.enabled && <Faq faq={home.faq} />}
      {home.cta.enabled && <CallToAction cta={home.cta} />}
      {home.contact.enabled && <Contact contact={home.contact} />}
    </>
  );
}
