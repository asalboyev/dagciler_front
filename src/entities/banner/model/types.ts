import type { ApiImage } from "@/shared/lib/api";

export interface Banner {
  id: number;
  title: string;
  description: string;
  link: string | null;
  video_url: string | null;
  image: ApiImage;
}
