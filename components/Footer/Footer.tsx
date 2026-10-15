import Link from "next/link";
import type { CSSProperties } from "react";
import { ActionIcon, Container, Group, Text } from "@mantine/core";
import { site } from "@/lib/content";
import { socialIcon, socialLabel } from "@/lib/icons";
import { BrandMark } from "../BrandMark";
import { SiteLink } from "../SiteLink";
import classes from "./Footer.module.css";

export function Footer() {
  const { footer, ui } = site;
  const columns = footer.columns ?? [];
  const socials = footer.socials ?? [];

  return (
    <footer className={classes.footer} data-cms="Site settings › Footer">
      <Container
        size="lg"
        className={classes.inner}
        style={{ "--footer-cols": columns.length } as CSSProperties}
      >
        <div className={classes.about}>
          <Link href="/" className={classes.brand}>
            <BrandMark
              name={site.name}
              logo={site.logo}
              size={28}
              className={classes.brandMark}
            />
            {site.name}
          </Link>
          <Text size="sm" c="dimmed" mt="md" maw={320}>
            {footer.text}
          </Text>
          {socials.length > 0 && (
            <Group gap="xs" mt="md">
              {socials.map((social, index) => {
                const Icon = socialIcon(social.platform);
                return (
                  <ActionIcon
                    key={`${index}-${social.href}`}
                    component="a"
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    variant="subtle"
                    color="gray"
                    size="xl"
                    aria-label={ui.socialLabel
                      .replace("{site}", site.name)
                      .replace("{platform}", socialLabel(social.platform))}
                  >
                    <Icon size={20} stroke={1.75} />
                  </ActionIcon>
                );
              })}
            </Group>
          )}
        </div>

        {columns.map((column, index) => (
          <nav key={`${index}-${column.title}`} aria-label={column.title}>
            <Text fw={600} size="sm" mb="xs">
              {column.title}
            </Text>
            <ul className={classes.links}>
              {(column.links ?? []).map((link, linkIndex) => (
                <li key={`${linkIndex}-${link.href}`}>
                  <SiteLink href={link.href} className={classes.link}>
                    {link.label}
                  </SiteLink>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </Container>
      <Container size="lg">
        <div className={classes.bottom}>
          <Text size="sm" c="dimmed">
            {footer.copyright}
          </Text>
        </div>
      </Container>
    </footer>
  );
}
