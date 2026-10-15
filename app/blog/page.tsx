import type { Metadata } from "next";
import { Container, SimpleGrid, Text, Title } from "@mantine/core";
import { PostCard } from "@/components/PostCard/PostCard";
import { Reveal } from "@/components/Reveal";
import { getPosts } from "@/lib/content";
import classes from "./blog.module.css";

export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  const posts = getPosts();

  return (
    <section className={classes.page} data-cms="Blog posts">
      <Container size="lg">
        <div className={classes.intro}>
          <Title order={1}>Blog</Title>
          <Text className={classes.lead}>
            Product news, customer stories and tips for calmer projects.
          </Text>
        </div>
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
      </Container>
    </section>
  );
}
