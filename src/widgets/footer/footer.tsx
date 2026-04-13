"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useSiteInfo } from "@/entities/siteinfo";
import { Button } from "@/shared/ui/button";
import styles from "./footer.module.scss";
import { useBookingModal } from "@/shared/lib/booking-modal";

export function Footer() {
  const t = useTranslations("menu");
  const { data: siteInfo } = useSiteInfo();
  const phone = siteInfo?.phone ?? null;
  const { open } = useBookingModal()

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Image
          src="/logo.svg"
          alt="Dagciler"
          width={64}
          height={64}
          className={styles.logo}
        />

        <div className={styles.right}>
          {phone && (
            <a href={`tel:${phone?.replace(/\s/g, "")}`} className={styles.phone}>
              <span className={styles.phoneNumber}>{phone}</span>
              <span className={styles.phoneLabel}>{t("phone-text")}</span>
            </a>
          )}
          <Button variant="red" size="lg" className={styles.cta} onClick={() => open({ variant: "call" })}>
            {t("button")}
          </Button>
        </div>
      </div>
    </footer>
  );
}
