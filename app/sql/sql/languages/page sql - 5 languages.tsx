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
      <img src="/images/etl1.png" alt="Thinking about what is database" className="rounded-lg mx-auto w-[300px]" />

      <h2 className="text-2xl font-semibold">🏠 Real-Life Example: Managing Household Data</h2>
      <p>
        Let’s say you earn ₹1,00,000 a month. You spend on rent, groceries, petrol, school fees, internet, and more. If you forget to track even one expense, your total calculation becomes wrong, creating confusion and possibly tension at home.
      </p>
      <p>
        Now imagine this at a company level. Managing multiple salaries, client projects, stock, bills — if anything is missed or wrongly recorded, it can cause major issues. That’s why structured data management is critical — and SQL is the tool for it.
      </p>
      <img src="/images/home-expenses.jpg" alt="Home Expenses Illustration" className="rounded-lg w-full max-w-2xl mx-auto" />

      <h2 className="text-2xl font-semibold">🏢 Business Scenario: Scaling Across Cities & Countries</h2>
      <p>
        Suppose you start a business in Hyderabad. Slowly, you grow and open branches in Bangalore, Mumbai, Chennai, and later in Dubai or Singapore. As your operations grow, the complexity of your data grows too. You now need to:
      </p>
      <ul className="list-disc list-inside">
        <li>Track employee records across branches</li>
        <li>Monitor product sales across cities</li>
        <li>Analyze profits region-wise</li>
        <li>Plan marketing based on local performance</li>
      </ul>
      <p>
        That’s where SQL and data-driven systems help you scale efficiently.
      </p>
      <img src="/images/business-expansion-map.png" alt="Business Expansion to Branches" className="rounded-lg w-full max-w-2xl mx-auto" />

      <h2 className="text-2xl font-semibold">📊 Competitive Analysis: Zomato vs Swiggy | Samsung vs LG</h2>
      <p>
        A single offer from Zomato — say ₹30 cashback — might make thousands of users switch from Swiggy. Companies must analyze what their competitors are doing in real-time. Samsung might reduce the price of a phone to beat LG. This kind of decision-making comes from <strong>data analysis</strong>.
      </p>
      <img src="/images/brand-competition.jpg" alt="Zomato vs Swiggy or Samsung vs LG" className="rounded-lg w-full max-w-2xl mx-auto" />

      <h2 className="text-2xl font-semibold">🌐 Tech Giants & Big Data – Google, YouTube</h2>
      <p>
        Every minute, YouTube gets over 500 hours of video uploaded. Google processes billions of queries per day. Behind all of this is an army of high-performing databases. They use SQL and NoSQL systems to ensure fast, accurate, and secure handling of information.
      </p>
      <img src="/images/google-server.jpg" alt="Google Datacenter" className="rounded-lg w-full max-w-2xl mx-auto" />

      <h2 className="text-2xl font-semibold">💾 From Notes to Cloud – The Evolution of Data Storage</h2>
      <p>
        Think of how we stored data over the years:
      </p>
      <ul className="list-disc list-inside">
        <li>Paper Notes / Diaries</li>
        <li>Floppy Disks</li>
        <li>Audio/Video Cassettes</li>
        <li>CDs / DVDs</li>
        <li>Hard Disks & Pen Drives</li>
        <li>Servers (On-premises)</li>
        <li><strong>Cloud Storage</strong> (Modern solution)</li>
      </ul>
      <p>
        If you lose a pen drive, your data is gone. If a server crashes, your business may stop. Cloud offers a scalable, reliable solution. You pay for what you use — no need to worry about hardware, maintenance, or physical damage.
      </p>
      <img src="/images/cloud-storage-concept.jpg" alt="Cloud Storage Concept" className="rounded-lg w-full max-w-2xl mx-auto" />

      <h2 className="text-2xl font-semibold">🧮 OLTP vs OLAP – Real-Time vs Historical Data</h2>
      <p>
        <strong>OLTP (Online Transaction Processing)</strong> is used for real-time operations like order placements, daily transactions, etc. For example, your company’s payroll, billing, or POS system.
      </p>
      <p>
        <strong>OLAP (Online Analytical Processing)</strong> is used for long-term, historical data analysis. If companies analyze data directly from the OLTP system, it will slow down real-time operations. That’s why historical data is stored separately in OLAP systems.
      </p>
      <p>
        <strong>Example:</strong> Lifebuoy, a 100+ year brand, studies past data to predict trends, compete with brands like Rexona or Hamam, and adjust their pricing or soap size accordingly. That’s the power of data-driven decisions.
      </p>
      <img src="/images/oltp-vs-olap.jpg" alt="OLTP vs OLAP Real Time" className="rounded-lg w-full max-w-2xl mx-auto" />

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
        On-premise databases are installed and maintained locally on a company’s server. They require space, electricity, cooling, and manual maintenance.
      </p>
      <p>
        Cloud databases, on the other hand, are hosted by providers like AWS, Azure, or GCP. You simply pay, log in, and use — no maintenance, no headache.
      </p>
      <img src="/images/on-prem-vs-cloud.jpg" alt="On Premise vs Cloud" className="rounded-lg w-full max-w-2xl mx-auto" />

      <h2 className="text-2xl font-semibold">📂 What Is a Schema?</h2>
      <p>
        Think of your laptop’s Local Disk C and D — each one is a partition. Similarly, in databases like Oracle, a <strong>schema</strong> is a logical partition inside the database.
      </p>
      <p>
        Each schema can have tables, views, procedures, and users like:
      </p>
      <ul className="list-disc list-inside">
        <li>ADMIN</li>
        <li>SOURCE</li>
        <li>STAGE</li>
        <li>SYSTEM</li>
        <li>INFO</li>
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
