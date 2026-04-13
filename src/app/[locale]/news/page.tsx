"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { usePosts, PostCard } from "@/entities/post";
import type { Post } from "@/entities/post";
import { useCategories } from "@/entities/category";
import { DynamicPageBanner } from "@/shared/ui/page-banner";
import { SkeletonCard } from "@/shared/ui/skeleton";
import { useLocale } from "@/shared/lib/i18n/use-locale";
import { useTranslations } from "next-intl";
import styles from "./page.module.scss";

/* ── Constants ───────────────────────────────────────────── */

const PER_PAGE = 6;
const ALL_TAB_LABEL = "Все новости";

/* ── Component ───────────────────────────────────────────── */

export default function NewsPage() {
  const locale = useLocale();
  const tMenu = useTranslations("menu");
  const t = useTranslations("main");

  const [activeType, setActiveType] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [allPosts, setAllPosts] = useState<Post[]>([]);

  const { data: categories } = useCategories();

  // 🚫 removed activeType from API
  const { data, isPending, isFetching } = usePosts(page, PER_PAGE);

  /* ── Accumulate posts ───────────────────────────────────── */

  useEffect(() => {
    if (!data?.data) return;

    setAllPosts((prev) =>
      page === 1 ? data.data : [...prev, ...data.data]
    );
  }, [data, page]);

  /* ── Local filtering (memoized) ─────────────────────────── */

  const filteredPosts = useMemo(() => {
    if (!activeType) return allPosts;

    return allPosts.filter(
      (post) => post.category?.slug === activeType
    );
  }, [allPosts, activeType]);

  /* ── Handlers ───────────────────────────────────────────── */

  const handleTypeChange = useCallback((type: string | undefined) => {
    setActiveType(type);
    // ⚠️ DO NOT reset posts or page
  }, []);

  const handleLoadMore = useCallback(() => {
    setPage((p) => p + 1);
  }, []);

  /* ── States ─────────────────────────────────────────────── */

  const isFirstLoad =
    isPending && page === 1 && allPosts.length === 0;

  const hasMore =
    !!data?.meta &&
    data.meta.current_page < data.meta.last_page;

  /* ── Render ─────────────────────────────────────────────── */

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
            className={`${styles.filterBtn} ${activeType === undefined ? styles.filterBtnActive : ""
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
              className={`${styles.filterBtn} ${activeType === cat.slug ? styles.filterBtnActive : ""
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
          {isFirstLoad ? (
            Array.from({ length: PER_PAGE }).map((_, i) => (
              <SkeletonCard key={i} />
            ))
          ) : (
            filteredPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                locale={locale}
              />
            ))
          )}
        </div>

        {/* ── Skeleton for next pages ───────────────────── */}
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
              {tMenu('see-more')}
            </button>
          </div>
        )}

      </div>
    </div>
  );
}