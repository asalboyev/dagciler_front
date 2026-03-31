export type TariffType = "tariff" | "special_offer";

export interface Tariff {
  id: number;
  name: string;
  price: string;
  description: string;
  sessions_count: string;
  features: string[];
  benefits: string[];
  type: TariffType;
}
