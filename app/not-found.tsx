import { Container, Text, Title } from "@mantine/core";
import { ButtonLink } from "@/components/ButtonLink";

export default function NotFound() {
  return (
    <Container size="sm" py={120} ta="center">
      <Title order={1}>Page not found</Title>
      <Text c="dimmed" mt="md">
        The page you are looking for doesn&apos;t exist or has moved.
      </Text>
      <ButtonLink href="/" mt="xl">
        Back to home
      </ButtonLink>
    </Container>
  );
}
