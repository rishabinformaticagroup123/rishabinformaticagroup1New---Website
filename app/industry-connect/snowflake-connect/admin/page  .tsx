// app/snowflake-connect/page.tsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Database, BarChart3, Users, BookOpen, 
  Settings, Wrench, FileText, Download, 
  Upload, History, Play, Save, TestTube,
  CheckCircle, AlertCircle, RefreshCw,
  ExternalLink, ChevronRight, Zap,
  TrendingUp, UserCheck, DollarSign,
  Shield, Cpu, Layers, Clock, Share2,
  Copy, Globe, Lock, Cloud, Target,
  Building2, ShoppingCart, Hospital,
  Sparkles, Rocket, Star, Award
} from 'lucide-react';

export default function SnowflakeConnectPage() {
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'checking'>('checking');
  const [connectionStats, setConnectionStats] = useState({
    account: 'RM58560',
    region: 'AZURE_CENTRALINDIA',
    version: '9.39.2',
    lastSync: '2 minutes ago',
    queryCount: 15,
    dataSize: '2.4 GB'
  });
  const [query, setQuery] = useState(`SELECT * FROM SOURCE.PUBLIC.COURSES WHERE STATUS = 'ACTIVE' ORDER BY START_DATE`);
  const [queryResults, setQueryResults] = useState<any[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [activeTab, setActiveTab] = useState<'basics' | 'scenarios' | 'industries' | 'custom'>('basics');
  const [recentActivities, setRecentActivities] = useState([
    { id: 1, action: 'Course "Web Development" updated', time: 'Just now', type: 'update' },
    { id: 2, action: '3 new students enrolled', time: '5 minutes ago', type: 'enrollment' },
    { id: 3, action: 'Revenue report generated', time: '15 minutes ago', type: 'report' },
    { id: 4, action: 'Snowflake connection tested successfully', time: '1 hour ago', type: 'connection' },
    { id: 5, action: 'Course completion certificates issued', time: '2 hours ago', type: 'certificate' },
  ]);

  // Snowflake Scenarios Data
  const snowflakeScenarios = [
    { id: 1, number: '01', title: 'Zero-Copy Cloning', icon: Copy, color: 'from-blue-500 to-cyan-500', description: 'Create instant copies without storage costs', status: 'unlocked' },
    { id: 2, number: '02', title: 'Time Travel', icon: Clock, color: 'from-purple-500 to-pink-500', description: 'Recover data from any point in time', status: 'unlocked' },
    { id: 3, number: '03', title: 'Data Sharing', icon: Share2, color: 'from-green-500 to-emerald-500', description: 'Share live data securely without copying', status: 'unlocked' },
    { id: 4, number: '04', title: 'Auto-Suspend/Resume', icon: Zap, color: 'from-orange-500 to-red-500', description: 'Automatic cost optimization', status: 'locked' },
    { id: 5, number: '05', title: 'Materialized Views', icon: Layers, color: 'from-indigo-500 to-blue-500', description: 'High-performance query optimization', status: 'locked' },
    { id: 6, number: '06', title: 'Secure Data Sharing', icon: Lock, color: 'from-red-500 to-pink-500', description: 'Row & column level security', status: 'locked' },
    { id: 7, number: '07', title: 'External Tables', icon: Globe, color: 'from-teal-500 to-green-500', description: 'Query data in cloud storage', status: 'locked' },
    { id: 8, number: '08', title: 'Snowpipe', icon: Cloud, color: 'from-yellow-500 to-orange-500', description: 'Auto-ingest streaming data', status: 'locked' },
    { id: 9, number: '09', title: 'Tasks & Streams', icon: TrendingUp, color: 'from-pink-500 to-rose-500', description: 'Automated data pipelines', status: 'locked' },
    { id: 10, number: '10', title: 'Data Masking', icon: Shield, color: 'from-gray-700 to-gray-900', description: 'Dynamic data protection', status: 'locked' },
  ];

  // Industry Projects Data
  const industryProjects = [
    { id: 1, title: 'Healthcare Analytics', icon: Hospital, color: 'bg-blue-100', borderColor: 'border-blue-200', description: 'Patient care & hospital management', image: '/healthcare-analytics.jpg' },
    { id: 2, title: 'Retail & E-commerce', icon: ShoppingCart, color: 'bg-green-100', borderColor: 'border-green-200', description: 'Customer analytics & inventory', image: '/retail-analytics.jpg' },
    { id: 3, title: 'Banking & Insurance', icon: Building2, color: 'bg-purple-100', borderColor: 'border-purple-200', description: 'Risk assessment & fraud detection', image: '/banking-analytics.jpg' },
    { id: 4, title: 'Custom Project Builder', icon: Rocket, color: 'bg-gradient-to-r from-pink-100 to-purple-100', borderColor: 'border-pink-300', description: 'Build your own industry solution', image: '/custom-project.jpg', featured: true },
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
      const response = await fetch('/api/courses');
      const data = await response.json();
      if (data.success) {
        setQueryResults(data.courses || []);
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
              Interactive Lab →
            </span>
          )}
        </div>
      </div>
    );
  };

  const IndustryCard = ({ project }: { project: any }) => {
    const Icon = project.icon;
    return (
      <Link href={project.featured ? '/custom-project-builder' : `/industry/${project.title.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}>
        <div className={`group bg-white rounded-2xl shadow-lg border-2 ${project.borderColor} p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer relative overflow-hidden`}>
          {project.featured && (
            <div className="absolute top-4 right-4">
              <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                PREMIUM
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
                <Rocket className="w-5 h-5 text-pink-600" />
              )}
              <h3 className="text-lg font-bold text-gray-900">{project.title}</h3>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
          </div>
          <p className="text-gray-600 text-sm mb-4">{project.description}</p>
          <div className="flex items-center justify-between">
            <span className={`text-sm font-medium ${
              project.featured ? 'text-pink-600' : 'text-blue-600'
            }`}>
              {project.featured ? 'Start Building →' : 'View Project'}
            </span>
            {project.featured && (
              <Sparkles className="w-4 h-4 text-yellow-500" />
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
          <div className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full border border-green-200">
            <CheckCircle className="w-4 h-4" />
            <span className="font-medium">Connected to Snowflake</span>
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
      {/* Header with Snowflake Image */}
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 opacity-20">
          <div className="absolute inset-0 bg-[url('/snowflake-pattern.svg')] bg-center bg-no-repeat bg-contain"></div>
        </div>
        <div className="container mx-auto px-4 py-12 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <Database className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold">Snowflake Learning Platform</h1>
                  <p className="text-blue-100 text-lg mt-1">
                    Interactive labs with REAL Snowflake data
                  </p>
                </div>
              </div>
              <p className="text-blue-100 text-lg max-w-2xl">
                Master Snowflake through hands-on scenarios, industry projects, and real-time data operations
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
                <Target className="w-4 h-4" />
                <p className="text-blue-200 text-sm">Account</p>
              </div>
              <p className="text-xl font-bold">{connectionStats.account}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-1">
                <Globe className="w-4 h-4" />
                <p className="text-blue-200 text-sm">Region</p>
              </div>
              <p className="text-xl font-bold">{connectionStats.region}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4" />
                <p className="text-blue-200 text-sm">Last Sync</p>
              </div>
              <p className="text-xl font-bold">{connectionStats.lastSync}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4" />
                <p className="text-blue-200 text-sm">Data Processed</p>
              </div>
              <p className="text-xl font-bold">{connectionStats.dataSize}</p>
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
              label="Basics" 
              icon={BookOpen} 
              isActive={activeTab === 'basics'} 
            />
            <TabButton 
              id="scenarios" 
              label="Top 10 Scenarios" 
              icon={Award} 
              isActive={activeTab === 'scenarios'} 
            />
            <TabButton 
              id="industries" 
              label="Industry Projects" 
              icon={Building2} 
              isActive={activeTab === 'industries'} 
            />
            <TabButton 
              id="custom" 
              label="Custom Builder" 
              icon={Rocket} 
              isActive={activeTab === 'custom'} 
            />
          </div>
        </div>

        {/* Basics Tab Content */}
        {activeTab === 'basics' && (
          <>
            {/* Core Features Grid */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">📚 Learn Snowflake Basics</h2>
                <div className="text-sm text-gray-600">
                  Start with real data operations
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FeatureCard
                  title="Dashboard Analytics"
                  description="Real-time insights and performance metrics from Snowflake"
                  icon={BarChart3}
                  href="/dashboard"
                  color="bg-purple-500"
                  action="View Live Analytics"
                />
                <FeatureCard
                  title="Course Management"
                  description="Manage training courses with real Snowflake CRUD operations"
                  icon={BookOpen}
                  href="/dashboard/courses"
                  color="bg-blue-500"
                  action="Manage Courses"
                />
                <FeatureCard
                  title="Student Management"
                  description="Student enrollment, progress, and tracking with actual data"
                  icon={Users}
                  href="/dashboard/students"
                  color="bg-green-500"
                  action="Manage Students"
                />
                <FeatureCard
                  title="Advanced Analytics"
                  description="Deep insights and reporting tools powered by Snowflake"
                  icon={TrendingUp}
                  href="/dashboard/analytics"
                  color="bg-orange-500"
                  action="View Reports"
                />
                <FeatureCard
                  title="Query Playground"
                  description="Direct SQL query builder and executor on Snowflake"
                  icon={Wrench}
                  href="#query-builder"
                  color="bg-red-500"
                  action="Run Queries"
                />
                <FeatureCard
                  title="Connection Settings"
                  description="Configure Snowflake connection parameters and security"
                  icon={Settings}
                  href="/dashboard/settings"
                  color="bg-gray-600"
                  action="Configure"
                />
              </div>
            </div>

            {/* Query Builder Section */}
            <div id="query-builder" className="mb-12">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                <div className="bg-gradient-to-r from-blue-50 to-gray-50 px-6 py-4 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Cpu className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">🚀 Snowflake Query Playground</h3>
                        <p className="text-gray-600 text-sm">Execute SQL queries directly on your Snowflake account</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <select 
                        className="border rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        onChange={(e) => setQuery(e.target.value)}
                      >
                        <option value="">Try Example Queries</option>
                        <option value="SELECT * FROM SOURCE.PUBLIC.COURSES">List All Courses</option>
                        <option value="SELECT CURRENT_TIMESTAMP() AS current_time">Check Connection</option>
                        <option value="SHOW DATABASES">Show Databases</option>
                        <option value="SELECT COUNT(*) as total_students FROM SOURCE.PUBLIC.STUDENTS">Count Students</option>
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
                      placeholder="Enter your SQL query here..."
                    />
                  </div>
                  
                  <div className="flex flex-wrap gap-3 mb-6">
                    <button
                      onClick={executeQuery}
                      disabled={isExecuting}
                      className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 transition-all"
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
                      Test Connection
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                      <Shield className="w-4 h-4" />
                      Validate SQL
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

        {/* Scenarios Tab Content */}
        {activeTab === 'scenarios' && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">🎯 Master Snowflake's Top 10 Scenarios</h2>
                <p className="text-gray-600">
                  Interactive labs with REAL data on REAL Snowflake. Learn by doing!
                </p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
                <Star className="w-4 h-4" />
                <span className="font-medium">3/10 Complete</span>
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
                <h3 className="font-bold text-gray-900">Your Progress</h3>
                <span className="text-sm text-gray-600">30% Complete</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-gradient-to-r from-blue-500 to-green-500 h-2.5 rounded-full" style={{ width: '30%' }}></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>Start</span>
                <span>3/10 Scenarios</span>
                <span>Complete</span>
              </div>
            </div>
          </div>
        )}

        {/* Industries Tab Content */}
        {activeTab === 'industries' && (
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">🏢 Build Complete Industry Solutions</h2>
                <p className="text-gray-600">
                  Apply Snowflake to real business scenarios with complete project templates
                </p>
              </div>
              <div className="text-sm text-gray-600">
                4 Industry Domains
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {industryProjects.map((project) => (
                <IndustryCard key={project.id} project={project} />
              ))}
            </div>
            
            {/* Industry Comparison */}
            <div className="mt-8 bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Industry Project Comparison</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border border-blue-200 rounded-xl p-4 bg-blue-50">
                  <h4 className="font-medium text-blue-800 mb-2">🏥 Healthcare</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Patient analytics dashboards</li>
                    <li>• Appointment scheduling system</li>
                    <li>• Medical records management</li>
                  </ul>
                </div>
                <div className="border border-green-200 rounded-xl p-4 bg-green-50">
                  <h4 className="font-medium text-green-800 mb-2">🛒 Retail</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Customer segmentation</li>
                    <li>• Inventory optimization</li>
                    <li>• Sales forecasting</li>
                  </ul>
                </div>
                <div className="border border-purple-200 rounded-xl p-4 bg-purple-50">
                  <h4 className="font-medium text-purple-800 mb-2">🏦 Banking</h4>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Fraud detection algorithms</li>
                    <li>• Risk assessment models</li>
                    <li>• Customer credit scoring</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Custom Tab Content */}
        {activeTab === 'custom' && (
          <div className="mb-12">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center gap-4 mb-4">
                <Rocket className="w-8 h-8" />
                <h2 className="text-2xl font-bold">🚀 Custom Project Builder</h2>
              </div>
              <p className="text-purple-100 text-lg mb-6">
                Create your OWN industry solution from scratch. Perfect for unique business requirements or portfolio projects.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30">
                  <h3 className="font-bold text-xl mb-3">Step-by-Step Builder</h3>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center">1</div>
                      <span>Choose your industry</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center">2</div>
                      <span>Define data model (drag & drop)</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center">3</div>
                      <span>Upload sample data</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-white/30 rounded-full flex items-center justify-center">4</div>
                      <span>Generate & deploy to Snowflake</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-6 border border-white/30">
                  <h3 className="font-bold text-xl mb-3">Custom Industries</h3>
                  <p className="text-purple-100 mb-4">Not just healthcare/retail/banking:</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-white/30 rounded-full text-sm">Agriculture 🌾</span>
                    <span className="px-3 py-1 bg-white/30 rounded-full text-sm">Education 🎓</span>
                    <span className="px-3 py-1 bg-white/30 rounded-full text-sm">Travel ✈️</span>
                    <span className="px-3 py-1 bg-white/30 rounded-full text-sm">Real Estate 🏠</span>
                    <span className="px-3 py-1 bg-white/30 rounded-full text-sm">Manufacturing 🏭</span>
                    <span className="px-3 py-1 bg-white/30 rounded-full text-sm">Logistics 🚚</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex gap-4">
                <Link href="/custom-project-builder">
                  <button className="px-6 py-3 bg-white text-purple-600 font-bold rounded-lg hover:bg-gray-100 transition-colors">
                    Start Building Now →
                  </button>
                </Link>
                <button className="px-6 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-colors">
                  View Example Projects
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quick Tools & Recent Activity (Always Visible) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Tools */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold text-gray-900 mb-6">⚡ Quick Tools</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div 
                onClick={() => alert('Import feature coming soon!')}
                className="group bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              >
                <div className="bg-green-500 p-3 rounded-xl inline-block mb-4">
                  <Upload className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Data Import</h3>
                <p className="text-gray-600 text-sm">Import student data from CSV/Excel</p>
              </div>
              <div 
                onClick={() => alert('Export feature coming soon!')}
                className="group bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              >
                <div className="bg-blue-500 p-3 rounded-xl inline-block mb-4">
                  <Download className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Data Export</h3>
                <p className="text-gray-600 text-sm">Export reports and data to multiple formats</p>
              </div>
              <div 
                onClick={() => alert('Logs feature coming soon!')}
                className="group bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
              >
                <div className="bg-purple-500 p-3 rounded-xl inline-block mb-4">
                  <History className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Activity Logs</h3>
                <p className="text-gray-600 text-sm">View query history and system logs</p>
              </div>
            </div>

            {/* Performance Stats */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-r from-blue-50 to-white p-6 rounded-2xl border border-blue-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Zap className="w-5 h-5 text-blue-600" />
                  </div>
                  <h4 className="font-bold text-gray-900">Query Performance</h4>
                </div>
                <p className="text-3xl font-bold text-gray-900">{connectionStats.queryCount}</p>
                <p className="text-gray-600 text-sm">Queries executed today</p>
              </div>
              <div className="bg-gradient-to-r from-green-50 to-white p-6 rounded-2xl border border-green-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <UserCheck className="w-5 h-5 text-green-600" />
                  </div>
                  <h4 className="font-bold text-gray-900">Active Students</h4>
                </div>
                <p className="text-3xl font-bold text-gray-900">128</p>
                <p className="text-gray-600 text-sm">Currently enrolled</p>
              </div>
              <div className="bg-gradient-to-r from-purple-50 to-white p-6 rounded-2xl border border-purple-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <DollarSign className="w-5 h-5 text-purple-600" />
                  </div>
                  <h4 className="font-bold text-gray-900">Total Revenue</h4>
                </div>
                <p className="text-3xl font-bold text-gray-900">₹2.4M</p>
                <p className="text-gray-600 text-sm">This academic year</p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">📊 Recent Activity</h3>
              <button className="text-sm text-blue-600 hover:text-blue-800">
                View All
              </button>
            </div>
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
              <div className="space-y-4">
                {recentActivities.slice(0, 4).map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3 pb-4 border-b last:border-0 last:pb-0">
                    <div className={`p-2 rounded-full ${
                      activity.type === 'update' ? 'bg-blue-100' :
                      activity.type === 'enrollment' ? 'bg-green-100' :
                      activity.type === 'report' ? 'bg-purple-100' :
                      activity.type === 'connection' ? 'bg-green-100' : 'bg-orange-100'
                    }`}>
                      {activity.type === 'update' && <FileText className="w-4 h-4 text-blue-600" />}
                      {activity.type === 'enrollment' && <Users className="w-4 h-4 text-green-600" />}
                      {activity.type === 'report' && <BarChart3 className="w-4 h-4 text-purple-600" />}
                      {activity.type === 'connection' && <CheckCircle className="w-4 h-4 text-green-600" />}
                      {activity.type === 'certificate' && <Shield className="w-4 h-4 text-orange-600" />}
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
                  href="/dashboard/analytics"
                  className="flex items-center justify-center gap-2 w-full py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Full Activity Report
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-12 p-6 bg-gradient-to-r from-gray-50 to-white rounded-2xl border border-gray-200 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Database className="w-5 h-5 text-blue-600" />
            <p className="text-gray-900 font-medium">All data is securely stored and processed in Snowflake cloud data platform</p>
          </div>
          <p className="text-gray-600 text-sm">
            Connection established via secure API with end-to-end encryption • Real-time synchronization • Enterprise-grade security
          </p>
        </div>
      </div>
    </div>
  );
}