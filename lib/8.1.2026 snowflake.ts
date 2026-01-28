// lib/snowflake.ts
import "server-only";

// Dynamic import function for Snowflake - YOUR EXISTING WORKING FUNCTION
export async function executeSnowflakeQuery(sqlText: string, binds?: any[]) {
  try {
    // Dynamically import snowflake-sdk ONLY on server
    const snowflake = await import('snowflake-sdk');
    
    // Create connection configuration (using YOUR environment variables)
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
          console.error('❌ Snowflake connection error:', err.message);
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
              console.error('❌ Snowflake query error:', err.message);
              reject(new Error(`Query failed: ${err.message}`));
            } else {
              console.log(`✅ Query successful, rows: ${rows?.length || 0}`);
              resolve(rows);
            }
          },
        });
      });
    });
    
  } catch (importError: any) {
    console.error('❌ Failed to import snowflake-sdk:', importError);
    throw new Error('Snowflake SDK not available');
  }
}

// NEW: Function for testing student Snowflake connections
export async function testStudentSnowflakeConnection(connectionConfig: {
  account: string;
  username: string;
  password: string;
  region?: string;
  warehouse?: string;
  database?: string;
  schema?: string;
  role?: string;
}) {
  try {
    // Dynamically import snowflake-sdk ONLY on server
    const snowflake = await import('snowflake-sdk');
    
    // Clean account name (remove domain, https:// etc.)
    const cleanAccount = connectionConfig.account
      .replace('.snowflakecomputing.com', '')
      .replace('https://', '')
      .replace('http://', '')
      .toLowerCase()
      .trim();

    // Create connection configuration for student
    const connection = snowflake.createConnection({
      account: cleanAccount,
      username: connectionConfig.username,
      password: connectionConfig.password,
      warehouse: connectionConfig.warehouse || 'COMPUTE_WH',
      database: connectionConfig.database || undefined,
      schema: connectionConfig.schema || undefined,
      role: connectionConfig.role || 'PUBLIC',
      region: connectionConfig.region || 'us-east-1',
    });

    console.log('🔐 Testing student Snowflake connection for:', {
      account: cleanAccount,
      username: connectionConfig.username,
      region: connectionConfig.region || 'us-east-1',
      passwordLength: connectionConfig.password.length
    });

    // Return promise for the connection test
    return new Promise((resolve, reject) => {
      connection.connect((err: any) => {
        if (err) {
          console.error('❌ Student Snowflake connection error:', err.message);
          
          // Provide better error messages
          let errorMessage = err.message;
          if (errorMessage.includes('Incorrect username or password')) {
            errorMessage = 'Invalid username or password';
          } else if (errorMessage.includes('account')) {
            errorMessage = 'Invalid account name or region';
          } else if (errorMessage.includes('network') || errorMessage.includes('connection refused')) {
            errorMessage = 'Network error. Check your internet connection';
          }
          
          reject(new Error(errorMessage));
          return;
        }
        
        console.log('✅ Student Snowflake connected successfully:', cleanAccount);
        
        // Test with a simple query
        connection.execute({
          sqlText: 'SELECT CURRENT_USER() as user, CURRENT_ACCOUNT() as account, CURRENT_REGION() as region, CURRENT_VERSION() as version',
          complete: (err: any, stmt: any, rows: any) => {
            // Always destroy connection when done
            connection.destroy((destroyErr: any) => {
              if (destroyErr) {
                console.warn('Warning closing student connection:', destroyErr.message);
              }
            });
            
            if (err) {
              console.error('❌ Student test query error:', err.message);
              reject(new Error(`Test query failed: ${err.message}`));
            } else {
              console.log('✅ Student connection test successful:', {
                account: rows?.[0]?.account,
                user: rows?.[0]?.user,
                region: rows?.[0]?.region
              });
              
              resolve({
                success: true,
                data: rows?.[0] || {},
                account: cleanAccount,
                username: connectionConfig.username,
                region: connectionConfig.region || 'us-east-1',
                version: rows?.[0]?.version || 'Unknown'
              });
            }
          },
        });
      });
    });
    
  } catch (importError: any) {
    console.error('❌ Failed to import snowflake-sdk for student connection:', importError);
    throw new Error('Snowflake SDK not available');
  }
}

