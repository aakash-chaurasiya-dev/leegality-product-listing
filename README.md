# Leegality Product Listing

## Overview

This project is a React + TypeScript product listing application built with Vite. It consumes the DummyJSON Products API and includes a responsive product catalog, filtering, search, and a product detail page.

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router DOM
- TanStack React Query
- Axios
- Tailwind CSS
- CSS Modules

## Features

- Responsive product listing page
- Search by product title
- Category filtering
- Price range filtering
- Brand filtering
- Mobile drawer sidebar for filters
- Product detail page with description, price, rating, brand, and category
- Loading and error states

## Project Structure

```text
src
├── api
│   ├── client.ts
│   └── products.ts
├── components
│   ├── ErrorState.tsx
│   ├── Loader.tsx
│   ├── filters
│   │   ├── BrandFilter.tsx
│   │   ├── CategoryFilter.tsx
│   │   └── PriceRangeFilter.tsx
│   └── product
│       └── ProductCard.tsx
├── hooks
│   ├── useProduct.ts
│   └── useProductCategories.ts
├── pages
│   ├── DetailPage.tsx
│   └── List.tsx
├── providers
│   └── QueryProvider.tsx
├── routes
│   └── AppRouter.tsx
├── types
│   └── product.ts
├── App.tsx
├── index.css
└── main.tsx
```

## Routing

- `/` — Product listing page
- `/product/:id` — Product detail page

## API Endpoints Used

- `GET /products`
- `GET /products/categories`
- `GET /products/category/{category}`
- `GET /products/{id}`

## Available Scripts

- `yarn dev` — Start the development server
- `yarn build` — Build the production app
- `yarn preview` — Preview the production build locally
- `yarn lint` — Run ESLint checks

## Getting Started

```bash
git clone https://github.com/aakash-chaurasiya-dev/leegality-product-listing
cd leegality-product-listing
yarn
yarn dev
```

Open `http://localhost:5173` in your browser.

## Notes

- Filters are available in a responsive sidebar on desktop and a drawer on mobile.
- Product categories and brands are derived from the DummyJSON API.
- The app uses React Query for caching and data fetching.

```

### Preview Production Build

```bash
yarn preview
```

---

## Architectural Decisions

### React Query

React Query is used for:

* API caching
* Background refetching
* Loading states
* Error handling
* Query invalidation

### Axios

A dedicated API client is created to centralize:

* Base URL configuration
* Request configuration
* Future interceptors

### Custom Hooks

Data fetching logic is abstracted into custom hooks:

* useProduct
* useProductCategories

This keeps UI components focused on presentation.

### CSS Modules

CSS Modules are used to:

* Avoid style collisions
* Improve maintainability
* Keep styles scoped to components

### TypeScript

TypeScript provides:

* Type safety
* Better developer experience
* Improved maintainability
* Safer API integration

---

## Assumptions

* DummyJSON API remains available.
* Product data is considered read-only.
* Brand filtering is performed client-side.
* Price filtering is performed client-side.
* Search filtering is performed client-side.

---

## Performance Considerations

* React Query caching reduces unnecessary API calls.
* Memoized filtering using useMemo.
* Component-level separation reduces re-renders.
* Lazy loading can be introduced for route-based code splitting.

---

## Author

Aakash Chaurasiya