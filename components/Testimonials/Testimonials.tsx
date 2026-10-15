import { Avatar, Group, SimpleGrid, Text } from "@mantine/core";
import { IconQuote } from "@tabler/icons-react";
import type { HomeContent } from "@/lib/content";
import { withBasePath } from "@/lib/paths";
import { Reveal } from "../Reveal";
import { Section } from "../Section/Section";
import classes from "./Testimonials.module.css";

export function Testimonials({
  testimonials,
}: {
  testimonials: HomeContent["testimonials"];
}) {
  return (
    <Section id="testimonials" cms="Home page › Testimonials" {...testimonials}>
      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
        {(testimonials.items ?? []).map((item, index) => (
          <Reveal
            key={`${index}-${item.name}`}
            delay={index * 100}
            className={classes.cell}
          >
            <figure className={classes.card}>
              <IconQuote size={28} className={classes.quoteIcon} />
              <Text component="blockquote" className={classes.quote}>
                {item.quote}
              </Text>
              <Group gap="sm" mt="auto" pt="lg">
                <Avatar
                  src={item.avatar ? withBasePath(item.avatar) : null}
                  name={item.name}
                  color="initials"
                  radius="xl"
                />
                <div>
                  <Text fw={700} size="sm">
                    {item.name}
                  </Text>
                  {item.role && (
                    <Text size="xs" c="dimmed">
                      {item.role}
                    </Text>
                  )}
                </div>
              </Group>
            </figure>
          </Reveal>
        ))}
      </SimpleGrid>
    </Section>
  );
}
