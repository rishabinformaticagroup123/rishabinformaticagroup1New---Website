import Link from 'next/link';

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">Cookie Policy</h1>
          <p className="text-lg text-gray-600">Last Updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="prose prose-blue max-w-none">
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">1. What Are Cookies?</h2>
            <p className="mb-4">
              Cookies are small text files stored on your device when you visit our website. Like most professional training websites, we use cookies and similar technologies to enhance your experience and analyze site usage.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">2. How We Use Cookies</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200 mb-6">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-blue-800 border-b">Cookie Type</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-blue-800 border-b">Purpose</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-blue-800 border-b">Duration</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-4 py-3 text-sm text-gray-700">Essential Cookies</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Enable core functionality (login, session management)</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Session</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 text-sm text-gray-700">Performance Cookies</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Analyze site traffic and usage patterns (Google Analytics)</td>
                    <td className="px-4 py-3 text-sm text-gray-700">1-2 years</td>
                  </tr>
                  <tr className="border-b">
                    <td className="px-4 py-3 text-sm text-gray-700">Functional Cookies</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Remember preferences (language, region)</td>
                    <td className="px-4 py-3 text-sm text-gray-700">30-90 days</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-sm text-gray-700">Marketing Cookies</td>
                    <td className="px-4 py-3 text-sm text-gray-700">Track campaign performance (Facebook Pixel, Google Ads)</td>
                    <td className="px-4 py-3 text-sm text-gray-700">30-180 days</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">3. Third-Party Cookies</h2>
            <p className="mb-4">
              We partner with trusted providers who may set cookies:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li><strong>Google Analytics:</strong> Helps us understand how visitors use our training platform</li>
              <li><strong>Hotjar:</strong> Provides insights into user behavior (optional)</li>
              <li><strong>Payment Processors:</strong> For secure course enrollment transactions</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">4. Your Cookie Choices</h2>
            <div className="bg-blue-50 p-6 rounded-lg mb-4">
              <h3 className="text-lg font-medium text-blue-800 mb-3">Cookie Consent Banner</h3>
              <p className="mb-4">
                When you first visit our website, you'll see a cookie consent banner where you can:
              </p>
              <ul className="list-disc pl-6 space-y-1">
                <li>Accept all cookies</li>
                <li>Reject non-essential cookies</li>
                <li>Customize your preferences</li>
              </ul>
            </div>
            <p className="mb-4">
              You can change your preferences at any time by clicking the <strong>Cookie Settings</strong> link in our website footer.
            </p>
            <p>
              Most browsers also allow you to manage cookies through their settings (usually found under "Privacy" or "Security").
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">5. Necessary Cookies</h2>
            <p className="mb-4">
              Essential cookies cannot be disabled as they are required for:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Secure login to our training portal</li>
              <li>Maintaining your session during course access</li>
              <li>Processing payments for enrollments</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">6. Changes to This Policy</h2>
            <p className="mb-4">
              We may update this policy as our services or regulations change. Significant changes will be announced via email or website notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">7. Contact Us</h2>
            <p>
              For questions about our Cookie Policy, contact our Data Protection Officer at <Link href="/about/contact-us" className="text-blue-600 hover:underline">dpo@rishabinformaticagroup.com</Link> or through our <Link href="/about/contact-us" className="text-blue-600 hover:underline">contact form</Link>.
            </p>
          </section>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8 text-center">
          <p className="text-gray-500">
            © {new Date().getFullYear()} Rishab Informatica Group. All rights reserved.
          </p>
          <div className="mt-4 flex justify-center space-x-6">
            <Link href="/privacy" className="text-sm text-blue-600 hover:underline">Privacy Policy</Link>
            <Link href="/terms" className="text-sm text-blue-600 hover:underline">Terms & Conditions</Link>
            <Link href="/cookie-policy" className="text-sm text-blue-600 hover:underline">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </div>
  );
}