// D:\Vercel NEW\app\api\test-snowflake-connection\route.ts
import { testStudentSnowflakeConnection } from "@/lib/snowflake";
import { NextRequest, NextResponse } from 'next/server';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      account, 
      region = 'us-east-1',
      username, 
      password, 
      warehouse = 'COMPUTE_WH',
      database = '',
      schema = '',
      role = 'PUBLIC'
    } = body;

    console.log('🔐 Testing student Snowflake connection...');

    // Validate
    if (!account || !username || !password) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Account, username, and password are required' 
        },
        { status: 400, headers: corsHeaders }
      );
    }

    const result = await testStudentSnowflakeConnection({
      account,
      username,
      password,
      region,
      warehouse,
      database,
      schema,
      role
    });

    return NextResponse.json({
      success: true,
      message: 'Connection successful',
      ...result
    }, { headers: corsHeaders });

  } catch (error: any) {
    console.error('❌ Student connection test failed:', error.message);
    
    // Provide user-friendly error messages
    let errorMessage = error.message;
    if (errorMessage.includes('Incorrect username or password')) {
      errorMessage = 'Invalid username or password. Please check your credentials.';
    } else if (errorMessage.includes('account') || errorMessage.includes('region')) {
      errorMessage = 'Invalid account name or region. Check your Snowflake URL.';
    } else if (errorMessage.includes('network') || errorMessage.includes('connection refused')) {
      errorMessage = 'Network error. Check your internet connection.';
    }
    
    const requiresReconnect = errorMessage.includes('Invalid username or password') ||
                             errorMessage.includes('authentication');
    
    return NextResponse.json(
      { 
        success: false, 
        error: errorMessage,
        requiresReconnect,
        errorDetails: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 400, headers: corsHeaders }
    );
  }
}