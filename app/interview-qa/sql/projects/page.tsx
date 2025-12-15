'use client';

import { useState } from 'react';
import {
  Rocket,
  Database,
  Cloud,
  Users,
  TrendingUp,
  BarChart,
  Shield,
  Zap,
  Clock,
  DollarSign,
  Code,
  GitBranch,
  Layers,
  Target,
  CheckCircle,
  Award,
  ExternalLink,
  Github,
  Eye,
  Calendar,
  Star,
  Heart,
  Share2,
  Download,
  Search,
  Filter,
  ChevronRight,
  ChevronDown,
  Play,
  Terminal,
  FileText,
  FolderOpen,
  Server,
  Workflow,
  BarChart3,
  PieChart,
  LineChart,
  DatabaseZap,
  CloudCog,
  Network,
  Cpu,
  HardDrive,
  BookOpen,
  Lightbulb,
  Code2,
  GitPullRequest,
  Settings,
  Wrench,
  Hammer,
  Printer,    // ✅
  Activity    // ✅
} from 'lucide-react';

type ProjectCategory = 'etl-pipeline' | 'analytics' | 'data-warehouse' | 'ml-ai' | 'real-time' | 'migration' | 'monitoring';
type ProjectDifficulty = 'beginner' | 'intermediate' | 'advanced';
type ProjectStatus = 'completed' | 'in-progress' | 'planned';

type Project = {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: ProjectCategory;
  difficulty: ProjectDifficulty;
  status: ProjectStatus;
  businessValue: string;
  technologies: string[];
  snowflakeFeatures: string[];
  estimatedHours: number;
  complexity: number; // 1-5
  githubUrl?: string;
  demoUrl?: string;
  documentationUrl?: string;
  prerequisites: string[];
  learningOutcomes: string[];
  datasetSize: string;
  completionRate: number;
  studentFavorites: number;
  lastUpdated: Date;
  steps: ProjectStep[];
  screenshots?: string[];
  tags: string[];
};

type ProjectStep = {
  step: number;
  title: string;
  description: string;
  estimatedTime: number;
  keyConcepts: string[];
  codeSnippet?: string;
};

