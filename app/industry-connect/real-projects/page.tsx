"use client";

import { useState } from 'react';

type Project = {
  id: number;
  title: string;
  technology: 'Informatica PowerCenter' | 'Informatica IICS' | 'Snowflake' | 'Azure' | 'Performance Engineering' | 'Next.js';
  sector: 'Banking' | 'Healthcare' | 'Retail';
  projectType: 'Migration' | 'Modernization' | 'New Implementation' | 'Performance Optimization' | 'Application Development';
  duration: string;
  teamSize: string;
  challengeSummary: string;
  whyProjectStarted: string[];
  detailedChallenges: { challenge: string; impact: string }[];
  solutions: { solution: string; toolsUsed: string; reason: string }[];
  architecture: { source: string; processing: string; target: string; reason: string }[];
  migrationReason: string | null;
  toolsUsed: { category: string; tools: string[]; purpose: string }[];
  businessResults: string[];
  lessonsLearned: string[];
  studentTakeaways: string[];
};

export default function ComprehensiveProjectsPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');

  // COMPREHENSIVE REAL-WORLD PROJECTS DATA
  const allProjects: Project[] = [
    // ==================== INFORMATICA POWERCENTER PROJECTS ====================
    {
      id: 1,
      title: "Legacy Banking System Modernization - ETL Migration Project",
      technology: 'Informatica PowerCenter',
      sector: 'Banking',
      projectType: 'Migration',
      duration: '6 Months',
      teamSize: '8 Members (2 Architects, 4 Developers, 2 Testers)',
      challengeSummary: "Bank was using manual Excel-based reporting causing 3-day delay in financial reporting. Needed automated ETL system.",
      whyProjectStarted: [
        "Manual Excel processes taking 3 days for monthly financial reports",
        "Data accuracy issues leading to regulatory compliance risks",
        "Unable to handle increasing transaction volume (5M transactions/day)",
        "No audit trail for data transformations"
      ],
      detailedChallenges: [
        { 
          challenge: "Manual Excel Processes", 
          impact: "3-day delay in financial reporting, 15% error rate in calculations" 
        },
        { 
          challenge: "Multiple Data Sources", 
          impact: "15 different legacy systems with incompatible formats" 
        },
        { 
          challenge: "Regulatory Compliance", 
          impact: "RBI audits failing due to data inconsistency" 
        },
        { 
          challenge: "Performance Issues", 
          impact: "End-of-day batch jobs taking 8+ hours" 
        }
      ],
      solutions: [
        { 
          solution: "Implemented Informatica PowerCenter as ETL tool", 
          toolsUsed: "Informatica PowerCenter 10.2", 
          reason: "Chosen for its robust transformation capabilities, scheduler, and banking industry experience" 
        },
        { 
          solution: "Created automated data pipeline", 
          toolsUsed: "Oracle as Source, SQL Server as Target", 
          reason: "Oracle had existing banking data, SQL Server for reporting layer" 
        },
        { 
          solution: "Built audit framework", 
          toolsUsed: "Custom logging tables + PowerCenter metadata", 
          reason: "To track every data movement for compliance" 
        }
      ],
      architecture: [
        { 
          source: "Oracle Database (Core Banking)", 
          processing: "Informatica PowerCenter ETL", 
          target: "SQL Server Data Warehouse", 
          reason: "Oracle for transaction processing, PowerCenter for transformation, SQL Server for analytics" 
        }
      ],
      migrationReason: null,
      toolsUsed: [
        { 
          category: "ETL Tool", 
          tools: ["Informatica PowerCenter 10.2"], 
          purpose: "Extract from Oracle, Transform data, Load to SQL Server" 
        },
        { 
          category: "Source Database", 
          tools: ["Oracle 12c"], 
          purpose: "Core banking transaction data" 
        },
        { 
          category: "Target Database", 
          tools: ["SQL Server 2019"], 
          purpose: "Data warehouse for reporting" 
        },
        { 
          category: "Scheduling", 
          tools: ["PowerCenter Workflow Manager"], 
          purpose: "Automated job scheduling" 
        },
        { 
          category: "Monitoring", 
          tools: ["PowerCenter Monitor", "Custom Alerts"], 
          purpose: "Track ETL job status and performance" 
        }
      ],
      businessResults: [
        "Financial reporting time reduced from 3 days to 2 hours",
        "Data accuracy improved from 85% to 99.9%",
        "Saved 200+ manual hours per month",
        "Successfully passed RBI audit with zero findings",
        "Batch processing time reduced from 8 hours to 1.5 hours"
      ],
      lessonsLearned: [
        "Proper source system analysis is critical before ETL design",
        "Banking transformations require extensive validation rules",
        "Performance tuning in PowerCenter needs proper indexing strategy",
        "Audit trails are mandatory for financial systems"
      ],
      studentTakeaways: [
        "How to design ETL architecture for banking",
        "Real PowerCenter transformations for financial data",
        "Performance optimization techniques",
        "Compliance requirements in banking ETL"
      ]
    },

    {
      id: 2,
      title: "Healthcare Patient Data Integration - HL7 Compliance Project",
      technology: 'Informatica PowerCenter',
      sector: 'Healthcare',
      projectType: 'New Implementation',
      duration: '4 Months',
      teamSize: '6 Members',
      challengeSummary: "Hospital had patient data in 8 different systems, needed unified view for doctors.",
      whyProjectStarted: [
        "Doctors spending 30 minutes per patient gathering data from different systems",
        "Critical patient information scattered across systems",
        "HIPAA compliance violations due to data inconsistency",
        "No real-time patient history available during emergencies"
      ],
      detailedChallenges: [
        { 
          challenge: "Multiple Data Formats", 
          impact: "HL7, CSV, XML, JSON - all needing standardization" 
        },
        { 
          challenge: "Real-time Data Requirement", 
          impact: "Doctors needed latest patient data during consultations" 
        },
        { 
          challenge: "Data Privacy (HIPAA)", 
          impact: "Patient data needed masking/encryption" 
        },
        { 
          challenge: "System Downtime Constraints", 
          impact: "Hospital systems couldn't be taken offline" 
        }
      ],
      solutions: [
        { 
          solution: "Implemented real-time CDC with PowerExchange", 
          toolsUsed: "Informatica PowerExchange for CDC", 
          reason: "Capture real-time changes without affecting source systems" 
        },
        { 
          solution: "Built HL7 message processing", 
          toolsUsed: "PowerCenter with custom HL7 parser", 
          reason: "Healthcare industry standard for patient data exchange" 
        },
        { 
          solution: "Implemented data masking", 
          toolsUsed: "PowerCenter Data Masking transformation", 
          reason: "HIPAA requirement for patient privacy" 
        }
      ],
      architecture: [
        { 
          source: "Hospital Systems (EPIC, Cerner)", 
          processing: "PowerCenter with CDC", 
          target: "Unified Patient Database", 
          reason: "Real-time integration of patient data" 
        }
      ],
      migrationReason: null,
      toolsUsed: [
        { 
          category: "ETL Tool", 
          tools: ["Informatica PowerCenter 10.5"], 
          purpose: "Main ETL processing engine" 
        },
        { 
          category: "CDC Tool", 
          tools: ["Informatica PowerExchange"], 
          purpose: "Real-time change data capture" 
        },
        { 
          category: "Healthcare Standards", 
          tools: ["HL7 Message Parser"], 
          purpose: "Process healthcare industry messages" 
        },
        { 
          category: "Security", 
          tools: ["Data Masking Transformation"], 
          purpose: "HIPAA compliance for patient data" 
        }
      ],
      businessResults: [
        "Doctor preparation time reduced from 30 to 5 minutes per patient",
        "Unified patient view achieved across all departments",
        "100% HIPAA compliance maintained",
        "Real-time data availability during emergencies",
        "Improved patient care quality"
      ],
      lessonsLearned: [
        "Healthcare data requires strict validation",
        "Real-time CDC is critical for patient systems",
        "HL7 standards knowledge is essential",
        "Data privacy cannot be compromised"
      ],
      studentTakeaways: [
        "Healthcare ETL architecture design",
        "HL7 message processing in PowerCenter",
        "Real-time CDC implementation",
        "Data masking for compliance"
      ]
    },

    // ==================== INFORMATICA IICS MIGRATION PROJECTS ====================
    {
      id: 3,
      title: "Bank PowerCenter to IICS Cloud Migration - Digital Transformation",
      technology: 'Informatica IICS',
      sector: 'Banking',
      projectType: 'Migration',
      duration: '5 Months',
      teamSize: '10 Members',
      challengeSummary: "Bank wanted to move from on-premise PowerCenter to cloud IICS for better scalability.",
      whyProjectStarted: [
        "On-premise infrastructure maintenance costs increasing 20% annually",
        "Difficulty scaling for seasonal banking loads (festival seasons)",
        "Long deployment cycles (2 weeks for changes)",
        "Hardware refresh needed - expensive CAPEX"
      ],
      detailedChallenges: [
        { 
          challenge: "Complex PowerCenter Mappings", 
          impact: "500+ complex mappings with dependencies" 
        },
        { 
          challenge: "Database Compatibility", 
          impact: "On-premise Oracle to Cloud Snowflake migration" 
        },
        { 
          challenge: "Performance Tuning", 
          impact: "Cloud performance characteristics different from on-premise" 
        },
        { 
          challenge: "Security Compliance", 
          impact: "Banking data security requirements in cloud" 
        }
      ],
      solutions: [
        { 
          solution: "Used IICS Migration Utility", 
          toolsUsed: "Informatica IICS Migration Tool", 
          reason: "Automated migration of PowerCenter objects to IICS" 
        },
        { 
          solution: "Implemented Cloud Data Warehouse", 
          toolsUsed: "Snowflake as Target", 
          reason: "Cloud-native, scalable, pay-per-use model" 
        },
        { 
          solution: "Redesigned for Cloud Optimization", 
          toolsUsed: "IICS Data Integration", 
          reason: "Leverage cloud parallel processing capabilities" 
        }
      ],
      architecture: [
        { 
          source: "On-premise Oracle Database", 
          processing: "IICS Cloud Data Integration", 
          target: "Snowflake Cloud Data Warehouse", 
          reason: "Move from CAPEX to OPEX model, better scalability" 
        }
      ],
      migrationReason: "WHY MOVE FROM POWERCENTER TO IICS: 1) Reduce infrastructure costs 2) Automatic scaling 3) Faster deployment 4) Cloud-native features 5) Better disaster recovery",
      toolsUsed: [
        { 
          category: "Source System", 
          tools: ["Oracle Database 19c"], 
          purpose: "Legacy banking data on-premise" 
        },
        { 
          category: "Cloud ETL", 
          tools: ["Informatica Intelligent Cloud Services"], 
          purpose: "Cloud-based ETL with auto-scaling" 
        },
        { 
          category: "Target Cloud DW", 
          tools: ["Snowflake"], 
          purpose: "Cloud data warehouse with instant scaling" 
        },
        { 
          category: "Migration", 
          tools: ["IICS Migration Utility", "Custom Validation Scripts"], 
          purpose: "Migrate and validate 500+ mappings" 
        }
      ],
      businessResults: [
        "Infrastructure costs reduced by 40%",
        "Deployment time reduced from 2 weeks to 2 days",
        "Scales automatically during festival seasons",
        "Improved performance by 60%",
        "Disaster recovery improved from 24 hours to 30 minutes"
      ],
      lessonsLearned: [
        "Cloud migration requires re-architecture, not just lift-and-shift",
        "Performance optimization different in cloud",
        "Security configuration critical in cloud",
        "Cost monitoring important in pay-per-use model"
      ],
      studentTakeaways: [
        "PowerCenter to IICS migration process",
        "Cloud ETL architecture design",
        "Snowflake integration with IICS",
        "Cloud cost optimization techniques"
      ]
    },

    // ==================== SNOWFLAKE PROJECTS ====================
    {
      id: 4,
      title: "Retail Analytics Platform - SQL Server to Snowflake Migration",
      technology: 'Snowflake',
      sector: 'Retail',
      projectType: 'Migration',
      duration: '3 Months',
      teamSize: '7 Members',
      challengeSummary: "Retail chain with 500 stores needed real-time analytics but SQL Server couldn't scale.",
      whyProjectStarted: [
        "SQL Server hitting performance limits with 2TB data",
        "Black Friday sales causing system crashes",
        "Analytics queries taking hours to run",
        "Multiple data silos (online, in-store, mobile)"
      ],
      detailedChallenges: [
        { 
          challenge: "Performance Bottlenecks", 
          impact: "Daily sales reports taking 4+ hours to generate" 
        },
        { 
          challenge: "Data Silos", 
          impact: "Online, in-store, mobile data in separate systems" 
        },
        { 
          challenge: "Seasonal Scaling", 
          impact: "Black Friday traffic 10x normal load" 
        },
        { 
          challenge: "Real-time Analytics", 
          impact: "Managers needed current hour sales data" 
        }
      ],
      solutions: [
        { 
          solution: "Migrated to Snowflake Cloud DW", 
          toolsUsed: "Snowflake Enterprise Edition", 
          reason: "Separate compute and storage, instant scaling" 
        },
        { 
          solution: "Implemented ELT instead of ETL", 
          toolsUsed: "Snowflake + dbt (Data Build Tool)", 
          reason: "Leverage Snowflake's compute power for transformations" 
        },
        { 
          solution: "Created Zero-Copy Cloning", 
          toolsUsed: "Snowflake Clone feature", 
          reason: "Create dev/test environments instantly without extra storage" 
        }
      ],
      architecture: [
        { 
          source: "SQL Server (on-premise)", 
          processing: "Azure Data Factory for ingestion", 
          target: "Snowflake Cloud Data Warehouse", 
          reason: "SQL Server for transactions, ADF for pipeline, Snowflake for analytics" 
        }
      ],
      migrationReason: "WHY MOVE FROM SQL SERVER TO SNOWFLAKE: 1) Handle 10x seasonal load 2) Real-time analytics 3) Cost-effective scaling 4) Zero maintenance 5) Data sharing capabilities",
      toolsUsed: [
        { 
          category: "Source Database", 
          tools: ["SQL Server 2017"], 
          purpose: "Transactional sales data from stores" 
        },
        { 
          category: "Ingestion", 
          tools: ["Azure Data Factory"], 
          purpose: "Pipeline to load data to Snowflake" 
        },
        { 
          category: "Cloud Data Warehouse", 
          tools: ["Snowflake"], 
          purpose: "Analytics and reporting layer" 
        },
        { 
          category: "Transformation", 
          tools: ["dbt (Data Build Tool)"], 
          purpose: "ELT transformations within Snowflake" 
        },
        { 
          category: "BI Tool", 
          tools: ["Tableau", "Power BI"], 
          purpose: "Visualization and dashboards" 
        }
      ],
      businessResults: [
        "Sales reports from 4 hours to 5 minutes",
        "Handled Black Friday 10x traffic with zero downtime",
        "Unified view of online + in-store sales",
        "Real-time dashboards for store managers",
        "Storage costs reduced by 60%"
      ],
      lessonsLearned: [
        "ELT more efficient than ETL in cloud",
        "Proper clustering key design critical in Snowflake",
        "Virtual warehouses should be sized appropriately",
        "Time Travel feature useful for data recovery"
      ],
      studentTakeaways: [
        "SQL Server to Snowflake migration",
        "ELT vs ETL architecture",
        "Snowflake performance optimization",
        "Real-time retail analytics design"
      ]
    },

    // ==================== AZURE DATA ENGINEERING PROJECTS ====================
    {
      id: 5,
      title: "Healthcare IoT Patient Monitoring - Real-time Analytics",
      technology: 'Azure',
      sector: 'Healthcare',
      projectType: 'New Implementation',
      duration: '4 Months',
      teamSize: '9 Members',
      challengeSummary: "Hospital needed real-time monitoring of ICU patients using IoT devices.",
      whyProjectStarted: [
        "Manual patient monitoring leading to delayed interventions",
        "Nurse shortage - 1 nurse for 10 ICU patients",
        "Critical alerts not reaching doctors quickly",
        "No historical trend analysis for patient recovery"
      ],
      detailedChallenges: [
        { 
          challenge: "Real-time Data Processing", 
          impact: "5000+ IoT devices sending data every 5 seconds" 
        },
        { 
          challenge: "Data Volume", 
          impact: "10TB of patient data per month" 
        },
        { 
          challenge: "Alert System", 
          impact: "Critical alerts needed within 10 seconds" 
        },
        { 
          challenge: "HIPAA Compliance", 
          impact: "Patient data security in cloud" 
        }
      ],
      solutions: [
        { 
          solution: "Implemented Azure IoT Hub", 
          toolsUsed: "Azure IoT Hub + Device SDK", 
          reason: "Managed IoT service with device management" 
        },
        { 
          solution: "Real-time Stream Processing", 
          toolsUsed: "Azure Stream Analytics", 
          reason: "Process real-time data streams with SQL-like queries" 
        },
        { 
          solution: "Alert System with Logic Apps", 
          toolsUsed: "Azure Logic Apps + Teams Integration", 
          reason: "Send alerts to doctor's Teams when vitals abnormal" 
        }
      ],
      architecture: [
        { 
          source: "IoT Devices (Patient Monitors)", 
          processing: "Azure IoT Hub → Stream Analytics", 
          target: "Azure SQL Database + Cosmos DB", 
          reason: "IoT Hub for ingestion, Stream Analytics for processing, SQL for structured, Cosmos for time-series" 
        }
      ],
      migrationReason: null,
      toolsUsed: [
        { 
          category: "IoT Platform", 
          tools: ["Azure IoT Hub"], 
          purpose: "Ingest data from 5000+ medical devices" 
        },
        { 
          category: "Stream Processing", 
          tools: ["Azure Stream Analytics"], 
          purpose: "Real-time processing of patient vitals" 
        },
        { 
          category: "Database", 
          tools: ["Azure SQL Database", "Cosmos DB"], 
          purpose: "SQL for reports, Cosmos for time-series data" 
        },
        { 
          category: "Alert System", 
          tools: ["Azure Logic Apps", "Microsoft Teams"], 
          purpose: "Real-time alerts to medical staff" 
        },
        { 
          category: "Data Lake", 
          tools: ["Azure Data Lake Gen2"], 
          purpose: "Store raw patient data for analytics" 
        }
      ],
      businessResults: [
        "Critical alerts delivered within 5 seconds (vs 2 minutes manual)",
        "Nurse efficiency improved - can monitor 20 patients vs 10",
        "Patient complication detection improved by 40%",
        "Historical analysis helped identify recovery patterns",
        "Reduced ICU readmission rate by 25%"
      ],
      lessonsLearned: [
        "IoT data requires careful schema design",
        "Stream processing needs proper windowing strategy",
        "Healthcare alerts need redundancy",
        "Data retention policies important for compliance"
      ],
      studentTakeaways: [
        "Azure IoT architecture for healthcare",
        "Real-time stream processing design",
        "Healthcare alert system implementation",
        "HIPAA compliance in cloud"
      ]
    },

    // ==================== PERFORMANCE ENGINEERING PROJECTS ====================
    {
      id: 6,
      title: "Banking Mobile App Performance Optimization - Load Testing",
      technology: 'Performance Engineering',
      sector: 'Banking',
      projectType: 'Performance Optimization',
      duration: '2 Months',
      teamSize: '5 Members',
      challengeSummary: "Mobile banking app crashing during salary days with high user load.",
      whyProjectStarted: [
        "App crashes every 1st of month (salary day)",
        "5000+ concurrent users causing timeouts",
        "Fund transfer failures during peak hours",
        "Customer complaints increasing 300%"
      ],
      detailedChallenges: [
        { 
          challenge: "High Concurrent Users", 
          impact: "5000+ users trying to check salary simultaneously" 
        },
        { 
          challenge: "Slow Database Queries", 
          impact: "Balance check query taking 8+ seconds" 
        },
        { 
          challenge: "Microservices Bottlenecks", 
          impact: "One failing service bringing down entire app" 
        },
        { 
          challenge: "Third-party API Limits", 
          impact: "SMS gateway rate limiting causing OTP delays" 
        }
      ],
      solutions: [
        { 
          solution: "Conducted Load Testing", 
          toolsUsed: "JMeter + BlazeMeter", 
          reason: "Simulate 10000 concurrent users to identify bottlenecks" 
        },
        { 
          solution: "Implemented Caching", 
          toolsUsed: "Redis Cache", 
          purpose: "Cache account balances to reduce database load" 
        },
        { 
          solution: "Database Optimization", 
          toolsUsed: "Query tuning + Indexing", 
          purpose: "Optimize slow-running queries" 
        }
      ],
      architecture: [
        { 
          source: "Mobile App Users", 
          processing: "Load Balancer → Application Servers", 
          target: "Oracle Database with Redis Cache", 
          reason: "Load balancer distributes traffic, Redis reduces DB load" 
        }
      ],
      migrationReason: null,
      toolsUsed: [
        { 
          category: "Load Testing", 
          tools: ["JMeter", "BlazeMeter"], 
          purpose: "Simulate realistic user load and identify bottlenecks" 
        },
        { 
          category: "Monitoring", 
          tools: ["Dynatrace", "AppDynamics"], 
          purpose: "Application performance monitoring" 
        },
        { 
          category: "Caching", 
          tools: ["Redis"], 
          purpose: "Cache frequently accessed data" 
        },
        { 
          category: "Database", 
          tools: ["Oracle Database"], 
          purpose: "Core banking data with optimized queries" 
        },
        { 
          category: "Analysis", 
          tools: ["Thread Dump Analyzer", "Heap Dump Analyzer"], 
          purpose: "Identify memory leaks and performance issues" 
        }
      ],
      businessResults: [
        "App handled 10000 concurrent users without crashes",
        "Balance check response time improved from 8s to 0.5s",
        "Zero failures during next salary day",
        "Customer complaints reduced by 90%",
        "Server costs reduced by 40% through optimization"
      ],
      lessonsLearned: [
        "Load testing should simulate realistic user behavior",
        "Caching strategy depends on data volatility",
        "Database connection pooling critical for performance",
        "Third-party API limits need to be monitored"
      ],
      studentTakeaways: [
        "How to conduct banking app load testing",
        "Performance bottleneck identification",
        "Caching strategies for financial data",
        "Production performance monitoring"
      ]
    },

    // ==================== NEXT.JS PROJECTS ====================
    {
      id: 7,
      title: "Retail E-commerce Platform - Modern Web Application",
      technology: 'Next.js',
      sector: 'Retail',
      projectType: 'New Implementation',
      duration: '3 Months',
      teamSize: '6 Members',
      challengeSummary: "Retailer needed fast, mobile-friendly e-commerce site to compete with Amazon.",
      whyProjectStarted: [
        "Old PHP site loading in 8+ seconds on mobile",
        "Mobile conversion rate only 2% (industry average 3%)",
        "Poor SEO - not ranking for product searches",
        "Cannot handle flash sale traffic"
      ],
      detailedChallenges: [
        { 
          challenge: "Slow Page Load", 
          impact: "70% users leaving before page loads" 
        },
        { 
          challenge: "Mobile Experience", 
          impact: "Desktop conversion 4% vs Mobile 2%" 
        },
        { 
          challenge: "SEO Performance", 
          impact: "Not ranking in top 50 for key products" 
        },
        { 
          challenge: "Flash Sale Traffic", 
          impact: "Site crashes during 70% off sales" 
        }
      ],
      solutions: [
        { 
          solution: "Built with Next.js for SSR", 
          toolsUsed: "Next.js 14 with App Router", 
          reason: "Server-side rendering for SEO + fast initial load" 
        },
        { 
          solution: "Implemented Image Optimization", 
          toolsUsed: "Next.js Image Component + CDN", 
          purpose: "Automatic image optimization and lazy loading" 
        },
        { 
          solution: "Added PWA Features", 
          toolsUsed: "Next PWA", 
          purpose: "App-like experience on mobile" 
        }
      ],
      architecture: [
        { 
          source: "Product Catalog API", 
          processing: "Next.js Server Components", 
          target: "Vercel Edge Network", 
          reason: "Server components for dynamic content, Edge for global performance" 
        }
      ],
      migrationReason: "WHY NEXT.JS INSTEAD OF REACT: 1) Built-in SSR for SEO 2) Automatic code splitting 3) Image optimization 4) API routes 5) Better developer experience",
      toolsUsed: [
        { 
          category: "Frontend Framework", 
          tools: ["Next.js 14", "TypeScript"], 
          purpose: "React framework with SSR and optimal performance" 
        },
        { 
          category: "Styling", 
          tools: ["Tailwind CSS"], 
          purpose: "Utility-first CSS for rapid development" 
        },
        { 
          category: "State Management", 
          tools: ["Zustand"], 
          purpose: "Lightweight state management for shopping cart" 
        },
        { 
          category: "Backend API", 
          tools: ["Next.js API Routes", "Node.js"], 
          purpose: "Serverless API endpoints" 
        },
        { 
          category: "Database", 
          tools: ["MongoDB Atlas"], 
          purpose: "NoSQL for flexible product catalog" 
        },
        { 
          category: "Deployment", 
          tools: ["Vercel"], 
          purpose: "Optimized hosting for Next.js applications" 
        }
      ],
      businessResults: [
        "Page load time reduced from 8s to 1.2s on mobile",
        "Mobile conversion rate increased from 2% to 4%",
        "SEO ranking improved to top 10 for key products",
        "Handled flash sale of 50000 users without issues",
        "Bounce rate reduced from 70% to 25%"
      ],
      lessonsLearned: [
        "Server-side rendering critical for e-commerce SEO",
        "Image optimization significantly impacts mobile performance",
        "Static generation good for product pages",
        "Edge deployment improves global performance"
      ],
      studentTakeaways: [
        "Next.js e-commerce architecture",
        "Performance optimization techniques",
        "SEO implementation in React apps",
        "Mobile-first design principles"
      ]
    }
  ];

  // Filter projects
  const filteredProjects = selectedFilter === 'all' 
    ? allProjects 
    : allProjects.filter(p => p.technology === selectedFilter || p.sector === selectedFilter);

  // Get unique technologies and sectors for filter
  const technologies = ['all', ...new Set(allProjects.map(p => p.technology))];
  const sectors = ['all', ...new Set(allProjects.map(p => p.sector))];

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Complete Industry Projects Portfolio
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              REAL-WORLD PROJECTS SHOWING WHY, HOW, AND WHAT WE SOLVED ACROSS ALL TECHNOLOGIES
            </p>
            <div className="text-lg text-blue-200 max-w-4xl mx-auto">
              Every project includes: <span className="text-cyan-300">WHY started → CHALLENGES faced → TOOLS used → SOLUTIONS implemented → RESULTS achieved</span>
            </div>
          </div>
        </div>
      </div>

      {/* Page Introduction */}
      <div className="container mx-auto px-4 py-12">
        {/* ENHANCEMENT ADDED: How to Use This Page */}
        <div className="bg-blue-50 border-l-4 border-blue-500 p-6 mb-8 rounded-r-lg">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            How to Use This Page for Maximum Learning:
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start">
              <span className="text-blue-500 mr-3 mt-1">1.</span>
              <span>Read WHY each project started (business problem)</span>
            </div>
            <div className="flex items-start">
              <span className="text-blue-500 mr-3 mt-1">2.</span>
              <span>See HOW tools were chosen (not random)</span>
            </div>
            <div className="flex items-start">
              <span className="text-blue-500 mr-3 mt-1">3.</span>
              <span>Note MEASURABLE results (impact matters)</span>
            </div>
            <div className="flex items-start">
              <span className="text-blue-500 mr-3 mt-1">4.</span>
              <span>Apply to YOUR interviews (use as examples)</span>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            How This Page Helps You Understand REAL Projects
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-3">PROJECT CONTEXT</h3>
              <p className="text-gray-600">Understand WHY each project started - real business problems</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">⚙️</div>
              <h3 className="text-xl font-bold mb-3">TECHNICAL DECISIONS</h3>
              <p className="text-gray-600">See WHY specific tools were chosen over others</p>
            </div>
            <div className="text-center p-6">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-bold mb-3">BUSINESS IMPACT</h3>
              <p className="text-gray-600">Measurable results showing project success</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Explore Projects</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-700 mb-4">By Technology</h4>
                <div className="flex flex-wrap gap-3">
                  {technologies.map((tech) => (
                    <button
                      key={tech}
                      onClick={() => setSelectedFilter(tech)}
                      className={`px-5 py-2.5 rounded-lg border ${selectedFilter === tech ? 
                        'bg-blue-600 text-white border-blue-600' : 
                        'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'}`}
                    >
                      {tech === 'all' ? 'All Technologies' : tech}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-4">By Industry Sector</h4>
                <div className="flex flex-wrap gap-3">
                  {sectors.map((sector) => (
                    <button
                      key={sector}
                      onClick={() => setSelectedFilter(sector)}
                      className={`px-5 py-2.5 rounded-lg border ${selectedFilter === sector ? 
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
        </div>

        {/* Projects Display */}
        <div className="space-y-16">
          {filteredProjects.map((project) => (
            <div key={project.id} className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-300">
              
              {/* Project Header */}
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <span className="px-4 py-2 bg-blue-500 text-white text-sm font-bold rounded-full">
                        {project.technology}
                      </span>
                      <span className="px-4 py-2 bg-green-500 text-white text-sm font-bold rounded-full">
                        {project.sector}
                      </span>
                      <span className="px-4 py-2 bg-purple-500 text-white text-sm font-bold rounded-full">
                        {project.projectType}
                      </span>
                    </div>
                    <h2 className="text-3xl font-bold mb-3">{project.title}</h2>
                    
                    {/* ENHANCEMENT ADDED: Industry Relatability */}
                    <div className="mt-4">
                      <span className="text-sm text-gray-300">
                        Similar to projects at:{" "}
                        {project.sector === 'Banking' && (
                          <span className="font-semibold text-cyan-300">SBI, HDFC, ICICI</span>
                        )}
                        {project.sector === 'Healthcare' && (
                          <span className="font-semibold text-cyan-300">Apollo, Fortis, Max Healthcare</span>
                        )}
                        {project.sector === 'Retail' && (
                          <span className="font-semibold text-cyan-300">Reliance Retail, DMart, Big Bazaar</span>
                        )}
                      </span>
                    </div>
                    
                    <div className="text-gray-300 mt-4">
                      <div className="flex items-center gap-6">
                        <span>Duration: <strong>{project.duration}</strong></span>
                        <span>Team: <strong>{project.teamSize}</strong></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Body */}
              <div className="p-8">
                {/* Challenge Summary */}
                <div className="mb-10">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="text-red-500 mr-3">🔥</span> 
                    THE PROBLEM: Why This Project Started
                  </h3>
                  <p className="text-lg text-gray-700 mb-6 bg-red-50 p-6 rounded-xl border-l-4 border-red-500">
                    <strong>Business Challenge:</strong> {project.challengeSummary}
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    {project.whyProjectStarted.map((reason, idx) => (
                      <div key={idx} className="flex items-start bg-gray-50 p-4 rounded-lg">
                        <span className="text-red-500 mr-3 mt-1">•</span>
                        <span className="text-gray-700">{reason}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Detailed Challenges */}
                <div className="mb-10">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="text-orange-500 mr-3">⚠️</span> 
                    SPECIFIC CHALLENGES FACED & THEIR IMPACT
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {project.detailedChallenges.map((item, idx) => (
                      <div key={idx} className="border border-orange-200 rounded-xl p-6 bg-orange-50">
                        <h4 className="font-bold text-gray-900 mb-2">Challenge {idx + 1}: {item.challenge}</h4>
                        <p className="text-gray-700">
                          <strong>Business Impact:</strong> {item.impact}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Solutions Section */}
                <div className="mb-10">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="text-green-500 mr-3">✅</span> 
                    SOLUTIONS IMPLEMENTED & WHY THOSE TOOLS
                  </h3>
                  <div className="space-y-6">
                    {project.solutions.map((solution, idx) => (
                      <div key={idx} className="bg-green-50 border border-green-200 rounded-xl p-6">
                        <div className="flex items-start">
                          <span className="text-2xl text-green-500 mr-4">✓</span>
                          <div className="flex-1">
                            <h4 className="text-xl font-bold text-gray-900 mb-2">Solution {idx + 1}: {solution.solution}</h4>
                            <div className="mb-3">
                              <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                                Tools Used: {solution.toolsUsed}
                              </span>
                            </div>
                            <p className="text-gray-700">
                              <strong>Why This Solution:</strong> {solution.reason}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Architecture & Migration Reason */}
                <div className="mb-10">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="text-blue-500 mr-3">🏗️</span> 
                    ARCHITECTURE & TOOL SELECTION REASONING
                  </h3>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
                    <h4 className="text-xl font-bold text-gray-900 mb-4">Data Flow Architecture</h4>
                    {project.architecture.map((arch, idx) => (
                      <div key={idx} className="mb-4 p-4 bg-white rounded-lg">
                        <div className="grid grid-cols-3 gap-4 text-center mb-3">
                          <div className="font-bold text-gray-800">Source: {arch.source}</div>
                          <div className="font-bold text-gray-800">Processing: {arch.processing}</div>
                          <div className="font-bold text-gray-800">Target: {arch.target}</div>
                        </div>
                        <p className="text-gray-700">
                          <strong>Why This Architecture:</strong> {arch.reason}
                        </p>
                      </div>
                    ))}
                  </div>

                  {project.migrationReason && (
                    <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-3">
                        🚀 WHY MIGRATION FROM OLD TO NEW TECHNOLOGY?
                      </h4>
                      <p className="text-gray-700 whitespace-pre-line">{project.migrationReason}</p>
                    </div>
                  )}
                </div>

                {/* Tools Used */}
                <div className="mb-10">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <span className="text-cyan-500 mr-3">🛠️</span> 
                    COMPLETE TECHNOLOGY STACK WITH PURPOSE
                  </h3>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {project.toolsUsed.map((category, idx) => (
                      <div key={idx} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                        <h4 className="font-bold text-gray-900 mb-3 text-lg">{category.category}</h4>
                        <div className="mb-4">
                          {category.tools.map((tool, tIdx) => (
                            <span key={tIdx} className="inline-block px-3 py-1.5 bg-cyan-100 text-cyan-800 rounded-full text-sm mr-2 mb-2">
                              {tool}
                            </span>
                          ))}
                        </div>
                        <p className="text-gray-600 text-sm">
                          <strong>Purpose:</strong> {category.purpose}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Results & Takeaways */}
                <div className="grid md:grid-cols-3 gap-8">
                  {/* Business Results */}
                  <div className="md:col-span-2">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <span className="text-purple-500 mr-3">📊</span> 
                      BUSINESS RESULTS ACHIEVED (MEASURABLE)
                    </h3>
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6">
                      <ul className="space-y-4">
                        {project.businessResults.map((result, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-2xl text-purple-500 mr-3">🏆</span>
                            <span className="text-gray-800 text-lg">{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Student Takeaways */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <span className="text-green-600 mr-3">🎓</span> 
                      WHAT YOU LEARN
                    </h3>
                    <div className="bg-green-50 rounded-xl p-6">
                      <ul className="space-y-3">
                        {project.studentTakeaways.map((takeaway, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-green-500 mr-2 mt-1">✓</span>
                            <span className="text-gray-700">{takeaway}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Footer */}
              <div className="bg-gray-900 text-white p-6">
                <div className="text-center">
                  <div className="text-sm text-gray-300 mb-2">
                    Project ID: #{project.id.toString().padStart(3, '0')} | 
                    Category: {project.technology} | 
                    Industry: {project.sector}
                  </div>
                  <div className="text-gray-400 text-sm">
                    This real project shows complete lifecycle from problem identification to solution delivery
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Portfolio Summary */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-10 text-white">
          <h2 className="text-3xl font-bold mb-8 text-center">Industry Project Experience Summary</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{allProjects.length}</div>
              <div className="text-blue-100">Real Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{new Set(allProjects.map(p => p.sector)).size}</div>
              <div className="text-blue-100">Industry Sectors</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{new Set(allProjects.map(p => p.technology)).size}</div>
              <div className="text-blue-100">Technologies Mastered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-blue-100">Client Success Rate</div>
            </div>
          </div>
        </div>

        {/* Key Learning Points */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            What These Projects Teach You
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">For Career Growth</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">✓</span>
                  <span>How to translate business problems into technical solutions</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">✓</span>
                  <span>Why companies choose specific technologies (not random)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">✓</span>
                  <span>How to measure and present project success</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3">✓</span>
                  <span>Real-world project documentation and planning</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">For Interviews</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3">💡</span>
                  <span>Discuss real projects, not just theoretical knowledge</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3">💡</span>
                  <span>Explain why you chose specific tools and architectures</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3">💡</span>
                  <span>Show measurable impact of your work</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-3">💡</span>
                  <span>Demonstrate problem-solving skills with real examples</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}