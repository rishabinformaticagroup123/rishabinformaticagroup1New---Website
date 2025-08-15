'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import Split from 'react-split'

// ✅ Dynamically import AceEditor to avoid SSR issues
const AceEditor = dynamic(() => import('react-ace'), { ssr: false })

// Don't forget to install these via npm:
// npm install react-ace ace-builds react-split

// Load Ace Editor extensions
import 'ace-builds/src-noconflict/ext-language_tools'

// Sample table list (you can update this later with API calls)
const tables = ['users', 'orders', 'products', 'students', 'departments']

export default function SQLPracticePage() {
  const [selectedTable, setSelectedTable] = useState<string | null>(null)
  const [query, setQuery] = useState('SELECT * FROM students;')

  useEffect(() => {
    // Dynamically load mode and theme to avoid ace reference errors
    Promise.all([
      import('ace-builds/src-noconflict/mode-sql'),
      import('ace-builds/src-noconflict/theme-github'),
    ])
  }, [])

  // When user clicks a table name
  const handleTableClick = (table: string) => {
    setSelectedTable(table)
    setQuery(`SELECT * FROM ${table};`)
  }

  return (
    <Split className="split" sizes={[20, 80]} minSize={200} gutterSize={10}>
      {/* Left Sidebar */}
      <div className="p-4 border-r border-gray-300 bg-gray-100">
        <h2 className="text-lg font-semibold mb-4">📋 Tables</h2>
        <ul className="space-y-2">
          {tables.map((table) => (
            <li
              key={table}
              onClick={() => handleTableClick(table)}
              className={`cursor-pointer px-2 py-1 rounded ${
                selectedTable === table
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-blue-100'
              }`}
            >
              {table}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Side - SQL Editor */}
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">📝 SQL Editor</h2>
        <AceEditor
          mode="sql"
          theme="github"
          name="sql_editor"
          onChange={(val) => setQuery(val)}
          value={query}
          width="100%"
          height="300px"
          fontSize={14}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: true,
          }}
        />
      </div>
    </Split>
  )
}
