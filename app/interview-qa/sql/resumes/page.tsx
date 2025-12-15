'use client';

import { Download, Eye, Star, TrendingUp, Award, CheckCircle, FileText } from 'lucide-react';
import Link from 'next/link';

export default function SnowflakeResumePage() {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Snowflake Resume Templates
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Professionally crafted resume templates optimized for Snowflake roles.
          ATS-friendly and designed to highlight cloud data skills.
        </p>
        
        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <TrendingUp size={16} className="text-green-500" />
            <span>85% Interview Success Rate</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Star size={16} className="text-yellow-500" />
            <span>500+ Downloads</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Award size={16} className="text-blue-500" />
            <span>ATS Optimized</span>
          </div>
        </div>
      </div>

      {/* Resume Templates - 3 OPTIONS */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
          <FileText className="text-blue-500" />
          Download Resume Templates
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Option 1: Most Popular - Snowflake Data Engineer */}
          <ResumeCard 
            title="Snowflake Data Engineer"
            level="Mid to Senior Level"
            description="Comprehensive template for data engineering roles with Snowflake, dbt, and cloud platforms"
            fileName="Snowflake_Data_Engineer.docx"
            features={[
              'Snowflake architecture experience',
              'ELT/ETL pipeline development',
              'dbt & data modeling',
              'Cloud platforms (AWS/Azure/GCP)',
              'Performance optimization',
              'Data warehousing best practices'
            ]}
            popularity="Most Popular"
            color="blue"
          />
          
          {/* Option 2: Beginner Friendly - Snowflake Developer */}
          <ResumeCard 
            title="Snowflake Developer"
            level="Entry to Mid Level"
            description="Perfect for developers transitioning to Snowflake or recent graduates"
            fileName="Snowflake_Developer.docx"
            features={[
              'SQL optimization & tuning',
              'Stored procedures & UDFs',
              'Data loading strategies',
              'Snowpipe & Streams',
              'Basic Snowflake administration',
              'Troubleshooting skills'
            ]}
            popularity="Beginner Friendly"
            color="green"
          />
          
          {/* Option 3: Enterprise Focus - Snowflake Architect */}
          <ResumeCard 
            title="Snowflake Admin & Architect"
            level="Senior to Lead Level"
            description="For administrators and architects managing enterprise Snowflake environments"
            fileName="Snowflake_Architect.docx"
            features={[
              'Security & RBAC implementation',
              'Cost optimization strategies',
              'Migration planning & execution',
              'Enterprise architecture design',
              'Disaster recovery planning',
              'Team leadership & mentoring'
            ]}
            popularity="Enterprise Focus"
            color="purple"
          />
        </div>
      </div>

      {/* How to Choose Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 mb-8">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
          <CheckCircle className="text-green-500" />
          Which Template Should You Choose?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <span className="font-bold text-blue-600 dark:text-blue-400">1</span>
              </div>
              <h4 className="font-semibold">Snowflake Developer</h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Choose this if you're starting with Snowflake, transitioning from other databases, or a recent graduate.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <span className="font-bold text-green-600 dark:text-green-400">2</span>
              </div>
              <h4 className="font-semibold">Snowflake Data Engineer</h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Choose this if you have 2+ years experience, work with pipelines, and handle end-to-end data workflows.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <span className="font-bold text-purple-600 dark:text-purple-400">3</span>
              </div>
              <h4 className="font-semibold">Snowflake Architect</h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Choose this if you design systems, manage teams, handle security, or lead migration projects.
            </p>
          </div>
        </div>
      </div>

      {/* Customization Guide */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          How to Customize Your Snowflake Resume
        </h2>
        
        <div className="space-y-8">
          <Section 
            title="1. Highlight Snowflake-Specific Skills"
            content={
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Must-Have Skills:</h4>
                  <ul className="space-y-2">
                    {['Snowflake Architecture', 'SQL Optimization', 'ELT/ETL Pipelines', 'Data Modeling', 'Cloud Integration', 'Performance Tuning'].map((skill, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-400">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Advanced Skills:</h4>
                  <ul className="space-y-2">
                    {['Snowpark Python/Java', 'Streams & Tasks', 'Materialized Views', 'Secure Data Sharing', 'Cost Optimization', 'Data Governance'].map((skill, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle size={16} className="text-blue-500 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-400">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            }
          />
          
          <Section 
            title="2. Quantify Your Achievements"
            content={
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300">
                  Use numbers to demonstrate impact. Replace these examples with your actual achievements:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">70%</div>
                    <div className="text-sm font-semibold">Query Performance Improvement</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Through clustering optimization</div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">$50K</div>
                    <div className="text-sm font-semibold">Monthly Cost Savings</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">With auto-suspend & monitoring</div>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">10TB</div>
                    <div className="text-sm font-semibold">Data Migrated</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Zero downtime migration</div>
                  </div>
                </div>
              </div>
            }
          />
          
          <Section 
            title="3. ATS Optimization Tips"
            content={
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Do's:</h4>
                    <ul className="space-y-2">
                      {[
                        'Use standard job titles (Data Engineer, etc.)',
                        'Include keywords from job descriptions',
                        'Save as PDF for submission',
                        'Keep formatting simple and clean',
                        'Use bullet points for readability',
                        'Include certifications clearly'
                      ].map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-600 dark:text-gray-400 text-sm">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Don'ts:</h4>
                    <ul className="space-y-2">
                      {[
                        'Use tables or complex formatting',
                        'Include graphics or images',
                        'Use unusual fonts or colors',
                        'Make it longer than 2-3 pages',
                        'Include personal information (age, photo)',
                        'Use buzzwords without examples'
                      ].map((tip, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-gray-600 dark:text-gray-400 text-sm">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            }
          />
        </div>
      </div>

      {/* Success Stories */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 mb-8">
        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          Success Stories
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <span className="font-bold text-blue-600 dark:text-blue-400">RK</span>
              </div>
              <div>
                <div className="font-semibold">Rahul Kumar</div>
                <div className="text-sm text-gray-500">Oracle DBA → Snowflake</div>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              "Used the Developer template to transition from Oracle. Got 3 interviews in 2 weeks!"
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <span className="font-bold text-green-600 dark:text-green-400">SP</span>
              </div>
              <div>
                <div className="font-semibold">Priya Sharma</div>
                <div className="text-sm text-gray-500">Data Analyst → Data Engineer</div>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              "Data Engineer template helped highlight my Snowflake skills. 40% salary increase!"
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <span className="font-bold text-purple-600 dark:text-purple-400">AK</span>
              </div>
              <div>
                <div className="font-semibold">Amit Kumar</div>
                <div className="text-sm text-gray-500">Team Lead → Architect</div>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              "Architect template showcased my leadership skills. Landed a FAANG company role!"
            </p>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-12 text-center text-gray-600 dark:text-gray-400 text-sm">
        <p>Note: These templates are meant as a starting point. Always customize for each job application.</p>
        <p className="mt-2">Last updated: March 2024 • Optimized for ATS systems</p>
      </div>
    </div>
  );
}

function ResumeCard({ 
  title, 
  level, 
  description, 
  fileName, 
  features,
  popularity,
  color 
}: { 
  title: string
  level: string
  description: string
  fileName: string
  features: string[]
  popularity: string
  color: string
}) {
  const colorClasses = {
    blue: 'border-blue-200 dark:border-blue-800 hover:border-blue-300 dark:hover:border-blue-700',
    green: 'border-green-200 dark:border-green-800 hover:border-green-300 dark:hover:border-green-700',
    purple: 'border-purple-200 dark:border-purple-800 hover:border-purple-300 dark:hover:border-purple-700'
  };

  const badgeColors = {
    blue: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    green: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    purple: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
  };

  return (
    <div className={`border-2 rounded-xl p-6 hover:shadow-xl transition-all duration-300 ${colorClasses[color as keyof typeof colorClasses]} group`}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badgeColors[color as keyof typeof badgeColors]}`}>
            {popularity}
          </span>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-3">{title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{level}</p>
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
          .DOCX
        </div>
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 mb-5">{description}</p>
      
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Key Features:</h4>
        <ul className="space-y-2">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
              <div className="w-1.5 h-1.5 rounded-full bg-current mt-1.5 flex-shrink-0"></div>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="flex gap-3">
        <Link 
          href={`/snowflake-resumes/${fileName}`}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors group-hover:scale-105 duration-300"
          download
        >
          <Download size={18} />
          Download Template
        </Link>
        <button 
          className="px-4 py-3 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg font-medium transition-colors"
          onClick={() => alert(`Preview of ${title} would open here`)}
          title="Preview"
        >
          <Eye size={18} />
        </button>
      </div>
    </div>
  );
}

function Section({ title, content }: { title: string; content: React.ReactNode }) {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 pb-8 last:border-b-0 last:pb-0">
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">{title}</h3>
      <div className="text-gray-700 dark:text-gray-300">
        {content}
      </div>
    </div>
  );
}