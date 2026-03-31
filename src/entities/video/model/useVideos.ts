import { useQuery } from "@tanstack/react-query";
import { getVideos } from "../api/video.service";

export function useVideos() {
  return useQuery({
    queryKey: ["videos"],
    queryFn: getVideos,
    staleTime: 1000 * 60 * 10,
  });
}
