import React from "react";
import Image from "next/image";

const SQLLanguagesPage = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8 bg-gray-50 dark:bg-gray-900 rounded-lg">
      {/* Header Section */}
      <div className="text-center mb-8 p-4 bg-blue-600 text-white rounded-lg">
        <h1 className="text-3xl font-bold">5 Different Languages in SQL</h1>
        <p className="mt-2">Master the core SQL command categories</p>
      </div>

      {/* DDL Section */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-blue-500">
        <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
          Data Definition Language (DDL) - CART-D
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <ul className="space-y-3 list-disc pl-5">
              <li className="font-semibold">Create</li>
              <li className="font-semibold">Alter</li>
              <li className="font-semibold">Rename</li>
              <li className="font-semibold">Truncate</li>
              <li className="font-semibold">Drop</li>
            </ul>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="font-bold mb-2 text-green-700 dark:text-green-400">
              CREATE TABLE Syntax
            </h3>
            <pre className="bg-gray-800 text-gray-100 p-4 rounded-md overflow-x-auto">
              <code>
                <span className="text-purple-400">CREATE TABLE</span> <span className="text-yellow-300">TABLE_NAME</span>\n
                <span className="text-gray-400">(</span>\n
                <span className="text-blue-400">  COLUMN_NAME_1</span> <span className="text-green-400">DATA_TYPE</span><span className="text-pink-400">(LENGTH)</span>,\n
                <span className="text-blue-400">  COLUMN_NAME_2</span> <span className="text-green-400">DATA_TYPE</span><span className="text-pink-400">(LENGTH)</span>,\n
                <span className="text-gray-400">  ...</span>\n
                <span className="text-gray-400">);</span>
              </code>
            </pre>
          </div>
        </div>

        <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
          <h3 className="font-bold text-yellow-700 dark:text-yellow-400 mb-2">Example:</h3>
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
      </section>

      {/* DML Section */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border-l-4 border-green-500 mt-8">
        <h2 className="text-2xl font-bold text-green-600 dark:text-green-400 mb-4">
          Data Manipulation Language (DML) - IDUME
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <ul className="space-y-3 list-disc pl-5">
              <li className="font-semibold">Insert</li>
              <li className="font-semibold">Delete</li>
              <li className="font-semibold">Update</li>
              <li className="font-semibold">Merge</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-bold mb-2 text-green-700 dark:text-green-400">INSERT Syntax</h3>
              <pre className="bg-gray-800 text-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  <span className="text-purple-400">INSERT INTO</span> <span className="text-yellow-300">TABLE_NAME</span>\n
                  <span className="text-purple-400">VALUES</span><span className="text-gray-400">(</span><span className="text-blue-400">value1</span>, <span className="text-blue-400">value2</span>, ...<span className="text-gray-400">);</span>
                </code>
              </pre>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
              <h3 className="font-bold mb-2 text-green-700 dark:text-green-400">DELETE Syntax</h3>
              <pre className="bg-gray-800 text-gray-100 p-4 rounded-md overflow-x-auto">
                <code>
                  <span className="text-purple-400">DELETE FROM</span> <span className="text-yellow-300">TABLE_NAME</span>\n
                  <span className="text-purple-400">WHERE</span> <span className="text-blue-400">condition</span><span className="text-gray-400">;</span>
                </code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Other Language Sections... */}
      {/* Add similar sections for DRL, TCL, DCL */}

      {/* Practical Examples Section */}
      <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mt-8">
        <h2 className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-4">
          Live Class Practical Examples
        </h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="font-bold mb-2">ALTER TABLE Examples</h3>
            <pre className="bg-gray-800 text-gray-100 p-4 rounded-md overflow-x-auto">
              <code>
                <span className="text-comment">-- Adding a column</span>\n
                <span className="text-purple-400">ALTER TABLE</span> <span className="text-yellow-300">CLIENTS</span>\n
                <span className="text-purple-400">ADD</span> <span className="text-blue-400">COUNTRY</span> <span className="text-green-400">VARCHAR2</span><span className="text-pink-400">(10)</span><span className="text-gray-400">;</span>\n\n
                <span className="text-comment">-- Modifying a column</span>\n
                <span className="text-purple-400">ALTER TABLE</span> <span className="text-yellow-300">CLIENTS</span>\n
                <span className="text-purple-400">MODIFY</span> <span className="text-blue-400">MOBILE_NO</span> <span className="text-green-400">NUMBER</span><span className="text-pink-400">(15)</span><span className="text-gray-400">;</span>
              </code>
            </pre>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="font-bold mb-2">Data Types Visualization</h3>
            <div className="flex justify-center">
              <Image 
                src="/media/image2.png" 
                alt="SQL Data Types"
                width={500}
                height={300}
                className="rounded-lg border border-gray-300"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SQLLanguagesPage;