import type { Tariff } from "./types";

function parseFeatures(raw: any): string[] {
  if (Array.isArray(raw)) return raw.map(String);
  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed.map(String) : [raw];
    } catch {
      return raw.split("\n").filter(Boolean);
    }
  }
  return [];
}

export function toTariff(raw: any): Tariff {
  return {
    id: raw.id,
    name: raw.name ?? raw.title ?? "",
    price: String(raw.price ?? ""),
    description: raw.description ?? raw.desc ?? "",
    sessions_count: String(
      raw.sessions_count ?? raw.sessions_info ?? raw.count ?? raw.lessons ?? ""
    ),
    features: parseFeatures(raw.program_includes ?? raw.features ?? []),
    benefits: parseFeatures(raw.benefits ?? []),
    type: raw.type === "special_offer" ? "special_offer" : "tariff",
  };
}
