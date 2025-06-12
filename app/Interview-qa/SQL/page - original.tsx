// app/sql-interview/page.tsx
'use client';
import React, { useState } from 'react';

const sqlQuestions = [
  {
    id: 1,
    question: "1. 📌 What is SQL, and Why is it Important?",
    answer: (
      <div>
        <p>🔹 <strong>SQL (Structured Query Language)</strong> is a special language used to talk to <strong>databases</strong> — just like how we use English or any language to talk to people.</p>
        <p>📂 Imagine a <strong>database</strong> as a digital filing cabinet where all your information (like student details, marks, payments, etc.) is stored neatly in tables. <strong>SQL helps you open that cabinet, find the right file, add new information, or make changes — quickly and easily.</strong></p>
        <ul className="list-disc pl-5 mt-2">
          <li>✅ It helps you <strong>store and organize data</strong> properly (like names, emails, fees, etc.)</li>
          <li>✅ You can <strong>search and find anything</strong> in seconds (e.g., "Show all students from Bangalore")</li>
          <li>✅ You can <strong>update or delete</strong> wrong entries easily</li>
          <li>✅ It works with almost every popular software system used in companies today</li>
        </ul>
        <p className="mt-2">💡 Whether you're working in IT, data, accounts, or even HR, knowing SQL gives you the power to <strong>handle and understand data</strong> — which is the core of almost every job today.</p>
      </div>
    ),
    category: "SQL Basics"
  },
  {
    id: 2,
    question: "2. 🔑 What is a Primary Key, and Why is it Important?",
    answer: (
      <div>
        <p>🔹 A <strong>Primary Key</strong> is like a <strong>roll number</strong> or <strong>unique ID</strong> given to each record (row) in a database table.</p>
        <p>👨‍🎓 Just like how each student in a class has a unique roll number, the <strong>primary key makes sure that every entry in a table is different</strong> and easy to identify.</p>
        <ul className="list-disc pl-5 mt-2">
          <li>🚫 <strong>No Duplicates:</strong> It prevents the same record from being entered twice.</li>
          <li>🚫 <strong>No Empty Values:</strong> It doesn't allow blank or missing values in that column.</li>
          <li>⚡ <strong>Faster Search:</strong> It helps the database find and connect records quickly.</li>
          <li>🤝 <strong>Builds Relationships:</strong> It acts like a bridge between different tables (used in joins and foreign keys).</li>
        </ul>
      </div>
    ),
    category: "Database Concepts"
  },
  {
    id: 3,
    question: "3. 🌉 What is a Foreign Key, and How is it Related to a Primary Key?",
    answer: (
      <div>
        <p>🔹 A <strong>Foreign Key</strong> is a column (field) in one table that connects to the <strong>Primary Key of another table</strong> — like a link between two tables.</p>
        <p>🤔 Think of it like this:<br />
        If <strong>Student_ID</strong> is a Primary Key in the <strong>Students</strong> table, then the same <strong>Student_ID</strong> can be used as a <strong>Foreign Key</strong> in another table like <strong>Fees</strong> or <strong>Courses</strong> to show which student paid or enrolled.</p>
        <ul className="list-disc pl-5 mt-2">
          <li>✅ <strong>Connects tables together</strong> (like Students and their Payments)</li>
          <li>✅ <strong>Keeps data consistent</strong> (you can't enter a fee for a student who doesn't exist)</li>
          <li>✅ <strong>Ensures accuracy in relationships</strong> — like joining puzzle pieces that fit perfectly</li>
        </ul>
      </div>
    ),
    category: "Database Concepts"
  },
  {
    id: 4,
    question: "4. 🔄 Describe the differences between INNER JOIN, LEFT JOIN, and RIGHT JOIN",
    answer: (
      <div>
        <p>🔹 In SQL, <strong>JOINS</strong> are used to bring data together from <strong>two different tables</strong> using a <strong>common column</strong> (usually related by a key like ID).</p>
        
        <p className="font-bold mt-4">1. INNER JOIN – Only Matching Data 🎯</p>
        <p>It shows only the rows where there is a match in both tables.<br />
        If a student exists in the Students table <em>and</em> in the Fees table, you'll see them.</p>
        <p>✔ Good for: Seeing only students who paid.</p>

        <p className="font-bold mt-4">2. LEFT JOIN – All Left Table + Matching Right Table 👈</p>
        <p>Shows all rows from the first (left) table, and matched rows from the second (right) table.<br />
        If there's no match, it still shows the student — but fee info will be NULL (empty).</p>
        <p>✔ Good for: Seeing all students, even if they haven't paid.</p>

        <p className="font-bold mt-4">3. RIGHT JOIN – All Right Table + Matching Left Table 👉</p>
        <p>Shows all rows from the second (right) table, and matched rows from the first (left) table.<br />
        Useful if you want to make sure all records from the Fees table appear, even if there's no matching student.</p>
        <p>✔ Good for: Checking if fees are linked to valid students.</p>

        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="font-bold text-blue-800">Visual Comparison:</p>
          <p className="text-blue-700">| INNER JOIN | Only matching data from both tables |</p>
          <p className="text-blue-700">| LEFT JOIN | All data from left table + matching right |</p>
          <p className="text-blue-700">| RIGHT JOIN | All data from right table + matching left |</p>
        </div>
      </div>
    ),
    category: "Joins"
  },
  {
    id: 5,
    question: "5. 🔄 What is a Self-Join, and When Do We Use It?",
    answer: (
      <div>
        <p>🔹 A <strong>Self-Join</strong> is when a table is <strong>joined with itself</strong> — just like you're comparing rows <strong>within the same table</strong>.</p>
        <p>You use a <strong>self-join</strong> when the data in one table is <strong>related to other data in the same table</strong>.</p>

        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
          <p className="font-bold text-blue-800 mb-2">📊 Simple Example:</p>
          <pre className="text-sm text-blue-800 bg-white p-2 rounded">
            Employee_ID | Name    | Manager_ID<br />
            1          | Ramesh  | NULL<br />
            2          | Anjali  | 1<br />
            3          | Suresh  | 1<br />
            4          | Meena   | 2
          </pre>
        </div>
        <p className="mt-3">Here:<br />
        - Ramesh is the <strong>manager</strong> of Anjali and Suresh<br />
        - Anjali is the <strong>manager</strong> of Meena</p>
        <p>If you want to show <strong>each employee with their manager's name</strong>, you need to <strong>join this table with itself</strong> — because both employee and manager details are in the <strong>same table</strong>.</p>

        <p className="font-bold mt-4">📌 When Do We Use Self-Join?</p>
        <ul className="list-disc pl-5">
          <li>✔ Organizational charts – to show who reports to whom</li>
          <li>✔ Friend networks – to show mutual friends</li>
          <li>✔ Parent-child relationships – like categories and sub-categories</li>
          <li>✔ Product recommendations – like similar items in the same table</li>
        </ul>
      </div>
    ),
    category: "Joins"
  },
  {
    id: 6,
    question: "6. 🔄 Difference Between SQL and NoSQL Databases",
    answer: (
      <div>
        <p>🔹 Databases are used to store and manage data — just like storing files in a cabinet, but digitally. There are two main types: <strong>SQL</strong> and <strong>NoSQL</strong>.</p>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-2">📊 SQL Databases</h3>
            <ul className="list-disc pl-5 text-blue-700 space-y-1">
              <li>Like well-organized Excel sheets</li>
              <li>Fixed table structure (schema)</li>
              <li>Great for connected data</li>
              <li>Used in banking, ERP systems</li>
              <li><strong>Examples:</strong> MySQL, Oracle</li>
            </ul>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-bold text-blue-800 mb-2">📊 NoSQL Databases</h3>
            <ul className="list-disc pl-5 text-blue-700 space-y-1">
              <li>Flexible like documents (JSON)</li>
              <li>No fixed structure</li>
              <li>Great for large, changing data</li>
              <li>Used in social media apps</li>
              <li><strong>Examples:</strong> MongoDB, Firebase</li>
            </ul>
          </div>
        </div>

        <div className="mt-4 bg-blue-100 p-3 rounded-lg border border-blue-300">
          <p className="font-semibold text-blue-900">💡 Simple Analogy:</p>
          <p className="text-blue-800">
            <strong>SQL</strong> = Organized like a school register<br />
            <strong>NoSQL</strong> = Flexible like a personal notebook
          </p>
        </div>
      </div>
    ),
    category: "Database Types"
  }
];

