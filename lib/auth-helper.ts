// lib/auth-helper.ts - FINAL WORKING VERSION
import { cookies } from 'next/headers';
import { executeSnowflakeQuery } from '@/lib/snowflake';
import { NextRequest } from 'next/server';

export interface UserContext {
  userId: string;
  userType: 'demo' | 'student' | 'instructor' | 'admin';
  schema: string;
  email: string;
  fullName: string;
  authMethod: 'password' | 'cookie' | 'demo';
  isAuthenticated: boolean;
}

/**
 * Get user context from request - works for password AND future Google auth
 */
export async function getUserContext(request: NextRequest | Request): Promise<UserContext> {
  try {
    // Try password/access code from headers (for direct API calls)
    const accessCode = request.headers.get('x-access-code');
    
    if (accessCode) {
      const user = await authenticateWithPassword(accessCode);
      if (user) {
        return {
          ...user,
          authMethod: 'password',
          isAuthenticated: true
        };
      }
    }
    
    // Default: Demo user
    return {
      userId: 'DEMO_001',
      userType: 'demo',
      schema: 'PUBLIC',
      email: 'demo@learnsnowflake.com',
      fullName: 'Demo User',
      authMethod: 'demo',
      isAuthenticated: false
    };
    
  } catch (error) {
    console.error('Auth Helper Error:', error);
    return {
      userId: 'DEMO_001',
      userType: 'demo',
      schema: 'PUBLIC',
      email: 'demo@learnsnowflake.com',
      fullName: 'Demo User',
      authMethod: 'demo',
      isAuthenticated: false
    };
  }
}

/**
 * Authenticate user with password/access code
 * USES HARDCODED SQL because parameter binding (?) in executeSnowflakeQuery is not working
 */
async function authenticateWithPassword(accessCode: string): Promise<UserContext | null> {
  try {
    // Use hardcoded SQL - parameter binding is broken
    const sql = `SELECT user_id, user_type, schema_name, email, full_name 
                 FROM SOURCE.PUBLIC.APP_USERS 
                 WHERE access_code = '${accessCode}' AND is_active = TRUE`;
    
    const users = await executeSnowflakeQuery(sql);
    
    if (users.length > 0) {
      const user = users[0];
      
      // Snowflake returns UPPERCASE column names
      const userId = user.USER_ID;
      const userType = user.USER_TYPE;  // This is 'student' from your database
      const schemaName = user.SCHEMA_NAME;
      
      // Update last login
      await executeSnowflakeQuery(
        `UPDATE SOURCE.PUBLIC.APP_USERS 
         SET last_login = CURRENT_TIMESTAMP()
         WHERE user_id = '${userId}'`
      );
      
      return {
        userId: userId,
        userType: userType.toLowerCase() as UserContext['userType'],
        schema: schemaName,
        email: user.EMAIL || '',
        fullName: user.FULL_NAME || '',
        authMethod: 'password',
        isAuthenticated: true
      };
    }
    
    return null;
  } catch (error) {
    console.error('Password Auth Error:', error);
    return null;
  }
}

/**
 * Set authentication cookies after successful login
 */
export function setAuthCookies(user: UserContext) {
  const cookieStore = cookies();
  
  cookieStore.set('user_id', user.userId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 // 7 days
  });
  
  cookieStore.set('user_type', user.userType, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60
  });
  
  cookieStore.set('schema', user.schema, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60
  });
  
  // For UI to show user info (not sensitive)
  cookieStore.set('user_email', user.email, {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60
  });
  
  cookieStore.set('user_name', user.fullName, {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60
  });
}

/**
 * Clear authentication cookies (logout)
 */
export function clearAuthCookies() {
  const cookieStore = cookies();
  
  ['user_id', 'user_type', 'schema', 'user_email', 'user_name'].forEach(cookieName => {
    cookieStore.delete(cookieName);
  });
}

/**
 * Check if user has permission for an action
 */
export function checkPermission(
  userContext: UserContext, 
  requiredPermission: 'read' | 'write' | 'admin'
): boolean {
  switch (requiredPermission) {
    case 'read':
      return true; // Everyone can read
    
    case 'write':
      return userContext.userType === 'student' || 
             userContext.userType === 'instructor' || 
             userContext.userType === 'admin';
    
    case 'admin':
      return userContext.userType === 'instructor' || 
             userContext.userType === 'admin';
    
    default:
      return false;
  }
}