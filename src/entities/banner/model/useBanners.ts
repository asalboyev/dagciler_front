import { useQuery } from "@tanstack/react-query";
import { getBanners } from "../api/banner.service";

export function useBanners() {
  return useQuery({
    queryKey: ["banners"],
    queryFn: getBanners,
    staleTime: 1000 * 60 * 5,
  });
}
