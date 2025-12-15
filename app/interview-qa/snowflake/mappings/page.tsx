'use client';

import { useState, useEffect } from 'react';
import {
  FileText,
  Database,
  Table,
  Columns,
  GitBranch,
  GitMerge,
  ArrowRight,
  Download,
  Search,
  Filter,
  Eye,
  EyeOff,
  Copy,
  Check,
  Share2,
  Printer,
  BookOpen,
  Map,
  Layers,
  Workflow,
  BarChart3,
  Link,
  FileDown,
  FileUp,
  Code,
  CheckCircle,
  AlertCircle,
  Info,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  FolderTree,
  Network,
  RefreshCw,
  Shield,
  Users,
  Calendar,
  Clock,
  Tag,
  Hash,
  Key,
  Lock,
  Unlock,
  DownloadCloud,
  UploadCloud,
  BarChart,
  PieChart,
  LineChart,
  Activity,
  Target  // ← ADD THIS LINE
} from 'lucide-react';

type MappingStatus = 'draft' | 'reviewed' | 'approved' | 'deprecated';
type DataDomain = 'sales' | 'marketing' | 'finance' | 'hr' | 'operations' | 'analytics';
type MappingType = 'etl' | 'elt' | 'sql-transform' | 'data-pipeline' | 'data-mart' | 'reporting';

type MappingDoc = {
  id: string;
  name: string;
  description: string;
  businessPurpose: string;
  sourceSystems: string[];
  targetTables: string[];
  status: MappingStatus;
  dataDomain: DataDomain;
  type: MappingType;
  owner: string;
  createdDate: Date;
  lastModified: Date;
  version: string;
  complexity: 'simple' | 'medium' | 'complex';
  estimatedRows: number;
  refreshFrequency: 'real-time' | 'hourly' | 'daily' | 'weekly' | 'monthly';
  dependencies: string[];
  tags: string[];
  downloadUrl: string;
  previewContent: string;
  transformations: Transformation[];
  lineage: LineageNode[];
  sampleQueries: string[];
  performanceMetrics?: {
    executionTime: number;
    rowsProcessed: number;
    lastRun: Date;
    successRate: number;
  };
};

type Transformation = {
  id: string;
  description: string;
  sourceField: string;
  targetField: string;
  transformationLogic: string;
  dataType: string;
  constraints: string[];
  businessRules: string[];
  sampleInput: string;
  sampleOutput: string;
};

type LineageNode = {
  id: string;
  name: string;
  type: 'source' | 'transform' | 'target' | 'view' | 'stage';
  position: { x: number; y: number };
  connections: string[];
};

