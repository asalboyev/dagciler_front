import { useQuery } from "@tanstack/react-query";
import { getPostBySlug } from "../api/post.service";

export function usePost(slug: string) {
  return useQuery({
    queryKey: ["post", slug],
    queryFn: () => getPostBySlug(slug),
    enabled: !!slug,
  });
}
