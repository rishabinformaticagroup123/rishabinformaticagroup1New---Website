export type QA = {
  id: number;
  question: string;
  answer: JSX.Element;
};

export const interviewData: QA[] = [
  {
    id: 1,
    question: "What is the difference between Informatica PowerCenter and Informatica Cloud?",
    answer: (
      <div>
        <p>
          Informatica IICS (Intelligent Cloud Services) is a cloud-based integration platform (iPaaS) offering similar capabilities to PowerCenter but over the internet.
        </p>
        <ul className="list-disc pl-5 mt-2">
          <li>No need to install client applications in IICS – everything is accessible via browser UI.</li>
          <li>PowerCenter requires installation of client tools and repositories.</li>
          <li>Metadata in IICS is managed by Informatica (not user-accessible).</li>
        </ul>
      </div>
    ),
  },
  {
    id: 2,
    question: "What do you know about IICS?",
    answer: (
      <div>
        <p>
          Informatica IICS is an ETL and integration platform with a web-based interface, allowing developers to build and monitor tasks.
        </p>
        <ul className="list-disc pl-5 mt-2">
          <li>Enables ETL operations between cloud and on-premise solutions.</li>
          <li>Provides browser-based development and administration.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 3,
    question: "What is Runtime Environment in IICS?",
    answer: (
      <div>
        <p>IICS offers two runtime environments:</p>
        <ul className="list-disc pl-5 mt-2">
          <li><strong>Default Runtime:</strong> Provided by Informatica Cloud.</li>
          <li><strong>Secure Agent Runtime:</strong> Installed locally or on cloud VMs to run data tasks securely.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 4,
    question: "Where is metadata stored in IICS?",
    answer: (
      <div>
        <p>
          In PowerCenter, metadata is stored in a local repository database that users can access directly. In IICS, metadata is managed by Informatica and stored in their cloud repository.
        </p>
        <p className="mt-2">
          Users do not have direct access to the metadata repository in IICS.
        </p>
      </div>
    ),
  },
  {
    id: 5,
    question: "What are the connections available in IICS?",
    answer: (
      <div>
        <p>IICS supports various cloud and on-premise connectors:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>Relational connectors like Oracle, SQL Server, ODBC, Teradata</li>
          <li>Cloud connectors for apps like Salesforce, Snowflake, AWS</li>
          <li>Some connectors are free; others may require a license.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 6,
    question: "What is Mapping, Mapping Task, and Task Flow in IICS?",
    answer: (
      <div>
        <p>
          <strong>Mapping:</strong> Defines how data flows from source to target using transformations.
        </p>
        <p className="mt-2">
          <strong>Mapping Task:</strong> Executes a mapping with runtime configuration and parameters.
        </p>
        <p className="mt-2">
          <strong>Task Flow:</strong> A workflow-like object to run multiple tasks in sequence, similar to workflows in PowerCenter.
        </p>
      </div>
    ),
  },
  {
    id: 7,
    question: "What are some different methods to import data into Salesforce using Informatica Cloud?",
    answer: (
      <div>
        <ul className="list-disc pl-5">
          <li>Using the Salesforce Connector in IICS</li>
          <li>Using Salesforce Data Loader tool</li>
          <li>Using Salesforce Bulk API</li>
        </ul>
      </div>
    ),
  },
  {
    id: 8,
    question: "What are common challenges in data migration projects with IICS?",
    answer: (
      <div>
        <ul className="list-disc pl-5">
          <li>Data quality issues when integrating multiple sources</li>
          <li>Complex transformations to match target schemas</li>
          <li>Handling data dependencies and load order</li>
        </ul>
      </div>
    ),
  },
  {
    id: 9,
    question: "What file types can be used as input sources in IICS?",
    answer: (
      <div>
        <ul className="list-disc pl-5">
          <li>Delimited text files (CSV, TSV)</li>
          <li>XML files</li>
          <li>JSON files</li>
        </ul>
      </div>
    ),
  },
  {
    id: 10,
    question: "What are the advantages of Informatica over other cloud ETL tools like Talend or AWS?",
    answer: (
      <div>
        <ul className="list-disc pl-5">
          <li>Proven and robust ETL platform with decades of experience</li>
          <li>Highly configurable and flexible deployments</li>
          <li>Extensive support and training resources</li>
        </ul>
      </div>
    ),
  },
  {
    id: 11,
    question: "What is the purpose of Informatica and ETL?",
    answer: (
      <div>
        <p>
          The main purpose is to enable data integration — moving data from legacy systems to modern, cloud-based architectures while ensuring accuracy and consistency.
        </p>
      </div>
    ),
  },
  {
    id: 12,
    question: "List different use cases in Informatica Cloud.",
    answer: (
      <div>
        <ul className="list-disc pl-5">
          <li>Data synchronization</li>
          <li>Data replication</li>
          <li>Mapping and transformation</li>
          <li>Monitoring and logging</li>
          <li>System maintenance tasks</li>
        </ul>
      </div>
    ),
  },
  {
    id: 13,
    question: "What's the difference between data integration and data migration?",
    answer: (
      <div>
        <ul className="list-disc pl-5">
          <li><strong>Data Integration:</strong> Combining data from multiple sources for unified reporting/analytics.</li>
          <li><strong>Data Migration:</strong> Moving data from one system to another (e.g., legacy to cloud).</li>
        </ul>
      </div>
    ),
  },
  {
    id: 14,
    question: "What is PowerCenter?",
    answer: (
      <div>
        <p>
          PowerCenter is an on-premise data integration platform by Informatica that supports complex ETL jobs using a graphical interface. It includes workflows, sessions, transformations, and repository access.
        </p>
      </div>
    ),
  },
  {
    id: 15,
    question: "How does IaaS differ from SaaS and PaaS?",
    answer: (
      <div>
        <ul className="list-disc pl-5">
          <li><strong>IaaS:</strong> Infrastructure as a Service – provides virtual machines, networking, and storage.</li>
          <li><strong>PaaS:</strong> Platform as a Service – provides OS, DBMS, and dev tools to build apps.</li>
          <li><strong>SaaS:</strong> Software as a Service – provides fully managed apps (e.g., Gmail, Salesforce).</li>
        </ul>
      </div>
    ),
  },
  {
    id: 16,
    question: "Explain the runtime environment in Informatica Cloud (IICS)?",
    answer: (
      <div>
        <p>
          A runtime environment is the execution platform where data integration tasks run. IICS provides two options:
        </p>
        <ul className="list-disc pl-5 mt-2">
          <li><strong>Informatica-hosted Agent</strong> – managed by Informatica in the cloud.</li>
          <li><strong>Secure Agent</strong> – installed on-premises or cloud to handle local tasks securely.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 17,
    question: "Where does metadata get stored in Informatica Cloud (IICS)?",
    answer: (
      <div>
        <p>
          Metadata in IICS is stored in Informatica's cloud-managed repository. Unlike PowerCenter, users do not have direct access to query metadata using SQL.
        </p>
        <p className="mt-2">
          Metadata can be exported as JSON or accessed via IICS REST APIs.
        </p>
      </div>
    ),
  },
  {
    id: 18,
    question: "How does IICS perform tasks if metadata is stored in the cloud?",
    answer: (
      <div>
        <p>
          When a task is triggered in IICS:
        </p>
        <ol className="list-decimal pl-5 mt-2">
          <li>The metadata is downloaded to the Secure Agent.</li>
          <li>The Secure Agent processes the task locally.</li>
          <li>Post-execution, the metadata is retained in the agent's runtime environment.</li>
        </ol>
      </div>
    ),
  },
  {
    id: 19,
    question: "What is an Application Service?",
    answer: (
      <div>
        <p>
          An Application Service in IICS provides a self-service interface to connect and manage data sources. It supports BI, data warehouse, and analytics use cases.
        </p>
      </div>
    ),
  },
  {
    id: 20,
    question: "Why would you use an Application Service in IICS?",
    answer: (
      <div>
        <ul className="list-disc pl-5">
          <li>To connect to various data sources (cloud or on-premise)</li>
          <li>To simplify integration setup and task scheduling</li>
          <li>To support hybrid environments</li>
        </ul>
      </div>
    ),
  },
  {
    id: 21,
    question: "What kind of source systems can you connect to using an Application Service?",
    answer: (
      <div>
        <ul className="list-disc pl-5">
          <li>Relational databases (Oracle, SQL Server, etc.)</li>
          <li>Flat files (CSV, TXT)</li>
          <li>Web services and APIs</li>
        </ul>
      </div>
    ),
  },
  {
    id: 22,
    question: "What are the differences between Informatica Cloud Real Time and Informatica Cloud?",
    answer: (
      <div>
        <p>
          <strong>Informatica Cloud Real Time:</strong> Supports real-time data sync across cloud and on-prem apps.
        </p>
        <p className="mt-2">
          <strong>Informatica Cloud:</strong> Supports scheduled (batch) data integration.
        </p>
      </div>
    ),
  },
  {
    id: 23,
    question: "How can we integrate Salesforce data with on-premise applications using IICS?",
    answer: (
      <div>
        <ul className="list-disc pl-5">
          <li>Use the Salesforce connector in IICS to extract Salesforce data</li>
          <li>Transform and map the data to on-premise application format</li>
          <li>Load the transformed data to the on-premise system</li>
        </ul>
      </div>
    ),
  },
  {
    id: 24,
    question: "What is the Life Cycle Management Tool in IICS?",
    answer: (
      <div>
        <p>
          The Life Cycle Management Tool is used for environment promotion and version control in IICS. It helps manage connections, permissions, and deployment workflows.
        </p>
      </div>
    ),
  },
  {
    id: 25,
    question: "What are the different Connection Managers available in IICS?",
    answer: (
      <div>
        <ul className="list-disc pl-5">
          <li>FTP Connection Manager</li>
          <li>HTTP Connection Manager</li>
          <li>JMS and MQ Connection Managers</li>
          <li>ODBC, Oracle, SQL Server Connection Managers</li>
        </ul>
      </div>
    ),
  },
  {
    id: 26,
    question: "What metadata information is stored in the IICS repository?",
    answer: (
      <div>
        <ul className="list-disc pl-5">
          <li>Source and target metadata</li>
          <li>Connection details (encrypted)</li>
          <li>Mappings and mapping tasks</li>
          <li>Schedules and job logs</li>
        </ul>
      </div>
    ),
  },
  {
    id: 27,
    question: "What is a Replication Task?",
    answer: (
      <div>
        <p>
          A Replication Task in IICS copies data from a source database to a target (e.g., for reporting or backup).
        </p>
        <ul className="list-disc pl-5 mt-2">
          <li>Supports full and incremental replication</li>
          <li>Replicates schema and tables</li>
        </ul>
      </div>
    ),
  },
  {
    id: 28,
    question: "Differentiate PowerCenter and Informatica Cloud.",
    answer: (
      <div>
        <ul className="list-disc pl-5">
          <li>PowerCenter is an on-premise tool; IICS is web-based.</li>
          <li>IICS supports hybrid cloud integration, metadata APIs, REST support.</li>
          <li>IICS offers features like dynamic linking, JSON/REST support, and browser-based UI.</li>
        </ul>
      </div>
    ),
  },
  {
    id: 29,
    question: "Explain Cloud Designer in IICS.",
    answer: (
      <div>
        <p>
          Cloud Designer is the IICS equivalent of PowerCenter Designer. It allows users to create mappings and transformations using a graphical interface.
        </p>
        <ul className="list-disc pl-5 mt-2">
          <li>Drag-and-drop interface</li>
          <li>Mapping canvas and transformation palette</li>
          <li>Supports filter, expression, lookup, joiner, and other transformations</li>
        </ul>
      </div>
    ),
  },
  {
    id: 30,
    question: "Explain Synchronization Task in IICS.",
    answer: (
      <div>
        <p>
          A Synchronization Task helps sync data between source and target systems without complex transformations.
        </p>
        <ul className="list-disc pl-5 mt-2">
          <li>Used for basic data movement with filters and expressions</li>
          <li>Step-by-step UI guidance for task creation</li>
          <li>Does not require mapping knowledge</li>
        </ul>
      </div>
    ),
  },
