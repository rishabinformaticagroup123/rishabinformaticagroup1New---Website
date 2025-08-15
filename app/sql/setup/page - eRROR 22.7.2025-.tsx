// Updated version of page.tsx with:
// - Two buttons instead of toggle switch for SQL mode selection
// - Resizable layout between table list and SQL editor (like Oracle IDE)
// - Material UI added for better design

'use client'
import { useEffect, useState, useRef } from 'react'
import { Button, ToggleButton, ToggleButtonGroup } from '@mui/material'
import { PlayArrow } from '@mui/icons-material'
import Split from 'react-split'

export default function SQLPracticeLab() {
  const [query, setQuery] = useState("SELECT * FROM students;")
  const [result, setResult] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)
  const [sqlMode, setSqlMode] = useState<'postgres' | 'oracle'>('oracle')
  const [notice, setNotice] = useState<string | null>(null)
  const [info, setInfo] = useState<string | null>(null)
  const [tables, setTables] = useState<string[]>([])
  const [layout, setLayout] = useState<'side-by-side' | 'stacked'>('side-by-side')

  useEffect(() => {
    fetch('/api/sql')
      .then(res => res.json())
      .then(data => setTables(data.tables || []))
      .catch(err => console.error('Failed to load tables', err))
  }, [])

  const runQuery = async () => {
    try {
      const res = await fetch("/api/sql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, mode: sqlMode }),
      })
      const data = await res.json()

      if (res.ok) {
        setResult(data.rows || [])
        setError(null)
        setNotice(data.notice || null)
        setInfo(data.info || null)
      } else {
        setError(data.error)
        setResult([])
        setNotice(null)
        setInfo(null)
      }
    } catch (err) {
      setError("Something went wrong.")
      setNotice(null)
      setInfo(null)
    }
  }

  return (
    <div className="min-h-screen bg-blue-950 text-white">
      <div className="flex justify-between items-center p-3">
        <h1 className="text-xl font-bold">SQL Lab + Practice</h1>
        <div className="space-x-2">
          <ToggleButtonGroup
            value={sqlMode}
            exclusive
            onChange={(e, val) => val && setSqlMode(val)}
            color="primary"
          >
            <ToggleButton value="oracle">Oracle</ToggleButton>
            <ToggleButton value="postgres">PostgreSQL</ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>

      <Split
        className="flex h-[calc(100vh-60px)]"
        sizes={[25, 75]}
        minSize={150}
        gutterSize={8}
        direction="horizontal"
      >
        <aside className="bg-blue-800 p-4 overflow-auto">
          <h2 className="text-lg font-semibold mb-3">Tables</h2>
          <ul className="space-y-1">
            {tables.map((table) => (
              <li
                key={table}
                className="cursor-pointer hover:bg-blue-700 p-2 rounded text-sm"
                onClick={() => setQuery(`SELECT * FROM ${table};`)}
              >
                {table}
              </li>
            ))}
          </ul>
        </aside>

        <main className="p-4 overflow-auto flex flex-col">
          <textarea
            className="w-full h-48 p-3 border text-black rounded-md text-sm font-mono bg-white"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <div className="mt-2">
            <Button
              onClick={runQuery}
              variant="contained"
              color="success"
              startIcon={<PlayArrow />}
            >
              Run Query
            </Button>
          </div>

          {info && <p className="mt-4 text-green-400 font-medium">✅ {info}</p>}
          {notice && <p className="mt-4 text-yellow-300 font-medium">ℹ️ {notice}</p>}
          {error && <pre className="mt-4 text-red-400 whitespace-pre-wrap">{error}</pre>}

          {result.length > 0 && (
            <div className="overflow-x-auto mt-6">
              <table className="w-full border-collapse border border-white text-sm">
                <thead>
                  <tr>
                    {Object.keys(result[0]).map((col) => (
                      <th key={col} className="border px-3 py-2 bg-blue-700">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {result.map((row, idx) => (
                    <tr key={idx}>
                      {Object.values(row).map((cell, i) => (
                        <td key={i} className="border px-3 py-1">
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
        </main>
      </Split>
    </div>
  )
}
