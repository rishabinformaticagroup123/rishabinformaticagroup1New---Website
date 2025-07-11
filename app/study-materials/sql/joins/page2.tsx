import React from "react";
import Image from "next/image";
import { CodeBlock } from "@/components/ui/codeblock";

const joinsImage = "/images/sql-joins-diagram.png";

const SQLJoinsPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero Header */}
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">SQL Joins Masterclass</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Learn how to combine data from multiple tables with practical examples
        </p>
      </header>

      {/* What are Joins Section */}
      <section className="mb-12 bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
            <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
            What is Join? Why Use Joins?
          </h2>
          <div className="space-y-4 text-gray-700">
            <p>
              Joins combine rows from two or more tables based on related columns. In production databases, 
              data is split across normalized tables to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Eliminate duplicate data (normalization)</li>
              <li>Improve storage efficiency</li>
              <li>Maintain data integrity</li>
            </ul>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <p className="font-medium">Common Relationships:</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                <div className="bg-white p-3 rounded shadow-sm">
                  <p className="font-semibold">Students</p>
                  <p className="text-sm">↳ Coordinators, Address, Countries</p>
                </div>
                <div className="bg-white p-3 rounded shadow-sm">
                  <p className="font-semibold">Employees</p>
                  <p className="text-sm">↳ Departments, Locations, Countries</p>
                </div>
                <div className="bg-white p-3 rounded shadow-sm">
                  <p className="font-semibold">Customers</p>
                  <p className="text-sm">↳ Verticals, Products, Models</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Join Types Visual */}
      <section className="mb-12">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
              <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
              Types of Joins
            </h2>
          </div>
          <div className="p-6">
            <div className="flex justify-center mb-6">
              <Image 
                src={joinsImage} 
                alt="SQL Joins Diagram" 
                width={700} 
                height={400}
                className="rounded-lg border border-gray-200"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: "INNER JOIN", desc: "Only matching records from both tables", color: "bg-purple-100 text-purple-800" },
                { name: "LEFT JOIN", desc: "All from left table + matches from right", color: "bg-blue-100 text-blue-800" },
                { name: "RIGHT JOIN", desc: "All from right table + matches from left", color: "bg-amber-100 text-amber-800" },
                { name: "FULL JOIN", desc: "All records from both tables", color: "bg-green-100 text-green-800" }
              ].map((join, idx) => (
                <div key={idx} className={`p-4 rounded-lg ${join.color}`}>
                  <h3 className="font-bold">{join.name}</h3>
                  <p className="text-sm mt-1">{join.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="mb-12">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
              <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
              SQL vs Informatica Joins
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SQL Join</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Informatica Join</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  ["INNER JOIN", "NORMAL JOIN"],
                  ["LEFT OUTER JOIN", "MASTER OUTER JOIN"],
                  ["RIGHT OUTER JOIN", "DETAIL OUTER JOIN"],
                  ["FULL OUTER JOIN", "FULL OUTER JOIN"]
                ].map(([sql, informatica], idx) => (
                  <tr key={idx}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{sql}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{informatica}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Examples Section */}
      <section className="mb-12">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
              <span className="w-3 h-3 bg-indigo-500 rounded-full mr-2"></span>
              Practical Join Examples
            </h2>
          </div>
          
          <div className="p-6 space-y-8">
            {/* Example 1 */}
            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 flex items-center">
                <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Implicit INNER JOIN
              </h3>
              <CodeBlock code={`SELECT 
    S.STUDENT_ID, 
    S.FIRST_NAME, 
    S.EMAIL, 
    S.STIPEND, 
    C.COORDINATOR_NAME, 
    C.LOCATION_ID 
FROM 
    STUDENTS S, 
    COORDINATORS C 
WHERE 
    S.COORDINATOR_ID = C.COORDINATOR_ID;`} />
              <p className="mt-2 text-sm text-gray-600">Returns only students with assigned coordinators</p>
            </div>

            {/* Example 2 */}
            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 flex items-center">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                ANSI LEFT JOIN
              </h3>
              <CodeBlock code={`SELECT 
    S.STUDENT_ID, 
    S.FIRST_NAME, 
    S.STIPEND, 
    C.COORDINATOR_NAME, 
    C.LOCATION_ID 
FROM 
    STUDENTS S 
LEFT JOIN 
    COORDINATORS C 
ON 
    S.COORDINATOR_ID = C.COORDINATOR_ID;`} />
              <p className="mt-2 text-sm text-gray-600">Returns all students (even without coordinators)</p>
            </div>

            {/* More examples... */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">3-Table Join</h3>
                <CodeBlock code={`SELECT 
    S.STUDENT_ID, 
    S.FIRST_NAME, 
    C.COORDINATOR_NAME, 
    A.COUNTRY_ID 
FROM 
    STUDENTS S, 
    COORDINATORS C, 
    ADDRESS A 
WHERE 
    S.COORDINATOR_ID = C.COORDINATOR_ID 
    AND C.LOCATION_ID = A.LOCATION_ID;`} />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Join with Filter</h3>
                <CodeBlock code={`SELECT 
    S.STUDENT_ID, 
    S.FIRST_NAME, 
    C.COORDINATOR_NAME, 
    A.COUNTRY_ID 
FROM 
    STUDENTS S 
JOIN COORDINATORS C ON S.COORDINATOR_ID = C.COORDINATOR_ID 
JOIN ADDRESS A ON C.LOCATION_ID = A.LOCATION_ID 
WHERE 
    A.COUNTRY_ID = 'UK';`} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Summary Card */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-3">Key Takeaways</h3>
        <ul className="space-y-2 text-blue-700">
          <li className="flex items-start">
            <span className="mr-2">✓</span>
            <span>Use INNER JOIN for matching records only</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">✓</span>
            <span>LEFT/RIGHT JOIN preserves one side's unmatched records</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">✓</span>
            <span>ANSI syntax (JOIN...ON) is more readable than implicit joins</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SQLJoinsPage;