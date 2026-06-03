import { useQuery } from "@tanstack/react-query";
import { getProduct, getProductByCategory, getProductById } from "../api/products";


type UseProductsParams = {
  page: number;
  limit?: number;
  category?: string;
};

export function useProducts({ page, limit = 12, category }: UseProductsParams) {
    const skip = (page - 1) * limit;

    return useQuery({
        queryKey: ['products', { page, limit, category }],
        queryFn: () => {
            if (category) {
                return getProductByCategory(category);
            }
            return getProduct({ limit:100, skip })
        },
    })
}

export function useProduct({ productId }: { productId?: string }) {
    return useQuery({
        queryKey: ['product', productId],
        queryFn: () => getProductById(productId as string),
        enabled: !!productId,
    })
}