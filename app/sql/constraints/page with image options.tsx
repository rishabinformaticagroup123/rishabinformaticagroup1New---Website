import React from 'react';
import Head from 'next/head';
import Image from 'next/image';

const SqlConstraintsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <Head>
        <title>SQL Constraints - Interactive Learning</title>
        <meta name="description" content="Learn SQL Constraints with interactive examples" />
      </Head>

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 p-6 text-white">
          <h1 className="text-3xl font-bold">SQL CONSTRAINTS</h1>
          <p className="mt-2">Rules that control what kind of data can be stored in a table</p>
        </div>

        {/* Intro Section */}
        <div className="p-6 border-b">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-4 md:mb-0">
              <p className="text-gray-700 mb-4">
                Constraints help make sure your database data is correct, complete, and doesn't cause problems.
              </p>
              <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4">
                <p className="text-yellow-700 font-semibold">
                  Think of it like traffic rules - they keep your database clean and safe by preventing wrong or incomplete data.
                </p>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="bg-gray-200 p-2 rounded-lg w-64 h-32 flex items-center justify-center">
                <span className="text-gray-500">[Traffic Rules Analogy Image]</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
          <h2 className="text-2xl font-bold text-blue-700 mb-6">CONSTRAINTS IN SQL</h2>
          <p className="mb-6 font-semibold">IT WILL ALLOW VALUES AFTER VALIDATION ONLY</p>

          {/* Constraints Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Primary Key */}
            <div className="border border-blue-200 rounded-lg p-4 bg-blue-50">
              <h3 className="text-xl font-bold text-blue-800 mb-2">PRIMARY KEY</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Should not allow duplicate records</li>
                <li>Should not allow NULL values</li>
                <li>Only one primary key per table</li>
              </ul>
              <div className="mt-4">
                <h4 className="font-semibold text-blue-700">Examples:</h4>
                <div className="bg-white p-2 rounded text-sm">
                  <p>STUDENTS TABLE - STUD_ID</p>
                  <p>CUSTOMER TABLE - CUST_ID</p>
                  <p>USER TABLE - USER_ID</p>
                  <p>PRODUCT TABLE - PROD_ID</p>
                </div>
              </div>
              <div className="mt-4 bg-gray-100 p-2 rounded">
                <div className="flex justify-center">
                  <div className="bg-white p-1 rounded w-full h-24 flex items-center justify-center">
                    <span className="text-gray-500 text-sm">[Excel showing primary key violation]</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Not Null */}
            <div className="border border-green-200 rounded-lg p-4 bg-green-50">
              <h3 className="text-xl font-bold text-green-800 mb-2">NOT NULL KEY</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Should not allow NULL values</li>
                <li>Should allow duplicate values</li>
              </ul>
              <div className="mt-4">
                <h4 className="font-semibold text-green-700">Examples:</h4>
                <div className="bg-white p-2 rounded text-sm">
                  <p>FIRST_NAME, LAST_NAME (same names allowed for different customers)</p>
                </div>
              </div>
            </div>

            {/* Unique Key */}
            <div className="border border-purple-200 rounded-lg p-4 bg-purple-50">
              <h3 className="text-xl font-bold text-purple-800 mb-2">UNIQUE KEY</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Should not allow duplicate values</li>
                <li>Should allow NULL values</li>
              </ul>
              <div className="mt-4">
                <h4 className="font-semibold text-purple-700">Examples:</h4>
                <div className="bg-white p-2 rounded text-sm">
                  <p>MOBILE_NO (cannot be duplicate for 2 customers)</p>
                </div>
              </div>
            </div>

            {/* Check Key */}
            <div className="border border-red-200 rounded-lg p-4 bg-red-50">
              <h3 className="text-xl font-bold text-red-800 mb-2">CHECK KEY</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-700">
                <li>Validates data against a condition</li>
              </ul>
              <div className="mt-4">
                <h4 className="font-semibold text-red-700">Examples:</h4>
                <div className="bg-white p-2 rounded text-sm">
                  <p>AGE (&gt; 18) or (&gt; 60)</p>
                  <p>PHONE_NUMBER (LENGTH = 10)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Foreign Key Section */}
          <div className="border border-orange-200 rounded-lg p-6 bg-orange-50 mb-8">
            <h3 className="text-xl font-bold text-orange-800 mb-2">FOREIGN KEY</h3>
            <ul className="list-disc pl-5 space-y-1 text-gray-700 mb-4">
              <li>Creates a relationship between two tables</li>
              <li>Must be a primary key in the referenced table</li>
              <li>Multiple foreign keys allowed per table</li>
              <li>Accepts duplicate values</li>
            </ul>
            <div className="bg-white p-4 rounded">
              <h4 className="font-semibold text-orange-700 mb-2">Example Syntax:</h4>
              <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                {`FOREIGN KEY (COURSE_ID) REFERENCES COURSES(COURSE_ID)`}
              </pre>
              <p className="mt-2 text-sm text-gray-600">Error when violated: "INTEGRITY CONSTRAINTS VIOLATED"</p>
            </div>
            <div className="mt-4">
              <div className="flex justify-center">
                <div className="bg-white p-2 rounded w-full h-32 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">[Relationship diagram between tables]</span>
                </div>
              </div>
            </div>
          </div>

          {/* Important Note */}
          <div className="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-8">
            <p className="text-yellow-800 font-semibold">
              NOTE: Any number of foreign keys can be given for a table but only one primary key per table.
            </p>
          </div>

          {/* Practical Examples */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-blue-700 mb-4">CREATE TABLE WITH CONSTRAINTS</h3>
            <div className="bg-gray-100 p-4 rounded-lg">
              <pre className="bg-white p-3 rounded text-sm overflow-x-auto">
                {`CREATE TABLE IT_STUDENTS
(
  STUD_ID NUMBER(6) PRIMARY KEY,
  STUD_NAME VARCHAR2(30) NOT NULL,
  MOBILE_NO NUMBER(10) UNIQUE CHECK(LENGTH(MOBILE_NO)=10),
  AGE NUMBER(3) CHECK (AGE >= 19),
  COURSE_ID NUMBER(4)
);`}
              </pre>
            </div>
          </div>

          {/* Insert Examples */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-blue-700 mb-4">INSERT EXAMPLES WITH ERRORS</h3>
            <div className="space-y-4">
              <div className="border border-red-200 bg-red-50 p-4 rounded-lg">
                <pre className="text-sm">{`INSERT INTO IT_STUDENTS
VALUES(1001, 'HARI', 9448005273, 21, 100);`}</pre>
                <p className="mt-2 text-red-600 font-mono text-sm">ORA-00001: unique constraint (HR.SYS_C008808) violated</p>
                <p className="mt-1 text-gray-600 text-sm">Error: Duplicate mobile number (violates UNIQUE constraint)</p>
              </div>
              <div className="border border-red-200 bg-red-50 p-4 rounded-lg">
                <pre className="text-sm">{`INSERT INTO IT_STUDENTS
VALUES(1002, 'KRISHNA', 8970853557, 17, 100);`}</pre>
                <p className="mt-2 text-red-600 font-mono text-sm">ORA-02290: check constraint (HR.SYS_C008806) violated</p>
                <p className="mt-1 text-gray-600 text-sm">Error: Age less than 19 (violates CHECK constraint)</p>
              </div>
            </div>
          </div>

          {/* Table Relationship Example */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-blue-700 mb-4">TABLE RELATIONSHIP EXAMPLE</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-100 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">COURSE TABLE</h4>
                <pre className="bg-white p-3 rounded text-sm overflow-x-auto">
                  {`CREATE TABLE COURSE
(
  COURSE_ID NUMBER(4) PRIMARY KEY,
  COURSE_NAME VARCHAR2(30)
);

INSERT INTO COURSE VALUES (100,'IICS_CLOUD');
INSERT INTO COURSE VALUES (200,'IPS');
INSERT INTO COURSE VALUES (300,'IICS_COMBO');
INSERT INTO COURSE VALUES (400,'TALEND');`}
                </pre>
              </div>
              <div className="bg-gray-100 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">IT_STUDENTS TABLE</h4>
                <pre className="bg-white p-3 rounded text-sm overflow-x-auto">
                  {`CREATE TABLE IT_STUDENTS
(
  STUD_ID NUMBER(6) PRIMARY KEY,
  STUD_NAME VARCHAR2(30) NOT NULL,
  MOBILE_NO NUMBER(10) UNIQUE CHECK(LENGTH(MOBILE_NO)=10),
  AGE NUMBER(3) CHECK (AGE >= 19),
  COURSE_ID NUMBER(4) REFERENCES COURSE(COURSE_ID)
);`}
                </pre>
              </div>
            </div>
            <div className="mt-4 flex justify-center">
              <div className="bg-white p-2 rounded w-full h-32 flex items-center justify-center">
                <span className="text-gray-500 text-sm">[Visual diagram of table relationship]</span>
              </div>
            </div>
          </div>

          {/* Viewing Constraints */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold text-blue-800 mb-4">VIEWING CONSTRAINTS IN DATABASE</h3>
            <div className="bg-white p-4 rounded-lg">
              <pre className="bg-gray-100 p-3 rounded text-sm overflow-x-auto">
                {`-- To see all constraints for a table
SELECT * FROM ALL_CONS_COLUMNS 
WHERE OWNER='HR' AND TABLE_NAME='IT_STUDENTS';

-- To see all constraints in the database
SELECT * FROM ALL_CONSTRAINTS;`}
              </pre>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-100 p-6 text-center">
          <p className="text-gray-700">For more information:</p>
          <p className="font-semibold text-blue-600 mt-1">CALL/WHATSAPP - 8970853557 / 9448005273</p>
          <p className="text-gray-600 mt-2">INFORMATICA IICS COMBO ONLINE TRAINING - IICS COMBO BATCH - 11</p>
        </div>
      </div>
    </div>
  );
};

export default SqlConstraintsPage;