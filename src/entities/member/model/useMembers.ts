import { useQuery } from "@tanstack/react-query";
import { getMembers } from "../api/member.service";

export function useMembers() {
  return useQuery({
    queryKey: ["members"],
    queryFn: getMembers,
    staleTime: 1000 * 60 * 10,
  });
}
