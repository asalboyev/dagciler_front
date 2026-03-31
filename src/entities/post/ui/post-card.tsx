"use client";

import Link from "next/link";
import Image from "next/image";
import { getFallbackImage } from "@/shared/lib/responsive-images";
import type { Post } from "../model/types";
import styles from "./post-card.module.scss";

interface PostCardProps {
  post: Post;
  locale: string;
}

export function PostCard({ post, locale }: PostCardProps) {
  return (
    <Link href={`/${locale}/news/${post.slug}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={getFallbackImage(post.image)}
          alt={post.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 416px"
          className={styles.image}
        />
      </div>
      <div className={styles.body}>
        <time className={styles.date}>{post.published_at?.split(' ')?.[0]}</time>
        <h3 className={styles.title}>{post.title}</h3>
      </div>
    </Link>
  );
}
