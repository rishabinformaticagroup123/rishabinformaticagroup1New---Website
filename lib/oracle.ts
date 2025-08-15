// lib/db/oracle.ts
import oracledb from 'oracledb';

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

export async function runOracleQuery(sql: string) {
  let connection;

  try {
    connection = await oracledb.getConnection({
      user: process.env.ORACLE_USER,
      password: process.env.ORACLE_PASSWORD,
      connectString: process.env.ORACLE_CONNECT_STRING,
    });

    const result = await connection.execute(sql);
    return result;
  } catch (err) {
    console.error('Oracle query error:', err);
    throw new Error('Oracle query execution failed');
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (closeErr) {
        console.error('Error closing Oracle connection:', closeErr);
      }
    }
  }
}
