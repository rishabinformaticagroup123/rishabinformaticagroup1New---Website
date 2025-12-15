'use client'
import { useEffect, useState, useRef } from 'react'
import Split from 'react-split'
import dynamic from 'next/dynamic'
import { Switch } from '@/components/ui/switch'
import { convertQuery, SqlMode } from '@/lib/conversion'
import { ChevronLeft, Sparkles } from 'lucide-react'
import Link from 'next/link'

const AceEditor = dynamic(() => import('react-ace'), { ssr: false })

if (typeof window !== 'undefined') {
  const ace = require('ace-builds/src-noconflict/ace')
  window.ace = ace
  require('ace-builds/src-noconflict/ext-language_tools')
  require('ace-builds/src-noconflict/theme-sqlserver')
  require('ace-builds/src-noconflict/mode-sql')
}

export default function SQLPage() {
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
  const editorRef = useRef<any>(null)

  const fetchTables = () => {
    fetch('/api/sql')
      .then(res => res.json())
      .then(data => (data.tables ? setTables(data.tables) : setError(data.error)))
      .catch(() => setError('Failed to load tables'))
  }

  useEffect(() => {
    fetchTables()
  }, [])

  const runQuery = async () => {
    setLoading(true)
    setResultDisplayState('loading')
    setError(null)
    setNotice(null)
    setInfo(null)
    setResult(null)
    setColumns(null)

    const selectedText = editorRef.current?.editor.getCopyText() || ''
    const queryToSend = selectedText.trim() !== '' ? selectedText : query

    const { convertedQuery, conversionMessage } = convertQuery(queryToSend, sqlMode)
    const queryLower = convertedQuery.trim().toLowerCase()

    try {
      if (queryLower === 'commit;' || queryLower === 'rollback;') {
        await fetch('/api/sql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: convertedQuery, mode: 'postgres' }),
        })
        setInfo(`Transaction ${queryLower.toUpperCase()} executed.`)
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
      if (!res.ok) throw new Error(data.error || 'Query failed')

      if (
        queryLower.startsWith('truncate') ||
        queryLower.startsWith('drop') ||
        queryLower.startsWith('delete') ||
        queryLower.startsWith('update') ||
        queryLower.startsWith('insert') ||
        queryLower.startsWith('create') ||
        queryLower.startsWith('alter')
      ) {
        let message = ''
        if (queryLower.startsWith('truncate')) message = 'Table truncated successfully.'
        else if (queryLower.startsWith('drop')) message = 'Object dropped successfully.'
        else if (queryLower.startsWith('delete')) message = 'Data deleted successfully.'
        else if (queryLower.startsWith('update')) message = 'Data updated successfully.'
        else if (queryLower.startsWith('insert')) message = 'Data inserted successfully.'
        else if (queryLower.startsWith('create')) message = 'Table created successfully.'
        else if (queryLower.startsWith('alter')) message = 'Table altered successfully.'

        if (conversionMessage) setNotice(conversionMessage)
        setInfo(message)
        setResultDisplayState('success')

        if (queryLower.startsWith('create') || queryLower.startsWith('drop') || queryLower.startsWith('alter')) {
          fetchTables()
        }
      } else {
        setResult(data.rows || [])
        if (data.rows && data.rows.length > 0) setColumns(Object.keys(data.rows[0]))
        else if (data.columns) {
          setColumns(data.columns)
          setInfo('No results found.')
        } else {
          setColumns([])
          setInfo('No results found.')
        }
        if (conversionMessage) setNotice(conversionMessage)
        setResultDisplayState('table')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Query failed')
      setResultDisplayState('error')
    } finally {
      setLoading(false)
    }
  }

  const renderResultsContent = () => {
    switch (resultDisplayState) {
      case 'loading':
        return (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400"></div>
          </div>
        )
      case 'error':
        return <pre className="text-red-600 whitespace-pre-wrap">{error}</pre>
      case 'success':
        return (
          <div className="flex justify-center items-center h-full text-green-600 text-sm font-medium">
            ✅ {info}
          </div>
        )
      case 'table':
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-xs">
              <thead>
                <tr className="bg-[#2c3e50] text-white">
                  {columns && columns.length > 0 ? (
                    columns.map(col => (
                      <th key={col} className="px-3 py-2 border border-gray-400">
                        {col}
                      </th>
                    ))
                  ) : (
                    <th className="px-3 py-2 border border-gray-400">No Columns Found</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {result && result.length > 0 ? (
                  result.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      {Object.values(row).map((cell, idx) => (
                        <td key={idx} className="px-3 py-2 border border-gray-300">
                          {String(cell)}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={columns?.length || 1} className="px-3 py-2 text-center text-gray-500">
                      {info || 'No results found.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )
      default:
        return (
          <div className="flex justify-center items-center h-full text-gray-400 text-sm">
            Run a query to see results
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f6f7] text-gray-800 flex">
      <div className="w-full">
        <div className="flex items-center justify-start gap-4 px-4 py-2 bg-[#2c3e50] text-white border-b">
          <label className="flex items-center gap-2">
            <span className="text-sm">Oracle (Oracle 11g,21c,Snowflake)</span>
            <Switch
              checked={sqlMode === 'postgres'}
              onCheckedChange={checked => setSqlMode(checked ? 'postgres' : 'oracle')}
              className="data-[state=checked]:bg-blue-700"
            />
            <span className="text-sm">PostgreSQL (AWS,GCP,Azure)</span>
          </label>
        </div>

        <Split className="flex h-[calc(100vh-48px)]" sizes={[20, 80]} minSize={[200, 400]} gutterSize={6} snapOffset={30}>
          <div className="bg-[#f8f9fa] p-3 overflow-auto border-r border-gray-300">
            <h2 className="font-semibold text-[#2c3e50] mb-3 pb-2 border-b border-gray-300">Tables</h2>
            {tables.length > 0 ? (
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
            ) : (
              <p className="text-gray-500 text-sm">No tables found.</p>
            )}
          </div>

          <Split className="flex flex-col" direction="vertical" sizes={[50, 50]} minSize={[200, 200]} gutterSize={6} snapOffset={30}>
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
                    tabSize: 2,
                  }}
                  onLoad={editor => {
                    editorRef.current = { editor }
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
                <div className="flex gap-2 text-xs">{notice && <span className="text-yellow-600">ℹ️ {notice}</span>}</div>
              </div>
              {error && (
                <pre className="text-red-600 whitespace-pre-wrap bg-red-50 p-2 rounded mt-2 text-xs max-h-40 overflow-auto">
                  {error}
                </pre>
              )}
              {info && !error && (
                <div className="text-green-700 bg-green-50 rounded p-2 mt-2 text-xs max-h-40 overflow-auto">{info}</div>
              )}
            </div>

            <div className="bg-white p-3 overflow-auto">{renderResultsContent()}</div>
          </Split>
        </Split>
      </div>

      <Link
        href="/sql/setup/ai"
        className="fixed right-0 top-1/2 transform -translate-y-1/2 bg-[#2c3e50] text-white p-2 pl-3 rounded-l-lg shadow-lg hover:bg-[#1a2634] transition-colors flex items-center gap-1 group"
      >
        <div className="flex items-center">
          <Sparkles className="text-yellow-400 mr-1 group-hover:animate-spin" size={16} />
          <span className="text-xs font-medium mr-1">AI HELP</span>
          <ChevronLeft size={18} />
        </div>
      </Link>
    </div>
  )
}