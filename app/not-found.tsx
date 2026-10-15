import type { Metadata } from "next";
import { Container, Group, Text, Title } from "@mantine/core";
import { ButtonLink } from "@/components/ButtonLink";
import { site } from "@/lib/content";

const { notFound } = site;

export const metadata: Metadata = {
  title: notFound.title,
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <Container size="sm" py={96} ta="center">
      <Title order={1}>{notFound.title}</Title>
      {notFound.text && (
        <Text c="dimmed" mt="md">
          {notFound.text}
        </Text>
      )}
      <Group justify="center" gap="sm" mt="xl">
        {notFound.primary?.label && (
          <ButtonLink href={notFound.primary.href}>
            {notFound.primary.label}
          </ButtonLink>
        )}
        {notFound.secondary?.label && (
          <ButtonLink href={notFound.secondary.href} variant="default">
            {notFound.secondary.label}
          </ButtonLink>
        )}
      </Group>
    </Container>
  );
}
