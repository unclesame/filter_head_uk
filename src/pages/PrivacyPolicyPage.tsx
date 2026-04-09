import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link to="/" className="hover:text-gray-700">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-gray-900 font-medium">Privacy Policy</span>
          </nav>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Privacy Policy</h1>
          <p className="mt-2 text-gray-600">
            How we collect, use, and protect your personal information.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-gray-100 bg-white p-6 sm:p-8">
          <div className="prose-sm space-y-8 text-sm leading-relaxed text-gray-600">
            <section>
              <h2 className="text-lg font-bold text-gray-900">1. Introduction</h2>
              <p className="mt-3">
                Totalfilter.co.uk ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you visit our website totalfilter.co.uk and make purchases from us.
              </p>
              <p className="mt-2">
                By using our website, you consent to the practices described in this policy. If you do not agree with this policy, please do not use our website.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900">2. Information We Collect</h2>
              <p className="mt-3">We may collect the following types of personal information:</p>
              <ul className="mt-2 list-disc list-inside space-y-1.5">
                <li><strong>Identity Data:</strong> First name, last name.</li>
                <li><strong>Contact Data:</strong> Email address, phone number, delivery address.</li>
                <li><strong>Transaction Data:</strong> Details of products you have purchased from us, order history, and payment information (processed securely by Square -- we do not store your full card details).</li>
                <li><strong>Technical Data:</strong> IP address, browser type and version, time zone setting, operating system, and other technology on the devices you use to access our website.</li>
                <li><strong>Usage Data:</strong> Information about how you use our website, including pages visited, time spent on pages, and navigation paths.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900">3. How We Use Your Information</h2>
              <p className="mt-3">We use your personal information for the following purposes:</p>
              <ul className="mt-2 list-disc list-inside space-y-1.5">
                <li>To process and fulfil your orders, including delivery and payment processing.</li>
                <li>To communicate with you about your orders, including order confirmations and dispatch notifications.</li>
                <li>To respond to your enquiries and provide customer support.</li>
                <li>To improve our website, products, and services.</li>
                <li>To comply with legal obligations and protect our rights.</li>
                <li>To send you marketing communications (only with your explicit consent, and you can opt out at any time).</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900">4. Legal Basis for Processing</h2>
              <p className="mt-3">We process your personal data on the following legal grounds under the UK GDPR:</p>
              <ul className="mt-2 list-disc list-inside space-y-1.5">
                <li><strong>Contract:</strong> Processing necessary to fulfil orders you have placed with us.</li>
                <li><strong>Legitimate Interest:</strong> Processing necessary for our legitimate business interests, such as improving our website and preventing fraud.</li>
                <li><strong>Consent:</strong> Where you have given explicit consent, such as for marketing communications.</li>
                <li><strong>Legal Obligation:</strong> Processing necessary to comply with our legal obligations.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900">5. Data Sharing</h2>
              <p className="mt-3">We may share your personal information with:</p>
              <ul className="mt-2 list-disc list-inside space-y-1.5">
                <li><strong>Payment Processors:</strong> Square processes your payment information securely. Their privacy policy can be found at squareup.com/legal/privacy.</li>
                <li><strong>Delivery Partners:</strong> Royal Mail to fulfil the delivery of your orders.</li>
                <li><strong>Service Providers:</strong> Trusted third parties who assist us in operating our website and conducting our business (e.g., hosting providers).</li>
              </ul>
              <p className="mt-2">
                We do not sell, trade, or rent your personal information to third parties for their marketing purposes.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900">6. Cookies</h2>
              <p className="mt-3">
                Our website uses cookies and similar technologies to enhance your browsing experience, analyse site traffic, and understand where our visitors are coming from. Cookies are small text files stored on your device.
              </p>
              <p className="mt-2">We use the following types of cookies:</p>
              <ul className="mt-2 list-disc list-inside space-y-1.5">
                <li><strong>Essential Cookies:</strong> Required for the website to function properly (e.g., shopping cart, checkout).</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website.</li>
              </ul>
              <p className="mt-2">
                You can control cookies through your browser settings. Disabling certain cookies may affect the functionality of our website.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900">7. Data Retention</h2>
              <p className="mt-3">
                We retain your personal information for as long as necessary to fulfil the purposes for which it was collected, including to satisfy any legal, accounting, or reporting requirements. Order data is retained for a minimum of 6 years to comply with UK tax regulations.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900">8. Your Rights</h2>
              <p className="mt-3">Under the UK GDPR, you have the following rights:</p>
              <ul className="mt-2 list-disc list-inside space-y-1.5">
                <li><strong>Right of Access:</strong> You can request a copy of the personal data we hold about you.</li>
                <li><strong>Right to Rectification:</strong> You can request that we correct any inaccurate data.</li>
                <li><strong>Right to Erasure:</strong> You can request that we delete your personal data (subject to legal obligations).</li>
                <li><strong>Right to Restrict Processing:</strong> You can request that we limit how we use your data.</li>
                <li><strong>Right to Data Portability:</strong> You can request a copy of your data in a machine-readable format.</li>
                <li><strong>Right to Object:</strong> You can object to the processing of your personal data for marketing purposes.</li>
              </ul>
              <p className="mt-2">
                To exercise any of these rights, please contact us at{' '}
                <a href="mailto:sales@totalfilter.co.uk" className="text-brand-600 hover:text-brand-700 font-medium">
                  sales@totalfilter.co.uk
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900">9. Data Security</h2>
              <p className="mt-3">
                We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. Our website uses SSL encryption, and all payment processing is handled by Square's PCI-DSS compliant infrastructure.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900">10. Third-Party Links</h2>
              <p className="mt-3">
                Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to read their privacy policies before providing any personal information.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900">11. Changes to This Policy</h2>
              <p className="mt-3">
                We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900">12. Contact Us</h2>
              <p className="mt-3">
                If you have any questions about this Privacy Policy or how we handle your personal data, please contact us:
              </p>
              <ul className="mt-2 space-y-1">
                <li>Email: <a href="mailto:sales@totalfilter.co.uk" className="text-brand-600 hover:text-brand-700 font-medium">sales@totalfilter.co.uk</a></li>
                <li>Phone: 0800 612 7174</li>
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
