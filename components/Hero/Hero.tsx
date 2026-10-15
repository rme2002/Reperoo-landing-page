import { Container, Group, Text, Title } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import type { HomeContent } from "@/lib/content";
import { featureIcon } from "@/lib/icons";
import { ButtonLink } from "../ButtonLink";
import { CmsImage } from "../CmsImage";
import { CountUp } from "../CountUp";
import { MotionToggle } from "../MotionToggle";
import { Eyebrow } from "../Section/Section";
import { HeroDemo } from "./HeroDemo";
import classes from "./Hero.module.css";

export function Hero({ hero }: { hero: HomeContent["hero"] }) {
  const stats = hero.stats ?? [];
  const showMedia = Boolean(hero.image || hero.animatedDemo);

  return (
    <section className={classes.hero} data-cms="Home page › Hero">
      <Container
        size="lg"
        className={classes.grid}
        data-single={!showMedia || undefined}
      >
        <div className={classes.copy}>
          {hero.eyebrow && <Eyebrow>{hero.eyebrow}</Eyebrow>}
          <Title order={1}>{hero.title}</Title>
          {hero.subtitle && (
            <Text className={classes.subtitle}>{hero.subtitle}</Text>
          )}
          <Group gap="sm" mt="xl" className={classes.actions}>
            {hero.primaryCta?.label && (
              <ButtonLink
                href={hero.primaryCta.href}
                size="lg"
                rightSection={<IconArrowRight size={18} className="lp-arrow" />}
              >
                {hero.primaryCta.label}
              </ButtonLink>
            )}
            {hero.secondaryCta?.label && (
              <ButtonLink
                href={hero.secondaryCta.href}
                size="lg"
                variant="default"
              >
                {hero.secondaryCta.label}
              </ButtonLink>
            )}
          </Group>
        </div>

        {showMedia && (
          <div
            className={classes.media}
            data-demo={hero.animatedDemo || undefined}
          >
            {hero.animatedDemo ? (
              <>
                <HeroDemo alt={hero.imageAlt} />
                <MotionToggle
                  pauseLabel="Pause animations"
                  playLabel="Play animations"
                />
              </>
            ) : (
              hero.image && (
                <CmsImage
                  src={hero.image}
                  alt={hero.imageAlt}
                  sizes="(max-width: 1000px) 100vw, 560px"
                  fit="contain"
                  priority
                />
              )
            )}
          </div>
        )}
      </Container>
      {stats.length > 0 && (
        <Container size="lg">
          <dl className={classes.band}>
            {stats.map((stat, index) => {
              const Icon = stat.icon ? featureIcon(stat.icon) : null;
              return (
                <div
                  key={`${index}-${stat.label}`}
                  className={classes.stat}
                  data-with-icon={Icon ? "" : undefined}
                >
                  <dt className={classes.statLabel}>{stat.label}</dt>
                  <dd className={classes.statValue}>
                    {Icon && (
                      <span className={classes.statIcon} aria-hidden>
                        <Icon size={20} stroke={1.75} />
                      </span>
                    )}
                    <CountUp value={stat.value} />
                  </dd>
                </div>
              );
            })}
          </dl>
        </Container>
      )}
    </section>
  );
}
