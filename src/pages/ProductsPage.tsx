import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X } from 'lucide-react';
import { fetchProducts } from '../lib/cache';
import type { Product } from '../types';
import ProductCard from '../components/ProductCard';

const categories = [
  { value: '', label: 'All Products' },
  { value: 'inline-filter', label: 'Inline Filters' },
  { value: 'handheld', label: 'Handheld Filters' },
  { value: 'fixed', label: 'Fixed Head Filters' },
  { value: 'dual', label: 'Dual Systems' },
  { value: 'tap-filter', label: 'Tap Filters' },
];

const sortOptions = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'newest', label: 'Newest' },
];

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const activeCategory = searchParams.get('category') || '';
  const activeSort = searchParams.get('sort') || 'popular';
  const filterBestSellers = searchParams.get('filter') === 'best-sellers';

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await fetchProducts({
        category: activeCategory || undefined,
        bestSellers: filterBestSellers || undefined,
        sort: activeSort,
      });
      setProducts(data);
      setLoading(false);
    }
    load();
  }, [activeCategory, activeSort, filterBestSellers]);

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    setSearchParams(params);
  }

  function clearFilters() {
    setSearchParams({});
  }

  const hasFilters = activeCategory || filterBestSellers;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {filterBestSellers ? 'Best Sellers' : 'All Shower Filters'}
          </h1>
          <p className="mt-2 text-gray-600">
            {filterBestSellers
              ? 'Our most popular shower filters, loved by thousands of UK customers.'
              : 'Premium multi-stage shower filters for healthier skin and hair.'}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:gap-8">
          <aside className="hidden lg:block lg:w-64 shrink-0">
            <div className="sticky top-24 rounded-2xl border border-gray-100 bg-white p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">Category</h3>
              <div className="mt-4 space-y-1">
                {categories.map(cat => (
                  <button
                    key={cat.value}
                    onClick={() => updateParam('category', cat.value)}
                    className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                      activeCategory === cat.value
                        ? 'bg-brand-50 font-medium text-brand-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="mt-6 flex w-full items-center justify-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
                >
                  <X className="h-4 w-4" />
                  Clear Filters
                </button>
              )}
            </div>
          </aside>

          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between gap-4">
              <button
                onClick={() => setMobileFiltersOpen(true)}
                className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 lg:hidden"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </button>

              <div className="flex items-center gap-2 ml-auto">
                <label className="text-sm text-gray-500">Sort by:</label>
                <select
                  value={activeSort}
                  onChange={e => updateParam('sort', e.target.value)}
                  className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                >
                  {sortOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="animate-pulse rounded-2xl bg-white p-5">
                    <div className="aspect-square rounded-xl bg-gray-200" />
                    <div className="mt-4 h-4 w-2/3 rounded bg-gray-200" />
                    <div className="mt-2 h-3 w-full rounded bg-gray-200" />
                    <div className="mt-4 h-6 w-1/3 rounded bg-gray-200" />
                  </div>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="rounded-2xl border border-gray-100 bg-white py-16 text-center">
                <p className="text-lg font-medium text-gray-900">No products found</p>
                <p className="mt-1 text-gray-500">Try adjusting your filters.</p>
                <button onClick={clearFilters} className="btn-primary mt-6">
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 max-h-[80vh] overflow-y-auto rounded-t-2xl bg-white p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
              <button onClick={() => setMobileFiltersOpen(false)}>
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900">Category</h4>
            <div className="mt-3 space-y-1">
              {categories.map(cat => (
                <button
                  key={cat.value}
                  onClick={() => {
                    updateParam('category', cat.value);
                    setMobileFiltersOpen(false);
                  }}
                  className={`block w-full rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                    activeCategory === cat.value
                      ? 'bg-brand-50 font-medium text-brand-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            {hasFilters && (
              <button
                onClick={() => {
                  clearFilters();
                  setMobileFiltersOpen(false);
                }}
                className="mt-6 w-full rounded-lg bg-gray-900 px-4 py-3 text-sm font-semibold text-white"
              >
                Clear All Filters
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
