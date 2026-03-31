import { api } from "@/shared/lib/api";
import type { FlatPaginatedResponse } from "@/shared/lib/api";
import { toTariff } from "../model/mappers";
import type { Tariff } from "../model/types";

export async function getTariffs(): Promise<Tariff[]> {
  const { data } = await api.get<any>("/tariffs");
  return data?.data?.map(toTariff) ?? [];
}
