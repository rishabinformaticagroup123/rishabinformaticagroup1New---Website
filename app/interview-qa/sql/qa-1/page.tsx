// app/practice/sql/part1/page.tsx
"use client";

import { useState } from "react";
import { Database, Search, Copy, Check, Filter, ArrowRight, Book, Terminal } from "lucide-react";

const SQLPart1Page = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // SQL Q&A Data - Part 1 (25 questions)
  const sqlQnA = [
    {
      id: 1,
      question: "Display the details of all employees",
      answer: "SELECT * FROM employees;",
      explanation: "The asterisk (*) selects all columns from the employees table."
    },
    {
      id: 2,
      question: "Display the department information from department table",
      answer: "SELECT * FROM departments;",
      explanation: "Retrieves all columns and rows from the departments table."
    },
    {
      id: 3,
      question: "Display the name and job for all the employees",
      answer: "SELECT first_name, last_name, job_id FROM employees;",
      explanation: "Selects specific columns: first_name, last_name, and job_id."
    },
    {
      id: 4,
      question: "Display the name and salary for all the employees",
      answer: "SELECT first_name, last_name, salary FROM employees;",
      explanation: "Shows employee names along with their salaries."
    },
    {
      id: 5,
      question: "Display the employee no and total salary for all the employees",
      answer: "SELECT employee_id, salary FROM employees;",
      explanation: "Displays employee ID and their salary."
    },
    {
      id: 6,
      question: "Display the employee name and annual salary for all employees",
      answer: "SELECT first_name, last_name, salary * 12 AS annual_salary FROM employees;",
      explanation: "Calculates annual salary by multiplying monthly salary by 12."
    },
    {
      id: 7,
      question: "Display the names of all the employees who are working in department number 10",
      answer: "SELECT first_name, last_name FROM employees WHERE department_id = 10;",
      explanation: "WHERE clause filters employees by department ID 10."
    },
    {
      id: 8,
      question: "Display the names of all the employees who are working as clerks and drawing a salary more than 3000",
      answer: "SELECT first_name, last_name FROM employees WHERE job_id IN ('ST_CLERK', 'PU_CLERK', 'SH_CLERK') AND salary > 3000;",
      explanation: "Combines two conditions using AND operator."
    },
    {
      id: 9,
      question: "Display the employee number and name who are earning commission",
      answer: "SELECT employee_id, first_name, last_name FROM employees WHERE commission_pct IS NOT NULL;",
      explanation: "IS NOT NULL checks for non-null commission values."
    },
    {
      id: 10,
      question: "Display the employee number and name who do not earn any commission",
      answer: "SELECT employee_id, first_name, last_name FROM employees WHERE commission_pct IS NULL;",
      explanation: "IS NULL checks for null commission values."
    },
    {
      id: 11,
      question: "Display the names of employees who are working as clerks, salesman or analyst and drawing a salary more than 3000",
      answer: "SELECT first_name, last_name FROM employees WHERE job_id IN ('ST_CLERK', 'PU_CLERK', 'SH_CLERK', 'SA_REP', 'SA_MAN') AND salary > 3000;",
      explanation: "IN operator checks for multiple job IDs."
    },
    {
      id: 12,
      question: "Display the names of the employees who are working in the company for the past 5 years",
      answer: "SELECT first_name, last_name FROM employees WHERE MONTHS_BETWEEN(SYSDATE, hire_date) >= 60;",
      explanation: "MONTHS_BETWEEN calculates months between current date and hire date."
    },
    {
      id: 13,
      question: "Display the list of employees who have joined the company before 30-JUN-90 or after 31-DEC-90",
      answer: "SELECT first_name, last_name FROM employees WHERE hire_date < TO_DATE('30-JUN-1990', 'DD-MON-YYYY') OR hire_date > TO_DATE('31-DEC-1990', 'DD-MON-YYYY');",
      explanation: "OR operator combines two date conditions."
    },
    {
      id: 14,
      question: "Display current Date",
      answer: "SELECT SYSDATE FROM dual;",
      explanation: "SYSDATE returns current date and time. DUAL is a dummy table."
    },
    {
      id: 15,
      question: "Display the list of all users in your database (use catalog table)",
      answer: "SELECT username FROM all_users;",
      explanation: "ALL_USERS is a system view containing all database users."
    },
    {
      id: 16,
      question: "Display the names of all tables from current user",
      answer: "SELECT table_name FROM user_tables;",
      explanation: "USER_TABLES shows tables owned by the current user."
    },
    {
      id: 17,
      question: "Display the name of the current user",
      answer: "SELECT USER FROM dual;",
      explanation: "USER pseudocolumn returns the current database user."
    },
    {
      id: 18,
      question: "Display the names of employees working in department number 10 or 20 or 40 or employees working as CLERKS, SALESMAN or ANALYST",
      answer: "SELECT first_name, last_name FROM employees WHERE department_id IN (10, 20, 40) OR job_id IN ('ST_CLERK', 'PU_CLERK', 'SH_CLERK', 'SA_REP', 'SA_MAN');",
      explanation: "Combines IN operators with OR condition."
    },
    {
      id: 19,
      question: "Display the names of employees whose name starts with alphabet S",
      answer: "SELECT first_name, last_name FROM employees WHERE first_name LIKE 'S%' OR last_name LIKE 'S%';",
      explanation: "LIKE with % wildcard matches any characters after 'S'."
    },
    {
      id: 20,
      question: "Display the Employee names for employees whose name ends with alphabet S",
      answer: "SELECT first_name, last_name FROM employees WHERE first_name LIKE '%S' OR last_name LIKE '%S';",
      explanation: "LIKE with % wildcard matches any characters before 'S'."
    },
    {
      id: 21,
      question: "Display the names of employees whose names have second alphabet A in their names",
      answer: "SELECT first_name, last_name FROM employees WHERE UPPER(first_name) LIKE '_A%' OR UPPER(last_name) LIKE '_A%';",
      explanation: "_ matches exactly one character, % matches any number of characters."
    },
    {
      id: 22,
      question: "Select the names of the employee whose names is exactly five characters in length",
      answer: "SELECT first_name, last_name FROM employees WHERE LENGTH(first_name) = 5 OR LENGTH(last_name) = 5;",
      explanation: "LENGTH function returns the number of characters in a string."
    },
    {
      id: 23,
      question: "Display the names of the employee who are not working as MANAGERS",
      answer: "SELECT first_name, last_name FROM employees WHERE job_id NOT LIKE '%MAN%';",
      explanation: "NOT LIKE excludes rows matching the pattern."
    },
    {
      id: 24,
      question: "Display the names of the employee who are not working as SALESMAN OR CLERK OR ANALYST",
      answer: "SELECT first_name, last_name FROM employees WHERE job_id NOT IN ('ST_CLERK', 'PU_CLERK', 'SH_CLERK', 'SA_REP', 'SA_MAN');",
      explanation: "NOT IN excludes multiple job types."
    },
    {
      id: 25,
      question: "Display all rows from EMP table. The system should wait after every screen full of information",
      answer: "SET PAGESIZE 20;\nSELECT * FROM employees;",
      explanation: "SET PAGESIZE controls how many rows display before pausing."
    }
  ];

  const filteredQnA = sqlQnA.filter(item =>
    item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Database className="w-10 h-10 text-blue-600" />
            <h1 className="text-4xl font-bold text-gray-900">SQL Practice - Part 1</h1>
          </div>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            25 Essential SQL Questions & Answers for Beginners
          </p>
          
          {/* Search Bar */}
          <div className="mt-8 max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search questions or SQL commands..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {searchQuery && (
              <p className="mt-2 text-sm text-gray-500">
                Found {filteredQnA.length} results
              </p>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-white rounded-xl p-5 shadow-sm border text-center">
            <div className="text-2xl font-bold text-blue-600">25</div>
            <div className="text-gray-600 text-sm mt-1">Total Questions</div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border text-center">
            <div className="text-2xl font-bold text-green-600">15</div>
            <div className="text-gray-600 text-sm mt-1">Basic SELECT</div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border text-center">
            <div className="text-2xl font-bold text-amber-600">10</div>
            <div className="text-gray-600 text-sm mt-1">WHERE Conditions</div>
          </div>
        </div>

        {/* Q&A List */}
        <div className="space-y-8">
          {filteredQnA.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
              <div className="p-8">
                {/* Question Number and Question */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                    {item.id}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.question}</h3>
                  </div>
                </div>

                {/* Answer */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Terminal className="w-5 h-5 text-gray-500" />
                    <h4 className="font-semibold text-gray-900">SQL Answer:</h4>
                  </div>
                  <div className="bg-gray-900 text-gray-100 rounded-xl p-6 font-mono text-lg relative group">
                    <pre className="whitespace-pre-wrap">{item.answer}</pre>
                    <button
                      onClick={() => copyToClipboard(item.answer, item.id)}
                      className="absolute right-4 top-4 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition"
                    >
                      {copiedIndex === item.id ? (
                        <Check className="w-5 h-5 text-green-400" />
                      ) : (
                        <Copy className="w-5 h-5 text-gray-300" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Explanation */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Book className="w-5 h-5 text-gray-500" />
                    <h4 className="font-semibold text-gray-900">Explanation:</h4>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-6">
                    <p className="text-gray-800 text-lg">{item.explanation}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Navigation */}
        <div className="mt-12 flex justify-between items-center">
          <div className="text-gray-600">
            Showing {filteredQnA.length} of {sqlQnA.length} questions
          </div>
          <a 
            href="/practice/sql/part2"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
          >
            Continue to Part 2
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>

        {/* Tips */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">💡 Practice Tips for Part 1</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">1</div>
                <span className="text-gray-700">Type each SQL query yourself - don't just read</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">2</div>
                <span className="text-gray-700">Understand the WHERE clause conditions thoroughly</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">3</div>
                <span className="text-gray-700">Practice NULL checks (IS NULL, IS NOT NULL)</span>
              </li>
            </ul>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">4</div>
                <span className="text-gray-700">Master pattern matching with LIKE operator</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">5</div>
                <span className="text-gray-700">Learn to combine conditions with AND/OR</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">6</div>
                <span className="text-gray-700">Use IN operator for multiple value checks</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>SQL Part 1 - Basic SELECT & WHERE Queries • Perfect for SQL Beginners</p>
        </div>
      </div>
    </div>
  );
};

export default SQLPart1Page;