"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function GitaDaanPage() {
  return (
    <div className="min-h-screen py-10 px-5 bg-gradient-to-b from-orange-50 to-yellow-100">
      
      {/* BANNER IMAGE */}
      <div className="max-w-4xl mx-auto mb-8">
        <Image
          src="/images/gitadaan.png"
          alt="Bhagavad Gita Daan Banner"
          width={1200}
          height={600}
          className="rounded-2xl shadow-xl border"
        />
      </div>

      {/* SLOKA SECTION */}
      <Card className="max-w-4xl mx-auto shadow-lg bg-white/80 mb-10">
        <CardContent className="p-6 text-center">
          <h2 className="text-2xl font-semibold text-orange-700 mb-4">
            Bhagavad-gītā 18.68–69
          </h2>
          <p className="italic text-gray-700 leading-relaxed">
            “For one who explains this supreme secret to the devotees,  
            pure devotional service is guaranteed, and at the end he will 
            return to Me.  
            There is no servant more dear to Me than he,  
            nor will there ever be one more dear.”
          </p>
        </CardContent>
      </Card>

      {/* PERSONAL MESSAGE */}
      <Card className="max-w-4xl mx-auto shadow-lg bg-white/80 mb-10">
        <CardContent className="p-6">
          <p className="text-gray-800 leading-relaxed text-lg">
            This seva is inspired by the divine service offered by my father and uncle 
            at the Tirupati Tiruchanur Padmavati Ammavari Temple Trust.  
            I humbly continue their legacy of serving society through spiritual knowledge.
            <br /><br />
            My life was transformed by the teachings of **Srila Prabhupada**, who inspired me 
            to distribute the Bhagavad Gita to everyone, especially children.  
            During this sacred **Gita Jayanti month (December–January)**, I feel blessed to 
            participate in spreading Lord Krishna’s message.
          </p>
        </CardContent>
      </Card>

      {/* WHY GITA DAAN */}
      <Card className="max-w-4xl mx-auto shadow-lg bg-white/80 mb-10">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold text-orange-700 mb-4">
            Why Bhagavad Gita Dāna?
          </h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Children gain life values, discipline, and clarity</li>
            <li>Prison inmates receive hope, guidance, and transformation</li>
            <li>Helps develop strong character and peaceful thinking</li>
            <li>Gita becomes a lifelong guide for anyone who receives it</li>
            <li>Spreads spiritual wisdom where it is needed most</li>
          </ul>
        </CardContent>
      </Card>

      {/* BENEFITS FOR DONOR */}
      <Card className="max-w-4xl mx-auto shadow-lg bg-white/80 mb-10 border border-orange-300">
        <CardContent className="p-6">
          <h2 className="text-2xl font-semibold text-orange-700 mb-4">
            Benefits for the Donor
          </h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Direct blessings of Lord Krishna as promised in Gita 18.68–69</li>
            <li>Immense spiritual merit (punya) for distributing divine knowledge</li>
            <li>Inner peace and long-term spiritual benefit</li>
            <li>Blessings for donor’s family and future generations</li>
            <li>Good fortune and protection through devotional service</li>
            <li>Special sukriti (spiritual credit) that stays with the soul forever</li>
            <li>Service to Srila Prabhupada’s mission of Gita distribution</li>
          </ul>
        </CardContent>
      </Card>

      {/* DONATION SECTION */}
      <Card className="max-w-4xl mx-auto shadow-lg bg-white/90 mb-10 border-2 border-orange-400">
        <CardContent className="p-6 text-center">
          <h2 className="text-3xl font-semibold text-orange-700 mb-4">
            Donate Bhagavad Gita
          </h2>

          <p className="text-gray-700 mb-4 text-lg">
            Sponsor Gitas for Schools, Prisons, Hospitals, or anyone you wish.
          </p>

          {/* UPI QR SECTION */}
          <div className="flex justify-center mb-4">
            <Image
              src="/images/qrcode.jpeg"
              alt="Donation QR"
              width={200}
              height={200}
              className="rounded-lg border"
            />
          </div>

          <p className="text-gray-700 font-medium mb-4">
            UPI ID: <span className="text-orange-700 font-semibold">harikrishnanaeilu-1@okaxis</span>
          </p>

          {/* DONATE BUTTON */}
          <Button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 text-lg rounded-xl">
            <Link href="https://pages.razorpay.com/pl_RqBOG3p8bacxPn/view" target="_blank">
              Donate via Razorpay
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* TRANSPARENCY */}
      <Card className="max-w-4xl mx-auto shadow-lg bg-white/80 mb-10">
        <CardContent className="p-6 text-gray-700 text-center leading-relaxed">
          100% of your donation is used to purchase and distribute Bhagavad Gita books.  
          No administrative charges.  
          Photos/videos will be shared after distribution.
        </CardContent>
      </Card>

      {/* CONTACT */}
      <div className="max-w-3xl mx-auto text-center mt-10 mb-10">
        <p className="text-gray-800 text-lg leading-relaxed">
          For any queries or seva participation:<br />
          <span className="font-semibold text-orange-700">Harikrishnan</span><br />
          Mobile: <span className="text-orange-700 font-semibold">+91-8970853557</span><br />
          Email: <span className="text-orange-700 font-semibold">harikrishananaeilu.v@gmail.com</span>
        </p>
      </div>

      {/* FOOTER */}
      <div className="text-center text-gray-600 mt-8 mb-6">
        © 2025 Rishab Informatica Group — Seva Initiative
      </div>

    </div>
  );
}
