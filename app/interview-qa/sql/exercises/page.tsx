'use client';

import { useState, useEffect } from 'react';
import {
  Terminal,
  Play,
  CheckCircle,
  XCircle,
  HelpCircle,
  Code,
  Database,
  Clock,
  Star,
  Download,
  Upload,
  RefreshCw,
  Eye,
  EyeOff,
  Copy,
  Check,
  BarChart3,
  Users,
  TrendingUp,
  Shield,
  FileText,
  Puzzle,
  Target,
  Award,
  Trophy,
  Sparkles,
  Zap,
  Brain,
  Lightbulb,
  Calculator,
  ChartBar,
  Filter,
  Search,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
  GitBranch,
  GitMerge,
  GitPullRequest,
  Settings,
  Cpu,
  HardDrive,
  Cloud,
  Network,
  Server,
  Wrench,
  Tool,
  Hammer
} from 'lucide-react';

type Difficulty = 'beginner' | 'intermediate' | 'advanced';
type ExerciseType = 'sql' | 'architecture' | 'performance' | 'security' | 'data-loading' | 'real-world';
type ExerciseStatus = 'not-started' | 'in-progress' | 'completed' | 'reviewed';

type Exercise = {
  id: number;
  title: string;
  description: string;
  scenario: string;
  tasks: string[];
  difficulty: Difficulty;
  type: ExerciseType;
  estimatedTime: number; // in minutes
  points: number;
  status: ExerciseStatus;
  hints: string[];
  solution: string;
  explanation: string;
  learningObjectives: string[];
  prerequisites: string[];
  tags: string[];
  lastAttempted?: Date;
  attempts: number;
  successRate: number; // percentage
};

type UserProgress = {
  completedExercises: number[];
  totalPoints: number;
  totalTime: number;
  streak: number;
};

