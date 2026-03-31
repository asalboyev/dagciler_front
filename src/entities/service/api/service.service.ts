import { api } from "@/shared/lib/api";
import type { FlatPaginatedResponse } from "@/shared/lib/api";
import { toService } from "../model/mappers";
import type { Service } from "../model/types";

export async function getServices(): Promise<Service[]> {
  const { data } = await api.get<FlatPaginatedResponse<any>>("/services");
  return data?.data?.map(toService) ?? [];
}
