import { Container, Text, Title } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import type { CtaContent } from "@/lib/content";
import { ButtonLink } from "../ButtonLink";
import { Reveal } from "../Reveal";
import classes from "./CallToAction.module.css";

export function CallToAction({ cta, cms }: { cta: CtaContent; cms: string }) {
  return (
    <section className={classes.section} data-cms={cms}>
      <Container size="lg">
        <Reveal className={classes.banner}>
          <Title order={2} c="inherit">
            {cta.title}
          </Title>
          {cta.text && <Text className={classes.text}>{cta.text}</Text>}
          {cta.buttonLabel && cta.buttonHref && (
            <ButtonLink
              href={cta.buttonHref}
              size="lg"
              mt="xl"
              rightSection={<IconArrowRight size={18} className="lp-arrow" />}
            >
              {cta.buttonLabel}
            </ButtonLink>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
