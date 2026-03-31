import type { ApiImage } from "@/shared/lib/api";
import type { Product, ProductDetail } from "./types";

function parseSizes(raw: unknown): string[] {
  if (Array.isArray(raw)) return raw.map(String).filter(Boolean);
  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed.map(String).filter(Boolean) : [raw];
    } catch {
      return raw.split(",").map((s) => s.trim()).filter(Boolean);
    }
  }
  return [];
}

function parseGallery(raw: unknown, fallback: ApiImage): ApiImage[] {
  if (Array.isArray(raw) && raw.length > 0) {
    return raw.map((item) => {
      if (typeof item === "string") return { lg: item, md: item, sm: item };
      return item as ApiImage;
    });
  }
  return [fallback];
}

export function toProduct(raw: any): Product {
  return {
    id: raw.id,
    title: raw.title ?? raw.name ?? "",
    slug: raw.slug ?? String(raw.id),
    category: raw.category ?? raw.type ?? null,
    sizes: parseSizes(raw.sizes ?? raw.size ?? raw.available_sizes ?? []),
    image: raw.images ?? raw.image ?? { lg: null, md: null, sm: null },
  };
}

export function toProductDetail(raw: any): ProductDetail {
  const base = toProduct(raw);
  return {
    ...base,
    description: raw.description ?? raw.desc ?? "",
    price: String(raw.price ?? ""),
    gallery: parseGallery(
      raw.gallery ?? raw.images_list ?? raw.photos ?? [],
      base.image
    ),
  };
}
