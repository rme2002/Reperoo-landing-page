import { Text, Title } from "@mantine/core";
import { IconMail, IconMapPin, IconPhone } from "@tabler/icons-react";
import type { HomeContent } from "@/lib/content";
import { Reveal } from "../Reveal";
import { Eyebrow, Section } from "../Section/Section";
import { ContactForm } from "./ContactForm";
import classes from "./Contact.module.css";

export function Contact({
  contact,
  soft,
}: {
  contact: HomeContent["contact"];
  soft?: boolean;
}) {
  const labels = contact.detailLabels;
  const details = [
    {
      icon: IconMail,
      label: labels.email,
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    {
      icon: IconPhone,
      label: labels.phone,
      value: contact.phone,
      href: `tel:${contact.phone?.replace(/\s/g, "")}`,
    },
    { icon: IconMapPin, label: labels.address, value: contact.address },
  ].filter((detail) => detail.value);

  return (
    <Section id="contact" cms="Home page › Contact" soft={soft}>
      <div className={classes.grid}>
        <Reveal>
          {contact.eyebrow && <Eyebrow>{contact.eyebrow}</Eyebrow>}
          <Title order={2}>{contact.title}</Title>
          {contact.text && <Text className={classes.text}>{contact.text}</Text>}
          {details.length > 0 && (
            <div className={classes.details}>
              {details.map((detail) => {
                const row = (
                  <>
                    <div className={classes.icon}>
                      <detail.icon size={20} stroke={1.75} aria-hidden />
                    </div>
                    <div>
                      <Text size="sm" c="dimmed">
                        {detail.label}
                      </Text>
                      <Text fw={600} className={classes.value}>
                        {detail.value}
                      </Text>
                    </div>
                  </>
                );
                return detail.href ? (
                  <a
                    key={detail.label}
                    href={detail.href}
                    className={classes.detail}
                  >
                    {row}
                  </a>
                ) : (
                  <div key={detail.label} className={classes.detail}>
                    {row}
                  </div>
                );
              })}
            </div>
          )}
        </Reveal>
        <Reveal delay={100} className={classes.formCard}>
          <ContactForm contact={contact} />
        </Reveal>
      </div>
    </Section>
  );
}
