import { NextRequest, NextResponse } from 'next/server';
import { executeStudentQuery } from '@/lib/snowflake-student';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { 
      query, 
      studentAccount, 
      studentUsername, 
      studentRegion = 'us-east-1', 
      password,
      database = 'STUDENT_DB', // ← NEW: Default to STUDENT_DB
      schema = 'STUDENT_WORKSPACE' // ← NEW: Default schema
    } = body;

    if (!studentAccount || !studentUsername || !password || !query) {
      return NextResponse.json({
        success: false,
        error: 'Missing required parameters'
      }, { status: 400 });
    }

    console.log('📊 Executing student query:', {
      account: studentAccount,
      user: studentUsername,
      database, // ← Log database
      schema, // ← Log schema
      query: query.substring(0, 100) + (query.length > 100 ? '...' : '')
    });

    // Check if query needs STUDENT_DB context
    let processedQuery = query;
    
    // If query doesn't specify database, prepend USE DATABASE
    if (!query.includes('USE DATABASE') && !query.includes('STUDENT_DB.') && database) {
      // Simple check: if it's an INSERT/UPDATE/SELECT and mentions STUDENT_WORKSPACE
      if (query.includes('STUDENT_WORKSPACE.') && database) {
        // Option 1: Prepend USE DATABASE (most reliable)
        processedQuery = `USE DATABASE ${database};\n${query}`;
        
        console.log('🔄 Added USE DATABASE to query');
      }
    }

    const result = await executeStudentQuery(
      {
        account: studentAccount,
        username: studentUsername,
        password: password,
        region: studentRegion,
        warehouse: 'COMPUTE_WH'
      },
      processedQuery, // ← Use processed query
      [] // params array
    );

    return NextResponse.json({
      success: true,
      results: (result as any).results || [],
      rowCount: (result as any).rowCount || 0,
      studentAccount: studentAccount,
      database: database, // ← Return database info
      schema: schema, // ← Return schema info
      message: 'Query executed on student account'
    });

  } catch (error: any) {
    console.error('❌ Student query execution error:', error);
    
    // Check if error is about missing database
    if (error.message.includes('does not have a current database') || 
        error.message.includes('database does not exist')) {
      return NextResponse.json({
        success: false,
        error: 'Database context missing. Please reconnect to create STUDENT_DB database.',
        requiresReconnect: true,
        databaseError: true
      }, { status: 400 });
    }
    
    return NextResponse.json({
      success: false,
      error: error.message,
      requiresReconnect: error.message?.includes('authentication') || false
    }, { status: 400 });
  }
}