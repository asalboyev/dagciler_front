import type { Metadata } from "next";
import type { ReactNode } from "react";
import { TranslationProvider } from "@/shared/config/translation-provider";
import { Providers } from "@/shared/config/providers";
import { Header } from "@/widgets/header";
import { Footer } from "@/widgets/footer";
import { PageTransition } from "@/shared/ui/page-transition";
import { ScrollToHash } from "@/shared/ui/scroll-to-hash/scroll-to-hash";
import { BookingModalProvider } from "@/shared/lib/booking-modal";
import { BookingModal } from "@/shared/ui/booking-modal";
import { defaultLocale, locales, type Locale } from "@/shared/config/i18n";
import { getSeoMetadata, siteUrl } from "@/shared/config/seo";

export const metadataBase = new URL(siteUrl);

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale = locales.includes(raw as Locale)
    ? (raw as Locale)
    : defaultLocale;
  return getSeoMetadata(locale);
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;

  return (
    <Providers>
      <TranslationProvider locale={locale}>
        <BookingModalProvider>
          <Header />
          <ScrollToHash />
          <PageTransition>{children}</PageTransition>
          <Footer />
          <BookingModal />
        </BookingModalProvider>
      </TranslationProvider>
    </Providers>
  );
}
