import { Link } from 'react-router-dom';
import { ChevronRight, Truck, RotateCcw, Clock, Package } from 'lucide-react';

export default function ShippingReturnsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link to="/" className="hover:text-gray-700">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-gray-900 font-medium">Shipping &amp; Returns</span>
          </nav>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Shipping &amp; Returns
          </h1>
          <p className="mt-2 text-gray-600">
            Clear, fair policies so you can shop with complete confidence.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-12">
          {[
            { icon: Truck, label: 'Free Delivery', desc: 'Orders over \u00A329' },
            { icon: Clock, label: '2-4 Working Days', desc: 'Standard delivery' },
            { icon: RotateCcw, label: '30-Day Returns', desc: 'Full refund' },
            { icon: Package, label: 'Same Day Dispatch', desc: 'Before 2pm' },
          ].map(({ icon: Icon, label, desc }) => (
            <div key={label} className="rounded-xl border border-gray-100 bg-white p-4 text-center">
              <Icon className="mx-auto h-6 w-6 text-brand-600" />
              <p className="mt-2 text-xs font-semibold text-gray-900">{label}</p>
              <p className="text-xs text-gray-500">{desc}</p>
            </div>
          ))}
        </div>

        <div className="space-y-10">
          <section className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900">Shipping Policy</h2>

            <div className="mt-6 space-y-6 text-sm leading-relaxed text-gray-600">
              <div>
                <h3 className="font-semibold text-gray-900">Delivery Charges</h3>
                <div className="mt-3 overflow-hidden rounded-lg border border-gray-100">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-3 text-left font-semibold text-gray-900">Order Value</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-900">Delivery Cost</th>
                        <th className="px-4 py-3 text-left font-semibold text-gray-900">Estimated Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      <tr>
                        <td className="px-4 py-3">Under &pound;29</td>
                        <td className="px-4 py-3">&pound;3.95</td>
                        <td className="px-4 py-3">2-4 working days</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3">&pound;29 and above</td>
                        <td className="px-4 py-3 font-semibold text-brand-600">Free</td>
                        <td className="px-4 py-3">2-4 working days</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">Dispatch Times</h3>
                <p className="mt-2">
                  Orders placed before 2:00pm GMT on working days (Monday to Friday, excluding bank holidays) are dispatched the same day. Orders placed after 2:00pm or on weekends/bank holidays will be dispatched on the next working day.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">Delivery Service</h3>
                <p className="mt-2">
                  All orders are shipped via Royal Mail within the United Kingdom. You will receive a confirmation email with tracking information once your order has been dispatched.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">Delivery Area</h3>
                <p className="mt-2">
                  We currently deliver to all addresses within the United Kingdom, including Northern Ireland, the Scottish Highlands, and the Channel Islands. Deliveries to remote areas may take an additional 1-2 working days.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900">Returns Policy</h2>

            <div className="mt-6 space-y-6 text-sm leading-relaxed text-gray-600">
              <div>
                <h3 className="font-semibold text-gray-900">30-Day Money-Back Guarantee</h3>
                <p className="mt-2">
                  We are confident you will love your shower filter. If for any reason you are not completely satisfied, you may return your purchase within 30 days of delivery for a full refund. Items must be unused, in their original packaging, and in resalable condition.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">How to Return an Item</h3>
                <ol className="mt-2 list-decimal list-inside space-y-2">
                  <li>Contact our team at <a href="mailto:support@totalfilter.co.uk" className="text-brand-600 hover:text-brand-700 font-medium">support@totalfilter.co.uk</a> with your order number and reason for return.</li>
                  <li>We will provide you with a returns authorisation and instructions.</li>
                  <li>Package the item securely and post it back to us using a tracked delivery service.</li>
                  <li>Once received and inspected, we will process your refund within 5-7 working days.</li>
                </ol>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">Refunds</h3>
                <p className="mt-2">
                  Refunds will be issued to the original payment method. Please allow 5-7 working days for the refund to appear in your account after we have received and inspected the returned item.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">Damaged or Faulty Items</h3>
                <p className="mt-2">
                  If you receive a damaged or faulty item, please contact us within 48 hours of delivery at <a href="mailto:support@totalfilter.co.uk" className="text-brand-600 hover:text-brand-700 font-medium">support@totalfilter.co.uk</a> with photos of the damage. We will arrange a free replacement or full refund at no extra cost to you.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900">Exclusions</h3>
                <p className="mt-2">
                  For hygiene reasons, used filter cartridges and opened replacement cartridge packs cannot be returned for a refund. This does not affect your statutory rights.
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900">Cancellations</h2>
            <div className="mt-6 text-sm leading-relaxed text-gray-600">
              <p>
                You have the right to cancel your order within 14 days of receiving your goods under the Consumer Contracts Regulations 2013. To cancel, please email us at <a href="mailto:support@totalfilter.co.uk" className="text-brand-600 hover:text-brand-700 font-medium">support@totalfilter.co.uk</a> with your order number. If your order has not yet been dispatched, we will cancel it and issue a full refund immediately.
              </p>
            </div>
          </section>
        </div>

        <div className="mt-12 text-center text-sm text-gray-500">
          <p>Last updated: February 2026</p>
          <p className="mt-1">
            Questions? Contact us at{' '}
            <a href="mailto:support@totalfilter.co.uk" className="text-brand-600 hover:text-brand-700 font-medium">
              support@totalfilter.co.uk
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