export default function SnowflakeProjectsPage() {
  // Projects data
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 'PROJ-001',
      title: 'E-commerce Analytics Dashboard',
      description: 'Build a complete analytics solution for an e-commerce business with real-time sales tracking, customer segmentation, and inventory forecasting.',
      shortDescription: 'End-to-end analytics pipeline for online retail',
      category: 'analytics',
      difficulty: 'intermediate',
      status: 'completed',
      businessValue: 'Increase sales by 15% through data-driven insights and reduce inventory costs by 20%',
      technologies: ['Snowflake', 'Snowsight', 'dbt', 'Tableau', 'Python'],
      snowflakeFeatures: ['Materialized Views', 'Streams & Tasks', 'Time Travel', 'Clustering', 'Secure Data Sharing'],
      estimatedHours: 20,
      complexity: 4,
      githubUrl: 'https://github.com/example/ecommerce-analytics',
      demoUrl: 'https://demo.example.com',
      documentationUrl: '/docs/projects/ecommerce-analytics.pdf',
      prerequisites: ['Basic SQL', 'Data Modeling', 'ETL Concepts'],
      learningOutcomes: [
        'Build end-to-end analytics pipeline',
        'Implement real-time data processing',
        'Create interactive dashboards',
        'Optimize query performance'
      ],
      datasetSize: '2.5M customers, 10M transactions',
      completionRate: 85,
      studentFavorites: 245,
      lastUpdated: new Date('2024-03-15'),
      steps: [
        {
          step: 1,
          title: 'Data Ingestion Pipeline',
          description: 'Set up automated data loading from multiple sources using Snowpipe and external stages',
          estimatedTime: 4,
          keyConcepts: ['Snowpipe', 'External Stages', 'File Formats', 'COPY command'],
          codeSnippet: `-- Create external stage for S3\nCREATE STAGE ecommerce_stage\n  URL = 's3://bucket/ecommerce-data/'\n  CREDENTIALS = (AWS_KEY_ID = '...');\n\n-- Create pipe for auto-ingest\nCREATE PIPE sales_data_pipe\n  AUTO_INGEST = TRUE\nAS\n  COPY INTO raw_sales\n  FROM @ecommerce_stage\n  FILE_FORMAT = (TYPE = CSV);`
        },
        {
          step: 2,
          title: 'Data Transformation with dbt',
          description: 'Transform raw data into analytics-ready tables using dbt models and incremental loads',
          estimatedTime: 6,
          keyConcepts: ['dbt models', 'Incremental loads', 'Data quality tests', 'Documentation'],
          codeSnippet: `-- dbt model for customer dimension\n{{ config(materialized='incremental') }}\n\nWITH customer_data AS (\n  SELECT\n    customer_id,\n    email,\n    MIN(order_date) as first_purchase,\n    MAX(order_date) as last_purchase,\n    COUNT(*) as total_orders,\n    SUM(amount) as lifetime_value\n  FROM {{ ref('stg_orders') }}\n  GROUP BY 1,2\n)\nSELECT * FROM customer_data`
        },
        {
          step: 3,
          title: 'Dashboard Development',
          description: 'Create interactive dashboards in Snowsight and Tableau for business stakeholders',
          estimatedTime: 5,
          keyConcepts: ['Snowsight Dashboards', 'Tableau Integration', 'Row-level Security', 'Caching'],
          codeSnippet: `-- Create secure view for dashboard\nCREATE SECURE VIEW dashboard_sales AS\nSELECT \n  region,\n  product_category,\n  DATE_TRUNC('month', order_date) as month,\n  SUM(amount) as revenue,\n  COUNT(DISTINCT customer_id) as customers\nFROM analytics.fact_orders\nWHERE CURRENT_ROLE() IN ('ANALYST', 'MANAGER')\nGROUP BY 1,2,3;`
        }
      ],
      tags: ['analytics', 'dashboard', 'ecommerce', 'real-time', 'dbt']
    },
    {
      id: 'PROJ-002',
      title: 'Real-time IoT Data Processing',
      description: 'Process streaming IoT data from sensors with real-time analytics and alerting system using Snowflake and Kafka.',
      shortDescription: 'Streaming pipeline for IoT sensor data',
      category: 'real-time',
      difficulty: 'advanced',
      status: 'completed',
      businessValue: 'Reduce equipment downtime by 40% through predictive maintenance',
      technologies: ['Snowflake', 'Kafka', 'Python', 'Apache Flink', 'Grafana'],
      snowflakeFeatures: ['Streams', 'Tasks', 'Snowpipe Streaming', 'Dynamic Tables', 'Java UDFs'],
      estimatedHours: 30,
      complexity: 5,
      githubUrl: 'https://github.com/example/iot-processing',
      demoUrl: 'https://iot-demo.example.com',
      prerequisites: ['Stream Processing', 'Python', 'Kafka Basics'],
      learningOutcomes: [
        'Implement real-time data ingestion',
        'Create predictive maintenance models',
        'Build alerting systems',
        'Optimize streaming performance'
      ],
      datasetSize: '10K sensors, 1M events/minute',
      completionRate: 65,
      studentFavorites: 189,
      lastUpdated: new Date('2024-03-10'),
      steps: [
        {
          step: 1,
          title: 'Streaming Ingestion Setup',
          description: 'Configure Snowpipe Streaming for high-throughput IoT data ingestion',
          estimatedTime: 6,
          keyConcepts: ['Snowpipe Streaming', 'Kafka Connect', 'Schema Registry', 'Avro Format']
        },
        {
          step: 2,
          title: 'Real-time Analytics',
          description: 'Create dynamic tables for real-time aggregations and anomaly detection',
          estimatedTime: 8,
          keyConcepts: ['Dynamic Tables', 'Window Functions', 'Anomaly Detection', 'Java UDFs']
        }
      ],
      tags: ['iot', 'real-time', 'streaming', 'kafka', 'predictive-maintenance']
    },
    {
      id: 'PROJ-003',
      title: 'Data Warehouse Migration',
      description: 'Migrate from traditional data warehouse (Redshift) to Snowflake with zero downtime and performance optimization.',
      shortDescription: 'Legacy to Snowflake migration project',
      category: 'migration',
      difficulty: 'advanced',
      status: 'in-progress',
      businessValue: 'Reduce infrastructure costs by 60% and improve query performance by 300%',
      technologies: ['Snowflake', 'AWS', 'Python', 'Airflow', 'dbt'],
      snowflakeFeatures: ['Zero-copy Cloning', 'Time Travel', 'Resource Monitors', 'Data Sharing'],
      estimatedHours: 40,
      complexity: 5,
      githubUrl: 'https://github.com/example/warehouse-migration',
      prerequisites: ['AWS Redshift', 'Data Migration', 'Performance Tuning'],
      learningOutcomes: [
        'Plan and execute warehouse migrations',
        'Optimize for Snowflake architecture',
        'Implement zero-dowtime migration',
        'Validate data consistency'
      ],
      datasetSize: '50TB, 200+ tables',
      completionRate: 45,
      studentFavorites: 156,
      lastUpdated: new Date('2024-03-12'),
      steps: [],
      tags: ['migration', 'redshift', 'performance', 'cost-optimization']
    },
    {
      id: 'PROJ-004',
      title: 'Customer 360 with Snowpark',
      description: 'Build a unified customer view using Snowpark Python for advanced analytics and machine learning.',
      shortDescription: 'Customer analytics with Snowpark ML',
      category: 'ml-ai',
      difficulty: 'intermediate',
      status: 'completed',
      businessValue: 'Increase customer retention by 25% through personalized recommendations',
      technologies: ['Snowflake', 'Snowpark Python', 'Scikit-learn', 'MLflow', 'FastAPI'],
      snowflakeFeatures: ['Snowpark', 'Stored Procedures', 'UDFs', 'Materialized Views', 'Secure Views'],
      estimatedHours: 25,
      complexity: 4,
      githubUrl: 'https://github.com/example/customer-360',
      demoUrl: 'https://customer360-demo.example.com',
      prerequisites: ['Python', 'Machine Learning Basics', 'SQL'],
      learningOutcomes: [
        'Use Snowpark for Python in Snowflake',
        'Build ML models inside Snowflake',
        'Create customer segmentation',
        'Implement recommendation systems'
      ],
      datasetSize: '5M customers, 50M interactions',
      completionRate: 72,
      studentFavorites: 210,
      lastUpdated: new Date('2024-03-05'),
      steps: [
        {
          step: 1,
          title: 'Data Preparation with Snowpark',
          description: 'Use Snowpark Python DataFrame API for data cleaning and feature engineering',
          estimatedTime: 5,
          keyConcepts: ['Snowpark DataFrames', 'Feature Engineering', 'Python UDFs', 'Session Management'],
          codeSnippet: `# Snowpark Python for feature engineering\nfrom snowflake.snowpark import Session\nfrom snowflake.snowpark.functions import col, datediff\n\n# Create session\nsession = Session.builder.configs(connection_parameters).create()\n\n# Feature engineering\ndf_features = session.table("CUSTOMERS") \\\n  .with_column("DAYS_SINCE_LAST_PURCHASE", \n    datediff("day", col("LAST_PURCHASE_DATE"), current_date())) \\\n  .with_column("PURCHASE_FREQUENCY", \n    col("TOTAL_PURCHASES") / datediff("day", col("FIRST_PURCHASE_DATE"), current_date()))`
        },
        {
          step: 2,
          title: 'Machine Learning Model Training',
          description: 'Train clustering and classification models using Snowpark ML',
          estimatedTime: 8,
          keyConcepts: ['Snowpark ML', 'Model Training', 'Hyperparameter Tuning', 'Model Registry']
        }
      ],
      tags: ['snowpark', 'machine-learning', 'customer-analytics', 'python']
    },
    {
      id: 'PROJ-005',
      title: 'Financial Fraud Detection',
      description: 'Real-time fraud detection system using Snowflake with anomaly detection and alert generation.',
      shortDescription: 'Real-time fraud detection pipeline',
      category: 'real-time',
      difficulty: 'advanced',
      status: 'completed',
      businessValue: 'Reduce fraud losses by 80% with real-time detection',
      technologies: ['Snowflake', 'Python', 'Streamlit', 'MLflow', 'Kafka'],
      snowflakeFeatures: ['Streams', 'Tasks', 'Secure Views', 'Dynamic Data Masking', 'Row Access Policies'],
      estimatedHours: 35,
      complexity: 5,
      githubUrl: 'https://github.com/example/fraud-detection',
      demoUrl: 'https://fraud-demo.example.com',
      prerequisites: ['Machine Learning', 'Python', 'Security Concepts'],
      learningOutcomes: [
        'Implement real-time anomaly detection',
        'Build secure data pipelines',
        'Create alerting systems',
        'Deploy ML models in production'
      ],
      datasetSize: '100M transactions',
      completionRate: 58,
      studentFavorites: 178,
      lastUpdated: new Date('2024-02-28'),
      steps: [],
      tags: ['fraud-detection', 'security', 'real-time', 'mlops', 'anomaly-detection']
    },
    {
      id: 'PROJ-006',
      title: 'Healthcare Data Platform',
      description: 'HIPAA-compliant data platform for healthcare analytics with patient data anonymization and secure sharing.',
      shortDescription: 'HIPAA-compliant healthcare analytics',
      category: 'data-warehouse',
      difficulty: 'advanced',
      status: 'in-progress',
      businessValue: 'Improve patient outcomes by 30% through data-driven insights',
      technologies: ['Snowflake', 'Python', 'dbt', 'Apache Superset', 'Airflow'],
      snowflakeFeatures: ['Dynamic Data Masking', 'Row Access Policies', 'Secure Data Sharing', 'Tagging', 'Audit Logging'],
      estimatedHours: 45,
      complexity: 5,
      githubUrl: 'https://github.com/example/healthcare-platform',
      prerequisites: ['Healthcare Data', 'Security & Compliance', 'Data Governance'],
      learningOutcomes: [
        'Implement HIPAA compliance',
        'Build secure data sharing',
        'Create audit trails',
        'Implement data masking'
      ],
      datasetSize: '10M patients, 500M records',
      completionRate: 35,
      studentFavorites: 142,
      lastUpdated: new Date('2024-03-08'),
      steps: [],
      tags: ['healthcare', 'security', 'compliance', 'hipaa', 'data-governance']
    },
    {
      id: 'PROJ-007',
      title: 'Marketing Attribution Model',
      description: 'Multi-touch attribution model to measure marketing channel effectiveness across customer journey.',
      shortDescription: 'Marketing ROI measurement system',
      category: 'analytics',
      difficulty: 'intermediate',
      status: 'completed',
      businessValue: 'Optimize marketing spend with 25% better ROI measurement',
      technologies: ['Snowflake', 'dbt', 'Looker', 'Python', 'Segment'],
      snowflakeFeatures: ['Window Functions', 'Materialized Views', 'JavaScript UDFs', 'Time Travel'],
      estimatedHours: 18,
      complexity: 3,
      githubUrl: 'https://github.com/example/marketing-attribution',
      demoUrl: 'https://marketing-demo.example.com',
      prerequisites: ['Marketing Analytics', 'SQL Window Functions', 'ETL Concepts'],
      learningOutcomes: [
        'Build attribution models',
        'Track customer journey',
        'Calculate marketing ROI',
        'Create channel performance dashboards'
      ],
      datasetSize: '1M customers, 5M touchpoints',
      completionRate: 78,
      studentFavorites: 195,
      lastUpdated: new Date('2024-02-20'),
      steps: [
        {
          step: 1,
          title: 'Customer Journey Tracking',
          description: 'Implement session stitching and journey mapping across multiple channels',
          estimatedTime: 4,
          keyConcepts: ['Session Stitching', 'User Journey', 'Multi-channel Tracking', 'Data Integration']
        },
        {
          step: 2,
          title: 'Attribution Modeling',
          description: 'Implement different attribution models (first-touch, last-touch, linear, time-decay)',
          estimatedTime: 6,
          keyConcepts: ['Attribution Models', 'Window Functions', 'Revenue Allocation', 'Model Comparison']
        }
      ],
      tags: ['marketing', 'attribution', 'analytics', 'roi', 'customer-journey']
    },
    {
      id: 'PROJ-008',
      title: 'Supply Chain Optimization',
      description: 'Optimize supply chain with demand forecasting and inventory optimization using Snowflake and ML.',
      shortDescription: 'Supply chain analytics and optimization',
      category: 'ml-ai',
      difficulty: 'intermediate',
      status: 'planned',
      businessValue: 'Reduce inventory costs by 30% and improve delivery times by 40%',
      technologies: ['Snowflake', 'Python', 'Prophet', 'Streamlit', 'Airflow'],
      snowflakeFeatures: ['Time-series Functions', 'Snowpark ML', 'External Functions', 'Tasks'],
      estimatedHours: 22,
      complexity: 4,
      prerequisites: ['Time-series Analysis', 'Python', 'Supply Chain Basics'],
      learningOutcomes: [
        'Build demand forecasting models',
        'Optimize inventory levels',
        'Create supply chain dashboards',
        'Implement ML for optimization'
      ],
      datasetSize: '100K products, 5M transactions',
      completionRate: 0,
      studentFavorites: 89,
      lastUpdated: new Date('2024-03-01'),
      steps: [],
      tags: ['supply-chain', 'forecasting', 'optimization', 'time-series', 'ml']
    }
  ]);

  // UI State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popularity' | 'difficulty' | 'hours' | 'recent'>('popularity');
  const [selectedProject, setSelectedProject] = useState<string>('PROJ-001');
  const [expandedStep, setExpandedStep] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showCode, setShowCode] = useState(true);

  // Get selected project
  const currentProject = projects.find(p => p.id === selectedProject) || projects[0];

  // Filter projects
  const filteredProjects = projects.filter(project => {
    const matchesSearch = searchTerm === '' || 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || project.difficulty === selectedDifficulty;
    const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesDifficulty && matchesStatus;
  }).sort((a, b) => {
    switch(sortBy) {
      case 'popularity':
        return b.studentFavorites - a.studentFavorites;
      case 'difficulty':
        const difficultyOrder = { 'beginner': 1, 'intermediate': 2, 'advanced': 3 };
        return difficultyOrder[b.difficulty] - difficultyOrder[a.difficulty];
      case 'hours':
        return b.estimatedHours - a.estimatedHours;
      case 'recent':
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      default:
        return 0;
    }
  });

  // Get category icon
  const getCategoryIcon = (category: ProjectCategory) => {
    switch(category) {
      case 'etl-pipeline': return <Workflow size={18} />;
      case 'analytics': return <BarChart3 size={18} />;
      case 'data-warehouse': return <Database size={18} />;
      case 'ml-ai': return <Brain size={18} />;
      case 'real-time': return <Zap size={18} />;
      case 'migration': return <GitPullRequest size={18} />;
      case 'monitoring': return <Activity size={18} />;
      default: return <FolderOpen size={18} />;
    }
  };

  // Get category color
  const getCategoryColor = (category: ProjectCategory) => {
    switch(category) {
      case 'etl-pipeline': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'analytics': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'data-warehouse': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'ml-ai': return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300';
      case 'real-time': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'migration': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300';
      case 'monitoring': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  // Get category name
  const getCategoryName = (category: ProjectCategory) => {
    switch(category) {
      case 'etl-pipeline': return 'ETL Pipeline';
      case 'analytics': return 'Analytics';
      case 'data-warehouse': return 'Data Warehouse';
      case 'ml-ai': return 'ML/AI';
      case 'real-time': return 'Real-time';
      case 'migration': return 'Migration';
      case 'monitoring': return 'Monitoring';
      default: return 'Other';
    }
  };

  // Get difficulty color
  const getDifficultyColor = (difficulty: ProjectDifficulty) => {
    switch(difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    }
  };

  // Get status color
  const getStatusColor = (status: ProjectStatus) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'in-progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'planned': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Toggle favorite
  const toggleFavorite = (projectId: string) => {
    setProjects(projects.map(project => 
      project.id === projectId 
        ? { ...project, studentFavorites: project.studentFavorites + 1 }
        : project
    ));
  };

  // Statistics
  const stats = {
    total: projects.length,
    completed: projects.filter(p => p.status === 'completed').length,
    inProgress: projects.filter(p => p.status === 'in-progress').length,
    totalHours: projects.reduce((sum, p) => sum + p.estimatedHours, 0),
    totalFavorites: projects.reduce((sum, p) => sum + p.studentFavorites, 0)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8 md:mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
                <Rocket className="text-emerald-600 dark:text-emerald-400" size={40} />
                <span>Snowflake Project Showcase</span>
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
                Real-world projects to build your Snowflake portfolio
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow">
                <span className="font-semibold">{stats.completed} completed projects</span>
                <span className="mx-2">•</span>
                <span>{stats.totalHours} learning hours</span>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
              <div className="flex items-center gap-2">
                <FolderOpen className="text-emerald-500" size={20} />
                <span className="font-semibold">Total Projects</span>
              </div>
              <p className="text-2xl font-bold mt-2">{stats.total}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-500" size={20} />
                <span className="font-semibold">Completed</span>
              </div>
              <p className="text-2xl font-bold mt-2">{stats.completed}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
              <div className="flex items-center gap-2">
                <Clock className="text-blue-500" size={20} />
                <span className="font-semibold">In Progress</span>
              </div>
              <p className="text-2xl font-bold mt-2">{stats.inProgress}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
              <div className="flex items-center gap-2">
                <Heart className="text-pink-500" size={20} />
                <span className="font-semibold">Favorites</span>
              </div>
              <p className="text-2xl font-bold mt-2">{stats.totalFavorites}</p>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search projects by title, description, or tags..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* View Toggle */}
              <div className="flex gap-2">
                <button
                  className={`px-4 py-3 rounded-lg flex items-center gap-2 ${viewMode === 'grid' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' : 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300'}`}
                  onClick={() => setViewMode('grid')}
                >
                  <div className="grid grid-cols-2 gap-1">
                    <div className="w-2 h-2 bg-current rounded"></div>
                    <div className="w-2 h-2 bg-current rounded"></div>
                    <div className="w-2 h-2 bg-current rounded"></div>
                    <div className="w-2 h-2 bg-current rounded"></div>
                  </div>
                  <span className="hidden md:inline">Grid</span>
                </button>
                <button
                  className={`px-4 py-3 rounded-lg flex items-center gap-2 ${viewMode === 'list' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' : 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300'}`}
                  onClick={() => setViewMode('list')}
                >
                  <div className="flex flex-col gap-1">
                    <div className="w-4 h-1 bg-current rounded"></div>
                    <div className="w-4 h-1 bg-current rounded"></div>
                    <div className="w-4 h-1 bg-current rounded"></div>
                  </div>
                  <span className="hidden md:inline">List</span>
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 mb-4">
              <select
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="etl-pipeline">ETL Pipeline</option>
                <option value="analytics">Analytics</option>
                <option value="data-warehouse">Data Warehouse</option>
                <option value="ml-ai">ML/AI</option>
                <option value="real-time">Real-time</option>
                <option value="migration">Migration</option>
                <option value="monitoring">Monitoring</option>
              </select>

              <select
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
              >
                <option value="all">All Levels</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>

              <select
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
                <option value="planned">Planned</option>
              </select>

              <select
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
              >
                <option value="popularity">Most Popular</option>
                <option value="difficulty">Difficulty</option>
                <option value="hours">Learning Hours</option>
                <option value="recent">Recently Updated</option>
              </select>

              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-lg ${showCode ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300' : 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300'}`}
                onClick={() => setShowCode(!showCode)}
              >
                <Code size={16} />
                <span>Show Code</span>
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Panel - Project List */}
          <div className="lg:w-1/3">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-6 mb-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Rocket size={20} className="text-emerald-500" />
                Available Projects
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-auto">
                  {filteredProjects.length} found
                </span>
              </h2>

              {/* Project List */}
              <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4' : 'space-y-4'} max-h-[600px] overflow-y-auto pr-2`}>
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                      selectedProject === project.id 
                        ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' 
                        : 'border-gray-200 dark:border-gray-700 hover:border-emerald-300'
                    }`}
                    onClick={() => setSelectedProject(project.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(project.status)}`}>
                          {project.status}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${getDifficultyColor(project.difficulty)}`}>
                          {project.difficulty}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(project.id);
                          }}
                          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                        >
                          <Heart size={14} className={project.studentFavorites > 0 ? 'text-pink-500 fill-pink-500' : 'text-gray-400'} />
                        </button>
                        <span className="text-xs text-gray-500">{project.studentFavorites}</span>
                      </div>
                    </div>

                    <h3 className="font-semibold mb-1">{project.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                      {project.shortDescription}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs ${getCategoryColor(project.category)}`}>
                          {getCategoryName(project.category)}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {project.estimatedHours}h
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star size={12} className="text-yellow-500" />
                        <span className="text-xs font-semibold">{project.completionRate}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredProjects.length === 0 && (
                <div className="text-center py-8">
                  <Search size={32} className="mx-auto text-gray-400 mb-3" />
                  <p className="text-gray-500 dark:text-gray-400">No projects found</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Project Details */}
          <div className="lg:w-2/3">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              {/* Project Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(currentProject.status)}`}>
                        {currentProject.status.toUpperCase()}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(currentProject.difficulty)}`}>
                        {currentProject.difficulty.toUpperCase()}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getCategoryColor(currentProject.category)} flex items-center gap-1`}>
                        {getCategoryIcon(currentProject.category)}
                        <span>{getCategoryName(currentProject.category)}</span>
                      </span>
                      <span className="px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                        {currentProject.estimatedHours} HOURS
                      </span>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">{currentProject.title}</h2>
                    <p className="text-gray-600 dark:text-gray-400">{currentProject.description}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleFavorite(currentProject.id)}
                      className="flex items-center gap-2 px-4 py-2 bg-pink-100 hover:bg-pink-200 dark:bg-pink-900 dark:hover:bg-pink-800 text-pink-700 dark:text-pink-300 rounded-lg font-medium"
                    >
                      <Heart size={16} className={currentProject.studentFavorites > 0 ? 'fill-pink-500' : ''} />
                      {currentProject.studentFavorites}
                    </button>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Users size={14} />
                    <span>{currentProject.completionRate}% completion rate</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <HardDrive size={14} />
                    <span>Dataset: {currentProject.datasetSize}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>Updated: {formatDate(currentProject.lastUpdated)}</span>
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                {/* Business Value */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <DollarSign size={18} className="text-green-500" />
                    Business Value
                  </h3>
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-100 dark:border-green-800">
                    <p className="text-gray-700 dark:text-gray-300">{currentProject.businessValue}</p>
                  </div>
                </div>

                {/* Technologies & Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Settings size={18} className="text-blue-500" />
                      Technologies Used
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {currentProject.technologies.map((tech, idx) => (
                        <span key={idx} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <DatabaseZap size={18} className="text-purple-500" />
                      Snowflake Features
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {currentProject.snowflakeFeatures.map((feature, idx) => (
                        <span key={idx} className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300 rounded-full text-sm">
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Learning Outcomes */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Target size={18} className="text-amber-500" />
                    Learning Outcomes
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentProject.learningOutcomes.map((outcome, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                        <div className="w-6 h-6 bg-amber-100 dark:bg-amber-800 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <span className="text-amber-600 dark:text-amber-400 font-bold">{idx + 1}</span>
                        </div>
                        <span className="text-gray-700 dark:text-gray-300">{outcome}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Project Steps */}
                {currentProject.steps.length > 0 && (
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <GitBranch size={18} className="text-emerald-500" />
                        Project Steps
                      </h3>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {currentProject.steps.length} steps • {currentProject.estimatedHours} total hours
                      </div>
                    </div>

                    <div className="space-y-4">
                      {currentProject.steps.map((step) => (
                        <div key={step.step} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                          <div 
                            className="bg-gray-50 dark:bg-gray-900 p-4 border-b border-gray-200 dark:border-gray-700 cursor-pointer"
                            onClick={() => setExpandedStep(expandedStep === step.step ? null : step.step)}
                          >
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900 rounded-full flex items-center justify-center">
                                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{step.step}</span>
                                </div>
                                <div>
                                  <h4 className="font-semibold">{step.title}</h4>
                                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    {step.estimatedTime}h • {step.keyConcepts.length} key concepts
                                  </div>
                                </div>
                              </div>
                              <ChevronDown 
                                size={20} 
                                className={`transition-transform ${expandedStep === step.step ? 'rotate-180' : ''}`}
                              />
                            </div>
                          </div>

                          {expandedStep === step.step && (
                            <div className="p-4">
                              <p className="text-gray-700 dark:text-gray-300 mb-4">{step.description}</p>
                              
                              <div className="mb-4">
                                <h5 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Key Concepts</h5>
                                <div className="flex flex-wrap gap-2">
                                  {step.keyConcepts.map((concept, idx) => (
                                    <span key={idx} className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
                                      {concept}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              {showCode && step.codeSnippet && (
                                <div>
                                  <h5 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-2">Code Example</h5>
                                  <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                                    <pre className="text-emerald-400 text-sm font-mono whitespace-pre-wrap">
                                      {step.codeSnippet}
                                    </pre>
                                  </div>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Prerequisites */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <BookOpen size={18} className="text-blue-500" />
                    Prerequisites
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {currentProject.prerequisites.map((prereq, idx) => (
                      <span key={idx} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 rounded-full text-sm">
                        {prereq}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentProject.tags.map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-wrap gap-3">
              {currentProject.githubUrl && (
                <a
                  href={currentProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg font-medium"
                >
                  <Github size={16} />
                  View on GitHub
                </a>
              )}
              {currentProject.demoUrl && (
                <a
                  href={currentProject.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium"
                >
                  <Eye size={16} />
                  Live Demo
                </a>
              )}
              {currentProject.documentationUrl && (
                <a
                  href={currentProject.documentationUrl}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium"
                >
                  <FileText size={16} />
                  Documentation
                </a>
              )}
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium"
              >
                <Printer size={16} />
                Print Project
              </button>
            </div>
          </div>
        </div>

        {/* Learning Path Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="text-emerald-500" />
            Recommended Learning Path
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">1</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Beginner Level</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Start with basic ETL and analytics projects
              </p>
              <div className="text-sm">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle size={14} className="text-green-500" />
                  <span>E-commerce Analytics</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-green-500" />
                  <span>Marketing Attribution</span>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-100 dark:border-purple-800">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-800 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">2</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Intermediate Level</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Advance to real-time and ML projects
              </p>
              <div className="text-sm">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle size={14} className="text-green-500" />
                  <span>Customer 360 with Snowpark</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-green-500" />
                  <span>Supply Chain Optimization</span>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl border border-orange-100 dark:border-orange-800">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-800 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl font-bold text-orange-600 dark:text-orange-400">3</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Advanced Level</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Master complex migrations and real-time systems
              </p>
              <div className="text-sm">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle size={14} className="text-green-500" />
                  <span>Data Warehouse Migration</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-green-500" />
                  <span>IoT Data Processing</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="font-semibold mb-2">Snowflake Project Portfolio</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Build your portfolio with real-world Snowflake projects
              </p>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <p>Projects updated: {formatDate(new Date())}</p>
              <p className="mt-1">{filteredProjects.length} projects available</p>
            </div>
          </div>
          <p className="mt-4 text-xs text-center text-gray-500 dark:text-gray-400">
            Complete 3+ projects to build a strong Snowflake portfolio for job applications.
          </p>
        </footer>
      </div>
    </div>
  );
}

// Add Brain icon import if not already present
const Brain = ({ size, className }: { size: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/>
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/>
  </svg>
);