import React from "react";

const SQLIntroPage = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6 text-base leading-relaxed">
      <h1 className="text-3xl font-bold">Introduction to SQL – Real-Time Understanding</h1>

      <h2 className="text-2xl font-semibold">🤔 Do You Ever Think — What Is a Database and Its Language?</h2>
      <p>
        Just like we all speak a language, databases need one too. That language is called <strong>SQL – Structured Query Language</strong>.
      </p>
      <img src="/images/question-thinking.png" alt="Thinking about what is database" className="rounded-lg w-full max-w-2xl mx-auto" />

      <h2 className="text-2xl font-semibold">🏠 Real-Life Example: Home Budget Management</h2>
      <p>
        You earn ₹1,00,000/month. You spend on groceries, rent, petrol, kids’ school fees, etc. If you miss even one expense, your calculations go wrong.
      </p>
      <img src="/images/home-expenses.jpg" alt="Home Expenses Illustration" className="rounded-lg w-full max-w-2xl mx-auto" />

      <h2 className="text-2xl font-semibold">🏢 If You Start a Business in Hyderabad...</h2>
      <p>
        Imagine you start a business in Hyderabad. You later expand to Bangalore, Chennai, Delhi... even international cities. How will you manage all your employee, stock, and customer data? That's why you need a <strong>central database</strong>.
      </p>
      <img src="/images/business-expansion-map.png" alt="Business Expansion to Branches" className="rounded-lg w-full max-w-2xl mx-auto" />

      <h2 className="text-2xl font-semibold">📊 Competition: Samsung vs LG | Zomato vs Swiggy</h2>
      <p>
        A small decision like offering ₹20 off on delivery by Zomato may heavily impact Swiggy. The same with Samsung vs LG — a small price or feature change affects market share. These companies analyze past data to decide future moves.
      </p>
      <img src="/images/brand-competition.jpg" alt="Zomato vs Swiggy or Samsung vs LG" className="rounded-lg w-full max-w-2xl mx-auto" />

      <h2 className="text-2xl font-semibold">🌐 Google, YouTube & Huge Data Management</h2>
      <p>
        Every second, YouTube receives 1000s of video uploads. Google processes millions of searches. All of this is possible because they use high-performance <strong>databases</strong> to store and retrieve data.
      </p>
      <img src="/images/google-server.jpg" alt="Google Datacenter" className="rounded-lg w-full max-w-2xl mx-auto" />

      <h2 className="text-2xl font-semibold">📁 OLTP vs OLAP (Real-Time vs Long-Term Storage)</h2>
      <p>
        <strong>OLTP (Online Transaction Processing)</strong> is used to maintain real-time, daily business transactions. Example: your office's invoice system, daily salary payments.
      </p>
      <p>
        But analyzing this data affects daily work speed. So companies use <strong>OLAP (Online Analytical Processing)</strong> to store long-term data (5, 10, 50, or even 100 years).
      </p>
      <p>
        <strong>Example:</strong> Lifebuoy has run for 100+ years. They store years of data in OLAP systems to make decisions based on competition from Rexona, Hamam, etc. Previously their soap size was big. Now it’s reduced — this decision was based on data analysis.
      </p>
      <img src="/images/oltp-vs-olap.jpg" alt="OLTP vs OLAP Real Time" className="rounded-lg w-full max-w-2xl mx-auto" />

      <h2 className="text-2xl font-semibold">🗂️ Types of Databases in the Market</h2>
      <ul className="list-disc list-inside">
        <li>Oracle</li>
        <li>MySQL</li>
        <li>SQL Server</li>
        <li>PostgreSQL</li>
        <li>Snowflake</li>
        <li>MongoDB</li>
        <li>DB2</li>
        <li>Teradata</li>
      </ul>

      <h2 className="text-2xl font-semibold">🏠 On-Premises Database vs ☁️ Cloud Database</h2>
      <img src="/images/on-prem-vs-cloud.jpg" alt="On Premise vs Cloud" className="rounded-lg w-full max-w-2xl mx-auto" />
      <p>
        On-premise servers require space, power, and maintenance. In contrast, <strong>Cloud Databases</strong> like AWS, Azure, GCP offer secure, scalable, and pay-as-you-go solutions.
      </p>

      <h2 className="text-2xl font-semibold">🔁 One Common Thing Across All Databases: SQL</h2>
      <p>
        Whether you use Oracle or Snowflake or MySQL, one thing is common — they all use **SQL** as the standard language to manage and access data.
      </p>

      <h2 className="text-2xl font-semibold">💿 What is a Schema in SQL?</h2>
      <p>
        Think of your laptop with Local Disk C and D. In Oracle 11g, this concept is called a **schema**.
      </p>
      <p>
        Schema is like a folder that contains your database objects. For example:
      </p>
      <ul className="list-disc list-inside">
        <li>Schema: ADMIN</li>
        <li>Users: SYSTEM, STAGE, SOURCE, INFO</li>
      </ul>
      <img src="/images/sql-schema-example.jpg" alt="SQL Schema Example" className="rounded-lg w-full max-w-2xl mx-auto" />

      <h2 className="text-xl font-semibold text-center">🚀 You Are Now Ready to Learn the 5 SQL Languages</h2>
      <p className="text-center text-lg">
        <a href="/study-material/sql/5-sql-languages" className="text-blue-600 underline">
          👉 Go to Next: Learn the 5 SQL Languages
        </a>
      </p>
    </div>
  );
};

export default SQLIntroPage;
