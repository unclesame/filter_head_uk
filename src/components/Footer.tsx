import { Link } from 'react-router-dom';
import { Droplets, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600">
                <Droplets className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Total<span className="text-brand-400">filter</span><span className="text-sm font-medium text-gray-500">.co.uk</span>
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              The UK's trusted shower filter specialists since 2008. Premium shower filters for healthier skin, hair, and overall wellness.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Shop</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/products" className="text-sm text-gray-400 transition-colors hover:text-white">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/products?filter=best-sellers" className="text-sm text-gray-400 transition-colors hover:text-white">
                  Best Sellers
                </Link>
              </li>
              <li>
                <Link to="/products?category=handheld" className="text-sm text-gray-400 transition-colors hover:text-white">
                  Handheld Filters
                </Link>
              </li>
              <li>
                <Link to="/products?category=inline-filter" className="text-sm text-gray-400 transition-colors hover:text-white">
                  Inline Filters
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Support</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link to="/shipping-returns" className="text-sm text-gray-400 transition-colors hover:text-white">
                  Shipping &amp; Returns
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-gray-400 transition-colors hover:text-white">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-sm text-gray-400 transition-colors hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-sm text-gray-400 transition-colors hover:text-white">
                  Terms &amp; Conditions
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">Contact</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-400">sales@totalfilter.co.uk</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-400">+44 1304 700370</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 mt-0.5 text-gray-500" />
                <span className="text-sm text-gray-400">United Kingdom</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="text-xs leading-relaxed text-gray-500">
              <p className="font-medium text-gray-400">Totalfilter.co.uk is a trading name of ACE Filters LTD</p>
              <p className="mt-1">Company No. 14001341</p>
              <p>37 High Street, Tewkesbury, GL20 5BB</p>
              <p>VAT Reg. No. GB412011016</p>
            </div>
            <div className="flex items-center gap-6">
              <Link to="/privacy-policy" className="text-xs text-gray-500 transition-colors hover:text-gray-300">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-xs text-gray-500 transition-colors hover:text-gray-300">
                Terms &amp; Conditions
              </Link>
              <Link to="/shipping-returns" className="text-xs text-gray-500 transition-colors hover:text-gray-300">
                Shipping &amp; Returns
              </Link>
            </div>
          </div>
          <p className="mt-6 text-center text-sm text-gray-500 sm:text-left">
            &copy; {new Date().getFullYear()} Totalfilter.co.uk. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
