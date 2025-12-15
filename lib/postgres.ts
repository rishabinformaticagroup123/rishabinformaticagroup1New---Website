// lib/db/postgres.ts
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export async function runPostgresQuery(sql: string) {
  try {
    const result = await pool.query(sql);
    return result;
  } catch (err) {
    console.error('PostgreSQL query error:', err);
    throw new Error('PostgreSQL query execution failed');
  }
}
