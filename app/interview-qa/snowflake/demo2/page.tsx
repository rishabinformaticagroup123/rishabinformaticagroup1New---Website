"use client";

import { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  ChevronUp, 
  ChevronDown, 
  Snowflake, 
  Database, 
  Code, 
  Cloud, 
  Play, 
  Pause, 
  Home, 
  Download, 
  Calendar,
  CheckCircle,
  Users,
  Settings,
  Zap,
  Lock,
  BarChart,
  Clock,
  Share2,
  DollarSign,
  FileText,
  Terminal,
  Server,
  GitBranch,
  Workflow,
  Mail,
  BookOpen,
  RefreshCw
} from 'lucide-react';

// Define slide content based on your training modules
const trainingSlides = [
  // INTRODUCTION
  {
    id: 1,
    title: "Snowflake + DBT + Informatica CAI",
    subtitle: "Comprehensive Combo Training Program",
    content: "A complete 45-day intensive training program covering the modern data stack: Snowflake for cloud data warehousing, DBT for transformation, and Informatica CAI for application integration.",
    module: "Introduction",
    icon: <Database className="h-20 w-20 text-blue-600" />,
    bgColor: "from-blue-50 to-indigo-100",
    days: "45 Days",
    keyPoints: [
      "Hands-on, project-based learning",
      "Real-world implementation scenarios",
      "Industry-recognized skillset"
    ]
  },

  // SNOWFLAKE MODULE OVERVIEW
  {
    id: 2,
    title: "Snowflake Module",
    subtitle: "Days 1-26: Cloud Data Platform Mastery",
    content: "Comprehensive coverage of Snowflake's architecture, features, and implementation patterns for modern data engineering.",
    module: "Snowflake",
    icon: <Snowflake className="h-20 w-20 text-blue-600" />,
    bgColor: "from-cyan-50 to-blue-100",
    days: "26 Days",
    keyPoints: [
      "Architecture & Setup",
      "Data Loading & Transformation",
      "Security & Performance",
      "Advanced Features & Real-time Implementation"
    ]
  },

  // SNOWFLAKE WEEK 1
  {
    id: 3,
    title: "Week 1: Foundations & Setup",
    subtitle: "Days 1-7: Core Concepts & Environment Setup",
    content: "Establishing the foundation with architecture understanding, environment setup, and basic operations.",
    module: "Snowflake",
    icon: <Settings className="h-16 w-16 text-blue-600" />,
    bgColor: "from-blue-50 to-sky-100",
    days: "Days 1-7",
    detailedContent: [
      { day: 1, title: "Introduction & Setup", items: ["Demo & Trial Account setup", "Snowflake Architecture & Overview", "Snowflake Editions & Scope", "Cloud Platforms Overview"] },
      { day: 2, title: "Connecting & Tools", items: ["SnowSQL CLI Installation", "Snowsight web interface", "Partner Connect overview", "Working with Worksheets"] },
      { day: 3, title: "Roles & Users", items: ["Create Roles & Users", "Role/User Privileges", "Resource Monitor basics"] },
      { day: 4, title: "Virtual Warehouses", items: ["Creation & Privileges", "Resource Monitors & Alerts", "Credit Quotas", "Suspension/Resumption"] },
      { day: 5, title: "Databases & Schemas", items: ["Create Databases & Schemas", "Privileges management", "Storage & Micro-partitions"] },
      { day: 6, title: "Tables & Constraints", items: ["Table Types: Permanent, Transient, Temporary", "DDL/DML Basics", "Primary Key, Foreign Key", "Iceberg Table creation"] },
      { day: 7, title: "Joins & Set Operators", items: ["Inner, Outer, Self, Cross Joins", "Union, Union All, Intersect, Minus", "Views and Indexes"] }
    ]
  },

  // SNOWFLAKE WEEK 2
  {
    id: 4,
    title: "Week 2: Data Operations",
    subtitle: "Days 8-14: Data Loading & Management",
    content: "Mastering data loading patterns from various sources and implementing data management strategies.",
    module: "Snowflake",
    icon: <Database className="h-16 w-16 text-blue-600" />,
    bgColor: "from-sky-50 to-cyan-100",
    days: "Days 8-14",
    detailedContent: [
      { day: 8, title: "Data Loading – Local", items: ["Load CSV, JSON, XML from local", "Troubleshooting bulk load", "Lab: Local to Snowflake"] },
      { day: 9, title: "Data Loading – Cloud", items: ["AWS S3 integration", "Loading CSV, JSON, Parquet", "Snowpipe introduction"] },
      { day: 10, title: "Stages & CLI", items: ["Internal, External, Named Stages", "CLI stages usage", "Lab exercises"] },
      { day: 11, title: "Time Travel & Fail Safe", items: ["Time Travel operations", "Fail Safe Recovery", "Lab exercises"] },
      { day: 12, title: "Zero Copy Cloning", items: ["Clone tables, schemas, databases", "Fail-Safe with cloning", "Querying historical data"] },
      { day: 13, title: "Tasks & CDC", items: ["Creating tasks & parent-child tasks", "Task scheduling", "CDC using Insert/Update/Delete"] },
      { day: 14, title: "Streams & Advanced Loading", items: ["Streams concepts", "Loading semi-structured data", "Continuous loading using Snowpipe"] }
    ]
  },

  // SNOWFLAKE WEEK 3
  {
    id: 5,
    title: "Week 3: Advanced Features",
    subtitle: "Days 15-21: Security, Performance & Data Sharing",
    content: "Implementing advanced security features, performance optimization, and data sharing capabilities.",
    module: "Snowflake",
    icon: <Lock className="h-16 w-16 text-blue-600" />,
    bgColor: "from-indigo-50 to-purple-100",
    days: "Days 15-21",
    detailedContent: [
      { day: 15, title: "Data Masking & Security", items: ["Column-level & Row-level security", "Data masking policies"] },
      { day: 16, title: "Performance Tuning", items: ["Partitioning, Clustering", "Materialized Views", "Query Tuning best practices"] },
      { day: 17, title: "UDFs & Procedures", items: ["User-Defined Functions (UDFs)", "Stored Procedures", "Python integration"] },
      { day: 18, title: "Views & Advanced Querying", items: ["Normal views", "Materialized views", "Secure views"] },
      { day: 19, title: "Slowly Changing Dimensions", items: ["SCD Types 1, 2, 3", "Implementation in Snowflake"] },
      { day: 20, title: "Data Sharing", items: ["Provider/Consumer roles", "Shares, Secure Objects", "Reader Accounts", "Lab exercises"] },
      { day: 21, title: "Pricing & Cost Control", items: ["Storage, Cloud Services costs", "Virtual Warehouses pricing", "Credit monitoring & optimization"] }
    ]
  },

  // SNOWFLAKE WEEK 4
  {
    id: 6,
    title: "Week 4: Project Implementation",
    subtitle: "Days 22-26: Hands-on Project & Final Lab",
    content: "Applying all learned concepts through a comprehensive real-world project implementation.",
    module: "Snowflake",
    icon: <Zap className="h-16 w-16 text-blue-600" />,
    bgColor: "from-purple-50 to-violet-100",
    days: "Days 22-26",
    detailedContent: [
      { day: 22, title: "Dates & Timestamps", items: ["Date & timestamp handling", "Conversions & functions"] },
      { day: 23, title: "Dynamic Tables & Best Practices", items: ["Dynamic tables", "Snowflake development best practices"] },
      { day: 24, title: "Sample Project Introduction", items: ["Real-time project overview", "Requirements & architecture"] },
      { day: 25, title: "Real-time Data Loading Lab", items: ["Load structured and semi-structured data", "Implement CDC and streams"] },
      { day: 26, title: "Final Lab & Revision", items: ["Review all Snowflake concepts", "Hands-on exercises", "Comprehensive assessment"] }
    ]
  },

  // DBT MODULE OVERVIEW
  {
    id: 7,
    title: "DBT Module",
    subtitle: "Days 27-36: Data Transformation & Modeling",
    content: "Master DBT (Data Build Tool) for transforming data directly in your data warehouse with software engineering best practices.",
    module: "DBT",
    icon: <Code className="h-20 w-20 text-amber-600" />,
    bgColor: "from-amber-50 to-orange-100",
    days: "10 Days",
    keyPoints: [
      "Models & Materializations",
      "Testing & Documentation",
      "Macros & Jinja Templating",
      "Production Deployment"
    ]
  },

  // DBT DETAILS
  {
    id: 8,
    title: "DBT Detailed Curriculum",
    subtitle: "Comprehensive DBT Training Program",
    content: "From basic setup to advanced deployment strategies with hands-on labs.",
    module: "DBT",
    icon: <GitBranch className="h-16 w-16 text-amber-600" />,
    bgColor: "from-orange-50 to-amber-100",
    days: "Days 27-36",
    detailedContent: [
      { day: 27, title: "DBT Introduction & Setup", items: ["DBT Cloud Overview", "Account setup & configuration", "Connect DBT to Snowflake"] },
      { day: 28, title: "Models & Materializations", items: ["DBT Models, Modular SQL", "Materialization types", "Table, Incremental, Ephemeral"] },
      { day: 29, title: "Sources & Seeds", items: ["Source Configuration & Freshness", "Seeds configuration", "Loading data using DBT"] },
      { day: 30, title: "Tests & Snapshots", items: ["Generic & Singular Tests", "Creating Snapshots", "Incremental strategies"] },
      { day: 31, title: "Macros & Jinja", items: ["Writing Macros", "Jinja templating in DBT"] },
      { day: 32, title: "Hooks & Documentation", items: ["Hooks setup", "Auto-generating Documentation", "BI dashboard integration"] },
      { day: 33, title: "Analysis & Packages", items: ["DBT Analysis", "Using Packages", "Version control & GitHub Integration"] },
      { day: 34, title: "ELT Best Practices & Deployment", items: ["ELT pipelines with DBT", "Modular transformation techniques", "Deployment strategies"] },
      { day: 35, title: "DBT Lab", items: ["Real-time transformations", "Integration with Snowflake project"] },
      { day: 36, title: "Revision & Project Lab", items: ["Hands-on exercises", "DBT project implementation"] }
    ]
  },

  // INFORMATICA CAI MODULE OVERVIEW
  {
    id: 9,
    title: "Informatica CAI Module",
    subtitle: "Days 37-45: Cloud Application Integration",
    content: "Master Informatica Cloud Application Integration (CAI) for seamless application and data integration workflows.",
    module: "CAI",
    icon: <Workflow className="h-20 w-20 text-emerald-600" />,
    bgColor: "from-emerald-50 to-green-100",
    days: "9 Days",
    keyPoints: [
      "Service & App Connectors",
      "Process Orchestration",
      "Real-time Integration",
      "Error Handling & Monitoring"
    ]
  },

  // CAI DETAILS
  {
    id: 10,
    title: "CAI Detailed Curriculum",
    subtitle: "End-to-End Integration Platform Training",
    content: "Building, deploying, and monitoring integration processes with Informatica CAI.",
    module: "CAI",
    icon: <Server className="h-16 w-16 text-emerald-600" />,
    bgColor: "from-green-50 to-emerald-100",
    days: "Days 37-45",
    detailedContent: [
      { day: 37, title: "Introduction to CAI", items: ["CAI Overview", "IICS platform introduction", "Service & App Connectors"] },
      { day: 38, title: "Creating Service Connectors", items: ["Public API integration", "COVID/Weather API lab", "JSON response mapping"] },
      { day: 39, title: "Creating App Connectors", items: ["Connect to Snowflake DB", "CRUD operations through App Connector"] },
      { day: 40, title: "Process Creation", items: ["Process orchestration in CAI", "Scheduling & monitoring", "Lab: End-to-end CAI process"] },
      { day: 41, title: "Error Handling & Notifications", items: ["Error handling strategies", "Email notifications & logging", "Lab exercises"] },
      { day: 42, title: "Real-Time Integration Lab", items: ["Snowflake + DBT + CAI integration", "Load data through CAI into Snowflake"] },
      { day: 43, title: "Advanced Lab & Debugging", items: ["Complex API data handling", "Troubleshooting & optimization"] },
      { day: 44, title: "Project Implementation", items: ["Real-time project execution", "Documentation & best practices"] },
      { day: 45, title: "Project Review & Career Prep", items: ["Project presentation", "Resume review", "Mock interview sessions"] }
    ]
  },

  // INTEGRATION PROJECT
  {
    id: 11,
    title: "End-to-End Integration Project",
    subtitle: "Real-world Implementation Scenario",
    content: "Combine Snowflake, DBT, and Informatica CAI to build a complete data pipeline from ingestion to business intelligence.",
    module: "Integration",
    icon: <RefreshCw className="h-20 w-20 text-violet-600" />,
    bgColor: "from-violet-50 to-purple-100",
    days: "Final Project",
    keyPoints: [
      "Data ingestion using CAI connectors",
      "Transformation with DBT models",
      "Storage & processing in Snowflake",
      "Automated monitoring & alerts"
    ]
  },

  // CONCLUSION
  {
    id: 12,
    title: "Training Outcomes & Certification",
    subtitle: "What You'll Achieve",
    content: "Upon completion, you'll be equipped with in-demand skills for modern data engineering roles.",
    module: "Conclusion",
    icon: <CheckCircle className="h-20 w-20 text-green-600" />,
    bgColor: "from-green-50 to-emerald-100",
    days: "Career Ready",
    keyPoints: [
      "Snowflake Certified Practitioner level skills",
      "Production-ready DBT project experience",
      "Real-world CAI integration knowledge",
      "Comprehensive portfolio project",
      "Industry-recognized expertise"
    ]
  }
];

