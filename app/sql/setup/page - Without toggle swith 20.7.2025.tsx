'use client'

import { useState } from 'react'

export default function SQLPracticeLab() {
  const [query, setQuery] = useState("SELECT * FROM students;")
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  async function runQuery() {
    try {
      const res = await fetch("/api/sql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      })
      const data = await res.json()
      if (res.ok) {
        setResult(data.rows)
        setError(null)
      } else {
        setError(data.error)
        setResult(null)
      }
    } catch (err) {
      setError("Something went wrong.")
    }
  }

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-xl font-bold mb-4">SQL Lab + Practice</h1>
      <textarea
        className="w-full h-32 p-2 border rounded text-sm font-mono"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        onClick={runQuery}
        className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Run Query
      </button>

      {error && <pre className="mt-4 text-red-600">{error}</pre>}
      {result && (
        <table className="mt-4 w-full border-collapse border text-sm">
          <thead>
            <tr>
              {Object.keys(result[0] || {}).map((col) => (
                <th key={col} className="border px-2 py-1 bg-gray-200">{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {result.map((row, idx) => (
              <tr key={idx}>
                {Object.values(row).map((cell, i) => (
                  <td key={i} className="border px-2 py-1">{String(cell)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
