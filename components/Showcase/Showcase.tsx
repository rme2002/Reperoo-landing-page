import { List, ListItem, Text, ThemeIcon, Title } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import type { HomeContent } from "@/lib/content";
import { CmsImage } from "../CmsImage";
import { Reveal } from "../Reveal";
import { Section } from "../Section/Section";
import classes from "./Showcase.module.css";

export function Showcase({
  showcase,
  soft,
}: {
  showcase: HomeContent["showcase"];
  soft?: boolean;
}) {
  return (
    <Section
      id="how-it-works"
      cms="Home page › How it works"
      soft={soft}
      {...showcase}
    >
      <div className={classes.rows}>
        {(showcase.items ?? []).map((item, index) => (
          <div
            key={`${index}-${item.title}`}
            className={classes.row}
            data-flip={index % 2 === 1 || undefined}
          >
            <Reveal>
              <Text className={classes.step}>Step {index + 1}</Text>
              <Title order={3} className={classes.title}>
                {item.title}
              </Title>
              <Text c="dimmed" mt="sm" size="lg" lh={1.65}>
                {item.text}
              </Text>
              {(item.bullets ?? []).length > 0 && (
                <List
                  mt="lg"
                  spacing="xs"
                  icon={
                    <ThemeIcon size={22} radius="xl" variant="light">
                      <IconCheck size={14} />
                    </ThemeIcon>
                  }
                >
                  {item.bullets.map((bullet) => (
                    <ListItem key={bullet}>{bullet}</ListItem>
                  ))}
                </List>
              )}
            </Reveal>
            {item.image && (
              <Reveal delay={120} className={classes.media}>
                <CmsImage
                  src={item.image}
                  alt={item.imageAlt}
                  sizes="(max-width: 860px) 100vw, 540px"
                />
              </Reveal>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}
