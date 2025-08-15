import React from "react";

const SQLIntroPage = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8 text-base leading-relaxed">
      <h1 className="text-3xl font-bold">Introduction to SQL – Real-Time Understanding</h1>

      <h2 className="text-2xl font-semibold">🤔 Do You Ever Think — What Is a Database and Its Language?</h2>
      <p>
        Just like we use language to communicate, databases also need a language to store, retrieve, and manage data. That language is <strong>SQL – Structured Query Language</strong>. It’s used everywhere — from banks and hospitals to online stores and mobile apps.
      </p>
	  <img src="/images/db.png" alt="Thinking about what is database" className="rounded-lg w-[400px] mx-auto" />
      <h2 className="text-2xl font-semibold">🏠 Real-Life Example: Managing Household Data</h2>
      <p>
        Suppose you earn ₹1,00,000 per month. You spend on groceries, rent, petrol, school fees, etc. If you forget to track even one, your calculations go wrong. Now imagine running a business — missing employee salaries or client invoices can create chaos. Hence, we need structured data.
      </p>
      <img src="/images/home.png" alt="Home Expenses" className="rounded-lg w-[500px] mx-auto" />

      <h2 className="text-2xl font-semibold">🏢 Expanding Your Business</h2>
      <p>
        You start a company in Hyderabad and expand to Bangalore, Chennai, and even abroad. Now you need to manage data from multiple branches — stock, sales, salaries, performance. That’s where databases come in.
      </p>
      <img src="/images/business.png" alt="Business Expansion" className="rounded-lg w-[500px] mx-auto" />

      <h2 className="text-2xl font-semibold">📊 Competitor Impact: Zomato vs Swiggy | Samsung vs LG</h2>
      <p>
        A small offer from Zomato can heavily affect Swiggy. Samsung reducing a phone’s price may impact LG. Companies analyze historical data, track patterns, and decide strategy. This is data-driven decision-making.
      </p>
      <img src="/images/competitor.png" alt="Competitor Analysis" className="rounded-lg w-[500px] mx-auto" />

      <h2 className="text-2xl font-semibold">🌐 Data Giants: YouTube & Google</h2>
      <p>
        YouTube sees 500+ hours of video uploaded every minute. Google handles billions of queries daily. They use massive databases to store, retrieve, and secure data. SQL is at the core of these operations.
      </p>
      <img src="/images/server1.png" alt="Google Server" className="rounded-lg w-[500px] mx-auto" />

      <h2 className="text-2xl font-semibold">💾 From Notes to Cloud – The Evolution of Data Storage</h2>
      <p>
        Let’s see how storage evolved from physical formats to cloud-based systems.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 text-center">
        <div>
          <img src="/images/notes.png" alt="Notebook" className="rounded-lg mx-auto w-100" />
          <p className="text-sm mt-2">Notebook</p>
        </div>
        <div>
          <img src="/images/floppy.png" alt="Floppy Disk" className="rounded-lg mx-auto w-100" />
          <p className="text-sm mt-2">Floppy Disk</p>
        </div>
        <div>
          <img src="/images/cassette.png" alt="Cassette" className="rounded-lg mx-auto w-100" />
          <p className="text-sm mt-2">Cassette</p>
        </div>
        <div>
          <img src="/images/cd.png" alt="CD" className="rounded-lg mx-auto w-100" />
          <p className="text-sm mt-2">CD</p>
        </div>
        <div>
          <img src="/images/harddisk.png" alt="Hard Disk" className="rounded-lg mx-auto w-100" />
          <p className="text-sm mt-2">Hard Disk</p>
        </div>
        <div>
          <img src="/images/tapedrive.png" alt="Tape Drive" className="rounded-lg mx-auto w-100" />
          <p className="text-sm mt-2">Tape Drive</p>
        </div>
        <div>
          <img src="/images/pendrive.png" alt="Pen Drive" className="rounded-lg mx-auto w-100" />
          <p className="text-sm mt-2">Pen Drive</p>
        </div>
        <div>
          <img src="/images/nas.png" alt="NAS" className="rounded-lg mx-auto w-100" />
          <p className="text-sm mt-2">NAS</p>
        </div>
        <div>
          <img src="/images/server.png" alt="Server" className="rounded-lg mx-auto w-100" />
          <p className="text-sm mt-2">Server</p>
        </div>
        <div>
          <img src="/images/cloud2.png" alt="Cloud" className="rounded-lg mx-auto w-100" />
          <p className="text-sm mt-2">Cloud</p>
        </div>
      </div>

      <h2 className="text-2xl font-semibold">🧮 OLTP vs OLAP – Real-Time vs Historical Data</h2>
      <p>
        <strong>OLTP (Online Transaction Processing)</strong> is used for real-time transactions like billing and payroll.
        <br />
        <strong>OLAP (Online Analytical Processing)</strong> is used for analyzing historical data — for example, a 100-year-old brand like Lifebuoy studying competitors like Rexona.
      </p>
      <img src="/images/etl2.png" alt="OLTP vs OLAP" className="rounded-lg w-[500px] mx-auto" />

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
        <strong>On-Premises</strong>: Requires hardware, local servers, manual maintenance.<br />
        <strong>Cloud</strong>: Pay-as-you-go, accessible from anywhere, scalable and secure.
      </p>
      <img src="/images/onprem-cloud.png" alt="On Prem vs Cloud" className="rounded-lg w-[700px] mx-auto" />

      <h2 className="text-2xl font-semibold">📂 What Is a Schema?</h2>
      <p>
        In Oracle or other DBs, a <strong>schema</strong> is like a folder in your system. Just like Local Disk C or D, you can have schemas like SYSTEM, STAGE, SOURCE — each holding tables, procedures, etc.
      </p>
      <img src="/images/schema.png" alt="Schema Example" className="rounded-lg w-[700px] mx-auto" />

      <div className="text-center mt-10">
        <a href="/study-material/sql/5-sql-languages" className="text-blue-600 underline text-lg">
          👉 Continue to Next: 5 SQL Languages
        </a>
      </div>
    </div>
  );
};

export default SQLIntroPage;
