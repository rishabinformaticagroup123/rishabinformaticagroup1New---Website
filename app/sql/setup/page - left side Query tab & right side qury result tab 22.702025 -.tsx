'use client';

import React, { useState } from 'react';
import Split from 'react-split';
import AceEditor from 'react-ace';
import Switch from 'react-switch';
import classNames from 'classnames';

import 'ace-builds/src-noconflict/mode-sql';
import 'ace-builds/src-noconflict/theme-monokai';

export default function EditorPage() {
  const [query, setQuery] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const [results, setResults] = useState<any[]>([]);

  const handleQueryChange = (value: string) => {
    setQuery(value);
  };

  const runQuery = () => {
    // Placeholder logic for running SQL — replace with real logic
    setResults([
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
    ]);
  };

  const handleToggle = () => setDarkMode(!darkMode);

  return (
    <div className={classNames('h-screen', darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black')}>
      <div className="flex justify-between items-center px-4 py-2 border-b border-gray-600">
        <h1 className="text-lg font-semibold">SQL Editor</h1>
        <div className="flex items-center gap-2">
          <span>{darkMode ? 'Dark' : 'Light'} Mode</span>
          <Switch onChange={handleToggle} checked={darkMode} />
          <button
            onClick={runQuery}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Run
          </button>
        </div>
      </div>

      <Split className="flex h-[90vh]" sizes={[50, 50]} minSize={100} direction="horizontal">
        <div className="p-4">
          <AceEditor
            mode="sql"
            theme={darkMode ? 'monokai' : 'github'}
            onChange={handleQueryChange}
            value={query}
            name="sql-editor"
            width="100%"
            height="100%"
            editorProps={{ $blockScrolling: true }}
            fontSize={14}
            setOptions={{ useWorker: false }}
          />
        </div>
        <div className="p-4 overflow-auto">
          {results.length > 0 ? (
            <table className="min-w-full border border-white text-sm">
              <thead>
                <tr>
                  {Object.keys(results[0]).map((col) => (
                    <th key={col} className="border px-3 py-1 text-left bg-gray-700 text-white">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {results.map((row, i) => (
                  <tr key={i}>
                    {Object.values(row).map((cell, j) => (
                      <td key={j} className="border px-3 py-1">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No results to display. Run a query.</p>
          )}
        </div>
      </Split>
    </div>
  );
}
