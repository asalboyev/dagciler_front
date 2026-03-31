import { api } from "@/shared/lib/api";
import type { FlatPaginatedResponse } from "@/shared/lib/api";
import { toFaq } from "../model/mappers";
import type { Faq } from "../model/types";

export async function getFaqs(): Promise<Faq[]> {
  const { data } = await api.get<FlatPaginatedResponse<any>>("/questions");
  return data?.data?.map(toFaq) ?? [];
}
