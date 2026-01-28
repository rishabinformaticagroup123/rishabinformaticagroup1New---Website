import { executeSnowflakeQuery } from "@/lib/snowflake";
import { NextResponse } from "next/server";

// GET: Fetch all students with optional filters
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('course_id');
    const status = searchParams.get('status') || 'ACTIVE';
    
    let sql = `
      SELECT s.*, c.COURSE_NAME 
      FROM SOURCE.PUBLIC.STUDENTS s
      LEFT JOIN SOURCE.PUBLIC.COURSES c ON s.COURSE_ID = c.COURSE_ID
      WHERE s.STATUS = ?
    `;
    
    const params = [status];
    
    if (courseId) {
      sql += ` AND s.COURSE_ID = ?`;
      params.push(courseId);
    }
    
    sql += ` ORDER BY s.ENROLLMENT_DATE DESC LIMIT 100`;
    
    const students = await executeSnowflakeQuery(sql, params);
    
    return NextResponse.json({ 
      success: true, 
      count: students.length,
      students 
    });
    
  } catch (error: any) {
    console.error('Students API Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST: Enroll new student
export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Generate student ID
    const studentId = `STU${Date.now()}${Math.floor(Math.random() * 1000)}`;
    
    const result = await executeSnowflakeQuery(
      `INSERT INTO SOURCE.PUBLIC.STUDENTS 
       (STUDENT_ID, FULL_NAME, EMAIL, PHONE, ADDRESS, 
        QUALIFICATION, COURSE_ID, ENROLLMENT_DATE) 
       VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_DATE())`,
      [
        studentId,
        body.full_name,
        body.email,
        body.phone,
        body.address,
        body.qualification,
        body.course_id
      ]
    );
    
    // Update enrolled count in courses table
    await executeSnowflakeQuery(
      `UPDATE SOURCE.PUBLIC.COURSES 
       SET ENROLLED_COUNT = ENROLLED_COUNT + 1 
       WHERE COURSE_ID = ?`,
      [body.course_id]
    );
    
    return NextResponse.json({ 
      success: true, 
      message: 'Student enrolled successfully',
      student_id: studentId
    });
    
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}