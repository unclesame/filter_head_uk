import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, Package, ArrowRight, Mail } from 'lucide-react';
import { formatPrice } from '../lib/currency';

interface OrderSummary {
  customerName: string;
  email: string;
  items: { name: string; price: number; quantity: number }[];
  subtotal: number;
  shipping: number;
  vat: number;
  total: number;
}

export default function OrderSuccessPage() {
  const [order, setOrder] = useState<OrderSummary | null>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem('orderSummary');
    if (stored) {
      setOrder(JSON.parse(stored));
      sessionStorage.removeItem('orderSummary');
    }
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <div
            className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full transition-all duration-700 ${
              animate
                ? 'scale-100 bg-green-100 opacity-100'
                : 'scale-50 bg-green-50 opacity-0'
            }`}
          >
            <Check
              className={`h-10 w-10 text-green-600 transition-all duration-500 delay-300 ${
                animate ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
              }`}
            />
          </div>

          <h1
            className={`mt-6 text-3xl font-bold text-gray-900 transition-all duration-500 delay-500 ${
              animate ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            Order Confirmed!
          </h1>

          <p
            className={`mx-auto mt-3 max-w-md text-gray-600 transition-all duration-500 delay-700 ${
              animate ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            Thank you for your purchase. Your order is being processed and you'll
            receive a confirmation email shortly.
          </p>
        </div>

        {order && (
          <div
            className={`mt-10 rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-500 delay-[900ms] ${
              animate ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
              <Package className="h-5 w-5 text-brand-600" />
              <h2 className="text-lg font-semibold text-gray-900">Order Details</h2>
            </div>

            <div className="mt-4 divide-y divide-gray-50">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between py-3">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-4 space-y-2 border-t border-gray-100 pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium text-gray-900">{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Delivery</span>
                <span className="font-medium text-gray-900">
                  {order.shipping === 0 ? (
                    <span className="text-brand-600">Free</span>
                  ) : (
                    formatPrice(order.shipping)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">VAT (20%)</span>
                <span className="font-medium text-gray-900">{formatPrice(order.vat)}</span>
              </div>
              <div className="flex justify-between border-t border-gray-100 pt-2">
                <span className="text-base font-semibold text-gray-900">Total Paid</span>
                <span className="text-base font-bold text-gray-900">
                  {formatPrice(order.total)}
                </span>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 rounded-lg bg-brand-50 px-4 py-3">
              <Mail className="h-4 w-4 shrink-0 text-brand-600" />
              <p className="text-sm text-brand-700">
                A confirmation email has been sent to{' '}
                <span className="font-semibold">{order.email}</span>
              </p>
            </div>
          </div>
        )}

        {!order && (
          <div
            className={`mt-10 rounded-2xl border border-gray-100 bg-white p-8 text-center transition-all duration-500 delay-[900ms] ${
              animate ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            <Package className="mx-auto h-8 w-8 text-gray-400" />
            <p className="mt-3 text-sm text-gray-600">
              Your order has been placed successfully. Check your email for order details
              and tracking information.
            </p>
          </div>
        )}

        <div
          className={`mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center transition-all duration-500 delay-[1100ms] ${
            animate ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <Link to="/products" className="btn-primary px-8 py-3">
            Continue Shopping
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            to="/"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
