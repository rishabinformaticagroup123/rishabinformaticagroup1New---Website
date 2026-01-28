"use client";

import { useState, useEffect } from 'react';
import { 
  AlertCircle, CheckCircle, RefreshCw, Key, 
  LogOut, Shield, Database, Globe, Clock, 
  TrendingUp, ExternalLink, ChevronRight
} from 'lucide-react';

// ==== SIMPLE PASSWORD AUTH COMPONENT ====
export function PasswordGate({ onAuthenticate }: { onAuthenticate: () => void }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Access codes (change these for students!)
  const ACCESS_CODES = {
    admin: "SNOW@2024#LEARN",
    instructor: "TEACH@SNOW123",
    student1: "STUDENT123",
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

// ==== AUTH AND CONNECTION LOGIC HOOK ====
export function useAuthAndConnection() {
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
  const [studentAccount, setStudentAccount] = useState<{
    connected: boolean;
    account?: string;
    username?: string;
    region?: string;
  }>({ connected: false });
  const [showConnectForm, setShowConnectForm] = useState(false);
  const [recentActivities, setRecentActivities] = useState([
    { id: 1, action: 'Course "Web Development" updated', time: 'Just now', type: 'update' },
    { id: 2, action: '3 new students enrolled', time: '5 minutes ago', type: 'enrollment' },
    { id: 3, action: 'Revenue report generated', time: '15 minutes ago', type: 'report' },
    { id: 4, action: 'Snowflake connection tested successfully', time: '1 hour ago', type: 'connection' },
    { id: 5, action: 'Course completion certificates issued', time: '2 hours ago', type: 'certificate' },
  ]);

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

  return {
    isAuthenticated,
    setIsAuthenticated,
    connectionStatus,
    connectionStats,
    studentAccount,
    setStudentAccount,
    showConnectForm,
    setShowConnectForm,
    recentActivities,
    setRecentActivities,
    checkConnectionStatus,
    handleDisconnectAccount,
    validateAccountFormat,
    getAccountFormatHint,
    StatusBadge
  };
}