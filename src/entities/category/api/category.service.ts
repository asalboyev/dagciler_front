import { api } from "@/shared/lib/api";
import type { FlatPaginatedResponse } from "@/shared/lib/api";
import { toCategory } from "../model/mappers";
import type { Category } from "../model/types";

export async function getCategories(): Promise<Category[]> {
  const { data } = await api.get<FlatPaginatedResponse<any>>("/categories");
  return data?.data?.map(toCategory) ?? [];
}
