import type { ApiImage } from "@/shared/lib/api";

export interface Service {
  id: number;
  title: string;
  description: string;
  teacher: string;
  teacher_image: ApiImage;
  days: string;
  time: string;
  group_type: string;
  branch: string;
  price: string;
  deadline: string;
  kvota: number;
  zayafka: number;
}
