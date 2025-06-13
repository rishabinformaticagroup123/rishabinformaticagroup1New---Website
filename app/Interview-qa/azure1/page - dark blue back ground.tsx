"use client";

import { useState } from "react";
import { BookOpen } from "lucide-react";

const categories = [
  "File Ingestion",
  "Incremental Load",
  "Error Handling",
  "Data Flows",
  "Triggers",
  "Security",
  "Performance"
];

const qaData = [
  {
    question: "📌 How to copy data from On-premises SQL Server to Azure SQL Database?",
    answer: `✅ Set up a Self-hosted Integration Runtime (SHIR) to connect to the on-premises SQL Server.
Create linked services for both the on-prem SQL Server and Azure SQL Database. 
Define source and sink datasets. Add a Copy Activity in your pipeline to transfer data.`,
    category: "File Ingestion"
  },
  {
    question: "📌 How to handle multiple file formats like CSV, JSON, and Parquet in ADF?",
    answer: `✅ Create parameterized datasets for each file format.
Use a Switch activity to handle logic per format type.
Use mapping data flows to apply transformations for each format before loading.`,
    category: "File Ingestion"
  },
  {
    question: "📌 What causes intermittent timeout errors in ADF pipelines and how to handle them?",
    answer: `✅ Increase timeout settings in activities.
Use a retry policy in Copy Activity.
Ensure your Integration Runtime (IR) has enough resources.
Check for network or firewall interruptions.`,
    category: "Error Handling"
  },
  {
    question: "📌 How to implement incremental data loading in ADF?",
    answer: `✅ Use a watermark column (e.g., last_updated_date).
Create a Lookup activity to get the last value.
Use this value in the source query to fetch only new/changed records.
Update watermark after successful load.`,
    category: "Incremental Load"
  }
  // Add more Q&A items here...
];

export default function ADFInterviewPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredData = qaData.filter((item) => {
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    const matchesSearch =
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const firstFour = filteredData.slice(0, 4);
  const remaining = filteredData.slice(4);

  return (
    <div className="bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 min-h-screen text-white">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="text-4xl font-extrabold text-center bg-gradient-to-r from-orange-500 via-pink-600 to-purple-600 bg-clip-text text-transparent mb-4">
          🎯 Top 50 ADF Interview Questions & Answers
        </h1>
        <p className="text-center text-gray-300 mb-8">
          Scenario-based, real-time Azure Data Factory Interview Q&A compiled by expert trainers at <strong>Rishab Informatica Group</strong>.
        </p>

        <div className="text-center mb-10">
          <a
            href="/pdfs/adf-top-50.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-6 py-3 rounded shadow hover:opacity-90"
          >
            📥 Download PDF Version
          </a>
        </div>

        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="🔍 Search by keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-xl px-4 py-2 border rounded-md shadow-sm text-black"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-1 rounded-full text-sm font-medium border ${
              selectedCategory === null ? "bg-blue-600 text-white" : "bg-white text-gray-800"
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1 rounded-full text-sm font-medium border ${
                selectedCategory === cat ? "bg-blue-600 text-white" : "bg-white text-gray-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {filteredData.length === 0 ? (
          <p className="text-center text-red-400 text-lg font-semibold mb-20">❌ No results found. Try a different keyword or category.</p>
        ) : (
          <>
            <div className="bg-white text-black border rounded-lg p-6 mb-12 shadow-sm">
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-blue-600">
                <BookOpen className="w-6 h-6" /> Read Online – First Few Questions
              </h2>
              <ol className="space-y-6 list-decimal list-inside">
                {firstFour.map((qa, index) => (
                  <li key={index} className="mb-4">
                    <p className="font-semibold text-lg">{qa.question}</p>
                    <pre className="whitespace-pre-wrap mt-1 text-gray-800">{qa.answer}</pre>
                    <p className="text-sm text-blue-500 mt-1">📂 Category: {qa.category}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="border rounded-lg overflow-hidden mb-12 shadow">
              <h2 className="text-xl font-semibold mb-4 text-white">📄 Prefer the full visual version?</h2>
              <iframe
                src="/pdfs/adf-top-50.pdf"
                width="100%"
                height="900px"
                style={{ border: "1px solid #ccc" }}
              ></iframe>
            </div>

            <div className="bg-white text-black border rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-6 text-purple-600">🧠 Continue Reading</h2>
              <ol start={5} className="space-y-6 list-decimal list-inside">
                {remaining.map((qa, index) => (
                  <li key={index} className="mb-4">
                    <p className="font-semibold text-lg">{qa.question}</p>
                    <pre className="whitespace-pre-wrap mt-1 text-gray-800">{qa.answer}</pre>
                    <p className="text-sm text-purple-500 mt-1">📂 Category: {qa.category}</p>
                  </li>
                ))}
              </ol>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
