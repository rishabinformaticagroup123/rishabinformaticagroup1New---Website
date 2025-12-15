import React from "react";

const SQLIntroPage = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6 text-base leading-relaxed">
      <h1 className="text-3xl font-bold">Introduction to SQL – Real-Time Understanding</h1>

      <p>
        Have you ever thought – "What is the language of a database?" Just like humans need a language to communicate,
        databases also need one. And that language is <strong>SQL – Structured Query Language</strong>.
      </p>

      <p>
        SQL helps us retrieve, insert, update, and analyze data. In today's world, where everything from
        shopping to medicine is managed digitally, SQL plays a vital role in **handling business data**.
      </p>

      <h2 className="text-2xl font-semibold">🏠 Real-Life Example: Managing Household Data</h2>
      <p>
        Imagine you earn ₹1,00,000 per month. You spend on groceries, rent, fuel, school fees, etc. At the end of the
        month, if you missed tracking a few expenses, your savings calculation would be incorrect. That creates
        confusion and stress in the home.
      </p>
      <p>
        Now scale this situation to a company or organization. Imagine trying to manage all employee salaries,
        client invoices, expenses, and stock without structured data. Chaos!
      </p>

      <img src="/images/family-budget.jpg" alt="Family Budgeting Example" className="rounded-lg w-full max-w-2xl mx-auto" />

      <h2 className="text-2xl font-semibold">🏢 Business Scenario: Scaling to Multiple Cities</h2>
      <p>
        What if your company expands into multiple cities or branches? You now need to manage and access all your data
        from different locations. That’s why structured data storage is essential. Here, SQL becomes the backbone for
        managing huge amounts of business data.
      </p>

      <h2 className="text-2xl font-semibold">🌐 What About Tech Giants Like Google or YouTube?</h2>
      <p>
        Think about the huge amounts of data uploaded and downloaded on YouTube daily. Thousands of videos,
        millions of views — all of this is stored and retrieved using database systems powered by SQL.
      </p>

      <img src="/images/youtube-database.png" alt="YouTube Data Growth" className="rounded-lg w-full max-w-2xl mx-auto" />

      <h2 className="text-2xl font-semibold">💾 Evolution of Storage: From Notes to Cloud</h2>
      <ul className="list-disc list-inside">
        <li>Notes / Diaries</li>
        <li>Floppy Disks</li>
        <li>Cassettes / Video Tapes</li>
        <li>CDs</li>
        <li>Hard Disks</li>
        <li>Pendrives</li>
        <li>Servers (local)</li>
        <li><strong>Cloud (Modern Storage)</strong></li>
      </ul>
      <p>
        If you lose a pen drive, your data is gone. Similarly, a server crash can destroy business continuity.
        Hence, the safest, most scalable solution is the <strong>Cloud</strong>. You pay and your data is safely stored
        without maintenance tension.
      </p>

      <img src="/images/cloud-storage-concept.jpg" alt="Cloud Storage Concept" className="rounded-lg w-full max-w-2xl mx-auto" />

      <h2 className="text-2xl font-semibold">📈 Why Store Data in Databases?</h2>
      <p>
        Storing data is not just about saving it. It's for <strong>analyzing</strong>, <strong>forecasting</strong>, and
        making <strong>data-driven decisions</strong>.
      </p>
      <p>
        Example: Zomato vs Swiggy. If Zomato launches a new discount scheme, Swiggy may lose customers. That’s why
        companies continuously monitor and analyze their competitors using data reports and dashboards powered by SQL
        + BI tools.
      </p>

      <img src="/images/zomato-vs-swiggy.png" alt="Zomato vs Swiggy Analysis" className="rounded-lg w-full max-w-2xl mx-auto" />

      <h2 className="text-2xl font-semibold">💡 Conclusion</h2>
      <p>
        SQL is not just a subject. It’s a business essential. From small shops to giant corporations, structured
        data and analysis are the pillars of smart decision-making.
      </p>
      <p>
        This is why we begin our training with SQL. You’ll not only learn the syntax — you’ll understand its real
        purpose in the IT world.
      </p>

      <p className="text-center mt-10 text-lg font-semibold">
        👉 Ready to dive deeper into the 5 types of SQL Languages? <br />
        Continue to <a href="/study-material/sql/5-sql-languages" className="text-blue-600 underline">Next Topic: 5 SQL Languages</a>
      </p>
    </div>
  );
};

export default SQLIntroPage;
