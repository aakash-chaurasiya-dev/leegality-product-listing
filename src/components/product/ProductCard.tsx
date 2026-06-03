import { Link } from 'react-router-dom';

import type { Product } from '../../types/product';
import styles from './ProductCard.module.css';

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/product/${product.id}`} className={styles.card}>
      <img
        src={product.thumbnail}
        alt={product.title}
        className={styles.image}
      />

      <div className={styles.content}>
        <h2 className={styles.title}>{product.title}</h2>
        <p className={styles.price}>${product.price}</p>
        <p className={styles.rating}>⭐ {product.rating}</p>
      </div>
    </Link>
  );
}