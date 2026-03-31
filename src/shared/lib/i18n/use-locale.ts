"use client";

import { usePathname } from "next/navigation";
import { getLocaleFromPath } from "./get-locale-from-path";
import type { Locale } from "@/shared/config/i18n";

export function useLocale(): Locale {
  const pathname = usePathname();
  return getLocaleFromPath(pathname);
}
