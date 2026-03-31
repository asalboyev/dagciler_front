"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";
import { locales, type Locale } from "@/shared/config/i18n";
import { handleLocaleChange } from "@/shared/lib/i18n/handle-locale-change";
import styles from "./lang-switcher.module.scss";

const localeFlags: Record<Locale, { src: string; alt: string }> = {
  uz: { src: "/flags/uz.svg", alt: "O'zbekcha" },
  ru: { src: "/flags/ru.svg", alt: "Русский" },
};

export function LangSwitcher() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const currentLocale = useLocale() as Locale;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentFlag = localeFlags[currentLocale];
  const otherLocales = locales.filter((l) => l !== currentLocale);

  return (
    <div className={styles.switcher} ref={ref}>
      <button
        className={styles.trigger}
        onClick={() => setOpen(!open)}
        aria-label="Change language"
      >
        <Image
          src={currentFlag.src}
          alt={currentFlag.alt}
          width={24}
          height={24}
          className={styles.flagIcon}
        />
      </button>

      {open && (
        <ul className={styles.dropdown}>
          {otherLocales.map((locale) => (
            <li key={locale}>
              <button
                className={styles.option}
                onClick={() => {
                  handleLocaleChange(locale);
                  setOpen(false);
                }}
              >
                <Image
                  src={localeFlags[locale].src}
                  alt={localeFlags[locale].alt}
                  width={24}
                  height={24}
                  className={styles.flagIcon}
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
