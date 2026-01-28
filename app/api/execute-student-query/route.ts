// D:\Vercel NEW\app\api\execute-student-query\route.ts - CORRECTED
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
      accountFormat // ⚠️ CRITICAL: Add this parameter!
    } = body;

    if (!studentAccount || !studentUsername || !password || !query) {
      return NextResponse.json({
        success: false,
        error: 'Missing required parameters'
      }, { status: 400 });
    }

    console.log('📊 Executing student query:', {
      account: studentAccount,
      format: accountFormat, // Log the format
      user: studentUsername,
      query: query.substring(0, 100) + (query.length > 100 ? '...' : '')
    });

    // ✅ Ensure queries use the right schema
    let finalQuery = query;
    
    // If query mentions COURSES or STUDENTS without schema, add STUDENT_WORKSPACE.
    if (query.includes('COURSES') && !query.includes('STUDENT_WORKSPACE.COURSES')) {
      finalQuery = query.replace(/COURSES/g, 'STUDENT_WORKSPACE.COURSES');
    }
    if (query.includes('STUDENTS') && !query.includes('STUDENT_WORKSPACE.STUDENTS')) {
      finalQuery = finalQuery.replace(/STUDENTS/g, 'STUDENT_WORKSPACE.STUDENTS');
    }
    
    console.log('🔧 Final query:', finalQuery);

    // ✅ PASS accountFormat parameter
    const result = await executeStudentQuery(
      {
        account: studentAccount,
        username: studentUsername,
        password: password,
        region: studentRegion,
        warehouse: 'COMPUTE_WH',
        accountFormat: accountFormat // ⚠️ MUST PASS THIS!
      },
      finalQuery,
      []
    );

    return NextResponse.json({
      success: true,
      results: (result as any).results || [],
      rowCount: (result as any).rowCount || 0,
      studentAccount: studentAccount,
      message: 'Query executed successfully'
    });

  } catch (error: any) {
    console.error('❌ Student query execution error:', error);
    
    let errorMessage = error.message;
    let requiresReconnect = false;
    let databaseError = false;
    
    if (error.message.includes('does not have a current database') || 
        error.message.includes('database does not exist') ||
        error.message.includes('STUDENT_DB')) {
      errorMessage = 'STUDENT_DB not found. Please reconnect.';
      databaseError = true;
      requiresReconnect = true;
    } else if (error.message.includes('authentication')) {
      requiresReconnect = true;
    } else if (error.message.includes('Actual statement count')) {
      errorMessage = 'Query format error. Please simplify your query.';
    }
    
    return NextResponse.json({
      success: false,
      error: errorMessage,
      requiresReconnect: requiresReconnect,
      databaseError: databaseError
    }, { status: 400 });
  }
}