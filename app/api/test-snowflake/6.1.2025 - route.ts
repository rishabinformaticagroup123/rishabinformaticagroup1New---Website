import { executeSnowflakeQuery } from "@/lib/snowflake";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    console.log('Testing Snowflake connection...');
    
    const rows = await executeSnowflakeQuery(
      `SELECT CURRENT_ACCOUNT() as account, 
              CURRENT_REGION() as region, 
              CURRENT_VERSION() as version`
    );
    
    console.log('Snowflake query successful:', rows);
    return NextResponse.json({ 
      success: true, 
      data: rows,
      timestamp: new Date().toISOString()
    });
    
  } catch (error: any) {
    console.error('❌ Snowflake API error:', error.message);
    
    return NextResponse.json(
      { 
        success: false,
        error: "Failed to query Snowflake",
        message: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}