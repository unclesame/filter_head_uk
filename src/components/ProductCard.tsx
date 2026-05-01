import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/currency';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const discount = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl bg-white border border-gray-100 transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1">
      {product.is_best_seller && (
        <div className="absolute left-3 top-3 z-10 rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
          Best Seller
        </div>
      )}
      {discount > 0 && (
        <div className="absolute right-3 top-3 z-10 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
          -{discount}%
        </div>
      )}

      <Link to={`/products/${product.slug}`} className="relative aspect-square overflow-hidden bg-gray-50">
        <img
          src={product.image_url}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          onError={(e) => { (e.target as HTMLImageElement).src = '/favicon.svg'; }}
        />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <Link to={`/products/${product.slug}`}>
          <p className="text-xs font-medium uppercase tracking-wider text-brand-600">
            {product.category.replace('-', ' ')}
          </p>
          <h3 className="mt-1.5 text-base font-semibold text-gray-900 transition-colors group-hover:text-brand-600 line-clamp-2">
            {product.name}
          </h3>
        </Link>

        <p className="mt-2 text-sm text-gray-500 line-clamp-2">{product.short_description}</p>

        <p className="mt-2 text-xs font-medium">
          {product.stock_quantity > 0 ? (
            <span className="text-green-600">In Stock</span>
          ) : (
            <span className="text-red-600">Out of Stock</span>
          )}
        </p>

        <div className="mt-2 flex items-center gap-1.5">
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < Math.floor(product.rating)
                    ? 'fill-amber-400 text-amber-400'
                    : 'fill-gray-200 text-gray-200'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.review_count})</span>
        </div>

        <div className="mt-auto pt-4 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-gray-900">{formatPrice(product.price)}</span>
            {product.original_price && (
              <span className="text-sm text-gray-400 line-through">
                {formatPrice(product.original_price)}
              </span>
            )}
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              addItem(product);
            }}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-600 text-white shadow-sm transition-all duration-200 hover:bg-brand-700 hover:shadow-md active:scale-95"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
