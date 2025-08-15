// conversion.ts
export type SqlMode = 'oracle' | 'postgres'

const oracleReplacements = [
  {
    detect: /\bNUMBER\(\s*(\d+)\s*,\s*(\d+)\s*\)/i,
    replace: /NUMBER\(\s*(\d+)\s*,\s*(\d+)\s*\)/gi,
    replacement: 'NUMERIC($1, $2)',
  },
  { detect: /\bNUMBER\(\s*(\d+)\s*\)/i, replace: /NUMBER\(\s*(\d+)\s*\)/gi, replacement: 'NUMERIC($1)' },
  { detect: /\bNUMBER\b/i, replace: /\bNUMBER\b/gi, replacement: 'NUMERIC' },
  { detect: /\bVARCHAR2\b/i, replace: /\bVARCHAR2\b/gi, replacement: 'VARCHAR' },
  { detect: /\bSYSDATE\b/i, replace: /\bSYSDATE\b/gi, replacement: 'NOW()' },
  { detect: /\bFROM\s+DUAL\b/i, replace: /\bFROM\s+DUAL\b/gi, replacement: '' },
  { detect: /\bNVL\s*\(/i, replace: /\bNVL\s*\(/gi, replacement: 'COALESCE(' },
  { detect: /\bDECODE\s*\(/i, replace: /\bDECODE\s*\(/gi, replacement: '/* DECODE: review conversion */' },
]

// Detect if query contains Oracle syntax
export function containsOracleSyntax(query: string) {
  return oracleReplacements.some(p => p.detect.test(query))
}

// Detect if query contains PostgreSQL syntax
const postgresDetect = [
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

export function containsPostgresSyntax(query: string) {
  return postgresDetect.some(r => r.test(query))
}

export function convertOracleToPostgres(query: string) {
  let converted = query.trim()
  
// Corrected line here — use 'converted' instead of undefined 'trimmedQuery'
  const descRegex = /^\s*DESC(?:RIBE)?\s+(\w+)\s*;?$/i;
  const match = converted.match(descRegex);
  if (match && match[1]) {
    const tableName = match[1].toLowerCase();
    return `
      SELECT
        column_name,
        data_type,
        character_maximum_length,
        numeric_precision,
        numeric_scale,
        is_nullable
      FROM
        information_schema.columns
      WHERE
        table_name = '${tableName}'
        AND table_schema = 'public'
      ORDER BY
        ordinal_position;
    `.trim();
  }

  // Basic datatype replacements
  oracleReplacements.forEach(p => {
    converted = converted.replace(p.replace, p.replacement)
  })

  // Handle ROWNUM conversion
  const rownumEqualsZeroRegex = /where\s+rownum\s*=\s*0\s*;?/i
  const rownumLimitRegex = /where\s+rownum\s*<=\s*(\d+)\s*;?/i

  if (rownumEqualsZeroRegex.test(converted)) {
    converted = converted.replace(rownumEqualsZeroRegex, '') + ' LIMIT 0;'
  } else if (rownumLimitRegex.test(converted)) {
    const match = converted.match(rownumLimitRegex)
    if (match && match[1]) {
      const limitNum = match[1]
      converted = converted.replace(rownumLimitRegex, '') + ` LIMIT ${limitNum};`
    }
  } else {
    const rownumLessThanRegex = /where\s+rownum\s*<\s*(\d+)\s*;?/i
    const rownumLessThanEqualRegex = /where\s+rownum\s*<=\s*(\d+)\s*;?/i
    if (rownumLessThanEqualRegex.test(converted)) {
      const match = converted.match(rownumLessThanEqualRegex)
      if (match && match[1]) {
        converted = converted.replace(rownumLessThanEqualRegex, '') + ` LIMIT ${match[1]};`
      }
    } else if (rownumLessThanRegex.test(converted)) {
      const match = converted.match(rownumLessThanRegex)
      if (match && match[1]) {
        const limitNum = Number(match[1]) - 1
        converted = converted.replace(rownumLessThanRegex, '') + ` LIMIT ${limitNum};`
      }
    }
  }

  // Handle ALTER TABLE MODIFY for various datatypes
  const alterModifyRegex = /ALTER\s+TABLE\s+(\w+)\s+MODIFY\s+(\w+)\s+([\w\s\(\),]+);/gi
  converted = converted.replace(alterModifyRegex, (match, table, column, datatype) => {
    datatype = datatype.trim()
    datatype = datatype.replace(/NUMBER\s*\((\d+)(,\s*\d+)?\)/gi, 'NUMERIC$1$2')
    datatype = datatype.replace(/VARCHAR2/gi, 'VARCHAR')
    return `ALTER TABLE ${table} ALTER COLUMN ${column} TYPE ${datatype};`
  })

  // Handle RENAME TABLE (Oracle) -> ALTER TABLE RENAME TO (Postgres)
  const renameTableRegex = /RENAME\s+(\w+)\s+TO\s+(\w+);/gi
  converted = converted.replace(renameTableRegex, (match, oldName, newName) => {
    return `ALTER TABLE ${oldName} RENAME TO ${newName};`
  })

  // Handle CHECK constraints with LENGTH on NUMBER fields
  const checkLengthRegex = /CHECK\s*\(\s*LENGTH\s*\(\s*(\w+)\s*\)\s*=\s*(\d+)\s*\)/gi
  converted = converted.replace(checkLengthRegex, (match, column, len) => {
    return `CHECK (LENGTH(CAST(${column} AS TEXT)) = ${len})`
  })

  return converted.replace(/\s+;/g, ';').trim()
}

export function convertQuery(rawQuery: string, currentMode: SqlMode) {
  const hasOracle = containsOracleSyntax(rawQuery)
  const hasPostgres = containsPostgresSyntax(rawQuery)

  let convertedQuery = rawQuery
  let conversionMessage: string | null = null

  if (currentMode === 'oracle') {
    if (hasOracle) {
      convertedQuery = convertOracleToPostgres(rawQuery)
      conversionMessage = 'Your query executed successfully.'
    } else if (hasPostgres) {
      conversionMessage = 'Your PostgreSQL syntax executed, consider switching to Postgres mode.'
    } else {
      conversionMessage = 'Your query executed successfully.'
    }
  } else {
    if (hasOracle) {
      convertedQuery = convertOracleToPostgres(rawQuery)
      conversionMessage = 'Your Oracle syntax executed, consider switching to Oracle mode.'
    } else {
      conversionMessage = 'Your query executed successfully.'
    }
  }

  return { convertedQuery, conversionMessage }
}
