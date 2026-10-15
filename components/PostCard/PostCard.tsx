import Link from "next/link";
import { Text, Title } from "@mantine/core";
import { formatDate, type Post } from "@/lib/content";
import { CmsImage } from "../CmsImage";
import classes from "./PostCard.module.css";

export function PostCard({
  post,
  headingOrder,
}: {
  post: Post;
  headingOrder: 2 | 3;
}) {
  return (
    <Link href={`/blog/${post.slug}`} className={classes.card}>
      <div className={classes.cover}>
        {post.cover && (
          <CmsImage
            src={post.cover}
            alt=""
            sizes="(max-width: 760px) 100vw, 360px"
          />
        )}
      </div>
      <div className={classes.body}>
        <Text size="sm" c="dimmed">
          {formatDate(post.date)}
        </Text>
        <Title
          order={headingOrder}
          size="h4"
          fw={600}
          mt="xs"
          className={classes.title}
        >
          {post.title}
        </Title>
        {post.excerpt && (
          <Text size="sm" c="dimmed" mt="xs" lineClamp={3}>
            {post.excerpt}
          </Text>
        )}
      </div>
    </Link>
  );
}
