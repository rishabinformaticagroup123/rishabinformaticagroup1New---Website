import { executeSnowflakeQuery } from "@/lib/snowflake";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const courseId = params.id;
    
    // Get course details
    const course = await executeSnowflakeQuery(
      `SELECT * FROM SOURCE.PUBLIC.COURSES WHERE COURSE_ID = ?`,
      [courseId]
    );
    
    if (course.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Course not found' },
        { status: 404 }
      );
    }
    
    // Get enrolled students for this course
    const students = await executeSnowflakeQuery(
      `SELECT STUDENT_ID, FULL_NAME, EMAIL, ENROLLMENT_DATE 
       FROM SOURCE.PUBLIC.STUDENTS 
       WHERE COURSE_ID = ? AND STATUS = 'ACTIVE'
       ORDER BY ENROLLMENT_DATE DESC
       LIMIT 20`,
      [courseId]
    );
    
    return NextResponse.json({
      success: true,
      course: course[0],
      enrolled_students: students,
      student_count: students.length
    });
    
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}