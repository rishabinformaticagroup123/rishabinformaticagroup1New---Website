// app/api/student-courses/route.ts - NEW FILE
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

    console.log('📚 Loading student courses for:', studentAccount);

    // Get courses from student's workspace
    const result = await executeStudentQuery(
      {
        account: studentAccount,
        username: studentUsername,
        password: password,
        region: studentRegion,
        warehouse: 'COMPUTE_WH'
      },
      `SELECT * FROM STUDENT_WORKSPACE.COURSES ORDER BY CREATED_AT DESC LIMIT 100`
    );

    return NextResponse.json({
      success: true,
      courses: (result as any).results || [],
      count: (result as any).rowCount || 0,
      studentAccount: studentAccount,
      schema: 'STUDENT_WORKSPACE',
      message: 'Courses loaded from your Snowflake workspace'
    });

  } catch (error: any) {
    console.error('❌ Student courses API error:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to load courses',
      requiresReconnect: error.message?.includes('authentication') || false
    }, { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { 
      studentAccount, studentUsername, studentRegion = 'us-east-1', password,
      course_name, instructor, start_date, end_date, status = 'ACTIVE'
    } = body;

    if (!studentAccount || !studentUsername || !password || !course_name) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields'
      }, { status: 400 });
    }

    // Insert course into student's workspace
    const result = await executeStudentQuery(
      {
        account: studentAccount,
        username: studentUsername,
        password: password,
        region: studentRegion,
        warehouse: 'COMPUTE_WH'
      },
      `INSERT INTO STUDENT_WORKSPACE.COURSES 
       (COURSE_NAME, INSTRUCTOR, START_DATE, END_DATE, STATUS) 
       VALUES (?, ?, ?, ?, ?)
       RETURNING *`,
      [course_name, instructor, start_date, end_date, status]
    );

    return NextResponse.json({
      success: true,
      message: 'Course created successfully in your Snowflake workspace',
      course: (result as any).results?.[0],
      studentAccount: studentAccount
    });

  } catch (error: any) {
    console.error('❌ Create student course error:', error);
    
    return NextResponse.json({
      success: false,
      error: error.message || 'Failed to create course',
      requiresReconnect: error.message?.includes('authentication') || false
    }, { status: 400 });
  }
}