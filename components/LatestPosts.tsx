import { Group, SimpleGrid } from "@mantine/core";
import { IconArrowRight } from "@tabler/icons-react";
import type { HomeContent, Post } from "@/lib/content";
import { ButtonLink } from "./ButtonLink";
import { PostCard } from "./PostCard/PostCard";
import { Reveal } from "./Reveal";
import { Section } from "./Section/Section";

export function LatestPosts({
  blog,
  posts,
}: {
  blog: HomeContent["blog"];
  posts: Post[];
}) {
  if (posts.length === 0) return null;

  return (
    <Section
      id="blog"
      cms="Home page › Latest blog posts · posts live in Blog posts"
      soft
      {...blog}
    >
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
        {posts.map((post, index) => (
          <Reveal key={post.slug} delay={index * 100}>
            <PostCard post={post} />
          </Reveal>
        ))}
      </SimpleGrid>
      <Group justify="center" mt={40}>
        <ButtonLink
          href="/blog"
          variant="default"
          rightSection={<IconArrowRight size={16} />}
        >
          All posts
        </ButtonLink>
      </Group>
    </Section>
  );
}
