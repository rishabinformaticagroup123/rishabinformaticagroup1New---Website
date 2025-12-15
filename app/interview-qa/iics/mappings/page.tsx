'use client';

import { Download, Search, BookOpen, FileText, Award, Star, Clock, Filter, Layers, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export default function MappingDocsPage() {
  const documents = [
    {
      id: 'aggregator',
      title: 'Aggregator Transformation Master Guide',
      description: 'Complete guide to SUM, AVG, COUNT, MIN, MAX operations with performance optimization',
      difficulty: 'Intermediate',
      lastUpdated: 'March 15, 2024',
      downloadLink: '/mapping-docs/aggregator_transformation.pdf',
      pages: 25,
      rating: 4.9,
      downloads: '2,500+',
      icon: '📊',
      contentPreview: [
        'Group By operations with multiple fields',
        'Aggregate functions with detailed examples',
        'Having clause implementation',
        'Sorted input optimization techniques',
        'Incremental aggregation strategies',
        'Performance tuning best practices',
        'Common errors and troubleshooting',
        'IICS vs PowerCenter differences'
      ],
      prerequisites: ['Basic SQL knowledge', 'Informatica fundamentals'],
      timeToComplete: '2-3 hours'
    },
    {
      id: 'rank',
      title: 'Rank Transformation Deep Dive',
      description: 'Master ranking operations with top/bottom N, dense rank, and competition scenarios',
      difficulty: 'Intermediate',
      lastUpdated: 'March 10, 2024',
      downloadLink: '/mapping-docs/rank_transformation.pdf',
      pages: 18,
      rating: 4.8,
      downloads: '1,800+',
      icon: '🏆',
      contentPreview: [
        'Top N and Bottom N ranking',
        'Dense rank vs regular rank',
        'Competition scenario implementations',
        'Performance optimization for large datasets',
        'Rank cache configuration',
        'Real-world business cases',
        'Advanced ranking patterns',
        'Troubleshooting common issues'
      ],
      prerequisites: ['Aggregator transformation basics'],
      timeToComplete: '1.5-2 hours'
    },
    {
      id: 'sequence',
      title: 'Sequence Generator Complete Guide',
      description: 'Complete reference for generating unique sequences and surrogate keys',
      difficulty: 'Beginner',
      lastUpdated: 'March 5, 2024',
      downloadLink: '/mapping-docs/sequence_generator.pdf',
      pages: 15,
      rating: 4.7,
      downloads: '1,200+',
      icon: '🔢',
      contentPreview: [
        'Surrogate key generation patterns',
        'Reset and recycle configurations',
        'Performance considerations',
        'Cluster vs standalone environments',
        'Best practices for data warehousing',
        'Common pitfalls and solutions',
        'Integration with SCD Type 2',
        'Real-time sequence generation'
      ],
      prerequisites: ['Basic ETL concepts'],
      timeToComplete: '1-1.5 hours'
    }
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [expandedDoc, setExpandedDoc] = useState<string | null>(null);

  const filteredDocs = documents.filter(doc => 
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-medium mb-6">
          <BookOpen size={16} />
          Informatica Transformation Guides
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Essential PDF Documentation
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Download comprehensive PDF guides for the most critical Informatica transformations
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-8">
        <div className="relative max-w-xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search transformation guides..."
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-800 dark:text-white">{documents.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">PDF Guides</div>
            </div>
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900">
              <FileText className="text-blue-500" size={24} />
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-800 dark:text-white">5,500+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Downloads</div>
            </div>
            <div className="p-2 rounded-lg bg-green-100 dark:bg-green-900">
              <Download className="text-green-500" size={24} />
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-gray-800 dark:text-white">4.8</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Average Rating</div>
            </div>
            <div className="p-2 rounded-lg bg-yellow-100 dark:bg-yellow-900">
              <Star className="text-yellow-500" size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Documents List */}
      <div className="space-y-6">
        {filteredDocs.map((doc) => (
          <div key={doc.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow duration-300">
            {/* Document Header */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-3xl">{doc.icon}</div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          doc.difficulty === 'Beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                          doc.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                          'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                        }`}>
                          {doc.difficulty}
                        </span>
                        <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
                          {doc.pages} pages
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    {doc.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {doc.description}
                  </p>
                </div>
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Star size={16} className="text-yellow-500" />
                    <span className="font-medium text-gray-700 dark:text-gray-300">{doc.rating}</span>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-500">Rating</div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Download size={16} className="text-green-500" />
                    <span className="font-medium text-gray-700 dark:text-gray-300">{doc.downloads}</span>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-500">Downloads</div>
                </div>
                
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Clock size={16} className="text-blue-500" />
                    <span className="font-medium text-gray-700 dark:text-gray-300">{doc.timeToComplete}</span>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-500">Study Time</div>
                </div>
              </div>
              
              {/* Expandable Content */}
              <button
                onClick={() => setExpandedDoc(expandedDoc === doc.id ? null : doc.id)}
                className="flex items-center justify-between w-full p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors mb-4"
              >
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  {expandedDoc === doc.id ? 'Hide Details' : 'Show Details'}
                </span>
                {expandedDoc === doc.id ? (
                  <ChevronUp size={20} className="text-gray-500" />
                ) : (
                  <ChevronDown size={20} className="text-gray-500" />
                )}
              </button>
              
              {expandedDoc === doc.id && (
                <div className="space-y-4">
                  {/* Content Preview */}
                  <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">What's Inside:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {doc.contentPreview.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
                          <span className="text-gray-600 dark:text-gray-400">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Prerequisites */}
                  <div>
                    <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Prerequisites:</h4>
                    <div className="flex flex-wrap gap-2">
                      {doc.prerequisites.map((req, idx) => (
                        <span key={idx} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Document Info */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-1">Document Information</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Updated: {doc.lastUpdated} • Format: PDF
                        </p>
                      </div>
                      <Award className="text-blue-500" size={24} />
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Download Button */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-6">
              <a
                href={doc.downloadLink}
                download
                className="flex items-center justify-center gap-3 w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold transition-all transform hover:scale-105 duration-200"
              >
                <Download size={20} />
                Download {doc.title} (PDF)
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* How to Use Section */}
      <div className="mt-12 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          How to Use These Guides
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mx-auto mb-4">
              <span className="text-xl">1</span>
            </div>
            <h3 className="font-bold text-gray-800 dark:text-white mb-2">Download</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Click the download button to get the complete PDF guide
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mx-auto mb-4">
              <span className="text-xl">2</span>
            </div>
            <h3 className="font-bold text-gray-800 dark:text-white mb-2">Study</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Read through the examples and understand the concepts
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mx-auto mb-4">
              <span className="text-xl">3</span>
            </div>
            <h3 className="font-bold text-gray-800 dark:text-white mb-2">Practice</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Apply the techniques in your Informatica environment
            </p>
          </div>
        </div>
      </div>

      {/* File Setup Instructions */}
      <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
        <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">File Setup Instructions</h3>
        <div className="space-y-4">
          <div className="bg-gray-900 rounded-lg p-4 text-gray-300 font-mono text-sm overflow-x-auto">
            <div>📁 public/</div>
            <div className="ml-4">📁 mapping-docs/</div>
            <div className="ml-8 text-green-400">📄 aggregator_transformation.pdf</div>
            <div className="ml-8 text-green-400">📄 rank_transformation.pdf</div>
            <div className="ml-8 text-green-400">📄 sequence_generator.pdf</div>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Place these 3 PDF files in the <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">public/mapping-docs/</code> folder.
            The download links will work automatically once files are in place.
          </p>
        </div>
      </div>
    </div>
  );
}