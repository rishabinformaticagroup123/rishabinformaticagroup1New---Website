// app/study-materials/sql/joins/page.tsx
"use client";

import React from "react";
import { CodeBlock } from "@/components/ui/codeblock";

const SQLJoinsPage = () => {
  // Sample data for demonstration
  const studentsData = [
    { id: 100, name: "Suresh", email: "sking", stipend: 9000, specialization: "IICSCOMBO", coordinator: "John Smith" },
    { id: 101, name: "Hemanth", email: "nkochhar", stipend: 17000, specialization: "IICSCOMBO", coordinator: "Jane Doe" },
    { id: 102, name: "Abhi", email: "ldehaan", stipend: 17000, specialization: "POWERCENTER", coordinator: null },
  ];

  const createTableSQL = `CREATE TABLE STUDENTS (
  STUDENT_ID NUMBER(6),
  FIRST_NAME VARCHAR2(20),
  LAST_NAME VARCHAR2(25),
  EMAIL VARCHAR2(25),
  PHONE_NUMBER VARCHAR2(20),
  JOINING_DATE DATE,
  SPECIALIZATION VARCHAR2(20),
  STIPEND NUMBER(10,2),
  BONUS NUMBER(10,2),
  MANAGER_ID NUMBER(6),
  COORDINATOR_ID NUMBER(10)
);`;

  const downloadCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," +
      "STUDENT_ID,FIRST_NAME,LAST_NAME,EMAIL,PHONE_NUMBER,JOINING_DATE,SPECIALIZATION,STIPEND,BONUS,MANAGER_ID,COORDINATOR_ID\n" +
      "100,Suresh,Kumar,sking,515.123.4567,17-JUN-03,IICSCOMBO,9000,,,90\n" +
      "101,Hemanth,Kumar,nkochhar,515.123.4568,21-SEP-05,IICSCOMBO,17000,,,90\n" +
      "102,Abhi,Maryu,ldehaan,515.123.4569,13-JAN-01,POWERCENTER,17000,,,90";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "students_sample.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Setup Section */}
      <section className="mb-12 bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-blue-50">
          <h2 className="text-2xl font-semibold text-blue-800">
            Step 1: Setup Student Database
          </h2>
          <p className="text-blue-600 mt-1">Create and populate the STUDENTS table</p>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium mb-3 text-gray-800 flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Create Table Structure
            </h3>
            <CodeBlock code={createTableSQL} />
            <p className="mt-2 text-sm text-gray-600">
              Execute this SQL in Oracle SQL Developer to create the table structure
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium mb-3 text-gray-800 flex items-center">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Import Sample Data
            </h3>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-2">Download sample CSV file:</p>
                <button 
                  onClick={downloadCSV}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition flex items-center gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                  Download students_sample.csv
                </button>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-2">Import steps in SQL Developer:</p>
                <ol className="list-decimal pl-5 text-sm space-y-1">
                  <li>Right-click your connection → <strong>Import Data</strong></li>
                  <li>Select the downloaded CSV file</li>
                  <li>Choose <strong>"Insert"</strong> as import method</li>
                  <li>Map columns correctly</li>
                  <li>Click <strong>Next → Next → Finish</strong></li>
                </ol>
              </div>
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <div className="bg-gray-100 px-4 py-2 border-b">
              <h4 className="font-medium">Sample Data Preview</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Stipend</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Specialization</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Coordinator</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {studentsData.map((student) => (
                    <tr key={student.id}>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">{student.id}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">{student.name}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">{student.email}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">${student.stipend}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">{student.specialization}</td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm">
                        {student.coordinator || <span className="text-gray-400">NULL</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Joins Explanation Section */}
      <section className="mb-12 bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-green-50">
          <h2 className="text-2xl font-semibold text-green-800">
            Step 2: Understanding SQL Joins
          </h2>
          <p className="text-green-600 mt-1">Learn how to combine data from multiple tables</p>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h3 className="text-lg font-medium mb-3 text-gray-800">Why Use Joins?</h3>
            <p className="mb-3">
              In real databases, data is separated into multiple tables to avoid redundancy:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>STUDENTS</strong> → COORDINATORS, ADDRESS, COUNTRIES</li>
              <li><strong>EMPLOYEES</strong> → DEPARTMENTS, LOCATIONS, COUNTRIES</li>
              <li><strong>CUSTOMERS</strong> → VERTICALS, PRODUCTS, MODELS</li>
            </ul>
            <p className="mt-3">
              This is called <strong>normalization</strong> (1st Normal Form, 2nd Normal Form, etc.).
              Joins allow us to combine this data when needed.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-gray-100 px-4 py-2 border-b">
                <h4 className="font-medium">SQL Joins vs Informatica Joins</h4>
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">SQL Join</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Informatica Join</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-2 text-sm">INNER JOIN</td>
                    <td className="px-4 py-2 text-sm">NORMAL JOIN</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm">LEFT OUTER JOIN</td>
                    <td className="px-4 py-2 text-sm">MASTER OUTER JOIN</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm">RIGHT OUTER JOIN</td>
                    <td className="px-4 py-2 text-sm">DETAIL OUTER JOIN</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 text-sm">FULL OUTER JOIN</td>
                    <td className="px-4 py-2 text-sm">FULL OUTER JOIN</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="bg-gray-100 px-4 py-2 border-b">
                <h4 className="font-medium">Join Types Visualization</h4>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">INNER JOIN</div>
                  <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Only matching records</div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">LEFT JOIN</div>
                  <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">All left + matching right</div>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">RIGHT JOIN</div>
                  <div className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">All right + matching left</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">FULL JOIN</div>
                  <div className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">All records from both</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Query Examples Section */}
      <section className="mb-12 bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200 bg-purple-50">
          <h2 className="text-2xl font-semibold text-purple-800">
            Step 3: Join Query Examples
          </h2>
          <p className="text-purple-600 mt-1">Practice with real SQL examples</p>
        </div>

        <div className="p-6 space-y-8">
          {/* Implicit Method */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Implicit Method</h3>
            
            <div className="mb-6">
              <h4 className="text-lg font-medium mb-2 text-gray-700">INNER JOIN</h4>
              <CodeBlock code={`SELECT
    S.STUDENT_ID,
    S.FIRST_NAME,
    S.EMAIL,
    S.STIPEND,
    C.COORDINATOR_NAME,
    C.LOCATION_ID
FROM 
    STUDENTS S, COORDINATORS C
WHERE 
    S.COORDINATOR_ID = C.COORDINATOR_ID;`} />
              <p className="mt-2 text-sm text-gray-600">Returns only students with coordinators</p>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-medium mb-2 text-gray-700">LEFT OUTER JOIN (+)</h4>
              <CodeBlock code={`SELECT
    S.STUDENT_ID,
    S.FIRST_NAME,
    S.EMAIL,
    S.STIPEND,
    C.COORDINATOR_NAME,
    C.LOCATION_ID
FROM 
    STUDENTS S, COORDINATORS C
WHERE 
    S.COORDINATOR_ID = C.COORDINATOR_ID(+);`} />
              <p className="mt-2 text-sm text-gray-600">Returns all students (even without coordinators)</p>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-medium mb-2 text-gray-700">3-Table Join</h4>
              <CodeBlock code={`SELECT
    S.STUDENT_ID,
    S.FIRST_NAME,
    S.EMAIL,
    C.COORDINATOR_NAME,
    A.COUNTRY_ID
FROM 
    STUDENTS S, COORDINATORS C, ADDRESS A
WHERE 
    S.COORDINATOR_ID = C.COORDINATOR_ID
    AND C.LOCATION_ID = A.LOCATION_ID
    AND A.COUNTRY_ID = 'UK';`} />
              <p className="mt-2 text-sm text-gray-600">Students with UK addresses</p>
            </div>
          </div>

          {/* ANSI Method */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">ANSI Method</h3>
            
            <div className="mb-6">
              <h4 className="text-lg font-medium mb-2 text-gray-700">INNER JOIN</h4>
              <CodeBlock code={`SELECT
    S.STUDENT_ID,
    S.FIRST_NAME,
    S.STIPEND,
    C.COORDINATOR_NAME,
    C.LOCATION_ID
FROM 
    STUDENTS S
INNER JOIN 
    COORDINATORS C ON S.COORDINATOR_ID = C.COORDINATOR_ID
WHERE 
    S.SPECIALIZATION = 'IICSCOMBO'
    AND S.STIPEND > 5000;`} />
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-medium mb-2 text-gray-700">FULL OUTER JOIN</h4>
              <CodeBlock code={`SELECT
    S.STUDENT_ID,
    S.FIRST_NAME,
    S.STIPEND,
    C.COORDINATOR_NAME,
    C.LOCATION_ID
FROM 
    STUDENTS S
FULL JOIN 
    COORDINATORS C ON S.COORDINATOR_ID = C.COORDINATOR_ID;`} />
              <p className="mt-2 text-sm text-gray-600">All students and all coordinators</p>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-indigo-800 mb-3">Ready to Practice More?</h3>
        <ul className="space-y-2 text-indigo-700">
          <li className="flex items-start">
            <span className="mr-2">→</span>
            <span>Try joining with 3 tables (STUDENTS → COORDINATORS → LOCATIONS)</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">→</span>
            <span>Experiment with different filter conditions</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">→</span>
            <span>Compare performance between implicit and ANSI join methods</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SQLJoinsPage;