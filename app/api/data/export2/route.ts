import { NextRequest, NextResponse } from 'next/server';
import { executeSnowflakeQuery } from '@/lib/snowflake';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'csv';
    
    // Get data to export
    const data = await snowflake.execute(`
      SELECT * FROM SOURCE.PUBLIC.COURSES
      WHERE STATUS = 'ACTIVE'
      LIMIT 100
    `);
    
    let content = '';
    if (format === 'csv') {
      // Create CSV
      const headers = Object.keys(data[0] || {}).join(',');
      const rows = data.map(row => Object.values(row).join(','));
      content = [headers, ...rows].join('\n');
    } else if (format === 'json') {
      content = JSON.stringify(data, null, 2);
    }
    
    return new Response(content, {
      headers: {
        'Content-Type': format === 'csv' ? 'text/csv' : 'application/json',
        'Content-Disposition': `attachment; filename=export.${format}`
      }
    });
    
  } catch (error) {
    return NextResponse.json(
      { error: 'Export failed' },
      { status: 500 }
    );
  }
}