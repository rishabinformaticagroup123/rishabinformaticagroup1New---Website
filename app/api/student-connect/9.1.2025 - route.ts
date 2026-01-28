// app/api/student-connect/route.ts - FIXED VERSION
import { NextRequest, NextResponse } from 'next/server';
import { testSnowflakeConnection } from '@/lib/snowflake';
import { setupStudentWorkspace } from '@/lib/snowflake-student';

export async function POST(request: NextRequest) {
  let body: any = {};
  
  try {
    body = await request.json();
    
    console.log('🔐 Student connection request:', {
      account: body.account,
      user: body.username,
      region: body.region
    });

    // Validate required fields
    if (!body.account || !body.username || !body.password) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields: account, username, password',
        errorType: 'VALIDATION_ERROR'
      }, { status: 400 });
    }

    // Test connection first
    const connectionTest = await testSnowflakeConnection({
      account: body.account,
      username: body.username,
      password: body.password,
      region: body.region || 'us-east-1',
      warehouse: body.warehouse || 'COMPUTE_WH'
    });

    console.log('✅ Connection test passed:', connectionTest);

    // Setup student workspace
    const workspaceResult = await setupStudentWorkspace({
      account: body.account,
      username: body.username,
      password: body.password,
      region: body.region || 'us-east-1',
      warehouse: body.warehouse || 'COMPUTE_WH'
    });

    console.log('🏗️ Workspace setup result:', workspaceResult);

    return NextResponse.json({
      success: true,
      account: body.account,
      username: body.username,
      region: body.region || 'us-east-1',
      workspace: workspaceResult,
      message: 'Connected to Snowflake and workspace setup complete'
    });

  } catch (error: any) {
    console.error('❌ Student connect API error:', {
      message: error.message,
      stack: error.stack,
      body: body
    });
    
    let errorMessage = 'Connection failed';
    let errorType = 'UNKNOWN_ERROR';
    let requiresReconnect = false;

    if (error.message.includes('incorrect username or password') || 
        error.message.includes('Invalid username or password')) {
      errorMessage = 'Incorrect username or password';
      errorType = 'AUTH_FAILED';
      requiresReconnect = true;
    } else if (error.message.includes('account') || error.message.includes('region')) {
      errorMessage = `Account/Region error. Try:\n• Account: ${body?.account || 'your-account'}\n• Region: ${body?.region || 'us-east-1'}\n• Username: ${body?.username || 'your-username'}`;
      errorType = 'ACCOUNT_REGION_ERROR';
      requiresReconnect = true;
    } else if (error.message.includes('network') || error.message.includes('timeout')) {
      errorMessage = 'Network error. Check your internet connection and try again.';
      errorType = 'NETWORK_ERROR';
    } else {
      errorMessage = error.message;
    }

    return NextResponse.json({
      success: false,
      error: errorMessage,
      errorType: errorType,
      requiresReconnect: requiresReconnect
    }, { status: 400 });
  }
}