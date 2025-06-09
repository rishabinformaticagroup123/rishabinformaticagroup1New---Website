"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function IICSCareerBlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-4xl font-bold text-primary mb-6">
        Confused After Graduation? Here's a 45-Day Plan to Get a Software Job!
      </h1>

      <p className="text-lg leading-8 mb-6">
        Many students wonder, <strong>“What should I do after my degree?”</strong> Even during
        college, there's often no clarity on what job to pursue. At{" "}
        <span className="font-semibold text-primary">Rishab Informatica Group</span>, we offer{" "}
        <span className="font-bold text-green-700">free career guidance</span> to help you find your
        path in the IT industry.
      </p>

      <h2 className="text-2xl font-semibold text-primary mt-10 mb-4">
        💡 Why Choose Our Informatica IICS Combo Course?
      </h2>

      <ul className="list-disc list-inside text-lg mb-6">
        <li>SQL</li>
        <li>Informatica PowerCenter</li>
        <li>Informatica IICS (IDMC: CDI + CAI)</li>
        <li>Snowflake</li>
      </ul>

      <p className="mb-6">
        All are taught together in one session so you can compare and master each concept across
        platforms — with hands-on, real-time examples.
      </p>

      <h3 className="text-xl font-semibold text-blue-600 mb-4">
        📘 Example: Learning “Joins” Across Platforms
      </h3>

      <p className="mb-6">
        In a single session (1.5 to 2 hours), we teach:
        <br />
        ➤ Joins in SQL<br />
        ➤ Joins in PowerCenter<br />
        ➤ Joins in IICS<br />
        ➤ Joins in Snowflake<br />
        <br />
        You’ll clearly see the differences and naming conventions — making you an expert fast.
      </p>

      <h2 className="text-2xl font-semibold text-primary mt-10 mb-4">
        💸 What’s the Cost Comparison?
      </h2>

      <p className="mb-4">
        Market Prices:
        <br />
        - PowerCenter alone: ₹15,000<br />
        - IICS (CDI + CAI): ₹18,000<br />
        - SQL + Snowflake: ₹10,000+<br />
      </p>

      <p className="text-xl font-bold text-green-700 mb-6">
        ✅ Our Combo Offer: Everything for just ₹9,600/-
      </p>

      <h2 className="text-2xl font-semibold text-primary mt-10 mb-4">
        🚀 Our 45-Day Job Plan
      </h2>

      <ul className="list-decimal list-inside text-lg space-y-2 mb-6">
        <li>
          <strong>Day 1:</strong> Docs + 508 Interview Q&As (SQL, PowerCenter, IICS, Snowflake)
        </li>
        <li>
          <strong>Day 20:</strong> Resume & Naukri Profile Preparation
        </li>
        <li>
          <strong>Day 23:</strong> First Mock Interview
        </li>
        <li>
          <strong>Day 25:</strong> Attend Real-Time Interviews
        </li>
        <li>
          <strong>Day 35:</strong> Second Mock Interview + Feedback
        </li>
        <li>
          <strong>Day 40–45:</strong> Crack Interviews. If not, 3rd Mock Interview.
        </li>
        <li>
          <strong>After Getting Job:</strong> 2 Months Free Job Support
        </li>
      </ul>

      <h2 className="text-2xl font-semibold text-primary mt-10 mb-4">
        🌟 Final Words
      </h2>
      <p className="mb-6">
        Many students have already benefited from this combo and successfully entered the IT
        industry within 45 days. You could be next!
      </p>

 {/* ✅ Testimonials Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-primary mb-6 text-center">
          🙌 Real Student Success – Testimonials
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Image
            src="/images/testimonial1.PNG"
            alt="Student Testimonial 1"
            width={500}
            height={300}
            className="rounded-xl shadow-md object-cover"
          />
          <Image
            src="/images/testimonial2.PNG"
            alt="Student Testimonial 2"
            width={500}
            height={300}
            className="rounded-xl shadow-md object-cover"
          />
          <Image
            src="/images/testimonial3.PNG"
            alt="Student Testimonial 3"
            width={500}
            height={300}
            className="rounded-xl shadow-md object-cover"
          />
          <Image
            src="/images/testimonial4.PNG"
            alt="Student Testimonial 4"
            width={500}
            height={300}
            className="rounded-xl shadow-md object-cover"
          />
        </div>
      </div>

      {/* Contact Info */}
      <p className="font-semibold text-lg mt-10">
        Thanks & Regards, <br />
        Hari.A
        <br />
        📞 8970853557 / 9448005273 <br />
        🌐{" "}
        <a
          href="https://www.rishabinformaticagroup.com"
          className="text-blue-600 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          www.rishabinformaticagroup.com
        </a>
        <br />
        📍 Bangalore
      </p>

      {/* Back to Blog Button */}
      <div className="mt-10">
        <Link
          href="/blogs"
          className="inline-block bg-primary text-white px-6 py-2 rounded-xl hover:bg-primary/90 transition"
        >
          ← Back to Blog
        </Link>
      </div>
    </div>
  );
}
