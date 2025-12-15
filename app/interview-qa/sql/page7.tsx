'use client';
import React, { useState } from 'react';

const sqlQuestions = [
  {
    id: 1,
    question: "📌 What is SQL, and Why is it Important?",
    answer: (
      <div>
        <p>🔹 <strong>SQL (Structured Query Language)</strong> is a special language...</p>
        {/* rest of your content */}
      </div>
    ),
    category: "SQL Basics"
  },
  {
    id: 2,
    question: "🔑 What is a Primary Key, and Why is it Important?",
    answer: (
      <div>
        <p>🔹 A <strong>Primary Key</strong> is like a <strong>roll number</strong>...</p>
      </div>
    ),
    category: "Database Concepts"
  },
  {
    id: 3,
    question: "🌉 What is a Foreign Key, and How is it Related to a Primary Key?",
    answer: (
      <div>
        <p>🔹 A <strong>Foreign Key</strong> is a column (field) in one table...</p>
      </div>
    ),
    category: "Database Concepts"
  },
  {
    id: 4,
    question: "🔄 Describe the differences between INNER JOIN, LEFT JOIN, and RIGHT JOIN",
    answer: (
      <div>
        <p>🔹 In SQL, <strong>JOINS</strong> are used to bring data together...</p>
      </div>
    ),
    category: "Joins"
  },
  {
    id: 5,
    question: "🔄 What is a Self-Join, and When Do We Use It?",
    answer: (
      <div>
        <p>🔹 A <strong>Self-Join</strong> is when a table is <strong>joined with itself</strong>...</p>
      </div>
    ),
    category: "Joins"
  },
  {
    id: 6,
    question: "🔄 Difference Between SQL and NoSQL Databases",
    answer: (
      <div>
        <p>🔹 Databases are used to store and manage data — just like storing files in a cabinet...</p>
      </div>
    ),
    category: "Database Types"
  },
];

const uniqueCategories = ['All', ...new Set(sqlQuestions.map(q => q.category))];

export default function SQLInterviewPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredQuestions = selectedCategory === 'All'
    ? sqlQuestions
    : sqlQuestions.filter(q => q.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">📚 SQL Interview Q&A</h1>
          <p className="text-lg text-gray-600">Beginner-friendly questions with simple explanations</p>
        </div>

        <div className="mb-6 text-center">
          <label htmlFor="category" className="block mb-2 font-medium text-gray-700">Filter by Category</label>
          <select
            id="category"
            className="px-4 py-2 border rounded-md text-sm"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {uniqueCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="space-y-6">
          {filteredQuestions.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow overflow-hidden rounded-lg hover:shadow-lg transition-shadow duration-200"
            >
              <div className="px-6 py-5 border-b border-gray-200">
                <h3 className="text-lg font-medium text-gray-900">{item.question}</h3>
              </div>
              <div className="px-6 py-4">
                <div className="prose prose-sm max-w-none text-gray-600">
                  {item.answer}
                </div>
              </div>
              <div className="px-6 py-3 bg-gray-50 text-right">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center text-sm text-gray-500">
          <p>Showing {filteredQuestions.length} of {sqlQuestions.length} questions • Prepared by Rishab Informatica Group</p>
        </div>
      </div>
    </div>
  );
}
