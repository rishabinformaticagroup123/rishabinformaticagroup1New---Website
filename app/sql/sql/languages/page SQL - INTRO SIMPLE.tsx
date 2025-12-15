import React from "react";

const SQLTrainingGuide = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8 bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="text-center bg-blue-50 dark:bg-blue-900/30 p-6 rounded-xl">
        <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-300 mb-2">
          SQL Basics Training Guide
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          For Beginners and Non-IT Professionals
        </p>
        <div className="mt-4 flex justify-center gap-4">
          <a href="tel:8970853557" className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-medium">
            CALL: 8970853557
          </a>
          <a href="https://wa.me/9448005273" className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-medium">
            WHATSAPP: 9448005273
          </a>
        </div>
      </div>

      {/* Introduction */}
      <section className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          What is SQL?
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          SQL (Structured Query Language) is used to communicate with databases. Think of it like:
        </p>
        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg mt-3 border border-yellow-200 dark:border-yellow-800">
          <p className="text-yellow-800 dark:text-yellow-200">
            "SQL is like the language you use to talk to a librarian (database) - you ask for specific books (data) using certain phrases (queries)."
          </p>
        </div>
      </section>

      {/* Data Types */}
      <section className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          Common Data Types
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
            <h3 className="font-mono text-blue-600 dark:text-blue-400">NUMBER</h3>
            <p className="text-gray-600 dark:text-gray-300">
              For numeric values like:
              <span className="block mt-1 font-medium">Mobile numbers, IDs, Prices</span>
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Example: NUMBER(10) for 10-digit numbers
            </p>
          </div>
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
            <h3 className="font-mono text-green-600 dark:text-green-400">VARCHAR2</h3>
            <p className="text-gray-600 dark:text-gray-300">
              For text data like:
              <span className="block mt-1 font-medium">Names, Addresses, Descriptions</span>
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Example: VARCHAR2(50) for text up to 50 characters
            </p>
          </div>
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
            <h3 className="font-mono text-purple-600 dark:text-purple-400">DATE</h3>
            <p className="text-gray-600 dark:text-gray-300">
              For dates like:
              <span className="block mt-1 font-medium">Birth dates, Order dates, Deadlines</span>
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Stores day, month, year and time
            </p>
          </div>
        </div>
      </section>

      {/* DDL Section */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-red-500">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          1. DDL - Data Definition Language
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Commands to create and modify database structures (like building the bookshelves in our library analogy).
        </p>

        <div className="space-y-6">
          {/* CREATE TABLE */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">CREATE TABLE</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-3">
              Creates a new table with columns and data types:
            </p>
            <pre className="bg-gray-800 text-gray-100 p-4 rounded-md overflow-auto">
              <code>
                <span className="text-purple-400">CREATE TABLE</span> <span className="text-yellow-300">clients</span> <span className="text-gray-400">(</span>
                <span className="text-blue-400">  client_id</span>   <span className="text-green-400">NUMBER</span><span className="text-pink-400">(5)</span><span className="text-gray-400">,</span>
                <span className="text-blue-400">  client_name</span> <span className="text-green-400">VARCHAR2</span><span className="text-pink-400">(30)</span><span className="text-gray-400">,</span>
                <span className="text-blue-400">  date_of_project</span> <span className="text-green-400">DATE</span><span className="text-gray-400">,</span>
                <span className="text-blue-400">  mobile_no</span>  <span className="text-green-400">NUMBER</span><span className="text-pink-400">(10)</span>
                <span className="text-gray-400">);</span>
              </code>
            </pre>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              This creates a table to store client information with 4 columns.
            </p>
          </div>

          {/* INSERT DATA */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">INSERT DATA</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-3">
              Add records to the table (putting books on the shelves):
            </p>
            
            <div className="space-y-4">
              {/* First INSERT */}
              <pre className="bg-gray-800 text-gray-100 p-4 rounded-md overflow-auto">
                <code>
                  <span className="text-purple-400">INSERT INTO</span> <span className="text-yellow-300">clients</span>
                  <span className="text-purple-400">VALUES</span><span className="text-gray-400">(</span>
                  <span className="text-pink-400">  100</span><span className="text-gray-400">,</span>
                  <span className="text-pink-400">  'Krishnan'</span><span className="text-gray-400">,</span>
                  <span className="text-green-400">  TO_DATE</span><span className="text-gray-400">(</span><span className="text-pink-400">'03/02/2022'</span><span className="text-gray-400">,</span> <span className="text-pink-400">'MM/DD/YYYY'</span><span className="text-gray-400">)</span><span className="text-gray-400">,</span>
                  <span className="text-pink-400">  9742604296</span>
                  <span className="text-gray-400">);</span>
                </code>
              </pre>

              {/* Second INSERT */}
              <pre className="bg-gray-800 text-gray-100 p-4 rounded-md overflow-auto">
                <code>
                  <span className="text-purple-400">INSERT INTO</span> <span className="text-yellow-300">clients</span>
                  <span className="text-purple-400">VALUES</span><span className="text-gray-400">(</span>
                  <span className="text-pink-400">  101</span><span className="text-gray-400">,</span>
                  <span className="text-pink-400">  'Rishab'</span><span className="text-gray-400">,</span>
                  <span className="text-green-400">  TO_DATE</span><span className="text-gray-400">(</span><span className="text-pink-400">'05/03/2022'</span><span className="text-gray-400">,</span> <span className="text-pink-400">'MM/DD/YYYY'</span><span className="text-gray-400">)</span><span className="text-gray-400">,</span>
                  <span className="text-pink-400">  9448005255</span>
                  <span className="text-gray-400">);</span>
                </code>
              </pre>

              {/* Third INSERT */}
              <pre className="bg-gray-800 text-gray-100 p-4 rounded-md overflow-auto">
                <code>
                  <span className="text-purple-400">INSERT INTO</span> <span className="text-yellow-300">clients</span>
                  <span className="text-purple-400">VALUES</span><span className="text-gray-400">(</span>
                  <span className="text-pink-400">  102</span><span className="text-gray-400">,</span>
                  <span className="text-pink-400">  'Hari'</span><span className="text-gray-400">,</span>
                  <span className="text-green-400">  TO_DATE</span><span className="text-gray-400">(</span><span className="text-pink-400">'06/03/2021'</span><span className="text-gray-400">,</span> <span className="text-pink-400">'MM/DD/YYYY'</span><span className="text-gray-400">)</span><span className="text-gray-400">,</span>
                  <span className="text-pink-400">  9448005258</span>
                  <span className="text-gray-400">);</span>
                </code>
              </pre>
            </div>

            <div className="mt-3 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-blue-800 dark:text-blue-200">
                <span className="font-bold">Note:</span> TO_DATE converts text to proper date format. 
                <span className="block">'MM/DD/YYYY' tells Oracle the month comes first in our dates.</span>
              </p>
            </div>
          </div>

          {/* VIEW DATA */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">VIEW DATA</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-3">
              Retrieve all data from the table (look at all books on the shelf):
            </p>
            <pre className="bg-gray-800 text-gray-100 p-4 rounded-md overflow-auto">
              <code>
                <span className="text-purple-400">SELECT</span> <span className="text-yellow-400">*</span> <span className="text-purple-400">FROM</span> <span className="text-yellow-300">clients</span><span className="text-gray-400">;</span>
              </code>
            </pre>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              The asterisk (*) means "all columns". This will show all client records.
            </p>
          </div>

          {/* ALTER TABLE */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">MODIFY TABLE STRUCTURE</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-3">
              Change the table after creation (like adding new shelves or rearranging):
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              {/* ADD COLUMN */}
              <div className="bg-white dark:bg-gray-600 p-3 rounded-lg shadow">
                <h4 className="font-medium mb-2">Add Country Column</h4>
                <pre className="bg-gray-800 text-gray-100 p-3 rounded-md overflow-auto text-sm">
                  <code>
                    <span className="text-purple-400">ALTER TABLE</span> <span className="text-yellow-300">clients</span>
                    <span className="text-purple-400">ADD</span> <span className="text-blue-400">country</span> <span className="text-green-400">VARCHAR2</span><span className="text-pink-400">(10)</span><span className="text-gray-400">;</span>
                  </code>
                </pre>
              </div>

              {/* MODIFY COLUMN */}
              <div className="bg-white dark:bg-gray-600 p-3 rounded-lg shadow">
                <h4 className="font-medium mb-2">Increase Mobile Number Length</h4>
                <pre className="bg-gray-800 text-gray-100 p-3 rounded-md overflow-auto text-sm">
                  <code>
                    <span className="text-purple-400">ALTER TABLE</span> <span className="text-yellow-300">clients</span>
                    <span className="text-purple-400">MODIFY</span> <span className="text-blue-400">mobile_no</span> <span className="text-green-400">NUMBER</span><span className="text-pink-400">(15)</span><span className="text-gray-400">;</span>
                  </code>
                </pre>
                <p className="mt-1 text-xs text-gray-600 dark:text-gray-300">
                  Needed when storing international numbers with more digits
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DML Section */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-green-500 mt-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          2. DML - Data Manipulation Language
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Commands to work with the actual data (like checking out or returning books in our library).
        </p>

        <div className="space-y-6">
          {/* UPDATE */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">UPDATE RECORDS</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-3">
              Change existing data (like correcting a book's information):
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-600 p-3 rounded-lg shadow">
                <h4 className="font-medium mb-2">Update Mobile Number</h4>
                <pre className="bg-gray-800 text-gray-100 p-3 rounded-md overflow-auto text-sm">
                  <code>
                    <span className="text-purple-400">UPDATE</span> <span className="text-yellow-300">clients</span>
                    <span className="text-purple-400">SET</span> <span className="text-blue-400">mobile_no</span> <span className="text-gray-400">=</span> <span className="text-pink-400">9448005273</span>
                    <span className="text-purple-400">WHERE</span> <span className="text-blue-400">client_id</span> <span className="text-gray-400">=</span> <span className="text-pink-400">100</span><span className="text-gray-400">;</span>
                  </code>
                </pre>
              </div>

              <div className="bg-white dark:bg-gray-600 p-3 rounded-lg shadow">
                <h4 className="font-medium mb-2">Update Client Name</h4>
                <pre className="bg-gray-800 text-gray-100 p-3 rounded-md overflow-auto text-sm">
                  <code>
                    <span className="text-purple-400">UPDATE</span> <span className="text-yellow-300">clients</span>
                    <span className="text-purple-400">SET</span> <span className="text-blue-400">client_name</span> <span className="text-gray-400">=</span> <span className="text-pink-400">'Hari'</span>
                    <span className="text-purple-400">WHERE</span> <span className="text-blue-400">client_id</span> <span className="text-gray-400">=</span> <span className="text-pink-400">100</span><span className="text-gray-400">;</span>
                  </code>
                </pre>
              </div>
            </div>

            <div className="mt-3 bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <p className="text-yellow-800 dark:text-yellow-200">
                <span className="font-bold">Warning:</span> Always use WHERE clause or you'll update ALL records!
              </p>
            </div>
          </div>

          {/* DELETE */}
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">DELETE RECORDS</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-3">
              Remove data from the table (like removing a damaged book):
            </p>
            <pre className="bg-gray-800 text-gray-100 p-4 rounded-md overflow-auto">
              <code>
                <span className="text-purple-400">DELETE FROM</span> <span className="text-yellow-300">clients</span>
                <span className="text-purple-400">WHERE</span> <span className="text-blue-400">client_id</span> <span className="text-gray-400">=</span> <span className="text-pink-400">101</span><span className="text-gray-400">;</span>
              </code>
            </pre>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              This removes only the client with ID 101. Without WHERE, it would delete all clients!
            </p>
          </div>
        </div>
      </section>

      {/* TCL Section */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-yellow-500 mt-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          3. TCL - Transaction Control Language
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-4">
          Commands to manage database transactions (like finalizing your book checkout).
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">COMMIT</h3>
            <pre className="bg-gray-800 text-gray-100 p-4 rounded-md overflow-auto">
              <code>
                <span className="text-purple-400">COMMIT</span><span className="text-gray-400">;</span>
              </code>
            </pre>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Saves all changes permanently. Like confirming your book checkout is complete.
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-lg font-semibold mb-3">ROLLBACK</h3>
            <pre className="bg-gray-800 text-gray-100 p-4 rounded-md overflow-auto">
              <code>
                <span className="text-purple-400">ROLLBACK</span><span className="text-gray-400">;</span>
              </code>
            </pre>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Undoes changes since last COMMIT. Like canceling your book checkout before finalizing.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="text-center mt-12 pt-6 border-t border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold mb-4">Ready to Practice SQL?</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          For more hands-on exercises and personalized training:
        </p>
        <div className="flex justify-center gap-4">
          <a href="tel:8970853557" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition">
            CALL: 8970853557
          </a>
          <a href="https://wa.me/9448005273" className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition">
            WHATSAPP: 9448005273
          </a>
        </div>
        <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          INFORMATICA IICS COMBO ONLINE TRAINING - BATCH 11
        </p>
      </div>
    </div>
  );
};

export default SQLTrainingGuide;