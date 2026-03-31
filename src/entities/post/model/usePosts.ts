import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../api/post.service";

export function usePosts(page = 1, perPage = 6, type?: string) {
  return useQuery({
    queryKey: ["posts", page, perPage, type],
    queryFn: () => getPosts({ page, per_page: perPage, type }),
  });
}
