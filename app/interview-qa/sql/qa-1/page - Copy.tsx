// app/practice/sql/page.tsx
"use client";

import { useState } from "react";
import {
  Database,
  Search,
  ChevronDown,
  ChevronUp,
  Copy,
  CheckCircle,
  XCircle,
  Play,
  Book,
  Code,
  Zap,
  Target,
  BarChart3,
  Filter,
  Award,
  HelpCircle,
  Terminal,
} from "lucide-react";

interface SQLQuestion {
  id: string;
  question: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  answer: string;
  explanation: string;
  example: string;
  tags: string[];
  points: number;
  hint?: string;
}

const SQLPracticePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState("All");
  const [expandedQuestions, setExpandedQuestions] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);
  const [completedQuestions, setCompletedQuestions] = useState<Record<string, boolean>>({});

  const toggleQuestion = (id: string) => {
    setExpandedQuestions((prev) =>
      prev.includes(id)
        ? prev.filter((qId) => qId !== id)
        : [...prev, id]
    );
  };

  const toggleAll = (expand: boolean) => {
    if (expand) {
      setExpandedQuestions(sqlQuestions.map(q => q.id));
    } else {
      setExpandedQuestions([]);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const markAsComplete = (id: string) => {
    setCompletedQuestions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // SQL Questions Data
  const sqlQuestions: SQLQuestion[] = [
    {
      id: "q1",
      question: "How to retrieve all columns from a table?",
      category: "Basic SELECT",
      difficulty: "Easy",
      answer: "SELECT * FROM table_name;",
      explanation: "The asterisk (*) is a wildcard that means 'all columns'. This query returns all columns and all rows from the specified table.",
      example: "SELECT * FROM employees;",
      tags: ["SELECT", "basic", "retrieval"],
      points: 10,
      hint: "Use * to select all columns",
    },
    {
      id: "q2",
      question: "How to select specific columns from a table?",
      category: "Basic SELECT",
      difficulty: "Easy",
      answer: "SELECT column1, column2 FROM table_name;",
      explanation: "List the column names separated by commas to select only specific columns from the table.",
      example: "SELECT first_name, last_name, salary FROM employees;",
      tags: ["SELECT", "columns", "projection"],
      points: 10,
    },
    {
      id: "q3",
      question: "How to filter rows using WHERE clause?",
      category: "WHERE Clause",
      difficulty: "Easy",
      answer: "SELECT * FROM table_name WHERE condition;",
      explanation: "The WHERE clause filters rows based on a condition. Only rows that satisfy the condition are returned.",
      example: "SELECT * FROM employees WHERE department_id = 10;",
      tags: ["WHERE", "filter", "condition"],
      points: 15,
      hint: "Use WHERE to filter rows based on conditions",
    },
    {
      id: "q4",
      question: "How to sort results in ascending order?",
      category: "ORDER BY",
      difficulty: "Easy",
      answer: "SELECT * FROM table_name ORDER BY column_name ASC;",
      explanation: "ORDER BY sorts the result set. ASC (ascending) is the default order, so you can omit it.",
      example: "SELECT * FROM employees ORDER BY salary ASC;",
      tags: ["ORDER BY", "sort", "ascending"],
      points: 10,
    },
    {
      id: "q5",
      question: "How to sort results in descending order?",
      category: "ORDER BY",
      difficulty: "Easy",
      answer: "SELECT * FROM table_name ORDER BY column_name DESC;",
      explanation: "DESC sorts the results in descending order (highest to lowest).",
      example: "SELECT * FROM employees ORDER BY salary DESC;",
      tags: ["ORDER BY", "sort", "descending"],
      points: 10,
    },
    {
      id: "q6",
      question: "How to use multiple conditions with AND/OR?",
      category: "WHERE Clause",
      difficulty: "Easy",
      answer: "SELECT * FROM table_name WHERE condition1 AND condition2;\nSELECT * FROM table_name WHERE condition1 OR condition2;",
      explanation: "AND requires all conditions to be true. OR requires at least one condition to be true.",
      example: "SELECT * FROM employees WHERE department_id = 10 AND salary > 5000;\nSELECT * FROM employees WHERE department_id = 10 OR department_id = 20;",
      tags: ["WHERE", "AND", "OR", "logic"],
      points: 15,
    },
    {
      id: "q7",
      question: "How to use IN operator for multiple values?",
      category: "WHERE Clause",
      difficulty: "Easy",
      answer: "SELECT * FROM table_name WHERE column_name IN (value1, value2, ...);",
      explanation: "IN operator allows you to specify multiple values in a WHERE clause. It's equivalent to multiple OR conditions.",
      example: "SELECT * FROM employees WHERE department_id IN (10, 20, 30);",
      tags: ["WHERE", "IN", "multiple values"],
      points: 15,
    },
    {
      id: "q8",
      question: "How to use LIKE for pattern matching?",
      category: "WHERE Clause",
      difficulty: "Medium",
      answer: "SELECT * FROM table_name WHERE column_name LIKE 'pattern';",
      explanation: "LIKE is used for pattern matching:\n• % matches any sequence of characters\n• _ matches any single character",
      example: "SELECT * FROM employees WHERE first_name LIKE 'A%'; -- Names starting with A\nSELECT * FROM employees WHERE email LIKE '%@gmail.com'; -- Gmail emails\nSELECT * FROM employees WHERE phone LIKE '___-___-____'; -- Phone format",
      tags: ["WHERE", "LIKE", "pattern", "wildcard"],
      points: 20,
    },
    {
      id: "q9",
      question: "How to handle NULL values?",
      category: "NULL Handling",
      difficulty: "Medium",
      answer: "SELECT * FROM table_name WHERE column_name IS NULL;\nSELECT * FROM table_name WHERE column_name IS NOT NULL;",
      explanation: "NULL represents missing or unknown data. Use IS NULL or IS NOT NULL to check for NULL values. Don't use = NULL.",
      example: "SELECT * FROM employees WHERE commission_pct IS NULL;\nSELECT * FROM employees WHERE manager_id IS NOT NULL;",
      tags: ["NULL", "IS NULL", "IS NOT NULL"],
      points: 20,
    },
    {
      id: "q10",
      question: "How to use aggregate functions (COUNT, SUM, AVG)?",
      category: "Aggregate Functions",
      difficulty: "Medium",
      answer: "SELECT COUNT(*) FROM table_name;\nSELECT SUM(column_name) FROM table_name;\nSELECT AVG(column_name) FROM table_name;\nSELECT MIN(column_name) FROM table_name;\nSELECT MAX(column_name) FROM table_name;",
      explanation: "Aggregate functions perform calculations on multiple rows and return a single value:\n• COUNT: Counts rows\n• SUM: Adds values\n• AVG: Calculates average\n• MIN: Finds minimum\n• MAX: Finds maximum",
      example: "SELECT COUNT(*) FROM employees;\nSELECT SUM(salary) FROM employees;\nSELECT AVG(salary) FROM employees;\nSELECT MIN(salary), MAX(salary) FROM employees;",
      tags: ["aggregate", "COUNT", "SUM", "AVG", "MIN", "MAX"],
      points: 25,
    },
    {
      id: "q11",
      question: "How to use GROUP BY for grouping data?",
      category: "GROUP BY",
      difficulty: "Medium",
      answer: "SELECT column1, aggregate_function(column2)\nFROM table_name\nGROUP BY column1;",
      explanation: "GROUP BY groups rows that have the same values in specified columns. Usually used with aggregate functions.",
      example: "SELECT department_id, COUNT(*) as employee_count\nFROM employees\nGROUP BY department_id;",
      tags: ["GROUP BY", "aggregate", "grouping"],
      points: 25,
    },
    {
      id: "q12",
      question: "How to filter groups using HAVING clause?",
      category: "HAVING Clause",
      difficulty: "Medium",
      answer: "SELECT column1, aggregate_function(column2)\nFROM table_name\nGROUP BY column1\nHAVING condition;",
      explanation: "HAVING filters groups after GROUP BY, while WHERE filters rows before grouping.",
      example: "SELECT department_id, COUNT(*) as employee_count\nFROM employees\nGROUP BY department_id\nHAVING COUNT(*) > 5;",
      tags: ["HAVING", "GROUP BY", "filter groups"],
      points: 25,
    },
    {
      id: "q13",
      question: "What's the difference between WHERE and HAVING?",
      category: "Comparison",
      difficulty: "Medium",
      answer: "WHERE filters rows BEFORE grouping. HAVING filters groups AFTER grouping.",
      explanation: "Key differences:\n1. WHERE works on individual rows\n2. HAVING works on aggregated groups\n3. WHERE can't use aggregate functions\n4. HAVING can use aggregate functions\n5. WHERE comes before GROUP BY\n6. HAVING comes after GROUP BY",
      example: "SELECT department_id, AVG(salary) as avg_salary\nFROM employees\nWHERE salary > 3000  -- Filters rows first\nGROUP BY department_id\nHAVING AVG(salary) > 5000;  -- Filters groups after",
      tags: ["WHERE", "HAVING", "comparison", "GROUP BY"],
      points: 30,
    },
    {
      id: "q14",
      question: "How to join two tables?",
      category: "JOINs",
      difficulty: "Medium",
      answer: "SELECT columns\nFROM table1\nJOIN table2 ON table1.column = table2.column;",
      explanation: "JOIN combines rows from two or more tables based on a related column. INNER JOIN returns only matching rows.",
      example: "SELECT e.first_name, d.department_name\nFROM employees e\nJOIN departments d ON e.department_id = d.department_id;",
      tags: ["JOIN", "INNER JOIN", "table join"],
      points: 30,
    },
    {
      id: "q15",
      question: "What are different types of JOINs?",
      category: "JOINs",
      difficulty: "Hard",
      answer: "1. INNER JOIN: Returns matching rows from both tables\n2. LEFT JOIN: Returns all rows from left table + matching rows from right\n3. RIGHT JOIN: Returns all rows from right table + matching rows from left\n4. FULL OUTER JOIN: Returns all rows when there's a match in either table\n5. CROSS JOIN: Returns Cartesian product of both tables",
      explanation: "Each JOIN type serves different purposes:\n• Use INNER JOIN for related data\n• Use LEFT/RIGHT JOIN to include unmatched rows\n• Use FULL OUTER JOIN for complete data\n• Use CROSS JOIN for combinations",
      example: "SELECT e.first_name, d.department_name\nFROM employees e\nLEFT JOIN departments d ON e.department_id = d.department_id;\n\nSELECT e.first_name, d.department_name\nFROM employees e\nRIGHT JOIN departments d ON e.department_id = d.department_id;",
      tags: ["JOIN", "INNER", "LEFT", "RIGHT", "OUTER", "CROSS"],
      points: 40,
    },
    {
      id: "q16",
      question: "How to use subqueries?",
      category: "Subqueries",
      difficulty: "Hard",
      answer: "SELECT * FROM table_name WHERE column_name = (SELECT column FROM another_table WHERE condition);\nSELECT * FROM table_name WHERE column_name IN (SELECT column FROM another_table);",
      explanation: "A subquery is a query nested inside another query. Can be used in SELECT, FROM, WHERE, or HAVING clauses.",
      example: "SELECT * FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);\nSELECT * FROM employees WHERE department_id IN (SELECT department_id FROM departments WHERE location_id = 1700);",
      tags: ["subquery", "nested query", "IN"],
      points: 35,
    },
    {
      id: "q17",
      question: "What are correlated subqueries?",
      category: "Subqueries",
      difficulty: "Hard",
      answer: "SELECT * FROM table1 t1 WHERE column1 > (SELECT AVG(column2) FROM table2 t2 WHERE t2.id = t1.id);",
      explanation: "Correlated subqueries reference columns from the outer query. They execute once for each row processed by the outer query.",
      example: "SELECT e1.first_name, e1.salary\nFROM employees e1\nWHERE salary > (SELECT AVG(salary) FROM employees e2 WHERE e2.department_id = e1.department_id);",
      tags: ["correlated subquery", "subquery", "advanced"],
      points: 40,
    },
    {
      id: "q18",
      question: "How to use CASE statement?",
      category: "CASE Statement",
      difficulty: "Medium",
      answer: "SELECT column1,\nCASE\n    WHEN condition1 THEN result1\n    WHEN condition2 THEN result2\n    ELSE default_result\nEND AS new_column\nFROM table_name;",
      explanation: "CASE statement works like IF-THEN-ELSE logic in SQL. Useful for conditional column values.",
      example: "SELECT first_name, salary,\nCASE\n    WHEN salary < 3000 THEN 'Low'\n    WHEN salary BETWEEN 3000 AND 7000 THEN 'Medium'\n    ELSE 'High'\nEND AS salary_level\nFROM employees;",
      tags: ["CASE", "conditional", "IF-THEN"],
      points: 30,
    },
    {
      id: "q19",
      question: "How to remove duplicates with DISTINCT?",
      category: "DISTINCT",
      difficulty: "Easy",
      answer: "SELECT DISTINCT column1, column2 FROM table_name;",
      explanation: "DISTINCT removes duplicate rows from the result set. Returns only unique combinations of values.",
      example: "SELECT DISTINCT department_id FROM employees;\nSELECT DISTINCT job_id, department_id FROM employees;",
      tags: ["DISTINCT", "unique", "duplicates"],
      points: 15,
    },
    {
      id: "q20",
      question: "How to limit number of rows returned?",
      category: "LIMIT/ROWNUM",
      difficulty: "Easy",
      answer: "-- MySQL, PostgreSQL, SQLite\nSELECT * FROM table_name LIMIT 10;\n\n-- Oracle\nSELECT * FROM table_name WHERE ROWNUM <= 10;",
      explanation: "Different databases have different syntax for limiting rows:\n• LIMIT: MySQL, PostgreSQL, SQLite\n• ROWNUM: Oracle\n• TOP: SQL Server",
      example: "SELECT * FROM employees ORDER BY salary DESC LIMIT 5;  -- Top 5 highest salaries\nSELECT * FROM employees WHERE ROWNUM <= 10;  -- First 10 rows in Oracle",
      tags: ["LIMIT", "ROWNUM", "TOP", "pagination"],
      points: 20,
    },
    {
      id: "q21",
      question: "How to use BETWEEN operator?",
      category: "WHERE Clause",
      difficulty: "Easy",
      answer: "SELECT * FROM table_name WHERE column_name BETWEEN value1 AND value2;",
      explanation: "BETWEEN selects values within a given range (inclusive). Equivalent to: column >= value1 AND column <= value2",
      example: "SELECT * FROM employees WHERE salary BETWEEN 3000 AND 7000;\nSELECT * FROM orders WHERE order_date BETWEEN '2023-01-01' AND '2023-12-31';",
      tags: ["BETWEEN", "range", "WHERE"],
      points: 15,
    },
    {
      id: "q22",
      question: "How to use UNION to combine results?",
      category: "Set Operations",
      difficulty: "Medium",
      answer: "SELECT column1 FROM table1\nUNION\nSELECT column2 FROM table2;",
      explanation: "UNION combines results from multiple SELECT statements and removes duplicates. UNION ALL keeps duplicates.",
      example: "SELECT first_name FROM current_employees\nUNION\nSELECT first_name FROM former_employees;\n\nSELECT product_id FROM orders_2023\nUNION ALL\nSELECT product_id FROM orders_2024;",
      tags: ["UNION", "UNION ALL", "set operations"],
      points: 25,
    },
    {
      id: "q23",
      question: "How to create a table?",
      category: "DDL",
      difficulty: "Medium",
      answer: "CREATE TABLE table_name (\n    column1 datatype constraints,\n    column2 datatype constraints,\n    ...\n);",
      explanation: "CREATE TABLE creates a new table. Specify column names, data types, and constraints (PRIMARY KEY, NOT NULL, UNIQUE, etc.).",
      example: "CREATE TABLE employees (\n    employee_id INT PRIMARY KEY,\n    first_name VARCHAR(50) NOT NULL,\n    last_name VARCHAR(50) NOT NULL,\n    email VARCHAR(100) UNIQUE,\n    hire_date DATE NOT NULL,\n    salary DECIMAL(10,2),\n    department_id INT\n);",
      tags: ["CREATE TABLE", "DDL", "database design"],
      points: 30,
    },
    {
      id: "q24",
      question: "How to insert data into a table?",
      category: "DML",
      difficulty: "Easy",
      answer: "INSERT INTO table_name (column1, column2, ...) VALUES (value1, value2, ...);\nINSERT INTO table_name VALUES (value1, value2, ...);",
      explanation: "INSERT adds new rows to a table. You can specify columns or insert into all columns.",
      example: "INSERT INTO employees (employee_id, first_name, last_name, hire_date) VALUES (101, 'John', 'Doe', '2023-01-15');\nINSERT INTO employees VALUES (102, 'Jane', 'Smith', 'jane@email.com', '2023-02-20', 5000, 10);",
      tags: ["INSERT", "DML", "add data"],
      points: 15,
    },
    {
      id: "q25",
      question: "How to update existing data?",
      category: "DML",
      difficulty: "Easy",
      answer: "UPDATE table_name SET column1 = value1, column2 = value2 WHERE condition;",
      explanation: "UPDATE modifies existing rows. Always use WHERE clause to specify which rows to update, otherwise all rows will be updated!",
      example: "UPDATE employees SET salary = salary * 1.1 WHERE department_id = 10;\nUPDATE employees SET email = 'new@email.com' WHERE employee_id = 101;",
      tags: ["UPDATE", "DML", "modify data"],
      points: 20,
    },
  ];

  // Categories for filtering
  const categories = [
    "All",
    "Basic SELECT",
    "WHERE Clause",
    "ORDER BY",
    "Aggregate Functions",
    "GROUP BY",
    "HAVING Clause",
    "JOINs",
    "Subqueries",
    "CASE Statement",
    "DISTINCT",
    "LIMIT/ROWNUM",
    "Set Operations",
    "DDL",
    "DML",
    "Comparison",
    "NULL Handling",
  ];

  const difficulties = ["All", "Easy", "Medium", "Hard"];

  // Filter questions
  const filteredQuestions = sqlQuestions.filter((question) => {
    const matchesSearch =
      question.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      question.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All" || question.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "All" || question.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  // Stats
  const stats = {
    total: sqlQuestions.length,
    easy: sqlQuestions.filter(q => q.difficulty === "Easy").length,
    medium: sqlQuestions.filter(q => q.difficulty === "Medium").length,
    hard: sqlQuestions.filter(q => q.difficulty === "Hard").length,
    completed: Object.values(completedQuestions).filter(Boolean).length,
    totalPoints: sqlQuestions.reduce((sum, q) => sum + q.points, 0),
    earnedPoints: Object.keys(completedQuestions).reduce((sum, id) => {
      const q = sqlQuestions.find(q => q.id === id);
      return sum + (q?.points || 0);
    }, 0),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-blue-100 rounded-2xl">
              <Database className="w-10 h-10 text-blue-600" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">SQL Practice Q&A</h1>
              <p className="text-gray-600 mt-2">
                Master SQL with essential questions, examples, and explanations
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
              <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
              <div className="text-gray-600 text-sm mt-1">Total Questions</div>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
              <div className="text-2xl font-bold text-green-600">{stats.easy}</div>
              <div className="text-gray-600 text-sm mt-1">Easy</div>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
              <div className="text-2xl font-bold text-amber-600">{stats.medium}</div>
              <div className="text-gray-600 text-sm mt-1">Medium</div>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
              <div className="text-2xl font-bold text-red-600">{stats.hard}</div>
              <div className="text-gray-600 text-sm mt-1">Hard</div>
            </div>
            <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
              <div className="text-2xl font-bold text-blue-600">{stats.completed}</div>
              <div className="text-gray-600 text-sm mt-1">Completed</div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search SQL questions, answers, or tags..."
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-gray-500" />
                  <select
                    className="px-4 py-3 rounded-xl border border-gray-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <select
                  className="px-4 py-3 rounded-xl border border-gray-300 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                >
                  {difficulties.map((diff) => (
                    <option key={diff} value={diff}>
                      {diff}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <div className="flex gap-2">
                <button
                  onClick={() => toggleAll(true)}
                  className="px-4 py-2 text-sm bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg transition"
                >
                  Expand All
                </button>
                <button
                  onClick={() => toggleAll(false)}
                  className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition"
                >
                  Collapse All
                </button>
              </div>
              
              <div className="text-sm text-gray-600">
                Showing {filteredQuestions.length} of {sqlQuestions.length} questions
              </div>
            </div>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-6">
          {filteredQuestions.map((question) => {
            const isExpanded = expandedQuestions.includes(question.id);
            const isCompleted = completedQuestions[question.id];
            const difficultyColor = {
              Easy: "bg-green-100 text-green-800",
              Medium: "bg-amber-100 text-amber-800",
              Hard: "bg-red-100 text-red-800",
            }[question.difficulty];

            return (
              <div
                key={question.id}
                className={`bg-white rounded-2xl border overflow-hidden transition-all hover:shadow-lg ${
                  isCompleted ? "border-green-300" : "border-gray-200"
                }`}
              >
                {/* Question Header - ALWAYS VISIBLE */}
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${difficultyColor}`}>
                            {question.difficulty}
                          </span>
                          <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs">
                            {question.points} pts
                          </span>
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                            {question.category}
                          </span>
                        </div>
                        {isCompleted && (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        )}
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {question.question}
                      </h3>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {question.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => toggleQuestion(question.id)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                        >
                          {isExpanded ? (
                            <>
                              <ChevronUp className="w-4 h-4" />
                              Hide Answer
                            </>
                          ) : (
                            <>
                              <ChevronDown className="w-4 h-4" />
                              Show Answer
                            </>
                          )}
                        </button>
                        
                        <button
                          onClick={() => markAsComplete(question.id)}
                          className={`px-4 py-2 rounded-lg transition flex items-center gap-2 ${
                            isCompleted
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          {isCompleted ? (
                            <>
                              <CheckCircle className="w-4 h-4" />
                              Completed
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-4 h-4" />
                              Mark Complete
                            </>
                          )}
                        </button>

                        {question.hint && (
                          <div className="ml-auto text-sm text-gray-500 flex items-center gap-1">
                            <HelpCircle className="w-4 h-4" />
                            Hint available
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded Content - SHOW ON CLICK */}
                {isExpanded && (
                  <div className="px-6 pb-6 border-t border-gray-200 pt-6">
                    {/* Hint (if available) */}
                    {question.hint && (
                      <div className="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <HelpCircle className="w-5 h-5 text-amber-600" />
                          <h4 className="font-semibold text-amber-900">Hint</h4>
                        </div>
                        <p className="text-amber-800">{question.hint}</p>
                      </div>
                    )}

                    {/* Answer */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Target className="w-5 h-5 text-gray-500" />
                        <h4 className="font-semibold text-gray-900">Answer</h4>
                      </div>
                      <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm mb-3 relative group">
                        {question.answer.split('\n').map((line, idx) => (
                          <div key={idx} className="mb-1">
                            {line}
                          </div>
                        ))}
                        <button
                          onClick={() => copyToClipboard(question.answer, question.id)}
                          className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-md transition opacity-0 group-hover:opacity-100"
                        >
                          {copiedIndex === question.id ? (
                            <span className="text-green-400 text-sm">Copied!</span>
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Explanation */}
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Book className="w-5 h-5 text-gray-500" />
                        <h4 className="font-semibold text-gray-900">Explanation</h4>
                      </div>
                      <div className="bg-blue-50 rounded-xl p-5">
                        <p className="text-gray-800 whitespace-pre-line">
                          {question.explanation}
                        </p>
                      </div>
                    </div>

                    {/* Example */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Code className="w-5 h-5 text-gray-500" />
                        <h4 className="font-semibold text-gray-900">Example</h4>
                      </div>
                      <div className="bg-gray-900 text-gray-100 rounded-lg p-4 font-mono text-sm relative group">
                        <span className="text-green-400">SQL&gt; </span>
                        {question.example}
                        <button
                          onClick={() => copyToClipboard(question.example, `example-${question.id}`)}
                          className="absolute right-3 top-3 p-2 bg-gray-800 hover:bg-gray-700 rounded-md transition opacity-0 group-hover:opacity-100"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {filteredQuestions.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
              <Database className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No SQL questions found
              </h3>
              <p className="text-gray-500">
                Try a different search term or filter
              </p>
            </div>
          )}
        </div>

        {/* Learning Tips */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">🎯 How to Practice Effectively</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Read & Understand</h4>
                  <p className="text-gray-700 text-sm mt-1">
                    Read each question carefully before looking at the answer. Try to write the SQL yourself first.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Practice Typing</h4>
                  <p className="text-gray-700 text-sm mt-1">
                    Don't just read - actually type out the SQL queries. Muscle memory helps retention.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Modify Examples</h4>
                  <p className="text-gray-700 text-sm mt-1">
                    Change the examples slightly. What if you wanted different columns? Different conditions?
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  4
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Use Online SQL Editors</h4>
                  <p className="text-gray-700 text-sm mt-1">
                    Practice with <a href="https://sqliteonline.com" className="text-blue-600 hover:underline">SQLite Online</a> or <a href="https://sqlfiddle.com" className="text-blue-600 hover:underline">SQL Fiddle</a>.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  5
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Start with Easy Questions</h4>
                  <p className="text-gray-700 text-sm mt-1">
                    Build confidence with easy questions before moving to medium and hard ones.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  6
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Review Completed</h4>
                  <p className="text-gray-700 text-sm mt-1">
                    Regularly review questions you've marked as completed to reinforce learning.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Reference */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="p-3 bg-green-100 rounded-lg w-fit mb-3">
              <Play className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900">Start with SELECT</h4>
            <p className="text-gray-600 text-sm mt-2">
              Master basic SELECT statements before moving to advanced topics
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="p-3 bg-blue-100 rounded-lg w-fit mb-3">
              <Filter className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900">Learn WHERE Clause</h4>
            <p className="text-gray-600 text-sm mt-2">
              Filtering data is essential for most real-world queries
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="p-3 bg-amber-100 rounded-lg w-fit mb-3">
              <BarChart3 className="w-6 h-6 text-amber-600" />
            </div>
            <h4 className="font-semibold text-gray-900">Master Aggregates</h4>
            <p className="text-gray-600 text-sm mt-2">
              COUNT, SUM, AVG, MIN, MAX are used in almost every report
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-gray-200">
            <div className="p-3 bg-purple-100 rounded-lg w-fit mb-3">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900">Practice JOINs</h4>
            <p className="text-gray-600 text-sm mt-2">
              Combining tables is a critical skill for database work
            </p>
          </div>
        </div>

        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>SQL Practice Q&A • {sqlQuestions.length} essential questions • Complete all to master SQL!</p>
          <p className="mt-2">Click "Show Answer" to reveal the solution and detailed explanation</p>
        </div>
      </div>
    </div>
  );
};

export default SQLPracticePage;