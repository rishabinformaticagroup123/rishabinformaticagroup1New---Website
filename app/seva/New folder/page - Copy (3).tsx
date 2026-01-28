"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function JoinOurSeva() {
  return (
    <div className="min-h-screen py-12 px-6 bg-gradient-to-b from-orange-50 to-yellow-100">
      
      {/* TOP BANNER IMAGE */}
      <div className="max-w-5xl mx-auto mb-12">
        <Image
          src="/images/gitadaan.png"
          alt="Gita Daan Banner"
          width={1600}
          height={600}
          className="rounded-xl shadow-lg border"
        />
      </div>

      {/* TITLE */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h1 className="text-4xl font-extrabold text-orange-700 drop-shadow-sm">
          Bhagavad Gita Dāna Seva
        </h1>
        <p className="mt-4 text-lg text-gray-700 leading-relaxed">
          Support the sacred mission of distributing <b>“Bhagavad-gita As It Is”</b> 
          to school children.  
          Your seva helps spread values, culture, and spiritual strength to young minds.
        </p>
      </div>

      {/* WHY THIS SEVA */}
      <Card className="max-w-4xl mx-auto shadow-xl mb-10">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold text-orange-700 mb-4">
            Why Gita Dāna?
          </h2>

          <p className="text-gray-700 leading-relaxed">
            In today’s world, children face stress, confusion, distractions, and emotional pressure.  
            The <b>Bhagavad Gita</b> gives them clarity, confidence, discipline, devotion, and inner strength.  
            By donating a Gita, you are giving a child a <b>lifelong spiritual guide</b> and a source of wisdom that can transform their future.
          </p>

          <p className="mt-4 text-gray-700 leading-relaxed">
            It is said in the scriptures that <b>Gita Dāna is the highest form of charity</b>,  
            because you are giving knowledge that stays with the soul forever.
          </p>
        </CardContent>
      </Card>

      {/* BENEFITS FOR CHILDREN */}
      <Card className="max-w-4xl mx-auto shadow-xl mb-10">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold text-orange-700 mb-4">
            How Children Benefit
          </h2>

          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Improves concentration & memory</li>
            <li>Builds self-confidence and self-discipline</li>
            <li>Develops moral values and good character</li>
            <li>Reduces stress, fear, and anxiety</li>
            <li>Encourages spiritual awareness at a young age</li>
            <li>Helps them make the right decisions in life</li>
          </ul>
        </CardContent>
      </Card>

      {/* BENEFITS FOR DONORS */}
      <Card className="max-w-4xl mx-auto shadow-xl mb-10">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold text-orange-700 mb-4">
            Blessings for Donors
          </h2>

          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Gita Dāna removes negative karma and brings divine blessings</li>
            <li>Brings peace, prosperity, and spiritual growth in your home</li>
            <li>Increases punya accumulated for generations</li>
            <li>You become part of spreading Sanatana Dharma to young minds</li>
            <li>Scriptures say: “Gita-daan is equal to giving a thousand cows”</li>
          </ul>
        </CardContent>
      </Card>

      {/* HOW IT WORKS */}
      <Card className="max-w-4xl mx-auto shadow-xl mb-10">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold text-orange-700 mb-4">
            How Your Donation is Used
          </h2>

          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>You donate any amount from your heart</li>
            <li>We purchase Bhagavad Gita books based on school requirement</li>
            <li>Books are distributed to school children across different regions</li>
            <li>You receive photos/videos of the seva as transparency</li>
            <li>100% of your donation is used only for Gita distribution</li>
          </ul>
        </CardContent>
      </Card>

      {/* PAYMENT SECTION */}
      <Card className="max-w-4xl mx-auto shadow-xl mb-16 border-2 border-orange-400">
        <CardContent className="p-6 text-center">
          <h2 className="text-2xl font-semibold text-orange-700 mb-4">
            Contribute to Gita Dāna
          </h2>

          <p className="text-gray-700 mb-4">
            Donate through Razorpay using the button below.
          </p>

          <Button className="mt-6 bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 text-lg rounded-xl shadow-md">
            <Link
              href="https://pages.razorpay.com/pl_RqBOG3p8bacxPn/view"
              target="_blank"
            >
              Donate via Razorpay
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* PERSONAL MESSAGE */}
      <div className="max-w-3xl mx-auto text-center mt-12 mb-12">
        <p className="text-gray-800 text-lg leading-relaxed">
          This seva is inspired by the divine service of my father and uncle 
          at the Tirupati Tiruchanur Padmavati Ammavari Temple Trust.  
          Through this initiative, I humbly continue their legacy of serving society 
          through spiritual knowledge.
        </p>
      </div>
    </div>
  );
}
