"use client";

import { useState } from 'react';
import { 
  AlertCircle, CheckCircle, Settings, 
  Eye, EyeOff, ChevronRight, Shield, 
  Rocket, Sparkles, HelpCircle, Key,
  Database, Globe, Lock, Cloud, Zap,  // ← These are needed
  User, Target, Building2, ShoppingCart,
  Hospital, Award, Star
} from 'lucide-react';

interface ConnectFormData {
  account: string;
  region: string;
  username: string;
  password: string;
  warehouse: string;
  database: string;
  schema: string;
  role: string;
}

interface ConnectionModalProps {
  showConnectForm: boolean;
  setShowConnectForm: (show: boolean) => void;
  connectForm: ConnectFormData;
  setConnectForm: (form: ConnectFormData) => void;
  connectLoading: boolean;
  setConnectLoading: (loading: boolean) => void;
  connectError: string;
  setConnectError: (error: string) => void;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  handleConnectAccount: (e: React.FormEvent) => Promise<void>;
  studentAccount: {
    connected: boolean;
    account?: string;
    username?: string;
    region?: string;
  };
  setStudentAccount: (account: any) => void;
}

export function ConnectionModal({
  showConnectForm,
  setShowConnectForm,
  connectForm,
  setConnectForm,
  connectLoading,
  setConnectLoading,
  connectError,
  setConnectError,
  showPassword,
  setShowPassword,
  handleConnectAccount,
  studentAccount,
  setStudentAccount
}: ConnectionModalProps) {
  
  if (!showConnectForm) return null;

  return (
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
  );
}