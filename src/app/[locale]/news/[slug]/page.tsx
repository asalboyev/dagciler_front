"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { usePost, usePosts, PostCard } from "@/entities/post";
import { HtmlContent } from "@/shared/ui/html-content";
import { Skeleton, SkeletonText } from "@/shared/ui/skeleton";
import { getFallbackImage } from "@/shared/lib/responsive-images";
import { useLocale } from "@/shared/lib/i18n/use-locale";
import styles from "./page.module.scss";

/* ── Date formatter ─────────────────────────────────────── */

function formatDate(raw: string): string {
  if (!raw) return "";
  // Already in DD.MM.YYYY format
  if (/^\d{2}\.\d{2}\.\d{4}$/.test(raw)) return raw;
  const d = new Date(raw);
  if (isNaN(d.getTime())) return raw;
  return d.toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

/* ── Loading skeleton ───────────────────────────────────── */

function PageSkeleton() {
  return (
    <div className={`${styles.page} pageOffset`}>
      <div className={styles.container}>
        <div className={styles.inner}>
          <div style={{ display: "flex", gap: 16 }}>
            <Skeleton height="64px" width="197px" borderRadius="50px" />
            <Skeleton height="64px" width="160px" borderRadius="50px" />
          </div>
          <Skeleton height="422px" borderRadius="8px" />
          <div className={styles.content}>
            <Skeleton height="96px" borderRadius="8px" />
            <SkeletonText lines={10} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Page component ─────────────────────────────────────── */

export default function NewsDetailPage() {
  const locale = useLocale();
  const { slug } = useParams<{ locale: string; slug: string }>();

  const { data: post, isPending } = usePost(slug);
  const { data: relatedData } = usePosts(1, 4);

  if (isPending) return <PageSkeleton />;

  if (!post) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <p className={styles.notFound}>Статья не найдена.</p>
        </div>
      </div>
    );
  }

  const imageUrl = getFallbackImage(post.image);
  const relatedPosts = (relatedData?.data ?? [])
    .filter((p) => p.slug !== slug)
    .slice(0, 3);

  return (
    <div className={`${styles.page} pageOffset`}>
      <div className={styles.container}>
        <div className={styles.inner}>

          {/* ── Meta tags ──────────────────────────────── */}
          <div className={styles.meta}>
            {post.type && (
              <span className={styles.metaTag}>{post.type}</span>
            )}
            <span className={styles.metaTag}>{formatDate(post.published_at)}</span>
          </div>

          {/* ── Article image ──────────────────────────── */}
          {imageUrl && (
            <div className={styles.imageWrapper}>
              <Image
                src={imageUrl}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 848px"
                className={styles.image}
              />
            </div>
          )}

          {/* ── Reading content ────────────────────────── */}
          <div className={styles.content}>
            <h1 className={styles.title}>{post.title}</h1>
            <HtmlContent html={post.content} />
          </div>

        </div>
      </div>

      {/* ── Related posts ──────────────────────────────── */}
      {relatedPosts.length > 0 && (
        <section className={styles.related}>
          <div className={styles.relatedContainer}>
            <h2 className={styles.relatedTitle}>Другие новости</h2>
            <div className={styles.relatedGrid}>
              {relatedPosts.map((p) => (
                <PostCard key={p.id} post={p} locale={locale} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
