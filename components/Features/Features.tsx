import { SimpleGrid, Text, Title } from "@mantine/core";
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
      <SimpleGrid
        cols={{ base: 1, sm: 2, md: 3 }}
        spacing="lg"
        verticalSpacing="lg"
      >
        {(features.items ?? []).map((feature, index) => {
          const Icon = featureIcon(feature.icon);
          return (
            <Reveal
              key={`${index}-${feature.title}`}
              delay={(index % 3) * 80}
              className={classes.card}
            >
              <div className={classes.icon}>
                <Icon size={20} stroke={1.75} aria-hidden />
              </div>
              <Title order={3} size="h4" fw={600} mt="md">
                {feature.title}
              </Title>
              <Text c="dimmed" mt="xs">
                {feature.description}
              </Text>
            </Reveal>
          );
        })}
      </SimpleGrid>
    </Section>
  );
}
