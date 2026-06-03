import { useProducts } from "../hooks/useProduct";
import { ProductCard } from "../components/product/ProductCard";
import styles from './List.module.css';

export default function List() {

  const { data, isLoading, error } = useProducts({ page: 1 });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>something went wrong</div>;
  }

  
  return (
    <main className={styles.page}>
      <h1 className={styles.title}>Products</h1>

      <div className={styles.grid}>
        {data?.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  )
}
