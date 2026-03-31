import { api } from "@/shared/lib/api";
import type { FlatPaginatedResponse } from "@/shared/lib/api";
import { toFilial } from "../model/mappers";
import type { Filial } from "../model/types";

export async function getFilials(): Promise<Filial[]> {
  const { data } = await api.get<FlatPaginatedResponse<any>>("/filials");
  return data?.data?.map(toFilial) ?? [];
}
