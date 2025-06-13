// app/sql-interview/page.tsx
import React from 'react';

const sqlQuestions = [
  {
    id: 1,
    question: "📌 What is SQL, and Why is it Important?",
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
    question: "🔑 What is a Primary Key, and Why is it Important?",
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
    question: "🌉 What is a Foreign Key, and How is it Related to a Primary Key?",
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
    question: "🔄 Describe the differences between INNER JOIN, LEFT JOIN, and RIGHT JOIN",
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

        <div className="mt-4 p-3 bg-gray-100 rounded">
          <p className="font-bold">Visual Comparison:</p>
          <p>| INNER JOIN | Only matching data from both tables |</p>
          <p>| LEFT JOIN | All data from left table + matching right |</p>
          <p>| RIGHT JOIN | All data from right table + matching left |</p>
        </div>
      </div>
    ),
    category: "Joins"
  },
  {
    id: 5,
    question: "🔄 What is a Self-Join, and When Do We Use It?",
    answer: (
      <div>
        <p>🔹 A <strong>Self-Join</strong> is when a table is <strong>joined with itself</strong> — just like you're comparing rows <strong>within the same table</strong>.</p>
        <p>You use a <strong>self-join</strong> when the data in one table is <strong>related to other data in the same table</strong>.</p>

        <p className="font-bold mt-4">📊 Simple Example:</p>
        <p>Imagine you have an <strong>Employees</strong> table like this:</p>
        <pre className="bg-gray-100 p-2 rounded">
          Employee_ID | Name    | Manager_ID<br />
          1          | Ramesh  | NULL<br />
          2          | Anjali  | 1<br />
          3          | Suresh  | 1<br />
          4          | Meena   | 2<br />
        </pre>
        <p>Here:<br />
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

        <p className="mt-4 font-bold">Simple Definition:</p>
        <p>A self-join lets you compare one row to another row in the same table, useful for finding relationships within the same data set.</p>
      </div>
    ),
    category: "Joins"
  },
  {
    id: 6,
    question: "🔄 Difference Between SQL and NoSQL Databases",
    answer: (
      <div>
        <p>🔹 Databases are used to store and manage data — just like storing files in a cabinet, but digitally. There are two main types: <strong>SQL</strong> and <strong>NoSQL</strong>.</p>

        <p className="font-bold mt-4">📊 What is SQL?</p>
        <p>SQL (Structured Query Language) databases are like well-organized Excel sheets:</p>
        <ul className="list-disc pl-5">
          <li>Data is stored in tables with rows and columns</li>
          <li>Each table has a fixed structure (called a schema)</li>
          <li>Good for data that is organized and connected (like customers, orders, payments)</li>
        </ul>
        <p>✔ Used in: Banking systems, ERP software, websites with login systems</p>

        <p className="font-bold mt-4">📊 What is NoSQL?</p>
        <p>NoSQL (Not Only SQL) databases are more flexible:</p>
        <ul className="list-disc pl-5">
          <li>Data can be stored like <strong>documents (JSON/XML)</strong> or key-value pairs</li>
          <li>No fixed table structure — more like filling in forms with flexible fields</li>
          <li>Great for <strong>large amounts of changing or unstructured data</strong></li>
        </ul>
        <p>✔ Used in: Social media apps, real-time chat, big data, mobile apps</p>

        <div className="mt-4 p-3 bg-gray-100 rounded">
          <p className="font-bold">Simple Comparison Table:</p>
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Feature</th>
                <th className="p-2 border">SQL</th>
                <th className="p-2 border">NoSQL</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="p-2 border">Structure</td>
                <td className="p-2 border">Tables with rows & columns</td>
                <td className="p-2 border">Documents, key-value, graphs, etc.</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-2 border">Schema (Design)</td>
                <td className="p-2 border">Fixed and predefined</td>
                <td className="p-2 border">Flexible and dynamic</td>
              </tr>
              <tr>
                <td className="p-2 border">Best for</td>
                <td className="p-2 border">Complex relationships between data</td>
                <td className="p-2 border">Fast-growing or unstructured data</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="p-2 border">Example Tools</td>
                <td className="p-2 border">MySQL, Oracle, SQL Server</td>
                <td className="p-2 border">MongoDB, Cassandra, Firebase</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="mt-4">🔹 <strong>In Simple Terms:</strong></p>
        <p><strong>SQL = Organized like a register book</strong><br />
        <strong>NoSQL = Flexible like a notebook or diary</strong></p>
      </div>
    ),
    category: "Database Types"
  }
];

export default function SQLInterviewPage() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Show scroll-to-top when scrolled down
  React.useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-50 via-white to-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-3">📚 SQL Interview Q&A</h1>
          <p className="text-lg text-gray-600">Beginner-friendly questions with visual, simple explanations</p>
        </div>

        {/* Question List */}
        <div className="space-y-6">
          {sqlQuestions.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 shadow-md rounded-xl overflow-hidden hover:shadow-xl transition-shadow duration-200"
            >
              <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                <h3 className="text-xl font-semibold text-gray-900">{item.question}</h3>
              </div>
              <div className="px-6 py-5 text-gray-700 text-[15px] leading-relaxed">
                {item.answer}
              </div>
              <div className="px-6 py-3 bg-gray-50 text-right">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium 
                  ${
                    item.category === 'SQL Basics' ? 'bg-green-100 text-green-800' :
                    item.category === 'Database Concepts' ? 'bg-yellow-100 text-yellow-800' :
                    item.category === 'Joins' ? 'bg-blue-100 text-blue-800' :
                    item.category === 'Database Types' ? 'bg-purple-100 text-purple-800' :
                    'bg-gray-100 text-gray-700'
                  }
                `}>
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>Showing 6 of 55 questions • Prepared by <strong>Rishab Informatica Group</strong></p>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-6 z-50 p-2 bg-white border rounded-full shadow-lg hover:shadow-xl transition"
          title="Scroll to top"
        >
          <ArrowUpCircle className="w-6 h-6 text-indigo-600" />
        </button>
      )}
    </div>
  );
}
