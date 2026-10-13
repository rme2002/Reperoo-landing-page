import Link from "next/link";
import { Text } from "@mantine/core";
import { formatDate, type Post } from "@/lib/content";
import { CmsImage } from "../CmsImage";
import classes from "./PostCard.module.css";

export function PostCard({ post }: { post: Post }) {
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
        <Text size="xs" c="dimmed" fw={600}>
          {formatDate(post.date)}
          {post.author && ` · ${post.author}`}
        </Text>
        <Text fw={700} size="lg" mt={6} className={classes.title}>
          {post.title}
        </Text>
        {post.excerpt && (
          <Text size="sm" c="dimmed" mt="xs" lineClamp={3}>
            {post.excerpt}
          </Text>
        )}
      </div>
    </Link>
  );
}
