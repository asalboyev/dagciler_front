import type { Banner } from "./types";

export function toBanner(raw: any): Banner {
  return {
    id: raw.id,
    title: raw.title ?? "",
    description: raw.desc ?? raw.description ?? "",
    link: raw.url ?? raw.link ?? null,
    video_url: raw.video ?? raw.video_url ?? null,
    image: raw.images ?? raw.image ?? { lg: null, md: null, sm: null },
  };
}