export default function SnowflakeMappingDocsPage() {
  // Mock data for mapping documents
  const [mappingDocs, setMappingDocs] = useState<MappingDoc[]>([
    {
      id: 'SNOW-MAP-001',
      name: 'Sales Pipeline - Customer 360 View',
      description: 'Consolidates customer data from multiple sources into a single 360-degree view with historical tracking.',
      businessPurpose: 'Enable sales team to view complete customer journey, improve targeting, and track customer lifetime value.',
      sourceSystems: ['Salesforce', 'HubSpot', 'Zendesk', 'Stripe'],
      targetTables: ['ANALYTICS.CUSTOMER_360', 'ANALYTICS.CUSTOMER_HISTORY'],
      status: 'approved',
      dataDomain: 'sales',
      type: 'elt',
      owner: 'Sarah Chen',
      createdDate: new Date('2024-01-15'),
      lastModified: new Date('2024-03-10'),
      version: '2.1',
      complexity: 'complex',
      estimatedRows: 2500000,
      refreshFrequency: 'daily',
      dependencies: ['SNOW-MAP-002', 'SNOW-MAP-003'],
      tags: ['customer', 'consolidation', 'history', 'key-metric'],
      downloadUrl: '/docs/snowflake-mappings/sales-customer-360.pdf',
      previewContent: `# Customer 360 Mapping Document

## Overview
This mapping creates a unified customer view by integrating data from CRM, marketing, support, and billing systems.

## Key Business Rules:
1. Customer deduplication using email + phone matching
2. Historical tracking with Type 2 SCD (Slowly Changing Dimensions)
3. Lifetime value calculation
4. Engagement scoring

## Snowflake Features Used:
- Streams for CDC (Change Data Capture)
- Tasks for orchestration
- Materialized views for performance
- Time Travel for debugging`,
      transformations: [
        {
          id: 'T1',
          description: 'Email normalization and validation',
          sourceField: 'contact_email',
          targetField: 'email_normalized',
          transformationLogic: 'LOWER(TRIM(email)), validate with regex',
          dataType: 'VARCHAR(255)',
          constraints: ['NOT NULL', 'UNIQUE'],
          businessRules: ['Primary contact identifier', 'Must be valid email format'],
          sampleInput: 'John.Doe@Example.com ',
          sampleOutput: 'john.doe@example.com'
        },
        {
          id: 'T2',
          description: 'Customer segmentation',
          sourceField: 'total_spent, order_count, last_order_date',
          targetField: 'customer_segment',
          transformationLogic: 'CASE WHEN total_spent > 10000 THEN "VIP" WHEN DATEDIFF(day, last_order_date, CURRENT_DATE()) < 30 THEN "Active" ELSE "Inactive" END',
          dataType: 'VARCHAR(50)',
          constraints: [],
          businessRules: ['Segmentation drives marketing campaigns', 'Updated daily'],
          sampleInput: '15000, 45, 2024-03-01',
          sampleOutput: 'VIP'
        },
        {
          id: 'T3',
          description: 'Lifetime value calculation',
          sourceField: 'all_transactions.amount',
          targetField: 'lifetime_value',
          transformationLogic: 'SUM(amount) OVER (PARTITION BY customer_id)',
          dataType: 'DECIMAL(15,2)',
          constraints: ['NOT NULL', 'DEFAULT 0'],
          businessRules: ['Rolling 3-year window', 'Excluding refunds'],
          sampleInput: '[99.99, 149.99, 299.99]',
          sampleOutput: '549.97'
        }
      ],
      lineage: [
        { id: 'S1', name: 'Salesforce', type: 'source', position: { x: 100, y: 100 }, connections: ['T1'] },
        { id: 'S2', name: 'HubSpot', type: 'source', position: { x: 100, y: 200 }, connections: ['T1'] },
        { id: 'T1', name: 'Staging', type: 'stage', position: { x: 300, y: 150 }, connections: ['T2'] },
        { id: 'T2', name: 'Cleaning & Dedup', type: 'transform', position: { x: 500, y: 150 }, connections: ['T3'] },
        { id: 'T3', name: 'Enrichment', type: 'transform', position: { x: 700, y: 150 }, connections: ['V1'] },
        { id: 'V1', name: 'Customer View', type: 'view', position: { x: 900, y: 150 }, connections: ['TGT1', 'TGT2'] },
        { id: 'TGT1', name: 'CUSTOMER_360', type: 'target', position: { x: 1100, y: 100 }, connections: [] },
        { id: 'TGT2', name: 'CUSTOMER_HISTORY', type: 'target', position: { x: 1100, y: 200 }, connections: [] }
      ],
      sampleQueries: [
        'SELECT * FROM ANALYTICS.CUSTOMER_360 WHERE customer_segment = "VIP"',
        'SELECT customer_id, lifetime_value, DATEDIFF(day, first_order_date, last_order_date) as customer_duration FROM ANALYTICS.CUSTOMER_360',
        'WITH monthly_trend AS (SELECT DATE_TRUNC("month", order_date) as month, COUNT(*) as orders FROM orders GROUP BY 1) SELECT * FROM monthly_trend'
      ]
    },
    {
      id: 'SNOW-MAP-002',
      name: 'Financial Reporting - Revenue Recognition',
      description: 'Implements ASC 606 revenue recognition rules with multi-element arrangements.',
      businessPurpose: 'Automated GAAP-compliant revenue reporting for quarterly financial statements.',
      sourceSystems: ['Netsuite', 'Stripe', 'Zuora'],
      targetTables: ['FINANCE.REVENUE_SCHEDULES', 'FINANCE.REVENUE_JOURNAL'],
      status: 'approved',
      dataDomain: 'finance',
      type: 'sql-transform',
      owner: 'Michael Rodriguez',
      createdDate: new Date('2024-02-01'),
      lastModified: new Date('2024-03-15'),
      version: '1.3',
      complexity: 'complex',
      estimatedRows: 500000,
      refreshFrequency: 'daily',
      dependencies: ['SNOW-MAP-005'],
      tags: ['finance', 'compliance', 'asc606', 'revenue'],
      downloadUrl: '/docs/snowflake-mappings/finance-revenue-recognition.pdf',
      previewContent: `# Revenue Recognition Mapping

## Compliance Requirements:
- ASC 606 / IFRS 15 compliance
- Multi-element arrangement allocation
- Contract liability tracking
- Deferred revenue calculation

## Snowflake Implementation:
- Stored procedures for complex logic
- Tasks for scheduled runs
- Secure views for auditor access
- Time Travel for audit trail`,
      transformations: [
        {
          id: 'T1',
          description: 'Contract value allocation',
          sourceField: 'contract_amount, elements',
          targetField: 'allocated_amount',
          transformationLogic: 'contract_amount * (element_value / total_standalone_price)',
          dataType: 'DECIMAL(15,2)',
          constraints: ['SUM(allocated_amount) = contract_amount'],
          businessRules: ['ASC 606 allocation rules', 'Based on standalone selling prices'],
          sampleInput: '10000, [{element: "License", price: 7000}, {element: "Support", price: 3000}]',
          sampleOutput: '7000 (License), 3000 (Support)'
        }
      ],
      lineage: [
        { id: 'S1', name: 'Netsuite', type: 'source', position: { x: 100, y: 100 }, connections: ['ST1'] },
        { id: 'ST1', name: 'Staging', type: 'stage', position: { x: 300, y: 100 }, connections: ['SP1'] },
        { id: 'SP1', name: 'Revenue Proc', type: 'transform', position: { x: 500, y: 100 }, connections: ['TGT1', 'TGT2'] },
        { id: 'TGT1', name: 'REVENUE_SCHEDULES', type: 'target', position: { x: 700, y: 50 }, connections: [] },
        { id: 'TGT2', name: 'REVENUE_JOURNAL', type: 'target', position: { x: 700, y: 150 }, connections: [] }
      ],
      sampleQueries: [
        'SELECT * FROM FINANCE.REVENUE_SCHEDULES WHERE recognition_date BETWEEN "2024-01-01" AND "2024-03-31"',
        'SELECT product, SUM(recognized_revenue) as q1_revenue FROM FINANCE.REVENUE_JOURNAL WHERE quarter = "Q1-2024" GROUP BY product'
      ]
    },
    {
      id: 'SNOW-MAP-003',
      name: 'Marketing Attribution - Multi-Touch',
      description: 'Multi-touch attribution model assigning credit across marketing channels.',
      businessPurpose: 'Measure marketing channel effectiveness for budget allocation optimization.',
      sourceSystems: ['Google Analytics', 'Facebook Ads', 'LinkedIn Ads', 'Marketo'],
      targetTables: ['MARKETING.ATTRIBUTION_SCORES', 'MARKETING.CHANNEL_PERFORMANCE'],
      status: 'reviewed',
      dataDomain: 'marketing',
      type: 'data-mart',
      owner: 'Jessica Park',
      createdDate: new Date('2024-02-20'),
      lastModified: new Date('2024-03-12'),
      version: '1.1',
      complexity: 'medium',
      estimatedRows: 1000000,
      refreshFrequency: 'hourly',
      dependencies: ['SNOW-MAP-001'],
      tags: ['marketing', 'attribution', 'analytics', 'roi'],
      downloadUrl: '/docs/snowflake-mappings/marketing-attribution.pdf',
      previewContent: `# Marketing Attribution Mapping

## Attribution Models:
1. First Touch
2. Last Touch
3. Linear
4. Time Decay
5. Position Based

## Implementation:
- User session stitching
- Channel touchpoint tracking
- Conversion window (30 days)
- Cross-device matching`,
      transformations: [
        {
          id: 'T1',
          description: 'Session stitching',
          sourceField: 'user_id, device_id, timestamp',
          targetField: 'session_id',
          transformationLogic: 'New session after 30 minutes of inactivity',
          dataType: 'VARCHAR(100)',
          constraints: [],
          businessRules: ['30-minute session timeout', 'Cross-device stitching via user_id'],
          sampleInput: 'user123, device456, 2024-03-15 10:00:00',
          sampleOutput: 'sess_20240315_user123_1'
        }
      ],
      lineage: [
        { id: 'S1', name: 'Google Analytics', type: 'source', position: { x: 100, y: 50 }, connections: ['ST1'] },
        { id: 'S2', name: 'Facebook Ads', type: 'source', position: { x: 100, y: 150 }, connections: ['ST1'] },
        { id: 'ST1', name: 'Staging', type: 'stage', position: { x: 300, y: 100 }, connections: ['T1'] },
        { id: 'T1', name: 'Attribution Logic', type: 'transform', position: { x: 500, y: 100 }, connections: ['TGT1'] },
        { id: 'TGT1', name: 'ATTRIBUTION_SCORES', type: 'target', position: { x: 700, y: 100 }, connections: [] }
      ],
      sampleQueries: [
        'SELECT channel, SUM(attributed_revenue) as revenue FROM MARKETING.ATTRIBUTION_SCORES WHERE model = "linear" GROUP BY channel',
        'SELECT campaign, ROUND(SUM(attributed_revenue) / SUM(spend), 2) as roas FROM MARKETING.CHANNEL_PERFORMANCE GROUP BY campaign'
      ]
    },
    {
      id: 'SNOW-MAP-004',
      name: 'Product Analytics - User Behavior',
      description: 'Tracks user behavior flows and feature adoption across product.',
      businessPurpose: 'Product team insights for feature improvement and user retention.',
      sourceSystems: ['Segment', 'Amplitude', 'Product Database'],
      targetTables: ['PRODUCT.USER_FLOWS', 'PRODUCT.FEATURE_ADOPTION'],
      status: 'draft',
      dataDomain: 'operations',
      type: 'data-pipeline',
      owner: 'Alex Thompson',
      createdDate: new Date('2024-03-01'),
      lastModified: new Date('2024-03-14'),
      version: '0.9',
      complexity: 'medium',
      estimatedRows: 5000000,
      refreshFrequency: 'real-time',
      dependencies: [],
      tags: ['product', 'analytics', 'user-behavior', 'real-time'],
      downloadUrl: '/docs/snowflake-mappings/product-analytics.pdf',
      previewContent: `# Product Analytics Mapping

## Metrics Tracked:
- User retention cohorts
- Feature adoption rates
- Funnel conversion rates
- Time to value

## Real-time Processing:
- Snowpipe for streaming ingestion
- Streams for change capture
- Tasks for aggregation
- Materialized views for dashboards`,
      transformations: [],
      lineage: [],
      sampleQueries: []
    },
    {
      id: 'SNOW-MAP-005',
      name: 'HR Analytics - Employee Journey',
      description: 'Tracks employee lifecycle from hiring to exit with engagement metrics.',
      businessPurpose: 'HR analytics for retention, promotion planning, and diversity tracking.',
      sourceSystems: ['Workday', 'Greenhouse', 'Lattice', 'Slack'],
      targetTables: ['HR.EMPLOYEE_JOURNEY', 'HR.ENGAGEMENT_METRICS'],
      status: 'approved',
      dataDomain: 'hr',
      type: 'etl',
      owner: 'David Kim',
      createdDate: new Date('2024-01-10'),
      lastModified: new Date('2024-03-05'),
      version: '2.0',
      complexity: 'medium',
      estimatedRows: 10000,
      refreshFrequency: 'weekly',
      dependencies: [],
      tags: ['hr', 'employee', 'retention', 'analytics'],
      downloadUrl: '/docs/snowflake-mappings/hr-analytics.pdf',
      previewContent: `# HR Analytics Mapping

## Data Privacy:
- PII masking for non-HR users
- GDPR compliance
- Role-based access control
- Data retention policies

## Snowflake Security:
- Dynamic data masking
- Row access policies
- Secure data sharing for executives
- Audit logging`,
      transformations: [],
      lineage: [],
      sampleQueries: []
    },
    {
      id: 'SNOW-MAP-006',
      name: 'Inventory Optimization - Demand Forecasting',
      description: 'Machine learning model for inventory demand forecasting.',
      businessPurpose: 'Reduce stockouts and overstock through predictive analytics.',
      sourceSystems: ['ERP System', 'Sales Data', 'External Weather'],
      targetTables: ['OPERATIONS.FORECAST_OUTPUT', 'OPERATIONS.INVENTORY_RECOMMENDATIONS'],
      status: 'deprecated',
      dataDomain: 'operations',
      type: 'sql-transform',
      owner: 'Maria Garcia',
      createdDate: new Date('2023-11-15'),
      lastModified: new Date('2024-02-28'),
      version: '1.5',
      complexity: 'complex',
      estimatedRows: 500000,
      refreshFrequency: 'daily',
      dependencies: ['SNOW-MAP-002'],
      tags: ['inventory', 'ml', 'forecasting', 'deprecated'],
      downloadUrl: '/docs/snowflake-mappings/inventory-forecasting.pdf',
      previewContent: `# DEPRECATED - Inventory Forecasting

## Deprecation Notice:
Replaced by new ML pipeline using Snowpark and external functions.

## Legacy Logic:
- ARIMA time series forecasting
- Seasonal adjustment
- Promotion impact modeling`,
      transformations: [],
      lineage: [],
      sampleQueries: []
    }
  ]);

  // UI State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [selectedComplexity, setSelectedComplexity] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'date' | 'complexity' | 'status'>('date');
  const [selectedDoc, setSelectedDoc] = useState<string>('SNOW-MAP-001');
  const [expandedSection, setExpandedSection] = useState<string>('overview');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Get selected document
  const currentDoc = mappingDocs.find(doc => doc.id === selectedDoc) || mappingDocs[0];

  // Filter documents
  const filteredDocs = mappingDocs.filter(doc => {
    const matchesSearch = searchTerm === '' || 
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
      doc.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || doc.status === selectedStatus;
    const matchesDomain = selectedDomain === 'all' || doc.dataDomain === selectedDomain;
    const matchesComplexity = selectedComplexity === 'all' || doc.complexity === selectedComplexity;
    
    return matchesSearch && matchesStatus && matchesDomain && matchesComplexity;
  }).sort((a, b) => {
    switch(sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'date':
        return new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime();
      case 'complexity':
        const complexityOrder = { 'simple': 1, 'medium': 2, 'complex': 3 };
        return complexityOrder[b.complexity] - complexityOrder[a.complexity];
      case 'status':
        const statusOrder = { 'draft': 1, 'reviewed': 2, 'approved': 3, 'deprecated': 4 };
        return statusOrder[b.status] - statusOrder[a.status];
      default:
        return 0;
    }
  });

  // Copy ID to clipboard
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Get status color
  const getStatusColor = (status: MappingStatus) => {
    switch(status) {
      case 'draft': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      case 'reviewed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'approved': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'deprecated': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
    }
  };

  // Get domain color
  const getDomainColor = (domain: DataDomain) => {
    switch(domain) {
      case 'sales': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'marketing': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'finance': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'hr': return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300';
      case 'operations': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'analytics': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300';
    }
  };

  // Get complexity color
  const getComplexityColor = (complexity: string) => {
    switch(complexity) {
      case 'simple': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'complex': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  // Get type icon
  const getTypeIcon = (type: MappingType) => {
    switch(type) {
      case 'etl': return <UploadCloud size={16} />;
      case 'elt': return <DownloadCloud size={16} />;
      case 'sql-transform': return <Code size={16} />;
      case 'data-pipeline': return <Workflow size={16} />;
      case 'data-mart': return <Database size={16} />;
      case 'reporting': return <BarChart size={16} />;
    }
  };

  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  // Toggle section
  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? '' : section);
  };

  // Download document
  const downloadDocument = (doc: MappingDoc) => {
    // In real app, this would trigger actual download
    alert(`Downloading ${doc.name}...\nURL: ${doc.downloadUrl}`);
  };

  // Statistics
  const stats = {
    total: mappingDocs.length,
    approved: mappingDocs.filter(d => d.status === 'approved').length,
    draft: mappingDocs.filter(d => d.status === 'draft').length,
    deprecated: mappingDocs.filter(d => d.status === 'deprecated').length,
    domains: [...new Set(mappingDocs.map(d => d.dataDomain))].length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8 md:mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
                <Map className="text-indigo-600 dark:text-indigo-400" size={40} />
                <span>Snowflake Mapping Documentation</span>
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
                Comprehensive documentation for all Snowflake data transformations and pipelines
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow">
                <span className="font-semibold">{stats.total} mappings</span>
                <span className="mx-2">•</span>
                <span className="text-green-600 dark:text-green-400">{stats.approved} approved</span>
              </div>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <Printer size={18} />
                <span className="hidden md:inline">Print</span>
              </button>
            </div>
          </div>

          {/* === ADD ONLY THIS BLOCK HERE === */}
          <div className="mb-6 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Info className="text-yellow-600 dark:text-yellow-400 mt-0.5" size={20} />
              <div>
                <h3 className="font-semibold text-yellow-800 dark:text-yellow-300">
                  Documentation Repository
                </h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-400 mt-1">
                  This section contains sample Snowflake mapping documentation templates. 
                  Actual pipeline documentation will be added as projects are completed.
                </p>
              </div>
            </div>
          </div>
          {/* === END OF ADDED BLOCK === */}

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
              <div className="flex items-center gap-2">
                <FileText className="text-indigo-500" size={20} />
                <span className="font-semibold">Total Mappings</span>
              </div>
              <p className="text-2xl font-bold mt-2">{stats.total}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
              <div className="flex items-center gap-2">
                <CheckCircle className="text-green-500" size={20} />
                <span className="font-semibold">Approved</span>
              </div>
              <p className="text-2xl font-bold mt-2">{stats.approved}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
              <div className="flex items-center gap-2">
                <FileText className="text-blue-500" size={20} />
                <span className="font-semibold">Draft</span>
              </div>
              <p className="text-2xl font-bold mt-2">{stats.draft}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
              <div className="flex items-center gap-2">
                <AlertCircle className="text-red-500" size={20} />
                <span className="font-semibold">Deprecated</span>
              </div>
              <p className="text-2xl font-bold mt-2">{stats.deprecated}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
              <div className="flex items-center gap-2">
                <FolderTree className="text-purple-500" size={20} />
                <span className="font-semibold">Data Domains</span>
              </div>
              <p className="text-2xl font-bold mt-2">{stats.domains}</p>
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
                    placeholder="Search mappings by name, description, tags, or ID..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* View Toggle */}
              <div className="flex gap-2">
                <button
                  className={`px-4 py-3 rounded-lg flex items-center gap-2 ${viewMode === 'grid' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300' : 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300'}`}
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
                  className={`px-4 py-3 rounded-lg flex items-center gap-2 ${viewMode === 'list' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300' : 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300'}`}
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
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="draft">Draft</option>
                <option value="reviewed">Reviewed</option>
                <option value="approved">Approved</option>
                <option value="deprecated">Deprecated</option>
              </select>

              <select
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={selectedDomain}
                onChange={(e) => setSelectedDomain(e.target.value)}
              >
                <option value="all">All Domains</option>
                <option value="sales">Sales</option>
                <option value="marketing">Marketing</option>
                <option value="finance">Finance</option>
                <option value="hr">HR</option>
                <option value="operations">Operations</option>
                <option value="analytics">Analytics</option>
              </select>

              <select
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={selectedComplexity}
                onChange={(e) => setSelectedComplexity(e.target.value)}
              >
                <option value="all">All Complexity</option>
                <option value="simple">Simple</option>
                <option value="medium">Medium</option>
                <option value="complex">Complex</option>
              </select>

              <select
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
              >
                <option value="date">Sort by Date</option>
                <option value="name">Sort by Name</option>
                <option value="complexity">Sort by Complexity</option>
                <option value="status">Sort by Status</option>
              </select>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Panel - Document List */}
          <div className="lg:w-1/3">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-6 mb-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <FileText size={20} className="text-indigo-500" />
                Mapping Documents
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400 ml-auto">
                  {filteredDocs.length} found
                </span>
              </h2>

              {/* Document List */}
              <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4' : 'space-y-4'} max-h-[600px] overflow-y-auto pr-2`}>
                {filteredDocs.map((doc) => (
                  <div
                    key={doc.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                      selectedDoc === doc.id 
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20' 
                        : 'border-gray-200 dark:border-gray-700 hover:border-indigo-300'
                    }`}
                    onClick={() => setSelectedDoc(doc.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(doc.status)}`}>
                          {doc.status}
                        </span>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ml-2 ${getDomainColor(doc.dataDomain)}`}>
                          {doc.dataDomain}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        v{doc.version}
                      </span>
                    </div>

                    <h3 className="font-semibold mb-1">{doc.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-2">
                      {doc.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {doc.owner}
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {formatDate(doc.lastModified)}
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadDocument(doc);
                        }}
                        className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                        title="Download"
                      >
                        <Download size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredDocs.length === 0 && (
                <div className="text-center py-8">
                  <Search size={32} className="mx-auto text-gray-400 mb-3" />
                  <p className="text-gray-500 dark:text-gray-400">No mapping documents found</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Document Details */}
          <div className="lg:w-2/3">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
              {/* Document Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(currentDoc.status)}`}>
                        {currentDoc.status.toUpperCase()}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getDomainColor(currentDoc.dataDomain)}`}>
                        {currentDoc.dataDomain.toUpperCase()}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getComplexityColor(currentDoc.complexity)}`}>
                        {currentDoc.complexity.toUpperCase()}
                      </span>
                      <span className="px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                        {currentDoc.type.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <h2 className="text-2xl font-bold">{currentDoc.name}</h2>
                      <button
                        onClick={() => copyToClipboard(currentDoc.id, currentDoc.id)}
                        className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded hover:bg-gray-200 dark:hover:bg-gray-600"
                        title="Copy ID"
                      >
                        <span className="font-mono">{currentDoc.id}</span>
                        {copiedId === currentDoc.id ? <Check size={10} /> : <Copy size={10} />}
                      </button>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">{currentDoc.description}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => downloadDocument(currentDoc)}
                      className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-medium"
                    >
                      <Download size={16} />
                      Download PDF
                    </button>
                  </div>
                </div>

                {/* Metadata */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Owner:</span>
                    <span className="ml-2 font-medium">{currentDoc.owner}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Version:</span>
                    <span className="ml-2 font-medium">{currentDoc.version}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Created:</span>
                    <span className="ml-2 font-medium">{formatDate(currentDoc.createdDate)}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Modified:</span>
                    <span className="ml-2 font-medium">{formatDate(currentDoc.lastModified)}</span>
                  </div>
                </div>
              </div>

              {/* Document Content */}
              <div className="p-6">
                {/* Navigation Tabs */}
                <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
                  {['overview', 'transformations', 'lineage', 'queries', 'metadata'].map((section) => (
                    <button
                      key={section}
                      onClick={() => setExpandedSection(section)}
                      className={`px-4 py-2 rounded-lg font-medium capitalize ${
                        expandedSection === section
                          ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300'
                          : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {section}
                    </button>
                  ))}
                </div>

                {/* Overview Section */}
                {(expandedSection === 'overview' || expandedSection === '') && (
                  <div className="space-y-6">
                    {/* Business Purpose */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <Target size={18} className="text-green-500" />
                        Business Purpose
                      </h3>
                      <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-100 dark:border-green-800">
                        <p className="text-gray-700 dark:text-gray-300">{currentDoc.businessPurpose}</p>
                      </div>
                    </div>

                    {/* Source & Target Systems */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <ArrowRight size={18} className="text-blue-500" />
                          Source Systems
                        </h3>
                        <div className="space-y-2">
                          {currentDoc.sourceSystems.map((system, idx) => (
                            <div key={idx} className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                              <Database size={14} className="text-blue-500" />
                              <span>{system}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                          <Database size={18} className="text-purple-500" />
                          Target Tables
                        </h3>
                        <div className="space-y-2">
                          {currentDoc.targetTables.map((table, idx) => (
                            <div key={idx} className="flex items-center gap-2 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                              <Table size={14} className="text-purple-500" />
                              <span className="font-mono">{table}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Key Information */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                        <div className="text-sm text-gray-500 dark:text-gray-400">Refresh Frequency</div>
                        <div className="font-semibold mt-1">{currentDoc.refreshFrequency}</div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                        <div className="text-sm text-gray-500 dark:text-gray-400">Estimated Rows</div>
                        <div className="font-semibold mt-1">{currentDoc.estimatedRows.toLocaleString()}</div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                        <div className="text-sm text-gray-500 dark:text-gray-400">Mapping Type</div>
                        <div className="font-semibold mt-1 flex items-center gap-1">
                          {getTypeIcon(currentDoc.type)}
                          <span>{currentDoc.type}</span>
                        </div>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                        <div className="text-sm text-gray-500 dark:text-gray-400">Dependencies</div>
                        <div className="font-semibold mt-1">{currentDoc.dependencies.length}</div>
                      </div>
                    </div>

                    {/* Preview Content */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <BookOpen size={18} className="text-amber-500" />
                        Document Preview
                      </h3>
                      <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                        <pre className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap text-sm">
                          {currentDoc.previewContent}
                        </pre>
                      </div>
                    </div>

                    {/* Tags */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {currentDoc.tags.map((tag, idx) => (
                          <span key={idx} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Transformations Section */}
                {expandedSection === 'transformations' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold mb-4">Field Transformations</h3>
                    {currentDoc.transformations.length > 0 ? (
                      <div className="space-y-4">
                        {currentDoc.transformations.map((transform) => (
                          <div key={transform.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                            <div className="bg-gray-50 dark:bg-gray-900 p-4 border-b border-gray-200 dark:border-gray-700">
                              <div className="flex justify-between items-center">
                                <div>
                                  <h4 className="font-semibold">{transform.description}</h4>
                                  <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    {transform.sourceField} → {transform.targetField}
                                  </div>
                                </div>
                                <span className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded">
                                  {transform.dataType}
                                </span>
                              </div>
                            </div>
                            <div className="p-4 space-y-4">
                              <div>
                                <h5 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Transformation Logic</h5>
                                <div className="bg-gray-900 p-3 rounded font-mono text-sm text-green-400">
                                  {transform.transformationLogic}
                                </div>
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                  <h5 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Sample Input</h5>
                                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded font-mono text-sm">
                                    {transform.sampleInput}
                                  </div>
                                </div>
                                <div>
                                  <h5 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Sample Output</h5>
                                  <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded font-mono text-sm text-green-600 dark:text-green-400">
                                    {transform.sampleOutput}
                                  </div>
                                </div>
                              </div>
                              {transform.constraints.length > 0 && (
                                <div>
                                  <h5 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Constraints</h5>
                                  <div className="flex flex-wrap gap-2">
                                    {transform.constraints.map((constraint, idx) => (
                                      <span key={idx} className="px-2 py-1 text-xs bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300 rounded">
                                        {constraint}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              )}
                              {transform.businessRules.length > 0 && (
                                <div>
                                  <h5 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">Business Rules</h5>
                                  <ul className="space-y-1">
                                    {transform.businessRules.map((rule, idx) => (
                                      <li key={idx} className="flex items-start gap-2">
                                        <ChevronRight size={14} className="text-blue-500 mt-1" />
                                        <span className="text-sm">{rule}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        No transformation details available
                      </div>
                    )}
                  </div>
                )}

                {/* Lineage Section */}
                {expandedSection === 'lineage' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold mb-4">Data Lineage</h3>
                    {currentDoc.lineage.length > 0 ? (
                      <div>
                        {/* Simplified lineage visualization */}
                        <div className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg border border-gray-200 dark:border-gray-700 mb-6">
                          <div className="flex flex-wrap justify-center gap-8">
                            {currentDoc.lineage.map((node) => (
                              <div key={node.id} className="text-center">
                                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 ${
                                  node.type === 'source' ? 'bg-blue-100 dark:bg-blue-900' :
                                  node.type === 'target' ? 'bg-green-100 dark:bg-green-900' :
                                  node.type === 'transform' ? 'bg-yellow-100 dark:bg-yellow-900' :
                                  'bg-purple-100 dark:bg-purple-900'
                                }`}>
                                  {node.type === 'source' && <Database className="text-blue-600 dark:text-blue-400" size={24} />}
                                  {node.type === 'target' && <Table className="text-green-600 dark:text-green-400" size={24} />}
                                  {node.type === 'transform' && <RefreshCw className="text-yellow-600 dark:text-yellow-400" size={24} />}
                                  {node.type === 'view' && <Eye className="text-purple-600 dark:text-purple-400" size={24} />}
                                  {node.type === 'stage' && <Layers className="text-gray-600 dark:text-gray-400" size={24} />}
                                </div>
                                <div className="text-sm font-medium">{node.name}</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">{node.type}</div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <h4 className="font-semibold">Flow Description</h4>
                          <div className="prose dark:prose-invert max-w-none">
                            <p>Data flows from source systems through staging, transformations, and views into target tables. Each step is orchestrated using Snowflake Tasks and monitored with Streams for change data capture.</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        No lineage information available
                      </div>
                    )}
                  </div>
                )}

                {/* Queries Section */}
                {expandedSection === 'queries' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold mb-4">Sample Queries</h3>
                    {currentDoc.sampleQueries.length > 0 ? (
                      <div className="space-y-4">
                        {currentDoc.sampleQueries.map((query, idx) => (
                          <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                            <div className="bg-gray-50 dark:bg-gray-900 p-3 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                              <span className="text-sm font-semibold">Query {idx + 1}</span>
                              <button
                                onClick={() => copyToClipboard(query, `query-${idx}`)}
                                className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                              >
                                {copiedId === `query-${idx}` ? <Check size={10} /> : <Copy size={10} />}
                                Copy
                              </button>
                            </div>
                            <div className="bg-gray-900 p-4 overflow-x-auto">
                              <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap">
                                {query}
                              </pre>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        No sample queries available
                      </div>
                    )}
                  </div>
                )}

                {/* Metadata Section */}
                {expandedSection === 'metadata' && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold mb-4">Technical Metadata</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Dependencies</h4>
                          <div className="space-y-2">
                            {currentDoc.dependencies.length > 0 ? (
                              currentDoc.dependencies.map((dep, idx) => (
                                <div key={idx} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-900 rounded">
                                  <Link size={14} className="text-gray-400" />
                                  <span className="font-mono text-sm">{dep}</span>
                                </div>
                              ))
                            ) : (
                              <div className="text-gray-500 dark:text-gray-400 text-sm">No dependencies</div>
                            )}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-2">Snowflake Features Used</h4>
                          <div className="flex flex-wrap gap-2">
                            {['Tasks', 'Streams', 'Materialized Views', 'Time Travel', 'Cloning'].map((feature) => (
                              <span key={feature} className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-300 rounded-full text-sm">
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Performance Considerations</h4>
                          <ul className="space-y-2 text-sm">
                            <li className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-1"></div>
                              <span>Clustering key: {currentDoc.complexity === 'complex' ? 'Yes' : 'No'}</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full mt-1"></div>
                              <span>Materialized views: {currentDoc.complexity === 'complex' ? 'Recommended' : 'Not needed'}</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-yellow-500 rounded-full mt-1"></div>
                              <span>Warehouse size: {currentDoc.complexity === 'complex' ? 'Large' : currentDoc.complexity === 'medium' ? 'Medium' : 'Small'}</span>
                            </li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-2">Security Requirements</h4>
                          <div className="flex flex-wrap gap-2">
                            {['RBAC', 'Data Masking', 'Network Policies', 'Audit Logging'].map((security) => (
                              <span key={security} className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300 rounded-full text-sm">
                                {security}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                onClick={() => downloadDocument(currentDoc)}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-medium"
              >
                <Download size={16} />
                Download Mapping Document
              </button>
              <button
                onClick={() => window.print()}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium"
              >
                <Printer size={16} />
                Print
              </button>
              <button
                onClick={() => copyToClipboard(currentDoc.id, currentDoc.id)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium"
              >
                {copiedId === currentDoc.id ? <Check size={16} /> : <Copy size={16} />}
                Copy Reference ID
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="font-semibold mb-2">Snowflake Mapping Documentation</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Comprehensive documentation for all data transformations and pipelines
              </p>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <p>Last updated: {formatDate(new Date())}</p>
              <p className="mt-1">{stats.total} documents • {filteredDocs.length} filtered</p>
            </div>
          </div>
          <p className="mt-4 text-xs text-center text-gray-500 dark:text-gray-400">
            These mapping documents are essential for data governance, audit compliance, and team collaboration.
          </p>
        </footer>
      </div>
    </div>
  );
}