"use client";

import { useTranslations } from "next-intl";
import {
  PhoneIcon,
  InstagramIcon,
  TelegramIcon,
} from "@/shared/ui/icons";
import { useSiteInfo } from "@/entities/siteinfo";
import { useFilials } from "@/entities/filial";
import { pickLocale } from "@/shared/lib/i18n/locale-string";
import { useLocale } from "@/shared/lib/i18n/use-locale";
import { AnimateOnScroll } from "@/shared/ui/animate-on-scroll";
import styles from "./contact-section.module.scss";

function MapIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
      <g clipPath="url(#clip0_contact)">
        <path
          d="M3.01709 7.54395L2.07861 8.0791H2.07764C1.81488 8.22963 1.69543 8.17916 1.67432 8.16699C1.65351 8.15491 1.54844 8.07579 1.54834 7.76953V3.45215C1.54834 3.4293 1.56039 3.3643 1.60693 3.28418C1.65313 3.20476 1.70422 3.16025 1.72803 3.14648H1.729L3.01709 2.4082V7.54395Z"
          fill="white"
          stroke="white"
          strokeWidth="1.06494"
        />
        <path
          d="M6.25696 3.0166V8.45996L4.72571 7.72266V2.25781L6.25696 3.0166Z"
          fill="white"
          stroke="white"
          strokeWidth="0.798701"
        />
        <path
          d="M9.76192 2.87957V7.19699C9.76192 7.47654 9.56224 7.82264 9.31376 7.96463L7.83099 8.81443C7.6535 8.91615 7.43237 8.78801 7.43237 8.58344V2.83448C7.43237 2.73889 7.48361 2.65064 7.56663 2.60326L8.43519 2.10749C9.16289 1.69039 9.76192 2.03649 9.76192 2.87957Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_contact">
          <rect width="10.6494" height="10.6494" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

/** 🔧 Helpers */
const normalizePhone = (phone?: string | null) =>
  phone ? `tel:${phone.replace(/\s/g, "")}` : "tel:+998946776778";

const normalizeUrl = (url?: string | null, fallback?: string) => {
  if (!url) return fallback || "#";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `https://${url}`;
};

const getInstagramUsername = (url?: string | null) => {
  if (!url) return "Dagciler_ds";
  return url.split("/").filter(Boolean).pop() || "Dagciler_ds";
};

const getTelegramUsername = (tg?: string | null) => {
  if (!tg) return "Dagciler_ds";
  return tg
    .replace("https://t.me/", "")
    .replace("http://t.me/", "")
    .replace("@", "")
    .trim();
};

export function ContactSection({ isHome }: { isHome?: boolean }) {
  const t = useTranslations("main");
  const locale = useLocale();
  const { data: siteInfo } = useSiteInfo();
  const { data: filials } = useFilials();

  const contacts = [
    {
      icon: <PhoneIcon size={20} />,
      label: t("contact-phone"),
      value: siteInfo?.phone ?? "+998 94 677 6778",
      description: t("contact-phone-text"),
      href: normalizePhone(siteInfo?.phone),
    },
    {
      icon: <InstagramIcon size={20} />,
      label: "Instagram",
      value: `@${getInstagramUsername(siteInfo?.instagram)}`,
      description: t("contact-instagram-tex"),
      href: normalizeUrl(
        siteInfo?.instagram,
        "https://instagram.com/Dagciler_ds"
      ),
    },
    {
      icon: <TelegramIcon size={20} />,
      label: t("tg-channel"),
      value: `@${getTelegramUsername(siteInfo?.telegram_channel)}`,
      description: t("tg-channel-description"),
      href: `https://t.me/${getTelegramUsername(siteInfo?.telegram_channel)}`,
    },
    {
      icon: <TelegramIcon size={20} />,
      label: t("tg"),
      value: `@${getTelegramUsername(siteInfo?.telegram_manager)}`,
      description: t("contact-telegram-tex"),
      href: `https://t.me/${getTelegramUsername(siteInfo?.telegram_manager)}`,
    },
  ] as {
    icon: React.ReactNode;
    label: string;
    value: string;
    description: string;
    href: string;
  }[];

  if (!contacts.length && !filials?.length) return null;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <AnimateOnScroll>
          <div className={styles.header}>
            <h2 className={styles.title}>{t("contacts-title")}</h2>
            <p className={styles.subtitle}>{t("contact-subtitle")}</p>
          </div>
        </AnimateOnScroll>

        {contacts.length > 0 && (
          <div className={styles.contactsGrid}>
            {contacts.map((contact, i) => (
              <AnimateOnScroll
                key={contact.label}
                delay={i * 0.08}
                className={styles.contactGridItem}
              >
                <a
                  href={contact.href}
                  target={
                    contact.href.startsWith("tel:") ? undefined : "_blank"
                  }
                  rel="noopener noreferrer"
                  className={styles.contactCard}
                >
                  <div className={styles.contactTop}>
                    <span className={styles.contactIcon}>
                      {contact.icon}
                    </span>
                    <div className={styles.contactInfo}>
                      <span className={styles.contactLabel}>
                        {contact.label}
                      </span>
                      <span className={styles.contactValue}>
                        {contact.value}
                      </span>
                    </div>
                  </div>
                  <hr className={styles.divider} />
                  <p className={styles.contactDesc}>
                    {contact.description}
                  </p>
                </a>
              </AnimateOnScroll>
            ))}
          </div>
        )}

        {isHome && filials && filials.length > 0 && (
          <div className={styles.branchesGrid}>
            {filials.map((filial, i) => {
              const name = pickLocale(filial.rayon, locale);
              const address = pickLocale(filial.address, locale);

              return (
                <AnimateOnScroll
                  key={filial.id}
                  delay={i * 0.1}
                  className={styles.branchGridItem}
                >
                  <div className={styles.branchCard}>
                    <div className={styles.branchInfo}>
                      <span className={styles.branchLabel}>
                        {t("filial-tex")}
                      </span>
                      <span className={styles.branchName}>{name}</span>
                      {address && (
                        <span className={styles.branchAddress}>
                          {address}
                        </span>
                      )}
                    </div>

                    {filial.location ? (
                      <a
                        href={filial.location}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.mapBtn}
                      >
                        <span>{t("map-button")}</span>
                        <MapIcon />
                      </a>
                    ) : (
                      <button
                        disabled
                        style={{ opacity: "50%" }}
                        className={styles.mapBtn}
                      >
                        <span>{t("map-button")}</span>
                        <MapIcon />
                      </button>
                    )}
                  </div>
                </AnimateOnScroll>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}