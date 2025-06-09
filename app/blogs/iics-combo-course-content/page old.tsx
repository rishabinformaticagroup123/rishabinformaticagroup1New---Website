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

      <h2 className="text-2xl font-semibold text-primary mt-10 mb-4">📘 Course Structure Overview</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>Total Duration: <strong>45+ Sessions</strong> (~80+ Hours)</li>
        <li>Timing Options: Morning (7–9 AM), Evening (7–9 PM)</li>
        <li>Mode: Daily 2-hour interactive online classes</li>
        <li>Fee: <strong>₹9,600/- only</strong></li>
        <li>Trainer: Hari.A (13+ years experience in Informatica, Snowflake, AWS, etc.)</li>
      </ul>

      <h2 className="text-2xl font-semibold text-primary mt-10 mb-4">📚 What You Will Learn</h2>
      <p className="mb-6">The content is structured week-by-week and tool-by-tool, with a focus on real-time examples, hands-on sessions, and scenario-based interview prep.</p>

      <h3 className="text-xl font-semibold text-blue-700 mb-3">🧠 Foundation (Days 1–5)</h3>
      <ul className="list-disc list-inside mb-6">
        <li>What is ETL? OLAP vs OLTP</li>
        <li>Data warehousing, data modeling, BI concepts</li>
        <li>Importance of SQL for ETL developers</li>
        <li>SQL languages, constraints, functions</li>
        <li>Architecture of PowerCenter & IICS</li>
      </ul>

      <h3 className="text-xl font-semibold text-blue-700 mb-3">🔧 Hands-On Tool Training (Days 6–30)</h3>
      <ul className="list-disc list-inside mb-6">
        <li>Installations of Oracle, PowerCenter, IICS, Snowflake</li>
        <li>Transformations: Filter, Joiner, Router, Rank, Aggregator, Lookup (Connected & Unconnected), etc.</li>
        <li>Dynamic mappings, macros, CDC (Change Data Capture)</li>
        <li>Reusable tasks, parameters, mapping logic comparisons in SQL, PC, IICS</li>
        <li>Task Flows, Workflow logic, complex mappings, real-time case studies</li>
        <li>Slowly Changing Dimensions: SCD1, SCD2, SCD3</li>
      </ul>

      <h3 className="text-xl font-semibold text-blue-700 mb-3">🎓 Certification, Mock Interviews & Projects (Days 31–45)</h3>
      <ul className="list-disc list-inside mb-6">
        <li>Resume building, Naukri profile setup</li>
        <li>Mock Interviews: 1st (Day 28), 2nd (Day 39)</li>
        <li>Project deployments & code migration</li>
        <li>Agile Methodology, Dev/Test/UAT/Prod environments</li>
        <li>Real-time banking/healthcare project walkthroughs</li>
      </ul>

      <h2 className="text-2xl font-semibold text-primary mt-10 mb-4">💡 Cloud Application Integration (CAI)</h2>
      <ul className="list-disc list-inside mb-6">
        <li>API & Web Service Overview: REST & SOAP</li>
        <li>Postman usage, process creation in CAI</li>
        <li>Service Connectors, Swagger/WSDL imports</li>
        <li>JDBC/JSON/XML integration with CDI</li>
        <li>API publishing, API Manager, Rate Limit Policies</li>
      </ul>

      <h2 className="text-2xl font-semibold text-primary mt-10 mb-4">⚙️ Bonus Features & Student Support</h2>
      <ul className="list-disc list-inside mb-6">
        <li>Daily Interview Q&A (108+ questions)</li>
        <li>Saturday quizzes + daily exercises</li>
        <li>Recorded videos & notes after every session</li>
        <li>Free software installation guides (IICS, PowerCenter, Snowflake, UNIX, etc.)</li>
        <li>Direct WhatsApp/phone access for doubt clearing</li>
        <li>2 months free job support after placement</li>
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
