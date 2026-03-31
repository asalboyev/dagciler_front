const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";
const BASE_URL = API_BASE.replace(/\/api$/, "");

export function resolveApiImageUrl(url: string | null | undefined): string {
  if (!url) return "/images/placeholder.png";
  if (url.startsWith("http://") || url.startsWith("https://")) return url;
  return `${BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}

export function resolveHtmlImageUrls(html: string): string {
  return html.replace(
    /src="(?!http)(\/[^"]+)"/g,
    (_, path) => `src="${BASE_URL}${path}"`
  );
}
