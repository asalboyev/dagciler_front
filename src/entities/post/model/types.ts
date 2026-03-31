import type { ApiImage } from "@/shared/lib/api";

export interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: ApiImage;
  type: string | null;
  published_at: string;
  created_at: string;
}

export interface PostDetail extends Post {
  prev?: { slug: string; title: string } | null;
  next?: { slug: string; title: string } | null;
}
