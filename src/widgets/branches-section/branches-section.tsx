"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useFilials } from "@/entities/filial";
import { pickLocale } from "@/shared/lib/i18n/locale-string";
import { useLocale } from "@/shared/lib/i18n/use-locale";
import { AnimateOnScroll } from "@/shared/ui/animate-on-scroll";
import { Skeleton } from "@/shared/ui/skeleton";
import styles from "./branches-section.module.scss";

function MapIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1" y="2" width="4" height="12" fill="currentColor" opacity="0.3" />
      <rect x="6" y="2" width="4" height="12" fill="currentColor" opacity="0.5" />
      <rect x="11" y="2" width="4" height="12" fill="currentColor" opacity="0.7" />
    </svg>
  );
}

export function BranchesSection() {
  const t = useTranslations("main");
  const locale = useLocale();
  const { data: filials, isPending } = useFilials();

  if (isPending) {
    return (
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.grid}>
            {[0, 1, 2].map((i) => (
              <Skeleton key={i} height="320px" borderRadius="16px" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!filials?.length) return null;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <AnimateOnScroll>
          <div className={styles.header}>
            <h2 className={styles.title}>{t("branches-title")}</h2>
            <p className={styles.subtitle}>
              {t("branches-subtitle")}
            </p>
          </div>
        </AnimateOnScroll>

        <div className={styles.grid}>
          {filials.map((filial, i) => {
            const name = pickLocale(filial.rayon, locale);
            const address = pickLocale(filial.address, locale);
            return (
              <AnimateOnScroll key={filial.id} delay={i * 0.08}>
                <div className={styles.card}>
                  {filial.photo_url && (
                    <div className={styles.imageWrapper}>
                      <Image
                        src={filial.photo_url}
                        alt={name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 416px"
                        className={styles.image}
                      />
                      <span className={styles.badge}>{t("branches-badge")}</span>
                    </div>
                  )}

                  <div className={styles.info}>
                    <span className={styles.label}>{t("filial-tex")}</span>
                    <span className={styles.name}>{name}</span>
                    {address && (
                      <span className={styles.address}>{address}</span>
                    )}
                  </div>

                  {filial.location && (
                    <a
                      href={filial.location}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.mapBtn}
                    >
                      <span>{t("map-button")}</span>
                      <MapIcon />
                    </a>
                  )}
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
}
