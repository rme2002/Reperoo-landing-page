import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container, Text, Title, Typography } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { CmsImage } from "@/components/CmsImage";
import { formatDate, getPost, getPosts } from "@/lib/content";
import classes from "../blog.module.css";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPost((await params).slug);
  return post ? { title: post.title, description: post.excerpt } : {};
}

export default async function PostPage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();

  return (
    <article className={classes.page} data-cms={`Blog posts › ${post.title}`}>
      <Container size={760}>
        <Link href="/blog" className={classes.back}>
          <IconArrowLeft size={16} /> All posts
        </Link>
        <Text c="dimmed" fw={600} size="sm" mt="xl">
          {formatDate(post.date)}
          {post.author && ` · ${post.author}`}
        </Text>
        <Title order={1} className={classes.postTitle}>
          {post.title}
        </Title>
        {post.excerpt && (
          <Text size="xl" c="dimmed" mt="md" lh={1.6}>
            {post.excerpt}
          </Text>
        )}
      </Container>
      {post.cover && (
        <Container size={960} mt={40}>
          <div className={classes.cover}>
            <CmsImage
              src={post.cover}
              alt=""
              sizes="(max-width: 1000px) 100vw, 960px"
              priority
            />
          </div>
        </Container>
      )}
      <Container size={760} mt={40}>
        <Typography className={classes.body}>
          <div dangerouslySetInnerHTML={{ __html: post.html }} />
        </Typography>
      </Container>
    </article>
  );
}
