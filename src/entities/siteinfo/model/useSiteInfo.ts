import { useQuery } from "@tanstack/react-query";
import { getSiteInfo } from "../api/siteinfo.service";

export function useSiteInfo() {
  return useQuery({
    queryKey: ["siteinfo"],
    queryFn: getSiteInfo,
    staleTime: 1000 * 60 * 5,
  });
}
