"use client";

import React from "react";
import Link from "next/link";

export default function IICSComboCourseContentPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 text-gray-800">
      <h1 className="text-4xl font-bold text-primary mb-8">
        🔍 What Will You Learn in the IICS Combo?
      </h1>

      <p className="text-lg leading-7 mb-6">
        The IICS Combo course by <strong>Rishab Informatica Group</strong> is a powerful program designed to get you job-ready in just 45+ sessions. It includes:
        <br />
        <strong>SQL + Informatica PowerCenter + IICS (CDI & CAI) + Snowflake + GCP + AWS</strong>
      </p>

      <Link
        href="/syllabus/course-content.pdf"
        download
        className="text-blue-600 underline font-medium mb-10 inline-block"
      >
        📥 Download Full 45-Day IICS Combo Course PDF
      </Link>

      <h2 className="text-2xl font-semibold text-primary mt-10 mb-4">📘 Course Structure Overview</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>Total Duration: <strong>45+ Sessions</strong> (~80+ Hours)</li>
        <li>Timing Options: Morning (7–9 AM), Evening (7–9 PM)</li>
        <li>Mode: Daily 2-hour interactive online classes</li>
        <li>Fee: <strong>₹9,600/- only</strong></li>
        <li>Trainer: Hari.A (13+ years experience in Informatica, Snowflake, AWS, etc.)</li>
      </ul>

      <h2 className="text-2xl font-semibold text-green-700 mt-10 mb-4">🧩 Cloud Data Integration (CDI) Modules</h2>
      <p className="mb-6">From data modeling to transformation logics, you'll master ETL with hands-on sessions using PowerCenter and IICS.</p>
      <ul className="list-disc list-inside mb-6">
        <li>ETL Basics, OLAP vs OLTP, Data Warehousing</li>
        <li>SQL Core Concepts, Constraints, Joins, Aggregations</li>
        <li>Transformations: Filter, Router, Joiner, Lookup, Rank, Aggregator, Sequence Generator</li>
        <li>SCD Types 1, 2, 3 (Theory + Practice)</li>
        <li>Reusable Mappings, Parameters, Task Flows, Complex Mappings</li>
        <li>CDC (Change Data Capture), Performance Tuning, Migration & Deployment</li>
      </ul>

      <h2 className="text-2xl font-semibold text-indigo-700 mt-10 mb-4">🔗 Cloud Application Integration (CAI) Modules</h2>
      <p className="mb-6">This module covers building, managing, and integrating APIs using IICS CAI.</p>
      <ul className="list-disc list-inside mb-6">
        <li>REST & SOAP APIs, Web Service Concepts</li>
        <li>Postman setup, CAI Process Server Installation</li>
        <li>Creating & Publishing APIs, Swagger/WSDL support</li>
        <li>Service Connectors (JDBC, Kafka, JSON, XML)</li>
        <li>API Manager, API Registry, Rate Limit Policies</li>
        <li>Connecting APIs with CDI and Snowflake</li>
      </ul>

      <h2 className="text-2xl font-semibold text-purple-700 mt-10 mb-4">❄️ Snowflake Modules</h2>
      <p className="mb-6">Learn how to connect and integrate Snowflake with PowerCenter, IICS, and APIs.</p>
      <ul className="list-disc list-inside mb-6">
        <li>Snowflake Account Setup & UI Overview</li>
        <li>Loading Data to/from Snowflake</li>
        <li>Using Snowflake as Source & Target with IICS</li>
        <li>Real-time integration with CSV, Oracle, APIs</li>
        <li>Best practices & project-level usage</li>
      </ul>

      <h2 className="text-2xl font-semibold text-primary mt-10 mb-4">🎓 Interview Preparation & Project Support</h2>
      <ul className="list-disc list-inside mb-6">
        <li>Mock Interviews (Day 28 & 39)</li>
        <li>Resume Building, Naukri Profile Setup</li>
        <li>Real-Time Projects: Banking & Healthcare</li>
        <li>Agile, Sprint Planning, Dev/UAT/Prod Setup</li>
        <li>2 Months Free Job Support After Placement</li>
      </ul>

      <h2 className="text-2xl font-semibold text-primary mt-10 mb-4">📞 Get in Touch</h2>
      <p className="text-lg font-medium mb-4">
        Trainer: Hari.A<br />
        Call/WhatsApp: <a href="tel:8970853557" className="text-blue-600">8970853557</a> / <a href="tel:9448005273" className="text-blue-600">9448005273</a><br />
        Website: <a href="https://www.rishabinformaticagroup.com" className="text-blue-600 underline" target="_blank">www.rishabinformaticagroup.com</a><br />
        Location: Bangalore
      </p>

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
