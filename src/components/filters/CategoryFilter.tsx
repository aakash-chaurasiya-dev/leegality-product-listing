import type { ProductCategory } from '../../types/product';
import styles from './CategoryFilter.module.css';

type CategoryFilterProps = {
  categories?: ProductCategory[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
};

export function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) {
  return (
    <div className={styles.container}>
      <label htmlFor="category" className={styles.label}>
        Category
      </label>

      <select
        id="category"
        value={selectedCategory}
        onChange={(event) => onCategoryChange(event.target.value)}
        className={styles.select}
      >
        <option value="">All Categories</option>

        {categories?.map((category) => (
          <option key={category.slug} value={category.slug}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
}