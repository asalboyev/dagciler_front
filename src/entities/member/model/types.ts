import type { ApiImage } from "@/shared/lib/api";

export interface Member {
  id: number;
  name: string;
  position: string;
  image: ApiImage;
  photo_url: string | null;
}
