// app/api/student-connect/route.ts - COMPLETELY NEW FILE
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

    console.log('🌨️ Student Snowflake connection request:', {
      account,
      username,
      region,
      passwordLength: password?.length || 0
    });

    // Validate required fields
    if (!account || !username || !password) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Account, username, and password are required' 
        },
        { status: 400, headers: corsHeaders }
      );
    }

    if (!region) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Region is required. Check your Snowflake URL or account details.' 
        },
        { status: 400, headers: corsHeaders }
      );
    }

    // Test the connection
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

    console.log('✅ Student connection successful:', {
      account: (result as any).account,
      username: (result as any).username,
      region: (result as any).region
    });

    return NextResponse.json({
      success: true,
      message: 'Connected to Snowflake successfully!',
      account: (result as any).account,
      username: (result as any).username,
      region: (result as any).region,
      version: (result as any).version
    }, { headers: corsHeaders });

  } catch (error: any) {
    console.error('❌ Student connection API error:', error);
    
    // Provide user-friendly error messages
    let errorMessage = error.message || 'Connection failed';
    
    if (errorMessage.includes('Invalid username or password')) {
      errorMessage = '❌ Wrong username or password. Please check your Snowflake login credentials.';
    } else if (errorMessage.includes('Invalid account name or region')) {
      errorMessage = '❌ Account/Region error. Try format: account.region (e.g., UP61953.ap-south-1)';
    } else if (errorMessage.includes('Network error')) {
      errorMessage = '🌐 Network error. Please check your internet connection.';
    } else if (errorMessage.includes('account') || errorMessage.includes('region')) {
      errorMessage = '❌ Account not found. Check your account name and region.';
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