// lib/auth-helper.ts - CORRECTED VERSION
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
    // Try to get from cookies first (for authenticated sessions)
    const cookieStore = cookies();
    const userId = cookieStore.get('user_id')?.value;
    const userSchema = cookieStore.get('schema')?.value;
    const userType = cookieStore.get('user_type')?.value as UserContext['userType'];
    
    if (userId && userSchema && userType) {
      // User is authenticated via cookies
      const user = await executeSnowflakeQuery(
        `SELECT email, full_name FROM SOURCE.PUBLIC.APP_USERS 
         WHERE user_id = ? AND is_active = TRUE`,
        [userId]
      );
      
      if (user.length > 0) {
        // Handle different column name cases
        const userData = user[0];
        const email = userData.EMAIL || userData.email || '';
        const fullName = userData.FULL_NAME || userData.full_name || '';
        
        return {
          userId,
          userType,
          schema: userSchema,
          email,
          fullName,
          authMethod: 'cookie',
          isAuthenticated: true
        };
      }
    }
    
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
    // Fallback to demo
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
 */
async function authenticateWithPassword(accessCode: string): Promise<UserContext | null> {
  try {
    const users = await executeSnowflakeQuery(
      `SELECT user_id, user_type, schema_name, email, full_name 
       FROM SOURCE.PUBLIC.APP_USERS 
       WHERE access_code = ? AND is_active = TRUE`,
      [accessCode]
    );
    
    if (users.length > 0) {
      const user = users[0];
      
      // Handle different column name cases (Snowflake may return uppercase or lowercase)
      const userId = user.USER_ID || user.user_id;
      const userType = user.USER_TYPE || user.user_type;
      const schemaName = user.SCHEMA_NAME || user.schema_name;
      const email = user.EMAIL || user.email || '';
      const fullName = user.FULL_NAME || user.full_name || '';
      
      if (!userId || !userType || !schemaName) {
        console.error('Invalid user data format:', user);
        return null;
      }
      
      // Update last login
      await executeSnowflakeQuery(
        `UPDATE SOURCE.PUBLIC.APP_USERS 
         SET last_login = CURRENT_TIMESTAMP()
         WHERE user_id = ?`,
        [userId]
      );
      
      // Convert userType to lowercase for TypeScript enum
      const normalizedUserType = userType.toLowerCase() as UserContext['userType'];
      
      return {
        userId,
        userType: normalizedUserType,
        schema: schemaName,
        email,
        fullName,
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