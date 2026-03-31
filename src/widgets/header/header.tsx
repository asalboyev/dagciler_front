"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { LangSwitcher } from "@/shared/ui/lang-switcher";
import { getLocaleFromPath } from "@/shared/lib/i18n/get-locale-from-path";
import { useSiteInfo } from "@/entities/siteinfo";
import { navItems } from "./model/nav-config";
import styles from "./header.module.scss";
import { useBookingModal } from "@/shared/lib/booking-modal";

export function Header() {
  const t = useTranslations("menu");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const { data: siteInfo } = useSiteInfo();
  const { open: openBooking } = useBookingModal();

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const phone = siteInfo?.phone ?? null;
  const isHome =
    pathname === `/${locale}` || pathname === `/${locale}/`;
  const logoSrc =
    isHome || scrolled ? "/images/logo.png" : "/images/logo-secondary.png";
  return (
    <header
      className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${isHome && !scrolled ? styles.innerPage : ""
        }`}
    >
      <div className={styles.container}>
        <Link href={`/${locale}`} className={styles.logo}>
          <Image
            src={logoSrc}
            alt="Dagcilfer"
            width={64}
            height={64}
            priority
          />
        </Link>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}>
          {navItems.map((item) => {
            const href = `/${locale}${item.href === "/" ? "" : item.href}`;
            const isActive =
              item.href === "/"
                ? pathname === `/${locale}` || pathname === `/${locale}/`
                : pathname.startsWith(href);

            return (
              <Link
                key={item.key}
                href={href}
                className={`${styles.navLink} ${isActive ? styles.active : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                {item.labelKey}
              </Link>
            );
          })}

        </nav>

        <div className={styles.actions}>
          {phone && (
            <a href={`tel:${phone.replace(/\s/g, "")}`} className={styles.phone}>
              <span className={styles.phoneNumber}>{phone}</span>
              <span className={styles.phoneLabel}>{t("phone-text")}</span>
            </a>
          )}

          <button className={styles.ctaButton} onClick={() => openBooking({ variant: "call" })}>{t("button")}</button>

          <LangSwitcher />

          <button
            className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ""} ${!isHome && !scrolled && !menuOpen ? styles.burgerBlack : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

    </header>
  );
}
