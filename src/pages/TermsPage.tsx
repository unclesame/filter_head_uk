import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link to="/" className="hover:text-gray-700">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-gray-900 font-medium">Terms &amp; Conditions</span>
          </nav>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Terms &amp; Conditions
          </h1>
          <p className="mt-2 text-gray-600">
            Please read these terms carefully before using our website or making a purchase.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-8">
          <div className="prose-sm space-y-8 text-sm leading-relaxed text-gray-600">
            <section>
              <h2 className="text-lg font-bold text-gray-900">1. Introduction</h2>
              <p className="mt-3">
                These Terms and Conditions ("Terms") govern your use of the Totalfilter.co.uk website and your purchase of products from us. By accessing our website and/or placing an order, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our website.
              </p>
              <p className="mt-2">
                Totalfilter.co.uk is operated from the United Kingdom. These Terms are governed by English law.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900">2. Products and Descriptions</h2>
              <p className="mt-3">
                We make every effort to ensure that product descriptions, images, and prices on our website are accurate. However, we do not warrant that all information is error-free. If we discover an error in the price or description of a product you have ordered, we will inform you and give you the option to continue with the order at the correct price or cancel it for a full refund.
              </p>
              <p className="mt-2">
                Product images are for illustrative purposes and may differ slightly from the actual product. Colours may vary depending on your screen settings.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900">3. Pricing and Payment</h2>
              <p className="mt-3">
                All prices displayed on our website are in British Pounds Sterling (GBP) and include VAT at the prevailing rate where applicable. Delivery charges are shown separately and will be added to your order total at checkout.
              </p>
              <p className="mt-2">
                Payment is processed securely via Square. We accept Visa, Mastercard, American Express, Apple Pay, and Google Pay. Payment must be received in full before your order is dispatched.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900">4. Orders and Acceptance</h2>
              <p className="mt-3">
                When you place an order, you are making an offer to purchase the products. We will send you an order confirmation email, which constitutes our acceptance of your order and forms a binding contract.
              </p>
              <p className="mt-2">
                We reserve the right to refuse or cancel any order for any reason, including but not limited to product availability, errors in pricing, or suspected fraudulent activity. If we cancel your order, you will receive a full refund.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900">5. Delivery</h2>
              <p className="mt-3">
                We aim to deliver all orders within 2-4 working days via Royal Mail. Free standard delivery is available on orders over &pound;29. For orders under &pound;29, a delivery charge of &pound;3.95 applies.
              </p>
              <p className="mt-2">
                While we make every effort to meet estimated delivery times, these are not guaranteed. We shall not be liable for any delay in delivery caused by circumstances beyond our reasonable control.
              </p>
              <p className="mt-2">
                Risk of loss and damage passes to you upon delivery. If your order is lost or damaged in transit, please contact us within 48 hours so we can arrange a replacement or refund.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900">6. Returns and Refunds</h2>
              <p className="mt-3">
                You have a right to cancel your order within 14 days of receiving the goods under the Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013.
              </p>
              <p className="mt-2">
                In addition, we offer a 30-day money-back guarantee on all products. Items must be returned unused, in their original packaging, and in resalable condition. Used filter cartridges cannot be returned for hygiene reasons.
              </p>
              <p className="mt-2">
                For full details, please refer to our{' '}
                <Link to="/shipping-returns" className="text-brand-600 hover:text-brand-700 font-medium">
                  Shipping &amp; Returns
                </Link>{' '}
                page.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900">7. Product Warranty</h2>
              <p className="mt-3">
                All products sold through Totalfilter.co.uk are covered by the manufacturer's warranty where applicable. In addition, you are protected by your statutory consumer rights under the Consumer Rights Act 2015, which provides that goods must be of satisfactory quality, fit for purpose, and as described.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900">8. Limitation of Liability</h2>
              <p className="mt-3">
                To the fullest extent permitted by law, Totalfilter.co.uk shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of our website or purchase of our products.
              </p>
              <p className="mt-2">
                Nothing in these Terms excludes or limits our liability for death or personal injury arising from our negligence, fraud, or any other liability that cannot be excluded or limited under applicable law.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900">9. Intellectual Property</h2>
              <p className="mt-3">
                All content on this website, including text, images, logos, graphics, and software, is the property of Totalfilter.co.uk or its licensors and is protected by copyright and intellectual property laws. You may not reproduce, distribute, or use any content from this website without our prior written consent.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900">10. Privacy</h2>
              <p className="mt-3">
                Your privacy is important to us. Please refer to our{' '}
                <Link to="/privacy-policy" className="text-brand-600 hover:text-brand-700 font-medium">
                  Privacy Policy
                </Link>{' '}
                for information on how we collect, use, and protect your personal data.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900">11. Governing Law</h2>
              <p className="mt-3">
                These Terms are governed by and construed in accordance with the laws of England and Wales. Any disputes arising from these Terms or your use of our website shall be subject to the exclusive jurisdiction of the courts of England and Wales.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900">12. Changes to These Terms</h2>
              <p className="mt-3">
                We reserve the right to update or modify these Terms at any time without prior notice. Changes will be effective immediately upon posting on this page. Your continued use of our website after any changes constitutes acceptance of the new Terms.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900">13. Contact Information</h2>
              <p className="mt-3">
                If you have any questions about these Terms, please contact us:
              </p>
              <ul className="mt-2 space-y-1">
                <li>Email: <a href="mailto:sales@totalfilter.co.uk" className="text-brand-600 hover:text-brand-700 font-medium">sales@totalfilter.co.uk</a></li>
                <li>Phone: +44 1304 700370</li>
              </ul>
            </section>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Last updated: February 2026</p>
        </div>
      </div>
    </div>
  );
}
