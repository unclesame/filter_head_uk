import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';

const sections = [
  {
    title: 'Products & Filtration',
    items: [
      {
        q: 'What do your shower filters remove?',
        a: 'Our multi-stage shower filters remove up to 99% of chlorine, heavy metals (including lead, mercury, and nickel), bacteria, and other harmful impurities from your water. Each filter uses a combination of CaSO3, NSF Certified KDF-55, Vitamin C, FIR Ceramic Balls, and activated carbon to ensure thorough filtration.',
      },
      {
        q: 'How long does a filter cartridge last?',
        a: 'Our replacement filter cartridges last up to 12 months or approximately 37,000 litres of water, whichever comes first. This is significantly longer than most competing brands, which typically require monthly replacements. We recommend replacing your cartridge every 8-12 months for optimal performance.',
      },
      {
        q: 'Will a shower filter reduce my water pressure?',
        a: 'No. Our shower filters are engineered to maintain strong water pressure. Many customers actually report improved water flow after installation due to the optimised design of our filtration systems.',
      },
      {
        q: 'Which shower filter is best for me?',
        a: 'It depends on your setup. If you have a fixed shower arm, our inline filters fit between the wall pipe and your existing shower head. If you want an all-in-one solution, our handheld shower filter heads combine filtration with a high-quality shower head. Browse our full range or contact us for personalised advice.',
      },
      {
        q: 'Are your filters suitable for hard water areas?',
        a: 'Yes. Our filters are designed to work effectively in all UK water conditions, including hard water areas. The multi-stage filtration process helps soften the water, reducing limescale buildup on your skin and hair.',
      },
      {
        q: 'Can I see a difference in the water after installing a filter?',
        a: 'While the water may look similar, most customers notice a significant difference in how their skin and hair feel within the first few showers. Many report softer skin, shinier hair, and reduced dryness or irritation, particularly those with eczema or sensitive skin.',
      },
    ],
  },
  {
    title: 'Installation & Compatibility',
    items: [
      {
        q: 'Is installation difficult?',
        a: 'Not at all. Our shower filters are designed for tool-free installation in under 5 minutes. Simply unscrew your existing shower head, attach the filter, and reattach the shower head. Step-by-step instructions and all necessary fittings are included in every box.',
      },
      {
        q: 'Will it fit my shower?',
        a: 'Yes. All our shower filters use standard 1/2 inch BSP thread connections, which is the universal fitting used across the UK. They are compatible with virtually all UK shower hoses, arms, and heads.',
      },
      {
        q: 'Can I use the filter with an electric shower?',
        a: 'Yes, our inline filters can be used with electric showers. However, because electric showers typically have lower flow rates, we recommend our compact or slim-line inline filters for the best experience.',
      },
    ],
  },
  {
    title: 'Orders & Payment',
    items: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit and debit cards (Visa, Mastercard, American Express) through our secure Stripe payment gateway. All transactions are protected with 256-bit SSL encryption.',
      },
      {
        q: 'Is it safe to order online?',
        a: 'Absolutely. We use Stripe, one of the world\'s most trusted payment processors, to handle all transactions. Your payment details are never stored on our servers and are protected by industry-leading encryption.',
      },
      {
        q: 'Can I change or cancel my order?',
        a: 'If you need to change or cancel your order, please contact us at support@totalfilter.co.uk as soon as possible. We process orders quickly, so we can only guarantee changes if you contact us within 1 hour of placing your order.',
      },
    ],
  },
  {
    title: 'Shipping & Delivery',
    items: [
      {
        q: 'How much does delivery cost?',
        a: 'We offer free standard delivery on all orders over \u00A329. For orders under \u00A329, a flat delivery fee of \u00A33.95 applies. All orders are shipped via Royal Mail.',
      },
      {
        q: 'How long does delivery take?',
        a: 'Standard delivery typically takes 2-4 working days within the UK. Orders placed before 2pm on working days are usually dispatched the same day.',
      },
      {
        q: 'Do you ship internationally?',
        a: 'Currently, we only ship within the United Kingdom. We are working on expanding our delivery to other countries in the future.',
      },
    ],
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:text-brand-600"
      >
        <span className="text-sm font-semibold text-gray-900 group-hover:text-brand-600">
          {q}
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-gray-400 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-200 ${
          open ? 'grid-rows-[1fr] pb-5' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-sm leading-relaxed text-gray-600">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link to="/" className="hover:text-gray-700">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-gray-900 font-medium">FAQ</span>
          </nav>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Frequently Asked Questions
          </h1>
          <p className="mt-2 text-gray-600">
            Everything you need to know about our shower filters, ordering, and delivery.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-10">
          {sections.map(section => (
            <div key={section.title}>
              <h2 className="text-lg font-bold text-gray-900 mb-2">{section.title}</h2>
              <div className="rounded-2xl border border-gray-100 bg-white px-6">
                {section.items.map(item => (
                  <FAQItem key={item.q} q={item.q} a={item.a} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl bg-brand-50 border border-brand-100 p-8 text-center">
          <h3 className="text-lg font-bold text-gray-900">Still have questions?</h3>
          <p className="mt-2 text-sm text-gray-600">
            Our team is here to help. Get in touch and we'll respond as quickly as possible.
          </p>
          <a
            href="mailto:support@totalfilter.co.uk"
            className="btn-primary mt-6 inline-flex"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}
