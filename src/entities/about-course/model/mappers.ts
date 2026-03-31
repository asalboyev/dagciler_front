import type { AboutCourse } from "./types";

export function toAboutCourse(raw: any): AboutCourse {
  return {
    id: raw.id,
    title: raw.title ?? null,
    subtitle: raw.subtitle ?? null,
    content: raw.content ?? null,
    image: raw.image ?? null,
  };
}
