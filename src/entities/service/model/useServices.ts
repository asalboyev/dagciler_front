import { useQuery } from "@tanstack/react-query";
import { getServices } from "../api/service.service";

export function useServices() {
  return useQuery({
    queryKey: ["services"],
    queryFn: getServices,
    staleTime: 1000 * 60 * 5,
  });
}
