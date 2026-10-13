"use client";

import Link from "next/link";
import {
  ActionIcon,
  Burger,
  Button,
  Container,
  Drawer,
  Group,
  Stack,
  useMantineColorScheme,
} from "@mantine/core";
import { useDisclosure, useWindowScroll } from "@mantine/hooks";
import { IconMoon, IconSun } from "@tabler/icons-react";
import type { Link as NavLink } from "@/lib/content";
import { BrandMark } from "../BrandMark";
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
  const { toggleColorScheme } = useMantineColorScheme();

  const links = navigation.map((item) => (
    <Link
      key={item.href + item.label}
      href={item.href}
      className={classes.link}
      onClick={close}
    >
      {item.label}
    </Link>
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
          {links}
        </nav>

        <Group gap="xs" wrap="nowrap">
          <ActionIcon
            variant="default"
            size="lg"
            radius="md"
            onClick={toggleColorScheme}
            aria-label="Toggle colour scheme"
          >
            <IconSun size={18} className={classes.sun} />
            <IconMoon size={18} className={classes.moon} />
          </ActionIcon>
          {cta?.label && (
            <Button
              component={Link}
              href={cta.href}
              className={classes.desktopCta}
            >
              {cta.label}
            </Button>
          )}
          <Burger
            opened={opened}
            onClick={toggle}
            aria-label={
              opened ? "Close navigation menu" : "Open navigation menu"
            }
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
        title={name}
        padding="lg"
      >
        <Stack gap="md">
          {links}
          {cta?.label && (
            <Button component={Link} href={cta.href} onClick={close} fullWidth>
              {cta.label}
            </Button>
          )}
        </Stack>
      </Drawer>
    </header>
  );
}
