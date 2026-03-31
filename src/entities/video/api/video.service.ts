import { api } from "@/shared/lib/api";
import { toVideo } from "../model/mappers";
import type { Video } from "../model/types";

export async function getVideos(): Promise<Video[]> {
  const { data } = await api.get<any>("/videos");
  return data?.data?.map(toVideo) ?? [];
}
