import { useQuery } from "@tanstack/react-query";
import { getFeedbacks } from "../api/feedback.service";

export function useFeedbacks() {
  return useQuery({
    queryKey: ["feedbacks"],
    queryFn: getFeedbacks,
    staleTime: 1000 * 60 * 5,
  });
}
