import { NextRequest, NextResponse } from 'next/server';
import { executeSnowflakeQuery } from '@/lib/snowflake'; // Only this line changes

export async function GET(request: NextRequest) {
  try {
    // Check if Snowflake connection is active
    const connectionTest = await snowflake.execute('SELECT CURRENT_TIMESTAMP()');
    
    // Get account info
    const accountInfo = await snowflake.execute(`
      SELECT 
        CURRENT_ACCOUNT() as account,
        CURRENT_REGION() as region,
        CURRENT_VERSION() as version,
        CURRENT_WAREHOUSE() as warehouse
    `);
    
    // Get storage usage
    const storageUsage = await snowflake.execute(`
      SELECT SUM(BYTES) / 1024 / 1024 / 1024 as storage_gb
      FROM INFORMATION_SCHEMA.TABLES
      WHERE TABLE_CATALOG NOT IN ('SNOWFLAKE')
    `);
    
    // Get credit usage
    const creditUsage = await snowflake.execute(`
      SELECT 
        SUM(CREDITS_USED) as total_credits,
        SUM(CREDITS_USED) * 4 as estimated_cost
      FROM SNOWFLAKE.ACCOUNT_USAGE.WAREHOUSE_METERING_HISTORY
      WHERE START_TIME >= DATEADD(day, -7, CURRENT_TIMESTAMP())
    `);
    
    return NextResponse.json({
      connected: true,
      stats: {
        account: accountInfo[0]?.ACCOUNT || 'Demo',
        region: accountInfo[0]?.REGION || 'us-east-1',
        version: accountInfo[0]?.VERSION || 'Unknown',
        warehouseStatus: accountInfo[0]?.WAREHOUSE || 'RUNNING',
        storageUsed: `${(storageUsage[0]?.STORAGE_GB || 0).toFixed(1)} GB`,
        creditBalance: '$' + (400 - (creditUsage[0]?.ESTIMATED_COST || 0)).toFixed(2)
      }
    });
    
  } catch (error) {
    return NextResponse.json({
      connected: false,
      stats: {
        account: 'RM58560',
        region: 'AZURE_CENTRALINDIA',
        version: '9.39.2',
        warehouseStatus: 'DISCONNECTED',
        storageUsed: '0 GB',
        creditBalance: '$400.00'
      }
    });
  }
}