"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Snowflake,
  Database,
  Code,
  Play,
  Pause,
  Home,
  Calendar,
  CheckCircle,
  Users,
  Settings,
  Zap,
  Lock,
  Clock,
  Terminal,
  Server,
  GitBranch,
  Workflow,
  Layers,
  AlertCircle,
  Activity,
  Wind,
  Search,
  Menu,
  X,
  Keyboard,
  Rocket,
} from "lucide-react";

// ---------------------------------------------------------------------------
// Content data — unchanged from the original course content
// ---------------------------------------------------------------------------

interface DayBlock {
  day: string;
  title: string;
  items: string[];
}

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  content: string;
  module: string;
  icon: React.ReactNode;
  bgColor: string;
  days: string;
  keyPoints?: string[];
  detailedContent?: DayBlock[];
}

const trainingSlides: Slide[] = [
  // INTRODUCTION
  {
    id: 1,
    title: "Snowflake + DBT + Apache Airflow",
    subtitle: "Modern Data Engineering Combo Training",
    content:
      "A complete 47-day intensive training program covering the modern data stack: Snowflake for cloud data warehousing, DBT for ELT transformations, and Apache Airflow for pipeline orchestration.",
    module: "Introduction",
    icon: <Database className="h-20 w-20 text-blue-600" />,
    bgColor: "from-blue-50 to-indigo-100",
    days: "47 Days",
    keyPoints: [
      "Hands-on, project-based learning",
      "Real-world implementation scenarios",
      "Industry-recognized skillset",
      "Interview preparation from Day 1",
    ],
  },

  // TRAINING PHILOSOPHY & OVERVIEW
  {
    id: 2,
    title: "Training Philosophy & Success Flow",
    subtitle: "How We Train You for Real IT Careers",
    content:
      "At Rishab Informatica Group, we don't just teach tools. We train students to crack interviews, survive real projects, and grow confidently in IT careers.",
    module: "Overview",
    icon: <Users className="h-20 w-20 text-purple-600" />,
    bgColor: "from-purple-50 to-pink-100",
    days: "47 Days",
    keyPoints: [
      "Interview Preparation from Day 1",
      "Real Interview Exposure from Session 25",
      "Multiple Mock Interviews with Feedback",
      "Concept + Scenario + Project-Based Learning",
      "Complete Support Till Job Placement",
      "FREE Job Support After Placement",
      "Max 25 Students Per Batch — Personal Attention",
      "No Mute Policy — 100% Interactive Sessions",
    ],
  },

  // SUCCESS FLOW TIMELINE
  {
    id: 3,
    title: "Proven Success Flow",
    subtitle: "Your Journey to Job Placement",
    content:
      "A structured timeline from Day 1 to Day 47 designed to make you job-ready with confidence.",
    module: "Overview",
    icon: <Activity className="h-20 w-20 text-green-600" />,
    bgColor: "from-green-50 to-teal-100",
    days: "Day 1 → Day 47",
    detailedContent: [
      { day: "Day 1", title: "Interview Orientation", items: ["How interviewers think", "How to answer confidently"] },
      { day: "Day 20", title: "Resume Ready", items: ["Naukri & LinkedIn profile creation"] },
      { day: "Day 23", title: "Mock Interview 1", items: ["Based only on completed sessions"] },
      { day: "Day 25+", title: "Real Interviews", items: ["Start attending actual interviews"] },
      { day: "Day 35", title: "Mock Interview 2", items: ["Advanced + Scenario-based questions"] },
      { day: "Day 40-47", title: "Job Cracked!", items: ["Expected placement + FREE job support"] },
    ],
  },

  // COURSE OVERVIEW
  {
    id: 4,
    title: "Course Overview",
    subtitle: "Three Powerful Technologies Combined",
    content:
      "Master the complete modern data engineering stack with 47 comprehensive sessions across three key technologies.",
    module: "Overview",
    icon: <Layers className="h-20 w-20 text-indigo-600" />,
    bgColor: "from-indigo-50 to-blue-100",
    days: "47 Sessions",
    detailedContent: [
      { day: "Part A", title: "Snowflake — Days 1-26", items: ["Data Warehousing & Cloud Analytics", "Store, query and manage data in cloud"] },
      { day: "Part B", title: "DBT — Days 27-36", items: ["Modern ELT Transformations", "Transform raw data into clean analytics models"] },
      { day: "Part C", title: "Apache Airflow — Days 37-47", items: ["Pipeline Orchestration & Scheduling", "Schedule & orchestrate entire data pipelines"] },
    ],
  },

  // THE COMPLETE DATA PIPELINE
  {
    id: 5,
    title: "The Complete Data Pipeline",
    subtitle: "End-to-End Architecture You Will Build",
    content: "Build a production-ready data pipeline using the industry's most demanded tools of 2026.",
    module: "Overview",
    icon: <Workflow className="h-20 w-20 text-cyan-600" />,
    bgColor: "from-cyan-50 to-blue-100",
    days: "Full Pipeline",
    keyPoints: [
      "Sources → Fivetran → Apache Airflow → Snowflake → DBT → Power BI",
      "Orchestration Layer — Automates when & what runs",
      "Storage Layer — Holds all processed data",
      "Transformation Layer — SQL-based data modeling",
    ],
  },

  // SNOWFLAKE MODULE OVERVIEW
  {
    id: 6,
    title: "Snowflake Module",
    subtitle: "Days 1-26: Cloud Data Platform Mastery",
    content:
      "Comprehensive coverage of Snowflake's architecture, features, and implementation patterns for modern data engineering.",
    module: "Snowflake",
    icon: <Snowflake className="h-20 w-20 text-blue-600" />,
    bgColor: "from-cyan-50 to-blue-100",
    days: "26 Days",
    keyPoints: [
      "Architecture & Multi-cluster Shared Data",
      "Data Loading & Transformation",
      "Security & Performance Optimization",
      "Time Travel, Zero Copy Cloning & Data Sharing",
      "Real-time Implementation & Projects",
    ],
  },

  // SNOWFLAKE WEEK 1
  {
    id: 7,
    title: "Snowflake — Week 1: Foundations",
    subtitle: "Days 1-7: Core Concepts & Environment Setup",
    content: "Establishing the foundation with architecture understanding, environment setup, and basic operations.",
    module: "Snowflake",
    icon: <Settings className="h-16 w-16 text-blue-600" />,
    bgColor: "from-blue-50 to-sky-100",
    days: "Days 1-7",
    detailedContent: [
      { day: "Day 1", title: "Introduction & Interview Orientation", items: ["Data Engineering & Modern Data Stack", "Snowflake Architecture — Multi-cluster Shared Data", "Snowflake vs Traditional Databases", "Full Interview Q&A — How Interviewers Think"] },
      { day: "Day 2", title: "Account Setup & Tools", items: ["Snowflake Trial Account Creation", "Snowsight Web UI Navigation", "SnowSQL CLI Installation", "Partner Connect Overview"] },
      { day: "Day 3", title: "Roles, Users & Security", items: ["Creating Roles & Users", "Role Hierarchy & Privilege Management", "GRANT & REVOKE Commands", "Resource Monitor Basics"] },
      { day: "Day 4", title: "Virtual Warehouses", items: ["Warehouse Creation & Size Types", "Auto Suspend & Auto Resume", "Credit Usage & Cost Monitoring", "Multi-Cluster Warehouses for Concurrency"] },
      { day: "Day 5", title: "Databases & Schemas", items: ["Database & Schema Creation Best Practices", "Snowflake Storage Architecture", "Micro-partitions — How Snowflake Stores Data", "Metadata & Automatic Clustering Overview"] },
      { day: "Day 6", title: "Tables & Constraints", items: ["Table Types: Permanent, Transient, Temporary", "DDL Operations — CREATE, ALTER, DROP", "DML Operations — INSERT, UPDATE, DELETE, MERGE", "Iceberg Tables — Advanced Awareness"] },
      { day: "Day 7", title: "Joins & Set Operators", items: ["All Join Types — INNER, LEFT, RIGHT, FULL OUTER", "CROSS JOIN & SELF JOIN with Real Examples", "Set Operators — UNION, UNION ALL, INTERSECT, EXCEPT", "Views Overview — When & Why to Use"] },
    ],
  },

  // SNOWFLAKE WEEK 2
  {
    id: 8,
    title: "Snowflake — Week 2: Data Operations",
    subtitle: "Days 8-14: Data Loading & Management",
    content: "Mastering data loading patterns from various sources and implementing data management strategies.",
    module: "Snowflake",
    icon: <Database className="h-16 w-16 text-blue-600" />,
    bgColor: "from-sky-50 to-cyan-100",
    days: "Days 8-14",
    detailedContent: [
      { day: "Day 8", title: "Data Loading — Local Files", items: ["Load CSV, JSON, XML from Local Machine", "PUT Command — Stage Files from Local", "COPY INTO Command — Load from Stage to Table", "File Format Objects — CSV, JSON, Parquet, ORC"] },
      { day: "Day 9", title: "Data Loading — Cloud Storage", items: ["AWS S3 Integration — Setup & Configuration", "Load CSV, JSON, Parquet from S3 Bucket", "Azure Blob Storage Integration Overview", "Snowpipe Introduction — Auto Ingestion"] },
      { day: "Day 10", title: "Stages & CLI Operations", items: ["Internal Stages — User, Table, Named Stage", "External Stages — S3, Azure, GCS", "Named Stages with File Format Objects", "SnowSQL CLI — Day to Day Operations"] },
      { day: "Day 11", title: "Time Travel & Fail Safe", items: ["Time Travel — BEFORE & AT Keywords", "Querying Historical Data with Time Travel", "Restoring Dropped Tables, Schemas & Databases", "Fail Safe — 7 Day Recovery Concept"] },
      { day: "Day 12", title: "Zero Copy Cloning", items: ["Zero Copy Clone — How It Works Internally", "Clone Tables, Schemas & Databases Instantly", "Use Cases — Dev, Test & UAT Environments", "Clone + Time Travel Powerful Combination"] },
      { day: "Day 13", title: "Tasks & Change Data Capture", items: ["Tasks Creation & CRON Scheduling Syntax", "Task Dependencies — Building DAG inside Snowflake", "CDC Concepts — INSERT/UPDATE/DELETE Handling", "Monitoring Task Execution History"] },
      { day: "Day 14", title: "Streams & Advanced Loading", items: ["Streams — Standard, Append-Only & Insert-Only", "CDC Pipeline using Streams + Tasks Together", "Semi-Structured Data — VARIANT, ARRAY, OBJECT", "FLATTEN & PARSE_JSON Functions"] },
    ],
  },

  // SNOWFLAKE WEEK 3
  {
    id: 9,
    title: "Snowflake — Week 3: Advanced Features",
    subtitle: "Days 15-21: Security, Performance & Data Sharing",
    content: "Implementing advanced security features, performance optimization, and data sharing capabilities.",
    module: "Snowflake",
    icon: <Lock className="h-16 w-16 text-blue-600" />,
    bgColor: "from-indigo-50 to-purple-100",
    days: "Days 15-21",
    detailedContent: [
      { day: "Day 15", title: "Data Masking & Security", items: ["Dynamic Data Masking Policies", "Masking PII Columns — Real World Scenarios", "Row-Level Security — Row Access Policies", "Column-Level Security Best Practices"] },
      { day: "Day 16", title: "Performance Tuning", items: ["Clustering Keys — Manual & Automatic", "Micro-partition Pruning for Query Speed", "Query Profiling with EXPLAIN PLAN", "Result Cache & Metadata Cache Usage"] },
      { day: "Day 17", title: "UDFs & Stored Procedures", items: ["SQL User Defined Functions (UDFs)", "JavaScript UDFs for Complex Logic", "Stored Procedures in JavaScript & Snowflake Scripting", "Python Integration with Snowpark"] },
      { day: "Day 18", title: "Views & Advanced Querying", items: ["Standard Views — Creation & Use Cases", "Secure Views — Data Sharing Security", "Materialized Views — Setup & Refresh Strategies", "View Dependency Management & Tracking"] },
      { day: "Day 19", title: "Slowly Changing Dimensions", items: ["SCD Type 1 — Overwrite (Simple Update)", "SCD Type 2 — History with Effective & Expiry Dates", "SCD Type 3 — Previous Value Column Approach", "MERGE Statement for SCD Implementation"] },
      { day: "Day 20", title: "Data Sharing & Resume Prep", items: ["Data Provider & Consumer Model — Architecture", "Creating Secure Shares in Snowflake", "Reader Accounts for Non-Snowflake Consumers", "Resume Preparation & LinkedIn/Naukri Profile Creation"] },
      { day: "Day 21", title: "Pricing & Cost Control", items: ["Snowflake Pricing Model — Compute + Storage", "Credits — What They Are & How Consumed", "Cost Optimization Strategies", "Resource Monitors & Budget Alerts Setup"] },
    ],
  },

  // SNOWFLAKE WEEK 4
  {
    id: 10,
    title: "Snowflake — Week 4: Project Implementation",
    subtitle: "Days 22-26: Hands-on Project & Final Lab",
    content: "Applying all learned concepts through a comprehensive real-world project implementation.",
    module: "Snowflake",
    icon: <Zap className="h-16 w-16 text-blue-600" />,
    bgColor: "from-purple-50 to-violet-100",
    days: "Days 22-26",
    detailedContent: [
      { day: "Day 22", title: "Date & Time Functions", items: ["Date & Timestamp Data Types", "DATE_TRUNC, DATEADD, DATEDIFF Functions", "Time Zone Concepts & CONVERT_TIMEZONE", "Window Functions with Date Ranges"] },
      { day: "Day 23", title: "Dynamic Tables & Mock Interview", items: ["Dynamic Tables — What They Are & Use Cases", "Target Lag Configuration & Refresh Strategy", "Dynamic Tables vs Materialized Views", "1st Mock Interview — Based on Completed Sessions"] },
      { day: "Day 24", title: "Real-Time Project Introduction", items: ["Project Architecture Design — Medallion Pattern", "Bronze/Silver/Gold Layer Concept", "Business Requirement Analysis & Source Mapping", "Tools Setup — GitHub, Snowflake, DBT Cloud"] },
      { day: "Day 25", title: "Project Lab", items: ["Data Loading from S3 into Bronze Layer", "Streams & CDC Pipeline Setup", "Transformation Logic — Silver Layer Development", "Gold Layer — Reporting Tables Creation"] },
      { day: "Day 26", title: "Final Lab & Snowflake Revision", items: ["Complete Snowflake Architecture Revision", "All Key Concepts Summary & Mind Map", "Top 50 Snowflake Interview Questions", "Scenario-Based Interview Questions & Q&A"] },
    ],
  },

  // DBT MODULE OVERVIEW
  {
    id: 11,
    title: "DBT Module",
    subtitle: "Days 27-36: Modern ELT Transformations",
    content:
      "Master DBT (Data Build Tool) for transforming data directly in your data warehouse with software engineering best practices.",
    module: "DBT",
    icon: <Code className="h-20 w-20 text-amber-600" />,
    bgColor: "from-amber-50 to-orange-100",
    days: "10 Days",
    keyPoints: [
      "Models & Materializations",
      "Sources, Seeds & Testing",
      "Macros & Jinja Templating",
      "Hooks, Documentation & Packages",
      "Git Integration & Deployment",
    ],
  },

  // DBT DETAILS
  {
    id: 12,
    title: "DBT — Detailed Curriculum",
    subtitle: "Days 27-36: Comprehensive DBT Training",
    content: "From basic setup to advanced deployment strategies with hands-on labs.",
    module: "DBT",
    icon: <GitBranch className="h-16 w-16 text-amber-600" />,
    bgColor: "from-orange-50 to-amber-100",
    days: "Days 27-36",
    detailedContent: [
      { day: "Day 27", title: "DBT Introduction & Setup", items: ["ELT vs ETL — Modern Data Stack Shift", "DBT Cloud Setup & Account Creation", "Snowflake + DBT Integration & Connection Setup", "DBT Project Structure — Folders & Files Explained"] },
      { day: "Day 28", title: "Models & Materializations", items: ["DBT Models — Writing .sql Model Files", "Table Materialization — Creates Physical Tables", "Incremental Materialization — Process Only New Data", "Ephemeral & View Materializations"] },
      { day: "Day 29", title: "Sources & Seeds", items: ["Source Configuration in schema.yml File", "Referencing Sources with source()", "Seeds — Load CSV Reference Data into Snowflake", "Source Freshness Checks & Testing"] },
      { day: "Day 30", title: "Tests & Snapshots", items: ["Generic Tests — not_null, unique, accepted_values", "Singular (Custom) Tests — Write Your Own Logic", "Snapshots for SCD Type 2 Implementation", "Running Tests in CI/CD Pipeline"] },
      { day: "Day 31", title: "Macros & Jinja Templating", items: ["Jinja Templating Basics — Variables & Loops", "Creating Reusable Macros for Common Logic", "Using ref() and source() Functions Effectively", "Custom Schema & Database Override Macros"] },
      { day: "Day 32", title: "Hooks & Documentation", items: ["Pre-Hook & Post-Hook Configuration", "On-Run-Start & On-Run-End Hooks", "Auto Documentation with dbt docs generate", "Lineage Graph — Visual Data Flow in DBT"] },
      { day: "Day 33", title: "Analysis & Packages", items: ["Analysis Folder — Ad-Hoc Queries in DBT", "DBT Packages — dbt_utils, dbt_expectations", "packages.yml Configuration & Installation", "Popular Community Packages & Best Practices"] },
      { day: "Day 34", title: "Deployment & Git Integration", items: ["Git Version Control for DBT Projects", "Branching Strategy — Feature, Dev, Main Branches", "DBT Cloud Deployment Environments", "CI/CD Integration — Auto Run on Pull Request"] },
      { day: "Day 35", title: "DBT Project Lab", items: ["Real-Time DBT Transformations on Snowflake", "Staging Models — Clean Raw Data", "Intermediate Models — Business Logic", "Mart Models — Final Reporting Tables"] },
      { day: "Day 36", title: "DBT Revision & Interview Prep", items: ["Complete DBT Concept Revision", "Top 30 DBT Interview Questions & Answers", "Scenario-Based DBT Questions from Real Interviews", "DBT + Snowflake Combined Architecture Discussion"] },
    ],
  },

  // APACHE AIRFLOW MODULE OVERVIEW
  {
    id: 13,
    title: "Apache Airflow Module",
    subtitle: "Days 37-47: Pipeline Orchestration & Scheduling",
    content:
      "Learn the world's most popular pipeline orchestration tool — used by Airbnb, Uber, Netflix & 10,000+ companies globally. 100% FREE, open source, works perfectly with Snowflake and DBT.",
    module: "Airflow",
    icon: <Wind className="h-20 w-20 text-rose-600" />,
    bgColor: "from-rose-50 to-red-100",
    days: "11 Days",
    keyPoints: [
      "Python Basics for Airflow (No prior Python needed!)",
      "DAGs, Tasks & Operators",
      "Fivetran Integration & Industry Awareness",
      "Snowflake + DBT + Airflow Integration",
      "Advanced Features: XComs, Variables, Branching",
      "Monitoring, Alerts & Production Best Practices",
    ],
  },

  // APACHE AIRFLOW DETAILS
  {
    id: 14,
    title: "Apache Airflow — Detailed Curriculum",
    subtitle: "Days 37-47: Master Pipeline Orchestration",
    content: "From Python basics to building production-ready data pipelines with Airflow.",
    module: "Airflow",
    icon: <Terminal className="h-16 w-16 text-rose-600" />,
    bgColor: "from-red-50 to-rose-100",
    days: "Days 37-47",
    detailedContent: [
      { day: "Day 37", title: "Python Basics for Airflow", items: ["Variables & Data Types — strings, numbers, dates", "Functions — def keyword, calling functions", "Import Statements — datetime libraries", "Indentation Rules — the only rule that matters", "Write your first 10-line Python script — confidence guaranteed!"] },
      { day: "Day 38", title: "Apache Airflow Introduction", items: ["What is Pipeline Orchestration & Why It Matters", "Airflow Architecture — Scheduler, Webserver, Executor", "Why Airflow with Snowflake + DBT — The Golden Trio", "Installation & Setup — Local (pip) & Docker Options"] },
      { day: "Day 39", title: "Core Concepts — DAGs & Tasks", items: ["What is a DAG — Workflow Definition", "Tasks — The Individual Steps Inside a DAG", "Operators — PythonOperator, BashOperator, SQLOperator", "Task Dependencies — set_upstream() & set_downstream()", "Airflow Web UI Walkthrough"] },
      { day: "Day 40", title: "Operators Deep Dive", items: ["PythonOperator — Run Any Python Function", "BashOperator — Execute Shell Commands", "EmailOperator — Send Notifications", "BranchPythonOperator — If/Else Logic in Pipelines", "Build Multi-Step Pipeline with Different Operators"] },
      { day: "Day 41", title: "Fivetran Introduction — BONUS", items: ["What is Fivetran? — Automated Data Ingestion", "Fivetran Architecture — Source → Connector → Destination", "300+ Ready-Made Connectors", "Fivetran Free Trial Account Setup", "Sync Types — Full Refresh vs Incremental Sync"] },
      { day: "Day 42", title: "Fivetran vs Airflow — When to Use Which?", items: ["Side-by-Side Comparison — no-code vs code-based", "When to choose Fivetran — SaaS sources", "When to choose Airflow — custom logic", "Can they work TOGETHER? YES!", "Real Company Scenarios & Interview Questions"] },
      { day: "Day 43", title: "Snowflake + Airflow Integration", items: ["SnowflakeOperator — Connect Airflow to Snowflake", "Setup Snowflake Connection in Airflow", "Run Snowflake SQL Queries from Airflow DAG", "Load Data into Snowflake via Airflow Pipeline", "Full Snowflake Pipeline Orchestrated by Airflow"] },
      { day: "Day 44", title: "DBT + Airflow Integration", items: ["DBT Operator Setup in Airflow", "Trigger DBT Models from Airflow DAG", "Schedule DBT Runs Automatically with CRON", "Handle DBT Failures — Retry & Alert Strategy", "Airflow Triggers DBT → DBT Transforms Snowflake"] },
      { day: "Day 45", title: "Advanced Airflow Features", items: ["XComs — Pass Data Between Tasks", "Airflow Variables & Connections", "CRON Scheduling Patterns — Daily, Weekly, Hourly", "Task Retries, Timeouts & SLA Monitoring", "Branching & Conditional Logic in Complex Pipelines"] },
      { day: "Day 46", title: "Monitoring, Alerts & Best Practices", items: ["Airflow Dashboard Deep Dive", "Log Analysis — Debugging Failed Tasks", "Email Alerts on Pipeline Failure Setup", "Production Best Practices", "Common Airflow Interview Questions"] },
      { day: "Day 47", title: "Capstone Project — Full Pipeline", items: ["End-to-End: Source → Airflow → Snowflake → DBT", "Airflow Orchestrates the Entire Data Journey", "Error Handling & Retry Logic in Real Project", "Project Documentation & Architecture Diagram", "Final Mock Interview — All 3 Technologies Combined"] },
    ],
  },

  // BONUS: WHY AIRFLOW
  {
    id: 15,
    title: "Why Apache Airflow in This Course?",
    subtitle: "The World's Most Popular Pipeline Orchestration Tool",
    content:
      "Airflow is used by Airbnb, Uber, Netflix & 10,000+ companies globally. Adding Airflow makes this the most complete and most demanded Modern Data Engineering stack of 2026.",
    module: "Airflow",
    icon: <AlertCircle className="h-20 w-20 text-rose-600" />,
    bgColor: "from-pink-50 to-red-100",
    days: "Industry Standard",
    keyPoints: [
      "100% FREE and open source",
      "Works perfectly with both Snowflake and DBT",
      "Most demanded skill in data engineering for 2026",
      "Used by top tech companies worldwide",
      "Complete end-to-end pipeline orchestration",
    ],
  },

  // TECHNOLOGY STACK
  {
    id: 16,
    title: "Technology Stack",
    subtitle: "Tools You Will Master",
    content: "Master the industry-standard tools for modern data engineering.",
    module: "Overview",
    icon: <Server className="h-20 w-20 text-indigo-600" />,
    bgColor: "from-indigo-50 to-blue-100",
    days: "Complete Stack",
    detailedContent: [
      { day: "Snowflake", title: "Store, query and manage data in cloud", items: ["Data Warehouse — holds all processed data"] },
      { day: "DBT", title: "Transform raw data into clean analytics models", items: ["Transformation Layer — SQL-based data modeling"] },
      { day: "Airflow", title: "Schedule & orchestrate entire data pipelines", items: ["Orchestration Layer — automates when & what runs"] },
    ],
  },

  // ENROLLMENT SECTION
  {
    id: 17,
    title: "Enroll Now — Limited Seats Available",
    subtitle: "Max 25 Students Per Batch — Don't Miss Your Seat!",
    content: "Join the most comprehensive Snowflake + DBT + Apache Airflow training program.",
    module: "Enrollment",
    icon: <CheckCircle className="h-20 w-20 text-emerald-600" />,
    bgColor: "from-green-50 to-emerald-100",
    days: "Career Ready",
    keyPoints: [
      "Limited Batch Size — Max 25 students — personal attention guaranteed",
      "No Mute Policy — 100% interactive — ask questions anytime",
      "LMS Access — Recorded videos on LMS, Android & iOS App",
      "2 Real Projects — End-to-end real-time project experience",
      "Interview Focused — Interview prep from Day 1 of training",
      "Lifetime Support — FREE job support + lifetime mentorship",
      "Call / WhatsApp: 8970853557 / 9448005273",
    ],
  },

  // CONCLUSION
  {
    id: 18,
    title: "Training Outcomes & Career Readiness",
    subtitle: "What You'll Achieve",
    content: "Upon completion, you'll be equipped with the most demanded skills for modern data engineering roles in 2026.",
    module: "Conclusion",
    icon: <CheckCircle className="h-20 w-20 text-emerald-600" />,
    bgColor: "from-green-50 to-emerald-100",
    days: "Career Ready",
    keyPoints: [
      "Snowflake Certified Practitioner level skills",
      "Production-ready DBT project experience",
      "Apache Airflow orchestration expertise",
      "End-to-end data pipeline implementation",
      "Comprehensive portfolio project",
      "Interview-ready with 2 mock interviews",
      "FREE job support after placement",
    ],
  },
];

