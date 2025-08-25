'use client'

import { useEffect, useState, useRef } from 'react'
import dynamic from 'next/dynamic'
import { signIn } from 'next-auth/react'
import { Switch } from '@/components/ui/switch'
import { convertQuery, SqlMode } from '@/lib/conversion'
import AppUI from './AppUI' // Make sure this matches your filename

const AceEditor = dynamic(() => import('react-ace'), { ssr: false })

if (typeof window !== 'undefined') {
  const ace = require('ace-builds/src-noconflict/ace')
  window.ace = ace
  require('ace-builds/src-noconflict/ext-language_tools')
  require('ace-builds/src-noconflict/theme-sqlserver')
  require('ace-builds/src-noconflict/mode-sql')
}

export default function App() {
  const [query, setQuery] = useState('SELECT * FROM students;')
  const [result, setResult] = useState<any[] | null>(null)
  const [columns, setColumns] = useState<string[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [sqlMode, setSqlMode] = useState<SqlMode>('oracle')
  const [notice, setNotice] = useState<string | null>(null)
  const [info, setInfo] = useState<string | null>(null)
  const [tables, setTables] = useState<string[]>([])
  const [views, setViews] = useState<string[]>([])
  const [connections, setConnections] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [resultDisplayState, setResultDisplayState] = useState<'initial' | 'success' | 'table' | 'error' | 'loading'>('initial')
  const [isAIAssistantOpen, setAIAssistantOpen] = useState(false)
  const [isAuthModalOpen, setAuthModalOpen] = useState<'login' | 'signup' | null>(null)

  // Auth states
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState<string | null>(null)
  const [user, setUser] = useState<any>(null)

  const editorRef = useRef<any>(null)

  const fetchMetadata = async () => {
    try {
      const res = await fetch('/api/sql')
      const data = await res.json()
      setTables(data.tables || [])
      setViews(data.views || [])
      setConnections(data.connections || [])
    } catch {
      setError('Failed to load metadata')
    }
  }

  useEffect(() => {
    fetchMetadata()
    
    const checkAuthStatus = async () => {
      try {
        const res = await fetch('/api/auth/session')
        const session = await res.json()
        if (session.user) setUser(session.user)
      } catch {
        console.log('No active session')
      }
    }
    
    checkAuthStatus()
  }, [])

  // Function to detect query syntax type
  const detectQuerySyntax = (query: string): 'oracle' | 'postgres' | 'unknown' => {
    const lowerQuery = query.toLowerCase().trim();
    
    // Oracle-specific patterns
    const oraclePatterns = [
      /varchar2\s*\(\s*\d+\s*\)/i,
      /number\s*\(\s*\d+\s*\)/i,
      /date\s+/i,
      /from\s+[\w$#]+\s*(where|group by|order by|$)/i,
      /dual(?:\s|;|$)/i,
      /dbms_/i
    ];
    
    // PostgreSQL-specific patterns
    const postgresPatterns = [
      /varchar\s*\(\s*\d+\s*\)/i,
      /text(?:\s|,|;|\))/i,
      /serial\s+/i,
      /from\s+[\w"]+\s*(where|group by|order by|$)/i,
      /current_date|current_timestamp/i,
      /pg_/i
    ];
    
    const oracleMatches = oraclePatterns.filter(pattern => pattern.test(query)).length;
    const postgresMatches = postgresPatterns.filter(pattern => pattern.test(query)).length;
    
    if (oracleMatches > postgresMatches) return 'oracle';
    if (postgresMatches > oracleMatches) return 'postgres';
    
    // For very simple queries, check the mode
    if (lowerQuery.startsWith('select') || lowerQuery.startsWith('insert') || 
        lowerQuery.startsWith('update') || lowerQuery.startsWith('delete')) {
      return sqlMode; // Assume current mode for basic queries
    }
    
    return 'unknown';
  };

  const runQuery = async () => {
    setLoading(true)
    setResultDisplayState('loading')
    setError(null)
    setNotice(null)
    setInfo(null)
    setResult(null)
    setColumns(null)

    const selectedText = editorRef.current?.editor.getCopyText() || ''
    const queryToSend = selectedText.trim() !== '' ? selectedText : query

    const { convertedQuery } = convertQuery(queryToSend, sqlMode)
    const queryLower = convertedQuery.trim().toLowerCase()

    try {
      const res = await fetch('/api/sql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: convertedQuery }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Query failed')

      // Detect syntax and set appropriate message
      const detectedSyntax = detectQuerySyntax(queryToSend);
      
      if (detectedSyntax === sqlMode || detectedSyntax === 'unknown') {
        setInfo('✅ Your query executed successfully.');
      } else {
        const otherMode = sqlMode === 'oracle' ? 'PostgreSQL' : 'Oracle';
        setInfo(`⚠️ Your ${otherMode} syntax executed. Consider switching to ${otherMode} mode.`);
      }

      // Refresh metadata automatically after structural queries
      if (queryLower.startsWith('create') || queryLower.startsWith('drop') || 
          queryLower.startsWith('alter') || queryLower.startsWith('truncate')) {
        await fetchMetadata()
      }

      // Handle different query types appropriately
      if (queryLower.startsWith('drop') || queryLower.startsWith('truncate')) {
        // For DROP/TRUNCATE, just show success message (no table structure)
        setResultDisplayState('success');
      } 
      else if (data.rows) {
        // For SELECT queries with results
        setResult(data.rows);
        if (data.columns && data.columns.length > 0) {
          setColumns(data.columns);
        }
        setResultDisplayState('table');
      }
      else if (queryLower.startsWith('create table')) {
        // For CREATE TABLE, extract and show column structure
        const columnMatch = queryToSend.match(/(\w+)\s+(number|varchar2|varchar|date|numeric|text|serial)\s*(?:\(\d+\))?/gi);
        if (columnMatch) {
          const extractedColumns = columnMatch.map(col => {
            const parts = col.split(/\s+/);
            return parts[0];
          }).filter((col, index, arr) => 
            index === arr.indexOf(col) &&
            !['create', 'table'].includes(col.toLowerCase())
          );
          setColumns(extractedColumns);
          setResultDisplayState('table');
        } else {
          setResultDisplayState('success');
        }
      }
      else if (queryLower.startsWith('insert') || queryLower.startsWith('update') || queryLower.startsWith('delete')) {
        // For DML operations, just show success
        setResultDisplayState('success');
      }
      else {
        // For other queries, show whatever the server returned
        if (data.rows) setResult(data.rows);
        if (data.columns) setColumns(data.columns);
        setResultDisplayState(data.rows || data.columns ? 'table' : 'success');
      }

      if (data.notice) setNotice(data.notice);

    } catch (err: any) {
      setError(err.message)
      setResultDisplayState('error')
    } finally {
      setLoading(false)
    }
  }

  const handleOwnAuth = async () => {
    setAuthError(null)
    if (!email || !password) {
      setAuthError('Email and password are required.')
      return
    }

    try {
      const result = await signIn('credentials', { redirect: false, email, password, callbackUrl: '/' })
      if (result?.error) setAuthError(result.error)
      else {
        setUser({ email })
        setAuthModalOpen(null)
        setEmail('')
        setPassword('')
      }
    } catch (err: any) {
      setAuthError(err.message)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/signout', { method: 'POST' })
      setUser(null)
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const signInWithGoogle = () => {
    signIn('google')
  }

  const renderResultsContent = () => {
    switch (resultDisplayState) {
      case 'loading':
        return <div className="flex justify-center items-center h-full"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400"></div></div>
      case 'error':
        return <pre className="text-red-600 whitespace-pre-wrap">{error}</pre>
      case 'table':
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-xs">
              <thead>
                <tr className="bg-[#2c3e50] text-white">
                  {columns && columns.length > 0 ? columns.map(col => (
                    <th key={col} className="px-3 py-2 border border-gray-400">{col}</th>
                  )) : (
                    <th className="px-3 py-2 border border-gray-400 text-center">
                      No data found. Showing table structure.
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {result && result.length > 0 ? result.map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    {columns && columns.map((col, idx) => (
                      <td key={idx} className="px-3 py-2 border border-gray-300">
                        {row[col] !== undefined && row[col] !== null ? String(row[col]) : 'NULL'}
                      </td>
                    ))}
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={columns?.length || 1} className="px-3 py-2 text-center text-gray-500">
                      {columns && columns.length > 0 ? 'No data found. Showing table structure.' : 'No columns to display.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )
      case 'success':
        return (
          <div className="flex justify-center items-center h-full text-green-700 bg-green-50 p-4 rounded">
            {info || 'Query executed successfully.'}
          </div>
        )
      default:
        return <div className="flex justify-center items-center h-full text-gray-400 text-sm">Run a query to see results</div>
    }
  }

  return (
    <AppUI
      // State values
      query={query}
      result={result}
      columns={columns}
      error={error}
      sqlMode={sqlMode}
      notice={notice}
      info={info}
      tables={tables}
      views={views}
      connections={connections}
      loading={loading}
      resultDisplayState={resultDisplayState}
      isAIAssistantOpen={isAIAssistantOpen}
      isAuthModalOpen={isAuthModalOpen}
      email={email}
      password={password}
      authError={authError}
      user={user}
      
      // State setters
      setQuery={setQuery}
      setSqlMode={setSqlMode}
      setAIAssistantOpen={setAIAssistantOpen}
      setAuthModalOpen={setAuthModalOpen}
      setEmail={setEmail}
      setPassword={setPassword}
      
      // Functions
      runQuery={runQuery}
      handleOwnAuth={handleOwnAuth}
      handleLogout={handleLogout}
      signInWithGoogle={signInWithGoogle}
      renderResultsContent={renderResultsContent}
      AceEditor={AceEditor}
      editorRef={editorRef}
    />
  )
}