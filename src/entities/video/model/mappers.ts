import type { Video } from "./types";

export function toVideo(raw: any): Video {
  return {
    id: raw.id,
    title: raw.title ?? "",
    url: raw.url ?? null,
    videoUrl: raw.video_url ?? null,
    videoFile: raw.video_file ?? null,
    subtitle: raw.subtitle ?? null
  };
}
