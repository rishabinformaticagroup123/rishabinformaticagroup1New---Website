'use client'

import { useEffect, useState } from 'react'
import Split from 'react-split'
import dynamic from 'next/dynamic'
import { Switch } from '@/components/ui/switch'

// Dynamically import AceEditor for client-side only
const AceEditor = dynamic(() => import('react-ace'), { ssr: false })

// 🛠️ Fix: Make ace globally available before loading modes/themes
if (typeof window !== 'undefined') {
  const ace = require('ace-builds/src-noconflict/ace')
  window.ace = ace
  require('ace-builds/src-noconflict/ext-language_tools')
  require('ace-builds/src-noconflict/theme-sqlserver')
  require('ace-builds/src-noconflict/mode-sql')
}

export default function SQLLab() {
  const [query, setQuery] = useState('SELECT * FROM students;')
  const [result, setResult] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)
  const [sqlMode, setSqlMode] = useState<'oracle' | 'postgres'>('oracle')
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
    <div className="min-h-screen bg-[#f6f6f6] text-black">
      <div className="flex items-center justify-end gap-4 px-4 py-2 bg-blue-50 border-b">
        <span className="text-sm">SQL Mode:</span>
        <label className="flex items-center gap-2">
          <span className="text-sm">PostgreSQL</span>
          <Switch
            checked={sqlMode === 'oracle'}
            onCheckedChange={(checked) => setSqlMode(checked ? 'oracle' : 'postgres')}
          />
          <span className="text-sm">Oracle</span>
        </label>
      </div>

      <Split className="split h-[calc(100vh-48px)]" sizes={[20, 80]} minSize={200} gutterSize={6}>
        {/* Table List */}
        <div className="bg-blue-100 p-3 overflow-auto">
          <h2 className="font-semibold text-blue-800 mb-3">Tables</h2>
          <ul className="space-y-2">
            {tables.map((table) => (
              <li
                key={table}
                className="cursor-pointer text-blue-700 hover:underline text-sm"
                onClick={() => setQuery(`SELECT * FROM ${table};`)}
              >
                {table}
              </li>
            ))}
          </ul>
        </div>

        {/* SQL Editor & Result */}
        <div className="flex flex-col h-full p-3 space-y-3">
          <AceEditor
            mode="sql"
            theme="sqlserver"
            name="sql-editor"
            width="100%"
            height="200px"
            fontSize={14}
            value={query}
            onChange={(val) => setQuery(val)}
            setOptions={{
              enableBasicAutocompletion: true,
              enableLiveAutocompletion: true,
              showLineNumbers: true,
              tabSize: 2,
            }}
            editorProps={{ $blockScrolling: true }}
          />

          <button
            onClick={runQuery}
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded self-start"
          >
            Run Query
          </button>

          {info && <p className="text-green-600">✅ {info}</p>}
          {notice && <p className="text-yellow-600">ℹ️ {notice}</p>}
          {error && <pre className="text-red-600 whitespace-pre-wrap">{error}</pre>}

          {result.length > 0 && (
            <div className="overflow-x-auto mt-2 border rounded bg-white text-sm">
              <table className="min-w-full border border-gray-300 text-left">
                <thead>
                  <tr className="bg-blue-200">
                    {Object.keys(result[0]).map((col) => (
                      <th key={col} className="px-3 py-2 border border-gray-300">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result.map((row, i) => (
                    <tr key={i} className="hover:bg-blue-50">
                      {Object.values(row).map((cell, idx) => (
                        <td key={idx} className="px-3 py-2 border border-gray-200">
                          {(cell instanceof Date || (typeof cell === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(cell)))
                            ? new Date(cell).toLocaleDateString('en-GB', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric',
                              })
                            : String(cell)}
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
    </div>
  )
}
