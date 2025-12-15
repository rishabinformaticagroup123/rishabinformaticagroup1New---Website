import React from "react";

const SQLIntroPage = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6 text-base leading-relaxed">
      <h1 className="text-3xl font-bold">Introduction to SQL – Real-Time Understanding</h1>

      <h2 className="text-2xl font-semibold">🤔 Do You Ever Think — What Is a Database and Its Language?</h2>
      <p>
        Just like we use language to communicate with each other, databases also require a language to store, retrieve, and manage data. That language is <strong>SQL – Structured Query Language</strong>. It is the standard for communicating with relational databases.
      </p>
      <p>
        SQL allows you to perform key operations like inserting new records, updating existing ones, deleting data, or fetching it using conditions. In the digital world today — from banking to hospitals, from retail to education — SQL is at the core of almost every data-driven system.
      </p>
      <img src="/images/db.png" alt="Thinking about what is database" className="rounded-lg w-[450px] mx-auto" />

      <h2 className="text-2xl font-semibold">🏠 Real-Life Example: Managing Household Data</h2>
      <p>
        Let’s say you earn ₹1,00,000 a month. You spend on rent, groceries, petrol, school fees, internet, and more. If you forget to track even one expense, your total calculation becomes wrong, creating confusion and possibly tension at home.
      </p>
      <img src="/images/home.png" alt="Home Expenses Illustration" className="rounded-lg w-[400px] mx-auto" />

      <h2 className="text-2xl font-semibold">🏢 If You Start a Business in Hyderabad...</h2>
      <p>
        You start a business in Hyderabad. Later, you open branches in Bangalore, Chennai, Mumbai, even Singapore. How will you manage sales, employee data, and profits across cities? The answer is structured data — stored using a database and queried with SQL.
      </p>
      <img src="/images/business.png" alt="Business Expansion" className="rounded-lg w-[400px] mx-auto" />

      <h2 className="text-2xl font-semibold">📊 Zomato vs Swiggy | Samsung vs LG</h2>
      <p>
        A discount from Zomato may impact Swiggy’s users. Samsung may change a feature to compete with LG. Businesses monitor competition using data — analyzing market moves, sales reports, pricing history — all with SQL & data tools.
      </p>
      <img src="/images/competitor.png" alt="Brand Competition" className="rounded-lg w-[500px] mx-auto" />

      <h2 className="text-2xl font-semibold">🌐 YouTube & Google – Data Giants</h2>
      <p>
        YouTube receives 500+ hours of video uploads every minute. Google handles billions of searches daily. All this data is managed in large-scale databases. Structured data + SQL make it possible.
      </p>
      <img src="/images/server.png" alt="Google Datacenter" className="rounded-lg w-[300px] mx-auto" />

      <h2 className="text-2xl font-semibold">💾 From Notes to Cloud – The Evolution of Data Storage</h2>
      <p>Let's see how data storage has evolved over time, from small physical formats to today's cloud storage:</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4 justify-center items-center">
        <div className="text-center">
          <img src="/images/notes.png" alt="Notebook" className="rounded-lg mx-auto w-[900px]" />
          <p className="text-sm mt-2">Notebook</p>
        </div>
        <div className="text-center">
          <img src="/images/floppy.png" alt="Floppy Disk" className="rounded-lg mx-auto w-[900px]" />
          <p className="text-sm mt-2">Floppy</p>
        </div>
        <div className="text-center">
          <img src="/images/cassette.png" alt="Cassette" className="rounded-lg mx-auto w-[900px]" />
          <p className="text-sm mt-2">Cassette</p>
        </div>
        <div className="text-center">
          <img src="/images/cd.png" alt="CD" className="rounded-lg mx-auto w-[900px]" />
          <p className="text-sm mt-2">Compact disc</p>
        </div>
        <div className="text-center">
          <img src="/images/harddisk.png" alt="Hard Disk" className="rounded-lg mx-auto w-[900px]" />
          <p className="text-sm mt-2">Hard Disk</p>
        </div>
        <div className="text-center">
          <img src="/images/server.png" alt="Server" className="rounded-lg mx-auto w-[900px]" />
          <p className="text-sm mt-2">Server</p>
        </div>
        <div className="text-center">
          <img src="/images/cloud.png" alt="Cloud" className="rounded-lg mx-auto w-[900px]" />
          <p className="text-sm mt-2">Cloud</p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold">🧮 OLTP vs OLAP – Real-Time vs Historical Data</h2>
      <p>
        <strong>OLTP (Online Transaction Processing)</strong> handles real-time updates like customer orders and salary payments.
        <br />
        <strong>OLAP (Online Analytical Processing)</strong> stores large historical data separately to analyze trends, performance, and business decisions.
      </p>
      <img src="/images/oltp-vs-olap.jpg" alt="OLTP vs OLAP" className="rounded-lg w-[300px] mx-auto" />

      <h2 className="text-2xl font-semibold">🗃️ Popular Databases in the Market</h2>
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

      <h2 className="text-2xl font-semibold">🏠 On-Premises vs ☁️ Cloud Databases</h2>
      <p>
        On-premise databases require your own physical servers and maintenance. Cloud databases like AWS, Azure, and GCP allow you to pay-as-you-go, scale easily, and focus on business logic.
      </p>
      <img src="/images/on-prem-vs-cloud.jpg" alt="On Premise vs Cloud" className="rounded-lg w-[300px] mx-auto" />

      <h2 className="text-2xl font-semibold">📂 What Is a Schema?</h2>
      <p>
        A schema in a database is like a disk partition in your laptop (e.g., Local Disk C, D). Inside Oracle, schemas like SYSTEM, STAGE, SOURCE are used to organize tables and other objects.
      </p>
      <img src="/images/sql-schema-example.jpg" alt="Schema Example" className="rounded-lg w-[300px] mx-auto" />

      <div className="text-center mt-10">
        <a href="/study-material/sql/5-sql-languages" className="text-blue-600 underline text-lg">
          👉 Continue to Next: 5 SQL Languages
        </a>
      </div>
    </div>
  );
};

export default SQLIntroPage;
