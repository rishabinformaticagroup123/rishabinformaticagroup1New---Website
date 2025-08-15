import React, { useState } from 'react';

// PowerCenterFilterTransformation.tsx
const PowerCenterFilterTransformation: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'problem' | 'sql' | 'approach'>('problem');

  const exercises = [
    {
      id: 1,
      title: "Basic Numeric Filter: High Salary Employees",
      problem: "Load employees whose salary is greater than $50,000.",
      sql: `
-- Assume a source table like this:
CREATE TABLE SRC_EMPLOYEES (
    EMPLOYEE_ID NUMBER(6),
    FIRST_NAME VARCHAR2(20),
    LAST_NAME VARCHAR2(25),
    SALARY NUMBER(10,2),
    DEPARTMENT_ID NUMBER(4)
);

-- Sample Data:
INSERT INTO SRC_EMPLOYEES VALUES (101, 'John', 'Doe', 60000.00, 10);
INSERT INTO SRC_EMPLOYEES VALUES (102, 'Jane', 'Smith', 45000.00, 20);
INSERT INTO SRC_EMPLOYEES VALUES (103, 'Peter', 'Jones', 75000.00, 10);
INSERT INTO SRC_EMPLOYEES VALUES (104, 'Alice', 'Brown', 30000.00, 30);
`,
      approach: `
In Informatica PowerCenter, you would:
1.  **Drag Source:** Drag the 'SRC_EMPLOYEES' source into the Mapping Designer.
2.  **Add Filter Transformation:** From the Transformation palette, drag a Filter Transformation onto the workspace.
3.  **Connect Ports:** Connect all ports from the Source Qualifier (or directly from Source if no SQ) to the Filter Transformation.
4.  **Set Filter Condition:** Double-click the Filter Transformation to open its properties. Go to the 'Properties' tab and set the 'Filter Condition' to:
    \`\`\`
    SALARY > 50000
    \`\`\`
5.  **Connect to Target:** Connect the output ports from the Filter Transformation to your target table (e.g., TGT_HIGH_SALARY_EMPLOYEES).
6.  **Create Target:** Ensure your target table exists with appropriate columns.
`
    },
    {
      id: 2,
      title: "String Match Filter: Specific Product Category",
      problem: "Load only orders belonging to the 'Electronics' category.",
      sql: `
-- Assume a source table like this:
CREATE TABLE SRC_ORDERS (
    ORDER_ID NUMBER(10),
    PRODUCT_NAME VARCHAR2(50),
    CATEGORY VARCHAR2(30),
    ORDER_DATE DATE,
    AMOUNT NUMBER(10,2)
);

-- Sample Data:
INSERT INTO SRC_ORDERS VALUES (1, 'Laptop', 'Electronics', TO_DATE('2023-01-15', 'YYYY-MM-DD'), 1200.00);
INSERT INTO SRC_ORDERS VALUES (2, 'T-Shirt', 'Apparel', TO_DATE('2023-02-01', 'YYYY-MM-DD'), 30.00);
INSERT INTO SRC_ORDERS VALUES (3, 'Smartphone', 'Electronics', TO_DATE('2023-03-10', 'YYYY-MM-DD'), 800.00);
INSERT INTO SRC_ORDERS VALUES (4, 'Book', 'Books', TO_DATE('2023-04-05', 'YYYY-MM-DD'), 25.00);
`,
      approach: `
In Informatica PowerCenter, you would:
1.  **Drag Source:** Drag the 'SRC_ORDERS' source into the Mapping Designer.
2.  **Add Filter Transformation:** Add a Filter Transformation.
3.  **Connect Ports:** Connect ports from Source Qualifier to Filter Transformation.
4.  **Set Filter Condition:** Set the 'Filter Condition' to:
    \`\`\`
    CATEGORY = 'Electronics'
    \`\`\`
5.  **Connect to Target:** Connect the output ports to your target table (e.g., TGT_ELECTRONICS_ORDERS).
`
    },
    {
      id: 3,
      title: "Date Range Filter: Last Quarter Sales",
      problem: "Extract sales records that occurred in the last quarter of 2023 (October 1st to December 31st, 2023).",
      sql: `
-- Assume a source table like this:
CREATE TABLE SRC_SALES (
    SALE_ID NUMBER(10),
    SALE_DATE DATE,
    PRODUCT_ID NUMBER(6),
    QUANTITY NUMBER(5)
);

-- Sample Data:
INSERT INTO SRC_SALES VALUES (1, TO_DATE('2023-09-20', 'YYYY-MM-DD'), 101, 5);
INSERT INTO SRC_SALES VALUES (2, TO_DATE('2023-10-05', 'YYYY-MM-DD'), 102, 2);
INSERT INTO SRC_SALES VALUES (3, TO_DATE('2023-11-15', 'YYYY-MM-DD'), 103, 10);
INSERT INTO SRC_SALES VALUES (4, TO_DATE('2024-01-01', 'YYYY-MM-DD'), 104, 3);
`,
      approach: `
In Informatica PowerCenter, you would:
1.  **Drag Source:** Drag the 'SRC_SALES' source.
2.  **Add Filter Transformation:** Add a Filter Transformation.
3.  **Connect Ports:** Connect ports from Source Qualifier to Filter Transformation.
4.  **Set Filter Condition:** Set the 'Filter Condition' to:
    \`\`\`
    SALE_DATE >= TO_DATE('2023-10-01', 'YYYY-MM-DD') AND SALE_DATE <= TO_DATE('2023-12-31', 'YYYY-MM-DD')
    \`\`\`
    You can also use functions like \`GET_DATE_PART\` or \`TRUNC\` if needed for more complex date logic.
5.  **Connect to Target:** Connect the output ports to your target table (e.g., TGT_Q4_2023_SALES).
`
    },
    {
      id: 4,
      title: "Multiple Condition Filter: Active California Customers",
      problem: "Filter customers who have an 'Active' status AND reside in 'California'.",
      sql: `
-- Assume a source table like this:
CREATE TABLE SRC_CUSTOMERS (
    CUSTOMER_ID NUMBER(6),
    CUSTOMER_NAME VARCHAR2(50),
    STATUS VARCHAR2(15),
    STATE VARCHAR2(30)
);

-- Sample Data:
INSERT INTO SRC_CUSTOMERS VALUES (1, 'Customer A', 'Active', 'California');
INSERT INTO SRC_CUSTOMERS VALUES (2, 'Customer B', 'Inactive', 'California');
INSERT INTO SRC_CUSTOMERS VALUES (3, 'Customer C', 'Active', 'New York');
INSERT INTO SRC_CUSTOMERS VALUES (4, 'Customer D', 'Active', 'California');
`,
      approach: `
In Informatica PowerCenter, you would:
1.  **Drag Source:** Drag the 'SRC_CUSTOMERS' source.
2.  **Add Filter Transformation:** Add a Filter Transformation.
3.  **Connect Ports:** Connect ports from Source Qualifier to Filter Transformation.
4.  **Set Filter Condition:** Set the 'Filter Condition' to:
    \`\`\`
    STATUS = 'Active' AND STATE = 'California'
    \`\`\`
5.  **Connect to Target:** Connect the output ports to your target table (e.g., TGT_ACTIVE_CA_CUSTOMERS).
`
    },
    {
      id: 5,
      title: "Null Value Filter: Products with Missing Description",
      problem: "Identify and load products where the 'DESCRIPTION' field is null (i.e., missing).",
      sql: `
-- Assume a source table like this:
CREATE TABLE SRC_PRODUCTS (
    PRODUCT_ID NUMBER(6),
    PRODUCT_NAME VARCHAR2(50),
    DESCRIPTION VARCHAR2(200),
    PRICE NUMBER(10,2)
);

-- Sample Data:
INSERT INTO SRC_PRODUCTS VALUES (101, 'Product X', 'This is a great product.', 10.00);
INSERT INTO SRC_PRODUCTS VALUES (102, 'Product Y', NULL, 25.50);
INSERT INTO SRC_PRODUCTS VALUES (103, 'Product Z', 'A detailed description here.', 5.00);
INSERT INTO SRC_PRODUCTS VALUES (104, 'Product A', NULL, 15.00);
`,
      approach: `
In Informatica PowerCenter, you would:
1.  **Drag Source:** Drag the 'SRC_PRODUCTS' source.
2.  **Add Filter Transformation:** Add a Filter Transformation.
3.  **Connect Ports:** Connect ports from Source Qualifier to Filter Transformation.
4.  **Set Filter Condition:** Set the 'Filter Condition' to:
    \`\`\`
    ISNULL(DESCRIPTION)
    \`\`\`
    Or, if you prefer, \`DESCRIPTION IS NULL\`. Both generally work, but \`ISNULL()\` is a common PowerCenter function.
5.  **Connect to Target:** Connect the output ports to your target table (e.g., TGT_PRODUCTS_MISSING_DESC).
`
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-8 font-inter text-gray-800">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
        <header className="bg-blue-700 text-white p-6 text-center rounded-t-xl">
          <h1 className="text-4xl font-extrabold mb-2">Informatica PowerCenter</h1>
          <h2 className="text-2xl font-semibold">Filter Transformation Exercises</h2>
          <p className="mt-2 text-blue-100">Master data filtering with practical examples!</p>
        </header>

        <main className="p-8">
          <section className="mb-10">
            <h3 className="text-3xl font-bold text-blue-800 mb-4">Introduction to Filter Transformation</h3>
            <p className="text-lg leading-relaxed text-gray-700">
              The **Filter Transformation** in Informatica PowerCenter is an active and connected transformation used to filter rows in a mapping. It allows you to specify a condition, and only rows that satisfy this condition are passed through to the next transformation or target. Rows that do not meet the condition are dropped. This is crucial for selecting specific subsets of data based on business rules.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-gray-700">
              Think of it like a sieve: you pour all your data in, and only the data that fits through the holes (your filter condition) comes out the other side. This page provides exercises to help you understand and apply the Filter Transformation effectively.
            </p>
          </section>

          <section>
            <h3 className="text-3xl font-bold text-blue-800 mb-6">Exercises</h3>
            {exercises.map((exercise) => (
              <div key={exercise.id} className="bg-blue-50 p-6 rounded-lg shadow-md mb-8 border border-blue-200">
                <h4 className="text-2xl font-bold text-blue-700 mb-4">Exercise {exercise.id}: {exercise.title}</h4>

                <div className="flex space-x-2 mb-4">
                  <button
                    onClick={() => setActiveTab('problem')}
                    className={`px-6 py-2 rounded-full text-lg font-medium transition-all duration-300 ${
                      activeTab === 'problem' ? 'bg-blue-600 text-white shadow-lg' : 'bg-blue-200 text-blue-800 hover:bg-blue-300'
                    }`}
                  >
                    Problem Statement
                  </button>
                  <button
                    onClick={() => setActiveTab('sql')}
                    className={`px-6 py-2 rounded-full text-lg font-medium transition-all duration-300 ${
                      activeTab === 'sql' ? 'bg-blue-600 text-white shadow-lg' : 'bg-blue-200 text-blue-800 hover:bg-blue-300'
                    }`}
                  >
                    SQL Setup
                  </button>
                  <button
                    onClick={() => setActiveTab('approach')}
                    className={`px-6 py-2 rounded-full text-lg font-medium transition-all duration-300 ${
                      activeTab === 'approach' ? 'bg-blue-600 text-white shadow-lg' : 'bg-blue-200 text-blue-800 hover:bg-blue-300'
                    }`}
                  >
                    PowerCenter Approach
                  </button>
                </div>

                <div className="bg-white p-5 rounded-lg border border-blue-300 min-h-[200px] overflow-auto">
                  {activeTab === 'problem' && (
                    <p className="text-gray-900 text-lg leading-relaxed">{exercise.problem}</p>
                  )}
                  {activeTab === 'sql' && (
                    <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-x-auto text-gray-800">
                      <code>{exercise.sql}</code>
                    </pre>
                  )}
                  {activeTab === 'approach' && (
                    <pre className="bg-gray-100 p-4 rounded-md text-sm whitespace-pre-wrap text-gray-800">
                      <code>{exercise.approach}</code>
                    </pre>
                  )}
                </div>
              </div>
            ))}
          </section>

          <section className="mt-10 p-6 bg-yellow-50 rounded-lg border border-yellow-200 text-center">
            <h3 className="text-2xl font-bold text-yellow-800 mb-3">Key Takeaways for PowerCenter Filter</h3>
            <ul className="list-disc list-inside text-lg text-gray-700 space-y-2">
              <li>Filter Transformation is an **active** transformation (changes number of rows).</li>
              <li>It is a **connected** transformation (part of a mapping flow).</li>
              <li>The filter condition is an expression that evaluates to TRUE or FALSE.</li>
              <li>Only rows where the condition is TRUE pass through.</li>
            </ul>
          </section>
        </main>

        <footer className="bg-blue-700 text-white p-6 text-center rounded-b-xl mt-8">
          <p className="text-lg">&copy; 2023 Rishab Informatica Group. Happy Learning!</p>
        </footer>
      </div>
    </div>
  );
};

export default PowerCenterFilterTransformation;
