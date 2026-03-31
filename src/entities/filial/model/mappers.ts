import type { Filial } from "./types";

const EMPTY_LOCALE = { uz: null, ru: null, en: null };

export function toFilial(raw: any): Filial {
  return {
    id: raw.id,
    title: raw.title ?? null,
    rayon: raw.rayon ?? EMPTY_LOCALE,
    address: raw.address ?? EMPTY_LOCALE,
    phone: raw.phone ?? null,
    location: raw.location ?? null,
    photo_url: raw.photo_url ?? raw.photo ?? null,
  };
}
