"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
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
  Sparkles, Rocket, Star, Award,
  Key, LogOut, User, Eye, EyeOff,
  HelpCircle, Loader2, PlusCircle
} from 'lucide-react';

// ==== UI COMPONENTS ====
export function FeatureCard({ 
  title, description, icon: Icon, href, color, action 
}: { 
  title: string; description: string; icon: any; href: string; color: string; action: string 
}) {
  return (
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
}

export function ScenarioCard({ scenario }: { scenario: any }) {
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
}

export function IndustryCard({ project }: { project: any }) {
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
}

export function TabButton({ id, label, icon: Icon, isActive, onClick }: { 
  id: string, label: string, icon: any, isActive: boolean, onClick: () => void 
}) {
  return (
    <button
      onClick={onClick}
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
}

// ==== EMPTY STATE COMPONENT ====
function EmptyStateGuidance({ 
  studentAccount,
  onAddCourse 
}: { 
  studentAccount: any;
  onAddCourse: () => void;
}) {
  if (!studentAccount?.connected) return null;

  return (
    <div className="mb-6 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-yellow-100 rounded-xl">
          <Rocket className="w-6 h-6 text-yellow-600" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-2">🚀 Welcome to Your Snowflake Workspace!</h3>
          <p className="text-gray-700 mb-4">
            Your personal Snowflake workspace is ready. Start by adding your first course or student.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-white rounded-lg border border-gray-200">
              <h4 className="font-medium text-gray-900 mb-2">1. Create Your First Course</h4>
              <p className="text-sm text-gray-600 mb-3">Add a course to your database</p>
              <button
                onClick={onAddCourse}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                Add Course
              </button>
            </div>
            
            <div className="p-4 bg-white rounded-lg border border-gray-200">
              <h4 className="font-medium text-gray-900 mb-2">2. Add Your First Student</h4>
              <p className="text-sm text-gray-600 mb-3">Enroll students in your courses</p>
              <button
                onClick={() => {
                  // Add student functionality
                  setQuery(`INSERT INTO STUDENT_DB.STUDENT_WORKSPACE.STUDENTS (FIRST_NAME, LAST_NAME, EMAIL, COURSE_ID, ENROLLMENT_DATE) VALUES ('John', 'Doe', 'john@example.com', 1, CURRENT_DATE())`);
                }}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Add Student
              </button>
            </div>
            
            <div className="p-4 bg-white rounded-lg border border-gray-200">
              <h4 className="font-medium text-gray-900 mb-2">3. Run Sample Queries</h4>
              <p className="text-sm text-gray-600 mb-3">Use SQL to manage your data</p>
              <code className="block text-xs bg-gray-100 p-2 rounded mb-2">
                SELECT * FROM STUDENT_WORKSPACE.COURSES;
              </code>
              <a 
                href="#query-builder"
                className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                Go to Query Playground →
              </a>
            </div>
          </div>
          
          <div className="p-4 bg-white/50 rounded-lg border border-yellow-100">
            <h4 className="font-medium text-gray-900 mb-2">💡 Your Database Schema:</h4>
            <p className="text-sm text-gray-600 mb-2">
              Your data is stored in the <code className="bg-gray-100 px-1 py-0.5 rounded">STUDENT_WORKSPACE</code> schema
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-50 p-3 rounded border border-blue-200">
                <code className="text-xs">STUDENT_WORKSPACE.COURSES</code>
                <p className="text-xs text-gray-600 mt-1">Your courses table</p>
              </div>
              <div className="bg-green-50 p-3 rounded border border-green-200">
                <code className="text-xs">STUDENT_WORKSPACE.STUDENTS</code>
                <p className="text-xs text-gray-600 mt-1">Your students table</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==== MAIN DASHBOARD CONTENT ====
interface DashboardContentProps {
  isAuthenticated: boolean;
  connectionStatus: 'connected' | 'disconnected' | 'checking';
  connectionStats: any;
  studentAccount: any;
  showConnectForm: boolean;
  setShowConnectForm: (show: boolean) => void;
  recentActivities: any[];
  setRecentActivities: (activities: any[]) => void;
  checkConnectionStatus: () => void;
  handleDisconnectAccount: () => void;
  StatusBadge: () => JSX.Element;
  query: string;
  setQuery: (query: string) => void;
  queryResults: any[];
  setQueryResults: (results: any[]) => void;
  isExecuting: boolean;
  setIsExecuting: (executing: boolean) => void;
  activeTab: 'basics' | 'scenarios' | 'industries' | 'custom';
  setActiveTab: (tab: 'basics' | 'scenarios' | 'industries' | 'custom') => void;
  connectForm: any;
  setConnectForm: (form: any) => void;
  connectLoading: boolean;
  setConnectLoading: (loading: boolean) => void;
  connectError: string;
  setConnectError: (error: string) => void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  handleConnectAccount: (e: React.FormEvent) => Promise<void>;
  executeQuery: () => Promise<void>;
  snowflakeScenarios: any[];
  industryProjects: any[];
}

export function DashboardContent({
  isAuthenticated,
  connectionStatus,
  connectionStats,
  studentAccount,
  showConnectForm,
  setShowConnectForm,
  recentActivities,
  setRecentActivities,
  checkConnectionStatus,
  handleDisconnectAccount,
  StatusBadge,
  query,
  setQuery,
  queryResults,
  setQueryResults,
  isExecuting,
  setIsExecuting,
  activeTab,
  setActiveTab,
  connectForm,
  setConnectForm,
  connectLoading,
  setConnectLoading,
  connectError,
  setConnectError,
  showPassword,
  setShowPassword,
  handleConnectAccount,
  executeQuery,
  snowflakeScenarios,
  industryProjects
}: DashboardContentProps) {
  
  const [isLoading, setIsLoading] = useState(false);
  const [workspaceStatus, setWorkspaceStatus] = useState<'ready' | 'creating' | 'error'>('ready');

  // Load student data when connected
  useEffect(() => {
    if (studentAccount.connected) {
      loadStudentData();
    }
  }, [studentAccount.connected]);

  const loadStudentData = async () => {
    if (!studentAccount.connected) return;
    
    try {
      setIsLoading(true);
      
      // Get credentials from storage
      const password = sessionStorage.getItem('student_snowflake_password');
      if (!password) {
        console.error('No password in session storage');
        return;
      }

      console.log('📥 Loading student data...');
      
      // Load student courses
      const coursesUrl = `/api/student-courses?studentAccount=${studentAccount.account}&studentUsername=${studentAccount.username}&studentRegion=${studentAccount.region}&password=${encodeURIComponent(password)}`;
      const coursesRes = await fetch(coursesUrl);
      const coursesData = await coursesRes.json();
      
      if (coursesData.success) {
        console.log(`✅ Loaded ${coursesData.courses?.length || 0} student courses`);
        setQueryResults(coursesData.courses || []);
      } else {
        console.error('Failed to load student courses:', coursesData.error);
      }
      
    } catch (error) {
      console.error('Error loading student data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCourse = () => {
    const sampleQuery = `INSERT INTO STUDENT_DB.STUDENT_WORKSPACE.COURSES (COURSE_NAME, INSTRUCTOR, START_DATE, END_DATE, STATUS) 
VALUES ('Data Science Fundamentals', 'Your Name', CURRENT_DATE(), DATEADD('day', 30, CURRENT_DATE()), 'ACTIVE')`;
    
    setQuery(sampleQuery);
    // Scroll to query builder
    document.getElementById('query-builder')?.scrollIntoView({ behavior: 'smooth' });
  };

  // ==== RENDER LOGIC ====
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Add logout button in header */}
      <div className="absolute mt-2 right-4 z-50">
        <button
          onClick={() => {
            localStorage.removeItem('snowflake_auth');
            localStorage.removeItem('snowflake_auth_time');
            localStorage.removeItem('snowflake_user_type');
            
            // Also clear student credentials
            sessionStorage.removeItem('student_snowflake_password');
            localStorage.removeItem('student_snowflake_account');
            localStorage.removeItem('student_snowflake_username');
            localStorage.removeItem('student_snowflake_region');
            
            window.location.reload();
          }}
          className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 rounded-full border border-red-200 hover:bg-red-100 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>

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
                  <h1 className="text-3xl md:text-4xl font-bold">
                    {studentAccount.connected ? (
                      <>
                        🎓 Your Snowflake Workspace
                        <span className="ml-3 px-3 py-1 bg-blue-500 text-white text-sm rounded-full">
                          STUDENT MODE
                        </span>
                      </>
                    ) : (
                      <>
                        👨🏫 Snowflake Training Platform
                        <span className="ml-3 px-3 py-1 bg-purple-500 text-white text-sm rounded-full">
                          DEMO MODE
                        </span>
                      </>
                    )}
                  </h1>
                  <p className="text-blue-100 text-lg mt-1">
                    {studentAccount.connected 
                      ? `Connected to: ${studentAccount.account} (${studentAccount.region})`
                      : 'Interactive labs with REAL Snowflake data'}
                  </p>
                </div>
              </div>
              <p className="text-blue-100 text-lg max-w-2xl">
                {studentAccount.connected
                  ? 'Manage your personal training data in your own Snowflake workspace'
                  : 'Master Snowflake through hands-on scenarios, industry projects, and real-time data operations'}
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
              <p className="text-xl font-bold truncate">
                {studentAccount.connected ? studentAccount.account : connectionStats.account}
              </p>
              <p className="text-xs text-blue-300 mt-1">
                {studentAccount.connected ? '👨‍🎓 Student Account' : '👨‍🏫 Instructor Demo'}
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-1">
                <Globe className="w-4 h-4" />
                <p className="text-blue-200 text-sm">Region</p>
              </div>
              <p className="text-xl font-bold">
                {studentAccount.connected 
                  ? studentAccount.region || 'us-east-1'
                  : connectionStats.region}
              </p>
              <p className="text-xs text-blue-300 mt-1">
                {studentAccount.connected ? 'Student Region' : 'Demo Region'}
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-1">
                <Database className="w-4 h-4" />
                <p className="text-blue-200 text-sm">Workspace</p>
              </div>
              <p className="text-xl font-bold">
                {studentAccount.connected ? 'STUDENT_WORKSPACE' : 'SOURCE'}
              </p>
              <p className="text-xs text-blue-300 mt-1">
                {studentAccount.connected ? 'Your schema' : 'Demo schema'}
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4" />
                <p className="text-blue-200 text-sm">Data</p>
              </div>
              <p className="text-xl font-bold">
                {studentAccount.connected 
                  ? queryResults.length === 0 ? 'Empty' : `${queryResults.length} courses`
                  : connectionStats.dataSize}
              </p>
              <p className="text-xs text-blue-300 mt-1">
                {studentAccount.connected 
                  ? queryResults.length === 0 ? 'Add your first course!' : 'Your data'
                  : 'Demo data'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ========== ACCOUNT CONNECTION SECTION ========== */}
      <div className="container mx-auto px-4">
        <EmptyStateGuidance
          studentAccount={studentAccount}
          onAddCourse={handleAddCourse}
        />
        
        <div className={`rounded-2xl p-6 mb-6 ${
          studentAccount.connected 
            ? 'bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200' 
            : 'bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200'
        }`}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl ${
                studentAccount.connected 
                  ? 'bg-green-100' 
                  : 'bg-yellow-100'
              }`}>
                <Database className={`w-6 h-6 ${
                  studentAccount.connected 
                    ? 'text-green-600' 
                    : 'text-yellow-600'
                }`} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">
                  {studentAccount.connected 
                    ? `✅ Connected to Your Snowflake Account (${studentAccount.account})`
                    : '🚀 Use Your Own Snowflake Account'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {studentAccount.connected 
                    ? `Running queries in your STUDENT_WORKSPACE schema as ${studentAccount.username}`
                    : 'Connect your personal Snowflake trial for isolated practice'}
                </p>
                {studentAccount.connected && (
                  <div className="mt-2 flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-600">Live connection</span>
                    </div>
                    <span className="text-xs text-gray-500">|</span>
                    <span className="text-xs text-blue-600">Workspace: STUDENT_WORKSPACE</span>
                    <span className="text-xs text-gray-500">|</span>
                    <span className="text-xs text-gray-600">
                      {queryResults.length} courses loaded
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            {studentAccount.connected ? (
              <div className="flex gap-3">
                <button
                  onClick={handleDisconnectAccount}
                  className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-2 text-sm font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  Disconnect
                </button>
                <a
                  href={`https://${studentAccount.account}.snowflakecomputing.com/console/login`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all flex items-center gap-2 text-sm font-medium shadow-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open Snowflake
                </a>
                <button
                  onClick={loadStudentData}
                  disabled={isLoading}
                  className="px-4 py-2 border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-2 text-sm font-medium"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <RefreshCw className="w-4 h-4" />
                  )}
                  Refresh Data
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowConnectForm(true)}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all flex items-center gap-2 shadow-lg font-medium"
              >
                <Database className="w-4 h-4" />
                Connect Your Account
              </button>
            )}
          </div>

          {/* Benefits */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100">
              <Shield className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900">Complete Isolation</h4>
                <p className="text-sm text-gray-600">
                  {studentAccount.connected 
                    ? 'Your data in STUDENT_WORKSPACE schema'
                    : 'Your data stays private'}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100">
              <TrendingUp className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900">
                  {studentAccount.connected ? 'Your Workspace' : 'Real Experience'}
                </h4>
                <p className="text-sm text-gray-600">
                  {studentAccount.connected 
                    ? 'Manage actual Snowflake workspace'
                    : 'Manage actual Snowflake account'}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100">
              <Zap className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900">
                  {studentAccount.connected ? 'Auto Schema' : '$400 Free Credits'}
                </h4>
                <p className="text-sm text-gray-600">
                  {studentAccount.connected 
                    ? 'Queries auto-use STUDENT_WORKSPACE'
                    : '120-day trial per student'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-2 inline-flex">
            <TabButton 
              id="basics" 
              label={studentAccount.connected ? "My Workspace" : "Basics"} 
              icon={BookOpen} 
              isActive={activeTab === 'basics'}
              onClick={() => setActiveTab('basics')}
            />
            <TabButton 
              id="scenarios" 
              label="Top 10 Scenarios" 
              icon={Award} 
              isActive={activeTab === 'scenarios'}
              onClick={() => setActiveTab('scenarios')}
            />
            <TabButton 
              id="industries" 
              label="Industry Projects" 
              icon={Building2} 
              isActive={activeTab === 'industries'}
              onClick={() => setActiveTab('industries')}
            />
            <TabButton 
              id="custom" 
              label="Custom Builder" 
              icon={Rocket} 
              isActive={activeTab === 'custom'}
              onClick={() => setActiveTab('custom')}
            />
          </div>
        </div>

        {/* Basics Tab Content */}
        {activeTab === 'basics' && (
          <>
            {/* Core Features Grid */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {studentAccount.connected ? "📚 Your Snowflake Workspace" : "📚 Learn Snowflake Basics"}
                </h2>
                <div className="text-sm text-gray-600 flex items-center gap-2">
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Loading your data...
                    </>
                  ) : (
                    <>
                      <Database className="w-4 h-4" />
                      {studentAccount.connected 
                        ? `Using: ${studentAccount.account}` 
                        : 'Using: Instructor Demo Account'}
                    </>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FeatureCard
                  title="Dashboard Analytics"
                  description={studentAccount.connected 
                    ? "View analytics from your Snowflake workspace"
                    : "Real-time insights and performance metrics from Snowflake"}
                  icon={BarChart3}
                  href="/dashboard"
                  color="bg-purple-500"
                  action={studentAccount.connected ? "My Analytics" : "View Live Analytics"}
                />
                <FeatureCard
                  title={studentAccount.connected ? "My Courses" : "Course Management"}
                  description={studentAccount.connected 
                    ? "Manage your courses in your workspace"
                    : "Manage training courses with real Snowflake CRUD operations"}
                  icon={BookOpen}
                  href="/dashboard/courses"
                  color="bg-blue-500"
                  action={studentAccount.connected ? "Manage My Courses" : "Manage Courses"}
                />
                <FeatureCard
                  title={studentAccount.connected ? "My Students" : "Student Management"}
                  description={studentAccount.connected 
                    ? "Manage students in your workspace"
                    : "Student enrollment, progress, and tracking with actual data"}
                  icon={Users}
                  href="/dashboard/students"
                  color="bg-green-500"
                  action={studentAccount.connected ? "Manage My Students" : "Manage Students"}
                />
                <FeatureCard
                  title="Advanced Analytics"
                  description={studentAccount.connected 
                    ? "Deep insights from your data"
                    : "Deep insights and reporting tools powered by Snowflake"}
                  icon={TrendingUp}
                  href="/dashboard/analytics"
                  color="bg-orange-500"
                  action="View Reports"
                />
                <FeatureCard
                  title="Query Playground"
                  description={studentAccount.connected 
                    ? "Run SQL on your Snowflake workspace"
                    : "Direct SQL query builder and executor on Snowflake"}
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
                        <h3 className="text-xl font-bold text-gray-900">
                          {studentAccount.connected ? "🚀 My Snowflake Query Playground" : "🚀 Snowflake Query Playground"}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {studentAccount.connected 
                            ? `Executing in: STUDENT_WORKSPACE schema (${studentAccount.account})`
                            : 'Executing queries on: Instructor Demo Account'}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <select 
                        className="border rounded-lg px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        onChange={(e) => setQuery(e.target.value)}
                        value={query}
                      >
                        <option value="">Try Example Queries</option>
    {studentAccount.connected ? (
  <>
    <option value="SELECT * FROM STUDENT_DB.STUDENT_WORKSPACE.COURSES">List My Courses</option>
    <option value="SELECT CURRENT_TIMESTAMP() AS current_time">Check Connection</option>
    <option value="SHOW DATABASES">Show Databases</option>
    <option value="SELECT COUNT(*) as total_courses FROM STUDENT_DB.STUDENT_WORKSPACE.COURSES">Count My Courses</option>
    <option value="SELECT CURRENT_USER() as user, CURRENT_ACCOUNT() as account">My User Info</option>
    <option value="INSERT INTO STUDENT_DB.STUDENT_WORKSPACE.COURSES (COURSE_NAME, INSTRUCTOR, START_DATE, END_DATE) VALUES ('New Course', 'Me', CURRENT_DATE(), DATEADD('day', 30, CURRENT_DATE()))">Add Sample Course</option>
  </>
) : (
  // Demo queries stay the same
  <>
    <option value="SELECT * FROM SOURCE.PUBLIC.COURSES">List All Courses</option>
    <option value="SELECT CURRENT_TIMESTAMP() AS current_time">Check Connection</option>
    <option value="SHOW DATABASES">Show Databases</option>
    <option value="SELECT COUNT(*) as total_students FROM SOURCE.PUBLIC.STUDENTS">Count Students</option>
    <option value="SELECT CURRENT_USER() as user, CURRENT_ACCOUNT() as account">Current User Info</option>
  </>
)}
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      SQL Query {studentAccount.connected && '(Auto uses STUDENT_WORKSPACE schema)'}
                    </label>
                    <textarea
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="w-full h-40 font-mono text-sm p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={
                        studentAccount.connected 
                          ? "Enter your SQL query (will auto-use STUDENT_WORKSPACE schema)...\nExample: SELECT * FROM COURSES → SELECT * FROM STUDENT_WORKSPACE.COURSES"
                          : "Enter your SQL query here..."
                      }
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
                    <button 
                      onClick={() => setQuery(studentAccount.connected 
                        ? 'SELECT * FROM STUDENT_WORKSPACE.COURSES LIMIT 10'
                        : 'SELECT * FROM SOURCE.PUBLIC.COURSES LIMIT 10'
                      )}
                      className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Reset Query
                    </button>
                    {studentAccount.connected && (
                      <button 
                        onClick={() => setQuery(`SELECT CURRENT_USER() as current_user, CURRENT_ACCOUNT() as account, CURRENT_ROLE() as role, CURRENT_WAREHOUSE() as warehouse`)}
                        className="flex items-center gap-2 px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <User className="w-4 h-4" />
                        Test My Connection
                      </button>
                    )}
                    {studentAccount.connected && queryResults.length === 0 && (
                      <button 
                        onClick={handleAddCourse}
                        className="flex items-center gap-2 px-5 py-2.5 border border-green-300 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
                      >
                        <PlusCircle className="w-4 h-4" />
                        Add First Course
                      </button>
                    )}
                  </div>

                  {queryResults.length > 0 && (
                    <div className="mt-6">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">
                          {studentAccount.connected ? 'My Data' : 'Results'} ({queryResults.length} rows)
                        </h4>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-600">
                            {studentAccount.connected 
                              ? 'From: STUDENT_WORKSPACE schema'
                              : 'From: Demo Account'}
                          </span>
                          <button className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800">
                            <Download className="w-4 h-4" />
                            Export as CSV
                          </button>
                        </div>
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
                        {queryResults.length > 5 && (
                          <div className="px-4 py-3 bg-gray-50 text-center text-sm text-gray-600">
                            Showing 5 of {queryResults.length} rows
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {studentAccount.connected && queryResults.length === 0 && (
                    <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-gray-50 rounded-xl border border-blue-200">
                      <div className="text-center">
                        <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                          <Database className="w-6 h-6 text-blue-600" />
                        </div>
                        <h4 className="font-bold text-gray-900 mb-2">Your workspace is ready!</h4>
                        <p className="text-gray-600 mb-4">
                          Your <code className="bg-blue-100 px-2 py-1 rounded">STUDENT_WORKSPACE</code> schema has been created.
                          Add your first course to get started.
                        </p>
                        <div className="flex justify-center gap-3">
                          <button
                            onClick={handleAddCourse}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            Add Sample Course
                          </button>
                          <button
                            onClick={() => setQuery('SELECT * FROM STUDENT_WORKSPACE.COURSES')}
                            className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                          >
                            Check My Data
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Rest of the tabs remain the same */}
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

        {/* Quick Tools & Recent Activity */}
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
            <p className="text-gray-900 font-medium">
              {studentAccount.connected 
                ? `Connected to STUDENT_WORKSPACE schema in your Snowflake account: ${studentAccount.account}`
                : 'Using Instructor Demo Snowflake Account'}
            </p>
          </div>
          <p className="text-gray-600 text-sm">
            Connection established via secure API with end-to-end encryption • Real-time synchronization • Enterprise-grade security
          </p>
        </div>
      </div>
    </div>
  );
}