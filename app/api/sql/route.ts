import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

function convertOracleToPostgres(query: string): string {
  return query
    .replace(/NUMBER\s*\(\s*\d+(\s*,\s*\d+)?\s*\)/gi, 'NUMERIC')
    .replace(/\bNUMBER\b/gi, 'INTEGER')
    .replace(/\bVARCHAR2\b/gi, 'VARCHAR')
    .replace(/\bSYSDATE\b/gi, 'CURRENT_DATE')
    .replace(/TO_DATE\(([^)]+),\s*'[^']+'\)/gi, 'CAST($1 AS DATE)');
}

function isDropProtectedTable(query: string): boolean {
  const protectedTables = ['students', 'coordinators', 'address', 'employees', 'departments', 'locations'];
  const lowerQuery = query.toLowerCase().replace(/\s+/g, ' ').trim();

  for (const tbl of protectedTables) {
    const regex = new RegExp(`^drop table( if exists)? (public\\.)?${tbl}\\b`, 'i');
    if (regex.test(lowerQuery)) return true;
  }
  return false;
}

function extractTableName(query: string): string | null {
  const match = query.match(/from\s+([a-zA-Z_][a-zA-Z0-9_]*)/i);
  return match ? match[1].toLowerCase() : null;
}

export async function POST(req: NextRequest) {
  try {
    let { query, dbType } = await req.json();

    if (isDropProtectedTable(query)) {
      return NextResponse.json({ error: 'Dropping protected tables is not allowed.' }, { status: 403 });
    }

    if (dbType === 'oracle') {
      query = convertOracleToPostgres(query);
    }

    if (query.trim().toLowerCase().startsWith('select * from')) {
      const tableName = extractTableName(query);
      if (tableName) {
        const countResult = await pool.query(`SELECT COUNT(*) FROM ${tableName}`);
        if (parseInt(countResult.rows[0].count, 10) === 0) {
          const structureResult = await pool.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = $1
          `, [tableName]);
          return NextResponse.json({
            rows: structureResult.rows,
            notice: 'No data found. Showing table structure.'
          });
        }
      }
    }

    const result = await pool.query(query);
    return NextResponse.json({
      columns: result.fields?.map(f => f.name) || [],
      rows: result.rows,
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function GET() {
  try {
    const tables = await pool.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);
    return NextResponse.json({ tables: tables.rows.map(r => r.table_name) });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
