import type { LocaleString } from "@/shared/lib/i18n/locale-string";

export interface Filial {
  id: number;
  title: string | null;
  rayon: LocaleString;
  address: LocaleString;
  phone: string | null;
  location: string | null;
  photo_url: string | null;
}
