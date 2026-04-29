import { Link } from 'react-router-dom';
import { ChevronRight, Mail, Phone, MapPin, Clock, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link to="/" className="hover:text-gray-700">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-gray-900 font-medium">Contact Us</span>
          </nav>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Contact Us
          </h1>
          <p className="mt-2 text-gray-600">
            We are here to help. Reach out through any of the channels below.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-12">
          {[
            {
              icon: Mail,
              title: 'Email Us',
              primary: 'sales@totalfilter.co.uk',
              href: 'mailto:sales@totalfilter.co.uk',
              desc: 'We reply within 24 hours',
            },
            {
              icon: Phone,
              title: 'Call Us',
              primary: '+44 1304 700370',
              href: 'tel:+441304700370',
              desc: 'Mon-Fri, 9am - 5pm GMT',
            },
            {
              icon: MessageCircle,
              title: 'Live Chat',
              primary: 'Chat with us',
              href: undefined,
              desc: 'Available on every page',
            },
          ].map(({ icon: Icon, title, primary, href, desc }) => (
            <div key={title} className="rounded-2xl border border-gray-100 bg-white p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50">
                <Icon className="h-6 w-6 text-brand-600" />
              </div>
              <h3 className="mt-4 text-sm font-semibold text-gray-900">{title}</h3>
              {href ? (
                <a href={href} className="mt-1 block text-sm font-medium text-brand-600 hover:text-brand-700">
                  {primary}
                </a>
              ) : (
                <p className="mt-1 text-sm font-medium text-brand-600">{primary}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">{desc}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          <section className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900">Send Us a Message</h2>
            <p className="mt-2 text-sm text-gray-600">
              Fill in the form below and we will get back to you within 24 hours.
            </p>
            <form
              action="mailto:sales@totalfilter.co.uk"
              method="post"
              encType="text/plain"
              className="mt-6 space-y-4"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="order-number" className="block text-sm font-medium text-gray-700">
                  Order Number <span className="text-gray-400">(optional)</span>
                </label>
                <input
                  type="text"
                  id="order-number"
                  name="order-number"
                  className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                  placeholder="e.g. TF-12345"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
                >
                  <option value="">Select a topic</option>
                  <option value="order">Order enquiry</option>
                  <option value="product">Product question</option>
                  <option value="return">Returns &amp; refunds</option>
                  <option value="shipping">Shipping &amp; delivery</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="mt-1 block w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 resize-none"
                  placeholder="How can we help?"
                />
              </div>
              <button
                type="submit"
                className="btn-primary w-full justify-center py-3"
              >
                Send Message
              </button>
            </form>
          </section>

          <div className="space-y-6">
            <section className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-8">
              <h2 className="text-xl font-bold text-gray-900">Business Details</h2>
              <div className="mt-6 space-y-4">
                <div className="flex gap-3">
                  <MapPin className="h-5 w-5 shrink-0 text-gray-400 mt-0.5" />
                  <div className="text-sm text-gray-600">
                    <p className="font-medium text-gray-900">ACE Filters LTD</p>
                    <p>37 High Street</p>
                    <p>Tewkesbury, GL20 5BB</p>
                    <p>United Kingdom</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Mail className="h-5 w-5 shrink-0 text-gray-400 mt-0.5" />
                  <div className="text-sm">
                    <a href="mailto:sales@totalfilter.co.uk" className="text-brand-600 hover:text-brand-700 font-medium">
                      sales@totalfilter.co.uk
                    </a>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Phone className="h-5 w-5 shrink-0 text-gray-400 mt-0.5" />
                  <div className="text-sm">
                    <a href="tel:+441304700370" className="text-brand-600 hover:text-brand-700 font-medium">
                      +44 1304 700370
                    </a>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Clock className="h-5 w-5 shrink-0 text-gray-400 mt-0.5" />
                  <div className="text-sm text-gray-600">
                    <p className="font-medium text-gray-900">Business Hours</p>
                    <p>Monday - Friday: 9:00am - 5:00pm GMT</p>
                    <p>Saturday - Sunday: Closed</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 rounded-lg border border-gray-100 bg-gray-50 p-4">
                <p className="text-xs text-gray-500">
                  <span className="font-medium text-gray-700">Company No.</span> 14001341 &middot;{' '}
                  <span className="font-medium text-gray-700">VAT No.</span> GB412011016
                </p>
              </div>
            </section>

            <section className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-8">
              <h2 className="text-lg font-bold text-gray-900">Quick Links</h2>
              <ul className="mt-4 space-y-2">
                <li>
                  <Link to="/faq" className="text-sm text-brand-600 hover:text-brand-700 font-medium">
                    Frequently Asked Questions
                  </Link>
                </li>
                <li>
                  <Link to="/shipping-returns" className="text-sm text-brand-600 hover:text-brand-700 font-medium">
                    Shipping &amp; Returns Policy
                  </Link>
                </li>
                <li>
                  <Link to="/privacy-policy" className="text-sm text-brand-600 hover:text-brand-700 font-medium">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-sm text-brand-600 hover:text-brand-700 font-medium">
                    Terms &amp; Conditions
                  </Link>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
