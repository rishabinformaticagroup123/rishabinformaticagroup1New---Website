// app/api/courses/route.ts - UPDATED WITH ISOLATION
import { executeSnowflakeQuery } from "@/lib/snowflake";
import { getUserContext, checkPermission } from "@/lib/auth-helper";
import { NextResponse } from "next/server";

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Access-Code',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// GET: Fetch courses from user's isolated schema
export async function GET(request: Request) {
  try {
    // Get user context (works for password AND future Google auth)
    const user = await getUserContext(request);
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'ACTIVE';
    const limit = searchParams.get('limit') || '100';
    
    console.log(`📊 ${user.userType.toUpperCase()} ${user.userId} accessing ${user.schema}.COURSES`);
    
    // Query from user's schema
    const courses = await executeSnowflakeQuery(
      `SELECT * FROM ${user.schema}.COURSES 
       WHERE STATUS = ? 
       ORDER BY START_DATE ASC
       LIMIT ?`,
      [status, parseInt(limit)]
    );
    
    return NextResponse.json({ 
      success: true, 
      count: courses.length,
      courses,
      userContext: {
        userId: user.userId,
        userType: user.userType,
        schema: user.schema,
        isAuthenticated: user.isAuthenticated
      }
    }, { headers: corsHeaders });
    
  } catch (error: any) {
    console.error('Courses API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message,
        message: 'Failed to fetch courses. Please check your authentication.' 
      },
      { status: 500, headers: corsHeaders }
    );
  }
}

// POST: Execute query or create course (with isolation)
export async function POST(request: Request) {
  try {
    const user = await getUserContext(request);
    
    // Check write permission
    if (!checkPermission(user, 'write')) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Permission denied',
          message: 'Demo users cannot modify data. Please login as a student.' 
        },
        { status: 403, headers: corsHeaders }
      );
    }
    
    const body = await request.json();
    
    // CASE 1: Query execution (for Snowflake learning platform)
    if (body.query) {
      console.log(`📊 ${user.userType} ${user.userId} executing query in ${user.schema}`);
      
      // Replace SOURCE.PUBLIC with user's schema for isolation
      const isolatedQuery = body.query
        .replace(/SOURCE\.PUBLIC/g, user.schema)
        .replace(/DEMO\.PUBLIC/g, user.schema);
      
      const results = await executeSnowflakeQuery(isolatedQuery, body.params || []);
      
      return NextResponse.json({ 
        success: true, 
        results: results,
        rowCount: results.length,
        userContext: {
          userId: user.userId,
          userType: user.userType,
          schema: user.schema,
          executedIn: user.schema
        }
      }, { headers: corsHeaders });
    }
    
    // CASE 2: Create new course (for instructors/admins only)
    else if (body.course_id && body.course_name) {
      if (!checkPermission(user, 'admin')) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Admin permission required',
            message: 'Only instructors can create courses.' 
          },
          { status: 403, headers: corsHeaders }
        );
      }
      
      console.log(`📝 ${user.userType} ${user.userId} creating course in ${user.schema}`);
      
      const result = await executeSnowflakeQuery(
        `INSERT INTO ${user.schema}.COURSES 
         (COURSE_ID, COURSE_NAME, DESCRIPTION, DURATION_HOURS, FEE, 
          INSTRUCTOR, START_DATE, END_DATE, MAX_STUDENTS) 
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          body.course_id,
          body.course_name,
          body.description,
          body.duration_hours,
          body.fee,
          body.instructor,
          body.start_date,
          body.end_date,
          body.max_students
        ]
      );
      
      return NextResponse.json({ 
        success: true, 
        message: 'Course created successfully',
        data: result,
        userContext: {
          userId: user.userId,
          userType: user.userType
        }
      }, { headers: corsHeaders });
    }
    
    // Invalid request
    else {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid request',
          message: 'Provide either "query" for execution or course details for creation.' 
        },
        { status: 400, headers: corsHeaders }
      );
    }
    
  } catch (error: any) {
    console.error('POST Courses API Error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: error.message,
        message: 'Operation failed. Please check your permissions and try again.'
      },
      { status: 500, headers: corsHeaders }
    );
  }
}

// PUT: Update course
export async function PUT(request: Request) {
  try {
    const user = await getUserContext(request);
    
    if (!checkPermission(user, 'write')) {
      return NextResponse.json(
        { success: false, error: 'Permission denied' },
        { status: 403, headers: corsHeaders }
      );
    }
    
    const body = await request.json();
    
    if (!body.course_id) {
      return NextResponse.json(
        { success: false, error: 'Course ID is required' },
        { status: 400, headers: corsHeaders }
      );
    }
    
    // Build dynamic update query
    const updates: string[] = [];
    const values: any[] = [];
    
    if (body.course_name) {
      updates.push('COURSE_NAME = ?');
      values.push(body.course_name);
    }
    if (body.description) {
      updates.push('DESCRIPTION = ?');
      values.push(body.description);
    }
    if (body.status) {
      updates.push('STATUS = ?');
      values.push(body.status);
    }
    
    if (updates.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No fields to update' },
        { status: 400, headers: corsHeaders }
      );
    }
    
    values.push(body.course_id);
    
    const result = await executeSnowflakeQuery(
      `UPDATE ${user.schema}.COURSES 
       SET ${updates.join(', ')}
       WHERE COURSE_ID = ?`,
      values
    );
    
    return NextResponse.json({ 
      success: true, 
      message: 'Course updated successfully',
      data: result,
      userContext: {
        userId: user.userId,
        userType: user.userType
      }
    }, { headers: corsHeaders });
    
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}