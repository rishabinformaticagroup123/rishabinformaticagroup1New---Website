"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
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
  Award
} from 'lucide-react';

export default function SnowflakeDemoPresentation() {
  const [activeSection, setActiveSection] = useState('intro');
  const [progress, setProgress] = useState(0);
  const [showDemo, setShowDemo] = useState(false);

  const sections = [
    { id: 'intro', label: 'Why Snowflake?' },
    { id: 'architecture', label: 'Unique Architecture' },
    { id: 'features', label: 'Key Features' },
    { id: 'course', label: 'Combo Training' },
    { id: 'training', label: 'Training Methodology' },
    { id: 'demo', label: 'Live Demo' },
    { id: 'cta', label: 'Get Started' }
  ];

  const snowflakeFeatures = [
    {
      category: 'Core Architecture',
      icon: <Layers className="w-6 h-6" />,
      features: [
        'Multi-cluster Shared Data Architecture',
        'Separation of Storage & Compute',
        'Automatic Scaling',
        'Zero Copy Cloning'
      ],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      category: 'Performance',
      icon: <Zap className="w-6 h-6" />,
      features: [
        'Auto-suspend & Auto-resume',
        'Multi-cluster Warehouses',
        'Result Caching',
        'Search Optimization Service'
      ],
      color: 'from-purple-500 to-pink-500'
    },
    {
      category: 'Data Management',
      icon: <Database className="w-6 h-6" />,
      features: [
        'Time Travel (0-90 days)',
        'Fail-safe Protection',
        'Data Sharing (Secure)',
        'Materialized Views'
      ],
      color: 'from-green-500 to-emerald-500'
    },
    {
      category: 'Security',
      icon: <Shield className="w-6 h-6" />,
      features: [
        'End-to-end Encryption',
        'Dynamic Data Masking',
        'Row-level Security',
        'Network Policies'
      ],
      color: 'from-red-500 to-orange-500'
    },
    {
      category: 'Cost Control',
      icon: <DollarSign className="w-6 h-6" />,
      features: [
        'Per-second Billing',
        'Resource Monitors',
        'Cost Predictability',
        'Auto-scaling Optimization'
      ],
      color: 'from-yellow-500 to-amber-500'
    },
    {
      category: 'Advanced Features',
      icon: <Code className="w-6 h-6" />,
      features: [
        'Streams & Tasks',
        'Snowpark (Python/Java)',
        'External Functions',
        'Iceberg Tables'
      ],
      color: 'from-indigo-500 to-blue-500'
    }
  ];

  const courseHighlights = [
    { day: '1-5', topic: 'Foundation & Security', icon: <Shield /> },
    { day: '6-10', topic: 'Data Loading & Stages', icon: <Database /> },
    { day: '11-15', topic: 'Advanced Features', icon: <Zap /> },
    { day: '16-20', topic: 'Performance & Security', icon: <TrendingUp /> },
    { day: '21-26', topic: 'Real-time Project', icon: <Target /> },
    { day: '27-36', topic: 'DBT Integration', icon: <GitBranch /> },
    { day: '37-45', topic: 'CAI with Snowflake', icon: <RefreshCw /> }
  ];

  useEffect(() => {
    const sectionIndex = sections.findIndex(s => s.id === activeSection);
    setProgress((sectionIndex / (sections.length - 1)) * 100);
  }, [activeSection]);

  const renderSection = () => {
    switch(activeSection) {
      case 'intro':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="text-center">
              <div className="inline-flex items-center justify-center p-3 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl mb-6">
                <SnowflakeIcon className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent mb-4">
                Why Snowflake?
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Revolutionizing Data Engineering with Cloud-native Architecture
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
              {[
                { 
                  icon: <TrendingUp className="w-8 h-8" />,
                  title: 'Market Demand',
                  desc: '#1 Data Cloud Platform with 8,000+ customers',
                  color: 'bg-gradient-to-br from-blue-500 to-cyan-400'
                },
                { 
                  icon: <DollarSign className="w-8 h-8" />,
                  title: 'Cost Efficiency',
                  desc: '70% cost reduction vs traditional data warehouses',
                  color: 'bg-gradient-to-br from-green-500 to-emerald-400'
                },
                { 
                  icon: <Zap className="w-8 h-8" />,
                  title: 'Performance',
                  desc: 'Up to 200x faster query performance',
                  color: 'bg-gradient-to-br from-purple-500 to-pink-400'
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700"
                >
                  <div className={`inline-flex p-3 rounded-xl ${item.color} text-white mb-4`}>
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        );

      case 'architecture':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold text-center mb-8">
              Snowflake's Unique Architecture
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8">
                  <div className="flex flex-col items-center space-y-8">
                    {/* Storage Layer */}
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center p-4 bg-blue-500 rounded-xl mb-4">
                        <Database className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Cloud Storage Layer</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Centralized data storage in cloud object storage (S3, Azure Blob, GCS)
                      </p>
                    </div>
                    
                    {/* Compute Layer */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {['Virtual Warehouse 1', 'Virtual Warehouse 2', 'Virtual Warehouse 3'].map((wh, idx) => (
                        <div key={idx} className="text-center">
                          <div className="inline-flex items-center justify-center p-4 bg-green-500 rounded-xl mb-4">
                            <Cpu className="w-6 h-6 text-white" />
                          </div>
                          <h4 className="font-semibold">{wh}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Independent Scaling</p>
                        </div>
                      ))}
                    </div>
                    
                    {/* Cloud Services */}
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center p-4 bg-purple-500 rounded-xl mb-4">
                        <Cloud className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">Cloud Services Layer</h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        Authentication, Metadata, Optimization, Access Control
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Key Advantages</h3>
                {[
                  'No hardware to manage',
                  'Instant elasticity',
                  'Concurrent workloads',
                  'Zero maintenance overhead',
                  'Auto-optimization',
                  'Global data sharing'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 'features':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold text-center mb-8">
              Snowflake Unique Features: Basic to Advanced
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {snowflakeFeatures.map((category, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow"
                >
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${category.color} text-white mb-4`}>
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{category.category}</h3>
                  <ul className="space-y-3">
                    {category.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex items-start space-x-2">
                        <ChevronRight className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-12 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">Advanced Capabilities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Share2 className="w-6 h-6 text-blue-500" />
                    <div>
                      <h4 className="font-bold">Secure Data Sharing</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Share live data without copying</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-6 h-6 text-blue-500" />
                    <div>
                      <h4 className="font-bold">Time Travel & Fail-safe</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Recover data from any point in time</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Lock className="w-6 h-6 text-blue-500" />
                    <div>
                      <h4 className="font-bold">Dynamic Data Masking</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Real-time data protection</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <RefreshCw className="w-6 h-6 text-blue-500" />
                    <div>
                      <h4 className="font-bold">Zero Copy Cloning</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Instant database copies with no storage cost</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'course':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">
                Complete Snowflake Combo Training
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Snowflake + DBT + Informatica IICS (CAI)
              </p>
              <div className="inline-flex items-center space-x-2 mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-white">
                <Calendar className="w-5 h-5" />
                <span className="font-semibold">45 Sessions | 1.5-2 Hours Daily</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Part A: Snowflake */}
              <div className="bg-gradient-to-b from-blue-50 to-white dark:from-blue-900/20 dark:to-gray-900 rounded-2xl p-6 border border-blue-200 dark:border-blue-800">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-blue-500 rounded-xl">
                    <SnowflakeIcon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">PART A: SNOWFLAKE</h3>
                    <p className="text-blue-600 dark:text-blue-400">Days 1-26</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {['Architecture & Security', 'Data Loading & Stages', 'Advanced Features', 'Performance Tuning', 'Real-time Project'].map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Part B: DBT */}
              <div className="bg-gradient-to-b from-green-50 to-white dark:from-green-900/20 dark:to-gray-900 rounded-2xl p-6 border border-green-200 dark:border-green-800">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-green-500 rounded-xl">
                    <GitBranch className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">PART B: DBT</h3>
                    <p className="text-green-600 dark:text-green-400">Days 27-36</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {['Modern ELT Concepts', 'Models & Materializations', 'Tests & Snapshots', 'Jinja Templating', 'Deployment & Git'].map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Part C: CAI */}
              <div className="bg-gradient-to-b from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-900 rounded-2xl p-6 border border-purple-200 dark:border-purple-800">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="p-3 bg-purple-500 rounded-xl">
                    <RefreshCw className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">PART C: CAI</h3>
                    <p className="text-purple-600 dark:text-purple-400">Days 37-45</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {['API Integration', 'Snowflake Connectivity', 'Process Creation', 'Error Handling', 'Real-time Integration'].map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-4 mt-8">
              {courseHighlights.map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="p-3 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-800 dark:to-cyan-800 rounded-xl mb-2">
                    <div className="text-blue-600 dark:text-blue-300 mx-auto">
                      {item.icon}
                    </div>
                  </div>
                  <div className="font-bold text-sm">{item.day}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">{item.topic}</div>
                </div>
              ))}
            </div>
          </motion.div>
        );

      case 'training':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold text-center mb-4">
              Our Proven Training Methodology
            </h2>
            
            <div className="relative">
              {/* Timeline */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-cyan-500"></div>
              
              {[
                { day: 'Day 1', title: 'Interview Q&A Orientation', icon: <MessageSquare /> },
                { day: 'Day 20', title: 'Resume & Profile Creation', icon: <Users /> },
                { day: 'Day 23', title: '1st Mock Interview', icon: <Target /> },
                { day: 'Day 25', title: 'Start Real Interviews', icon: <TrendingUp /> },
                { day: 'Day 35', title: '2nd Mock Interview', icon: <BarChart3 /> },
                { day: 'Day 40-45', title: 'Expected to Crack Interview', icon: <Award /> },
                { day: 'After Placement', title: 'Free Job Support', icon: <CheckCircle /> }
              ].map((item, idx) => (
                <div key={idx} className={`flex items-center mb-12 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className="flex-1 md:px-8">
                    <div className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 ${idx % 2 === 0 ? 'md:text-right' : ''}`}>
                      <div className="inline-flex items-center space-x-3 mb-3">
                        <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg text-white">
                          {item.icon}
                        </div>
                        <span className="font-bold text-lg">{item.day}</span>
                      </div>
                      <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-gray-600 dark:text-gray-400">
                        {idx === 0 && 'How interviewers think, how to answer confidently'}
                        {idx === 1 && 'Naukri/LinkedIn profile creation with expert guidance'}
                        {idx === 2 && 'Questions from completed sessions with feedback'}
                        {idx === 3 && 'Students face 2-3 real interviews'}
                        {idx === 4 && 'Advanced scenario-based interviews'}
                        {idx === 5 && 'Complete guidance till placement'}
                        {idx === 6 && 'Lifetime mentorship & doubt clearance'}
                      </p>
                    </div>
                  </div>
                  <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2">
                    <div className="w-8 h-8 bg-white dark:bg-gray-800 border-4 border-blue-500 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-8 mt-12">
              <h3 className="text-2xl font-bold mb-6 text-center">Why Choose Our Training?</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { icon: <Users />, title: 'Limited Batch Size', desc: '25 students per batch' },
                  { icon: <Smartphone />, title: 'LMS Access', desc: 'Android & iOS apps available' },
                  { icon: <BookOpen />, title: 'Real Projects', desc: '2 real-time projects' },
                  { icon: <Target />, title: 'Interview Focused', desc: 'Crack interviews from Day 1' }
                ].map((item, idx) => (
                  <div key={idx} className="text-center">
                    <div className="inline-flex p-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl text-white mb-4">
                      {item.icon}
                    </div>
                    <h4 className="font-bold mb-2">{item.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );

      case 'demo':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <h2 className="text-4xl font-bold text-center mb-8">
              Snowflake in Action
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gray-900 rounded-2xl p-6 font-mono">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="ml-4 text-gray-400">SQL Terminal</div>
                </div>
                <pre className="text-gray-300 overflow-x-auto">
{`-- Create a virtual warehouse
CREATE WAREHOUSE demo_wh
WITH WAREHOUSE_SIZE = 'X-SMALL'
AUTO_SUSPEND = 300
AUTO_RESUME = TRUE;

-- Zero copy clone demonstration
CREATE DATABASE prod_db CLONE dev_db;

-- Time travel query
SELECT * FROM customer_table
AT(TIMESTAMP => '2024-01-15 10:00:00');

-- Create a stream for CDC
CREATE STREAM customer_stream ON TABLE customer_table;

-- Data sharing (no data movement)
CREATE SHARE sales_data;
GRANT USAGE ON DATABASE sales TO SHARE sales_data;

-- Dynamic data masking
CREATE MASKING POLICY email_mask AS (val STRING) RETURNS STRING ->
  CASE 
    WHEN CURRENT_ROLE() = 'HR' THEN val
    ELSE '*****@*****.com'
  END;`}
                </pre>
              </div>
              
              <div className="space-y-6">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white">
                  <h3 className="text-2xl font-bold mb-4">Live Demo Features</h3>
                  <ul className="space-y-3">
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5" />
                      <span>Real-time data loading from S3</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5" />
                      <span>Zero copy cloning demonstration</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5" />
                      <span>Time travel & data recovery</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5" />
                      <span>Secure data sharing</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-bold mb-4">Key Takeaways</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="font-semibold">No Administration</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="font-semibold">Instant Scaling</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="font-semibold">Pay Per Second</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="font-semibold">Multi-cloud</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => setShowDemo(!showDemo)}
                  className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white rounded-xl font-bold text-lg transition-all hover:shadow-lg"
                >
                  {showDemo ? 'Hide Live Demo' : 'Show Interactive Demo'}
                </button>
              </div>
            </div>
            
            <AnimatePresence>
              {showDemo && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-6 p-6 bg-gradient-to-r from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700">
                    <h3 className="text-2xl font-bold mb-4">Interactive Snowflake Demo</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { label: 'Warehouse Size', value: 'X-SMALL', cost: '$0.0006/sec' },
                        { label: 'Auto-suspend', value: '300 seconds', cost: 'Zero cost when idle' },
                        { label: 'Data Storage', value: '$23/TB/month', cost: 'Compressed' }
                      ].map((item, idx) => (
                        <div key={idx} className="text-center p-4 bg-white dark:bg-gray-800 rounded-xl">
                          <div className="font-bold text-gray-600 dark:text-gray-400">{item.label}</div>
                          <div className="text-2xl font-bold my-2">{item.value}</div>
                          <div className="text-sm text-green-600 dark:text-green-400">{item.cost}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );

      case 'cta':
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8"
          >
            <div className="inline-flex items-center justify-center p-6 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl mb-6">
              <SnowflakeIcon className="w-20 h-20 text-white" />
            </div>
            
            <h2 className="text-5xl font-bold">
              Start Your Snowflake Journey Today!
            </h2>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Join our comprehensive combo training and become an industry-ready Snowflake Data Engineer
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">45+</div>
                <div className="font-bold mb-2">Hands-on Sessions</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">With real-time projects</div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">100%</div>
                <div className="font-bold mb-2">Interview Focused</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">From Day 1 preparation</div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">Lifetime</div>
                <div className="font-bold mb-2">Job Support</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Free support after placement</div>
              </div>
            </div>
            
            <div className="pt-8">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all">
                Enroll Now - Limited Seats Available!
              </button>
              
              <div className="mt-6 text-gray-600 dark:text-gray-400">
                <div>📞 Call/WhatsApp: 8970853557 / 9448005273</div>
                <div className="mt-2">🌐 www.rishabinformaticagroup.com</div>
                <div className="mt-2">👨‍🏫 Trainer: HARI.A - Senior Data Engineer & Trainer</div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-4 md:p-8">
      {/* Navigation */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-3">
            <SnowflakeIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <div>
              <h1 className="text-2xl font-bold">Snowflake Combo Training</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Snowflake + DBT + CAI</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeSection === section.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {section.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
        
        {/* Main Content */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 md:p-12 min-h-[70vh]">
          {renderSection()}
        </div>
        
        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={() => {
              const currentIndex = sections.findIndex(s => s.id === activeSection);
              if (currentIndex > 0) {
                setActiveSection(sections[currentIndex - 1].id);
              }
            }}
            className="px-6 py-3 bg-white dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-all flex items-center space-x-2"
          >
            <ChevronRight className="w-5 h-5 transform rotate-180" />
            <span>Previous</span>
          </button>
          
          <div className="flex items-center space-x-2">
            {sections.map((section, idx) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-3 h-3 rounded-full ${
                  activeSection === section.id
                    ? 'bg-blue-600'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
                aria-label={`Go to ${section.label}`}
              />
            ))}
          </div>
          
          <button
            onClick={() => {
              const currentIndex = sections.findIndex(s => s.id === activeSection);
              if (currentIndex < sections.length - 1) {
                setActiveSection(sections[currentIndex + 1].id);
              }
            }}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white rounded-xl transition-all flex items-center space-x-2"
          >
            <span>Next</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        
        {/* Footer */}
        <div className="mt-12 text-center text-gray-600 dark:text-gray-400 text-sm">
          <p>Rishab Informatica Group | Trainer: HARI.A | 15+ Years Experience</p>
          <p className="mt-2">© {new Date().getFullYear()} Snowflake Combo Training Demo Presentation</p>
        </div>
      </div>
    </div>
  );
}