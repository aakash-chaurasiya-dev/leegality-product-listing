import { apiClient } from "./client";

import { Product, ProductCategory, ProductsResponse } from "../types/product";

type GetProductsParams = {
    limit?: number;
    skip?: number;
}

export async function getProduct({
    limit= 12,
    skip=0,
}: GetProductsParams = {}) {
    const response = await apiClient.get<ProductsResponse>('/products',{
        params:{
            limit,
            skip,
        }
    })

    return response.data;
}