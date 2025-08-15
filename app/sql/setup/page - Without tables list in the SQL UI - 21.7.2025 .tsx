// app/sql/page.tsx
'use client'

import { useState } from 'react'
import { Switch } from '@/components/ui/switch'

export default function SQLPracticeLab() {
  const [query, setQuery] = useState("SELECT * FROM students;")
  const [result, setResult] = useState<any[]>([])
  const [error, setError] = useState<string | null>(null)
  const [sqlMode, setSqlMode] = useState<'postgres' | 'oracle'>('postgres')
  const [notice, setNotice] = useState<string | null>(null)

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
      } else {
        setError(data.error)
        setResult([])
        setNotice(null)
      }
    } catch (err) {
      setError("Something went wrong.")
      setNotice(null)
    }
  }

  return (
    <div className="min-h-screen bg-blue-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">SQL Lab + Practice</h1>

        <div className="flex items-center gap-4 mb-4">
          <span>SQL Mode:</span>
          <label className="flex items-center gap-2">
            <span>PostgreSQL</span>
            <Switch
              checked={sqlMode === 'oracle'}
              onCheckedChange={(checked) => setSqlMode(checked ? 'oracle' : 'postgres')}
            />
            <span>Oracle</span>
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
        >
          Run Query
        </button>

        {notice && <p className="mt-4 text-yellow-300 font-medium">ℹ️ {notice}</p>}
        {error && <pre className="mt-4 text-red-400">{error}</pre>}

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
                      <td key={i} className="border px-3 py-1">{String(cell)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
