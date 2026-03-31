import { useQuery } from "@tanstack/react-query";
import { getAboutCourse } from "../api/about-course.service";

export function useAboutCourse() {
  return useQuery({
    queryKey: ["about-course"],
    queryFn: getAboutCourse,
    staleTime: 1000 * 60 * 10,
  });
}
