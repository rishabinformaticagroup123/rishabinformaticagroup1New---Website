import React from 'react';

const IICSInterviewQA = () => {
  return (
    <div className="min-h-screen bg-[#001f3f] text-gray-100 p-6 md:p-10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="text-center mb-12 border-b border-blue-400 pb-8">
          <h1 className="text-4xl font-bold text-blue-300 mb-4">
            108 Interview Questions & Answers on IICS - IDMC
          </h1>
          <p className="text-xl text-blue-200">
            Master Informatica Intelligent Cloud Services with these real interview questions
          </p>
        </header>

        {/* Q&A Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Question 1 */}
          <div className="bg-[#0a2a4a] p-6 rounded-lg shadow-xl border border-blue-900 hover:border-blue-500 transition-all">
            <h3 className="text-xl font-semibold text-blue-300 mb-3 flex items-start">
              <span className="bg-blue-800 text-white px-3 py-1 rounded-full mr-3 text-sm">1</span>
              What is the difference between PowerCenter and IICS?
            </h3>
            <div className="space-y-3 ml-10">
              <div>
                <p className="font-medium text-blue-200">PowerCenter:</p>
                <ul className="list-disc pl-5 space-y-1 mt-1 text-blue-100">
                  <li>On-premise ETL tool requiring client/server installations</li>
                  <li>Metadata stored in local repository database</li>
                  <li>Uses workflows and client tools</li>
                </ul>
              </div>
              <div>
                <p className="font-medium text-blue-200">IICS:</p>
                <ul className="list-disc pl-5 space-y-1 mt-1 text-blue-100">
                  <li>Cloud-based iPaaS (Integration Platform as a Service)</li>
                  <li>Accessed via browser with no client installations</li>
                  <li>Metadata managed by Informatica</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Question 2 */}
          <div className="bg-[#0a2a4a] p-6 rounded-lg shadow-xl border border-blue-900 hover:border-blue-500 transition-all">
            <h3 className="text-xl font-semibold text-blue-300 mb-3 flex items-start">
              <span className="bg-blue-800 text-white px-3 py-1 rounded-full mr-3 text-sm">2</span>
              What is IICS?
            </h3>
            <div className="ml-10 text-blue-100">
              <p>Informatica Intelligent Cloud Services is a web-based ETL and integration platform that:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Provides cloud data integration capabilities</li>
                <li>Allows development through browser UI</li>
                <li>Supports both cloud and on-premise data sources</li>
              </ul>
            </div>
          </div>

          {/* Question 3 */}
          <div className="bg-[#0a2a4a] p-6 rounded-lg shadow-xl border border-blue-900 hover:border-blue-500 transition-all">
            <h3 className="text-xl font-semibold text-blue-300 mb-3 flex items-start">
              <span className="bg-blue-800 text-white px-3 py-1 rounded-full mr-3 text-sm">3</span>
              What is Runtime Environment in IICS?
            </h3>
            <div className="ml-10 text-blue-100">
              <p>IICS has two runtime environments:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Default Runtime:</strong> Hosted by Informatica</li>
                <li><strong>Secure Agent Runtime:</strong> Installed on-premise or in cloud for secure data processing</li>
              </ul>
            </div>
          </div>

          {/* Continue with all 108 questions... */}

          {/* Question 108 */}
          <div className="bg-[#0a2a4a] p-6 rounded-lg shadow-xl border border-blue-900 hover:border-blue-500 transition-all">
            <h3 className="text-xl font-semibold text-blue-300 mb-3 flex items-start">
              <span className="bg-blue-800 text-white px-3 py-1 rounded-full mr-3 text-sm">108</span>
              What is file listing in IICS?
            </h3>
            <div className="ml-10 text-blue-100">
              <p>Indirect file loading process where:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Multiple source files with identical structure are processed sequentially</li>
                <li>Implemented by selecting "File List" in source properties</li>
                <li>Alternative to command-based file processing</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-blue-300 border-t border-blue-800 pt-8">
          <p className="text-lg">© {new Date().getFullYear()} RISHAB INFORMATICA GROUP</p>
          <p className="mt-2 text-blue-200">
            Contact: <span className="font-mono">+91 8970853557</span> | rishab@gmail.com
          </p>
        </footer>
      </div>
    </div>
  );
};

export default IICSInterviewQA;