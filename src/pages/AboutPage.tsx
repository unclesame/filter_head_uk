import { Link } from 'react-router-dom';
import { ChevronRight, Droplets, Shield, Users, Award, Clock, MapPin } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link to="/" className="hover:text-gray-700">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-gray-900 font-medium">About Us</span>
          </nav>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            About Totalfilter.co.uk
          </h1>
          <p className="mt-2 text-gray-600">
            The UK's trusted shower filter specialists since 2008.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-12">
          {[
            { icon: Clock, label: 'Est. 2008', desc: 'Over 15 years' },
            { icon: Users, label: 'Thousands Served', desc: 'Happy customers' },
            { icon: Award, label: 'Premium Quality', desc: 'NSF certified media' },
            { icon: Shield, label: '30-Day Guarantee', desc: 'Money-back promise' },
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
            <h2 className="text-xl font-bold text-gray-900">Our Story</h2>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-gray-600">
              <p>
                Totalfilter.co.uk was founded in 2008 with a simple mission: to help UK households enjoy cleaner, healthier water from their showers. After experiencing the damaging effects of chlorine and hard water firsthand, we set out to source the best shower filtration products available and make them accessible to everyone across the United Kingdom.
              </p>
              <p>
                Over the past 15+ years, we have grown from a small family-run operation into one of the UK's most trusted names in shower water filtration. We have helped thousands of customers improve their skin, hair, and overall wellbeing through our carefully curated range of premium shower filters.
              </p>
              <p>
                Today, Totalfilter.co.uk continues to be operated by a dedicated team passionate about water quality. We hand-pick every product in our range, ensuring it meets our strict standards for filtration performance, build quality, and value for money.
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900">What We Do</h2>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-gray-600">
              <p>
                We specialise in premium shower filters and water filtration products designed to remove up to 99% of chlorine, heavy metals, bacteria, and other impurities from your shower water. Our multi-stage filtration systems use NSF-certified KDF-55, Vitamin C, calcium sulphite, and far-infrared ceramic ball technology to deliver noticeably cleaner, softer water.
              </p>
              <p>
                Our product range includes inline shower filters, handheld shower filter heads, bath filters, and tap water filters -- all designed for easy, tool-free installation that fits standard UK plumbing. Every product we sell comes with a 30-day money-back guarantee, so you can try it risk-free.
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900">Our Values</h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {[
                {
                  icon: Droplets,
                  title: 'Quality First',
                  desc: 'Every product is rigorously tested before it enters our range. We only sell filters with proven, certified filtration media.',
                },
                {
                  icon: Users,
                  title: 'Customer Focus',
                  desc: 'Our customers are at the heart of everything we do. We offer honest advice, responsive support, and a hassle-free returns policy.',
                },
                {
                  icon: Shield,
                  title: 'Transparency',
                  desc: 'We provide clear, honest product information. No exaggerated claims -- just straightforward facts about what our filters do and how they work.',
                },
                {
                  icon: Award,
                  title: 'Value for Money',
                  desc: 'With filters lasting up to 12 months, our products offer outstanding long-term value compared to competitors requiring monthly replacements.',
                },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50">
                    <Icon className="h-5 w-5 text-brand-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
                    <p className="mt-1 text-sm text-gray-600">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900">Business Information</h2>
            <div className="mt-6 text-sm leading-relaxed text-gray-600">
              <div className="overflow-hidden rounded-lg border border-gray-100">
                <table className="w-full text-sm">
                  <tbody className="divide-y divide-gray-100">
                    <tr>
                      <td className="px-4 py-3 font-medium text-gray-900 bg-gray-50 w-1/3">Trading Name</td>
                      <td className="px-4 py-3">Totalfilter.co.uk</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-gray-900 bg-gray-50">Registered Company</td>
                      <td className="px-4 py-3">ACE Filters LTD</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-gray-900 bg-gray-50">Company Number</td>
                      <td className="px-4 py-3">14001341</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-gray-900 bg-gray-50">VAT Number</td>
                      <td className="px-4 py-3">GB412011016</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-gray-900 bg-gray-50">Registered Address</td>
                      <td className="px-4 py-3">37 High Street, Tewkesbury, GL20 5BB, United Kingdom</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-gray-900 bg-gray-50">Email</td>
                      <td className="px-4 py-3">
                        <a href="mailto:sales@totalfilter.co.uk" className="text-brand-600 hover:text-brand-700">sales@totalfilter.co.uk</a>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-gray-900 bg-gray-50">Phone</td>
                      <td className="px-4 py-3">
                        <a href="tel:+441304700370" className="text-brand-600 hover:text-brand-700">+44 1304 700370</a>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-gray-900 bg-gray-50">Operating Since</td>
                      <td className="px-4 py-3">2008</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900">Our Commitment</h2>
            <div className="mt-6 space-y-4 text-sm leading-relaxed text-gray-600">
              <p>
                Every order is dispatched from the United Kingdom with care. We use Royal Mail for all deliveries, with free shipping on orders over &pound;29. If you are not completely satisfied with your purchase, our 30-day money-back guarantee ensures you can return it for a full refund -- no questions asked.
              </p>
              <p>
                We are committed to providing accurate product descriptions, fair pricing, and transparent business practices. Our product images show exactly what you will receive, and our prices include VAT with no hidden charges at checkout.
              </p>
            </div>
          </section>
        </div>

        <div className="mt-12 rounded-2xl bg-brand-600 p-8 text-center">
          <h2 className="text-xl font-bold text-white">Have a Question?</h2>
          <p className="mt-2 text-sm text-brand-100">
            Our team is here to help. Get in touch and we will respond within 24 hours.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-brand-600 transition-all hover:bg-gray-50">
              <MapPin className="h-4 w-4" />
              Contact Us
            </Link>
            <Link to="/faq" className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10">
              View FAQ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
