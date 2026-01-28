"use client";

import { useState } from 'react';
import { 
  Copy, Clock, Share2, Zap, Layers, Lock, Globe, 
  Cloud, TrendingUp, Shield, Hospital, ShoppingCart, 
  Building2, Rocket 
} from 'lucide-react';
import { PasswordGate, useAuthAndConnection } from './snowflake-components/AuthAndConnection';
import { ConnectionModal } from './snowflake-components/ConnectionModal';
import { DashboardContent, FeatureCard, ScenarioCard, IndustryCard, TabButton } from './snowflake-components/DashboardContent';

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

export default function SnowflakeConnectPage() {
  const [query, setQuery] = useState(`SELECT * FROM SOURCE.PUBLIC.COURSES WHERE STATUS = 'ACTIVE' ORDER BY START_DATE`);
  const [queryResults, setQueryResults] = useState<any[]>([]);
  const [isExecuting, setIsExecuting] = useState(false);
  const [activeTab, setActiveTab] = useState<'basics' | 'scenarios' | 'industries' | 'custom'>('basics');
  
  // Connection form state
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

  // Use auth and connection hook
  const {
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
  } = useAuthAndConnection();

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

  // Show password gate if not authenticated
  if (!isAuthenticated) {
    return <PasswordGate onAuthenticate={() => setIsAuthenticated(true)} />;
  }

  return (
    <>
      <DashboardContent
        isAuthenticated={isAuthenticated}
        connectionStatus={connectionStatus}
        connectionStats={connectionStats}
        studentAccount={studentAccount}
        showConnectForm={showConnectForm}
        setShowConnectForm={setShowConnectForm}
        recentActivities={recentActivities}
        setRecentActivities={setRecentActivities}
        checkConnectionStatus={checkConnectionStatus}
        handleDisconnectAccount={handleDisconnectAccount}
        StatusBadge={StatusBadge}
        query={query}
        setQuery={setQuery}
        queryResults={queryResults}
        setQueryResults={setQueryResults}
        isExecuting={isExecuting}
        setIsExecuting={setIsExecuting}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        connectForm={connectForm}
        setConnectForm={setConnectForm}
        connectLoading={connectLoading}
        setConnectLoading={setConnectLoading}
        connectError={connectError}
        setConnectError={setConnectError}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        handleConnectAccount={handleConnectAccount}
        executeQuery={executeQuery}
        snowflakeScenarios={snowflakeScenarios}
        industryProjects={industryProjects}
      />
      
      <ConnectionModal
        showConnectForm={showConnectForm}
        setShowConnectForm={setShowConnectForm}
        connectForm={connectForm}
        setConnectForm={setConnectForm}
        connectLoading={connectLoading}
        setConnectLoading={setConnectLoading}
        connectError={connectError}
        setConnectError={setConnectError}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        handleConnectAccount={handleConnectAccount}
        studentAccount={studentAccount}
        setStudentAccount={setStudentAccount}
      />
    </>
  );
}