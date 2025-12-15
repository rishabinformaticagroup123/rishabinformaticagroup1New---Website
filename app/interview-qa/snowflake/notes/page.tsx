'use client';

import { useState, useEffect } from 'react';
import { 
  BookOpen, 
  FileText, 
  Database, 
  Cloud,
  Snowflake as SnowflakeIcon,
  Layers,
  Shield,
  Zap,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronRight,
  Copy,
  Check,
  Download,
  Bookmark,
  BookmarkCheck,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Hash,
  Lock,
  RefreshCw,
  Code,
  BarChart,
  Users,
  CreditCard,
  Server,
  Wifi,
  Globe,
  Cpu,
  HardDrive,
  Key,
  ShieldCheck,
  Network,
  FolderTree,
  Table,
  FileJson,
  GitBranch,
  History,
  Copy as CopyIcon,
  Share2,
  Eye,
  EyeOff,
  DownloadCloud,
  UploadCloud,
  Calendar
} from 'lucide-react';

type NoteCategory = 'architecture' | 'sql' | 'features' | 'security' | 'performance' | 'pricing' | 'best-practices';
type NoteDifficulty = 'beginner' | 'intermediate' | 'advanced';

type Note = {
  id: number;
  title: string;
  content: string;
  category: NoteCategory;
  difficulty: NoteDifficulty;
  tags: string[];
  isBookmarked: boolean;
  lastReviewed?: Date;
  codeSnippet?: string;
  keyPoints?: string[];
  relatedConcepts?: string[];
  interviewTips?: string[];
};

