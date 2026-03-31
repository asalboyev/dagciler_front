import type { ApiImage } from "./api/types";
import { resolveApiImageUrl } from "./api-image-url";

interface SrcSetOptions {
  smWidth?: number;
  mdWidth?: number;
  lgWidth?: number;
}

export function buildSrcSet(
  image: ApiImage,
  options: SrcSetOptions = {}
): string {
  const { smWidth = 200, mdWidth = 600, lgWidth = 1000 } = options;
  const parts: string[] = [];

  if (image.sm)
    parts.push(`${resolveApiImageUrl(image.sm)} ${smWidth}w`);
  if (image.md)
    parts.push(`${resolveApiImageUrl(image.md)} ${mdWidth}w`);
  if (image.lg)
    parts.push(`${resolveApiImageUrl(image.lg)} ${lgWidth}w`);

  return parts.join(", ");
}

export function getFallbackImage(image: ApiImage): string {
  return resolveApiImageUrl(image.lg ?? image.md ?? image.sm);
}
