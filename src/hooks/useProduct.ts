import { useQuery } from "@tanstack/react-query";
import { getProduct, getProductById } from "../api/products";


type UseProductsParams = {
  page: number;
  limit?: number;
};

export function useProducts({ page, limit = 12 }: UseProductsParams) {
    const skip = (page - 1) * limit;

    return useQuery({
        queryKey: ['products', page, limit],
        queryFn: () => getProduct({ limit, skip }),
    })
}

export function useProduct({ productId }: { productId: string }) {
    return useQuery({
        queryKey: ['product', productId],
        queryFn: () => getProductById(productId),
        enabled: !!productId,
    })
}