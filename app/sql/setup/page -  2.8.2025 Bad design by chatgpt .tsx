'use client'
import React, { useEffect, useState } from 'react';
import Split from 'react-split';
import Editor from '@monaco-editor/react';
import { useCompletion } from 'ai/react';

const SqlLabWithAI = () => {
  const [selectedDb, setSelectedDb] = useState<'oracle' | 'postgresql'>('oracle');
  const [tables, setTables] = useState<string[]>([]);
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');
  const [mode, setMode] = useState<'normal' | 'fix' | 'chat'>('normal');
  const [loading, setLoading] = useState(false);

  const { complete, completion, isLoading: aiLoading } = useCompletion({
    api: '/api/completion',
    onFinish(_, completion) {
      setQuery(prev => prev + completion);
    },
  });

  useEffect(() => {
    // Mocked table list based on selectedDb
    if (selectedDb === 'oracle') {
      setTables(['EMPLOYEES', 'DEPARTMENTS', 'SALARIES']);
    } else {
      setTables(['users', 'orders', 'products']);
    }
  }, [selectedDb]);

  const handleDescribeTable = (table: string) => {
    setQuery(prev => `${prev}\nDESC ${table};\n`);
  };

  const handleRunQuery = () => {
    setLoading(true);
    setTimeout(() => {
      setResult(`Executed on ${selectedDb.toUpperCase()}:\n${query}`);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="h-screen w-screen p-4 bg-gray-100">
      <div className="flex justify-between items-center mb-4">
        <div className="space-x-4">
          <button
            className={`px-4 py-2 rounded ${selectedDb === 'oracle' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setSelectedDb('oracle')}
          >
            Oracle
          </button>
          <button
            className={`px-4 py-2 rounded ${selectedDb === 'postgresql' ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setSelectedDb('postgresql')}
          >
            PostgreSQL
          </button>
        </div>
        <div className="space-x-2">
          <button
            onClick={() => setMode('normal')}
            className={`px-4 py-2 rounded ${mode === 'normal' ? 'bg-indigo-600 text-white' : 'bg-gray-300'}`}
          >
            Normal
          </button>
          <button
            onClick={() => setMode('fix')}
            className={`px-4 py-2 rounded ${mode === 'fix' ? 'bg-purple-600 text-white' : 'bg-gray-300'}`}
          >
            Fix
          </button>
          <button
            onClick={() => setMode('chat')}
            className={`px-4 py-2 rounded ${mode === 'chat' ? 'bg-pink-600 text-white' : 'bg-gray-300'}`}
          >
            Chat
          </button>
        </div>
      </div>

      <Split className="flex h-[90%]" sizes={[20, 50, 30]} minSize={100} gutterSize={10}>
        {/* Left: Tables */}
        <div className="bg-white p-4 overflow-auto">
          <h2 className="font-semibold mb-2">Tables</h2>
          <ul className="space-y-1">
            {tables.map(table => (
              <li
                key={table}
                className="cursor-pointer text-blue-700 hover:underline"
                onClick={() => handleDescribeTable(table)}
              >
                {table}
              </li>
            ))}
          </ul>
        </div>

        {/* Middle: Editor */}
        <div className="flex flex-col bg-white">
          <div className="flex justify-between items-center px-4 py-2 bg-gray-200">
            <h2 className="font-semibold">SQL Editor</h2>
            <div className="space-x-2">
              <button
                onClick={handleRunQuery}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1 px-4 rounded"
              >
                {loading ? 'Running...' : 'Run Query'}
              </button>
              {mode === 'fix' && (
                <button
                  onClick={() => complete(query)}
                  disabled={aiLoading}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-1 px-4 rounded disabled:opacity-50"
                >
                  {aiLoading ? 'Fixing...' : 'Fix with AI'}
                </button>
              )}
            </div>
          </div>
          <Editor
            height="100%"
            defaultLanguage="sql"
            value={query}
            onChange={(val) => setQuery(val || '')}
            theme="vs-dark"
          />
        </div>

        {/* Right: Result */}
        <div className="bg-white p-4 overflow-auto">
          <h2 className="font-semibold mb-2">Result</h2>
          <pre className="whitespace-pre-wrap text-sm text-gray-800">{result}</pre>
        </div>
      </Split>
    </div>
  );
};

export default SqlLabWithAI;
