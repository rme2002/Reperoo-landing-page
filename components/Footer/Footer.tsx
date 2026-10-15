import Link from "next/link";
import { ActionIcon, Container, Group, Text } from "@mantine/core";
import { site } from "@/lib/content";
import { socialIcon } from "@/lib/icons";
import { BrandMark } from "../BrandMark";
import classes from "./Footer.module.css";

export function Footer() {
  const { footer } = site;
  const columns = footer.columns ?? [];
  const socials = footer.socials ?? [];

  return (
    <footer className={classes.footer} data-cms="Site settings › Footer">
      <Container size="lg" className={classes.inner}>
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
          <Text size="sm" c="dimmed" mt="sm" maw={320}>
            {footer.text}
          </Text>
          <Group gap="xs" mt="lg">
            {socials.map((social, index) => {
              const Icon = socialIcon(social.platform);
              return (
                <ActionIcon
                  key={`${index}-${social.href}`}
                  component="a"
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  variant="default"
                  size="lg"
                  aria-label={social.platform}
                >
                  <Icon size={18} />
                </ActionIcon>
              );
            })}
          </Group>
        </div>

        {columns.map((column, index) => (
          <div key={`${index}-${column.title}`}>
            <Text fw={700} size="sm" mb="sm">
              {column.title}
            </Text>
            <ul className={classes.links}>
              {(column.links ?? []).map((link, linkIndex) => (
                <li key={`${linkIndex}-${link.href}`}>
                  <Link href={link.href} className={classes.link}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
      <Container size="lg" className={classes.bottom}>
        <Text size="xs" c="dimmed">
          {footer.copyright}
        </Text>
      </Container>
    </footer>
  );
}
