import { Badge, Container, Group, Text, Title } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import type { HomeContent } from "@/lib/content";
import { ButtonLink } from "../ButtonLink";
import { CmsImage } from "../CmsImage";
import classes from "./Hero.module.css";

export function Hero({ hero }: { hero: HomeContent["hero"] }) {
  return (
    <section className={classes.hero} data-cms="Home page › Hero">
      <Container
        size="lg"
        className={classes.grid}
        data-single={!hero.image || undefined}
      >
        <div className={classes.copy}>
          {hero.eyebrow && (
            <Badge
              variant="light"
              size="lg"
              radius="xl"
              className={classes.badge}
            >
              {hero.eyebrow}
            </Badge>
          )}
          <Title order={1} className={classes.title}>
            {hero.title}
          </Title>
          {hero.subtitle && (
            <Text className={classes.subtitle}>{hero.subtitle}</Text>
          )}
          <Group gap="sm" mt="xl">
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
          {hero.stats.length > 0 && (
            <dl className={classes.stats}>
              {hero.stats.map((stat) => (
                <div key={stat.label}>
                  <dt className={classes.statLabel}>{stat.label}</dt>
                  <dd className={classes.statValue}>{stat.value}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        {hero.image && (
          <div className={classes.media}>
            <div className={classes.frame}>
              <div className={classes.imageWrap}>
                <CmsImage
                  src={hero.image}
                  alt={hero.imageAlt}
                  sizes="(max-width: 900px) 100vw, 560px"
                  priority
                />
              </div>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
