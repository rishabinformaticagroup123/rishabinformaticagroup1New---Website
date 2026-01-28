// app/api/test-snowflake-connection/route.ts
import { NextRequest, NextResponse } from 'next/server';
import * as snowflake from 'snowflake-sdk';

export async function POST(request: NextRequest) {
  let connection: any = null;
  
  try {
    const body = await request.json();
    const { account, username, password } = body;

    if (!account || !username || !password) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Missing required fields: account, username, and password are required' 
        },
        { status: 400 }
      );
    }

    // Clean account name (remove .snowflakecomputing.com if present)
    const cleanAccount = account.replace('.snowflakecomputing.com', '').replace('https://', '');

    // Create Snowflake connection configuration
    const connectionConfig = {
      account: cleanAccount,
      username: username,
      password: password,
      warehouse: 'COMPUTE_WH', // Default warehouse
      database: 'SNOWFLAKE',   // Default database
      schema: 'ACCOUNT_USAGE', // Default schema for trial
      role: 'PUBLIC',          // Default role
      clientSessionKeepAlive: true,
    };

    // Create and test connection
    connection = snowflake.createConnection(connectionConfig);
    
    return new Promise((resolve) => {
      connection.connect((err: any, conn: any) => {
        if (err) {
          console.error('❌ Snowflake connection failed:', err.message);
          resolve(NextResponse.json({
            success: false,
            error: `Connection failed: ${err.message}`,
            suggestion: 'Please check your account name, username, and password.'
          }, { status: 401 }));
          
          // Try to destroy connection if it was partially created
          try {
            connection.destroy((destroyErr: any) => {
              if (destroyErr) console.error('Error destroying connection:', destroyErr);
            });
          } catch (e) {
            // Ignore destroy errors
          }
        } else {
          console.log('✅ Snowflake connection successful for account:', cleanAccount);
          
          // Test with a simple query
          connection.execute({
            sqlText: 'SELECT CURRENT_ACCOUNT() as account, CURRENT_USER() as user, CURRENT_VERSION() as version',
            complete: (err: any, stmt: any, rows: any) => {
              if (err) {
                resolve(NextResponse.json({
                  success: false,
                  error: `Query test failed: ${err.message}`
                }, { status: 500 }));
              } else {
                resolve(NextResponse.json({
                  success: true,
                  message: 'Successfully connected to Snowflake',
                  account: cleanAccount,
                  username: username,
                  connectionInfo: rows[0],
                  timestamp: new Date().toISOString()
                }));
              }
              
              // Close connection after test
              try {
                connection.destroy((destroyErr: any) => {
                  if (destroyErr) console.error('Error destroying connection:', destroyErr);
                });
              } catch (e) {
                // Ignore destroy errors
              }
            }
          });
        }
      });
    });

  } catch (error: any) {
    console.error('❌ Connection test error:', error);
    
    // Ensure connection is closed on error
    if (connection) {
      try {
        connection.destroy(() => {});
      } catch (e) {
        // Ignore
      }
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: error.message || 'Connection test failed. Please try again.' 
      },
      { status: 500 }
    );
  }
}