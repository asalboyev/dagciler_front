import { api } from "@/shared/lib/api";
import type { FlatPaginatedResponse } from "@/shared/lib/api";
import { toMember } from "../model/mappers";
import type { Member } from "../model/types";

export async function getMembers(): Promise<Member[]> {
  const { data } = await api.get<FlatPaginatedResponse<any>>("/members");
  return data?.data?.map(toMember) ?? [];
}
