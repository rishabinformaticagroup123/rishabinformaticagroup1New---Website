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
  const [query, setQuery] = useState('SELECT * FROM students;')
  const [result, setResult] = useState<any[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [sqlMode, setSqlMode] = useState<'oracle' | 'postgres'>('oracle')
  const [notice, setNotice] = useState<string | null>(null)
  const [info, setInfo] = useState<string | null>(null)
  const [tables, setTables] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  // Fetch tables from your API route
  useEffect(() => {
    fetch('/api/sql')
      .then(res => res.json())
      .then(data => data.tables ? setTables(data.tables) : setError(data.error))
      .catch(() => setError('Failed to load tables'))
  }, [])

  const runQuery = async () => {
    setLoading(true)
    setError(null)
    setNotice(null)
    setInfo(null)
    setResult(null)

    try {
      const res = await fetch('/api/sql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, mode: sqlMode }),
      })
      const data = await res.json()

      if (!res.ok) throw new Error(data.error || 'Query failed')
      
      // Handle empty results showing table structure
      if (data.notice?.includes('Displaying structure')) {
        setResult(data.rows)
        setNotice(data.notice)
      } else {
        setResult(data.rows || [])
        setInfo(data.info || null)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Query failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f6f7] text-gray-800">
      {/* Header with SQL Mode Switch */}
      <div className="flex items-center justify-end gap-4 px-4 py-2 bg-[#2c3e50] text-white border-b">
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

      {/* Resizable Panels */}
      <Split
        className="flex h-[calc(100vh-48px)]"
        sizes={[20, 80]}
        minSize={[200, 400]}
        gutterSize={6}
        snapOffset={30}
      >
        {/* Tables Panel */}
        <div className="bg-[#f8f9fa] p-3 overflow-auto border-r border-gray-300">
          <h2 className="font-semibold text-[#2c3e50] mb-3 pb-2 border-b border-gray-300">Tables</h2>
          {error ? (
            <p className="text-red-500 text-sm">{error}</p>
          ) : (
            <ul className="space-y-1">
              {tables.map(table => (
                <li
                  key={table}
                  className="cursor-pointer py-1 px-2 rounded hover:bg-blue-100 transition-colors text-sm text-gray-700"
                  onClick={() => setQuery(`SELECT * FROM ${table};`)}
                >
                  {table}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Editor + Results Panel */}
        <Split
          className="flex flex-col"
          direction="vertical"
          sizes={[50, 50]}
          minSize={[200, 200]}
          gutterSize={6}
          snapOffset={30}
        >
          {/* Editor Panel */}
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
            <div className="mt-2 flex justify-between items-center">
              <button
                onClick={runQuery}
                disabled={loading}
                className={`bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm font-medium ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Running...' : 'Run Query'}
              </button>
              <div className="flex gap-2 text-xs">
                {info && <span className="text-green-600">✅ {info}</span>}
                {notice && <span className="text-yellow-600">ℹ️ {notice}</span>}
              </div>
            </div>
            {error && (
              <pre className="text-red-600 whitespace-pre-wrap bg-red-50 p-2 rounded mt-2 text-xs">
                {error}
              </pre>
            )}
          </div>

          {/* Results Panel */}
          <div className="bg-white p-3 overflow-auto border-t border-gray-300">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400"></div>
              </div>
            ) : result === null ? (
              <div className="flex justify-center items-center h-full text-gray-400 text-sm">
                Run a query to see results
              </div>
            ) : result.length === 0 ? (
              <div className="flex justify-center items-center h-full text-gray-400 text-sm">
                No results found
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse text-xs">
                  <thead>
                    <tr className="bg-[#2c3e50] text-white">
                      {Object.keys(result[0]).map(col => (
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
    </div>
  )
}