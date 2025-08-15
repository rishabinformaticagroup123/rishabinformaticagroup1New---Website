'use client'
import { useEffect, useState, useRef } from 'react'
import Split from 'react-split'
import dynamic from 'next/dynamic'
import { Switch } from '@/components/ui/switch'

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
  const [sqlMode, setSqlMode] = useState<'oracle' | 'postgres'>('oracle')
  const [notice, setNotice] = useState<string | null>(null)
  const [info, setInfo] = useState<string | null>(null)
  const [tables, setTables] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [resultDisplayState, setResultDisplayState] = useState<
    'initial' | 'success' | 'table' | 'error' | 'loading'
  >('initial')
  const editorRef = useRef<any>(null)

  // Fetch tables from API
  const fetchTables = () => {
    fetch('/api/sql')
      .then(res => res.json())
      .then(data => (data.tables ? setTables(data.tables) : setError(data.error)))
      .catch(() => setError('Failed to load tables'))
  }

  useEffect(() => {
    fetchTables()
  }, [])

  // Extended Oracle to Postgres replacements + handlers for major functions & statements
  const oracleToPostgresReplacements = [
    // Data Types
    { detect: /\bNUMBER\(\s*(\d+)\s*,\s*(\d+)\s*\)/gi, replacement: 'NUMERIC($1, $2)' },
    { detect: /\bNUMBER\(\s*(\d+)\s*\)/gi, replacement: 'NUMERIC($1)' },
    { detect: /\bNUMBER\b/gi, replacement: 'NUMERIC' },
    { detect: /\bVARCHAR2\b/gi, replacement: 'VARCHAR' },
    { detect: /\bNVARCHAR2\b/gi, replacement: 'VARCHAR' }, // Oracle NVARCHAR2 → PG VARCHAR
    { detect: /\bDATE\b/gi, replacement: 'TIMESTAMP' }, // Oracle DATE includes time, PG DATE is just date
    { detect: /\bRAW\b/gi, replacement: 'BYTEA' },
    { detect: /\bCLOB\b/gi, replacement: 'TEXT' },
    { detect: /\bBLOB\b/gi, replacement: 'BYTEA' },

    // Functions
    { detect: /\bSYSDATE\b/gi, replacement: 'NOW()' },
    { detect: /\bSYSTIMESTAMP\b/gi, replacement: 'CURRENT_TIMESTAMP' },
    { detect: /\bNVL\s*\(/gi, replacement: 'COALESCE(' },
    { detect: /\bDECODE\s*\(([^)]+)\)/gi, replacement: (match, expr) => oracleDecodeToCase(expr) }, // custom handler
    { detect: /\bTO_DATE\s*\(([^,]+),\s*'([^']+)'\s*\)/gi, replacement: (match, dateStr, format) => oracleToDateToPostgres(dateStr, format) },
    { detect: /\bTO_CHAR\s*\(([^,]+),\s*'([^']+)'\s*\)/gi, replacement: (match, dateStr, format) => oracleToCharToPostgres(dateStr, format) },

    // SQL constructs
    { detect: /\bFROM\s+DUAL\b/gi, replacement: '' },

    // ALTER TABLE MODIFY syntax (must handle specially)
    // We'll handle ALTER TABLE MODIFY separately since it's a statement-level conversion
  ]

  // Detect Oracle syntax by matching above patterns (simplified)
  const containsOracleSyntax = (query: string) => {
    // Check for Oracle-specific keywords or functions
    if (/(\bNUMBER\b|\bVARCHAR2\b|\bNVARCHAR2\b|\bSYSDATE\b|\bSYSTIMESTAMP\b|\bNVL\b|\bDECODE\b|\bTO_DATE\b|\bTO_CHAR\b|\bFROM\s+DUAL\b|\bALTER\s+TABLE\s+\w+\s+MODIFY\b)/i.test(query)) {
      return true
    }
    return false
  }

  // Detect Postgres syntax by common keywords/functions
  const containsPostgresSyntax = (query: string) => {
    const pgRegexes = [
      /\bSERIAL\b/i,
      /\bBIGSERIAL\b/i,
      /\bSMALLSERIAL\b/i,
      /\bBYTEA\b/i,
      /\bBOOLEAN\b/i,
      /\bILIKE\b/i,
      /\bRETURNING\b/i,
      /\bON\s+CONFLICT\b/i,
      /\bDISTINCT\s+ON\b/i,
      /\bGENERATE_SERIES\b/i,
      /\bUNNEST\b/i,
      /\bTABLESAMPLE\b/i,
      /\bNOW\(\)/i,
      /::\s*\w+/i,
      /->>/,
      /->/,
      /\bARRAY\s*\[/i,
      /\bNUMERIC\b/i,
      /\bVARCHAR\b/i,
    ]
    return pgRegexes.some(rx => rx.test(query))
  }

  // Helper: Convert Oracle DECODE to CASE expression (basic support)
  function oracleDecodeToCase(expr: string) {
    // Very simplified DECODE parsing:
    // DECODE(expr, val1, res1, val2, res2, ..., default)
    // Converts to: CASE expr WHEN val1 THEN res1 WHEN val2 THEN res2 ... ELSE default END

    // Split by commas but ignore commas inside quotes (basic)
    let parts: string[] = []
    let curr = ''
    let inQuotes = false
    for (let ch of expr) {
      if (ch === "'") inQuotes = !inQuotes
      if (ch === ',' && !inQuotes) {
        parts.push(curr.trim())
        curr = ''
      } else {
        curr += ch
      }
    }
    if (curr.trim()) parts.push(curr.trim())

    if (parts.length < 3) {
      // invalid DECODE, fallback comment
      return '/* DECODE conversion failed - check manually */'
    }

    const compareExpr = parts[0]
    let caseExpr = `CASE ${compareExpr} `
    for (let i = 1; i < parts.length - 1; i += 2) {
      const whenVal = parts[i]
      const thenVal = parts[i + 1]
      caseExpr += `WHEN ${whenVal} THEN ${thenVal} `
    }
    if (parts.length % 2 === 0) {
      // even number parts → last is default
      caseExpr += `ELSE ${parts[parts.length - 1]} `
    }
    caseExpr += 'END'
    return caseExpr
  }

  // Helper: Convert TO_DATE with format to Postgres - basic subset of formats
  function oracleToDateToPostgres(dateStr: string, format: string) {
    // Postgres TO_TIMESTAMP supports similar but different formats.
    // Let's do basic replacements of Oracle format to Postgres format for TO_TIMESTAMP.
    let pgFormat = format
      .replace(/YYYY/gi, 'YYYY')
      .replace(/YY/gi, 'YY')
      .replace(/MM/gi, 'MM')
      .replace(/DD/gi, 'DD')
      .replace(/HH24/gi, 'HH24')
      .replace(/MI/gi, 'MI')
      .replace(/SS/gi, 'SS')

    // Return TO_TIMESTAMP(dateStr, pgFormat)
    return `TO_TIMESTAMP(${dateStr}, '${pgFormat}')`
  }

  // Helper: Convert TO_CHAR with format - basic support
  function oracleToCharToPostgres(dateStr: string, format: string) {
    let pgFormat = format
      .replace(/YYYY/gi, 'YYYY')
      .replace(/YY/gi, 'YY')
      .replace(/MM/gi, 'MM')
      .replace(/DD/gi, 'DD')
      .replace(/HH24/gi, 'HH24')
      .replace(/MI/gi, 'MI')
      .replace(/SS/gi, 'SS')

    return `TO_CHAR(${dateStr}, '${pgFormat}')`
  }

  // Special handling for ALTER TABLE MODIFY in Oracle → ALTER TABLE ALTER COLUMN TYPE in Postgres
  function convertAlterTableModify(query: string) {
    // Match ALTER TABLE <table> MODIFY <col> <datatype>;
    const regex = /ALTER\s+TABLE\s+(\w+)\s+MODIFY\s+(\w+)\s+([^\s;]+)(\s*\(.*?\))?/i
    const match = query.match(regex)
    if (!match) return query

    const tableName = match[1]
    const columnName = match[2]
    let dataType = match[3]
    const dataTypeParams = match[4] || ''

    // Convert Oracle datatype to Postgres datatype if needed
    // We'll apply some conversions here (like NUMBER → NUMERIC, VARCHAR2 → VARCHAR)
    let pgDataType = dataType.toUpperCase()
    if (pgDataType === 'NUMBER') {
      pgDataType = 'NUMERIC'
    } else if (pgDataType === 'VARCHAR2') {
      pgDataType = 'VARCHAR'
    } else if (pgDataType === 'NVARCHAR2') {
      pgDataType = 'VARCHAR'
    }

    // Compose new ALTER statement:
    return `ALTER TABLE ${tableName} ALTER COLUMN ${columnName} TYPE ${pgDataType}${dataTypeParams};`
  }

  // Main convertOracleToPostgres with all above replacements
  function convertOracleToPostgres(query: string) {
    let converted = query

    // Handle ALTER TABLE MODIFY first
    if (/ALTER\s+TABLE\s+\w+\s+MODIFY/i.test(converted)) {
      converted = convertAlterTableModify(converted)
      return converted
    }

    // Replace all other patterns
    oracleToPostgresReplacements.forEach(({ detect, replacement }) => {
      if (typeof replacement === 'function') {
        // function replacer
        converted = converted.replace(detect, replacement)
      } else {
        converted = converted.replace(detect, replacement)
      }
    })

    // Handle ROWNUM conversions to LIMIT
    const rownumEqualsZeroRegex = /where\s+rownum\s*=\s*0\s*;?/i
    const rownumLimitRegex = /where\s+rownum\s*<=\s*(\d+)\s*;?/i
    const rownumLessThanRegex = /where\s+rownum\s*<\s*(\d+)\s*;?/i

    if (rownumEqualsZeroRegex.test(converted)) {
      converted = converted.replace(rownumEqualsZeroRegex, '') + ' LIMIT 0;'
    } else if (rownumLimitRegex.test(converted)) {
      const match = converted.match(rownumLimitRegex)
      if (match && match[1]) {
        converted = converted.replace(rownumLimitRegex, '') + ` LIMIT ${match[1]};`
      }
    } else if (rownumLessThanRegex.test(converted)) {
      const match = converted.match(rownumLessThanRegex)
      if (match && match[1]) {
        const limitNum = Number(match[1]) - 1
        converted = converted.replace(rownumLessThanRegex, '') + ` LIMIT ${limitNum};`
      }
    }

    // Remove extra semicolons, trim spaces
    return converted.replace(/\s+;/g, ';').trim()
  }

  // Main convertQuery function implementing mode & message logic
  const convertQuery = (rawQuery: string, currentMode: 'oracle' | 'postgres') => {
    const hasOracle = containsOracleSyntax(rawQuery)
    const hasPostgres = containsPostgresSyntax(rawQuery)

    let convertedQuery = rawQuery
    let conversionMessage: string | null = null

    if (currentMode === 'oracle') {
      // Oracle mode:
      if (hasOracle) {
        convertedQuery = convertOracleToPostgres(rawQuery)
        conversionMessage = 'Your Oracle syntax was converted and executed on PostgreSQL backend.'
      } else if (hasPostgres) {
        // Postgres syntax in Oracle mode, run directly but notify user to switch mode
        conversionMessage = 'Your PostgreSQL syntax executed. Consider switching to PostgreSQL mode.'
      } else {
        conversionMessage = 'Your query executed successfully.'
      }
    } else {
      // Postgres mode:
      if (hasOracle) {
        convertedQuery = convertOracleToPostgres(rawQuery)
        conversionMessage = 'Your Oracle syntax executed after conversion. Consider switching to Oracle mode.'
      } else {
        conversionMessage = 'Your query executed successfully.'
      }
    }

    return { convertedQuery, conversionMessage }
  }

  // Run query and handle results & messages
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

    const { convertedQuery, conversionMessage } = convertQuery(queryToSend, sqlMode)

    try {
      const res = await fetch('/api/sql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: convertedQuery, mode: 'postgres' }), // always Postgres backend
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Query failed')

      const queryLower = convertedQuery.trim().toLowerCase()

      if (
        queryLower.startsWith('truncate') ||
        queryLower.startsWith('drop') ||
        queryLower.startsWith('delete') ||
        queryLower.startsWith('update') ||
        queryLower.startsWith('insert') ||
        queryLower.startsWith('create') ||
        queryLower.startsWith('alter')
      ) {
        let message = ''
        if (queryLower.startsWith('truncate')) message = 'Table truncated successfully.'
        else if (queryLower.startsWith('drop')) message = 'Object dropped successfully.'
        else if (queryLower.startsWith('delete')) message = 'Data deleted successfully.'
        else if (queryLower.startsWith('update')) message = 'Data updated successfully.'
        else if (queryLower.startsWith('insert')) message = 'Data inserted successfully.'
        else if (queryLower.startsWith('create')) message = 'Table created successfully.'
        else if (queryLower.startsWith('alter')) message = 'Table altered successfully.'

        if (conversionMessage) setNotice(conversionMessage)
        setInfo(message)
        setResultDisplayState('success')

        if (queryLower.startsWith('create') || queryLower.startsWith('drop') || queryLower.startsWith('alter')) {
          fetchTables() // refresh tables list
        }
      } else {
        setResult(data.rows || [])
        if (data.rows && data.rows.length > 0) setColumns(Object.keys(data.rows[0]))
        else if (data.columns) {
          setColumns(data.columns)
          setInfo('No results found.')
        } else {
          setColumns([])
          setInfo('No results found.')
        }
        if (conversionMessage) setNotice(conversionMessage)
        setResultDisplayState('table')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Query failed')
      setResultDisplayState('error')
    } finally {
      setLoading(false)
    }
  }

  // Render results
  const renderResultsContent = () => {
    switch (resultDisplayState) {
      case 'loading':
        return (
          <div className="flex justify-center items-center h-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400"></div>
          </div>
        )
      case 'error':
        return <pre className="text-red-600 whitespace-pre-wrap">{error}</pre>
      case 'success':
        return (
          <div className="flex justify-center items-center h-full text-green-600 text-sm font-medium">
            ✅ {info}
          </div>
        )
      case 'table':
        return (
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-xs">
              <thead>
                <tr className="bg-[#2c3e50] text-white">
                  {columns && columns.length > 0 ? (
                    columns.map(col => (
                      <th key={col} className="px-3 py-2 border border-gray-400">
                        {col}
                      </th>
                    ))
                  ) : (
                    <th className="px-3 py-2 border border-gray-400">No Columns Found</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {result && result.length > 0 ? (
                  result.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      {Object.values(row).map((cell, idx) => (
                        <td key={idx} className="px-3 py-2 border border-gray-300">
                          {String(cell)}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={columns?.length || 1} className="px-3 py-2 text-center text-gray-500">
                      {info || 'No results found.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )
      default:
        return (
          <div className="flex justify-center items-center h-full text-gray-400 text-sm">
            Run a query to see results
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-[#f5f6f7] text-gray-800">
      <div className="flex items-center justify-start gap-4 px-4 py-2 bg-[#2c3e50] text-white border-b">
        <label className="flex items-center gap-2">
          <span className="text-sm">Oracle (Oracle 11g, 21c, Snowflake)</span>
          <Switch
            checked={sqlMode === 'postgres'}
            onCheckedChange={checked => setSqlMode(checked ? 'postgres' : 'oracle')}
            className="data-[state=checked]:bg-blue-700"
          />
          <span className="text-sm">PostgreSQL (AWS, GCP, Azure)</span>
        </label>
      </div>

      <Split className="flex h-[calc(100vh-48px)]" sizes={[20, 80]} minSize={[200, 400]} gutterSize={6} snapOffset={30}>
        <div className="bg-[#f8f9fa] p-3 overflow-auto border-r border-gray-300">
          <h2 className="font-semibold text-[#2c3e50] mb-3 pb-2 border-b border-gray-300">Tables</h2>
          {tables.length > 0 ? (
            <ul className="space-y-1">
              {tables.map(table => (
                <li
                  key={table}
                  className="cursor-pointer py-1 px-2 rounded hover:bg-blue-100 transition-colors text-sm text-gray-700"
                  onClick={() => setQuery(`SELECT * FROM ${table};`)}
                >
                  {table}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No tables found.</p>
          )}
        </div>

        <Split className="flex flex-col" direction="vertical" sizes={[50, 50]} minSize={[200, 200]} gutterSize={6} snapOffset={30}>
          <div className="bg-white p-3 flex flex-col">
            <div className="flex-1 overflow-hidden">
              <AceEditor
                mode="sql"
                theme="sqlserver"
                value={query}
                onChange={setQuery}
                width="100%"
                height="100%"
                fontSize={13}
                setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                  showLineNumbers: true,
                  tabSize: 2,
                }}
                onLoad={editor => {
                  editorRef.current = { editor }
                }}
              />
            </div>
            <div className="mt-2 flex justify-between items-center">
              <button
                onClick={runQuery}
                disabled={loading}
                className={`bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm font-medium ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Running...' : 'Run Query'}
              </button>
              <div className="flex gap-2 text-xs">{notice && <span className="text-yellow-600">ℹ️ {notice}</span>}</div>
            </div>
            {error && (
              <pre className="text-red-600 whitespace-pre-wrap bg-red-50 p-2 rounded mt-2 text-xs">{error}</pre>
            )}
          </div>

          <div className="bg-white p-3 overflow-auto border-t border-gray-300">{renderResultsContent()}</div>
        </Split>
      </Split>
    </div>
  )
}
