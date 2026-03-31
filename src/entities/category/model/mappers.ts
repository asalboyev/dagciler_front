import type { Category } from "./types";

export function toCategory(raw: any): Category {
  return {
    id: raw.id,
    name: raw.name ?? raw.title ?? "",
    slug: raw.slug ?? "",
  };
}
