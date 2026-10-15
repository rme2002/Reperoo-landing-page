import {
  Badge,
  Group,
  List,
  ListItem,
  SimpleGrid,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import type { HomeContent } from "@/lib/content";
import { ButtonLink } from "../ButtonLink";
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
      <SimpleGrid
        cols={{
          base: 1,
          sm: Math.min(plans.length, 2),
          md: plans.length,
        }}
        spacing="lg"
        maw={plans.length * 420}
        mx="auto"
      >
        {plans.map((plan, index) => {
          const price = Number(plan.price) || 0;
          return (
            <Reveal key={`${index}-${plan.name}`} delay={index * 100}>
              <div
                className={classes.plan}
                data-highlighted={plan.highlighted || undefined}
              >
                {plan.badge && (
                  <Badge className={classes.badge} radius="xl">
                    {plan.badge}
                  </Badge>
                )}
                <Text fw={800} size="lg">
                  {plan.name}
                </Text>
                <Text c="dimmed" size="sm" mt={4}>
                  {plan.description}
                </Text>
                <Group gap={8} align="baseline" mt="lg">
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
                  <ButtonLink
                    href={plan.ctaHref}
                    fullWidth
                    mt="xl"
                    variant={plan.highlighted ? "filled" : "default"}
                  >
                    {plan.ctaLabel}
                  </ButtonLink>
                )}
                <List
                  mt="xl"
                  spacing="sm"
                  size="sm"
                  icon={
                    <ThemeIcon size={20} radius="xl" variant="light">
                      <IconCheck size={12} />
                    </ThemeIcon>
                  }
                >
                  {(plan.features ?? []).map((feature) => (
                    <ListItem key={feature}>{feature}</ListItem>
                  ))}
                </List>
              </div>
            </Reveal>
          );
        })}
      </SimpleGrid>
      {pricing.note && (
        <Text c="dimmed" size="sm" ta="center" mt="xl">
          {pricing.note}
        </Text>
      )}
    </Section>
  );
}
