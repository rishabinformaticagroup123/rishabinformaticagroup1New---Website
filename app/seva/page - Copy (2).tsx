"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function JoinOurSeva() {
  return (
    <div className="min-h-screen py-16 px-6 bg-gradient-to-b from-orange-50 to-yellow-100">
      {/* HEADER */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-bold text-orange-700">
          Bhagavad Gita Dāna Seva
        </h1>
        <p className="mt-4 text-lg text-gray-700 leading-relaxed">
          Gift the Divine Knowledge of the Bhagavad Gita to School Children.  
          Your contribution helps bring wisdom, values, and inspiration into young hearts.
        </p>
      </div>

      {/* WHY THIS SEVA */}
      <Card className="max-w-4xl mx-auto shadow-lg mb-10">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold text-orange-700 mb-4">
            Why This Seva?
          </h2>
          <p className="text-gray-700 leading-relaxed">
            Today’s children face stress, distraction, and confusion in a fast-moving world.
            The **Bhagavad Gita** builds inner strength, clarity, values, confidence, 
            and peaceful thinking.  
            Giving a Gita to a child is like giving them a **lifelong guide**.
          </p>
        </CardContent>
      </Card>

      {/* BENEFITS */}
      <Card className="max-w-4xl mx-auto shadow-lg mb-10">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold text-orange-700 mb-4">
            Benefits for Children
          </h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Improves concentration & memory</li>
            <li>Builds self-confidence & discipline</li>
            <li>Teaches moral values</li>
            <li>Reduces stress & anxiety</li>
            <li>Creates spiritual awareness</li>
            <li>Helps them make better decisions</li>
          </ul>
        </CardContent>
      </Card>

      {/* HOW IT WORKS */}
      <Card className="max-w-4xl mx-auto shadow-lg mb-10">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold text-orange-700 mb-4">
            How Your Donation Works
          </h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>You donate any amount you wish</li>
            <li>We purchase Bhagavad Gita books (Small ₹170 / Big ₹300)</li>
            <li>We distribute them to government & private school children</li>
            <li>You will receive photos/videos after the distribution</li>
            <li>100% transparent seva</li>
          </ul>
        </CardContent>
      </Card>

      {/* DONATION OPTIONS */}
      <Card className="max-w-4xl mx-auto shadow-lg mb-10">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold text-orange-700 mb-4">
            Donation Options
          </h2>
          <ul className="text-gray-700 space-y-2">
            <li>₹170 – Sponsor 1 Small Gita</li>
            <li>₹300 – Sponsor 1 Big Gita</li>
            <li>₹1000 – Sponsor 5–6 Gitas</li>
            <li>Custom Amount – Every rupee is valuable</li>
          </ul>
        </CardContent>
      </Card>

      {/* PAYMENT SECTION */}
      <Card className="max-w-4xl mx-auto shadow-lg mb-10 border-2 border-orange-400">
        <CardContent className="p-6 text-center">
          <h2 className="text-2xl font-semibold text-orange-700 mb-4">
            Donate Now
          </h2>

          <p className="text-gray-700 mb-4">
            You can donate using UPI or Razorpay.
          </p>

          {/* QR IMAGE (Replace with your own PNG) */}
          <div className="flex justify-center mb-4">
            <Image
              src="/images/your-upi-qr.png"
              alt="Donation QR"
              width={200}
              height={200}
              className="rounded-lg border"
            />
          </div>

          <p className="text-gray-700 font-medium">
            UPI ID: <span className="text-orange-700">yourupi@bank</span>
          </p>

          <Button className="mt-6 bg-orange-600 hover:bg-orange-700 text-white px-8 py-3">
            <Link href="https://your-razorpay-link.com" target="_blank">
              Donate via Razorpay
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* PERSONAL MESSAGE */}
      <div className="max-w-3xl mx-auto text-center mt-16 mb-16">
        <p className="text-gray-800 text-lg leading-relaxed">
          This seva is inspired by the offerings and service done by my family 
          at the Tirupati Tiruchanur Padmavati Ammavari Temple Trust.  
          Through this initiative, I wish to continue that legacy and help children gain 
          spiritual strength through the Bhagavad Gita.
        </p>
      </div>
    </div>
  );
}
