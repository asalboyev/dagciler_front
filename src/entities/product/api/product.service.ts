import { api } from "@/shared/lib/api";
import type { FlatPaginatedResponse, PaginatedResult } from "@/shared/lib/api";
import { toProduct, toProductDetail } from "../model/mappers";
import type { Product, ProductDetail } from "../model/types";

export async function getProducts(
  page = 1,
  perPage = 8,
  category?: string
): Promise<PaginatedResult<Product>> {
  const { data } = await api.get<FlatPaginatedResponse<any>>("/products", {
    params: {
      page,
      per_page: perPage,
      ...(category ? { category } : {}),
    },
  });
  const products = data?.data?.map(toProduct) ?? [];
  return {
    data: products,
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

export async function getProductBySlug(
  slug: string
): Promise<ProductDetail | null> {
  const { data } = await api.get<any>(`/products/${slug}`);
  const raw = data?.data ?? data;
  return raw && !raw.message ? toProductDetail(raw) : null;
}
