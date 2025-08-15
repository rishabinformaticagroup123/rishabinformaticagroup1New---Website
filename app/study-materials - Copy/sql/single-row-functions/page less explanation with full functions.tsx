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
          <p className="mt-1 text-sm">CALL/WHATSAPP - 8970853557 / 9448005273 | INFORMATICA IICS COMBO ONLINE TRAINING | BATCH 9</p>
        </div>

        {/* Table Setup Section */}
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">1. Setting Up the STUDENTS Table</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Create Table */}
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
            </div>

            {/* CSV Import */}
            <div className="bg-gray-100 p-4 rounded-lg">
              <h3 className="font-bold mb-2">Importing CSV Data</h3>
              <div className="bg-white p-2 rounded flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="bg-gray-200 p-2 rounded-lg w-full h-32 flex items-center justify-center mb-2">
                    <span className="text-gray-500">[Image: CSV Import Process in SQL Developer]</span>
                  </div>
                  <p className="text-sm text-gray-600">Steps to import CSV data into Oracle/Snowflake</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Basic Selection */}
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">2. Basic Selection</h2>
          
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-bold text-blue-800">Selecting All Columns</h3>
              <pre className="bg-white p-3 rounded text-sm mt-2">
                {`SELECT * FROM STUDENTS;`}
              </pre>
              <p className="mt-1 text-sm text-gray-600">The asterisk (*) selects all columns from the table</p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-bold text-blue-800">Selecting Specific Columns</h3>
              <pre className="bg-white p-3 rounded text-sm mt-2">
                {`SELECT STUDENT_ID, FIRST_NAME, EMAIL, JOINING_DATE, STIPEND, COORDINATOR_ID 
FROM STUDENTS;`}
              </pre>
              <p className="mt-1 text-sm text-gray-600">Specify only the columns you need for better performance</p>
            </div>
          </div>
        </div>

        {/* WHERE Clause */}
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">3. Filtering Data with WHERE Clause</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Basic Comparisons */}
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-bold text-green-800">Basic Comparisons</h3>
              <pre className="bg-white p-3 rounded text-sm mt-2">
                {`SELECT * FROM STUDENTS WHERE STIPEND > 10000;
SELECT * FROM STUDENTS WHERE STIPEND < 3000;
SELECT * FROM STUDENTS WHERE STIPEND >= 5000 AND STIPEND <= 7000;`}
              </pre>
            </div>

            {/* BETWEEN */}
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-bold text-green-800">BETWEEN Operator</h3>
              <pre className="bg-white p-3 rounded text-sm mt-2">
                {`SELECT * FROM STUDENTS WHERE STIPEND BETWEEN 5000 AND 7000;
SELECT * FROM STUDENTS WHERE STIPEND NOT BETWEEN 5000 AND 7000;`}
              </pre>
            </div>

            {/* IN Operator */}
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-bold text-green-800">IN Operator</h3>
              <pre className="bg-white p-3 rounded text-sm mt-2">
                {`SELECT * FROM STUDENTS WHERE COORDINATOR_ID IN (30,60,90);
SELECT * FROM STUDENTS WHERE COORDINATOR_ID NOT IN (30,50,80);`}
              </pre>
              <p className="mt-1 text-sm text-gray-600">IN is more efficient than multiple OR conditions</p>
            </div>

            {/* NULL Handling */}
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-bold text-green-800">NULL Conditions</h3>
              <pre className="bg-white p-3 rounded text-sm mt-2">
                {`SELECT * FROM STUDENTS WHERE BONUS IS NULL;
SELECT * FROM STUDENTS WHERE BONUS IS NOT NULL;`}
              </pre>
              <p className="mt-1 text-sm text-gray-600">Use IS NULL/IS NOT NULL to check for NULL values</p>
            </div>
          </div>
        </div>

        {/* String Functions */}
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">4. String Functions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* CONCAT */}
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-bold text-purple-800">Concatenation</h3>
              <pre className="bg-white p-3 rounded text-sm mt-2">
                {`SELECT FIRST_NAME, LAST_NAME, 
       CONCAT(FIRST_NAME, LAST_NAME) AS FULL_NAME 
FROM STUDENTS;

-- With space between names
SELECT FIRST_NAME, LAST_NAME, 
       CONCAT(CONCAT(FIRST_NAME, ' '), LAST_NAME) AS FULL_NAME 
FROM STUDENTS;

-- Using pipe (||) operator (recommended)
SELECT FIRST_NAME || ' ' || LAST_NAME AS FULL_NAME 
FROM STUDENTS;`}
              </pre>
            </div>

            {/* SUBSTR */}
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-bold text-purple-800">SUBSTR Function</h3>
              <pre className="bg-white p-3 rounded text-sm mt-2">
                {`-- Extract from position 12, 5 characters
SELECT SUBSTR('WELCOME TO HYDERABAD!!!', 12, 5) FROM DUAL;

-- Extract from position 12 to end
SELECT SUBSTR('WELCOME TO CHENNAI!!!', 12) FROM DUAL;

-- Extract from right (negative position)
SELECT SUBSTR('WELCOME TO INDIA!!!', -8) FROM DUAL;

-- Practical example with email
SELECT SUBSTR('RISHAB@GMAIL.COM', 1, 
       INSTR('RISHAB@GMAIL.COM', '@')-1) FROM DUAL;`}
              </pre>
            </div>

            {/* INSTR */}
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-bold text-purple-800">INSTR Function</h3>
              <pre className="bg-white p-3 rounded text-sm mt-2">
                {`-- Find position of 'R'
SELECT INSTR('CORPORATE STRUCTURE', 'R') FROM DUAL;

-- Find 2nd occurrence starting from position 3
SELECT INSTR('CORPORATE STRUCTURE', 'OR', 3, 2) FROM DUAL;

-- Find position of 2nd space
SELECT INSTR('CORPORATE FLOOR GARDEN', ' ', 1, 2) FROM DUAL;`}
              </pre>
            </div>

            {/* Case Conversion */}
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-bold text-purple-800">Case Conversion</h3>
              <pre className="bg-white p-3 rounded text-sm mt-2">
                {`SELECT FIRST_NAME,
       LOWER(FIRST_NAME) AS LOWER_NAME,
       UPPER(FIRST_NAME) AS UPPER_NAME,
       INITCAP(FIRST_NAME) AS INITCAP_NAME,
       LENGTH(FIRST_NAME) AS NAME_LENGTH
FROM STUDENTS;`}
              </pre>
            </div>
          </div>
        </div>

        {/* Date Functions */}
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">5. Date Functions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Basic Date Functions */}
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-bold text-yellow-800">Basic Date Operations</h3>
              <pre className="bg-white p-3 rounded text-sm mt-2">
                {`-- Current date/time
SELECT SYSDATE FROM DUAL;
SELECT CURRENT_DATE FROM DUAL;
SELECT SYSTIMESTAMP FROM DUAL;

-- Date arithmetic
SELECT SYSDATE + 3 FROM DUAL; -- Add 3 days
SELECT MONTHS_BETWEEN(SYSDATE, TO_DATE('2000/01/01', 'YYYY/MM/DD')) FROM DUAL;
SELECT TO_DATE('2017/01/01', 'YYYY/MM/DD') - TO_DATE('2014/01/01', 'YYYY/MM/DD') FROM DUAL;`}
              </pre>
            </div>

            {/* Advanced Date Functions */}
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-bold text-yellow-800">Advanced Date Functions</h3>
              <pre className="bg-white p-3 rounded text-sm mt-2">
                {`-- Next weekday
SELECT NEXT_DAY('31-MAR-20', 'FRIDAY') FROM DUAL;

-- Last day of month
SELECT LAST_DAY(SYSDATE) FROM DUAL;

-- Add months
SELECT ADD_MONTHS('01-AUG-03', 3) FROM DUAL;

-- Date rounding
SELECT ROUND(TO_DATE('22-AUG-21'), 'YEAR') FROM DUAL;
SELECT ROUND(TO_DATE('22-AUG-16'), 'Q') FROM DUAL;
SELECT ROUND(TO_DATE('22-AUG-16'), 'MONTH') FROM DUAL;

-- Date truncation
SELECT TRUNC(TO_DATE('22-AUG-16'), 'YEAR') FROM DUAL;
SELECT TRUNC(SYSDATE, 'MONTH') FROM DUAL; -- First day of month`}
              </pre>
            </div>
          </div>
        </div>

        {/* Number Functions */}
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">6. Number Functions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Rounding Functions */}
            <div className="bg-red-50 p-4 rounded-lg">
              <h3 className="font-bold text-red-800">Rounding Functions</h3>
              <pre className="bg-white p-3 rounded text-sm mt-2">
                {`-- ROUND examples
SELECT ROUND(5435.7878) FROM DUAL; -- 5436
SELECT ROUND(5435.3878) FROM DUAL; -- 5435
SELECT ROUND(5435.7878, 2) FROM DUAL; -- 5435.79

-- TRUNC examples (always truncates)
SELECT TRUNC(5435.7878) FROM DUAL; -- 5435
SELECT TRUNC(5435.7878, 2) FROM DUAL; -- 5435.78

-- CEIL and FLOOR
SELECT CEIL(5.000000001) FROM DUAL; -- 6
SELECT FLOOR(5.99999999) FROM DUAL; -- 5`}
              </pre>
            </div>

            {/* Other Number Functions */}
            <div className="bg-red-50 p-4 rounded-lg">
              <h3 className="font-bold text-red-800">Other Number Functions</h3>
              <pre className="bg-white p-3 rounded text-sm mt-2">
                {`-- MOD (remainder)
SELECT MOD(55,4) FROM DUAL; -- 3 (55 ÷ 4 remainder 3)

-- ABS (absolute value)
SELECT ABS(-354) FROM DUAL; -- 354

-- Practical examples
SELECT * FROM STUDENTS WHERE MOD(STUDENT_ID,2)=0; -- Even IDs
SELECT * FROM STUDENTS WHERE MOD(TO_CHAR(JOINING_DATE,'YYYY'),4)=0; -- Leap years`}
              </pre>
            </div>
          </div>
        </div>

        {/* NULL Handling Functions */}
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">7. NULL Handling Functions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* NVL */}
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h3 className="font-bold text-indigo-800">NVL Function</h3>
              <pre className="bg-white p-3 rounded text-sm mt-2">
                {`-- Basic NVL
SELECT NVL(5,6) FROM DUAL; -- Returns 5
SELECT NVL(NULL,6) FROM DUAL; -- Returns 6

-- Practical example
SELECT STUDENT_ID, STIPEND, BONUS,
       STIPEND + NVL(BONUS,0) AS TOTAL_COMPENSATION
FROM STUDENTS;`}
              </pre>
            </div>

            {/* NVL2 */}
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h3 className="font-bold text-indigo-800">NVL2 Function</h3>
              <pre className="bg-white p-3 rounded text-sm mt-2">
                {`-- Basic NVL2
SELECT NVL2(4,8,12) FROM DUAL; -- Returns 8 (first arg not null)
SELECT NVL2(NULL,8,12) FROM DUAL; -- Returns 12 (first arg null)

-- Practical example
SELECT STUDENT_ID, BONUS,
       NVL2(BONUS, 'Has Bonus', 'No Bonus') AS BONUS_STATUS
FROM STUDENTS;`}
              </pre>
            </div>

            {/* COALESCE */}
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h3 className="font-bold text-indigo-800">COALESCE Function</h3>
              <pre className="bg-white p-3 rounded text-sm mt-2">
                {`-- Returns first non-null value
SELECT COALESCE(NULL, NULL, 'Third', 'Fourth') FROM DUAL; -- 'Third'

-- Practical example
SELECT STUDENT_ID, 
       COALESCE(BONUS, MANAGER_ID, COORDINATOR_ID, 0) AS DEFAULT_VALUE
FROM STUDENTS;`}
              </pre>
            </div>

            {/* NULLIF */}
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h3 className="font-bold text-indigo-800">NULLIF Function</h3>
              <pre className="bg-white p-3 rounded text-sm mt-2">
                {`-- Returns NULL if equal, else first argument
SELECT NULLIF(5,8) FROM DUAL; -- 5
SELECT NULLIF(8,8) FROM DUAL; -- NULL

-- Practical example: Find students with same first/last name
SELECT FIRST_NAME, LAST_NAME 
FROM STUDENTS 
WHERE NULLIF(FIRST_NAME, LAST_NAME) IS NULL;`}
              </pre>
            </div>
          </div>
        </div>

        {/* Conditional Logic */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">8. Conditional Logic</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* DECODE */}
            <div className="bg-pink-50 p-4 rounded-lg">
              <h3 className="font-bold text-pink-800">DECODE Function</h3>
              <pre className="bg-white p-3 rounded text-sm mt-2">
                {`-- Simple DECODE example
SELECT SUBJECT_ID,
       DECODE(SUBJECT_ID, 
              1, 'MATHEMATICS',
              2, 'PHYSICS',
              3, 'CHEMISTRY',
              'OTHER') AS SUBJECT_NAME
FROM STUDENTS;

-- City name conversion
SELECT CITY,
       DECODE(CITY,
              'MADRAS', 'CHENNAI',
              'CALCUTTA', 'KOLKATA',
              'BOMBAY', 'MUMBAI',
              'ORISSA', 'ODISHA',
              CITY) AS NEW_CITY
FROM STUDENTS;`}
              </pre>
            </div>

            {/* CASE */}
            <div className="bg-pink-50 p-4 rounded-lg">
              <h3 className="font-bold text-pink-800">CASE Expression</h3>
              <pre className="bg-white p-3 rounded text-sm mt-2">
                {`-- Simple CASE example
SELECT STUDENT_ID, FIRST_NAME, STIPEND,
       CASE 
         WHEN STIPEND < 5000 THEN 'LOW STIPEND'
         WHEN STIPEND >= 5000 AND STIPEND < 15000 THEN 'AVG STIPEND'
         ELSE 'HIGH STIPEND'
       END AS STIPEND_STATUS
FROM STUDENTS;

-- Count by stipend category
SELECT 
  COUNT(CASE WHEN STIPEND < 5000 THEN 'LOW STIPEND' END) AS LOW_COUNT,
  COUNT(CASE WHEN STIPEND >= 5000 AND STIPEND < 15000 THEN 'AVG STIPEND' END) AS AVG_COUNT,
  COUNT(CASE WHEN STIPEND >= 15000 THEN 'HIGH STIPEND' END) AS HIGH_COUNT
FROM STUDENTS;`}
              </pre>
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