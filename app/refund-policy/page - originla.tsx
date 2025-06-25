import { Card, CardContent } from "@/components/ui/card"

export const metadata = {
  title: "Refund Policy - Rishab Informatica Group",
  description: "Our refund policy for courses and training programs at Rishab Informatica Group.",
}

export default function RefundPolicyPage() {
  return (
    <div className="flex flex-col gap-8 py-16">
      <section className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-extrabold tracking-tight">Refund Policy</h1>
          <p className="mt-6 text-lg text-muted-foreground">
            At Rishab Informatica Group, we are committed to providing high-quality training programs. We understand
            that circumstances may arise that require you to request a refund. This policy outlines our refund terms and
            conditions.
          </p>

          <div className="mt-12 space-y-8">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold">7-Day Money-Back Guarantee</h2>
                <p className="mt-2 text-muted-foreground">
                  We offer a 7-day money-back guarantee for most of our courses. If you're not satisfied with the course
                  within the first 7 days from the date of enrollment, you can request a full refund.
                </p>
                <p className="mt-2 text-muted-foreground">
                  To be eligible for a refund under our money-back guarantee, you must:
                </p>
                <ul className="mt-2 list-disc pl-6 text-muted-foreground">
                  <li>Request the refund within 7 days of enrollment</li>
                  <li>Have attended no more than 2 sessions or completed no more than 10% of the course content</li>
                  <li>Provide a reason for your dissatisfaction</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold">Partial Refunds</h2>
                <p className="mt-2 text-muted-foreground">
                  If you request a refund after the 7-day period but before completing 30% of the course, you may be
                  eligible for a partial refund as follows:
                </p>
                <ul className="mt-2 list-disc pl-6 text-muted-foreground">
                  <li>8-14 days from enrollment: 75% refund</li>
                  <li>15-21 days from enrollment: 50% refund</li>
                  <li>22-30 days from enrollment: 25% refund</li>
                </ul>
                <p className="mt-2 text-muted-foreground">
                  No refunds will be issued after 30 days from the date of enrollment or if more than 30% of the course
                  has been completed, whichever comes first.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold">Special Circumstances</h2>
                <p className="mt-2 text-muted-foreground">
                  We understand that special circumstances may arise that prevent you from continuing with the course.
                  In cases of serious illness, family emergency, or other extenuating circumstances, we may consider
                  refund requests on a case-by-case basis, even if they fall outside our standard refund policy.
                </p>
                <p className="mt-2 text-muted-foreground">
                  Documentation may be required to support refund requests based on special circumstances.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold">Non-Refundable Items</h2>
                <p className="mt-2 text-muted-foreground">The following items are non-refundable:</p>
                <ul className="mt-2 list-disc pl-6 text-muted-foreground">
                  <li>Registration fees</li>
                  <li>Course materials that have been downloaded or accessed</li>
                  <li>Certification exam fees</li>
                  <li>Discounted or promotional courses marked as "non-refundable"</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold">How to Request a Refund</h2>
                <p className="mt-2 text-muted-foreground">
                  To request a refund, please contact our support team at refunds@rishabinformatica.com with the
                  following information:
                </p>
                <ul className="mt-2 list-disc pl-6 text-muted-foreground">
                  <li>Your full name</li>
                  <li>Course name</li>
                  <li>Date of enrollment</li>
                  <li>Reason for requesting a refund</li>
                  <li>Any supporting documentation (if applicable)</li>
                </ul>
                <p className="mt-2 text-muted-foreground">
                  We will process your refund request within 5-7 business days and notify you of the decision.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold">Refund Method</h2>
                <p className="mt-2 text-muted-foreground">
                  Refunds will be issued using the same payment method used for the original purchase. Please allow 7-14
                  business days for the refund to be processed by your financial institution.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold">Course Cancellations</h2>
                <p className="mt-2 text-muted-foreground">
                  If Rishab Informatica Group cancels a course for any reason, all enrolled students will receive a full
                  refund or the option to transfer to another course.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold">Policy Changes</h2>
                <p className="mt-2 text-muted-foreground">
                  Rishab Informatica Group reserves the right to modify this refund policy at any time. Any changes will
                  be effective immediately upon posting on our website.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold">Contact Us</h2>
                <p className="mt-2 text-muted-foreground">
                  If you have any questions about our refund policy, please contact us at:
                </p>
                <p className="mt-2 text-muted-foreground">
                  Email: support@rishabinformatica.com
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
