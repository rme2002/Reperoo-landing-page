import { Container, Marquee, Text } from "@mantine/core";
import type { HomeContent } from "@/lib/content";
import classes from "./LogoCloud.module.css";

export function LogoCloud({ logos }: { logos: HomeContent["logos"] }) {
  const items = logos.items ?? [];
  return (
    <section
      className={classes.section}
      data-cms="Home page › Compatibility strip"
    >
      <Container size="lg">
        {logos.title && <Text className={classes.title}>{logos.title}</Text>}
        <ul className={classes.list} aria-label={logos.title || undefined}>
          {items.map((name, index) => (
            <li key={`${index}-${name}`}>{name}</li>
          ))}
        </ul>
        <Marquee
          aria-hidden
          pauseOnHover
          gap="xl"
          duration={40000}
          fadeEdgeSize="10%"
          classNames={{ root: classes.marquee, content: classes.track }}
        >
          {items.map((name, index) => (
            <span key={`${index}-${name}`} className={classes.item}>
              {name}
            </span>
          ))}
        </Marquee>
      </Container>
    </section>
  );
}
