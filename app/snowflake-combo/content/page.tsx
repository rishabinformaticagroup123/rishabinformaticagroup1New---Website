"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  ChevronLeft,
  Database, 
  Zap, 
  Shield, 
  DollarSign, 
  Users, 
  Cloud, 
  Code,
  TrendingUp,
  Target,
  Clock,
  Layers,
  SnowflakeIcon,
  ArrowRight,
  CheckCircle,
  Cpu,
  Lock,
  Share2,
  GitBranch,
  RefreshCw,
  BarChart3,
  Smartphone,
  BookOpen,
  MessageSquare,
  Calendar,
  Award,
  CloudRain,
  Server,
  GitMerge,
  Globe,
  FileJson,
  Table,
  Activity,
  Scale,
  Upload,
  Download,
  Eye,
  EyeOff
} from 'lucide-react';

export default function SnowflakeDemoPresentation() {
  const [activeSection, setActiveSection] = useState(0);
  const [progress, setProgress] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const sections = [
    {
      id: 'intro',
      title: 'Why Snowflake?',
      subtitle: 'The Future of Data Engineering',
      icon: <SnowflakeIcon className="w-6 h-6" />
    },
    {
      id: 'architecture',
      title: 'Unique Architecture',
      subtitle: 'Multi-cluster Shared Data Architecture',
      icon: <Layers className="w-6 h-6" />
    },
    {
      id: 'features-basic',
      title: 'Basic Features',
      subtitle: 'Core Snowflake Capabilities',
      icon: <Database className="w-6 h-6" />
    },
    {
      id: 'features-advanced',
      title: 'Advanced Features',
      subtitle: 'Enterprise-grade Capabilities',
      icon: <Zap className="w-6 h-6" />
    },
    {
      id: 'workloads',
      title: 'Workload Management',
      subtitle: 'Virtual Warehouses Explained',
      icon: <Server className="w-6 h-6" />
    },
    {
      id: 'training',
      title: 'Combo Training',
      subtitle: 'Snowflake + DBT + CAI',
      icon: <BookOpen className="w-6 h-6" />
    },
    {
      id: 'methodology',
      title: 'Training Methodology',
      subtitle: 'Interview-focused Learning',
      icon: <Target className="w-6 h-6" />
    },
    {
      id: 'demo',
      title: 'Live Demo',
      subtitle: 'Snowflake in Action',
      icon: <Activity className="w-6 h-6" />
    },
    {
      id: 'cta',
      title: 'Get Started',
      subtitle: 'Begin Your Snowflake Journey',
      icon: <ArrowRight className="w-6 h-6" />
    }
  ];

  // Progress calculation
  useEffect(() => {
    setProgress(((activeSection + 1) / sections.length) * 100);
    // Scroll to top of content when section changes
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
  }, [activeSection]);

  const nextSection = () => {
    if (activeSection < sections.length - 1) {
      setActiveSection(activeSection + 1);
    }
  };

  const prevSection = () => {
    if (activeSection > 0) {
      setActiveSection(activeSection - 1);
    }
  };

  const renderContent = () => {
    const currentSection = sections[activeSection];

    switch(currentSection.id) {
      case 'intro':
        return (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="inline-flex items-center justify-center p-6 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl mb-8"
              >
                <SnowflakeIcon className="w-20 h-20 text-white" />
              </motion.div>
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Why Snowflake?
              </h1>
              <p className="text-2xl text-gray-600 dark:text-gray-300">
                Revolutionizing Data Engineering in the Cloud Era
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
                <h2 className="text-3xl font-bold mb-6">The Problem with Traditional Data Warehouses</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl">
                    <h3 className="font-bold text-lg text-red-600 dark:text-red-400">❌ Traditional Challenges</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                        <span>Fixed compute & storage coupling</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                        <span>Limited concurrent users</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                        <span>Manual scaling & maintenance</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                        <span>High TCO & complex management</span>
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
                    <h3 className="font-bold text-lg text-green-600 dark:text-green-400">✅ Snowflake Solution</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <span>Separated storage & compute</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <span>Unlimited concurrent workloads</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <span>Automatic scaling & zero maintenance</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <span>Pay-per-second pricing</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6">
                  <h3 className="text-2xl font-bold mb-4">Market Impact</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { value: '8,000+', label: 'Global Customers', color: 'text-blue-600' },
                      { value: '70%', label: 'Cost Reduction', color: 'text-green-600' },
                      { value: '200x', label: 'Faster Queries', color: 'text-purple-600' },
                      { value: '#1', label: 'Data Cloud Platform', color: 'text-amber-600' }
                    ].map((stat, idx) => (
                      <div key={idx} className="text-center">
                        <div className={`text-3xl font-bold ${stat.color}`}>{stat.value}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'architecture':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">Snowflake's Revolutionary Architecture</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">Multi-cluster Shared Data Architecture</p>
            </div>

            <div className="space-y-8">
              {/* Core Concept Explanation */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
                <h2 className="text-3xl font-bold mb-6">Three-Tier Architecture</h2>
                
                <div className="space-y-12">
                  {/* Storage Layer */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-blue-500 rounded-xl">
                        <Database className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">1. Shared Data Storage Layer</h3>
                        <p className="text-gray-600 dark:text-gray-400">Centralized cloud object storage</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
                      <p className="text-lg mb-4">
                        <strong>Theoretical Concept:</strong> Snowflake stores all data in a centralized, 
                        highly optimized columnar format in cloud object storage (AWS S3, Azure Blob, or Google Cloud Storage). 
                        This separation allows unlimited storage scaling independently from compute.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        {[
                          { icon: <CloudRain />, title: 'Micro-partitions', desc: '50-500MB compressed' },
                          { icon: <Scale />, title: 'Automatic Clustering', desc: 'Auto-optimized storage' },
                          { icon: <Lock />, title: 'Encrypted', desc: 'End-to-end encryption' }
                        ].map((item, idx) => (
                          <div key={idx} className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg">
                            {item.icon}
                            <div className="font-bold mt-2">{item.title}</div>
                            <div className="text-sm text-gray-500">{item.desc}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Compute Layer */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-green-500 rounded-xl">
                        <Server className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">2. Compute Layer (Virtual Warehouses)</h3>
                        <p className="text-gray-600 dark:text-gray-400">Independent, scalable compute clusters</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
                      <p className="text-lg mb-4">
                        <strong>Theoretical Concept:</strong> Virtual Warehouses are MPP (Massively Parallel Processing) 
                        compute clusters that can be started, stopped, and scaled independently. Each warehouse 
                        processes queries against the shared storage layer without data movement.
                      </p>
                      
                      <div className="mt-6">
                        <h4 className="text-xl font-bold mb-4">Virtual Warehouse Types & Use Cases</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {[
                            { 
                              name: 'ETL Warehouse', 
                              size: 'X-Large → 6XL',
                              users: 'Data Engineers',
                              purpose: 'Batch processing, data loading',
                              color: 'bg-blue-500'
                            },
                            { 
                              name: 'BI Warehouse', 
                              size: 'Large → X-Large',
                              users: 'Analysts & Business Users',
                              purpose: 'Dashboards, reporting',
                              color: 'bg-green-500'
                            },
                            { 
                              name: 'Data Science', 
                              size: 'Medium → Large',
                              users: 'Data Scientists',
                              purpose: 'ML training, ad-hoc queries',
                              color: 'bg-purple-500'
                            }
                          ].map((vw, idx) => (
                            <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                              <div className="flex items-center space-x-3 mb-3">
                                <div className={`w-3 h-3 rounded-full ${vw.color}`}></div>
                                <h5 className="font-bold text-lg">{vw.name}</h5>
                              </div>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-gray-500">Size:</span>
                                  <span className="font-semibold">{vw.size}</span>
                                </div>
                                <div className="flex justify-between">
                                  <span className="text-gray-500">Users:</span>
                                  <span className="font-semibold">{vw.users}</span>
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">{vw.purpose}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cloud Services */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-purple-500 rounded-xl">
                        <Globe className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">3. Cloud Services Layer</h3>
                        <p className="text-gray-600 dark:text-gray-400">The brain of Snowflake</p>
                      </div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
                      <p className="text-lg mb-4">
                        <strong>Theoretical Concept:</strong> This is the coordination layer that manages all 
                        Snowflake services - authentication, infrastructure management, metadata, query parsing, 
                        optimization, and access control. It's a multi-tenant service that automatically scales.
                      </p>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                        {[
                          'Authentication',
                          'Query Optimization',
                          'Transaction Management',
                          'Metadata Management',
                          'Access Control',
                          'Infrastructure Mgmt',
                          'Result Caching',
                          'Auto-scaling'
                        ].map((service, idx) => (
                          <div key={idx} className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                            <div className="font-medium">{service}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Architecture Diagram Summary */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6">Key Architectural Advantages</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {[
                      'No data movement between layers',
                      'Unlimited concurrent workloads',
                      'Independent scaling of compute',
                      'Automatic data optimization'
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                        <span className="text-lg">{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-4">
                    {[
                      'Zero-copy cloning',
                      'Time Travel capabilities',
                      'Secure Data Sharing',
                      'Multi-cloud support'
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                        <span className="text-lg">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'features-basic':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">Basic Snowflake Features</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">Core Capabilities Every User Should Know</p>
            </div>

            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: 'Data Loading & Unloading',
                    icon: <Upload className="w-8 h-8" />,
                    color: 'from-blue-500 to-cyan-500',
                    features: [
                      'Bulk loading from cloud storage',
                      'Continuous loading with Snowpipe',
                      'Support for CSV, JSON, Parquet, XML',
                      'Semi-structured data handling'
                    ],
                    explanation: 'Snowflake supports various data formats and provides COPY command for bulk loading and UNLOAD for exporting data.'
                  },
                  {
                    title: 'Time Travel & Fail-safe',
                    icon: <Clock className="w-8 h-8" />,
                    color: 'from-purple-500 to-pink-500',
                    features: [
                      'Query historical data (0-90 days)',
                      'Undo accidental operations',
                      'Fail-safe for disaster recovery',
                      'Query previous versions'
                    ],
                    explanation: 'Time Travel allows accessing historical data at any point within retention period. Fail-safe provides 7-day disaster recovery.'
                  },
                  {
                    title: 'Zero-copy Cloning',
                    icon: <GitMerge className="w-8 h-8" />,
                    color: 'from-green-500 to-emerald-500',
                    features: [
                      'Instant database/schema/table copies',
                      'No additional storage cost initially',
                      'Independent lifecycle',
                      'Perfect for Dev/Test environments'
                    ],
                    explanation: 'Creates instant, space-efficient copies of database objects without duplicating data until changes are made.'
                  },
                  {
                    title: 'Result Caching',
                    icon: <Database className="w-8 h-8" />,
                    color: 'from-amber-500 to-orange-500',
                    features: [
                      'Automatic query result caching',
                      '24-hour cache validity',
                      'Persistent across warehouse restarts',
                      'Significant cost savings'
                    ],
                    explanation: 'Automatically caches query results for 24 hours. Identical queries return instantly from cache without compute cost.'
                  }
                ].map((feature, idx) => (
                  <div key={idx} className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} text-white mb-4`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                    <ul className="space-y-2 mb-6">
                      {feature.features.map((item, fIdx) => (
                        <li key={fIdx} className="flex items-start space-x-2">
                          <ChevronRight className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4">
                      <p className="text-gray-700 dark:text-gray-300">{feature.explanation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'features-advanced':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">Advanced Snowflake Features</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">Enterprise-grade Capabilities</p>
            </div>

            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  {[
                    {
                      title: 'Secure Data Sharing',
                      icon: <Share2 className="w-6 h-6" />,
                      description: 'Share live, ready-to-query data with other Snowflake accounts without copying or moving data.',
                      useCase: 'Provider-Consumer model for data monetization'
                    },
                    {
                      title: 'Dynamic Data Masking',
                      icon: <EyeOff className="w-6 h-6" />,
                      description: 'Apply masking policies to sensitive columns based on user roles at query runtime.',
                      useCase: 'GDPR/Compliance requirements'
                    },
                    {
                      title: 'Row-level Security',
                      icon: <Lock className="w-6 h-6" />,
                      description: 'Control access to rows in a table based on user attributes or roles.',
                      useCase: 'Multi-tenant applications'
                    }
                  ].map((feature, idx) => (
                    <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="p-2 bg-blue-500 rounded-lg text-white">
                          {feature.icon}
                        </div>
                        <h3 className="text-xl font-bold">{feature.title}</h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">{feature.description}</p>
                      <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                        Use Case: {feature.useCase}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-6">
                  {[
                    {
                      title: 'Materialized Views',
                      icon: <Table className="w-6 h-6" />,
                      description: 'Pre-computed result sets that automatically refresh for faster query performance.',
                      benefit: 'Up to 1000x faster query performance'
                    },
                    {
                      title: 'Streams & Tasks',
                      icon: <RefreshCw className="w-6 h-6" />,
                      description: 'CDC (Change Data Capture) implementation and automated task scheduling.',
                      benefit: 'Real-time data processing pipelines'
                    },
                    {
                      title: 'Snowpark',
                      icon: <Code className="w-6 h-6" />,
                      description: 'Developer framework for Python, Java, and Scala to build complex data pipelines.',
                      benefit: 'Bring compute to data, not data to compute'
                    }
                  ].map((feature, idx) => (
                    <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="p-2 bg-green-500 rounded-lg text-white">
                          {feature.icon}
                        </div>
                        <h3 className="text-xl font-bold">{feature.title}</h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">{feature.description}</p>
                      <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                        Benefit: {feature.benefit}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing Model */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6">Snowflake Pricing Model</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl">
                    <DollarSign className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <h4 className="font-bold text-lg mb-2">Compute Costs</h4>
                    <div className="text-3xl font-bold text-green-600">$2.00</div>
                    <div className="text-gray-600 dark:text-gray-400">per credit/hour</div>
                    <div className="mt-4 text-sm">Billed per-second with 60-second minimum</div>
                  </div>
                  
                  <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl">
                    <Database className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                    <h4 className="font-bold text-lg mb-2">Storage Costs</h4>
                    <div className="text-3xl font-bold text-blue-600">$23.00</div>
                    <div className="text-gray-600 dark:text-gray-400">per TB/month</div>
                    <div className="mt-4 text-sm">Compressed storage, billed monthly</div>
                  </div>
                  
                  <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl">
                    <Cloud className="w-12 h-12 text-purple-500 mx-auto mb-4" />
                    <h4 className="font-bold text-lg mb-2">Cloud Services</h4>
                    <div className="text-3xl font-bold text-purple-600">10%</div>
                    <div className="text-gray-600 dark:text-gray-400">of compute costs</div>
                    <div className="mt-4 text-sm">Free up to $10/day, then included</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'workloads':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">Virtual Warehouses Deep Dive</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">Managing Multiple Workloads Efficiently</p>
            </div>

            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
                <h2 className="text-3xl font-bold mb-6">Multi-cluster Warehouses</h2>
                
                <div className="space-y-6">
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
                    <h3 className="text-2xl font-bold mb-4">Theoretical Concept</h3>
                    <p className="text-lg mb-6">
                      <strong>Multi-cluster warehouses</strong> allow a single warehouse to automatically scale 
                      out to multiple clusters to handle concurrent queries. This is different from having multiple 
                      independent warehouses - here, multiple clusters work together as a single logical warehouse.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="text-xl font-bold">Scaling Modes</h4>
                        {[
                          { mode: 'Standard', desc: 'Single cluster, manual scaling' },
                          { mode: 'Economy', desc: 'Multiple clusters, queries wait in queue' },
                          { mode: 'Maximized', desc: 'Multiple clusters, queries start immediately' }
                        ].map((item, idx) => (
                          <div key={idx} className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                            <div className="font-bold text-blue-600">{item.mode}</div>
                            <div className="text-sm text-gray-600">{item.desc}</div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="text-xl font-bold">Auto-scaling Policy</h4>
                        {[
                          { policy: 'Minimum Clusters', value: '1', desc: 'Always running clusters' },
                          { policy: 'Maximum Clusters', value: '10', desc: 'Maximum auto-scale limit' },
                          { policy: 'Scaling Factor', value: 'Queued queries', desc: 'Triggers scaling' }
                        ].map((item, idx) => (
                          <div key={idx} className="p-4 bg-white dark:bg-gray-800 rounded-lg">
                            <div className="font-bold text-green-600">{item.policy}: {item.value}</div>
                            <div className="text-sm text-gray-600">{item.desc}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6">
                      <h4 className="text-xl font-bold mb-4">Benefits</h4>
                      <ul className="space-y-3">
                        {[
                          'Handles concurrent users seamlessly',
                          'Automatic load balancing',
                          'No query queuing delays',
                          'Cost-effective scaling'
                        ].map((item, idx) => (
                          <li key={idx} className="flex items-center space-x-2">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6">
                      <h4 className="text-xl font-bold mb-4">Use Cases</h4>
                      <ul className="space-y-3">
                        {[
                          'Large BI deployments',
                          'SaaS applications',
                          'High-concurrency reporting',
                          'Peak load management'
                        ].map((item, idx) => (
                          <li key={idx} className="flex items-center space-x-2">
                            <Target className="w-5 h-5 text-purple-500" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Warehouse Sizing */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6">Warehouse Sizing Guide</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-300 dark:border-gray-700">
                        <th className="py-3 px-4 text-left">Size</th>
                        <th className="py-3 px-4 text-left">Servers</th>
                        <th className="py-3 px-4 text-left">Memory</th>
                        <th className="py-3 px-4 text-left">Use Case</th>
                        <th className="py-3 px-4 text-left">Cost/Hour</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { size: 'X-Small', servers: 1, memory: '4 GB', useCase: 'Development', cost: '$2.00' },
                        { size: 'Small', servers: 2, memory: '8 GB', useCase: 'Light BI', cost: '$4.00' },
                        { size: 'Medium', servers: 4, memory: '16 GB', useCase: 'Medium BI', cost: '$8.00' },
                        { size: 'Large', servers: 8, memory: '32 GB', useCase: 'Heavy BI', cost: '$16.00' },
                        { size: 'X-Large', servers: 16, memory: '64 GB', useCase: 'ETL', cost: '$32.00' },
                        { size: '2X-Large', servers: 32, memory: '128 GB', useCase: 'Large ETL', cost: '$64.00' },
                        { size: '3X-Large', servers: 64, memory: '256 GB', useCase: 'Data Science', cost: '$128.00' },
                        { size: '4X-Large', servers: 128, memory: '512 GB', useCase: 'ML Training', cost: '$256.00' }
                      ].map((row, idx) => (
                        <tr key={idx} className="border-b border-gray-200 dark:border-gray-800">
                          <td className="py-3 px-4 font-bold">{row.size}</td>
                          <td className="py-3 px-4">{row.servers}</td>
                          <td className="py-3 px-4">{row.memory}</td>
                          <td className="py-3 px-4">{row.useCase}</td>
                          <td className="py-3 px-4 font-bold text-green-600">{row.cost}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );

      case 'training':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">Snowflake Combo Training</h1>
              <p className="text-2xl text-gray-600 dark:text-gray-300">Complete Data Engineering Package</p>
              <div className="inline-flex items-center space-x-2 mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-white">
                <Calendar className="w-5 h-5" />
                <span className="font-semibold">45 Sessions | 1.5-2 Hours Daily</span>
              </div>
            </div>

            <div className="space-y-8">
              {/* Training Overview */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
                <h2 className="text-3xl font-bold mb-6">Course Structure</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="space-y-4 p-6 bg-gradient-to-b from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-900 rounded-xl border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-blue-500 rounded-xl">
                        <SnowflakeIcon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">PART A: SNOWFLAKE</h3>
                        <p className="text-blue-600 dark:text-blue-400">Days 1-26</p>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {['Architecture & Security', 'Data Loading & Stages', 'Advanced Features', 'Performance Tuning', 'Real-time Project'].map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <ChevronRight className="w-4 h-4 text-blue-500 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="space-y-4 p-6 bg-gradient-to-b from-green-50 to-white dark:from-green-900/20 dark:to-gray-900 rounded-xl border border-green-200 dark:border-green-800">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-green-500 rounded-xl">
                        <GitBranch className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">PART B: DBT</h3>
                        <p className="text-green-600 dark:text-green-400">Days 27-36</p>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {['Modern ELT Concepts', 'Models & Materializations', 'Tests & Snapshots', 'Jinja Templating', 'Deployment'].map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <ChevronRight className="w-4 h-4 text-green-500 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="space-y-4 p-6 bg-gradient-to-b from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-900 rounded-xl border border-purple-200 dark:border-purple-800">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-purple-500 rounded-xl">
                        <RefreshCw className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">PART C: CAI</h3>
                        <p className="text-purple-600 dark:text-purple-400">Days 37-45</p>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {['API Integration', 'Snowflake Connectivity', 'Process Creation', 'Error Handling', 'Real-time Integration'].map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-2">
                          <ChevronRight className="w-4 h-4 text-purple-500 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl p-6">
                  <h3 className="text-2xl font-bold mb-4">What Makes Our Training Unique?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { icon: <Users />, title: 'Limited Batch', desc: '25 students only' },
                      { icon: <Target />, title: 'Interview Focus', desc: 'From Day 1' },
                      { icon: <BookOpen />, title: 'Real Projects', desc: '2 live projects' },
                      { icon: <Smartphone />, title: 'LMS Access', desc: 'Android/iOS apps' }
                    ].map((item, idx) => (
                      <div key={idx} className="text-center">
                        <div className="inline-flex p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl text-white mb-3">
                          {item.icon}
                        </div>
                        <div className="font-bold">{item.title}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Project Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-6">
                  <h3 className="text-2xl font-bold mb-4">Project 1: E-commerce Analytics</h3>
                  <ul className="space-y-3">
                    {[
                      'Real-time sales data processing',
                      'Customer behavior analysis',
                      'Inventory optimization',
                      'Revenue forecasting'
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-amber-600" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-2xl p-6">
                  <h3 className="text-2xl font-bold mb-4">Project 2: Healthcare Analytics</h3>
                  <ul className="space-y-3">
                    {[
                      'Patient data management',
                      'Treatment outcome analysis',
                      'Compliance reporting',
                      'Predictive analytics'
                    ].map((item, idx) => (
                      <li key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="w-5 h-5 text-emerald-600" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      case 'methodology':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">Proven Training Methodology</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">Interview-focused Learning Path</p>
            </div>

            <div className="space-y-8">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700">
                <h2 className="text-3xl font-bold mb-6">Success Timeline</h2>
                
                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-cyan-500 to-green-500 ml-6 md:ml-1/2"></div>
                  
                  {[
                    { 
                      day: 'Day 1', 
                      title: 'Interview Q&A Orientation',
                      desc: 'Understanding interviewer mindset, confident answering techniques',
                      icon: <MessageSquare className="w-6 h-6" />
                    },
                    { 
                      day: 'Day 20', 
                      title: 'Resume & Profile Creation',
                      desc: 'Naukri/LinkedIn optimization with expert guidance',
                      icon: <Users className="w-6 h-6" />
                    },
                    { 
                      day: 'Day 23', 
                      title: '1st Mock Interview',
                      desc: 'Technical assessment based on completed topics',
                      icon: <Target className="w-6 h-6" />
                    },
                    { 
                      day: 'Day 25', 
                      title: 'Start Real Interviews',
                      desc: 'Begin attending actual company interviews',
                      icon: <TrendingUp className="w-6 h-6" />
                    },
                    { 
                      day: 'Day 35', 
                      title: '2nd Mock Interview',
                      desc: 'Advanced scenario-based technical interview',
                      icon: <BarChart3 className="w-6 h-6" />
                    },
                    { 
                      day: 'Day 40-45', 
                      title: 'Expected Job Placement',
                      desc: 'Most students secure positions by this time',
                      icon: <Award className="w-6 h-6" />
                    }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start mb-8 ml-12 md:ml-0">
                      <div className="absolute left-0 -ml-3 mt-6">
                        <div className="w-6 h-6 bg-white dark:bg-gray-800 border-4 border-blue-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        </div>
                      </div>
                      <div className="ml-12 md:ml-12 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg text-white">
                            {item.icon}
                          </div>
                          <div>
                            <span className="font-bold text-lg text-blue-600">{item.day}</span>
                            <h4 className="text-xl font-bold">{item.title}</h4>
                          </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Support System */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-6 text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">🎯</div>
                  <h3 className="text-xl font-bold mb-2">Mock Interviews</h3>
                  <p className="text-gray-600 dark:text-gray-400">3 rounds with individual feedback</p>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl p-6 text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">💼</div>
                  <h3 className="text-xl font-bold mb-2">Job Support</h3>
                  <p className="text-gray-600 dark:text-gray-400">Free support after placement</p>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 text-center">
                  <div className="text-4xl font-bold text-purple-600 mb-2">👨‍🏫</div>
                  <h3 className="text-xl font-bold mb-2">Trainer Profile</h3>
                  <p className="text-gray-600 dark:text-gray-400">HARI.A - 15+ Years Experience</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'demo':
        return (
          <div className="space-y-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4">Live Snowflake Demo</h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">See Snowflake in Action</p>
            </div>

            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* SQL Demo */}
                <div className="bg-gray-900 rounded-2xl p-6 font-mono">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="ml-4 text-gray-400">SnowSQL Terminal</div>
                  </div>
                  <pre className="text-gray-300 text-sm overflow-x-auto">
{`-- 1. CREATE VIRTUAL WAREHOUSE
CREATE WAREHOUSE demo_wh
  WAREHOUSE_SIZE = 'X-SMALL'
  AUTO_SUSPEND = 300
  AUTO_RESUME = TRUE
  MAX_CLUSTER_COUNT = 3
  SCALING_POLICY = 'STANDARD';

-- 2. ZERO-COPY CLONE DATABASE
CREATE DATABASE prod_sales CLONE dev_sales;

-- 3. TIME TRAVEL QUERY
SELECT * FROM customers
  AT(TIMESTAMP => '2024-01-15 10:00:00'::timestamp);

-- 4. CREATE STREAM FOR CDC
CREATE OR REPLACE STREAM customer_stream
  ON TABLE customers;

-- 5. CREATE TASK FOR AUTOMATION
CREATE TAGSKET daily_aggregation
  WAREHOUSE = demo_wh
  SCHEDULE = 'USING CRON 0 2 * * * UTC'
AS
  INSERT INTO daily_sales
  SELECT DATE(transaction_time), 
         SUM(amount), 
         COUNT(*)
  FROM transactions
  GROUP BY 1;

-- 6. SECURE DATA SHARING
CREATE SHARE sales_share;
GRANT USAGE ON DATABASE sales TO SHARE sales_share;
GRANT SELECT ON ALL TABLES IN SCHEMA sales.public 
  TO SHARE sales_share;

-- 7. DYNAMIC DATA MASKING
CREATE MASKING POLICY email_mask AS 
  (val STRING) RETURNS STRING ->
  CASE
    WHEN CURRENT_ROLE() IN ('HR_ADMIN', 'SYSADMIN') 
      THEN val
    ELSE REGEXP_REPLACE(val, '(.)[^@]+@(.*)', '\\1***@\\2')
  END;

ALTER TABLE customers MODIFY COLUMN email 
  SET MASKING POLICY email_mask;`}
                  </pre>
                </div>

                {/* Demo Features */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
                    <h3 className="text-2xl font-bold mb-4">Demo Features</h3>
                    <ul className="space-y-3">
                      {[
                        'Real-time data loading from cloud storage',
                        'Zero-copy cloning demonstration',
                        'Time travel & data recovery',
                        'Secure data sharing between accounts',
                        'Dynamic data masking implementation',
                        'Automated tasks with streams'
                      ].map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold mb-4">Performance Metrics</h3>
                    <div className="space-y-4">
                      {[
                        { metric: 'Query Response Time', before: '45 seconds', after: '0.8 seconds', improvement: '56x' },
                        { metric: 'Concurrent Users', before: '50 max', after: 'Unlimited', improvement: '∞' },
                        { metric: 'Data Loading Speed', before: '2 hours', after: '15 minutes', improvement: '8x' },
                        { metric: 'Maintenance Time', before: '20 hours/month', after: '0 hours', improvement: '100%' }
                      ].map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between">
                          <div className="font-medium">{item.metric}</div>
                          <div className="text-right">
                            <div className="text-sm text-gray-500 line-through">{item.before}</div>
                            <div className="font-bold text-green-600">{item.after}</div>
                            <div className="text-xs text-blue-600">{item.improvement} faster</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl font-bold text-lg transition-all hover:shadow-lg"
                  >
                    {showDetails ? 'Hide Technical Details' : 'Show Technical Details'}
                  </button>
                </div>
              </div>

              {/* Technical Details */}
              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-6 p-6 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700">
                      <h3 className="text-2xl font-bold mb-4">Technical Implementation Details</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-white dark:bg-gray-800 rounded-xl">
                          <h4 className="font-bold mb-2">Storage Optimization</h4>
                          <ul className="text-sm space-y-1">
                            <li>• Micro-partitions: 50-500MB compressed</li>
                            <li>• Automatic clustering</li>
                            <li>• Columnar storage format</li>
                            <li>• Automatic compression</li>
                          </ul>
                        </div>
                        <div className="p-4 bg-white dark:bg-gray-800 rounded-xl">
                          <h4 className="font-bold mb-2">Compute Optimization</h4>
                          <ul className="text-sm space-y-1">
                            <li>• Result caching (24 hours)</li>
                            <li>• Query pruning</li>
                            <li>• Automatic statistics</li>
                            <li>• Vectorized execution</li>
                          </ul>
                        </div>
                        <div className="p-4 bg-white dark:bg-gray-800 rounded-xl">
                          <h4 className="font-bold mb-2">Cost Optimization</h4>
                          <ul className="text-sm space-y-1">
                            <li>• Auto-suspend warehouses</li>
                            <li>• Resource monitors</li>
                            <li>• Query optimization</li>
                            <li>• Usage insights</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        );

      case 'cta':
        return (
          <div className="space-y-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center justify-center p-8 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl mb-6"
            >
              <SnowflakeIcon className="w-24 h-24 text-white" />
            </motion.div>
            
            <h1 className="text-5xl font-bold">
              Ready to Master Snowflake?
            </h1>
            
            <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Join India's most comprehensive Snowflake Data Engineering training program
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto pt-8">
              {[
                { value: '45+', label: 'Hands-on Sessions', color: 'text-blue-600' },
                { value: '100%', label: 'Interview Focus', color: 'text-green-600' },
                { value: '2', label: 'Real Projects', color: 'text-purple-600' },
                { value: 'Lifetime', label: 'Job Support', color: 'text-amber-600' }
              ].map((stat, idx) => (
                <div key={idx} className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                  <div className={`text-4xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                  <div className="font-bold text-lg">{stat.label}</div>
                </div>
              ))}
            </div>
            
            <div className="pt-12">
              <button className="px-12 py-6 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white text-xl font-bold rounded-2xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105">
                Enroll Now - Batch Starting Soon!
              </button>
              
              <div className="mt-12 space-y-4 text-gray-600 dark:text-gray-400">
                <div className="text-2xl font-bold text-gray-800 dark:text-gray-300">Contact Information</div>
                <div className="text-xl">📞 Call/WhatsApp: 8970853557 / 9448005273</div>
                <div className="text-xl">🌐 www.rishabinformaticagroup.com</div>
                <div className="text-xl">👨‍🏫 Trainer: HARI.A - Senior Data Engineer & Trainer (15+ Years Experience)</div>
                
                <div className="pt-8 text-lg">
                  <div className="font-bold text-gray-800 dark:text-gray-300 mb-2">Next Batch Details:</div>
                  <div>Start Date: Coming Soon</div>
                  <div>Duration: 45 Days | Daily 1.5-2 Hours</div>
                  <div>Batch Size: Limited to 25 Students</div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex flex-col">
      {/* Fixed Header */}
      <div className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <SnowflakeIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <div>
                <h1 className="text-xl font-bold">Snowflake Combo Training Demo</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">Snowflake + DBT + Informatica IICS (CAI)</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0">
              {sections.map((section, idx) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(idx)}
                  className={`px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-all ${
                    activeSection === idx
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    {section.icon}
                    <span>{section.title}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-sm mb-1">
              <span>{sections[activeSection]?.title}</span>
              <span>{activeSection + 1} of {sections.length}</span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area - Scrollable */}
      <div 
        ref={contentRef}
        className="flex-1 overflow-y-auto"
      >
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 md:p-12 min-h-[70vh]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Fixed Footer with Navigation */}
      <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <button
              onClick={prevSection}
              disabled={activeSection === 0}
              className={`px-6 py-3 rounded-xl flex items-center space-x-2 transition-all ${
                activeSection === 0
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white hover:shadow-md'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Previous</span>
            </button>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:block text-sm text-gray-600 dark:text-gray-400">
                Currently viewing: <span className="font-bold">{sections[activeSection]?.title}</span>
              </div>
              <div className="flex space-x-2">
                {sections.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSection(idx)}
                    className={`w-2 h-2 rounded-full ${
                      activeSection === idx
                        ? 'bg-blue-600'
                        : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
            
            <button
              onClick={nextSection}
              disabled={activeSection === sections.length - 1}
              className={`px-6 py-3 rounded-xl flex items-center space-x-2 transition-all ${
                activeSection === sections.length - 1
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white hover:shadow-md'
              }`}
            >
              <span>{activeSection === sections.length - 1 ? 'Finish' : 'Next'}</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}