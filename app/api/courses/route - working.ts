// D:\Vercel NEW\app\api\courses\route.ts
import { executeSnowflakeQuery } from "@/lib/snowflake";
import { NextResponse } from "next/server";

// CORS headers for the learning platform
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Handle CORS preflight requests
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// GET: Fetch all courses (YOUR existing course management)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') || 'ACTIVE';
    
    const courses = await executeSnowflakeQuery(
      `SELECT * FROM SOURCE.PUBLIC.COURSES 
       WHERE STATUS = ? 
       ORDER BY START_DATE ASC`,
      [status]
    );
    
    return NextResponse.json({ 
      success: true, 
      count: courses.length,
      courses 
    }, { headers: corsHeaders });
    
  } catch (error: any) {
    console.error('Courses API Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}

// POST: Dual-purpose endpoint
// 1. Create new course (for your main app)
// 2. Execute SQL queries (for Snowflake learning platform)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // CHECK 1: If it's a query execution request (from Snowflake learning platform)
    if (body.query) {
      console.log('📊 Executing demo query from learning platform:', 
        body.query.substring(0, 100) + (body.query.length > 100 ? '...' : '')
      );
      
      // Execute the query on YOUR demo Snowflake
      const results = await executeSnowflakeQuery(body.query, body.params || []);
      
      return NextResponse.json({ 
        success: true, 
        results: results,
        courses: results, // For backward compatibility
        rowCount: results.length,
        isDemo: true,
        message: 'Executed on demo Snowflake account'
      }, { headers: corsHeaders });
    }
    
    // CHECK 2: If it's a course creation request (from your main app)
    else if (body.course_id && body.course_name) {
      console.log('📝 Creating new course:', body.course_name);
      
      const result = await executeSnowflakeQuery(
        `INSERT INTO SOURCE.PUBLIC.COURSES 
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
        data: result 
      }, { headers: corsHeaders });
    }
    
    // Neither query nor course creation - invalid request
    else {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Invalid request. Provide either "query" for execution or course details for creation.' 
        },
        { status: 400, headers: corsHeaders }
      );
    }
    
  } catch (error: any) {
    console.error('POST Courses API Error:', error);
    
    // Check if it's an authentication error (for student connection handling)
    const requiresReconnect = error.message.includes('authentication') ||
                             error.message.includes('password') ||
                             error.message.includes('Incorrect username');
    
    return NextResponse.json(
      { 
        success: false, 
        error: error.message,
        requiresReconnect,
        errorDetails: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500, headers: corsHeaders }
    );
  }
}

// Optional: PUT for updating courses
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    
    if (!body.course_id) {
      return NextResponse.json(
        { success: false, error: 'Course ID is required' },
        { status: 400, headers: corsHeaders }
      );
    }
    
    // Build dynamic update query based on provided fields
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
    // Add more fields as needed
    
    if (updates.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No fields to update' },
        { status: 400, headers: corsHeaders }
      );
    }
    
    values.push(body.course_id);
    
    const result = await executeSnowflakeQuery(
      `UPDATE SOURCE.PUBLIC.COURSES 
       SET ${updates.join(', ')}
       WHERE COURSE_ID = ?`,
      values
    );
    
    return NextResponse.json({ 
      success: true, 
      message: 'Course updated successfully',
      data: result 
    }, { headers: corsHeaders });
    
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}

// Optional: DELETE for removing courses
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('course_id');
    
    if (!courseId) {
      return NextResponse.json(
        { success: false, error: 'Course ID is required' },
        { status: 400, headers: corsHeaders }
      );
    }
    
    // Soft delete (update status) or hard delete
    const result = await executeSnowflakeQuery(
      `UPDATE SOURCE.PUBLIC.COURSES 
       SET STATUS = 'INACTIVE'
       WHERE COURSE_ID = ?`,
      [courseId]
    );
    
    return NextResponse.json({ 
      success: true, 
      message: 'Course deactivated successfully',
      data: result 
    }, { headers: corsHeaders });
    
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}