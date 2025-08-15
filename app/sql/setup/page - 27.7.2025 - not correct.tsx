'use client'

import { useEffect, useState } from 'react'
import Editor from '@monaco-editor/react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

export default function SQLLabPage() {
  const [query, setQuery] = useState('')
  const [output, setOutput] = useState<any[]>([])
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [mode, setMode] = useState<'oracle' | 'postgres'>('oracle')
  const [tables, setTables] = useState<string[]>([])

  useEffect(() => {
    fetch('/api/sql')
      .then(res => res.json())
      .then(data => setTables(data.tables || []))
  }, [])

  async function runQuery() {
    setError('')
    setInfo('')
    setOutput([])

    const res = await fetch('/api/sql', {
      method: 'POST',
      body: JSON.stringify({ query, mode }),
    })

    const data = await res.json()
    if (!res.ok) return setError(data.error || 'Unknown error')
    if (data.notice) setInfo(data.notice)
    if (data.info) setInfo(data.info)
    if (data.rows) setOutput(data.rows)
  }

  return (
    <div className="flex h-[calc(100vh-120px)]">
      <aside className="w-60 border-r bg-muted p-2 text-sm overflow-y-auto">
        <h2 className="font-bold mb-2">Tables</h2>
        <ul className="space-y-1">
          {tables.map(tbl => (
            <li key={tbl} className="truncate text-muted-foreground">{tbl}</li>
          ))}
        </ul>
      </aside>

      <main className="flex-1 flex flex-col">
        <div className="border-b bg-muted px-4 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className="font-semibold">SQL Mode:</span>
            <div className="flex items-center space-x-2">
              <span>Oracle</span>
              <Switch checked={mode === 'postgres'} onCheckedChange={() => setMode(mode === 'oracle' ? 'postgres' : 'oracle')} />
              <span>PostgreSQL</span>
            </div>
          </div>
          <Button onClick={runQuery}>Run Query</Button>
        </div>

        <div className="flex-1 grid grid-rows-[auto_1fr_auto] gap-2 p-2">
          <Editor
            height="300px"
            defaultLanguage="sql"
            defaultValue="SELECT * FROM students;"
            value={query}
            onChange={val => setQuery(val || '')}
            theme="vs-dark"
            className="rounded-md border"
          />

          <Tabs defaultValue="results">
            <TabsList>
              <TabsTrigger value="results">Results</TabsTrigger>
              <TabsTrigger value="messages">Messages</TabsTrigger>
            </TabsList>
            <TabsContent value="results">
              <div className="overflow-auto border p-2 rounded">
                {output.length > 0 ? (
                  <table className="min-w-full text-xs">
                    <thead>
                      <tr>
                        {Object.keys(output[0]).map(col => (
                          <th key={col} className="border px-2 py-1 text-left">{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {output.map((row, idx) => (
                        <tr key={idx}>
                          {Object.values(row).map((val, i) => (
                            <td key={i} className="border px-2 py-1">{String(val)}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-muted-foreground">No results</p>
                )}
              </div>
            </TabsContent>
            <TabsContent value="messages">
              <Card className="p-2 text-sm">
                {error && <p className="text-red-600">❌ {error}</p>}
                {info && <p className="text-green-700">✅ {info}</p>}
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
