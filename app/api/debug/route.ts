// app/api/debug/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  console.log("🔴 DEBUG: API called at", new Date().toISOString());
  
  // Log ALL headers
  const headers: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    headers[key] = value;
  });
  
  console.log("🔴 DEBUG: All headers:", headers);
  console.log("🔴 DEBUG: x-access-code header value:", request.headers.get('x-access-code'));
  console.log("🔴 DEBUG: x-access-code exists?", request.headers.has('x-access-code'));
  
  return NextResponse.json({
    message: "Debug endpoint",
    headers: headers,
    accessCode: request.headers.get('x-access-code'),
    timestamp: new Date().toISOString()
  });
}