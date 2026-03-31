"use client";

import Link from "next/link";
import Image from "next/image";
import { getFallbackImage } from "@/shared/lib/responsive-images";
import type { Product } from "../model/types";
import styles from "./product-card.module.scss";

interface ProductCardProps {
  product: Product;
  locale: string;
}

export function ProductCard({ product, locale }: ProductCardProps) {
  const imageUrl = getFallbackImage(product.image);
  const href = `/${locale}/catalog/${product.slug}`;

  return (
    <article className={styles.card}>
      <Link href={href} className={styles.imageLink}>
        {imageUrl && (
          <div className={styles.imageWrapper}>
            <Image
              src={imageUrl}
              alt={product.title}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 308px"
              className={styles.image}
            />
          </div>
        )}
        <h3 className={styles.title}>{product.title}</h3>
      </Link>

      {product.sizes.length > 0 && (
        <div className={styles.sizes}>
          {product.sizes.map((size) => (
            <span key={size} className={styles.sizePill}>
              {size}
            </span>
          ))}
        </div>
      )}

      <Link href={href} className={styles.showBtn}>
        Показать
      </Link>
    </article>
  );
}
