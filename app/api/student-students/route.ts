// app/api/student-students/route.ts - NEW FILE
import { NextRequest, NextResponse } from 'next/server';
import { executeStudentQuery } from '@/lib/snowflake-student';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const studentAccount = searchParams.get('studentAccount');
    const studentUsername = searchParams.get('studentUsername');
    const studentRegion = searchParams.get('studentRegion') || 'us-east-1';
    const password = searchParams.get('password');
    
    if (!studentAccount || !studentUsername || !password) {
      return NextResponse.json({
        success: false,
        error: 'Student credentials required. Please reconnect your Snowflake account.',
        requiresReconnect: true
      }, { status: 400 });
    }

    console.log('👥 Loading student students for:', studentAccount);

    // Get students from student's workspace
    const result = await executeStudentQuery(
      {
        account: studentAccount,
        username: studentUsername,
        password: password,
        region: studentRegion,
        warehouse: 'COMPUTE_WH'
      },
      `SELECT * FROM STUDENT_WORKSPACE.STUDENTS ORDER BY ENROLLMENT_DATE DESC LIMIT 100`
    );

    return NextResponse.json({
      success: true,
      students: (result as any).results || [],
      count: (result as any).rowCount || 0,
      studentAccount: studentAccount,
      schema: 'STUDENT_WORKSPACE',
      message: 'Students loaded from your Snowflake workspace'
    });

  } catch (error: any) {
    console.error('❌ Student students API error:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to load students',
      requiresReconnect: error.message?.includes('authentication') || false
    }, { status: 400 });
  }
}