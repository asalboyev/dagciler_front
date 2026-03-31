import { api } from "@/shared/lib/api";
import { toAboutCourse } from "../model/mappers";
import type { AboutCourse } from "../model/types";

export async function getAboutCourse(): Promise<AboutCourse | null> {
  const { data } = await api.get<{ data: any[] }>("/about-courses");
  const first = data?.data?.[0];
  return first ? toAboutCourse(first) : null;
}
