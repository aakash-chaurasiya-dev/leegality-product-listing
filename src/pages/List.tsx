import { useMemo, useState } from 'react';
import clsx from 'clsx';

import { BrandFilter } from '../components/filters/BrandFilter';
import { CategoryFilter } from '../components/filters/CategoryFilter';
import { PriceRangeFilter } from '../components/filters/PriceRangeFilter';
import { ProductCard } from '../components/product/ProductCard';
import { useProductCategories } from '../hooks/useProductCategories';
import { useProducts } from '../hooks/useProduct';
import { ErrorState } from '../components/ErrorState';
import { Loader } from '../components/Loader';
import styles from './List.module.css';

const PRODUCTS_PER_PAGE = 12;

export default function ProductListing() {
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);

  const { data, isLoading, error } = useProducts({
    page,
    limit: PRODUCTS_PER_PAGE,
    category: selectedCategory,
  });

  const { data: categories } = useProductCategories();

  const brands = useMemo(() => {
    const productBrands =
      data?.products
        .map((product) => product.brand)
        .filter((brand): brand is string => Boolean(brand)) ?? [];

    return Array.from(new Set(productBrands)).sort();
  }, [data?.products]);

  const filteredProducts = useMemo(() => {
    return (
      data?.products.filter((product) => {
        const matchesSearch = product.title
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

        const matchesMinPrice = minPrice
          ? product.price >= Number(minPrice)
          : true;

        const matchesMaxPrice = maxPrice
          ? product.price <= Number(maxPrice)
          : true;

        const matchesBrand =
          selectedBrands.length > 0
            ? product.brand && selectedBrands.includes(product.brand)
            : true;

        return (
          matchesSearch &&
          matchesMinPrice &&
          matchesMaxPrice &&
          matchesBrand
        );
      }) ?? []
    );
  }, [data?.products, searchQuery, minPrice, maxPrice, selectedBrands]);

  const paginatedProducts = filteredProducts.slice(
    (page - 1) * PRODUCTS_PER_PAGE,
    page * PRODUCTS_PER_PAGE,
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE),
  );

  function handleCategoryChange(category: string) {
    setSelectedCategory(category);
    setSelectedBrands([]);
    setPage(1);
  }

  function handleBrandChange(brand: string) {
    setSelectedBrands((currentBrands) =>
      currentBrands.includes(brand)
        ? currentBrands.filter((item) => item !== brand)
        : [...currentBrands, brand],
    );
    setPage(1);
  }

  function handleMinPriceChange(value: string) {
    setMinPrice(value);
    setPage(1);
  }

  function handleMaxPriceChange(value: string) {
    setMaxPrice(value);
    setPage(1);
  }

  function handleSearchChange(value: string) {
    setSearchQuery(value);
    setPage(1);
  }

  function closeFilterDrawer() {
    setIsFilterDrawerOpen(false);
  }

  function handleClearFilters() {
    setSelectedCategory('');
    setMinPrice('');
    setMaxPrice('');
    setSelectedBrands([]);
    setSearchQuery('');
    setPage(1);
    closeFilterDrawer();
  }

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorState message="Failed to load products. Please try again later." />;
  }

  const filterPanel = (
    <>
      <div className={styles.filterHeader}>
        <h2 className={styles.filterTitle}>Filters</h2>
        <div className={styles.filterHeaderActions}>
          <button onClick={handleClearFilters} className={styles.clearButton}>
            Clear
          </button>
          <button
            type="button"
            className={styles.closeDrawerButton}
            onClick={closeFilterDrawer}
          >
            Close
          </button>
        </div>
      </div>

      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      <PriceRangeFilter
        minPrice={minPrice}
        maxPrice={maxPrice}
        onMinPriceChange={handleMinPriceChange}
        onMaxPriceChange={handleMaxPriceChange}
      />

      <BrandFilter
        brands={brands}
        selectedBrands={selectedBrands}
        onBrandChange={handleBrandChange}
      />
    </>
  );

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>Amazon-style product catalogue</p>
          <h1 className={styles.title}>Products</h1>
        </div>

        <input
          type="search"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(event) => handleSearchChange(event.target.value)}
          className={styles.searchInput}
        />

        <button
          type="button"
          className={styles.filterToggleButton}
          onClick={() => setIsFilterDrawerOpen(true)}
        >
          Filters
        </button>
      </header>

      <div className={styles.layout}>
        <div
          className={clsx(
            styles.drawerOverlay,
            isFilterDrawerOpen && styles.drawerOverlayOpen,
          )}
          onClick={closeFilterDrawer}
        />

        <aside
          className={clsx(
            styles.sidebarDrawer,
            isFilterDrawerOpen && styles.sidebarDrawerOpen,
          )}
        >
          {filterPanel}
        </aside>

        <aside className={styles.sidebar}>{filterPanel}</aside>

        <section className={styles.content}>
          <div className={styles.resultInfo}>
            Showing {paginatedProducts.length} of {filteredProducts.length}{' '}
            products
          </div>

          {paginatedProducts.length > 0 ? (
            <div className={styles.productGrid}>
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>No products found.</div>
          )}

          <div className={styles.pagination}>
            <button
              className={styles.paginationButton}
              disabled={page === 1}
              onClick={() => setPage((currentPage) => currentPage - 1)}
            >
              Previous
            </button>

            <span className={styles.pageInfo}>
              Page {page} of {totalPages}
            </span>

            <button
              className={styles.paginationButton}
              disabled={page === totalPages}
              onClick={() => setPage((currentPage) => currentPage + 1)}
            >
              Next
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}