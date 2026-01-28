// app/api/execute-student-query/route.ts
import { NextRequest, NextResponse } from 'next/server';
import * as snowflake from 'snowflake-sdk';

export async function POST(request: NextRequest) {
  let connection: any = null;
  
  try {
    const body = await request.json();
    const { query, studentAccount, studentUsername, password } = body;

    if (!query) {
      return NextResponse.json(
        { success: false, error: 'No query provided' },
        { status: 400 }
      );
    }

    if (!studentAccount || !studentUsername || !password) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Student account credentials required. Please reconnect your account.' 
        },
        { status: 401 }
      );
    }

    // Clean account name
    const cleanAccount = studentAccount.replace('.snowflakecomputing.com', '').replace('https://', '');

    // Create connection with student credentials
    const connectionConfig = {
      account: cleanAccount,
      username: studentUsername,
      password: password,
      warehouse: 'COMPUTE_WH',
      database: 'SNOWFLAKE',
      schema: 'PUBLIC',
      role: 'PUBLIC',
    };

    connection = snowflake.createConnection(connectionConfig);
    
    return new Promise((resolve) => {
      connection.connect((err: any) => {
        if (err) {
          resolve(NextResponse.json({
            success: false,
            error: `Connection failed: ${err.message}`,
            requiresReconnect: true
          }, { status: 401 }));
          return;
        }

        // Execute the student's query
        const startTime = Date.now();
        connection.execute({
          sqlText: query,
          complete: (err: any, stmt: any, rows: any) => {
            const executionTime = Date.now() - startTime;
            
            if (err) {
              resolve(NextResponse.json({
                success: false,
                error: `Query execution failed: ${err.message}`,
                sqlState: err.code,
                executionTime: `${executionTime}ms`
              }, { status: 500 }));
            } else {
              resolve(NextResponse.json({
                success: true,
                results: rows,
                studentAccount: cleanAccount,
                studentUsername: studentUsername,
                executedAt: new Date().toISOString(),
                query: query,
                rowCount: rows?.length || 0,
                executionTime: `${executionTime}ms`,
                columns: stmt.getColumns()
              }));
            }
            
            // Close connection
            try {
              connection.destroy(() => {});
            } catch (e) {
              // Ignore
            }
          }
        });
      });
    });

  } catch (error: any) {
    console.error('❌ Student query execution error:', error);
    
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
        error: error.message || 'Query execution failed' 
      },
      { status: 500 }
    );
  }
}