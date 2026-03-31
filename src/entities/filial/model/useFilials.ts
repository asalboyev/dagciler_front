import { useQuery } from "@tanstack/react-query";
import { getFilials } from "../api/filial.service";

export function useFilials() {
  return useQuery({
    queryKey: ["filials"],
    queryFn: getFilials,
    staleTime: 1000 * 60 * 10,
  });
}
