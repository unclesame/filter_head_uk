import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ShoppingCart,
  Minus,
  Plus,
  Truck,
  Shield,
  RotateCcw,
  Check,
  ChevronRight,
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { fetchProductBySlug, fetchProducts } from '../lib/cache';
import type { Product, Review } from '../types';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../lib/currency';
import StarRating from '../components/StarRating';
import ProductCard from '../components/ProductCard';

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const { addItem } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setQuantity(1);
      setSelectedImage(0);
      setAddedToCart(false);

      const data = await fetchProductBySlug(slug || '');

      if (data) {
        setProduct(data);

        const [reviewsRes, relatedData] = await Promise.all([
          supabase
            .from('reviews')
            .select('*')
            .eq('product_id', data.id)
            .order('created_at', { ascending: false })
            .limit(6),
          fetchProducts({ category: data.category }),
        ]);

        if (reviewsRes.data) setReviews(reviewsRes.data);
        setRelated(relatedData.filter(p => p.id !== data.id).slice(0, 4));
      }
      setLoading(false);
    }
    load();
  }, [slug]);

  function handleAddToCart() {
    if (!product) return;
    addItem(product, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="animate-pulse">
              <div className="aspect-square rounded-2xl bg-gray-200" />
              <div className="mt-4 flex gap-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-20 w-20 rounded-lg bg-gray-200" />
                ))}
              </div>
            </div>
            <div className="animate-pulse space-y-4">
              <div className="h-4 w-24 rounded bg-gray-200" />
              <div className="h-8 w-3/4 rounded bg-gray-200" />
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-2/3 rounded bg-gray-200" />
              <div className="h-12 w-40 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-900">Product Not Found</h2>
        <p className="mt-2 text-gray-600">The product you're looking for doesn't exist.</p>
        <Link to="/products" className="btn-primary mt-6">
          Browse Products
        </Link>
      </div>
    );
  }

  const allImages = [product.image_url, ...(product.images || [])].filter(Boolean);
  const discount = product.original_price
    ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
    : 0;
  const inStock = product.stock_quantity > 0;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.short_description || product.description,
    "image": allImages.map(img => img.startsWith('http') ? img : `https://totalfilter.co.uk${img}`),
    "brand": { "@type": "Brand", "name": "Totalfilter.co.uk" },
    "sku": product.slug,
    "category": product.category,
    "url": `https://totalfilter.co.uk/products/${product.slug}`,
    "offers": {
      "@type": "Offer",
      "url": `https://totalfilter.co.uk/products/${product.slug}`,
      "priceCurrency": "GBP",
      "price": product.price.toFixed(2),
      "availability": inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "itemCondition": "https://schema.org/NewCondition",
      "seller": { "@type": "Organization", "name": "Totalfilter.co.uk" },
      "shippingDetails": {
        "@type": "OfferShippingDetails",
        "shippingDestination": { "@type": "DefinedRegion", "addressCountry": "GB" },
        "shippingRate": {
          "@type": "MonetaryAmount",
          "value": product.price >= 29 ? "0.00" : "4.99",
          "currency": "GBP"
        },
        "deliveryTime": {
          "@type": "ShippingDeliveryTime",
          "transitTime": { "@type": "QuantitativeValue", "minValue": 2, "maxValue": 4, "unitCode": "DAY" }
        }
      },
      "hasMerchantReturnPolicy": {
        "@type": "MerchantReturnPolicy",
        "applicableCountry": "GB",
        "returnPolicyCategory": "https://schema.org/MerchantReturnFiniteReturnWindow",
        "merchantReturnDays": 30,
        "returnMethod": "https://schema.org/ReturnByMail",
        "returnFees": "https://schema.org/FreeReturn"
      }
    },
    ...(product.rating > 0 && product.review_count > 0 ? {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": product.rating.toFixed(1),
        "reviewCount": product.review_count
      }
    } : {})
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-gray-700">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link to="/products" className="hover:text-gray-700">Products</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-gray-900 font-medium truncate">{product.name}</span>
        </nav>
      </div>

      <div className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-50">
              <img
                src={allImages[selectedImage] || product.image_url}
                alt={product.name}
                className="h-full w-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).src = '/favicon.svg'; }}
              />
              {product.is_best_seller && (
                <div className="absolute left-4 top-4 rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-white">
                  Best Seller
                </div>
              )}
              {discount > 0 && (
                <div className="absolute right-4 top-4 rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">
                  -{discount}%
                </div>
              )}
            </div>
            {allImages.length > 1 && (
              <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                      selectedImage === i
                        ? 'border-brand-600 shadow-md'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="lg:py-4">
            <p className="text-sm font-medium uppercase tracking-wider text-brand-600">
              {product.category.replace('-', ' ')}
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {product.name}
            </h1>

            <div className="mt-4 flex items-center gap-3">
              <StarRating rating={product.rating} size="md" />
              <span className="text-sm text-gray-500">
                {product.rating.toFixed(1)} ({product.review_count} reviews)
              </span>
            </div>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="text-3xl font-bold text-gray-900">{formatPrice(product.price)}</span>
              {product.original_price && (
                <>
                  <span className="text-lg text-gray-400 line-through">
                    {formatPrice(product.original_price)}
                  </span>
                  <span className="rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-semibold text-red-600">
                    Save {formatPrice(product.original_price - product.price)}
                  </span>
                </>
              )}
            </div>

            <p className="mt-2 text-sm font-medium">
              {inStock ? (
                <span className="text-green-600">In Stock - Ready to ship</span>
              ) : (
                <span className="text-red-600">Out of Stock</span>
              )}
            </p>

            <p className="mt-5 text-base leading-relaxed text-gray-600">{product.description}</p>

            {product.features && product.features.length > 0 && (
              <div className="mt-8">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900">
                  Key Features
                </h3>
                <ul className="mt-3 space-y-2.5">
                  {product.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center rounded-lg border border-gray-200">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="flex h-12 w-12 items-center justify-center text-gray-500 transition-colors hover:text-gray-700"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-12 text-center text-sm font-semibold">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="flex h-12 w-12 items-center justify-center text-gray-500 transition-colors hover:text-gray-700"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className={`btn-primary flex-1 py-4 text-base ${
                  addedToCart ? 'bg-green-600 hover:bg-green-600' : ''
                }`}
              >
                {addedToCart ? (
                  <>
                    <Check className="h-5 w-5" />
                    Added to Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-5 w-5" />
                    Add to Cart
                  </>
                )}
              </button>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4">
              {[
                { icon: Truck, label: 'Free UK Delivery', desc: 'Orders \u00A329+' },
                { icon: Shield, label: 'Satisfaction Guarantee', desc: '100% money back' },
                { icon: RotateCcw, label: '30-Day Returns', desc: 'No hassle' },
              ].map(({ icon: Icon, label, desc }) => (
                <div key={label} className="rounded-xl border border-gray-100 bg-gray-50 p-3 text-center">
                  <Icon className="mx-auto h-5 w-5 text-brand-600" />
                  <p className="mt-1.5 text-xs font-semibold text-gray-900">{label}</p>
                  <p className="text-[11px] text-gray-500">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {product.specifications && Object.keys(product.specifications).length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-bold text-gray-900">Specifications</h2>
            <div className="mt-6 overflow-hidden rounded-xl border border-gray-100">
              {Object.entries(product.specifications).map(([key, value], i) => (
                <div
                  key={key}
                  className={`flex px-6 py-3.5 ${i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                >
                  <span className="w-48 shrink-0 text-sm font-medium text-gray-900">{key}</span>
                  <span className="text-sm text-gray-600">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {reviews.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-bold text-gray-900">
              Customer Reviews ({product.review_count})
            </h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {reviews.map(review => (
                <div key={review.id} className="rounded-xl border border-gray-100 bg-white p-6">
                  <StarRating rating={review.rating} size="sm" />
                  <h4 className="mt-3 text-sm font-semibold text-gray-900">{review.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{review.content}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xs font-medium text-gray-900">{review.author_name}</span>
                    {review.verified_purchase && (
                      <span className="flex items-center gap-1 text-xs text-brand-600">
                        <Check className="h-3 w-3" />
                        Verified
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="text-xl font-bold text-gray-900">You Might Also Like</h2>
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {related.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
