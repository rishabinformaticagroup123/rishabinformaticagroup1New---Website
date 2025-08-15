'use client';

import React, { useState } from 'react';
import AceEditor from 'react-ace';
import Split from 'react-split';

import 'ace-builds/src-noconflict/mode-sql';
import 'ace-builds/src-noconflict/theme-github';
import 'ace-builds/src-noconflict/ext-language_tools';

export default function Page() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const tables = ['users', 'orders', 'products'];

  const handleRun = () => {
    setLoading(true);
    setTimeout(() => {
      setResult([
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
      ]);
      setLoading(false);
    }, 1000);
  };

  return (
    <Split className="flex h-screen" sizes={[20, 80]} gutterSize={8}>
      <div className="bg-gray-100 p-4">
        <h2 className="font-semibold mb-2">Tables</h2>
        <ul>
          {tables.map((table) => (
            <li key={table} className="text-sm mb-1 cursor-pointer hover:underline">
              {table}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col p-4 w-full">
        <AceEditor
          mode="sql"
          theme="github"
          value={query}
          onChange={(val) => setQuery(val)}
          width="100%"
          height="200px"
          fontSize={14}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            showLineNumbers: true,
            tabSize: 2,
          }}
        />
        <button
          onClick={handleRun}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? 'Running...' : 'Run SQL'}
        </button>
        {result.length > 0 && (
          <table className="mt-6 border w-full text-sm">
            <thead>
              <tr>
                {Object.keys(result[0]).map((col) => (
                  <th key={col} className="border px-2 py-1 bg-gray-200">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {result.map((row, idx) => (
                <tr key={idx}>
                  {Object.values(row).map((val, i) => (
                    <td key={i} className="border px-2 py-1">
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Split>
  );
}
