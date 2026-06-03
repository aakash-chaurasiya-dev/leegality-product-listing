import styles from './PriceRange.module.css';

type PriceRangeFilterProps = {
  minPrice: string;
  maxPrice: string;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
};

export function PriceRangeFilter({
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
}: PriceRangeFilterProps) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Price Range</h3>

      <div className={styles.inputs}>
        <input
          type="number"
          min="0"
          placeholder="Min"
          value={minPrice}
          onChange={(event) => onMinPriceChange(event.target.value)}
          className={styles.input}
        />

        <input
          type="number"
          min="0"
          placeholder="Max"
          value={maxPrice}
          onChange={(event) => onMaxPriceChange(event.target.value)}
          className={styles.input}
        />
      </div>
    </div>
  );
}