// ---------------------------------------------------------------------------
// Module design tokens — literal Tailwind classes (no dynamic class strings)
// ---------------------------------------------------------------------------

type ModuleKey = "Introduction" | "Overview" | "Snowflake" | "DBT" | "Airflow" | "Enrollment" | "Conclusion";

const MODULE_STYLES: Record<
  ModuleKey,
  {
    icon: React.ReactNode;
    dot: string; // bg color for the DAG-rail node
    ring: string; // ring color when active
    chip: string; // badge bg + text
    text: string; // heading accent text color
    barActive: string; // progress bar fill for this module
  }
> = {
  Introduction: {
    icon: <Rocket className="h-3.5 w-3.5" />,
    dot: "bg-violet-500",
    ring: "ring-violet-400",
    chip: "bg-violet-50 text-violet-700",
    text: "text-violet-600",
    barActive: "bg-violet-500",
  },
  Overview: {
    icon: <Layers className="h-3.5 w-3.5" />,
    dot: "bg-slate-400",
    ring: "ring-slate-400",
    chip: "bg-slate-100 text-slate-700",
    text: "text-slate-600",
    barActive: "bg-slate-400",
  },
  Snowflake: {
    icon: <Snowflake className="h-3.5 w-3.5" />,
    dot: "bg-blue-500",
    ring: "ring-blue-400",
    chip: "bg-blue-50 text-blue-700",
    text: "text-blue-600",
    barActive: "bg-blue-500",
  },
  DBT: {
    icon: <Code className="h-3.5 w-3.5" />,
    dot: "bg-amber-500",
    ring: "ring-amber-400",
    chip: "bg-amber-50 text-amber-700",
    text: "text-amber-600",
    barActive: "bg-amber-500",
  },
  Airflow: {
    icon: <Wind className="h-3.5 w-3.5" />,
    dot: "bg-rose-500",
    ring: "ring-rose-400",
    chip: "bg-rose-50 text-rose-700",
    text: "text-rose-600",
    barActive: "bg-rose-500",
  },
  Enrollment: {
    icon: <CheckCircle className="h-3.5 w-3.5" />,
    dot: "bg-emerald-500",
    ring: "ring-emerald-400",
    chip: "bg-emerald-50 text-emerald-700",
    text: "text-emerald-600",
    barActive: "bg-emerald-500",
  },
  Conclusion: {
    icon: <CheckCircle className="h-3.5 w-3.5" />,
    dot: "bg-teal-500",
    ring: "ring-teal-400",
    chip: "bg-teal-50 text-teal-700",
    text: "text-teal-600",
    barActive: "bg-teal-500",
  },
};

