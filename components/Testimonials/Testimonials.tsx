import { Avatar, Group, SimpleGrid, Text, Title } from "@mantine/core";
import type { HomeContent } from "@/lib/content";
import { withBasePath } from "@/lib/paths";
import { Reveal } from "../Reveal";
import { Section } from "../Section/Section";
import classes from "./Testimonials.module.css";

export function Testimonials({
  testimonials,
  soft,
}: {
  testimonials: HomeContent["testimonials"];
  soft?: boolean;
}) {
  return (
    <Section
      id="testimonials"
      cms="Home page › Who it's for (personas)"
      soft={soft}
      {...testimonials}
    >
      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="lg">
        {(testimonials.items ?? []).map((item, index) => (
          <Reveal
            key={`${index}-${item.name}`}
            delay={index * 80}
            className={classes.cell}
          >
            <article className={classes.card}>
              <Group gap="sm" wrap="nowrap">
                <Avatar
                  src={item.avatar ? withBasePath(item.avatar) : null}
                  name={item.name}
                  alt=""
                  color="gray"
                  radius="xl"
                  size={44}
                  imageProps={{ loading: "lazy", decoding: "async" }}
                />
                <div>
                  <Title order={3} size="h4" fw={600}>
                    {item.name}
                  </Title>
                  {item.role && (
                    <Text size="sm" c="dimmed">
                      {item.role}
                    </Text>
                  )}
                </div>
              </Group>
              <Text mt="md" className={classes.scenario}>
                {item.quote}
              </Text>
            </article>
          </Reveal>
        ))}
      </SimpleGrid>
    </Section>
  );
}
