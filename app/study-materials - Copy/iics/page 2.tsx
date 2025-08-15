import React from "react";

const SQLLanguagesPage = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8 bg-gray-50 dark:bg-gray-900">
      {/* Header Section */}
      <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-xl shadow-lg">
        <div className="mb-4 flex flex-wrap justify-center gap-4">
          <a href="tel:8970853557" className="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold hover:bg-blue-100 transition">
            CALL: 8970853557
          </a>
          <a href="https://wa.me/9448005273" className="bg-green-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-600 transition">
            WHATSAPP: 9448005273
          </a>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-2">INFORMATICA IICS COMBO ONLINE TRAINING</h1>
        <p className="text-xl">IICS COMBO BATCH - 11</p>
        <h2 className="text-2xl md:text-3xl font-bold mt-4 bg-white text-blue-600 inline-block px-6 py-2 rounded-lg">
          SQL BASICS: 5 DIFFERENT LANGUAGES IN SQL
        </h2>
      </div>

      {/* Data Types Section */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400">Common SQL Data Types</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <span className="font-mono text-blue-600 dark:text-blue-300">NUMBER</span>
            <p className="mt-1">- MOBILE_NO</p>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <span className="font-mono text-green-600 dark:text-green-300">VARCHAR2</span>
            <p className="mt-1">- NAME OF THE CUSTOMER</p>
          </div>
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
            <span className="font-mono text-purple-600 dark:text-purple-300">DATE</span>
            <p className="mt-1">- DOB, DOJ, DOP</p>
          </div>
        </div>
      </section>

      {/* DDL Section */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-l-4 border-red-500">
        <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
          DATA DEFINITION LANGUAGE (DDL) - CART-D
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <ul className="space-y-3 text-lg">
              <li className="flex items-center">
                <span className="bg-red-100 dark:bg-red-900 p-1 rounded-full mr-3">✓</span>
                <span className="font-semibold">Create</span>
              </li>
              <li className="flex items-center">
                <span className="bg-red-100 dark:bg-red-900 p-1 rounded-full mr-3">✓</span>
                <span className="font-semibold">Alter</span>
              </li>
              <li className="flex items-center">
                <span className="bg-red-100 dark:bg-red-900 p-1 rounded-full mr-3">✓</span>
                <span className="font-semibold">Rename</span>
              </li>
              <li className="flex items-center">
                <span className="bg-red-100 dark:bg-red-900 p-1 rounded-full mr-3">✓</span>
                <span className="font-semibold">Truncate</span>
              </li>
              <li className="flex items-center">
                <span className="bg-red-100 dark:bg-red-900 p-1 rounded-full mr-3">✓</span>
                <span className="font-semibold">Drop</span>
              </li>
            </ul>
          </div>

          {/* CREATE TABLE */}
          <div className="space-y-4">
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="font-bold mb-2 text-lg">CREATE TABLE Syntax</h4>
              <pre className="bg-gray-800 text-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  <span className="text-purple-400">CREATE TABLE</span> <span className="text-yellow-300">TABLE_NAME</span>\n
                  <span className="text-gray-400">(</span>\n
                  <span className="text-blue-400">  COLUMN_NAME1</span> <span className="text-green-400">DATA_TYPE</span><span className="text-pink-400">(LENGTH)</span>,\n
                  <span className="text-blue-400">  COLUMN_NAME2</span> <span className="text-green-400">DATA_TYPE</span><span className="text-pink-400">(LENGTH)</span>,\n
                  <span className="text-gray-400">  ...</span>\n
                  <span className="text-gray-400">);</span>
                </code>
              </pre>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <h4 className="font-bold mb-2">Example:</h4>
              <pre className="bg-gray-800 text-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  <span className="text-purple-400">CREATE TABLE</span> <span className="text-yellow-300">CLIENTS</span>\n
                  <span className="text-gray-400">(</span>\n
                  <span className="text-blue-400">  CLIENT_ID</span> <span className="text-green-400">NUMBER</span><span className="text-pink-400">(5)</span>,\n
                  <span className="text-blue-400">  CLIENT_NAME</span> <span className="text-green-400">VARCHAR2</span><span className="text-pink-400">(30)</span>,\n
                  <span className="text-blue-400">  DATE_OF_PROJECT</span> <span className="text-green-400">DATE</span>,\n
                  <span className="text-blue-400">  MOBILE_NO</span> <span className="text-green-400">NUMBER</span><span className="text-pink-400">(10)</span>\n
                  <span className="text-gray-400">);</span>
                </code>
              </pre>
            </div>
          </div>
        </div>

        {/* ALTER TABLE */}
        <div className="mt-8 space-y-6">
          <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400">ALTER TABLE Operations</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* ADD COLUMN */}
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="font-bold mb-2">ADD COLUMN</h4>
              <pre className="bg-gray-800 text-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  <span className="text-purple-400">ALTER TABLE</span> <span className="text-yellow-300">CLIENTS</span>\n
                  <span className="text-purple-400">ADD</span> <span className="text-blue-400">COUNTRY</span> <span className="text-green-400">VARCHAR2</span><span className="text-pink-400">(10)</span><span className="text-gray-400">;</span>
                </code>
              </pre>
            </div>

            {/* MODIFY COLUMN */}
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="font-bold mb-2">MODIFY COLUMN</h4>
              <pre className="bg-gray-800 text-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  <span className="text-purple-400">ALTER TABLE</span> <span className="text-yellow-300">CLIENTS</span>\n
                  <span className="text-purple-400">MODIFY</span> <span className="text-blue-400">MOBILE_NO</span> <span className="text-green-400">NUMBER</span><span className="text-pink-400">(15)</span><span className="text-gray-400">;</span>
                </code>
              </pre>
              <div className="mt-2 text-sm text-red-600 dark:text-red-400">
                <p>After modifying length:</p>
                <pre className="bg-gray-800 text-gray-100 p-2 rounded">
                  <code>
                    <span className="text-purple-400">INSERT INTO</span> <span className="text-yellow-300">CLIENTS</span>\n
                    <span className="text-purple-400">VALUES</span><span className="text-gray-400">(</span><span className="text-pink-400">102</span>,<span className="text-pink-400">'HARI'</span>,\n
                    <span className="text-green-400">TO_DATE</span><span className="text-gray-400">(</span><span className="text-pink-400">'06/03/2021'</span>,<span className="text-pink-400">'MM/DD/YYYY'</span><span className="text-gray-400">)</span>,\n
                    <span className="text-pink-400">944800525812</span>,<span className="text-pink-400">'INDIA'</span><span className="text-gray-400">);</span>
                  </code>
                </pre>
              </div>
            </div>

            {/* RENAME COLUMN */}
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="font-bold mb-2">RENAME COLUMN</h4>
              <pre className="bg-gray-800 text-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  <span className="text-purple-400">ALTER TABLE</span> <span className="text-yellow-300">CLIENTS</span>\n
                  <span className="text-purple-400">RENAME COLUMN</span> <span className="text-blue-400">MOBILE_NO</span> <span className="text-purple-400">TO</span> <span className="text-blue-400">CONTACT_NO</span><span className="text-gray-400">;</span>
                </code>
              </pre>
            </div>

            {/* DROP COLUMN */}
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="font-bold mb-2">DROP COLUMN</h4>
              <pre className="bg-gray-800 text-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  <span className="text-purple-400">ALTER TABLE</span> <span className="text-yellow-300">CLIENTS</span>\n
                  <span className="text-purple-400">DROP COLUMN</span> <span className="text-blue-400">COUNTRY</span><span className="text-gray-400">;</span>
                </code>
              </pre>
            </div>
          </div>
        </div>

        {/* Other DDL Commands */}
        <div className="mt-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* RENAME TABLE */}
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="font-bold mb-2">RENAME TABLE</h4>
              <pre className="bg-gray-800 text-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  <span className="text-purple-400">RENAME</span> <span className="text-yellow-300">CLIENTS</span> <span className="text-purple-400">TO</span> <span className="text-yellow-300">NEW_CLIENTS</span><span className="text-gray-400">;</span>
                </code>
              </pre>
            </div>

            {/* TRUNCATE TABLE */}
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="font-bold mb-2">TRUNCATE TABLE</h4>
              <pre className="bg-gray-800 text-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  <span className="text-purple-400">TRUNCATE TABLE</span> <span className="text-yellow-300">NEW_CLIENTS</span><span className="text-gray-400">;</span>
                </code>
              </pre>
            </div>

            {/* DROP TABLE */}
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="font-bold mb-2">DROP TABLE</h4>
              <pre className="bg-gray-800 text-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  <span className="text-purple-400">DROP TABLE</span> <span className="text-yellow-300">NEW_CLIENTS</span><span className="text-gray-400">;</span>
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* DML Section */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-l-4 border-green-500">
        <h2 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-4">
          DATA MANIPULATION LANGUAGE (DML) - IDUME
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <ul className="space-y-3 text-lg">
              <li className="flex items-center">
                <span className="bg-green-100 dark:bg-green-900 p-1 rounded-full mr-3">✓</span>
                <span className="font-semibold">Insert</span>
              </li>
              <li className="flex items-center">
                <span className="bg-green-100 dark:bg-green-900 p-1 rounded-full mr-3">✓</span>
                <span className="font-semibold">Delete</span>
              </li>
              <li className="flex items-center">
                <span className="bg-green-100 dark:bg-green-900 p-1 rounded-full mr-3">✓</span>
                <span className="font-semibold">Update</span>
              </li>
              <li className="flex items-center">
                <span className="bg-green-100 dark:bg-green-900 p-1 rounded-full mr-3">✓</span>
                <span className="font-semibold">Merge</span>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            {/* INSERT */}
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="font-bold mb-2">INSERT Examples</h4>
              <div className="space-y-3">
                <pre className="bg-gray-800 text-gray-100 p-3 rounded-md overflow-x-auto text-sm">
                  <code>
                    <span className="text-purple-400">INSERT INTO</span> <span className="text-yellow-300">CLIENTS</span>\n
                    <span className="text-purple-400">VALUES</span><span className="text-gray-400">(</span><span className="text-pink-400">100</span>,<span className="text-pink-400">'KRISHNAN'</span>,\n
                    <span className="text-green-400">TO_DATE</span><span className="text-gray-400">(</span><span className="text-pink-400">'03/02/2022'</span>,<span className="text-pink-400">'MM/DD/YYYY'</span><span className="text-gray-400">)</span>,\n
                    <span className="text-pink-400">9742604296</span><span className="text-gray-400">);</span>
                  </code>
                </pre>
                <pre className="bg-gray-800 text-gray-100 p-3 rounded-md overflow-x-auto text-sm">
                  <code>
                    <span className="text-purple-400">INSERT INTO</span> <span className="text-yellow-300">CLIENTS</span>\n
                    <span className="text-purple-400">VALUES</span><span className="text-gray-400">(</span><span className="text-pink-400">101</span>,<span className="text-pink-400">'RISHAB'</span>,\n
                    <span className="text-green-400">TO_DATE</span><span className="text-gray-400">(</span><span className="text-pink-400">'05/03/2022'</span>,<span className="text-pink-400">'MM/DD/YYYY'</span><span className="text-gray-400">)</span>,\n
                    <span className="text-pink-400">9448005255</span><span className="text-gray-400">);</span>
                  </code>
                </pre>
              </div>
            </div>
            
            {/* DELETE */}
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="font-bold mb-2">DELETE Syntax</h4>
              <pre className="bg-gray-800 text-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  <span className="text-purple-400">DELETE FROM</span> <span className="text-yellow-300">CLIENTS</span>\n
                  <span className="text-purple-400">WHERE</span> <span className="text-blue-400">CLIENT_ID</span> <span className="text-gray-400">=</span> <span className="text-pink-400">101</span><span className="text-gray-400">;</span>
                </code>
              </pre>
            </div>
            
            {/* UPDATE */}
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h4 className="font-bold mb-2">UPDATE Examples</h4>
              <div className="space-y-3">
                <pre className="bg-gray-800 text-gray-100 p-3 rounded-md overflow-x-auto text-sm">
                  <code>
                    <span className="text-purple-400">UPDATE</span> <span className="text-yellow-300">CLIENTS</span>\n
                    <span className="text-purple-400">SET</span> <span className="text-blue-400">MOBILE_NO</span> <span className="text-gray-400">=</span> <span className="text-pink-400">9448005273</span>\n
                    <span className="text-purple-400">WHERE</span> <span className="text-blue-400">CLIENT_ID</span> <span className="text-gray-400">=</span> <span className="text-pink-400">100</span><span className="text-gray-400">;</span>
                  </code>
                </pre>
                <pre className="bg-gray-800 text-gray-100 p-3 rounded-md overflow-x-auto text-sm">
                  <code>
                    <span className="text-purple-400">UPDATE</span> <span className="text-yellow-300">CLIENTS</span>\n
                    <span className="text-purple-400">SET</span> <span className="text-blue-400">CLIENT_NAME</span> <span className="text-gray-400">=</span> <span className="text-pink-400">'HARI'</span>\n
                    <span className="text-purple-400">WHERE</span> <span className="text-blue-400">CLIENT_ID</span> <span className="text-gray-400">=</span> <span className="text-pink-400">100</span><span className="text-gray-400">;</span>
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DRL Section */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-l-4 border-blue-500">
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
          DATA RETRIEVAL LANGUAGE (DRL)
        </h2>
        
        <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          <pre className="bg-gray-800 text-gray-100 p-4 rounded-md overflow-x-auto">
            <code>
              <span className="text-purple-400">SELECT</span> <span className="text-yellow-400">*</span> <span className="text-purple-400">FROM</span> <span className="text-yellow-300">CLIENTS</span><span className="text-gray-400">;</span>
            </code>
          </pre>
        </div>
      </section>

      {/* TCL Section */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-l-4 border-purple-500">
        <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">
          TRANSACTIONAL CONTROL LANGUAGE (TCL)
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <h4 className="font-bold mb-2">COMMIT</h4>
            <pre className="bg-gray-800 text-gray-100 p-4 rounded-md overflow-x-auto">
              <code>
                <span className="text-purple-400">COMMIT</span><span className="text-gray-400">;</span>
              </code>
            </pre>
            <p className="mt-2 text-sm">Saves all transactions to the database</p>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <h4 className="font-bold mb-2">ROLLBACK</h4>
            <pre className="bg-gray-800 text-gray-100 p-4 rounded-md overflow-x-auto">
              <code>
                <span className="text-purple-400">ROLLBACK</span><span className="text-gray-400">;</span>
              </code>
            </pre>
            <p className="mt-2 text-sm">Undoes transactions since last COMMIT</p>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <div className="text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-xl shadow-lg">
        <h3 className="text-xl md:text-2xl font-bold mb-4">Ready to Master SQL?</h3>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="tel:8970853557" className="bg-white text-blue-600 px-4 py-2 rounded-lg font-bold hover:bg-blue-100 transition">
            CALL: 8970853557
          </a>
          <a href="https://wa.me/9448005273" className="bg-green-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-600 transition">
            WHATSAPP: 9448005273
          </a>
        </div>
        <p className="mt-4">INFORMATICA IICS COMBO ONLINE TRAINING - BATCH 11</p>
      </div>
    </div>
  );
};

export default SQLLanguagesPage;