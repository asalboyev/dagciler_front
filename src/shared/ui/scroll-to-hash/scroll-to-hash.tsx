"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const HEADER_HEIGHT = 96;

export function ScrollToHash() {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;

    const id = hash.slice(1);

    const scroll = () => {
      const el = document.getElementById(id);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;
      window.scrollTo({ top, behavior: "smooth" });
    };

    // Wait for Lenis to finish its immediate scroll-to-0 and for page layout to settle
    const timer = setTimeout(scroll, 200);
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
