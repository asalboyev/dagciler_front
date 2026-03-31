import { NextRequest, NextResponse } from "next/server";
import { fetchTranslations } from "@/shared/config/translations";
import type { Locale } from "@/shared/config/i18n";

export async function GET(request: NextRequest) {
  const locale = (request.nextUrl.searchParams.get("locale") ?? "uz") as Locale;

  const translations = await fetchTranslations(locale);
  return NextResponse.json(translations);
}
