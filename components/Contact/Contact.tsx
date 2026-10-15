import { Group, Text, ThemeIcon } from "@mantine/core";
import { IconMail, IconMapPin, IconPhone } from "@tabler/icons-react";
import type { HomeContent } from "@/lib/content";
import { Reveal } from "../Reveal";
import { Section } from "../Section/Section";
import { ContactForm } from "./ContactForm";
import classes from "./Contact.module.css";

export function Contact({
  contact,
  soft,
}: {
  contact: HomeContent["contact"];
  soft?: boolean;
}) {
  const details = [
    {
      icon: IconMail,
      label: "Email",
      value: contact.email,
      href: `mailto:${contact.email}`,
    },
    {
      icon: IconPhone,
      label: "Phone",
      value: contact.phone,
      href: `tel:${contact.phone?.replace(/\s/g, "")}`,
    },
    { icon: IconMapPin, label: "Office", value: contact.address },
  ].filter((detail) => detail.value);

  return (
    <Section id="contact" cms="Home page › Contact" soft={soft}>
      <div className={classes.grid}>
        <Reveal>
          {contact.eyebrow && (
            <Text className={classes.eyebrow}>{contact.eyebrow}</Text>
          )}
          <h2 className={classes.title}>{contact.title}</h2>
          {contact.text && (
            <Text c="dimmed" size="lg" mt="md" lh={1.65}>
              {contact.text}
            </Text>
          )}
          <div className={classes.details}>
            {details.map((detail) => (
              <Group key={detail.label} gap="md" wrap="nowrap">
                <ThemeIcon size={42} radius="md" variant="light">
                  <detail.icon size={20} />
                </ThemeIcon>
                <div>
                  <Text size="xs" c="dimmed" fw={600} tt="uppercase">
                    {detail.label}
                  </Text>
                  {detail.href ? (
                    <a href={detail.href} className={classes.detailLink}>
                      {detail.value}
                    </a>
                  ) : (
                    <Text fw={600}>{detail.value}</Text>
                  )}
                </div>
              </Group>
            ))}
          </div>
        </Reveal>
        <Reveal delay={120} className={classes.formCard}>
          <ContactForm
            buttonLabel={contact.buttonLabel}
            successMessage={contact.successMessage}
          />
        </Reveal>
      </div>
    </Section>
  );
}
