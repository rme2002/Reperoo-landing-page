"use client";

import Link from "next/link";
import { Burger, Container, Drawer, Group, Stack } from "@mantine/core";
import { useDisclosure, useWindowScroll } from "@mantine/hooks";
import type { Link as NavLink } from "@/lib/content";
import { BrandMark } from "../BrandMark";
import { ButtonLink } from "../ButtonLink";
import { SiteLink } from "../SiteLink";
import classes from "./Header.module.css";

type HeaderProps = {
  name: string;
  logo?: string;
  navigation: NavLink[];
  cta?: NavLink;
};

export function Header({ name, logo, navigation, cta }: HeaderProps) {
  const [opened, { close, toggle }] = useDisclosure(false);
  const [scroll] = useWindowScroll();

  const links = (className: string) =>
    navigation.map((item, index) => (
      <SiteLink
        key={`${index}-${item.href}`}
        href={item.href}
        className={className}
        onClick={close}
      >
        {item.label}
      </SiteLink>
    ));

  return (
    <header
      className={classes.header}
      data-scrolled={scroll.y > 8 || undefined}
      data-cms="Site settings › Menu"
    >
      <Container size="lg" className={classes.inner}>
        <Link href="/" className={classes.brand} aria-label={`${name} home`}>
          <BrandMark
            name={name}
            logo={logo}
            size={32}
            className={classes.brandMark}
          />
          <span>{name}</span>
        </Link>

        <nav className={classes.desktopNav} aria-label="Main">
          {links(classes.link)}
        </nav>

        <Group gap="xs" wrap="nowrap">
          {cta?.label && (
            <ButtonLink
              href={cta.href}
              variant="default"
              className={classes.desktopCta}
            >
              {cta.label}
            </ButtonLink>
          )}
          <Burger
            opened={opened}
            size="sm"
            onClick={toggle}
            aria-label="Menu"
            aria-expanded={opened}
            className={classes.burger}
          />
        </Group>
      </Container>

      <Drawer
        opened={opened}
        onClose={close}
        position="right"
        size="xs"
        title="Menu"
        padding="lg"
        closeButtonProps={{ "aria-label": "Close menu", size: "xl" }}
      >
        <nav aria-label="Main">
          <Stack gap={0}>{links(classes.drawerLink)}</Stack>
        </nav>
        {cta?.label && (
          <ButtonLink href={cta.href} onClick={close} fullWidth mt="lg">
            {cta.label}
          </ButtonLink>
        )}
      </Drawer>
    </header>
  );
}
