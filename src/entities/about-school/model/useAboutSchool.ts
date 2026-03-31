import { useQuery } from "@tanstack/react-query";
import { getAboutSchool } from "../api/about-school.service";

export function useAboutSchool() {
  return useQuery({
    queryKey: ["about-school"],
    queryFn: getAboutSchool,
    staleTime: 1000 * 60 * 10,
  });
}
