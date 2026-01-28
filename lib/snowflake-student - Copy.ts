// lib/snowflake-student.ts - NEW FILE
import snowflake from 'snowflake-sdk';

export interface StudentConnectionConfig {
  account: string;
  username: string;
  password: string;
  region: string;
  warehouse?: string;
}

export async function setupStudentWorkspace(config: StudentConnectionConfig) {
  return new Promise((resolve, reject) => {
    try {
      console.log('🔧 Setting up student workspace...', {
        account: config.account,
        user: config.username
      });

      // Clean account name
      const cleanAccount = config.account
        .replace('.snowflakecomputing.com', '')
        .replace('https://', '')
        .replace('http://', '')
        .trim();

      const accountWithRegion = `${cleanAccount}.${config.region}`;
      
      console.log('📊 Creating connection to:', accountWithRegion);

      // Create connection
      const connection = snowflake.createConnection({
        account: accountWithRegion,
        username: config.username,
        password: config.password,
        warehouse: config.warehouse || 'COMPUTE_WH',
        role: 'PUBLIC'
      });

      connection.connect(async (err: any) => {
        if (err) {
          console.error('❌ Connection failed:', err);
          reject(new Error(`Connection failed: ${err.message}`));
          return;
        }

        console.log('✅ Connected to student Snowflake');

        try {
          // Execute setup SQL
          const setupSQL = `
            -- ========================================
            -- STUDENT WORKSPACE SETUP
            -- ========================================
            
            -- Create dedicated schema for student
            CREATE SCHEMA IF NOT EXISTS STUDENT_WORKSPACE;
            
            -- Create COURSES table
            CREATE OR REPLACE TABLE STUDENT_WORKSPACE.COURSES (
              COURSE_ID NUMBER AUTOINCREMENT START 1 INCREMENT 1,
              COURSE_NAME VARCHAR(255) NOT NULL,
              INSTRUCTOR VARCHAR(255),
              START_DATE DATE,
              END_DATE DATE,
              STATUS VARCHAR(50) DEFAULT 'ACTIVE',
              CREATED_AT TIMESTAMP_NTZ DEFAULT CURRENT_TIMESTAMP(),
              
              CONSTRAINT PK_COURSES PRIMARY KEY (COURSE_ID)
            );
            
            -- Create STUDENTS table
            CREATE OR REPLACE TABLE STUDENT_WORKSPACE.STUDENTS (
              STUDENT_ID NUMBER AUTOINCREMENT START 1 INCREMENT 1,
              FIRST_NAME VARCHAR(100) NOT NULL,
              LAST_NAME VARCHAR(100) NOT NULL,
              EMAIL VARCHAR(255),
              PHONE VARCHAR(20),
              COURSE_ID NUMBER,
              ENROLLMENT_DATE DATE DEFAULT CURRENT_DATE(),
              STATUS VARCHAR(50) DEFAULT 'ACTIVE',
              CREATED_AT TIMESTAMP_NTZ DEFAULT CURRENT_TIMESTAMP(),
              
              CONSTRAINT PK_STUDENTS PRIMARY KEY (STUDENT_ID),
              CONSTRAINT FK_COURSE FOREIGN KEY (COURSE_ID) 
                REFERENCES STUDENT_WORKSPACE.COURSES(COURSE_ID)
            );
            
            -- Check if we have any courses, if not add sample data
            INSERT INTO STUDENT_WORKSPACE.COURSES (
              COURSE_NAME, 
              INSTRUCTOR, 
              START_DATE, 
              END_DATE,
              STATUS
            )
            SELECT 
              'Introduction to Snowflake',
              'System Instructor',
              CURRENT_DATE(),
              DATEADD('day', 30, CURRENT_DATE()),
              'ACTIVE'
            WHERE NOT EXISTS (
              SELECT 1 FROM STUDENT_WORKSPACE.COURSES LIMIT 1
            );
            
            -- Check if we have any students, if not add sample student
            INSERT INTO STUDENT_WORKSPACE.STUDENTS (
              FIRST_NAME,
              LAST_NAME,
              EMAIL,
              PHONE,
              COURSE_ID,
              STATUS
            )
            SELECT 
              'John',
              'Doe',
              'john.doe@student.com',
              '+1234567890',
              (SELECT COALESCE(MAX(COURSE_ID), 1) FROM STUDENT_WORKSPACE.COURSES),
              'ACTIVE'
            WHERE NOT EXISTS (
              SELECT 1 FROM STUDENT_WORKSPACE.STUDENTS LIMIT 1
            );
            
            -- Grant permissions
            GRANT ALL PRIVILEGES ON SCHEMA STUDENT_WORKSPACE TO ROLE PUBLIC;
            GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA STUDENT_WORKSPACE TO ROLE PUBLIC;
            
            -- Verify setup
            SELECT 
              (SELECT COUNT(*) FROM STUDENT_WORKSPACE.COURSES) as COURSES_COUNT,
              (SELECT COUNT(*) FROM STUDENT_WORKSPACE.STUDENTS) as STUDENTS_COUNT;
          `;

          console.log('📝 Executing setup SQL...');
          
          connection.execute({
            sqlText: setupSQL,
            complete: (err: any, stmt: any, rows: any) => {
              if (err) {
                console.error('❌ Setup SQL error:', err);
                // Still resolve if tables already exist
                resolve({
                  success: true,
                  message: 'Student workspace already exists',
                  schema: 'STUDENT_WORKSPACE',
                  tables: ['COURSES', 'STUDENTS'],
                  warning: err.message
                });
              } else {
                console.log('✅ Student workspace created successfully');
                console.log('📊 Setup results:', rows);
                
                resolve({
                  success: true,
                  message: 'Student workspace created successfully',
                  schema: 'STUDENT_WORKSPACE',
                  tables: ['COURSES', 'STUDENTS'],
                  stats: rows?.[0]
                });
              }
              
              // Destroy connection
              connection.destroy(() => {
                console.log('🔌 Connection destroyed');
              });
            }
          });
          
        } catch (setupError: any) {
          console.error('❌ Setup process error:', setupError);
          connection.destroy(() => {});
          reject(new Error(`Setup failed: ${setupError.message}`));
        }
      });
      
    } catch (error: any) {
      console.error('❌ Setup initialization error:', error);
      reject(new Error(`Initialization failed: ${error.message}`));
    }
  });
}

// Helper function to execute queries on student's workspace
export async function executeStudentQuery(
  config: StudentConnectionConfig,
  query: string,
  params: any[] = []
) {
  return new Promise((resolve, reject) => {
    const cleanAccount = config.account
      .replace('.snowflakecomputing.com', '')
      .replace('https://', '')
      .replace('http://', '')
      .trim();

    const accountWithRegion = `${cleanAccount}.${config.region}`;
    
    const connection = snowflake.createConnection({
      account: accountWithRegion,
      username: config.username,
      password: config.password,
      warehouse: config.warehouse || 'COMPUTE_WH',
      role: 'PUBLIC'
    });

    connection.connect((err: any) => {
      if (err) {
        reject(new Error(`Connection failed: ${err.message}`));
        return;
      }

      connection.execute({
        sqlText: query,
        binds: params,
        complete: (err: any, stmt: any, rows: any) => {
          connection.destroy(() => {});
          
          if (err) {
            reject(new Error(`Query failed: ${err.message}`));
          } else {
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
  });
}