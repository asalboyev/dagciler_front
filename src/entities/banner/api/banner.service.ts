import { api } from "@/shared/lib/api";
import type { FlatPaginatedResponse } from "@/shared/lib/api";
import { toBanner } from "../model/mappers";
import type { Banner } from "../model/types";

export async function getBanners(): Promise<Banner[]> {
  const { data } = await api.get<FlatPaginatedResponse<any>>("/banners");
  return data?.data?.map(toBanner) ?? [];
}
