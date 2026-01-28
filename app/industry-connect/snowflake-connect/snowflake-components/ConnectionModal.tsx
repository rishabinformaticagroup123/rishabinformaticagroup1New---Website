"use client";

import { useState } from 'react';
import { 
  AlertCircle, CheckCircle, Settings, 
  Eye, EyeOff, ChevronRight, Shield, 
  Rocket, Sparkles, HelpCircle, Key,
  Database, Globe, Lock, Cloud, Zap,
  User, Target, Building2, ShoppingCart,
  Hospital, Award, Star, ExternalLink,
  Copy as CopyIcon, Info, MapPin
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
          <div>
            <h3 className="text-xl font-bold text-gray-900">Connect Your Snowflake Account</h3>
            <p className="text-sm text-gray-600 mt-1">Use your personal Snowflake trial account</p>
          </div>
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
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            ✕
          </button>
        </div>

        {/* UPDATED: Error display with HTML support */}
        {connectError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-red-100 rounded-lg flex-shrink-0">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-red-800 font-medium">Connection Failed</p>
                  <button
                    onClick={() => setConnectError('')}
                    className="text-red-600 hover:text-red-800 text-xs"
                  >
                    Clear
                  </button>
                </div>
                <div 
                  className="text-red-700 text-sm whitespace-pre-line"
                  dangerouslySetInnerHTML={{ __html: connectError }}
                />
                {(connectError.includes('account') || connectError.includes('region') || connectError.includes('Account/Region')) && (
                  <div className="mt-3 p-2 bg-red-100/50 border border-red-200 rounded">
                    <p className="text-red-800 text-xs font-medium mb-1">💡 Quick Fix:</p>
                    <ul className="text-red-700 text-xs space-y-1">
                      <li>• Check "View Account" in Snowflake for exact values</li>
                      <li>• Use Account locator (e.g., UP61953) not full identifier</li>
                      <li>• Region must match exactly (ap-south-1 for Mumbai)</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Quick Guide Banner */}
        <div className="mb-6 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-blue-800">Where to find these details?</p>
              <p className="text-xs text-blue-700">
                1. Login to Snowflake → 2. Click profile → 3. Select "View Account"
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleConnectAccount} className="space-y-4">
          {/* Account Field with Better Guidance */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700">
                Snowflake Account *
              </label>
              <button
                type="button"
                onClick={() => {
                  const exampleAccount = studentAccount.account || 'UP61953';
                  const exampleRegion = studentAccount.region || 'ap-south-1';
                  navigator.clipboard.writeText(`${exampleAccount}.${exampleRegion}`);
                  alert('Example format copied to clipboard!');
                }}
                className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
              >
                <CopyIcon className="w-3 h-3" />
                Copy example
              </button>
            </div>
            <input
              type="text"
              value={connectForm.account}
              onChange={(e) => setConnectForm({...connectForm, account: e.target.value})}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="UP61953 or YTNRGZD-SF30345"
              required
            />
            <div className="flex items-start gap-1 mt-1">
              <MapPin className="w-3 h-3 text-gray-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-gray-500">
                From Snowflake: <strong>Account identifier</strong> or <strong>Account locator</strong><br/>
                Example: <code className="bg-gray-100 px-1">UP61953</code> or <code className="bg-gray-100 px-1">YTNRGZD-SF30345</code>
              </p>
            </div>
          </div>

          {/* Region Field with Better Options */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700">
                Region * <span className="text-red-600">(MUST match your account)</span>
              </label>
              <span className="text-xs text-gray-500">Critical for connection</span>
            </div>
            <div className="flex gap-2">
              <select
                value={connectForm.region}
                onChange={(e) => setConnectForm({...connectForm, region: e.target.value})}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                required
              >
                <option value="">Select Region</option>
                <optgroup label="AWS Regions (Most Common)">
                  <option value="us-east-1">us-east-1 (US East - N. Virginia)</option>
                  <option value="us-west-2">us-west-2 (US West - Oregon)</option>
                  <option value="eu-central-1">eu-central-1 (EU - Frankfurt)</option>
                  <option value="ap-south-1">ap-south-1 (Asia Pacific - Mumbai)</option>
                  <option value="ap-southeast-1">ap-southeast-1 (Asia - Singapore)</option>
                  <option value="ap-southeast-2">ap-southeast-2 (Asia - Sydney)</option>
                  <option value="eu-west-1">eu-west-1 (EU - Ireland)</option>
                </optgroup>
                <optgroup label="Azure Regions">
                  <option value="azure_centralindia">azure_centralindia (Central India - Pune)</option>
                  <option value="azure_eastus2">azure_eastus2 (East US 2 - Virginia)</option>
                  <option value="azure_westus2">azure_westus2 (West US 2 - Washington)</option>
                </optgroup>
                <optgroup label="Google Cloud">
                  <option value="us-central1">us-central1 (US Central - Iowa)</option>
                  <option value="europe-west4">europe-west4 (Europe West - Netherlands)</option>
                </optgroup>
              </select>
            </div>
            <div className="flex items-start gap-1 mt-1">
              <Globe className="w-3 h-3 text-gray-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-gray-500">
                From Snowflake: <strong>Region</strong> field (e.g., "Asia Pacific (Mumbai)" = ap-south-1)
              </p>
            </div>
          </div>

          {/* Username Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username *
            </label>
            <input
              type="text"
              value={connectForm.username}
              onChange={(e) => setConnectForm({...connectForm, username: e.target.value})}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="STUDENT2"
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              From Snowflake: <strong>Login name</strong> (case-sensitive)
            </p>
          </div>

          {/* Password Field */}
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
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Your Snowflake login password (encrypted, stored temporarily)
            </p>
          </div>

          {/* Advanced Options */}
          <div className="border-t pt-4">
            <details className="group">
              <summary className="flex items-center justify-between cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
                <span className="flex items-center gap-2">
                  <Settings className="w-4 h-4" />
                  Advanced Options (Optional)
                </span>
                <ChevronRight className="w-4 h-4 group-open:rotate-90 transition-transform" />
              </summary>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Warehouse
                  </label>
                  <input
                    type="text"
                    value={connectForm.warehouse}
                    onChange={(e) => setConnectForm({...connectForm, warehouse: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    placeholder="COMPUTE_WH"
                  />
                  <p className="text-xs text-gray-500 mt-1">Default: COMPUTE_WH (available in trial accounts)</p>
                </div>
              </div>
            </details>
          </div>

          {/* Action Buttons */}
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
              className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all disabled:opacity-50 flex items-center justify-center gap-2 font-medium shadow-md"
            >
              {connectLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Testing Connection...
                </>
              ) : (
                <>
                  <Database className="w-5 h-5" />
                  Connect Account
                </>
              )}
            </button>
          </div>
        </form>

        {/* Comprehensive Help Section */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
            <HelpCircle className="w-4 h-4" />
            Complete Guide: How to find your Snowflake details
          </h4>
          
          <div className="space-y-4">
            {/* Step-by-Step Process */}
            <div className="bg-gradient-to-r from-blue-50 to-white p-4 rounded-lg border border-blue-100">
              <h5 className="text-sm font-bold text-blue-800 mb-2">🚀 Step-by-Step Process</h5>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">1</div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Login to Snowflake</p>
                    <a 
                      href="https://app.snowflake.com" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      app.snowflake.com <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">2</div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">View Account Details</p>
                    <p className="text-xs text-gray-600">
                      Click your profile (top-right) → Select "View Account"
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">3</div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">Copy These Values</p>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                      <div className="bg-blue-50 p-2 rounded">
                        <p className="text-xs font-medium text-blue-700">Account</p>
                        <code className="text-xs bg-white px-1 py-0.5 rounded">Account identifier</code>
                      </div>
                      <div className="bg-blue-50 p-2 rounded">
                        <p className="text-xs font-medium text-blue-700">Region</p>
                        <code className="text-xs bg-white px-1 py-0.5 rounded">Find in list</code>
                      </div>
                      <div className="bg-blue-50 p-2 rounded">
                        <p className="text-xs font-medium text-blue-700">Username</p>
                        <code className="text-xs bg-white px-1 py-0.5 rounded">Login name</code>
                      </div>
                      <div className="bg-blue-50 p-2 rounded">
                        <p className="text-xs font-medium text-blue-700">Password</p>
                        <span className="text-xs">Your password</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Region Mapping Help */}
            <div className="bg-gradient-to-r from-green-50 to-white p-4 rounded-lg border border-green-100">
              <h5 className="text-sm font-bold text-green-800 mb-2">📍 Region Mapping Guide</h5>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="text-xs font-medium text-green-700">If Snowflake shows:</p>
                  <ul className="text-xs text-green-600 space-y-1 mt-1">
                    <li>• Asia Pacific (Mumbai) → <code className="bg-green-100 px-1">ap-south-1</code></li>
                    <li>• Central India (Pune) → <code className="bg-green-100 px-1">azure_centralindia</code></li>
                    <li>• US East (N. Virginia) → <code className="bg-green-100 px-1">us-east-1</code></li>
                    <li>• EU (Frankfurt) → <code className="bg-green-100 px-1">eu-central-1</code></li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-medium text-green-700">Common for Students:</p>
                  <ul className="text-xs text-green-600 space-y-1 mt-1">
                    <li>• India → <code className="bg-green-100 px-1">ap-south-1</code> (AWS)</li>
                    <li>• US → <code className="bg-green-100 px-1">us-east-1</code> (AWS)</li>
                    <li>• Europe → <code className="bg-green-100 px-1">eu-central-1</code> (AWS)</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Trial Account Info */}
            <div className="bg-gradient-to-r from-purple-50 to-white p-4 rounded-lg border border-purple-100">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Rocket className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-purple-800 mb-1">🎓 Student Trial Account</h5>
                  <ul className="text-xs text-purple-700 space-y-1">
                    <li>• $400 free credits for 120 days</li>
                    <li>• No credit card required</li>
                    <li>• Full Snowflake Enterprise features</li>
                    <li>• Perfect for learning and projects</li>
                  </ul>
                  <a 
                    href="https://signup.snowflake.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-purple-600 hover:text-purple-800 flex items-center gap-1 mt-2"
                  >
                    Create free account <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Test Credentials */}
            <div className="bg-gradient-to-r from-gray-50 to-white p-4 rounded-lg border border-gray-200">
              <h5 className="text-sm font-bold text-gray-800 mb-2">🧪 Test Your Connection</h5>
              <p className="text-xs text-gray-600 mb-2">Try with these sample values (won't actually connect):</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setConnectForm({
                    account: 'UP61953',
                    region: 'ap-south-1',
                    username: 'STUDENT2',
                    password: 'TestPassword123',
                    warehouse: 'COMPUTE_WH',
                    database: '',
                    schema: '',
                    role: 'PUBLIC'
                  })}
                  className="text-xs px-3 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
                >
                  Fill Indian Student
                </button>
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
                  Fill US Student
                </button>
              </div>
            </div>

            {/* Support */}
            <div className="text-center pt-4 border-t">
              <p className="text-xs text-gray-500">
                Need help? Check your Snowflake account details or contact instructor
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}