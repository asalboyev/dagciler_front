"use client";

import { NextIntlClientProvider } from "next-intl";
import { useEffect, useState, type ReactNode } from "react";
import type { Locale } from "./i18n";

interface TranslationProviderProps {
  locale: Locale;
  children: ReactNode;
}

export function TranslationProvider({
  locale,
  children,
}: TranslationProviderProps) {
  const [messages, setMessages] = useState<Record<string, any>>({});

  useEffect(() => {
    fetch(`/api/translations`, {
      headers: {
        "Accept-Language": locale,
      },
    })
      .then((res) => res.json())
      .then(setMessages)
      .catch(() => {});
  }, [locale]);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
