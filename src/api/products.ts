import { apiClient } from "./client";

import type { Product, ProductCategory, ProductsResponse } from "../types/product";

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

export async function getProductById(productId: string) {
    const response = await apiClient.get<Product>(`/products/${productId}`);
    return response.data;
}

export async function getProductByCategories() {
    const response = await apiClient.get<ProductCategory[]>('/products/categories');
    return response.data;
}

export async function getProductByCategory(category:string) {
    const response = await apiClient.get<ProductsResponse>(`/products/category/${category}`);
    return response.data;
}