export default function SQLInterviewPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...new Set(sqlQuestions.map(qa => qa.category))];

  const filteredData = sqlQuestions.filter(qa => {
    const matchesSearch = qa.question.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || qa.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-navy-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            <span className="bg-gradient-to-r from-blue-400 to-blue-600 text-transparent bg-clip-text">
              SQL Interview Q&A
            </span>
          </h1>
          <p className="text-xl text-blue-200">Perfect for beginners and non-IT professionals</p>
        </div>

        {/* Search & Filter */}
        <div className="bg-white p-4 rounded-xl shadow-md mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="🔍 Search questions (e.g., 'primary key')..."
              className="flex-grow p-3 border-2 border-blue-300 rounded-lg focus:border-blue-500
                        text-gray-800 placeholder-blue-400 focus:ring-2 focus:ring-blue-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
            <select
              className="p-3 border-2 border-blue-300 rounded-lg text-gray-800
                        focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === "All" ? "All Categories" : category}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div 
                key={item.id} 
                className={`bg-white rounded-xl shadow-md overflow-hidden transition-all
                           hover:shadow-lg ${expandedId === item.id ? 'ring-2 ring-blue-500' : ''}`}
              >
                <div 
                  className="p-5 cursor-pointer flex justify-between items-center"
                  onClick={() => toggleExpand(item.id)}
                >
                  <h2 className="text-lg font-semibold text-gray-800">{item.question}</h2>
                  <span className="text-blue-600 font-bold text-xl">
                    {expandedId === item.id ? '−' : '+'}
                  </span>
                </div>
                
                {expandedId === item.id && (
                  <div className="px-5 pb-5 -mt-2">
                    <div className="border-t border-gray-200 pt-4">
                      {item.answer}
                      <div className="mt-4">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {item.category}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-md">
              <p className="text-gray-600 text-lg mb-4">
                No questions found for "{searchTerm}" in {selectedCategory === "All" ? "any category" : selectedCategory}
              </p>
              <button 
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-blue-300 text-sm">
          <p>Showing {filteredData.length} of {sqlQuestions.length} questions</p>
        </div>
      </div>
    </div>
  );
}