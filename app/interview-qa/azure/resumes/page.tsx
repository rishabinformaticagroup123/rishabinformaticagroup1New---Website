'use client';

import { Download, Eye, Star, TrendingUp, Award, CheckCircle, FileText, Cloud, Database, Server, Zap } from 'lucide-react';
import Link from 'next/link';

export default function AzureResumePage() {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Azure Data Engineering Resume Templates
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Professionally crafted resume templates optimized for Azure Data Engineering roles.
          ATS-friendly and designed to highlight cloud data skills.
        </p>
        
        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <TrendingUp size={16} className="text-green-500" />
            <span>90% Interview Success Rate</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Star size={16} className="text-yellow-500" />
            <span>1,200+ Downloads</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Award size={16} className="text-blue-500" />
            <span>DP-203 Optimized</span>
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
          {/* Option 1: Most Popular - Azure Data Engineer */}
          <ResumeCard 
            title="Azure Data Engineer"
            level="Mid to Senior Level"
            description="Comprehensive template for Azure Data Engineering roles with ADF, Databricks, and Synapse"
            fileName="Azure_Data_Engineer.docx"
            features={[
              'Azure Data Factory (ADF) expertise',
              'Azure Databricks & Spark',
              'Synapse Analytics & SQL Pools',
              'Data Lake Storage Gen2',
              'ETL/ELT pipeline development',
              'Azure DevOps & CI/CD'
            ]}
            popularity="Most Popular"
            color="blue"
            icon={<Database className="text-blue-500" />}
          />
          
          {/* Option 2: Beginner Friendly - Azure Data Developer */}
          <ResumeCard 
            title="Azure Data Developer"
            level="Entry to Mid Level"
            description="Perfect for developers starting with Azure data services or recent graduates"
            fileName="Azure_Data_Developer.docx"
            features={[
              'Azure SQL & Cosmos DB',
              'Basic ADF pipelines',
              'Power BI integration',
              'Data modeling fundamentals',
              'T-SQL & Python skills',
              'Azure fundamentals certified'
            ]}
            popularity="Beginner Friendly"
            color="green"
            icon={<Cloud className="text-green-500" />}
          />
          
          {/* Option 3: Enterprise Focus - Azure Data Architect */}
          <ResumeCard 
            title="Azure Data Architect"
            level="Senior to Lead Level"
            description="For architects designing enterprise data solutions on Azure"
            fileName="Azure_Data_Architect.docx"
            features={[
              'Enterprise architecture design',
              'Data governance & security',
              'Cost optimization strategies',
              'Migration planning (on-prem to cloud)',
              'Team leadership & mentoring',
              'Multi-cloud integration'
            ]}
            popularity="Enterprise Focus"
            color="purple"
            icon={<Server className="text-purple-500" />}
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
              <h4 className="font-semibold">Azure Data Developer</h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Choose this if you're starting with Azure, transitioning from other databases, or a recent graduate.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <span className="font-bold text-green-600 dark:text-green-400">2</span>
              </div>
              <h4 className="font-semibold">Azure Data Engineer</h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Choose this if you have 2+ years experience, work with ADF pipelines, and handle data workflows.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <span className="font-bold text-purple-600 dark:text-purple-400">3</span>
              </div>
              <h4 className="font-semibold">Azure Data Architect</h4>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Choose this if you design systems, manage teams, handle security, or lead migration projects.
            </p>
          </div>
        </div>
      </div>

      {/* Azure Skills Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
          Essential Azure Skills to Highlight
        </h2>
        
        <div className="space-y-8">
          <Section 
            title="1. Core Azure Data Services"
            content={
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Must-Have Skills:</h4>
                  <ul className="space-y-2">
                    {['Azure Data Factory (ADF)', 'Azure Databricks', 'Synapse Analytics', 'Data Lake Storage', 'Azure SQL', 'Cosmos DB'].map((skill, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Zap size={16} className="text-blue-500 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-400">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Advanced Skills:</h4>
                  <ul className="space-y-2">
                    {['Stream Analytics', 'Event Hubs', 'Azure Purview', 'Data Share', 'Azure Monitor', 'Key Vault'].map((skill, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <Zap size={16} className="text-purple-500 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-400">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            }
          />
          
          <Section 
            title="2. Quantify Your Azure Achievements"
            content={
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300">
                  Use numbers to demonstrate Azure impact. Replace with your actual achievements:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">60%</div>
                    <div className="text-sm font-semibold">Cost Reduction</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">With Azure cost optimization</div>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">5TB/Day</div>
                    <div className="text-sm font-semibold">Data Processed</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">Using ADF & Databricks</div>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">99.9%</div>
                    <div className="text-sm font-semibold">Pipeline Uptime</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">With monitoring & alerts</div>
                  </div>
                </div>
              </div>
            }
          />
          
          <Section 
            title="3. Azure Certification Boosters"
            content={
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="border-2 border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Award size={18} className="text-blue-500" />
                      <h4 className="font-semibold">DP-203</h4>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Data Engineering on Microsoft Azure
                    </p>
                    <div className="mt-2 text-xs text-blue-600 dark:text-blue-400">
                      Most in-demand certification
                    </div>
                  </div>
                  
                  <div className="border-2 border-green-200 dark:border-green-800 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Award size={18} className="text-green-500" />
                      <h4 className="font-semibold">AZ-900</h4>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Azure Fundamentals
                    </p>
                    <div className="mt-2 text-xs text-green-600 dark:text-green-400">
                      Beginner friendly
                    </div>
                  </div>
                  
                  <div className="border-2 border-purple-200 dark:border-purple-800 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Award size={18} className="text-purple-500" />
                      <h4 className="font-semibold">DP-900</h4>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Azure Data Fundamentals
                    </p>
                    <div className="mt-2 text-xs text-purple-600 dark:text-purple-400">
                      Data basics certification
                    </div>
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
          Azure Success Stories
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <span className="font-bold text-blue-600 dark:text-blue-400">MS</span>
              </div>
              <div>
                <div className="font-semibold">Michael Smith</div>
                <div className="text-sm text-gray-500">SQL DBA → Azure Data Engineer</div>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              "Using the Data Engineer template, I landed a role at Microsoft within 3 weeks!"
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <span className="font-bold text-green-600 dark:text-green-400">JR</span>
              </div>
              <div>
                <div className="font-semibold">Jessica Rivera</div>
                <div className="text-sm text-gray-500">Data Analyst → Azure Developer</div>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              "Developer template helped highlight my Azure skills. Got 50% salary increase!"
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <span className="font-bold text-purple-600 dark:text-purple-400">DK</span>
              </div>
              <div>
                <div className="font-semibold">David Kim</div>
                <div className="text-sm text-gray-500">Team Lead → Azure Architect</div>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              "Architect template showcased my cloud design skills. Now leading Azure migration at Amazon!"
            </p>
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div className="mt-12 text-center text-gray-600 dark:text-gray-400 text-sm">
        <p>Note: These templates are meant as a starting point. Always customize for each job application.</p>
        <p className="mt-2">Last updated: March 2024 • Optimized for ATS systems & Azure roles</p>
      </div>
    </div>
  );
}

// Updated ResumeCard component with icon
function ResumeCard({ 
  title, 
  level, 
  description, 
  fileName, 
  features,
  popularity,
  color,
  icon
}: { 
  title: string
  level: string
  description: string
  fileName: string
  features: string[]
  popularity: string
  color: string
  icon: React.ReactNode
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
          <div className="flex items-center gap-3 mt-3">
            <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
              {icon}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{level}</p>
            </div>
          </div>
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
          href={`/azure-resumes/${fileName}`}
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