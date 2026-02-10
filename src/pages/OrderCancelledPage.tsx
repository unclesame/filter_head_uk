import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { XCircle, ArrowLeft, RefreshCw, ShieldCheck } from 'lucide-react';

export default function OrderCancelledPage() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    sessionStorage.removeItem('orderSummary');
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-lg px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <div
            className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full transition-all duration-700 ${
              animate
                ? 'scale-100 bg-red-100 opacity-100'
                : 'scale-50 bg-red-50 opacity-0'
            }`}
          >
            <XCircle
              className={`h-10 w-10 text-red-500 transition-all duration-500 delay-300 ${
                animate ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
              }`}
            />
          </div>

          <h1
            className={`mt-6 text-3xl font-bold text-gray-900 transition-all duration-500 delay-500 ${
              animate ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            Payment Cancelled
          </h1>

          <p
            className={`mx-auto mt-3 max-w-md text-gray-600 transition-all duration-500 delay-700 ${
              animate ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}
          >
            Your payment was not completed and you have not been charged. Your cart
            items are still saved if you'd like to try again.
          </p>
        </div>

        <div
          className={`mt-10 rounded-2xl border border-gray-100 bg-white p-6 transition-all duration-500 delay-[900ms] ${
            animate ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <h3 className="text-sm font-semibold text-gray-900">Common reasons for cancellation:</h3>
          <ul className="mt-3 space-y-2.5">
            {[
              'You changed your mind or want to review your order',
              'Your card was declined - try a different payment method',
              'The session timed out - simply try again',
              'A technical issue occurred during payment',
            ].map((reason, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gray-100 text-[10px] font-bold text-gray-500">
                  {i + 1}
                </span>
                {reason}
              </li>
            ))}
          </ul>
        </div>

        <div
          className={`mt-8 flex flex-col items-center gap-4 transition-all duration-500 delay-[1100ms] ${
            animate ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
          }`}
        >
          <Link to="/cart" className="btn-primary w-full justify-center py-3.5 text-base">
            <RefreshCw className="h-5 w-5" />
            Return to Cart & Try Again
          </Link>

          <Link
            to="/products"
            className="flex items-center gap-1.5 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>
        </div>

        <div
          className={`mt-8 flex items-center justify-center gap-2 text-xs text-gray-500 transition-all duration-500 delay-[1300ms] ${
            animate ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <ShieldCheck className="h-4 w-4" />
          <span>Your payment information was not stored</span>
        </div>
      </div>
    </div>
  );
}
