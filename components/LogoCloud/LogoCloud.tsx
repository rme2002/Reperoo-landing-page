import { Container, Marquee, Text } from "@mantine/core";
import type { HomeContent } from "@/lib/content";
import classes from "./LogoCloud.module.css";

export function LogoCloud({ logos }: { logos: HomeContent["logos"] }) {
  return (
    <section className={classes.section} data-cms="Home page › Logo strip">
      <Container size="lg">
        {logos.title && <Text className={classes.title}>{logos.title}</Text>}
        <Marquee pauseOnHover gap="3rem" duration={30000}>
          {logos.items.map((name) => (
            <span key={name} className={classes.logo}>
              {name}
            </span>
          ))}
        </Marquee>
      </Container>
    </section>
  );
}
