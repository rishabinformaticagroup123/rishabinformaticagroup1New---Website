// D:\Vercel NEW\app\api\execute-student-query\route.ts
import { executeSnowflakeQuery } from "@/lib/snowflake";
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
      query, 
      studentAccount, 
      studentUsername, 
      studentRegion = 'us-east-1',
      password,
      warehouse = 'COMPUTE_WH',
      database = '',
      schema = '',
      role = 'PUBLIC'
    } = body;

    console.log('📊 Executing student query:', { 
      studentAccount, 
      studentUsername,
      query: query?.substring(0, 100) + (query?.length > 100 ? '...' : '')
    });

    if (!query || !studentAccount || !studentUsername || !password) {
      return NextResponse.json(
        { 
          success: false, 
          error: 'Query, account, username, and password are