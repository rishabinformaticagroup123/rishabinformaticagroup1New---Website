// pages/filter-transformation.tsx
import React from "react";

const FilterTransformation = () => {
  return (
    <div className="p-6 max-w-5xl mx-auto font-sans text-gray-800 bg-white">
      <h1 className="text-3xl font-bold mb-6 text-blue-900">Filter Transformation</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">🧠 What is Filter Transformation?</h2>
        <p>
          The <strong>Filter Transformation</strong> is used to filter records in the middle of a pipeline
          based on a condition. It is similar to the <code>WHERE</code> clause in SQL. Only records that
          match the condition will pass to the next transformation.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">🔌 Type</h2>
        <ul className="list-disc ml-6">
          <li><strong>Active:</strong> It changes the number of records by filtering.</li>
          <li><strong>Connected:</strong> It is directly connected to the pipeline.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">📍 When & Where to Use</h2>
        <p>
          Use the Filter Transformation when you need to restrict records in the pipeline.
          For example, to load only employees from India with salary &gt; 50,000:
        </p>
        <pre className="bg-gray-100 p-3 mt-2 rounded">
{`FILTER CONDITION:
LOWER(COUNTRY) = 'india' AND SALARY > 50000`}
        </pre>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">💡 Key Properties</h2>
        <ul className="list-disc ml-6">
          <li><strong>Filter Condition:</strong> Logical expression like <code>SALARY &gt; 10000</code></li>
          <li><strong>TRUE:</strong> All records pass (default)</li>
          <li><strong>FALSE:</strong> All records are blocked</li>
          <li><strong>Condition:</strong> Only matching records pass</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">⚠️ Common Mistakes</h2>
        <ul className="list-disc ml-6">
          <li>Placing filter conditions here instead of in Source Qualifier (less efficient).</li>
          <li>Forgetting to handle NULL values properly — use <code>ISNULL()</code>.</li>
          <li>Assuming Filter is passive — it's active because it changes record count.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">🎯 Interview Q&A</h2>
        <ol className="list-decimal ml-6 space-y-3">
          <li>
            <strong>What is the purpose of a Filter transformation?</strong><br />
            It filters records based on a condition, similar to a SQL WHERE clause. Only records that satisfy the condition continue through the pipeline.
          </li>
          <li>
            <strong>How is Filter different from Router transformation?</strong><br />
            Filter allows only one condition and sends records in a single path. Router allows multiple conditions and splits records into multiple output groups.
          </li>
          <li>
            <strong>Why is Filter an Active transformation?</strong><br />
            Because it can change the number of rows by removing records that don’t match the filter condition.
          </li>
          <li>
            <strong>Can you filter NULL values using Filter transformation?</strong><br />
            Yes, by using functions like <code>ISNULL(SALARY)</code> or <code>NOT ISNULL(COMM)</code>.
          </li>
          <li>
            <strong>Which is faster: Filter or Source Qualifier SQL Override?</strong><br />
            Source Qualifier SQL Override is faster because the filtering happens at the database level, reducing the number of records sent to Informatica.
          </li>
        </ol>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">📚 Reference from Your Notes</h2>
        <ul className="list-disc ml-6">
          <li>Filter transformation is Active and Connected</li>
          <li>Condition Examples:
            <ul className="list-disc ml-6">
              <li><code>NOT ISNULL(SALARY)</code></li>
              <li><code>IN(DEPARTMENT_ID, 40, 50)</code></li>
              <li><code>INSTR(EMAIL, '@')</code></li>
            </ul>
          </li>
          <li>Only records that return TRUE for the condition pass forward</li>
          <li>Default filter condition is TRUE (all records pass)</li>
        </ul>
      </section>
    </div>
  );
};

export default FilterTransformation;
