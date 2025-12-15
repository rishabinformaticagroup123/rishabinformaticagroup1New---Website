"use client";

import { useState } from 'react';

// Types for all projects
type Project = {
  id: number;
  title: string;
  technology: 'Informatica' | 'IICS' | 'Azure' | 'Snowflake' | 'Next.js' | 'Performance';
  sector: 'Banking' | 'Healthcare' | 'Retail' | 'E-commerce' | 'Insurance' | 'Manufacturing';
  client: string;
  duration: string;
  complexity: 'Beginner' | 'Intermediate' | 'Advanced';
  description: string;
  tools: string[];
  challenges: string[];
  solutions: string[];
  results: string[];
};

export default function AllProjectsPage() {
  const [selectedTechnology, setSelectedTechnology] = useState<string>('all');
  const [selectedSector, setSelectedSector] = useState<string>('all');

  // SAMPLE DATA FOR ALL TECHNOLOGIES
  const allProjects: Project[] = [
    // ========== INFORMATICA POWERCENTER ==========
    {
      id: 1,
      title: "Banking Data Migration & Modernization",
      technology: 'Informatica',
      sector: 'Banking',
      client: "Leading Multinational Bank",
      duration: "4 Months",
      complexity: "Advanced",
      description: "Migrated 15TB of legacy banking data from on-premise Oracle to cloud with zero downtime",
      tools: ["PowerCenter", "Oracle", "PL/SQL", "Unix Shell Scripting"],
      challenges: [
        "Zero downtime migration requirement",
        "Complex banking data validation rules",
        "GDPR compliance implementation"
      ],
      solutions: [
        "Implemented Change Data Capture (CDC)",
        "Built automated reconciliation framework",
        "Created data quality metrics dashboard"
      ],
      results: [
        "Zero downtime achieved",
        "99.99% data accuracy maintained",
        "Query performance improved by 300%"
      ]
    },

    // ========== INFORMATICA IICS ==========
    {
      id: 2,
      title: "Healthcare ETL Pipeline Modernization",
      technology: 'IICS',
      sector: 'Healthcare',
      client: "National Healthcare Provider",
      duration: "3 Months",
      complexity: "Intermediate",
      description: "Built HIPAA compliant ETL pipeline for patient data integration across hospital systems",
      tools: ["IICS", "REST APIs", "HL7", "Azure SQL"],
      challenges: [
        "HIPAA compliance requirements",
        "Multiple legacy system integration",
        "Real-time data synchronization needs"
      ],
      solutions: [
        "Implemented secure data masking in IICS",
        "Built REST API connectors for legacy systems",
        "Created real-time monitoring dashboard"
      ],
      results: [
        "HIPAA compliance certified",
        "Real-time data availability achieved",
        "Manual data entry reduced by 85%"
      ]
    },

    // ========== AZURE DATA ENGINEERING ==========
    {
      id: 3,
      title: "Retail Analytics & Recommendation Engine",
      technology: 'Azure',
      sector: 'Retail',
      client: "Global Retail Chain",
      duration: "5 Months",
      complexity: "Advanced",
      description: "Built real-time customer analytics platform with personalized recommendations",
      tools: ["Azure Data Factory", "Databricks", "Synapse", "Power BI"],
      challenges: [
        "Processing 10M+ daily transactions",
        "Real-time personalization requirements",
        "Scaling for holiday season spikes"
      ],
      solutions: [
        "Implemented Azure Data Factory pipelines",
        "Built Spark jobs in Databricks for real-time processing",
        "Created auto-scaling architecture"
      ],
      results: [
        "Personalized recommendations increased sales by 23%",
        "Real-time analytics with <1 second latency",
        "Handled Black Friday 5x traffic spike"
      ]
    },

    // ========== SNOWFLAKE ==========
    {
      id: 4,
      title: "E-commerce Data Warehouse & Analytics",
      technology: 'Snowflake',
      sector: 'E-commerce',
      client: "Online Marketplace",
      duration: "2 Months",
      complexity: "Intermediate",
      description: "Built cloud data warehouse for customer behavior analysis and sales forecasting",
      tools: ["Snowflake", "dbt", "Fivetran", "Tableau"],
      challenges: [
        "Multiple data source integration (web, mobile, POS)",
        "Near real-time reporting requirements",
        "Cost optimization for variable workloads"
      ],
      solutions: [
        "Implemented Snowflake multi-cluster warehouse",
        "Used dbt for data transformation layer",
        "Created auto-suspend policies for cost savings"
      ],
      results: [
        "Query performance 10x faster than previous system",
        "35% reduction in infrastructure costs",
        "Real-time dashboards for business teams"
      ]
    },

    // ========== NEXT.JS ==========
    {
      id: 5,
      title: "Insurance Policy Management Portal",
      technology: 'Next.js',
      sector: 'Insurance',
      client: "Insurance Provider",
      duration: "3 Months",
      complexity: "Intermediate",
      description: "Built modern policy management portal with real-time document processing",
      tools: ["Next.js 14", "TypeScript", "Tailwind CSS", "Node.js", "MongoDB"],
      challenges: [
        "Complex form validation for insurance policies",
        "Real-time document upload and processing",
        "Mobile-responsive design requirements"
      ],
      solutions: [
        "Implemented server-side rendering for performance",
        "Built real-time file processing with WebSockets",
        "Created reusable component library"
      ],
      results: [
        "Page load time reduced from 4s to 0.8s",
        "Mobile adoption increased by 40%",
        "Customer satisfaction score: 4.8/5"
      ]
    },

    // ========== PERFORMANCE ENGINEERING ==========
    {
      id: 6,
      title: "Banking Application Load Testing",
      technology: 'Performance',
      sector: 'Banking',
      client: "Digital Banking Platform",
      duration: "2 Months",
      complexity: "Advanced",
      description: "Performance testing and optimization for mobile banking application",
      tools: ["JMeter", "LoadRunner", "Dynatrace", "Azure Load Testing"],
      challenges: [
        "Handle 100K concurrent users during peak hours",
        "Identify performance bottlenecks in microservices",
        "Ensure <2 second response time for critical transactions"
      ],
      solutions: [
        "Created realistic load testing scenarios",
        "Implemented distributed load testing architecture",
        "Performed root cause analysis with APM tools"
      ],
      results: [
        "Application scaled to handle 150K concurrent users",
        "Response time improved by 65%",
        "Zero downtime during peak traffic"
      ]
    },

    // Add 10+ more projects following same format...
  ];

  // Filter logic
  const filteredProjects = allProjects.filter(project => {
    const techMatch = selectedTechnology === 'all' || project.technology === selectedTechnology;
    const sectorMatch = selectedSector === 'all' || project.sector === selectedSector;
    return techMatch && sectorMatch;
  });

  // Get unique values for filters
  const technologies = ['all', ...new Set(allProjects.map(p => p.technology))];
  const sectors = ['all', ...new Set(allProjects.map(p => p.sector))];

  // Technology colors mapping
  const techColors = {
    'Informatica': 'bg-blue-100 text-blue-800 border-blue-200',
    'IICS': 'bg-cyan-100 text-cyan-800 border-cyan-200',
    'Azure': 'bg-sky-100 text-sky-800 border-sky-200',
    'Snowflake': 'bg-teal-100 text-teal-800 border-teal-200',
    'Next.js': 'bg-gray-100 text-gray-800 border-gray-200',
    'Performance': 'bg-orange-100 text-orange-800 border-orange-200',
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">Industry Projects Portfolio</h1>
          <p className="text-xl text-blue-100">
            Real-world implementations across multiple technologies and sectors
          </p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Technology Filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Filter by Technology
              </label>
              <div className="flex flex-wrap gap-2">
                {technologies.map((tech) => (
                  <button
                    key={tech}
                    onClick={() => setSelectedTechnology(tech)}
                    className={`px-4 py-2 rounded-full border ${selectedTechnology === tech ? 
                      'bg-blue-600 text-white border-blue-600' : 
                      'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'}`}
                  >
                    {tech === 'all' ? 'All Technologies' : tech}
                  </button>
                ))}
              </div>
            </div>

            {/* Sector Filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Filter by Industry Sector
              </label>
              <div className="flex flex-wrap gap-2">
                {sectors.map((sector) => (
                  <button
                    key={sector}
                    onClick={() => setSelectedSector(sector)}
                    className={`px-4 py-2 rounded-full border ${selectedSector === sector ? 
                      'bg-green-600 text-white border-green-600' : 
                      'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'}`}
                  >
                    {sector === 'all' ? 'All Sectors' : sector}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Projects Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-bold">{filteredProjects.length}</span> projects
            {selectedTechnology !== 'all' && ` in ${selectedTechnology}`}
            {selectedSector !== 'all' && ` for ${selectedSector} sector`}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="space-y-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
              {/* Project Header with Tech & Sector */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${techColors[project.technology]}`}>
                        {project.technology}
                      </span>
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full border border-green-200">
                        {project.sector}
                      </span>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full">
                        {project.complexity}
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">{project.title}</h2>
                    <div className="flex items-center text-gray-600 mt-2">
                      <span className="mr-4">Client: {project.client}</span>
                      <span>Duration: {project.duration}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Body */}
              <div className="p-6">
                {/* Description */}
                <p className="text-gray-700 mb-6 text-lg">{project.description}</p>

                {/* 3-Column Layout: Tools, Challenges, Solutions */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {/* Tools Used */}
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3 flex items-center">
                      <span className="text-blue-500 mr-2">🛠️</span> Tools & Technologies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tools.map((tool, idx) => (
                        <span key={idx} className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Challenges */}
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3 flex items-center">
                      <span className="text-red-500 mr-2">⚠️</span> Challenges Faced
                    </h3>
                    <ul className="space-y-2">
                      {project.challenges.map((challenge, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-red-400 mr-2">•</span>
                          <span className="text-gray-700">{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Solutions */}
                  <div>
                    <h3 className="font-bold text-gray-900 mb-3 flex items-center">
                      <span className="text-green-500 mr-2">✅</span> Solutions Implemented
                    </h3>
                    <ul className="space-y-2">
                      {project.solutions.map((solution, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-green-400 mr-2">•</span>
                          <span className="text-gray-700">{solution}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Results Section */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-lg">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                    <span className="text-purple-500 mr-2">📊</span> Business Results & Impact
                  </h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    {project.results.map((result, idx) => (
                      <div key={idx} className="bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                          <span className="text-gray-800">{result}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-600">
                    Project ID: #{project.id.toString().padStart(3, '0')}
                  </div>
                  <div className="flex gap-4">
                    <button className="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700">
                      Download Case Study (PDF)
                    </button>
                    <button className="px-5 py-2 border border-blue-600 text-blue-600 font-medium rounded-lg hover:bg-blue-50">
                      Request Implementation Demo
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Statistics */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Portfolio Summary</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{allProjects.length}</div>
              <div className="text-gray-600">Total Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">{new Set(allProjects.map(p => p.sector)).size}</div>
              <div className="text-gray-600">Industry Sectors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{new Set(allProjects.map(p => p.technology)).size}</div>
              <div className="text-gray-600">Technologies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">{allProjects.filter(p => p.complexity === 'Advanced').length}</div>
              <div className="text-gray-600">Advanced Projects</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}