export default function SnowflakeNotesPage() {
  // State for notes
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: "Snowflake Architecture - 3 Layer Model",
      content: "Snowflake's unique architecture separates storage, compute, and cloud services into three independent layers:\n\n1. **Database Storage Layer**: Stores all data in optimized, compressed columnar format (similar to Parquet). Data is automatically encrypted and partitioned into micro-partitions.\n\n2. **Query Processing Layer (Virtual Warehouses)**: Independent compute clusters that process queries. Each warehouse is an MPP (Massively Parallel Processing) cluster that can be scaled up/down independently.\n\n3. **Cloud Services Layer**: The brain of Snowflake that coordinates everything - authentication, infrastructure management, query optimization, metadata, and transaction management.",
      category: 'architecture',
      difficulty: 'beginner',
      tags: ['Architecture', 'Basics', 'Core Concepts'],
      isBookmarked: false,
      codeSnippet: "-- Virtual Warehouse creation example\nCREATE WAREHOUSE analytics_wh\n  WITH WAREHOUSE_SIZE = 'MEDIUM'\n  AUTO_SUSPEND = 300  -- Suspend after 5 minutes idle\n  AUTO_RESUME = TRUE\n  MIN_CLUSTER_COUNT = 1\n  MAX_CLUSTER_COUNT = 3;  -- Multi-cluster scaling",
      keyPoints: [
        "Separation allows independent scaling of storage and compute",
        "Storage costs are separate from compute costs",
        "Virtual warehouses can be started/stopped on demand",
        "Multi-cluster warehouses handle concurrent users efficiently"
      ],
      relatedConcepts: ['Virtual Warehouses', 'Micro-partitions', 'Cloud Services'],
      interviewTips: [
        "Always mention the 3-layer separation as key differentiator",
        "Explain how this architecture enables features like Time Travel",
        "Compare with traditional databases where compute and storage are coupled"
      ]
    },
    {
      id: 2,
      title: "Virtual Warehouses - The Compute Engine",
      content: "Virtual Warehouses are Snowflake's compute clusters that process queries. Key characteristics:\n\n• **Sizes**: X-Small (1 credit/hr) to 6X-Large (512 credits/hr), each size doubles compute power\n• **Scaling**: Scale UP (change size) or Scale OUT (add clusters)\n• **Auto-suspend**: Automatically stops when idle (saves credits)\n• **Auto-resume**: Automatically starts when new queries arrive\n• **Multi-cluster**: Multiple clusters for concurrent users (up to 10 clusters)\n\nBest Practices:\n- Use separate warehouses for different workloads (ETL vs BI vs Ad-hoc)\n- Right-size warehouses based on workload requirements\n- Enable auto-suspend for cost savings\n- Use multi-cluster for high concurrency scenarios",
      category: 'architecture',
      difficulty: 'beginner',
      tags: ['Compute', 'Warehouses', 'Performance'],
      isBookmarked: false,
      codeSnippet: "-- Warehouse management examples\n-- Resize warehouse\nALTER WAREHOUSE analytics_wh SET WAREHOUSE_SIZE = 'LARGE';\n\n-- Create multi-cluster warehouse\nCREATE WAREHOUSE bi_wh\n  WAREHOUSE_SIZE = 'MEDIUM'\n  MIN_CLUSTER_COUNT = 1\n  MAX_CLUSTER_COUNT = 4\n  SCALING_POLICY = 'STANDARD';\n\n-- Suspend/Resume\nALTER WAREHOUSE analytics_wh SUSPEND;\nALTER WAREHOUSE analytics_wh RESUME;",
      keyPoints: [
        "Pay only for compute when warehouse is running",
        "Auto-suspend is crucial for cost optimization",
        "Multi-cluster warehouses handle user concurrency",
        "Warehouse size affects query performance and cost"
      ],
      relatedConcepts: ['Credits', 'Scaling', 'Concurrency'],
      interviewTips: [
        "Explain when to use multi-cluster vs single-cluster",
        "Discuss cost implications of warehouse sizing",
        "Mention real-world scenarios for different warehouse types"
      ]
    },
    {
      id: 3,
      title: "Time Travel & Data Protection",
      content: "Time Travel allows accessing historical data within a retention period:\n\n**Retention Periods**:\n- Standard: 1 day (default)\n- Enterprise: Up to 90 days\n- Business Critical: Configurable retention\n\n**Time Travel Operations**:\n1. `AT | BEFORE TIMESTAMP`: View data at specific time\n2. `OFFSET`: View data X seconds ago\n3. `STATEMENT`: View data before specific query\n\n**Fail-safe**: 7-day period after Time Travel ends (Snowflake-managed disaster recovery)\n\n**Key Commands**:\n- `UNDROP TABLE`: Restore dropped table\n- `UNDROP SCHEMA/DATABASE`: Restore dropped objects\n- `ALTER TABLE ... SET DATA_RETENTION_TIME_IN_DAYS`: Change retention",
      category: 'features',
      difficulty: 'intermediate',
      tags: ['Data Protection', 'Backup', 'Recovery'],
      isBookmarked: false,
      codeSnippet: "-- Time Travel examples\n-- View table as of specific time\nSELECT * FROM customers\n  AT(TIMESTAMP => '2024-01-15 10:00:00'::timestamp);\n\n-- View table 2 hours ago\nSELECT * FROM customers\n  AT(OFFSET => -60*60*2);  -- -7200 seconds\n\n-- Restore dropped table\nUNDROP TABLE customers;\n\n-- Clone from historical point\nCREATE TABLE customers_restored CLONE customers\n  AT(TIMESTAMP => '2024-01-10 09:00:00'::timestamp);",
      keyPoints: [
        "Time Travel is NOT a backup solution (retention limited)",
        "Fail-safe is for disaster recovery only (Snowflake access)",
        "Longer retention = more storage costs",
        "Time Travel works at table, schema, and database levels"
      ],
      relatedConcepts: ['Zero-copy Cloning', 'Data Retention', 'Fail-safe'],
      interviewTips: [
        "Differentiate between Time Travel and traditional backups",
        "Explain business use cases for Time Travel",
        "Discuss retention period considerations"
      ]
    },
    {
      id: 4,
      title: "Zero-Copy Cloning",
      content: "Zero-copy cloning creates instant copies of databases, schemas, or tables without duplicating data:\n\n**How it works**:\n- Creates metadata pointers to original data\n- Uses copy-on-write when changes are made\n- No additional storage cost initially\n- Changes become independent through copy-on-write\n\n**Use Cases**:\n1. **Development/Testing**: Clone production for dev work\n2. **Experimentation**: Test changes without affecting production\n3. **Snapshotting**: Create point-in-time copies for analysis\n4. **Backup**: Quick backup before major changes\n\n**Benefits**:\n- Instant regardless of data size\n- No storage duplication\n- Independent development environments\n- Cost-effective for testing",
      category: 'features',
      difficulty: 'intermediate',
      tags: ['Cloning', 'Data Management', 'Development'],
      isBookmarked: false,
      codeSnippet: "-- Cloning examples\n-- Clone a table\nCREATE TABLE dev_schema.customers_dev \n  CLONE prod_schema.customers;\n\n-- Clone a schema\nCREATE SCHEMA dev_schema \n  CLONE prod_schema;\n\n-- Clone a database\nCREATE DATABASE dev_db \n  CLONE prod_db;\n\n-- Clone with Time Travel\nCREATE TABLE customers_snapshot CLONE customers\n  AT(TIMESTAMP => '2024-01-01 00:00:00'::timestamp);",
      keyPoints: [
        "No initial storage cost - only metadata pointers",
        "Copy-on-write creates actual copies when data changes",
        "Clones are independent after creation",
        "Perfect for dev/test environments"
      ],
      relatedConcepts: ['Time Travel', 'Storage Optimization', 'Metadata'],
      interviewTips: [
        "Explain the copy-on-write mechanism",
        "Compare with traditional backup/restore",
        "Discuss cost benefits for large datasets"
      ]
    },
    {
      id: 5,
      title: "Semi-structured Data (JSON, XML, Parquet)",
      content: "Snowflake natively supports semi-structured data through VARIANT data type:\n\n**VARIANT Features**:\n- Stores JSON, Avro, ORC, Parquet, XML\n- Automatic schema detection\n- Columnar storage of parsed data\n- Dot notation for querying (`:` operator)\n- `FLATTEN()` function for nested arrays\n- Preserves original document structure\n\n**Best Practices**:\n1. Extract frequently accessed fields to relational columns\n2. Use `TRY_PARSE_JSON()` for validation\n3. Create views over flattened data\n4. Use `LATERAL FLATTEN()` for array processing\n5. Consider `OBJECT_CONSTRUCT()` for creating JSON\n\n**Performance Tips**:\n- VARIANT columns have ~2x storage overhead\n- Extract common fields for better performance\n- Use `CAST` with `::` for type conversion",
      category: 'sql',
      difficulty: 'intermediate',
      tags: ['JSON', 'VARIANT', 'Semi-structured', 'Data Types'],
      isBookmarked: false,
      codeSnippet: "-- JSON handling examples\n-- Create table with VARIANT\nCREATE TABLE user_profiles (\n  id NUMBER,\n  profile_data VARIANT\n);\n\n-- Insert JSON data\nINSERT INTO user_profiles VALUES (\n  1,\n  PARSE_JSON('{\"name\": \"John\", \"age\": 30, \"address\": {\"city\": \"NYC\", \"zip\": \"10001\"}}')\n);\n\n-- Query JSON data\nSELECT \n  profile_data:name::STRING as name,\n  profile_data:age::NUMBER as age,\n  profile_data:address:city::STRING as city\nFROM user_profiles\nWHERE profile_data:age > 25;\n\n-- Flatten arrays\nSELECT \n  user_id,\n  f.value::STRING as skill\nFROM user_skills,\nLATERAL FLATTEN(INPUT => skills) f;",
      keyPoints: [
        "VARIANT stores parsed, compressed JSON",
        "Dot notation (:) accesses nested elements",
        "FLATTEN() processes arrays into rows",
        "Type casting (::) converts VARIANT to SQL types"
      ],
      relatedConcepts: ['Data Loading', 'External Tables', 'Streams'],
      interviewTips: [
        "Explain when to use VARIANT vs relational modeling",
        "Discuss performance implications",
        "Show examples of complex JSON queries"
      ]
    },
    {
      id: 6,
      title: "Caching in Snowflake",
      content: "Snowflake has 3 layers of caching for performance optimization:\n\n**1. Result Cache (Most Impactful)**\n- Stores query results for 24 hours\n- Shared across all users/warehouses\n- No compute cost for cached results\n- Requires identical SQL (including whitespace)\n\n**2. Warehouse/Local Disk Cache**\n- Data cached in warehouse SSD\n- Persists while warehouse runs\n- Cleared when warehouse suspends\n- Per-cluster cache (not shared)\n\n**3. Metadata Cache**\n- Statistics and metadata\n- Used for query optimization\n- Always available\n\n**Cache Invalidation**:\n- Data changes invalidate relevant caches\n- Warehouse restart clears local cache\n- Manual cache clearing not available",
      category: 'performance',
      difficulty: 'advanced',
      tags: ['Caching', 'Performance', 'Optimization'],
      isBookmarked: false,
      codeSnippet: "-- Monitoring cache usage\n-- Check query history for cache hits\nSELECT \n  query_id,\n  query_text,\n  execution_time,\n  bytes_scanned,\n  result_cache_hit\nFROM snowflake.account_usage.query_history\nWHERE result_cache_hit = TRUE\nORDER BY execution_time DESC\nLIMIT 10;\n\n-- Cache effectiveness example\n-- First run: Uses compute\nSELECT COUNT(*) FROM large_table WHERE date = '2024-01-15';\n-- Second identical run: Uses result cache (instant)\nSELECT COUNT(*) FROM large_table WHERE date = '2024-01-15';",
      keyPoints: [
        "Result cache is the most powerful (24 hours)",
        "Cache hits save 100% compute cost",
        "Warehouse cache improves repeated queries",
        "Identical SQL required for result cache"
      ],
      relatedConcepts: ['Query Optimization', 'Warehouse Management', 'Cost Optimization'],
      interviewTips: [
        "Explain the 3 cache layers clearly",
        "Discuss cache invalidation scenarios",
        "Mention cost benefits of caching"
      ]
    },
    {
      id: 7,
      title: "Materialized Views",
      content: "Materialized Views (MVs) are pre-computed query results stored as physical tables:\n\n**Characteristics**:\n- Automatically refresh when base data changes\n- Support incremental refresh\n- Improve performance for expensive queries\n- Have limitations (joins, windows, UDFs)\n\n**When to Use MVs**:\n✓ Frequent complex queries on large tables\n✓ Predictable query patterns\n✓ Performance critical applications\n✓ Aggregations and summaries\n\n**Limitations**:\n✗ No joins across multiple tables\n✗ Limited window functions\n✗ No UDFs in some cases\n✗ Additional storage and compute cost\n\n**Best Practices**:\n- Use for expensive aggregations\n- Monitor refresh costs\n- Consider base table clustering\n- Test performance gains",
      category: 'performance',
      difficulty: 'advanced',
      tags: ['Views', 'Performance', 'Optimization'],
      isBookmarked: false,
      codeSnippet: "-- Materialized View examples\n-- Create MV\nCREATE MATERIALIZED VIEW daily_sales_mv\nAS\nSELECT \n  DATE_TRUNC('day', sale_date) as sale_day,\n  product_category,\n  COUNT(*) as transaction_count,\n  SUM(sale_amount) as total_sales,\n  AVG(sale_amount) as avg_sale\nFROM sales\nGROUP BY sale_day, product_category;\n\n-- Query MV (fast)\nSELECT * FROM daily_sales_mv\nWHERE sale_day = '2024-01-15';\n\n-- Monitor MV\nSHOW MATERIALIZED VIEWS;\nSELECT * FROM TABLE(INFORMATION_SCHEMA.MATERIALIZED_VIEW_REFRESH_HISTORY());",
      keyPoints: [
        "MVs store physical data, not just queries",
        "Automatic refresh maintains data freshness",
        "Best for expensive aggregations",
        "Consider storage/compute trade-off"
      ],
      relatedConcepts: ['Standard Views', 'Clustering', 'Query Optimization'],
      interviewTips: [
        "Differentiate from standard views",
        "Discuss use cases and limitations",
        "Explain refresh mechanisms"
      ]
    },
    {
      id: 8,
      title: "Secure Data Sharing",
      content: "Snowflake Secure Data Sharing enables live, read-only data sharing between accounts:\n\n**Sharing Types**:\n1. **Direct Share**: Provider → Consumer (1:1)\n2. **Data Exchange**: Multiple providers/consumers\n3. **Marketplace**: Public data products\n\n**Key Features**:\n- No data movement/copying\n- Real-time access to shared data\n- Provider controls access\n- Consumer pays only for compute\n- Provider pays for storage\n- Revocation is immediate\n\n**Sharing Levels**:\n- Database level\n- Schema level\n- Table level\n- Secure View level\n\n**Benefits**:\n- Eliminates ETL for data sharing\n- No latency in data access\n- Secure and controlled\n- Cost-effective",
      category: 'features',
      difficulty: 'intermediate',
      tags: ['Data Sharing', 'Security', 'Collaboration'],
      isBookmarked: false,
      codeSnippet: "-- Data sharing examples\n-- Provider: Create share\nCREATE SHARE sales_share;\n\n-- Add objects to share\nGRANT USAGE ON DATABASE sales_db TO SHARE sales_share;\nGRANT USAGE ON SCHEMA sales_db.public TO SHARE sales_share;\nGRANT SELECT ON TABLE sales_db.public.transactions TO SHARE sales_share;\n\n-- Add consumer account\nGRANT USAGE ON SHARE sales_share \n  TO ACCOUNT = 'consumer_account';\n\n-- Consumer: Create database from share\nCREATE DATABASE shared_sales \n  FROM SHARE provider_account.sales_share;\n\n-- Query shared data\nSELECT * FROM shared_sales.public.transactions;",
      keyPoints: [
        "Live read-only sharing (no copies)",
        "Provider controls access",
        "Consumer pays compute, provider pays storage",
        "Revocation is immediate"
      ],
      relatedConcepts: ['RBAC', 'Data Governance', 'Data Marketplace'],
      interviewTips: [
        "Explain business use cases",
        "Compare with traditional ETL/APIs",
        "Discuss security implications"
      ]
    },
    {
      id: 9,
      title: "Tasks & Streams (Automation)",
      content: "Tasks and Streams enable automated data pipelines in Snowflake:\n\n**Streams**: Change Data Capture (CDC)\n- Track DML changes to tables (INSERT, UPDATE, DELETE)\n- Types: Standard (all changes), Append-only (INSERTs only)\n- Use offset pointers (no performance impact)\n- Consumed data advances offset\n\n**Tasks**: Scheduled SQL Execution\n- Run SQL on schedule (cron-like)\n- Can be chained into DAG workflows\n- Run in serverless task engine or specific warehouse\n- Error notification and retry logic\n\n**Common Patterns**:\n1. **ELT Pipeline**: Stream captures changes → Task processes → Target table\n2. **Data Transformation**: Scheduled transformations\n3. **Data Quality**: Regular validation checks\n4. **Reporting**: Scheduled report generation",
      category: 'features',
      difficulty: 'advanced',
      tags: ['Automation', 'ETL', 'CDC', 'Streams'],
      isBookmarked: false,
      codeSnippet: "-- Tasks and Streams example\n-- Create stream on source table\nCREATE STREAM customer_changes \n  ON TABLE customers;\n\n-- Create task to process changes\nCREATE OR REPLACE TASK process_customer_changes\n  WAREHOUSE = transform_wh\n  SCHEDULE = '5 MINUTE'\nAS\n  MERGE INTO customers_audit t\n  USING customer_changes s\n    ON t.customer_id = s.customer_id\n  WHEN MATCHED AND s.METADATA$ACTION = 'DELETE' THEN\n    DELETE\n  WHEN MATCHED THEN\n    UPDATE SET t.customer_data = s.customer_data, t.updated_at = CURRENT_TIMESTAMP()\n  WHEN NOT MATCHED AND s.METADATA$ACTION = 'INSERT' THEN\n    INSERT (customer_id, customer_data, created_at)\n    VALUES (s.customer_id, s.customer_data, CURRENT_TIMESTAMP());\n\n-- Resume task\nALTER TASK process_customer_changes RESUME;",
      keyPoints: [
        "Streams capture changes without performance impact",
        "Tasks run SQL on schedule (serverless option)",
        "METADATA$ACTION indicates change type",
        "Tasks can be chained for complex workflows"
      ],
      relatedConcepts: ['Snowpipe', 'Stored Procedures', 'Event-based Processing'],
      interviewTips: [
        "Explain CDC use cases",
        "Discuss task scheduling options",
        "Compare with traditional ETL tools"
      ]
    },
    {
      id: 10,
      title: "RBAC Security Model",
      content: "Snowflake uses Role-Based Access Control (RBAC) with hierarchical privileges:\n\n**System-defined Roles**:\n1. **ACCOUNTADMIN**: Full access (use sparingly)\n2. **SECURITYADMIN**: User/role management\n3. **SYSADMIN**: Object creation/management\n4. **PUBLIC**: Default role for all users\n\n**Best Practices**:\n- Follow principle of least privilege\n- Create custom roles for specific functions\n- Use role hierarchy (custom roles inherit from system roles)\n- SECURITYADMIN manages roles, SYSADMIN manages objects\n- Regular access reviews\n\n**Privilege Model**:\n- Securable objects: Databases, Schemas, Tables, Warehouses, etc.\n- Privileges: USAGE, SELECT, INSERT, UPDATE, DELETE, etc.\n- Grants flow: Privilege → Role → User\n- Future grants: Apply to future objects",
      category: 'security',
      difficulty: 'intermediate',
      tags: ['Security', 'RBAC', 'Access Control'],
      isBookmarked: false,
      codeSnippet: "-- RBAC examples\n-- Create custom roles\nCREATE ROLE data_analyst;\nCREATE ROLE data_engineer;\nCREATE ROLE report_viewer;\n\n-- Grant warehouse access\nGRANT USAGE ON WAREHOUSE analytics_wh TO ROLE data_analyst;\nGRANT USAGE ON WAREHOUSE etl_wh TO ROLE data_engineer;\n\n-- Grant database access\nGRANT USAGE ON DATABASE sales_db TO ROLE data_analyst;\nGRANT SELECT ON ALL TABLES IN SCHEMA sales_db.public TO ROLE report_viewer;\n\n-- Future grants (for new tables)\nGRANT SELECT ON FUTURE TABLES IN SCHEMA sales_db.public \n  TO ROLE report_viewer;\n\n-- Assign roles to users\nGRANT ROLE data_analyst TO USER john_doe;\nGRANT ROLE report_viewer TO USER jane_smith;",
      keyPoints: [
        "Principle of least privilege",
        "Role hierarchy simplifies management",
        "Future grants automate access for new objects",
        "System roles have specific purposes"
      ],
      relatedConcepts: ['Data Masking', 'Network Policies', 'SSO'],
      interviewTips: [
        "Explain role hierarchy importance",
        "Discuss security best practices",
        "Compare with other security models"
      ]
    },
    {
      id: 11,
      title: "Clustering & Performance Tuning",
      content: "Clustering organizes data in micro-partitions based on clustering keys:\n\n**Clustering Keys**:\n- 1 or more columns that define data organization\n- Physically co-locate similar data\n- Enable partition pruning (skipping irrelevant micro-partitions)\n\n**Automatic Clustering Service (ACS)**:\n- Runs in background to maintain optimal organization\n- Additional cost (consumes compute credits)\n- Monitors and reclusters as needed\n\n**When to Use Clustering**:\n✓ Large tables (>1TB)\n✓ Frequent range queries on specific columns\n✓ Predictable query patterns\n✓ Performance-critical tables\n\n**Monitoring**:\n- Use `SYSTEM$CLUSTERING_INFORMATION()`\n- Check `CLUSTERING_RATIO` (1 = perfect, 0 = poor)\n- Monitor ACS credits in account usage",
      category: 'performance',
      difficulty: 'advanced',
      tags: ['Clustering', 'Performance', 'Optimization'],
      isBookmarked: false,
      codeSnippet: "-- Clustering examples\n-- Create table with clustering\nCREATE TABLE large_sales_table (\n  sale_id NUMBER,\n  sale_date DATE,\n  customer_id NUMBER,\n  product_id NUMBER,\n  amount NUMBER(10,2)\n) CLUSTER BY (sale_date, customer_id);\n\n-- Add clustering to existing table\nALTER TABLE large_sales_table \n  CLUSTER BY (sale_date);\n\n-- Check clustering effectiveness\nSELECT SYSTEM$CLUSTERING_INFORMATION(\n  'large_sales_table', \n  '(sale_date, customer_id)'\n);\n\n-- Query benefiting from clustering\nSELECT * FROM large_sales_table\nWHERE sale_date BETWEEN '2024-01-01' AND '2024-01-31'\n  AND customer_id = 1001;",
      keyPoints: [
        "Clustering improves query performance through pruning",
        "ACS maintains clustering automatically (for a cost)",
        "Choose clustering keys based on query patterns",
        "Monitor clustering ratio regularly"
      ],
      relatedConcepts: ['Micro-partitions', 'Query Optimization', 'Warehouse Sizing'],
      interviewTips: [
        "Explain partition pruning concept",
        "Discuss when clustering is necessary",
        "Mention ACS costs and benefits"
      ]
    },
    {
      id: 12,
      title: "Snowpipe - Continuous Data Loading",
      content: "Snowpipe is serverless, continuous data ingestion service:\n\n**How it works**:\n1. Files land in cloud storage (S3, Blob, GCS)\n2. Event notification triggers Snowpipe\n3. Snowpipe loads data automatically\n4. Near real-time availability (minutes)\n\n**Loading Methods**:\n1. **Auto-ingest**: Cloud event notifications (SQS for AWS)\n2. **REST API**: Manual triggering via API calls\n\n**Benefits**:\n- Serverless (no warehouse needed)\n- Cost-effective (pay per load)\n- Near real-time\n- Automatic error handling\n- Scalable\n\n**Setup Steps**:\n1. Create external stage pointing to cloud storage\n2. Create pipe with COPY command\n3. Configure cloud notifications (for auto-ingest)\n4. Grant necessary permissions",
      category: 'features',
      difficulty: 'intermediate',
      tags: ['Snowpipe', 'Data Loading', 'ETL'],
      isBookmarked: false,
      codeSnippet: "-- Snowpipe setup\n-- Create external stage\nCREATE STAGE my_s3_stage\n  URL = 's3://my-bucket/data/'\n  CREDENTIALS = (AWS_KEY_ID = '...' AWS_SECRET_KEY = '...');\n\n-- Create pipe for auto-ingest\nCREATE PIPE customer_data_pipe\n  AUTO_INGEST = TRUE\nAS\n  COPY INTO customers\n  FROM @my_s3_stage\n  FILE_FORMAT = (TYPE = 'CSV' SKIP_HEADER = 1)\n  ON_ERROR = 'CONTINUE';\n\n-- Check pipe status\nSELECT * FROM TABLE(INFORMATION_SCHEMA.PIPE_USAGE_HISTORY(\n  DATE_RANGE_START => DATEADD('day', -7, CURRENT_DATE())\n));\n\n-- Manual refresh (if needed)\nALTER PIPE customer_data_pipe REFRESH;",
      keyPoints: [
        "Serverless - no warehouse management",
        "Near real-time data loading",
        "Auto-ingest uses cloud notifications",
        "Cost-effective for continuous loading"
      ],
      relatedConcepts: ['External Stages', 'COPY Command', 'Tasks'],
      interviewTips: [
        "Explain auto-ingest mechanism",
        "Discuss use cases vs batch loading",
        "Compare cost with warehouse-based loading"
      ]
    },
    {
      id: 13,
      title: "Pricing & Cost Optimization",
      content: "Snowflake uses pay-per-use credit-based pricing:\n\n**Cost Components**:\n1. **Compute Credits**: Virtual warehouse usage (per second, min 60s)\n2. **Storage Credits**: Monthly for data stored (compressed)\n3. **Cloud Services Credits**: Minimal for management operations\n4. **Additional**: Data transfer, serverless features, etc.\n\n**Cost Optimization Strategies**:\n1. **Warehouse Management**:\n   - Auto-suspend when idle\n   - Right-size warehouses\n   - Use multi-cluster only when needed\n2. **Storage Optimization**:\n   - Use clustering for large tables\n   - Archive historical data\n   - Monitor storage usage\n3. **Query Optimization**:\n   - Use result cache\n   - Optimize SQL queries\n   - Avoid SELECT *\n4. **Monitoring**:\n   - Set up resource monitors\n   - Use ACCOUNT_USAGE views\n   - Regular cost reviews",
      category: 'pricing',
      difficulty: 'beginner',
      tags: ['Pricing', 'Cost Optimization', 'Management'],
      isBookmarked: false,
      codeSnippet: "-- Cost monitoring queries\n-- Warehouse credit usage\nSELECT \n  warehouse_name,\n  SUM(credits_used) as total_credits,\n  AVG(credits_used) as avg_credits_per_hour\nFROM snowflake.account_usage.warehouse_metering_history\nWHERE start_time >= DATEADD('month', -1, CURRENT_DATE())\nGROUP BY warehouse_name\nORDER BY total_credits DESC;\n\n-- Storage usage\nSELECT \n  table_name,\n  active_bytes / POWER(1024, 3) as active_gb,\n  time_travel_bytes / POWER(1024, 3) as time_travel_gb\nFROM snowflake.account_usage.table_storage_metrics\nWHERE deleted IS NULL\nORDER BY active_bytes DESC\nLIMIT 20;\n\n-- Create resource monitor\nCREATE RESOURCE MONITOR dev_monitor\n  WITH CREDIT_QUOTA = 100\n  FREQUENCY = MONTHLY\n  START_TIMESTAMP = IMMEDIATE\n  TRIGGERS \n    ON 80 PERCENT DO NOTIFY\n    ON 100 PERCENT DO SUSPEND;",
      keyPoints: [
        "Compute is the most expensive component",
        "Auto-suspend warehouses to save costs",
        "Storage is relatively cheap",
        "Resource monitors prevent budget overruns"
      ],
      relatedConcepts: ['Resource Monitors', 'Account Usage', 'Warehouse Management'],
      interviewTips: [
        "Discuss common cost pitfalls",
        "Explain credit-based pricing",
        "Share real optimization strategies"
      ]
    },
    {
      id: 14,
      title: "Stages - Data Loading/Unloading",
      content: "Stages are locations for staging data files:\n\n**Stage Types**:\n1. **Internal Stages**: Snowflake-managed storage\n   - User stage: Personal to each user (`@~`)\n   - Table stage: Specific to table (`@%table_name`)\n   - Named stage: Can be shared (`@stage_name`)\n2. **External Stages**: Cloud storage references\n   - S3 (AWS), Blob Storage (Azure), GCS (Google)\n   - Requires cloud credentials\n\n**Common Commands**:\n- `PUT`: Upload file from local to stage\n- `GET`: Download file from stage to local\n- `COPY INTO`: Load from stage to table\n- `LIST`: List files in stage\n- `REMOVE`: Remove files from stage\n\n**File Formats**:\n- CSV, JSON, Parquet, Avro, ORC, XML\n- Can define named file formats for reuse",
      category: 'sql',
      difficulty: 'beginner',
      tags: ['Stages', 'Data Loading', 'File Formats'],
      isBookmarked: false,
      codeSnippet: "-- Stages examples\n-- Create internal named stage\nCREATE STAGE my_stage;\n\n-- Create external stage for S3\nCREATE OR REPLACE STAGE s3_stage\n  URL = 's3://my-bucket/data/'\n  CREDENTIALS = (AWS_KEY_ID = '...' AWS_SECRET_KEY = '...')\n  FILE_FORMAT = (TYPE = CSV SKIP_HEADER = 1);\n\n-- List files in stage\nLIST @s3_stage;\n\n-- Load data from stage\nCOPY INTO customers\n  FROM @s3_stage/customers.csv\n  FILE_FORMAT = (TYPE = CSV FIELD_OPTIONALLY_ENCLOSED_BY = '\"')\n  ON_ERROR = 'CONTINUE';\n\n-- Unload data to stage\nCOPY INTO @my_stage/customers_export/\n  FROM customers\n  FILE_FORMAT = (TYPE = CSV HEADER = TRUE);",
      keyPoints: [
        "Internal stages are Snowflake-managed",
        "External stages reference cloud storage",
        "PUT/GET for local file transfer",
        "COPY INTO loads data from stages"
      ],
      relatedConcepts: ['Snowpipe', 'File Formats', 'Data Unloading'],
      interviewTips: [
        "Explain different stage types",
        "Discuss file format options",
        "Compare internal vs external stages"
      ]
    },
    {
      id: 15,
      title: "Data Masking & Security",
      content: "Dynamic Data Masking protects sensitive data:\n\n**Masking Policies**:\n- Apply to columns containing sensitive data\n- Show different data based on user role\n- Don't modify underlying data\n- Real-time enforcement\n\n**Policy Components**:\n1. **Condition**: Based on current role/user\n2. **Masking Function**: What to show (full, partial, hashed, etc.)\n3. **Apply to Columns**: Which columns to protect\n\n**Common Use Cases**:\n- Email addresses (show only domain)\n- Phone numbers (show last 4 digits)\n- Credit cards (show last 4)\n- SSN (show XXX-XX-last4)\n- Salary data (show masked for non-HR)\n\n**Best Practices**:\n- Create reusable masking policies\n- Test with different user roles\n- Combine with RBAC for layered security",
      category: 'security',
      difficulty: 'advanced',
      tags: ['Security', 'Data Masking', 'Compliance'],
      isBookmarked: false,
      codeSnippet: "-- Data masking examples\n-- Create masking policy\nCREATE OR REPLACE MASKING POLICY email_mask AS (val string) \n  RETURNS string ->\n  CASE \n    WHEN CURRENT_ROLE() IN ('HR_ADMIN', 'ACCOUNTADMIN') THEN val\n    ELSE REGEXP_REPLACE(val, '(.)[^@]*(@.*)', '\\\\1***\\\\2')\n  END;\n\n-- Apply to column\nALTER TABLE employees \n  MODIFY COLUMN email \n  SET MASKING POLICY email_mask;\n\n-- Phone number masking\nCREATE MASKING POLICY phone_mask AS (val string) \n  RETURNS string ->\n  CASE \n    WHEN CURRENT_ROLE() = 'SUPPORT' THEN val\n    ELSE '***-***-' || RIGHT(val, 4)\n  END;\n\n-- Check applied policies\nSELECT * FROM TABLE(INFORMATION_SCHEMA.POLICY_REFERENCES(\n  POLICY_NAME => 'email_mask'\n));",
      keyPoints: [
        "Dynamic masking shows different data based on role",
        "Underlying data remains unchanged",
        "Policies can be reused across columns",
        "Combine with RBAC for comprehensive security"
      ],
      relatedConcepts: ['RBAC', 'Column-level Security', 'Compliance'],
      interviewTips: [
        "Explain use cases for different industries",
        "Discuss compliance requirements (GDPR, HIPAA)",
        "Compare with static data masking"
      ]
    }
  ]);

  // State for UI
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<number | null>(1);
  const [bookmarkedOnly, setBookmarkedOnly] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [activeView, setActiveView] = useState<'grid' | 'list'>('grid');
  const [showCodeSnippets, setShowCodeSnippets] = useState(true);
  const [showInterviewTips, setShowInterviewTips] = useState(true);

  // Filter notes based on search and filters
  const filteredNotes = notes.filter(note => {
    const matchesSearch = searchTerm === '' || 
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || note.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || note.difficulty === selectedDifficulty;
    const matchesBookmarked = !bookmarkedOnly || note.isBookmarked;
    
    return matchesSearch && matchesCategory && matchesDifficulty && matchesBookmarked;
  });

  // Toggle note expansion
  const toggleNote = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Toggle bookmark
  const toggleBookmark = (id: number) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, isBookmarked: !note.isBookmarked } : note
    ));
  };

  // Copy content to clipboard
  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Get category icon
  const getCategoryIcon = (category: NoteCategory) => {
    switch(category) {
      case 'architecture': return <Layers size={18} />;
      case 'sql': return <Database size={18} />;
      case 'features': return <Zap size={18} />;
      case 'security': return <Shield size={18} />;
      case 'performance': return <Cpu size={18} />;
      case 'pricing': return <CreditCard size={18} />;
      case 'best-practices': return <CheckCircle size={18} />;
      default: return <FileText size={18} />;
    }
  };

  // Get category color
  const getCategoryColor = (category: NoteCategory) => {
    switch(category) {
      case 'architecture': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'sql': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'features': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'security': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'performance': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      case 'pricing': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'best-practices': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  // Get difficulty color
  const getDifficultyColor = (difficulty: NoteDifficulty) => {
    switch(difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  // Get category name
  const getCategoryName = (category: NoteCategory) => {
    switch(category) {
      case 'architecture': return 'Architecture';
      case 'sql': return 'SQL & Queries';
      case 'features': return 'Features';
      case 'security': return 'Security';
      case 'performance': return 'Performance';
      case 'pricing': return 'Pricing';
      case 'best-practices': return 'Best Practices';
      default: return 'Other';
    }
  };

  // Statistics
  const stats = {
    total: notes.length,
    bookmarked: notes.filter(n => n.isBookmarked).length,
    beginner: notes.filter(n => n.difficulty === 'beginner').length,
    intermediate: notes.filter(n => n.difficulty === 'intermediate').length,
    advanced: notes.filter(n => n.difficulty === 'advanced').length,
  };

  // Download all notes as markdown
  const downloadAllNotes = () => {
    const markdown = notes.map(note => {
      return `# ${note.title}\n\nCategory: ${getCategoryName(note.category)}\nDifficulty: ${note.difficulty}\nTags: ${note.tags.join(', ')}\n\n${note.content}\n\n${note.codeSnippet ? '## Code Example\n```sql\n' + note.codeSnippet + '\n```\n' : ''}${note.keyPoints ? '## Key Points\n' + note.keyPoints.map(p => `- ${p}`).join('\n') + '\n' : ''}`;
    }).join('\n---\n\n');

    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'snowflake-notes.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-8 md:mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
                <BookOpen className="text-blue-600 dark:text-blue-400" size={40} />
                <span>Snowflake Study Notes</span>
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
                Comprehensive notes for beginners and interview preparation
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={downloadAllNotes}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Download size={18} />
                <span className="hidden md:inline">Download All</span>
              </button>
              <div className="text-sm bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow">
                <span className="font-semibold">{stats.bookmarked} bookmarked</span>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
              <div className="flex items-center gap-2">
                <FileText className="text-blue-500" size={20} />
                <span className="font-semibold">Total Notes</span>
              </div>
              <p className="text-2xl font-bold mt-2">{stats.total}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
              <div className="flex items-center gap-2">
                <span className="text-green-500">●</span>
                <span className="font-semibold">Beginner</span>
              </div>
              <p className="text-2xl font-bold mt-2">{stats.beginner}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
              <div className="flex items-center gap-2">
                <span className="text-yellow-500">●</span>
                <span className="font-semibold">Intermediate</span>
              </div>
              <p className="text-2xl font-bold mt-2">{stats.intermediate}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
              <div className="flex items-center gap-2">
                <span className="text-red-500">●</span>
                <span className="font-semibold">Advanced</span>
              </div>
              <p className="text-2xl font-bold mt-2">{stats.advanced}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
              <div className="flex items-center gap-2">
                <BookmarkCheck className="text-purple-500" size={20} />
                <span className="font-semibold">Bookmarked</span>
              </div>
              <p className="text-2xl font-bold mt-2">{stats.bookmarked}</p>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search notes by title, content, or tags..."
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-3">
                <select
                  className="px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  <option value="architecture">Architecture</option>
                  <option value="sql">SQL & Queries</option>
                  <option value="features">Features</option>
                  <option value="security">Security</option>
                  <option value="performance">Performance</option>
                  <option value="pricing">Pricing</option>
                  <option value="best-practices">Best Practices</option>
                </select>

                <select
                  className="px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                >
                  <option value="all">All Levels</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>

                <button
                  className={`px-4 py-3 rounded-lg flex items-center gap-2 ${bookmarkedOnly ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' : 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300'}`}
                  onClick={() => setBookmarkedOnly(!bookmarkedOnly)}
                >
                  <Bookmark size={18} />
                  <span className="hidden md:inline">Bookmarked Only</span>
                </button>
              </div>
            </div>

            {/* View Toggles */}
            <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-2">
                <button
                  className={`px-3 py-2 rounded ${activeView === 'grid' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' : 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300'}`}
                  onClick={() => setActiveView('grid')}
                >
                  Grid View
                </button>
                <button
                  className={`px-3 py-2 rounded ${activeView === 'list' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' : 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300'}`}
                  onClick={() => setActiveView('list')}
                >
                  List View
                </button>
              </div>
              <div className="flex gap-2 ml-auto">
                <button
                  className={`flex items-center gap-2 px-3 py-2 rounded ${showCodeSnippets ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300'}`}
                  onClick={() => setShowCodeSnippets(!showCodeSnippets)}
                >
                  <Code size={16} />
                  <span>Code Snippets</span>
                </button>
                <button
                  className={`flex items-center gap-2 px-3 py-2 rounded ${showInterviewTips ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300' : 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300'}`}
                  onClick={() => setShowInterviewTips(!showInterviewTips)}
                >
                  <AlertCircle size={16} />
                  <span>Interview Tips</span>
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Notes Content */}
        {filteredNotes.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow">
            <Search size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold mb-2">No notes found</h3>
            <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filters</p>
          </div>
        ) : activeView === 'grid' ? (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border-l-4 ${expandedId === note.id ? 'border-blue-500' : 'border-transparent'} transition-all duration-300`}
              >
                <div className="p-6">
                  {/* Note Header */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(note.category)} flex items-center gap-1`}>
                          {getCategoryIcon(note.category)}
                          <span>{getCategoryName(note.category)}</span>
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(note.difficulty)}`}>
                          {note.difficulty.toUpperCase()}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{note.title}</h3>
                    </div>
                    <button
                      onClick={() => toggleBookmark(note.id)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full ml-2"
                      aria-label={note.isBookmarked ? "Remove bookmark" : "Bookmark note"}
                    >
                      {note.isBookmarked ? (
                        <BookmarkCheck className="text-yellow-500" size={20} />
                      ) : (
                        <Bookmark size={20} />
                      )}
                    </button>
                  </div>

                  {/* Tags */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {note.tags.map((tag, idx) => (
                        <span key={idx} className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Note Content Preview */}
                  <div className="mb-4">
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-3">
                      {note.content.substring(0, 200)}...
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => toggleNote(note.id)}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1"
                    >
                      {expandedId === note.id ? 'Show Less' : 'Read More'}
                      {expandedId === note.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    <button
                      onClick={() => copyToClipboard(note.content, note.id)}
                      className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300"
                    >
                      {copiedId === note.id ? <Check size={14} /> : <Copy size={14} />}
                      {copiedId === note.id ? 'Copied!' : 'Copy'}
                    </button>
                  </div>

                  {/* Expanded Content */}
                  {expandedId === note.id && (
                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-4">
                      {/* Full Content */}
                      <div className="prose dark:prose-invert max-w-none">
                        <div className="whitespace-pre-line text-gray-700 dark:text-gray-300">
                          {note.content}
                        </div>
                      </div>

                      {/* Code Snippet */}
                      {showCodeSnippets && note.codeSnippet && (
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <Code size={16} className="text-green-500" />
                            Code Example
                          </h4>
                          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                            <pre className="text-green-400 text-sm font-mono">
                              {note.codeSnippet}
                            </pre>
                          </div>
                        </div>
                      )}

                      {/* Key Points */}
                      {note.keyPoints && (
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <CheckCircle size={16} className="text-blue-500" />
                            Key Points
                          </h4>
                          <ul className="space-y-1">
                            {note.keyPoints.map((point, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <ChevronRight size={14} className="text-blue-500 mt-1 flex-shrink-0" />
                                <span className="text-gray-700 dark:text-gray-300">{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Interview Tips */}
                      {showInterviewTips && note.interviewTips && (
                        <div>
                          <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <AlertCircle size={16} className="text-purple-500" />
                            Interview Tips
                          </h4>
                          <ul className="space-y-2">
                            {note.interviewTips.map((tip, idx) => (
                              <li key={idx} className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg">
                                <div className="flex items-start gap-2">
                                  <span className="font-bold text-purple-600 dark:text-purple-400">{idx + 1}.</span>
                                  <span className="text-gray-700 dark:text-gray-300">{tip}</span>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="space-y-6">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden ${expandedId === note.id ? 'ring-2 ring-blue-500' : ''}`}
              >
                {/* Note Header */}
                <div
                  className="p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                  onClick={() => toggleNote(note.id)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(note.category)} flex items-center gap-1`}>
                          {getCategoryIcon(note.category)}
                          <span>{getCategoryName(note.category)}</span>
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(note.difficulty)}`}>
                          {note.difficulty.toUpperCase()}
                        </span>
                        {note.tags.map((tag, idx) => (
                          <span key={idx} className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-xl font-semibold">{note.title}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(note.id);
                        }}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                      >
                        {note.isBookmarked ? (
                          <BookmarkCheck className="text-yellow-500" size={20} />
                        ) : (
                          <Bookmark size={20} />
                        )}
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleNote(note.id);
                        }}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                      >
                        {expandedId === note.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                {expandedId === note.id && (
                  <div className="px-6 pb-6 border-t border-gray-200 dark:border-gray-700 pt-6">
                    {/* Full Content */}
                    <div className="mb-6">
                      <div className="prose dark:prose-invert max-w-none">
                        <div className="whitespace-pre-line text-gray-700 dark:text-gray-300">
                          {note.content}
                        </div>
                      </div>
                    </div>

                    {/* Additional Sections */}
                    <div className="space-y-6">
                      {/* Code Snippet */}
                      {showCodeSnippets && note.codeSnippet && (
                        <div>
                          <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                            <Code size={18} className="text-green-500" />
                            Code Example
                          </h4>
                          <div className="bg-gray-900 rounded-lg p-4 overflow-x-auto">
                            <pre className="text-green-400 text-sm font-mono">
                              {note.codeSnippet}
                            </pre>
                          </div>
                          <div className="flex justify-end mt-2">
                            <button
                              onClick={() => copyToClipboard(note.codeSnippet!, note.id)}
                              className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300"
                            >
                              {copiedId === note.id ? <Check size={14} /> : <Copy size={14} />}
                              {copiedId === note.id ? 'Copied!' : 'Copy Code'}
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Key Points */}
                      {note.keyPoints && (
                        <div>
                          <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                            <CheckCircle size={18} className="text-blue-500" />
                            Key Points to Remember
                          </h4>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {note.keyPoints.map((point, idx) => (
                              <li key={idx} className="flex items-start gap-3 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                                <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center flex-shrink-0">
                                  <span className="text-blue-600 dark:text-blue-400 font-bold">{idx + 1}</span>
                                </div>
                                <span className="text-gray-700 dark:text-gray-300">{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Interview Tips */}
                      {showInterviewTips && note.interviewTips && (
                        <div>
                          <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                            <AlertCircle size={18} className="text-purple-500" />
                            Interview Preparation Tips
                          </h4>
                          <div className="space-y-3">
                            {note.interviewTips.map((tip, idx) => (
                              <div key={idx} className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-100 dark:border-purple-800">
                                <div className="flex items-start gap-3">
                                  <div className="w-6 h-6 bg-purple-100 dark:bg-purple-800 rounded-full flex items-center justify-center flex-shrink-0">
                                    <span className="text-purple-600 dark:text-purple-400 font-bold">!</span>
                                  </div>
                                  <span className="text-gray-700 dark:text-gray-300">{tip}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Related Concepts */}
                      {note.relatedConcepts && (
                        <div>
                          <h4 className="text-lg font-semibold mb-3">Related Concepts</h4>
                          <div className="flex flex-wrap gap-2">
                            {note.relatedConcepts.map((concept, idx) => (
                              <span key={idx} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                                {concept}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Note Footer */}
                    <div className="flex flex-wrap justify-between items-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Note #{note.id} • Last reviewed: {note.lastReviewed ? new Date(note.lastReviewed).toLocaleDateString() : 'Not reviewed yet'}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => copyToClipboard(`${note.title}\n\n${note.content}`, note.id)}
                          className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded text-sm hover:bg-blue-200 dark:hover:bg-blue-800"
                        >
                          <Copy size={14} />
                          Copy Note
                        </button>
                        <button
                          onClick={() => toggleBookmark(note.id)}
                          className="flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300 rounded text-sm hover:bg-yellow-200 dark:hover:bg-yellow-800"
                        >
                          {note.isBookmarked ? (
                            <>
                              <BookmarkCheck size={14} />
                              Bookmarked
                            </>
                          ) : (
                            <>
                              <Bookmark size={14} />
                              Bookmark
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="font-semibold mb-2">Snowflake Study Notes</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Comprehensive guide for interview preparation and skill development
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button 
                className="flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm"
                onClick={downloadAllNotes}
              >
                <Download size={14} />
                <span>Download All</span>
              </button>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {filteredNotes.length} of {notes.length} notes shown
              </div>
            </div>
          </div>
          <p className="mt-4 text-xs text-center text-gray-500 dark:text-gray-400">
            Created for interview preparation • Updated regularly • Focus on practical knowledge
          </p>
        </footer>
      </div>
    </div>
  );
}