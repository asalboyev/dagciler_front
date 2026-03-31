import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/product.service";

export function useProducts(page = 1, perPage = 8, category?: string) {
  return useQuery({
    queryKey: ["products", page, perPage, category],
    queryFn: () => getProducts(page, perPage, category),
    staleTime: 1000 * 60 * 5,
  });
}
