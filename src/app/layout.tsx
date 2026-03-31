import { Manrope, Unbounded, Viaoda_Libre } from "next/font/google";
import "@/shared/styles/index.scss";

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
