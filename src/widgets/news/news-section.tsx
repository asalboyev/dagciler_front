"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { usePosts, PostCard } from "@/entities/post";
import { useLocale } from "@/shared/lib/i18n/use-locale";
import { Button } from "@/shared/ui/button";
import { AnimateOnScroll } from "@/shared/ui/animate-on-scroll";
import { Skeleton } from "@/shared/ui/skeleton";
import styles from "./news-section.module.scss";

export function NewsSection() {
  const t = useTranslations("main");
  const locale = useLocale();
  const { data, isPending } = usePosts(1, 3);
  const posts = data?.data ?? [];

  if (isPending) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <Skeleton height="40px" width="200px" />
          <div className={styles.grid} style={{ marginTop: 24 }}>
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} height="320px" borderRadius="12px" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!posts.length) return null;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <AnimateOnScroll>
          <h2 className={styles.title}>{t("scholl-title")}</h2>
        </AnimateOnScroll>

        <div className={styles.grid}>
          {posts.slice(0, 3).map((post, i) => (
            <AnimateOnScroll key={post.id} delay={i * 0.1}>
              <PostCard post={post} locale={locale} />
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll>
          <Link href={`/${locale}/news`}>
            <Button variant="light" size="lg" className={styles.btn}>
              {t("news-button")}
            </Button>
          </Link>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
