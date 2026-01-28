// app/api/auth/login/route.ts
import { getUserContext, setAuthCookies } from "@/lib/auth-helper";
import { executeSnowflakeQuery } from "@/lib/snowflake";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { accessCode, email, password } = body;
    
    // Use access code (password system)
    if (accessCode) {
      // Authenticate using password
      const users = await executeSnowflakeQuery(
        `SELECT user_id, user_type, schema_name, email, full_name 
         FROM SOURCE.PUBLIC.APP_USERS 
         WHERE access_code = ? AND is_active = TRUE`,
        [accessCode]
      );
      
      if (users.length === 0) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Invalid access code',
            message: 'Please check your access code and try again.' 
          },
          { status: 401 }
        );
      }
      
      const user = users[0];
      
      // Update last login
      await executeSnowflakeQuery(
        `UPDATE SOURCE.PUBLIC.APP_USERS 
         SET last_login = CURRENT_TIMESTAMP()
         WHERE user_id = ?`,
        [user.USER_ID]
      );
      
      // Create user context
      const userContext = {
        userId: user.USER_ID,
        userType: user.USER_TYPE.toLowerCase() as 'demo' | 'student' | 'instructor' | 'admin',
        schema: user.SCHEMA_NAME,
        email: user.EMAIL || '',
        fullName: user.FULL_NAME || '',
        authMethod: 'password' as const,
        isAuthenticated: true
      };
      
      // Set authentication cookies
      setAuthCookies(userContext);
      
      // Create student schema if it doesn't exist (for new students)
      if (userContext.userType === 'student') {
        try {
          await executeSnowflakeQuery(`
            CREATE SCHEMA IF NOT EXISTS ${userContext.schema};
            
            CREATE TABLE IF NOT EXISTS ${userContext.schema}.COURSES 
            CLONE SOURCE.PUBLIC.COURSES;
            
            CREATE TABLE IF NOT EXISTS ${userContext.schema}.STUDENTS 
            CLONE SOURCE.PUBLIC.STUDENTS;
          `);
        } catch (schemaError) {
          console.log('Schema already exists or error:', schemaError);
          // Continue anyway - schema might already exist
        }
      }
      
      return NextResponse.json({
        success: true,
        message: 'Login successful',
        user: {
          id: userContext.userId,
          type: userContext.userType,
          name: userContext.fullName,
          email: userContext.email,
          schema: userContext.schema,
          isAuthenticated: true
        },
        redirectTo: userContext.userType === 'demo' ? '/snowflake-connect' : '/dashboard'
      });
    }
    
    // Invalid request
    return NextResponse.json(
      { 
        success: false, 
        error: 'Access code required',
        message: 'Please provide an access code.' 
      },
      { status: 400 }
    );
    
  } catch (error: any) {
    console.error('Login API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Authentication failed',
        message: 'An unexpected error occurred. Please try again.' 
      },
      { status: 500 }
    );
  }
}

// Logout endpoint
export async function DELETE() {
  try {
    const { clearAuthCookies } = await import('@/lib/auth-helper');
    clearAuthCookies();
    
    return NextResponse.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Logout failed' },
      { status: 500 }
    );
  }
}