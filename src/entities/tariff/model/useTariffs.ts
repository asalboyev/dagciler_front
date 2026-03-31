import { useQuery } from "@tanstack/react-query";
import { getTariffs } from "../api/tariff.service";

export function useTariffs() {
  return useQuery({
    queryKey: ["tariffs"],
    queryFn: getTariffs,
    staleTime: 1000 * 60 * 10,
  });
}
