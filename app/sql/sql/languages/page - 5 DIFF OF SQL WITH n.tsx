import React from "react";

const SQLLanguagesPage = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-blue-700 dark:text-blue-400 mb-2">
          5 Different Languages in SQL
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
          Master the core SQL command categories with practical examples
        </p>
        <div className="flex justify-center gap-4">
          <a href="tel:8970853557" className="bg-blue-100 text-blue-700 px-4 py-2 rounded-lg font-medium hover:bg-blue-200 transition">
            CALL: 8970853557
          </a>
          <a href="https://wa.me/9448005273" className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-medium hover:bg-green-200 transition">
            WHATSAPP: 9448005273
          </a>
        </div>
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          INFORMATICA IICS COMBO ONLINE TRAINING
        </p>
      </div>

      {/* Data Types Section */}
      <section className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border-l-4 border-blue-500">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          📚 Fundamental SQL Data Types
        </h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          SQL uses specific data types to define what kind of data can be stored in each column:
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
            <h3 className="font-mono text-blue-600 dark:text-blue-400">NUMBER</h3>
            <p className="text-gray-600 dark:text-gray-300">- Used for numeric values like MOBILE_NO</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Example: NUMBER(10) for 10-digit numbers</p>
          </div>
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
            <h3 className="font-mono text-green-600 dark:text-green-400">VARCHAR2</h3>
            <p className="text-gray-600 dark:text-gray-300">- Used for text like NAME_OF_CUSTOMER</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Example: VARCHAR2(30) for names up to 30 chars</p>
          </div>
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
            <h3 className="font-mono text-purple-600 dark:text-purple-400">DATE</h3>
            <p className="text-gray-600 dark:text-gray-300">- Used for dates like DOB, DOJ, DOP</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Stores day, month, year, and time</p>
          </div>
        </div>
      </section>

      {/* DDL Section */}
      <section className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border-l-4 border-red-500">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          1. DDL – Data Definition Language (CART-D)
        </h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          DDL commands are used to define and modify database structures. They work with the database schema and include:
        </p>
        
        <div className="grid md:grid-cols-5 gap-4 mb-6">
          {['Create', 'Alter', 'Rename', 'Truncate', 'Drop'].map((cmd) => (
            <div key={cmd} className="bg-white dark:bg-gray-700 p-3 rounded-lg shadow text-center">
              <span className="font-bold text-blue-600 dark:text-blue-400">{cmd}</span>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          {/* CREATE TABLE */}
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <span className="bg-blue-100 text-blue-800 p-1 rounded-full mr-2">✓</span>
              CREATE TABLE Statement
            </h3>
            <p className="mb-3 text-gray-700 dark:text-gray-300">
              Creates a new table with specified columns and data types:
            </p>
            <pre className="bg-gray-800 text-gray-100 p-4 rounded-md overflow-auto text-sm">
              <code>
                <span className="text-purple-400">CREATE TABLE</span> <span className="text-yellow-300">CLIENTS</span> <span className="text-gray-400">(</span>\n
                <span className="text-blue-400">  CLIENT_ID</span> <span className="text-green-400">NUMBER</span><span className="text-pink-400">(5)</span><span className="text-gray-400">,</span>\n
                <span className="text-blue-400">  CLIENT_NAME</span> <span className="text-green-400">VARCHAR2</span><span className="text-pink-400">(30)</span><span className="text-gray-400">,</span>\n
                <span className="text-blue-400">  DATE_OF_PROJECT</span> <span className="text-green-400">DATE</span><span className="text-gray-400">,</span>\n
                <span className="text-blue-400">  MOBILE_NO</span> <span className="text-green-400">NUMBER</span><span className="text-pink-400">(10)</span>\n
                <span className="text-gray-400">);</span>
              </code>
            </pre>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              <strong>Tip:</strong> Always specify appropriate data types and lengths for your columns.
            </p>
          </div>

          {/* ALTER TABLE */}
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <span className="bg-blue-100 text-blue-800 p-1 rounded-full mr-2">✓</span>
              ALTER TABLE Operations
            </h3>
            <p className="mb-3 text-gray-700 dark:text-gray-300">
              Modifies an existing table structure after creation:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4">
              {/* ADD COLUMN */}
              <div className="bg-gray-100 dark:bg-gray-600 p-3 rounded-lg">
                <h4 className="font-medium mb-1">Add Column</h4>
                <pre className="bg-gray-800 text-gray-100 p-2 rounded text-xs overflow-auto">
                  <code>
                    <span className="text-purple-400">ALTER TABLE</span> <span className="text-yellow-300">CLIENTS</span>\n
                    <span className="text-purple-400">ADD</span> <span className="text-blue-400">COUNTRY</span> <span className="text-green-400">VARCHAR2</span><span className="text-pink-400">(10)</span><span className="text-gray-400">;</span>
                  </code>
                </pre>
              </div>

              {/* MODIFY COLUMN */}
              <div className="bg-gray-100 dark:bg-gray-600 p-3 rounded-lg">
                <h4 className="font-medium mb-1">Modify Column</h4>
                <pre className="bg-gray-800 text-gray-100 p-2 rounded text-xs overflow-auto">
                  <code>
                    <span className="text-purple-400">ALTER TABLE</span> <span className="text-yellow-300">CLIENTS</span>\n
                    <span className="text-purple-400">MODIFY</span> <span className="text-blue-400">MOBILE_NO</span> <span className="text-green-400">NUMBER</span><span className="text-pink-400">(15)</span><span className="text-gray-400">;</span>
                  </code>
                </pre>
                <p className="mt-1 text-xs text-gray-600 dark:text-gray-300">
                  <strong>Example:</strong> Needed when inserting 12-digit numbers into a 10-digit field
                </p>
              </div>

              {/* RENAME COLUMN */}
              <div className="bg-gray-100 dark:bg-gray-600 p-3 rounded-lg">
                <h4 className="font-medium mb-1">Rename Column</h4>
                <pre className="bg-gray-800 text-gray-100 p-2 rounded text-xs overflow-auto">
                  <code>
                    <span className="text-purple-400">ALTER TABLE</span> <span className="text-yellow-300">CLIENTS</span>\n
                    <span className="text-purple-400">RENAME COLUMN</span> <span className="text-blue-400">MOBILE_NO</span> <span className="text-purple-400">TO</span> <span className="text-blue-400">CONTACT_NO</span><span className="text-gray-400">;</span>
                  </code>
                </pre>
              </div>

              {/* DROP COLUMN */}
              <div className="bg-gray-100 dark:bg-gray-600 p-3 rounded-lg">
                <h4 className="font-medium mb-1">Drop Column</h4>
                <pre className="bg-gray-800 text-gray-100 p-2 rounded text-xs overflow-auto">
                  <code>
                    <span className="text-purple-400">ALTER TABLE</span> <span className="text-yellow-300">CLIENTS</span>\n
                    <span className="text-purple-400">DROP COLUMN</span> <span className="text-blue-400">COUNTRY</span><span className="text-gray-400">;</span>
                  </code>
                </pre>
              </div>
            </div>
          </div>

          {/* Other DDL Commands */}
          <div className="grid md:grid-cols-3 gap-4">
            {/* RENAME TABLE */}
            <div className="bg-white dark:bg-gray-700 p-3 rounded-lg shadow">
              <h4 className="font-semibold mb-2">RENAME TABLE</h4>
              <pre className="bg-gray-800 text-gray-100 p-2 rounded text-sm overflow-auto">
                <code>
                  <span className="text-purple-400">RENAME</span> <span className="text-yellow-300">CLIENTS</span> <span className="text-purple-400">TO</span> <span className="text-yellow-300">NEW_CLIENTS</span><span className="text-gray-400">;</span>
                </code>
              </pre>
            </div>

            {/* TRUNCATE TABLE */}
            <div className="bg-white dark:bg-gray-700 p-3 rounded-lg shadow">
              <h4 className="font-semibold mb-2">TRUNCATE TABLE</h4>
              <pre className="bg-gray-800 text-gray-100 p-2 rounded text-sm overflow-auto">
                <code>
                  <span className="text-purple-400">TRUNCATE TABLE</span> <span className="text-yellow-300">NEW_CLIENTS</span><span className="text-gray-400">;</span>
                </code>
              </pre>
              <p className="mt-1 text-xs text-gray-600 dark:text-gray-300">
                Removes all data but keeps table structure
              </p>
            </div>

            {/* DROP TABLE */}
            <div className="bg-white dark:bg-gray-700 p-3 rounded-lg shadow">
              <h4 className="font-semibold mb-2">DROP TABLE</h4>
              <pre className="bg-gray-800 text-gray-100 p-2 rounded text-sm overflow-auto">
                <code>
                  <span className="text-purple-400">DROP TABLE</span> <span className="text-yellow-300">NEW_CLIENTS</span><span className="text-gray-400">;</span>
                </code>
              </pre>
              <p className="mt-1 text-xs text-gray-600 dark:text-gray-300">
                Completely removes table and its data
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DML Section */}
      <section className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border-l-4 border-green-500">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          2. DML – Data Manipulation Language (IDUME)
        </h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          DML commands are used for managing data within database objects. The core operations are:
        </p>
        
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          {['Insert', 'Delete', 'Update', 'Merge'].map((cmd) => (
            <div key={cmd} className="bg-white dark:bg-gray-700 p-3 rounded-lg shadow text-center">
              <span className="font-bold text-green-600 dark:text-green-400">{cmd}</span>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          {/* INSERT */}
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <span className="bg-green-100 text-green-800 p-1 rounded-full mr-2">✓</span>
              INSERT Statement
            </h3>
            <p className="mb-3 text-gray-700 dark:text-gray-300">
              Adds new records to a table:
            </p>
            <pre className="bg-gray-800 text-gray-100 p-4 rounded-md overflow-auto text-sm">
              <code>
                <span className="text-purple-400">INSERT INTO</span> <span className="text-yellow-300">CLIENTS</span>\n
                <span className="text-purple-400">VALUES</span><span className="text-gray-400">(</span><span className="text-pink-400">100</span>,<span className="text-pink-400">'KRISHNAN'</span>,\n
                <span className="text-green-400">TO_DATE</span><span className="text-gray-400">(</span><span className="text-pink-400">'03/02/2022'</span>,<span className="text-pink-400">'MM/DD/YYYY'</span><span className="text-gray-400">)</span>,\n
                <span className="text-pink-400">9742604296</span><span className="text-gray-400">);</span>
              </code>
            </pre>
            <div className="grid md:grid-cols-3 gap-4 mt-3">
              <pre className="bg-gray-100 dark:bg-gray-600 p-2 rounded text-xs overflow-auto">
                <code>
                  <span className="text-purple-400">INSERT INTO</span> <span className="text-yellow-300">CLIENTS</span>\n
                  <span className="text-purple-400">VALUES</span><span className="text-gray-400">(</span><span className="text-pink-400">101</span>,<span className="text-pink-400">'RISHAB'</span>,\n
                  <span className="text-gray-400">TO_DATE(</span><span className="text-pink-400">'05/03/2022'</span>,<span className="text-pink-400">'MM/DD/YYYY'</span><span className="text-gray-400">)</span>,\n
                  <span className="text-pink-400">9448005255</span><span className="text-gray-400">);</span>
                </code>
              </pre>
              <pre className="bg-gray-100 dark:bg-gray-600 p-2 rounded text-xs overflow-auto">
                <code>
                  <span className="text-purple-400">INSERT INTO</span> <span className="text-yellow-300">CLIENTS</span>\n
                  <span className="text-purple-400">VALUES</span><span className="text-gray-400">(</span><span className="text-pink-400">102</span>,<span className="text-pink-400">'HARI'</span>,\n
                  <span className="text-gray-400">TO_DATE(</span><span className="text-pink-400">'06/03/2021'</span>,<span className="text-pink-400">'MM/DD/YYYY'</span><span className="text-gray-400">)</span>,\n
                  <span className="text-pink-400">9448005258</span><span className="text-gray-400">);</span>
                </code>
              </pre>
            </div>
          </div>

          {/* DELETE */}
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <span className="bg-green-100 text-green-800 p-1 rounded-full mr-2">✓</span>
              DELETE Statement
            </h3>
            <p className="mb-3 text-gray-700 dark:text-gray-300">
              Removes records from a table (always use WHERE clause to avoid deleting all data):
            </p>
            <pre className="bg-gray-800 text-gray-100 p-4 rounded-md overflow-auto text-sm">
              <code>
                <span className="text-purple-400">DELETE FROM</span> <span className="text-yellow-300">CLIENTS</span>\n
                <span className="text-purple-400">WHERE</span> <span className="text-blue-400">CLIENT_ID</span> <span className="text-gray-400">=</span> <span className="text-pink-400">101</span><span className="text-gray-400">;</span>
              </code>
            </pre>
          </div>

          {/* UPDATE */}
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <span className="bg-green-100 text-green-800 p-1 rounded-full mr-2">✓</span>
              UPDATE Statement
            </h3>
            <p className="mb-3 text-gray-700 dark:text-gray-300">
              Modifies existing records in a table:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <pre className="bg-gray-800 text-gray-100 p-3 rounded-md overflow-auto text-sm">
                <code>
                  <span className="text-purple-400">UPDATE</span> <span className="text-yellow-300">CLIENTS</span>\n
                  <span className="text-purple-400">SET</span> <span className="text-blue-400">MOBILE_NO</span> <span className="text-gray-400">=</span> <span className="text-pink-400">9448005273</span>\n
                  <span className="text-purple-400">WHERE</span> <span className="text-blue-400">CLIENT_ID</span> <span className="text-gray-400">=</span> <span className="text-pink-400">100</span><span className="text-gray-400">;</span>
                </code>
              </pre>
              <pre className="bg-gray-800 text-gray-100 p-3 rounded-md overflow-auto text-sm">
                <code>
                  <span className="text-purple-400">UPDATE</span> <span className="text-yellow-300">CLIENTS</span>\n
                  <span className="text-purple-400">SET</span> <span className="text-blue-400">CLIENT_NAME</span> <span className="text-gray-400">=</span> <span className="text-pink-400">'HARI'</span>\n
                  <span className="text-purple-400">WHERE</span> <span className="text-blue-400">CLIENT_ID</span> <span className="text-gray-400">=</span> <span className="text-pink-400">100</span><span className="text-gray-400">;</span>
                </code>
              </pre>
            </div>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              <strong>Note:</strong> Always include WHERE clause to update specific records
            </p>
          </div>
        </div>
      </section>

      {/* DRL Section */}
      <section className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border-l-4 border-blue-500">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          3. DRL – Data Retrieval Language
        </h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          The SELECT statement is used to query data from database tables:
        </p>
        
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
          <pre className="bg-gray-800 text-gray-100 p-4 rounded-md overflow-auto text-sm">
            <code>
              <span className="text-purple-400">SELECT</span> <span className="text-yellow-400">*</span> <span className="text-purple-400">FROM</span> <span className="text-yellow-300">CLIENTS</span><span className="text-gray-400">;</span>
            </code>
          </pre>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            This retrieves all columns from the CLIENTS table. You can specify particular columns:
          </p>
          <pre className="bg-gray-100 dark:bg-gray-600 p-3 rounded mt-2 text-sm overflow-auto">
            <code>
              <span className="text-purple-400">SELECT</span> <span className="text-blue-400">CLIENT_ID</span>, <span className="text-blue-400">CLIENT_NAME</span> <span className="text-purple-400">FROM</span> <span className="text-yellow-300">CLIENTS</span><span className="text-gray-400">;</span>
            </code>
          </pre>
        </div>
      </section>

      {/* TCL Section */}
      <section className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border-l-4 border-yellow-500">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          4. TCL – Transaction Control Language
        </h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          TCL commands manage transactions in the database to maintain data consistency:
        </p>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <span className="bg-yellow-100 text-yellow-800 p-1 rounded-full mr-2">✓</span>
              COMMIT
            </h3>
            <pre className="bg-gray-800 text-gray-100 p-3 rounded-md overflow-auto text-sm">
              <code>
                <span className="text-purple-400">COMMIT</span><span className="text-gray-400">;</span>
              </code>
            </pre>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
              Saves all transactions to the database permanently. Use after completing a set of related operations.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <span className="bg-yellow-100 text-yellow-800 p-1 rounded-full mr-2">✓</span>
              ROLLBACK
            </h3>
            <pre className="bg-gray-800 text-gray-100 p-3 rounded-md overflow-auto text-sm">
              <code>
                <span className="text-purple-400">ROLLBACK</span><span className="text-gray-400">;</span>
              </code>
            </pre>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
              Undoes all transactions since the last COMMIT. Useful for error recovery.
            </p>
          </div>
        </div>
      </section>

      {/* DCL Section */}
      <section className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg border-l-4 border-purple-500">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          5. DCL – Data Control Language
        </h2>
        <p className="mb-4 text-gray-700 dark:text-gray-300">
          DCL commands control access to data in the database:
        </p>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <span className="bg-purple-100 text-purple-800 p-1 rounded-full mr-2">✓</span>
              GRANT
            </h3>
            <pre className="bg-gray-800 text-gray-100 p-3 rounded-md overflow-auto text-sm">
              <code>
                <span className="text-purple-400">GRANT</span> <span className="text-blue-400">SELECT, INSERT</span> <span className="text-purple-400">ON</span> <span className="text-yellow-300">CLIENTS</span>\n
                <span className="text-purple-400">TO</span> <span className="text-green-400">username</span><span className="text-gray-400">;</span>
              </code>
            </pre>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
              Gives specific privileges to users or roles
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <span className="bg-purple-100 text-purple-800 p-1 rounded-full mr-2">✓</span>
              REVOKE
            </h3>
            <pre className="bg-gray-800 text-gray-100 p-3 rounded-md overflow-auto text-sm">
              <code>
                <span className="text-purple-400">REVOKE</span> <span className="text-blue-400">DELETE</span> <span className="text-purple-400">ON</span> <span className="text-yellow-300">CLIENTS</span>\n
                <span className="text-purple-400">FROM</span> <span className="text-green-400">username</span><span className="text-gray-400">;</span>
              </code>
            </pre>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
              Removes previously granted privileges
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="text-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Need help with SQL training? Contact us for more information about our courses:
        </p>
        <div className="flex justify-center gap-4">
          <a href="tel:8970853557" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
            CALL: 8970853557
          </a>
          <a href="https://wa.me/9448005273" className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition">
            WHATSAPP: 9448005273
          </a>
        </div>
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          INFORMATICA IICS COMBO ONLINE TRAINING - BATCH 11
        </p>
      </div>
    </div>
  );
};

export default SQLLanguagesPage;