'use client'

import { useEffect, useState } from 'react'
import Split from 'react-split'
import dynamic from 'next/dynamic'
import { Switch } from '@/components/ui/switch'
import { toast } from 'sonner'
import { executeSQLQuery } from '@/lib/sql'

const AceEditor = dynamic(() => import('react-ace'), { ssr: false })

if (typeof window !== 'undefined') {
  const ace = require('ace-builds/src-noconflict/ace')
  window.ace = ace
  require('ace-builds/src-noconflict/ext-language_tools')
  require('ace-builds/src-noconflict/theme-sqlserver')
  require('ace-builds/src-noconflict/mode-sql')
}

export default function SQLLab() {
  const [query, setQuery] = useState('')
  const [result, setResult] = useState<any[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [sqlMode, setSqlMode] = useState<'oracle' | 'postgres'>('oracle')
  const [tables, setTables] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch('/api/sql')
      .then(res => res.json())
      .then(data => {
        if (data.tables) setTables(data.tables)
        if (data.error) setError(data.error)
      })
  }, [])

  useEffect(() => {
    const lowerQuery = query.toLowerCase()
    const isOracleSyntax = lowerQuery.includes('dual') || lowerQuery.includes('rownum')
    const isPostgresSyntax = lowerQuery.includes('limit') || lowerQuery.includes('ilike')

    if (sqlMode === 'oracle' && isPostgresSyntax) {
      toast.warning("You're using PostgreSQL syntax in Oracle mode. Switch to PostgreSQL?")
    }

    if (sqlMode === 'postgres' && isOracleSyntax) {
      toast.warning("You're using Oracle syntax in PostgreSQL mode. Switch to Oracle?")
    }
  }, [query, sqlMode])

  const runQuery = async () => {
    if (!query.trim()) return

    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const { rows, warning } = await executeSQLQuery(query, sqlMode === 'oracle')

      if (warning) toast.warning(warning)
      setResult(rows || [])
    } catch (err: any) {
      setError(err.message || 'Query failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="flex items-center justify-between px-4 py-2 bg-blue-800 text-white">
        <div></div>
        <h1 className="text-lg font-bold">SQL Lab + Practice with Oracle/Postgres + Auto Syntax Detection</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">SQL Mode:</span>
          <label className="flex items-center gap-2">
            <span className="text-sm">Oracle</span>
            <Switch
              checked={sqlMode === 'postgres'}
              onCheckedChange={(checked) => setSqlMode(checked ? 'postgres' : 'oracle')}
              className="data-[state=checked]:bg-blue-600"
            />
            <span className="text-sm">PostgreSQL</span>
          </label>
        </div>
      </div>

      <Split
        className="flex h-[calc(100vh-48px)]"
        sizes={[20, 80]}
        minSize={[200, 400]}
        gutterSize={6}
        snapOffset={30}
      >
        <div className="bg-white p-3 overflow-auto border-r">
          <h2 className="font-semibold mb-3 pb-2 border-b">Tables</h2>
          <ul className="space-y-1">
            {tables.map(table => (
              <li
                key={table}
                className="cursor-pointer p-2 hover:bg-blue-50 rounded text-sm"
                onClick={() => setQuery(`SELECT * FROM ${table};`)}
              >
                {table}
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col">
          <div className="bg-white p-3 border-b flex flex-col" style={{ height: '40%' }}>
            <div className="flex-1">
              <AceEditor
                mode="sql"
                theme="sqlserver"
                value={query}
                onChange={setQuery}
                width="100%"
                height="100%"
                fontSize={14}
                setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  showLineNumbers: true,
                  tabSize: 2
                }}
              />
            </div>
            <button
              onClick={runQuery}
              disabled={loading}
              className="mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm"
            >
              {loading ? 'Running...' : 'Run Query'}
            </button>
          </div>

          <div className="flex-1 overflow-auto p-3">
            {error ? (
              <div className="text-red-600 p-2 bg-red-50 rounded">{error}</div>
            ) : loading ? (
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
              <table className="min-w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-blue-800 text-white">
                    {Object.keys(result[0]).map(col => (
                      <th key={col} className="p-2 border">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      {Object.values(row).map((cell, j) => (
                        <td key={j} className="p-2 border">{String(cell)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </Split>
    </div>
  )
}
