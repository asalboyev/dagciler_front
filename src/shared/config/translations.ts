import { Locale } from "./i18n";

interface TranslationResponse {
  [key: string]: string | TranslationResponse;
}

function flattenTranslations(
  obj: TranslationResponse,
  prefix = ""
): Record<string, string> {
  const result: Record<string, string> = {};
  for (const key in obj) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    const value = obj[key];
    if (typeof value === "string") {
      result[fullKey] = value;
    } else if (typeof value === "object" && value !== null) {
      Object.assign(result, flattenTranslations(value, fullKey));
    }
  }
  return result;
}

function unflattenTranslations(flat: Record<string, string>): Record<string, any> {
  const result: Record<string, any> = {};
  for (const [key, value] of Object.entries(flat)) {
    const parts = key.split(".");
    let obj = result;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!obj[parts[i]]) obj[parts[i]] = {};
      obj = obj[parts[i]];
    }
    obj[parts[parts.length - 1]] = value;
  }
  return result;
}

export async function fetchTranslations(
  locale: Locale
): Promise<Record<string, any>> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/translations?locale=${locale}`, {
      headers: {
        "Accept-Language": locale,
      }
    }
    );
    if (!res.ok) return {};
    const data: TranslationResponse = await res.json();
    return unflattenTranslations(flattenTranslations(data));
  } catch {
    return {};
  }
}
