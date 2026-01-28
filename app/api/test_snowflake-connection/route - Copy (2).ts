// D:\Vercel NEW\app\api\test-snowflake-connection\route.ts
import { testSnowflakeConnection } from "@/lib/snowflake";
import { NextRequest, NextResponse } from 'next/server';

// CORS headers
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

    console.log('🔐 Testing Snowflake connection for:', { 
      account, 
      region, 
      username,
      passwordLength: password?.length || 0
    });

    // Validate
    if (!account || !username || !password) {
      return NextResponse.json(
        { success: false, error: 'Account, username, and password are required' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Clean account name
    const cleanAccount = account
      .replace('.snowflakecomputing.com', '')
      .replace('https://', '')
      .replace('http://', '')
      .toLowerCase()
      .trim();

    // Test connection
    const connectionConfig = {
      account: cleanAccount,
      username,
      password,
      warehouse,
      database: database || undefined,
      schema: schema || undefined,
      role,
      region
    };

    const result = await testSnowflakeConnection(connectionConfig);
    
    return NextResponse.json({
      success: true,
      message: 'Connection successful',
      account: cleanAccount,
      username,
      region,
      connectionInfo: result
    }, { headers: corsHeaders });

  } catch (error: any) {
    console.error('❌ Connection test failed:', error);
    
    let errorMessage = error.message || 'Connection failed';
    
    // User-friendly messages
    if (errorMessage.includes('Incorrect username or password')) {
      errorMessage = 'Invalid username or password. Please check your credentials.';
    } else if (errorMessage.includes('account')) {
      errorMessage = 'Invalid account name or region. Check your Snowflake URL.';
    } else if (errorMessage.includes('network') || errorMessage.includes('connection refused')) {
      errorMessage = 'Network error. Check your internet connection.';
    } else if (errorMessage.includes('timeout')) {
      errorMessage = 'Connection timeout. Please try again.';
    }
    
    return NextResponse.json(
      { 
        success: false, 
        error: errorMessage,
        errorDetails: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 400, headers: corsHeaders }
    );
  }
}