import type { Metadata, Viewport } from "next";
import { Manrope, Unbounded, Viaoda_Libre } from "next/font/google";
import "@/shared/styles/index.scss";

export const metadata: Metadata = {
  title: "Dagciler.uz — Toshkentda Kavkaz va Gruzin Raqslari Maktabi",
  description:
    "Sizni lezginka va gruzin milliy raqslari olamiga taklif etamiz! \"Dagciler\" raqs maktabida professionallardan dars oling. Bolalar va kattalar uchun mashg‘ulotlar.",
  keywords: [
    "kavkaz raqslari",
    "gruzin raqslari maktabi",
    "lezginka darslari",
    "Toshkentda raqs kursi",
    "Dagciler raqs ansambli",
    "erkaklar va ayollar uchun kavkaz raqsi",
  ],
  icons: {
    icon: [{ url: "/logo.svg", type: "image/svg+xml" }],
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const manrope = Manrope({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const unbounded = Unbounded({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600"],
  variable: "--font-unbounded",
  display: "swap",
});

const viaodaLibre = Viaoda_Libre({
  subsets: ["latin", "cyrillic"],
  weight: ["400"],
  variable: "--font-viaoda",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning className={`${manrope.variable} ${unbounded.variable} ${viaodaLibre.variable}`}>
      <body>{children}</body>
    </html>
  );
}
