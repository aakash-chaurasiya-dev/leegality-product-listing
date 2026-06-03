import styles from './BrandFilter.module.css';

type BrandFilterProps = {
  brands: string[];
  selectedBrands: string[];
  onBrandChange: (brand: string) => void;
};

export function BrandFilter({
  brands,
  selectedBrands,
  onBrandChange,
}: BrandFilterProps) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Brand</h3>

      <div className={styles.list}>
        {brands.map((brand) => (
          <label key={brand} className={styles.option}>
            <input
              type="checkbox"
              checked={selectedBrands.includes(brand)}
              onChange={() => onBrandChange(brand)}
            />
            <span>{brand}</span>
          </label>
        ))}
      </div>
    </div>
  );
}