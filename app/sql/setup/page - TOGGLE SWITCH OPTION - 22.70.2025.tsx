// app/sql/page.tsx
'use client'

import { useEffect, useState } from 'react'
import { Switch } from '@/components/ui/switch'

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
    <div className="min-h-screen bg-blue-900 text-white p-2">
      <div className="flex justify-end gap-4 p-2">
        <button
          className={`px-3 py-1 rounded ${layout === 'side-by-side' ? 'bg-green-700' : 'bg-gray-600'}`}
          onClick={() => setLayout('side-by-side')}
        >Side by Side</button>
        <button
          className={`px-3 py-1 rounded ${layout === 'stacked' ? 'bg-green-700' : 'bg-gray-600'}`}
          onClick={() => setLayout('stacked')}
        >Stacked</button>
      </div>

      <div className={layout === 'side-by-side' ? "flex flex-col md:flex-row" : "flex flex-col"}>
        <aside className="w-full md:w-1/4 bg-blue-800 p-4 overflow-auto">
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

        <main className="flex-1 p-4">
          <h1 className="text-2xl font-bold mb-4">SQL Lab + Practice</h1>

          <div className="flex flex-wrap items-center gap-4 mb-4">
            <span>SQL Mode:</span>
            <label className="flex items-center gap-2">
              <span>PostgreSQL syntax (AWS, GCP, Azure)</span>
              <Switch
                checked={sqlMode === 'oracle'}
                onCheckedChange={(checked) => setSqlMode(checked ? 'oracle' : 'postgres')}
              />
              <span>Oracle syntax (Oracle 11g, 12c, 19c)</span>
            </label>
          </div>

          <textarea
            className="w-full h-48 p-4 border text-black rounded-md text-sm font-mono bg-white"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <button
            onClick={runQuery}
            className="mt-4 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >Run Query</button>

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
</div>
</div>
)
}