const MODULE_ORDER: ModuleKey[] = ["Introduction", "Overview", "Snowflake", "DBT", "Airflow", "Enrollment", "Conclusion"];

function matchesSearch(slide: Slide, query: string) {
  if (!query.trim()) return true;
  const q = query.toLowerCase();
  if (slide.title.toLowerCase().includes(q) || slide.subtitle.toLowerCase().includes(q) || slide.content.toLowerCase().includes(q)) {
    return true;
  }
  if (slide.detailedContent) {
    return slide.detailedContent.some(
      (d) => d.day.toLowerCase().includes(q) || d.title.toLowerCase().includes(q) || d.items.some((i) => i.toLowerCase().includes(q))
    );
  }
  if (slide.keyPoints) {
    return slide.keyPoints.some((k) => k.toLowerCase().includes(q));
  }
  return false;
}

export default function TrainingPresentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false); // mobile drawer
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});
  const contentRef = useRef<HTMLDivElement | null>(null);

  const slide = trainingSlides[currentSlide];

  // Group slides by module, preserving first-seen order
  const groups = useMemo(() => {
    const map = new Map<ModuleKey, { slide: Slide; index: number }[]>();
    trainingSlides.forEach((s, index) => {
      const key = s.module as ModuleKey;
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push({ slide: s, index });
    });
    return MODULE_ORDER.filter((m) => map.has(m)).map((m) => ({ module: m, items: map.get(m)! }));
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(Math.max(0, Math.min(index, trainingSlides.length - 1)));
    setIsPlaying(false);
    setSidebarOpen(false);
  };

  const nextSlide = () => goToSlide(currentSlide + 1);
  const prevSlide = () => goToSlide(currentSlide - 1);

  const toggleGroup = (m: string) => setCollapsedGroups((prev) => ({ ...prev, [m]: !prev[m] }));

  // Auto-play
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % trainingSlides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Reset content scroll position on slide change
  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [currentSlide]);

  // Keyboard navigation — ignored while typing in the search box
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA")) return;

      switch (e.key) {
        case "ArrowRight":
        case "ArrowDown":
          e.preventDefault();
          setCurrentSlide((prev) => Math.min(prev + 1, trainingSlides.length - 1));
          break;
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault();
          setCurrentSlide((prev) => Math.max(prev - 1, 0));
          break;
        case "Home":
          e.preventDefault();
          setCurrentSlide(0);
          break;
        case "End":
          e.preventDefault();
          setCurrentSlide(trainingSlides.length - 1);
          break;
        case "p":
        case "P":
          e.preventDefault();
          setIsPlaying((p) => !p);
          break;
        case "/":
          e.preventDefault();
          document.getElementById("course-search")?.focus();
          break;
        case "Escape":
          setSidebarOpen(false);
          setShowShortcuts(false);
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const progressPct = ((currentSlide + 1) / trainingSlides.length) * 100;

  return (
    <div className="h-screen flex flex-col bg-slate-50 text-slate-900 overflow-hidden">
      {/* ---------------------------------------------------------------- */}
      {/* Top bar                                                          */}
      {/* ---------------------------------------------------------------- */}
      <header className="shrink-0 border-b border-slate-200 bg-white z-30">
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 shrink-0"
            aria-label="Toggle course menu"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <div className="flex items-center gap-2.5 shrink-0">
            <div className="p-1.5 bg-blue-600 rounded-lg">
              <Database className="h-5 w-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-sm font-bold leading-tight">Snowflake + DBT + Airflow</h1>
              <p className="text-[11px] text-slate-500 leading-tight">47-Day Data Engineering Combo</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative flex-1 max-w-sm ml-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              id="course-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search a day, tool or topic…  (press /)"
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          <div className="flex items-center gap-2 ml-auto shrink-0">
            <button
              onClick={() => setIsPlaying((p) => !p)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition"
              title="Auto-advance through slides"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isPlaying ? "Pause" : "Auto-play"}
            </button>
            <button
              onClick={() => setShowShortcuts((v) => !v)}
              className="p-2 rounded-lg hover:bg-slate-100 relative"
              aria-label="Keyboard shortcuts"
              title="Keyboard shortcuts"
            >
              <Keyboard className="h-5 w-5 text-slate-500" />
              {showShortcuts && (
                <div className="absolute right-0 top-11 w-64 bg-white rounded-xl shadow-xl border border-slate-200 p-4 text-left z-40">
                  <h3 className="font-semibold text-sm mb-2">Keyboard shortcuts</h3>
                  <div className="space-y-1.5 text-xs text-slate-600">
                    <div className="flex justify-between"><span>← ↑ → ↓</span><span>Navigate</span></div>
                    <div className="flex justify-between"><span>P</span><span>Play / pause</span></div>
                    <div className="flex justify-between"><span>/</span><span>Focus search</span></div>
                    <div className="flex justify-between"><span>Home / End</span><span>First / last</span></div>
                  </div>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Progress rail */}
        <div className="h-1 w-full bg-slate-100">
          <div
            className={`h-full transition-all duration-500 ${MODULE_STYLES[slide.module as ModuleKey]?.barActive ?? "bg-blue-500"}`}
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </header>

      {/* ---------------------------------------------------------------- */}
      {/* Body: sidebar + main content                                     */}
      {/* ---------------------------------------------------------------- */}
      <div className="flex-1 flex min-h-0 relative">
        {/* Mobile backdrop */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/30 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-30 w-[300px] shrink-0 bg-white border-r border-slate-200 flex flex-col transition-transform duration-200 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
          style={{ top: 0, height: "100%" }}
        >
          <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between lg:hidden">
            <span className="font-semibold text-sm">Course Outline</span>
            <button onClick={() => setSidebarOpen(false)} className="p-1 rounded hover:bg-slate-100">
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Stat strip */}
          <div className="px-4 py-3 border-b border-slate-100 grid grid-cols-3 gap-2 text-center">
            <div>
              <div className="text-lg font-bold text-blue-600">26</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wide">Snowflake</div>
            </div>
            <div>
              <div className="text-lg font-bold text-amber-600">10</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wide">DBT</div>
            </div>
            <div>
              <div className="text-lg font-bold text-rose-600">11</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-wide">Airflow</div>
            </div>
          </div>

          {/* DAG-style nav rail */}
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <div className="relative pl-5">
              <div className="absolute left-[7px] top-1 bottom-1 w-px bg-slate-200" />
              {groups.map(({ module, items }) => {
                const style = MODULE_STYLES[module];
                const visibleItems = items.filter(({ slide: s }) => matchesSearch(s, search));
                if (search.trim() && visibleItems.length === 0) return null;
                const collapsed = collapsedGroups[module];

                return (
                  <div key={module} className="mb-1 relative">
                    <button
                      onClick={() => toggleGroup(module)}
                      className="w-full flex items-center gap-2 py-2 text-left group"
                    >
                      <span className={`absolute left-[-20px] w-3.5 h-3.5 rounded-full ${style.dot} ring-4 ring-white`} />
                      <span className={`text-xs font-bold uppercase tracking-wide ${style.text}`}>{module}</span>
                      <span className="text-[10px] text-slate-400">({items.length})</span>
                      <ChevronDown
                        className={`h-3.5 w-3.5 text-slate-400 ml-auto transition-transform ${collapsed ? "-rotate-90" : ""}`}
                      />
                    </button>

                    {!collapsed && (
                      <ul className="space-y-0.5 pb-2">
                        {visibleItems.map(({ slide: s, index }) => {
                          const active = index === currentSlide;
                          return (
                            <li key={s.id}>
                              <button
                                onClick={() => goToSlide(index)}
                                className={`w-full text-left px-2.5 py-2 rounded-lg text-sm transition flex flex-col ${
                                  active ? `bg-slate-100 ring-1 ${style.ring} font-medium` : "hover:bg-slate-50 text-slate-600"
                                }`}
                              >
                                <span className="line-clamp-1">{s.title}</span>
                                <span className="text-[11px] text-slate-400">{s.days}</span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </nav>

          <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <button onClick={() => goToSlide(0)} className="flex items-center gap-1 hover:text-slate-800">
              <Home className="h-3.5 w-3.5" /> Start over
            </button>
            <span>
              {currentSlide + 1} / {trainingSlides.length}
            </span>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0 flex flex-col">
          <div ref={contentRef} className="flex-1 overflow-y-auto">
            <div className={`bg-gradient-to-br ${slide.bgColor}`}>
              <div className="max-w-4xl mx-auto px-6 md:px-10 py-8 md:py-12">
                {/* Slide header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 rounded-2xl bg-white/80 backdrop-blur-sm shadow-sm shrink-0">{slide.icon}</div>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
                          MODULE_STYLES[slide.module as ModuleKey]?.chip ?? "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {MODULE_STYLES[slide.module as ModuleKey]?.icon}
                        {slide.module}
                      </span>
                      <span className="flex items-center text-xs text-slate-500 bg-white/70 px-2.5 py-1 rounded-full">
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        {slide.days}
                      </span>
                    </div>
                    <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight text-slate-900">{slide.title}</h1>
                    <h2 className="text-base md:text-lg text-slate-600 mt-1">{slide.subtitle}</h2>
                  </div>
                </div>

                <p className="text-base md:text-lg text-slate-700 mb-8 leading-relaxed max-w-3xl">{slide.content}</p>

                {slide.keyPoints && (
                  <div className="space-y-3">
                    <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500">Key Learning Points</h3>
                    <ul className="space-y-2.5">
                      {slide.keyPoints.map((point, idx) => (
                        <li
                          key={idx}
                          className="flex items-start bg-white/70 backdrop-blur-sm rounded-xl px-4 py-3 shadow-sm"
                        >
                          <CheckCircle className="h-5 w-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-sm md:text-base text-slate-700">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {slide.detailedContent && (
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500">Curriculum Breakdown</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {slide.detailedContent.map((day, idx) => (
                        <div
                          key={idx}
                          className="bg-white/85 backdrop-blur-sm rounded-xl p-5 shadow-sm border border-white/60"
                        >
                          <div className="flex items-center mb-3">
                            <span
                              className={`font-mono text-[11px] font-bold px-2 py-1 rounded-md mr-3 shrink-0 ${
                                MODULE_STYLES[slide.module as ModuleKey]?.chip ?? "bg-slate-100 text-slate-700"
                              }`}
                            >
                              {day.day}
                            </span>
                            <h4 className="font-bold text-base leading-snug">{day.title}</h4>
                          </div>
                          <ul className="space-y-1.5">
                            {day.items.map((item, itemIdx) => (
                              <li key={itemIdx} className="flex items-start text-sm">
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-1.5 mr-2 flex-shrink-0" />
                                <span className="text-slate-700">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Prev / Next bar — always visible, never covers content */}
          <div className="shrink-0 border-t border-slate-200 bg-white px-4 md:px-6 py-3 flex items-center justify-between gap-3">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Previous</span>
            </button>

            <span className="text-xs text-slate-400 text-center flex-1 truncate">
              {currentSlide + 1} of {trainingSlides.length} · {slide.title}
            </span>

            <button
              onClick={nextSlide}
              disabled={currentSlide === trainingSlides.length - 1}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