// NEW: Function for executing queries on student's Snowflake account
export async function executeStudentSnowflakeQuery(
  sqlText: string, 
  connectionConfig: {
    account: string;
    username: string;
    password: string;
    region?: string;
    warehouse?: string;
    database?: string;
    schema?: string;
    role?: string;
  },
  binds?: any[]
) {
  try {
    // Dynamically import snowflake-sdk ONLY on server
    const snowflake = await import('snowflake-sdk');
    
    // Clean account name
    const cleanAccount = connectionConfig.account
      .replace('.snowflakecomputing.com', '')
      .replace('https://', '')
      .replace('http://', '')
      .toLowerCase()
      .trim();

    console.log('📊 Executing student query:', {
      account: cleanAccount,
      query: sqlText.substring(0, 100) + (sqlText.length > 100 ? '...' : '')
    });

    // Create connection configuration for student
    const connection = snowflake.createConnection({
      account: cleanAccount,
      username: connectionConfig.username,
      password: connectionConfig.password,
      warehouse: connectionConfig.warehouse || 'COMPUTE_WH',
      database: connectionConfig.database || undefined,
      schema: connectionConfig.schema || undefined,
      role: connectionConfig.role || 'PUBLIC',
      region: connectionConfig.region || 'us-east-1',
    });

    // Return promise for the query execution
    return new Promise((resolve, reject) => {
      connection.connect((err: any) => {
        if (err) {
          console.error('❌ Student query connection error:', err.message);
          
          // Check if it's an authentication error
          const isAuthError = err.message.includes('authentication') || 
                            err.message.includes('password') || 
                            err.message.includes('Incorrect username');
          
          const error = new Error(err.message);
          (error as any).requiresReconnect = isAuthError;
          reject(error);
          return;
        }
        
        console.log('✅ Connected to student account, executing query...');
        
        // Execute the query
        connection.execute({
          sqlText,
          binds,
          complete: (err: any, stmt: any, rows: any) => {
            // Always destroy connection when done
            connection.destroy((destroyErr: any) => {
              if (destroyErr) {
                console.warn('Warning closing student query connection:', destroyErr.message);
              }
            });
            
            if (err) {
              console.error('❌ Student query execution error:', err.message);
              reject(new Error(`Query failed: ${err.message}`));
            } else {
              console.log(`✅ Student query successful, rows: ${rows?.length || 0}`);
              
              // Format results with column names if available
              let formattedResults = rows;
              if (rows && stmt?.getColumns) {
                try {
                  formattedResults = rows.map((row: any) => {
                    const formattedRow: any = {};
                    const columns = stmt.getColumns();
                    columns.forEach((col: any, index: number) => {
                      const colName = col.getName ? col.getName() : `column_${index}`;
                      formattedRow[colName] = row[index];
                    });
                    return formattedRow;
                  });
                } catch (formatError) {
                  console.warn('⚠️ Could not format results:', formatError);
                  formattedResults = rows;
                }
              }
              
              resolve({
                success: true,
                results: formattedResults,
                rowCount: formattedResults?.length || 0,
                studentAccount: cleanAccount,
                studentUsername: connectionConfig.username
              });
            }
          },
        });
      });
    });
    
  } catch (importError: any) {
    console.error('❌ Failed to import snowflake-sdk for student query:', importError);
    throw new Error('Snowflake SDK not available');
  }
}

// NEW: Simple function to get demo connection status
export async function getSnowflakeConnectionStatus() {
  try {
    const rows: any = await executeSnowflakeQuery(
      'SELECT CURRENT_ACCOUNT() as account, CURRENT_REGION() as region, CURRENT_VERSION() as version'
    );
    
    return {
      success: true,
      status: 'connected',
      account: rows?.[0]?.account,
      region: rows?.[0]?.region,
      version: rows?.[0]?.version
    };
  } catch (error: any) {
    return {
      success: false,
      status: 'disconnected',
      error: error.message
    };
  }
}