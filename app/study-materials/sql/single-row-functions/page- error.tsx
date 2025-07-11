// File: app/study-materials/sql/single-row-functions/page.tsx
import React from "react";

export const metadata = {
  title: "SQL Single Row Functions - Complete Guide",
  description: "Detailed explanations of all SQL single row functions with examples",
};

export default function SingleRowFunctionsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 p-6 text-white">
          <h1 className="text-3xl font-bold">SQL SINGLE ROW FUNCTIONS COMPLETE GUIDE</h1>
          <p className="mt-2">Detailed explanations with practical examples</p>
          <p className="mt-1 text-sm">
            CALL/WHATSAPP - 8970853557 / 9448005273 | INFORMATICA IICS COMBO ONLINE TRAINING | BATCH 9
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
                This creates the STUDENTS table with various columns that we'll use in our examples. 
                The table includes student information, contact details, joining date, and financial information.
              </p>
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

        {/* Basic Selection */}
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">2. Basic Selection Commands</h2>
          
          <div className="space-y-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-bold text-blue-800">SELECT * (Select All Columns)</h3>
              <pre className="bg-white p-3 rounded text-sm mt-2">
                {`SELECT * FROM STUDENTS;`}
              </pre>
              <p className="mt-2 text-sm text-gray-700">
                The asterisk (*) is a wildcard that selects all columns from the specified table. 
                This is useful for quick data inspection but should be avoided in production code 
                as it retrieves more data than needed and can impact performance.
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-bold text-blue-800">Selecting Specific Columns</h3>
              <pre className="bg-white p-3 rounded text-sm mt-2">
                {`SELECT STUDENT_ID, FIRST_NAME, EMAIL, JOINING_DATE, STIPEND, COORDINATOR_ID 
FROM STUDENTS;`}
              </pre>
              <p className="mt-2 text-sm text-gray-700">
                Always specify only the columns you need. This improves query performance 
                and makes your code more maintainable. The order of columns in the SELECT 
                clause determines their display order in the result set.
              </p>
            </div>
          </div>
        </div>

        {/* WHERE Clause */}
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">3. Filtering Data with WHERE Clause</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-bold text-green-800">Comparison Operators</h3>
              <pre className="bg-white p-3 rounded text-sm mt-2">
                {`SELECT * FROM STUDENTS WHERE STIPEND > 10000;
SELECT * FROM STUDENTS WHERE STIPEND < 3000;
SELECT * FROM STUDENTS WHERE STIPEND >= 5000 AND STIPEND <= 7000;`}
              </pre>
              <p className="mt-2 text-sm text-gray-700">
                Comparison operators (=, <>, <, >, <=, >=) allow you to filter rows based on column values. 
                You can combine conditions with AND/OR. Remember that AND has higher precedence than OR.
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-bold text-green-800">BETWEEN Operator</h3>
              <pre className="bg-white p-3 rounded text-sm mt-2">
                {`SELECT * FROM STUDENTS WHERE STIPEND BETWEEN 5000 AND 7000;
SELECT * FROM STUDENTS WHERE STIPEND NOT BETWEEN 5000 AND 7000;`}
              </pre>
              <p className="mt-2 text-sm text-gray-700">
                BETWEEN is inclusive (includes the boundary values) and is equivalent to using >= AND <=. 
                NOT BETWEEN excludes the specified range. Works with numbers, dates, and strings.
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-bold text-green-800">IN Operator</h3>
              <pre className="bg-white p-3 rounded text-sm mt-2">
                {`SELECT * FROM STUDENTS WHERE COORDINATOR_ID IN (30,60,90);
SELECT * FROM STUDENTS WHERE COORDINATOR_ID NOT IN (30,50,80);`}
              </pre>
              <p className="mt-2 text-sm text-gray-700">
                IN checks if a value matches any value in a list. More efficient than multiple OR conditions. 
                NOT IN excludes matching values. Be careful with NULL values in NOT IN lists.
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="font-bold text-green-800">NULL Conditions</h3>
              <pre className="bg-white p-3 rounded text-sm mt-2">
                {`SELECT * FROM STUDENTS WHERE BONUS IS NULL;
SELECT * FROM STUDENTS WHERE BONUS IS NOT NULL;`}
              </pre>
              <p className="mt-2 text-sm text-gray-700">
                NULL represents missing/unknown data. Use IS NULL to find NULL values and IS NOT NULL 
                to exclude them. Regular comparison operators (=, <>) don't work with NULL.
              </p>
            </div>
          </div>
        </div>

        {/* String Functions */}
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">4. String Functions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-bold text-purple-800">CONCAT Function</h3>
              <pre className="bg-white p-3 rounded text-sm mt-2">
                {`SELECT CONCAT(FIRST_NAME, LAST_NAME) FROM STUDENTS;
SELECT CONCAT(CONCAT(FIRST_NAME, ' '), LAST_NAME) FROM STUDENTS;
SELECT FIRST_NAME || ' ' || LAST_NAME FROM STUDENTS;`}
              </pre>
              <p className="mt-2 text-sm text-gray-700">
                CONCAT joins two strings together. For more than two strings, you need nested CONCATs. 
                The || operator (pipe) is more commonly used as it can concatenate multiple strings easily.
              </p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-bold text-purple-800">SUBSTR Function</h3>
              <pre className="bg-white p-3 rounded text-sm mt-2">
                {`SELECT SUBSTR('WELCOME TO HYDERABAD!!!', 12, 5) FROM DUAL; -- 'HYDER'
SELECT SUBSTR('WELCOME TO INDIA!!!', -8) FROM DUAL; -- 'INDIA!!!'
SELECT SUBSTR(EMAIL, 1, INSTR(EMAIL, '@')-1) FROM STUDENTS;`}
              </pre>
              <p className="mt-2 text-sm text-gray-700">
                SUBSTR extracts part of a string. Syntax: SUBSTR(string, start_position, [length]). 
                Negative start_position counts from the end. Often used with INSTR to find specific patterns.
              </p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-bold text-purple-800">INSTR Function</h3>
              <pre className="bg-white p-3 rounded text-sm mt-2">
                {`SELECT INSTR('CORPORATE STRUCTURE', 'R') FROM DUAL; -- 2
SELECT INSTR('CORPORATE STRUCTURE', 'OR', 3, 2) FROM DUAL; -- 14
SELECT INSTR(EMAIL, '@') FROM STUDENTS;`}
              </pre>
              <p className="mt-2 text-sm text-gray-700">
                INSTR finds the position of a substring. Syntax: INSTR(string, substring, [start], [occurrence]). 
                Returns 0 if not found. Useful for parsing strings and validating formats.
              </p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-bold text-purple-800">Case Conversion Functions</h3>
              <pre className="bg-white p-3 rounded text-sm mt-2">
                {`SELECT LOWER(FIRST_NAME) FROM STUDENTS;
SELECT UPPER(LAST_NAME) FROM STUDENTS;
SELECT INITCAP(EMAIL) FROM STUDENTS;`}
              </pre>
              <p className="mt-2 text-sm text-gray-700">
                <strong>LOWER</strong> converts to lowercase, <strong>UPPER</strong> to uppercase, 
                <strong>INITCAP</strong> capitalizes first letters. Useful for case-insensitive comparisons 
                and data standardization.
              </p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-bold text-purple-800">LPAD/RPAD Functions</h3>
              <pre className="bg-white p-3 rounded text-sm mt-2">
                {`SELECT LPAD(STIPEND, 15, '0') FROM STUDENTS;
SELECT RPAD(FIRST_NAME, 20, '*') FROM STUDENTS;`}
              </pre>
              <p className="mt-2 text-sm text-gray-700">
                <strong>LPAD</strong> pads the left side of a string, <strong>RPAD</strong> pads the right. 
                Syntax: LPAD(string, total_length, pad_string). Useful for formatting fixed-width output.
              </p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-bold text-purple-800">TRIM Functions</h3>
              <pre className="bg-white p-3 rounded text-sm mt-2">
                {`SELECT LTRIM('   WELCOME') FROM DUAL; -- 'WELCOME'
SELECT RTRIM('WELCOME   ') FROM DUAL; -- 'WELCOME'
SELECT TRIM('0' FROM '00012300') FROM DUAL; -- '123'`}
              </pre>
              <p className="mt-2 text-sm text-gray-700">
                <strong>LTRIM</strong> removes leading spaces/chars, <strong>RTRIM</strong> removes trailing, 
                <strong>TRIM</strong> removes both. Essential for cleaning user input and external data.
              </p>
            </div>

            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="font-bold text-purple-800">REPLACE/TRANSLATE</h3>
              <pre className="bg-white p-3 rounded text-sm mt-2">
                {`SELECT REPLACE('JACK AND JUE', 'J', 'BL') FROM DUAL; -- 'BLACK AND BLUE'
SELECT TRANSLATE('WELCOME', 'ABCDEF', 'WXYZ') FROM DUAL; -- 'WYLOM'`}
              </pre>
              <p className="mt-2 text-sm text-gray-700">
                <strong>REPLACE</strong> substitutes all occurrences of a substring. 
                <strong>TRANSLATE</strong> does character-by-character replacement (A→W, B→X, etc.). 
                TRANSLATE is useful for character substitution patterns.
              </p>
            </div>
          </div>
        </div>

        {/* Date Functions */}
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">5. Date Functions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-bold text-yellow-800">Current Date/Time</h3>
              <pre className="bg-white p-3 rounded text-sm mt-2">
                {`SELECT SYSDATE FROM DUAL; -- Current date
SELECT CURRENT_DATE FROM DUAL; -- Session date
SELECT SYSTIMESTAMP FROM DUAL; -- Timestamp with timezone`}
              </pre>
              <p className="mt-2 text-sm text-gray-700">
                <strong>SYSDATE</strong> returns database server date, <strong>CURRENT_DATE</strong> returns 
                session date (respects timezone), <strong>SYSTIMESTAMP</strong> includes fractional seconds 
                and timezone.
              </p>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-bold text-yellow-800">Date Arithmetic</h3>
              <pre className="bg-white p-3 rounded text-sm mt-2">
                {`SELECT SYSDATE + 3 FROM DUAL; -- Add 3 days
SELECT MONTHS_BETWEEN(date1, date2) FROM DUAL; -- Months between
SELECT LAST_DAY(SYSDATE) FROM DUAL; -- Last day of month`}
              </pre>
              <p className="mt-2 text-sm text-gray-700">
                Date arithmetic: Add/subtract days directly. <strong>MONTHS_BETWEEN</strong> calculates 
                months between dates. <strong>LAST_DAY</strong> returns last day of the month.
              </p>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-bold text-yellow-800">Date Formatting</h3>
              <pre className="bg-white p-3 rounded text-sm mt-2">
                {`SELECT TO_CHAR(SYSDATE, 'YYYY-MM-DD') FROM DUAL;
SELECT TO_CHAR(SYSDATE, 'DD-MON-YYYY HH24:MI:SS') FROM DUAL;
SELECT TO_CHAR(JOINING_DATE, 'Month') FROM STUDENTS;`}
              </pre>
              <p className="mt-2 text-sm text-gray-700">
                <strong>TO_CHAR</strong> converts dates to formatted strings. Common format elements: 
                YYYY (year), MM (month), DD (day), MON (abbreviated month), DAY (day name), 
                HH24 (24-hour), MI (minutes), SS (seconds).
              </p>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h3 className="font-bold text-yellow-800">Date Rounding/Truncation</h3>
              <pre className="bg-white p-3 rounded text-sm mt-2">
                {`SELECT ROUND(SYSDATE, 'MONTH') FROM DUAL; -- Round to month
SELECT TRUNC(SYSDATE, 'YEAR') FROM DUAL; -- Trunc to year
SELECT ROUND(TO_DATE('15-JUL-2023'), 'YEAR') FROM DUAL;`}
              </pre>
              <p className="mt-2 text-sm text-gray-700">
                <strong>ROUND</strong> rounds dates to specified unit (YEAR, MONTH, DAY). 
                <strong>TRUNC</strong> truncates (cuts off) to specified unit. Useful for grouping by time periods.
              </p>
            </div>
          </div>
        </div>

        {/* Number Functions */}
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">6. Number Functions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-red-50 p-4 rounded-lg">
              <h3 className="font-bold text-red-800">ROUND/TRUNC</h3>
              <pre className="bg-white p-3 rounded text-sm mt-2">
                {`SELECT ROUND(5435.7878, 2) FROM DUAL; -- 5435.79
SELECT TRUNC(5435.7878, 2) FROM DUAL; -- 5435.78
SELECT ROUND(5435.5) FROM DUAL; -- 5436`}
              </pre>
              <p className="mt-2 text-sm text-gray-700">
                <strong>ROUND</strong> rounds numbers to specified decimal places (default 0). 
                <strong>TRUNC</strong> truncates (cuts off) without rounding. Both accept negative 
                places (rounds left of decimal).
              </p>
            </div>

            <div className="bg-red-50 p-4 rounded-lg">
              <h3 className="font-bold text-red-800">CEIL/FLOOR</h3>
              <pre className="bg-white p-3 rounded text-sm mt-2">
                {`SELECT CEIL(5.1) FROM DUAL; -- 6
SELECT FLOOR(5.9) FROM DUAL; -- 5
SELECT CEIL(-5.1) FROM DUAL; -- -5`}
              </pre>
              <p className="mt-2 text-sm text-gray-700">
                <strong>CEIL</strong> returns smallest integer >= value (rounds up). 
                <strong>FLOOR</strong> returns largest integer <= value (rounds down). 
                Note behavior with negative numbers.
              </p>
            </div>

            <div className="bg-red-50 p-4 rounded-lg">
              <h3 className="font-bold text-red-800">MOD/ABS</h3>
              <pre className="bg-white p-3 rounded text-sm mt-2">
                {`SELECT MOD(55,4) FROM DUAL; -- 3 (remainder)
SELECT ABS(-354) FROM DUAL; -- 354
SELECT * FROM STUDENTS WHERE MOD(STUDENT_ID,2)=0; -- Even IDs`}
              </pre>
              <p className="mt-2 text-sm text-gray-700">
                <strong>MOD</strong> returns remainder after division. <strong>ABS</strong> returns 
                absolute value. MOD is useful for finding even/odd values or cyclic patterns.
              </p>
            </div>
          </div>
        </div>

        {/* NULL Handling */}
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">7. NULL Handling Functions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h3 className="font-bold text-indigo-800">NVL/NVL2</h3>
              <pre className="bg-white p-3 rounded text-sm mt-2">
                {`SELECT NVL(BONUS, 0) FROM STUDENTS; -- Replace NULL with 0
SELECT NVL2(BONUS, 'Has Bonus', 'No Bonus') FROM STUDENTS;`}
              </pre>
              <p className="mt-2 text-sm text-gray-700">
                <strong>NVL</strong> replaces NULL with specified value. <strong>NVL2</strong> returns 
                second arg if not NULL, third arg if NULL. Essential for calculations with possible NULLs.
              </p>
            </div>

            <div className="bg-indigo-50 p-4 rounded-lg">
              <h3 className="font-bold text-indigo-800">COALESCE</h3>
              <pre className="bg-white p-3 rounded text-sm mt-2">
                {`SELECT COALESCE(BONUS, MANAGER_ID, COORDINATOR_ID, 0) FROM STUDENTS;`}
              </pre>
              <p className="mt-2 text-sm text-gray-700">
                Returns first non-NULL expression in the list. More flexible than NVL as it handles 
                multiple fallback options. Stops evaluation at first non-NULL value.
              </p>
            </div>

            <div className="bg-indigo-50 p-4 rounded-lg">
              <h3 className="font-bold text-indigo-800">NULLIF</h3>
              <pre className="bg-white p-3 rounded text-sm mt-2">
                {`SELECT NULLIF(FIRST_NAME, LAST_NAME) FROM STUDENTS;`}
              </pre>
              <p className="mt-2 text-sm text-gray-700">
                Returns NULL if two expressions are equal, otherwise returns first expression. 
                Useful for finding matching values or preventing division by zero.
              </p>
            </div>
          </div>
        </div>

        {/* Conditional Logic */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">8. Conditional Logic</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-pink-50 p-4 rounded-lg">
              <h3 className="font-bold text-pink-800">DECODE</h3>
              <pre className="bg-white p-3 rounded text-sm mt-2">
                {`SELECT DECODE(SUBJECT_ID, 
              1, 'Mathematics',
              2, 'Physics',
              'Other') 
FROM STUDENTS;`}
              </pre>
              <p className="mt-2 text-sm text-gray-700">
                Oracle's version of simple CASE, compares expression to each search value. 
                Returns corresponding result. Final argument is default if no matches. 
                Limited to equality comparisons.
              </p>
            </div>

            <div className="bg-pink-50 p-4 rounded-lg">
              <h3 className="font-bold text-pink-800">CASE Expression</h3>
              <pre className="bg-white p-3 rounded text-sm mt-2">
                {`SELECT CASE 
         WHEN STIPEND < 5000 THEN 'Low'
         WHEN STIPEND < 15000 THEN 'Medium'
         ELSE 'High'
       END AS STIPEND_LEVEL
FROM STUDENTS;`}
              </pre>
              <p className="mt-2 text-sm text-gray-700">
                Flexible conditional logic. Evaluates conditions in order, returns result of first 
                true condition. ANSI standard (works in all SQL dialects). More powerful than DECODE.
              </p>
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