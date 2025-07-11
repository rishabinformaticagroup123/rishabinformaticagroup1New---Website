import React from "react";
import Image from "next/image";

const SQLIntroPage = () => {
  // Image data for the evolution section
  const storageEvolution = [
    { src: "/images/notes.png", alt: "Notebook", label: "Notebook" },
    { src: "/images/floppy.png", alt: "Floppy Disk", label: "Floppy Disk" },
    { src: "/images/cassette.png", alt: "Cassette", label: "Cassette" },
    { src: "/images/cd.png", alt: "CD", label: "CD" },
    { src: "/images/harddisk.png", alt: "Hard Disk", label: "Hard Disk" },
    { src: "/images/tapedrive.png", alt: "Tape Drive", label: "Tape Drive" },
    { src: "/images/pendrive.png", alt: "Pen Drive", label: "Pen Drive" },
    { src: "/images/nas.png", alt: "NAS", label: "NAS" },
    { src: "/images/server.png", alt: "Server", label: "Server" },
    { src: "/images/cloud2.png", alt: "Cloud", label: "Cloud" },
  ];

  // Popular databases list
  const popularDatabases = [
    "Oracle",
    "MySQL",
    "SQL Server",
    "PostgreSQL",
    "Snowflake",
    "MongoDB",
    "DB2",
    "Teradata",
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8 text-base leading-relaxed">
      {/* Hero Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Introduction to SQL – Real-Time Understanding
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          A beginner-friendly guide to understanding databases and SQL for non-IT professionals
        </p>
      </section>

      {/* What is Database Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full">
            <span className="text-2xl">🤔</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold">
            What Is a Database and Its Language?
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <p>
              Just like we use language to communicate, databases also need a language to store, retrieve, and manage data. That language is{" "}
              <strong className="text-blue-600 dark:text-blue-400">SQL – Structured Query Language</strong>. It's used everywhere — from banks and hospitals to online stores and mobile apps.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="font-medium text-blue-800 dark:text-blue-200">
                💡 Did you know? Every time you search on Google or order food online, you're interacting with databases powered by SQL!
              </p>
            </div>
          </div>
          <div className="relative h-64 md:h-80 rounded-xl overflow-hidden shadow-lg">
            <Image 
              src="/images/db.png" 
              alt="Database concept illustration"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Real-Life Example Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="bg-green-100 dark:bg-green-900 p-3 rounded-full">
            <span className="text-2xl">🏠</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold">
            Real-Life Example: Managing Household Data
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative h-64 md:h-80 rounded-xl overflow-hidden shadow-lg order-last md:order-first">
            <Image 
              src="/images/home.png" 
              alt="Home expenses tracking"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-4">
            <p>
              Suppose you earn ₹1,00,000 per month. You spend on groceries, rent, petrol, school fees, etc. If you forget to track even one, your calculations go wrong. Now imagine running a business — missing employee salaries or client invoices can create chaos. Hence, we need structured data.
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li>Personal finance apps use databases to track your spending</li>
              <li>Businesses use databases to manage thousands of transactions</li>
              <li>Without organization, data becomes useless</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Business Expansion Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-full">
            <span className="text-2xl">🏢</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold">
            Expanding Your Business
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <p>
              You start a company in Hyderabad and expand to Bangalore, Chennai, and even abroad. Now you need to manage data from multiple branches — stock, sales, salaries, performance. That's where databases come in.
            </p>
            <div className="bg-purple-50 dark:bg-purple-900/30 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
              <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-2">
                Database Benefits for Business:
              </h4>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>Centralized data management</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>Real-time access from multiple locations</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>✓</span>
                  <span>Secure data storage with backups</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="relative h-64 md:h-80 rounded-xl overflow-hidden shadow-lg">
            <Image 
              src="/images/business.png" 
              alt="Business expansion concept"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Competitor Impact Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="bg-red-100 dark:bg-red-900 p-3 rounded-full">
            <span className="text-2xl">📊</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold">
            Competitor Impact: Zomato vs Swiggy | Samsung vs LG
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative h-64 md:h-80 rounded-xl overflow-hidden shadow-lg order-last md:order-first">
            <Image 
              src="/images/competitor.png" 
              alt="Competitor analysis"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-4">
            <p>
              A small offer from Zomato can heavily affect Swiggy. Samsung reducing a phone's price may impact LG. Companies analyze historical data, track patterns, and decide strategy. This is data-driven decision-making.
            </p>
            <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg border border-red-200 dark:border-red-800">
              <p className="font-medium text-red-800 dark:text-red-200">
                🎯 Competitive intelligence databases help businesses track market trends, pricing strategies, and customer preferences.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Data Giants Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="bg-yellow-100 dark:bg-yellow-900 p-3 rounded-full">
            <span className="text-2xl">🌐</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold">
            Data Giants: YouTube & Google
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <p>
              YouTube sees 500+ hours of video uploaded every minute. Google handles billions of queries daily. They use massive databases to store, retrieve, and secure data. SQL is at the core of these operations.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-yellow-50 dark:bg-yellow-900/30 p-3 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-200">YouTube Stats</p>
                <p className="text-2xl font-bold">500+</p>
                <p className="text-xs">hours/minute uploaded</p>
              </div>
              <div className="bg-yellow-50 dark:bg-yellow-900/30 p-3 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-200">Google Stats</p>
                <p className="text-2xl font-bold">8.5B+</p>
                <p className="text-xs">searches/day</p>
              </div>
            </div>
          </div>
          <div className="relative h-64 md:h-80 rounded-xl overflow-hidden shadow-lg">
            <Image 
              src="/images/server1.png" 
              alt="Google data center"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Evolution Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full">
            <span className="text-2xl">💾</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold">
            From Notes to Cloud – The Evolution of Data Storage
          </h2>
        </div>
        
        <p className="text-lg">
          Let's see how storage evolved from physical formats to cloud-based systems.
        </p>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {storageEvolution.map((item, index) => (
            <div key={index} className="group">
              <div className="relative h-32 sm:h-40 rounded-lg overflow-hidden shadow-md group-hover:shadow-lg transition-shadow">
                <Image 
                  src={item.src} 
                  alt={item.alt}
                  fill
                  className="object-contain p-2"
                />
              </div>
              <p className="text-center text-sm mt-2 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* OLTP vs OLAP Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="bg-pink-100 dark:bg-pink-900 p-3 rounded-full">
            <span className="text-2xl">🧮</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold">
            OLTP vs OLAP – Real-Time vs Historical Data
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-green-600 dark:text-green-400 mb-3">OLTP (Online Transaction Processing)</h3>
              <p>Used for real-time transactions like:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Billing systems</li>
                <li>Payroll processing</li>
                <li>ATM transactions</li>
                <li>Online orders</li>
              </ul>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-3">OLAP (Online Analytical Processing)</h3>
              <p>Used for analyzing historical data like:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Market trend analysis</li>
                <li>Financial reporting</li>
                <li>Business intelligence</li>
                <li>Competitor research</li>
              </ul>
            </div>
          </div>
        </div>
   <div className="relative h-[350px] md:h-[450px] w-full max-w-3xl mx-auto rounded-lg overflow-hidden shadow-md border border-gray-200 dark:border-gray-700">
  <Image 
    src="/images/etl2.png"
    alt="OLTP vs OLAP comparison diagram"
    fill
    className="object-contain bg-white dark:bg-gray-800 p-4"
    priority
    sizes="(max-width: 768px) 90vw, 70vw"
   />
</div>
      </section>
      {/* Popular Databases Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-full">
            <span className="text-2xl">🗃️</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold">
            Popular Databases in the Market
          </h2>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {popularDatabases.map((db, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow border border-gray-200 dark:border-gray-700 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                <span className="text-blue-600 dark:text-blue-300">🔷</span>
              </div>
              <span className="font-medium">{db}</span>
            </div>
          ))}
        </div>
      </section>

      {/* On-Prem vs Cloud Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="bg-teal-100 dark:bg-teal-900 p-3 rounded-full">
            <span className="text-2xl">🏠</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold">
            On-Premises vs Cloud Databases
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="bg-gray-800 text-white dark:bg-gray-200 dark:text-gray-800 p-2 rounded-full">🏢</span>
              On-Premises
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-red-500">✗</span>
                <span>Requires physical hardware</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">✗</span>
                <span>Local servers needed</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">✗</span>
                <span>Manual maintenance</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500">✗</span>
                <span>Higher upfront costs</span>
              </li>
            </ul>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="bg-blue-100 text-blue-800 p-2 rounded-full">☁️</span>
              Cloud Databases
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Pay-as-you-go model</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Accessible from anywhere</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Automated scaling</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Built-in security</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="relative h-64 md:h-96 rounded-xl overflow-hidden shadow-lg">
          <Image 
            src="/images/onprem-cloud.png" 
            alt="On premises vs cloud comparison"
            fill
            className="object-cover"
          />
        </div>
      </section>

      {/* Schema Section */}
      <section className="space-y-6">
        <div className="flex items-center gap-4">
          <div className="bg-cyan-100 dark:bg-cyan-900 p-3 rounded-full">
            <span className="text-2xl">📂</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold">
            What Is a Schema?
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <p>
              In Oracle or other DBs, a <strong className="text-cyan-600 dark:text-cyan-400">schema</strong> is like a folder in your system. Just like Local Disk C or D, you can have schemas like SYSTEM, STAGE, SOURCE — each holding tables, procedures, etc.
            </p>
            <div className="bg-cyan-50 dark:bg-cyan-900/30 p-4 rounded-lg border border-cyan-200 dark:border-cyan-800">
              <h4 className="font-bold text-cyan-800 dark:text-cyan-200 mb-2">
                Schema Components:
              </h4>
              <ul className="grid grid-cols-2 gap-2">
                <li className="flex items-center gap-2 text-sm">
                  <span>📄</span>
                  <span>Tables</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <span>📊</span>
                  <span>Views</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <span>🔄</span>
                  <span>Procedures</span>
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <span>🔒</span>
                  <span>Permissions</span>
                </li>
              </ul>
            </div>
          </div>
<div className="relative h-[280px] md:h-[380px] w-full max-w-2xl mx-auto">
  <div className="h-full w-full rounded-lg overflow-hidden shadow-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
    <Image 
      src="/images/schema.png"
      alt="Database schema structure"
      fill
      className="object-contain"
    />
  </div>
</div>
        </div>
      </section>

      {/* Next Section CTA */}
      <section className="text-center mt-12 py-8 border-t border-gray-200 dark:border-gray-700">
        <a 
          href="/study-material/sql/5-sql-languages" 
          className="inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
        >
          Continue to Next: 5 SQL Languages
          <span className="ml-2">→</span>
        </a>
      </section>
    </div>
  );
};

export default SQLIntroPage;