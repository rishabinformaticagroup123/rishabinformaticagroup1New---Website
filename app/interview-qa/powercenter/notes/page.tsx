'use client'

import { useState } from 'react'

export default function InformaticaNotesPage() {
  const sections = [
    {
      title: 'Active vs Passive Transformations',
      content: (
        <>
          <p>
            In Informatica, transformations are categorized based on whether they change the number of records passing through them:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Active Transformation:</strong> Changes the number of rows that pass through. For example, a <em>Filter</em> transformation removes records that do not meet a condition. Other examples include <em>Joiner, Aggregator, Router, Rank</em>. Active transformations can affect performance and need careful handling for large data sets.
            </li>
            <li>
              <strong>Passive Transformation:</strong> Does not change the number of rows. For example, <em>Expression</em> transformation only computes new columns but passes all rows. Other examples include <em>Sequence Generator</em> and <em>Normalizer</em>.
            </li>
          </ul>
          <p className="mt-2">
            <strong>Connected vs Unconnected:</strong> 
          </p>
          <ul className="list-disc pl-5">
            <li>Connected: Transformation is part of the mapping pipeline, connected directly to other transformations.</li>
            <li>Unconnected: Transformation is called via an expression or another transformation, not directly part of the pipeline.</li>
          </ul>
        </>
      ),
    },
    {
      title: 'Source Qualifier Transformation (Active, Connected)',
      content: (
        <>
          <p>
            The Source Qualifier (SQ) is used to represent the source data in the mapping pipeline. It converts the source datatype into Informatica native datatype for processing.
          </p>
          <p className="mt-2"><strong>Key Features & Properties:</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>SQL Override:</strong> Allows custom SQL to filter or restrict data directly from the source. Example: 
              <code className="bg-gray-200 px-1 rounded">SELECT * FROM EMPLOYEES WHERE SALARY &gt; 50000</code>
            </li>
            <li>
              <strong>User Defined Join:</strong> Supports Homogeneous joins when tables are from the same database.
            </li>
            <li>
              <strong>Source Filter:</strong> Filters records at source level. Example: <code>SALARY IS NOT NULL</code>
            </li>
            <li>
              <strong>Select Distinct:</strong> Removes duplicate rows fetched from source.
            </li>
            <li>
              <strong>Pre-SQL/Post-SQL:</strong> Execute SQL before or after fetching data (e.g., index creation or deletion, collecting statistics).
            </li>
            <li>
              <strong>Tracing Level:</strong> Amount of information captured in session logs.
            </li>
            <li>
              <strong>Flat File Sources:</strong> Most properties are disabled; only basic configurations apply.
            </li>
          </ul>
          <p className="mt-2">
            <strong>Best Practices:</strong> Always try to filter data at the source using SQL Override or Source Filter to reduce the volume of data entering Informatica pipeline.
          </p>
        </>
      ),
    },
    {
      title: 'Filter Transformation (Active, Connected)',
      content: (
        <>
          <p>
            The Filter Transformation is used to remove unwanted rows from the pipeline based on specified conditions. It is one of the most commonly used active transformations.
          </p>
          <p className="mt-2"><strong>Properties:</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Condition TRUE → All rows pass (default).</li>
            <li>Condition FALSE → All rows are blocked.</li>
            <li>Condition expression defines which rows are passed.</li>
          </ul>
          <p className="mt-2"><strong>Example:</strong></p>
          <pre className="bg-gray-900 text-white p-3 rounded-md overflow-x-auto text-sm">
{`-- Load only Indian employees with salary > 50000
COUNTRY='INDIA' AND SALARY > 50000

-- Case-insensitive filter
LOWER(COUNTRY)='india' AND SALARY > 50000`}
          </pre>
          <p className="mt-2">
            Use <code>IN</code>, <code>LIKE</code>, and functions like <code>LOWER()</code> for advanced filtering. Combine with Source Qualifier filter for optimal performance.
          </p>
        </>
      ),
    },
    {
      title: 'Expression Transformation (Passive, Connected)',
      content: (
        <>
          <p>
            Expression Transformation is used for calculations, data manipulation, string operations, and business logic. It is passive as it does not change the number of rows.
          </p>
          <p className="mt-2"><strong>Execution Order:</strong></p>
          <ol className="list-decimal pl-5">
            <li>Input Ports – receive data from previous transformation.</li>
            <li>Variable Ports – used for intermediate calculations.</li>
            <li>Output Ports – final values sent to next transformation.</li>
          </ol>
          <p className="mt-2"><strong>Examples:</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Salary Increment: <code className="bg-gray-200 px-1 rounded">
                IIF(SALARY &lt;= 5000, SALARY*1.3, IIF(SALARY &lt;= 10000, SALARY*1.2, SALARY*1.1))
              </code>
            </li>
            <li>
              Email based on salary: <code className="bg-gray-200 px-1 rounded">
                IIF(SALARY&gt;10000, EMAIL||'@GMAIL.COM', EMAIL||'@YAHOO.COM')
              </code>
            </li>
          </ul>
          <p className="mt-2">
            <strong>Tips:</strong> Use nested IIFs carefully. Variables help break complex logic into manageable steps.
          </p>
        </>
      ),
    },
    {
      title: 'Sorter Transformation (Active, Connected)',
      content: (
        <>
          <p>
            Sorter Transformation sorts data in ascending or descending order, similar to SQL <code>ORDER BY</code>.
          </p>
          <p className="mt-2"><strong>Key Features:</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Sort key columns in ASC or DESC.</li>
            <li>Option to remove duplicates using Distinct.</li>
            <li>Case sensitive or insensitive sorting.</li>
            <li>Nulls can be treated as low or high values.</li>
          </ul>
          <p className="mt-2"><strong>Example:</strong></p>
          <pre className="bg-gray-900 text-white p-3 rounded-md overflow-x-auto text-sm">
{`-- Sort by salary descending, then hire date ascending
SALARY DESC, HIRE_DATE ASC`}
          </pre>
        </>
      ),
    },
    {
      title: 'Aggregator Transformation (Active, Connected)',
      content: (
        <>
          <p>
            Aggregator Transformation performs aggregate functions such as SUM, AVG, MIN, MAX, COUNT. It can also group data by specified columns.
          </p>
          <p className="mt-2"><strong>Example:</strong></p>
          <pre className="bg-gray-900 text-white p-3 rounded-md overflow-x-auto text-sm">
{`-- Total and Average Salary by Department
SELECT DEPARTMENT_ID, SUM(SALARY) AS TOTAL, AVG(SALARY) AS AVERAGE
FROM EMPLOYEES
GROUP BY DEPARTMENT_ID`}
          </pre>
          <p className="mt-2"><strong>Performance Tips:</strong></p>
          <ul className="list-disc pl-5">
            <li>Enable Sorted Input if data is already sorted by group by columns.</li>
            <li>Use Incremental Aggregation for large data sets to improve performance.</li>
          </ul>
        </>
      ),
    },
    {
      title: 'Router Transformation (Active, Connected)',
      content: (
        <>
          <p>
            Router Transformation splits data into multiple pipelines based on conditions. It is similar to multiple Filter Transformations but more efficient.
          </p>
          <p className="mt-2"><strong>Key Points:</strong></p>
          <ul className="list-disc pl-5">
            <li>Supports multiple filter conditions.</li>
            <li>Default group collects all records not satisfying any condition.</li>
            <li>Opposite of Union transformation.</li>
          </ul>
        </>
      ),
    },
    {
      title: 'Rank Transformation (Active, Connected)',
      content: (
        <>
          <p>
            Rank Transformation returns top/bottom N records based on a column. Useful for top performers, top sales, etc.
          </p>
          <p className="mt-2"><strong>Properties:</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Top or Bottom rank selection.</li>
            <li>Number of ranks to return.</li>
            <li>Case-sensitive or case-insensitive ranking.</li>
          </ul>
          <p>Note: Dense rank is not supported directly. Use Expression Transformation to implement dense ranking logic.</p>
        </>
      ),
    },
    {
      title: 'Sequence Generator (Passive, Connected)',
      content: (
        <>
          <p>
            Sequence Generator produces unique numeric values. It is commonly used for surrogate keys in dimension tables.
          </p>
          <p className="mt-2"><strong>Properties:</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Start Value, Increment By, End Value</li>
            <li>Cycle or Reset options</li>
            <li>Number of cached values for performance</li>
          </ul>
        </>
      ),
    },
    {
      title: 'Union Transformation (Active, Connected)',
      content: (
        <>
          <p>
            Union Transformation combines data from multiple pipelines into one. Works like SQL UNION ALL (duplicates not removed).
          </p>
          <p>Opposite of Router Transformation. Multiple input pipelines → Single output pipeline.</p>
        </>
      ),
    },
    {
      title: 'Lookup Transformation',
      content: (
        <>
          <p>
            Lookup Transformation retrieves data from a table, flat file, or other source. Can be connected or unconnected.
          </p>
          <p className="mt-2"><strong>Connected Lookup:</strong> In pipeline, multiple return ports allowed.</p>
          <p><strong>Unconnected Lookup:</strong> Called via expression; returns a single value.</p>
          <p><strong>Properties & Best Practices:</strong></p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Always a left outer join.</li>
            <li>Handle multiple matches using policies: Any value, First, Last, Report Error.</li>
            <li>Reusability: Use unconnected lookup for repeated conditional checks.</li>
          </ul>
        </>
      ),
    },
    {
      title: 'Update Strategy Transformation (Active, Connected)',
      content: (
        <>
          <p>
            Update Strategy determines row-level operations for target: Insert, Update, Delete, or Reject. Used in implementing SCD Type 1.
          </p>
          <p><strong>Codes:</strong> 0 = Insert, 1 = Update, 2 = Delete, 3 = Reject</p>
        </>
      ),
    },
    {
      title: 'Normalizer Transformation (Active, Connected)',
      content: (
        <>
          <p>
            Normalizer converts columns to rows (unpivot) or rows to columns (pivot). Often used for COBOL or VSAM sources.
          </p>
          <p><strong>Default Ports:</strong> GK (Generated Key), GC (Generated Column Value)</p>
        </>
      ),
    },
    {
      title: 'Transaction Control Transformation (Active, Connected)',
      content: (
        <>
          <p>
            Transaction Control manages commit and rollback operations within a mapping. Useful for dynamic target files and conditional commits.
          </p>
          <ul className="list-disc pl-5">
            <li>TC_COMMIT_BEFORE / TC_COMMIT_AFTER</li>
            <li>TC_ROLLBACK_BEFORE / TC_ROLLBACK_AFTER</li>
            <li>TC_CONTINUE_TRANSACTION (Default)</li>
          </ul>
        </>
      ),
    },
    {
      title: 'Other Transformations',
      content: (
        <>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>SQL Transformation:</strong> Executes SQL statements inside mappings.</li>
            <li><strong>Stored Procedure Transformation:</strong> Executes pre/post SQL or procedure calls.</li>
            <li><strong>Java Transformation:</strong> Runs custom Java code for advanced business logic.</li>
            <li><strong>XML Transformation:</strong> Handles XML data processing and parsing.</li>
          </ul>
        </>
      ),
    },
    {
      title: 'Slowly Changing Dimensions (SCD) & Keys',
      content: (
        <>
          <p>
            SCD is used in dimension tables to manage historical changes.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Type 1:</strong> No history, overwrite old data.</li>
            <li><strong>Type 2:</strong> Full row-level history maintained. Methods: Flag, Version, Date.</li>
            <li><strong>Type 3:</strong> Column-level history maintained (recent changes).</li>
            <li><strong>Primary Key:</strong> Unique, non-null, identifies records in OLTP tables.</li>
            <li><strong>Surrogate Key:</strong> System-generated unique key for OLAP dimension tables. Preserves historical information.</li>
          </ul>
        </>
      ),
    },
  ]

  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-4">
      <h1 className="text-4xl font-bold text-center text-indigo-600 mb-6">
        Rishab Informatica Group - IICS Combo Notes
      </h1>
      {sections.map((section, index) => (
        <div key={index} className="border border-gray-300 rounded-md">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full text-left px-4 py-3 bg-indigo-100 hover:bg-indigo-200 font-semibold"
          >
            {section.title}
          </button>
          {openIndex === index && (
            <div className="p-4 bg-gray-50 text-gray-800 prose prose-sm">
              {section.content}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}