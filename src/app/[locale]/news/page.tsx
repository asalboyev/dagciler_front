"use client";

import { useState, useEffect, useCallback } from "react";
import { usePosts, PostCard } from "@/entities/post";
import type { Post } from "@/entities/post";
import { useCategories } from "@/entities/category";
import { DynamicPageBanner } from "@/shared/ui/page-banner";
import { SkeletonCard } from "@/shared/ui/skeleton";
import { useLocale } from "@/shared/lib/i18n/use-locale";
import styles from "./page.module.scss";
import { useTranslations } from "next-intl";

/* ── Constants ───────────────────────────────────────────── */

const PER_PAGE = 6;

const ALL_TAB_LABEL = "Все новости";

/* ── Component ───────────────────────────────────────────── */

export default function NewsPage() {
  const locale = useLocale();
  const [activeType, setActiveType] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const tMenu = useTranslations("menu");
  const t = useTranslations("main");
  const [allPosts, setAllPosts] = useState<Post[]>([]);

  const { data: categories } = useCategories();
  const { data, isPending, isFetching } = usePosts(page, PER_PAGE, activeType);

  // Append fetched posts to accumulated list; reset on type change (page === 1)
  useEffect(() => {
    if (!data?.data) return;
    setAllPosts((prev) =>
      page === 1 ? data.data : [...prev, ...data.data]
    );
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleTypeChange = useCallback((type: string | undefined) => {
    setActiveType(type);
    setPage(1);
    setAllPosts([]);
  }, []);

  const handleLoadMore = useCallback(() => {
    setPage((p) => p + 1);
  }, []);

  const isFirstLoad = isPending && page === 1 && allPosts.length === 0;
  const hasMore =
    !!data?.meta &&
    data.meta.current_page < data.meta.last_page &&
    !isFetching;

  return (
    <div className={`${styles.page} pageOffset`}>
      <div className={styles.container}>

        {/* ── Hero ──────────────────────────────────────── */}
        <div className={styles.hero}>
          <DynamicPageBanner
            title={tMenu("news")}
            subtitle={t("novosti-title")}
            bannerImage="/images/hero.png"
          />
        </div>

        {/* ── Category filters ──────────────────────────── */}
        <nav className={styles.filters} aria-label="Категории новостей">
          <button
            type="button"
            className={`${styles.filterBtn} ${
              activeType === undefined ? styles.filterBtnActive : ""
            }`}
            onClick={() => handleTypeChange(undefined)}
            aria-pressed={activeType === undefined}
          >
            {ALL_TAB_LABEL}
          </button>
          {categories?.map((cat) => (
            <button
              key={cat.id}
              type="button"
              className={`${styles.filterBtn} ${
                activeType === cat.slug ? styles.filterBtnActive : ""
              }`}
              onClick={() => handleTypeChange(cat.slug)}
              aria-pressed={activeType === cat.slug}
            >
              {cat.name}
            </button>
          ))}
        </nav>

        {/* ── Posts grid ────────────────────────────────── */}
        <div className={styles.grid}>
          {isFirstLoad
            ? Array.from({ length: PER_PAGE }).map((_, i) => (
                <SkeletonCard key={i} />
              ))
            : allPosts.map((post) => (
                <PostCard key={post.id} post={post} locale={locale} />
              ))}
        </div>

        {/* ── Skeleton for subsequent pages ─────────────── */}
        {isFetching && page > 1 && (
          <div className={styles.grid} style={{ marginTop: 0 }}>
            {Array.from({ length: PER_PAGE }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {/* ── Load more ─────────────────────────────────── */}
        {!isFirstLoad && hasMore && (
          <div className={styles.loadMoreWrap}>
            <button
              type="button"
              className={styles.loadMoreBtn}
              onClick={handleLoadMore}
              disabled={isFetching}
            >
              Показать ещё
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
