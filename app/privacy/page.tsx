import type { Metadata } from "next";
import { Container, Text, Title, Typography } from "@mantine/core";
import { formatDate, getPrivacy } from "@/lib/content";
import classes from "../blog/blog.module.css";

const privacy = getPrivacy();

export const metadata: Metadata = {
  title: privacy.title,
  description: privacy.description,
};

export default function PrivacyPage() {
  return (
    <article className={classes.page} data-cms="Privacy policy">
      <Container size={760}>
        <Title order={1}>{privacy.title}</Title>
        {privacy.updated && (
          <Text c="dimmed" size="sm" mt="sm">
            Last updated{" "}
            <time dateTime={privacy.updated}>
              {formatDate(privacy.updated)}
            </time>
          </Text>
        )}
        <Typography className={classes.body} mt="xl">
          <div dangerouslySetInnerHTML={{ __html: privacy.html }} />
        </Typography>
      </Container>
    </article>
  );
}
