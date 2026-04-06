import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, ShieldCheck, Truck, RotateCcw, CreditCard } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice, FREE_SHIPPING_THRESHOLD, SHIPPING_COST, VAT_RATE } from '../lib/currency';

const INPUT_CLASS =
  'mt-1.5 w-full rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500';

export default function CheckoutPage() {
  const { items, totalPrice, totalItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    line1: '',
    line2: '',
    city: '',
    county: '',
    postcode: '',
  });

  if (items.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
        <h2 className="text-2xl font-bold text-gray-900">Nothing to checkout</h2>
        <p className="mt-2 text-gray-600">Add some items to your cart first.</p>
        <Link to="/products" className="btn-primary mt-6">
          Browse Products
        </Link>
      </div>
    );
  }

  const shipping = totalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const subtotalWithShipping = totalPrice + shipping;
  const vat = subtotalWithShipping * VAT_RATE;
  const orderTotal = subtotalWithShipping + vat;

  function updateField(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const orderPayload = {
        items: items.map(({ product, quantity }) => ({
          product_id: product.id,
          name: product.name,
          price: product.price,
          quantity,
          image_url: product.image_url,
        })),
        customer: {
          name: `${form.firstName} ${form.lastName}`,
          email: form.email,
          phone: form.phone,
        },
        shipping_address: {
          line1: form.line1,
          line2: form.line2 || undefined,
          city: form.city,
          county: form.county,
          postcode: form.postcode,
          country: 'GB',
        },
        subtotal: totalPrice,
        shipping,
        vat,
        total: orderTotal,
      };

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/create-checkout`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify(orderPayload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      sessionStorage.setItem(
        'orderSummary',
        JSON.stringify({
          customerName: `${form.firstName} ${form.lastName}`,
          email: form.email,
          items: items.map(({ product, quantity }) => ({
            name: product.name,
            price: product.price,
            quantity,
          })),
          subtotal: totalPrice,
          shipping,
          vat,
          total: orderTotal,
        })
      );

      clearCart();

      if (data.url) {
        window.location.href = data.url;
      } else {
        navigate('/checkout/success');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          to="/cart"
          className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Cart
        </Link>

        <div className="grid gap-8 lg:grid-cols-5">
          <form onSubmit={handleSubmit} className="space-y-6 lg:col-span-3">
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-5 py-4">
                <p className="text-sm font-medium text-red-800">{error}</p>
              </div>
            )}

            <div className="rounded-2xl border border-gray-100 bg-white p-6">
              <h2 className="text-lg font-semibold text-gray-900">Contact Details</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <input
                    required
                    type="text"
                    value={form.firstName}
                    onChange={e => updateField('firstName', e.target.value)}
                    className={INPUT_CLASS}
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <input
                    required
                    type="text"
                    value={form.lastName}
                    onChange={e => updateField('lastName', e.target.value)}
                    className={INPUT_CLASS}
                    placeholder="Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={e => updateField('email', e.target.value)}
                    className={INPUT_CLASS}
                    placeholder="john@example.co.uk"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => updateField('phone', e.target.value)}
                    className={INPUT_CLASS}
                    placeholder="07700 900000"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-6">
              <h2 className="text-lg font-semibold text-gray-900">Delivery Address</h2>
              <div className="mt-5 grid gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Address Line 1</label>
                  <input
                    required
                    type="text"
                    value={form.line1}
                    onChange={e => updateField('line1', e.target.value)}
                    className={INPUT_CLASS}
                    placeholder="123 High Street"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Address Line 2 <span className="text-gray-400">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={form.line2}
                    onChange={e => updateField('line2', e.target.value)}
                    className={INPUT_CLASS}
                    placeholder="Flat 4B"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">City / Town</label>
                    <input
                      required
                      type="text"
                      value={form.city}
                      onChange={e => updateField('city', e.target.value)}
                      className={INPUT_CLASS}
                      placeholder="London"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">County</label>
                    <input
                      type="text"
                      value={form.county}
                      onChange={e => updateField('county', e.target.value)}
                      className={INPUT_CLASS}
                      placeholder="Greater London"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Postcode</label>
                    <input
                      required
                      type="text"
                      value={form.postcode}
                      onChange={e => updateField('postcode', e.target.value)}
                      className={INPUT_CLASS}
                      placeholder="SW1A 1AA"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-100 bg-white p-5">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <CreditCard className="h-5 w-5 shrink-0 text-gray-400" />
                <p>
                  You'll be securely redirected to Square to complete your payment. We accept all
                  major credit and debit cards, Apple Pay, and Google Pay.
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 text-base disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Processing...
                </span>
              ) : (
                <>
                  <Lock className="h-5 w-5" />
                  Pay {formatPrice(orderTotal)} Securely
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
              <ShieldCheck className="h-4 w-4" />
              <span>256-bit SSL encrypted checkout powered by Square</span>
            </div>
          </form>

          <div className="lg:col-span-2">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-2xl border border-gray-100 bg-white p-6">
                <h2 className="text-lg font-semibold text-gray-900">
                  Order Summary ({totalItems} {totalItems === 1 ? 'item' : 'items'})
                </h2>

                <div className="mt-4 divide-y divide-gray-100">
                  {items.map(({ product, quantity }) => (
                    <div key={product.id} className="flex gap-3 py-4">
                      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-50">
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-gray-900">
                          {product.name}
                        </p>
                        <p className="text-xs text-gray-500">Qty: {quantity}</p>
                      </div>
                      <span className="whitespace-nowrap text-sm font-semibold text-gray-900">
                        {formatPrice(product.price * quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 space-y-2.5 border-t border-gray-100 pt-4">
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
                  <div className="border-t border-gray-100 pt-2.5">
                    <div className="flex justify-between">
                      <span className="text-base font-semibold text-gray-900">Total</span>
                      <span className="text-base font-bold text-gray-900">
                        {formatPrice(orderTotal)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { icon: Truck, label: 'Free Delivery', desc: 'Orders over \u00A329' },
                  { icon: ShieldCheck, label: 'Secure Payment', desc: 'SSL encrypted' },
                  { icon: RotateCcw, label: '30-Day Returns', desc: 'No hassle' },
                ].map(({ icon: Icon, label, desc }) => (
                  <div
                    key={label}
                    className="rounded-xl border border-gray-100 bg-white p-3 text-center"
                  >
                    <Icon className="mx-auto h-5 w-5 text-brand-600" />
                    <p className="mt-1.5 text-xs font-semibold text-gray-900">{label}</p>
                    <p className="text-[11px] text-gray-500">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
