// app/snowflake-connect/page.tsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Database, BarChart3, Users, Package, 
  Settings, Wrench, FileText, Download, 
  Upload, History, Play, Save, TestTube,
  CheckCircle, AlertCircle, RefreshCw,
  ExternalLink, ChevronRight, Zap,
  TrendingUp, UserCheck, DollarSign,
  Shield, Cpu, Layers, Clock, Share2,
  Copy, Globe, Lock, Cloud, Target,
  Building2, ShoppingCart, Truck,
  Sparkles, Rocket, Star, Award,
  Store, ShoppingBag, Tag, Percent,
  BarChart4, CreditCard, PackageOpen
} from 'lucide-react';

export default function SnowflakeConnectPage() {
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'checking'>('checking');
  const [connectionStats, setConnectionStats] = useState({
    account: 'RISHAB_RETAIL_WH',
    region: 'AZURE_CENTRALINDIA',
    version: '9.39.2',
    lastSync: '15 seconds ago',
    queryCount: 284,
    dataSize: '45.8 GB'
  });
  const [query, setQuery] = useState(`SELECT * FROM RETAIL.PRODUCTS WHERE STOCK_QUANTITY < 10 ORDER BY PRICE DESC`);
  const [queryResults, setQueryResults] = useState<any[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [activeTab, setActiveTab] = useState<'basics' | 'scenarios' | 'industries' | 'custom'>('basics');
  const [recentActivities, setRecentActivities] = useState([
    { id: 1, action: 'iPhone 15 Pro sold in Mumbai store', time: 'Just now', type: 'sale' },
    { id: 2, action: 'Price of Nike Air Max reduced by 20%', time: '2 minutes ago', type: 'price' },
    { id: 3, action: 'Warehouse received 500 units of Samsung TV', time: '15 minutes ago', type: 'restock' },
    { id: 4, action: 'Online order #ORD-7842 shipped', time: '30 minutes ago', type: 'shipping' },
    { id: 5, action: 'Real-time inventory sync tested successfully', time: '1 hour ago', type: 'sync' },
  ]);

  // Snowflake Scenarios Data - UPDATED FOR RISHAB RETAIL
  const snowflakeScenarios = [
    { id: 1, number: '01', title: 'Real-Time Inventory Sync', icon: RefreshCw, color: 'from-blue-500 to-cyan-500', description: 'Instant stock updates across all stores', status: 'unlocked' },
    { id: 2, number: '02', title: 'Price Synchronization', icon: Tag, color: 'from-purple-500 to-pink-500', description: 'Dynamic pricing across all channels', status: 'unlocked' },
    { id: 3, number: '03', title: 'Demand Forecasting', icon: TrendingUp, color: 'from-green-500 to-emerald-500', description: 'Predict sales using ML models', status: 'unlocked' },
    { id: 4, number: '04', title: 'Customer Segmentation', icon: Users, color: 'from-orange-500 to-red-500', description: 'AI-powered customer clustering', status: 'locked' },
    { id: 5, number: '05', title: 'Fraud Detection', icon: Shield, color: 'from-indigo-500 to-blue-500', description: 'Real-time transaction monitoring', status: 'locked' },
    { id: 6, number: '06', title: 'Supply Chain Analytics', icon: Truck, color: 'from-red-500 to-pink-500', description: 'Optimize logistics and delivery', status: 'locked' },
    { id: 7, number: '07', title: 'Personalized Recommendations', icon: Sparkles, color: 'from-teal-500 to-green-500', description: 'AI product recommendations', status: 'locked' },
    { id: 8, number: '08', title: 'Live Sales Dashboard', icon: BarChart4, color: 'from-yellow-500 to-orange-500', description: 'Real-time sales monitoring', status: 'locked' },
    { id: 9, number: '09', title: 'Multi-Store Analytics', icon: Store, color: 'from-pink-500 to-rose-500', description: 'Compare performance across stores', status: 'locked' },
    { id: 10, number: '10', title: 'Promotion Optimization', icon: Percent, color: 'from-gray-700 to-gray-900', description: 'Maximize discount effectiveness', status: 'locked' },
  ];

  // Industry Projects Data - FOCUS ON RISHAB RETAIL VARIANTS
  const industryProjects = [
    { id: 1, title: 'Rishab Retail Suite', icon: ShoppingCart, color: 'bg-blue-100', borderColor: 'border-blue-200', description: 'Modern retail platform with real-time analytics', image: '/retail-analytics.jpg', featured: true },
    { id: 2, title: 'Rishab E-commerce', icon: ShoppingBag, color: 'bg-green-100', borderColor: 'border-green-200', description: 'Scalable online shopping experience', image: '/ecommerce.jpg' },
    { id: 3, title: 'Rishab Supply Chain', icon: Truck, color: 'bg-purple-100', borderColor: 'border-purple-200', description: 'Intelligent logistics management', image: '/supply-chain.jpg' },
    { id: 4, title: 'Custom Retail Solution', icon: Rocket, color: 'bg-gradient-to-r from-orange-100 to-red-100', borderColor: 'border-orange-300', description: 'Build your enterprise retail system', image: '/custom-retail.jpg' },
  ];

  // Check connection status on load
  useEffect(() => {
    checkConnectionStatus();
  }, []);

  const checkConnectionStatus = async () => {
    setConnectionStatus('checking');
    try {
      const response = await fetch('/api/test-snowflake');
      const data = await response.json();
      if (data.success) {
        setConnectionStatus('connected');
      } else {
        setConnectionStatus('disconnected');
      }
    } catch (error) {
      setConnectionStatus('disconnected');
    }
  };

  const executeQuery = async () => {
    setIsExecuting(true);
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      if (data.success) {
        setQueryResults(data.products || []);
      }
    } catch (error) {
      console.error('Query failed:', error);
    } finally {
      setIsExecuting(false);
    }
  };

  const FeatureCard = ({ 
    title, description, icon: Icon, href, color, action 
  }: { 
    title: string; description: string; icon: any; href: string; color: string; action: string 
  }) => (
    <Link href={href}>
      <div className="group bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl ${color}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-blue-600">{action}</span>
          <span className="text-xs text-gray-500 group-hover:text-blue-600 transition-colors">
            Click to open →
          </span>
        </div>
      </div>
    </Link>
  );

  const ScenarioCard = ({ scenario }: { scenario: any }) => {
    const Icon = scenario.icon;
    return (
      <div className={`group bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer ${
        scenario.status === 'locked' ? 'opacity-75' : ''
      }`}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className={`bg-gradient-to-r ${scenario.color} p-3 rounded-xl`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-300">{scenario.number}</span>
          </div>
          {scenario.status === 'locked' ? (
            <Lock className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
          )}
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">{scenario.title}</h3>
        <p className="text-gray-600 text-sm mb-4">{scenario.description}</p>
        <div className="flex items-center justify-between">
          <span className={`text-sm font-medium ${
            scenario.status === 'locked' ? 'text-gray-500' : 'text-blue-600'
          }`}>
            {scenario.status === 'locked' ? 'Coming Soon' : 'Start Lab'}
          </span>
          {scenario.status === 'unlocked' && (
            <span className="text-xs text-gray-500 group-hover:text-blue-600 transition-colors">
              Interactive Demo →
            </span>
          )}
        </div>
      </div>
    );
  };

  const IndustryCard = ({ project }: { project: any }) => {
    const Icon = project.icon;
    return (
      <Link href={project.featured ? '/rishab-retail-demo' : `/industry/${project.title.toLowerCase().replace(/ /g, '-')}`}>
        <div className={`group bg-white rounded-2xl shadow-lg border-2 ${project.borderColor} p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer relative overflow-hidden`}>
          {project.featured && (
            <div className="absolute top-4 right-4">
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                FLAGSHIP SUITE
              </div>
            </div>
          )}
          
          {/* Image Placeholder with Industry Icon */}
          <div className={`${project.color} rounded-xl h-40 mb-4 flex items-center justify-center relative overflow-hidden`}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
            <Icon className="w-16 h-16 text-white/90" />
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/10 to-transparent"></div>
          </div>
          
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              {!project.featured ? (
                <Icon className="w-5 h-5 text-gray-600" />
              ) : (
                <ShoppingCart className="w-5 h-5 text-blue-600" />
              )}
              <h3 className="text-lg font-bold text-gray-900">{project.title}</h3>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
          </div>
          <p className="text-gray-600 text-sm mb-4">{project.description}</p>
          <div className="flex items-center justify-between">
            <span className={`text-sm font-medium ${
              project.featured ? 'text-blue-600' : 'text-blue-600'
            }`}>
              {project.featured ? 'Explore Platform →' : 'View Project'}
            </span>
            {project.featured && (
              <Star className="w-4 h-4 text-yellow-500" />
            )}
          </div>
        </div>
      </Link>
    );
  };

  const StatusBadge = () => {
    switch (connectionStatus) {
      case 'connected':
        return (
          <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full border border-blue-200">
            <CheckCircle className="w-4 h-4" />
            <span className="font-medium">Connected to Rishab Retail Snowflake</span>
          </div>
        );
      case 'disconnected':
        return (
          <div className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-full border border-red-200">
            <AlertCircle className="w-4 h-4" />
            <span className="font-medium">Disconnected</span>
          </div>
        );
      default:
        return (
          <div className="flex items-center gap-2 px-4 py-2 bg-yellow-50 text-yellow-700 rounded-full border border-yellow-200">
            <RefreshCw className="w-4 h-4 animate-spin" />
            <span className="font-medium">Checking Connection...</span>
          </div>
        );
    }
  };

  const TabButton = ({ id, label, icon: Icon, isActive }: { id: string, label: string, icon: any, isActive: boolean }) => (
    <button
      onClick={() => setActiveTab(id as any)}
      className={`flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-300 ${
        isActive 
          ? 'bg-white shadow-lg border border-gray-200 text-blue-600' 
          : 'text-gray-600 hover:bg-gray-50'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
      {isActive && (
        <div className="ml-2 w-2 h-2 bg-blue-500 rounded-full"></div>
      )}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header with Retail Theme */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-700 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 opacity-20">
          <div className="absolute inset-0 bg-[url('/shopping-cart-pattern.svg')] bg-center bg-no-repeat bg-contain"></div>
        </div>
        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <Building2 className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold">Rishab Retail Enterprise Platform</h1>
                  <p className="text-blue-100 text-lg mt-1">
                    Enterprise retail analytics powered by Snowflake
                  </p>
                </div>
              </div>
              <p className="text-blue-100 text-lg max-w-2xl">
                Enterprise-grade retail management with real-time analytics, AI-driven insights, and seamless multi-channel operations
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <StatusBadge />
              <button
                onClick={checkConnectionStatus}
                className="flex items-center justify-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors border border-white/30"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh Connection
              </button>
            </div>
          </div>

          {/* Connection Info */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-1">
                <Store className="w-4 h-4" />
                <p className="text-blue-200 text-sm">Active Stores</p>
              </div>
              <p className="text-xl font-bold">85 Stores</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-1">
                <Package className="w-4 h-4" />
                <p className="text-blue-200 text-sm">Products</p>
              </div>
              <p className="text-xl font-bold">28,500 SKUs</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4" />
                <p className="text-blue-200 text-sm">Sync Speed</p>
              </div>
              <p className="text-xl font-bold">&lt; 150ms</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="w-4 h-4" />
                <p className="text-blue-200 text-sm">Today's Revenue</p>
              </div>
              <p className="text-xl font-bold">₹68.5L</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 -mt-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-2 inline-flex">
            <TabButton 
              id="basics" 
              label="Retail Operations" 
              icon={ShoppingCart} 
              isActive={activeTab === 'basics'} 
            />
            <TabButton 
              id="scenarios" 
              label="Top 10 Features" 
              icon={Award} 
              isActive={activeTab === 'scenarios'} 
            />
            <TabButton 
              id="industries" 
              label="Enterprise Solutions" 
              icon={Building2} 
              isActive={activeTab === 'industries'} 
            />
            <TabButton 
              id="custom" 
              label="Build Your Store" 
              icon={Rocket} 
              isActive={activeTab === 'custom'} 
            />
          </div>
        </div>

        {/* Basics Tab Content - RETAIL OPERATIONS */}
        {activeTab === 'basics' && (
          <>
            {/* Core Features Grid */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">🏬 Retail Operations Dashboard</h2>
                <div className="text-sm text-gray-600">
                  Enterprise data from 85 stores
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FeatureCard
                  title="Enterprise Analytics"
                  description="Real-time analytics across all retail operations"
                  icon={BarChart4}
                  href="/dashboard"
                  color="bg-blue-500"
                  action="View Analytics"
                />
                <FeatureCard
                  title="Inventory Intelligence"
                  description="AI-driven inventory optimization and forecasting"
                  icon={Package}
                  href="/dashboard/inventory"
                  color="bg-indigo-500"
                  action="Manage Inventory"
                />
                <FeatureCard
                  title="Store Network View"
                  description="Monitor enterprise store operations in real-time"
                  icon={Store}
                  href="/dashboard/stores"
                  color="bg-purple-500"
                  action="View Network"
                />
                <FeatureCard
                  title="Customer Insights"
                  description="Advanced customer analytics and segmentation"
                  icon={Users}
                  href="/dashboard/customers"
                  color="bg-pink-500"
                  action="View Insights"
                />
                <FeatureCard
                  title="Data Playground"
                  description="Direct SQL access to enterprise retail data"
                  icon={Wrench}
                  href="#query-builder"
                  color="bg-red-500"
                  action="Run Queries"
                />
                <FeatureCard
                  title="Enterprise Settings"
                  description="Configure enterprise-wide sync parameters"
                  icon={Settings}
                  href="/dashboard/settings"
                  color="bg-gray-600"
                  action="Configure"
                />
              </div>
            </div>

            {/* Query Builder Section - ENTERPRISE QUERIES */}
            <div id="query-builder" className="mb-12">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-50 to-gray-50 px-6 py-4 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Cpu className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">🚀 Enterprise Data Query Playground</h3>
                        <p className="text-gray-600 text-sm">Execute SQL queries on enterprise retail data in Snowflake</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <select 
                        className="border rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        onChange={(e) => setQuery(e.target.value)}
                      >
                        <option value="">Try Enterprise Queries</option>
                        <option value="SELECT * FROM RETAIL.PRODUCTS WHERE STOCK_QUANTITY < 10">Low Stock Alert</option>
                        <option value="SELECT STORE_NAME, SUM(TOTAL_AMOUNT) FROM SALES GROUP BY STORE_NAME">Store Performance</option>
                        <option value="SELECT CURRENT_TIMESTAMP() AS sync_time">Check Sync Time</option>
                        <option value="SELECT CATEGORY, COUNT(*) FROM PRODUCTS GROUP BY CATEGORY">Product Categories</option>
                        <option value="SELECT * FROM INVENTORY_TRANSACTIONS ORDER BY CREATED_AT DESC LIMIT 10">Recent Inventory Changes</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">SQL Query</label>
                    <textarea
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="w-full h-40 font-mono text-sm p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="SELECT * FROM RETAIL.PRODUCTS WHERE STOCK_QUANTITY < 10"
                    />
                  </div>
                  
                  <div className="flex flex-wrap gap-3 mb-6">
                    <button
                      onClick={executeQuery}
                      disabled={isExecuting}
                      className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg hover:from-blue-700 hover:to-indigo-800 disabled:opacity-50 transition-all"
                    >
                      {isExecuting ? (
                        <RefreshCw className="w-4 h-4 animate-spin" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                      {isExecuting ? 'Executing...' : 'Execute Query'}
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <Save className="w-4 h-4" />
                      Save Query
                    </button>
                    <button 
                      onClick={checkConnectionStatus}
                      className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <TestTube className="w-4 h-4" />
                      Test Sync
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <Shield className="w-4 h-4" />
                      Validate Query
                    </button>
                  </div>

                  {queryResults.length > 0 && (
                    <div className="mt-6">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">Results ({queryResults.length} rows)</h4>
                        <button className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800">
                          <Download className="w-4 h-4" />
                          Export as CSV
                        </button>
                      </div>
                      <div className="border rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                {Object.keys(queryResults[0]).map((key) => (
                                  <th key={key} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {key}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {queryResults.slice(0, 5).map((row, index) => (
                                <tr key={index} className="hover:bg-gray-50">
                                  {Object.values(row).map((value: any, i) => (
                                    <td key={i} className="px-4 py-3 text-sm text-gray-900">
                                      {String(value)}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Scenarios Tab Content - RETAIL FEATURES */}
        {activeTab === 'scenarios' && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">🎯 Rishab Retail Top 10 Features</h2>
                <p className="text-gray-600">
                  Enterprise retail challenges with live Snowflake data
                </p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-indigo-700 rounded-full border border-indigo-200">
                <Star className="w-4 h-4" />
                <span className="font-medium">4/10 Complete</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {snowflakeScenarios.map((scenario) => (
                <div key={scenario.id}>
                  <ScenarioCard scenario={scenario} />
                </div>
              ))}
            </div>
            
            {/* Progress Bar */}
            <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-gray-900">Enterprise Implementation Progress</h3>
                <span className="text-sm text-gray-600">40% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2.5 rounded-full" style={{ width: '40%' }}></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Planning</span>
                <span>4/10 Features Live</span>
                <span>Complete</span>
              </div>
            </div>
          </div>
        )}

        {/* Industries Tab Content - ENTERPRISE SOLUTIONS */}
        {activeTab === 'industries' && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">🏢 Enterprise Retail Solutions</h2>
                <p className="text-gray-600">
                  Comprehensive retail solutions powered by real-time Snowflake sync
                </p>
              </div>
              <div className="text-sm text-gray-600">
                4 Enterprise Solutions
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {industryProjects.map((project) => (
                <IndustryCard key={project.id} project={project} />
              ))}
            </div>
            
            {/* Enterprise Solution Comparison */}
            <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Enterprise Solution Comparison</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-blue-200 rounded-xl p-4 bg-blue-50">
                  <h4 className="font-medium text-blue-800 mb-2">🏬 Retail Suite</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Enterprise analytics</li>
                    <li>• Multi-store management</li>
                    <li>• Advanced reporting</li>
                  </ul>
                </div>
                <div className="border border-green-200 rounded-xl p-4 bg-green-50">
                  <h4 className="font-medium text-green-800 mb-2">💻 E-commerce Platform</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Global commerce</li>
                    <li>• Mobile shopping</li>
                    <li>• Payment integrations</li>
                  </ul>
                </div>
                <div className="border border-purple-200 rounded-xl p-4 bg-purple-50">
                  <h4 className="font-medium text-purple-800 mb-2">🚚 Supply Chain Suite</h4>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Logistics optimization</li>
                    <li>• Inventory intelligence</li>
                    <li>• Vendor network</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Custom Tab Content - BUILD YOUR ENTERPRISE */}
        {activeTab === 'custom' && (
          <div className="mb-12">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center gap-4 mb-4">
                <Rocket className="w-8 h-8" />
                <h2 className="text-2xl font-bold">🚀 Build Your Enterprise Retail System</h2>
              </div>
              <p className="text-blue-100 text-lg mb-6">
                Create your custom enterprise retail solution. Configure real-time analytics, AI-driven insights, and enterprise operations.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30">
                  <h3 className="font-bold text-xl mb-3">Enterprise Implementation Guide</h3>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center">1</div>
                      <span>Define enterprise catalog</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center">2</div>
                      <span>Set up multi-store network</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center">3</div>
                      <span>Configure enterprise analytics</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center">4</div>
                      <span>Deploy with Snowflake backend</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30">
                  <h3 className="font-bold text-xl mb-3">Retail Verticals</h3>
                  <p className="text-blue-100 mb-4">Choose your enterprise vertical:</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-white/30 rounded-full text-sm">Electronics 📱</span>
                    <span className="px-3 py-1 bg-white/30 rounded-full text-sm">Fashion 👗</span>
                    <span className="px-3 py-1 bg-white/30 rounded-full text-sm">Supermarkets 🛒</span>
                    <span className="px-3 py-1 bg-white/30 rounded-full text-sm">Furniture 🛋️</span>
                    <span className="px-3 py-1 bg-white/30 rounded-full text-sm">Automotive 🚗</span>
                    <span className="px-3 py-1 bg-white/30 rounded-full text-sm">Sports ⚽</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex gap-4">
                <Link href="/enterprise-builder">
                  <button className="px-6 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors">
                    Start Building Enterprise →
                  </button>
                </Link>
                <button className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">
                  View Enterprise Demos
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quick Tools & Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Tools - ENTERPRISE */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold text-gray-900 mb-6">⚡ Enterprise Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div 
                onClick={() => alert('Import enterprise products')}
                className="group bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              >
                <div className="bg-blue-500 p-3 rounded-xl inline-block mb-4">
                  <Upload className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Enterprise Import</h3>
                <p className="text-gray-600 text-sm">Bulk import from enterprise systems</p>
              </div>
              <div 
                onClick={() => alert('Generate enterprise reports')}
                className="group bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              >
                <div className="bg-indigo-500 p-3 rounded-xl inline-block mb-4">
                  <Download className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Enterprise Reports</h3>
                <p className="text-gray-600 text-sm">Export enterprise analytics data</p>
              </div>
              <div 
                onClick={() => alert('View enterprise audit logs')}
                className="group bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              >
                <div className="bg-purple-500 p-3 rounded-xl inline-block mb-4">
                  <History className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Audit Logs</h3>
                <p className="text-gray-600 text-sm">View enterprise activity logs</p>
              </div>
            </div>

            {/* Enterprise Performance Stats */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-r from-blue-50 to-white p-6 rounded-2xl border border-blue-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Zap className="w-5 h-5 text-blue-600" />
                  </div>
                  <h4 className="font-bold text-gray-900">Enterprise Sync</h4>
                </div>
                <p className="text-3xl font-bold text-gray-900">&lt; 150ms</p>
                <p className="text-gray-600 text-sm">Enterprise sync latency</p>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-white p-6 rounded-2xl border border-green-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <PackageOpen className="w-5 h-5 text-green-600" />
                  </div>
                  <h4 className="font-bold text-gray-900">Low Inventory</h4>
                </div>
                <p className="text-3xl font-bold text-gray-900">256</p>
                <p className="text-gray-600 text-sm">Items needing attention</p>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-white p-6 rounded-2xl border border-purple-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <CreditCard className="w-5 h-5 text-purple-600" />
                  </div>
                  <h4 className="font-bold text-gray-900">Enterprise Revenue</h4>
                </div>
                <p className="text-3xl font-bold text-gray-900">₹68.5L</p>
                <p className="text-gray-600 text-sm">Enterprise-wide today</p>
              </div>
            </div>
          </div>

          {/* Recent Enterprise Activity */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">📊 Recent Enterprise Activity</h3>
              <button className="text-sm text-blue-600 hover:text-blue-800">
                View All
              </button>
            </div>
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0">
                    <div className={`p-2 rounded-full ${
                      activity.type === 'sale' ? 'bg-blue-100' :
                      activity.type === 'price' ? 'bg-yellow-100' :
                      activity.type === 'restock' ? 'bg-green-100' :
                      activity.type === 'shipping' ? 'bg-purple-100' : 'bg-indigo-100'
                    }`}>
                      {activity.type === 'sale' && <ShoppingCart className="w-4 h-4 text-blue-600" />}
                      {activity.type === 'price' && <Tag className="w-4 h-4 text-yellow-600" />}
                      {activity.type === 'restock' && <Package className="w-4 h-4 text-green-600" />}
                      {activity.type === 'shipping' && <Truck className="w-4 h-4 text-purple-600" />}
                      {activity.type === 'sync' && <CheckCircle className="w-4 h-4 text-indigo-600" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900 font-medium">{activity.action}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t">
                <Link 
                  href="/dashboard/activity"
                  className="flex items-center justify-center gap-2 w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Enterprise Activity Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note - ENTERPRISE */}
        <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-white rounded-2xl border border-blue-200 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Building2 className="w-5 h-5 text-blue-600" />
            <p className="text-gray-900 font-medium">Rishab Retail - Enterprise retail management powered by Snowflake</p>
          </div>
          <p className="text-gray-600 text-sm">
            Enterprise-grade analytics across 85 stores • AI-driven insights • Multi-channel operations • &lt;150ms sync latency
          </p>
        </div>
      </div>
    </div>
  );
}