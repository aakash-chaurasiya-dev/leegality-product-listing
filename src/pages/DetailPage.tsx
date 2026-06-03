import { Link, useLocation, useParams } from 'react-router-dom';

import { useProduct } from '../hooks/useProduct';
import styles from './DetailPage.module.css';

export default function ProductDetail() {
  const { id } = useParams();
  const location = useLocation();

  const { data: product, isLoading, error } = useProduct({
    productId: id,
  });

  const backHref = location.state?.from ?? '/';

  if (isLoading) {
    return <div className={styles.state}>Loading product...</div>;
  }

  if (error || !product) {
    return <div className={styles.state}>Product not found.</div>;
  }

  return (
    <main className={styles.page}>
      <Link to={backHref} className={styles.backButton}>
        ← Back to products
      </Link>

      <section className={styles.container}>
        <img
          src={product.thumbnail}
          alt={product.title}
          className={styles.image}
        />

        <div className={styles.content}>
          <p className={styles.category}>{product.category}</p>
          <h1 className={styles.title}>{product.title}</h1>
          <p className={styles.description}>{product.description}</p>

          <div className={styles.meta}>
            <p>
              <span>Price:</span> ${product.price}
            </p>
            <p>
              <span>Rating:</span> ⭐ {product.rating}
            </p>
            <p>
              <span>Brand:</span> {product.brand ?? 'N/A'}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}