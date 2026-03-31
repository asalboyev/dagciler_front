import type { Post, PostDetail } from "./types";

export function toPost(raw: any): Post {
  // images can be an array (API v1) or a single object — normalise to ApiImage
  const imageRaw = Array.isArray(raw.images) ? raw.images[0] : raw.images;
  return {
    id: raw.id,
    title: raw.title ?? "",
    slug: raw.slug ?? "",
    excerpt: raw.excerpt ?? raw.desc ?? "",
    content: raw.desc ?? raw.content ?? "",
    image: imageRaw ?? raw.image ?? { lg: null, md: null, sm: null },
    type: raw.type ?? raw.category ?? null,
    published_at: raw.date ?? raw.published_at ?? raw.created_at ?? "",
    created_at: raw.created_at ?? raw.date ?? "",
  };
}

export function toPostDetail(raw: any): PostDetail {
  return {
    ...toPost(raw),
    prev: raw.prev ?? null,
    next: raw.next ?? null,
  };
}
