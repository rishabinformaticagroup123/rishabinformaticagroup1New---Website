// app/snowflake-learning/big-data/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { 
  Database, Zap, BarChart3, Clock, 
  TrendingUp, Shield, Users, Cloud,
  CheckCircle, Play, ExternalLink, Copy
} from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BigDataExploration() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [activeDataset, setActiveDataset] = useState<string | null>(null);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Available datasets from Snowflake Sample Data
  const datasets = [
    {
      id: 'nyc_taxi',
      name: 'NYC Taxi Trips',
      description: '1.7 billion taxi trips in New York City',
      database: 'SNOWFLAKE_SAMPLE_DATA',
      schema: 'NYC_TLC',
      table: 'TRIPS',
      rows: '1,700,000,000',
      size: '1.2 TB',
      category: 'Transportation',
      icon: '🚕'
    },
    {
      id: 'weather',
      name: 'Weather Data',
      description: 'Global weather measurements',
      database: 'SNOWFLAKE_SAMPLE_DATA',
      schema: 'WEATHER',
      table: 'DAILY_14_TOTAL',
      rows: '100,000,000+',
      size: '850 GB',
      category: 'Environmental',
      icon: '🌤️'
    },
    {
      id: 'economy',
      name: 'Economic Indicators',
      description: 'Global economic time series',
      database: 'SNOWFLAKE_SAMPLE_DATA',
      schema: 'ECONOMY',
      table: 'USINDICATORS',
      rows: '50,000,000',
      size: '450 GB',
      category: 'Finance',
      icon: '📈'
    },
    {
      id: 'retail',
      name: 'Retail Sales',
      description: 'Global retail transactions',
      database: 'SNOWFLAKE_SAMPLE_DATA',
      schema: 'TPCH_SF1000',
      table: 'LINEITEM',
      rows: '6,000,000,000',
      size: '3.4 TB',
      category: 'Retail',
      icon: '🛒'
    }
  ];

  // Example queries for each dataset
  const exampleQueries = {
    nyc_taxi: `SELECT 
  DATE_TRUNC('month', pickup_datetime) as month,
  COUNT(*) as total_trips,
  AVG(trip_duration) as avg_duration,
  SUM(total_amount) as total_revenue
FROM SNOWFLAKE_SAMPLE_DATA.NYC_TLC.TRIPS
WHERE YEAR(pickup_datetime) = 2022
GROUP BY 1
ORDER BY 1;`,
    
    weather: `SELECT
  country,
  AVG(temp_avg) as avg_temperature,
  MAX(temp_max) as max_temperature,
  MIN(temp_min) as min_temperature
FROM SNOWFLAKE_SAMPLE_DATA.WEATHER.DAILY_14_TOTAL
WHERE date >= '2023-01-01'
GROUP BY country
ORDER BY avg_temperature DESC
LIMIT 10;`
  };

  const activateDataset = async (datasetId: string) => {
    setIsLoading(true);
    try {
      const dataset = datasets.find(d => d.id === datasetId);
      if (!dataset) return;

      // Call your API to create the share
      const response = await fetch('/api/activate-share', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          database: dataset.database,
          schema: dataset.schema,
          table: dataset.table
        })
      });

      const data = await response.json();
      
      if (data.success) {
        setActiveDataset(datasetId);
        setShareUrl(data.shareUrl);
        
        // Store in localStorage for session
        localStorage.setItem('active_bigdata_dataset', datasetId);
        localStorage.setItem('bigdata_share_url', data.shareUrl);
      }
    } catch (error) {
      console.error('Failed to activate dataset:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openSnowflake = () => {
    const account = localStorage.getItem('student_snowflake_account');
    const region = localStorage.getItem('student_snowflake_region') || 'us-east-1';
    window.open(`https://${account}.${region}.snowflakecomputing.com`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-violet-700 text-white">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <Database className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold">Big Data Exploration</h1>
                  <p className="text-purple-100 text-lg mt-1">
                    Query enterprise-scale datasets with billions of rows
                  </p>
                </div>
              </div>
              <p className="text-purple-100 text-lg max-w-2xl">
                Access real Snowflake sample data. No setup required. Your queries run directly in Snowflake.
              </p>
            </div>
          </div>

          {/* Stats Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <p className="text-purple-200 text-sm">Total Available Rows</p>
              <p className="text-xl font-bold">7.85B+</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <p className="text-purple-200 text-sm">Largest Dataset</p>
              <p className="text-xl font-bold">6B rows</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <p className="text-purple-200 text-sm">Data Volume</p>
              <p className="text-xl font-bold">5.9 TB</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <p className="text-purple-200 text-sm">Query Speed</p>
              <p className="text-xl font-bold">~5 seconds</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* How It Works */}
        <div className="mb-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">✨ How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">1. Choose Dataset</h3>
              <p className="text-gray-600">Select from Snowflake's real sample datasets</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">2. Activate Share</h3>
              <p className="text-gray-600">We create a secure data share to your account</p>
            </div>
            <div className="text-center p-4">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">3. Query Directly</h3>
              <p className="text-gray-600">Run queries in Snowflake UI with full power</p>
            </div>
          </div>
        </div>

        {/* Dataset Selection */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">📊 Available Datasets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {datasets.map((dataset) => (
              <div 
                key={dataset.id}
                className={`bg-white rounded-2xl shadow-lg border-2 p-6 transition-all duration-300 ${
                  activeDataset === dataset.id 
                    ? 'border-purple-500 bg-purple-50' 
                    : 'border-gray-100 hover:shadow-xl hover:-translate-y-1'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{dataset.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{dataset.name}</h3>
                      <p className="text-gray-600">{dataset.description}</p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                    {dataset.rows} rows
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm text-gray-500">Database</p>
                    <p className="font-mono text-sm">{dataset.database}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-sm text-gray-500">Size</p>
                    <p className="font-medium">{dataset.size}</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => activateDataset(dataset.id)}
                    disabled={isLoading}
                    className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                      activeDataset === dataset.id
                        ? 'bg-green-100 text-green-700'
                        : 'bg-purple-600 text-white hover:bg-purple-700'
                    }`}
                  >
                    {activeDataset === dataset.id ? (
                      <span className="flex items-center justify-center gap-2">
                        <CheckCircle className="w-4 h-4" /> Activated
                      </span>
                    ) : isLoading ? (
                      'Activating...'
                    ) : (
                      'Activate Dataset'
                    )}
                  </button>
                  
                  {activeDataset === dataset.id && (
                    <button
                      onClick={openSnowflake}
                      className="py-3 px-4 bg-gray-900 text-white rounded-xl font-medium hover:bg-black transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Dataset Info */}
        {activeDataset && (
          <div className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-100 rounded-xl">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  ✅ Dataset Activated Successfully!
                </h3>
                <p className="text-gray-700 mb-4">
                  The dataset is now available in your Snowflake account. 
                  Follow these steps to start querying:
                </p>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm">
                      1
                    </div>
                    <p className="text-gray-700">Open Snowflake Web UI (button below)</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm">
                      2
                    </div>
                    <p className="text-gray-700">Navigate to "Shared Data" in left sidebar</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm">
                      3
                    </div>
                    <p className="text-gray-700">Look for the shared dataset and start querying!</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={openSnowflake}
                    className="px-6 py-3 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 transition-colors flex items-center gap-2"
                  >
                    Open Snowflake UI <ExternalLink className="w-4 h-4" />
                  </button>
                  
                  {shareUrl && (
                    <button
                      onClick={() => copyToClipboard(shareUrl)}
                      className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2"
                    >
                      {copied ? 'Copied!' : 'Copy Share URL'} <Copy className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Example Queries */}
        {activeDataset && exampleQueries[activeDataset as keyof typeof exampleQueries] && (
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">💡 Example Query</h3>
            <div className="bg-gray-900 rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-300 text-sm">Try this query in Snowflake:</p>
                <button
                  onClick={() => copyToClipboard(exampleQueries[activeDataset as keyof typeof exampleQueries])}
                  className="text-sm text-gray-400 hover:text-white flex items-center gap-1"
                >
                  <Copy className="w-3 h-3" /> Copy
                </button>
              </div>
              <pre className="text-green-400 text-sm overflow-x-auto">
                {exampleQueries[activeDataset as keyof typeof exampleQueries]}
              </pre>
            </div>
          </div>
        )}

        {/* Benefits */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6">🎯 Educational Benefits</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Zap className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Real Enterprise Scale</h4>
                <p className="text-gray-600">Learn on actual billion-row datasets, not toy examples</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Zero Setup Required</h4>
                <p className="text-gray-600">No data loading, no storage costs, no configuration</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Real Performance</h4>
                <p className="text-gray-600">Experience true Snowflake speed on massive datasets</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Users className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Career-Ready Skills</h4>
                <p className="text-gray-600">Learn skills that directly apply to real-world jobs</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}