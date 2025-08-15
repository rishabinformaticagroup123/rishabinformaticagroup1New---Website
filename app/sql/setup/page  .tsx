'use client'
import { useState } from 'react'
import Split from 'react-split'
import dynamic from 'next/dynamic'
import { Switch } from '@/components/ui/switch'

const AceEditor = dynamic(() => import('react-ace'), { ssr: false })

if (typeof window !== 'undefined') {
  const ace = require('ace-builds/src-noconflict/ace')
  window.ace = ace
  require('ace-builds/src-noconflict/ext-language_tools')
  require('ace-builds/src-noconflict/theme-sqlserver')
  require('ace-builds/src-noconflict/mode-sql')
}

export default function SQLLab() {
  // Mock data
  const mockTables = [
    'clients', 'clients10', 'clients11', 'clients15',
    'clients20', 'clients21', 'clients25', 'clients33',
    'new_clients', 'students', 'students5'
  ]

  const mockResults = {
    'SELECT * FROM students;': [
      { id: 1, name: 'John Doe', email: 'john@example.com' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
    ],
    'SELECT * FROM clients;': [
      { client_id: 100, client_name: 'KRISHNAN', date_of_project: '2022-03-01' },
      { client_id: 101, client_name: 'RISHAB', date_of_project: '2022-05-02' }
    ]
  }

  const [query, setQuery] = useState('SELECT * FROM students;')
  const [result, setResult] = useState<any[] | null>(null)
  const [sqlMode, setSqlMode] = useState<'oracle' | 'postgres'>('oracle')
  const [loading, setLoading] = useState(false)

  const runQuery = () => {
    setLoading(true)
    setTimeout(() => {
      setResult(mockResults[query.trim()] || [])
      setLoading(false)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-[#f5f6f7] text-gray-800">
      {/* Header */}
      <div className="flex items-center justify-end gap-4 px-4 py-2 bg-[#2c3e50] text-white">
        <span className="text-sm font-medium">SQL Mode:</span>
        <label className="flex items-center gap-2">
          <span className="text-sm">PostgreSQL</span>
          <Switch
            checked={sqlMode === 'oracle'}
            onCheckedChange={(checked) => setSqlMode(checked ? 'oracle' : 'postgres')}
            className="data-[state=checked]:bg-blue-700"
          />
          <span className="text-sm">Oracle</span>
        </label>
      </div>

      {/* Main Content with Resizable Panels */}
      <Split
        className="flex h-[calc(100vh-48px)]"
        sizes={[20, 80]}
        minSize={[200, 400]}
        gutterSize={6}
        gutterAlign="center"
        snapOffset={30}
      >
        {/* Left Tables Panel */}
        <div className="bg-[#f8f9fa] p-3 overflow-auto border-r border-gray-300">
          <h2 className="font-semibold text-[#2c3e50] mb-3 pb-2 border-b border-gray-300">Tables</h2>
          <ul className="space-y-1">
            {mockTables.map((table) => (
              <li
                key={table}
                className="cursor-pointer py-1 px-2 rounded hover:bg-blue-100 transition-colors text-sm text-gray-700"
                onClick={() => setQuery(`SELECT * FROM ${table};`)}
              >
                {table}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Panels (Editor + Results) */}
        <Split
          className="flex flex-col"
          direction="vertical"
          sizes={[50, 50]}
          minSize={[200, 200]}
          gutterSize={6}
          gutterAlign="center"
          snapOffset={30}
        >
          {/* Editor Panel with Fixed Button Area */}
          <div className="bg-white p-3 flex flex-col">
            <div className="flex-1 overflow-hidden">
              <AceEditor
                mode="sql"
                theme="sqlserver"
                value={query}
                onChange={setQuery}
                width="100%"
                height="100%"
                fontSize={13}
                setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  showLineNumbers: true,
                  tabSize: 2
                }}
              />
            </div>
            <div className="mt-2">
              <button
                onClick={runQuery}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm font-medium"
              >
                {loading ? 'Running...' : 'Run Query'}
              </button>
            </div>
          </div>

          {/* Results Panel */}
          <div className="bg-white p-3 overflow-auto border-t border-gray-300">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400"></div>
              </div>
            ) : result === null ? (
              <div className="flex justify-center items-center h-full text-gray-400">
                Run a query to see results
              </div>
            ) : result.length === 0 ? (
              <div className="flex justify-center items-center h-full text-gray-400">
                No results found
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-[#2c3e50] text-white">
                      {Object.keys(result[0]).map((col) => (
                        <th key={col} className="px-3 py-2 border border-gray-400">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        {Object.values(row).map((cell, idx) => (
                          <td key={idx} className="px-3 py-2 border border-gray-300">
                            {String(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </Split>
      </Split>

      <style jsx global>{`
        .gutter {
          background-color: #bdc3c7;
          background-repeat: no-repeat;
          background-position: 50%;
          transition: background-color 0.2s ease;
        }
        .gutter:hover {
          background-color: #3498db;
        }
        .gutter.gutter-horizontal {
          background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==');
          cursor: col-resize;
        }
        .gutter.gutter-vertical {
          background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFAQMAAABo7865AAAABlBMVEVHcEzMzMzyAv2sAAAAAXRSTlMAQObYZgAAABBJREFUeF5jOAMEEAIEEFwAn3kMwcB6I2AAAAAASUVORK5CYII=');
          cursor: row-resize;
        }
      `}</style>
    </div>
  )
}