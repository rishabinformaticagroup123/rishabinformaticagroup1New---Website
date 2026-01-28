import "server-only";

// ============ EXISTING FUNCTIONS (KEEP) ============

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

// ============ IMPROVED: Student connection function ============
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
    const snowflake = await import('snowflake-sdk');
    
    // Clean account name
    const cleanAccount = connectionConfig.account
      .replace('.snowflakecomputing.com', '')
      .replace('https://', '')
      .replace('http://', '')
      .toLowerCase()
      .trim();

    console.log('🌨️ Student Snowflake connection attempt:', {
      cleanAccount,
      region: connectionConfig.region,
      username: connectionConfig.username,
      passwordLength: connectionConfig.password.length
    });

    // Try multiple connection formats
    const connectionFormats = [];
    
    // Format 1: account.region (most common)
    if (connectionConfig.region) {
      connectionFormats.push(`${cleanAccount}.${connectionConfig.region}`);
    }
    
    // Format 2: account only (for some accounts)
    connectionFormats.push(cleanAccount);
    
    // Format 3: Try with default region
    connectionFormats.push(`${cleanAccount}.us-east-1`);
    
    // Format 4: Try with .us-west-2 (common)
    connectionFormats.push(`${cleanAccount}.us-west-2`);
    
    console.log('🔄 Will try these formats:', connectionFormats);
    
    let lastError = null;
    
    // Try each format
    for (const accountFormat of connectionFormats) {
      try {
        console.log(`🔄 Trying format: ${accountFormat}`);
        
        const connection = snowflake.createConnection({
          account: accountFormat,
          username: connectionConfig.username,
          password: connectionConfig.password,
          warehouse: connectionConfig.warehouse || 'COMPUTE_WH',
          database: connectionConfig.database || 'SNOWFLAKE_SAMPLE_DATA', // ← FIX: Use default database
          schema: connectionConfig.schema || undefined,
          role: connectionConfig.role || 'PUBLIC',
          timeout: 10000, // 10 seconds per attempt
          clientSessionKeepAlive: true,
        });

        const result = await new Promise((resolve, reject) => {
          connection.connect((err: any) => {
            if (err) {
              lastError = err;
              reject(err);
              return;
            }
            
            // Simple test query
            connection.execute({
              sqlText: 'SELECT 1 as test, CURRENT_USER() as user',
              complete: (err: any, stmt: any, rows: any) => {
                connection.destroy(() => {});
                if (err) {
                  reject(err);
                } else {
                  resolve({
                    success: true,
                    accountFormat: accountFormat,
                    account: cleanAccount,
                    username: connectionConfig.username,
                    region: connectionConfig.region,
                    user: rows?.[0]?.user
                  });
                }
              }
            });
          });
        });
        
        // If successful, return result
        console.log(`✅ Connection successful with format: ${accountFormat}`);
        return result;
        
      } catch (formatError: any) {
        console.log(`❌ Format ${accountFormat} failed:`, formatError.message);
        lastError = formatError;
        continue; // Try next format
      }
    }
    
    // If all formats failed
    console.error('❌ All connection formats failed:', lastError?.message);
    
    let errorMessage = 'Connection failed';
    if (lastError) {
      if (lastError.message.includes('Incorrect username or password')) {
        errorMessage = 'Invalid username or password';
      } else if (lastError.message.includes('account') || lastError.message.includes('region')) {
        errorMessage = 'Account or region error';
      } else if (lastError.message.includes('network') || lastError.message.includes('timeout')) {
        errorMessage = 'Network error or timeout';
      } else if (lastError.message.includes('Request to Snowflake failed')) {
        errorMessage = 'Cannot connect to Snowflake server';
      }
    }
    
    throw new Error(errorMessage);
    
  } catch (error: any) {
    console.error('❌ Snowflake connection error:', error.message);
    
    // Better error messages
    let errorMessage = error.message;
    
    if (errorMessage.includes('Invalid username or password')) {
      errorMessage = 'Invalid username or password. Please check your credentials.';
    } else if (errorMessage.includes('Account or region error')) {
      errorMessage = 'Account or region error. Try:\n• Account: UP61953 (Account locator)\n• Region: ap-south-1';
    } else if (errorMessage.includes('Network error')) {
      errorMessage = 'Network error or timeout. Check internet connection.';
    } else if (errorMessage.includes('Cannot connect to Snowflake')) {
      errorMessage = 'Cannot connect to Snowflake. Check account details.';
    }
    
    throw new Error(errorMessage);
  }
}

