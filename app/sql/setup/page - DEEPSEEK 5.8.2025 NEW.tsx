'use client';

import { useEffect, useState } from 'react';

interface TableListResponse {
  tables: string[];
}

interface QueryResponse {
  columns: string[];
  rows: any[][];
}

export default function SQLLab() {
  const [query, setQuery] = useState('SELECT * FROM customers');
  const [result, setResult] = useState<QueryResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [dbType, setDbType] = useState<'oracle' | 'postgres'>('oracle');
  const [tables, setTables] = useState<string[]>([]);

  useEffect(() => {
    const fetchTables = async () => {
      const res = await fetch('/api/route', {
        method: 'POST',
        body: JSON.stringify({ query: 'GET_TABLES', dbType }),
      });
      const data: TableListResponse = await res.json();
      setTables(data.tables);
    };
    fetchTables();
  }, [dbType]);

  const runQuery = async () => {
    setLoading(true);
    const res = await fetch('/api/route', {
      method: 'POST',
      body: JSON.stringify({ query, dbType }),
    });
    const data = await res.json();
    setResult(data);
    setLoading(false);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-100 p-4 border-r overflow-y-auto">
        <h2 className="text-lg font-semibold mb-2">Tables ({dbType})</h2>
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-4">
        <div className="mb-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">SQL Lab</h1>
          <div className="flex items-center gap-4">
            <select
              value={dbType}
              onChange={(e) => setDbType(e.target.value as 'oracle' | 'postgres')}
              className="border px-2 py-1 rounded"
            >
              <option value="oracle">Oracle</option>
              <option value="postgres">Postgres</option>
            </select>
            <button
              onClick={runQuery}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              disabled={loading}
            >
              {loading ? 'Running...' : 'Run'}
            </button>
          </div>
        </div>

        <textarea
          className="w-full h-32 border rounded p-2 mb-4 font-mono"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {result && (
          <div className="overflow-auto">
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