export default function TrainingPresentation() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showNavigation, setShowNavigation] = useState(true);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Auto-play functionality
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % trainingSlides.length);
      }, 5000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
          e.preventDefault();
          setCurrentSlide((prev) => Math.min(prev + 1, trainingSlides.length - 1));
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          setCurrentSlide((prev) => Math.max(prev - 1, 0));
          break;
        case 'Home':
          e.preventDefault();
          setCurrentSlide(0);
          break;
        case 'End':
          e.preventDefault();
          setCurrentSlide(trainingSlides.length - 1);
          break;
        case 'p':
        case 'P':
          e.preventDefault();
          setIsPlaying(!isPlaying);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying]);

  // Scroll navigation
  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 0) {
        setCurrentSlide((prev) => Math.min(prev + 1, trainingSlides.length - 1));
      } else {
        setCurrentSlide((prev) => Math.max(prev - 1, 0));
      }
    };

    window.addEventListener('wheel', handleScroll, { passive: false });
    return () => window.removeEventListener('wheel', handleScroll);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, trainingSlides.length - 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const ModuleIcon = ({ module }: { module: string }) => {
    switch (module) {
      case 'Snowflake':
        return <Snowflake className="h-6 w-6 text-blue-600" />;
      case 'DBT':
        return <Code className="h-6 w-6 text-amber-600" />;
      case 'CAI':
        return <Workflow className="h-6 w-6 text-emerald-600" />;
      default:
        return <Database className="h-6 w-6 text-gray-600" />;
    }
  };

  const SlideContent = ({ slide }: { slide: typeof trainingSlides[0] }) => {
    return (
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg bg-white/80 backdrop-blur-sm`}>
              {slide.icon}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm">
                  {slide.module}
                </span>
                <span className="flex items-center text-sm text-gray-600">
                  <Calendar className="h-4 w-4 mr-1" />
                  {slide.days}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mt-2">{slide.title}</h1>
              <h2 className="text-xl md:text-2xl text-gray-600 mt-1">{slide.subtitle}</h2>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pr-4">
          <div className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
            {slide.content}
          </div>

          {slide.keyPoints && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">Key Learning Points:</h3>
              <ul className="space-y-3">
                {slide.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1 flex-shrink-0" />
                    <span className="text-lg">{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {slide.detailedContent && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800">Daily Breakdown:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {slide.detailedContent.map((day, idx) => (
                  <div key={idx} className="bg-white/80 backdrop-blur-sm rounded-xl p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <span className="font-bold text-blue-700">D{day.day}</span>
                        </div>
                        <h4 className="font-bold text-lg">{day.title}</h4>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {day.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start text-sm">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 mr-2 flex-shrink-0"></div>
                          <span className="text-gray-700">{item}</span>
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
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Database className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Snowflake + DBT + CAI Training</h1>
                <p className="text-sm text-gray-600">Interactive Presentation</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                {isPlaying ? (
                  <>
                    <Pause className="h-5 w-5" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="h-5 w-5" />
                    <span>Auto-play</span>
                  </>
                )}
              </button>
              
              <button
                onClick={() => setShowNavigation(!showNavigation)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <ChevronUp className={`h-5 w-5 transform ${showNavigation ? '' : 'rotate-180'}`} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-20 pb-24">
        <div className="container mx-auto px-6">
          {/* Current Slide */}
          <div className="relative h-[calc(100vh-10rem)] rounded-2xl overflow-hidden shadow-2xl">
            <div 
              className={`absolute inset-0 bg-gradient-to-br ${trainingSlides[currentSlide].bgColor} transition-all duration-500`}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
            </div>
            
            <div className="relative h-full p-8 md:p-12">
              <SlideContent slide={trainingSlides[currentSlide]} />
            </div>

            {/* Slide Progress */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gray-200/50">
              <div 
                className="h-full bg-blue-600 transition-all duration-500"
                style={{ width: `${((currentSlide + 1) / trainingSlides.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Navigation Controls */}
          {showNavigation && (
            <div className="flex items-center justify-between mt-8 px-4">
              <button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-white shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="h-6 w-6" />
                <span className="font-medium">Previous</span>
              </button>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => goToSlide(0)}
                  className="p-3 hover:bg-gray-100 rounded-xl transition"
                >
                  <Home className="h-5 w-5" />
                </button>
                
                <div className="flex space-x-1">
                  {trainingSlides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => goToSlide(idx)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        idx === currentSlide 
                          ? 'bg-blue-600 scale-125' 
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <button
                onClick={nextSlide}
                disabled={currentSlide === trainingSlides.length - 1}
                className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-white shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <span className="font-medium">Next</span>
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          )}
        </div>
      </main>

      {/* Slide Thumbnails */}
      {showNavigation && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm border-t border-gray-200 py-4">
          <div className="container mx-auto px-6">
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {trainingSlides.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(idx)}
                  className={`flex-shrink-0 w-48 rounded-lg p-4 text-left transition-all ${
                    idx === currentSlide 
                      ? 'ring-2 ring-blue-500 bg-white shadow-lg' 
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <ModuleIcon module={slide.module} />
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-gray-100">
                        {slide.module}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {slide.days}
                    </div>
                  </div>
                  <h3 className="font-semibold text-sm line-clamp-2">{slide.title}</h3>
                  <div className={`w-full h-1 mt-2 rounded-full ${
                    idx === currentSlide ? 'bg-blue-500' : 'bg-gray-300'
                  }`}></div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Keyboard Shortcuts Help */}
      <div className="fixed top-24 right-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200">
        <h3 className="font-semibold text-sm mb-2">Keyboard Shortcuts</h3>
        <div className="space-y-1 text-xs text-gray-600">
          <div className="flex justify-between">
            <span>← ↑ → ↓</span>
            <span>Navigate</span>
          </div>
          <div className="flex justify-between">
            <span>Space</span>
            <span>Next Slide</span>
          </div>
          <div className="flex justify-between">
            <span>P</span>
            <span>Play/Pause</span>
          </div>
          <div className="flex justify-between">
            <span>Home/End</span>
            <span>First/Last</span>
          </div>
        </div>
      </div>

      {/* Current Slide Indicator */}
      <div className="fixed top-24 left-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200">
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">{currentSlide + 1}</div>
          <div className="text-xs text-gray-500">of {trainingSlides.length}</div>
          <div className="text-sm font-medium mt-1">
            {trainingSlides[currentSlide].module}
          </div>
        </div>
      </div>
    </div>
  );
}