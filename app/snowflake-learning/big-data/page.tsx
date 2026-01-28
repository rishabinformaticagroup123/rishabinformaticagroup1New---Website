// app/snowflake-learning/big-data/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { 
  Database, Zap, BarChart3, Clock, 
  TrendingUp, Shield, Users, Cloud,
  CheckCircle, Play, ExternalLink, Copy,
  Search, Filter, AlertCircle, RefreshCw
} from 'lucide-react';
import { useRouter } from 'next/navigation';

// Type definitions for better TypeScript support
type Dataset = {
  id: string;
  name: string;
  description: string;
  database: string;
  schema: string;
  table: string;
  rows: string;
  size: string;
  category: string;
  icon: string;
  exampleQuery: string;
  popularity?: number;
  lastAccessed?: string;
};

export default function BigDataExploration() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [filteredDatasets, setFilteredDatasets] = useState<Dataset[]>([]);
  const [activeDataset, setActiveDataset] = useState<string | null>(null);
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activatingId, setActivatingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Initialize datasets
  useEffect(() => {
    const loadDatasets = () => {
      setIsLoading(true);
      setError(null);
      
      // You can load these from an API or hardcode them
      const initialDatasets: Dataset[] = [
        {
          id: 'nyc_taxi',
          name: 'NYC Taxi Trips',
          description: '1.7 billion taxi trips in New York City (2009-2023)',
          database: 'SNOWFLAKE_SAMPLE_DATA',
          schema: 'NYC_TLC',
          table: 'TRIPS',
          rows: '1,700,000,000',
          size: '1.2 TB',
          category: 'Transportation',
          icon: '🚕',
          exampleQuery: `SELECT 
  DATE_TRUNC('month', pickup_datetime) as month,
  COUNT(*) as total_trips,
  AVG(trip_duration) as avg_duration,
  SUM(total_amount) as total_revenue
FROM SNOWFLAKE_SAMPLE_DATA.NYC_TLC.TRIPS
WHERE YEAR(pickup_datetime) = 2022
GROUP BY 1
ORDER BY 1;`,
          popularity: 95,
          lastAccessed: '2024-01-15'
        },
        {
          id: 'weather',
          name: 'Global Weather Data',
          description: 'Global weather measurements from 2010-2023',
          database: 'SNOWFLAKE_SAMPLE_DATA',
          schema: 'WEATHER',
          table: 'DAILY_14_TOTAL',
          rows: '100,000,000+',
          size: '850 GB',
          category: 'Environmental',
          icon: '🌤️',
          exampleQuery: `SELECT
  country,
  AVG(temp_avg) as avg_temperature,
  MAX(temp_max) as max_temperature,
  MIN(temp_min) as min_temperature
FROM SNOWFLAKE_SAMPLE_DATA.WEATHER.DAILY_14_TOTAL
WHERE date >= '2023-01-01'
GROUP BY country
ORDER BY avg_temperature DESC
LIMIT 10;`,
          popularity: 85,
          lastAccessed: '2024-01-10'
        },
        {
          id: 'economy',
          name: 'Economic Indicators',
          description: 'US economic time series data (1947-2023)',
          database: 'SNOWFLAKE_SAMPLE_DATA',
          schema: 'ECONOMY',
          table: 'USINDICATORS',
          rows: '50,000,000',
          size: '450 GB',
          category: 'Finance',
          icon: '📈',
          exampleQuery: `SELECT 
  year,
  month,
  gdp,
  unemployment_rate,
  inflation_rate
FROM SNOWFLAKE_SAMPLE_DATA.ECONOMY.USINDICATORS
WHERE year >= 2010
ORDER BY year DESC, month DESC
LIMIT 100;`,
          popularity: 75,
          lastAccessed: '2024-01-05'
        },
        {
          id: 'retail',
          name: 'Retail Sales Data',
          description: 'TPC-H benchmark retail dataset',
          database: 'SNOWFLAKE_SAMPLE_DATA',
          schema: 'TPCH_SF1000',
          table: 'LINEITEM',
          rows: '6,000,000,000',
          size: '3.4 TB',
          category: 'Retail',
          icon: '🛒',
          exampleQuery: `SELECT 
  l_shipdate,
  COUNT(*) as total_items,
  SUM(l_quantity) as total_quantity,
  SUM(l_extendedprice) as total_revenue
FROM SNOWFLAKE_SAMPLE_DATA.TPCH_SF1000.LINEITEM
WHERE l_shipdate >= '1998-01-01'
GROUP BY l_shipdate
ORDER BY l_shipdate
LIMIT 100;`,
          popularity: 80,
          lastAccessed: '2024-01-12'
        },
        {
          id: 'web_analytics',
          name: 'Web Analytics',
          description: 'TPC-DS benchmark web analytics dataset',
          database: 'SNOWFLAKE_SAMPLE_DATA',
          schema: 'TPCDS_SF100TCL',
          table: 'WEB_SALES',
          rows: '2,800,000,000',
          size: '1.8 TB',
          category: 'Analytics',
          icon: '🌐',
          exampleQuery: `SELECT 
  ws_sold_date_sk as date,
  COUNT(DISTINCT ws_order_number) as orders,
  SUM(ws_net_paid) as revenue
FROM SNOWFLAKE_SAMPLE_DATA.TPCDS_SF100TCL.WEB_SALES
WHERE ws_sold_date_sk BETWEEN 2450000 AND 2451000
GROUP BY ws_sold_date_sk
ORDER BY revenue DESC
LIMIT 10;`,
          popularity: 70,
          lastAccessed: '2024-01-08'
        },
        {
          id: 'sensor_data',
          name: 'IoT Sensor Data',
          description: 'Simulated IoT sensor readings',
          database: 'SNOWFLAKE_SAMPLE_DATA',
          schema: 'IOT',
          table: 'SENSOR_READINGS',
          rows: '500,000,000',
          size: '350 GB',
          category: 'IoT',
          icon: '📡',
          exampleQuery: `SELECT 
  sensor_id,
  AVG(temperature) as avg_temp,
  AVG(humidity) as avg_humidity,
  COUNT(*) as readings
FROM SNOWFLAKE_SAMPLE_DATA.IOT.SENSOR_READINGS
WHERE reading_time >= DATEADD(hour, -24, CURRENT_TIMESTAMP())
GROUP BY sensor_id
ORDER BY avg_temp DESC;`,
          popularity: 65,
          lastAccessed: '2024-01-03'
        }
      ];

      // Check localStorage for previously activated dataset
      const savedDataset = localStorage.getItem('active_bigdata_dataset');
      const savedShareUrl = localStorage.getItem('bigdata_share_url');
      
      if (savedDataset) {
        setActiveDataset(savedDataset);
      }
      if (savedShareUrl) {
        setShareUrl(savedShareUrl);
      }

      setDatasets(initialDatasets);
      setFilteredDatasets(initialDatasets);
      setIsLoading(false);
    };

    // Add a small delay to show loading state (better UX)
    const timer = setTimeout(() => {
      loadDatasets();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Filter datasets based on search and category
  useEffect(() => {
    let filtered = datasets;
    
    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(dataset => dataset.category === selectedCategory);
    }
    
    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(dataset => 
        dataset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dataset.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dataset.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredDatasets(filtered);
  }, [searchTerm, selectedCategory, datasets]);

  const activateDataset = async (datasetId: string) => {
    setActivatingId(datasetId);
    setError(null);
    
    try {
      const dataset = datasets.find(d => d.id === datasetId);
      if (!dataset) {
        throw new Error('Dataset not found');
      }

      // Call your API to create the share
      const response = await fetch('/api/activate-share', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          database: dataset.database,
          schema: dataset.schema,
          table: dataset.table,
          datasetName: dataset.name
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to activate dataset');
      }
      
      if (data.success) {
        setActiveDataset(datasetId);
        setShareUrl(data.shareUrl);
        
        // Store in localStorage for session
        localStorage.setItem('active_bigdata_dataset', datasetId);
        localStorage.setItem('bigdata_share_url', data.shareUrl);
        
        // Update dataset popularity (simulated)
        setDatasets(prev => prev.map(d => 
          d.id === datasetId 
            ? { ...d, popularity: (d.popularity || 0) + 5, lastAccessed: new Date().toISOString().split('T')[0] }
            : d
        ));
      }
    } catch (error) {
      console.error('Failed to activate dataset:', error);
      setError(error instanceof Error ? error.message : 'Failed to activate dataset');
    } finally {
      setActivatingId(null);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const openSnowflake = () => {
    const account = localStorage.getItem('student_snowflake_account');
    const region = localStorage.getItem('student_snowflake_region') || 'us-east-1';
    if (account) {
      window.open(`https://${account}.${region}.snowflakecomputing.com`, '_blank');
    } else {
      setError('No Snowflake account found. Please connect your account first.');
    }
  };

  const categories = ['all', ...new Set(datasets.map(d => d.category))];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading big data explorer...</p>
          <p className="text-sm text-gray-500 mt-2">Discovering available datasets</p>
        </div>
      </div>
    );
  }

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
                  <h1 className="text-3xl md:text-4xl font-bold">Big Data Explorer</h1>
                  <p className="text-purple-100 text-lg mt-1">
                    Query enterprise-scale datasets with billions of rows
                  </p>
                </div>
              </div>
              <p className="text-purple-100 text-lg max-w-2xl">
                Access real Snowflake sample data. No setup required. Your queries run directly in Snowflake.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => window.location.reload()}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                title="Refresh datasets"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Stats Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <p className="text-purple-200 text-sm">Available Datasets</p>
              <p className="text-xl font-bold">{datasets.length}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <p className="text-purple-200 text-sm">Total Rows</p>
              <p className="text-xl font-bold">10B+</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <p className="text-purple-200 text-sm">Data Volume</p>
              <p className="text-xl font-bold">8.1 TB</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <p className="text-purple-200 text-sm">Active Users</p>
              <p className="text-xl font-bold">{activeDataset ? '1' : '0'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Error Display */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <p className="text-red-700">{error}</p>
              <button 
                onClick={() => setError(null)}
                className="ml-auto text-red-600 hover:text-red-800"
              >
                ×
              </button>
            </div>
          </div>
        )}

        {/* Search and Filter */}
        <div className="mb-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search datasets by name, description, or category..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex items-center gap-2 overflow-x-auto">
              <Filter className="w-5 h-5 text-gray-500" />
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category === 'all' ? 'All Categories' : category}
                  {category !== 'all' && (
                    <span className="ml-1 text-xs opacity-75">
                      ({datasets.filter(d => d.category === category).length})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-3">
            Showing {filteredDatasets.length} of {datasets.length} datasets
          </p>
        </div>

        {/* How It Works */}
        <div className="mb-8 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">✨ How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-blue-100">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">1️⃣</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Choose Dataset</h3>
              <p className="text-gray-600">Select from real enterprise datasets</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-blue-100">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">2️⃣</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Click Activate</h3>
              <p className="text-gray-600">We securely share it to your account</p>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-5 border border-blue-100">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">3️⃣</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Query in Snowflake</h3>
              <p className="text-gray-600">Run SQL directly in Snowflake UI</p>
            </div>
          </div>
        </div>

        {/* Dataset Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            📊 Available Datasets {filteredDatasets.length > 0 && `(${filteredDatasets.length})`}
          </h2>
          
          {filteredDatasets.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-700 mb-2">No datasets found</h3>
              <p className="text-gray-500">Try a different search term or category</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredDatasets.map((dataset) => (
                <div 
                  key={dataset.id}
                  className={`bg-white rounded-2xl shadow-lg border-2 p-6 transition-all duration-300 ${
                    activeDataset === dataset.id 
                      ? 'border-purple-500 bg-purple-50 shadow-purple-100' 
                      : 'border-gray-100 hover:shadow-xl hover:-translate-y-1'
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{dataset.icon}</div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{dataset.name}</h3>
                        <p className="text-gray-600">{dataset.description}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                        {dataset.rows} rows
                      </span>
                      {dataset.popularity && (
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                          <TrendingUp className="w-4 h-4" />
                          {dataset.popularity}% popular
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm text-gray-500">Database</p>
                      <p className="font-mono text-sm truncate">{dataset.database}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm text-gray-500">Size</p>
                      <p className="font-medium">{dataset.size}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => activateDataset(dataset.id)}
                      disabled={activatingId === dataset.id}
                      className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                        activeDataset === dataset.id
                          ? 'bg-green-100 text-green-700'
                          : activatingId === dataset.id
                          ? 'bg-purple-400 text-white cursor-not-allowed'
                          : 'bg-purple-600 text-white hover:bg-purple-700'
                      }`}
                    >
                      {activeDataset === dataset.id ? (
                        <>
                          <CheckCircle className="w-4 h-4" /> Activated
                        </>
                      ) : activatingId === dataset.id ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Activating...
                        </>
                      ) : (
                        'Activate Dataset'
                      )}
                    </button>
                    
                    {activeDataset === dataset.id && (
                      <>
                        <button
                          onClick={openSnowflake}
                          className="py-3 px-4 bg-gray-900 text-white rounded-xl font-medium hover:bg-black transition-colors flex items-center gap-2"
                          title="Open Snowflake UI"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => copyToClipboard(dataset.exampleQuery)}
                          className="py-3 px-4 bg-blue-100 text-blue-700 rounded-xl font-medium hover:bg-blue-200 transition-colors flex items-center gap-2"
                          title="Copy example query"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Active Dataset Panel */}
        {activeDataset && (() => {
          const dataset = datasets.find(d => d.id === activeDataset);
          if (!dataset) return null;
          
          return (
            <div className="mb-8 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-100 rounded-xl">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        ✅ {dataset.name} Activated!
                      </h3>
                      <p className="text-gray-700">
                        Dataset is now available in your Snowflake account as a data share.
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        Shared as: bigdata_{dataset.id}_{Date.now().toString(36)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="bg-white/60 rounded-lg p-4">
                      <h4 className="font-bold text-gray-900 mb-2">📋 Next Steps:</h4>
                      <ol className="space-y-3">
                        <li className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            1
                          </div>
                          <div>
                            <p className="font-medium">Open Snowflake Web UI</p>
                            <p className="text-sm text-gray-500">
                              Click the button below to open your Snowflake account
                            </p>
                          </div>
                        </li>
                        <li className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            2
                          </div>
                          <div>
                            <p className="font-medium">Navigate to "Data" → "Shared Data"</p>
                            <p className="text-sm text-gray-500">
                              Find the dataset in your shared data section
                            </p>
                          </div>
                        </li>
                        <li className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            3
                          </div>
                          <div>
                            <p className="font-medium">Start Querying!</p>
                            <p className="text-sm text-gray-500">
                              Use the example query below or write your own SQL
                            </p>
                          </div>
                        </li>
                      </ol>
                    </div>

                    <div className="bg-gray-900 rounded-xl p-4">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <p className="text-gray-300 text-sm">Example Query</p>
                        </div>
                        <button
                          onClick={() => copyToClipboard(dataset.exampleQuery)}
                          className="text-sm text-gray-400 hover:text-white flex items-center gap-1"
                        >
                          <Copy className="w-3 h-3" /> {copied ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                      <pre className="text-green-400 text-sm overflow-x-auto whitespace-pre-wrap mt-2">
                        {dataset.exampleQuery}
                      </pre>
                    </div>

                    <div className="flex gap-3 flex-wrap">
                      <button
                        onClick={openSnowflake}
                        className="px-6 py-3 bg-green-600 text-white font-medium rounded-xl hover:bg-green-700 transition-colors flex items-center gap-2"
                      >
                        Open Snowflake UI <ExternalLink className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={() => {
                          const account = localStorage.getItem('student_snowflake_account');
                          const region = localStorage.getItem('student_snowflake_region') || 'us-east-1';
                          copyToClipboard(`https://${account}.${region}.snowflakecomputing.com`);
                        }}
                        className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2"
                      >
                        Copy Snowflake URL <Copy className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={() => setActiveDataset(null)}
                        className="px-6 py-3 bg-red-50 text-red-600 font-medium rounded-xl hover:bg-red-100 transition-colors"
                      >
                        Deactivate
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Educational Benefits */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6">🎯 Why This Matters for Your Learning</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Zap className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Real Enterprise Scale</h4>
                <p className="text-gray-600">
                  Learn on actual billion-row datasets used by Fortune 500 companies, 
                  not toy examples or simulations.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Zero Setup Required</h4>
                <p className="text-gray-600">
                  No data loading, no storage costs, no configuration. 
                  Just activate and query immediately.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Real Performance Experience</h4>
                <p className="text-gray-600">
                  Experience true Snowflake speed on massive datasets. 
                  See how queries scale with data size.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-amber-100 rounded-lg">
                <Users className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Career-Ready Skills</h4>
                <p className="text-gray-600">
                  These are the exact datasets used in real data engineering and 
                  analytics jobs. Build portfolio-worthy experience.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-gray-50 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <BarChart3 className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1">Pro Tip for Students</h4>
                <p className="text-gray-600">
                  Start with the NYC Taxi dataset (1.7B rows). Try counting all rows, 
                  then aggregating by hour, day, month. Notice how Snowflake handles 
                  billions of rows in seconds!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}