import { api } from "@/shared/lib/api";
import type { FlatPaginatedResponse } from "@/shared/lib/api";
import { toPartner } from "../model/mappers";
import type { Partner } from "../model/types";

export async function getPartners(): Promise<Partner[]> {
  try {
    const { data } = await api.get<FlatPaginatedResponse<any>>("/partners");
    return data?.data?.map(toPartner) ?? [];
  } catch {
    return [];
  }
}
