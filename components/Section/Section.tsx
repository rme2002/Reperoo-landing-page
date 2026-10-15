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

export function Eyebrow({ children }: { children: ReactNode }) {
  return <Text className={classes.eyebrow}>{children}</Text>;
}

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
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            <Title order={2}>{title}</Title>
            {subtitle && <Text className={classes.subtitle}>{subtitle}</Text>}
          </Reveal>
        )}
        {children}
      </Container>
    </section>
  );
}
