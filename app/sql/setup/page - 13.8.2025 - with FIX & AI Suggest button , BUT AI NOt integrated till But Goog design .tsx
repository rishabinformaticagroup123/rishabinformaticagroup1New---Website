'use client'

import { useEffect, useState, useRef } from 'react'
import Split from 'react-split'
import dynamic from 'next/dynamic'
import { Switch } from '@/components/ui/switch'
import { convertQuery, SqlMode } from '@/lib/conversion'

const AceEditor = dynamic(() => import('react-ace'), { ssr: false })

// Load Ace editor modules only on client
if (typeof window !== 'undefined') {
  const ace = require('ace-builds/src-noconflict/ace')
  window.ace = ace
  require('ace-builds/src-noconflict/ext-language_tools')
  require('ace-builds/src-noconflict/theme-sqlserver')
  require('ace-builds/src-noconflict/mode-sql')
}

export default function App() {
  const [query, setQuery] = useState('SELECT * FROM students;')
  const [result, setResult] = useState<any[] | null>(null)
  const [columns, setColumns] = useState<string[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [sqlMode, setSqlMode] = useState<SqlMode>('oracle')
  const [notice, setNotice] = useState<string | null>(null)
  const [info, setInfo] = useState<string | null>(null)
  const [tables, setTables] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [resultDisplayState, setResultDisplayState] = useState<
    'initial' | 'success' | 'table' | 'error' | 'loading'
  >('initial')

  // AI States
  const [aiPrompt, setAiPrompt] = useState('')
  const [aiSuggestion, setAiSuggestion] = useState<string | null>(null)
  const [aiLoading, setAiLoading] = useState(false)
  const [aiError, setAiError] = useState<string | null>(null)

  const editorRef = useRef<any>(null)

  // Fetch available tables
  const fetchTables = () => {
    fetch('/api/sql')
      .then(res => res.json())
      .then(data => {
        if (data.tables) setTables(data.tables.sort())
        else setError(data.error || 'Failed to load tables.')
      })
      .catch(() => setError('Failed to connect to database.'))
  }

  useEffect(() => {
    fetchTables()
  }, [])

  // Run SQL query
  const runQuery = async () => {
    setLoading(true)
    setResultDisplayState('loading')
    setError(null)
    setNotice(null)
    setInfo(null)
    setResult(null)
    setColumns(null)

    const selectedText = editorRef.current?.editor.getCopyText()?.trim() || ''
    const finalQuery = selectedText || query.trim()

    if (!finalQuery) {
      setError('Query is empty.')
      setResultDisplayState('error')
      setLoading(false)
      return
    }

    const { convertedQuery, conversionMessage } = convertQuery(finalQuery, sqlMode)
    const queryLower = convertedQuery.trim().toLowerCase()

    try {
      if (queryLower === 'commit;' || queryLower === 'rollback;') {
        await fetch('/api/sql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: convertedQuery, mode: 'postgres' }),
        })
        setInfo(`Transaction ${queryLower.toUpperCase().replace(';', '')} executed successfully.`)
        setResultDisplayState('success')
        if (conversionMessage) setNotice(conversionMessage)
        return
      }

      const res = await fetch('/api/sql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: convertedQuery, mode: 'postgres' }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Query execution failed.')

      if (
        ['truncate', 'drop', 'delete', 'update', 'insert', 'create', 'alter'].some(cmd =>
          queryLower.startsWith(cmd)
        )
      ) {
        const messages: Record<string, string> = {
          truncate: 'Table truncated successfully.',
          drop: 'Object dropped successfully.',
          delete: 'Data deleted successfully.',
          update: 'Data updated successfully.',
          insert: 'Data inserted successfully.',
          create: 'Table created successfully.',
          alter: 'Table altered successfully.',
        }

        const action = Object.keys(messages).find(k => queryLower.startsWith(k)) || 'query'
        const message = messages[action]

        if (conversionMessage) setNotice(conversionMessage)
        setInfo(message)
        setResultDisplayState('success')

        if (['create', 'drop', 'alter'].includes(action)) {
          fetchTables()
        }
      } else {
        setResult(data.rows || [])
        if (data.rows?.length > 0) {
          setColumns(Object.keys(data.rows[0]))
        } else if (data.columns) {
          setColumns(data.columns)
          setInfo('No rows returned.')
        } else {
          setColumns([])
          setInfo('No results found.')
        }
        if (conversionMessage) setNotice(conversionMessage)
        setResultDisplayState('table')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
      setResultDisplayState('error')
    } finally {
      setLoading(false)
    }
  }

  // Generate SQL from natural language
  const generateSqlFromAi = async () => {
    setAiLoading(true)
    setAiError(null)
    setAiSuggestion(null)

    try {
      const res = await fetch('/api/ai-sql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: aiPrompt,
          dialect: sqlMode,
          columns: columns || [],
        }),
      })

      const data = await res.json()
      if (res.ok) {
        setAiSuggestion(data.sql)
      } else {
        setAiError(data.error)
      }
    } catch (err) {
      setAiError('Failed to connect to AI service')
    } finally {
      setAiLoading(false)
    }
  }

  // Fix current query using AI
  const fixQueryWithAi = async () => {
    setAiLoading(true)
    setAiError(null)
    setAiSuggestion(null)

    if (!query.trim()) {
      setAiError('Query is empty')
      setAiLoading(false)
      return
    }

    try {
      const res = await fetch('/api/ai-sql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `Fix this SQL query and return only the corrected version:\n\n${query}`,
          dialect: sqlMode,
        }),
      })

      const data = await res.json()
      if (res.ok) {
        setAiSuggestion(data.sql)
      } else {
        setAiError(data.error)
      }
    } catch (err) {
      setAiError('Failed to fix query')
    } finally {
      setAiLoading(false)
    }
  }

  // Render result content based on state
  const renderResultsContent = () => {
    switch (resultDisplayState) {
      case 'loading':
        return (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Executing...</span>
          </div>
        )
      case 'error':
        return (
          <pre className="text-red-600 bg-red-50 p-3 rounded text-sm whitespace-pre-wrap max-h-60 overflow-auto">
            ❌ {error}
          </pre>
        )
      case 'success':
        return (
          <div className="flex justify-center items-center h-full text-green-700 bg-green-50 rounded p-3">
            <span className="text-sm font-medium">✅ {info}</span>
          </div>
        )
      case 'table':
        return (
          <div className="overflow-x-auto rounded border border-gray-300 shadow-sm">
            {columns && columns.length > 0 ? (
              <table className="min-w-full divide-y divide-gray-200 text-xs">
                <thead className="bg-blue-900 text-white">
                  <tr>
                    {columns.map(col => (
                      <th
                        key={col}
                        className="px-4 py-2 text-left font-semibold uppercase tracking-wider"
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {result && result.length > 0 ? (
                    result.map((row, i) => (
                      <tr
                        key={i}
                        className={`hover:bg-blue-50 transition-colors ${
                          i % 2 === 0 ? 'bg-white' : 'bg-gray-25'
                        }`}
                      >
                        {Object.values(row).map((cell, idx) => (
                          <td key={idx} className="px-4 py-2 border-b border-gray-200 text-gray-800">
                            {cell === null ? <span className="text-gray-400 italic">NULL</span> : String(cell)}
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={columns.length || 1}
                        className="px-4 py-6 text-center text-gray-500 bg-gray-50 italic"
                      >
                        {info || 'No data returned.'}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            ) : (
              <div className="p-4 text-center text-gray-500 bg-gray-50">No columns to display</div>
            )}
          </div>
        )
      default:
        return (
          <div className="flex justify-center items-center h-full text-gray-500 italic text-sm">
            ✅ Enter a query and click "Run Query"
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      {/* Header */}
      <header className="bg-blue-900 text-white shadow-lg">
        <div className="flex flex-col sm:flex-row items-center justify-between px-6 py-3 gap-2">
          <h1 className="text-xl font-bold text-center flex-1">Rishab's SQL Query Playground</h1>

          <div className="flex items-center gap-3 text-sm whitespace-nowrap">
            <span className="text-blue-100">Oracle (11g | 12c | Snowflake)</span>
            <Switch
              checked={sqlMode === 'postgres'}
              onCheckedChange={checked => setSqlMode(checked ? 'postgres' : 'oracle')}
              className="data-[state=checked]:bg-blue-600 data-[state=unchecked]:bg-gray-400 scale-110"
              aria-label="Toggle SQL dialect"
            />
            <span className="text-blue-100">PostgreSQL [AWS, GCP, Azure]</span>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <Split
        className="h-[calc(100vh-72px)] flex"
        sizes={[20, 80]}
        minSize={[200, 400]}
        gutterSize={4}
        snapOffset={30}
        direction="horizontal"
      >
        {/* Sidebar: Tables */}
        <aside className="bg-white border-r border-gray-200 shadow-sm p-4 overflow-y-auto">
          <h2 className="font-semibold text-blue-900 mb-3 border-b pb-2 border-blue-800 text-sm">
            Available Tables
          </h2>
          {tables.length > 0 ? (
            <ul className="space-y-1">
              {tables.map(table => (
                <li
                  key={table}
                  onClick={() => setQuery(`SELECT * FROM ${table};`)}
                  className="cursor-pointer px-3 py-1.5 rounded text-sm text-gray-700 hover:bg-blue-100 hover:text-blue-800 transition-colors flex items-center gap-2"
                >
                  <span className="text-blue-600">📋</span>
                  {table}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm italic">Loading tables...</p>
          )}
        </aside>

        {/* Editor & Results */}
        <Split
          className="flex flex-col"
          direction="vertical"
          sizes={[60, 40]}
          minSize={[180, 100]}
          gutterSize={4}
        >
          {/* Query Editor */}
          <section className="flex flex-col bg-white border border-gray-200 shadow-sm rounded-md m-2 overflow-hidden">
            <div className="flex-1 p-1 overflow-hidden">
              <AceEditor
                mode="sql"
                theme="sqlserver"
                name="sql-editor"
                value={query}
                onChange={setQuery}
                width="100%"
                height="100%"
                fontSize={13}
                editorProps={{ $blockScrolling: true }}
                setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  showLineNumbers: true,
                  tabSize: 2,
                  printMargin: false,
                }}
                onLoad={editor => {
                  editorRef.current = { editor }
                }}
                className="rounded"
              />
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between px-3 py-2 border-t bg-gray-50 gap-2">
              <div className="flex gap-2">
                <button
                  onClick={runQuery}
                  disabled={loading}
                  className={`bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium py-1.5 px-4 rounded transition-opacity flex items-center gap-2 ${
                    loading ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin h-3 w-3 border-t-2 border-white rounded-full"></div>
                      Running...
                    </>
                  ) : (
                    '▶ Run Query'
                  )}
                </button>

                {/* AI Suggest */}
                <button
                  onClick={generateSqlFromAi}
                  disabled={aiLoading}
                  className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-70 text-white text-xs py-1.5 px-3 rounded flex items-center gap-1"
                >
                  💡 AI Suggest
                </button>

                {/* AI Fix */}
                <button
                  onClick={fixQueryWithAi}
                  disabled={aiLoading}
                  className="bg-red-600 hover:bg-red-700 disabled:opacity-70 text-white text-xs py-1.5 px-3 rounded flex items-center gap-1"
                >
                  🛠️ AI Fix
                </button>
              </div>

              {notice && (
                <div className="text-yellow-700 bg-yellow-50 px-2.5 py-1 rounded text-xs flex items-center gap-1">
                  ℹ️ {notice}
                </div>
              )}
            </div>

            {/* AI Assistant Section */}
            <div className="mx-3 mt-2 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded text-sm">
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Ask AI: 'Show top 5 highest-paid employees'"
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  className="flex-1 px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  onKeyPress={(e) => e.key === 'Enter' && generateSqlFromAi()}
                />
                <button
                  onClick={generateSqlFromAi}
                  disabled={aiLoading}
                  className="bg-blue-600 hover:bg-blue-700 disabled:opacity-70 text-white px-3 py-1.5 rounded text-sm flex items-center gap-1"
                >
                  {aiLoading ? (
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  ) : (
                    '💡'
                  )}
                </button>
              </div>
              {aiError && <p className="text-red-600 text-xs mt-1">{aiError}</p>}
              {aiSuggestion && (
                <div className="mt-2 text-xs bg-white p-3 border border-gray-200 rounded-lg">
                  <pre className="text-gray-800 whitespace-pre-wrap text-xs mb-2">{aiSuggestion}</pre>
                  <button
                    onClick={() => {
                      setQuery(aiSuggestion)
                      setAiSuggestion(null)
                      setAiPrompt('')
                    }}
                    className="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                  >
                    Use This Query
                  </button>
                </div>
              )}
            </div>
          </section>

          {/* Results Panel */}
          <section className="bg-white border border-gray-200 shadow-sm rounded-md m-2 overflow-auto p-2">
            <h3 className="text-xs font-semibold text-gray-700 mb-1.5">Query Results</h3>
            {renderResultsContent()}
          </section>
        </Split>
      </Split>
    </div>
  )
}