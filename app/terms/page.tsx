import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">Terms & Conditions</h1>
          <p className="text-lg text-gray-600">Last Updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="prose prose-blue max-w-none">
          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">1. Acceptance of Terms</h2>
            <p className="mb-4">
              By accessing or using services from Rishab Informatica Group ("we", "us", or "our"), you agree to comply with these Terms and Conditions. These terms apply to all our training programs, website usage, and related services.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">2. Training Program Terms</h2>
            <h3 className="text-xl font-medium text-gray-800 mb-2">2.1 Enrollment</h3>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Payment must be completed before course commencement</li>
              <li>We reserve the right to refuse enrollment at our discretion</li>
              <li>Batch transfers may be permitted with prior approval</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-800 mb-2">2.2 Refund Policy</h3>
            <p className="mb-4">
              Cancellations within 3 days of enrollment: 100% refund (minus payment processing fees). After 3 days but before course start: 50% refund. No refunds after course commencement.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">3. Intellectual Property</h2>
            <p className="mb-4">
              All training materials (videos, documents, code samples) provided are proprietary to Rishab Informatica Group. Students are granted a non-exclusive, non-transferable license for personal educational use only.
            </p>
            <p>
              Redistribution, resale, or commercial use of our materials without express written permission is strictly prohibited.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">4. Student Conduct</h2>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>No sharing of login credentials or recorded sessions</li>
              <li>Respectful communication with instructors and peers required</li>
              <li>Violations may result in immediate termination without refund</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">5. Job Placement</h2>
            <p className="mb-4">
              While we provide placement assistance (resume review, interview preparation), we do not guarantee employment. Placement statistics represent historical data and are not promises of individual outcomes.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">6. Limitation of Liability</h2>
            <p className="mb-4">
              Rishab Informatica Group shall not be liable for any indirect, incidental, or consequential damages arising from:
            </p>
            <ul className="list-disc pl-6 mb-4 space-y-2">
              <li>Technical issues during live sessions</li>
              <li>Changes in industry demand for specific skills</li>
              <li>Individual performance in interviews or on the job</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">7. Privacy</h2>
            <p className="mb-4">
              Your use of our services is subject to our <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>, which explains how we collect and use your information.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">8. Modifications</h2>
            <p className="mb-4">
              We may update these terms periodically. Continued use of our services after changes constitutes acceptance of the modified terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">9. Contact</h2>
            <p>
              For questions regarding these terms, contact us at <Link href="/about/contact-us" className="text-blue-600 hover:underline">support@rishabinformaticagroup.com</Link> or +91 9448005273.
            </p>
          </section>
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8 text-center">
          <p className="text-gray-500">
            © {new Date().getFullYear()} Rishab Informatica Group. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}