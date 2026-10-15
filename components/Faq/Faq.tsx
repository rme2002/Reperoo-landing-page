import {
  Accordion,
  AccordionControl,
  AccordionItem,
  AccordionPanel,
  Text,
} from "@mantine/core";
import type { HomeContent } from "@/lib/content";
import { Reveal } from "../Reveal";
import { Section } from "../Section/Section";
import classes from "./Faq.module.css";

export function Faq({ faq }: { faq: HomeContent["faq"] }) {
  return (
    <Section id="faq" cms="Home page › FAQ" {...faq}>
      <Reveal className={classes.wrap}>
        <Accordion variant="separated" radius="md" chevronPosition="right">
          {(faq.items ?? []).map((item, index) => (
            <AccordionItem
              key={`faq-${index}`}
              value={`faq-${index}`}
              className={classes.item}
            >
              <AccordionControl>
                <Text fw={600}>{item.question}</Text>
              </AccordionControl>
              <AccordionPanel>
                <Text c="dimmed" lh={1.65}>
                  {item.answer}
                </Text>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </Section>
  );
}
