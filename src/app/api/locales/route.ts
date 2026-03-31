import { NextResponse } from "next/server";
import { locales, defaultLocale } from "@/shared/config/i18n";

export async function GET() {
  return NextResponse.json({ locales, defaultLocale });
}
