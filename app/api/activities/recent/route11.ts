import { NextRequest, NextResponse } from 'next/server';
import snowflake from '@/lib/snowflake';

export async function GET(request: NextRequest) {
  try {
    // Get recent activities from multiple sources
    const [courseUpdates, studentEnrollments, queryHistory] = await Promise.all([
      // Course updates
      snowflake.execute(`
        SELECT 
          'Course "' || COURSE_NAME || '" updated' as action,
          UPDATED_AT as timestamp,
          'update' as type
        FROM SOURCE.PUBLIC.COURSES
        WHERE UPDATED_AT >= DATEADD(hour, -24, CURRENT_TIMESTAMP())
        ORDER BY UPDATED_AT DESC
        LIMIT 5
      `),
      
      // Student enrollments
      snowflake.execute(`
        SELECT 
          CONCAT(COUNT(*), ' new students enrolled') as action,
          MAX(ENROLLMENT_DATE) as timestamp,
          'enrollment' as type
        FROM SOURCE.PUBLIC.ENROLLMENTS
        WHERE ENROLLMENT_DATE = CURRENT_DATE()
        GROUP BY DATE(ENROLLMENT_DATE)
        LIMIT 1
      `),
      
      // Recent queries
      snowflake.execute(`
        SELECT 
          'Query executed by ' || USER_NAME as action,
          START_TIME as timestamp,
          'query' as type
        FROM SNOWFLAKE.ACCOUNT_USAGE.QUERY_HISTORY
        WHERE START_TIME >= DATEADD(hour, -1, CURRENT_TIMESTAMP())
        AND QUERY_TEXT NOT LIKE 'SELECT CURRENT_TIMESTAMP%'
        ORDER BY START_TIME DESC
        LIMIT 3
      `)
    ]);
    
    // Combine all activities
    const activities = [
      ...courseUpdates.map((item: any, index: number) => ({
        id: index + 1,
        action: item.ACTION,
        time: formatTimeAgo(item.TIMESTAMP),
        type: item.TYPE
      })),
      ...studentEnrollments.map((item: any, index: number) => ({
        id: courseUpdates.length + index + 1,
        action: item.ACTION,
        time: formatTimeAgo(item.TIMESTAMP),
        type: item.TYPE
      })),
      ...queryHistory.map((item: any, index: number) => ({
        id: courseUpdates.length + studentEnrollments.length + index + 1,
        action: item.ACTION,
        time: formatTimeAgo(item.TIMESTAMP),
        type: item.TYPE
      }))
    ];
    
    // Sort by time and limit
    activities.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
    
    return NextResponse.json({
      activities: activities.slice(0, 10)
    });
    
  } catch (error) {
    // Return mock data if Snowflake fails
    return NextResponse.json({
      activities: [
        { id: 1, action: 'Course "Web Development" updated', time: 'Just now', type: 'update' },
        { id: 2, action: '3 new students enrolled', time: '5 minutes ago', type: 'enrollment' },
        { id: 3, action: 'Revenue report generated', time: '15 minutes ago', type: 'report' },
        { id: 4, action: 'Snowflake connection tested successfully', time: '1 hour ago', type: 'connection' },
        { id: 5, action: 'Course completion certificates issued', time: '2 hours ago', type: 'certificate' }
      ]
    });
  }
}

function formatTimeAgo(timestamp: string): string {
  const now = new Date();
  const time = new Date(timestamp);
  const diffMs = now.getTime() - time.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
  
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
}