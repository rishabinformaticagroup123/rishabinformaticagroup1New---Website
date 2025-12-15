'use client';

import { Database, Zap, Code, Shield, AlertCircle, CheckCircle, Clock, BarChart, Layers, Cloud, Server, Cpu, Users, FileText, Download, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { useState } from 'react';

export default function AzureDataEngineeringNotes() {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'adf-overview': true,
    'adf-components': true,
    'adf-pipelines': true,
    'adb-overview': true,
    'interview': false,
    'best-practices': false
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-4">
          <Database size={16} />
          Azure Data Engineering
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          ADF + ADB Complete Notes
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Everything you need to know about Azure Data Factory and Azure Databricks for interviews and real projects
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Clock size={16} className="text-blue-500" />
            <span>Reading time: 15-20 mins</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <CheckCircle size={16} className="text-green-500" />
            <span>Updated: Feb 2024</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Users size={16} className="text-purple-500" />
            <span>Beginner to Advanced</span>
          </div>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="sticky top-4 z-10 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4">
          <h3 className="font-semibold text-gray-800 dark:text-white mb-3">Quick Navigation</h3>
          <div className="flex flex-wrap gap-2">
            {['ADF Overview', 'ADF Components', 'Pipelines', 'ADB', 'Interview Q&A', 'Best Practices'].map((item, idx) => (
              <a 
                key={idx}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-8">
        {/* Section 1: ADF Overview */}
        <section id="adf-overview" className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div 
            className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50"
            onClick={() => toggleSection('adf-overview')}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <Database className="text-blue-600 dark:text-blue-400" size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Azure Data Factory (ADF) Overview</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Cloud ETL/ELT service for data integration</p>
              </div>
            </div>
            <button>
              {expandedSections['adf-overview'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>
          
          {expandedSections['adf-overview'] && (
            <div className="px-6 pb-6">
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">What is ADF?</h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Azure Data Factory is a fully managed, serverless data integration service for creating ETL (Extract, Transform, Load) and ELT (Extract, Load, Transform) pipelines.
                    </p>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <h3 className="font-semibold text-green-700 dark:text-green-300 mb-2">Key Features</h3>
                    <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                      <li className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Code-free ETL with Mapping Data Flows</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Connect to 90+ data sources</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
                        <span>Pay-per-use pricing model</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">When to Use ADF?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <UseCaseCard
                      icon={<Zap className="text-orange-500" />}
                      title="Data Migration"
                      description="Move data from on-premises to cloud"
                    />
                    <UseCaseCard
                      icon={<BarChart className="text-blue-500" />}
                      title="Data Transformation"
                      description="Clean, transform, and enrich data"
                    />
                    <UseCaseCard
                      icon={<Clock className="text-green-500" />}
                      title="Scheduled Pipelines"
                      description="Automate recurring data workflows"
                    />
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                    <AlertCircle size={18} className="text-blue-500" />
                    Important Concepts
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-2">ETL vs ELT</h5>
                      <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        <li>• ETL: Transform before loading</li>
                        <li>• ELT: Load then transform (modern approach)</li>
                        <li>• ADF supports both patterns</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Serverless vs Self-hosted</h5>
                      <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        <li>• Azure IR: Managed, serverless</li>
                        <li>• Self-hosted IR: For on-premises data</li>
                        <li>• Azure-SSIS IR: For SSIS packages</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Section 2: ADF Components */}
        <section id="adf-components" className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div 
            className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50"
            onClick={() => toggleSection('adf-components')}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                <Layers className="text-purple-600 dark:text-purple-400" size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">ADF Core Components</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Building blocks of ADF pipelines</p>
              </div>
            </div>
            <button>
              {expandedSections['adf-components'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>
          
          {expandedSections['adf-components'] && (
            <div className="px-6 pb-6">
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  <ComponentCard
                    title="Pipeline"
                    description="Logical grouping of activities"
                    icon={<Zap size={20} />}
                    color="blue"
                    details={[
                      "Orchestrates data movement",
                      "Supports parameters",
                      "Can contain multiple activities"
                    ]}
                  />
                  <ComponentCard
                    title="Activity"
                    description="Individual processing step"
                    icon={<Code size={20} />}
                    color="green"
                    details={[
                      "Copy activity for data movement",
                      "Data flow activity for transformation",
                      "Custom activities with Azure Functions"
                    ]}
                  />
                  <ComponentCard
                    title="Dataset"
                    description="Named view of data"
                    icon={<Database size={20} />}
                    color="orange"
                    details={[
                      "Points to actual data",
                      "Supports schema definition",
                      "Can be parameterized"
                    ]}
                  />
                  <ComponentCard
                    title="Linked Service"
                    description="Connection string"
                    icon={<Cloud size={20} />}
                    color="purple"
                    details={[
                      "Connection to data store",
                      "Authentication details",
                      "Can use Key Vault for secrets"
                    ]}
                  />
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Integration Runtime (IR) Types</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Server size={18} className="text-blue-500" />
                        <h4 className="font-semibold text-blue-600 dark:text-blue-400">Azure IR</h4>
                      </div>
                      <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        <li>• Fully managed by Azure</li>
                        <li>• Used for cloud-to-cloud</li>
                        <li>• Auto-scaling available</li>
                        <li>• Pay-per-use pricing</li>
                      </ul>
                    </div>
                    
                    <div className="border border-green-200 dark:border-green-800 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Cpu size={18} className="text-green-500" />
                        <h4 className="font-semibold text-green-600 dark:text-green-400">Self-hosted IR</h4>
                      </div>
                      <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        <li>• Install on your infrastructure</li>
                        <li>• Required for on-premises data</li>
                        <li>• Can be scaled out</li>
                        <li>• No data transfer costs</li>
                      </ul>
                    </div>
                    
                    <div className="border border-purple-200 dark:border-purple-800 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Layers size={18} className="text-purple-500" />
                        <h4 className="font-semibold text-purple-600 dark:text-purple-400">Azure-SSIS IR</h4>
                      </div>
                      <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        <li>• For running SSIS packages</li>
                        <li>• Lift and shift from on-premises</li>
                        <li>• Managed by Azure</li>
                        <li>• Enterprise SSIS features</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Section 3: Pipeline Activities */}
        <section id="pipelines" className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div 
            className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50"
            onClick={() => toggleSection('adf-pipelines')}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <Code className="text-green-600 dark:text-green-400" size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Pipeline Activities & Triggers</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">How data flows through ADF</p>
              </div>
            </div>
            <button>
              {expandedSections['adf-pipelines'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>
          
          {expandedSections['adf-pipelines'] && (
            <div className="px-6 pb-6">
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Common Activities</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead>
                        <tr className="bg-gray-50 dark:bg-gray-700">
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Activity</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Purpose</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Use Case</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {[
                          { activity: 'Copy Activity', purpose: 'Data movement between sources', useCase: 'Migrate data from SQL Server to Azure SQL' },
                          { activity: 'Data Flow Activity', purpose: 'Code-free data transformation', useCase: 'Clean and aggregate customer data' },
                          { activity: 'Lookup Activity', purpose: 'Get values from datasets', useCase: 'Retrieve configuration values' },
                          { activity: 'Execute Pipeline', purpose: 'Call another pipeline', useCase: 'Modular pipeline design' },
                          { activity: 'Web Activity', purpose: 'Call REST APIs', useCase: 'Trigger Azure Functions' },
                          { activity: 'Stored Procedure', purpose: 'Execute SQL procedures', useCase: 'Data validation in SQL DB' }
                        ].map((row, idx) => (
                          <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                            <td className="px-4 py-3 text-sm font-medium text-gray-800 dark:text-gray-300">{row.activity}</td>
                            <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{row.purpose}</td>
                            <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">{row.useCase}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Pipeline Triggers</h3>
                    <div className="space-y-3">
                      <TriggerCard
                        type="Schedule Trigger"
                        description="Run pipeline at fixed intervals"
                        interval="Daily, hourly, or custom cron"
                      />
                      <TriggerCard
                        type="Event Trigger"
                        description="Trigger on blob events"
                        interval="File created/modified/deleted"
                      />
                      <TriggerCard
                        type="Tumbling Window"
                        description="For time-series data processing"
                        interval="Fixed-size, non-overlapping windows"
                      />
                      <TriggerCard
                        type="Manual Trigger"
                        description="On-demand execution"
                        interval="Run now via UI or API"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Pipeline Patterns</h3>
                    <div className="space-y-4">
                      <PatternCard
                        title="Incremental Load"
                        description="Load only changed data using watermark columns"
                        benefit="Reduces data transfer and costs"
                      />
                      <PatternCard
                        title="Slowly Changing Dimensions"
                        description="Handle historical data changes (Type 1, 2, 3)"
                        benefit="Maintain data history"
                      />
                      <PatternCard
                        title="Error Handling"
                        description="Implement retry logic and logging"
                        benefit="Resilient pipelines"
                      />
                      <PatternCard
                        title="Parameterized Pipelines"
                        description="Dynamic configuration through parameters"
                        benefit="Reusable pipeline templates"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Section 4: Azure Databricks */}
        <section id="adb" className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div 
            className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50"
            onClick={() => toggleSection('adb-overview')}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900 flex items-center justify-center">
                <Cpu className="text-orange-600 dark:text-orange-400" size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Azure Databricks (ADB)</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Apache Spark-based analytics platform</p>
              </div>
            </div>
            <button>
              {expandedSections['adb-overview'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>
          
          {expandedSections['adb-overview'] && (
            <div className="px-6 pb-6">
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 p-4 rounded-lg">
                    <h3 className="font-semibold text-orange-700 dark:text-orange-300 mb-2">ADB vs ADF</h3>
                    <div className="space-y-3">
                      <div>
                        <h4 className="font-medium text-gray-700 dark:text-gray-300">Use ADF when:</h4>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 mt-1">
                          <li>• Simple data movement needed</li>
                          <li>• Code-free transformation</li>
                          <li>• Orchestrating multiple services</li>
                          <li>• Cost-effective ETL</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 dark:text-gray-300">Use ADB when:</h4>
                        <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1 mt-1">
                          <li>• Complex transformations</li>
                          <li>• Machine learning needed</li>
                          <li>• Big data processing (Spark)</li>
                          <li>• Real-time streaming</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg">
                    <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">ADB Components</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-medium text-gray-700 dark:text-gray-300">Workspace</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Collaborative environment for notebooks, libraries, and dashboards</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-medium text-gray-700 dark:text-gray-300">Clusters</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Compute resources for running notebooks and jobs</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-purple-500 mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-medium text-gray-700 dark:text-gray-300">Notebooks</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Interactive documents with code (Python, Scala, SQL, R)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Cluster Types</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <ClusterCard
                      type="Interactive Clusters"
                      purpose="Data exploration and ad-hoc analysis"
                      autoTerminate="Yes (after idle time)"
                      cost="Higher (always running)"
                    />
                    <ClusterCard
                      type="Job Clusters"
                      purpose="Scheduled or automated jobs"
                      autoTerminate="Yes (after job completion)"
                      cost="Lower (ephemeral)"
                    />
                    <ClusterCard
                      type="High Concurrency"
                      purpose="Multiple users with fine-grained access"
                      autoTermination="Yes"
                      cost="Medium (shared)"
                    />
                  </div>
                </div>
                
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 dark:text-white mb-3">Common ADB Use Cases</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Data Engineering</h5>
                      <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        <li>• Large-scale ETL processing</li>
                        <li>• Data cleansing and enrichment</li>
                        <li>• Batch and streaming pipelines</li>
                        <li>• Delta Lake operations</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Data Science</h5>
                      <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        <li>• Machine learning model training</li>
                        <li>• Feature engineering at scale</li>
                        <li>• Experiment tracking with MLflow</li>
                        <li>• Model deployment and serving</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Section 5: Interview Questions */}
        <section id="interview-qa" className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div 
            className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50"
            onClick={() => toggleSection('interview')}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-100 dark:bg-red-900 flex items-center justify-center">
                <AlertCircle className="text-red-600 dark:text-red-400" size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Interview Questions & Answers</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Common questions with detailed answers</p>
              </div>
            </div>
            <button>
              {expandedSections['interview'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>
          
          {expandedSections['interview'] && (
            <div className="px-6 pb-6">
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <div className="space-y-6">
                  {[
                    {
                      question: "What is the difference between Mapping Data Flow and Databricks in ADF?",
                      answer: "Mapping Data Flow is ADF's built-in visual transformation tool (code-free ETL) running on Spark clusters managed by ADF. Databricks provides full Spark capabilities with notebooks, ML libraries, and more control. Use Mapping Data Flow for simple transformations; use Databricks for complex logic, ML, or when you need Python/Scala code.",
                      difficulty: "Medium",
                      topic: "ADF vs ADB"
                    },
                    {
                      question: "How do you handle incremental loads in ADF?",
                      answer: "1. Use watermark columns (last modified timestamp) 2. Implement Change Data Capture (CDC) 3. Store last processed value in control table 4. Use Lookup activity to get watermark 5. Filter source data in Copy activity 6. Update watermark after successful load",
                      difficulty: "Easy",
                      topic: "Pipeline Design"
                    },
                    {
                      question: "What are Integration Runtimes and their types?",
                      answer: "Integration Runtime is compute infrastructure for data movement. Types: 1. Azure IR (managed, cloud-to-cloud) 2. Self-hosted IR (on-premises data access) 3. Azure-SSIS IR (run SSIS packages). Azure IR is serverless; self-hosted requires VM installation.",
                      difficulty: "Easy",
                      topic: "ADF Components"
                    },
                    {
                      question: "How to secure credentials in ADF pipelines?",
                      answer: "1. Use Azure Key Vault for storing secrets 2. Create Key Vault linked service 3. Reference Key Vault secrets in linked services 4. Use Managed Identity for authentication 5. Enable encryption at rest and in transit 6. Implement RBAC for access control",
                      difficulty: "Medium",
                      topic: "Security"
                    },
                    {
                      question: "Explain ADF pipeline monitoring and error handling.",
                      answer: "Monitoring: Use Azure Monitor, ADF Monitor UI, Log Analytics. Error handling: 1. Set retry policies in activities 2. Implement try-catch patterns 3. Use failure paths in pipelines 4. Send alerts via Logic Apps 5. Log errors to storage/SQL 6. Implement dead-letter queues for failed records.",
                      difficulty: "Hard",
                      topic: "Operations"
                    }
                  ].map((qna, idx) => (
                    <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                          <span className="font-bold text-blue-600 dark:text-blue-300">{idx + 1}</span>
                        </div>
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <h3 className="font-semibold text-gray-800 dark:text-white">{qna.question}</h3>
                            <span className={`px-2 py-0.5 text-xs rounded-full ${
                              qna.difficulty === 'Easy' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                              qna.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                              'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                            }`}>
                              {qna.difficulty}
                            </span>
                            <span className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
                              {qna.topic}
                            </span>
                          </div>
                          <div className="bg-gray-50 dark:bg-gray-700/50 rounded p-3">
                            <p className="text-gray-700 dark:text-gray-300">{qna.answer}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Section 6: Best Practices */}
        <section id="best-practices" className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
          <div 
            className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50"
            onClick={() => toggleSection('best-practices')}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <CheckCircle className="text-green-600 dark:text-green-400" size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Best Practices</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Production-ready recommendations</p>
              </div>
            </div>
            <button>
              {expandedSections['best-practices'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>
          
          {expandedSections['best-practices'] && (
            <div className="px-6 pb-6">
              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">ADF Best Practices</h3>
                    <div className="space-y-3">
                      <PracticeCard
                        title="Cost Optimization"
                        items={[
                          "Use auto-scaling for IR",
                          "Implement incremental loads",
                          "Monitor pipeline execution times",
                          "Use appropriate compute sizes"
                        ]}
                      />
                      <PracticeCard
                        title="Performance"
                        items={[
                          "Use parallel copy for large datasets",
                          "Optimize data partitioning",
                          "Enable compression for network transfer",
                          "Use premium connectors when needed"
                        ]}
                      />
                      <PracticeCard
                        title="Security"
                        items={[
                          "Store secrets in Key Vault",
                          "Use Managed Identity authentication",
                          "Implement network security groups",
                          "Enable diagnostic logging"
                        ]}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">ADB Best Practices</h3>
                    <div className="space-y-3">
                      <PracticeCard
                        title="Cluster Management"
                        items={[
                          "Use job clusters for scheduled workloads",
                          "Enable auto-termination",
                          "Right-size clusters for workloads",
                          "Use spot instances for cost savings"
                        ]}
                      />
                      <PracticeCard
                        title="Code Organization"
                        items={[
                          "Modularize notebooks",
                          "Use Databricks Repos for version control",
                          "Implement unit testing",
                          "Use environment variables for config"
                        ]}
                      />
                      <PracticeCard
                        title="Data Management"
                        items={[
                          "Use Delta Lake for ACID transactions",
                          "Implement data quality checks",
                          "Use Z-ordering for query performance",
                          "Regularly vacuum old files"
                        ]}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-3">Key Takeaways</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Must Remember</h5>
                      <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        <li>• Always implement error handling</li>
                        <li>• Monitor pipeline costs regularly</li>
                        <li>• Use parameters for reusability</li>
                        <li>• Test pipelines thoroughly</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-700 dark:text-gray-300 mb-2">Common Mistakes</h5>
                      <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                        <li>• Not using incremental loads</li>
                        <li>• Hard-coding credentials</li>
                        <li>• Over-provisioning clusters</li>
                        <li>• Skipping data validation</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>

      {/* Footer Actions */}
      <div className="mt-12 text-center">
        <div className="inline-flex flex-col sm:flex-row gap-4">
          <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
            <Download size={20} />
            Save This Page
          </button>
          <button className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg font-semibold transition-colors">
            <ExternalLink size={20} />
            Practice Labs
          </button>
        </div>
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          Bookmark this page for quick reference during interviews and project work
        </p>
      </div>
    </div>
  );
}

// Reusable Components
function UseCaseCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 mb-3">
        {icon}
      </div>
      <h4 className="font-semibold text-gray-800 dark:text-white mb-1">{title}</h4>
      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
}

function ComponentCard({ title, description, icon, color, details }: { 
  title: string; 
  description: string; 
  icon: React.ReactNode; 
  color: string;
  details: string[];
}) {
  const colorMap = {
    blue: 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400',
    green: 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400',
    orange: 'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400',
    purple: 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400'
  };

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colorMap[color as keyof typeof colorMap]}`}>
          {icon}
        </div>
        <div>
          <h4 className="font-semibold text-gray-800 dark:text-white">{title}</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
        </div>
      </div>
      <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
        {details.map((detail, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-current mt-1.5 opacity-50 flex-shrink-0"></div>
            <span>{detail}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function TriggerCard({ type, description, interval }: { type: string; description: string; interval: string }) {
  return (
    <div className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
      <div className="flex-1">
        <h4 className="font-medium text-gray-800 dark:text-white">{type}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
        <div className="mt-1 text-xs text-gray-500 dark:text-gray-500">{interval}</div>
      </div>
    </div>
  );
}

function PatternCard({ title, description, benefit }: { title: string; description: string; benefit: string }) {
  return (
    <div className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
      <h4 className="font-medium text-gray-800 dark:text-white mb-1">{title}</h4>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{description}</p>
      <div className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded inline-block">
        Benefit: {benefit}
      </div>
    </div>
  );
}

function ClusterCard({ type, purpose, autoTerminate, cost }: { 
  type: string; 
  purpose: string; 
  autoTerminate: string; 
  cost: string;
}) {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">{type}</h4>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{purpose}</p>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-500">Auto-terminate:</span>
          <span className="text-gray-700 dark:text-gray-300">{autoTerminate}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-500">Cost:</span>
          <span className="text-gray-700 dark:text-gray-300">{cost}</span>
        </div>
      </div>
    </div>
  );
}

function PracticeCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
      <h4 className="font-medium text-gray-800 dark:text-white mb-3">{title}</h4>
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2 text-sm">
            <CheckCircle size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
            <span className="text-gray-600 dark:text-gray-400">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}