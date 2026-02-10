import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingCart, ArrowRight, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice, FREE_SHIPPING_THRESHOLD, SHIPPING_COST, VAT_RATE } from '../lib/currency';

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
          <ShoppingCart className="h-10 w-10 text-gray-400" />
        </div>
        <h2 className="mt-6 text-2xl font-bold text-gray-900">Your cart is empty</h2>
        <p className="mt-2 text-gray-600">Looks like you haven't added any items yet.</p>
        <Link to="/products" className="btn-primary mt-8">
          Browse Products
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    );
  }

  const shipping = totalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const subtotalWithShipping = totalPrice + shipping;
  const vat = subtotalWithShipping * VAT_RATE;
  const orderTotal = subtotalWithShipping + vat;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Shopping Cart ({totalItems})
          </h1>
          <Link
            to="/products"
            className="flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            {items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-4 sm:p-6"
              >
                <Link
                  to={`/products/${product.slug}`}
                  className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-50 sm:h-32 sm:w-32"
                >
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </Link>

                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link
                        to={`/products/${product.slug}`}
                        className="text-sm font-semibold text-gray-900 hover:text-brand-600 sm:text-base"
                      >
                        {product.name}
                      </Link>
                      <p className="mt-0.5 text-xs text-gray-500">{product.category.replace('-', ' ')}</p>
                    </div>
                    <button
                      onClick={() => removeItem(product.id)}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="mt-auto flex items-center justify-between pt-3">
                    <div className="flex items-center rounded-lg border border-gray-200">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="flex h-9 w-9 items-center justify-center text-gray-500 hover:text-gray-700"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold">{quantity}</span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="flex h-9 w-9 items-center justify-center text-gray-500 hover:text-gray-700"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    <span className="text-base font-bold text-gray-900">
                      {formatPrice(product.price * quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="sticky top-24 rounded-2xl border border-gray-100 bg-white p-6">
              <h2 className="text-lg font-semibold text-gray-900">Order Summary</h2>

              <div className="mt-6 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium text-gray-900">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery</span>
                  <span className="font-medium text-gray-900">
                    {shipping === 0 ? (
                      <span className="text-brand-600">Free</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">VAT (20%)</span>
                  <span className="font-medium text-gray-900">{formatPrice(vat)}</span>
                </div>
                <div className="border-t border-gray-100 pt-3">
                  <div className="flex justify-between">
                    <span className="text-base font-semibold text-gray-900">Total</span>
                    <span className="text-base font-bold text-gray-900">
                      {formatPrice(orderTotal)}
                    </span>
                  </div>
                </div>
              </div>

              {shipping > 0 && (
                <p className="mt-4 text-xs text-gray-500">
                  Add {formatPrice(FREE_SHIPPING_THRESHOLD - totalPrice)} more for free delivery!
                </p>
              )}

              <Link to="/checkout" className="btn-primary mt-6 w-full py-4 text-base">
                Proceed to Checkout
                <ArrowRight className="h-5 w-5" />
              </Link>

              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">
                  Secure checkout with SSL encryption
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
