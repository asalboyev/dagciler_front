import type { Locale } from "@/shared/config/i18n";
import { defaultLocale } from "@/shared/config/i18n";

export type LocaleString = Record<Locale, string | null>;

export function pickLocale(
  value: LocaleString | string | null | undefined,
  locale: Locale
): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  return (
    value[locale] ??
    value[defaultLocale] ??
    (Object.values(value).find((v) => v !== null) ?? "")
  );
}
