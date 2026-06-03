import { useQuery } from '@tanstack/react-query';

import { getProductByCategories } from '../api/products';

export function useProductCategories() {
  return useQuery({
    queryKey: ['product-categories'],
    queryFn: getProductByCategories,
  });
}