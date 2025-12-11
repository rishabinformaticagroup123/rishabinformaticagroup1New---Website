"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const careerOpenings = [
  {
    title: "Technical Support Executive",
    description:
      "Provide guidance and support to students on Informatica, SQL, Snowflake, and other courses. Assist students in resolving technical queries, and ensure smooth learning experience.",
    location: "Remote",
    type: "Full-time / Part-time",
    applyLink: "https://www.rishabinformaticagroup.com/about/contact?subject=Application for Technical Support Executive",
  },
  {
    title: "Trainer / Faculty",
    description:
      "Conduct live or recorded training sessions on various technologies including Informatica, SQL, Snowflake, Azure, and more. Prepare course material, projects, and exercises for students.",
    location: "Remote",
    type: "Full-time / Part-time / Freelance",
    applyLink: "https://www.rishabinformaticagroup.com/about/contact?subject=Application for Trainer",
  },
];

export default function CareerPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-orange-600 mb-4">Join Our Team</h1>
        <p className="text-gray-700 text-lg max-w-2xl mx-auto">
          We are looking for passionate individuals to join Rishab Informatica Group. Explore our current openings for Technical Support Executives and Trainers to help students succeed in their IT careers.
        </p>
      </div>

      {/* Career Openings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {careerOpenings.map((job, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <h2 className="text-2xl font-semibold text-blue-600 mb-3">{job.title}</h2>
            <p className="text-gray-700 mb-4">{job.description}</p>
            <p className="text-gray-600 font-medium mb-1">
              <span className="font-bold">Location:</span> {job.location}
            </p>
            <p className="text-gray-600 font-medium mb-4">
              <span className="font-bold">Type:</span> {job.type}
            </p>
            <Button asChild className="bg-orange-600 hover:bg-blue-600 text-white">
              <Link href={job.applyLink}>Apply Now</Link>
            </Button>
          </div>
        ))}
      </div>

      {/* Footer / Note */}
      <div className="mt-12 text-center text-gray-600">
        <p>
          If you have experience in training or technical support and a passion for helping students succeed, we would love to hear from you!
        </p>
      </div>
    </div>
  );
}
