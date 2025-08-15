import { Metadata } from "next";
import { BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Top 50 Azure Data Factory (ADF) Interview Questions",
  description:
    "Scenario-based ADF Interview Questions with answers – Read online or download PDF. Prepared by Rishab Informatica Group.",
};

export default function ADFInterviewPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2">
        📘 Top 50 ADF Interview Questions & Answers
      </h1>
      <p className="text-gray-700 mb-6">
        Handpicked, scenario-based questions curated by <strong>Rishab Informatica Group</strong> trainers. Ideal for job preparation and real-time project understanding.
      </p>

      {/* 🔗 Download Button */}
      <a
        href="/pdfs/adf-top-50.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded mb-8 hover:bg-blue-700"
      >
        📅 Download PDF
      </a>

      {/* 📄 HTML Q&A Content */}
      <div className="bg-white border rounded-lg p-6 mb-12">
        <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
          <BookOpen className="text-blue-500" /> Read Q&A in Page
        </h2>
        <ol className="space-y-6 list-decimal list-inside text-gray-800">
          <li>
            <strong>Copy Data from On-premises SQL Server to Azure SQL Database:</strong>
            <p>
              Set up a Self-hosted Integration Runtime (SHIR) to connect to the on-premises SQL Server. Create linked services for both the on-prem SQL Server and the Azure SQL Database, then define source and sink datasets. Finally, add a Copy Activity in your pipeline to transfer data.
            </p>
          </li>
          <li>
            <strong>Handling Multiple File Formats (CSV, JSON, Parquet):</strong>
            <p>
              Create parameterized datasets for each file format, configure a Switch activity to handle specific format types, and use mapping data flows to apply necessary transformations for each format before loading them into the target.
            </p>
          </li>
          <li>
            <strong>Intermittent Timeout Errors in Pipeline:</strong>
            <p>
              Increase timeout settings in your activities, set a retry policy in Copy Activity, and ensure your integration runtime has sufficient resources. Additionally, check for any network stability issues between the source and ADF to reduce timeouts.
            </p>
          </li>
          <li>
            <strong>Implement Incremental Data Loading:</strong>
            <p>
              Use a watermark column (like a timestamp) to track changes. Implement a Lookup activity to capture the last watermark value, then use it in the query of the source dataset to load only new or modified data. Save the updated watermark for the next run.
            </p>
          </li>
          {/* Continue listing all 50 questions here with full answers... */}
        </ol>
      </div>

      {/* 📄 PDF Embedded */}
      <div className="border rounded-lg overflow-hidden">
        <h2 className="text-xl font-semibold mb-4">📄 Preview the PDF</h2>
        <iframe
          src="/pdfs/adf-top-50.pdf"
          width="100%"
          height="900px"
          style={{ border: "1px solid #ccc" }}
        ></iframe>
      </div>
    </div>
  );
}
