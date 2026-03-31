import type { ReactNode } from "react";
import Image from "next/image";
import styles from "./page-banner.module.scss";

interface PageBannerProps {
  image?: string | null;
  title: string;
  subtitle: string;
  children?: ReactNode;
}

export function PageBanner({
  image,
  title,
  subtitle,
  children,
}: PageBannerProps) {
  return (
    <div className={styles.banner}>
      {image && (
        <Image
          src={image}
          alt={title}
          fill
          priority
          sizes="(max-width: 1280px) 100vw, 1284px"
          className={styles.image}
        />
      )}
      <div className={styles.overlay} />
      <div className={styles.content}>
        <div className={styles.text}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
        {children && <div className={styles.actions}>{children}</div>}
      </div>
    </div>
  );
}
