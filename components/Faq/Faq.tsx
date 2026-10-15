import {
  Accordion,
  AccordionControl,
  AccordionItem,
  AccordionPanel,
  Text,
} from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import type { HomeContent } from "@/lib/content";
import { Reveal } from "../Reveal";
import { Section } from "../Section/Section";
import { SiteLink } from "../SiteLink";
import classes from "./Faq.module.css";

export function Faq({
  faq,
  soft,
}: {
  faq: HomeContent["faq"];
  soft?: boolean;
}) {
  return (
    <Section id="faq" cms="Home page › FAQ" soft={soft} {...faq}>
      <Reveal>
        <Accordion className={classes.list} chevronPosition="right" order={3}>
          {(faq.items ?? []).map((item, index) => (
            <AccordionItem key={`faq-${index}`} value={`faq-${index}`}>
              <AccordionControl className={classes.control}>
                <Text fw={600} component="span">
                  {item.question}
                </Text>
              </AccordionControl>
              <AccordionPanel>
                <Text c="dimmed">{item.answer}</Text>
                {item.link?.label && item.link.href && (
                  <SiteLink href={item.link.href} className={classes.more}>
                    {item.link.label}
                    <IconArrowRight
                      size={16}
                      className="lp-arrow"
                      aria-hidden
                    />
                  </SiteLink>
                )}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </Section>
  );
}
