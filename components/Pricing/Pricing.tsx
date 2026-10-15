import { Badge, Group, SimpleGrid, Text, Title } from "@mantine/core";
import type { HomeContent } from "@/lib/content";
import { ButtonLink } from "../ButtonLink";
import { CheckList } from "../CheckList";
import { Reveal } from "../Reveal";
import { Section } from "../Section/Section";
import classes from "./Pricing.module.css";

function formatPrice(price: number, currency: string) {
  if (price === 0) return "Free";
  return `${currency}${Number.isInteger(price) ? price : price.toFixed(2)}`;
}

export function Pricing({
  pricing,
  soft,
}: {
  pricing: HomeContent["pricing"];
  soft?: boolean;
}) {
  const plans = pricing.plans ?? [];
  return (
    <Section id="pricing" cms="Home page › Pricing" soft={soft} {...pricing}>
      <div className={classes.stage}>
        <SimpleGrid
          cols={{ base: 1, sm: Math.min(plans.length, 2), md: plans.length }}
          spacing="lg"
          maw={plans.length * 400}
          mx="auto"
        >
          {plans.map((plan, index) => {
            const price = Number(plan.price) || 0;
            return (
              <Reveal key={`${index}-${plan.name}`} delay={index * 80}>
                <div
                  className={classes.plan}
                  data-highlighted={plan.highlighted || undefined}
                >
                  <Group justify="space-between" align="center" wrap="nowrap">
                    <Title order={3} size="h4" fw={600}>
                      {plan.name}
                    </Title>
                    {plan.badge && (
                      <Badge
                        variant="light"
                        radius="xl"
                        size="lg"
                        fz="sm"
                        tt="none"
                      >
                        {plan.badge}
                      </Badge>
                    )}
                  </Group>
                  <Text c="dimmed" size="sm" mt="xs">
                    {plan.description}
                  </Text>
                  <Group gap="xs" align="baseline" mt="lg">
                    <span className={classes.price}>
                      {formatPrice(price, pricing.currency)}
                    </span>
                    {plan.priceSuffix && (
                      <Text c="dimmed" size="sm">
                        {plan.priceSuffix}
                      </Text>
                    )}
                  </Group>
                  {plan.ctaLabel && plan.ctaHref && (
                    <ButtonLink href={plan.ctaHref} fullWidth mt="lg">
                      {plan.ctaLabel}
                    </ButtonLink>
                  )}
                  {(plan.features ?? []).length > 0 && (
                    <div className={classes.features}>
                      <CheckList items={plan.features} />
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </SimpleGrid>
      </div>
      {pricing.note && (
        <Text c="dimmed" size="sm" ta="center" mt="lg">
          {pricing.note}
        </Text>
      )}
    </Section>
  );
}
