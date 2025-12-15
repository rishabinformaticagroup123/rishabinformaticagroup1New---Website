// app/practice/sql/part2/page.tsx
"use client";

import { useState } from "react";
import { Database, Search, Copy, Check, Filter, ArrowLeft, Book, Terminal, BarChart3, Users, Award } from "lucide-react";

const SQLPart2Page = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // SQL Q&A Data - Part 2 (25 questions)
  const sqlQnA = [
    {
      id: 26,
      question: "Display the total number of employee working in the company",
      answer: "SELECT COUNT(*) AS total_employees FROM employees;",
      explanation: "COUNT(*) counts all rows in the employees table."
    },
    {
      id: 27,
      question: "Display the total salary being paid to all employees",
      answer: "SELECT SUM(salary) AS total_salary FROM employees;",
      explanation: "SUM function adds all salary values."
    },
    {
      id: 28,
      question: "Display the maximum salary from emp table",
      answer: "SELECT MAX(salary) AS max_salary FROM employees;",
      explanation: "MAX function finds the highest salary."
    },
    {
      id: 29,
      question: "Display the minimum salary from emp table",
      answer: "SELECT MIN(salary) AS min_salary FROM employees;",
      explanation: "MIN function finds the lowest salary."
    },
    {
      id: 30,
      question: "Display the average salary from emp table",
      answer: "SELECT AVG(salary) AS avg_salary FROM employees;",
      explanation: "AVG function calculates the average salary."
    },
    {
      id: 31,
      question: "Display the maximum salary being paid to CLERK",
      answer: "SELECT MAX(salary) AS max_clerk_salary FROM employees WHERE job_id IN ('ST_CLERK', 'PU_CLERK', 'SH_CLERK');",
      explanation: "Combines MAX function with WHERE filter."
    },
    {
      id: 32,
      question: "Display the maximum salary being paid to department number 20",
      answer: "SELECT MAX(salary) AS max_dept20_salary FROM employees WHERE department_id = 20;",
      explanation: "Finds maximum salary in department 20."
    },
    {
      id: 33,
      question: "Display the minimum salary being paid to any SALESMAN",
      answer: "SELECT MIN(salary) AS min_salesman_salary FROM employees WHERE job_id IN ('SA_REP', 'SA_MAN');",
      explanation: "Finds minimum salary for sales roles."
    },
    {
      id: 34,
      question: "Display the average salary drawn by MANAGERS",
      answer: "SELECT AVG(salary) AS avg_manager_salary FROM employees WHERE job_id LIKE '%MAN%';",
      explanation: "LIKE with % wildcard finds manager roles."
    },
    {
      id: 35,
      question: "Display the total salary drawn by ANALYST working in department number 40",
      answer: "SELECT SUM(salary) AS total_analyst_salary FROM employees WHERE job_id LIKE '%ANALYST%' AND department_id = 40;",
      explanation: "Combines SUM with multiple WHERE conditions."
    },
    {
      id: 36,
      question: "Display the names of the employee in order of salary i.e the name of the employee earning lowest salary should appear first",
      answer: "SELECT first_name, last_name, salary FROM employees ORDER BY salary ASC;",
      explanation: "ORDER BY ASC sorts from lowest to highest."
    },
    {
      id: 37,
      question: "Display the names of the employee in descending order of salary",
      answer: "SELECT first_name, last_name, salary FROM employees ORDER BY salary DESC;",
      explanation: "ORDER BY DESC sorts from highest to lowest."
    },
    {
      id: 38,
      question: "Display the names of the employee in order of employee name",
      answer: "SELECT first_name, last_name FROM employees ORDER BY first_name, last_name;",
      explanation: "Sorts by first name, then last name."
    },
    {
      id: 39,
      question: "Display empno, ename, deptno, sal sort the output first based on name and within name by deptno and within deptno by sal",
      answer: "SELECT employee_id, first_name, last_name, department_id, salary FROM employees ORDER BY first_name, department_id, salary;",
      explanation: "Multiple column sorting with ORDER BY."
    },
    {
      id: 40,
      question: "Display the name of the employee along with their annual salary (sal*12). The name of the employee earning highest annual salary should appear first",
      answer: "SELECT first_name, last_name, salary * 12 AS annual_salary FROM employees ORDER BY annual_salary DESC;",
      explanation: "Calculates annual salary and sorts descending."
    },
    {
      id: 41,
      question: "Display name, salary, hra, pf, da, total salary for each employee",
      answer: `SELECT 
    first_name,
    salary,
    salary * 0.15 AS hra,
    salary * 0.10 AS da,
    salary * 0.05 AS pf,
    (salary + (salary * 0.15) + (salary * 0.10)) - (salary * 0.05) AS total_salary
FROM employees
ORDER BY total_salary DESC;`,
      explanation: "Calculates various salary components using arithmetic."
    },
    {
      id: 42,
      question: "Display department numbers and total number of employees working in each department",
      answer: "SELECT department_id, COUNT(*) AS employee_count FROM employees GROUP BY department_id ORDER BY department_id;",
      explanation: "GROUP BY groups rows by department and COUNT counts employees per group."
    },
    {
      id: 43,
      question: "Display the various jobs and total number of employees within each job group",
      answer: "SELECT job_id, COUNT(*) AS employee_count FROM employees GROUP BY job_id ORDER BY job_id;",
      explanation: "Groups by job_id and counts employees per job."
    },
    {
      id: 44,
      question: "Display the department numbers and total salary for each department",
      answer: "SELECT department_id, SUM(salary) AS total_salary FROM employees GROUP BY department_id ORDER BY department_id;",
      explanation: "Groups by department and sums salaries per group."
    },
    {
      id: 45,
      question: "Display the department numbers and max salary for each department",
      answer: "SELECT department_id, MAX(salary) AS max_salary FROM employees GROUP BY department_id ORDER BY department_id;",
      explanation: "Finds maximum salary in each department."
    },
    {
      id: 46,
      question: "Display the various jobs and total salary for each job",
      answer: "SELECT job_id, SUM(salary) AS total_salary FROM employees GROUP BY job_id ORDER BY job_id;",
      explanation: "Calculates total salary for each job category."
    },
    {
      id: 48,
      question: "Display the department numbers with more than three employees in each dept",
      answer: "SELECT department_id, COUNT(*) AS employee_count FROM employees GROUP BY department_id HAVING COUNT(*) > 3 ORDER BY department_id;",
      explanation: "HAVING filters groups after GROUP BY aggregation."
    },
    {
      id: 49,
      question: "Display the various jobs along with total salary for each of the jobs where total salary is greater than 40000",
      answer: "SELECT job_id, SUM(salary) AS total_salary FROM employees GROUP BY job_id HAVING SUM(salary) > 40000 ORDER BY job_id;",
      explanation: "HAVING clause with aggregate function condition."
    },
    {
      id: 50,
      question: "Display the various jobs along with total number of employees in each job. The output should contain only those jobs with more than three employees",
      answer: "SELECT job_id, COUNT(*) AS employee_count FROM employees GROUP BY job_id HAVING COUNT(*) > 3 ORDER BY job_id;",
      explanation: "Filters job groups having more than 3 employees."
    },
    {
      id: 51,
      question: "Display the name of the employee who earns highest salary",
      answer: "SELECT first_name, last_name, salary FROM employees WHERE salary = (SELECT MAX(salary) FROM employees);",
      explanation: "Subquery finds maximum salary, main query finds employee with that salary."
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
            <h1 className="text-4xl font-bold text-gray-900">SQL Practice - Part 2</h1>
          </div>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            25 Intermediate SQL Questions & Answers with Aggregations and Grouping
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
            <div className="text-2xl font-bold text-amber-600">15</div>
            <div className="text-gray-600 text-sm mt-1">Aggregate Functions</div>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-sm border text-center">
            <div className="text-2xl font-bold text-green-600">10</div>
            <div className="text-gray-600 text-sm mt-1">GROUP BY Queries</div>
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
          <a 
            href="/practice/sql/part1"
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Part 1
          </a>
          <div className="text-gray-600">
            Showing {filteredQnA.length} of {sqlQnA.length} questions
          </div>
        </div>

        {/* Tips */}
        <div className="mt-12 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">📊 Mastering Aggregate Functions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-amber-200">
              <div className="p-3 bg-amber-100 rounded-lg w-fit mb-3">
                <BarChart3 className="w-6 h-6 text-amber-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Aggregate Functions</h4>
              <ul className="text-gray-700 text-sm space-y-1">
                <li>• COUNT() - Count rows</li>
                <li>• SUM() - Add values</li>
                <li>• AVG() - Calculate average</li>
                <li>• MIN() - Find minimum</li>
                <li>• MAX() - Find maximum</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-amber-200">
              <div className="p-3 bg-amber-100 rounded-lg w-fit mb-3">
                <Users className="w-6 h-6 text-amber-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">GROUP BY Rules</h4>
              <ul className="text-gray-700 text-sm space-y-1">
                <li>• Always use with aggregates</li>
                <li>• Non-aggregated columns in SELECT must be in GROUP BY</li>
                <li>• Groups rows with same values</li>
                <li>• ORDER BY works after grouping</li>
              </ul>
            </div>
            
            <div className="bg-white p-6 rounded-xl border border-amber-200">
              <div className="p-3 bg-amber-100 rounded-lg w-fit mb-3">
                <Award className="w-6 h-6 text-amber-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">WHERE vs HAVING</h4>
              <ul className="text-gray-700 text-sm space-y-1">
                <li>• WHERE filters rows BEFORE grouping</li>
                <li>• HAVING filters groups AFTER grouping</li>
                <li>• HAVING can use aggregate functions</li>
                <li>• WHERE cannot use aggregate functions</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>SQL Part 2 - Aggregate Functions & GROUP BY Queries • Intermediate Level</p>
        </div>
      </div>
    </div>
  );
};

export default SQLPart2Page;