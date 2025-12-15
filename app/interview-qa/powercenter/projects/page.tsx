'use client';

import { Database, Zap, Code, Server, Cloud, Users, Target, BarChart, Shield, CheckCircle, Clock, FileText, TrendingUp, Cpu, RefreshCw } from 'lucide-react';
import { useState } from 'react';

export default function InformaticaProjectsPage() {
  const [selectedProject, setSelectedProject] = useState('project1');

  const projects = {
    'project1': {
      id: 'project1',
      title: 'Healthcare Data Integration & HIPAA Compliance',
      category: 'Healthcare',
      difficulty: 'Advanced',
      duration: '10-12 weeks implementation',
      
      // Business Context
      businessContext: {
        problem: 'Healthcare organization with fragmented patient data across 15+ systems (EMR, Lab, Pharmacy, Billing) causing inconsistent patient views and HIPAA compliance risks.',
        objective: 'Create unified patient 360° view with real-time data integration while ensuring HIPAA compliance and data security.',
        stakeholders: ['Chief Medical Officer', 'IT Director', 'Compliance Officer', 'Data Analytics Team']
      },
      
      // Technical Requirements
      requirements: {
        functional: [
          'Real-time patient data integration from Epic EMR, Cerner, Lab systems',
          'HIPAA-compliant data masking for PHI fields',
          'Patient matching across different source systems',
          'Audit trail for all data access and modifications',
          'Data quality validation and error handling',
          'Incremental data loading with CDC'
        ],
        nonFunctional: [
          '99.9% system availability',
          'Data processing within 5 minutes of source update',
          'Support for 10,000+ concurrent users',
          'GDPR and HIPAA compliance',
          'Disaster recovery with RPO < 1 hour'
        ]
      },
      
      // Solution Architecture
      solution: {
        architecture: 'Hybrid cloud architecture using IICS for cloud sources and PowerCenter for on-premise legacy systems',
        components: [
          {
            name: 'Data Ingestion Layer',
            description: 'IICS Cloud Integration Hub for real-time data capture from cloud sources, PowerCenter for on-premise legacy systems'
          },
          {
            name: 'Data Processing Layer',
            description: 'IICS Data Integration for transformations, Data Quality for validation, MDM for patient matching'
          },
          {
            name: 'Data Storage',
            description: 'Snowflake for analytics data, Azure SQL for operational data, Data Lake for raw data'
          },
          {
            name: 'Security Layer',
            description: 'IICS Security Gateway, Azure Key Vault for encryption, Role-based access control'
          }
        ],
        migrationStrategy: 'Phase 1: Cloud sources to IICS, Phase 2: Legacy PowerCenter workflows to IICS, Phase 3: MDM implementation'
      },
      
      // Implementation Details
      implementation: {
        phase1: [
          'Setup IICS organization and configure connectors for cloud sources',
          'Implement real-time data ingestion from Epic EMR cloud instance',
          'Configure data masking rules for PHI fields',
          'Establish audit logging framework'
        ],
        phase2: [
          'Migrate critical PowerCenter workflows to IICS',
          'Implement patient matching algorithm using MDM',
          'Setup data quality validation framework',
          'Configure monitoring and alerting'
        ],
        phase3: [
          'Performance optimization and tuning',
          'User acceptance testing',
          'Production deployment',
          'Knowledge transfer and documentation'
        ]
      },
      
      // Key Metrics
      metrics: [
        { name: 'Data Processing Time', before: '4 hours', after: '15 minutes', improvement: '94%' },
        { name: 'Patient Data Accuracy', before: '82%', after: '99.5%', improvement: '17.5%' },
        { name: 'Compliance Audit Success', before: '85%', after: '100%', improvement: '15%' },
        { name: 'Operational Costs', before: '$250K/month', after: '$150K/month', improvement: '40%' }
      ],
      
      // Skills Required
      skills: ['IICS Cloud Integration', 'PowerCenter Migration', 'HIPAA Compliance', 'Data Security', 'Patient Data Management', 'Snowflake', 'Azure']
    },
    
    'project2': {
      id: 'project2',
      title: 'Banking Customer 360° & AML Monitoring',
      category: 'Banking',
      difficulty: 'Expert',
      duration: '14-16 weeks implementation',
      
      // Business Context
      businessContext: {
        problem: 'Major bank needs unified customer view across 20+ banking systems with real-time AML monitoring to meet regulatory requirements.',
        objective: 'Implement customer data integration platform with real-time transaction monitoring and AML compliance.',
        stakeholders: ['Chief Risk Officer', 'Head of Compliance', 'Customer Experience Director', 'IT Security Team']
      },
      
      // Technical Requirements
      requirements: {
        functional: [
          'Real-time customer data integration from core banking, CRM, and transaction systems',
          'AML transaction monitoring with pattern detection',
          'Customer risk scoring and segmentation',
          'Regulatory reporting automation',
          'Data lineage and audit trails',
          'GDPR compliance for customer data'
        ],
        nonFunctional: [
          'Real-time processing < 2 seconds',
          '24/7 system availability',
          'Handle 1M+ transactions daily',
          'Data encryption at rest and in transit',
          'Multi-region deployment for disaster recovery'
        ]
      },
      
      // Solution Architecture
      solution: {
        architecture: 'Event-driven architecture with IICS for batch processing and Kafka for real-time streams',
        components: [
          {
            name: 'Real-time Ingestion',
            description: 'Kafka for transaction streams, IICS for batch customer data integration'
          },
          {
            name: 'AML Processing Engine',
            description: 'Custom ML models for anomaly detection, IICS for data enrichment'
          },
          {
            name: 'Customer Data Hub',
            description: 'IICS MDM for golden record management, Data Quality for validation'
          },
          {
            name: 'Compliance Reporting',
            description: 'Automated regulatory reports, Audit trail management'
          }
        ],
        migrationStrategy: 'Parallel run of legacy and new systems for 3 months, Gradual cutover by business unit'
      },
      
      // Implementation Details
      implementation: {
        phase1: [
          'Setup IICS with banking connectors',
          'Implement customer data integration from core banking systems',
          'Configure data quality rules for customer validation',
          'Establish data governance framework'
        ],
        phase2: [
          'Implement real-time transaction monitoring',
          'Configure AML rule engine',
          'Setup alerting and case management',
          'Implement regulatory reporting'
        ],
        phase3: [
          'Performance testing and optimization',
          'Security penetration testing',
          'Regulatory compliance validation',
          'Production deployment and monitoring'
        ]
      },
      
      // Key Metrics
      metrics: [
        { name: 'False Positive Rate', before: '45%', after: '15%', improvement: '67%' },
        { name: 'Detection Time', before: '48 hours', after: '2 hours', improvement: '96%' },
        { name: 'Regulatory Fines', before: '$5M/year', after: '$500K/year', improvement: '90%' },
        { name: 'Customer Onboarding', before: '5 days', after: '2 hours', improvement: '98%' }
      ],
      
      // Skills Required
      skills: ['IICS Real-time Integration', 'AML Compliance', 'Kafka', 'Machine Learning', 'Data Governance', 'Banking Systems', 'GDPR']
    },
    
    'project3': {
      id: 'project3',
      title: 'Enterprise PowerCenter to IICS Migration',
      category: 'Migration',
      difficulty: 'Expert',
      duration: '20-24 weeks implementation',
      
      // Business Context
      businessContext: {
        problem: 'Fortune 500 company with 500+ PowerCenter workflows needs to migrate to cloud for scalability and cost reduction.',
        objective: 'Migrate entire ETL landscape from PowerCenter to IICS while maintaining business continuity.',
        stakeholders: ['CIO', 'Enterprise Architect', 'Application Owners', 'Business Analysts']
      },
      
      // Technical Requirements
      requirements: {
        functional: [
          'Migrate 500+ PowerCenter workflows with zero downtime',
          'Maintain data quality and consistency',
          'Performance equal or better than current system',
          'Automated testing and validation framework',
          'Rollback capability for each migration wave',
          'Knowledge transfer to operations team'
        ],
        nonFunctional: [
          'Zero data loss during migration',
          'Performance SLA maintenance',
          'Cost optimization in cloud',
          'Security compliance maintenance',
          'Monitoring and alerting parity'
        ]
      },
      
      // Solution Architecture
      solution: {
        architecture: 'Hybrid approach with parallel run, IICS for new development, gradual PowerCenter decommissioning',
        components: [
          {
            name: 'Migration Assessment',
            description: 'Workflow analysis tool, Complexity scoring, Migration prioritization'
          },
          {
            name: 'Migration Automation',
            description: 'Automated code conversion, Test case generation, Validation framework'
          },
          {
            name: 'Parallel Run Environment',
            description: 'Data comparison tools, Performance monitoring, Cutover planning'
          },
          {
            name: 'Post-Migration Optimization',
            description: 'Cloud cost optimization, Performance tuning, Monitoring setup'
          }
        ],
        migrationStrategy: 'Wave-based migration (50 workflows per wave), Business unit prioritization, 4-week parallel run per wave'
      },
      
      // Implementation Details
      implementation: {
        phase1: [
          'Assessment and inventory of all PowerCenter workflows',
          'Complexity analysis and migration planning',
          'Environment setup in IICS',
          'Proof of concept for complex workflows'
        ],
        phase2: [
          'Wave 1: Simple workflows migration',
          'Parallel run and validation',
          'Performance benchmarking',
          'Knowledge transfer sessions'
        ],
        phase3: [
          'Wave 2-5: Complex workflows migration',
          'Optimization and tuning',
          'Decommissioning planning',
          'Production handover'
        ]
      },
      
      // Key Metrics
      metrics: [
        { name: 'Migration Success Rate', target: '99.5%', achieved: '99.8%', status: 'Exceeded' },
        { name: 'Performance Improvement', target: '20%', achieved: '35%', status: 'Exceeded' },
        { name: 'Cost Reduction', target: '40%', achieved: '55%', status: 'Exceeded' },
        { name: 'Business Disruption', target: 'Zero', achieved: 'Zero', status: 'Achieved' }
      ],
      
      // Skills Required
      skills: ['PowerCenter Architecture', 'IICS Migration', 'Cloud Cost Optimization', 'Performance Tuning', 'Change Management', 'Testing Automation', 'Data Validation']
    }
  };

  const project = projects[selectedProject as keyof typeof projects];

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-medium mb-6">
          <Database size={16} />
          Informatica Project Details
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Enterprise Implementation Projects
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Detailed project specifications, requirements, and implementation strategies for Informatica solutions
        </p>
      </div>

      {/* Project Selection */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Select Project</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.values(projects).map((proj) => (
            <button
              key={proj.id}
              onClick={() => setSelectedProject(proj.id)}
              className={`p-4 rounded-xl text-left transition-all ${
                selectedProject === proj.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-xl'
                  : 'bg-white dark:bg-gray-800 hover:shadow-lg'
              }`}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className={`p-2 rounded-lg ${
                  selectedProject === proj.id
                    ? 'bg-white/20'
                    : proj.category === 'Healthcare' ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400' :
                      proj.category === 'Banking' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400' :
                      'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-400'
                }`}>
                  {proj.category === 'Healthcare' ? <Shield size={20} /> :
                   proj.category === 'Banking' ? <BarChart size={20} /> :
                   <RefreshCw size={20} />}
                </div>
                <div>
                  <div className={`text-sm font-medium ${
                    selectedProject === proj.id ? 'text-white/90' : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {proj.category}
                  </div>
                  <div className="text-xs px-2 py-0.5 bg-white/20 dark:bg-gray-700 rounded-full inline-block mt-1">
                    {proj.difficulty}
                  </div>
                </div>
              </div>
              <h3 className={`font-bold ${
                selectedProject === proj.id ? 'text-white' : 'text-gray-800 dark:text-white'
              }`}>
                {proj.title}
              </h3>
              <div className="flex items-center gap-2 mt-2 text-sm">
                <Clock size={14} className={selectedProject === proj.id ? 'text-white/80' : 'text-gray-400'} />
                <span className={selectedProject === proj.id ? 'text-white/80' : 'text-gray-600 dark:text-gray-400'}>
                  {proj.duration}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Project Details */}
      <div className="space-y-8">
        {/* Business Context */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400">
              <Target size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Business Context</h2>
              <p className="text-gray-600 dark:text-gray-400">Understanding the business problem and objectives</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Business Problem</h3>
              <p className="text-gray-600 dark:text-gray-400">{project.businessContext.problem}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Project Objective</h3>
              <p className="text-gray-600 dark:text-gray-400">{project.businessContext.objective}</p>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">Key Stakeholders</h3>
            <div className="flex flex-wrap gap-2">
              {project.businessContext.stakeholders.map((stakeholder, idx) => (
                <span key={idx} className="px-3 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg">
                  {stakeholder}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Technical Requirements */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400">
              <FileText size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Technical Requirements</h2>
              <p className="text-gray-600 dark:text-gray-400">Detailed functional and non-functional requirements</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                <CheckCircle size={18} className="text-green-500" />
                Functional Requirements
              </h3>
              <ul className="space-y-3">
                {project.requirements.functional.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                    <span className="text-gray-600 dark:text-gray-400">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                <Zap size={18} className="text-blue-500" />
                Non-Functional Requirements
              </h3>
              <ul className="space-y-3">
                {project.requirements.nonFunctional.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                    <span className="text-gray-600 dark:text-gray-400">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Solution Architecture */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400">
              <Server size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Solution Architecture</h2>
              <p className="text-gray-600 dark:text-gray-400">Technical design and implementation approach</p>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Architecture Overview</h3>
            <p className="text-gray-600 dark:text-gray-400">{project.solution.architecture}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {project.solution.components.map((component, idx) => (
              <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-2">{component.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">{component.description}</p>
              </div>
            ))}
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Migration Strategy</h3>
            <p className="text-gray-600 dark:text-gray-400">{project.solution.migrationStrategy}</p>
          </div>
        </div>

        {/* Implementation Phases */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400">
              <Code size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Implementation Phases</h2>
              <p className="text-gray-600 dark:text-gray-400">Detailed project execution plan</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <span className="text-blue-600 dark:text-blue-400 font-bold">1</span>
                </div>
                Phase 1: Foundation
              </h3>
              <ul className="space-y-2">
                {project.implementation.phase1.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></div>
                    <span className="text-gray-600 dark:text-gray-400">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                  <span className="text-green-600 dark:text-green-400 font-bold">2</span>
                </div>
                Phase 2: Implementation
              </h3>
              <ul className="space-y-2">
                {project.implementation.phase2.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 flex-shrink-0"></div>
                    <span className="text-gray-600 dark:text-gray-400">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4 flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                  <span className="text-purple-600 dark:text-purple-400 font-bold">3</span>
                </div>
                Phase 3: Deployment
              </h3>
              <ul className="space-y-2">
                {project.implementation.phase3.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-1.5 flex-shrink-0"></div>
                    <span className="text-gray-600 dark:text-gray-400">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400">
              <TrendingUp size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Key Performance Metrics</h2>
              <p className="text-gray-600 dark:text-gray-400">Measurable outcomes and improvements</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {project.metrics.map((metric, idx) => (
              <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                <h4 className="font-semibold text-gray-800 dark:text-white mb-3">{metric.name}</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-500">Before:</span>
                    <span className="font-medium text-gray-700 dark:text-gray-300">{metric.before}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 dark:text-gray-500">After:</span>
                    <span className="font-medium text-green-600 dark:text-green-400">{metric.after}</span>
                  </div>
                  {'improvement' in metric && (
                    <div className="mt-2 px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 rounded-full text-sm font-medium text-center">
                      {metric.improvement} improvement
                    </div>
                  )}
                  {'status' in metric && (
                    <div className={`mt-2 px-3 py-1 rounded-full text-sm font-medium text-center ${
                      metric.status === 'Exceeded' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                    }`}>
                      {metric.status}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Required */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400">
              <Users size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Required Skills & Expertise</h2>
              <p className="text-gray-600 dark:text-gray-400">Technical competencies needed for successful implementation</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {project.skills.map((skill, idx) => (
              <div key={idx} className="px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 text-blue-700 dark:text-blue-300 rounded-lg font-medium">
                {skill}
              </div>
            ))}
          </div>
        </div>

        {/* Project Summary */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Project Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Complexity Level</h3>
              <div className={`px-3 py-1 rounded-full inline-block ${
                project.difficulty === 'Advanced' 
                  ? 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300'
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
              }`}>
                {project.difficulty}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Estimated Duration</h3>
              <div className="flex items-center gap-2 text-gray-800 dark:text-white">
                <Clock size={18} />
                <span>{project.duration}</span>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Team Size Required</h3>
              <div className="flex items-center gap-2 text-gray-800 dark:text-white">
                <Users size={18} />
                <span>{project.difficulty === 'Advanced' ? '5-7 members' : '7-10 members'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}