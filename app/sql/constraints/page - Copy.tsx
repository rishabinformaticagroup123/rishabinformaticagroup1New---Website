import React from 'react';
import Head from 'next/head';

const SqlConstraintsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <Head>
        <title>SQL Constraints - Interactive Learning</title>
      </Head>

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 p-6 text-white">
          <h1 className="text-3xl font-bold">SQL CONSTRAINTS DEMO</h1>
          <p className="mt-2">See how constraints control your database data</p>
        </div>

        {/* Table Relationship Explanation */}
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Parent-Child Table Relationship</h2>
          
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            {/* Parent Table */}
            <div className="flex-1">
              <h3 className="font-bold bg-green-100 p-2">PARENT TABLE: COURSE</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2 bg-yellow-100">PRIMARY KEY</th>
                      <th className="border p-2">COURSE_NAME</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="border p-2 bg-yellow-50">100</td><td className="border p-2">IICS_CLOUD</td></tr>
                    <tr><td className="border p-2 bg-yellow-50">200</td><td className="border p-2">IPS</td></tr>
                    <tr><td className="border p-2 bg-yellow-50">300</td><td className="border p-2">IICS_COMBO</td></tr>
                    <tr><td className="border p-2 bg-yellow-50">400</td><td className="border p-2">TALEND</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Child Table */}
            <div className="flex-1">
              <h3 className="font-bold bg-orange-100 p-2">CHILD TABLE: STUDENTS (with constraints)</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="border p-2 bg-yellow-100">PRIMARY KEY</th>
                      <th className="border p-2 bg-red-100">NOT NULL</th>
                      <th className="border p-2 bg-purple-100">UNIQUE</th>
                      <th className="border p-2 bg-blue-100">CHECK (AGE ≥ 19)</th>
                      <th className="border p-2 bg-green-100">FOREIGN KEY</th>
                    </tr>
                    <tr>
                      <th className="border p-2">STUD_ID</th>
                      <th className="border p-2">STUD_NAME</th>
                      <th className="border p-2">MOBILE_NO</th>
                      <th className="border p-2">AGE</th>
                      <th className="border p-2">COURSE_ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border p-2 bg-yellow-50">100</td>
                      <td className="border p-2 bg-red-50">NARESH</td>
                      <td className="border p-2 bg-purple-50">9191919191</td>
                      <td className="border p-2 bg-blue-50">25</td>
                      <td className="border p-2 bg-green-50">100</td>
                    </tr>
                    <tr>
                      <td className="border p-2 bg-yellow-50">101</td>
                      <td className="border p-2 bg-red-50">RISHAB</td>
                      <td className="border p-2 bg-purple-50">8080808080</td>
                      <td className="border p-2 bg-blue-50">27</td>
                      <td className="border p-2 bg-green-50">200</td>
                    </tr>
                    <tr>
                      <td className="border p-2 bg-yellow-50">102</td>
                      <td className="border p-2 bg-red-50">HARI</td>
                      <td className="border p-2 bg-purple-50">9060505750</td>
                      <td className="border p-2 bg-blue-50">49</td>
                      <td className="border p-2 bg-green-50">300</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="bg-yellow-100 p-4 rounded-lg mb-4">
            <p className="font-semibold">Key Concept: <span className="text-blue-700">Referential Integrity</span></p>
            <p>Before inserting into the child table (STUDENTS), the database checks if the COURSE_ID exists in the parent table (COURSE).</p>
            <p className="mt-2 font-semibold text-red-600">Example: COURSE_ID 700 would be rejected (not in parent table)</p>
          </div>
        </div>

        {/* Successful Inserts */}
        <div className="p-6 border-b bg-gray-50">
          <h2 className="text-xl font-bold text-green-700 mb-3">Successful INSERT Examples</h2>
          
          <div className="space-y-4">
            <div className="bg-white p-4 border border-green-200 rounded-lg">
              <pre className="text-sm bg-gray-100 p-2 rounded">
                {`INSERT INTO IT_STUDENTS
VALUES(1000, 'RISHAB', 9448005273, 20, 100);`}
              </pre>
              <p className="mt-1 text-sm text-green-600">✓ Success - All constraints satisfied</p>
            </div>

            <div className="bg-white p-4 border border-green-200 rounded-lg">
              <pre className="text-sm bg-gray-100 p-2 rounded">
                {`INSERT INTO IT_STUDENTS
VALUES(1001, 'HARI', 9448005278, 21, 100);`}
              </pre>
              <p className="mt-1 text-sm text-green-600">✓ Success - All constraints satisfied</p>
            </div>

            <div className="bg-white p-4 border border-green-200 rounded-lg">
              <pre className="text-sm bg-gray-100 p-2 rounded">
                {`INSERT INTO IT_STUDENTS
VALUES(1002, 'NARESH', 9448005279, 21, 100);`}
              </pre>
              <p className="mt-1 text-sm text-green-600">✓ Success - All constraints satisfied</p>
            </div>
          </div>
        </div>

        {/* Failed Inserts */}
        <div className="p-6">
          <h2 className="text-xl font-bold text-red-700 mb-3">Failed INSERT Examples (Constraint Violations)</h2>
          
          <div className="space-y-4">
            {/* Duplicate Primary Key */}
            <div className="bg-white p-4 border border-red-200 rounded-lg">
              <pre className="text-sm bg-gray-100 p-2 rounded">
                {`INSERT INTO IT_STUDENTS
VALUES(1002, 'GOPI', 8989898989, 24, 100);`}
              </pre>
              <div className="mt-1 p-2 bg-red-50 rounded">
                <p className="text-red-600 font-mono text-sm">ORA-00001: unique constraint violated (PRIMARY KEY)</p>
                <p className="text-sm">❌ Error: STUD_ID 1002 already exists (must be unique)</p>
              </div>
            </div>

            {/* NULL in NOT NULL column */}
            <div className="bg-white p-4 border border-red-200 rounded-lg">
              <pre className="text-sm bg-gray-100 p-2 rounded">
                {`INSERT INTO IT_STUDENTS
VALUES(1003, NULL, 8989898981, 24, 200);`}
              </pre>
              <div className="mt-1 p-2 bg-red-50 rounded">
                <p className="text-red-600 font-mono text-sm">ORA-01400: cannot insert NULL into ("HR"."IT_STUDENTS"."STUD_NAME")</p>
                <p className="text-sm">❌ Error: STUD_NAME cannot be NULL</p>
              </div>
            </div>

            {/* Duplicate Unique value */}
            <div className="bg-white p-4 border border-red-200 rounded-lg">
              <pre className="text-sm bg-gray-100 p-2 rounded">
                {`INSERT INTO IT_STUDENTS
VALUES(1003, 'GOPI', 8989898989, 24, 200);`}
              </pre>
              <div className="mt-1 p-2 bg-red-50 rounded">
                <p className="text-red-600 font-mono text-sm">ORA-00001: unique constraint violated (MOBILE_NO must be unique)</p>
                <p className="text-sm">❌ Error: Mobile number 8989898989 already exists</p>
              </div>
            </div>

            {/* Check constraint violation */}
            <div className="bg-white p-4 border border-red-200 rounded-lg">
              <pre className="text-sm bg-gray-100 p-2 rounded">
                {`INSERT INTO IT_STUDENTS
VALUES(1003, 'GOPI', 8989898981, 17, 200);`}
              </pre>
              <div className="mt-1 p-2 bg-red-50 rounded">
                <p className="text-red-600 font-mono text-sm">ORA-02290: check constraint violated (AGE must be ≥ 19)</p>
                <p className="text-sm">❌ Error: Age 17 is less than minimum required (19)</p>
              </div>
            </div>

            {/* Invalid mobile length */}
            <div className="bg-white p-4 border border-red-200 rounded-lg">
              <pre className="text-sm bg-gray-100 p-2 rounded">
                {`INSERT INTO IT_STUDENTS
VALUES(1003, 'GOPI', 89898989, 24, 200);`}
              </pre>
              <div className="mt-1 p-2 bg-red-50 rounded">
                <p className="text-red-600 font-mono text-sm">ORA-02290: check constraint violated (MOBILE_NO must be 10 digits)</p>
                <p className="text-sm">❌ Error: Mobile number must be exactly 10 digits</p>
              </div>
            </div>

            {/* Foreign key violation */}
            <div className="bg-white p-4 border border-red-200 rounded-lg">
              <pre className="text-sm bg-gray-100 p-2 rounded">
                {`INSERT INTO IT_STUDENTS
VALUES(1003, 'GOPI', 8989898981, 24, 700);`}
              </pre>
              <div className="mt-1 p-2 bg-red-50 rounded">
                <p className="text-red-600 font-mono text-sm">ORA-02291: integrity constraint violated - parent key not found</p>
                <p className="text-sm">❌ Error: COURSE_ID 700 doesn't exist in COURSE table</p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-gray-100 p-6">
          <h3 className="text-lg font-bold mb-3">Constraint Summary</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="font-semibold">PRIMARY KEY</span> - Unique identifier (no duplicates, no NULL)</li>
            <li><span className="font-semibold">NOT NULL</span> - Value must be provided</li>
            <li><span className="font-semibold">UNIQUE</span> - No duplicate values (but NULL allowed)</li>
            <li><span className="font-semibold">CHECK</span> - Value must meet condition (age ≥ 19, mobile=10 digits)</li>
            <li><span className="font-semibold">FOREIGN KEY</span> - Value must exist in parent table</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SqlConstraintsPage;