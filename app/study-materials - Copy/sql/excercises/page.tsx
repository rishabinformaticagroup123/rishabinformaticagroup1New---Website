// SQLPage.tsx
"use client"; // This directive marks the component as a client component

import React, { useState } from 'react';

// Define a type for a single SQL exercise question
interface SqlQuestion {
  id: string;
  title: string;
  description: string;
  codeSnippet?: string; // Optional: for questions that provide initial code
  expectedOutput?: string; // Optional: for verification (would be handled by a backend)
}

// Define the exercises based on the provided document
const sqlExercises: SqlQuestion[] = [
  {
    id: 'q1',
    title: 'Question 1: Student Table Operations',
    description: `
      Perform the following operations on a 'STUDENT' table:
      1. Create a table named 'STUDENT' with the following columns:
         - StudID (NUMBER)
         - StudentName (VARCHAR)
         - JoiningDate (DATE)
         - Specialization (VARCHAR)
         - Stipend (NUMBER)
         - Coordinator_id (NUMBER)
      2. Insert some sample data into the 'STUDENT' table.
      3. Add a column named 'MANAGER_ID' to the table.
      4. Drop the column 'SPECIALIZATION' from the table.
      5. Change the column length of 'StudID' from NUMBER(10) to NUMBER(12).
      6. Change the table name from 'STUDENT' to 'STUDENT_DETAILS'.
      7. Change the column name of 'StudID' to 'STUDENT_ID'.
    `,
    codeSnippet: `
-- Example for creating the table
CREATE TABLE STUDENT (
    StudID NUMBER(10),
    StudentName VARCHAR2(100),
    JoiningDate DATE,
    Specialization VARCHAR2(50),
    Stipend NUMBER(10, 2),
    Coordinator_id NUMBER(10)
);

-- Example for inserting data
INSERT INTO STUDENT (StudID, StudentName, JoiningDate, Specialization, Stipend, Coordinator_id)
VALUES (1, 'Alice Smith', TO_DATE('2023-01-15', 'YYYY-MM-DD'), 'Computer Science', 2500.00, 101);
    `,
  },
  {
    id: 'q2',
    title: 'Question 2: Patient, Physician, Admission, and Room Tables',
    description: `
      Create the following tables and insert some sample records for each:

      <strong>PATIENT Table Structure:</strong>
      - PATIENT_ID (NUMBER, NOT NULL, Primary Key)
      - LAST_NAME (VARCHAR2(30), NOT NULL)
      - FIRST_NAME (VARCHAR2(25), NOT NULL)
      - DOB (DATE)
      - INS_CODE (NUMBER)

      <strong>PHYSICIAN Table Structure:</strong>
      - PHYSICIAN_ID (NUMBER, NOT NULL, Primary Key)
      - LAST_NAME (VARCHAR2(30), NOT NULL)
      - FIRST_NAME (VARCHAR2(25), NOT NULL)
      - LICENSE_NO (NUMBER(7), NOT NULL)
      - HIRE_DATE (DATE)

      <strong>ADMISSION Table Structure:</strong>
      - ADMISSION_ID (NUMBER, NOT NULL, Primary Key)
      - PATIENT_ID (NUMBER, NOT NULL, References PATIENT_ID of PATIENT table)
      - PHYSICIAN_ID (NUMBER, NOT NULL, References PHYSICIAN_ID of PHYSICIAN table)
      - ADMIT_DATE (DATE)
      - DISCHG_DATE (DATE)
      - ROOM_ID (NUMBER, Foreign key to ROOM_ID of ROOM table)

      <strong>ROOM Table Structure:</strong>
      - room_id (PK)
      - room_name
      - building_name
      - incharge
    `,
  },
  {
    id: 'q3',
    title: 'Question 3: Advanced Table Modifications and Data Manipulation',
    description: `
      Perform the following operations:
      1. Add a column 'MOBILE_NO' to the 'PATIENT' table and make it a UNIQUE KEY.
      2. Update the mobile number for all patients in the 'PATIENT' table.
      3. Add a column 'QUALIFICATION' to the 'PHYSICIAN' table and make it a NOT NULL column.
      4. Update the qualification for all physicians in the 'PHYSICIAN' table.
      5. Drop the 'LAST_NAME' column from the 'PHYSICIAN' table.
      6. Delete only the patients who were born after the year 2000 from the 'PATIENT' table.
      7. Rename the 'DOB' column to 'DATE_OF_BIRTH' on both 'PATIENT' and 'ADMISSION' tables.
      8. Create a backup table 'PATIENT_BKP' and 'PHYSICIAN_BKP' including data.
      9. Create a backup table 'PATIENT_BKP_1' and 'PHYSICIAN_BKP_1' without data (only structure).
      10. Rename the 'ADMISSION' table to 'PATIENT_ADMISSION'.
    `,
  },
];

