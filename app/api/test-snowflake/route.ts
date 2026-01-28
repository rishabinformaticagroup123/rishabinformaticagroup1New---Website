// D:\Vercel NEW\app\api\test-snowflake\route.ts
import { executeSnowflakeQuery } from "@/lib/snowflake";
import { NextResponse } from "next/server";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET() {
  try {
    console.log('🔧 Testing demo Snowflake connection...');
    
    const rows = await executeSnowflakeQuery(
      `SELECT 
        CURRENT_ACCOUNT() as account, 
        CURRENT_REGION() as region, 
        CURRENT_VERSION() as version,
        CURRENT_USER() as username,
        CURRENT_TIMESTAMP() as timestamp`
    );
    
    console.log('✅ Demo connection successful:', rows?.[0]);
    
    return NextResponse.json({ 
      success: true, 
      status: 'connected',
      data: rows?.[0] || {},
      message: 'Demo Snowflake connection successful',
      timestamp: new Date().toISOString()
    }, { headers: corsHeaders });
    
  } catch (error: any) {
    console.error('❌ Demo connection failed:', error.message);
    
    return NextResponse.json(
      { 
        success: false,
        status: 'disconnected',
        error: "Failed to connect to demo Snowflake",
        message: error.message,
        timestamp: new Date().toISOString()
      },
      { 
        status: 500,
        headers: corsHeaders 
      }
    );
  }
}