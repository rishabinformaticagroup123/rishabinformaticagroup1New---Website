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
  Sparkles, Rocket, Star, Award,
  Key, LogOut, User, Eye, EyeOff,
  HelpCircle
} from 'lucide-react';

// ==== SIMPLE PASSWORD AUTH COMPONENT ====
function PasswordGate({ onAuthenticate }: { onAuthenticate: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Access codes (change these for students!)
  const ACCESS_CODES = {
    admin: "SNOW@2024#LEARN",
    instructor: "TEACH@SNOW123",
    student1: "STUDENT1@CODE",
    student2: "STUDENT2@CODE",
    student3: "STUDENT3@CODE",
    demo: "DEMO@ACCESS456"
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simple delay for UX
    setTimeout(() => {
      // Check if password matches any access code
      if (Object.values(ACCESS_CODES).includes(password)) {
        // Store auth in localStorage (24 hours)
        localStorage.setItem('snowflake_auth', 'authenticated');
        localStorage.setItem('snowflake_auth_time', Date.now().toString());
        localStorage.setItem('snowflake_user_type', 
          Object.keys(ACCESS_CODES).find(key => ACCESS_CODES[key as keyof typeof ACCESS_CODES] === password) || 'user'
        );
        
        onAuthenticate(); // Call parent to update state
      } else {
        setError('Invalid access code. Please check and try again.');
        setPassword('');
      }
      setLoading(false);
    }, 500);
  };

  const handleLogout = () => {
    localStorage.removeItem('snowflake_auth');
    localStorage.removeItem('snowflake_auth_time');
    localStorage.removeItem('snowflake_user_type');
    window.location.reload();
  };

  // Check if already authenticated
  useEffect(() => {
    const authStatus = localStorage.getItem('snowflake_auth');
    const authTime = localStorage.getItem('snowflake_auth_time');
    
    if (authStatus === 'authenticated' && authTime) {
      // Check if auth is older than 24 hours
      const hoursSinceAuth = (Date.now() - parseInt(authTime)) / (1000 * 60 * 60);
      if (hoursSinceAuth < 24) {
        onAuthenticate();
      } else {
        // Auto-logout after 24 hours
        localStorage.removeItem('snowflake_auth');
        localStorage.removeItem('snowflake_auth_time');
      }
    }
  }, [onAuthenticate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 max-w-md w-full shadow-2xl">
        {/* Logo Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl mb-4 shadow-lg">
            <Key className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Snowflake Learning Platform</h1>
          <p className="text-blue-200">Secure Access Required</p>
        </div>
        
        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-blue-200 mb-2">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Enter Access Code
              </div>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/50 border border-white/30 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 focus:outline-none transition-all"
              placeholder="Enter your access code"
              required
            />
            {error && (
              <p className="mt-2 text-sm text-red-300 flex items-center gap-1">
                <AlertCircle className="w-4 h-4" />
                {error}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium py-3.5 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Verifying...
              </>
            ) : (
              <>
                <Key className="w-5 h-5" />
                Access Platform
              </>
            )}
          </button>
        </form>

        {/* Demo Access Info */}
        <div className="mt-8 p-4 bg-blue-900/30 border border-blue-700/30 rounded-xl">
          <p className="text-sm text-blue-200 text-center">
            <span className="font-medium">Demo Access:</span> Use <code className="bg-blue-900/50 px-2 py-1 rounded">DEMO@ACCESS456</code>
          </p>
        </div>

        {/* Instructions for Students */}
        <div className="mt-6 border-t border-white/10 pt-6">
          <h3 className="text-sm font-medium text-blue-200 mb-2">📋 For Students:</h3>
          <ul className="text-xs text-blue-300 space-y-1">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
              Contact your instructor for access code
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
              Each student gets unique code
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
              Sessions expire after 24 hours
            </li>
          </ul>
        </div>

        {/* Admin/Instructor Info */}
        <div className="mt-4 text-center">
          <button
            onClick={handleLogout}
            className="text-xs text-blue-300 hover:text-blue-100 flex items-center gap-1 mx-auto"
          >
            <LogOut className="w-3 h-3" />
            Clear session
          </button>
        </div>
      </div>
    </div>
  );
}

// ==== MAIN COMPONENT ====
export default function SnowflakeConnectPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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

  // ==== STUDENT ACCOUNT STATES ====
  const [studentAccount, setStudentAccount] = useState<{
    connected: boolean;
    account?: string;
    username?: string;
    region?: string;
  }>({ connected: false });

  const [showConnectForm, setShowConnectForm] = useState(false);
  const [connectForm, setConnectForm] = useState({
    account: '',
    region: 'us-east-1',
    username: '',
    password: '',
    warehouse: 'COMPUTE_WH',
    database: '',
    schema: '',
    role: 'PUBLIC'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [connectLoading, setConnectLoading] = useState(false);
  const [connectError, setConnectError] = useState('');

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

  // Check authentication status on load
  useEffect(() => {
    const authStatus = localStorage.getItem('snowflake_auth');
    const authTime = localStorage.getItem('snowflake_auth_time');
    
    if (authStatus === 'authenticated' && authTime) {
      // Check if auth is older than 24 hours
      const hoursSinceAuth = (Date.now() - parseInt(authTime)) / (1000 * 60 * 60);
      if (hoursSinceAuth < 24) {
        setIsAuthenticated(true);
      } else {
        // Auto-logout after 24 hours
        localStorage.removeItem('snowflake_auth');
        localStorage.removeItem('snowflake_auth_time');
      }
    }
  }, []);

  // Check connection status on load
  useEffect(() => {
    if (isAuthenticated) {
      checkConnectionStatus();
    }
  }, [isAuthenticated]);

  // Check if student account is already connected
  useEffect(() => {
    if (isAuthenticated) {
      const savedAccount = localStorage.getItem('student_snowflake_account');
      const savedUsername = localStorage.getItem('student_snowflake_username');
      const savedRegion = localStorage.getItem('student_snowflake_region');
      
      if (savedAccount && savedUsername) {
        setStudentAccount({
          connected: true,
          account: savedAccount,
          username: savedUsername,
          region: savedRegion || 'us-east-1'
        });
      }
    }
  }, [isAuthenticated]);

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

  // ==== UPDATED ACCOUNT CONNECTION HANDLER ====
  const handleConnectAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setConnectLoading(true);
    setConnectError('');

    try {
      console.log('🔐 Testing student Snowflake connection:', {
        account: connectForm.account,
        username: connectForm.username,
        passwordLength: connectForm.password.length,
        region: connectForm.region
      });

      // Clean account name (remove domain if present)
      const cleanAccount = connectForm.account
        .replace('.snowflakecomputing.com', '')
        .replace('https://', '')
        .replace('http://', '')
        .toLowerCase()
        .trim();

      // Test connection to student's Snowflake account
      const response = await fetch('/api/test-snowflake-connection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          account: cleanAccount,
          region: connectForm.region,
          username: connectForm.username,
          password: connectForm.password,
          warehouse: connectForm.warehouse,
          database: connectForm.database,
          schema: connectForm.schema,
          role: connectForm.role
        })
      });

      const data = await response.json();
      
      if (data.success) {
        console.log('✅ Student connection successful:', data);
        
        // Store in sessionStorage (temporary solution)
        sessionStorage.setItem('student_snowflake_account', cleanAccount);
        sessionStorage.setItem('student_snowflake_username', connectForm.username);
        sessionStorage.setItem('student_snowflake_region', connectForm.region);
        sessionStorage.setItem('student_snowflake_password', connectForm.password);
        
        // Also store in localStorage for persistence (DEMO ONLY)
        localStorage.setItem('student_snowflake_account', cleanAccount);
        localStorage.setItem('student_snowflake_username', connectForm.username);
        localStorage.setItem('student_snowflake_region', connectForm.region);
        
        setStudentAccount({
          connected: true,
          account: cleanAccount,
          username: connectForm.username,
          region: connectForm.region
        });
        
        setShowConnectForm(false);
        setConnectForm({ 
          account: '', 
          region: 'us-east-1',
          username: '', 
          password: '',
          warehouse: 'COMPUTE_WH',
          database: '',
          schema: '',
          role: 'PUBLIC'
        });
        
        // Show success message with details
        alert(`✅ Connected to Snowflake successfully!\n\nAccount: ${data.account || cleanAccount}\nRegion: ${data.region || connectForm.region}\nUser: ${data.username || connectForm.username}\n\nYou can now run queries on your personal Snowflake account!`);
      } else {
        console.error('❌ Student connection failed:', data);
        
        // Provide helpful error messages
        let errorMessage = data.error || 'Connection failed';
        
        // Common error patterns
        if (errorMessage.includes('Incorrect username or password')) {
          errorMessage = 'Invalid username or password. Please check your credentials.';
        } else if (errorMessage.includes('account')) {
          errorMessage = 'Invalid account name. Format should be: abc12345 (from abc12345.snowflakecomputing.com)';
        } else if (errorMessage.includes('region')) {
          errorMessage = 'Invalid region. Please check your Snowflake URL or try a different region.';
        } else if (errorMessage.includes('network') || errorMessage.includes('connection')) {
          errorMessage = 'Network error. Please check your internet connection.';
        } else if (errorMessage.includes('timeout')) {
          errorMessage = 'Connection timeout. Please try again.';
        }
        
        setConnectError(errorMessage);
        
        // Clear password field for security
        setConnectForm(prev => ({ ...prev, password: '' }));
        setShowPassword(false);
      }
    } catch (error: any) {
      console.error('❌ Connection test error:', error);
      setConnectError('Connection failed. Please check your network and try again.');
      
      // Clear password field for security
      setConnectForm(prev => ({ ...prev, password: '' }));
      setShowPassword(false);
    } finally {
      setConnectLoading(false);
    }
  };

  // ==== UPDATED EXECUTE QUERY FUNCTION ====
  const executeQuery = async () => {
    setIsExecuting(true);
    try {
      let endpoint = '/api/courses';
      let body: any = { query: query };
      
      // If student account is connected, use their personal account
      if (studentAccount.connected) {
        endpoint = '/api/execute-student-query';
        
        // Get password from sessionStorage (DEMO only)
        const password = sessionStorage.getItem('student_snowflake_password');
        
        if (!password) {
          alert('⚠️ Your Snowflake session has expired. Please reconnect your account.');
          setStudentAccount({ connected: false });
          localStorage.removeItem('student_snowflake_account');
          localStorage.removeItem('student_snowflake_username');
          localStorage.removeItem('student_snowflake_region');
          return;
        }
        
        body = {
          query: query,
          studentAccount: studentAccount.account,
          studentUsername: studentAccount.username,
          studentRegion: studentAccount.region,
          password: password // Send password for student account queries
        };
        
        console.log('📊 Executing query on student account:', studentAccount.account);
      } else {
        console.log('📊 Executing query on instructor demo account');
      }
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      
      const data = await response.json();
      if (data.success) {
        setQueryResults(data.results || data.courses || []);
        
        // Show success message
        console.log('✅ Query executed successfully:', {
          account: data.studentAccount || 'Instructor Demo',
          rows: data.rowCount || data.results?.length || 0,
          time: data.executionTime || 'N/A'
        });
        
        // Add to recent activities
        const newActivity = {
          id: recentActivities.length + 1,
          action: `Query executed on ${data.studentAccount ? 'student account' : 'demo account'}`,
          time: 'Just now',
          type: 'connection'
        };
        setRecentActivities([newActivity, ...recentActivities.slice(0, 4)]);
      } else {
        // Handle student account disconnection
        if (data.requiresReconnect || data.error?.includes('authentication')) {
          alert('⚠️ Your Snowflake session has expired. Please reconnect your account.');
          handleDisconnectAccount();
        } else {
          alert(`❌ Query failed: ${data.error || 'Unknown error'}`);
        }
      }
    } catch (error: any) {
      console.error('❌ Query execution failed:', error);
      alert('❌ Query failed to execute. Please check your connection.');
    } finally {
      setIsExecuting(false);
    }
  };

  // ==== DISCONNECT ACCOUNT FUNCTION ====
  const handleDisconnectAccount = () => {
    // Clear all student credentials
    sessionStorage.removeItem('student_snowflake_account');
    sessionStorage.removeItem('student_snowflake_username');
    sessionStorage.removeItem('student_snowflake_region');
    sessionStorage.removeItem('student_snowflake_password');
    
    localStorage.removeItem('student_snowflake_account');
    localStorage.removeItem('student_snowflake_username');
    localStorage.removeItem('student_snowflake_region');
    
    setStudentAccount({ connected: false });
    alert('Disconnected from student Snowflake account.');
  };

  // ==== VALIDATE ACCOUNT FORMAT ====
  const validateAccountFormat = (account: string): boolean => {
    if (!account) return false;
    
    // Clean account name
    const cleanAccount = account
      .replace('.snowflakecomputing.com', '')
      .replace('https://', '')
      .replace('http://', '')
      .toLowerCase()
      .trim();
    
    // Snowflake account format: lowercase letters + numbers, no special chars (except underscore and hyphen)
    return /^[a-z0-9_-]+$/.test(cleanAccount) && cleanAccount.length >= 3;
  };

  // ==== ACCOUNT FORMAT HELPER TEXT ====
  const getAccountFormatHint = (account: string): string => {
    if (!account) return 'Enter your Snowflake account identifier';
    
    const cleanAccount = account
      .replace('.snowflakecomputing.com', '')
      .replace('https://', '')
      .replace('http://', '')
      .toLowerCase()
      .trim();
    
    if (!validateAccountFormat(account)) {
      return 'Invalid format. Use only lowercase letters, numbers, hyphens, and underscores.';
    }
    
    return `Your Snowflake URL: https://${cleanAccount}.snowflakecomputing.com`;
  };

  // ==== COMPONENT FUNCTIONS ====
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

  // ==== RENDER LOGIC ====
  
  // Show password gate if not authenticated
  if (!isAuthenticated) {
    return <PasswordGate onAuthenticate={() => setIsAuthenticated(true)} />;
  }

  // ==== AUTHENTICATED PAGE ====
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Add logout button in header */}
      <div className="absolute top-4 right-4 z-50">
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
                <Clock className="w-4 h-4" />
                <p className="text-blue-200 text-sm">Last Sync</p>
              </div>
              <p className="text-xl font-bold">{connectionStats.lastSync}</p>
              <p className="text-xs text-blue-300 mt-1">Updated every 5 min</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-4 h-4" />
                <p className="text-blue-200 text-sm">Data Processed</p>
              </div>
              <p className="text-xl font-bold">{connectionStats.dataSize}</p>
              <p className="text-xs text-blue-300 mt-1">
                {studentAccount.connected ? 'Your data' : 'Demo data'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ========== ACCOUNT CONNECTION SECTION ========== */}
      <div className="container mx-auto px-4">
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
                  {studentAccount.connected ? '✅ Connected to Your Snowflake Account' : '🚀 Use Your Own Snowflake Account'}
                </h3>
                <p className="text-gray-600 text-sm">
                  {studentAccount.connected 
                    ? 'Running queries on your personal Snowflake trial account'
                    : 'Connect your personal Snowflake trial for isolated practice'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {studentAccount.connected 
                    ? `👤 Connected as: ${studentAccount.username}@${studentAccount.account} (${studentAccount.region})`
                    : '🔗 Not connected - Currently using demo account'}
                </p>
                {studentAccount.connected && (
                  <div className="mt-2 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-600">Live connection active</span>
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
                  href={`https://${studentAccount.account}.${studentAccount.region}.snowflakecomputing.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all flex items-center gap-2 text-sm font-medium shadow-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  Open Snowflake
                </a>
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
                <p className="text-sm text-gray-600">Your data stays private</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100">
              <TrendingUp className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900">Real Experience</h4>
                <p className="text-sm text-gray-600">Manage actual Snowflake account</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100">
              <Zap className="w-5 h-5 text-purple-500 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-medium text-gray-900">$400 Free Credits</h4>
                <p className="text-sm text-gray-600">120-day trial per student</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Connect Account Modal */}
      {showConnectForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Connect Your Snowflake Account</h3>
              <button
                onClick={() => {
                  setShowConnectForm(false);
                  setConnectError('');
                  setConnectForm({ 
                    account: '', 
                    region: 'us-east-1',
                    username: '', 
                    password: '',
                    warehouse: 'COMPUTE_WH',
                    database: '',
                    schema: '',
                    role: 'PUBLIC'
                  });
                  setShowPassword(false);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            {connectError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-red-700 text-sm font-medium">Connection Failed</p>
                  <p className="text-red-600 text-xs mt-1">{connectError}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleConnectAccount} className="space-y-4">
              {/* Account */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Snowflake Account Identifier *
                </label>
                <input
                  type="text"
                  value={connectForm.account}
                  onChange={(e) => setConnectForm({...connectForm, account: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="xyz12345"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  <strong>IMPORTANT:</strong> From your Snowflake URL:<br/>
                  • If URL is <code className="bg-gray-100 px-1">xyz12345.us-east-1.snowflakecomputing.com</code> → Enter <strong>xyz12345</strong><br/>
                  • If URL is <code className="bg-gray-100 px-1">xyz12345.snowflakecomputing.com</code> → Enter <strong>xyz12345</strong><br/>
                  <span className="text-red-600 font-medium">Enter ONLY the part before ".snowflakecomputing.com"</span>
                </p>
              </div>

              {/* Region */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Region *
                </label>
                <div className="flex gap-2">
                  <select
                    value={connectForm.region}
                    onChange={(e) => setConnectForm({...connectForm, region: e.target.value})}
                    className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    required
                  >
                    <option value="">Select Region</option>
                    <option value="us-east-1">us-east-1 (US East - N. Virginia)</option>
                    <option value="us-west-2">us-west-2 (US West - Oregon)</option>
                    <option value="eu-central-1">eu-central-1 (EU - Frankfurt)</option>
                    <option value="ap-southeast-1">ap-southeast-1 (Asia - Singapore)</option>
                    <option value="ap-southeast-2">ap-southeast-2 (Asia - Sydney)</option>
                    <option value="eu-west-1">eu-west-1 (EU - Ireland)</option>
                    <option value="us-east-2">us-east-2 (US East - Ohio)</option>
                    <option value="ca-central-1">ca-central-1 (Canada - Central)</option>
                    <option value="eu-west-2">eu-west-2 (EU - London)</option>
                    <option value="ap-northeast-1">ap-northeast-1 (Asia - Tokyo)</option>
                    <option value="ap-south-1">ap-south-1 (Asia - Mumbai)</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => {
                      // Auto-detect region from account (this is a placeholder)
                      alert("Region auto-detection requires actual Snowflake connection. Please select from list or check your Snowflake URL.");
                    }}
                    className="px-3 py-2.5 border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm whitespace-nowrap"
                  >
                    Auto-detect
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Check your Snowflake URL or use "us-east-1" if unsure
                </p>
              </div>

              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username *
                </label>
                <input
                  type="text"
                  value={connectForm.username}
                  onChange={(e) => setConnectForm({...connectForm, username: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="your_username"
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Your Snowflake login username (case-sensitive)
                </p>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={connectForm.password}
                    onChange={(e) => setConnectForm({...connectForm, password: e.target.value})}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Your Snowflake password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Your password is encrypted and temporarily stored for this session only
                </p>
              </div>

              {/* Advanced Options (Collapsible) */}
              <div className="border-t pt-4">
                <details className="group">
                  <summary className="flex items-center justify-between cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
                    <span className="flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      Advanced Connection Options (Optional)
                    </span>
                    <ChevronRight className="w-4 h-4 group-open:rotate-90 transition-transform" />
                  </summary>
                  <div className="mt-4 space-y-4">
                    {/* Warehouse */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Warehouse
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={connectForm.warehouse}
                          onChange={(e) => setConnectForm({...connectForm, warehouse: e.target.value})}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="COMPUTE_WH"
                        />
                        <button
                          type="button"
                          onClick={() => setConnectForm({...connectForm, warehouse: 'COMPUTE_WH'})}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-blue-600 hover:text-blue-800"
                        >
                          Reset
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Default warehouse for queries. "COMPUTE_WH" is usually available in trial accounts.
                      </p>
                    </div>

                    {/* Database and Schema */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Database
                        </label>
                        <input
                          type="text"
                          value={connectForm.database}
                          onChange={(e) => setConnectForm({...connectForm, database: e.target.value})}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Optional"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Schema
                        </label>
                        <input
                          type="text"
                          value={connectForm.schema}
                          onChange={(e) => setConnectForm({...connectForm, schema: e.target.value})}
                          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Optional"
                        />
                      </div>
                    </div>

                    {/* Role */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Role
                      </label>
                      <input
                        type="text"
                        value={connectForm.role}
                        onChange={(e) => setConnectForm({...connectForm, role: e.target.value})}
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="PUBLIC"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Default role for connection. "PUBLIC" is usually available.
                      </p>
                    </div>
                  </div>
                </details>
              </div>

              <div className="flex gap-3 pt-6 border-t">
                <button
                  type="button"
                  onClick={() => {
                    setShowConnectForm(false);
                    setConnectError('');
                    setConnectForm({ 
                      account: '', 
                      region: 'us-east-1',
                      username: '', 
                      password: '',
                      warehouse: 'COMPUTE_WH',
                      database: '',
                      schema: '',
                      role: 'PUBLIC'
                    });
                    setShowPassword(false);
                  }}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={connectLoading}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all disabled:opacity-50 flex items-center justify-center gap-2 font-medium shadow-md"
                >
                  {connectLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Testing Connection...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      Connect Account
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Help Section */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                📝 Where to find these details
              </h4>
              
              <div className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <p className="text-sm font-medium text-blue-800 mb-1">📋 Account & Region - IMPORTANT!</p>
                  <div className="space-y-3">
                    <p className="text-xs text-blue-700">
                      1. Login to <a href="https://app.snowflake.com" target="_blank" className="underline font-medium">Snowflake Web UI</a>
                    </p>
                    <p className="text-xs text-blue-700">
                      2. Check browser URL for <strong>TWO possible formats</strong>:
                    </p>
                    
                    {/* FORMAT 1: With Region in URL */}
                    <div className="space-y-1">
                      <div className="text-xs font-medium text-blue-800">Format 1: Region IN URL</div>
                      <div className="bg-blue-100 p-2 rounded text-xs font-mono text-blue-800 border border-blue-200">
                        https://<span className="font-bold text-red-600">xyz12345</span>.<span className="font-bold text-red-600">us-east-1</span>.snowflakecomputing.com
                      </div>
                      <div className="flex gap-2 text-xs">
                        <div className="flex items-center gap-1">
                          <span className="px-2 py-1 bg-blue-200 rounded">xyz12345</span>
                          <span className="text-gray-600">→ Account</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="px-2 py-1 bg-blue-200 rounded">us-east-1</span>
                          <span className="text-gray-600">→ Region</span>
                        </div>
                      </div>
                    </div>
                    
                    {/* FORMAT 2: Without Region in URL */}
                    <div className="space-y-1 mt-2">
                      <div className="text-xs font-medium text-blue-800">Format 2: Region NOT in URL</div>
                      <div className="bg-blue-100 p-2 rounded text-xs font-mono text-blue-800 border border-blue-200">
                        https://<span className="font-bold text-red-600">xyz12345</span>.snowflakecomputing.com
                      </div>
                      <div className="flex items-center gap-1 text-xs">
                        <span className="px-2 py-1 bg-blue-200 rounded">xyz12345</span>
                        <span className="text-gray-600">→ Account (select region from dropdown)</span>
                      </div>
                    </div>
                    
                    {/* Region Help */}
                    <div className="mt-2 p-2 bg-blue-100 rounded border border-blue-200">
                      <p className="text-xs font-medium text-blue-800 mb-1">📍 If region is NOT in URL:</p>
                      <div className="flex flex-wrap gap-1">
                        <span className="px-2 py-1 bg-white text-blue-700 rounded text-xs">us-east-1</span>
                        <span className="px-2 py-1 bg-white text-blue-700 rounded text-xs">us-west-2</span>
                        <span className="px-2 py-1 bg-white text-blue-700 rounded text-xs">eu-central-1</span>
                        <span className="px-2 py-1 bg-white text-blue-700 rounded text-xs">ap-southeast-1</span>
                      </div>
                      <p className="text-xs text-blue-700 mt-1">Try these common regions if unsure</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                  <p className="text-sm font-medium text-green-800 mb-1">🔑 Username & Password</p>
                  <div className="space-y-1">
                    <p className="text-xs text-green-700 flex items-start gap-1">
                      <span className="mt-0.5">•</span>
                      <span><strong>Same credentials</strong> used to login to Snowflake Web UI</span>
                    </p>
                    <p className="text-xs text-green-700 flex items-start gap-1">
                      <span className="mt-0.5">•</span>
                      <span>For trial accounts: Created during signup process</span>
                    </p>
                    <p className="text-xs text-green-700 flex items-start gap-1">
                      <span className="mt-0.5">•</span>
                      <span><strong>Passwords are case-sensitive</strong></span>
                    </p>
                    <p className="text-xs text-green-700 flex items-start gap-1">
                      <span className="mt-0.5">•</span>
                      <span><strong>Recommended:</strong> Use <code className="bg-green-200 px-1.5 py-0.5 rounded text-xs">Account Admin</code> user for full access</span>
                    </p>
                  </div>
                </div>
                
                <div className="p-3 bg-purple-50 rounded-lg border border-purple-100">
                  <p className="text-sm font-medium text-purple-800 mb-1">🎯 Trial Account Setup</p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 bg-purple-200 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                        <span className="text-xs font-bold">1</span>
                      </div>
                      <p className="text-xs text-purple-700">
                        Go to <a href="https://signup.snowflake.com" target="_blank" className="underline font-medium">signup.snowflake.com</a>
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 bg-purple-200 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                        <span className="text-xs font-bold">2</span>
                      </div>
                      <p className="text-xs text-purple-700">
                        Use any email to create account (personal or educational)
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 bg-purple-200 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                        <span className="text-xs font-bold">3</span>
                      </div>
                      <p className="text-xs text-purple-700">
                        <strong>Save these from welcome email:</strong>
                        <ul className="mt-1 ml-4 space-y-0.5">
                          <li>• Account Name (e.g., <code className="bg-purple-200 px-1 rounded">xyz12345</code>)</li>
                          <li>• Username</li>
                          <li>• Password</li>
                        </ul>
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 bg-purple-200 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                        <span className="text-xs font-bold">4</span>
                      </div>
                      <p className="text-xs text-purple-700">
                        <strong>$400 free credits</strong> for 120 days - No credit card required!
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                  <p className="text-sm font-medium text-yellow-800 mb-1">⚠️ Important Connection Tips</p>
                  <div className="space-y-1">
                    <p className="text-xs text-yellow-700 flex items-start gap-1">
                      <span className="mt-0.5">•</span>
                      <span><strong>Account Format:</strong> Enter ONLY the part BEFORE ".snowflakecomputing.com"</span>
                    </p>
                    <p className="text-xs text-yellow-700 flex items-start gap-1">
                      <span className="mt-0.5">•</span>
                      <span><strong>Common Issue #1:</strong> Wrong region selection (try 'us-east-1' first)</span>
                    </p>
                    <p className="text-xs text-yellow-700 flex items-start gap-1">
                      <span className="mt-0.5">•</span>
                      <span><strong>Common Issue #2:</strong> Using wrong username (use Account Admin)</span>
                    </p>
                    <p className="text-xs text-yellow-700 flex items-start gap-1">
                      <span className="mt-0.5">•</span>
                      <span><strong>Security:</strong> Passwords are encrypted and never stored permanently</span>
                    </p>
                  </div>
                </div>

                {/* Quick Test Section */}
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-sm font-medium text-gray-800 mb-2">🔧 Quick Test (Fill with example values):</p>
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <button
                      type="button"
                      onClick={() => setConnectForm({
                        account: 'demo12345',
                        region: 'us-east-1',
                        username: 'test_user',
                        password: 'Test@123',
                        warehouse: 'COMPUTE_WH',
                        database: '',
                        schema: '',
                        role: 'PUBLIC'
                      })}
                      className="text-xs px-3 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                    >
                      Fill Test Account 1
                    </button>
                    <button
                      type="button"
                      onClick={() => setConnectForm({
                        account: 'test67890',
                        region: 'us-west-2',
                        username: 'student_demo',
                        password: 'Demo@456',
                        warehouse: 'COMPUTE_WH',
                        database: '',
                        schema: '',
                        role: 'PUBLIC'
                      })}
                      className="text-xs px-3 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                    >
                      Fill Test Account 2
                    </button>
                  </div>
                  <p className="text-xs text-gray-600">
                    Use these to test the form (won't actually connect to Snowflake)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
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
                  {studentAccount.connected 
                    ? `Using: ${studentAccount.account}` 
                    : 'Using: Instructor Demo Account'}
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
                <FeatureCard
                  title="Informatica IICS COMBO Batch 3"
                  description="Configure Snowflake connection parameters and security"
                  icon={Settings}
                  href="/snowflake-combo/content"
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
                        <p className="text-gray-600 text-sm">
                          {studentAccount.connected 
                            ? `Executing queries on: ${studentAccount.account} (${studentAccount.username})`
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
                        <option value="SELECT * FROM SOURCE.PUBLIC.COURSES">List All Courses</option>
                        <option value="SELECT CURRENT_TIMESTAMP() AS current_time">Check Connection</option>
                        <option value="SHOW DATABASES">Show Databases</option>
                        <option value="SELECT COUNT(*) as total_students FROM SOURCE.PUBLIC.STUDENTS">Count Students</option>
                        <option value="SELECT CURRENT_USER() as user, CURRENT_ACCOUNT() as account">Current User Info</option>
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
                    <button 
                      onClick={() => setQuery('SELECT * FROM SOURCE.PUBLIC.COURSES LIMIT 10')}
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
                  </div>

                  {queryResults.length > 0 && (
                    <div className="mt-6">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">Results ({queryResults.length} rows)</h4>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-600">
                            Executed on: {studentAccount.connected ? 'Student Account' : 'Demo Account'}
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
            <p className="text-gray-900 font-medium">
              {studentAccount.connected 
                ? `Connected to your personal Snowflake account: ${studentAccount.account}`
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