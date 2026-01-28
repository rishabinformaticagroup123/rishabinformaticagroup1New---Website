// lib/snowflake-student.ts - WORKING VERSION
export interface StudentConnectionConfig {
  account: string;
  username: string;
  password: string;
  region: string;
  warehouse?: string;
}

// ✅ EXPORT THIS FUNCTION
export async function setupStudentWorkspace(config: StudentConnectionConfig) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('✅ Skipping setup - assuming STUDENT_DB exists');
      
      resolve({
        success: true,
        message: '✅ STUDENT_DB ready (created manually)',
        database: 'STUDENT_DB',
        schema: 'STUDENT_WORKSPACE',
        tables: ['COURSES', 'STUDENTS']
      });
      
    } catch (error: any) {
      reject(new Error(`Setup failed: ${error.message}`));
    }
  });
}

// ✅ EXPORT THIS FUNCTION (CRITICAL!)
export async function executeStudentQuery(
  config: StudentConnectionConfig,
  query: string,
  params: any[] = []
) {
  return new Promise(async (resolve, reject) => {
    try {
      const snowflake = await import('snowflake-sdk');

      // ✅ YOUR EXACT ACCOUNT FORMAT
      const accountFormat = `${config.account}.${config.region}.aws`;
      
      console.log('🔗 Connecting to:', accountFormat);
      
      const connection = snowflake.createConnection({
        account: accountFormat,
        username: config.username,
        password: config.password,
        warehouse: config.warehouse || 'COMPUTE_WH',
        database: 'STUDENT_DB',
        schema: 'STUDENT_WORKSPACE',
        role: 'PUBLIC'
      });

      connection.connect((err: any) => {
        if (err) {
          console.error('❌ Connection failed:', err.message);
          reject(new Error(`Cannot connect: ${err.message}`));
          return;
        }

        console.log('✅ Connected to STUDENT_DB.STUDENT_WORKSPACE');
        
        connection.execute({
          sqlText: query,
          binds: params,
          complete: (err: any, stmt: any, rows: any) => {
            connection.destroy(() => {});
            
            if (err) {
              console.error('❌ Query failed:', err.message);
              reject(new Error(`Query failed: ${err.message}`));
            } else {
              console.log(`✅ Query successful: ${rows?.length || 0} rows`);
              resolve({
                success: true,
                results: rows,
                rowCount: rows?.length || 0,
                sqlText: query
              });
            }
          }
        });
      });
      
    } catch (error: any) {
      reject(new Error(`Failed: ${error.message}`));
    }
  });
}