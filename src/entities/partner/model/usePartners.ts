import { useQuery } from "@tanstack/react-query";
import { getPartners } from "../api/partner.service";

export function usePartners() {
  return useQuery({
    queryKey: ["partners"],
    queryFn: getPartners,
    staleTime: 1000 * 60 * 10,
    retry: false,
  });
}
