import { executeSnowflakeQuery } from "@/lib/snowflake";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log('📊 Fetching dashboard stats from Snowflake...');
    
    // Run multiple queries in parallel
    const [
      totalCourses,
      totalStudents,
      activeCourses,
      recentEnrollments,
      revenueData,
      upcomingCourses
    ] = await Promise.all([
      // Total courses
      executeSnowflakeQuery(
        `SELECT COUNT(*) as count FROM SOURCE.PUBLIC.COURSES`
      ),
      
      // Total students
      executeSnowflakeQuery(
        `SELECT COUNT(*) as count FROM SOURCE.PUBLIC.STUDENTS`
      ),
      
      // Active courses
      executeSnowflakeQuery(
        `SELECT COUNT(*) as count FROM SOURCE.PUBLIC.COURSES WHERE STATUS = 'ACTIVE'`
      ),
      
      // Recent enrollments (last 7 days)
      executeSnowflakeQuery(
        `SELECT COUNT(*) as count FROM SOURCE.PUBLIC.STUDENTS 
         WHERE ENROLLMENT_DATE >= DATEADD(day, -7, CURRENT_DATE())`
      ),
      
      // Total revenue - FIXED calculation
      executeSnowflakeQuery(
        `SELECT 
          COALESCE(SUM(c.FEE * c.ENROLLED_COUNT), 0) as total_revenue,
          COALESCE(AVG(c.FEE), 0) as avg_course_fee
         FROM SOURCE.PUBLIC.COURSES c`
      ),
      
      // Upcoming courses (starting in next 30 days)
      executeSnowflakeQuery(
        `SELECT COUNT(*) as count FROM SOURCE.PUBLIC.COURSES 
         WHERE START_DATE BETWEEN CURRENT_DATE() AND DATEADD(day, 30, CURRENT_DATE())
         AND STATUS = 'ACTIVE'`
      )
    ]);

    // Calculate completion rate (students in completed courses)
    const completedStudents = await executeSnowflakeQuery(
      `SELECT COUNT(*) as count FROM SOURCE.PUBLIC.STUDENTS WHERE STATUS = 'COMPLETED'`
    );

    const totalStudentsCount = totalStudents[0]?.COUNT || 0;
    const completionRate = totalStudentsCount > 0 
      ? Math.round((completedStudents[0]?.COUNT || 0) / totalStudentsCount * 100)
      : 0;

    const stats = {
      total_courses: totalCourses[0]?.COUNT || 0,
      total_students: totalStudentsCount,
      active_courses: activeCourses[0]?.COUNT || 0,
      recent_enrollments: recentEnrollments[0]?.COUNT || 0,
      total_revenue: revenueData[0]?.TOTAL_REVENUE || 0,
      avg_course_fee: revenueData[0]?.AVG_COURSE_FEE || 0,
      upcoming_courses: upcomingCourses[0]?.COUNT || 0,
      completion_rate: completionRate,
      updated_at: new Date().toISOString()
    };

    console.log('✅ Dashboard stats fetched:', stats);
    
    return NextResponse.json({
      success: true,
      stats
    });
    
  } catch (error: any) {
    console.error('❌ Dashboard Stats API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message,
        details: 'Check Snowflake connection and table names'
      },
      { status: 500 }
    );
  }
}