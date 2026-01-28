// app/api/student-connect/route.ts - UPDATED WITH BETTER ERROR HANDLING
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
      region: (result as any).region,
      accountFormat: (result as any).accountFormat
    });

    return NextResponse.json({
      success: true,
      message: '✅ Connected to Snowflake successfully!',
      account: (result as any).account,
      username: (result as any).username,
      region: (result as any).region,
      accountFormat: (result as any).accountFormat,
      version: (result as any).version
    }, { headers: corsHeaders });

  } catch (error: any) {
    console.error('❌ Student connection API error:', error);
    
    // Provide user-friendly error messages
    let errorMessage = error.message || 'Connection failed';
    
    if (errorMessage.includes('Invalid username or password')) {
      errorMessage = '❌ Wrong username or password. Use your Snowflake login credentials.';
    } else if (errorMessage.includes('Account or region error')) {
      errorMessage = '❌ Account/Region error. Try:\n• Account: UP61953 (Account locator)\n• Region: ap-south-1\n• Username: STUDENT2';
    } else if (errorMessage.includes('Network error')) {
      errorMessage = '🌐 Network error. Check your internet connection.';
    } else if (errorMessage.includes('Cannot connect to Snowflake')) {
      errorMessage = '❌ Cannot connect to Snowflake.\n\nCommon issues:\n1. Wrong account format\n2. Wrong region\n3. Account suspended\n\nTry: UP61953 with ap-south-1';
    } else if (errorMessage.includes('timeout')) {
      errorMessage = '⏱️ Connection timeout. Try again or check your network.';
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: errorMessage,
        errorType: error.message,
        requiresReconnect: errorMessage.includes('Invalid username or password')
      },
      { status: 400, headers: corsHeaders }
    );
  }
}