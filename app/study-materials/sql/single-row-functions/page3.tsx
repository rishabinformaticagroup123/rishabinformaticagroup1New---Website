import React from 'react';

const Page1 = () => {
  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
        SQL Single Row Functions – Page 1<br />
        <span className="text-sm text-gray-500">by Rishab Informatica Group</span>
      </h1>

      <p className="mb-6 text-center text-lg font-semibold text-red-600">
        Call/WhatsApp – 8970853557 / 9448005273 | Informatica IICS Combo Online Training
      </p>

      {/* Create Table & Import CSV (Intro) */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2 text-green-700">Create Table & Import CSV</h2>
        <p className="mb-2">Learn how to create a table and import CSV file:</p>
        <a
          href="https://rishabinformaticagroup.com/study-materials/sql/import-csv"
          className="text-blue-600 underline"
          target="_blank"
        >
          👉 Click here to see how to create a table & import CSV
        </a>
      </section>

      {/* Basic SELECT */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2 text-green-700">SELECT Basics</h2>
        <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-auto">
{`-- Select all columns
SELECT * FROM STUDENTS;

-- Select specific columns
SELECT STUDENT_ID, FIRST_NAME, EMAIL, JOINING_DATE, STIPEND, COORDINATOR_ID FROM STUDENTS;
`}
        </pre>
      </section>

      {/* WHERE clause examples */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2 text-green-700">WHERE Clause</h2>
        <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-auto">
{`SELECT * FROM STUDENTS WHERE STIPEND > 10000;
SELECT * FROM STUDENTS WHERE STIPEND < 3000;
SELECT * FROM STUDENTS WHERE STIPEND BETWEEN 5000 AND 7000;
SELECT * FROM STUDENTS WHERE COORDINATOR_ID IN (30,60,90);
SELECT * FROM STUDENTS WHERE COORDINATOR_ID NOT IN (30,50,80);
`}
        </pre>
      </section>

      {/* ROWNUM / NULL / COUNT */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2 text-green-700">ROWNUM, NULL Checks, COUNT</h2>
        <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-auto">
{`SELECT * FROM STUDENTS WHERE ROWNUM <= 5;
SELECT * FROM STUDENTS WHERE BONUS IS NULL;
SELECT COUNT(*) FROM STUDENTS;
SELECT COUNT(BONUS) FROM STUDENTS;
`}
        </pre>
      </section>

      {/* Column Alias */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2 text-green-700">Column Alias</h2>
        <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-auto">
{`-- Using AS
SELECT STUDENT_ID AS EMP_ID, FIRST_NAME FROM STUDENTS;

-- Without AS (just space)
SELECT STUDENT_ID EMP_ID, FIRST_NAME FROM STUDENTS;
`}
        </pre>
      </section>

      {/* Concatenation */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2 text-green-700">Concatenation</h2>
        <p className="mb-2">You can use either `CONCAT()` or pipe (`||`) symbol:</p>
        <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-auto">
{`-- CONCAT
SELECT CONCAT(FIRST_NAME, LAST_NAME) AS FULL_NAME FROM STUDENTS;
-- Nested CONCAT
SELECT CONCAT(CONCAT(FIRST_NAME, ' '), LAST_NAME) AS FULL_NAME FROM STUDENTS;

-- Using pipe operator
SELECT FIRST_NAME || ' ' || LAST_NAME AS FULL_NAME FROM STUDENTS;
`}
        </pre>
      </section>

      {/* Column Calculation */}
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-2 text-green-700">Column Calculations</h2>
        <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-auto">
{`-- Add or Multiply values
SELECT STIPEND, STIPEND + 1000 AS NEW_STIPEND FROM STUDENTS;
SELECT STIPEND, STIPEND * 12 AS ANNUAL_STIPEND FROM STUDENTS;
`}
        </pre>
      </section>

      {/* Unique / Distinct */}
      <section>
        <h2 className="text-xl font-bold mb-2 text-green-700">DISTINCT / COUNT</h2>
        <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-auto">
{`SELECT COORDINATOR_ID FROM STUDENTS;
SELECT DISTINCT COORDINATOR_ID FROM STUDENTS;
SELECT COUNT(DISTINCT COORDINATOR_ID) FROM STUDENTS;
`}
        </pre>
      </section>

      <div className="text-center mt-10">
        <p className="text-gray-600 text-sm">
          ✅ Continue to <strong>Page 2</strong> to learn NULL functions, ROUND/TRUNC, MOD, and Date Math!
        </p>
      </div>
    </div>
  );
};

export default Page1;
