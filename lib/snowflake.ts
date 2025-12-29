// lib/snowflake.ts
import "server-only";

// Dynamic import function for Snowflake
export async function executeSnowflakeQuery(sqlText: string, binds?: any[]) {
  try {
    // Dynamically import snowflake-sdk ONLY on server
    const snowflake = await import('snowflake-sdk');
    
    // Create connection configuration
    const connection = snowflake.createConnection({
      account: process.env.SNOWFLAKE_ACCOUNT!,
      username: process.env.SNOWFLAKE_USERNAME!,
      password: process.env.SNOWFLAKE_PASSWORD!,
      database: process.env.SNOWFLAKE_DATABASE || 'YOUR_DEFAULT_DATABASE',
      schema: process.env.SNOWFLAKE_SCHEMA || 'PUBLIC',
      warehouse: process.env.SNOWFLAKE_WAREHOUSE || 'COMPUTE_WH',
    });

    // Return promise for the query
    return new Promise((resolve, reject) => {
      connection.connect((err: any) => {
        if (err) {
          console.error('Snowflake connection error:', err.message);
          reject(new Error(`Connection failed: ${err.message}`));
          return;
        }
        
        console.log('✅ Snowflake connected successfully');
        
        // Execute the query
        connection.execute({
          sqlText,
          binds,
          complete: (err: any, stmt: any, rows: any) => {
            // Always destroy connection when done
            connection.destroy((destroyErr: any) => {
              if (destroyErr) {
                console.warn('Warning closing connection:', destroyErr.message);
              }
            });
            
            if (err) {
              console.error('Snowflake query error:', err.message);
              reject(new Error(`Query failed: ${err.message}`));
            } else {
              resolve(rows);
            }
          },
        });
      });
    });
    
  } catch (importError: any) {
    console.error('Failed to import snowflake-sdk:', importError);
    throw new Error('Snowflake SDK not available');
  }
}