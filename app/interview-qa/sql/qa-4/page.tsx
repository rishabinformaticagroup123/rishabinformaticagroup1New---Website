// page.tsx (Part 4: Q101-Q150)
"use client";

import React, { useState } from 'react';
import { Search, Filter, Hash, Database, BookOpen, TrendingUp, Copy, Check } from 'lucide-react';

const OracleSQLPractice4 = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopy = (id: number, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Q101-Q150 matching Oracle EMPLOYEES table
  const qaPairs = [
    {
      id: 101,
      question: "Display employees who are working as managers.",
      answer: "SELECT DISTINCT m.employee_id, m.first_name, m.last_name FROM employees e JOIN employees m ON e.manager_id = m.employee_id;",
      category: "Joins",
      difficulty: "Intermediate"
    },
    {
      id: 102,
      question: "Display employee name and department name for each employee.",
      answer: "SELECT e.first_name, e.last_name, d.department_name FROM employees e JOIN departments d ON e.department_id = d.department_id;",
      category: "Joins",
      difficulty: "Easy"
    },
    {
      id: 103,
      question: "Display employees who joined the company before the 15th of any month.",
      answer: "SELECT first_name, last_name, hire_date FROM employees WHERE EXTRACT(DAY FROM hire_date) < 15;",
      category: "Date Functions",
      difficulty: "Intermediate"
    },
    {
      id: 104,
      question: "Display employee name, salary, and PF (Provident Fund which is 20% of salary).",
      answer: "SELECT first_name, last_name, salary, salary * 0.20 AS PF FROM employees;",
      category: "Calculations",
      difficulty: "Easy"
    },
    {
      id: 105,
      question: "Display all employee names in reverse order (e.g., 'SMITH' as 'HTIMS').",
      answer: "SELECT first_name, REVERSE(first_name) AS reversed_name FROM employees;",
      category: "String Functions",
      difficulty: "Intermediate"
    },
    {
      id: 106,
      question: "Display the department name along with total salary in each department.",
      answer: "SELECT d.department_name, SUM(e.salary) AS total_salary FROM departments d JOIN employees e ON d.department_id = e.department_id GROUP BY d.department_name;",
      category: "Aggregation",
      difficulty: "Intermediate"
    },
    {
      id: 107,
      question: "Display the department name and total number of employees in each department.",
      answer: "SELECT d.department_name, COUNT(e.employee_id) AS employee_count FROM departments d LEFT JOIN employees e ON d.department_id = e.department_id GROUP BY d.department_name;",
      category: "Aggregation",
      difficulty: "Intermediate"
    },
    {
      id: 108,
      question: "Display employee name and manager name.",
      answer: "SELECT e.first_name || ' ' || e.last_name AS employee, m.first_name || ' ' || m.last_name AS manager FROM employees e LEFT JOIN employees m ON e.manager_id = m.employee_id;",
      category: "Joins",
      difficulty: "Intermediate"
    },
    {
      id: 109,
      question: "Display department names even if there are no employees working in them (use outer join).",
      answer: "SELECT d.department_name, COUNT(e.employee_id) AS employee_count FROM departments d LEFT JOIN employees e ON d.department_id = e.department_id GROUP BY d.department_name;",
      category: "Joins",
      difficulty: "Intermediate"
    },
    {
      id: 110,
      question: "Delete records where number of employees in a department is less than 3.",
      answer: "DELETE FROM employees WHERE department_id IN (SELECT department_id FROM employees GROUP BY department_id HAVING COUNT(*) < 3);",
      category: "DML",
      difficulty: "Advanced"
    },
    {
      id: 111,
      question: "Display the name of the department where no employee is working.",
      answer: "SELECT d.department_name FROM departments d LEFT JOIN employees e ON d.department_id = e.department_id WHERE e.employee_id IS NULL;",
      category: "Joins",
      difficulty: "Intermediate"
    },
    {
      id: 112,
      question: "Display the 10th record from employees table (without using ROWID).",
      answer: "SELECT * FROM (SELECT e.*, ROWNUM AS rnum FROM employees e WHERE ROWNUM <= 10) WHERE rnum = 10;",
      category: "Pagination",
      difficulty: "Advanced"
    },
    {
      id: 113,
      question: "Display top 3 salaries from employees table.",
      answer: "SELECT * FROM (SELECT first_name, last_name, salary FROM employees ORDER BY salary DESC) WHERE ROWNUM <= 3;",
      category: "Pagination",
      difficulty: "Intermediate"
    },
    {
      id: 114,
      question: "Display half of the employee name in uppercase and remaining in lowercase.",
      answer: "SELECT first_name, UPPER(SUBSTR(first_name, 1, LENGTH(first_name)/2)) || LOWER(SUBSTR(first_name, LENGTH(first_name)/2 + 1)) AS modified_name FROM employees;",
      category: "String Functions",
      difficulty: "Advanced"
    },
    {
      id: 115,
      question: "Display first name if it exists more than once in the table.",
      answer: "SELECT first_name, COUNT(*) FROM employees GROUP BY first_name HAVING COUNT(*) > 1;",
      category: "Aggregation",
      difficulty: "Intermediate"
    },
    {
      id: 116,
      question: "Display employees working in Sales or Research departments.",
      answer: "SELECT e.first_name, e.last_name, d.department_name FROM employees e JOIN departments d ON e.department_id = d.department_id WHERE d.department_name IN ('Sales', 'Research');",
      category: "Joins",
      difficulty: "Intermediate"
    },
    {
      id: 117,
      question: "Provide 10% commission to employees who are not earning any commission.",
      answer: "UPDATE employees SET commission_pct = 0.10 WHERE commission_pct IS NULL;",
      category: "DML",
      difficulty: "Intermediate"
    },
    {
      id: 118,
      question: "If any employee has commission, increment it by 10% of salary.",
      answer: "UPDATE employees SET commission_pct = commission_pct + (salary * 0.10) WHERE commission_pct IS NOT NULL;",
      category: "DML",
      difficulty: "Advanced"
    },
    {
      id: 119,
      question: "Display employees who are subordinate to a specific manager (e.g., manager with ID 100).",
      answer: "SELECT first_name, last_name FROM employees WHERE manager_id = 100;",
      category: "Hierarchical",
      difficulty: "Easy"
    },
    {
      id: 120,
      question: "Display employee names in format: 'A ALLEN', 'B BLAKE', etc.",
      answer: "SELECT SUBSTR(first_name, 1, 1) || ' ' || first_name || ' ' || last_name AS formatted_name FROM employees ORDER BY first_name;",
      category: "String Functions",
      difficulty: "Intermediate"
    },
    {
      id: 121,
      question: "Display employees whose department number is available in their salary digits.",
      answer: "SELECT first_name, last_name, department_id, salary FROM employees WHERE INSTR(TO_CHAR(salary), TO_CHAR(department_id)) > 0;",
      category: "Pattern Matching",
      difficulty: "Advanced"
    },
    {
      id: 122,
      question: "Display employees whose first 2 characters from hire date equal last 2 characters of salary.",
      answer: "SELECT first_name, last_name FROM employees WHERE SUBSTR(TO_CHAR(hire_date, 'DD'), 1, 2) = SUBSTR(TO_CHAR(salary), -2);",
      category: "Date Functions",
      difficulty: "Advanced"
    },
    {
      id: 123,
      question: "Display employees where 10% of salary equals the year of joining.",
      answer: "SELECT first_name, last_name FROM employees WHERE salary * 0.10 = EXTRACT(YEAR FROM hire_date);",
      category: "Calculations",
      difficulty: "Advanced"
    },
    {
      id: 124,
      question: "Create a copy of employees table with data.",
      answer: "CREATE TABLE new_employees AS SELECT * FROM employees;",
      category: "DDL",
      difficulty: "Easy"
    },
    {
      id: 125,
      question: "Display employee number, name, and location of the department.",
      answer: "SELECT e.employee_id, e.first_name, e.last_name, l.city FROM employees e JOIN departments d ON e.department_id = d.department_id JOIN locations l ON d.location_id = l.location_id;",
      category: "Multiple Joins",
      difficulty: "Intermediate"
    },
    {
      id: 126,
      question: "Delete employees who have been working for more than 2 years.",
      answer: "DELETE FROM employees WHERE MONTHS_BETWEEN(SYSDATE, hire_date) / 12 > 2;",
      category: "DML",
      difficulty: "Intermediate"
    },
    {
      id: 127,
      question: "Display rows 5 to 7 from employees table.",
      answer: "SELECT * FROM (SELECT e.*, ROWNUM AS rnum FROM employees e WHERE ROWNUM <= 7) WHERE rnum >= 5;",
      category: "Pagination",
      difficulty: "Intermediate"
    },
    {
      id: 128,
      question: "Display top N rows from table (e.g., top 5).",
      answer: "SELECT * FROM employees WHERE ROWNUM <= 5;",
      category: "Pagination",
      difficulty: "Easy"
    },
    {
      id: 129,
      question: "Display 9th record from employees table.",
      answer: "SELECT * FROM (SELECT e.*, ROWNUM AS rnum FROM employees e) WHERE rnum = 9;",
      category: "Pagination",
      difficulty: "Intermediate"
    },
    {
      id: 130,
      question: "Remove duplicate rows from employees table.",
      answer: "DELETE FROM employees WHERE ROWID NOT IN (SELECT MIN(ROWID) FROM employees GROUP BY employee_id);",
      category: "DML",
      difficulty: "Advanced"
    },
    {
      id: 131,
      question: "Create table with only employee number column.",
      answer: "CREATE TABLE emp (empno NUMBER PRIMARY KEY);",
      category: "DDL",
      difficulty: "Easy"
    },
    {
      id: 132,
      question: "Add first name column to table.",
      answer: "ALTER TABLE emp ADD ename VARCHAR2(20);",
      category: "DDL",
      difficulty: "Easy"
    },
    {
      id: 133,
      question: "Add primary key constraint to existing table.",
      answer: "ALTER TABLE emp ADD CONSTRAINT pk_emp PRIMARY KEY (empno);",
      category: "DDL",
      difficulty: "Intermediate"
    },
    {
      id: 134,
      question: "Increase length of name column to 30 characters.",
      answer: "ALTER TABLE emp MODIFY ename VARCHAR2(30);",
      category: "DDL",
      difficulty: "Intermediate"
    },
    {
      id: 135,
      question: "Add salary column with constraint (salary cannot exceed 10000).",
      answer: "ALTER TABLE emp ADD salary NUMBER CONSTRAINT chk_salary CHECK (salary <= 10000);",
      category: "DDL",
      difficulty: "Intermediate"
    },
    {
      id: 136,
      question: "Remove salary constraint from table.",
      answer: "ALTER TABLE emp DROP CONSTRAINT chk_salary;",
      category: "DDL",
      difficulty: "Intermediate"
    },
    {
      id: 137,
      question: "Add manager column referencing employee number.",
      answer: "ALTER TABLE emp ADD mgr NUMBER; ALTER TABLE emp ADD CONSTRAINT fk_mgr FOREIGN KEY (mgr) REFERENCES emp(empno);",
      category: "DDL",
      difficulty: "Intermediate"
    },
    {
      id: 138,
      question: "Add department number column with foreign key constraint.",
      answer: "ALTER TABLE emp ADD deptno NUMBER; ALTER TABLE emp ADD CONSTRAINT fk_dept FOREIGN KEY (deptno) REFERENCES departments(department_id);",
      category: "DDL",
      difficulty: "Intermediate"
    },
    {
      id: 139,
      question: "Display employees whose joining month equals their grade (if grade table exists).",
      answer: "SELECT e.first_name, e.last_name FROM employees e WHERE EXTRACT(MONTH FROM hire_date) = (SELECT grade FROM grades WHERE employee_id = e.employee_id);",
      category: "Subquery",
      difficulty: "Advanced"
    },
    {
      id: 140,
      question: "Display employees whose joining date digits are available in department number.",
      answer: "SELECT first_name, last_name FROM employees WHERE INSTR(TO_CHAR(department_id), TO_CHAR(EXTRACT(DAY FROM hire_date))) > 0;",
      category: "Pattern Matching",
      difficulty: "Advanced"
    },
    {
      id: 141,
      question: "Display employees and their salaries where salary is greater than highest department average.",
      answer: "SELECT first_name, last_name, salary FROM employees WHERE salary > ALL (SELECT AVG(salary) FROM employees GROUP BY department_id);",
      category: "Subquery",
      difficulty: "Advanced"
    },
    {
      id: 142,
      question: "Display the grade of a specific employee (assuming grade table).",
      answer: "SELECT g.grade FROM grades g JOIN employees e ON g.employee_id = e.employee_id WHERE e.first_name = 'Steven' AND e.last_name = 'King';",
      category: "Joins",
      difficulty: "Intermediate"
    },
    {
      id: 143,
      question: "Display employee details sorted by department and salary.",
      answer: "SELECT department_id, first_name, last_name, salary FROM employees ORDER BY department_id, salary DESC;",
      category: "Sorting",
      difficulty: "Easy"
    },
    {
      id: 144,
      question: "Display average salary by job title for departments with more than 5 employees.",
      answer: "SELECT e.job_id, AVG(e.salary) FROM employees e GROUP BY e.job_id, e.department_id HAVING COUNT(*) > 5;",
      category: "Aggregation",
      difficulty: "Intermediate"
    },
    {
      id: 145,
      question: "Display employees hired in last 6 months.",
      answer: "SELECT first_name, last_name, hire_date FROM employees WHERE hire_date >= ADD_MONTHS(SYSDATE, -6);",
      category: "Date Functions",
      difficulty: "Intermediate"
    },
    {
      id: 146,
      question: "Display department-wise maximum salary difference.",
      answer: "SELECT department_id, MAX(salary) - MIN(salary) AS salary_diff FROM employees GROUP BY department_id;",
      category: "Aggregation",
      difficulty: "Intermediate"
    },
    {
      id: 147,
      question: "Display employees with salary greater than their manager's salary.",
      answer: "SELECT e.first_name, e.last_name, e.salary FROM employees e JOIN employees m ON e.manager_id = m.employee_id WHERE e.salary > m.salary;",
      category: "Joins",
      difficulty: "Advanced"
    },
    {
      id: 148,
      question: "Display number of employees hired each month.",
      answer: "SELECT TO_CHAR(hire_date, 'YYYY-MM') AS hire_month, COUNT(*) FROM employees GROUP BY TO_CHAR(hire_date, 'YYYY-MM') ORDER BY hire_month;",
      category: "Date Functions",
      difficulty: "Intermediate"
    },
    {
      id: 149,
      question: "Display employees with odd salary values.",
      answer: "SELECT first_name, last_name, salary FROM employees WHERE MOD(salary, 2) = 1;",
      category: "Calculations",
      difficulty: "Easy"
    },
    {
      id: 150,
      question: "Display employees with salary containing at least 4 digits.",
      answer: "SELECT first_name, last_name, salary FROM employees WHERE LENGTH(TO_CHAR(salary)) >= 4;",
      category: "Pattern Matching",
      difficulty: "Easy"
    }
  ];

  // Get unique categories and difficulty levels
  const categories = ['All', ...new Set(qaPairs.map(q => q.category))];
  const difficulties = ['All', ...new Set(qaPairs.map(q => q.difficulty))];

  // Filter questions based on search and filters
  const filteredQuestions = qaPairs.filter(q => {
    const matchesSearch = 
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || q.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  // Count statistics
  const totalQuestions = qaPairs.length;
  const ddlCount = qaPairs.filter(q => q.category === 'DDL').length;
  const dmlCount = qaPairs.filter(q => q.category === 'DML').length;
  const advancedCount = qaPairs.filter(q => q.difficulty === 'Advanced').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-4">
          <Database className="w-8 h-8 md:w-10 md:h-10 text-blue-600" />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Oracle SQL Practice - Part 4</h1>
            <p className="text-gray-600 text-sm md:text-base">Advanced Queries & DDL/DML Operations (Q101-Q150)</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Hash className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />
            <span className="text-lg font-semibold text-gray-700">Questions 101-150</span>
          </div>
          <div className="text-sm text-gray-500">
            Total: {totalQuestions} questions
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 md:mb-8 space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
          <input
            type="text"
            placeholder="Search questions or SQL commands..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 md:py-3 rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
          />
          {searchTerm && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs md:text-sm text-gray-500">
              {filteredQuestions.length} results
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 md:gap-4">
          <div className="flex items-center gap-1 md:gap-2">
            <Filter className="w-3 h-3 md:w-4 md:h-4 text-gray-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-1 md:px-4 md:py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center gap-1 md:gap-2">
            <TrendingUp className="w-3 h-3 md:w-4 md:h-4 text-gray-500" />
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3 py-1 md:px-4 md:py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              {difficulties.map(diff => (
                <option key={diff} value={diff}>{diff}</option>
              ))}
            </select>
          </div>
          
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
              setSelectedDifficulty('All');
            }}
            className="px-3 py-1 md:px-4 md:py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors text-sm"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
        <div className="bg-white rounded-lg shadow p-4 md:p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm text-gray-500">Total Questions</p>
              <p className="text-xl md:text-3xl font-bold text-gray-900">{totalQuestions}</p>
            </div>
            <BookOpen className="w-6 h-6 md:w-8 md:h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 md:p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm text-gray-500">DDL Operations</p>
              <p className="text-xl md:text-3xl font-bold text-gray-900">{ddlCount}</p>
            </div>
            <div className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center bg-blue-100 rounded-lg">
              <span className="text-blue-600 font-bold text-sm md:text-base">DDL</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 md:p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm text-gray-500">DML Operations</p>
              <p className="text-xl md:text-3xl font-bold text-gray-900">{dmlCount}</p>
            </div>
            <div className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center bg-green-100 rounded-lg">
              <span className="text-green-600 font-bold text-sm md:text-base">DML</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-4 md:p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs md:text-sm text-gray-500">Advanced Level</p>
              <p className="text-xl md:text-3xl font-bold text-gray-900">{advancedCount}</p>
            </div>
            <div className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center bg-red-100 rounded-lg">
              <span className="text-red-600 font-bold text-sm md:text-base">A</span>
            </div>
          </div>
        </div>
      </div>

      {/* Questions Grid */}
      <div className="space-y-4 md:space-y-6">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((qa) => (
            <div key={qa.id} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between mb-4 gap-2">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-lg bg-blue-100">
                      <span className="text-blue-700 font-bold text-sm md:text-base">Q{qa.id}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 md:gap-2">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {qa.category}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        qa.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                        qa.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {qa.difficulty}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCopy(qa.id, qa.answer)}
                    className="flex items-center gap-1 px-3 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-sm"
                  >
                    {copiedId === qa.id ? (
                      <>
                        <Check className="w-3 h-3 md:w-4 md:h-4 text-green-600" />
                        <span className="text-green-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3 md:w-4 md:h-4 text-gray-600" />
                        <span className="text-gray-600">Copy SQL</span>
                      </>
                    )}
                  </button>
                </div>
                
                <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-3 md:mb-4">{qa.question}</h3>
                
                <div className="mt-3 md:mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500"></div>
                    <h4 className="font-medium text-gray-700 text-sm md:text-base">SQL Answer:</h4>
                  </div>
                  <pre className="bg-gray-900 text-gray-100 p-3 md:p-4 rounded-lg overflow-x-auto text-xs md:text-sm font-mono border border-gray-700">
                    <code>{qa.answer}</code>
                  </pre>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 md:py-12 bg-white rounded-xl shadow border border-gray-200">
            <Search className="w-8 h-8 md:w-12 md:h-12 text-gray-300 mx-auto mb-3 md:mb-4" />
            <h3 className="text-base md:text-lg font-semibold text-gray-600 mb-1 md:mb-2">No questions found</h3>
            <p className="text-gray-500 text-sm">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-8 md:mt-12 pt-4 md:pt-6 border-t border-gray-200 text-center text-gray-500 text-xs md:text-sm">
        <p>Oracle SQL Practice Questions • EMPLOYEES Table • Questions 101-150 • Part 4</p>
        <p className="mt-1">Click "Copy SQL" to copy queries to clipboard</p>
      </div>
    </div>
  );
};

export default OracleSQLPractice4;