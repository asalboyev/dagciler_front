import type { AboutSchool } from "./types";

export function toAboutSchool(raw: any): AboutSchool {
  return {
    id: raw.id,
    title: raw.title ?? null,
    subtitle: raw.subtitle ?? null,
    content1: raw.content_1 ?? null,
    content2: raw.content_2 ?? null,
    image: raw.image ?? null,
  };
}
