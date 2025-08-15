'use client';

import { useEffect, useState } from 'react';

interface QueryResponse {
  columns: string[];
  rows: any[][];
  correctedQuery?: string;
  originalQuery?: string;
  notice?: string;
}

export default function SQLLab() {
  // Your original state (preserved)
  const [query, setQuery] = useState('SELECT * FROM customers');
  const [result, setResult] = useState<QueryResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [dbType, setDbType] = useState<'oracle' | 'postgres'>('oracle');
  const [tables, setTables] = useState<string[]>([]);
  
  // New state for AI modes
  const [mode, setMode] = useState<'normal' | 'fix' | 'chat'>('normal');
  const [aiReply, setAiReply] = useState('');

  // Your original table fetch (preserved)
  useEffect(() => {
    const fetchTables = async () => {
      const res = await fetch('/api/sql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: 'GET_TABLES', dbType }),
      });
      const data = await res.json();
      setTables(data.tables || []);
    };
    fetchTables();
  }, [dbType]);

  // Updated runQuery with mode handling
  const runQuery = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/sql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, dbType, mode }),
      });
      const data = await res.json();

      if (mode === 'chat') {
        setAiReply(data.reply);
        setResult(null);
      } else {
        setResult(data);
        setAiReply('');
        if (mode === 'fix' && data.correctedQuery) {
          setQuery(data.correctedQuery);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Your original UI (preserved) with mode toggles added
  return (
    <div className="flex h-screen">
      {/* Left sidebar (unchanged) */}
      <div className="w-64 bg-gray-100 p-4 border-r overflow-y-auto">
        <h2 className="text-lg font-semibold mb-2">Tables ({dbType})</h2>
        <select
          value={dbType}
          onChange={(e) => setDbType(e.target.value as 'oracle' | 'postgres')}
          className="mb-4 border px-2 py-1 rounded"
        >
          <option value="oracle">Oracle</option>
          <option value="postgres">Postgres</option>
        </select>
        <ul className="space-y-1">
          {tables.map((table) => (
            <li
              key={table}
              className="cursor-pointer text-blue-600 hover:underline"
              onClick={() => setQuery(`SELECT * FROM ${table}`)}
            >
              {table}
            </li>
          ))}
        </ul>
      </div>

      {/* Main content (with mode toggles) */}
      <div className="flex-1 flex flex-col p-4">
        <div className="mb-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">SQL Lab</h1>
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <button
                onClick={() => setMode('normal')}
                className={`px-4 py-2 rounded ${
                  mode === 'normal' ? 'bg-blue-600 text-white' : 'bg-gray-200'
                }`}
              >
                Normal
              </button>
              <button
                onClick={() => setMode('fix')}
                className={`px-4 py-2 rounded ${
                  mode === 'fix' ? 'bg-green-600 text-white' : 'bg-gray-200'
                }`}
              >
                Fix
              </button>
              <button
                onClick={() => setMode('chat')}
                className={`px-4 py-2 rounded ${
                  mode === 'chat' ? 'bg-purple-600 text-white' : 'bg-gray-200'
                }`}
              >
                Chat
              </button>
            </div>
            <button
              onClick={runQuery}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              disabled={loading}
            >
              {loading ? 'Running...' : 'Run'}
            </button>
          </div>
        </div>

        {/* Your original query input */}
        <textarea
          className="w-full h-32 border rounded p-2 mb-4 font-mono"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={mode === 'chat' 
            ? "Ask SQL questions like: 'How to find duplicates?'" 
            : "Enter SQL query"}
        />

        {/* AI chat response */}
        {mode === 'chat' && aiReply && (
          <div className="mb-4 p-4 bg-gray-50 rounded border">
            {aiReply.split('```').map((part, i) =>
              i % 2 === 0 ? (
                <p key={i}>{part}</p>
              ) : (
                <pre key={i} className="bg-gray-100 p-2 rounded my-2">
                  {part.replace(/^sql/, '').trim()}
                </pre>
              )
            )}
          </div>
        )}

        {/* Your original results table */}
        {result && mode !== 'chat' && (
          <div className="overflow-auto">
            {result.notice && (
              <div className="bg-yellow-100 text-yellow-800 p-2 mb-2 rounded">
                {result.notice}
              </div>
            )}
            {result.correctedQuery && (
              <div className="bg-blue-100 text-blue-800 p-2 mb-2 rounded">
                <strong>Corrected:</strong> <code>{result.correctedQuery}</code>
              </div>
            )}
            <table className="min-w-full border text-sm">
              <thead className="bg-gray-200">
                <tr>
                  {result.columns.map((col, i) => (
                    <th key={i} className="px-2 py-1 border">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {result.rows.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j} className="px-2 py-1 border">
                        {cell}
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
  );
}