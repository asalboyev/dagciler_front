import type { Metadata } from "next";
import { defaultLocale, type Locale } from "./i18n";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://dagciler.uz";

const SEO_BY_LOCALE: Record<
  Locale,
  { title: string; description: string; keywords: string }
> = {
  uz: {
    title: "Dagciler.uz — Toshkentda Kavkaz va Gruzin Raqslari Maktabi",
    description:
      'Sizni lezginka va gruzin milliy raqslari olamiga taklif etamiz! "Dagciler" raqs maktabida professionallardan dars oling. Bolalar va kattalar uchun mashg‘ulotlar.',
    keywords:
      "kavkaz raqslari, gruzin raqslari maktabi, lezginka darslari, Toshkentda raqs kursi, Dagciler raqs ansambli, erkaklar va ayollar uchun kavkaz raqsi",
  },
  ru: {
    title: "Dagciler.uz — Школа кавказских и грузинских танцев в Ташкенте",
    description:
      'Приглашаем вас в мир лезгинки и грузинских народных танцев! Занимайтесь у профессионалов в школе танцев «Dagciler». Занятия для детей и взрослых.',
    keywords:
      "кавказские танцы, школа грузинских танцев, уроки лезгинки, курс танцев в Ташкенте, ансамбль Dagciler, кавказский танец для мужчин и женщин",
  },
};

export function getSeoMetadata(locale: Locale): Metadata {
  const seo = SEO_BY_LOCALE[locale] ?? SEO_BY_LOCALE[defaultLocale];
  const canonical = `${siteUrl}/${locale}`;

  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords.split(", ").map((k) => k.trim()).filter(Boolean),
    alternates: {
      canonical,
      languages: {
        uz: `${siteUrl}/uz`,
        ru: `${siteUrl}/ru`,
        "x-default": `${siteUrl}/${defaultLocale}`,
      },
    },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: canonical,
      siteName: "Dagciler",
      locale: locale === "uz" ? "uz_UZ" : "ru_RU",
      type: "website",
      images: [{ url: "/logo.svg", alt: "Dagciler" }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: ["/logo.svg"],
    },
    authors: [{ name: "Dagciler" }],
  };
}
