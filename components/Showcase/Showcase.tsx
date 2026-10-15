import { Text, Title } from "@mantine/core";
import type { HomeContent } from "@/lib/content";
import { CheckList } from "../CheckList";
import { CmsImage } from "../CmsImage";
import { Reveal } from "../Reveal";
import { Eyebrow, Section } from "../Section/Section";
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
            data-single={!item.image || undefined}
          >
            <Reveal className={classes.copy}>
              <Eyebrow>Step {index + 1}</Eyebrow>
              <Title order={3}>{item.title}</Title>
              <Text c="dimmed" mt="sm">
                {item.text}
              </Text>
              {(item.bullets ?? []).length > 0 && (
                <div className={classes.list}>
                  <CheckList items={item.bullets} />
                </div>
              )}
            </Reveal>
            {item.image && (
              <Reveal delay={100} className={classes.media}>
                <CmsImage
                  src={item.image}
                  alt={item.imageAlt}
                  sizes="(max-width: 860px) 420px, 520px"
                  fit="contain"
                />
              </Reveal>
            )}
          </div>
        ))}
      </div>
    </Section>
  );
}
