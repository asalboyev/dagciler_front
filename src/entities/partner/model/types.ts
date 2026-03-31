import type { ApiImage } from "@/shared/lib/api";

export interface Partner {
  id: number;
  name: string;
  image: ApiImage;
  link?: string;
}
