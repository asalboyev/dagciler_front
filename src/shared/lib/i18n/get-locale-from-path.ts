import { locales, defaultLocale, type Locale } from "@/shared/config/i18n";

export function getLocaleFromPath(pathname: string): Locale {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0] as Locale;

  if (locales.includes(first)) return first;
  return defaultLocale;
}
