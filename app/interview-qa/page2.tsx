import Link from "next/link";
import { BookOpen, Database, Cloud, Code } from "lucide-react";

export default function InterviewQaLandingPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-4">🎯 Interview Q&A - Summary</h1>
      <p className="text-lg text-gray-700 text-center mb-10">
        Explore scenario-based Interview Questions & Answers across top data and cloud tools.
        All questions are handpicked by our expert trainers at <strong>Rishab Informatica Group</strong>.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        
        {/* PowerCenter */}
        <Link href="/interview-qa/powercenter">
          <div className="border border-gray-200 rounded-xl p-5 hover:shadow-lg transition bg-white hover:bg-blue-50">
            <div className="flex items-center gap-3 mb-2">
              <Database className="text-blue-600" />
              <h2 className="text-xl font-semibold">Informatica PowerCenter</h2>
            </div>
            <p className="text-gray-600">
              Covers core ETL concepts, mappings, workflows, performance tuning and real-time scenarios.
            </p>
          </div>
        </Link>

        {/* IICS */}
        <Link href="/interview-qa/iics">
          <div className="border border-gray-200 rounded-xl p-5 hover:shadow-lg transition bg-white hover:bg-green-50">
            <div className="flex items-center gap-3 mb-2">
              <Cloud className="text-green-600" />
              <h2 className="text-xl font-semibold">Informatica IICS - IDMC</h2>
            </div>
            <p className="text-gray-600">
              Learn CAI, CDI, Taskflows, Parameters, API integrations, and real-time use cases.
            </p>
          </div>
        </Link>

        {/* SQL */}
        <Link href="/interview-qa/sql">
          <div className="border border-gray-200 rounded-xl p-5 hover:shadow-lg transition bg-white hover:bg-yellow-50">
            <div className="flex items-center gap-3 mb-2">
              <Code className="text-yellow-600" />
              <h2 className="text-xl font-semibold">SQL</h2>
            </div>
            <p className="text-gray-600">
              Includes basic to advanced SQL questions with scenarios, joins, subqueries, and optimizations.
            </p>
          </div>
        </Link>

        {/* Snowflake */}
        <Link href="/interview-qa/snowflake">
          <div className="border border-gray-200 rounded-xl p-5 hover:shadow-lg transition bg-white hover:bg-purple-50">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="text-purple-600" />
              <h2 className="text-xl font-semibold">Snowflake</h2>
            </div>
            <p className="text-gray-600">
              Key concepts in cloud data warehousing, stages, virtual warehouses, pipes, streams & tasks.
            </p>
          </div>
        </Link>

      </div>
    </div>
  );
}
