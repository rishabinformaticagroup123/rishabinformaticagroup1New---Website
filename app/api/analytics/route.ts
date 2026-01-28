import { executeSnowflakeQuery } from "@/lib/snowflake";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'overview';
    const period = searchParams.get('period') || 'monthly';
    
    let analyticsData = {};
    
    switch (type) {
      case 'enrollment':
        analyticsData = await getEnrollmentAnalytics(period);
        break;
        
      case 'revenue':
        analyticsData = await getRevenueAnalytics(period);
        break;
        
      case 'courses':
        analyticsData = await getCourseAnalytics();
        break;
        
      default: // overview
        analyticsData = await getOverviewAnalytics();
    }
    
    return NextResponse.json({
      success: true,
      type,
      period,
      data: analyticsData,
      generated_at: new Date().toISOString()
    });
    
  } catch (error: any) {
    console.error('Analytics API Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// Helper functions for different analytics
async function getOverviewAnalytics() {
  const [
    monthlyEnrollments,
    coursePopularity,
    revenueTrend
  ] = await Promise.all([
    // Monthly enrollments
    executeSnowflakeQuery(`
      SELECT 
        TO_CHAR(ENROLLMENT_DATE, 'YYYY-MM') as month,
        COUNT(*) as enrollments
      FROM SOURCE.PUBLIC.STUDENTS
      WHERE ENROLLMENT_DATE >= DATEADD(month, -6, CURRENT_DATE())
      GROUP BY TO_CHAR(ENROLLMENT_DATE, 'YYYY-MM')
      ORDER BY month
    `),
    
    // Course popularity
    executeSnowflakeQuery(`
      SELECT 
        c.COURSE_NAME,
        COUNT(s.STUDENT_ID) as student_count,
        ROUND((COUNT(s.STUDENT_ID) * 100.0 / c.MAX_STUDENTS), 2) as fill_percentage
      FROM SOURCE.PUBLIC.COURSES c
      LEFT JOIN SOURCE.PUBLIC.STUDENTS s ON c.COURSE_ID = s.COURSE_ID
      WHERE c.STATUS = 'ACTIVE'
      GROUP BY c.COURSE_ID, c.COURSE_NAME, c.MAX_STUDENTS
      ORDER BY student_count DESC
    `),
    
    // Revenue trend
    executeSnowflakeQuery(`
      SELECT 
        TO_CHAR(s.ENROLLMENT_DATE, 'YYYY-MM') as month,
        SUM(c.FEE) as revenue
      FROM SOURCE.PUBLIC.STUDENTS s
      JOIN SOURCE.PUBLIC.COURSES c ON s.COURSE_ID = c.COURSE_ID
      WHERE s.ENROLLMENT_DATE >= DATEADD(month, -6, CURRENT_DATE())
      GROUP BY TO_CHAR(s.ENROLLMENT_DATE, 'YYYY-MM')
      ORDER BY month
    `)
  ]);
  
  return {
    monthly_enrollments: monthlyEnrollments,
    course_popularity: coursePopularity,
    revenue_trend: revenueTrend
  };
}

async function getEnrollmentAnalytics(period: string) {
  let dateFilter = '';
  switch (period) {
    case 'daily':
      dateFilter = `DATEADD(day, -30, CURRENT_DATE())`;
      break;
    case 'weekly':
      dateFilter = `DATEADD(week, -12, CURRENT_DATE())`;
      break;
    default: // monthly
      dateFilter = `DATEADD(month, -12, CURRENT_DATE())`;
  }
  
  return await executeSnowflakeQuery(`
    SELECT 
      ${period === 'daily' ? 'ENROLLMENT_DATE' : `TO_CHAR(ENROLLMENT_DATE, '${period === 'weekly' ? 'YYYY-WW' : 'YYYY-MM'}')`} as period,
      COUNT(*) as enrollments
    FROM SOURCE.PUBLIC.STUDENTS
    WHERE ENROLLMENT_DATE >= ${dateFilter}
    GROUP BY ${period === 'daily' ? 'ENROLLMENT_DATE' : `TO_CHAR(ENROLLMENT_DATE, '${period === 'weekly' ? 'YYYY-WW' : 'YYYY-MM'}')`}
    ORDER BY period
  `);
}

async function getRevenueAnalytics(period: string) {
  return await executeSnowflakeQuery(`
    SELECT 
      TO_CHAR(s.ENROLLMENT_DATE, '${period === 'daily' ? 'YYYY-MM-DD' : 'YYYY-MM'}') as period,
      SUM(c.FEE) as revenue,
      COUNT(*) as enrollments,
      ROUND(AVG(c.FEE), 2) as avg_fee
    FROM SOURCE.PUBLIC.STUDENTS s
    JOIN SOURCE.PUBLIC.COURSES c ON s.COURSE_ID = c.COURSE_ID
    WHERE s.ENROLLMENT_DATE >= DATEADD(${period === 'daily' ? 'day' : 'month'}, -6, CURRENT_DATE())
    GROUP BY TO_CHAR(s.ENROLLMENT_DATE, '${period === 'daily' ? 'YYYY-MM-DD' : 'YYYY-MM'}')
    ORDER BY period
  `);
}

async function getCourseAnalytics() {
  return await executeSnowflakeQuery(`
    SELECT 
      c.COURSE_NAME,
      c.INSTRUCTOR,
      c.START_DATE,
      c.END_DATE,
      c.ENROLLED_COUNT,
      c.MAX_STUDENTS,
      ROUND((c.ENROLLED_COUNT * 100.0 / c.MAX_STUDENTS), 2) as enrollment_rate,
      c.FEE,
      (c.ENROLLED_COUNT * c.FEE) as potential_revenue
    FROM SOURCE.PUBLIC.COURSES c
    WHERE c.STATUS = 'ACTIVE'
    ORDER BY c.ENROLLED_COUNT DESC
  `);
}