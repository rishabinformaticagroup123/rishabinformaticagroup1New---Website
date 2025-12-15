// page.tsx

"use client"; // <-- ADD THIS LINE
import React, { useState } from 'react';
import { Search, Filter, Hash, Database, BookOpen, TrendingUp } from 'lucide-react';

const OracleSQLPractice3 = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  
  // Q51-Q100 from your previous set
  const qaPairs = [
    {
      id: 51,
      question: "Display the names of employees whose salary is greater than the average salary of their department.",
      answer: "SELECT first_name, last_name FROM employees e1 WHERE salary > (SELECT AVG(salary) FROM employees e2 WHERE e2.department_id = e1.department_id);",
      category: "Subquery",
      difficulty: "Intermediate"
    },
    {
      id: 52,
      question: "Display employees who were hired in the year 2005.",
      answer: "SELECT first_name, last_name, hire_date FROM employees WHERE EXTRACT(YEAR FROM hire_date) = 2005;",
      category: "Date Functions",
      difficulty: "Easy"
    },
    {
      id: 53,
      question: "Display the department name and the number of employees in each department.",
      answer: "SELECT d.department_name, COUNT(e.employee_id) FROM departments d LEFT JOIN employees e ON d.department_id = e.department_id GROUP BY d.department_name;",
      category: "Aggregation",
      difficulty: "Easy"
    },
    {
      id: 54,
      question: "Display employees who have the same job as Steven King.",
      answer: "SELECT first_name, last_name, job_id FROM employees WHERE job_id = (SELECT job_id FROM employees WHERE first_name = 'Steven' AND last_name = 'King');",
      category: "Subquery",
      difficulty: "Easy"
    },
    {
      id: 55,
      question: "Display the highest salary in each department.",
      answer: "SELECT department_id, MAX(salary) AS max_salary FROM employees GROUP BY department_id HAVING department_id IS NOT NULL;",
      category: "Aggregation",
      difficulty: "Easy"
    },
    {
      id: 56,
      question: "Display employees who earn more than the average salary of all employees.",
      answer: "SELECT first_name, last_name, salary FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);",
      category: "Subquery",
      difficulty: "Intermediate"
    },
    {
      id: 57,
      question: "Display employees who do not have a manager.",
      answer: "SELECT first_name, last_name FROM employees WHERE manager_id IS NULL;",
      category: "Basic",
      difficulty: "Easy"
    },
    {
      id: 58,
      question: "Display the top 5 highest-paid employees.",
      answer: "SELECT first_name, last_name, salary FROM employees ORDER BY salary DESC FETCH FIRST 5 ROWS ONLY;",
      category: "Sorting",
      difficulty: "Easy"
    },
    {
      id: 59,
      question: "Display employees whose last name starts with 'K'.",
      answer: "SELECT first_name, last_name FROM employees WHERE last_name LIKE 'K%';",
      category: "Pattern Matching",
      difficulty: "Easy"
    },
    {
      id: 60,
      question: "Display the total salary expenditure for each department.",
      answer: "SELECT department_id, SUM(salary) AS total_salary FROM employees GROUP BY department_id;",
      category: "Aggregation",
      difficulty: "Easy"
    },
    {
      id: 61,
      question: "Display employees who are not in any department.",
      answer: "SELECT first_name, last_name FROM employees WHERE department_id IS NULL;",
      category: "Basic",
      difficulty: "Easy"
    },
    {
      id: 62,
      question: "Display the second highest salary.",
      answer: "SELECT MAX(salary) FROM employees WHERE salary < (SELECT MAX(salary) FROM employees);",
      category: "Subquery",
      difficulty: "Intermediate"
    },
    {
      id: 63,
      question: "Display employees with salary between 5000 and 15000.",
      answer: "SELECT first_name, last_name, salary FROM employees WHERE salary BETWEEN 5000 AND 15000;",
      category: "Basic",
      difficulty: "Easy"
    },
    {
      id: 64,
      question: "Display employees who were hired on a Monday.",
      answer: "SELECT first_name, last_name, hire_date FROM employees WHERE TO_CHAR(hire_date, 'DY') = 'MON';",
      category: "Date Functions",
      difficulty: "Intermediate"
    },
    {
      id: 65,
      question: "Display the department with the most employees.",
      answer: "SELECT department_id, COUNT(*) AS emp_count FROM employees GROUP BY department_id ORDER BY emp_count DESC FETCH FIRST 1 ROW ONLY;",
      category: "Aggregation",
      difficulty: "Intermediate"
    },
    {
      id: 66,
      question: "Display employees who have a commission percentage.",
      answer: "SELECT first_name, last_name, commission_pct FROM employees WHERE commission_pct IS NOT NULL;",
      category: "Basic",
      difficulty: "Easy"
    },
    {
      id: 67,
      question: "Display the employee name and their manager's name.",
      answer: "SELECT e.first_name || ' ' || e.last_name AS employee, m.first_name || ' ' || m.last_name AS manager FROM employees e LEFT JOIN employees m ON e.manager_id = m.employee_id;",
      category: "Joins",
      difficulty: "Intermediate"
    },
    {
      id: 68,
      question: "Display employees who joined before their manager.",
      answer: "SELECT e.first_name, e.last_name, e.hire_date FROM employees e JOIN employees m ON e.manager_id = m.employee_id WHERE e.hire_date < m.hire_date;",
      category: "Joins",
      difficulty: "Intermediate"
    },
    {
      id: 69,
      question: "Display the average salary for each job title.",
      answer: "SELECT job_id, AVG(salary) AS avg_salary FROM employees GROUP BY job_id;",
      category: "Aggregation",
      difficulty: "Easy"
    },
    {
      id: 70,
      question: "Display employees with duplicate email addresses.",
      answer: "SELECT email, COUNT(*) FROM employees GROUP BY email HAVING COUNT(*) > 1;",
      category: "Aggregation",
      difficulty: "Intermediate"
    },
    {
      id: 71,
      question: "Display employees who earn more than any employee in department 60.",
      answer: "SELECT first_name, last_name, salary FROM employees WHERE salary > ANY (SELECT salary FROM employees WHERE department_id = 60);",
      category: "Subquery",
      difficulty: "Intermediate"
    },
    {
      id: 72,
      question: "Display the number of employees hired each year.",
      answer: "SELECT EXTRACT(YEAR FROM hire_date) AS hire_year, COUNT(*) FROM employees GROUP BY EXTRACT(YEAR FROM hire_date) ORDER BY hire_year;",
      category: "Date Functions",
      difficulty: "Intermediate"
    },
    {
      id: 73,
      question: "Display employees whose salary is greater than the salary of all employees in department 30.",
      answer: "SELECT first_name, last_name, salary FROM employees WHERE salary > ALL (SELECT salary FROM employees WHERE department_id = 30);",
      category: "Subquery",
      difficulty: "Intermediate"
    },
    {
      id: 74,
      question: "Display employees who have been with the company for more than 15 years.",
      answer: "SELECT first_name, last_name, hire_date FROM employees WHERE MONTHS_BETWEEN(SYSDATE, hire_date) / 12 > 15;",
      category: "Date Functions",
      difficulty: "Intermediate"
    },
    {
      id: 75,
      question: "Display the department name and location for each employee.",
      answer: "SELECT e.first_name, e.last_name, d.department_name, l.city FROM employees e JOIN departments d ON e.department_id = d.department_id JOIN locations l ON d.location_id = l.location_id;",
      category: "Joins",
      difficulty: "Intermediate"
    },
    {
      id: 76,
      question: "Display employees who do not earn a commission but have a salary less than 10000.",
      answer: "SELECT first_name, last_name, salary FROM employees WHERE commission_pct IS NULL AND salary < 10000;",
      category: "Basic",
      difficulty: "Easy"
    },
    {
      id: 77,
      question: "Display employees with the longest name (first and last combined).",
      answer: "SELECT first_name, last_name, LENGTH(first_name || last_name) AS name_length FROM employees ORDER BY name_length DESC FETCH FIRST 1 ROW ONLY;",
      category: "String Functions",
      difficulty: "Easy"
    },
    {
      id: 78,
      question: "Display the job title with the highest average salary.",
      answer: "SELECT job_id, AVG(salary) AS avg_salary FROM employees GROUP BY job_id ORDER BY avg_salary DESC FETCH FIRST 1 ROW ONLY;",
      category: "Aggregation",
      difficulty: "Intermediate"
    },
    {
      id: 79,
      question: "Display employees who report to a manager who is not in their department.",
      answer: "SELECT e.first_name, e.last_name, e.department_id, m.department_id AS mgr_dept FROM employees e JOIN employees m ON e.manager_id = m.employee_id WHERE e.department_id != m.department_id;",
      category: "Joins",
      difficulty: "Advanced"
    },
    {
      id: 80,
      question: "Display the total number of employees and total salary by department.",
      answer: "SELECT department_id, COUNT(*) AS emp_count, SUM(salary) AS total_salary FROM employees GROUP BY department_id;",
      category: "Aggregation",
      difficulty: "Intermediate"
    },
    {
      id: 81,
      question: "Display employees who have changed jobs (based on job history).",
      answer: "SELECT DISTINCT e.first_name, e.last_name FROM employees e JOIN job_history j ON e.employee_id = j.employee_id;",
      category: "Joins",
      difficulty: "Intermediate"
    },
    {
      id: 82,
      question: "Display employees with salary greater than their department's average but less than the company's maximum.",
      answer: "SELECT first_name, last_name, salary FROM employees e WHERE salary > (SELECT AVG(salary) FROM employees WHERE department_id = e.department_id) AND salary < (SELECT MAX(salary) FROM employees);",
      category: "Subquery",
      difficulty: "Advanced"
    },
    {
      id: 83,
      question: "Display the 3rd highest salary.",
      answer: "SELECT DISTINCT salary FROM (SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS rnk FROM employees) WHERE rnk = 3;",
      category: "Window Functions",
      difficulty: "Intermediate"
    },
    {
      id: 84,
      question: "Display employees who have the same first name as another employee.",
      answer: "SELECT first_name, COUNT(*) FROM employees GROUP BY first_name HAVING COUNT(*) > 1;",
      category: "Aggregation",
      difficulty: "Intermediate"
    },
    {
      id: 85,
      question: "Display employees who are not assigned to any project (assuming projects table exists).",
      answer: "SELECT e.first_name, e.last_name FROM employees e LEFT JOIN project_assignments p ON e.employee_id = p.employee_id WHERE p.employee_id IS NULL;",
      category: "Joins",
      difficulty: "Intermediate"
    },
    {
      id: 86,
      question: "Display the hire date in 'DD-MON-YYYY' format.",
      answer: "SELECT first_name, last_name, TO_CHAR(hire_date, 'DD-MON-YYYY') AS hire_date_formatted FROM employees;",
      category: "Date Functions",
      difficulty: "Easy"
    },
    {
      id: 87,
      question: "Display employees who were hired in the same month as Steven King.",
      answer: "SELECT first_name, last_name, hire_date FROM employees WHERE EXTRACT(MONTH FROM hire_date) = (SELECT EXTRACT(MONTH FROM hire_date) FROM employees WHERE first_name = 'Steven' AND last_name = 'King');",
      category: "Date Functions",
      difficulty: "Intermediate"
    },
    {
      id: 88,
      question: "Display the department with the lowest total salary.",
      answer: "SELECT department_id, SUM(salary) AS total_salary FROM employees GROUP BY department_id HAVING department_id IS NOT NULL ORDER BY total_salary ASC FETCH FIRST 1 ROW ONLY;",
      category: "Aggregation",
      difficulty: "Intermediate"
    },
    {
      id: 89,
      question: "Display employees who have a phone number starting with '515'.",
      answer: "SELECT first_name, last_name, phone_number FROM employees WHERE phone_number LIKE '515%';",
      category: "Pattern Matching",
      difficulty: "Easy"
    },
    {
      id: 90,
      question: "Display the difference in years between the oldest and newest hire.",
      answer: "SELECT EXTRACT(YEAR FROM MAX(hire_date)) - EXTRACT(YEAR FROM MIN(hire_date)) AS year_diff FROM employees;",
      category: "Date Functions",
      difficulty: "Intermediate"
    },
    {
      id: 91,
      question: "Display employees who have never changed departments (assuming job_history).",
      answer: "SELECT e.first_name, e.last_name FROM employees e WHERE NOT EXISTS (SELECT 1 FROM job_history j WHERE j.employee_id = e.employee_id);",
      category: "Subquery",
      difficulty: "Advanced"
    },
    {
      id: 92,
      question: "Display employees with salary greater than the average of department 80.",
      answer: "SELECT first_name, last_name, salary FROM employees WHERE salary > (SELECT AVG(salary) FROM employees WHERE department_id = 80);",
      category: "Subquery",
      difficulty: "Intermediate"
    },
    {
      id: 93,
      question: "Display the full name in a single column (first + last).",
      answer: "SELECT first_name || ' ' || last_name AS full_name FROM employees;",
      category: "String Functions",
      difficulty: "Easy"
    },
    {
      id: 94,
      question: "Display employees who are managers (have at least one subordinate).",
      answer: "SELECT DISTINCT m.first_name, m.last_name FROM employees e JOIN employees m ON e.manager_id = m.employee_id;",
      category: "Joins",
      difficulty: "Intermediate"
    },
    {
      id: 95,
      question: "Display the number of employees per job title per department.",
      answer: "SELECT department_id, job_id, COUNT(*) FROM employees GROUP BY department_id, job_id ORDER BY department_id, job_id;",
      category: "Aggregation",
      difficulty: "Intermediate"
    },
    {
      id: 96,
      question: "Display employees whose salary is within 10% of the department's maximum salary.",
      answer: "SELECT e.first_name, e.last_name, e.salary FROM employees e WHERE e.salary >= 0.9 * (SELECT MAX(salary) FROM employees WHERE department_id = e.department_id);",
      category: "Subquery",
      difficulty: "Advanced"
    },
    {
      id: 97,
      question: "Display employees with email addresses not ending with 'example.com'.",
      answer: "SELECT first_name, last_name, email FROM employees WHERE email NOT LIKE '%example.com';",
      category: "Pattern Matching",
      difficulty: "Easy"
    },
    {
      id: 98,
      question: "Display the cumulative salary total per department.",
      answer: "SELECT department_id, salary, SUM(salary) OVER (PARTITION BY department_id ORDER BY salary) AS cumulative_salary FROM employees;",
      category: "Window Functions",
      difficulty: "Advanced"
    },
    {
      id: 99,
      question: "Display employees who have the same salary as another employee in a different department.",
      answer: "SELECT e1.first_name, e1.last_name, e1.salary, e1.department_id FROM employees e1 JOIN employees e2 ON e1.salary = e2.salary AND e1.department_id != e2.department_id;",
      category: "Joins",
      difficulty: "Intermediate"
    },
    {
      id: 100,
      question: "Display the employee with the earliest hire date in each department.",
      answer: "SELECT department_id, first_name, last_name, hire_date FROM (SELECT department_id, first_name, last_name, hire_date, ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY hire_date) AS rn FROM employees) WHERE rn = 1;",
      category: "Window Functions",
      difficulty: "Advanced"
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
  const aggregationCount = qaPairs.filter(q => q.category === 'Aggregation').length;
  const joinsCount = qaPairs.filter(q => q.category === 'Joins').length;
  const subqueryCount = qaPairs.filter(q => q.category === 'Subquery').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Database className="w-10 h-10 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Oracle SQL Practice - Part 3</h1>
            <p className="text-gray-600">Intermediate to Advanced Queries on EMPLOYEES Table</p>
          </div>
        </div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Hash className="w-5 h-5 text-blue-500" />
              <span className="text-lg font-semibold text-gray-700">Questions 51-100</span>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            Total: {totalQuestions} questions
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-8 space-y-6">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search questions or SQL commands..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {searchTerm && (
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
              {filteredQuestions.length} results
            </div>
          )}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-gray-500" />
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Questions</p>
              <p className="text-3xl font-bold text-gray-900">{totalQuestions}</p>
            </div>
            <BookOpen className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Aggregate Functions</p>
              <p className="text-3xl font-bold text-gray-900">{aggregationCount}</p>
            </div>
            <div className="w-8 h-8 flex items-center justify-center bg-blue-100 rounded-lg">
              <span className="text-blue-600 font-bold">Σ</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">JOIN Queries</p>
              <p className="text-3xl font-bold text-gray-900">{joinsCount}</p>
            </div>
            <div className="w-8 h-8 flex items-center justify-center bg-green-100 rounded-lg">
              <span className="text-green-600 font-bold">⇄</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Subqueries</p>
              <p className="text-3xl font-bold text-gray-900">{subqueryCount}</p>
            </div>
            <div className="w-8 h-8 flex items-center justify-center bg-purple-100 rounded-lg">
              <span className="text-purple-600 font-bold">⊂</span>
            </div>
          </div>
        </div>
      </div>

      {/* Questions Grid */}
      <div className="space-y-6">
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((qa) => (
            <div key={qa.id} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100">
                      <span className="text-blue-700 font-bold">Q{qa.id}</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {qa.category}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        qa.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                        qa.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {qa.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-800 mb-4">{qa.question}</h3>
                
                <div className="mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <h4 className="font-medium text-gray-700">SQL Answer:</h4>
                  </div>
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono border border-gray-700">
                    <code>{qa.answer}</code>
                  </pre>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow border border-gray-200">
            <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">No questions found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-12 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
        <p>Oracle SQL Practice Questions • EMPLOYEES Table • Questions 51-100 • Part 3</p>
        <p className="mt-1">Click on any SQL query to copy to clipboard</p>
      </div>
    </div>
  );
};

export default OracleSQLPractice3;