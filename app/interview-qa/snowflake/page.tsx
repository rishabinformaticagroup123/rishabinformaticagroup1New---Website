'use client';

import { useState, useEffect } from 'react';
import { 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Database, 
  Snowflake as SnowflakeIcon,
  Layers,
  Shield,
  Zap,
  Clock,
  AlertCircle,
  Copy,
  Check,
  Bookmark,
  BookmarkCheck,
  Volume2,
  VolumeX,
  Star,
  Download,
  Share2,
  HelpCircle,
  Lightbulb,
  ExternalLink
} from 'lucide-react';

// Define question type
type Question = {
  id: number;
  question: string;
  answer: string;
  category: 'basic' | 'intermediate' | 'advanced';
  tags: string[];
  difficulty: 'easy' | 'medium' | 'hard';
  isBookmarked: boolean;
  explanation?: string;
  example?: string;
  keyPoints?: string[];
};

export default function SnowflakeInterviewPrepPage() {
  // State for questions
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      question: "What is Snowflake and how is it different from traditional databases?",
      answer: "Snowflake is a cloud-based data warehousing platform built on top of AWS, Azure, or Google Cloud. Unlike traditional databases, Snowflake uses a unique architecture that separates compute, storage, and cloud services. This allows independent scaling of each component. Key differences: 1) Fully managed service with no hardware/software to manage, 2) Pay-per-use pricing model, 3) Support for structured and semi-structured data, 4) Near-zero maintenance with automatic optimization.",
      category: "basic",
      tags: ["Architecture", "Basics"],
      difficulty: "easy",
      isBookmarked: false,
      explanation: "This separation of storage and compute is called multi-cluster shared data architecture. Storage layer holds data in optimized columnar format, compute layer (virtual warehouses) processes queries, and cloud services layer coordinates everything.",
      example: "In traditional systems, scaling often means upgrading hardware. In Snowflake, you can scale compute independently by resizing warehouses, and scale storage automatically without affecting performance.",
      keyPoints: ["Cloud-native SaaS", "Separates storage and compute", "Automatic scaling", "Support for JSON/XML data"]
    },
    {
      id: 2,
      question: "Explain Snowflake's architecture with its three key layers",
      answer: "Snowflake's architecture consists of three layers: 1) Database Storage Layer: Stores all data in optimized columnar format. Data is encrypted and compressed automatically. 2) Query Processing Layer (Virtual Warehouses): These are compute clusters that process queries. Each warehouse can be scaled independently. 3) Cloud Services Layer: The brain of Snowflake - handles authentication, infrastructure management, query optimization, metadata management, and transaction coordination.",
      category: "basic",
      tags: ["Architecture"],
      difficulty: "medium",
      isBookmarked: false,
      explanation: "This architecture enables features like Time Travel, Zero-copy cloning, and secure data sharing. The separation allows users to scale compute resources without moving data.",
      example: "When you run a query: Cloud Services validates it, optimizes execution plan, Virtual Warehouse processes it, and Storage layer provides the data.",
      keyPoints: ["Storage layer (data at rest)", "Compute layer (virtual warehouses)", "Services layer (management brain)"]
    },
    {
      id: 3,
      question: "What are Virtual Warehouses in Snowflake?",
      answer: "Virtual Warehouses are compute clusters in Snowflake that process queries and perform DML operations. They are independent MPP (Massively Parallel Processing) compute clusters that can be: 1) Started/stopped on demand, 2) Scaled up/down (size change), 3) Scaled out (multi-cluster). Each warehouse has credits/hour cost. Key features: Auto-suspend (stops when idle), Auto-resume (starts on new query), and separate warehouses for different workloads prevent resource contention.",
      category: "basic",
      tags: ["Compute", "Warehouses"],
      difficulty: "easy",
      isBookmarked: false,
      explanation: "Warehouses come in sizes from X-Small to 6X-Large, each doubling in compute power and cost. Multi-cluster warehouses automatically add clusters during high concurrency.",
      example: "You might have separate warehouses for ETL (large, running scheduled), BI queries (medium, multi-cluster for many users), and ad-hoc analysis (small, single cluster).",
      keyPoints: ["MPP compute clusters", "Independent scaling", "Auto-suspend/resume", "Credit-based billing"]
    },
    {
      id: 4,
      question: "Explain Time Travel and Fail-safe in Snowflake",
      answer: "Time Travel allows accessing historical data (changed/deleted) within a retention period (1 day by default, up to 90 days for Enterprise). Three ways: 1) AT/O BEFORE TIMESTAMP, 2) OFFSET (seconds ago), 3) STATEMENT (query ID). Fail-safe is a 7-day period after Time Travel where Snowflake can recover data (only Snowflake can access). Key differences: Time Travel is user-accessible, Fail-safe is for disaster recovery by Snowflake.",
      category: "intermediate",
      tags: ["Features", "Data Protection"],
      difficulty: "medium",
      isBookmarked: false,
      explanation: "Time Travel uses UNDROP to restore tables/schemas/databases. Data retention can be set at account, database, schema, or table level. Longer retention consumes more storage.",
      example: "SELECT * FROM my_table AT(TIMESTAMP => '2023-10-15 10:00:00'::timestamp); -- View table as it was at specific time",
      keyPoints: ["Access historical data", "Default 1-day retention", "UNDROP command", "Fail-safe for disaster recovery"]
    },
    {
      id: 5,
      question: "What is Zero-Copy Cloning in Snowflake?",
      answer: "Zero-Copy Cloning creates a copy of database objects (table, schema, database) without physically duplicating data. The clone shares the underlying storage with the source, using metadata pointers. Changes to clone or source become independent through copy-on-write. Benefits: 1) Instant creation regardless of size, 2) No additional storage cost initially, 3) Ideal for testing, development, and snapshotting.",
      category: "intermediate",
      tags: ["Features", "Data Management"],
      difficulty: "medium",
      isBookmarked: false,
      explanation: "When you modify cloned data, only changed data blocks are copied. This makes clones efficient for dev/test environments where you need production-like data.",
      example: "CREATE TABLE dev_schema.my_table CLONE prod_schema.my_table; -- Creates instant clone without data duplication",
      keyPoints: ["No data duplication", "Instant creation", "Copy-on-write", "Efficient dev/test"]
    },
    {
      id: 6,
      question: "How does Snowflake handle semi-structured data like JSON?",
      answer: "Snowflake natively supports semi-structured data (JSON, Avro, Parquet, XML) with the VARIANT data type. Key features: 1) Automatic schema detection and extraction, 2) Columnar storage of parsed data, 3) Dot notation or FLATTEN function to query nested data, 4) Preservation of original structure. The VARIANT column stores compressed, parsed data that can be queried without preprocessing.",
      category: "intermediate",
      tags: ["Data Types", "JSON"],
      difficulty: "medium",
      isBookmarked: false,
      explanation: "For optimal performance, extract frequently accessed fields into relational columns. Use FLATTEN for arrays, and : for object access in queries.",
      example: "SELECT user_data:name::STRING as username, user_data:address:city as city FROM table WHERE user_data:age > 25;",
      keyPoints: ["VARIANT data type", "Native JSON support", "FLATTEN function", "Automatic parsing"]
    },
    {
      id: 7,
      question: "Explain Snowflake's caching mechanism at different levels",
      answer: "Snowflake has three cache layers: 1) Result Cache: Stores query results for 24 hours (reused if same query repeats). 2) Warehouse Cache/Local Disk Cache: Data cached in warehouse's SSD after first read (persists while warehouse runs). 3) Metadata Cache: Statistics and metadata for optimization. Most impactful is Result Cache - queries with same SQL/text return instantly from cache without compute cost.",
      category: "advanced",
      tags: ["Performance", "Caching"],
      difficulty: "hard",
      isBookmarked: false,
      explanation: "Result Cache is shared across all users and warehouses. Warehouse cache is per-cluster. For cache to work, SQL must be identical including whitespace, and underlying data shouldn't change.",
      example: "First query: 10 seconds, Second identical query: 0.1 seconds (from Result Cache). Warehouse restart clears local disk cache but not result cache.",
      keyPoints: ["Result cache (24 hours)", "Warehouse cache (SSD)", "Metadata cache", "No compute cost for cached results"]
    },
    {
      id: 8,
      question: "What are Materialized Views in Snowflake and when to use them?",
      answer: "Materialized Views (MVs) are pre-computed query results stored as physical tables that automatically refresh when underlying data changes. Key characteristics: 1) Improve performance of expensive queries, 2) Support incremental refresh, 3) Have limitations (no joins, windows, UDFs in some cases). Use when: Frequent complex queries on large tables, predictable query patterns, and performance outweighs storage/maintenance cost.",
      category: "advanced",
      tags: ["Performance", "Views"],
      difficulty: "hard",
      isBookmarked: false,
      explanation: "Unlike standard views that run query each time, MVs store results. They automatically maintain themselves but have cost for storage and refresh compute.",
      example: "CREATE MATERIALIZED VIEW daily_sales_mv AS SELECT date, SUM(amount) FROM sales GROUP BY date; -- Querying this is faster than raw table",
      keyPoints: ["Pre-computed results", "Automatic refresh", "Performance optimization", "Storage/compute tradeoff"]
    },
    {
      id: 9,
      question: "How does data sharing work in Snowflake?",
      answer: "Snowflake Secure Data Sharing allows sharing live, read-only data between accounts without copying. Types: 1) Direct Share (provider to consumer), 2) Data Exchange (multiple providers/consumers), 3) Marketplace (public data). Benefits: No ETL/transfer needed, real-time access, no additional storage cost, and provider maintains control. Shared data appears as read-only database in consumer account.",
      category: "intermediate",
      tags: ["Features", "Data Sharing"],
      difficulty: "medium",
      isBookmarked: false,
      explanation: "Provider pays storage, consumer pays compute for queries on shared data. Revocation is immediate. Sharing can be at database, schema, or table level.",
      example: "Provider: GRANT USAGE ON SHARE my_share TO ACCOUNT = 'consumer_account'; Consumer: CREATE DATABASE shared_db FROM SHARE provider_account.my_share;",
      keyPoints: ["Live read-only sharing", "No data movement", "Provider control", "No ETL needed"]
    },
    {
      id: 10,
      question: "What are Tasks and Streams in Snowflake?",
      answer: "Tasks are scheduled SQL executions (like cron jobs). Streams are change data capture (CDC) objects that track DML changes to tables. Combined, they enable automated pipelines: Stream captures changes, Task processes them on schedule. Stream types: 1) Standard (table changes), 2) Append-only (inserts only). Tasks can be chained in DAG workflows and have error notification.",
      category: "intermediate",
      tags: ["Automation", "ETL"],
      difficulty: "medium",
      isBookmarked: false,
      explanation: "Streams use offset pointers to track changes without performance impact. When data is consumed from stream, offset advances. Tasks run in serverless task engine or specific warehouse.",
      example: "CREATE TASK my_task WAREHOUSE = my_wh SCHEDULE = '5 MINUTE' AS MERGE target t USING stream s ON t.id = s.id WHEN MATCHED THEN UPDATE...",
      keyPoints: ["Tasks = scheduled SQL", "Streams = change tracking", "Automated pipelines", "Serverless option"]
    },
    {
      id: 11,
      question: "Explain Snowflake's security features",
      answer: "Snowflake provides enterprise-grade security: 1) Encryption: All data encrypted at rest (AES-256) and in transit (TLS 1.2+). 2) Network Security: PrivateLink, IP whitelisting, network policies. 3) Access Control: RBAC with hierarchical privileges, SSO integration. 4) Data Protection: Column/row-level security, dynamic data masking. 5) Compliance: SOC2, HIPAA, GDPR, PCI DSS certified. 6) Authentication: MFA, OAuth, federated authentication.",
      category: "intermediate",
      tags: ["Security"],
      difficulty: "medium",
      isBookmarked: false,
      explanation: "Security is multi-layered. Network policies control IP access. RBAC uses securable objects (databases, warehouses) and privileges (USAGE, MODIFY). Data masking applies policies without changing underlying data.",
      example: "CREATE MASKING POLICY email_mask AS (val string) RETURNS string -> CASE WHEN CURRENT_ROLE() = 'ADMIN' THEN val ELSE '***' END;",
      keyPoints: ["End-to-end encryption", "RBAC access control", "Network policies", "Dynamic data masking"]
    },
    {
      id: 12,
      question: "What is the difference between DELETE, TRUNCATE, and DROP in Snowflake?",
      answer: "1) DELETE: DML operation removing specific rows (with WHERE clause), can be rolled back until committed, slower for large tables, consumes Time Travel. 2) TRUNCATE: DDL removing all rows instantly, cannot be rolled back, faster than DELETE, preserves table structure. 3) DROP: DDL removing entire table including structure, requires recreate to use again, can be recovered via UNDROP within Time Travel.",
      category: "basic",
      tags: ["SQL", "DDL/DML"],
      difficulty: "easy",
      isBookmarked: false,
      explanation: "DELETE is logged (can be expensive), TRUNCATE is minimally logged (faster), DROP removes metadata. All respect Time Travel retention for recovery.",
      example: "DELETE FROM orders WHERE status = 'cancelled'; -- Remove specific rows\nTRUNCATE TABLE staging_data; -- Remove all rows fast\nDROP TABLE temp_table; -- Remove entire table",
      keyPoints: ["DELETE = selective rows", "TRUNCATE = all rows fast", "DROP = entire table", "Time Travel applies to all"]
    },
    {
      id: 13,
      question: "How do you handle performance tuning in Snowflake?",
      answer: "Performance tuning approaches: 1) Warehouse sizing: Right-size for workload (larger = faster, more expensive). 2) Query optimization: Use clustering keys on large tables, avoid SELECT *, use WHERE efficiently. 3) Caching: Leverage result cache for repeated queries. 4) Design: Use materialized views for expensive aggregations, partition large tables. 5) Monitoring: Use QUERY_HISTORY, WAREHOUSE_METERING_HISTORY for analysis.",
      category: "advanced",
      tags: ["Performance", "Optimization"],
      difficulty: "hard",
      isBookmarked: false,
      explanation: "Most important: Right-size warehouses and use clustering. Clustering keys physically co-locate similar data. Automatic clustering service maintains optimal organization.",
      example: "CREATE TABLE large_table (id INT, date DATE, data STRING) CLUSTER BY (date); -- Improves date-range queries\nSELECT * FROM table WHERE date = '2023-01-01'; -- Faster with clustering",
      keyPoints: ["Right-size warehouses", "Use clustering keys", "Leverage caching", "Monitor query history"]
    },
    {
      id: 14,
      question: "What are stages in Snowflake and types of stages?",
      answer: "Stages are locations where data files are staged for loading/unloading. Types: 1) Internal Stages: Snowflake-managed storage (user, table, named). 2) External Stages: Cloud storage (S3, Blob, GCS). User stages are private to user, table stages specific to table, named stages can be shared. External stages reference cloud storage with credentials. Stages support bulk and continuous data loading.",
      category: "intermediate",
      tags: ["Data Loading", "Stages"],
      difficulty: "medium",
      isBookmarked: false,
      explanation: "COPY INTO command loads from stage to table. PUT/GET commands move files to/from local. Snowpipe enables continuous loading from external stages.",
      example: "CREATE STAGE my_ext_stage URL='s3://mybucket/' CREDENTIALS=(AWS_KEY_ID='...');\nCOPY INTO my_table FROM @my_ext_stage;",
      keyPoints: ["Internal (Snowflake)", "External (cloud storage)", "COPY INTO for loading", "Snowpipe for continuous"]
    },
    {
      id: 15,
      question: "Explain Snowflake's pricing model",
      answer: "Snowflake uses pay-per-use credit-based pricing: 1) Compute Credits: Virtual warehouse usage (per second, min 60s), varies by size/region. 2) Storage Credits: Monthly for data stored (compressed). 3) Cloud Services Credits: Minimal for management operations. Additional costs: Data transfer, materialized views refresh, serverless features. Pricing tiers: Standard, Enterprise, Business Critical (more features, higher cost).",
      category: "basic",
      tags: ["Pricing", "Basics"],
      difficulty: "easy",
      isBookmarked: false,
      explanation: "Auto-suspend warehouses to save costs. Storage is relatively cheap, compute is expensive. Use resource monitors to set credit limits. Serverless features have separate pricing.",
      example: "X-Small warehouse = 1 credit/hour = ~$2-4 depending on region and edition. 1TB storage = ~$23-40/month.",
      keyPoints: ["Compute (warehouse) credits", "Storage credits", "Pay-per-use", "Auto-suspend saves costs"]
    },
    {
      id: 16,
      question: "What is Snowpipe and how does it work?",
      answer: "Snowpipe is serverless, continuous data ingestion service that loads data from external stages (S3, etc.) automatically when new files arrive. Works via event notifications (SQS for AWS) or REST API calls. Benefits: 1) Near real-time loading (minutes), 2) Serverless (no warehouse needed), 3) Cost-effective (pay per load). Setup: Create pipe object with COPY statement, configure cloud notifications.",
      category: "intermediate",
      tags: ["Data Loading", "Snowpipe"],
      difficulty: "medium",
      isBookmarked: false,
      explanation: "Auto-ingest uses cloud event notifications. Alternative: REST API to trigger loads manually. Snowpipe uses compute resources managed by Snowflake (serverless).",
      example: "CREATE PIPE my_pipe AUTO_INGEST=TRUE AS COPY INTO my_table FROM @my_stage;\n-- S3 event notification sends to SQS, Snowpipe reads and loads",
      keyPoints: ["Continuous data loading", "Serverless", "Event-driven", "Near real-time"]
    },
    {
      id: 17,
      question: "How does clustering work in Snowflake?",
      answer: "Clustering organizes data in micro-partitions based on clustering keys (1 or more columns). Benefits: Pruning - skipping irrelevant micro-partitions during queries. Automatic Clustering Service (ACS) runs in background to maintain optimal organization (additional cost). Best for: Large tables (>1TB), frequent range/queries on specific columns. Not needed for: Small tables, uniformly accessed data.",
      category: "advanced",
      tags: ["Performance", "Clustering"],
      difficulty: "hard",
      isBookmarked: false,
      explanation: "Snowflake automatically creates micro-partitions (50-500MB compressed). Clustering keys define organization within these. Use SYSTEM$CLUSTERING_INFORMATION to analyze effectiveness.",
      example: "CREATE TABLE sales CLUSTER BY (sale_date, region); -- Improves queries filtering on date/region\nSELECT * FROM sales WHERE sale_date BETWEEN '2023-01-01' AND '2023-01-31'; -- Benefits from clustering",
      keyPoints: ["Micro-partition organization", "Automatic Clustering Service", "Query pruning", "For large tables"]
    },
    {
      id: 18,
      question: "What are the different Snowflake editions and their differences?",
      answer: "1) Standard Edition: Basic features, Time Travel 1 day, standard support. 2) Enterprise Edition: Adds Time Travel up to 90 days, materialized views, multi-cluster warehouses, database failover. 3) Business Critical Edition: Adds higher security (HIPAA, PCI), tri-secret encryption, cross-region failover. 4) Virtual Private Snowflake (VPS): Dedicated instances, maximum isolation. Higher editions cost more but offer more features and support.",
      category: "basic",
      tags: ["Editions", "Basics"],
      difficulty: "easy",
      isBookmarked: false,
      explanation: "Most organizations start with Enterprise for production. Business Critical for regulated industries. Editions can be upgraded easily without migration.",
      example: "Financial services need Business Critical for compliance. Dev environments might use Standard. Analytics teams need Enterprise for Time Travel and materialized views.",
      keyPoints: ["Standard (basic)", "Enterprise (most common)", "Business Critical (regulated)", "VPS (maximum isolation)"]
    },
    {
      id: 19,
      question: "Explain Snowflake's RBAC (Role-Based Access Control)",
      answer: "Snowflake RBAC secures objects through roles and privileges hierarchy: 1) System-defined roles: ACCOUNTADMIN (full access), SECURITYADMIN (users/roles), SYSADMIN (warehouses/databases), PUBLIC (default). 2) Custom roles can be created. 3) Privileges granted to roles, roles granted to users. Best practice: Use role hierarchy with custom roles inheriting from system roles. SECURITYADMIN manages roles, SYSADMIN manages objects.",
      category: "intermediate",
      tags: ["Security", "RBAC"],
      difficulty: "medium",
      isBookmarked: false,
      explanation: "Follow principle of least privilege. Create custom roles for specific functions (ANALYST, DEVELOPER, READER). ACCOUNTADMIN should be used sparingly.",
      example: "CREATE ROLE analyst;\nGRANT USAGE ON WAREHOUSE analytics_wh TO ROLE analyst;\nGRANT SELECT ON DATABASE prod TO ROLE analyst;\nGRANT ROLE analyst TO USER jane;",
      keyPoints: ["Role hierarchy", "System-defined roles", "Principle of least privilege", "Granular permissions"]
    },
    {
      id: 20,
      question: "How to monitor costs and performance in Snowflake?",
      answer: "Use: 1) ACCOUNT_USAGE schema (historical, 1 year retention): QUERY_HISTORY, WAREHOUSE_METERING_HISTORY, STORAGE_USAGE. 2) INFORMATION_SCHEMA (current account). 3) Resource Monitors: Set credit quotas with alerts. 4) Snowsight dashboards: Visual usage metrics. 5) Tagging: Track cost by department/project. Monitor: Query performance (duration, bytes scanned), warehouse utilization, storage growth, credit consumption.",
      category: "intermediate",
      tags: ["Monitoring", "Cost"],
      difficulty: "medium",
      isBookmarked: false,
      explanation: "ACCOUNT_USAGE has latency (up to 3 hours). Enable resource monitors on all warehouses. Use query profiling to identify expensive queries. Set up weekly usage reports.",
      example: "SELECT query_text, total_elapsed_time, bytes_scanned FROM snowflake.account_usage.query_history WHERE bytes_scanned > 1e9 ORDER BY total_elapsed_time DESC LIMIT 10; -- Find expensive queries",
      keyPoints: ["ACCOUNT_USAGE views", "Resource monitors", "Query history analysis", "Cost tagging"]
    }
  ]);

  // State for UI
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<number | null>(1);
  const [bookmarkedOnly, setBookmarkedOnly] = useState(false);
  const [showExplanation, setShowExplanation] = useState(true);
  const [showExample, setShowExample] = useState(true);
  const [speechActive, setSpeechActive] = useState(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'questions' | 'tips' | 'resources'>('questions');
  
  // Speech synthesis
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);
  
  // Filter questions based on search and filters
  const filteredQuestions = questions.filter(q => {
    const matchesSearch = searchTerm === '' || 
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || q.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;
    const matchesBookmarked = !bookmarkedOnly || q.isBookmarked;
    
    return matchesSearch && matchesCategory && matchesDifficulty && matchesBookmarked;
  });

  // Toggle question expansion
  const toggleQuestion = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Toggle bookmark
  const toggleBookmark = (id: number) => {
    setQuestions(questions.map(q => 
      q.id === id ? { ...q, isBookmarked: !q.isBookmarked } : q
    ));
  };

  // Copy answer to clipboard
  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Toggle text-to-speech
  const toggleSpeech = (text: string) => {
    if (speechActive) {
      window.speechSynthesis.cancel();
      setSpeechActive(false);
    } else {
      const synth = window.speechSynthesis;
      const newUtterance = new SpeechSynthesisUtterance(text);
      newUtterance.rate = 0.9;
      newUtterance.pitch = 1;
      newUtterance.volume = 1;
      
      newUtterance.onend = () => setSpeechActive(false);
      newUtterance.onerror = () => setSpeechActive(false);
      
      synth.speak(newUtterance);
      setSpeechActive(true);
      setUtterance(newUtterance);
    }
  };

  // Stop speech when component unmounts
  useEffect(() => {
    return () => {
      if (speechActive && utterance) {
        window.speechSynthesis.cancel();
      }
    };
  }, [speechActive, utterance]);

  // Get difficulty color
  const getDifficultyColor = (difficulty: string) => {
    switch(difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'hard': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'basic': return <HelpCircle size={16} />;
      case 'intermediate': return <Layers size={16} />;
      case 'advanced': return <Zap size={16} />;
      default: return <Database size={16} />;
    }
  };

  // Get category color
  const getCategoryColor = (category: string) => {
    switch(category) {
      case 'basic': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'intermediate': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
      case 'advanced': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  // Interview tips data
  const interviewTips = [
    "Understand Snowflake's unique architecture (separation of storage and compute)",
    "Be prepared to explain real-world use cases and scenarios",
    "Know the differences between Snowflake and traditional databases",
    "Practice writing SQL queries for Snowflake-specific features (Time Travel, cloning)",
    "Understand pricing model and cost optimization strategies",
    "Be familiar with security features (RBAC, data masking, encryption)",
    "Explain how you would handle performance tuning in Snowflake",
    "Know when to use features like Materialized Views, clustering, and caching",
    "Be ready to discuss data loading strategies (COPY, Snowpipe)",
    "Understand data sharing and how it differs from traditional ETL"
  ];

  // Resources data
  const resources = [
    { name: "Snowflake Documentation", url: "https://docs.snowflake.com/", type: "Official Docs" },
    { name: "Snowflake University", url: "https://www.snowflake.com/snowflake-university/", type: "Courses" },
    { name: "Snowflake Community", url: "https://community.snowflake.com/", type: "Community" },
    { name: "Snowflake YouTube Channel", url: "https://www.youtube.com/c/SnowflakeDB", type: "Video Tutorials" },
    { name: "Snowflake Hands-on Labs", url: "https://www.snowflake.com/en/resources/?type=lab", type: "Practice" },
    { name: "Snowflake Certification Guide", url: "https://www.snowflake.com/certifications/", type: "Certification" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8 md:mb-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-2">
                <SnowflakeIcon className="text-blue-500 dark:text-blue-400" size={36} />
                Snowflake Interview Preparation
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Top 20 Snowflake questions with detailed answers for beginners
              </p>
            </div>
            <div className="flex items-center gap-2 text-sm bg-white dark:bg-gray-800 px-4 py-2 rounded-full shadow">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>{filteredQuestions.length} questions</span>
              </div>
              <span className="mx-2">•</span>
              <div className="flex items-center gap-1">
                <BookmarkCheck size={14} />
                <span>{questions.filter(q => q.isBookmarked).length} bookmarked</span>
              </div>
            </div>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
              <div className="flex items-center gap-2">
                <Database className="text-blue-500" size={20} />
                <span className="font-semibold">Basic</span>
              </div>
              <p className="text-2xl font-bold mt-2">{questions.filter(q => q.category === 'basic').length}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
              <div className="flex items-center gap-2">
                <Layers className="text-purple-500" size={20} />
                <span className="font-semibold">Intermediate</span>
              </div>
              <p className="text-2xl font-bold mt-2">{questions.filter(q => q.category === 'intermediate').length}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
              <div className="flex items-center gap-2">
                <Zap className="text-orange-500" size={20} />
                <span className="font-semibold">Advanced</span>
              </div>
              <p className="text-2xl font-bold mt-2">{questions.filter(q => q.category === 'advanced').length}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
              <div className="flex items-center gap-2">
                <Clock className="text-green-500" size={20} />
                <span className="font-semibold">All Levels</span>
              </div>
              <p className="text-2xl font-bold mt-2">{questions.length}</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
            <button
              className={`px-4 py-2 font-medium ${activeTab === 'questions' ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}
              onClick={() => setActiveTab('questions')}
            >
              Questions & Answers
            </button>
            <button
              className={`px-4 py-2 font-medium ${activeTab === 'tips' ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}
              onClick={() => setActiveTab('tips')}
            >
              Interview Tips
            </button>
            <button
              className={`px-4 py-2 font-medium ${activeTab === 'resources' ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}
              onClick={() => setActiveTab('resources')}
            >
              Resources
            </button>
          </div>
        </header>

        {activeTab === 'questions' ? (
          <>
            {/* Search and Filter Bar */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 md:p-6 mb-8 sticky top-4 z-10">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Search questions, answers, or tags..."
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
                    <option value="basic">Basic</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>

                  <select
                    className="px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                  >
                    <option value="all">All Difficulties</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
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

              {/* Toggle options */}
              <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  className={`flex items-center gap-2 px-3 py-2 rounded ${showExplanation ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' : 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300'}`}
                  onClick={() => setShowExplanation(!showExplanation)}
                >
                  <AlertCircle size={16} />
                  <span>Explanation</span>
                </button>
                <button
                  className={`flex items-center gap-2 px-3 py-2 rounded ${showExample ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' : 'bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300'}`}
                  onClick={() => setShowExample(!showExample)}
                >
                  <span className="text-sm font-mono">{"</>"}</span>
                  <span>Examples</span>
                </button>
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-6">
              {filteredQuestions.length === 0 ? (
                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow">
                  <Search size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No questions found</h3>
                  <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filters</p>
                </div>
              ) : (
                filteredQuestions.map((q) => (
                  <div
                    key={q.id}
                    className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${expandedId === q.id ? 'ring-2 ring-blue-500' : ''}`}
                  >
                    {/* Question Header */}
                    <div
                      className="p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                      onClick={() => toggleQuestion(q.id)}
                    >
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(q.category)} flex items-center gap-1`}>
                              {getCategoryIcon(q.category)}
                              <span className="capitalize">{q.category}</span>
                            </span>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(q.difficulty)}`}>
                              {q.difficulty.toUpperCase()}
                            </span>
                            {q.tags.map(tag => (
                              <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                                {tag}
                              </span>
                            ))}
                          </div>
                          <h3 className="text-xl font-semibold pr-8">
                            {q.id}. {q.question}
                          </h3>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleBookmark(q.id);
                            }}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                            aria-label={q.isBookmarked ? "Remove bookmark" : "Bookmark question"}
                          >
                            {q.isBookmarked ? (
                              <BookmarkCheck className="text-yellow-500" size={20} />
                            ) : (
                              <Bookmark size={20} />
                            )}
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleQuestion(q.id);
                            }}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
                            aria-label={expandedId === q.id ? "Collapse answer" : "Expand answer"}
                          >
                            {expandedId === q.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Answer Content */}
                    {expandedId === q.id && (
                      <div className="px-6 pb-6 border-t border-gray-200 dark:border-gray-700 pt-6">
                        {/* Answer */}
                        <div className="mb-6">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-lg font-semibold flex items-center gap-2">
                              <SnowflakeIcon size={18} className="text-blue-500" />
                              Answer
                            </h4>
                            <div className="flex gap-2">
                              <button
                                onClick={() => copyToClipboard(q.answer, q.id)}
                                className="flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm hover:bg-gray-200 dark:hover:bg-gray-600"
                              >
                                {copiedId === q.id ? (
                                  <>
                                    <Check size={14} />
                                    Copied!
                                  </>
                                ) : (
                                  <>
                                    <Copy size={14} />
                                    Copy
                                  </>
                                )}
                              </button>
                              <button
                                onClick={() => toggleSpeech(q.answer)}
                                className={`flex items-center gap-1 px-3 py-1 rounded text-sm ${speechActive ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' : 'bg-gray-100 dark:bg-gray-700'}`}
                              >
                                {speechActive ? <VolumeX size={14} /> : <Volume2 size={14} />}
                                {speechActive ? 'Stop' : 'Listen'}
                              </button>
                            </div>
                          </div>
                          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                            <p className="text-gray-800 dark:text-gray-200 leading-relaxed">{q.answer}</p>
                          </div>
                        </div>

                        {/* Additional Information */}
                        <div className="space-y-6">
                          {/* Key Points */}
                          {q.keyPoints && (
                            <div>
                              <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                <Star size={18} className="text-yellow-500" />
                                Key Points to Remember
                              </h4>
                              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {q.keyPoints.map((point, idx) => (
                                  <li key={idx} className="flex items-start gap-2 bg-gray-50 dark:bg-gray-900 p-3 rounded">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                    <span>{point}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Explanation */}
                          {showExplanation && q.explanation && (
                            <div>
                              <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                <AlertCircle size={18} className="text-purple-500" />
                                Detailed Explanation
                              </h4>
                              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-100 dark:border-purple-800">
                                <p className="text-gray-800 dark:text-gray-200 leading-relaxed">{q.explanation}</p>
                              </div>
                            </div>
                          )}

                          {/* Example */}
                          {showExample && q.example && (
                            <div>
                              <h4 className="text-lg font-semibold mb-3 flex items-center gap-2">
                                <span className="text-green-500 font-mono text-lg">{"</>"}</span>
                                Example
                              </h4>
                              <div className="bg-gray-900 p-4 rounded-lg overflow-x-auto">
                                <pre className="text-green-400 text-sm font-mono whitespace-pre-wrap">
                                  {q.example}
                                </pre>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Question Footer */}
                        <div className="flex flex-wrap justify-between items-center mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Question #{q.id} • Snowflake Interview Prep
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => copyToClipboard(`${q.question}\n\n${q.answer}`, q.id)}
                              className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded text-sm hover:bg-blue-200 dark:hover:bg-blue-800"
                            >
                              <Copy size={14} />
                              Copy All
                            </button>
                            <button
                              onClick={() => toggleBookmark(q.id)}
                              className="flex items-center gap-1 px-3 py-1 bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300 rounded text-sm hover:bg-yellow-200 dark:hover:bg-yellow-800"
                            >
                              {q.isBookmarked ? (
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
                ))
              )}
            </div>
          </>
        ) : activeTab === 'tips' ? (
          /* Interview Tips Tab */
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Lightbulb className="text-yellow-500" />
              Snowflake Interview Tips
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {interviewTips.map((tip, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-900 p-5 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <span className="font-bold text-blue-600 dark:text-blue-400">{index + 1}</span>
                    </div>
                    <p className="text-gray-800 dark:text-gray-200">{tip}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 p-5 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800">
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                <Shield className="text-blue-500" />
                Pro Tips for Success
              </h3>
              <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span>Always relate answers to real-world scenarios and business value</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span>Be honest about what you don't know, but show willingness to learn</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span>Prepare questions to ask about their Snowflake implementation</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <span>Practice explaining technical concepts to non-technical stakeholders</span>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          /* Resources Tab */
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="text-blue-500">📚</span>
              Snowflake Learning Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.map((resource, index) => (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block group"
                >
                  <div className="bg-gray-50 dark:bg-gray-900 p-5 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all h-full">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 mb-2">
                          {resource.type}
                        </span>
                        <h3 className="font-bold text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400">
                          {resource.name}
                        </h3>
                      </div>
                      <ExternalLink size={18} className="text-gray-400 group-hover:text-blue-500" />
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Official Snowflake resource for {resource.type.toLowerCase()}
                    </p>
                  </div>
                </a>
              ))}
            </div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-6 rounded-xl">
                <h3 className="font-bold text-xl mb-3">Practice Makes Perfect</h3>
                <p className="mb-4">Set up a free Snowflake trial account and practice these concepts hands-on.</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <Check size={16} />
                    <span>30-day free trial with $400 credits</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} />
                    <span>Hands-on labs available</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} />
                    <span>Try all features mentioned here</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 rounded-xl">
                <h3 className="font-bold text-xl mb-3">Get Certified</h3>
                <p className="mb-4">Consider Snowflake certifications to validate your skills:</p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <SnowflakeIcon size={16} />
                    <span>SnowPro Core Certification</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <SnowflakeIcon size={16} />
                    <span>SnowPro Advanced certifications</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <SnowflakeIcon size={16} />
                    <span>Official preparation guides available</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700 text-center text-gray-600 dark:text-gray-400">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <SnowflakeIcon size={20} className="text-blue-500" />
              <span>Snowflake Interview Preparation Guide</span>
            </div>
            <div className="text-sm">
              <p>Designed for beginners • Updated regularly • Focus on practical knowledge</p>
            </div>
            <div className="flex items-center gap-4">
              <button 
                className="flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm"
                onClick={() => window.print()}
              >
                <Download size={14} />
                <span>Print</span>
              </button>
              <button 
                className="flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                }}
              >
                <Share2 size={14} />
                <span>Share</span>
              </button>
            </div>
          </div>
          <p className="mt-4 text-xs">This guide covers essential Snowflake concepts for interview success. Practice regularly and understand the "why" behind each concept.</p>
        </footer>
      </div>
    </div>
  );
}