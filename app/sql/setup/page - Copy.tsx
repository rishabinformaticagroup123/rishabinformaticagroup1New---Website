'use client'

import { useEffect, useState } from 'react'
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
  // All required state hooks
  const [query, setQuery] = useState('SELECT * FROM students;')
  const [result, setResult] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)
  const [sqlMode, setSqlMode] = useState<'oracle' | 'postgres'>('oracle') // This was missing
  const [notice, setNotice] = useState<string | null>(null)
  const [info, setInfo] = useState<string | null>(null)
  const [tables, setTables] = useState<string[]>([])

  useEffect(() => {
    fetch('/api/sql')
      .then(res => res.json())
      .then(data => {
        if (data.tables) setTables(data.tables)
      })
      .catch(err => console.error('Failed to fetch tables', err))
  }, [])

  const runQuery = async () => {
    setError(null)
    setInfo(null)
    setNotice(null)

    try {
      const res = await fetch('/api/sql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, mode: sqlMode }),
      })
      const data = await res.json()

      if (res.ok) {
        setResult(data.rows || [])
        setNotice(data.notice || null)
        setInfo(data.info || null)
      } else {
        setError(data.error || 'Something went wrong')
      }
    } catch (err) {
      setError('Network or server error.')
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-gray-900">
      {/* Header with SQL Mode Switch */}
      <div className="flex items-center justify-end gap-4 px-4 py-2 bg-blue-600 text-white">
        <span className="text-sm font-medium">SQL Mode:</span>
        <label className="flex items-center gap-2">
          <span className="text-sm">PostgreSQL</span>
          <Switch
            checked={sqlMode === 'oracle'}
            onCheckedChange={(checked) => setSqlMode(checked ? 'oracle' : 'postgres')}
            className="data-[state=checked]:bg-blue-800"
          />
          <span className="text-sm">Oracle</span>
        </label>
      </div>

      {/* Main Content Area */}
      <Split 
        className="split h-[calc(100vh-48px)] flex" 
        sizes={[20, 80]} 
        minSize={200} 
        gutterSize={10}
        gutterAlign="center"
        gutter={() => {
          const gutter = document.createElement('div')
          gutter.className = 'gutter bg-gray-400 hover:bg-blue-600 transition-colors duration-200'
          return gutter
        }}
      >
        {/* Left Tables Panel */}
        <div className="bg-[#e8eef7] p-4 overflow-auto shadow-inner">
          <h2 className="font-bold text-lg text-gray-800 mb-4 border-b pb-2">Tables</h2>
          <ul className="space-y-2">
            {tables.map((table) => (
              <li
                key={table}
                className="cursor-pointer py-2 px-3 rounded-md hover:bg-blue-100 transition-colors text-gray-800 font-medium text-sm"
                onClick={() => setQuery(`SELECT * FROM ${table};`)}
              >
                {table}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Panel with Vertical Split */}
        <Split 
          className="split flex flex-col h-full" 
          direction="vertical"
          sizes={[40, 60]}
          minSize={100}
          gutterSize={10}
          gutterAlign="center"
          gutter={() => {
            const gutter = document.createElement('div')
            gutter.className = 'gutter bg-gray-400 hover:bg-blue-600 transition-colors duration-200'
            return gutter
          }}
        >
          {/* Top Panel - Editor */}
          <div className="bg-white p-3 overflow-hidden flex flex-col">
            <div className="flex-1">
              <AceEditor
                mode="sql"
                theme="sqlserver"
                name="sql-editor"
                width="100%"
                height="100%"
                fontSize={14}
                value={query}
                onChange={(val) => setQuery(val)}
                setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  showLineNumbers: true,
                  tabSize: 2,
                }}
              />
            </div>
            <div className="mt-2 flex justify-between items-center">
              <button
                onClick={runQuery}
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md font-medium transition-colors shadow-md"
              >
                Run Query
              </button>
              <div className="flex gap-2">
                {info && <span className="text-green-600 text-sm">✅ {info}</span>}
                {notice && <span className="text-yellow-600 text-sm">ℹ️ {notice}</span>}
              </div>
            </div>
            {error && (
              <pre className="text-red-600 whitespace-pre-wrap bg-red-50 p-2 rounded-md mt-2 text-sm">
                {error}
              </pre>
            )}
          </div>

          {/* Bottom Panel - Results */}
          <div className="bg-white p-3 overflow-auto border-t-2 border-gray-200">
            {result.length > 0 ? (
              <div className="overflow-x-auto border rounded-lg">
                <table className="min-w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-blue-600 text-white">
                      {Object.keys(result[0]).map((col) => (
                        <th key={col} className="px-4 py-2 border border-blue-700 font-medium">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-blue-50'}>
                        {Object.values(row).map((cell, idx) => (
                          <td key={idx} className="px-4 py-2 border border-gray-200">
                            {String(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                <p>Query results will appear here</p>
              </div>
            )}
          </div>
        </Split>
      </Split>

      <style jsx global>{`
        .gutter {
          background-color: #9CA3AF;
          background-repeat: no-repeat;
          background-position: 50%;
          transition: all 0.3s ease;
        }
        .gutter:hover {
          background-color: #2563EB;
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