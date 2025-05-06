import { Card, CardContent } from "@/components/ui/card"

export const metadata = {
  title: "Privacy Policy - Rishab Informatica Group",
  description:
    "Our privacy policy detailing how we collect, use, and protect your personal information at Rishab Informatica Group.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col gap-8 py-16">
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-extrabold tracking-tight">Privacy Policy</h1>
          <p className="mt-6 text-lg text-muted-foreground">
            At Rishab Informatica Group, we are committed to protecting your privacy and ensuring the security of your
            personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your
            information when you visit our website or use our services.
          </p>

          <div className="mt-12 space-y-8">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold">Information We Collect</h2>
                <p className="mt-2 text-muted-foreground">We may collect the following types of information:</p>
                <ul className="mt-2 list-disc pl-6 text-muted-foreground">
                  <li>
                    <strong>Personal Information:</strong> Name, email address, phone number, billing address, and
                    payment information when you register for our courses or services.
                  </li>
                  <li>
                    <strong>Educational Information:</strong> Academic background, professional experience, and learning
                    preferences to personalize your learning experience.
                  </li>
                  <li>
                    <strong>Usage Data:</strong> Information about how you interact with our website, including pages
                    visited, time spent on pages, and other browsing data.
                  </li>
                  <li>
                    <strong>Device Information:</strong> IP address, browser type, operating system, and device
                    identifiers.
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold">How We Use Your Information</h2>
                <p className="mt-2 text-muted-foreground">
                  We use the information we collect for various purposes, including:
                </p>
                <ul className="mt-2 list-disc pl-6 text-muted-foreground">
                  <li>Providing and maintaining our services</li>
                  <li>Processing transactions and sending related information</li>
                  <li>Personalizing your learning experience</li>
                  <li>Communicating with you about courses, updates, and promotions</li>
                  <li>Analyzing usage patterns to improve our website and services</li>
                  <li>Responding to your inquiries and providing customer support</li>
                  <li>Complying with legal obligations</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold">Information Sharing and Disclosure</h2>
                <p className="mt-2 text-muted-foreground">
                  We may share your information in the following circumstances:
                </p>
                <ul className="mt-2 list-disc pl-6 text-muted-foreground">
                  <li>
                    <strong>Service Providers:</strong> We may share your information with third-party service providers
                    who perform services on our behalf, such as payment processing, data analysis, email delivery, and
                    hosting services.
                  </li>
                  <li>
                    <strong>Business Transfers:</strong> If we are involved in a merger, acquisition, or sale of all or
                    a portion of our assets, your information may be transferred as part of that transaction.
                  </li>
                  <li>
                    <strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or
                    in response to valid requests by public authorities.
                  </li>
                  <li>
                    <strong>With Your Consent:</strong> We may share your information with your consent or as otherwise
                    disclosed at the time of collection.
                  </li>
                </ul>
                <p className="mt-2 text-muted-foreground">
                  We do not sell, rent, or trade your personal information to third parties for their marketing
                  purposes.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold">Data Security</h2>
                <p className="mt-2 text-muted-foreground">
                  We implement appropriate technical and organizational measures to protect your personal information
                  from unauthorized access, disclosure, alteration, or destruction. However, no method of transmission
                  over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold">Cookies and Tracking Technologies</h2>
                <p className="mt-2 text-muted-foreground">
                  We use cookies and similar tracking technologies to track activity on our website and store certain
                  information. Cookies are files with a small amount of data that may include an anonymous unique
                  identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being
                  sent. However, if you do not accept cookies, you may not be able to use some portions of our website.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold">Your Rights</h2>
                <p className="mt-2 text-muted-foreground">
                  Depending on your location, you may have certain rights regarding your personal information,
                  including:
                </p>
                <ul className="mt-2 list-disc pl-6 text-muted-foreground">
                  <li>The right to access and receive a copy of your personal information</li>
                  <li>The right to rectify or update your personal information</li>
                  <li>The right to erase your personal information</li>
                  <li>The right to restrict processing of your personal information</li>
                  <li>The right to object to processing of your personal information</li>
                  <li>The right to data portability</li>
                  <li>The right to withdraw consent</li>
                </ul>
                <p className="mt-2 text-muted-foreground">
                  To exercise these rights, please contact us using the information provided in the "Contact Us"
                  section.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold">Children's Privacy</h2>
                <p className="mt-2 text-muted-foreground">
                  Our services are not intended for individuals under the age of 16. We do not knowingly collect
                  personal information from children under 16. If you are a parent or guardian and you are aware that
                  your child has provided us with personal information, please contact us so that we can take necessary
                  actions.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold">Changes to This Privacy Policy</h2>
                <p className="mt-2 text-muted-foreground">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the
                  new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this
                  Privacy Policy periodically for any changes.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold">Contact Us</h2>
                <p className="mt-2 text-muted-foreground">
                  If you have any questions about this Privacy Policy, please contact us at:
                </p>
                <p className="mt-2 text-muted-foreground">
                  Email: privacy@rishabinformatica.com
                  <br />
                  Phone: +1 (555) 123-4567
                  <br />
                  Address: 123 Training Street, Tech City, 12345
                </p>
              </CardContent>
            </Card>
          </div>

          <p className="mt-8 text-sm text-muted-foreground">Last updated: April 23, 2025</p>
        </div>
      </section>
    </div>
  )
}
