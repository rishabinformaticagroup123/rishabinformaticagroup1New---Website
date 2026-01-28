// app/api/execute-student-query/route.ts
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
      password 
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
      query: query.substring(0, 100) + '...'
    });

    const result = await executeStudentQuery(
      {
        account: studentAccount,
        username: studentUsername,
        password: password,
        region: studentRegion,
        warehouse: 'COMPUTE_WH'
      },
      query
    );

    return NextResponse.json({
      success: true,
      results: (result as any).results || [],
      rowCount: (result as any).rowCount || 0,
      studentAccount: studentAccount,
      message: 'Query executed on student account'
    });

  } catch (error: any) {
    console.error('❌ Student query execution error:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message,
      requiresReconnect: error.message?.includes('authentication') || false
    }, { status: 400 });
  }
}