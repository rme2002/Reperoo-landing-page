import { Features } from "@/components/Features/Features";
import { Hero } from "@/components/Hero/Hero";
import { LogoCloud } from "@/components/LogoCloud/LogoCloud";
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
    </>
  );
}
