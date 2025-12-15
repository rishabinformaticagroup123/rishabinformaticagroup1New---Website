'use client';

import { Database, Zap, Code, Cloud, Server, Users, Target, BarChart, Lock, Globe, Cpu, Sparkles, Rocket, TrendingUp, Layers, FileText, Play, ExternalLink, ChevronRight, Star, Clock, Award, CheckCircle } from 'lucide-react';
import { useState } from 'react';

export default function AzureDataEngineeringProjects() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [bookmarkedProjects, setBookmarkedProjects] = useState<Set<string>>(new Set(['project1', 'project3']));

  const projects = {
    'real-time': [
      {
        id: 'project1',
        title: 'Real-time Stock Trading Analytics',
        description: 'Build a real-time analytics pipeline for stock trading data using Event Hubs, Stream Analytics, and Power BI',
        category: 'Real-time',
        difficulty: 'Advanced',
        time: '8-10 hours',
        skills: ['Event Hubs', 'Stream Analytics', 'Power BI', 'ADF', 'Azure SQL'],
        tools: ['Azure Portal', 'Visual Studio Code', 'Power BI Desktop'],
        features: [
          'Real-time data ingestion from trading APIs',
          'Stream processing for live analytics',
          'Anomaly detection for unusual trading patterns',
          'Live dashboard with Power BI',
          'Historical data storage in Data Lake'
        ],
        businessValue: 'Enables real-time trading decisions and risk management',
        completionRate: '85%'
      },
      {
        id: 'project2',
        title: 'IoT Device Monitoring System',
        description: 'Monitor and analyze IoT device data in real-time with alerting and predictive maintenance',
        category: 'Real-time',
        difficulty: 'Intermediate',
        time: '6-8 hours',
        skills: ['IoT Hub', 'Stream Analytics', 'Functions', 'Cosmos DB'],
        tools: ['Azure CLI', 'Postman', 'Device Simulator'],
        features: [
          'IoT device registration and management',
          'Real-time telemetry processing',
          'Predictive maintenance alerts',
          'Device health dashboard',
          'Automated incident response'
        ],
        businessValue: 'Reduces downtime and maintenance costs by 40%',
        completionRate: '78%'
      }
    ],
    'batch': [
      {
        id: 'project3',
        title: 'Enterprise Data Warehouse Migration',
        description: 'Migrate on-premise data warehouse to Azure Synapse Analytics with ETL optimization',
        category: 'Batch',
        difficulty: 'Advanced',
        time: '12-15 hours',
        skills: ['Synapse Analytics', 'ADF', 'Databricks', 'PolyBase'],
        tools: ['SQL Server Management Studio', 'Azure Data Studio', 'Synapse Studio'],
        features: [
          'Legacy SQL Server to Synapse migration',
          'Incremental load implementation',
          'Data quality validation framework',
          'Performance optimization',
          'Cost monitoring and optimization'
        ],
        businessValue: 'Reduces query time from hours to minutes, saves 60% on infrastructure',
        completionRate: '72%'
      },
      {
        id: 'project4',
        title: 'Retail Sales Forecasting',
        description: 'Predict sales trends using historical data and machine learning models',
        category: 'Batch',
        difficulty: 'Intermediate',
        time: '5-7 hours',
        skills: ['Databricks', 'ML Studio', 'Blob Storage', 'SQL DB'],
        tools: ['Databricks Notebooks', 'Azure ML Studio', 'Jupyter'],
        features: [
          'Sales data aggregation and cleaning',
          'Feature engineering pipeline',
          'Machine learning model training',
          'Forecast visualization',
          'Automated report generation'
        ],
        businessValue: 'Improves inventory planning accuracy by 35%',
        completionRate: '90%'
      }
    ],
    'hybrid': [
      {
        id: 'project5',
        title: 'Hybrid Cloud Data Platform',
        description: 'Build a secure hybrid data platform connecting on-premise and cloud data sources',
        category: 'Hybrid',
        difficulty: 'Expert',
        time: '15-20 hours',
        skills: ['ADF Self-hosted IR', 'ExpressRoute', 'Azure VPN', 'Key Vault'],
        tools: ['On-premise SQL Server', 'Azure Hybrid Benefit', 'Network Watcher'],
        features: [
          'Secure data transfer between on-prem and cloud',
          'Data encryption at rest and in transit',
          'Disaster recovery setup',
          'Compliance monitoring',
          'Unified data catalog'
        ],
        businessValue: 'Enables cloud migration while maintaining legacy systems',
        completionRate: '65%'
      },
      {
        id: 'project6',
        title: 'Multi-cloud Data Integration',
        description: 'Integrate data from AWS and Google Cloud into Azure analytics platform',
        category: 'Hybrid',
        difficulty: 'Advanced',
        time: '10-12 hours',
        skills: ['Azure Arc', 'Multi-cloud Networking', 'Data Factory', 'API Management'],
        tools: ['AWS Console', 'GCP Console', 'Azure Portal'],
        features: [
          'Cross-cloud data synchronization',
          'Unified data governance',
          'Cost optimization across clouds',
          'Centralized monitoring',
          'Security policy enforcement'
        ],
        businessValue: 'Provides single pane of glass for multi-cloud analytics',
        completionRate: '70%'
      }
    ]
  };

  const allProjects = [
    ...projects['real-time'],
    ...projects['batch'],
    ...projects['hybrid']
  ];

  const filteredProjects = selectedCategory === 'all' 
    ? allProjects 
    : allProjects.filter(project => project.category.toLowerCase() === selectedCategory);

  const toggleBookmark = (projectId: string) => {
    const newBookmarks = new Set(bookmarkedProjects);
    if (newBookmarks.has(projectId)) {
      newBookmarks.delete(projectId);
    } else {
      newBookmarks.add(projectId);
    }
    setBookmarkedProjects(newBookmarks);
  };

  const categories = [
    { id: 'all', name: 'All Projects', count: allProjects.length, icon: <Globe size={18} />, color: 'bg-gradient-to-r from-blue-500 to-cyan-500' },
    { id: 'real-time', name: 'Real-time', count: projects['real-time'].length, icon: <Zap size={18} />, color: 'bg-gradient-to-r from-green-500 to-emerald-500' },
    { id: 'batch', name: 'Batch Processing', count: projects['batch'].length, icon: <Database size={18} />, color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { id: 'hybrid', name: 'Hybrid Cloud', count: projects['hybrid'].length, icon: <Cloud size={18} />, color: 'bg-gradient-to-r from-orange-500 to-red-500' }
  ];

  const difficultyColors = {
    'Intermediate': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    'Advanced': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300',
    'Expert': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-medium mb-6">
          <Rocket size={16} />
          Real-world Projects
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Azure Data Engineering Projects
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
          Build portfolio-worthy projects with real business impact. Each project includes complete architecture, implementation guide, and Azure resources.
        </p>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
          <StatCard
            icon={<Target className="text-blue-500" />}
            value={allProjects.length}
            label="Complete Projects"
          />
          <StatCard
            icon={<Users className="text-green-500" />}
            value="1,250+"
            label="Developers Completed"
          />
          <StatCard
            icon={<Star className="text-yellow-500" />}
            value="4.8"
            label="Average Rating"
          />
          <StatCard
            icon={<TrendingUp className="text-purple-500" />}
            value="95%"
            label="Career Impact"
          />
        </div>
      </div>

      {/* Categories Filter */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Browse by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`p-6 rounded-2xl text-left transition-all transform hover:scale-105 duration-300 ${
                selectedCategory === category.id
                  ? 'ring-4 ring-blue-500/20 dark:ring-blue-500/30 shadow-xl'
                  : 'hover:shadow-lg'
              }`}
            >
              <div className={`inline-flex p-3 rounded-xl mb-4 ${category.color}`}>
                {category.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{category.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {category.count} project{category.count !== 1 ? 's' : ''}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Featured Projects
            <span className="text-sm font-normal text-gray-600 dark:text-gray-400 ml-2">
              ({filteredProjects.length} projects)
            </span>
          </h2>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Sparkles size={16} className="text-yellow-500" />
              <span>Bookmarked: {bookmarkedProjects.size}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isBookmarked={bookmarkedProjects.has(project.id)}
              onToggleBookmark={() => toggleBookmark(project.id)}
              difficultyColors={difficultyColors}
            />
          ))}
        </div>
      </div>

      {/* Project Benefits Section */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-3xl p-8 mb-12">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center">
          Why Build These Projects?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <BenefitCard
            icon={<Target className="text-green-500" />}
            title="Portfolio Building"
            description="Create real projects that impress employers and showcase your skills"
            items={['GitHub repositories', 'Architecture diagrams', 'Live demos', 'Case studies']}
          />
          <BenefitCard
            icon={<BarChart className="text-blue-500" />}
            title="Skill Validation"
            description="Prove your expertise with hands-on implementation of complex solutions"
            items={['Real Azure resources', 'Production scenarios', 'Best practices', 'Troubleshooting']}
          />
          <BenefitCard
            icon={<Users className="text-purple-500" />}
            title="Career Advancement"
            description="Accelerate your career with projects that match industry demands"
            items={['Interview talking points', 'Salary negotiation leverage', 'Promotion evidence', 'Networking opportunities']}
          />
        </div>
      </div>

      {/* Getting Started Guide */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">How to Get Started</h2>
        
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"></div>
          
          <div className="space-y-8 pl-10">
            <StepGuide
              number="1"
              title="Choose Your Project"
              description="Select a project matching your skill level and career goals"
              icon={<Target size={20} />}
              color="blue"
            />
            <StepGuide
              number="2"
              title="Set Up Azure Environment"
              description="Create required Azure resources with provided ARM templates"
              icon={<Cloud size={20} />}
              color="green"
            />
            <StepGuide
              number="3"
              title="Follow Implementation Guide"
              description="Step-by-step instructions with code samples and best practices"
              icon={<Code size={20} />}
              color="purple"
            />
            <StepGuide
              number="4"
              title="Deploy and Test"
              description="Deploy solution and validate with provided test cases"
              icon={<Play size={20} />}
              color="orange"
            />
            <StepGuide
              number="5"
              title="Document and Share"
              description="Create project documentation and add to your portfolio"
              icon={<FileText size={20} />}
              color="red"
            />
          </div>
        </div>
      </div>

      {/* Azure Resources Reference */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-3xl p-8 text-white mb-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="lg:w-2/3">
            <h2 className="text-2xl font-bold mb-4">Essential Azure Resources</h2>
            <p className="text-gray-300 mb-6">
              All projects use real Azure services. You'll need an Azure account (free tier available) to get started.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Data Factory', icon: '🧭' },
                { name: 'Databricks', icon: '⚡' },
                { name: 'Synapse', icon: '📊' },
                { name: 'Event Hubs', icon: '📡' },
                { name: 'SQL DB', icon: '🗄️' },
                { name: 'Storage', icon: '💾' },
                { name: 'Functions', icon: '⚙️' },
                { name: 'Key Vault', icon: '🔐' }
              ].map((resource, idx) => (
                <div key={idx} className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
                  <div className="text-2xl mb-2">{resource.icon}</div>
                  <div className="text-sm font-medium">{resource.name}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:w-1/3">
            <div className="bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-4">Ready to Start?</h3>
              <p className="mb-6 text-blue-100">
                Begin with a project matching your current skill level and build up from there.
              </p>
              <button className="w-full px-6 py-3 bg-white text-blue-600 hover:bg-gray-100 rounded-xl font-semibold transition-colors">
                Get Started Guide
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          {[
            {
              question: "Do I need Azure experience to start these projects?",
              answer: "Basic Azure knowledge is helpful but not required. Each project includes setup guides and resource creation steps."
            },
            {
              question: "How much will these projects cost in Azure?",
              answer: "Most projects can be built within Azure Free Tier limits. We provide cost optimization tips to minimize expenses."
            },
            {
              question: "Can I add these projects to my resume?",
              answer: "Absolutely! Each project is designed to be portfolio-worthy with real business value and complex architectures."
            },
            {
              question: "What if I get stuck during implementation?",
              answer: "Projects include troubleshooting guides and common issues. You can also refer to Azure documentation for specific services."
            }
          ].map((faq, idx) => (
            <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-xl p-6">
              <h3 className="font-bold text-gray-800 dark:text-white mb-3 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 font-bold text-sm">Q</span>
                </div>
                {faq.question}
              </h3>
              <div className="ml-8">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                  <p className="text-gray-600 dark:text-gray-400">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Component: Stat Card
function StatCard({ icon, value, label }: { icon: React.ReactNode; value: string | number; label: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center">
      <div className="inline-flex p-2 rounded-lg bg-gray-100 dark:bg-gray-700 mb-3">
        {icon}
      </div>
      <div className="text-2xl font-bold text-gray-800 dark:text-white">{value}</div>
      <div className="text-sm text-gray-600 dark:text-gray-400">{label}</div>
    </div>
  );
}

// Component: Project Card
function ProjectCard({ project, isBookmarked, onToggleBookmark, difficultyColors }: any) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-2xl transition-all duration-300">
      {/* Project Header */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${difficultyColors[project.difficulty as keyof typeof difficultyColors]}`}>
                {project.difficulty}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                {project.category}
              </span>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              {project.title}
            </h3>
          </div>
          
          <button
            onClick={onToggleBookmark}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
            title={isBookmarked ? "Remove bookmark" : "Bookmark project"}
          >
            {isBookmarked ? (
              <Star size={20} className="fill-yellow-400 text-yellow-400" />
            ) : (
              <Star size={20} className="text-gray-400" />
            )}
          </button>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          {project.description}
        </p>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Clock size={14} className="text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{project.time}</span>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500">Duration</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Users size={14} className="text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{project.completionRate}</span>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500">Completion Rate</div>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <TrendingUp size={14} className="text-gray-400" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{project.skills.length}</span>
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-500">Skills</div>
          </div>
        </div>
        
        {/* Skills Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.skills.map((skill: string, idx: number) => (
            <span key={idx} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
              {skill}
            </span>
          ))}
        </div>
        
        {/* Business Value */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Target size={16} className="text-green-600 dark:text-green-400" />
            <h4 className="font-semibold text-green-700 dark:text-green-300">Business Value</h4>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300">{project.businessValue}</p>
        </div>
        
        {/* Expandable Features */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center justify-between w-full p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <span className="font-medium text-gray-700 dark:text-gray-300">
            {expanded ? 'Hide Features' : 'Show Key Features'}
          </span>
          <ChevronRight size={16} className={`transition-transform ${expanded ? 'rotate-90' : ''}`} />
        </button>
        
        {expanded && (
          <div className="mt-4 space-y-3">
            <h4 className="font-semibold text-gray-800 dark:text-white">Key Features:</h4>
            <ul className="space-y-2">
              {project.features.map((feature: string, idx: number) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                  <span className="text-gray-600 dark:text-gray-400">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      {/* Action Buttons */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <button className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl font-semibold transition-all transform hover:scale-105 duration-200 flex items-center justify-center gap-2">
            <Play size={18} />
            Start Project
          </button>
          <button className="px-6 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2">
            <ExternalLink size={18} />
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

// Component: Benefit Card
function BenefitCard({ icon, title, description, items }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  items: string[];
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6">
      <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>
      <ul className="space-y-2">
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Component: Step Guide
function StepGuide({ number, title, description, icon, color }: { 
  number: string; 
  title: string; 
  description: string;
  icon: React.ReactNode;
  color: string;
}) {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400',
    green: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400',
    purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400',
    orange: 'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-400',
    red: 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400'
  };

  return (
    <div className="relative">
      <div className={`absolute -left-14 w-12 h-12 rounded-full ${colorClasses[color as keyof typeof colorClasses]} flex items-center justify-center font-bold text-lg`}>
        {number}
      </div>
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-xl ${colorClasses[color as keyof typeof colorClasses]}`}>
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">{title}</h3>
          <p className="text-gray-600 dark:text-gray-400">{description}</p>
        </div>
      </div>
    </div>
  );
}