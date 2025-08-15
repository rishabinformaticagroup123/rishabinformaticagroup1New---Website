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

// ✨ Full Q&A data from the ADF Top 50 PDF should be inserted here
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
  },
  {
    question: "📌 How to filter files dynamically while using Get Metadata and ForEach?",
    answer: `✅ Use Get Metadata to list files in a directory.
Add a Filter activity inside the ForEach loop.
Use expressions like @endswith(item().name, '.csv') to filter only relevant files.`,
    category: "Metadata / ForEach"
  },
  {
    question: "📌 How to handle NULL values during data flow transformation?",
    answer: `✅ Use the Expression Builder in data flows.
Apply the isNull() or iif() functions to handle nulls.
Example: iif(isNull(columnName), 'default', columnName).`,
    category: "Data Flows"
  },
  {
    question: "📌 What is the difference between binary copy and tabular copy in ADF?",
    answer: `✅ Binary copy moves files as-is, without parsing content.
Use it for images, PDFs, ZIPs.
Tabular copy reads and writes structured data (CSV, Parquet, etc.).`,
    category: "File Ingestion"
  },
  {
    question: "📌 How to execute stored procedures in ADF?",
    answer: `✅ Use the Stored Procedure Activity.
Create a linked service for the database.
Configure procedure name and parameters under the activity settings.`,
    category: "Activities"
  },
  {
    question: "📌 How to perform conditional branching in a pipeline?",
    answer: `✅ Use If Condition Activity.
Define the condition using expression language (e.g., @equals(pipeline().parameters.env, 'prod')).
Specify the activities to execute in True/False branches.`,
    category: "Control Flow"
  },
  {
    question: "📌 What is a tumbling window trigger?",
    answer: `✅ Tumbling window triggers run pipelines at regular, periodic intervals.
They maintain state and guarantee exactly-once processing.
Useful for hourly, daily scheduled processing.`,
    category: "Triggers"
  },
  {
  question: "📌 What is the use of parameters in ADF pipelines?",
    answer: `✅ Parameters allow you to pass dynamic values to pipelines, datasets, and linked services.
They help make your pipelines reusable and configurable.
Example: passing a filename, date, or folder path from the trigger or parent pipeline.`,
    category: "Control Flow"
  },
  {
    question: "📌 How do you secure credentials in ADF?",
    answer: `✅ Use Azure Key Vault to securely store and access secrets.
Create a linked service to the Key Vault and reference secrets using @Microsoft.KeyVault syntax.
Avoid hardcoding credentials directly in pipeline parameters.`,
    category: "Security"
  },
  {
    question: "📌 What is the difference between Get Metadata and Lookup activity?",
    answer: `✅ Get Metadata extracts metadata like file name, size, lastModified.
Lookup runs a query or fetches a single row from a table.
Use Get Metadata for file processing logic, Lookup for control table values.`,
    category: "Metadata / Lookup"
  },
  {
    question: "📌 How can you perform logging in ADF pipelines?",
    answer: `✅ Create a custom logging pipeline or activity that logs pipeline name, run ID, status, and timestamp.
Send logs to Azure SQL, Log Analytics, or blob storage.
Use variables, Web activity, or Stored Procedure for log insertion.`,
    category: "Monitoring"
  },
  {
    question: "📌 How to integrate ADF with Logic Apps or Azure Functions?",
    answer: `✅ Use Web Activity in ADF to call Logic Apps or Azure Function HTTP endpoints.
Pass headers and JSON payload as required.
Validate response using subsequent If Condition or Until activity.`,
    category: "Integration"
  },
  {
    question: "📌 What is Data Flow Debug mode?",
    answer: `✅ Enables real-time debugging and preview of transformation results.
Runs the data flow on a Spark cluster in debug mode for testing.
Useful to verify expression logic, output data, and transformations.`,
    category: "Data Flows"
  },
  {
    question: "📌 How to skip already processed files in ADF?",
    answer: `✅ Maintain a control table or log with processed filenames.
Use Lookup activity + If Condition to check if the file exists in logs before processing.
Alternatively, move processed files to archive folders.`,
    category: "File Ingestion"
  },
  {
    question: "📌 How to connect ADF to REST API?",
    answer: `✅ Use REST linked service and REST dataset.
Configure relative URL, authentication (e.g., bearer token), and pagination rules.
Use Copy Activity or Web Activity depending on use case.`,
    category: "Web / API"
  },
  {
    question: "📌 What is the use of variables in ADF?",
    answer: `✅ Variables allow temporary storage and manipulation of values during pipeline execution.
Can be set using Set Variable activity and changed via Append Variable.
Useful in loops, filters, and branching logic.`,
    category: "Control Flow"
  },
  {
    question: "📌 How do you implement SCD Type 1 and Type 2 in ADF?",
    answer: `✅ Use Data Flows with Surrogate Key, Conditional Split, and Sink with upsert logic.
SCD Type 1: Overwrite changed records.
SCD Type 2: Add new rows with current flag, effective date columns.`,
    category: "Data Flows"
  },
  {
    question: "📌 What is the difference between pipeline parameters and variables in ADF?",
    answer: `✅ Parameters are passed at the start of a pipeline and cannot change during execution.
Variables can change within the pipeline and are useful for loops and conditional logic.`,
    category: "Control Flow"
  },
   {
    question: "📌 How can you optimize performance in ADF Data Flows?",
    answer: `✅ Use partitioning, caching, and selective transformations.
Avoid unnecessary columns, filter early, and monitor debug runs.
Use data flow monitoring to find bottlenecks.`,
    category: "Performance"
  },
  {
  question: "📌 What are integration runtimes in ADF?",
    answer: `✅ Integration Runtime (IR) is the compute infrastructure used by ADF.
Types include Azure IR, Self-hosted IR, and SSIS IR.
Azure IR is managed by Microsoft, SHIR runs on-premises.`,
    category: "Integration Runtime"
  },
  {
    question: "📌 Can you copy data from SAP or Oracle using ADF?",
    answer: `✅ Yes, use native connectors or OData/ODBC connectors.
You may need to install and configure IR for on-prem systems.
ADF supports Oracle, SAP BW, SAP HANA, SAP ECC, and others.`,
    category: "Connectors"
  },
  {
    question: "📌 What is the difference between trigger and manual execution in ADF?",
    answer: `✅ Trigger-based pipelines run on schedule or event.
Manual execution runs on demand from the UI or API.
Use triggers for automation, manual runs for testing.`,
    category: "Triggers"
  },
  {
    question: "📌 What are integration runtimes in ADF?",
    answer: `✅ Integration Runtime (IR) is the compute infrastructure used by ADF.
Types include Azure IR, Self-hosted IR, and SSIS IR.
Azure IR is managed by Microsoft, SHIR runs on-premises.`,
    category: "Integration Runtime"
  },
  {
    question: "📌 Can you copy data from SAP or Oracle using ADF?",
    answer: `✅ Yes, use native connectors or OData/ODBC connectors.
You may need to install and configure IR for on-prem systems.
ADF supports Oracle, SAP BW, SAP HANA, SAP ECC, and others.`,
    category: "Connectors"
  },
  {
    question: "📌 What is the difference between trigger and manual execution in ADF?",
    answer: `✅ Trigger-based pipelines run on schedule or event.
Manual execution runs on demand from the UI or API.
Use triggers for automation, manual runs for testing.`,
    category: "Triggers"
  },
  {
    question: "📌 How to call another pipeline in ADF?",
    answer: `✅ Use Execute Pipeline Activity.
Allows nesting or chaining of pipelines for modular workflows.
Pass parameters to the child pipeline during execution.`,
    category: "Control Flow"
  },
  {
    question: "📌 What is the use of Until activity in ADF?",
    answer: `✅ Repeats a set of activities until a condition evaluates to true.
Useful for polling, retrying failed steps, or looping with a counter.`,
    category: "Control Flow"
  },
  {
    question: "📌 How can you version control ADF pipelines?",
    answer: `✅ Use Git integration in ADF UI.
Connect to Azure Repos or GitHub.
Allows branching, pull requests, and collaboration.`,
    category: "DevOps"
  },
  {
    question: "📌 What happens when a pipeline fails?",
    answer: `✅ Pipeline execution stops unless you handle errors using Try-Catch pattern.
Use If Condition, Success/Failure dependencies, and Alert mechanisms to handle failures gracefully.`,
    category: "Error Handling"
  },
  {
    question: "📌 How to send alerts or notifications from ADF?",
    answer: `✅ Use Web Activity to call Logic Apps or external services.
Logic App can be configured to send email, Teams message, or SMS.
Include pipeline name, run ID, and error message.`,
    category: "Monitoring"
  },
  {
    question: "📌 Can ADF support delta loads in Synapse or SQL?",
    answer: `✅ Yes, use watermarking, modified date columns, or CDC tables.
Combine Lookup, Variables, and dynamic query logic.
Apply upsert or merge logic using stored procedures or data flows.`,
    category: "Incremental Load"
  },
  {
    question: "📌 How to pass parameters to SQL query in source dataset?",
    answer: `✅ Use dynamic content in the query property.
Reference pipeline parameters or variables using @pipeline().parameters or @variables().`,
    category: "Source & Sink"
  },
  {
    question: "📌 What is the difference between Append Variable and Set Variable?",
    answer: `✅ Set Variable replaces the existing value.
Append Variable adds a new item to an array variable.
Useful in loops to collect values.`,
    category: "Control Flow"
  },
  {
    question: "📌 What is the use of Retry policy in activities?",
    answer: `✅ Retry policy helps recover from transient errors.
You can set retry count and interval between retries.
Default is 0 retries.`,
    category: "Error Handling"
  },
  {
    question: "📌 What is the difference between Lookup and Stored Procedure activity?",
    answer: `✅ Lookup fetches single/multiple rows from a query.
Stored Procedure executes a stored proc.
Use Lookup for reading control values, SP for inserts/updates.`,
    category: "Activities"
  },
  {
    question: "📌 Can you debug pipeline failures?",
    answer: `✅ Yes. Use output and error tabs in monitor section.
Enable verbose logging or integrate with Log Analytics.
Add debug messages using Set Variable or Web Activity.`,
    category: "Monitoring"
  },
  {
    question: "📌 Can you read/write to blob storage from ADF?",
    answer: `✅ Yes. Create Azure Blob Storage linked service and dataset.
Configure container, folder path, file format, and authentication.
Use Copy Activity or Data Flow.`,
    category: "Storage"
  },
  {
    question: "📌 Can ADF call REST APIs with authentication?",
    answer: `✅ Yes. Set authentication type in REST linked service (Anonymous, Basic, OAuth2).
Use headers and bearer token if needed.
Web Activity is preferred for POST methods.`,
    category: "Web / API"
  },
  {
    question: "📌 How to schedule a pipeline every 15 minutes?",
    answer: `✅ Use Tumbling Window Trigger or Schedule Trigger with 15-minute frequency.
Specify start/end time, recurrence interval, and concurrency control.`,
    category: "Triggers"
  },
  {
    question: "📌 How to merge two datasets in ADF?",
    answer: `✅ Use Join transformation in Mapping Data Flows.
Supports Inner, Left, Right, Full joins.
Define join conditions and projections.`,
    category: "Data Flows"
  },
  {
    question: "📌 How to archive files after copy?",
    answer: `✅ Use Copy Activity followed by Move or Delete Activity.
Alternatively, use Data Flow with Source → Sink → Move/Archive logic.`,
    category: "File Ingestion"
  },
  {
    question: "📌 What is Auto Resolve Integration Runtime?",
    answer: `✅ Default Azure IR that automatically provisions compute in same region as source/sink.
No manual configuration needed.
Best for simple data movement tasks.`,
    category: "Integration Runtime"
  },
  {
    question: "📌 What is the use of Data Preview in Data Flows?",
    answer: `✅ Allows preview of transformation results while designing.
Helps validate logic, schema, and filter conditions.
Runs on debug Spark cluster.`,
    category: "Data Flows"
  },
  {
   question: "📌 How to handle large datasets efficiently in ADF?",
    answer: `✅ Use partitioning, parallelism, and staging.
Avoid wide tables and unnecessary columns.
Leverage polybase or copy with staging for high volume transfers.`,
    category: "Performance"
  },
  {
    question: "📌 What are system variables in ADF?",
    answer: `✅ Predefined variables like pipeline().RunId, trigger().name.
Useful for logging, alerts, and dynamic paths.
Access them using @expression syntax.`,
    category: "Control Flow"
  },
  {
    question: "📌 Can ADF integrate with DevOps CI/CD?",
    answer: `✅ Yes. Use Git integration + Azure DevOps pipelines.
Export ARM templates or use Publish to deploy.
Support for release automation and approvals.`,
    category: "DevOps"
  },
  {
    question: "📌 Can ADF process Excel files?",
    answer: `✅ Yes, using Azure Function or custom code with Web Activity.
ADF doesn’t support Excel natively.
Convert Excel to CSV using Azure Functions or Logic App.`,
    category: "Connectors"
  }
  
  // ... Continue with Q11 to Q50
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
