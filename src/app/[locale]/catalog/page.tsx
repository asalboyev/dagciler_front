"use client";

import { useState, useEffect, useCallback } from "react";
import { useProducts, ProductCard } from "@/entities/product";
import type { Product } from "@/entities/product";
import { SkeletonCard } from "@/shared/ui/skeleton";
import { useLocale } from "@/shared/lib/i18n/use-locale";
import styles from "./page.module.scss";

/* ── Constants ───────────────────────────────────────────── */

const PER_PAGE = 8;

const FILTER_TABS: { label: string; value: string | undefined }[] = [
  { label: "Все товары", value: undefined },
  { label: "Толстовки", value: "толстовки" },
  { label: "Платья и сарафаны", value: "платья" },
  { label: "Брюки", value: "брюки" },
  { label: "Свитшоты", value: "свитшоты" },
];

/* ── Component ───────────────────────────────────────────── */

export default function CatalogPage() {
  const locale = useLocale();
  const [activeCategory, setActiveCategory] = useState<string | undefined>(
    undefined
  );
  const [page, setPage] = useState(1);
  const [allProducts, setAllProducts] = useState<Product[]>([]);

  const { data, isPending, isFetching } = useProducts(
    page,
    PER_PAGE,
    activeCategory
  );

  // Append products; reset when category changes (page resets to 1)
  useEffect(() => {
    if (!data?.data) return;
    setAllProducts((prev) =>
      page === 1 ? data.data : [...prev, ...data.data]
    );
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleCategoryChange = useCallback((category: string | undefined) => {
    setActiveCategory(category);
    setPage(1);
    setAllProducts([]);
  }, []);

  const handleLoadMore = useCallback(() => {
    setPage((p) => p + 1);
  }, []);

  const isFirstLoad = isPending && page === 1 && allProducts.length === 0;
  const hasMore =
    !!data?.meta &&
    data.meta.current_page < data.meta.last_page &&
    !isFetching;

  return (
    <div className={`${styles.page} pageOffset`}>

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.heroTitle}>Каталог продукции</h1>
          <p className={styles.heroSubtitle}>
            Фирменная одежда нашей танцевальной школы.
          </p>
        </div>
      </section>

      <div className={styles.container}>

        {/* ── Category filters ──────────────────────────── */}
        <nav className={styles.filters} aria-label="Категории товаров">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.label}
              type="button"
              className={`${styles.filterBtn} ${
                activeCategory === tab.value ? styles.filterBtnActive : ""
              }`}
              onClick={() => handleCategoryChange(tab.value)}
              aria-pressed={activeCategory === tab.value}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        {/* ── Products grid ─────────────────────────────── */}
        <div className={styles.grid}>
          {isFirstLoad
            ? Array.from({ length: PER_PAGE }).map((_, i) => (
                <SkeletonCard key={i} />
              ))
            : allProducts.map((product) => (
                <ProductCard key={product.id} product={product} locale={locale} />
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