const SQLPage: React.FC = () => {
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);
  const [userQuery, setUserQuery] = useState<string>('');
  const [queryResult, setQueryResult] = useState<string>('');
  const [showInstallationGuide, setShowInstallationGuide] = useState<boolean>(false);

  const handleExecuteQuery = () => {
    setShowInstallationGuide(false); // Hide installation guide if SQL query is executed
    if (userQuery.trim() === '') {
      setQueryResult('Please enter a SQL query.');
      return;
    }

    const normalizedQuery = userQuery.trim().toUpperCase();

    // Simulate specific query results
    if (normalizedQuery.includes('SELECT * FROM STUDENTS') || normalizedQuery.includes('SELECT * FROM STUDENT_DETAILS')) {
      setQueryResult(`
Simulating execution for:
${userQuery}

--- Query Result ---
StudID | StudentName    | JoiningDate | Stipend   | Coordinator_id | MANAGER_ID
-------|----------------|-------------|-----------|----------------|-----------
1      | Alice Smith    | 2023-01-15  | 2500.00   | 101            | NULL
2      | Bob Johnson    | 2022-09-01  | 2800.00   | 102            | 101
3      | Carol White    | 2024-03-20  | 2200.00   | 101            | 102
4      | David Brown    | 2023-11-05  | 3000.00   | 103            | 101
(This is a simulated output)
      `);
    } else if (normalizedQuery.includes('CREATE TABLE STUDENT')) {
      setQueryResult(`
Simulating execution for:
${userQuery}

--- Query Result ---
Table 'STUDENT' created successfully.
(This is a simulated output)
      `);
    }
    // Add more specific simulated responses for other queries if needed
    else {
      setQueryResult(`Simulating execution for:\n${userQuery}\n\n(Results would appear here from a database)`);
    }
  };

  const handleShowInstallationGuide = () => {
    setShowInstallationGuide(true);
    setActiveQuestionId(null); // Deselect any active SQL question
    setQueryResult(''); // Clear any previous SQL query results
    setUserQuery(''); // Clear user query
  };

  // Content for the Oracle 11g installation guide, including the embedded YouTube video and PDF link
  const installationContent = `
    <h3 class="text-xl font-semibold text-gray-800 mb-2">Oracle 11g Installation Guide</h3>
    <p class="mb-4 text-gray-700">
      To practice SQL with a real database, you can install Oracle 11g on your local machine.
      Watch the detailed video tutorial below to guide you through the installation process.
    </p>
    <div class="relative w-full overflow-hidden rounded-lg shadow-lg mb-4" style="padding-top: 56.25%;">
      <iframe
        class="absolute top-0 left-0 w-full h-full"
        src="https://www.youtube.com/embed/VK1DK6fs5YY"
        title="YouTube video player - Oracle 11g Installation"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    </div>
    <p class="mt-4 text-gray-700">
      For a step-by-step written guide and software download links, you can download the PDF below:
    </p>
    <a href="/syllabus/oracle11g.pdf" download="Oracle_11g_Installation_Guide.pdf"
       class="inline-flex items-center bg-blue-600 text-white py-2 px-4 rounded-lg font-bold text-md
              hover:bg-blue-700 transition-all duration-300 ease-in-out shadow-md hover:shadow-lg
              focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-75 mt-4">
      <i class="fas fa-file-pdf mr-2"></i> Download PDF Guide (with software download links)
    </a>
    <p class="mt-4 text-gray-700">
      After installation, you can use SQL Developer or SQL*Plus to connect to your Oracle database and practice the exercises.
    </p>
  `;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 font-sans text-gray-800 p-6 sm:p-8 md:p-12">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
      {/* Font Awesome for icons */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" xintegrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0V4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA==" crossOrigin="anonymous" referrerPolicy="no-referrer" />


      <header className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-800 mb-2 drop-shadow-lg">
          SQL Exercises for All Levels
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
          Prepared by <span className="font-semibold text-blue-700">Rishab Informatica Group</span>
        </p>
        <p className="text-md text-gray-700 max-w-2xl mx-auto">
          Practice your SQL skills from basic table operations to advanced data manipulation.
          Select a question to get started!
        </p>
      </header>

      <main className="max-w-6xl mx-auto bg-white rounded-xl shadow-2xl p-6 sm:p-8 border border-blue-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Panel: Questions List */}
          <aside className="md:col-span-1 bg-blue-50 rounded-lg p-6 shadow-md border border-blue-100">
            <h2 className="text-2xl font-bold text-blue-700 mb-6 border-b-2 border-blue-300 pb-3">
              SQL Questions
            </h2>
            <nav>
              <ul className="space-y-4">
                {sqlExercises.map((exercise) => (
                  <li key={exercise.id}>
                    <button
                      onClick={() => {
                        setActiveQuestionId(exercise.id);
                        setShowInstallationGuide(false); // Hide installation guide when selecting a question
                        setQueryResult(''); // Clear previous results
                        setUserQuery(''); // Clear user query
                      }}
                      className={`
                        w-full text-left p-4 rounded-lg transition-all duration-300 ease-in-out
                        font-medium text-lg
                        ${activeQuestionId === exercise.id
                          ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                          : 'bg-white text-blue-700 hover:bg-blue-100 hover:text-blue-800 shadow-sm'
                        }
                        focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-75
                      `}
                    >
                      {exercise.title}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-8 pt-6 border-t-2 border-blue-300">
              <h2 className="text-2xl font-bold text-blue-700 mb-4">Resources</h2>
              <button
                onClick={handleShowInstallationGuide}
                className={`
                  w-full text-left p-4 rounded-lg transition-all duration-300 ease-in-out mb-4
                  font-medium text-lg flex items-center justify-center
                  ${showInstallationGuide
                    ? 'bg-purple-600 text-white shadow-lg transform scale-105'
                    : 'bg-white text-purple-700 hover:bg-purple-100 hover:text-purple-800 shadow-sm'
                  }
                  focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-opacity-75
                `}
              >
                <i className="fas fa-download mr-2"></i> Install Oracle 11g
              </button>
            </div>
          </aside>

          {/* Right Panel: Question Details and Editor / Installation Guide */}
          <section className="md:col-span-2 bg-white rounded-lg p-6 shadow-md border border-gray-200">
            {showInstallationGuide ? (
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                {/* Using dangerouslySetInnerHTML to render HTML content for the installation guide */}
                <div dangerouslySetInnerHTML={{ __html: installationContent }}></div>
              </div>
            ) : (
              activeQuestionId ? (
                <>
                  {sqlExercises.map((exercise) => (
                    exercise.id === activeQuestionId && (
                      <div key={exercise.id}>
                        <h2 className="text-3xl font-bold text-purple-700 mb-4 border-b-2 border-purple-300 pb-3">
                          {exercise.title}
                        </h2>
                        <div className="prose max-w-none mb-6 text-gray-700 leading-relaxed">
                          {/* Using dangerouslySetInnerHTML to render HTML from the description string */}
                          <p className="whitespace-pre-wrap" dangerouslySetInnerHTML={{ __html: exercise.description.trim() }}></p>
                        </div>

                        {exercise.codeSnippet && (
                          <div className="mb-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Starter Code (Optional):</h3>
                            <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto border border-gray-300 shadow-inner">
                              <code className="language-sql text-gray-900">{exercise.codeSnippet.trim()}</code>
                            </pre>
                          </div>
                        )}

                        <div className="mb-6">
                          <h3 className="text-xl font-semibold text-gray-800 mb-2">Your SQL Query:</h3>
                          <textarea
                            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200 resize-y min-h-[150px] font-mono text-sm"
                            placeholder="Write your SQL query here..."
                            value={userQuery}
                            onChange={(e) => setUserQuery(e.target.value)}
                          ></textarea>
                        </div>

                        <button
                          onClick={handleExecuteQuery}
                          className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-bold text-lg
                                     hover:bg-purple-700 transition-all duration-300 ease-in-out
                                     shadow-lg hover:shadow-xl transform hover:-translate-y-1
                                     focus:outline-none focus:ring-4 focus:ring-purple-300 focus:ring-opacity-75"
                        >
                          Execute Query (Simulated)
                        </button>

                        {queryResult && (
                          <div className="mt-8">
                            <h3 className="text-xl font-semibold text-gray-800 mb-2">Query Result:</h3>
                            <pre className="bg-gray-50 p-4 rounded-lg text-sm overflow-x-auto border border-gray-300 shadow-inner">
                              <code className="language-text text-gray-900">{queryResult}</code>
                            </pre>
                          </div>
                        )}
                      </div>
                    )
                  ))}
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center text-gray-500">
                  <svg
                    className="w-24 h-24 text-blue-400 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    ></path>
                  </svg>
                  <p className="text-xl">Select a question from the left panel to begin your SQL practice!</p>
                </div>
              )
            )}
          </section>
        </div>
      </main>

      <footer className="text-center mt-10 text-gray-600 text-sm">
        <p className="text-md text-gray-700 max-w-2xl mx-auto mb-2">
          Join our Informatica IICS COMBO Training and read our blog: {" "}
          <a
            href="https://www.rishabinformaticagroup.com/blogs/how-to-get-it-job-in-45days"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-700 hover:underline font-bold"
          >
            How to get software job in 45 days
          </a>
        </p>
        <p className="text-md text-gray-700 max-w-2xl mx-auto mb-4">
          Enroll in Informatica IICS COMBO Online live training: {" "}
          <a
            href="https://www.rishabinformaticagroup.com/courses/iics-combo-live"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-700 hover:underline font-bold"
          >
            Enroll Now
          </a>
          <br />
          Call / WhatsApp: <span className="font-bold">8970853557 / 9448005273</span>
        </p>
        <p>&copy; 2025 SQL Exercises. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default SQLPage;
