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
            {`Employee_ID | Name    | Manager_ID
1          | Ramesh  | NULL
2          | Anjali  | 1
3          | Suresh  | 1
4          | Meena   | 2`}
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
  },
  {
    id: 7,
    question: "7. 🧹 What is Normalization in a Database?",
    answer: (
      <div>
        <p>🔹 <strong>Normalization</strong> means arranging the data in a <strong>clean and organized way</strong> inside a database.</p>
        <p>🧹 It's like <strong>decluttering a cupboard</strong> — instead of stuffing everything in one big space, you <strong>group related items together neatly</strong>, so it's easier to manage and find things.</p>

        <p className="font-bold mt-4">📦 How Does It Work?</p>
        <p>In databases, this means:</p>
        <ul className="list-disc pl-5">
          <li><strong>Breaking a big table</strong> into smaller ones</li>
          <li><strong>Removing duplicate information</strong></li>
          <li><strong>Linking tables properly</strong> using keys (like primary key and foreign key)</li>
        </ul>

        <p className="font-bold mt-4">🎯 Why is Normalization Important? (Benefits)</p>
        <ul className="list-disc pl-5">
          <li>✅ <strong>No Repeated Data</strong> — Saves storage space</li>
          <li>✅ <strong>Clean & Accurate Data</strong> — Reduces chances of mistakes during updates</li>
          <li>✅ <strong>Easy to Maintain</strong> — Updates are done in one place, not in multiple rows</li>
          <li>✅ <strong>Better Performance</strong> — The database becomes faster and more efficient</li>
        </ul>

        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
          <p className="font-bold text-blue-800 mb-2">📘 Real-Life Example:</p>
          <p>Before normalization:</p>
          <pre className="text-sm text-blue-800 bg-white p-2 rounded">
            {`Name  | Course
Aditi | SQL
Aditi | Python
Ravi  | SQL`}
          </pre>
          <p className="mt-2">After <strong>normalization</strong>, you'd have two tables:</p>
          <p className="font-semibold mt-2">Students Table</p>
          <pre className="text-sm text-blue-800 bg-white p-2 rounded">
            {`Student_ID | Name
1          | Aditi
2          | Ravi`}
          </pre>
          <p className="font-semibold mt-2">Courses Table</p>
          <pre className="text-sm text-blue-800 bg-white p-2 rounded">
            {`Student_ID | Course
1          | SQL
1          | Python
2          | SQL`}
          </pre>
          <p className="mt-2">Now, Aditi's name is stored <strong>only once</strong>, and it's easier to update her details!</p>
        </div>

        <p className="mt-4 font-bold text-blue-800">◻ In Simple Terms:</p>
        <p><strong>Normalization = Making data neat, organized, and efficient by removing duplicates and separating related data into proper tables.</strong></p>
      </div>
    ),
    category: "Database Design"
  },
  {
    id: 8,
    question: "8. 🚀 What is Denormalization in a Database?",
    answer: (
      <div>
        <p>🔹 <strong>Denormalization</strong> means <strong>putting some repeated data back into the table</strong> on purpose — to make the database <strong>faster to read</strong>.</p>
        <p>📝 It's like keeping <strong>extra copies of important notes</strong> in different folders so you don't have to search through many pages when you need them quickly.</p>

        <p className="font-bold mt-4">📦 Why Do We Use Denormalization?</p>
        <p>In some real-world situations, especially when the database is used more for <strong>reading data</strong> (like showing dashboards, reports, or app screens), it's better to:</p>
        <ul className="list-disc pl-5">
          <li><strong>Avoid too many joins</strong> between multiple tables</li>
          <li><strong>Store data in one place</strong>, even if some of it is repeated</li>
        </ul>
        <p>This makes it <strong>quicker and easier to fetch the data</strong>.</p>

        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
          <p className="font-bold text-blue-800 mb-2">📘 Simple Example:</p>
          <p>Let's say you have a normalized setup:</p>
          <ul className="list-disc pl-5">
            <li>One table for <strong>Customers</strong></li>
            <li>One table for <strong>Orders</strong></li>
            <li>One table for <strong>Product Details</strong></li>
          </ul>
          <p className="mt-2">If your app needs to show the <strong>customer name + product name + order date</strong> in one view, it may have to do multiple joins every time. That can slow things down.</p>
          <p className="mt-2">With <strong>denormalization</strong>, you might create one table that already includes:</p>
          <ul className="list-disc pl-5">
            <li>Customer Name</li>
            <li>Product Name</li>
            <li>Order Date</li>
          </ul>
          <p className="mt-2">Yes, there's <strong>some repeated data</strong>, but now the app can show the details <strong>much faster</strong>.</p>
        </div>

        <p className="font-bold mt-4">🎯 When Is Denormalization Useful?</p>
        <ul className="list-disc pl-5">
          <li>✅ When <strong>speed is more important</strong> than storage</li>
          <li>✅ In <strong>reporting systems</strong> or dashboards</li>
          <li>✅ When the data is <strong>read more often than updated</strong></li>
          <li>✅ To <strong>reduce complex joins</strong> in large databases</li>
        </ul>

        <p className="mt-4 font-bold text-blue-800">📝 In Simple Words:</p>
        <p><strong>Denormalization = Adding some duplicate data to make reading faster and easier, especially when speed matters more than saving space.</strong></p>
      </div>
    ),
    category: "Database Design"
  },
  {
    id: 9,
    question: "9. 🔍 What is a Subquery?",
    answer: (
      <div>
        <p>🔹 A <strong>Subquery</strong> is a query <strong>inside another query</strong>. Think of it like <strong>asking one question to get the answer for another</strong>.</p>
        
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
          <p className="font-bold text-blue-800 mb-2">📘 Example in real life:</p>
          <p>"Tell me the names of students who scored more than the <strong>average marks</strong>."</p>
          <p>First, you need to <strong>find the average</strong>, then check who scored more — that's a <strong>subquery</strong> inside a main query.</p>
        </div>

        <p className="font-bold mt-4">🔗 What is a JOIN?</p>
        <p>A <strong>JOIN</strong> is used when you want to <strong>combine data from two or more tables</strong> and see it all together in one result.</p>
        
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-2">
          <p className="font-bold text-blue-800 mb-2">📘 Real life example:</p>
          <p>You have one table with <strong>employee names</strong> and another with their <strong>department names</strong>.</p>
          <p>If you want to see <strong>which employee works in which department</strong>, you use a <strong>JOIN</strong> to combine both.</p>
        </div>

        <div className="mt-4 bg-blue-100 p-3 rounded-lg border border-blue-300">
          <p className="font-semibold text-blue-900">📘 Simple Difference:</p>
          <table className="w-full text-sm text-blue-800 mt-2">
            <thead>
              <tr className="bg-blue-200">
                <th className="p-2 border border-blue-300">Feature</th>
                <th className="p-2 border border-blue-300">Subquery</th>
                <th className="p-2 border border-blue-300">JOIN</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-blue-300">What it does</td>
                <td className="p-2 border border-blue-300">A query inside another query</td>
                <td className="p-2 border border-blue-300">Combines data from two or more tables</td>
              </tr>
              <tr>
                <td className="p-2 border border-blue-300">Used for</td>
                <td className="p-2 border border-blue-300">Filtering, conditions, comparisons</td>
                <td className="p-2 border border-blue-300">Merging related data</td>
              </tr>
              <tr>
                <td className="p-2 border border-blue-300">Example use</td>
                <td className="p-2 border border-blue-300">Find students with above average marks</td>
                <td className="p-2 border border-blue-300">Show employee name + department name</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-4 font-bold text-blue-800">◻ In Simple Words:</p>
        <p><strong>Subquery = One query inside another (used for filtering or calculation)</strong><br />
        <strong>JOIN = Mix two or more tables to view connected data together</strong></p>
      </div>
    ),
    category: "SQL Concepts"
  },
  {
    id: 10,
    question: "10. 🔀 What is UNION and UNION ALL?",
    answer: (
      <div>
        <p>🔹 Both <strong>UNION</strong> and <strong>UNION ALL</strong> are used to <strong>combine results</strong> from two or more <strong>SELECT</strong> queries.</p>
        <p>📚 Imagine you have two <strong>lists of names</strong> from two different classes. You want to <strong>combine them</strong> into one list.</p>

        <div className="mt-4 bg-blue-100 p-3 rounded-lg border border-blue-300">
          <p className="font-semibold text-blue-900">📘 What's the Difference?</p>
          <table className="w-full text-sm text-blue-800 mt-2">
            <thead>
              <tr className="bg-blue-200">
                <th className="p-2 border border-blue-300">Feature</th>
                <th className="p-2 border border-blue-300">UNION</th>
                <th className="p-2 border border-blue-300">UNION ALL</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-blue-300">Duplicates</td>
                <td className="p-2 border border-blue-300"><strong>Removes</strong> duplicate rows</td>
                <td className="p-2 border border-blue-300"><strong>Keeps</strong> all rows, even duplicates</td>
              </tr>
              <tr>
                <td className="p-2 border border-blue-300">Speed</td>
                <td className="p-2 border border-blue-300">A bit <strong>slower</strong> (because it checks for duplicates)</td>
                <td className="p-2 border border-blue-300"><strong>Faster</strong> (no checking)</td>
              </tr>
              <tr>
                <td className="p-2 border border-blue-300">Use Case</td>
                <td className="p-2 border border-blue-300">When you want a <strong>clean list</strong> with no repeats</td>
                <td className="p-2 border border-blue-300">When you want <strong>everything</strong>, even repeats</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4 bg-blue-50 p-3 rounded-lg border border-blue-200">
          <p className="font-bold text-blue-800 mb-2">◻ Real-Life Example:</p>
          <p className="font-semibold">🔹 Using UNION:</p>
          <ul className="list-disc pl-5">
            <li>List A: Ravi, Priya, Anil</li>
            <li>List B: Priya, Sunil</li>
            <li><strong>Result:</strong> Ravi, Priya, Anil, Sunil (No duplicate <strong>Priya</strong>)</li>
          </ul>
          <p className="font-semibold mt-2">🔹 Using UNION ALL:</p>
          <ul className="list-disc pl-5">
            <li>List A: Ravi, Priya, Anil</li>
            <li>List B: Priya, Sunil</li>
            <li><strong>Result:</strong> Ravi, Priya, Anil, Priya, Sunil (Keeps both <strong>Priyas</strong>)</li>
          </ul>
        </div>

        <p className="mt-4 font-bold text-blue-800">◻ In Simple Words:</p>
        <p><strong>UNION = Combine and remove duplicates</strong><br />
        <strong>UNION ALL = Combine and keep everything, even duplicates</strong></p>
      </div>
    ),
    category: "SQL Operations"
  },
  {
    id: 11,
    question: "11. 🚨 What is SQL Injection?",
    answer: (
      <div>
        <p>🔹 <strong>SQL Injection</strong> is a <strong>type of hacking</strong> where someone <strong>adds harmful code</strong> into a form or input box on a website (like a login form) to <strong>break into the database</strong>.</p>

        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
          <p className="font-bold text-blue-800 mb-2">◻ Example:</p>
          <p>Imagine a website asks for your username and password. A hacker might enter something like:</p>
          <pre className="text-sm text-blue-800 bg-white p-2 rounded mt-2">
            {'\'OR \'1\'=\'1'}
          </pre>
          <p className="mt-2">This tricks the website into thinking the login is correct — and gives access <strong>without a real username or password</strong>!</p>
        </div>

        <p className="font-bold mt-4">🚨 What Can Happen?</p>
        <ul className="list-disc pl-5">
          <li>Hackers can <strong>see private data</strong> (like customer info)</li>
          <li>They can <strong>delete or change data</strong></li>
          <li>They may even <strong>take control</strong> of the whole database</li>
        </ul>

        <p className="font-bold mt-4">✅ How to Prevent SQL Injection</p>
        <ol className="list-decimal pl-5">
          <li>
            <strong>Use Parameterized Queries</strong>
            <ul className="list-disc pl-5">
              <li>Instead of blindly accepting user input, use secure code that treats input as <strong>data only</strong>, not as commands.</li>
            </ul>
          </li>
          <li>
            <strong>Validate User Input</strong>
            <ul className="list-disc pl-5">
              <li>Only allow what is expected. For example, if a phone number is needed, block letters or special characters.</li>
            </ul>
          </li>
          <li>
            <strong>Avoid Dynamic SQL</strong>
            <ul className="list-disc pl-5">
              <li>Don't build queries using string <strong>+</strong> user input (like "SELECT * FROM users WHERE name = '" + input + "'")</li>
            </ul>
          </li>
          <li>
            <strong>Limit Access</strong>
            <ul className="list-disc pl-5">
              <li>Give each database user only the permissions they need. No more.</li>
            </ul>
          </li>
        </ol>

        <p className="mt-4 font-bold text-blue-800">◻ In Simple Words:</p>
        <p><strong>SQL Injection = When someone types harmful code into a form to steal or change data.</strong><br />
        <strong>Prevention = Write code safely and don't trust anything entered by users.</strong></p>
      </div>
    ),
    category: "SQL Security"
  },
  {
    id: 12,
    question: "12. 📊 What is GROUP BY?",
    answer: (
      <div>
        <p>🔹 <strong>GROUP BY</strong> is used when you want to <strong>group similar data together</strong> to get totals, counts, or averages.</p>
        
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
          <p className="font-bold text-blue-800 mb-2">◻ Real-life example:</p>
          <p>You have a list of employees and their departments.</p>
          <p>You want to know <strong>how many people are in each department</strong>. You can use:</p>
          <pre className="text-sm text-blue-800 bg-white p-2 rounded mt-2">
            {`SELECT department, COUNT(*) FROM employees
GROUP BY department;`}
          </pre>
          <p className="mt-2">✅ It groups all rows <strong>by department</strong> and shows <strong>how many people</strong> are in each.</p>
        </div>

        <p className="font-bold mt-4">🔍 What is HAVING?</p>
        <p><strong>HAVING</strong> is used to <strong>filter the grouped results</strong>.</p>
        
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-2">
          <p className="font-bold text-blue-800 mb-2">◻ Example:</p>
          <p>From the previous result, if you want to show <strong>only departments with more than 5 people</strong>, use:</p>
          <pre className="text-sm text-blue-800 bg-white p-2 rounded mt-2">
            {`SELECT department, COUNT(*) FROM employees
GROUP BY department HAVING COUNT(*) > 5;`}
          </pre>
          <p className="mt-2">✅ It removes the smaller groups and shows only the <strong>big departments</strong>.</p>
        </div>

        <div className="mt-4 bg-blue-100 p-3 rounded-lg border border-blue-300">
          <p className="font-semibold text-blue-900">📘 Simple Difference:</p>
          <table className="w-full text-sm text-blue-800 mt-2">
            <thead>
              <tr className="bg-blue-200">
                <th className="p-2 border border-blue-300">Clause</th>
                <th className="p-2 border border-blue-300">What it does</th>
                <th className="p-2 border border-blue-300">When it's used</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-blue-300">GROUP BY</td>
                <td className="p-2 border border-blue-300">Groups similar data</td>
                <td className="p-2 border border-blue-300">Used to do calculations like SUM or COUNT</td>
              </tr>
              <tr>
                <td className="p-2 border border-blue-300">HAVING</td>
                <td className="p-2 border border-blue-300">Filters <strong>after</strong> grouping</td>
                <td className="p-2 border border-blue-300">Used to show only specific groups</td>
              </tr>
              <tr>
                <td className="p-2 border border-blue-300">WHERE</td>
                <td className="p-2 border border-blue-300">Filters <strong>before</strong> grouping (individual rows)</td>
                <td className="p-2 border border-blue-300">Used before GROUP BY</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-4 font-bold text-blue-800">◻ In Simple Words:</p>
        <p><strong>GROUP BY = Put similar things together</strong><br />
        <strong>HAVING = Remove groups you don't want after grouping</strong></p>
      </div>
    ),
    category: "SQL Operations"
  },
  {
    id: 13,
    question: "13. 🔄 What is a Correlated Subquery?",
    answer: (
      <div>
        <p>🔹 A <strong>correlated subquery</strong> is a <strong>subquery that works row by row</strong>, using data from the <strong>main (outer) query</strong>.</p>
        
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
          <p className="font-bold text-blue-800 mb-2">◻ Think of it like this:</p>
          <p>You're checking <strong>something inside a list</strong>, but your check <strong>depends on each row</strong> of that list.</p>
        </div>

        <p className="font-bold mt-4">📘 Real-Life Example:</p>
        <p>You have a <strong>students</strong> table and a <strong>marks</strong> table.</p>
        <p>You want to find students <strong>who scored more than the average of their own class</strong>.</p>
        <p>To do this, you need to:</p>
        <ul className="list-disc pl-5">
          <li>Look at <strong>each student</strong></li>
          <li>Then <strong>calculate the average marks</strong> of the class <strong>they belong to</strong></li>
          <li>Then compare the student's marks with that average</li>
        </ul>
        <p className="mt-2">This needs a <strong>correlated subquery</strong>, because the subquery (average of class) depends on the class of the current student.</p>

        <p className="font-bold mt-4">✅ Why Use It?</p>
        <p>You use a correlated subquery when:</p>
        <ul className="list-disc pl-5">
          <li>You want to <strong>compare each row</strong> to some <strong>calculation related to that same row</strong></li>
          <li>Simple subqueries or joins <strong>can't handle</strong> the logic you need</li>
        </ul>

        <p className="mt-4 font-bold text-blue-800">◻ In Simple Words:</p>
        <p>A <strong>correlated subquery</strong> is like asking:</p>
        <p>"For each person in this list, check something <strong>about their own group</strong> and compare."</p>
        <p>It runs <strong>once per row</strong> and is very helpful when <strong>filters or conditions change for each row</strong>.</p>
      </div>
    ),
    category: "SQL Concepts"
  },
  {
    id: 14,
    question: "14. 🔧 Explain the difference between a stored procedure and a function",
    answer: (
      <div>
        <p className="font-bold">🔹 What is a Stored Procedure?</p>
        <p>A <strong>stored procedure</strong> is like a <strong>pre-written set of instructions</strong> saved in the database.</p>
        <p>You can run it anytime to do a task like <strong>inserting, updating, or deleting data</strong>.</p>
        
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-2">
          <p className="font-bold text-blue-800 mb-2">◻ Example:</p>
          <p>If you want to <strong>give salary hikes</strong> to all employees in a department, instead of writing the same SQL again and again, you can <strong>create a stored procedure</strong> and call it when needed.</p>
          <p className="mt-2">➡️ It <strong>may or may not return a result</strong>, and can do <strong>multiple actions</strong>.</p>
        </div>

        <p className="font-bold mt-4">📐 What is a Function?</p>
        <p>A <strong>function</strong> is also a saved block of code, but it is mainly used for <strong>calculations or to return a value</strong>.</p>
        
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-2">
          <p className="font-bold text-blue-800 mb-2">◻ Example:</p>
          <p>If you want to <strong>calculate the total salary with bonus</strong>, you can write a function. It will take inputs like basic salary and bonus %, and return the total amount.</p>
          <p className="mt-2">➡️ A function <strong>always returns a value</strong> and is often used <strong>inside SELECT statements</strong>.</p>
        </div>

        <div className="mt-4 bg-blue-100 p-3 rounded-lg border border-blue-300">
          <p className="font-semibold text-blue-900">📊 Simple Comparison:</p>
          <table className="w-full text-sm text-blue-800 mt-2">
            <thead>
              <tr className="bg-blue-200">
                <th className="p-2 border border-blue-300">Feature</th>
                <th className="p-2 border border-blue-300">Stored Procedure</th>
                <th className="p-2 border border-blue-300">Function</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-blue-300">Returns a value?</td>
                <td className="p-2 border border-blue-300">Not always</td>
                <td className="p-2 border border-blue-300">Always</td>
              </tr>
              <tr>
                <td className="p-2 border border-blue-300">Can do multiple tasks?</td>
                <td className="p-2 border border-blue-300">Yes (Insert, Update, Delete)</td>
                <td className="p-2 border border-blue-300">No, usually for calculation only</td>
              </tr>
              <tr>
                <td className="p-2 border border-blue-300">Can use in SELECT?</td>
                <td className="p-2 border border-blue-300">❌ No</td>
                <td className="p-2 border border-blue-300">✅ Yes</td>
              </tr>
              <tr>
                <td className="p-2 border border-blue-300">Has input/output?</td>
                <td className="p-2 border border-blue-300">Yes</td>
                <td className="p-2 border border-blue-300">Usually only input (in many DBs)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-4 font-bold text-blue-800">◻ In Simple Words:</p>
        <p><strong>Stored Procedure = Full task handler (like a mini-program)</strong><br />
        <strong>Function = Calculator (takes input and gives output)</strong></p>
      </div>
    ),
    category: "SQL Programming"
  },
  {
    id: 15,
    question: "15. 🐢 Why is My SQL Query Slow?",
    answer: (
      <div>
        <p>🔹 Sometimes, when you run an SQL query (a command to get data), it takes too long.</p>
        <p>This is usually because the query is not written efficiently, or the database has too much data to go through.</p>

        <p className="font-bold mt-4">🚀 How to Make It Faster? (In Simple Terms)</p>
        <ol className="list-decimal pl-5">
          <li>
            <strong>Understand the Plan</strong>
            <ul className="list-disc pl-5">
              <li>Think of it like checking <strong>Google Maps for the best route</strong>.</li>
              <li>Use tools that show <strong>how the database is trying to fetch the data</strong> (called execution plan).</li>
            </ul>
          </li>
          <li>
            <strong>Use Indexes</strong>
            <ul className="list-disc pl-5">
              <li>Just like a <strong>book index helps you find topics faster</strong>, a <strong>database index</strong> helps locate data quicker.</li>
              <li>Add indexes to important columns used in WHERE, JOIN, or ORDER BY.</li>
            </ul>
          </li>
          <li>
            <strong>Avoid Unwanted Rows</strong>
            <ul className="list-disc pl-5">
              <li>If you only need 10 results, don't ask for 10,000.</li>
              <li>Use conditions (like WHERE, LIMIT) to <strong>get only what you need</strong>.</li>
            </ul>
          </li>
          <li>
            <strong>Simplify the Query</strong>
            <ul className="list-disc pl-5">
              <li>Instead of using too many joins or nested subqueries, try to <strong>break it down or rewrite it in a better way</strong>.</li>
            </ul>
          </li>
          <li>
            <strong>Tune the Settings</strong>
            <ul className="list-disc pl-5">
              <li>Sometimes the database software needs some <strong>configuration adjustments</strong> to work better with your data.</li>
            </ul>
          </li>
          <li>
            <strong>Use Caching</strong>
            <ul className="list-disc pl-5">
              <li>If the same query is run again and again, store the result temporarily (called caching) instead of recalculating every time.</li>
            </ul>
          </li>
          <li>
            <strong>Check the Hardware</strong>
            <ul className="list-disc pl-5">
              <li>If everything is fine but it's still slow, maybe the <strong>server or system needs more memory or faster storage</strong>.</li>
            </ul>
          </li>
        </ol>

        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
          <p className="font-bold text-blue-800 mb-2">◻ Simple Example:</p>
          <p>If you search for a student name from a 1 lakh row table without an index, it might take time.</p>
          <p>But with an index on the name column, the database can find it much faster—like flipping to the right page instantly in a book.</p>
        </div>
      </div>
    ),
    category: "Performance"
  },
  {
    id: 16,
    question: "16. 🔍 What is an Index in a Database?",
    answer: (
      <div>
        <p>🔹 An <strong>index</strong> in a database is like the <strong>index page at the back of a book</strong>.</p>
        <p>Instead of searching every single page for a word, you check the index, go to the exact page, and save time.</p>

        <p className="font-bold mt-4">◻ Why is it Important?</p>
        <p>Imagine you have a <strong>huge table with thousands of rows</strong>, and you want to find just one employee named "Raj."</p>
        <p>👉 <strong>Without an index:</strong> The database checks <strong>every row one by one</strong> — that's slow.</p>
        <p>👉 <strong>With an index:</strong> It <strong>jumps directly</strong> to the rows where "Raj" might be — much faster!</p>

        <p className="font-bold mt-4">🏁 When to Use Indexes?</p>
        <p>Indexes are <strong>very useful</strong> when your queries use:</p>
        <ul className="list-disc pl-5">
          <li>WHERE conditions (e.g., WHERE name = 'Raj')</li>
          <li>JOIN operations</li>
          <li>ORDER BY and GROUP BY clauses</li>
        </ul>

        <p className="mt-4 font-bold text-blue-800">◻ In Simple Words:</p>
        <p><strong>Index = Shortcut to find data faster in a large database.</strong></p>
        <p>It helps <strong>improve performance</strong>, especially in <strong>search-heavy or report-heavy</strong> applications.</p>
      </div>
    ),
    category: "Performance"
  },
  {
    id: 17,
    question: "17. 📚 What is a Clustered and Non-Clustered Index?",
    answer: (
      <div>
        <p>🔹 Think of a <strong>telephone directory</strong> (old-school book with names and numbers).</p>

        <p className="font-bold mt-4">✅ Clustered Index — Like the Main Book</p>
        <ul className="list-disc pl-5">
          <li>It's the <strong>actual book</strong> arranged in <strong>alphabetical order</strong> (e.g., by names).</li>
          <li>The data is <strong>physically sorted</strong> based on that column (e.g., Name).</li>
          <li>There can be <strong>only one</strong> clustered index in a table because there's only <strong>one way to physically sort the data</strong>.</li>
          <li>Example: If a table is sorted by Employee ID, that's your clustered index. The table itself is stored in that order.</li>
        </ul>

        <p className="font-bold mt-4">📑 Non-Clustered Index — Like Bookmarks or a Side List</p>
        <ul className="list-disc pl-5">
          <li>It's like having a <strong>separate list</strong> that tells you <strong>where to find things</strong> in the main book.</li>
          <li>It doesn't change the actual order of the data in the table.</li>
          <li>You can create <strong>many non-clustered indexes</strong> on different columns (like Name, Department, etc.).</li>
          <li>Example: A non-clustered index on "Department" gives you a quick lookup, then takes you to the row in the actual table.</li>
        </ul>

        <div className="mt-4 bg-blue-100 p-3 rounded-lg border border-blue-300">
          <p className="font-semibold text-blue-900">Simple Analogy:</p>
          <table className="w-full text-sm text-blue-800 mt-2">
            <thead>
              <tr className="bg-blue-200">
                <th className="p-2 border border-blue-300">Type</th>
                <th className="p-2 border border-blue-300">Real-Life Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-blue-300">Clustered Index</td>
                <td className="p-2 border border-blue-300">Pages in a dictionary sorted A to Z</td>
              </tr>
              <tr>
                <td className="p-2 border border-blue-300">Non-Clustered Index</td>
                <td className="p-2 border border-blue-300">Sticky notes pointing to specific pages</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="font-bold mt-4">🏁 Why is this Important?</p>
        <p>Indexes (especially when used wisely) help the database <strong>find data faster</strong>, just like bookmarks or organized sections help <strong>you find info quickly in a book</strong>.</p>
      </div>
    ),
    category: "Performance"
  },
  {
    id: 18,
    question: "18. 🔑 What's the Difference Between Candidate Key, Primary Key & Super Key?",
    answer: (
      <div>
        <p>🔹 Let's use a <strong>real-life example</strong> of a <strong>college student database</strong> to explain.</p>

        <p className="font-bold mt-4">📌 Super Key — All Possible Unique Identifiers</p>
        <ul className="list-disc pl-5">
          <li>A <strong>super key</strong> is <strong>any combination of columns</strong> that can <strong>uniquely identify a row</strong>.</li>
          <li>It might contain <strong>extra unnecessary details</strong>.</li>
        </ul>
        <p className="mt-2">Example:</p>
        <ul className="list-disc pl-5">
          <li>StudentID</li>
          <li>Email</li>
          <li>StudentID + Email + PhoneNumber</li>
        </ul>
        <p className="mt-2">All these can uniquely identify a student — so they're <strong>super keys</strong>.</p>

        <p className="font-bold mt-4">📌 Candidate Key — Best Unique Options</p>
        <ul className="list-disc pl-5">
          <li>A <strong>candidate key</strong> is the <strong>most efficient</strong> super key (no extra columns).</li>
          <li>It's a "<strong>clean and simple</strong>" unique ID.</li>
        </ul>
        <p className="mt-2">Example:</p>
        <ul className="list-disc pl-5">
          <li>StudentID</li>
          <li>Email</li>
        </ul>
        <p className="mt-2">Both can identify students uniquely without extra columns. So these are <strong>candidate keys</strong>.</p>

        <p className="font-bold mt-4">📌 Primary Key — The One You Choose</p>
        <ul className="list-disc pl-5">
          <li>From the <strong>candidate keys</strong>, you choose <strong>one</strong> to be the <strong>primary key</strong>.</li>
          <li>It must be <strong>unique</strong> and <strong>can't be empty (NULL)</strong>.</li>
          <li>It's the <strong>main key</strong> used to identify records.</li>
        </ul>
        <p className="mt-2">Example: You choose StudentID as your <strong>primary key</strong>.</p>

        <div className="mt-4 bg-blue-100 p-3 rounded-lg border border-blue-300">
          <p className="font-semibold text-blue-900">🎯 Quick Recap Table:</p>
          <table className="w-full text-sm text-blue-800 mt-2">
            <thead>
              <tr className="bg-blue-200">
                <th className="p-2 border border-blue-300">Term</th>
                <th className="p-2 border border-blue-300">What it means</th>
                <th className="p-2 border border-blue-300">Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-blue-300">Super Key</td>
                <td className="p-2 border border-blue-300">Any column(s) that can uniquely identify row</td>
                <td className="p-2 border border-blue-300">StudentID + Email + PhoneNumber</td>
              </tr>
              <tr>
                <td className="p-2 border border-blue-300">Candidate Key</td>
                <td className="p-2 border border-blue-300">Best options to uniquely identify</td>
                <td className="p-2 border border-blue-300">StudentID, Email</td>
              </tr>
              <tr>
                <td className="p-2 border border-blue-300">Primary Key</td>
                <td className="p-2 border border-blue-300">Final chosen key (must be unique, not NULL)</td>
                <td className="p-2 border border-blue-300">StudentID</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
    category: "Database Concepts"
  },
  {
    id: 19,
    question: "19. 🚨 What is a Trigger in SQL, and How is It Used?",
    answer: (
      <div>
        <p>🔹 A <strong>trigger</strong> is like a <strong>"watchdog" inside the database</strong>. It <strong>automatically performs actions</strong> when something happens to the data — such as when someone <strong>adds</strong>, <strong>updates</strong>, or <strong>deletes</strong> a record in a table.</p>

        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
          <p className="font-bold text-blue-800 mb-2">📘 Simple Example:</p>
          <p>Imagine you have a <strong>bank account table</strong>, and you want to <strong>track every time someone withdraws money</strong>.</p>
          <p>✅ You can create a <strong>trigger</strong> that:</p>
          <ul className="list-disc pl-5">
            <li>Runs <strong>automatically</strong> every time someone <strong>updates</strong> the balance.</li>
            <li><strong>Inserts a log</strong> into another table that stores who made the change and when.</li>
          </ul>
        </div>

        <p className="font-bold mt-4">📌 Why Triggers Are Useful:</p>
        <ul className="list-disc pl-5">
          <li>✅ <strong>Keep data accurate</strong> (enforce rules automatically)</li>
          <li>🕵️♂️ <strong>Track changes</strong> for security or auditing</li>
          <li>🔄 <strong>Automate tasks</strong> inside the database (like sending alerts or logging updates)</li>
        </ul>

        <p className="font-bold mt-4">📦 When Are Triggers Activated?</p>
        <ul className="list-disc pl-5">
          <li><strong>INSERT</strong> — when a new record is added</li>
          <li><strong>UPDATE</strong> — when a record is changed</li>
          <li><strong>DELETE</strong> — when a record is removed</li>
        </ul>

        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
          <p className="font-bold text-blue-800 mb-2">Real-World Analogy:</p>
          <p>A <strong>trigger is like a door sensor</strong> in a store:</p>
          <ul className="list-disc pl-5">
            <li>When someone opens the door (event happens), the bell rings (action is triggered).</li>
          </ul>
        </div>
      </div>
    ),
    category: "SQL Programming"
  },
  {
    id: 20,
    question: "20. 💰 What is a Database Transaction?",
    answer: (
      <div>
        <p>🔹 A <strong>transaction</strong> in a database means a group of <strong>related actions</strong> (like inserting, updating, or deleting data) that are done <strong>together as one unit</strong>.</p>
        <p>It's like saying: 👉 "Do <strong>everything</strong> or do <strong>nothing at all</strong>."</p>

        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
          <p className="font-bold text-blue-800 mb-2">📘 Simple Example:</p>
          <p>Imagine you are <strong>transferring ₹1000 from Account A to Account B</strong>:</p>
          <ol className="list-decimal pl-5">
            <li>₹1000 is <strong>deducted</strong> from Account A</li>
            <li>₹1000 is <strong>added</strong> to Account B</li>
          </ol>
          <p className="mt-2">Both steps must happen together — if one fails, the other should be cancelled. This is a <strong>transaction</strong>.</p>
        </div>

        <p className="font-bold mt-4">✅ Why Are Transactions Important?</p>
        <ul className="list-disc pl-5">
          <li>Keep your data <strong>safe and consistent</strong></li>
          <li>Prevent <strong>half-done</strong> operations</li>
          <li>Let you <strong>roll back</strong> if there's an error</li>
        </ul>

        <p className="font-bold mt-4">🔐 Transactions Follow ACID Rules:</p>
        <ul className="list-disc pl-5">
          <li><strong>A</strong>tomicity — All or nothing</li>
          <li><strong>C</strong>onsistency — Data stays valid</li>
          <li><strong>I</strong>solation — Separate from other operations</li>
          <li><strong>D</strong>urability — Changes are saved even after a crash</li>
        </ul>

        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
          <p className="font-bold text-blue-800 mb-2">Real-Life Analogy:</p>
          <p>Think of a <strong>bank ATM</strong>:</p>
          <ul className="list-disc pl-5">
            <li>If cash is taken out but the balance doesn't update, it causes problems.</li>
            <li>So the ATM uses a transaction — either <strong>both happen</strong> (withdraw + update) or <strong>neither happens</strong>.</li>
          </ul>
        </div>
      </div>
    ),
    category: "Database Concepts"
  },
  {
    id: 21,
    question: "21. 🧪 Explain ACID properties in the context of SQL databases?",
    answer: (
      <div>
        <p>🔹 ACID is a set of 4 rules that <strong>keep your data safe and reliable</strong> when many changes are happening in a database. Let's break it down in a simple way:</p>

        <p className="font-bold mt-4">1. Atomicity — <em>All or Nothing</em></p>
        <p>Imagine transferring ₹100 from your account to a friend's account. The system has to <strong>take ₹100 from your account</strong> <em>and</em> <strong>add it to your friend's account</strong>.</p>
        <p>If one step fails, like the network breaks, <strong>nothing should happen at all</strong> — not even half.</p>
        <p>✅ So, it's <strong>either fully done, or not done at all</strong>.</p>

        <p className="font-bold mt-4">2. Consistency — <em>Data Must Stay Correct</em></p>
        <p>After every change, the data in the database should still <strong>follow all rules</strong> and make sense.</p>
        <p>Example: If someone can't have a negative balance, then the system should <strong>never allow a ₹-500</strong> in any account.</p>
        <p>✅ So, the data is always correct — <strong>before and after</strong> the transaction.</p>

        <p className="font-bold mt-4">3. Isolation — <em>No Crossed Wires</em></p>
        <p>Even if <strong>many people</strong> are using the system at the same time, <strong>each person's transaction should be handled separately</strong>.</p>
        <p>Example: Two people buying the last seat on a train — the system makes sure <strong>only one gets it</strong>, not both.</p>
        <p>✅ So, no matter how busy it is, <strong>your task doesn't mix up with others</strong>.</p>

        <p className="font-bold mt-4">4. Durability — <em>Changes Stay Safe</em></p>
        <p>Once a transaction is finished and saved, <strong>it should never be lost</strong> — even if the power goes off or the system crashes.</p>
        <p>✅ So, once you book that ticket or transfer money, it's <strong>permanently recorded</strong>.</p>

        <div className="mt-4 bg-blue-100 p-3 rounded-lg border border-blue-300">
          <p className="font-semibold text-blue-900">In Simple Words:</p>
          <table className="w-full text-sm text-blue-800 mt-2">
            <thead>
              <tr className="bg-blue-200">
                <th className="p-2 border border-blue-300">ACID Rule</th>
                <th className="p-2 border border-blue-300">What It Means in Real Life</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-blue-300">Atomicity</td>
                <td className="p-2 border border-blue-300">Do <strong>everything</strong>, or do <strong>nothing</strong></td>
              </tr>
              <tr>
                <td className="p-2 border border-blue-300">Consistency</td>
                <td className="p-2 border border-blue-300">Always follow the <strong>rules</strong> and keep data correct</td>
              </tr>
              <tr>
                <td className="p-2 border border-blue-300">Isolation</td>
                <td className="p-2 border border-blue-300">Keep <strong>each transaction safe</strong> from others happening at same time</td>
              </tr>
              <tr>
                <td className="p-2 border border-blue-300">Durability</td>
                <td className="p-2 border border-blue-300">Once saved, the data <strong>stays safe forever</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
    category: "Database Concepts"
  },
  {
    id: 22,
    question: "22. 🔐 What's the Difference Between Primary Key and Unique Constraint?",
    answer: (
      <div>
        <p>🔹 Both are used to make sure <strong>no duplicate values</strong> are stored in a column — but there are <strong>some key differences</strong>:</p>

        <p className="font-bold mt-4">✅ Primary Key</p>
        <ul className="list-disc pl-5">
          <li>Used to <strong>uniquely identify</strong> each row in a table.</li>
          <li>❌ <strong>Cannot have NULL</strong> values (empty data not allowed).</li>
          <li>✔️ Each table can have <strong>only one primary key</strong>.</li>
          <li>👇 Usually used on the main <strong>ID</strong> column (like Employee_ID, Student_ID, etc.).</li>
        </ul>
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-2">
          <p className="font-bold text-blue-800 mb-2">Example:</p>
          <p>If you have a table of students, the Student_ID column can be a primary key — every student must have a unique ID, and it can't be left empty.</p>
        </div>

        <p className="font-bold mt-4">✅ Unique Constraint</p>
        <ul className="list-disc pl-5">
          <li>Also makes sure values are <strong>unique</strong> in a column.</li>
          <li>✅ But it <strong>can allow NULLs</strong> (empty values are allowed).</li>
          <li>✔️ A table can have <strong>multiple unique constraints</strong>.</li>
        </ul>
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-2">
          <p className="font-bold text-blue-800 mb-2">Example:</p>
          <p>If you have an Email column, you may want every email to be different (unique), but it's okay if someone hasn't given their email yet — so <strong>NULL is allowed</strong>.</p>
        </div>

        <div className="mt-4 bg-blue-100 p-3 rounded-lg border border-blue-300">
          <p className="font-semibold text-blue-900">◻ Summary Table:</p>
          <table className="w-full text-sm text-blue-800 mt-2">
            <thead>
              <tr className="bg-blue-200">
                <th className="p-2 border border-blue-300">Feature</th>
                <th className="p-2 border border-blue-300">Primary Key</th>
                <th className="p-2 border border-blue-300">Unique Constraint</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-blue-300">Enforces Uniqueness</td>
                <td className="p-2 border border-blue-300">✅ Yes</td>
                <td className="p-2 border border-blue-300">✅ Yes</td>
              </tr>
              <tr>
                <td className="p-2 border border-blue-300">Allows NULLs</td>
                <td className="p-2 border border-blue-300">❌ No</td>
                <td className="p-2 border border-blue-300">✅ Yes</td>
              </tr>
              <tr>
                <td className="p-2 border border-blue-300">How many per table?</td>
                <td className="p-2 border border-blue-300">1 only</td>
                <td className="p-2 border border-blue-300">Many allowed</td>
              </tr>
              <tr>
                <td className="p-2 border border-blue-300">Main Use</td>
                <td className="p-2 border border-blue-300">Identify each row</td>
                <td className="p-2 border border-blue-300">Keep data unique in column</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
    category: "Database Concepts"
  },
  {
    id: 23,
    question: "23. ❓ What is NULL in SQL?",
    answer: (
      <div>
        <p>🔹 In SQL, <strong>NULL means "no value" or "nothing is entered"</strong> in that column — not even zero or a blank. It just means <strong>missing data</strong>.</p>

        <p className="font-bold mt-4">🛠️ How to Handle NULL Values?</p>
        <ol className="list-decimal pl-5">
          <li>
            <strong>Check for NULL values</strong>
            <p>Use:</p>
            <ul className="list-disc pl-5">
              <li>IS NULL → to find rows where data is missing</li>
              <li>IS NOT NULL → to find rows where data is present</li>
            </ul>
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-2">
              <p className="font-bold text-blue-800 mb-2">Example:</p>
              <pre className="text-sm text-blue-800 bg-white p-2 rounded">
                {`SELECT * FROM Employees WHERE Email IS NULL;`}
              </pre>
            </div>
          </li>
          <li>
            <strong>Replace NULL with a default value</strong>
            <p>Use:</p>
            <ul className="list-disc pl-5">
              <li>COALESCE() or ISNULL() function to show a substitute value if data is missing</li>
            </ul>
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-2">
              <p className="font-bold text-blue-800 mb-2">Example:</p>
              <pre className="text-sm text-blue-800 bg-white p-2 rounded">
                {`SELECT Name, COALESCE(PhoneNumber, 'Not Provided') AS Contact FROM Employees;`}
              </pre>
            </div>
          </li>
          <li>
            <strong>Prevent NULL values if not needed</strong>
            <p>When creating a table, you can use <strong>NOT NULL</strong> to make sure that a column must have a value.</p>
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-2">
              <p className="font-bold text-blue-800 mb-2">Example:</p>
              <pre className="text-sm text-blue-800 bg-white p-2 rounded">
                {`CREATE TABLE Students (
  StudentID INT NOT NULL,
  Name VARCHAR(50) NOT NULL
);`}
              </pre>
            </div>
          </li>
        </ol>

        <p className="font-bold mt-4">Why is Handling NULL Important?</p>
        <ul className="list-disc pl-5">
          <li>Prevents <strong>errors</strong> in calculations or reports</li>
          <li>Helps in showing clear messages like "Not Available" instead of blank fields</li>
          <li>Ensures <strong>data quality</strong> and makes the database more reliable</li>
        </ul>
      </div>
    ),
    category: "SQL Concepts"
  },
  {
    id: 24,
    question: "24. 🔄 What is the Purpose of the SQL CASE Statement?",
    answer: (
      <div>
        <p>🔹 The <strong>CASE statement</strong> in SQL is like an <strong>IF-ELSE condition</strong> in plain English.</p>
        <p>It helps you <strong>show different values based on certain conditions</strong> in your query results.</p>

        <p className="font-bold mt-4">🛠️ Where is it Used?</p>
        <p>You can use CASE inside:</p>
        <ul className="list-disc pl-5">
          <li>SELECT → to show values based on logic</li>
          <li>WHERE → to apply conditions</li>
          <li>ORDER BY → to sort data conditionally</li>
        </ul>

        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
          <p className="font-bold text-blue-800 mb-2">◻ Example:</p>
          <p>Imagine a table with employees and their performance rating:</p>
          <pre className="text-sm text-blue-800 bg-white p-2 rounded">
            {`SELECT Name, Rating,
CASE
  WHEN Rating >= 4 THEN 'Excellent'
  WHEN Rating = 3 THEN 'Good'
  ELSE 'Needs Improvement'
END AS PerformanceCategory
FROM Employees;`}
          </pre>
          <p className="mt-2">What this does:</p>
          <p>It <strong>checks the Rating</strong> and <strong>shows a word instead of a number</strong>, making it easier to understand.</p>
        </div>

        <p className="font-bold mt-4">Why is it Useful?</p>
        <ul className="list-disc pl-5">
          <li>Makes your reports more readable</li>
          <li>Helps apply logic without writing complex programs</li>
          <li>Useful when converting data into <strong>human-friendly labels</strong></li>
        </ul>
      </div>
    ),
    category: "SQL Operations"
  },
  {
    id: 25,
    question: "25. 👀 What is a View in SQL?",
    answer: (
      <div>
        <p>🔹 A <strong>view</strong> is like a <strong>virtual table</strong>.</p>
        <p>It doesn't <strong>store data physically</strong> — instead, it <strong>shows data from real tables</strong> based on a <strong>predefined query</strong>.</p>
        <p>Think of it as a <strong>customized window</strong> into your database, showing exactly the data you want to see.</p>

        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
          <p className="font-bold text-blue-800 mb-2">📌 Simple Example:</p>
          <p>Let's say you have a table with employee details, but you only want to show <strong>names and salaries</strong>, not other sensitive info. You can create a view like this:</p>
          <pre className="text-sm text-blue-800 bg-white p-2 rounded">
            {`CREATE VIEW EmployeeSalaryView AS
SELECT Name, Salary
FROM Employees;`}
          </pre>
          <p className="mt-2">Now, whenever someone uses EmployeeSalaryView, they'll only see Name and Salary.</p>
        </div>

        <p className="font-bold mt-4">✅ Why Are Views Useful?</p>
        <ul className="list-disc pl-5">
          <li><strong>Security</strong>: Hide sensitive columns (like passwords or personal data)</li>
          <li><strong>Simplifies Queries</strong>: Reuse complex SQL logic easily</li>
          <li><strong>Organized View</strong>: Show only relevant data for different teams or users</li>
          <li><strong>No Extra Storage</strong>: Since it doesn't store data, it uses less space</li>
        </ul>

        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
          <p className="font-bold text-blue-800 mb-2">◻ Analogy:</p>
          <p>Imagine a view like a <strong>filtered report</strong> created from a big Excel sheet — you don't copy the data, just show what's needed.</p>
        </div>
      </div>
    ),
    category: "SQL Programming"
  },
  {
    id: 26,
    question: "26. 🔍 What is the EXISTS Clause?",
    answer: (
      <div>
        <p>🔹 The <strong>EXISTS clause</strong> is used to <strong>check if something exists</strong> in another table (using a subquery).</p>
        <p>It <strong>returns TRUE</strong> if at least <strong>one row</strong> is found, otherwise it returns <strong>FALSE</strong>.</p>

        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
          <p className="font-bold text-blue-800 mb-2">◻ Simple Analogy:</p>
          <p>Imagine you're checking if a <strong>friend's name is on a guest list</strong> before inviting them to a party.</p>
          <p>If the name <strong>exists</strong> on the list, you send the invite — otherwise, you don't.</p>
        </div>

        <p className="font-bold mt-4">✅ Why and When to Use EXISTS?</p>
        <ul className="list-disc pl-5">
          <li>To <strong>check if related data is present</strong> in another table</li>
          <li>Common in <strong>filtering records</strong> based on a condition that involves another table</li>
          <li>Often used in <strong>subqueries</strong> with conditions</li>
        </ul>

        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
          <p className="font-bold text-blue-800 mb-2">📘 Simple Example:</p>
          <p>You have two tables:</p>
          <ul className="list-disc pl-5">
            <li>Employees</li>
            <li>Departments</li>
          </ul>
          <p className="mt-2">Now, you want to <strong>find all departments that have at least one employee</strong>.</p>
          <pre className="text-sm text-blue-800 bg-white p-2 rounded">
            {`SELECT DepartmentName FROM Departments d
WHERE EXISTS (
  SELECT 1 FROM Employees e
  WHERE e.DepartmentID = d.DepartmentID
);`}
          </pre>
          <p className="mt-2">This says: "Only show departments <strong>where there is at least one matching employee</strong>."</p>
        </div>

        <p className="font-bold mt-4">✨ Key Point:</p>
        <ul className="list-disc pl-5">
          <li>EXISTS is <strong>fast and efficient</strong>, especially when you're just checking <strong>if something exists</strong>, not what it is.</li>
        </ul>
      </div>
    ),
    category: "SQL Operations"
  },
  {
    id: 27,
    question: "27. 🔢 What is the Purpose of the SQL COUNT() Function?",
    answer: (
      <div>
        <p>🔹 The <strong>COUNT() function</strong> is used to <strong>count how many rows</strong> (or records) are present in a table — either <strong>all rows</strong>, or only those that meet a certain condition.</p>

        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
          <p className="font-bold text-blue-800 mb-2">📘 Simple Analogy:</p>
          <p>Imagine a teacher wants to know <strong>how many students submitted an assignment</strong>. The COUNT() function does <strong>exactly that</strong> in a database — it counts the number of entries.</p>
        </div>

        <p className="font-bold mt-4">✅ Why is it Useful?</p>
        <ul className="list-disc pl-5">
          <li>To <strong>know how many</strong> records exist</li>
          <li>To <strong>summarize data</strong> (like number of orders, students, employees, etc.)</li>
          <li>Useful in <strong>reporting, dashboards</strong>, and <strong>data analysis</strong></li>
        </ul>

        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
          <p className="font-bold text-blue-800 mb-2">📘 Basic Example:</p>
          <pre className="text-sm text-blue-800 bg-white p-2 rounded">
            {`SELECT COUNT(*) FROM Employees;`}
          </pre>
          <p className="mt-2">This means: 👉 "Count <strong>all the employees</strong> in the Employees table."</p>
        </div>

        <p className="font-bold mt-4">With a Condition:</p>
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-2">
          <pre className="text-sm text-blue-800 bg-white p-2 rounded">
            {`SELECT COUNT(*) FROM Employees WHERE Department = 'Sales';`}
          </pre>
          <p className="mt-2">This means: 👉 "Count <strong>only the employees</strong> who work in the <strong>Sales</strong> department."</p>
        </div>

        <p className="font-bold mt-4">With GROUP BY (optional advanced use):</p>
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-2">
          <pre className="text-sm text-blue-800 bg-white p-2 rounded">
            {`SELECT Department, COUNT(*) FROM Employees
GROUP BY Department;`}
          </pre>
          <p className="mt-2">This shows how many employees are there <strong>in each department</strong>.</p>
        </div>
      </div>
    ),
    category: "SQL Functions"
  },
  {
    id: 28,
    question: "28. 🔠 What's the Difference Between CHAR and VARCHAR?",
    answer: (
      <div>
        <p>🔹 Both <strong>CHAR</strong> and <strong>VARCHAR</strong> are used to <strong>store text</strong> in a database — like names, emails, or addresses.</p>
        <p>But they <strong>store that text differently</strong> in terms of space.</p>

        <p className="font-bold mt-4">1. CHAR — Fixed Length (Always Same Size)</p>
        <ul className="list-disc pl-5">
          <li>CHAR saves <strong>a fixed number of letters</strong> (even if you give less).</li>
          <li>If you say CHAR(10) and type "Ram", it still keeps <strong>10 spaces</strong> by adding blank spaces.</li>
        </ul>
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-2">
          <p className="font-bold text-blue-800 mb-2">Example:</p>
          <p>You give "Ram" → CHAR(10) saves it as: "Ram" (7 blank spaces)</p>
          <p className="mt-2">✅ Good for: Things that <strong>always have the same number of characters</strong> — like <strong>PIN codes</strong> or <strong>fixed ID numbers</strong>.</p>
        </div>

        <p className="font-bold mt-4">2. VARCHAR — Flexible Length (Uses What's Needed)</p>
        <ul className="list-disc pl-5">
          <li>VARCHAR <strong>only saves as many letters as you give</strong>.</li>
          <li>If you say VARCHAR(10) and type "Ram", it saves just <strong>"Ram"</strong>, without extra spaces.</li>
        </ul>
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-2">
          <p className="font-bold text-blue-800 mb-2">Example:</p>
          <p>You give "Ram" → VARCHAR(10) saves it as: "Ram"</p>
          <p className="mt-2">✅ Good for: <strong>Names, emails, and addresses</strong> where the length can <strong>change from person to person</strong>.</p>
        </div>

        <div className="mt-4 bg-blue-100 p-3 rounded-lg border border-blue-300">
          <p className="font-semibold text-blue-900">🎯 Easy Comparison:</p>
          <table className="w-full text-sm text-blue-800 mt-2">
            <thead>
              <tr className="bg-blue-200">
                <th className="p-2 border border-blue-300">Feature</th>
                <th className="p-2 border border-blue-300">CHAR</th>
                <th className="p-2 border border-blue-300">VARCHAR</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-blue-300">Length</td>
                <td className="p-2 border border-blue-300">Fixed (same size always)</td>
                <td className="p-2 border border-blue-300">Flexible (grows/shrinks)</td>
              </tr>
              <tr>
                <td className="p-2 border border-blue-300">Space Usage</td>
                <td className="p-2 border border-blue-300">Uses full size always</td>
                <td className="p-2 border border-blue-300">Uses only needed space</td>
              </tr>
              <tr>
                <td className="p-2 border border-blue-300">Best For</td>
                <td className="p-2 border border-blue-300">PINs, codes, fixed values</td>
                <td className="p-2 border border-blue-300">Names, emails, addresses</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
          <p className="font-bold text-blue-800 mb-2">💬 Simple Analogy:</p>
          <p>Imagine CHAR is like giving everyone a box of 10 chocolates — even if they only eat 3.</p>
          <p>VARCHAR is like giving chocolates based on how many they actually want — no waste!</p>
        </div>
      </div>
    ),
    category: "Data Types"
  },
  {
    id: 29,
    question: "29. 🔗 JOIN vs UNION — What's the Difference?",
    answer: (
      <div>
        <p>🔹 Both <strong>JOIN</strong> and <strong>UNION</strong> are used in SQL to combine data from two or more tables.</p>
        <p>But <strong>how they combine the data</strong> is very different.</p>

        <p className="font-bold mt-4">1. JOIN — Combines Side by Side (Columns)</p>
        <ul className="list-disc pl-5">
          <li>A <strong>JOIN</strong> brings data <strong>side-by-side</strong> by matching rows using a <strong>common value</strong> (like an ID).</li>
          <li>It connects related data from <strong>two tables</strong> into <strong>one wider row</strong>.</li>
        </ul>
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-2">
          <p className="font-bold text-blue-800 mb-2">Example:</p>
          <p>You have:</p>
          <ul className="list-disc pl-5">
            <li>One table with Employee Names and IDs</li>
            <li>Another table with Salaries and IDs</li>
          </ul>
          <p className="mt-2">Using JOIN → You get: Name + Salary in one row, matched by ID.</p>
          <p className="mt-2">✅ <strong>Good for</strong>: Showing <strong>related information together</strong>, like customer name + order details.</p>
        </div>

        <p className="font-bold mt-4">2. UNION — Combines Top to Bottom (Rows)</p>
        <ul className="list-disc pl-5">
          <li>A <strong>UNION</strong> stacks the rows from two tables <strong>one below the other</strong> (like merging two lists).</li>
          <li>Both tables should have the <strong>same number of columns</strong> and <strong>similar types</strong>.</li>
        </ul>
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-2">
          <p className="font-bold text-blue-800 mb-2">Example:</p>
          <p>You have:</p>
          <ul className="list-disc pl-5">
            <li>One table with names of students from Class A</li>
            <li>Another table with names of students from Class B</li>
          </ul>
          <p className="mt-2">Using UNION → You get: One list of students from both classes.</p>
          <p className="mt-2">✅ <strong>Good for</strong>: Creating <strong>a single list from multiple sources</strong> with the <strong>same kind of data</strong>.</p>
        </div>

        <div className="mt-4 bg-blue-100 p-3 rounded-lg border border-blue-300">
          <p className="font-semibold text-blue-900">🎯 Easy Comparison:</p>
          <table className="w-full text-sm text-blue-800 mt-2">
            <thead>
              <tr className="bg-blue-200">
                <th className="p-2 border border-blue-300">Feature</th>
                <th className="p-2 border border-blue-300">JOIN</th>
                <th className="p-2 border border-blue-300">UNION</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-blue-300">Combines data by</td>
                <td className="p-2 border border-blue-300">Matching values (like IDs)</td>
                <td className="p-2 border border-blue-300">Adding rows from multiple tables</td>
              </tr>
              <tr>
                <td className="p-2 border border-blue-300">Output style</td>
                <td className="p-2 border border-blue-300">Adds <strong>columns</strong> side-by-side</td>
                <td className="p-2 border border-blue-300">Adds <strong>rows</strong> top-to-bottom</td>
              </tr>
              <tr>
                <td className="p-2 border border-blue-300">Used for</td>
                <td className="p-2 border border-blue-300">Related info from different tables</td>
                <td className="p-2 border border-blue-300">Same type of info from many tables</td>
              </tr>
              <tr>
                <td className="p-2 border border-blue-300">Requires</td>
                <td className="p-2 border border-blue-300">Common column to connect</td>
                <td className="p-2 border border-blue-300">Same number of columns</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
          <p className="font-bold text-blue-800 mb-2">💬 Simple Analogy:</p>
          <ul className="list-disc pl-5">
            <li><strong>JOIN</strong> is like combining two puzzle pieces <strong>side-by-side</strong> to complete a picture.</li>
            <li><strong>UNION</strong> is like <strong>stacking pages</strong> from two notebooks into one.</li>
          </ul>
        </div>
      </div>
    ),
    category: "SQL Operations"
  },
  {
    id: 30,
    question: "30. 🛠️ What is DDL and DML in SQL?",
    answer: (
      <div>
        <p>🔹 In SQL (Structured Query Language), we use two types of commands to <strong>work with databases</strong>:</p>

        <p className="font-bold mt-4">1. DDL — Data Definition Language</p>
        <p>Think of DDL like <strong>setting up the structure</strong> of your database — like building the shelves before putting books on them.</p>
        <p>It is used to:</p>
        <ul className="list-disc pl-5">
          <li><strong>Create</strong> new tables or views</li>
          <li><strong>Change</strong> (alter) the structure of existing tables</li>
          <li><strong>Delete</strong> (drop) tables when not needed</li>
        </ul>
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-2">
          <p className="font-bold text-blue-800 mb-2">Examples:</p>
          <ul className="list-disc pl-5">
            <li>CREATE TABLE — to make a new table</li>
            <li>ALTER TABLE — to add or remove a column</li>
            <li>DROP TABLE — to remove the whole table</li>
          </ul>
          <p className="mt-2">✅ <strong>Use DDL when</strong> you want to <strong>design or redesign</strong> the database layout.</p>
        </div>

        <p className="font-bold mt-4">2. DML — Data Manipulation Language</p>
        <p>DML is used to <strong>work with the actual data</strong> — like adding, updating, or deleting rows in a table (once the shelves are built, now you place the books).</p>
        <p>It is used to:</p>
        <ul className="list-disc pl-5">
          <li><strong>Insert</strong> new data</li>
          <li><strong>Update</strong> existing data</li>
          <li><strong>Delete</strong> data</li>
          <li><strong>Retrieve</strong> data (using SELECT)</li>
        </ul>
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-2">
          <p className="font-bold text-blue-800 mb-2">Examples:</p>
          <ul className="list-disc pl-5">
            <li>INSERT INTO — to add a new record</li>
            <li>UPDATE — to change existing data</li>
            <li>DELETE — to remove data</li>
          </ul>
          <p className="mt-2">✅ <strong>Use DML when</strong> you want to <strong>add or change data</strong> inside the database.</p>
        </div>

        <div className="mt-4 bg-blue-100 p-3 rounded-lg border border-blue-300">
          <p className="font-semibold text-blue-900">🎯 In Simple Terms:</p>
          <table className="w-full text-sm text-blue-800 mt-2">
            <thead>
              <tr className="bg-blue-200">
                <th className="p-2 border border-blue-300">Type</th>
                <th className="p-2 border border-blue-300">Full Form</th>
                <th className="p-2 border border-blue-300">What it does</th>
                <th className="p-2 border border-blue-300">Everyday Example</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-blue-300">DDL</td>
                <td className="p-2 border border-blue-300">Data Definition Language</td>
                <td className="p-2 border border-blue-300">Builds or changes database structure</td>
                <td className="p-2 border border-blue-300">Building or rearranging a cupboard</td>
              </tr>
              <tr>
                <td className="p-2 border border-blue-300">DML</td>
                <td className="p-2 border border-blue-300">Data Manipulation Language</td>
                <td className="p-2 border border-blue-300">Adds, updates, or removes data</td>
                <td className="p-2 border border-blue-300">Putting books in or taking them out</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
          <p className="font-bold text-blue-800 mb-2">💬 Analogy:</p>
          <ul className="list-disc pl-5">
            <li><strong>DDL is like building the house.</strong></li>
            <li><strong>DML is like arranging furniture inside the house.</strong></li>
          </ul>
        </div>
      </div>
    ),
    category: "SQL Basics"
  },
  {
    id: 31,
    question: "31. ◻ What are CTEs (Common Table Expressions) in SQL?",
    answer: (
      <div>
        <p>🔹 A <strong>CTE</strong> is like a <strong>temporary shortcut</strong> or <strong>nickname</strong> for a small part of a big SQL query.</p>
        <p>It helps you <strong>break a big, complicated query into smaller, easier-to-understand parts</strong> — just like breaking a big task into smaller steps.</p>

        <p className="font-bold mt-4">🔧 How does it work?</p>
        <p>You write a CTE using the word WITH, give it a name, and write a small query. Then, you use that name later in your main query — instead of repeating the same logic again.</p>

        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
          <p className="font-bold text-blue-800 mb-2">◻ Simple Example:</p>
          <p>Let's say you want to find employees who earn more than the average salary.</p>
          <p>✅ With CTE:</p>
          <pre className="text-sm text-blue-800 bg-white p-2 rounded">
            {`WITH AverageSalary AS
(SELECT AVG(Salary) AS AvgSal FROM Employees)
SELECT Name, Salary
FROM Employees, AverageSalary
WHERE Employees.Salary > AverageSalary.AvgSal;`}
          </pre>
          <p className="mt-2">Here:</p>
          <ul className="list-disc pl-5">
            <li>AverageSalary is a CTE.</li>
            <li>It helps us calculate the average salary once and use it easily.</li>
          </ul>
        </div>

        <div className="mt-4 bg-blue-100 p-3 rounded-lg border border-blue-300">
          <p className="font-semibold text-blue-900">🎯 Why CTEs are Useful</p>
          <table className="w-full text-sm text-blue-800 mt-2">
            <thead>
              <tr className="bg-blue-200">
                <th className="p-2 border border-blue-300">Benefit</th>
                <th className="p-2 border border-blue-300">What It Means</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-blue-300">Readability</td>
                <td className="p-2 border border-blue-300">Makes long queries easier to read</td>
              </tr>
              <tr>
                <td className="p-2 border border-blue-300">Clean Code</td>
                <td className="p-2 border border-blue-300">Avoids repeating the same logic again</td>
              </tr>
              <tr>
                <td className="p-2 border border-blue-300">Recursion</td>
                <td className="p-2 border border-blue-300">Can be used to repeat steps (like getting a full list of team members in a hierarchy)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
          <p className="font-bold text-blue-800 mb-2">🏠 Simple Analogy:</p>
          <p>Imagine writing a recipe.</p>
          <p>Instead of repeating the steps for making "chocolate sauce" each time, you write it once as a <strong>sub-recipe</strong>, give it a name like <strong>"ChocoSauce"</strong>, and then just say "Add ChocoSauce" later.</p>
          <p className="mt-2">That's what a <strong>CTE</strong> does in SQL — <strong>saves time, avoids repetition, and keeps things clean</strong>.</p>
        </div>
      </div>
    ),
    category: "SQL Programming"
  },
  {
    id: 32,
    question: "32. 📄 What is Data Paging in SQL?",
    answer: (
      <div>
        <p>🔹 When you have a <strong>huge list of data</strong> (like hundreds or thousands of rows), it's not practical to show everything at once — just like a website doesn't show all search results on one page.</p>
        <p><strong>Data paging</strong> means showing a <strong>few rows at a time</strong>, like showing 10 results per page.</p>

        <p className="font-bold mt-4">🛠️ How Does It Work?</p>
        <p>SQL has special tools to help with this — like:</p>
        <ul className="list-disc pl-5">
          <li>LIMIT and OFFSET (used in MySQL, SQLite)</li>
          <li>OFFSET and FETCH (used in SQL Server, PostgreSQL)</li>
        </ul>
        <p>These tell the database:</p>
        <ul className="list-disc pl-5">
          <li><strong>How many rows to skip</strong> (OFFSET)</li>
          <li><strong>How many rows to show</strong> (LIMIT or FETCH)</li>
        </ul>

        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
          <p className="font-bold text-blue-800 mb-2">📘 Example (Simple Terms):</p>
          <p>Let's say we have a table of 100 employee records, and we want to show:</p>
          <ul className="list-disc pl-5">
            <li>Page 1 → Show first 10 rows</li>
            <li>Page 2 → Skip 10, then show next 10 rows</li>
            <li>Page 3 → Skip 20, then show next 10 rows</li>
          </ul>
          <p className="mt-2">✅ Example using MySQL:</p>
          <pre className="text-sm text-blue-800 bg-white p-2 rounded">
            {`SELECT * FROM Employees
LIMIT 10 OFFSET 0; -- Page 1 (rows 1-10)

SELECT * FROM Employees
LIMIT 10 OFFSET 10; -- Page 2 (rows 11-20)

SELECT * FROM Employees
LIMIT 10 OFFSET 20; -- Page 3 (rows 21-30)`}
          </pre>
        </div>

        <div className="mt-4 bg-blue-100 p-3 rounded-lg border border-blue-300">
          <p className="font-semibold text-blue-900">📘 In Simple Words:</p>
          <table className="w-full text-sm text-blue-800 mt-2">
            <thead>
              <tr className="bg-blue-200">
                <th className="p-2 border border-blue-300">Page</th>
                <th className="p-2 border border-blue-300">What It Does</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-blue-300">Page 1</td>
                <td className="p-2 border border-blue-300">Show first 10 rows</td>
              </tr>
              <tr>
                <td className="p-2 border border-blue-300">Page 2</td>
                <td className="p-2 border border-blue-300">Skip first 10, show next 10</td>
              </tr>
              <tr>
                <td className="p-2 border border-blue-300">Page 3</td>
                <td className="p-2 border border-blue-300">Skip first 20, show next 10</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="font-bold mt-4">Why It's Useful:</p>
        <ul className="list-disc pl-5">
          <li>Makes apps and websites faster</li>
          <li>Helps users see data in chunks (like pages)</li>
          <li>Great for tables, reports, or any list that's too long</li>
        </ul>
      </div>
    ),
    category: "SQL Operations"
  },
  {
    id: 33,
    question: "33. 🔁 What is a Cursor in SQL?",
    answer: (
      <div>
        <p>🔹 Think of a <strong>cursor</strong> like a <strong>bookmark or pointer</strong> that goes through one row at a time in a list of data from a table.</p>
        <p>Imagine you have a list of 100 people and you want to <strong>do something with each person one by one</strong> — for example, send a message, calculate a score, or update a value. A cursor helps you do this.</p>

        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
          <p className="font-bold text-blue-800 mb-2">📦 Example (In Real Life Terms):</p>
          <p>Let's say you're a teacher with a class register:</p>
          <ul className="list-disc pl-5">
            <li>You want to go through the register <strong>student by student</strong> and check who has completed their homework.</li>
            <li>You don't check the entire list at once — you check <strong>one student at a time</strong>.</li>
          </ul>
          <p className="mt-2">That's exactly what a <strong>cursor</strong> does in a database — it helps go through data <strong>row by row</strong>, instead of all at once.</p>
        </div>

        <p className="font-bold mt-4">When is it used?</p>
        <p>You use a cursor when:</p>
        <ul className="list-disc pl-5">
          <li>You need to <strong>process each row</strong> individually</li>
          <li>You want to <strong>perform calculations or updates</strong> one row at a time</li>
          <li>You're inside a <strong>stored procedure</strong> (a saved script) and want to loop through data</li>
        </ul>

        <p className="font-bold mt-4">⚠️ Important Note:</p>
        <p>Cursors are powerful, but they can be <strong>slow</strong> if there's a lot of data. So, in many cases, developers try to avoid them by using <strong>better alternatives</strong> like set-based operations (which handle multiple rows together).</p>

        <div className="mt-4 bg-blue-100 p-3 rounded-lg border border-blue-300">
          <p className="font-semibold text-blue-900">◻ In Simple Words:</p>
          <table className="w-full text-sm text-blue-800 mt-2">
            <thead>
              <tr className="bg-blue-200">
                <th className="p-2 border border-blue-300">Feature</th>
                <th className="p-2 border border-blue-300">Cursor</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-blue-300">What it does</td>
                <td className="p-2 border border-blue-300">Goes through data one row at a time</td>
              </tr>
              <tr>
                <td className="p-2 border border-blue-300">Used for</td>
                <td className="p-2 border border-blue-300">Row-by-row processing</td>
              </tr>
              <tr>
                <td className="p-2 border border-blue-300">Like</td>
                <td className="p-2 border border-blue-300">Checking each student in a register, one by one</td>
              </tr>
              <tr>
                <td className="p-2 border border-blue-300">Tasks</td>
                <td className="p-2 border border-blue-300">Where you need step-by-step actions</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
    category: "SQL Programming"
  },
  {
    id: 34,
    question: "34. ◻ What is TRUNCATE in SQL?",
    answer: (
      <div>
        <p>🔹 The <strong>TRUNCATE</strong> command is used to <strong>quickly delete all data</strong> from a table — like <strong>clearing everything</strong> from an Excel sheet at once.</p>

        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
          <p className="font-bold text-blue-800 mb-2">📘 Example (Real-Life Comparison):</p>
          <p>Imagine you have a <strong>notebook</strong> full of names.</p>
          <ul className="list-disc pl-5">
            <li>If you <strong>use a pencil eraser</strong> and erase each name <strong>one by one</strong>, that's like using DELETE.</li>
            <li>If you <strong>tear out the entire page</strong> and start fresh, that's like using TRUNCATE.</li>
          </ul>
        </div>

        <div className="mt-4 bg-blue-100 p-3 rounded-lg border border-blue-300">
          <p className="font-semibold text-blue-900">🚀 Key Points (In Simple Words):</p>
          <table className="w-full text-sm text-blue-800 mt-2">
            <thead>
              <tr className="bg-blue-200">
                <th className="p-2 border border-blue-300">Feature</th>
                <th className="p-2 border border-blue-300">TRUNCATE</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-blue-300">What it does</td>
                <td className="p-2 border border-blue-300">Deletes all rows from a table instantly</td>
              </tr>
              <tr>
                <td className="p-2 border border-blue-300">Speed</td>
                <td className="p-2 border border-blue-300">Very fast (faster than DELETE)</td>
              </tr>
              <tr>
                <td className="p-2 border border-blue-300">Rollback (Undo)?</td>
                <td className="p-2 border border-blue-300">❌ No, you <strong>can't undo</strong> TRUNCATE</td>
              </tr>
              <tr>
                <td className="p-2 border border-blue-300">Triggers run?</td>
                <td className="p-2 border border-blue-300">❌ No, it <strong>doesn't run</strong> delete triggers</td>
              </tr>
              <tr>
                <td className="p-2 border border-blue-300">Keeps table?</td>
                <td className="p-2 border border-blue-300">✅ Yes, only data is removed — table structure stays</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="font-bold mt-4">✅ When to Use TRUNCATE:</p>
        <ul className="list-disc pl-5">
          <li>When you want to <strong>completely empty a table</strong> quickly</li>
          <li>When you <strong>don't need to undo</strong> the action</li>
          <li>When you <strong>don't need to log each row</strong> being deleted</li>
        </ul>
      </div>
    ),
    category: "SQL Operations"
  },
  {
    id: 35,
    question: "35. 🔄 What is a Deadlock in a Database?",
    answer: (
      <div>
        <p>🔹 A <strong>deadlock</strong> happens when <strong>two people (or programs)</strong> are each waiting for the other to finish, and nobody can move forward.</p>

        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
          <p className="font-bold text-blue-800 mb-2">📘 Real-Life Example:</p>
          <p>Imagine two people:</p>
          <ul className="list-disc pl-5">
            <li>Person A has the <strong>pen</strong> and wants the <strong>notebook</strong>.</li>
            <li>Person B has the <strong>notebook</strong> and wants the <strong>pen</strong>.</li>
          </ul>
          <p className="mt-2">Both are waiting for the other to give up the item — and they're <strong>stuck</strong> forever. That's a <strong>deadlock</strong>.</p>
        </div>

        <div className="mt-4 bg-blue-100 p-3 rounded-lg border border-blue-300">
          <p className="font-semibold text-blue-900">🛠️ How to Prevent or Handle It (Simple Tips):</p>
          <table className="w-full text-sm text-blue-800 mt-2">
            <thead>
              <tr className="bg-blue-200">
                <th className="p-2 border border-blue-300">Tip</th>
                <th className="p-2 border border-blue-300">Meaning (in simple terms)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-blue-300">Access things in the same order</td>
                <td className="p-2 border border-blue-300">Make sure all programs use resources in the <strong>same sequence</strong>, like <strong>pen first, notebook second</strong>.</td>
              </tr>
              <tr>
                <td className="p-2 border border-blue-300">Use proper isolation levels</td>
                <td className="p-2 border border-blue-300">Choose a safe mode for programs to work <strong>together without stepping on each other's toes</strong>.</td>
              </tr>
              <tr>
                <td className="p-2 border border-blue-300">Set time limits</td>
                <td className="p-2 border border-blue-300">If a program is waiting too long, <strong>cancel and retry</strong> to avoid getting stuck.</td>
              </tr>
              <tr>
                <td className="p-2 border border-blue-300">Let the system detect & fix</td>
                <td className="p-2 border border-blue-300">Modern databases can <strong>spot deadlocks</strong> and automatically <strong>break them</strong> by cancelling one program.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
          <p className="font-bold text-blue-800 mb-2">✅ In Simple Words:</p>
          <p>Deadlocks are like <strong>two people blocking each other in a hallway</strong> — neither can pass. To prevent it, you <strong>plan the traffic flow</strong>, and if it still happens, you <strong>ask one person to step back and try again.</strong></p>
        </div>
      </div>
    ),
    category: "Database Concepts"
  },
  {
    id: 36,
    question: "36. ↔️ What is the difference between a left outer join and a right outer join?",
    answer: (
      <div>
        <p>🔹 <strong>Think of Two Tables Like Two Lists</strong></p>
        <p>Let's say we have:</p>
        <ul className="list-disc pl-5">
          <li>📘 Table A: List of <strong>students</strong></li>
          <li>📙 Table B: List of <strong>projects</strong> each student is working on</li>
        </ul>
        <p className="mt-2">Now we want to combine them — even if <strong>some students don't have projects</strong>, or <strong>some projects don't have students</strong>.</p>

        <p className="font-bold mt-4">👈 LEFT OUTER JOIN (Left Side is Main)</p>
        <ul className="list-disc pl-5">
          <li>You <strong>keep all students</strong> from Table A (even if they don't have a project).</li>
          <li>If a student doesn't have a matching project in Table B, you still show the student — just with <strong>blank/null</strong> for the project.</li>
        </ul>
        <p className="mt-2">✅ <strong>Always keeps all records from the left (first) table.</strong></p>

        <p className="font-bold mt-4">👉 RIGHT OUTER JOIN (Right Side is Main)</p>
        <ul className="list-disc pl-5">
          <li>You <strong>keep all projects</strong> from Table B (even if no student is working on them).</li>
          <li>If a project doesn't have a matching student, you still show the project — just with <strong>blank/null</strong> for the student.</li>
        </ul>
        <p className="mt-2">✅ <strong>Always keeps all records from the right (second) table.</strong></p>

        <div className="mt-4 bg-blue-100 p-3 rounded-lg border border-blue-300">
          <p className="font-semibold text-blue-900">📝 Simple Comparison Table</p>
          <table className="w-full text-sm text-blue-800 mt-2">
            <thead>
              <tr className="bg-blue-200">
                <th className="p-2 border border-blue-300">Feature</th>
                <th className="p-2 border border-blue-300">LEFT OUTER JOIN</th>
                <th className="p-2 border border-blue-300">RIGHT OUTER JOIN</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-blue-300">Keeps all rows from</td>
                <td className="p-2 border border-blue-300">Left table (first one)</td>
                <td className="p-2 border border-blue-300">Right table (second one)</td>
              </tr>
              <tr>
                <td className="p-2 border border-blue-300">Fills missing values</td>
                <td className="p-2 border border-blue-300">From right table (nulls)</td>
                <td className="p-2 border border-blue-300">From left table (nulls)</td>
              </tr>
              <tr>
                <td className="p-2 border border-blue-300">Example focus</td>
                <td className="p-2 border border-blue-300">All students, projects optional</td>
                <td className="p-2 border border-blue-300">All projects, students optional</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
          <p className="font-bold text-blue-800 mb-2">🎯 In Simple Words:</p>
          <p><strong>LEFT JOIN = "Always show everyone from the first list"</strong><br />
          <strong>RIGHT JOIN = "Always show everything from the second list"</strong></p>
        </div>
      </div>
    ),
    category: "Joins"
  },
  {
    id: 37,
    question: "37. 🔄 What is ROLLBACK in SQL?",
    answer: (
      <div>
        <p>🔹 <strong>ROLLBACK</strong> is like pressing <strong>Undo</strong> in a document or app.</p>
        <p>It <strong>cancels</strong> the recent changes made to the database <strong>before they are saved</strong>.</p>

        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
          <p className="font-bold text-blue-800 mb-2">◻ Think of It Like This:</p>
          <p>Imagine you're filling out a form online — name, address, etc. But just before hitting <strong>Submit</strong>, you realize something is wrong, so you <strong>cancel</strong> it.</p>
          <p className="mt-2">That's what <strong>ROLLBACK</strong> does — it stops and <strong>undoes all the actions</strong> in that session.</p>
        </div>

        <p className="font-bold mt-4">🛠️ When Is ROLLBACK Used?</p>
        <ul className="list-disc pl-5">
          <li>If there's a <strong>mistake</strong> in the data.</li>
          <li>If part of a big operation <strong>fails</strong>.</li>
          <li>If you change your mind and want to <strong>cancel all updates</strong> made so far.</li>
        </ul>

        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
          <p className="font-bold text-blue-800 mb-2">📘 Simple Example:</p>
          <ol className="list-decimal pl-5">
            <li>You start a transaction (a group of actions).</li>
            <li>You insert or update some data.</li>
            <li>Something goes wrong or you realize it's not right.</li>
            <li>You use <strong>ROLLBACK</strong> to <strong>cancel everything</strong> you did since the start of the transaction.</li>
          </ol>
        </div>

        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
          <p className="font-bold text-blue-800 mb-2">🎯 In Simple Words:</p>
          <p><strong>ROLLBACK = Cancel and undo all recent changes before saving.</strong></p>
        </div>
      </div>
    ),
    category: "Transactions"
  },
  {
    id: 38,
    question: "38. 🚀 How to Make SQL Queries Faster Using Indexes",
    answer: (
      <div>
        <p>🔹 Think of an <strong>index</strong> in a database like the <strong>index at the back of a book</strong> — it helps you <strong>find things quickly</strong> without reading every page.</p>

        <p className="font-bold mt-4">◻ How Indexes Help:</p>
        <p>Let's say you have a big table with thousands of rows — like a giant list of names and phone numbers. If you want to find just one person, <strong>an index helps the database jump right to that person</strong>, instead of checking every single row.</p>

        <p className="font-bold mt-4">✅ Ways to Use Indexes for Faster Queries:</p>
        <ol className="list-decimal pl-5">
          <li>
            <strong>Use indexes on columns you search often</strong>
            <p>Example: If you're often looking up people by their email, make sure the <strong>email column has an index</strong>.</p>
          </li>
          <li>
            <strong>Don't use functions on indexed columns</strong>
            <p>❌ Example: Avoid using UPPER(name) or +1 on the column — it can <strong>confuse the index</strong> and slow things down.</p>
          </li>
          <li>
            <strong>Use covering indexes</strong>
            <p>This means adding indexes that include <strong>all the columns</strong> your query needs. Then, the database can answer the query just by reading the index — super fast!</p>
          </li>
          <li>
            <strong>Maintain your indexes</strong>
            <p>Just like cleaning your room, you need to <strong>rebuild or reorganize indexes</strong> once in a while to keep them efficient.</p>
          </li>
        </ol>

        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
          <p className="font-bold text-blue-800 mb-2">🎯 In Simple Words:</p>
          <p><strong>Indexes are shortcuts</strong> in the database that make searching much faster — just like using the index in a book.</p>
          <p className="mt-2">Using them smartly saves time and keeps your app or system running smoothly.</p>
        </div>
      </div>
    ),
    category: "Performance"
  },
  {
    id: 39,
    question: "39. 🤝 What is a natural join, and when would you use it?",
    answer: (
      <div>
        <p>🔹 A <strong>natural join</strong> is a way to combine two tables in a database based on <strong>columns that have the same name</strong> in both tables. You don't need to tell the database which column to match — it <strong>automatically matches columns with the same name</strong>.</p>

        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
          <p className="font-bold text-blue-800 mb-2">◻ Simple Example:</p>
          <p>Imagine you have:</p>
          <ul className="list-disc pl-5">
            <li>One table with <strong>Employee Names</strong> and their <strong>Department ID</strong>.</li>
            <li>Another table with <strong>Department ID</strong> and <strong>Department Names</strong>.</li>
          </ul>
          <p className="mt-2">Since both tables have a column called <strong>"DepartmentID"</strong>, a <strong>natural join</strong> connects them using that column.</p>
        </div>

        <p className="font-bold mt-4">✅ When would you use it?</p>
        <p>You use a <strong>natural join</strong> when:</p>
        <ul className="list-disc pl-5">
          <li>Two tables have <strong>columns with the same name</strong>.</li>
          <li>You want to <strong>combine data</strong> from both tables easily, without writing extra details.</li>
        </ul>

        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
          <p className="font-bold text-blue-800 mb-2">In simple terms:</p>
          <p>A natural join is like saying, "If the column names match, just join the tables using that." It saves time and makes combining related data easier.</p>
        </div>
      </div>
    ),
    category: "Joins"
  },
  {
    id: 40,
    question: "40. 🔍 Explain the differences between the CHARINDEX and PATINDEX functions.",
    answer: (
      <div>
        <p>🔹 Let's say you're searching for a word or part of a word inside a bigger sentence. Both CHARINDEX and PATINDEX help you <strong>find where that word starts</strong>, but they work a little differently.</p>

        <p className="font-bold mt-4">🔍 CHARINDEX — Simple Search</p>
        <ul className="list-disc pl-5">
          <li>This is used when you want to <strong>find the exact position</strong> of a word or set of characters in a sentence.</li>
          <li>Example: In the sentence <em>"Welcome to Rishab Informatica"</em>, if you search for <strong>"Rishab"</strong>, CHARINDEX will tell you <strong>where the word starts</strong> (like position 12).</li>
        </ul>
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-2">
          <p className="font-bold text-blue-800 mb-2">📌 Think of it like:</p>
          <p>Using <strong>Ctrl + F</strong> to find a specific word in a document.</p>
        </div>

        <p className="font-bold mt-4">🎭 PATINDEX — Pattern-Based Search</p>
        <ul className="list-disc pl-5">
          <li>This is helpful when you <strong>don't know the exact word</strong>, but you know a <strong>pattern</strong> (like something that starts with "Ris" and ends with "a").</li>
          <li>It allows <strong>wildcards</strong> like %, so it's more flexible.</li>
          <li>Example: Searching for <strong>"%Rish%"</strong> will also match <strong>"Rishab"</strong>, "Rishi", etc.</li>
        </ul>
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-2">
          <p className="font-bold text-blue-800 mb-2">📌 Think of it like:</p>
          <p>Searching for a word that <strong>starts or contains certain letters</strong>, not the full word.</p>
        </div>

        <div className="mt-4 bg-blue-100 p-3 rounded-lg border border-blue-300">
          <p className="font-semibold text-blue-900">◻ In Simple Words:</p>
          <table className="w-full text-sm text-blue-800 mt-2">
            <thead>
              <tr className="bg-blue-200">
                <th className="p-2 border border-blue-300">Feature</th>
                <th className="p-2 border border-blue-300">CHARINDEX</th>
                <th className="p-2 border border-blue-300">PATINDEX</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-blue-300">Exact Match</td>
                <td className="p-2 border border-blue-300">✅ Yes</td>
                <td className="p-2 border border-blue-300">❌ No (uses patterns/wildcards)</td>
              </tr>
              <tr>
                <td className="p-2 border border-blue-300">Flexible</td>
                <td className="p-2 border border-blue-300">❌ Less flexible</td>
                <td className="p-2 border border-blue-300">✅ More flexible (supports wildcards)</td>
              </tr>
              <tr>
                <td className="p-2 border border-blue-300">Use Case</td>
                <td className="p-2 border border-blue-300">Find exact word/phrase</td>
                <td className="p-2 border border-blue-300">Find based on pattern (like "starts with Rish")</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
    category: "SQL Functions"
  },
  {
    id: 41,
    question: "41. ❌ What is the DIFFERENCE BETWEEN DELETE and DROP commands in SQL?",
    answer: (
      <div>
        <p>🔹 Both are used to remove data — but at different levels.</p>
        <ul className="list-disc pl-5">
          <li><strong>DELETE</strong> — Removes data <strong>inside</strong> a table</li>
          <li><strong>DROP</strong> — Removes the entire <strong>table</strong> itself</li>
        </ul>

        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
          <p className="font-bold text-blue-800 mb-2">📌 Simple Example:</p>
          <ul className="list-disc pl-5">
            <li>DELETE FROM Students; → removes all rows, but keeps the table structure</li>
            <li>DROP TABLE Students; → deletes the whole table (structure + data)</li>
          </ul>
        </div>

        <div className="mt-4 bg-blue-100 p-3 rounded-lg border border-blue-300">
          <p className="font-semibold text-blue-900">Key Differences:</p>
          <table className="w-full text-sm text-blue-800 mt-2">
            <thead>
              <tr className="bg-blue-200">
                <th className="p-2 border border-blue-300">Feature</th>
                <th className="p-2 border border-blue-300">DELETE</th>
                <th className="p-2 border border-blue-300">DROP</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-blue-300">What is removed?</td>
                <td className="p-2 border border-blue-300">Only data</td>
                <td className="p-2 border border-blue-300">Entire table (structure & data)</td>
              </tr>
              <tr>
                <td className="p-2 border border-blue-300">Can undo?</td>
                <td className="p-2 border border-blue-300">✅ Yes (if inside transaction)</td>
                <td className="p-2 border border-blue-300">❌ No, cannot recover</td>
              </tr>
              <tr>
                <td className="p-2 border border-blue-300">Table remains?</td>
                <td className="p-2 border border-blue-300">✅ Yes</td>
                <td className="p-2 border border-blue-300">❌ No</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
    category: "SQL Operations"
  },
  {
    id: 42,
    question: "42. ⏹️ What is the LIMIT clause in SQL and Why Is It Useful?",
    answer: (
      <div>
        <p>🔹 LIMIT helps control <strong>how many rows</strong> you get from a query — very useful when you only want a <strong>sample</strong> or a <strong>few results</strong>.</p>

        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
          <p className="font-bold text-blue-800 mb-2">📘 Example:</p>
          <pre className="text-sm text-blue-800 bg-white p-2 rounded">
            {`SELECT * FROM Students LIMIT 5;`}
          </pre>
          <p className="mt-2">→ Shows only the <strong>first 5 students</strong> in the list.</p>
        </div>

        <p className="font-bold mt-4">✅ Why Use LIMIT?</p>
        <ul className="list-disc pl-5">
          <li>To preview large data without loading everything</li>
          <li>Useful in web apps (like "Show 10 records per page")</li>
          <li>Helps speed up query testing</li>
        </ul>
      </div>
    ),
    category: "SQL Operations"
  },
  {
    id: 43,
    question: "43. 🔍 What is the Difference Between WHERE and HAVING in SQL?",
    answer: (
      <div>
        <p>🔹 Both are used to filter data — but they work at <strong>different stages</strong>.</p>
        <ul className="list-disc pl-5">
          <li>📍 <strong>WHERE</strong> → filters individual rows <strong>before</strong> grouping</li>
          <li>📍 <strong>HAVING</strong> → filters <strong>after</strong> grouping is done</li>
        </ul>

        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
          <p className="font-bold text-blue-800 mb-2">◻ Example:</p>
          <pre className="text-sm text-blue-800 bg-white p-2 rounded">
            {`SELECT department, COUNT(*) FROM Employees
WHERE salary > 20000
GROUP BY department
HAVING COUNT(*) > 5;`}
          </pre>
          <p className="mt-2">✅ Use <strong>WHERE</strong> for raw data filters</p>
          <p>✅ Use <strong>HAVING</strong> for group result filters</p>
        </div>
      </div>
    ),
    category: "SQL Operations"
  },
  {
    id: 44,
    question: "44. ↔️ What is the SQL BETWEEN Operator?",
    answer: (
      <div>
        <p>🔹 BETWEEN helps check if a value is <strong>within a range</strong> — very handy for dates, numbers, marks, salaries, etc.</p>

        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
          <p className="font-bold text-blue-800 mb-2">📘 Example:</p>
          <pre className="text-sm text-blue-800 bg-white p-2 rounded">
            {`SELECT * FROM Payments
WHERE Amount BETWEEN 1000 AND 5000;`}
          </pre>
          <p className="mt-2">This means → Show all payments <strong>from ₹1000 to ₹5000</strong>, including the edges.</p>
        </div>

        <p className="font-bold mt-4">Tip:</p>
        <ul className="list-disc pl-5">
          <li>BETWEEN includes the <strong>start and end values</strong></li>
          <li>Also works with dates like:
            <pre className="text-sm text-blue-800 bg-white p-2 rounded mt-2">
              {`WHERE Date BETWEEN '2023-01-01' AND '2023-12-31'`}
            </pre>
          </li>
        </ul>
      </div>
    ),
    category: "SQL Operations"
  },
  {
    id: 45,
    question: "45. 🔘 What is the IN Operator in SQL?",
    answer: (
      <div>
        <p>🔹 IN lets you match a column with <strong>multiple values</strong> — like saying "check if value is in this list".</p>

        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
          <p className="font-bold text-blue-800 mb-2">📘 Example:</p>
          <pre className="text-sm text-blue-800 bg-white p-2 rounded">
            {`SELECT * FROM Students
WHERE City IN ('Bangalore', 'Chennai', 'Mumbai');`}
          </pre>
          <p className="mt-2">This means → Show students <strong>from any of these 3 cities</strong>.</p>
        </div>

        <p className="font-bold mt-4">✅ Easier than writing multiple OR conditions:</p>
        <pre className="text-sm text-blue-800 bg-white p-2 rounded">
          {`WHERE City = 'Bangalore' OR City = 'Chennai' OR City = 'Mumbai'`}
        </pre>
      </div>
    ),
    category: "SQL Operations"
  },
  {
    id: 46,
    question: "46. 🔄 What is an INNER JOIN, and when would you use it?",
    answer: (
      <div>
        <p>🔹 An <strong>INNER JOIN</strong> combines two tables but only returns the rows where <strong>there is a match</strong> in both tables.</p>

        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
          <p className="font-bold text-blue-800 mb-2">📘 Example:</p>
          <ul className="list-disc pl-5">
            <li>One table has Employees and their Department ID.</li>
            <li>Another table has Department details.</li>
          </ul>
          <p className="mt-2">An INNER JOIN will only show employees <strong>who belong to an existing department</strong>.</p>
        </div>

        <p className="font-bold mt-4">✅ <strong>Use it when</strong> you only want records that have matching data in <strong>both</strong> tables.</p>

        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
          <p className="font-bold text-blue-800 mb-2">👉 In simple terms:</p>
          <p><strong>INNER JOIN = "Show only the matching pairs from both tables."</strong></p>
        </div>
      </div>
    ),
    category: "Joins"
  },
  {
    id: 47,
    question: "47. 👈 What is a LEFT JOIN, and how is it different from INNER JOIN?",
    answer: (
      <div>
        <p>🔹 A <strong>LEFT JOIN</strong> shows <strong>all rows from the left table</strong>, even if there's no match in the right table.</p>

        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
          <p className="font-bold text-blue-800 mb-2">📘 Example:</p>
          <p>You want to see all employees — even if they don't belong to a department yet.</p>
        </div>

        <p className="font-bold mt-4">✅ <strong>Use it when</strong> the left table is more important, and you don't want to lose its data.</p>

        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
          <p className="font-bold text-blue-800 mb-2">👉 In simple terms:</p>
          <p><strong>LEFT JOIN = "Show everything from the first table, and match it if possible."</strong></p>
        </div>
      </div>
    ),
    category: "Joins"
  },
  {
    id: 48,
    question: "48. 👉 What is a RIGHT JOIN, and how is it used?",
    answer: (
      <div>
        <p>🔹 A <strong>RIGHT JOIN</strong> is the opposite of LEFT JOIN. It keeps <strong>all rows from the right table</strong>, and matches from the left table.</p>

        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
          <p className="font-bold text-blue-800 mb-2">📘 Example:</p>
          <p>If the right table has all projects, and you want to show <strong>every project</strong>, even those without assigned employees.</p>
        </div>

        <p className="font-bold mt-4">✅ <strong>Use it when</strong> the right table is more important for your report.</p>

        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
          <p className="font-bold text-blue-800 mb-2">👉 In simple terms:</p>
          <p><strong>RIGHT JOIN = "Keep everything from the second table and match from the first if possible."</strong></p>
        </div>
      </div>
    ),
    category: "Joins"
  },
  {
    id: 49,
    question: "49. ↔️ What is a FULL OUTER JOIN, and when would you use it?",
    answer: (
      <div>
        <p>🔹 A <strong>FULL OUTER JOIN</strong> combines <strong>all rows</strong> from both tables. It shows matches and also the <strong>non-matching</strong> rows from both sides.</p>

        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
          <p className="font-bold text-blue-800 mb-2">📘 Example:</p>
          <p>You want to list <strong>all employees</strong> and <strong>all departments</strong>, including those that don't match with each other.</p>
        </div>

        <p className="font-bold mt-4">✅ <strong>Use it when</strong> you don't want to miss anything — even if it doesn't match.</p>

        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
          <p className="font-bold text-blue-800 mb-2">👉 In simple terms:</p>
          <p><strong>FULL OUTER JOIN = "Show everything from both tables, match where possible."</strong></p>
        </div>
      </div>
    ),
    category: "Joins"
  },
  {
    id: 50,
    question: "50. ✖️ What is a CROSS JOIN, and when should you use it?",
    answer: (
      <div>
        <p>🔹 A <strong>CROSS JOIN</strong> combines <strong>every row of one table with every row of the other table</strong>. It creates a <strong>cartesian product</strong>.</p>

        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
          <p className="font-bold text-blue-800 mb-2">📘 Example:</p>
          <p>You have 3 shirt colors and 2 sizes — a CROSS JOIN will give you <strong>6 combinations</strong> (every color with every size).</p>
        </div>

        <p className="font-bold mt-4">✅ <strong>Use it when</strong> you want to generate combinations of every possible pair.</p>

        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
          <p className="font-bold text-blue-800 mb-2">👉 In simple terms:</p>
          <p><strong>CROSS JOIN = "Mix everything from both tables with everything else."</strong></p>
        </div>
      </div>
    ),
    category: "Joins"
  },
  {
    id: 51,
    question: "51. 🏆 What is the difference between RANK(), DENSE_RANK(), and ROW_NUMBER()?",
    answer: (
      <div>
        <p>🔹 These functions are used to <strong>assign numbers to rows</strong>, usually in sorted data (like top scorers, best-selling products, etc.).</p>

        <div className="mt-4 bg-blue-100 p-3 rounded-lg border border-blue-300">
          <table className="w-full text-sm text-blue-800 mt-2">
            <thead>
              <tr className="bg-blue-200">
                <th className="p-2 border border-blue-300">Function</th>
                <th className="p-2 border border-blue-300">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-blue-300">ROW_NUMBER()</td>
                <td className="p-2 border border-blue-300">Gives a <strong>unique number</strong> to each row, even if values are the same.</td>
              </tr>
              <tr>
                <td className="p-2 border border-blue-300">RANK()</td>
                <td className="p-2 border border-blue-300">Skips numbers if there are <strong>duplicates</strong> in the ranking.</td>
              </tr>
              <tr>
                <td className="p-2 border border-blue-300">DENSE_RANK()</td>
                <td className="p-2 border border-blue-300">Gives same rank for ties but <strong>no gaps</strong> in numbers.</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
          <p className="font-bold text-blue-800 mb-2">📘 Example (Scores):</p>
          <ul className="list-disc pl-5">
            <li>100 → Rank 1</li>
            <li>90 → Rank 2</li>
            <li>90 → Rank 2</li>
            <li>80 → Rank 3 (RANK) or 3 (DENSE_RANK) or 4 (ROW_NUMBER)</li>
          </ul>
          <p className="mt-2">👉 Use when you need <strong>ranking, leaderboard</strong>, or <strong>top-N</strong> data.</p>
        </div>
      </div>
    ),
    category: "SQL Functions"
  },
  {
      id: 52,
    question: "52. 🔀 What is the difference between UNION and UNION ALL?",
    answer: (
      <div>
        <p>🔹 Both combine rows from two or more queries.</p>

        <div className="mt-4 bg-blue-100 p-3 rounded-lg border border-blue-300">
          <table className="w-full text-sm text-blue-800 mt-2">
            <thead>
              <tr className="bg-blue-200">
                <th className="p-2 border border-blue-300">Function</th>
                <th className="p-2 border border-blue-300">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-blue-300">UNION</td>
                <td className="p-2 border border-blue-300">Removes duplicates from the result</td>
              </tr>
              <tr>
                <td className="p-2 border border-blue-300">UNION ALL</td>
                <td className="p-2 border border-blue-300">Keeps <strong>all</strong> records, even duplicates</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
          <p className="font-bold text-blue-800 mb-2">✅ Use Cases:</p>
          <ul className="list-disc pl-5">
            <li>Use UNION when duplicates are not needed.</li>
            <li>Use UNION ALL for better performance and complete data.</li>
          </ul>
        </div>

        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
          <p className="font-bold text-blue-800 mb-2">👉 In simple terms:</p>
          <p><strong>UNION = Clean list</strong><br />
          <strong>UNION ALL = Complete list</strong></p>
        </div>
      </div>
    ),
    category: "SQL Operations"
  },
  {
    id: 53,
    question: "53. 🔑 What is a surrogate key?",
    answer: (
      <div>
        <p>🔹 A <strong>surrogate key</strong> is a <strong>system-generated unique ID</strong> (like a number) that's used as the <strong>primary key</strong>.</p>

        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
          <p className="font-bold text-blue-800 mb-2">📘 Example:</p>
          <p>Instead of using a person's email or name as ID (which can change), we assign them EmployeeID = 101.</p>
        </div>

        <p className="font-bold mt-4">✅ <strong>Use it when</strong> natural data like name, email, phone might not be reliable as a key.</p>

        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
          <p className="font-bold text-blue-800 mb-2">👉 In simple terms:</p>
          <p>A surrogate key is a <strong>simple, unique number</strong> given to each row.</p>
        </div>
      </div>
    ),
    category: "Database Concepts"
  },
  {
    id: 54,
    question: "54. 🧩 What is a composite key?",
    answer: (
      <div>
        <p>🔹 A <strong>composite key</strong> is a primary key made up of <strong>two or more columns</strong> together.</p>

        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
          <p className="font-bold text-blue-800 mb-2">📘 Example:</p>
          <p>In a course registration table, the combination of StudentID + CourseID could be the unique key.</p>
        </div>

        <p className="font-bold mt-4">✅ <strong>Use when</strong> a single column can't uniquely identify a row, but a combination can.</p>

        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
          <p className="font-bold text-blue-800 mb-2">👉 In simple terms:</p>
          <p>A composite key is like saying: "This pair together is unique."</p>
        </div>
      </div>
    ),
    category: "Database Concepts"
  },
  {
    id: 55,
    question: "55. 🔍 What is the difference between EXISTS and IN?",
    answer: (
      <div>
        <p>🔹 Both check if values exist in a list or subquery.</p>

        <div className="mt-4 bg-blue-100 p-3 rounded-lg border border-blue-300">
          <table className="w-full text-sm text-blue-800 mt-2">
            <thead>
              <tr className="bg-blue-200">
                <th className="p-2 border border-blue-300">Keyword</th>
                <th className="p-2 border border-blue-300">Works Best For</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border border-blue-300">EXISTS</td>
                <td className="p-2 border border-blue-300">Subqueries returning rows (especially large data)</td>
              </tr>
              <tr>
                <td className="p-2 border border-blue-300">IN</td>
                <td className="p-2 border border-blue-300">Comparing fixed values or small lists</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
          <p className="font-bold text-blue-800 mb-2">✅ Key Points:</p>
          <ul className="list-disc pl-5">
            <li>EXISTS is often <strong>faster</strong> with large data</li>
            <li>IN is simpler for <strong>small lists</strong></li>
          </ul>
        </div>

        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
          <p className="font-bold text-blue-800 mb-2">👉 In simple terms:</p>
          <p><strong>IN = Check against a list</strong><br />
          <strong>EXISTS = Check if a matching row exists</strong></p>
        </div>
      </div>
    ),
    category: "SQL Operations"
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
       <h1 className="text-4xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">
       55 SQL Q&A in Layman’s Language with Simple Examples
       </h1>
       <p className="text-lg font-semibold text-white bg-blue-700 inline-block px-4 py-2 rounded-xl shadow-lg">
       Master SQL concepts easily, even if you're from a non-IT background.<br />
       Practical, real-life explanations for every question – by Rishab Informatica Group.
    </p>
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