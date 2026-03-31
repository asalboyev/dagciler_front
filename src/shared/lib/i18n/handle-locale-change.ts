import { locales, type Locale } from "@/shared/config/i18n";

export function handleLocaleChange(newLocale: Locale): void {
  if (!locales.includes(newLocale)) return;

  const { pathname } = window.location;
  const segments = pathname.split("/").filter(Boolean);

  if (locales.includes(segments[0] as Locale)) {
    segments[0] = newLocale;
  } else {
    segments.unshift(newLocale);
  }

  window.location.pathname = "/" + segments.join("/");
}
