'use client'

import { useEffect, useState, useRef } from 'react'

type Mode = 'normal' | 'fix' | 'chat'

export default function SQLLab() {
  const [query, setQuery] = useState('SELECT * FROM students;')
  const [result, setResult] = useState<any[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [sqlMode, setSqlMode] = useState<'oracle' | 'postgres'>('oracle')
  const [notice, setNotice] = useState<string | null>(null)
  const [info, setInfo] = useState<string | null>(null)
  const [tables, setTables] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState<Mode>('normal')
  const [aiReply, setAiReply] = useState<string | null>(null)

  const leftPanelRef = useRef<HTMLDivElement>(null)
  const topPanelRef = useRef<HTMLDivElement>(null)

  const fetchTables = async () => {
    try {
      const res = await fetch('/api/sql')
      const data = await res.json()
      if (data.tables) setTables(data.tables)
      if (data.error) setError(data.error)
    } catch {
      setError('Failed to fetch tables')
    }
  }

  useEffect(() => {
    fetchTables()
  }, [])

  const getSelectedQuery = (): string => {
    const selection = window.getSelection()
    if (!selection) return query
    const selectedText = selection.toString().trim()
    return selectedText.length > 0 ? selectedText : query
  }

  const runQuery = async () => {
    setLoading(true)
    setError(null)
    setNotice(null)
    setInfo(null)
    setResult(null)
    setAiReply(null)

    const actualQuery = getSelectedQuery()

    try {
      const res = await fetch('/api/sql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          query: actualQuery, 
          mode: sqlMode,
          operationMode: mode // Added for AI modes
        }),
      })
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Query failed')
      }

      // Handle AI chat response
      if (mode === 'chat') {
        setAiReply(data.reply || data.message)
        return
      }

      // Handle corrected query in fix mode
      if (mode === 'fix' && data.correctedQuery) {
        setQuery(data.correctedQuery)
      }

      const lowerCaseQuery = actualQuery.toLowerCase().trim()
      const rowCount = data.rowCount || 0
      const action = data.command?.toLowerCase() || (
        lowerCaseQuery.startsWith('truncate') ? 'truncate' :
        lowerCaseQuery.startsWith('drop') ? 'drop' :
        lowerCaseQuery.startsWith('delete') ? 'delete' : ''
      )

      const tableMatch = lowerCaseQuery.match(/(?:truncate|drop|delete)\s+(?:table\s+)?([`"']?[\w\d\-_]+[`"']?)/i)
      const tableName = (tableMatch?.[1] || '').replace(/[`"']/g, '')

      if ((action === 'truncate' || action === 'drop' || action === 'delete') && tableName) {
        if (action === 'drop') {
          setTables((prev) => prev.filter((t) => t !== tableName))
        }
        setInfo(`Table '${tableName}' ${action === 'truncate' ? 'truncated' : action === 'drop' ? 'dropped' : 'cleared'} successfully.`)
        setResult([])
      } else if (action && action !== 'select') {
        setInfo(`${rowCount} row${rowCount !== 1 ? 's' : ''} ${action}ed successfully.`)
        setResult([])
      } else {
        setResult(data.rows || [])
        setNotice(data.notice || null)
        setInfo(data.info || null)
      }
    } catch (err: any) {
      setError(err instanceof Error ? err.message : 'Query failed')
    } finally {
      setLoading(false)
    }
  }

  const describeTable = (tableName: string) => {
    setQuery(
      `SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = '${tableName}';`
    )
  }

  const handleHorizontalResize = (e: React.MouseEvent) => {
    const startX = e.clientX
    const startWidth = leftPanelRef.current?.offsetWidth || 0

    const onMouseMove = (moveEvent: MouseEvent) => {
      if (leftPanelRef.current) {
        const newWidth = startWidth + (moveEvent.clientX - startX)
        const parentWidth = leftPanelRef.current.parentElement?.offsetWidth || 0
        const newSize = (newWidth / parentWidth) * 100
        if (newSize > 10 && newSize < 90) {
          leftPanelRef.current.style.flexBasis = `${newSize}%`
        }
      }
    }

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  const handleVerticalResize = (e: React.MouseEvent) => {
    const startY = e.clientY
    const startHeight = topPanelRef.current?.offsetHeight || 0

    const onMouseMove = (moveEvent: MouseEvent) => {
      if (topPanelRef.current) {
        const newHeight = startHeight + (moveEvent.clientY - startY)
        const parentHeight = topPanelRef.current.parentElement?.offsetHeight || 0
        const newSize = (newHeight / parentHeight) * 100
        if (newSize > 10 && newSize < 90) {
          topPanelRef.current.style.flexBasis = `${newSize}%`
        }
      }
    }

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)
    }

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseup', onMouseUp)
  }

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 font-sans flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-slate-900 text-white shadow-md">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">SQL Mode:</span>
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="text-sm">Oracle</span>
            <div className="relative inline-block w-10 h-6 rounded-full bg-gray-600 transition-colors duration-200">
              <input
                type="checkbox"
                className="absolute left-0 top-0 w-full h-full opacity-0 cursor-pointer"
                checked={sqlMode === 'postgres'}
                onChange={(e) => setSqlMode(e.target.checked ? 'postgres' : 'oracle')}
              />
              <span
                className={`absolute left-0 top-0 w-6 h-6 rounded-full bg-white transition-transform duration-200 ease-in-out transform ${
                  sqlMode === 'postgres' ? 'translate-x-4 bg-blue-600' : 'translate-x-0'
                }`}
              ></span>
            </div>
            <span className="text-sm">PostgreSQL</span>
          </label>
        </div>

        {/* Mode Toggle */}
        <div className="flex gap-4 text-sm">
          {['normal', 'fix', 'chat'].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m as Mode)}
              className={`px-3 py-1 rounded-md font-medium ${
                mode === m ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {m[0].toUpperCase() + m.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden h-[calc(100vh-48px)]">
        {/* Left Panel */}
        <div ref={leftPanelRef} className="flex-grow flex-shrink-0 basis-1/5 bg-white p-4 overflow-auto border-r border-gray-300">
          <h2 className="font-bold text-slate-800 mb-3 pb-2 border-b-2 border-blue-600">Tables</h2>
          {error ? (
            <p className="text-red-500 text-sm">{error}</p>
          ) : (
            <ul className="space-y-1">
              {tables.map((table) => (
                <li
                  key={table}
                  className="cursor-pointer py-1 px-2 rounded-md hover:bg-blue-50 transition-colors text-sm text-gray-700"
                  onClick={() => describeTable(table)}
                >
                  {table}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Gutter */}
        <div onMouseDown={handleHorizontalResize} className="w-1.5 h-full bg-gray-300 cursor-col-resize hover:bg-blue-600 transition-colors"></div>

        {/* Editor & Results */}
        <div className="flex-grow flex-shrink-0 basis-4/5 flex flex-col">
          {/* Editor */}
          <div ref={topPanelRef} className="flex-grow flex-shrink-0 basis-1/2 bg-white p-4 flex flex-col border-b border-gray-300">
            <div className="flex-1 overflow-hidden rounded-md border border-gray-300">
              <textarea
                className="w-full h-full p-2 font-mono text-sm bg-gray-50 resize-none outline-none"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={mode === 'chat' ? "Ask SQL questions (e.g., 'How to join tables?')" : "Enter SQL query"}
              />
            </div>
            <div className="mt-4 flex justify-between items-center">
              <div className="flex gap-2">
                <button
                  onClick={runQuery}
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Running...' : 'Run Query'}
                </button>
              </div>
              <div className="flex gap-4 text-xs">
                {info && <span className="text-green-600">✅ {info}</span>}
                {notice && <span className="text-yellow-600">ℹ️ {notice}</span>}
              </div>
            </div>
            {error && (
              <div className="text-red-600 bg-red-50 border border-red-200 p-3 rounded-lg mt-4 text-sm font-medium">
                {error}
              </div>
            )}
          </div>

          {/* Gutter */}
          <div onMouseDown={handleVerticalResize} className="w-full h-1.5 bg-gray-300 cursor-row-resize hover:bg-blue-600 transition-colors"></div>

          {/* Results */}
          <div className="flex-grow flex-shrink-0 basis-1/2 bg-white p-4 overflow-auto">
            {loading ? (
              <div className="flex justify-center items-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
            ) : mode === 'chat' && aiReply ? (
              <div className="prose max-w-none">
                {aiReply.split('```').map((part, i) => (
                  i % 2 === 0 ? (
                    <p key={`text-${i}`} className="mb-4">{part}</p>
                  ) : (
                    <pre key={`code-${i}`} className="bg-gray-100 p-3 rounded-md overflow-x-auto text-sm mb-4">
                      {part.replace(/^sql/, '').trim()}
                    </pre>
                  )
                ))}
              </div>
            ) : result === null ? (
              <div className="flex justify-center items-center h-full text-gray-400 font-medium">
                Run a query to see results
              </div>
            ) : result.length === 0 ? (
              <div className="flex justify-center items-center h-full text-gray-400 font-medium">
                {info || 'No results found'}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm border-collapse">
                  <thead className="bg-slate-900">
                    <tr>
                      {Object.keys(result[0]).map((col) => (
                        <th key={col} className="px-3 py-2 text-white font-bold border border-gray-600">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {result.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        {Object.values(row).map((cell, idx) => (
                          <td key={idx} className="px-3 py-2 text-gray-800 border border-gray-300">
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
        </div>
      </div>
    </div>
  )
}