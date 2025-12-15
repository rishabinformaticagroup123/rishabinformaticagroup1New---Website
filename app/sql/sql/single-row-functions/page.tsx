import React from 'react';
import Head from 'next/head';

const SingleRowFunctionsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <Head>
        <title>SQL Single Row Functions - Interactive Learning</title>
        <meta name="description" content="Learn SQL Single Row Functions with interactive examples" />
      </Head>

      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 p-6 text-white">
          <h1 className="text-3xl font-bold">SQL SINGLE ROW FUNCTIONS</h1>
          <p className="mt-2">Master essential SQL functions for data manipulation</p>
          <p className="mt-1 text-sm">CALL/WHATSAPP - 8970853557 / 9448005273 | INFORMATICA IICS COMBO ONLINE TRAINING </p>
        </div>

        {/* Introduction */}
        <div className="p-6 border-b bg-blue-50">
          <h2 className="text-xl font-bold text-blue-800">What Are Single Row Functions?</h2>
          <p className="mt-2 text-gray-700">
            Single row functions operate on individual rows and return one result per row. They can be used in SELECT, WHERE, and ORDER BY clauses. 
            These functions are essential for data transformation, formatting, and calculations in SQL queries.
          </p>
        </div>

        {/* Table Setup Section */}
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">1. Setting Up the STUDENTS Table</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-bold mb-2">CREATE TABLE Statement</h3>
              <pre className="bg-white p-3 rounded text-sm overflow-x-auto">
                {`CREATE TABLE STUDENTS
(
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
);`}
              </pre>
              <p className="mt-2 text-sm text-gray-700">
                This creates the STUDENTS table with columns for student information. We'll use this table structure for all our examples.
                The table includes:
              </p>
              <ul className="list-disc pl-5 mt-1 text-sm text-gray-700">
                <li>Student identification (ID, name, email)</li>
                <li>Contact information (phone number)</li>
                <li>Academic details (joining date, specialization)</li>
                <li>Financial information (stipend, bonus)</li>
                <li>Relationship information (manager, coordinator)</li>
              </ul>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-bold mb-2">Importing CSV Data</h3>
              <div className="bg-white p-2 rounded flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="bg-gray-200 p-2 rounded-lg w-full h-32 flex items-center justify-center mb-2">
                    <span className="text-gray-500">[Image: CSV Import Process in SQL Developer]</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    To import CSV data in SQL Developer: <br />
                    1. Right-click your table → Import Data <br />
                    2. Select your CSV file <br />
                    3. Map columns correctly <br />
                    4. Finish the import wizard
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* String Functions */}
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">2. String Functions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* CONCAT */}
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-bold text-purple-800">CONCAT Function</h3>
              <div className="bg-white p-3 rounded text-sm mt-2">
                <pre>{`SELECT CONCAT(FIRST_NAME, LAST_NAME) FROM STUDENTS;`}</pre>
                <p className="mt-2 text-gray-700 text-sm">
                  <strong>Purpose:</strong> Joins two strings together.<br />
                  <strong>Syntax:</strong> CONCAT(string1, string2)<br />
                  <strong>Note:</strong> For more than two strings, use nested CONCAT functions or the || operator.
                </p>
                <div className="mt-2 p-2 bg-gray-100 rounded">
                  <p className="text-sm font-semibold">Example Variations:</p>
                  <pre className="text-xs">{`-- With space between names
SELECT CONCAT(CONCAT(FIRST_NAME, ' '), LAST_NAME) FROM STUDENTS;

-- Using pipe (||) operator (recommended)
SELECT FIRST_NAME || ' ' || LAST_NAME FROM STUDENTS;`}</pre>
                </div>
              </div>
            </div>

            {/* SUBSTR */}
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-bold text-purple-800">SUBSTR Function</h3>
              <div className="bg-white p-3 rounded text-sm mt-2">
                <pre>{`SELECT SUBSTR('WELCOME TO HYDERABAD!!!', 12, 5) FROM DUAL;`}</pre>
                <p className="mt-2 text-gray-700 text-sm">
                  <strong>Purpose:</strong> Extracts a portion of a string.<br />
                  <strong>Syntax:</strong> SUBSTR(string, start_position, [length])<br />
                  <strong>Parameters:</strong>
                  <ul className="list-disc pl-5 mt-1">
                    <li>string: The source string</li>
                    <li>start_position: Starting position (1-based)</li>
                    <li>length: Optional number of characters to extract</li>
                  </ul>
                </p>
                <div className="mt-2 p-2 bg-gray-100 rounded">
                  <p className="text-sm font-semibold">Practical Example:</p>
                  <pre className="text-xs">{`-- Extract username from email (text before @)
SELECT SUBSTR(EMAIL, 1, INSTR(EMAIL, '@')-1) FROM STUDENTS;`}</pre>
                </div>
              </div>
            </div>

            {/* INSTR */}
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-bold text-purple-800">INSTR Function</h3>
              <div className="bg-white p-3 rounded text-sm mt-2">
                <pre>{`SELECT INSTR('CORPORATE STRUCTURE', 'OR', 3, 2) FROM DUAL;`}</pre>
                <p className="mt-2 text-gray-700 text-sm">
                  <strong>Purpose:</strong> Finds the position of a substring.<br />
                  <strong>Syntax:</strong> INSTR(string, substring, [start], [occurrence])<br />
                  <strong>Returns:</strong> Position of substring or 0 if not found<br />
                  <strong>Common Uses:</strong> String parsing, validation, and extraction
                </p>
                <div className="mt-2 p-2 bg-gray-100 rounded">
                  <p className="text-sm font-semibold">How It Works:</p>
                  <p className="text-xs">
                    The example finds the 2nd occurrence of 'OR' starting from position 3 in 'CORPORATE STRUCTURE'.
                    It returns 14 because:
                    <ol className="list-decimal pl-5 mt-1">
                      <li>Starts searching from position 3 (skips first 'OR' at position 2)</li>
                      <li>Finds 'OR' in 'PORATE' (position 5) - 1st occurrence</li>
                      <li>Continues to find 'OR' in 'STRUCTURE' (position 14) - 2nd occurrence</li>
                    </ol>
                  </p>
                </div>
              </div>
            </div>

            {/* Case Conversion */}
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-bold text-purple-800">Case Conversion Functions</h3>
              <div className="bg-white p-3 rounded text-sm mt-2">
                <pre>{`SELECT 
  FIRST_NAME,
  LOWER(FIRST_NAME) AS lowercase,
  UPPER(FIRST_NAME) AS uppercase,
  INITCAP(FIRST_NAME) AS propercase
FROM STUDENTS;`}</pre>
                <p className="mt-2 text-gray-700 text-sm">
                  <strong>Functions:</strong>
                  <ul className="list-disc pl-5 mt-1">
                    <li><strong>LOWER()</strong>: Converts to lowercase</li>
                    <li><strong>UPPER()</strong>: Converts to uppercase</li>
                    <li><strong>INITCAP()</strong>: Capitalizes first letter of each word</li>
                  </ul>
                  <strong>Usage:</strong> Essential for case-insensitive comparisons and data standardization.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Date Functions */}
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">3. Date Functions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Current Date */}
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-bold text-yellow-800">Current Date Functions</h3>
              <div className="bg-white p-3 rounded text-sm mt-2">
                <pre>{`SELECT 
  SYSDATE AS server_date,
  CURRENT_DATE AS session_date,
  SYSTIMESTAMP AS server_timestamp
FROM DUAL;`}</pre>
                <p className="mt-2 text-gray-700 text-sm">
                  <strong>Functions:</strong>
                  <ul className="list-disc pl-5 mt-1">
                    <li><strong>SYSDATE</strong>: Current date/time on database server</li>
                    <li><strong>CURRENT_DATE</strong>: Current date in session timezone</li>
                    <li><strong>SYSTIMESTAMP</strong>: Current timestamp with timezone</li>
                  </ul>
                  <strong>Key Difference:</strong> SYSDATE uses server timezone, CURRENT_DATE uses session timezone.
                </p>
              </div>
            </div>

            {/* Date Arithmetic */}
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-bold text-yellow-800">Date Arithmetic</h3>
              <div className="bg-white p-3 rounded text-sm mt-2">
                <pre>{`SELECT 
  SYSDATE AS today,
  SYSDATE + 7 AS next_week,
  SYSDATE - INTERVAL '1' MONTH AS last_month,
  MONTHS_BETWEEN(SYSDATE, JOINING_DATE) AS months_enrolled
FROM STUDENTS;`}</pre>
                <p className="mt-2 text-gray-700 text-sm">
                  <strong>Operations:</strong>
                  <ul className="list-disc pl-5 mt-1">
                    <li>Add/subtract days with +/- numbers</li>
                    <li>Add/subtract months with INTERVAL</li>
                    <li><strong>MONTHS_BETWEEN</strong>: Calculates months between two dates</li>
                  </ul>
                  <strong>Note:</strong> Oracle stores dates with time components - use TRUNC to ignore time.
                </p>
              </div>
            </div>

            {/* Date Formatting */}
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-bold text-yellow-800">Date Formatting with TO_CHAR</h3>
              <div className="bg-white p-3 rounded text-sm mt-2">
                <pre>{`SELECT 
  TO_CHAR(SYSDATE, 'DD-MON-YYYY') AS simple_date,
  TO_CHAR(SYSDATE, 'Day, Month DD, YYYY') AS long_date,
  TO_CHAR(SYSDATE, 'MM/DD/YYYY HH24:MI:SS') AS date_time
FROM DUAL;`}</pre>
                <p className="mt-2 text-gray-700 text-sm">
                  <strong>Format Elements:</strong>
                  <ul className="list-disc pl-5 mt-1">
                    <li>YYYY: 4-digit year</li>
                    <li>MON: Abbreviated month (JAN, FEB)</li>
                    <li>MM: Month number (01-12)</li>
                    <li>DD: Day of month (01-31)</li>
                    <li>DAY: Full day name (MONDAY)</li>
                    <li>HH24: Hour (00-23)</li>
                    <li>MI: Minutes (00-59)</li>
                  </ul>
                  <strong>Tip:</strong> Use FM prefix to suppress padding (e.g., 'FMMonth')
                </p>
              </div>
            </div>

            {/* Date Rounding */}
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-bold text-yellow-800">Date Rounding/Truncation</h3>
              <div className="bg-white p-3 rounded text-sm mt-2">
                <pre>{`SELECT 
  ROUND(SYSDATE, 'MONTH') AS rounded_month,
  TRUNC(SYSDATE, 'YEAR') AS truncated_year,
  ROUND(TO_DATE('15-JUL-2023'), 'YEAR') AS year_rounding
FROM DUAL;`}</pre>
                <p className="mt-2 text-gray-700 text-sm">
                  <strong>Functions:</strong>
                  <ul className="list-disc pl-5 mt-1">
                    <li><strong>ROUND(date, format)</strong>: Rounds to nearest unit</li>
                    <li><strong>TRUNC(date, format)</strong>: Truncates to specified unit</li>
                  </ul>
                  <strong>Common Formats:</strong> 'YEAR', 'MONTH', 'DAY', 'Q' (quarter)<br />
                  <strong>Example:</strong> ROUND('15-JUL-2023','YEAR') returns '01-JAN-2024' because July is in second half of year
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Number Functions */}
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">4. Number Functions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* ROUND/TRUNC */}
            <div className="bg-red-50 p-4 rounded-lg">
              <h3 className="font-bold text-red-800">ROUND and TRUNC Functions</h3>
              <div className="bg-white p-3 rounded text-sm mt-2">
                <pre>{`SELECT 
  ROUND(5435.7878, 2) AS rounded_2dec,
  TRUNC(5435.7878, 2) AS truncated_2dec,
  ROUND(5435.5) AS rounded_default
FROM DUAL;`}</pre>
                <p className="mt-2 text-gray-700 text-sm">
                  <strong>ROUND(number, precision):</strong>
                  <ul className="list-disc pl-5 mt-1">
                    <li>Rounds number to specified decimal places</li>
                    <li>Positive precision: decimal places</li>
                    <li>Negative precision: left of decimal</li>
                    <li>Default precision: 0 (round to integer)</li>
                  </ul>
                  <strong>TRUNC(number, precision):</strong> Similar but truncates (cuts off) without rounding
                </p>
              </div>
            </div>

            {/* MOD/ABS */}
            <div className="bg-red-50 p-4 rounded-lg">
              <h3 className="font-bold text-red-800">MOD and ABS Functions</h3>
              <div className="bg-white p-3 rounded text-sm mt-2">
                <pre>{`SELECT 
  MOD(55, 4) AS remainder,
  ABS(-354) AS absolute_value,
  MOD(STUDENT_ID, 2) AS odd_even_check
FROM STUDENTS;`}</pre>
                <p className="mt-2 text-gray-700 text-sm">
                  <strong>MOD(dividend, divisor):</strong>
                  <ul className="list-disc pl-5 mt-1">
                    <li>Returns remainder after division</li>
                    <li>Common use: Find even/odd (MOD(value,2)=0 for even)</li>
                    <li>Also useful for cyclic patterns (e.g., MOD(day_number,7) for weekday)</li>
                  </ul>
                  <strong>ABS(number):</strong> Returns absolute value (removes negative sign)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Conditional Logic */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">5. Conditional Logic</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* CASE */}
            <div className="bg-pink-50 p-4 rounded-lg">
              <h3 className="font-bold text-pink-800">CASE Expression</h3>
              <div className="bg-white p-3 rounded text-sm mt-2">
                <pre>{`SELECT 
  FIRST_NAME,
  STIPEND,
  CASE 
    WHEN STIPEND < 5000 THEN 'Low'
    WHEN STIPEND < 15000 THEN 'Medium'
    ELSE 'High'
  END AS stipend_level
FROM STUDENTS;`}</pre>
                <p className="mt-2 text-gray-700 text-sm">
                  <strong>Purpose:</strong> Provides if-then-else logic in SQL<br />
                  <strong>Syntax:</strong>
                  <ul className="list-disc pl-5 mt-1">
                    <li>Evaluates WHEN conditions in order</li>
                    <li>Returns result of first true condition</li>
                    <li>ELSE clause is optional (returns NULL if omitted and no matches)</li>
                  </ul>
                  <strong>Benefits:</strong> More flexible than DECODE, ANSI standard, works in all SQL dialects
                </p>
              </div>
            </div>

            {/* DECODE */}
            <div className="bg-pink-50 p-4 rounded-lg">
              <h3 className="font-bold text-pink-800">DECODE Function</h3>
              <div className="bg-white p-3 rounded text-sm mt-2">
                <pre>{`SELECT 
  SUBJECT_ID,
  DECODE(SUBJECT_ID, 
         1, 'Mathematics',
         2, 'Physics',
         3, 'Chemistry',
         'Other') AS subject_name
FROM STUDENTS;`}</pre>
                <p className="mt-2 text-gray-700 text-sm">
                  <strong>Purpose:</strong> Oracle's version of simple CASE (equality only)<br />
                  <strong>Syntax:</strong> DECODE(expression, search1, result1, search2, result2, ..., default)<br />
                  <strong>How It Works:</strong>
                  <ul className="list-disc pl-5 mt-1">
                    <li>Compares expression to each search value</li>
                    <li>Returns corresponding result for first match</li>
                    <li>Returns default if no matches (NULL if default omitted)</li>
                  </ul>
                  <strong>Limitation:</strong> Only supports equality comparisons (use CASE for ranges)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 p-6 text-center">
          <p className="text-gray-700 font-semibold">INFORMATICA IICS COMBO ONLINE TRAINING - BATCH 9</p>
          <p className="text-blue-600 mt-1">For more information: CALL/WHATSAPP - 8970853557 / 9448005273</p>
        </div>
      </div>
    </div>
  );
};

export default SingleRowFunctionsPage;