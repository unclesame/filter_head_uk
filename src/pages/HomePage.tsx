import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Droplets,
  Shield,
  Sparkles,
  Leaf,
  Truck,
  RotateCcw,
  Star,
  ChevronRight,
  ShieldCheck,
  CreditCard,
  CheckCircle,
  Clock,
} from 'lucide-react';
import { fetchProducts } from '../lib/cache';
import type { Product } from '../types';
import ProductCard from '../components/ProductCard';

export default function HomePage() {
  const [bestSellers, setBestSellers] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const data = await fetchProducts({ bestSellers: true, sort: 'rating' });
      setBestSellers(data.slice(0, 4));
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-brand-50/30 to-ocean-50/20">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }} />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-36">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="max-w-xl">
              <h1 className="text-4xl font-bold leading-tight tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
                Transform Your
                <span className="block text-brand-600">Shower Experience</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-gray-600">
                Our advanced multi-stage shower filters remove up to 99% of chlorine,
                heavy metals, and impurities -- giving you softer skin, healthier hair,
                and a spa-like experience every day.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/products" className="btn-primary text-base px-8 py-4">
                  Shop Now
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link to="/products?filter=best-sellers" className="btn-secondary text-base px-8 py-4">
                  View Best Sellers
                </Link>
              </div>
              <div className="mt-10 flex items-center gap-6">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(i => (
                    <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">4.8/5 average rating</p>
                  <p className="text-sm text-gray-600">Trusted by thousands of UK customers since 2008</p>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-brand-100 to-ocean-100">
                <img
                  src="/images/hero-shower.jpg"
                  alt="Premium shower filter"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 rounded-2xl bg-white p-5 shadow-xl shadow-gray-200/50">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100">
                    <Droplets className="h-6 w-6 text-brand-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">99% Filtration</p>
                    <p className="text-xs text-gray-500">Chlorine &amp; heavy metals</p>
                  </div>
                </div>
              </div>
              <div className="absolute -right-4 top-8 rounded-2xl bg-white p-5 shadow-xl shadow-gray-200/50">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ocean-100">
                    <Shield className="h-6 w-6 text-ocean-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">100% Satisfaction</p>
                    <p className="text-xs text-gray-500">Money-back guarantee</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { icon: Truck, label: 'Free UK Delivery', desc: 'On orders over \u00A329' },
              { icon: RotateCcw, label: '30-Day Returns', desc: 'Hassle-free guarantee' },
              { icon: Shield, label: 'Satisfaction Guarantee', desc: '100% money back' },
              { icon: Leaf, label: 'Eco-Friendly', desc: 'Save up to 30% water' },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex items-center gap-3 px-2">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50">
                  <Icon className="h-5 w-5 text-brand-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{label}</p>
                  <p className="text-xs text-gray-500">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">Most Popular</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Best Selling Shower Filters
              </h2>
              <p className="mt-3 max-w-2xl text-gray-600">
                Our top-rated shower filters, chosen by thousands of UK customers for superior filtration and performance.
              </p>
            </div>
            <Link
              to="/products?filter=best-sellers"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700 whitespace-nowrap"
            >
              View all
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="animate-pulse rounded-2xl bg-white p-5">
                  <div className="aspect-square rounded-xl bg-gray-200" />
                  <div className="mt-4 h-4 w-2/3 rounded bg-gray-200" />
                  <div className="mt-2 h-3 w-full rounded bg-gray-200" />
                  <div className="mt-4 h-6 w-1/3 rounded bg-gray-200" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {bestSellers.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">Why Totalfilter.co.uk?</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              The Filtration Difference
            </h2>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            {[
              {
                icon: Droplets,
                title: 'Multi-Stage Filtration',
                description:
                  'Our superior quality multi-stage cartridges feature CaSO3, NSF Certified KDF-55, Vitamin C, FIR Ceramic Balls and more to remove up to 99% of chlorine, heavy metals, and bacteria from your water.',
                color: 'brand',
              },
              {
                icon: Sparkles,
                title: 'Healthier Skin & Hair',
                description:
                  'Filtered water prevents dryness and irritation. Notice softer skin, shinier hair, and reduced eczema symptoms within the first week of use.',
                color: 'ocean',
              },
              {
                icon: Shield,
                title: 'Long-Lasting Filters',
                description:
                  'Our cartridges last up to 12 months (37,000 litres), offering exceptional value compared to other brands that require monthly replacements.',
                color: 'sand',
              },
            ].map(({ icon: Icon, title, description, color }) => (
              <div
                key={title}
                className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 transition-all duration-300 hover:shadow-lg hover:shadow-gray-200/50"
              >
                <div className={`mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl ${
                  color === 'brand' ? 'bg-brand-100' : color === 'ocean' ? 'bg-ocean-100' : 'bg-sand-100'
                }`}>
                  <Icon className={`h-7 w-7 ${
                    color === 'brand' ? 'text-brand-600' : color === 'ocean' ? 'text-ocean-600' : 'text-sand-600'
                  }`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-gray-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gray-900 py-20 sm:py-24">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '32px 32px',
        }} />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
              <img
                src="/images/installation-shower.jpg"
                alt="Shower filter installation"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider text-brand-400">Easy Installation</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Set Up in Under 5 Minutes
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-gray-400">
                No plumber needed. Our shower filters connect to any standard UK shower fitting with a simple twist.
                Everything you need is included in the box.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  'Universal fit -- works with all standard UK shower fittings',
                  'Tool-free installation with hand-tighten design',
                  'Includes step-by-step guide and all fittings',
                  'Filter replacement takes less than 30 seconds',
                ].map(item => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-600">
                      <svg className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/products" className="btn-primary mt-8 text-base">
                Shop All Shower Filters
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">Testimonials</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              What Our Customers Say
            </h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              {
                name: 'Sarah M.',
                text: 'My hair has never felt this soft. After years of hard water damage, Totalfilter completely transformed my shower routine. Worth every penny!',
                rating: 5,
              },
              {
                name: 'James R.',
                text: 'I have eczema and this shower filter has made a massive difference. Less itching, less redness. The filtration really works. Highly recommend.',
                rating: 5,
              },
              {
                name: 'Emily K.',
                text: 'Dead easy to install, brilliant water flow, and my dry skin has improved significantly. I\'ve bought three -- one for each bathroom in our house.',
                rating: 5,
              },
            ].map(testimonial => (
              <div
                key={testimonial.name}
                className="rounded-2xl border border-gray-100 bg-white p-8"
              >
                <div className="flex items-center gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-gray-600">"{testimonial.text}"</p>
                <p className="mt-4 text-sm font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-xs text-brand-600">Verified Buyer</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-gray-100 bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">Trusted UK Business</p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Shop With Confidence
            </h2>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-6">
            {[
              { icon: ShieldCheck, label: 'SSL Encrypted', desc: 'Secure checkout' },
              { icon: CreditCard, label: 'Visa & Mastercard', desc: 'All major cards' },
              { icon: Truck, label: 'Free Delivery', desc: 'Orders over \u00A329' },
              { icon: RotateCcw, label: '30-Day Returns', desc: 'Money-back guarantee' },
              { icon: CheckCircle, label: 'UK Registered', desc: 'Company No. 14001341' },
              { icon: Clock, label: 'Since 2008', desc: '15+ years trusted' },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50">
                  <Icon className="h-6 w-6 text-brand-600" />
                </div>
                <p className="mt-3 text-xs font-semibold text-gray-900">{label}</p>
                <p className="mt-0.5 text-xs text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              Totalfilter.co.uk is a trading name of ACE Filters LTD &middot; VAT Reg. No. GB412011016 &middot;{' '}
              <Link to="/about" className="text-brand-600 hover:text-brand-700 font-medium">Learn more about us</Link>
            </p>
          </div>
        </div>
      </section>

      <section className="bg-brand-600 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Ready for Cleaner, Purer Water?
          </h2>
          <p className="mt-3 text-brand-100">
            Join thousands of happy UK customers who have transformed their daily shower routine.
          </p>
          <Link to="/products" className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 text-base font-semibold text-brand-600 transition-all hover:bg-gray-50 active:scale-[0.98]">
            Shop Now
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
