'use client'

import { useState } from 'react'
import { Download, Search, ChevronDown, ChevronRight } from 'lucide-react'

export default function MappingDocsPage() {
  const categories = [
    {
      id: 'transformations',
      name: 'Transformations',
      docs: [
        {
          id: 'sorter',
          title: 'Sorter Transformation',
          description: 'Complete guide to sorting data in PowerCenter and IICS',
          difficulty: 'Beginner',
          lastUpdated: '2023-11-15',
          downloadLink: '/mapping-docs/SORTER_TRANSFORMATION_IICS_COMBO.pdf',
          pages: 12,
          contentPreview: [
            'Active & Connected transformation',
            'Sort data in ascending/descending order',
            'Case sensitive/insensitive options',
            'Null value handling',
            'Performance optimization'
          ]
        },
        {
          id: 'aggregator',
          title: 'Aggregator Transformation',
          description: 'Master aggregation functions (sum, avg, count, min, max)',
          difficulty: 'Intermediate',
          lastUpdated: '2023-10-28',
          downloadLink: '/mapping-docs/AGGREGATOR_TRANSFORMATION.docx',
          pages: 20,
          contentPreview: [
            'Group by operations',
            'Aggregate functions',
            'Having clause implementation',
            'Sorted input optimization',
            'IICS vs PowerCenter differences'
          ]
        },
        {
          id: 'expression',
          title: 'Expression Transformation',
          description: 'Data manipulation and calculations guide',
          difficulty: 'Beginner',
          lastUpdated: '2023-09-10',
          downloadLink: '/mapping-docs/EXPRESSION_TRANSFORMATION.docx',
          pages: 15
        }
      ]
    },
    {
      id: 'mapping-techniques',
      name: 'Mapping Techniques',
      docs: [
        {
          id: 'scd',
          title: 'SCD Implementations',
          description: 'Slowly Changing Dimension patterns',
          difficulty: 'Advanced',
          lastUpdated: '2023-11-01',
          downloadLink: '/mapping-docs/SCD_IMPLEMENTATIONS.pdf',
          pages: 25
        },
        {
          id: 'performance',
          title: 'Performance Tuning',
          description: 'Optimizing mapping performance',
          difficulty: 'Advanced',
          lastUpdated: '2023-10-15',
          downloadLink: '/mapping-docs/PERFORMANCE_TUNING.docx',
          pages: 18
        }
      ]
    }
  ]

  const [searchTerm, setSearchTerm] = useState('')
  const [expandedCategory, setExpandedCategory] = useState<string | null>('transformations')
  const [expandedDoc, setExpandedDoc] = useState<string | null>(null)

  const filteredCategories = categories.map(category => ({
    ...category,
    docs: category.docs.filter(doc => 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.docs.length > 0)

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
        Informatica Mapping Documentation
      </h1>
      
      <div className="mb-8 bg-white p-4 rounded-lg shadow-sm">
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search mapping documents..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-6">
        {filteredCategories.map((category) => (
          <div key={category.id} className="border rounded-lg overflow-hidden">
            <div 
              className="p-4 bg-indigo-50 border-b cursor-pointer flex justify-between items-center"
              onClick={() => setExpandedCategory(expandedCategory === category.id ? null : category.id)}
            >
              <h2 className="text-xl font-semibold text-indigo-800">
                {category.name} ({category.docs.length})
              </h2>
              {expandedCategory === category.id ? (
                <ChevronDown className="h-5 w-5 text-indigo-600" />
              ) : (
                <ChevronRight className="h-5 w-5 text-indigo-600" />
              )}
            </div>

            {expandedCategory === category.id && (
              <div className="bg-white divide-y divide-gray-200">
                {category.docs.map((doc) => (
                  <div key={doc.id} className="p-4 hover:bg-gray-50">
                    <div 
                      className="flex justify-between items-start cursor-pointer"
                      onClick={() => setExpandedDoc(expandedDoc === doc.id ? null : doc.id)}
                    >
                      <div>
                        <h3 className="text-lg font-medium text-gray-800">{doc.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{doc.description}</p>
                        <div className="flex items-center mt-2 space-x-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {doc.difficulty}
                          </span>
                          <span className="text-xs text-gray-500">Updated: {doc.lastUpdated}</span>
                          <span className="text-xs text-gray-500">{doc.pages} pages</span>
                        </div>
                      </div>
                      <a
                        href={doc.downloadLink}
                        download
                        onClick={(e) => e.stopPropagation()}
                        className="ml-4 inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <Download className="h-4 w-4 mr-1" />
                        PDF
                      </a>
                    </div>

                    {expandedDoc === doc.id && (
                      <div className="mt-4 pl-2 border-l-4 border-indigo-200">
                        {doc.contentPreview && (
                          <>
                            <h4 className="text-sm font-medium text-gray-700 mb-2">Content Preview:</h4>
                            <ul className="list-disc pl-5 space-y-1 text-sm text-gray-600">
                              {doc.contentPreview.map((item, index) => (
                                <li key={index}>{item}</li>
                              ))}
                            </ul>
                          </>
                        )}
                        <div className="mt-4 flex space-x-3">
                          <a
                            href={doc.downloadLink}
                            download
                            className="inline-flex items-center px-3 py-2 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700 transition-colors"
                          >
                            <Download className="h-4 w-4 mr-2" />
                            Download Full Document
                          </a>
                          <button className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            View Online
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-800 mb-3">How to Use These Documents</h3>
        <ol className="list-decimal pl-5 space-y-2 text-blue-700">
          <li>Download the PDF or DOCX file for the transformation you want to learn</li>
          <li>Follow along with the examples in your Informatica PowerCenter or IICS environment</li>
          <li>Practice the techniques with your own data sets</li>
          <li>Refer back to the documentation when working on real projects</li>
        </ol>
      </div>
    </div>
  )
}