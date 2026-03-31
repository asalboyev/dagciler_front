import { useQuery } from "@tanstack/react-query";
import { getFaqs } from "../api/faq.service";

export function useFaqs() {
  return useQuery({
    queryKey: ["url"],
    queryFn: getFaqs,
    staleTime: 1000 * 60 * 10,
  });
}
