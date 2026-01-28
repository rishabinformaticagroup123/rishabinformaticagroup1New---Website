// app/snowflake-learning/create-data/page.tsx
"use client";

import { useState, useCallback } from 'react';
import { 
  Upload, Database, FileText, Table, 
  Copy, RefreshCw, Download, Trash2,
  Plus, Settings, Eye, BarChart3,
  CheckCircle, AlertCircle, Sparkles
} from 'lucide-react';

type StudentTable = {
  id: string;
  name: string;
  database: string;
  schema: string;
  rows: number;
  size: string;
  created: string;
  type: 'uploaded' | 'generated' | 'cloned';
  description?: string;
};

export default function CreateDataPage() {
  const [activeTab, setActiveTab] = useState<'upload' | 'generate' | 'clone' | 'manage'>('upload');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [studentTables, setStudentTables] = useState<StudentTable[]>([
    {
      id: '1',
      name: 'MY_SALES',
      database: 'STUDENT_PRACTICE',
      schema: 'MY_SCHEMA',
      rows: 10000,
      size: '15 MB',
      created: '2024-01-15',
      type: 'uploaded',
      description: 'Monthly sales data uploaded from CSV'
    },
    {
      id: '2',
      name: 'CUSTOMER_PROFILES',
      database: 'STUDENT_PRACTICE',
      schema: 'MY_SCHEMA',
      rows: 5000,
      size: '8 MB',
      created: '2024-01-14',
      type: 'generated',
      description: 'Synthetic customer data for testing'
    }
  ]);

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    // Simulate upload
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const newTable: StudentTable = {
      id: Date.now().toString(),
      name: file.name.replace(/\.[^/.]+$/, "").toUpperCase(),
      database: 'STUDENT_PRACTICE',
      schema: 'MY_SCHEMA',
      rows: Math.floor(Math.random() * 100000),
      size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      created: new Date().toISOString().split('T')[0],
      type: 'uploaded',
      description: `Uploaded from ${file.name}`
    };
    
    setStudentTables(prev => [...prev, newTable]);
    setUploadedFile(null);
    setIsUploading(false);
  };

  const generateSyntheticData = async (type: string) => {
    setIsUploading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const tables = {
      'customers': {
        name: 'SYNTH_CUSTOMERS',
        rows: 100000,
        description: '100K synthetic customer records'
      },
      'transactions': {
        name: 'SYNTH_TRANSACTIONS',
        rows: 1000000,
        description: '1M synthetic transaction records'
      },
      'products': {
        name: 'SYNTH_PRODUCTS',
        rows: 10000,
        description: '10K synthetic product catalog'
      }
    };
    
    const tableInfo = tables[type as keyof typeof tables];
    const newTable: StudentTable = {
      id: Date.now().toString(),
      name: tableInfo.name,
      database: 'STUDENT_PRACTICE',
      schema: 'MY_SCHEMA',
      rows: tableInfo.rows,
      size: `${(tableInfo.rows * 0.5).toFixed(0)} MB`,
      created: new Date().toISOString().split('T')[0],
      type: 'generated',
      description: tableInfo.description
    };
    
    setStudentTables(prev => [...prev, newTable]);
    setIsUploading(false);
  };

  const cloneTable = async (sourceTable: string) => {
    setIsUploading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newTable: StudentTable = {
      id: Date.now().toString(),
      name: `${sourceTable}_CLONE`,
      database: 'STUDENT_PRACTICE',
      schema: 'MY_SCHEMA',
      rows: 50000,
      size: '75 MB',
      created: new Date().toISOString().split('T')[0],
      type: 'cloned',
      description: `Cloned from ${sourceTable}`
    };
    
    setStudentTables(prev => [...prev, newTable]);
    setIsUploading(false);
  };

  const deleteTable = (tableId: string) => {
    setStudentTables(prev => prev.filter(table => table.id !== tableId));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <Database className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold">Create Your Data</h1>
                  <p className="text-green-100 text-lg mt-1">
                    Upload, generate, and manage your own tables in Snowflake
                  </p>
                </div>
              </div>
              <p className="text-green-100 text-lg max-w-2xl">
                Build your own datasets alongside the massive sample data. Everything lives in your Snowflake account!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-8 overflow-x-auto">
          {[
            { id: 'upload', label: '📤 Upload CSV/Excel', icon: Upload },
            { id: 'generate', label: '⚡ Generate Data', icon: Sparkles },
            { id: 'clone', label: '📋 Clone Tables', icon: Copy },
            { id: 'manage', label: '📊 Manage Tables', icon: Table }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-4 font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="max-w-6xl mx-auto">
          {/* Upload Tab */}
          {activeTab === 'upload' && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Your Data</h2>
                <p className="text-gray-600">
                  Upload CSV, Excel, or JSON files to create tables in your Snowflake account
                </p>
              </div>

              <div className="max-w-2xl mx-auto">
                <div 
                  className={`border-2 border-dashed rounded-2xl p-12 text-center transition-colors ${
                    uploadedFile 
                      ? 'border-green-300 bg-green-50' 
                      : 'border-gray-300 hover:border-green-400 hover:bg-green-50/50'
                  }`}
                  onDrop={(e) => {
                    e.preventDefault();
                    const file = e.dataTransfer.files[0];
                    if (file) setUploadedFile(file);
                  }}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  
                  {uploadedFile ? (
                    <div>
                      <p className="text-lg font-medium text-gray-900 mb-2">
                        {uploadedFile.name}
                      </p>
                      <p className="text-gray-600 mb-4">
                        {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      <div className="flex gap-3 justify-center">
                        <button
                          onClick={() => handleFileUpload(uploadedFile)}
                          disabled={isUploading}
                          className="px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 disabled:opacity-50"
                        >
                          {isUploading ? 'Uploading...' : 'Create Table'}
                        </button>
                        <button
                          onClick={() => setUploadedFile(null)}
                          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p className="text-lg font-medium text-gray-900 mb-2">
                        Drag & drop your file here
                      </p>
                      <p className="text-gray-600 mb-6">or</p>
                      <label className="px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 cursor-pointer">
                        Browse Files
                        <input
                          type="file"
                          className="hidden"
                          accept=".csv,.xlsx,.xls,.json,.parquet"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) setUploadedFile(file);
                          }}
                        />
                      </label>
                      <p className="text-sm text-gray-500 mt-4">
                        Supports: CSV, Excel, JSON, Parquet (Max 100MB)
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-8 grid md:grid-cols-3 gap-6">
                  <div className="p-5 bg-blue-50 rounded-xl border border-blue-100">
                    <h3 className="font-bold text-lg mb-2">📊 Auto Schema Detection</h3>
                    <p className="text-gray-600 text-sm">
                      Snowflake automatically detects column types and creates the table schema
                    </p>
                  </div>
                  <div className="p-5 bg-green-50 rounded-xl border border-green-100">
                    <h3 className="font-bold text-lg mb-2">⚡ Fast Loading</h3>
                    <p className="text-gray-600 text-sm">
                      Files are loaded directly into Snowflake using internal stages
                    </p>
                  </div>
                  <div className="p-5 bg-purple-50 rounded-xl border border-purple-100">
                    <h3 className="font-bold text-lg mb-2">🔗 Query Immediately</h3>
                    <p className="text-gray-600 text-sm">
                      Start querying your data immediately after upload completes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Generate Data Tab */}
          {activeTab === 'generate' && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Generate Synthetic Data</h2>
              
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    type: 'customers',
                    title: 'Customer Data',
                    description: 'Generate realistic customer profiles with names, emails, addresses',
                    rows: '100,000',
                    color: 'from-blue-500 to-cyan-500'
                  },
                  {
                    type: 'transactions',
                    title: 'Transaction Data',
                    description: 'Sales transactions with dates, amounts, products, and statuses',
                    rows: '1,000,000',
                    color: 'from-green-500 to-emerald-500'
                  },
                  {
                    type: 'products',
                    title: 'Product Catalog',
                    description: 'Product inventory with SKUs, categories, prices, and stock',
                    rows: '10,000',
                    color: 'from-purple-500 to-pink-500'
                  }
                ].map((dataset) => (
                  <div key={dataset.type} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <div className={`h-2 bg-gradient-to-r ${dataset.color} rounded-full mb-4`}></div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{dataset.title}</h3>
                    <p className="text-gray-600 mb-4">{dataset.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {dataset.rows} rows
                      </span>
                      <button
                        onClick={() => generateSyntheticData(dataset.type)}
                        disabled={isUploading}
                        className="px-4 py-2 bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-lg hover:opacity-90 disabled:opacity-50"
                      >
                        {isUploading ? 'Generating...' : 'Generate'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-amber-50 rounded-xl border border-amber-200">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-6 h-6 text-amber-600 flex-shrink-0" />
                  <div>
                    <h4 className="font-bold text-lg mb-2">Why Generate Synthetic Data?</h4>
                    <p className="text-gray-700">
                      Perfect for testing queries, practicing joins, and building dashboards without 
                      real sensitive data. All data is randomly generated but follows realistic patterns.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Clone Tables Tab */}
          {activeTab === 'clone' && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Clone Existing Tables</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    source: 'SNOWFLAKE_SAMPLE_DATA.NYC_TLC.TRIPS',
                    name: 'NYC Taxi Trips',
                    rows: '1.7B',
                    description: 'Clone a subset of the massive taxi dataset for local testing'
                  },
                  {
                    source: 'BIGDATA_TPCH_SF1000.LINEITEM',
                    name: 'TPC-H Lineitem',
                    rows: '6B',
                    description: 'Create a smaller copy of the benchmark dataset'
                  },
                  {
                    source: 'STUDENT_PRACTICE.MY_SALES',
                    name: 'Your Sales Data',
                    rows: '10K',
                    description: 'Clone and modify your own tables'
                  },
                  {
                    source: 'Create Empty Table',
                    name: 'Blank Template',
                    rows: '0',
                    description: 'Start with an empty table and define your own schema'
                  }
                ].map((table) => (
                  <div key={table.source} className="border border-gray-200 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">{table.name}</h3>
                        <p className="text-sm text-gray-500 font-mono mt-1">{table.source}</p>
                      </div>
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {table.rows} rows
                      </span>
                    </div>
                    <p className="text-gray-600 mb-4">{table.description}</p>
                    <button
                      onClick={() => cloneTable(table.source)}
                      disabled={isUploading}
                      className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 disabled:opacity-50"
                    >
                      {isUploading ? 'Cloning...' : 'Clone to My Schema'}
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-5 bg-blue-50 rounded-xl">
                <h4 className="font-bold text-lg mb-3">🎯 Learning Use Cases:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Test queries on smaller subsets before running on full datasets</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Practice modifying data without affecting original tables</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Create personalized versions of sample datasets</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {/* Manage Tables Tab */}
          {activeTab === 'manage' && (
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Your Tables</h2>
                  <p className="text-gray-600">
                    Manage all tables you've created in your Snowflake account
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Total Tables</p>
                  <p className="text-2xl font-bold">{studentTables.length}</p>
                </div>
              </div>

              {studentTables.length === 0 ? (
                <div className="text-center py-12">
                  <Table className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-700 mb-2">No tables created yet</h3>
                  <p className="text-gray-500">Upload or generate data to get started</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Table Name</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Type</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Rows</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Size</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Created</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentTables.map((table) => (
                        <tr key={table.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <div>
                              <p className="font-medium">{table.name}</p>
                              <p className="text-sm text-gray-500 font-mono">
                                {table.database}.{table.schema}.{table.name}
                              </p>
                              {table.description && (
                                <p className="text-sm text-gray-600 mt-1">{table.description}</p>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              table.type === 'uploaded' ? 'bg-blue-100 text-blue-700' :
                              table.type === 'generated' ? 'bg-green-100 text-green-700' :
                              'bg-purple-100 text-purple-700'
                            }`}>
                              {table.type.charAt(0).toUpperCase() + table.type.slice(1)}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="font-medium">{table.rows.toLocaleString()}</span>
                          </td>
                          <td className="py-4 px-4">{table.size}</td>
                          <td className="py-4 px-4">{table.created}</td>
                          <td className="py-4 px-4">
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  // Open table in Snowflake
                                  const account = localStorage.getItem('student_snowflake_account');
                                  window.open(`https://${account}.snowflakecomputing.com`, '_blank');
                                }}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                                title="Open in Snowflake"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => {
                                  // Copy table name
                                  navigator.clipboard.writeText(`${table.database}.${table.schema}.${table.name}`);
                                }}
                                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                                title="Copy table name"
                              >
                                <Copy className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => deleteTable(table.id)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                title="Delete table"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="mt-8 grid md:grid-cols-3 gap-6">
                <div className="p-5 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                  <h4 className="font-bold text-lg mb-2">💡 Pro Tip</h4>
                  <p className="text-gray-700">
                    You can JOIN your uploaded data with the massive sample datasets! 
                    Try joining your sales data with the TPC-H benchmark data.
                  </p>
                </div>
                <div className="p-5 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
                  <h4 className="font-bold text-lg mb-2">📈 Analyze All Data</h4>
                  <p className="text-gray-700">
                    All your tables are in the same Snowflake account. Query across 
                    sample data AND your personal data in the same SQL statement.
                  </p>
                </div>
                <div className="p-5 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                  <h4 className="font-bold text-lg mb-2">🔗 Share with Class</h4>
                  <p className="text-gray-700">
                    You can share your created tables with classmates using Snowflake's 
                    data sharing features (ask your instructor for help).
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Integration Banner */}
        <div className="mt-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">✨ The Complete Experience</h3>
              <p className="text-blue-100">
                You now have BOTH massive sample data AND your own tables in the same Snowflake account. 
                Run queries across everything!
              </p>
            </div>
            <button
              onClick={() => {
                const account = localStorage.getItem('student_snowflake_account');
                window.open(`https://${account}.snowflakecomputing.com`, '_blank');
              }}
              className="px-8 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-colors whitespace-nowrap"
            >
              Open Snowflake & Start Querying →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}