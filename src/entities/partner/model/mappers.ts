import type { Partner } from "./types";

export function toPartner(raw: any): Partner {
  return {
    id: raw.id,
    name: raw.name ?? raw.title ?? "",
    image: raw.images ?? raw.image ?? { lg: null, md: null, sm: null },
    link: raw.link ?? raw.url ?? null,
  };
}