// ============ EXISTING executeStudentSnowflakeQuery (UPDATED - CRITICAL FIX) ============
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
    const snowflake = await import('snowflake-sdk');
    
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

    // Try multiple formats for query execution too
    const connectionFormats = [];
    if (connectionConfig.region) {
      connectionFormats.push(`${cleanAccount}.${connectionConfig.region}`);
    }
    connectionFormats.push(cleanAccount);
    connectionFormats.push(`${cleanAccount}.us-east-1`);
    
    let lastError = null;
    
    for (const accountFormat of connectionFormats) {
      try {
        console.log(`🔄 Query trying format: ${accountFormat}`);
        
        const connection = snowflake.createConnection({
          account: accountFormat,
          username: connectionConfig.username,
          password: connectionConfig.password,
          warehouse: connectionConfig.warehouse || 'COMPUTE_WH',
          // CRITICAL FIX: Always use STUDENT_DB for student queries
          database: connectionConfig.database || 'STUDENT_DB', // ← THIS WAS THE PROBLEM!
          schema: connectionConfig.schema || 'STUDENT_WORKSPACE', // ← ALSO ADD SCHEMA
          role: connectionConfig.role || 'PUBLIC',
        });

        const result = await new Promise((resolve, reject) => {
          connection.connect((err: any) => {
            if (err) {
              lastError = err;
              reject(err);
              return;
            }
            
            connection.execute({
              sqlText,
              binds,
              complete: (err: any, stmt: any, rows: any) => {
                connection.destroy(() => {});
                if (err) {
                  reject(err);
                } else {
                  resolve({
                    success: true,
                    results: rows || [],
                    rowCount: rows?.length || 0,
                    studentAccount: cleanAccount,
                    studentUsername: connectionConfig.username,
                    usedFormat: accountFormat,
                    database: connectionConfig.database || 'STUDENT_DB', // ← Return database info
                    schema: connectionConfig.schema || 'STUDENT_WORKSPACE'
                  });
                }
              }
            });
          });
        });
        
        console.log(`✅ Query successful with format: ${accountFormat}`);
        return result;
        
      } catch (formatError: any) {
        console.log(`❌ Query format ${accountFormat} failed:`, formatError.message);
        lastError = formatError;
        continue;
      }
    }
    
    throw new Error(lastError?.message || 'Query execution failed');
    
  } catch (error: any) {
    console.error('❌ Student query error:', error);
    
    const isAuthError = error.message.includes('authentication') || 
                       error.message.includes('password') || 
                       error.message.includes('Incorrect username');
    
    const err = new Error(error.message);
    (err as any).requiresReconnect = isAuthError;
    throw err;
  }
}

// ============ EXISTING getSnowflakeConnectionStatus (KEEP) ============
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

// ============ NEW: Simple connection helper ============
export async function simpleStudentConnection(
  account: string, 
  username: string, 
  password: string, 
  region: string
) {
  return testStudentSnowflakeConnection({
    account,
    username,
    password,
    region,
    warehouse: 'COMPUTE_WH'
  });
}

// ============ NEW: Student-specific query helper ============
export async function executeStudentDatabaseQuery(
  connectionConfig: {
    account: string;
    username: string;
    password: string;
    region?: string;
    warehouse?: string;
  },
  query: string,
  params: any[] = []
) {
  // Always use STUDENT_DB.STUDENT_WORKSPACE for student queries
  return executeStudentSnowflakeQuery(query, {
    ...connectionConfig,
    database: 'STUDENT_DB', // ← FORCE STUDENT_DB
    schema: 'STUDENT_WORKSPACE' // ← FORCE STUDENT_WORKSPACE
  }, params);
}

export { testStudentSnowflakeConnection as testSnowflakeConnection };