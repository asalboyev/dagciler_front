import { api } from "@/shared/lib/api";
import { toAboutSchool } from "../model/mappers";
import type { AboutSchool } from "../model/types";

export async function getAboutSchool(): Promise<AboutSchool | null> {
  const { data } = await api.get<{ data: any[] }>("/about-schools");
  const first = data?.data?.[0];
  return first ? toAboutSchool(first) : null;
}
