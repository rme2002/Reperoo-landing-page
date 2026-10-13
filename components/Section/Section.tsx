import type { ReactNode } from "react";
import { Container, Text, Title } from "@mantine/core";
import { Reveal } from "../Reveal";
import classes from "./Section.module.css";

type SectionProps = {
  id?: string;
  cms: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  soft?: boolean;
  children: ReactNode;
};

export function Section({
  id,
  cms,
  eyebrow,
  title,
  subtitle,
  soft,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      data-cms={cms}
      className={soft ? classes.soft : classes.section}
    >
      <Container size="lg">
        {title && (
          <Reveal className={classes.heading}>
            {eyebrow && <Text className={classes.eyebrow}>{eyebrow}</Text>}
            <Title order={2} className={classes.title}>
              {title}
            </Title>
            {subtitle && <Text className={classes.subtitle}>{subtitle}</Text>}
          </Reveal>
        )}
        {children}
      </Container>
    </section>
  );
}
