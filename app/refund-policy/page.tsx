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
            At Rishab Informatica Group, we are committed to providing high-quality training programs. We understand that circumstances may arise that require you to request a refund. This policy outlines our refund terms and conditions.
          </p>

          <div className="mt-12 space-y-8">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold">Flexible Payment & Refund Policy</h2>
                <p className="mt-2 text-muted-foreground">
                  Students can choose to pay the full course fee upfront or split the payment into two parts:
                </p>
                <ul className="mt-2 list-disc pl-6 text-muted-foreground">
                  <li><strong>First Half</strong>: Pay before course begins</li>
                  <li><strong>Second Half</strong>: Pay within 14 days after the batch starts</li>
                </ul>
                <p className="mt-2 text-muted-foreground">
                  If you're not satisfied with the course within the first 14 days from the start date and have not made the second half payment, you're eligible for a full refund of the first installment.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold">Non-Refundable Situations</h2>
                <ul className="mt-2 list-disc pl-6 text-muted-foreground">
                  <li>Requests made after 14 days from course start</li>
                  <li>Full payment already completed</li>
                  <li>Registration/processing fees</li>
                  <li>Downloaded course materials or accessed content</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold">Special Circumstances</h2>
                <p className="mt-2 text-muted-foreground">
                  For cases such as serious illness or family emergency, we may consider refund requests on a case-by-case basis with valid documentation.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold">How to Request a Refund</h2>
                <p className="mt-2 text-muted-foreground">
                  Please email <strong>support@rishabinformaticagroup.com</strong> with:
                </p>
                <ul className="mt-2 list-disc pl-6 text-muted-foreground">
                  <li>Full name</li>
                  <li>Course name</li>
                  <li>Date of enrollment & batch start date</li>
                  <li>Reason for requesting a refund</li>
                  <li>Any supporting documents if applicable</li>
                </ul>
                <p className="mt-2 text-muted-foreground">
                  Refunds will be processed within 5–7 business days to the original payment method.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold">Course Cancellations</h2>
                <p className="mt-2 text-muted-foreground">
                  If Rishab Informatica Group cancels a course, all enrolled students will receive a full refund or the option to transfer to another batch.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold">Policy Changes</h2>
                <p className="mt-2 text-muted-foreground">
                  We reserve the right to update this refund policy at any time. Changes will be posted on this page.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold">Contact Us</h2>
                <p className="mt-2 text-muted-foreground">
                  For any questions about this policy, reach out to us:
                </p>
                <p className="mt-2 text-muted-foreground">
                  Email: support@rishabinformaticagroup.com<br />
                  Phone: +91 8970853557 / 9448005273<br />
                  Address: Rishab Informatica GROUP, No. 7, 5th Main, 15th Cross, Subbaraju Layout, Lakkasandra, Bangalore - 560030
                </p>
              </CardContent>
            </Card>
          </div>

          <p className="mt-8 text-sm text-muted-foreground">Last updated: June 24, 2025</p>
        </div>
      </section>
    </div>
  )
}
