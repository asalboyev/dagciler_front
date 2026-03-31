import type { ApiImage } from "@/shared/lib/api";

export interface Product {
  id: number;
  title: string;
  slug: string;
  category: string | null;
  sizes: string[];
  image: ApiImage;
}

export interface ProductDetail extends Product {
  description: string;
  price: string;
  gallery: ApiImage[];
}
