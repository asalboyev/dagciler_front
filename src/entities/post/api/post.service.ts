import { api } from "@/shared/lib/api";
import type { FlatPaginatedResponse, PaginatedResult } from "@/shared/lib/api";
import { toPost, toPostDetail } from "../model/mappers";
import type { Post, PostDetail } from "../model/types";

export interface GetPostsParams {
  page?: number;
  per_page?: number;
  type?: string;
}

export async function getPosts(
  params?: GetPostsParams
): Promise<PaginatedResult<Post>> {
  const { data } = await api.get<FlatPaginatedResponse<any>>("/posts", {
    params,
  });
  const posts = data?.data?.map(toPost) ?? [];
  return {
    data: posts,
    meta: data
      ? {
          current_page: data.current_page,
          last_page: data.last_page,
          per_page: data.per_page,
          total: data.total,
        }
      : undefined,
  };
}

export async function getPostBySlug(slug: string): Promise<PostDetail | null> {
  const { data } = await api.get<any>(`/posts/${slug}`);
  const raw = data?.data ?? data;
  return raw && !raw.message ? toPostDetail(raw) : null;
}
