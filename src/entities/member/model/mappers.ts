import type { Member } from "./types";

export function toMember(raw: any): Member {
  return {
    id: raw.id,
    name: raw.name ?? raw.full_name ?? "",
    position: raw.position ?? raw.role ?? raw.title ?? "",
    image: raw.images ?? raw.image ?? { lg: null, md: null, sm: null },
    photo_url: raw.photo_url ?? raw.photo ?? null,
  };
}
