// app/api/data/upload/route.ts
export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const tableName = formData.get('tableName') as string;
    
    // 1. Upload to Snowflake internal stage
    const stageName = `@STUDENT_STAGES/${file.name}`;
    
    // 2. Create table with auto-detected schema
    const createTableSQL = `
      CREATE TABLE STUDENT_PRACTICE.MY_SCHEMA.${tableName} 
      USING TEMPLATE (
        SELECT ARRAY_AGG(OBJECT_CONSTRUCT(*))
        FROM TABLE(
          INFER_SCHEMA(
            LOCATION => '${stageName}',
            FILE_FORMAT => 'CSV_FORMAT'
          )
        )
      );
    `;
    
    // 3. Copy data into table
    const copySQL = `
      COPY INTO STUDENT_PRACTICE.MY_SCHEMA.${tableName}
      FROM '${stageName}'
      FILE_FORMAT = (FORMAT_NAME = 'CSV_FORMAT');
    `;
    
    return Response.json({
      success: true,
      table: `${tableName}`,
      database: 'STUDENT_PRACTICE',
      schema: 'MY_SCHEMA',
      message: 'Table created successfully'
    });
  } catch (error) {
    return Response.json({ error: 'Upload failed' }, { status: 500 });
  }
}