"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { FaCheckCircle, FaRupeeSign, FaCalendarAlt, FaPhone, FaGlobe, FaLinkedin, FaWhatsapp } from "react-icons/fa";

export default function IICSCareerBlogPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800">
      {/* Headings - More Compelling */}
      <h1 className="text-4xl font-bold text-primary mb-3 leading-snug">
        Stuck in a Dead-End Job After Graduation? Land Your Dream IT Role in Just 45 Days!
      </h1>
      <h2 className="text-2xl font-semibold text-blue-600 mb-6">
        Here’s the Proven 45-Day Plan That Helped 100+ Students Crack Top IT Jobs!
      </h2>

      {/* Highlight Audience - More Visual */}
      <div className="bg-yellow-100 p-4 rounded-md border-l-4 border-yellow-500 mb-6">
        <p className="text-lg font-semibold text-gray-800">
          ✨ This Plan Works For:
        </p>
        <ul className="list-disc pl-6 text-gray-700 mt-2 space-y-1">
          <li><span className="font-bold">🎓 Fresh Graduates</span> confused about their career path</li>
          <li><span className="font-bold">🔁 Non-IT Professionals</span> transitioning to IT</li>
          <li><span className="font-bold">💼 IT Professionals</span> switching to high-demand roles (Data, Cloud, etc.)</li>
        </ul>
      </div>

      {/* Intro Message - More Concise */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <p className="text-lg">
          At <span className="font-bold text-primary">Rishab Informatica Group</span>, we’ve helped <span className="font-bold">2000+ students</span> land IT jobs with our 
          <span className="text-green-700 font-bold"> free career guidance</span> and structured 45-day roadmap.
        </p>
      </div>

      {/* Course Highlight - More Scannable */}
      <h2 className="text-2xl font-semibold text-primary mt-10 mb-4">
        💡 Why Our <span className="underline">Informatica IICS Combo Course</span> Beats Others:
      </h2>

      <ul className="space-y-3 mb-6">
        <li className="flex items-start">
          <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
          <span><strong>SQL + PowerCenter + IICS + Snowflake</strong> taught <span className="text-blue-600">together</span> in single sessions</span>
        </li>
        <li className="flex items-start">
          <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
          <span><strong>Real-time examples</strong> comparing concepts across platforms (e.g., "Joins" in SQL vs. PowerCenter vs. IICS)</span>
        </li>
        <li className="flex items-start">
          <FaCheckCircle className="text-green-500 mt-1 mr-2 flex-shrink-0" />
          <span><strong>508+ Interview Q&As</strong> and hands-on projects</span>
        </li>
      </ul>

      {/* Pricing - More Impactful */}
      <h2 className="text-2xl font-semibold text-primary mt-10 mb-4">
        💰 Save <span className="text-red-600">₹23,400+</span> With Our Combo!
      </h2>
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <p className="mb-2"><strong>Market Prices:</strong></p>
        <ul className="list-disc pl-5 space-y-1">
          <li>PowerCenter: ₹15,000</li>
          <li>IICS (CDI + CAI): ₹18,000</li>
          <li>SQL + Snowflake: ₹10,000+</li>
        </ul>
        <p className="mt-4 text-xl font-bold text-green-700">
          ✅ <span className="text-2xl">Your Price:</span> <span className="text-3xl">₹9,600/-</span> (60% Off!)
        </p>
      </div>

      {/* CTA Button */}
      <div className="text-center my-8">
        <Link
          href="https://www.rishabinformaticagroup.com/courses/iics-combo-live" 
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition shadow-lg inline-block"
        >
          🚀 Enroll Now & Save ₹23,400!
        </Link>
      </div>

      {/* 45-Day Plan - More Structured */}
      <h2 className="text-2xl font-semibold text-primary mt-10 mb-4">
        📅 Your <span className="underline">45-Day Job Plan</span>:
      </h2>
      <div className="bg-purple-50 p-4 rounded-lg mb-6">
        <ul className="list-decimal list-inside space-y-3">
          <li><strong>Day 1-15:</strong> Master SQL, PowerCenter, IICS, Snowflake (with 508+ Q&As)</li>
          <li><strong>Day 20:</strong> Optimize Resume & Naukri Profile</li>
          <li><strong>Day 23:</strong> First Mock Interview</li>
          <li><strong>Day 25+:</strong> Attend Real Interviews</li>
          <li><strong>Day 40-45:</strong> Job Offer or Free Retraining!</li>
          <li><strong>After Job:</strong> 2 Months Free Support</li>
        </ul>
      </div>

      {/* Testimonials - With Captions */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-primary mb-6 text-center">
          🎓 Success Stories from Our Students
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="text-center">
            <Image
              src="/images/testimonial1.PNG"
              alt="Student got placed at TCS"
              width={500}
              height={300}
              className="rounded-xl shadow-md object-cover"
            />
            <p className="mt-2 italic">"Placed at TCS with 6.5 LPA!" - Ramesh, 2023</p>
          </div>
          <div className="text-center">
            <Image
              src="/images/testimonial2.PNG"
              alt="Non-IT to IT transition"
              width={500}
              height={300}
              className="rounded-xl shadow-md object-cover"
            />
            <p className="mt-2 italic">"Switched from Banking to IT in 40 days!" - Priya, 2024</p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <h2 className="text-2xl font-semibold text-primary mt-12 mb-6">❓ Frequently Asked Questions</h2>
      <div className="space-y-4 mb-8">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-bold">Is there a money-back guarantee?</h3>
          <p>Yes! If you don’t land interviews by Day 45, we offer a 100% refund.</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-bold">Do I need prior IT experience?</h3>
          <p>No! We start from basics and focus on job-ready skills.</p>
        </div>
      </div>

      {/* Contact Info - More Interactive */}
      <div className="bg-blue-50 p-6 rounded-lg mt-8">
        <h2 className="text-xl font-bold text-primary mb-4">📞 Ready to Transform Your Career?</h2>
        <div className="space-y-2">
          <p className="flex items-center">
            <FaPhone className="mr-2 text-blue-600" />
            <a href="tel:+918970853557" className="hover:underline">8970853557</a> / 
            <a href="tel:+919448005273" className="hover:underline">9448005273</a>
          </p>
          <p className="flex items-center">
            <FaGlobe className="mr-2 text-blue-600" />
            <a 
              href="https://www.rishabinformaticagroup.com" 
              className="text-blue-600 hover:underline"
              target="_blank"
            >
              rishabinformaticagroup.com
            </a>
          </p>
          <div className="flex space-x-4 mt-3">
            <a href="#" className="text-blue-600 hover:text-blue-800">
              <FaLinkedin size={24} />
            </a>
            <a href="https://wa.me/918970853557" className="text-green-600 hover:text-green-800">
              <FaWhatsapp size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="text-center mt-10">
        <Link
          href="https://www.rishabinformaticagroup.com/courses/iics-combo-live"
          className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg text-lg font-semibold inline-block"
        >
          🚀 Start Your 45-Day Journey Today!
        </Link>
      </div>
    </div>
  );
}