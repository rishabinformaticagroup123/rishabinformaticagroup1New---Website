import React from 'react';

const Page2 = () => {
  return (
    <div className="min-h-screen bg-white px-6 py-10">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-8">
        SQL Single Row Functions – Page 2<br />
        <span className="text-sm text-gray-500">by Rishab Informatica Group</span>
      </h1>

      {/* NULL Value Handling */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-2 text-green-700">NULL Handling Functions</h2>
        <p className="mb-2 text-gray-800">Arithmetic operations on NULL return NULL.</p>
        <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-auto">
{`VALUE * NULL ==> NULL
VALUE + NULL ==> NULL

-- NVL
SELECT NVL(5,6) FROM DUAL;       -- Output: 5
SELECT NVL(NULL,6) FROM DUAL;    -- Output: 6

-- Real case:
SELECT STUDENT_ID, STIPEND, BONUS, STIPEND + (STIPEND * NVL(BONUS, 0)) AS TOTAL_STIPEND 
FROM STUDENTS;

-- NVL2 (3 arguments)
SELECT NVL2(4, 8, 12) FROM DUAL;       -- Output: 8
SELECT NVL2(NULL, 8, 12) FROM DUAL;    -- Output: 12

-- NULLIF
SELECT NULLIF(5, 8) FROM DUAL;         -- Output: 5
SELECT NULLIF(8, 8) FROM DUAL;         -- Output: NULL

-- COALESCE
SELECT COALESCE(NULL, NULL, 100, 200) FROM DUAL; -- Output: 100
SELECT COALESCE(MOBILE_NO, OFFICE_NO, RESI_NO, 'NO_PHONE') FROM STUDENTS;
`}
        </pre>
      </section>

      {/* ROUND, TRUNC, CEIL, FLOOR */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-2 text-green-700">Number Rounding Functions</h2>
        <p className="mb-2 text-gray-800">Useful for mathematical rounding and date manipulations.</p>
        <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-auto">
{`-- ROUND
SELECT ROUND(5435.783258, 2) FROM DUAL; -- Output: 5435.78

-- TRUNC
SELECT TRUNC(5435.783258, 2) FROM DUAL; -- Output: 5435.78

-- CEIL and FLOOR
SELECT CEIL(5.1) FROM DUAL;   -- Output: 6
SELECT FLOOR(5.9) FROM DUAL;  -- Output: 5

-- MOD
SELECT MOD(55, 4) FROM DUAL;  -- Output: 3

-- Check Even Student IDs
SELECT * FROM STUDENTS WHERE MOD(STUDENT_ID, 2) = 0;
`}
        </pre>
      </section>

      {/* Date Math */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-2 text-green-700">Date Arithmetic</h2>
        <p className="mb-2 text-gray-800">Date difference and manipulation functions.</p>
        <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-auto">
{`-- Months Between
SELECT MONTHS_BETWEEN(TO_DATE('2020/01/01','YYYY/MM/DD'), TO_DATE('2010/01/01','YYYY/MM/DD')) 
FROM DUAL;

-- Days Between
SELECT TO_DATE('2017/01/01', 'YYYY/MM/DD') - TO_DATE('2014/01/01', 'YYYY/MM/DD') 
FROM DUAL;

-- Next Day
SELECT NEXT_DAY(SYSDATE, 'FRIDAY') FROM DUAL;

-- Last Day of Month
SELECT LAST_DAY(SYSDATE) FROM DUAL;

-- Add Months
SELECT ADD_MONTHS(SYSDATE, 6) FROM DUAL;
`}
        </pre>
      </section>

      <div className="text-center mt-10">
        <p className="text-gray-600 text-sm">
          Continue to <strong>Page 3</strong> for date rounding, formatting, and conditional logic using DECODE and CASE statements.
        </p>
      </div>
    </div>
  );
};

export default Page2;
