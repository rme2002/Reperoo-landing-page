import { SimpleGrid, Text, ThemeIcon } from "@mantine/core";
import type { HomeContent } from "@/lib/content";
import { featureIcon } from "@/lib/icons";
import { Reveal } from "../Reveal";
import { Section } from "../Section/Section";
import classes from "./Features.module.css";

export function Features({
  features,
  soft,
}: {
  features: HomeContent["features"];
  soft?: boolean;
}) {
  return (
    <Section id="features" cms="Home page › Features" soft={soft} {...features}>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
        {(features.items ?? []).map((feature, index) => {
          const Icon = featureIcon(feature.icon);
          return (
            <Reveal key={`${index}-${feature.title}`} delay={(index % 3) * 100}>
              <div className={classes.card}>
                <ThemeIcon size={44} radius="md" variant="light">
                  <Icon size={22} />
                </ThemeIcon>
                <Text fw={700} size="lg" mt="md">
                  {feature.title}
                </Text>
                <Text c="dimmed" mt={6} lh={1.6}>
                  {feature.description}
                </Text>
              </div>
            </Reveal>
          );
        })}
      </SimpleGrid>
    </Section>
  );
}
