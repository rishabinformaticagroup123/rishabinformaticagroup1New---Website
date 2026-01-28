// app/api/data/generate/route.ts
export async function POST(request: Request) {
  const { type, rows } = await request.json();
  
  const generators = {
    customers: `
      CREATE TABLE STUDENT_PRACTICE.MY_SCHEMA.SYNTH_CUSTOMERS AS
      SELECT
        UUID_STRING() as customer_id,
        RANDOM() as customer_segment,
        DATEADD(day, -FLOOR(RANDOM() * 3650), CURRENT_DATE()) as signup_date,
        -- ... more synthetic columns
      FROM TABLE(GENERATOR(ROWCOUNT => ${rows}));
    `,
    transactions: `
      CREATE TABLE STUDENT_PRACTICE.MY_SCHEMA.SYNTH_TRANSACTIONS AS
      SELECT
        UUID_STRING() as transaction_id,
        DATEADD(day, -FLOOR(RANDOM() * 365), CURRENT_DATE()) as transaction_date,
        ROUND(RANDOM() * 1000, 2) as amount,
        -- ... more synthetic columns
      FROM TABLE(GENERATOR(ROWCOUNT => ${rows}));
    `
  };
  
  // Execute the SQL
  await snowflake.execute(generators[type as keyof typeof generators]);
  
  return Response.json({ success: true });
}