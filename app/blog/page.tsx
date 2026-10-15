import type { Metadata } from "next";
import { Container, SimpleGrid, Text, Title } from "@mantine/core";
import { PostCard } from "@/components/PostCard/PostCard";
import { Reveal } from "@/components/Reveal";
import { getPosts, site } from "@/lib/content";
import classes from "./blog.module.css";

export const metadata: Metadata = {
  title: site.blog.title,
  description: site.blog.description,
  alternates: { canonical: "./" },
};

export default function BlogPage() {
  const posts = getPosts();

  return (
    <section
      className={classes.page}
      data-cms="Site settings › Blog page · posts in Blog posts"
    >
      <Container size="lg">
        <div className={classes.intro}>
          <Title order={1}>{site.blog.title}</Title>
          {site.blog.lead && (
            <Text className={classes.lead}>{site.blog.lead}</Text>
          )}
        </div>
        {posts.length > 0 ? (
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
            {posts.map((post, index) =>
              index < 3 ? (
                <PostCard key={post.slug} post={post} headingOrder={2} eager />
              ) : (
                <Reveal key={post.slug} delay={(index % 3) * 80}>
                  <PostCard post={post} headingOrder={2} />
                </Reveal>
              ),
            )}
          </SimpleGrid>
        ) : (
          <Text c="dimmed">{site.blog.emptyText}</Text>
        )}
      </Container>
    </section>
  );
}
