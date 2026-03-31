import { api } from "@/shared/lib/api";
import type { FlatPaginatedResponse } from "@/shared/lib/api";
import { toFeedback } from "../model/mappers";
import type { Feedback } from "../model/types";

export async function getFeedbacks(): Promise<Feedback[]> {
  const { data } = await api.get<FlatPaginatedResponse<any>>("/feedbacks");
  return data?.data?.map((item: any, i: number) => toFeedback(item, i)) ?? [];
}
