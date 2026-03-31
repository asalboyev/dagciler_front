"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useProduct, useProducts, ProductCard } from "@/entities/product";
import { Skeleton, SkeletonText } from "@/shared/ui/skeleton";
import { getFallbackImage } from "@/shared/lib/responsive-images";
import { useLocale } from "@/shared/lib/i18n/use-locale";
import styles from "./page.module.scss";

/* ── Price formatter ────────────────────────────────────── */

function formatPrice(raw: string): string {
  if (!raw) return "";
  // If already contains "сум" or other currency marker, return as-is
  if (/[a-zа-яёА-ЯЁ]/i.test(raw)) return raw;
  const num = parseFloat(raw.replace(/[\s,]/g, ""));
  if (isNaN(num)) return raw;
  return new Intl.NumberFormat("ru-RU").format(num) + " сум";
}

/* ── Loading skeleton ───────────────────────────────────── */

function PageSkeleton() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Skeleton height="48px" width="220px" borderRadius="12px" />
        <div className={styles.productArea}>
          <div className={styles.thumbnails}>
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} height="240px" borderRadius="8px" />
            ))}
          </div>
          <Skeleton height="734px" borderRadius="8px" className={styles.mainImageWrapper} />
          <div className={styles.infoCard}>
            <Skeleton height="60px" borderRadius="8px" />
            <SkeletonText lines={2} />
            <Skeleton height="76px" borderRadius="8px" />
            <Skeleton height="76px" borderRadius="8px" />
            <Skeleton height="64px" borderRadius="16px" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Page component ─────────────────────────────────────── */

export default function ProductDetailPage() {
  const locale = useLocale();
  const { slug } = useParams<{ locale: string; slug: string }>();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { data: product, isPending } = useProduct(slug);
  const { data: relatedData } = useProducts(1, 5);

  if (isPending) return <PageSkeleton />;

  if (!product) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <p className={styles.notFound}>Товар не найден.</p>
        </div>
      </div>
    );
  }

  // Gallery: use product.gallery if available, otherwise fall back to main image
  const gallery =
    product.gallery.length > 1 ? product.gallery : [product.image];
  const currentImageUrl = getFallbackImage(
    gallery[selectedIndex] ?? product.image
  );

  const relatedProducts = (relatedData?.data ?? [])
    .filter((p) => p.slug !== slug)
    .slice(0, 4);

  return (
    <div className={`${styles.page} pageOffset`}>
      <div className={styles.container}>

        {/* ── Back button ───────────────────────────────── */}
        <Link href={`/${locale}/catalog`} className={styles.backBtn}>
          Перейти в каталог
        </Link>

        {/* ── Product area ──────────────────────────────── */}
        <div className={styles.productArea}>

          {/* ── Thumbnails column ─────────────────────── */}
          <div className={styles.thumbnails}>
            {gallery.map((img, i) => (
              <button
                key={i}
                type="button"
                className={`${styles.thumb} ${
                  i === selectedIndex ? styles.thumbActive : ""
                }`}
                onClick={() => setSelectedIndex(i)}
                aria-label={`Фото ${i + 1}`}
                aria-pressed={i === selectedIndex}
              >
                <Image
                  src={getFallbackImage(img)}
                  alt={`${product.title} — фото ${i + 1}`}
                  fill
                  sizes="200px"
                  className={styles.thumbImage}
                />
              </button>
            ))}
          </div>

          {/* ── Main image ────────────────────────────── */}
          <div className={styles.mainImageWrapper}>
            <Image
              src={currentImageUrl}
              alt={product.title}
              fill
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 524px"
              className={styles.mainImage}
            />
          </div>

          {/* ── Info card ─────────────────────────────── */}
          <div className={styles.infoCard}>

            <div className={styles.infoTop}>
              <h1 className={styles.infoTitle}>{product.title}</h1>
              {product.description && (
                <p className={styles.infoDesc}>{product.description}</p>
              )}
            </div>

            {product.sizes.length > 0 && (
              <div className={styles.infoSection}>
                <span className={styles.sectionLabel}>Размеры:</span>
                <div className={styles.sizesRow}>
                  {product.sizes.map((size) => (
                    <span key={size} className={styles.sizePill}>
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {product.price && (
              <div className={styles.infoSection}>
                <span className={styles.sectionLabel}>Цена:</span>
                <div className={styles.priceTag}>
                  <span className={styles.priceValue}>
                    {formatPrice(product.price)}
                  </span>
                </div>
              </div>
            )}

            <button type="button" className={styles.orderBtn}>
              Заказать
            </button>

          </div>
        </div>
      </div>

      {/* ── Related products ──────────────────────────────── */}
      {relatedProducts.length > 0 && (
        <section className={styles.related}>
          <div className={styles.relatedContainer}>
            <h2 className={styles.relatedTitle}>Другие товары</h2>
            <div className={styles.relatedGrid}>
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} locale={locale} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