export default function SnowflakeExercisesPage() {
  // Exercises data
  const [exercises, setExercises] = useState<Exercise[]>([
    {
      id: 1,
      title: "Data Warehouse Setup",
      description: "Set up a complete data warehouse environment in Snowflake",
      scenario: "You're a data engineer at an e-commerce company. You need to set up Snowflake for analytics. The company has sales data, customer data, and product data that needs to be organized.",
      tasks: [
        "Create a database named 'ECOMMERCE'",
        "Create three schemas: 'RAW' (for raw data), 'STAGING' (for cleaned data), 'ANALYTICS' (for final tables)",
        "Create a virtual warehouse named 'ANALYTICS_WH' with size 'MEDIUM', auto-suspend 5 minutes",
        "Create a role 'DATA_ENGINEER' with access to all schemas",
        "Create a user 'ENGINEER_1' with password 'Snowflake2024!' and assign the DATA_ENGINEER role"
      ],
      difficulty: 'beginner',
      type: 'architecture',
      estimatedTime: 15,
      points: 100,
      status: 'not-started',
      hints: [
        "Use CREATE DATABASE command",
        "Schemas are created within databases",
        "Warehouse size affects compute power and cost",
        "GRANT USAGE for schema access",
        "Users need roles to access objects"
      ],
      solution: `-- 1. Create database\nCREATE DATABASE ECOMMERCE;\n\n-- 2. Create schemas\nCREATE SCHEMA ECOMMERCE.RAW;\nCREATE SCHEMA ECOMMERCE.STAGING;\nCREATE SCHEMA ECOMMERCE.ANALYTICS;\n\n-- 3. Create warehouse\nCREATE WAREHOUSE ANALYTICS_WH\n  WITH WAREHOUSE_SIZE = 'MEDIUM'\n  AUTO_SUSPEND = 300\n  AUTO_RESUME = TRUE;\n\n-- 4. Create role\nCREATE ROLE DATA_ENGINEER;\nGRANT USAGE ON DATABASE ECOMMERCE TO ROLE DATA_ENGINEER;\nGRANT USAGE ON ALL SCHEMAS IN DATABASE ECOMMERCE TO ROLE DATA_ENGINEER;\nGRANT USAGE ON WAREHOUSE ANALYTICS_WH TO ROLE DATA_ENGINEER;\n\n-- 5. Create user\nCREATE USER ENGINEER_1\n  PASSWORD = 'Snowflake2024!'\n  DEFAULT_ROLE = DATA_ENGINEER\n  DEFAULT_WAREHOUSE = ANALYTICS_WH;\nGRANT ROLE DATA_ENGINEER TO USER ENGINEER_1;`,
      explanation: "This exercise teaches Snowflake's basic object hierarchy: Database → Schemas → Tables. It also introduces RBAC (Role-Based Access Control) which is crucial for security. The warehouse setup shows how to control compute resources and costs.",
      learningObjectives: [
        "Understand Snowflake object hierarchy",
        "Learn RBAC basics",
        "Configure virtual warehouses",
        "Set up proper data organization"
      ],
      prerequisites: ["Basic SQL knowledge", "Snowflake account access"],
      tags: ["Setup", "RBAC", "Warehouse", "Database Design"],
      attempts: 0,
      successRate: 0
    },
    {
      id: 2,
      title: "Sales Data Analysis",
      description: "Analyze e-commerce sales data with complex queries",
      scenario: "The marketing team wants insights from last quarter's sales. You have a SALES table with columns: sale_id, customer_id, product_id, sale_date, quantity, amount, region. Write queries to answer business questions.",
      tasks: [
        "Find total sales amount by region",
        "Calculate monthly sales growth percentage",
        "Identify top 10 customers by total purchase amount",
        "Find products with sales above average in each region",
        "Calculate running total of sales by date"
      ],
      difficulty: 'intermediate',
      type: 'sql',
      estimatedTime: 25,
      points: 200,
      status: 'not-started',
      hints: [
        "Use GROUP BY for aggregations",
        "Window functions for running totals",
        "Subqueries for above-average calculations",
        "DATE_TRUNC for monthly aggregations",
        "RANK() or ROW_NUMBER() for top N"
      ],
      solution: `-- Sample table structure (assumed)\n-- CREATE TABLE SALES (sale_id INT, customer_id INT, product_id INT, sale_date DATE, quantity INT, amount DECIMAL(10,2), region VARCHAR(50));\n\n-- 1. Total sales by region\nSELECT region, SUM(amount) as total_sales\nFROM SALES\nGROUP BY region\nORDER BY total_sales DESC;\n\n-- 2. Monthly sales growth\nWITH monthly_sales AS (\n  SELECT \n    DATE_TRUNC('month', sale_date) as month,\n    SUM(amount) as monthly_total\n  FROM SALES\n  GROUP BY DATE_TRUNC('month', sale_date)\n)\nSELECT \n  month,\n  monthly_total,\n  LAG(monthly_total) OVER (ORDER BY month) as prev_month,\n  ROUND((monthly_total - LAG(monthly_total) OVER (ORDER BY month)) / LAG(monthly_total) OVER (ORDER BY month) * 100, 2) as growth_pct\nFROM monthly_sales\nORDER BY month;\n\n-- 3. Top 10 customers\nSELECT \n  customer_id,\n  SUM(amount) as total_purchase,\n  COUNT(*) as transaction_count\nFROM SALES\nGROUP BY customer_id\nORDER BY total_purchase DESC\nLIMIT 10;\n\n-- 4. Products above regional average\nWITH regional_avg AS (\n  SELECT \n    region, \n    product_id,\n    SUM(amount) as product_sales,\n    AVG(SUM(amount)) OVER (PARTITION BY region) as region_avg\n  FROM SALES\n  GROUP BY region, product_id\n)\nSELECT region, product_id, product_sales, region_avg\nFROM regional_avg\nWHERE product_sales > region_avg\nORDER BY region, product_sales DESC;\n\n-- 5. Running total by date\nSELECT \n  sale_date,\n  SUM(amount) as daily_sales,\n  SUM(SUM(amount)) OVER (ORDER BY sale_date) as running_total\nFROM SALES\nGROUP BY sale_date\nORDER BY sale_date;`,
      explanation: "This exercise covers essential analytical SQL patterns: aggregation, window functions, and complex filtering. The running total calculation demonstrates Snowflake's excellent performance with window functions. The regional average comparison shows how to use window functions with PARTITION BY.",
      learningObjectives: [
        "Advanced SQL aggregations",
        "Window functions (LAG, OVER, PARTITION BY)",
        "Business intelligence query patterns",
        "Performance optimization with large datasets"
      ],
      prerequisites: ["Intermediate SQL", "Exercise 1 completed"],
      tags: ["Analytics", "Window Functions", "Business Intelligence", "Aggregations"],
      attempts: 0,
      successRate: 0
    },
    {
      id: 3,
      title: "JSON Data Processing",
      description: "Handle semi-structured JSON data in Snowflake",
      scenario: "Your application logs user activity as JSON blobs. Each log contains user_id, action, timestamp, and metadata. You need to extract insights from this semi-structured data.",
      tasks: [
        "Create a table with VARIANT column to store JSON logs",
        "Insert sample JSON data into the table",
        "Extract specific fields from JSON (user_id, action)",
        "Find most frequent user actions",
        "Flatten nested JSON arrays to analyze list data"
      ],
      difficulty: 'intermediate',
      type: 'sql',
      estimatedTime: 20,
      points: 150,
      status: 'not-started',
      hints: [
        "Use PARSE_JSON() to insert JSON",
        "Use : operator to access JSON fields",
        "CAST with :: to convert types",
        "FLATTEN() function for arrays",
        "LATERAL join with FLATTEN"
      ],
      solution: `-- 1. Create table with VARIANT\nCREATE TABLE USER_LOGS (\n  log_id NUMBER AUTOINCREMENT,\n  log_data VARIANT,\n  ingested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP()\n);\n\n-- 2. Insert sample JSON\nINSERT INTO USER_LOGS (log_data) VALUES\n(PARSE_JSON('{\"user_id\": 101, \"action\": \"login\", \"timestamp\": \"2024-01-15T10:30:00\", \"metadata\": {\"browser\": \"Chrome\", \"ip\": \"192.168.1.1\"}}')),\n(PARSE_JSON('{\"user_id\": 102, \"action\": \"purchase\", \"timestamp\": \"2024-01-15T11:15:00\", \"items\": [{\"id\": 1, \"name\": \"Laptop\", \"price\": 999.99}, {\"id\": 2, \"name\": \"Mouse\", \"price\": 49.99}], \"metadata\": {\"browser\": \"Firefox\"}}')),\n(PARSE_JSON('{\"user_id\": 101, \"action\": \"logout\", \"timestamp\": \"2024-01-15T12:00:00\", \"metadata\": {\"session_duration\": 5400}}'));\n\n-- 3. Extract specific fields\nSELECT \n  log_data:user_id::NUMBER as user_id,\n  log_data:action::STRING as action,\n  log_data:timestamp::TIMESTAMP as timestamp\nFROM USER_LOGS;\n\n-- 4. Most frequent actions\nSELECT \n  log_data:action::STRING as action,\n  COUNT(*) as frequency\nFROM USER_LOGS\nGROUP BY log_data:action::STRING\nORDER BY frequency DESC;\n\n-- 5. Flatten nested arrays\nSELECT \n  log_data:user_id::NUMBER as user_id,\n  f.value:id::NUMBER as item_id,\n  f.value:name::STRING as item_name,\n  f.value:price::DECIMAL(10,2) as price\nFROM USER_LOGS,\nLATERAL FLATTEN(INPUT => log_data:items) f\nWHERE log_data:items IS NOT NULL;`,
      explanation: "This exercise demonstrates Snowflake's powerful semi-structured data capabilities. The VARIANT data type allows storing JSON natively without pre-defined schema. The FLATTEN function is particularly useful for analyzing array data, which is common in event logs and IoT data.",
      learningObjectives: [
        "VARIANT data type usage",
        "JSON querying with dot notation",
        "FLATTEN function for arrays",
        "Semi-structured data best practices"
      ],
      prerequisites: ["Basic SQL", "JSON understanding"],
      tags: ["JSON", "VARIANT", "Semi-structured", "FLATTEN"],
      attempts: 0,
      successRate: 0
    },
    {
      id: 4,
      title: "Time Travel & Data Recovery",
      description: "Use Time Travel to recover from data errors",
      scenario: "A junior developer accidentally deleted important customer records and modified wrong data. You need to recover the data using Snowflake's Time Travel feature before the retention period expires.",
      tasks: [
        "Create a table and insert sample data",
        "Simulate accidental DELETE and UPDATE operations",
        "Use Time Travel to view data before modifications",
        "Restore the table to its original state",
        "Create a clone from a specific timestamp"
      ],
      difficulty: 'beginner',
      type: 'real-world',
      estimatedTime: 15,
      points: 100,
      status: 'not-started',
      hints: [
        "Use AT or BEFORE TIMESTAMP for Time Travel",
        "UNDROP TABLE recovers dropped tables",
        "Cloning creates a copy at specific time",
        "Check retention period with SHOW TABLES",
        "Use OFFSET for relative time travel"
      ],
      solution: `-- 1. Create and populate table\nCREATE TABLE CUSTOMERS (\n  customer_id NUMBER,\n  name VARCHAR(100),\n  email VARCHAR(100),\n  status VARCHAR(20)\n);\n\nINSERT INTO CUSTOMERS VALUES\n(1, 'John Doe', 'john@example.com', 'active'),\n(2, 'Jane Smith', 'jane@example.com', 'active'),\n(3, 'Bob Johnson', 'bob@example.com', 'inactive');\n\n-- Simulate mistake after 1 minute\n-- Accidental DELETE\nDELETE FROM CUSTOMERS WHERE customer_id = 1;\n\n-- Accidental UPDATE\nUPDATE CUSTOMERS SET status = 'inactive' WHERE customer_id = 2;\n\n-- 2. View before modifications (using OFFSET - assume 2 minutes ago)\nSELECT * FROM CUSTOMERS\nAT(OFFSET => -120);  -- 120 seconds ago\n\n-- 3. Restore using clone\nCREATE TABLE CUSTOMERS_RESTORED CLONE CUSTOMERS\nAT(OFFSET => -120);\n\n-- Or restore in-place (if table was dropped)\n-- First, check if table exists\n-- If dropped: UNDROP TABLE CUSTOMERS;\n\n-- 4. Verify restoration\nSELECT * FROM CUSTOMERS_RESTORED;\n\n-- 5. Create clone for analysis\nCREATE TABLE CUSTOMERS_ANALYSIS CLONE CUSTOMERS\nAT(TIMESTAMP => '2024-01-15 10:00:00'::timestamp);`,
      explanation: "Time Travel is one of Snowflake's killer features. This exercise teaches how to recover from common data errors. Remember that Time Travel retention is limited (1 day by default, up to 90 days for Enterprise). Always test Time Travel queries before making permanent changes.",
      learningObjectives: [
        "Time Travel query syntax",
        "Data recovery strategies",
        "Cloning from historical points",
        "UNDROP operations"
      ],
      prerequisites: ["Basic SQL", "Table creation knowledge"],
      tags: ["Time Travel", "Data Recovery", "Cloning", "UNDROP"],
      attempts: 0,
      successRate: 0
    },
    {
      id: 5,
      title: "Performance Optimization",
      description: "Optimize query performance in Snowflake",
      scenario: "Your analytics queries are running slowly. The SALES table has 100 million rows. You need to optimize performance using clustering, materialized views, and query patterns.",
      tasks: [
        "Analyze current query performance",
        "Add clustering key to large table",
        "Create materialized view for frequent aggregations",
        "Optimize a slow-running query",
        "Monitor query performance improvements"
      ],
      difficulty: 'advanced',
      type: 'performance',
      estimatedTime: 30,
      points: 300,
      status: 'not-started',
      hints: [
        "Use SYSTEM$CLUSTERING_INFORMATION",
        "Choose clustering keys based on query patterns",
        "Materialized views pre-compute results",
        "Avoid SELECT *, use WHERE efficiently",
        "Check QUERY_HISTORY for performance data"
      ],
      solution: `-- 1. Analyze current table (assuming SALES table exists)\nSELECT \n  COUNT(*) as row_count,\n  MIN(sale_date) as min_date,\n  MAX(sale_date) as max_date\nFROM SALES;\n\n-- Check clustering information\nSELECT SYSTEM$CLUSTERING_INFORMATION('SALES', '(sale_date, region)');\n\n-- 2. Add clustering key\nALTER TABLE SALES CLUSTER BY (sale_date, region);\n\n-- 3. Create materialized view for frequent query\n-- Original slow query: \n-- SELECT region, product_category, SUM(amount) FROM SALES WHERE sale_date >= DATEADD('month', -3, CURRENT_DATE()) GROUP BY region, product_category;\n\nCREATE MATERIALIZED VIEW SALES_SUMMARY_MV\nAS\nSELECT \n  region,\n  product_category,\n  DATE_TRUNC('month', sale_date) as sale_month,\n  COUNT(*) as transaction_count,\n  SUM(amount) as total_sales,\n  AVG(amount) as avg_sale\nFROM SALES\nGROUP BY region, product_category, DATE_TRUNC('month', sale_date);\n\n-- 4. Optimize slow query\n-- Before (slow):\n-- SELECT * FROM SALES WHERE customer_id = 1001;\n\n-- After (optimized):\nSELECT \n  sale_id, customer_id, sale_date, amount, region\nFROM SALES \nWHERE customer_id = 1001\nORDER BY sale_date DESC;\n\n-- 5. Monitor performance\n-- Check query history\nSELECT \n  query_text,\n  execution_time,\n  bytes_scanned,\n  partitions_scanned,\n  partitions_total\nFROM snowflake.account_usage.query_history\nWHERE query_text LIKE '%SALES%'\n  AND start_time >= DATEADD('hour', -24, CURRENT_TIMESTAMP())\nORDER BY execution_time DESC\nLIMIT 10;\n\n-- Check materialized view usage\nSELECT * FROM TABLE(INFORMATION_SCHEMA.MATERIALIZED_VIEW_REFRESH_HISTORY());`,
      explanation: "Performance optimization in Snowflake involves multiple strategies: proper clustering, materialized views for expensive aggregations, and query pattern optimization. Remember that clustering helps with partition pruning, materialized views trade storage for compute, and query optimization reduces data scanning.",
      learningObjectives: [
        "Clustering strategy design",
        "Materialized view implementation",
        "Query performance analysis",
        "Snowflake performance monitoring"
      ],
      prerequisites: ["Intermediate SQL", "Large dataset experience"],
      tags: ["Performance", "Clustering", "Materialized Views", "Optimization"],
      attempts: 0,
      successRate: 0
    },
    {
      id: 6,
      title: "Data Pipeline Automation",
      description: "Build automated data pipeline with Tasks and Streams",
      scenario: "You need to build a daily ETL pipeline that processes new sales data, transforms it, and loads it into analytics tables. Use Snowflake's Tasks and Streams for automation.",
      tasks: [
        "Create a stream to capture changes in source table",
        "Create staging table for transformed data",
        "Create task to process stream data daily",
        "Add error handling to the task",
        "Test the pipeline with sample data"
      ],
      difficulty: 'advanced',
      type: 'real-world',
      estimatedTime: 25,
      points: 250,
      status: 'not-started',
      hints: [
        "Streams track DML changes",
        "Tasks run on schedule (cron syntax)",
        "Use MERGE for incremental loads",
        "Check METADATA$ACTION in streams",
        "Resume tasks after creation"
      ],
      solution: `-- 1. Create source table (if not exists)\nCREATE OR REPLACE TABLE RAW_SALES (\n  sale_id NUMBER,\n  customer_id NUMBER,\n  amount DECIMAL(10,2),\n  sale_date DATE,\n  loaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP()\n);\n\n-- Create stream on source table\nCREATE OR REPLACE STREAM SALES_STREAM ON TABLE RAW_SALES;\n\n-- 2. Create staging table\nCREATE OR REPLACE TABLE STAGING_SALES (\n  sale_id NUMBER PRIMARY KEY,\n  customer_id NUMBER,\n  amount DECIMAL(10,2),\n  sale_date DATE,\n  sale_month DATE,\n  sale_year NUMBER,\n  processed_at TIMESTAMP\n);\n\n-- 3. Create task for daily processing\nCREATE OR REPLACE TASK PROCESS_SALES_TASK\n  WAREHOUSE = TRANSFORM_WH\n  SCHEDULE = 'USING CRON 0 2 * * * UTC'  -- Daily at 2 AM UTC\nAS\n  MERGE INTO STAGING_SALES t\n  USING (\n    SELECT \n      sale_id,\n      customer_id,\n      amount,\n      sale_date,\n      DATE_TRUNC('month', sale_date) as sale_month,\n      YEAR(sale_date) as sale_year,\n      CURRENT_TIMESTAMP() as processed_at,\n      METADATA$ACTION as action_type\n    FROM SALES_STREAM\n  ) s\n  ON t.sale_id = s.sale_id\n  WHEN MATCHED AND s.action_type = 'DELETE' THEN\n    DELETE\n  WHEN MATCHED THEN\n    UPDATE SET \n      t.amount = s.amount,\n      t.processed_at = s.processed_at\n  WHEN NOT MATCHED AND s.action_type = 'INSERT' THEN\n    INSERT (sale_id, customer_id, amount, sale_date, sale_month, sale_year, processed_at)\n    VALUES (s.sale_id, s.customer_id, s.amount, s.sale_date, s.sale_month, s.sale_year, s.processed_at);\n\n-- 4. Add error handling task\nCREATE OR REPLACE TASK HANDLE_ERRORS_TASK\n  WAREHOUSE = TRANSFORM_WH\n  AFTER PROCESS_SALES_TASK\nAS\n  INSERT INTO ERROR_LOGS (task_name, error_message, error_time)\n  SELECT \n    'PROCESS_SALES_TASK',\n    ERROR_MESSAGE(),\n    CURRENT_TIMESTAMP()\n  WHERE EXISTS (\n    SELECT 1 FROM TABLE(INFORMATION_SCHEMA.TASK_HISTORY())\n    WHERE name = 'PROCESS_SALES_TASK'\n      AND scheduled_time >= DATEADD('hour', -1, CURRENT_TIMESTAMP())\n      AND state = 'FAILED'\n  );\n\n-- 5. Test pipeline\n-- Insert test data\nINSERT INTO RAW_SALES (sale_id, customer_id, amount, sale_date) VALUES\n(1, 101, 99.99, '2024-01-15'),\n(2, 102, 149.99, '2024-01-15');\n\n-- Execute task manually for testing\nEXECUTE TASK PROCESS_SALES_TASK;\n\n-- Check results\nSELECT * FROM STAGING_SALES;\nSELECT * FROM SALES_STREAM;  -- Stream should be empty after processing\n\n-- Resume tasks (tasks are suspended by default)\nALTER TASK PROCESS_SALES_TASK RESUME;\nALTER TASK HANDLE_ERRORS_TASK RESUME;`,
      explanation: "This exercise demonstrates building production-grade data pipelines in Snowflake. Tasks and Streams provide serverless automation capabilities. The MERGE pattern is essential for incremental data processing. Error handling and monitoring are critical for reliable pipelines.",
      learningObjectives: [
        "Streams for change data capture",
        "Tasks for scheduled execution",
        "MERGE pattern for upserts",
        "Pipeline error handling",
        "Production pipeline design"
      ],
      prerequisites: ["Intermediate SQL", "ETL concepts"],
      tags: ["Tasks", "Streams", "ETL", "Automation", "Pipeline"],
      attempts: 0,
      successRate: 0
    },
    {
      id: 7,
      title: "Security & Access Control",
      description: "Implement comprehensive security in Snowflake",
      scenario: "As a security admin, you need to implement RBAC, data masking, and network policies for a healthcare application storing sensitive patient data.",
      tasks: [
        "Create roles for different user types (doctor, nurse, admin)",
        "Implement data masking for sensitive columns",
        "Create network policy to restrict IP access",
        "Set up SSO integration (conceptual)",
        "Audit user access and queries"
      ],
      difficulty: 'intermediate',
      type: 'security',
      estimatedTime: 20,
      points: 200,
      status: 'not-started',
      hints: [
        "Use CREATE ROLE and GRANT commands",
        "Masking policies show different data based on role",
        "Network policies control which IPs can connect",
        "Use ACCOUNT_USAGE views for auditing",
        "Test each role's access separately"
      ],
      solution: `-- 1. Create roles hierarchy\nCREATE ROLE SECURITY_ADMIN;\nCREATE ROLE DOCTOR;\nCREATE ROLE NURSE;\nCREATE ROLE ADMIN_STAFF;\n\n-- Grant role hierarchy\nGRANT ROLE NURSE TO ROLE DOCTOR;\nGRANT ROLE DOCTOR TO ROLE SECURITY_ADMIN;\n\n-- 2. Create patient table\nCREATE TABLE PATIENTS (\n  patient_id NUMBER,\n  full_name VARCHAR(100),\n  ssn VARCHAR(11),\n  email VARCHAR(100),\n  phone VARCHAR(15),\n  medical_record TEXT,\n  diagnosis VARCHAR(200)\n);\n\n-- Insert sample data\nINSERT INTO PATIENTS VALUES\n(1, 'John Doe', '123-45-6789', 'john@example.com', '555-0101', 'Patient history...', 'Diagnosis A'),\n(2, 'Jane Smith', '987-65-4321', 'jane@example.com', '555-0102', 'Patient history...', 'Diagnosis B');\n\n-- 3. Create masking policies\n-- SSN masking\nCREATE OR REPLACE MASKING POLICY ssn_mask AS (val string) \n  RETURNS string ->\n  CASE\n    WHEN CURRENT_ROLE() IN ('SECURITY_ADMIN', 'DOCTOR') THEN val\n    WHEN CURRENT_ROLE() = 'NURSE' THEN 'XXX-XX-' || RIGHT(val, 4)\n    ELSE '***-**-****'\n  END;\n\n-- Email masking\nCREATE OR REPLACE MASKING POLICY email_mask AS (val string) \n  RETURNS string ->\n  CASE\n    WHEN CURRENT_ROLE() IN ('SECURITY_ADMIN', 'DOCTOR') THEN val\n    ELSE REGEXP_REPLACE(val, '(.).*(@.*)', '\\\\1***\\\\2')\n  END;\n\n-- Phone masking\nCREATE OR REPLACE MASKING POLICY phone_mask AS (val string) \n  RETURNS string ->\n  CASE\n    WHEN CURRENT_ROLE() IN ('SECURITY_ADMIN', 'DOCTOR', 'NURSE') THEN val\n    ELSE '***-***-' || RIGHT(val, 4)\n  END;\n\n-- Apply masking policies\nALTER TABLE PATIENTS MODIFY COLUMN ssn SET MASKING POLICY ssn_mask;\nALTER TABLE PATIENTS MODIFY COLUMN email SET MASKING POLICY email_mask;\nALTER TABLE PATIENTS MODIFY COLUMN phone SET MASKING POLICY phone_mask;\n\n-- 4. Create network policy\nCREATE NETWORK POLICY OFFICE_NETWORK\n  ALLOWED_IP_LIST = ('192.168.1.0/24', '10.0.0.0/16')\n  BLOCKED_IP_LIST = ('')  -- Can block specific IPs\n  COMMENT = 'Office network access only';\n\n-- Apply network policy (requires ACCOUNTADMIN role)\n-- ALTER ACCOUNT SET NETWORK_POLICY = OFFICE_NETWORK;\n\n-- 5. Audit queries\n-- Check user login history\nSELECT \n  user_name,\n  event_timestamp,\n  client_ip,\n  reported_client_type\nFROM snowflake.account_usage.login_history\nWHERE event_timestamp >= DATEADD('day', -7, CURRENT_TIMESTAMP())\nORDER BY event_timestamp DESC;\n\n-- Check query history\nSELECT \n  user_name,\n  query_text,\n  execution_time,\n  bytes_scanned\nFROM snowflake.account_usage.query_history\nWHERE start_time >= DATEADD('day', -1, CURRENT_TIMESTAMP())\n  AND query_text ILIKE '%PATIENTS%'\nORDER BY start_time DESC;\n\n-- Grant table access to roles\nGRANT SELECT ON TABLE PATIENTS TO ROLE DOCTOR;\nGRANT SELECT ON TABLE PATIENTS TO ROLE NURSE;\nGRANT SELECT (patient_id, full_name) ON TABLE PATIENTS TO ROLE ADMIN_STAFF;`,
      explanation: "Security in Snowflake is multi-layered. RBAC controls who can access what, masking policies control what data they see, and network policies control where they can connect from. Always follow the principle of least privilege. Regular auditing is essential for compliance.",
      learningObjectives: [
        "RBAC implementation",
        "Dynamic data masking",
        "Network security policies",
        "Access auditing",
        "Compliance considerations"
      ],
      prerequisites: ["Basic SQL", "Security concepts"],
      tags: ["Security", "RBAC", "Data Masking", "Network Policies", "Auditing"],
      attempts: 0,
      successRate: 0
    },
    {
      id: 8,
      title: "Cost Optimization Challenge",
      description: "Identify and fix cost inefficiencies in Snowflake",
      scenario: "Your Snowflake bill has unexpectedly increased by 200% this month. You need to identify the cost drivers and implement optimizations.",
      tasks: [
        "Analyze warehouse usage and identify inefficiencies",
        "Find expensive queries and optimize them",
        "Implement auto-suspend for idle warehouses",
        "Set up resource monitors with alerts",
        "Recommend storage optimization strategies"
      ],
      difficulty: 'intermediate',
      type: 'real-world',
      estimatedTime: 20,
      points: 180,
      status: 'not-started',
      hints: [
        "Check WAREHOUSE_METERING_HISTORY",
        "Look for queries with high bytes_scanned",
        "Auto-suspend saves credits when idle",
        "Resource monitors prevent budget overruns",
        "Consider clustering for large tables"
      ],
      solution: `-- 1. Analyze warehouse usage\nSELECT \n  warehouse_name,\n  SUM(credits_used) as total_credits,\n  AVG(credits_used) as avg_credits_per_hour,\n  COUNT(*) as query_count,\n  SUM(credits_used) / COUNT(*) as credits_per_query\nFROM snowflake.account_usage.warehouse_metering_history\nWHERE start_time >= DATEADD('month', -1, CURRENT_TIMESTAMP())\nGROUP BY warehouse_name\nORDER BY total_credits DESC;\n\n-- 2. Find expensive queries\nSELECT \n  query_text,\n  user_name,\n  warehouse_name,\n  execution_time / 1000 as execution_seconds,\n  bytes_scanned,\n  bytes_scanned / POWER(1024, 3) as gb_scanned,\n  partitions_scanned,\n  partitions_total\nFROM snowflake.account_usage.query_history\nWHERE start_time >= DATEADD('day', -7, CURRENT_TIMESTAMP())\n  AND bytes_scanned > 1e9  -- Queries scanning >1GB\nORDER BY bytes_scanned DESC\nLIMIT 20;\n\n-- 3. Implement auto-suspend\n-- Check current warehouse settings\nSHOW WAREHOUSES;\n\n-- Update warehouses without auto-suspend\nALTER WAREHOUSE ANALYTICS_WH \n  SET AUTO_SUSPEND = 300  -- 5 minutes\n  AUTO_RESUME = TRUE;\n\nALTER WAREHOUSE ETL_WH \n  SET AUTO_SUSPEND = 600  -- 10 minutes\n  AUTO_RESUME = TRUE;\n\n-- 4. Create resource monitor\nCREATE RESOURCE MONITOR MONTHLY_BUDGET\n  WITH CREDIT_QUOTA = 1000  -- 1000 credits per month\n  FREQUENCY = MONTHLY\n  START_TIMESTAMP = IMMEDIATE\n  TRIGGERS \n    ON 50 PERCENT DO NOTIFY\n    ON 80 PERCENT DO SUSPEND\n    ON 100 PERCENT DO SUSPEND_IMMEDIATE;\n\n-- Assign to warehouses\nALTER WAREHOUSE ANALYTICS_WH SET RESOURCE_MONITOR = MONTHLY_BUDGET;\nALTER WAREHOUSE ETL_WH SET RESOURCE_MONITOR = MONTHLY_BUDGET;\n\n-- 5. Storage optimization recommendations\n-- Check table storage\nSELECT \n  table_name,\n  active_bytes / POWER(1024, 4) as active_tb,\n  time_travel_bytes / POWER(1024, 4) as time_travel_tb,\n  failsafe_bytes / POWER(1024, 4) as failsafe_tb,\n  ROUND(time_travel_bytes / NULLIF(active_bytes, 0), 2) as time_travel_ratio\nFROM snowflake.account_usage.table_storage_metrics\nWHERE deleted IS NULL\nORDER BY active_bytes DESC\nLIMIT 20;\n\n-- Recommendations:\n-- 1. Reduce Time Travel retention for non-critical tables\n-- 2. Implement clustering for large tables\n-- 3. Archive historical data to cheaper storage\n-- 4. Use zero-copy cloning instead of copying data\n-- 5. Monitor and optimize query patterns\n\n-- Example: Reduce Time Travel retention\nALTER TABLE LARGE_SALES_TABLE \n  SET DATA_RETENTION_TIME_IN_DAYS = 7;  -- From 90 to 7 days\n\n-- Example: Implement clustering\nALTER TABLE LARGE_CUSTOMERS_TABLE \n  CLUSTER BY (created_date, region);`,
      explanation: "Cost optimization requires continuous monitoring and adjustment. The biggest costs are usually compute (warehouses), not storage. Key strategies: right-size warehouses, enable auto-suspend, optimize queries, use resource monitors, and manage Time Travel retention. Always monitor ACCOUNT_USAGE views for insights.",
      learningObjectives: [
        "Cost analysis techniques",
        "Warehouse optimization",
        "Resource monitor setup",
        "Storage cost management",
        "Query optimization for cost"
      ],
      prerequisites: ["Basic SQL", "Snowflake billing knowledge"],
      tags: ["Cost Optimization", "Resource Monitors", "Warehouse Management", "Storage", "Monitoring"],
      attempts: 0,
      successRate: 0
    }
  ]);

  // User progress
  const [userProgress, setUserProgress] = useState<UserProgress>({
    completedExercises: [],
    totalPoints: 0,
    totalTime: 0,
    streak: 0
  });

  // UI State
  const [selectedExercise, setSelectedExercise] = useState<number | null>(1);
  const [showSolution, setShowSolution] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'difficulty' | 'points' | 'time' | 'status'>('difficulty');
  const [attemptText, setAttemptText] = useState<string>('');
  const [isChecking, setIsChecking] = useState(false);
  const [checkResult, setCheckResult] = useState<'correct' | 'incorrect' | null>(null);

  // Get selected exercise
  const currentExercise = exercises.find(ex => ex.id === selectedExercise) || exercises[0];

  // Filter exercises
  const filteredExercises = exercises.filter(ex => {
    const matchesSearch = searchTerm === '' || 
      ex.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ex.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ex.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesDifficulty = selectedDifficulty === 'all' || ex.difficulty === selectedDifficulty;
    const matchesType = selectedType === 'all' || ex.type === selectedType;
    
    return matchesSearch && matchesDifficulty && matchesType;
  }).sort((a, b) => {
    switch(sortBy) {
      case 'difficulty':
        const difficultyOrder = { 'beginner': 1, 'intermediate': 2, 'advanced': 3 };
        return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
      case 'points':
        return b.points - a.points;
      case 'time':
        return a.estimatedTime - b.estimatedTime;
      case 'status':
        const statusOrder = { 'not-started': 1, 'in-progress': 2, 'completed': 3, 'reviewed': 4 };
        return statusOrder[a.status] - statusOrder[b.status];
      default:
        return 0;
    }
  });

  // Handle exercise selection
  const handleSelectExercise = (id: number) => {
    setSelectedExercise(id);
    setShowSolution(false);
    setShowHints(false);
    setAttemptText('');
    setCheckResult(null);
  };

  // Mark exercise as started
  const startExercise = (id: number) => {
    setExercises(exercises.map(ex => 
      ex.id === id && ex.status === 'not-started' 
        ? { ...ex, status: 'in-progress', lastAttempted: new Date(), attempts: ex.attempts + 1 }
        : ex
    ));
    setSelectedExercise(id);
  };

  // Mark exercise as completed
  const completeExercise = (id: number) => {
    const exercise = exercises.find(ex => ex.id === id);
    if (!exercise) return;

    setExercises(exercises.map(ex => 
      ex.id === id 
        ? { 
            ...ex, 
            status: 'completed', 
            lastAttempted: new Date(), 
            attempts: ex.attempts + 1,
            successRate: ex.attempts === 0 ? 100 : Math.min(100, ((ex.successRate * ex.attempts) + 100) / (ex.attempts + 1))
          }
        : ex
    ));

    if (!userProgress.completedExercises.includes(id)) {
      setUserProgress({
        ...userProgress,
        completedExercises: [...userProgress.completedExercises, id],
        totalPoints: userProgress.totalPoints + exercise.points,
        totalTime: userProgress.totalTime + exercise.estimatedTime,
        streak: userProgress.streak + 1
      });
    }
  };

  // Check SQL attempt
  const checkAttempt = () => {
    if (!attemptText.trim()) return;
    
    setIsChecking(true);
    
    // Simple check - just see if they've written some SQL
    const hasSQLKeywords = /(SELECT|CREATE|INSERT|UPDATE|DELETE|ALTER|WITH|FROM|WHERE|JOIN|GROUP BY|ORDER BY)/i.test(attemptText);
    const hasTableMentions = new RegExp(currentExercise.title.split(' ').join('|'), 'i').test(attemptText);
    
    setTimeout(() => {
      setIsChecking(false);
      
      if (hasSQLKeywords && hasTableMentions) {
        setCheckResult('correct');
        // Auto-complete if they got it right
        if (currentExercise.status !== 'completed') {
          completeExercise(currentExercise.id);
        }
      } else {
        setCheckResult('incorrect');
      }
    }, 1500);
  };

  // Copy solution to clipboard
  const copySolution = () => {
    navigator.clipboard.writeText(currentExercise.solution);
  };

  // Reset exercise
  const resetExercise = (id: number) => {
    setExercises(exercises.map(ex => 
      ex.id === id 
        ? { ...ex, status: 'not-started', attempts: ex.attempts + 1 }
        : ex
    ));
    setAttemptText('');
    setCheckResult(null);
  };

  // Get status color
  const getStatusColor = (status: ExerciseStatus) => {
    switch(status) {
      case 'not-started': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      case 'in-progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'reviewed': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
    }
  };

  // Get difficulty icon
  const getDifficultyIcon = (difficulty: Difficulty) => {
    switch(difficulty) {
      case 'beginner': return <Sparkles size={16} />;
      case 'intermediate': return <Zap size={16} />;
      case 'advanced': return <Brain size={16} />;
    }
  };

  // Get type icon
  const getTypeIcon = (type: ExerciseType) => {
    switch(type) {
      case 'sql': return <Database size={16} />;
      case 'architecture': return <Server size={16} />;
      case 'performance': return <TrendingUp size={16} />;
      case 'security': return <Shield size={16} />;
      case 'data-loading': return <Upload size={16} />;
      case 'real-world': return <Target size={16} />;
    }
  };

  // Calculate progress percentage
  const progressPercentage = (userProgress.completedExercises.length / exercises.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-amber-50 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8 md:mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
                <Terminal className="text-amber-600 dark:text-amber-400" size={40} />
                <span>Snowflake Hands-on Exercises</span>
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
                Practice real-world scenarios and master Snowflake through interactive exercises
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow">
                <span className="font-semibold">{userProgress.completedExercises.length}/{exercises.length} completed</span>
              </div>
            </div>
          </div>

          {/* Progress Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="text-amber-500" size={20} />
                <span className="font-semibold">Total Points</span>
              </div>
              <p className="text-2xl font-bold">{userProgress.totalPoints}</p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                <div 
                  className="bg-amber-500 h-2 rounded-full" 
                  style={{ width: `${Math.min(100, (userProgress.totalPoints / 1500) * 100)}%` }}
                ></div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="text-blue-500" size={20} />
                <span className="font-semibold">Time Invested</span>
              </div>
              <p className="text-2xl font-bold">{userProgress.totalTime} min</p>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {Math.floor(userProgress.totalTime / 60)}h {userProgress.totalTime % 60}m
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="text-green-500" size={20} />
                <span className="font-semibold">Current Streak</span>
              </div>
              <p className="text-2xl font-bold">{userProgress.streak} days</p>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Keep it up!
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
              <div className="flex items-center gap-2 mb-2">
                <Award className="text-purple-500" size={20} />
                <span className="font-semibold">Progress</span>
              </div>
              <p className="text-2xl font-bold">{Math.round(progressPercentage)}%</p>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left Sidebar - Exercise List */}
            <div className="lg:w-1/3">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-6 mb-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Puzzle size={20} className="text-blue-500" />
                  Available Exercises
                </h2>

                {/* Search and Filters */}
                <div className="mb-4">
                  <div className="relative mb-3">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      placeholder="Search exercises..."
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <select
                      className="flex-1 min-w-[120px] px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                      value={selectedDifficulty}
                      onChange={(e) => setSelectedDifficulty(e.target.value)}
                    >
                      <option value="all">All Difficulties</option>
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>

                    <select
                      className="flex-1 min-w-[120px] px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                    >
                      <option value="all">All Types</option>
                      <option value="sql">SQL</option>
                      <option value="architecture">Architecture</option>
                      <option value="performance">Performance</option>
                      <option value="security">Security</option>
                      <option value="data-loading">Data Loading</option>
                      <option value="real-world">Real World</option>
                    </select>

                    <select
                      className="flex-1 min-w-[120px] px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                    >
                      <option value="difficulty">Sort by Difficulty</option>
                      <option value="points">Sort by Points</option>
                      <option value="time">Sort by Time</option>
                      <option value="status">Sort by Status</option>
                    </select>
                  </div>
                </div>

                {/* Exercise List */}
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                  {filteredExercises.map((exercise) => (
                    <div
                      key={exercise.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                        selectedExercise === exercise.id 
                          ? 'border-amber-500 bg-amber-50 dark:bg-amber-900/20' 
                          : 'border-gray-200 dark:border-gray-700 hover:border-amber-300'
                      }`}
                      onClick={() => handleSelectExercise(exercise.id)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${getStatusColor(exercise.status)}`}>
                            {exercise.status.replace('-', ' ')}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {exercise.estimatedTime} min
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star size={14} className="text-amber-500" />
                          <span className="text-sm font-semibold">{exercise.points}</span>
                        </div>
                      </div>

                      <h3 className="font-semibold mb-2">{exercise.title}</h3>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <span className="flex items-center gap-1 text-xs">
                          {getDifficultyIcon(exercise.difficulty)}
                          <span className="capitalize">{exercise.difficulty}</span>
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="flex items-center gap-1 text-xs">
                          {getTypeIcon(exercise.type)}
                          <span>{exercise.type}</span>
                        </span>
                      </div>

                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {exercise.description}
                      </p>

                      <div className="flex flex-wrap gap-1 mt-2">
                        {exercise.tags.slice(0, 3).map((tag, idx) => (
                          <span key={idx} className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">
                            {tag}
                          </span>
                        ))}
                        {exercise.tags.length > 3 && (
                          <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">
                            +{exercise.tags.length - 3}
                          </span>
                        )}
                      </div>

                      {exercise.status === 'not-started' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            startExercise(exercise.id);
                          }}
                          className="w-full mt-3 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg text-sm font-medium transition-colors"
                        >
                          Start Exercise
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {filteredExercises.length === 0 && (
                  <div className="text-center py-8">
                    <Search size={32} className="mx-auto text-gray-400 mb-3" />
                    <p className="text-gray-500 dark:text-gray-400">No exercises found</p>
                  </div>
                )}
              </div>
            </div>

            {/* Right Panel - Exercise Details */}
            <div className="lg:w-2/3">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                {/* Exercise Header */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(currentExercise.status)}`}>
                          {currentExercise.status.replace('-', ' ').toUpperCase()}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          currentExercise.difficulty === 'beginner' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                          currentExercise.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                          'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                        }`}>
                          {currentExercise.difficulty.toUpperCase()}
                        </span>
                        <span className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                          {currentExercise.type.toUpperCase()}
                        </span>
                        <span className="px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                          {currentExercise.estimatedTime} MIN
                        </span>
                        <span className="px-3 py-1 rounded-full text-sm font-semibold bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300 flex items-center gap-1">
                          <Star size={14} />
                          {currentExercise.points} POINTS
                        </span>
                      </div>
                      <h2 className="text-2xl font-bold mb-2">{currentExercise.title}</h2>
                      <p className="text-gray-600 dark:text-gray-400">{currentExercise.description}</p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {currentExercise.status === 'completed' ? (
                        <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                          <CheckCircle size={24} />
                          <span className="font-semibold">Completed!</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => startExercise(currentExercise.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium"
                        >
                          <Play size={16} />
                          {currentExercise.status === 'in-progress' ? 'Continue' : 'Start'}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Target size={14} />
                      <span>Attempts: {currentExercise.attempts}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp size={14} />
                      <span>Success Rate: {currentExercise.successRate}%</span>
                    </div>
                    {currentExercise.lastAttempted && (
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>Last attempted: {new Date(currentExercise.lastAttempted).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Exercise Content */}
                <div className="p-6">
                  {/* Scenario */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <FileText size={18} className="text-blue-500" />
                      Scenario
                    </h3>
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                      <p className="text-gray-700 dark:text-gray-300">{currentExercise.scenario}</p>
                    </div>
                  </div>

                  {/* Tasks */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle size={18} className="text-green-500" />
                      Your Tasks
                    </h3>
                    <div className="space-y-3">
                      {currentExercise.tasks.map((task, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                          <div className="w-6 h-6 bg-amber-100 dark:bg-amber-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-amber-600 dark:text-amber-400 font-bold">{index + 1}</span>
                          </div>
                          <span className="text-gray-700 dark:text-gray-300">{task}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Learning Objectives */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Lightbulb size={18} className="text-yellow-500" />
                      Learning Objectives
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {currentExercise.learningObjectives.map((objective, index) => (
                        <span key={index} className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-300 rounded-full text-sm">
                          {objective}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Prerequisites */}
                  {currentExercise.prerequisites.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <BookOpen size={18} className="text-purple-500" />
                        Prerequisites
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {currentExercise.prerequisites.map((prereq, index) => (
                          <span key={index} className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-300 rounded-full text-sm">
                            {prereq}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* SQL Editor */}
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Terminal size={18} className="text-green-500" />
                        Your Solution
                      </h3>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setShowHints(!showHints)}
                          className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded text-sm hover:bg-blue-200 dark:hover:bg-blue-800"
                        >
                          <HelpCircle size={14} />
                          {showHints ? 'Hide Hints' : 'Show Hints'}
                        </button>
                        <button
                          onClick={() => setShowSolution(!showSolution)}
                          className="flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 rounded text-sm hover:bg-green-200 dark:hover:bg-green-800"
                        >
                          <Eye size={14} />
                          {showSolution ? 'Hide Solution' : 'Show Solution'}
                        </button>
                      </div>
                    </div>

                    {/* Hints */}
                    {showHints && (
                      <div className="mb-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
                        <h4 className="font-semibold mb-2 text-blue-700 dark:text-blue-300">Hints:</h4>
                        <ul className="space-y-1">
                          {currentExercise.hints.map((hint, index) => (
                            <li key={index} className="flex items-start gap-2">
                              <span className="text-blue-500">💡</span>
                              <span className="text-gray-700 dark:text-gray-300">{hint}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Solution Preview */}
                    {showSolution && (
                      <div className="mb-4">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-semibold text-green-700 dark:text-green-300">Solution:</h4>
                          <button
                            onClick={copySolution}
                            className="flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-sm hover:bg-gray-200 dark:hover:bg-gray-600"
                          >
                            <Copy size={12} />
                            Copy
                          </button>
                        </div>
                        <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                          <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap">
                            {currentExercise.solution}
                          </pre>
                        </div>
                      </div>
                    )}

                    {/* SQL Editor */}
                    <div className="mb-4">
                      <textarea
                        value={attemptText}
                        onChange={(e) => setAttemptText(e.target.value)}
                        placeholder="Write your SQL solution here..."
                        className="w-full h-64 font-mono text-sm p-4 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                        spellCheck="false"
                      />
                    </div>

                    {/* Check Result */}
                    {checkResult && (
                      <div className={`p-4 rounded-lg mb-4 ${
                        checkResult === 'correct' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border border-green-200 dark:border-green-800' 
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 border border-red-200 dark:border-red-800'
                      }`}>
                        <div className="flex items-center gap-2">
                          {checkResult === 'correct' ? <CheckCircle size={20} /> : <XCircle size={20} />}
                          <span className="font-semibold">
                            {checkResult === 'correct' ? 'Great job! Your SQL looks good.' : 'Try again. Check your SQL syntax.'}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={checkAttempt}
                        disabled={isChecking || !attemptText.trim()}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium ${
                          isChecking 
                            ? 'bg-gray-400 text-gray-700 cursor-not-allowed' 
                            : 'bg-amber-500 hover:bg-amber-600 text-white'
                        }`}
                      >
                        {isChecking ? (
                          <>
                            <RefreshCw size={16} className="animate-spin" />
                            Checking...
                          </>
                        ) : (
                          <>
                            <CheckCircle size={16} />
                            Check Solution
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => completeExercise(currentExercise.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium"
                      >
                        <Award size={16} />
                        Mark as Complete
                      </button>

                      <button
                        onClick={() => resetExercise(currentExercise.id)}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium"
                      >
                        <RefreshCw size={16} />
                        Reset
                      </button>
                    </div>
                  </div>

                  {/* Explanation */}
                  <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                      <Brain size={18} className="text-purple-500" />
                      Explanation
                    </h3>
                    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                      <p className="text-gray-700 dark:text-gray-300">{currentExercise.explanation}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tips Section */}
          <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Lightbulb className="text-amber-500" />
              Tips for Success
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                <div className="w-10 h-10 bg-amber-100 dark:bg-amber-800 rounded-full flex items-center justify-center mb-3">
                  <Play className="text-amber-600 dark:text-amber-400" size={20} />
                </div>
                <h4 className="font-semibold mb-2">Start Simple</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Begin with beginner exercises to build confidence before tackling advanced scenarios.
                </p>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-800 rounded-full flex items-center justify-center mb-3">
                  <Terminal className="text-blue-600 dark:text-blue-400" size={20} />
                </div>
                <h4 className="font-semibold mb-2">Practice Regularly</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Consistent practice is key to mastering Snowflake. Try to complete at least one exercise daily.
                </p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-800 rounded-full flex items-center justify-center mb-3">
                  <HelpCircle className="text-green-600 dark:text-green-400" size={20} />
                </div>
                <h4 className="font-semibold mb-2">Use Hints Wisely</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Try solving on your own first, then use hints if stuck. Don't peek at solutions too quickly.
                </p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-800 rounded-full flex items-center justify-center mb-3">
                  <Target className="text-purple-600 dark:text-purple-400" size={20} />
                </div>
                <h4 className="font-semibold mb-2">Real Application</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Apply what you learn to real projects. These exercises simulate actual work scenarios.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center text-gray-600 dark:text-gray-400">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <Terminal size={18} className="text-amber-500" />
                <span>Snowflake Hands-on Exercises • Practice makes perfect</span>
              </div>
              <div className="text-sm">
                <p>{filteredExercises.length} exercises available • {userProgress.completedExercises.length} completed</p>
              </div>
            </div>
            <p className="mt-4 text-xs">
              These exercises simulate real-world Snowflake scenarios. All solutions are tested and production-ready.
            </p>
          </footer>
        </header>
      </div>
    </div>
  );
}