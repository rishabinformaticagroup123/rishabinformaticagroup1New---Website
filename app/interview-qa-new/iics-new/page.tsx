"use client"; // Add this at the very top of the file

import React, { useState } from "react";  // Added useState import

export type QA = { 
  id: number;
  question: string;
  answer: JSX.Element;
  category?: string;
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
          <li>Metadata in IICS is managed by Informatica and is not user-accessible.</li> {/* Improved clarity */}
        </ul>
      </div>
    ),
	category: "Transformations"
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
	category: "Transformations"
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
	category: "Transformations"
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
	category: "Transformations"
  },
  {
    id: 5,
    question: "What are the connections available in IICS?",
    answer: (
      <div>
        <p>IICS supports various cloud and on-premise connectors:</p> {/* Added introductory sentence for clarity */}
        <ul className="list-disc pl-5 mt-2">
          <li>Relational connectors like Oracle, SQL Server, ODBC, Teradata.</li> {/* Added period for consistency */}
          <li>Cloud connectors for apps like Salesforce, Snowflake, AWS.</li>
          <li>Some connectors are free; others may require a license.</li>
        </ul>
      </div>
    ),
	category: "Transformations"
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
	category: "Transformations"
  },
  {
    id: 7,
    question: "What are some different methods to import data into Salesforce using Informatica Cloud?",
    answer: (
      <div>
        <ul className="list-disc pl-5">
          <li>Using the Salesforce Connector in IICS.</li> {/* Added period for consistency */}
          <li>Using the Salesforce Data Loader tool.</li> {/* Added article “the” */}
          <li>Using Salesforce Bulk API.</li>
        </ul>
      </div>
    ),
	category: "Transformations"
  },
  {
    id: 8,
    question: "What are common challenges in data migration projects with IICS?",
    answer: (
      <div>
        <ul className="list-disc pl-5">
          <li>Data quality issues when integrating multiple sources.</li>
          <li>Complex transformations to match target schemas.</li>
          <li>Handling data dependencies and load order.</li>
        </ul>
      </div>
    ),
	category: "Transformations"
  },
  {
    id: 9,
    question: "What file types can be used as input sources in IICS?",
    answer: (
      <div>
        <ul className="list-disc pl-5">
          <li>Delimited text files (CSV, TSV).</li>
          <li>XML files.</li>
          <li>JSON files.</li>
        </ul>
      </div>
    ),
	category: "Transformations"
  },
  {
    id: 10,
    question: "What are the advantages of Informatica over other cloud ETL tools like Talend or AWS?",
    answer: (
      <div>
        <ul className="list-disc pl-5">
          <li>Proven and robust ETL platform with decades of experience.</li>
          <li>Highly configurable and flexible deployments.</li>
          <li>Extensive support and training resources.</li>
        </ul>
      </div>
    ),
	category: "Transformations"
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
	category: "Transformations"
  },
  {
    id: 12,
    question: "List different use cases in Informatica Cloud.",
    answer: (
      <div>
        <ul className="list-disc pl-5">
          <li>Data synchronization.</li>
          <li>Data replication.</li>
          <li>Mapping and transformation.</li>
          <li>Monitoring and logging.</li>
          <li>System maintenance tasks.</li>
        </ul>
      </div>
    ),
	category: "Transformations"
  },
  {
    id: 13,
    question: "What's the difference between data integration and data migration?",
    answer: (
      <div>
        <ul className="list-disc pl-5">
          <li><strong>Data Integration:</strong> Combining data from multiple sources for unified reporting and analytics.</li> {/* Added “and” for smoothness */}
          <li><strong>Data Migration:</strong> Moving data from one system to another (e.g., legacy to cloud).</li>
        </ul>
      </div>
    ),
	category: "Transformations"
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
	category: "Transformations"
  },
  {
    id: 15,
    question: "How does IaaS differ from SaaS and PaaS?",
    answer: (
      <div>
        <ul className="list-disc pl-5">
          <li><strong>IaaS:</strong> Infrastructure as a Service – provides virtual machines, networking, and storage.</li>
          <li><strong>PaaS:</strong> Platform as a Service – provides OS, DBMS, and development tools to build applications.</li> {/* Expanded “dev tools” */}
          <li><strong>SaaS:</strong> Software as a Service – provides fully managed applications (e.g., Gmail, Salesforce).</li> {/* Expanded “apps” */}
        </ul>
      </div>
    ),
	category: "Transformations"
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
          <li><strong>Informatica-hosted Agent:</strong> Managed by Informatica in the cloud.</li> {/* Added colon for consistency */}
          <li><strong>Secure Agent:</strong> Installed on-premises or cloud to handle local tasks securely.</li>
        </ul>
      </div>
    ),
	category: "Transformations"
  },
  {
    id: 17,
    question: "Where does metadata get stored in Informatica Cloud (IICS)?",
    answer: (
      <div>
        <p>
          Metadata in IICS is stored in Informatica's cloud repository. It is managed by Informatica and not accessible to users for direct manipulation.
        </p>
      </div>
    ),
	category: "Transformations"
  },
  {
    id: 18,
    question: "What are the different connections in Informatica Cloud (IICS)?",
    answer: (
      <div>
        <p>
          IICS supports many connection types:
        </p>
        <ul className="list-disc pl-5 mt-2">
          <li>Relational databases (Oracle, SQL Server, Teradata).</li>
          <li>Cloud applications (Salesforce, Workday, NetSuite).</li>
          <li>File systems (FTP, SFTP, local directories).</li>
          <li>Big data platforms (Hadoop, Spark).</li>
        </ul>
      </div>
    ),
	category: "Transformations"
  },
  {
    id: 19,
    question: "What are the objects available in IICS?",
    answer: (
      <div>
        <ul className="list-disc pl-5">
          <li>Mappings</li>
          <li>Mapping Tasks</li>
          <li>Task Flows</li>
          <li>Connections</li>
          <li>Schedules</li>
        </ul>
      </div>
    ),
	category: "Transformations"
  },
  {
    id: 20,
    question: "What is the difference between Mapping and Mapping Task in IICS?",
    answer: (
      <div>
        <ul className="list-disc pl-5">
          <li><strong>Mapping:</strong> Design time object defining data flow and transformations.</li>
          <li><strong>Mapping Task:</strong> Runtime object that executes a mapping with specific parameters.</li>
        </ul>
      </div>
    ),
	category: "Transformations"
  },
  {
    id: 21,
    question: "What are Taskflows?",
    answer: (
      <div>
        <p>
          Taskflows are workflow-like objects in IICS to chain multiple tasks (Mapping Tasks, Email Tasks, Command Tasks) for complex orchestrations.
        </p>
      </div>
    ),
	category: "Transformations"
  },
  {
    id: 22,
    question: "What are different Taskflow types in IICS?",
    answer: (
      <div>
        <ul className="list-disc pl-5">
          <li>Basic Taskflow</li>
          <li>Conditional Taskflow</li>
          <li>Event-Based Taskflow</li>
        </ul>
      </div>
    ),
	category: "Transformations"
  },
  {
    id: 23,
    question: "Explain the main steps to create a Secure Agent in IICS.",
    answer: (
      <div>
        <ul className="list-disc pl-5">
          <li>Download the Secure Agent installer from the IICS Admin console.</li>
          <li>Install the agent on the target machine (on-prem or cloud VM).</li>
          <li>Register the agent with the Informatica cloud using the activation key.</li>
          <li>Configure network/firewall to allow communication with Informatica Cloud.</li>
        </ul>
      </div>
    ),
	category: "Transformations"
  },
  {
    id: 24,
    question: "What is the purpose of a Secure Agent in IICS?",
    answer: (
      <div>
        <p>
          Secure Agent executes data integration tasks securely within a customer's network or cloud environment and communicates with Informatica Cloud services.
        </p>
      </div>
    ),
	category: "Transformations"
  },
  {
    id: 25,
    question: "How to monitor jobs in IICS?",
    answer: (
      <div>
        <p>
          Use the IICS Monitor tab to view task run history, status, logs, and performance details.
        </p>
      </div>
    ),
	category: "Transformations"
  },
  {
    id: 26,
    question: "What are the different types of transformations in IICS?",
    answer: (
      <div>
        <ul className="list-disc pl-5">
          <li>Expression Transformation</li>
          <li>Aggregator Transformation</li>
          <li>Joiner Transformation</li>
          <li>Filter Transformation</li>
          <li>Lookup Transformation</li>
          <li>Router Transformation</li>
          <li>Normalizer Transformation</li>
          {/* Add more if needed */}
        </ul>
      </div>
    ),
	category: "Transformations"
  },
  {
    id: 27,
    question: "What are the best practices for designing a mapping in IICS?",
    answer: (
      <div>
        <ul className="list-disc pl-5">
          <li>Keep transformations simple and reusable.</li>
          <li>Use parameterization for flexibility.</li>
          <li>Validate data and handle exceptions gracefully.</li>
          <li>Optimize lookups and filters for performance.</li>
          <li>Document the mapping logic clearly.</li>
        </ul>
      </div>
    ),
	category: "Transformations"
  },
  {
    id: 28,
    question: "What is Dynamic Lookup in IICS?",
    answer: (
      <div>
        <p>
          Dynamic Lookup caches lookup data and updates the cache during session execution, allowing you to insert or update rows in the target table based on the lookup results.
        </p>
        <ul className="list-disc pl-5 mt-2">
          <li>It improves performance by reducing repeated database queries.</li>
          <li>Useful in scenarios involving Slowly Changing Dimensions (SCD) or incremental loads.</li>
          <li>Supports insert, update, and reject logic within the same session.</li>
        </ul>
      </div>
    ),
	category: "Transformations"
  }, 
  {
    id: 29,
    question: "Explain Cloud Designer?",
    answer: (
      <div>
        <p>
          We can consider the Cloud Designer as the equivalent version of the PowerCenter Designer. Through Cloud Designer, we can effortlessly configure the mappings that are ideally the same as how we configure the PowerCenter mappings. Cloud Designers enable data transformation using various transformations like Filter Transformation, Expression Transformation, etc.
        </p>
      </div>
    ),
    category: "Cloud Designer"
  },
  {
    id: 30,
    question: "Explain Synchronization Task?",
    answer: (
      <div>
        <p>
          The Synchronization Task allows us to synchronize data between the source and the target. We can build a synchronization task from the IICS UI by choosing the original and the target without using any transformations like in mappings. We can also utilize expressions for transforming the data or use data filters for filtering. These tasks can be built with a simple UI guide.
        </p>
      </div>
    ),
    category: "Tasks"
  },
  {
    id: 31,
    question: "Differentiate Synchronization and Replication Task?",
    answer: (
      <div>
        <p>
          Synchronization Task is focused on data integration, whereas a Replication Task replicates the complete schema including all tables, which is not possible in Synchronization Tasks. Replication Task includes built-in incremental processing, while in Synchronization Task, we must manage incremental processing ourselves.
        </p>
      </div>
    ),
    category: "Tasks"
  },
  {
    id: 32,
    question: "Explain Mapping Configuration Task?",
    answer: (
      <div>
        <p>
          Mapping Configuration Task (or Mapping Task) is similar to a session in Informatica PowerCenter. It allows us to define parameters related to the mapping, insert modern session properties, enhance performance, and schedule tasks.
        </p>
      </div>
    ),
    category: "Mappings"
  },
  {
    id: 33,
    question: "Explain Hierarchical Schema in IICS?",
    answer: (
      <div>
        <p>
          Hierarchical Schema is used to upload JSON or XML files that define the hierarchy of output data. The Hierarchy Parser Transformation transforms input data according to this schema.
        </p>
      </div>
    ),
    category: "Transformations"
  },
  {
    id: 34,
    question: "Explain Dynamic Linking",
    answer: (
      <div>
        <p>
          Informatica Cloud enables us to create target files at runtime. This can be used only in mappings where the target is set with “Create New at Runtime”. Dynamic filenames can be used so that a new file is created for each mapping run.
        </p>
      </div>
    ),
    category: "Mappings"
  },
  {
    id: 35,
    question: "Explain Mapping Areas of Cloud Designers?",
    answer: (
      <div>
        <ul className="list-disc pl-5">
          <li><strong>Transformation Palette</strong>: Add transformations via click or drag-and-drop.</li>
          <li><strong>Mapping Canvas</strong>: Configure mappings similar to PowerCenter Designer.</li>
          <li><strong>Toolbar</strong>: Tools for validate, save, zoom, arrange, etc.</li>
          <li><strong>Properties Panel</strong>: Displays configuration options.</li>
          <li><strong>Status Area</strong>: Notifies about task statuses.</li>
        </ul>
      </div>
    ),
    category: "Cloud Designer"
  },
  {
    id: 36,
    question: "Explain Taskflow?",
    answer: (
      <div>
        <p>
          Taskflow is similar to Workflow in Informatica PowerCenter. It regulates the execution order of Mapping Configuration Tasks or Synchronization Tasks based on the output of prior tasks.
        </p>
      </div>
    ),
    category: "Taskflows"
  },
  {
    id: 37,
    question: "Explain Informatica Cloud REST API?",
    answer: (
      <div>
        <p>
          Informatica Cloud REST API provides programmatic access to Informatica Intelligent Cloud Services. Developers can perform tasks like creating, updating, deleting connections, and monitoring jobs.
        </p>
      </div>
    ),
    category: "APIs"
  },
  {
    id: 38,
    question: "How do we read JSON source files in IICS?",
    answer: (
      <div>
        <p>
          We use Hierarchy Parser Transformation in IICS to read JSON files. We need to specify the hierarchy of the output data using a hierarchical schema.
        </p>
      </div>
    ),
    category: "Transformations"
  },
  {
    id: 39,
    question: "Explain the differentiator of Cloud Architecture?",
    answer: (
      <div>
        <p>
          Informatica Cloud architecture is multi-tenant with a user-friendly web UI. It supports hybrid solutions for internal systems and helps developers focus more on integration than job execution.
        </p>
      </div>
    ),
    category: "Architecture"
  },
  {
    id: 40,
    question: "List some essential resources provided by the Informatica Cloud REST API",
    answer: (
      <div>
        <ul className="list-disc pl-5">
          <li><strong>ActivityMonitor</strong>: Returns job details.</li>
          <li><strong>Connection</strong>: Returns data integration connection info.</li>
          <li><strong>Activity Log</strong>: Provides activity logs.</li>
          <li><strong>Schedule</strong>: Manage task schedules.</li>
          <li><strong>Job</strong>: Start/Stop tasks.</li>
        </ul>
      </div>
    ),
    category: "APIs"
   },
   {
    id: 41,
    question: "What is the difference between a mapping and a task in IICS?",
    answer: (
      <div>
        <p>
          A <strong>mapping</strong> defines the data flow logic, whereas a <strong>task</strong> (like Mapping Task) executes the mapping with additional run-time configurations such as parameter values, scheduling, and pre/post processing options.
        </p>
      </div>
    ),
    category: "Mapping vs Task"
  },
  {
    id: 42,
    question: "How does Secure Agent work in Informatica Cloud?",
    answer: (
      <div>
        <p>
          The Secure Agent is a lightweight program installed on a local machine or cloud VM. It runs tasks, connects to on-prem or cloud systems, and securely transfers data. It automatically updates itself and handles execution behind the scenes.
        </p>
      </div>
    ),
    category: "Architecture"
  },
  {
    id: 43,
    question: "What is the use of Parameterization in IICS?",
    answer: (
      <div>
        <p>
          Parameterization allows you to create flexible mappings and tasks by defining values like file names, connection details, or filters as parameters. This enables reusability and environment-specific configuration.
        </p>
      </div>
    ),
    category: "Best Practices"
  },
  {
    id: 44,
    question: "What are the different task types in Informatica IICS?",
    answer: (
      <div>
        <ul className="list-disc pl-5">
          <li>Mapping Task</li>
          <li>Synchronization Task</li>
          <li>Taskflow</li>
          <li>Linear Taskflow</li>
          <li>Replication Task</li>
          <li>Data Transfer Task</li>
        </ul>
      </div>
    ),
    category: "Tasks"
  },
  {
    id: 45,
    question: "What is a Taskflow in IICS?",
    answer: (
      <div>
        <p>
          A Taskflow is a workflow orchestration tool in IICS that allows sequencing of tasks such as Mapping Tasks, Decision tasks, and Wait tasks, enabling conditional execution and advanced integration logic.
        </p>
      </div>
    ),
    category: "Taskflow"
  },
  {
    id: 46,
    question: "Explain the role of a Decision Task in Taskflow.",
    answer: (
      <div>
        <p>
          A Decision Task evaluates a condition and routes the Taskflow to different branches based on the outcome. It supports branching logic, making Taskflows dynamic and flexible.
        </p>
      </div>
    ),
    category: "Taskflow"
  },
  {
    id: 47,
    question: "What is an Expression transformation used for?",
    answer: (
      <div>
        <p>
          The Expression transformation is used to calculate values, manipulate strings, perform conditional logic, and create new fields using expression language functions.
        </p>
      </div>
    ),
    category: "Transformations"
  },
  {
    id: 48,
    question: "How do you implement error handling in IICS?",
    answer: (
      <div>
        <p>
          Error handling can be implemented using <strong>Reject</strong> files, <strong>error logs</strong>, or by configuring <strong>on-failure actions</strong> in Taskflows. Additionally, validations and expressions can be used to filter invalid data before processing.
        </p>
      </div>
    ),
    category: "Error Handling"
  },
  {
    id: 49,
    question: "What is the difference between IICS and PowerCenter?",
    answer: (
      <div>
        <p>
          IICS is a cloud-based platform that supports real-time and batch integration with modern UI and APIs, while PowerCenter is an on-premise ETL tool focused on batch processing and traditional data warehouse integration.
        </p>
      </div>
    ),
    category: "Comparison"
  },
  {
    id: 50,
    question: "How can IICS connect to on-premise systems?",
    answer: (
      <div>
        <p>
          IICS uses the Secure Agent installed on-premise to connect securely to internal databases, files, or applications. It allows seamless hybrid integrations between cloud and on-prem environments.
        </p>
      </div>
    ),
    category: "Integration"
  },
  {
    id: 51,
    question: "Explain Lookup transformation in IICS.",
    answer: (
      <div>
        <p>
          Lookup transformation retrieves related data from a lookup source such as a table or flat file. It can be configured as connected or unconnected and supports caching to improve performance.
        </p>
      </div>
    ),
    category: "Transformations"
  },
  {
    id: 52,
    question: "What are the types of parameters in IICS?",
    answer: (
      <div>
        <ul className="list-disc pl-5">
          <li>Input Parameter</li>
          <li>Output Parameter</li>
          <li>In-Out Parameter</li>
        </ul>
        <p>
          These parameters can be used in mappings and mapping tasks to create reusable components and environment-specific configurations.
        </p>
      </div>
    ),
    category: "Parameters"
  },
  {
    id: 53,
    question: "What is the benefit of using task templates in IICS?",
    answer: (
      <div>
        <p>
          Task templates standardize configuration and promote reusability. They allow consistent settings across environments and reduce manual errors in task creation.
        </p>
      </div>
    ),
    category: "Best Practices"
  },
  {
    id: 54,
    question: "What is a Mapping Configuration Task?",
    answer: (
      <div>
        <p>
          A Mapping Configuration Task runs a parameterized mapping. It allows users to override values like source, target, and parameters at runtime, enabling greater flexibility and reuse.
        </p>
      </div>
    ),
    category: "Tasks"
  },
  {
    id: 55,
    question: "What is a Data Synchronization Task?",
    answer: (
      <div>
        <p>
          A Synchronization Task enables simple source-to-target data movement. It is commonly used for replicating cloud or on-prem data without complex transformation logic.
        </p>
      </div>
    ),
    category: "Tasks"
  },
  {
    id: 56,
    question: "How to monitor jobs in IICS?",
    answer: (
      <div>
        <p>
          Jobs can be monitored via the <strong>My Jobs</strong> or <strong>Activity Monitor</strong> page in IICS. These interfaces provide execution status, logs, and error messages for debugging.
        </p>
      </div>
    ),
    category: "Monitoring"
  },
  {
    id: 57,
    question: "What are REST and SOAP Web Services in CAI?",
    answer: (
      <div>
        <p>
          REST services use lightweight HTTP methods (GET, POST, etc.) and are preferred for modern APIs. SOAP is an older protocol using XML messaging with a defined WSDL. CAI supports both for real-time integrations.
        </p>
      </div>
    ),
    category: "CAI"
  },
  {
    id: 58,
    question: "What is a Service Connector in IICS CAI?",
    answer: (
      <div>
        <p>
          A Service Connector in Cloud Application Integration (CAI) defines a connection to an external REST or SOAP API. It includes endpoint details, methods, and data structure required to invoke the service.
        </p>
      </div>
    ),
    category: "CAI"
  },
  {
    id: 59,
    question: "How is scheduling managed in IICS?",
    answer: (
      <div>
        <p>
          IICS allows job scheduling using built-in schedulers. You can configure frequency, start time, repeat intervals, and calendar-based triggers within each task or Taskflow.
        </p>
      </div>
    ),
    category: "Scheduling"
  },
  {
    id: 60,
    question: "What are the key features of Informatica Cloud Application Integration (CAI)?",
    answer: (
      <div>
        <ul className="list-disc pl-5">
          <li>Support for REST and SOAP APIs</li>
          <li>Real-time process orchestration</li>
          <li>Event-driven triggers</li>
          <li>App and Service Connectors</li>
          <li>Monitoring and debugging tools</li>
        </ul>
      </div>
    ),
    category: "CAI"
   },
   {
    id: 61,
    question: "What is parameterization in Informatica IICS?",
    answer: (
      <div>
        <p>
          Parameterization in IICS allows you to create flexible mappings and Taskflows by defining parameters for values like file paths, connection names, or filter conditions. This promotes reusability and dynamic configuration.
        </p>
      </div>
    ),
    category: "Mapping Configuration"
  },
  {
    id: 62,
    question: "How does IICS support REST API integration?",
    answer: (
      <div>
        <p>
          IICS supports REST API integration via REST V2 connectors and CAI Service Connectors. You can connect to external REST services to push or pull data using GET, POST, PUT, and DELETE methods.
        </p>
      </div>
    ),
    category: "API Integration"
  },
  {
    id: 63,
    question: "What is pushdown optimization in IICS?",
    answer: (
      <div>
        <p>
          Pushdown Optimization allows parts of the transformation logic to be pushed to the source or target database, reducing data movement and improving performance.
        </p>
      </div>
    ),
    category: "Performance Tuning"
  },
  {
    id: 64,
    question: "What is a hierarchical schema in IICS?",
    answer: (
      <div>
        <p>
          A hierarchical schema represents structured data like JSON or XML. IICS lets you define or import schemas and use Hierarchical Parser/Formatter transformations to process complex nested data.
        </p>
      </div>
    ),
    category: "Data Processing"
  },
  {
    id: 65,
    question: "How does IICS handle real-time data processing?",
    answer: (
      <div>
        <p>
          Real-time processing in IICS is handled using CAI (Cloud Application Integration), which supports event-based triggers, process orchestration, and integration with messaging systems or APIs.
        </p>
      </div>
    ),
    category: "Real-time Integration"
  },
  {
    id: 66,
    question: "What are Secure Agents in IICS?",
    answer: (
      <div>
        <p>
          Secure Agents are lightweight programs installed on-premise or on cloud VMs. They execute jobs, manage connectivity to source/target systems, and provide a runtime environment for Data Integration and Application Integration tasks.
        </p>
      </div>
    ),
    category: "Architecture"
  },
  {
    id: 67,
    question: "What is a Lookup transformation in IICS?",
    answer: (
      <div>
        <p>
          The Lookup transformation retrieves related data from a lookup source based on matching conditions. It supports connected and unconnected lookups with caching for performance improvement.
        </p>
      </div>
    ),
    category: "Transformations"
  },
  {
    id: 68,
    question: "What are the types of transformations available in IICS?",
    answer: (
      <div>
        <ul className="list-disc pl-5">
          <li>Expression</li>
          <li>Lookup</li>
          <li>Filter</li>
          <li>Router</li>
          <li>Aggregator</li>
          <li>Joiner</li>
          <li>Rank</li>
          <li>Union</li>
          <li>Source/Target</li>
        </ul>
      </div>
    ),
    category: "Transformations"
  },
  {
    id: 69,
    question: "What is a Taskflow in IICS?",
    answer: (
      <div>
        <p>
          A Taskflow is an orchestration object in IICS that allows sequencing and conditional execution of multiple tasks, such as mappings, decision steps, and email notifications.
        </p>
      </div>
    ),
    category: "Orchestration"
  },
  {
    id: 70,
    question: "What is the difference between Mapping and Taskflow in IICS?",
    answer: (
      <div>
        <p>
          A Mapping defines the data flow logic and transformations, while a Taskflow orchestrates the execution of multiple tasks, including mappings, in a defined sequence with logic like decisions and loops.
        </p>
      </div>
    ),
    category: "Conceptual"
  },
  {
    id: 71,
    question: "What is a decision step in a Taskflow?",
    answer: (
      <div>
        <p>
          The Decision step allows conditional branching in Taskflows based on evaluated expressions or parameter values, enabling dynamic flow control.
        </p>
      </div>
    ),
    category: "Taskflow"
  },
  {
    id: 72,
    question: "What is the use of the Assignment step in Taskflow?",
    answer: (
      <div>
        <p>
          The Assignment step assigns values to input/output parameters or temporary fields at runtime, often used to modify values dynamically within the flow.
        </p>
      </div>
    ),
    category: "Taskflow"
  },
  {
    id: 73,
    question: "How do you call a REST API in IICS CAI?",
    answer: (
      <div>
        <p>
          You use a Service Connector created with the API's Swagger or manual configuration, then call it using the Web Service or Service Call step within a process.
        </p>
      </div>
    ),
    category: "CAI"
  },
  {
    id: 74,
    question: "What are the ways to pass parameters into a Mapping Task?",
    answer: (
      <div>
        <ul className="list-disc pl-5">
          <li>Hardcoded values in the Mapping Task</li>
          <li>From Taskflow input</li>
          <li>Assigned dynamically via Assignment step</li>
        </ul>
      </div>
    ),
    category: "Parameterization"
  },
  {
    id: 75,
    question: "What is the use of Source and Target transformations?",
    answer: (
      <div>
        <p>
          Source transformations define the input structure, while Target transformations define where and how the output data will be written, including file, database, or cloud storage.
        </p>
      </div>
    ),
    category: "Transformations"
  },
  {
    id: 76,
    question: "What is CDC in IICS?",
    answer: (
      <div>
        <p>
          Change Data Capture (CDC) identifies and processes only changed data since the last load. IICS supports CDC using source-specific mechanisms or timestamp-based filters.
        </p>
      </div>
    ),
    category: "Data Integration"
  },
  {
    id: 77,
    question: "What is the difference between Joiner and Lookup?",
    answer: (
      <div>
        <p>
          The Joiner transformation joins two pipelines of data, while Lookup fetches matching data from a lookup source based on a condition. Joiner is used for data merging; Lookup for data enrichment.
        </p>
      </div>
    ),
    category: "Transformations"
  },
  {
    id: 78,
    question: "Can we call a Taskflow from another Taskflow?",
    answer: (
      <div>
        <p>
          Yes, using the Task step in a parent Taskflow, you can invoke another Taskflow as a sub-task to modularize workflows.
        </p>
      </div>
    ),
    category: "Orchestration"
  },
  {
    id: 79,
    question: "How does IICS support versioning?",
    answer: (
      <div>
        <p>
          IICS supports versioning of assets. Each time you save changes, a new version is created. You can revert, compare, or promote versions between environments.
        </p>
      </div>
    ),
    category: "DevOps"
  },
  {
    id: 80,
    question: "How are errors handled in Taskflows?",
    answer: (
      <div>
        <p>
          Taskflows provide error handling using On Error steps, where you can route the flow to handle failures, notify users, or perform compensatory actions.
        </p>
      </div>
    ),
    category: "Error Handling"
  },
  {
    id: 81,
    question: "What is the use of Expression transformation?",
    answer: (
      <div>
        <p>
          The Expression transformation is used to calculate values, apply functions, or derive new columns during the mapping process.
        </p>
      </div>
    ),
    category: "Transformations"
  },
  {
    id: 82,
    question: "What is a Mapping Task?",
    answer: (
      <div>
        <p>
          A Mapping Task executes a mapping and defines runtime properties like parameter values, pre/post commands, and runtime environment.
        </p>
      </div>
    ),
    category: "Execution"
  },
  {
    id: 83,
    question: "Can we run multiple tasks in parallel in a Taskflow?",
    answer: (
      <div>
        <p>
          Yes. By using parallel paths in the Taskflow, you can run multiple tasks concurrently to optimize time and resources.
        </p>
      </div>
    ),
    category: "Taskflow"
  },
  {
    id: 84,
    question: "How can we handle file ingestion in IICS?",
    answer: (
      <div>
        <p>
          IICS supports file ingestion using Source transformation with file format options like CSV, JSON, XML. Files can be read from on-premise or cloud locations via Secure Agent.
        </p>
      </div>
    ),
    category: "Data Integration"
  },
  {
    id: 85,
    question: "What is the difference between Linear and Advanced Taskflows?",
    answer: (
      <div>
        <p>
          Linear Taskflows provide sequential execution. Advanced Taskflows offer complex logic like decisions, loops, and error handling for dynamic workflows.
        </p>
      </div>
    ),
    category: "Taskflow"
  },
  {
    id: 86,
    question: "What is the use of Service Connectors?",
    answer: (
      <div>
        <p>
          Service Connectors define and store REST or SOAP API definitions that can be reused across processes in CAI to integrate external services.
        </p>
      </div>
    ),
    category: "CAI"
  },
  {
    id: 87,
    question: "How do you debug a Taskflow or Mapping in IICS?",
    answer: (
      <div>
        <p>
          You can use the Monitor tab to view logs and error messages, enable verbose logging, and use debugger features for CAI processes to trace issues.
        </p>
      </div>
    ),
    category: "Debugging"
  },
  {
    id: 88,
    question: "What are process objects in CAI?",
    answer: (
      <div>
        <p>
          Process objects are reusable logic blocks (like sub-processes or shared variables) within Cloud Application Integration used to build modular and maintainable integrations.
        </p>
      </div>
    ),
    category: "CAI"
  },
  {
    id: 89,
    question: "What are the deployment options in IICS?",
    answer: (
      <div>
        <p>
          IICS provides export/import options to deploy assets between environments. For automation, REST APIs or CI/CD tools can be integrated for deployments.
        </p>
      </div>
    ),
    category: "Deployment"
  },
  {
    id: 90,
    question: "What are common causes for Taskflow failure?",
    answer: (
      <div>
        <ul className="list-disc pl-5">
          <li>Invalid parameter values</li>
          <li>Connection failures</li>
          <li>Data transformation errors</li>
          <li>Incorrect task linking or sequence</li>
        </ul>
      </div>
    ),
    category: "Error Handling"
   },
   {
    id: 91,
    question: "What is the difference between Service Connector and App Connector in IICS?",
    answer: (
      <div>
        <p>
          A Service Connector defines how to connect and interact with an external service. An App Connector is an abstraction used in App Integration to call these services as reusable connections.
        </p>
      </div>
    ),
    category: "Connectivity"
  },
  {
    id: 92,
    question: "How do you handle dynamic endpoints in Service Connectors?",
    answer: (
      <div>
        <p>
          Use input parameters in the Service Connector definition for base URL or resource paths, and pass dynamic values at runtime via Process or App Connection.
        </p>
      </div>
    ),
    category: "Connectivity"
  },
  {
    id: 93,
    question: "What are the types of APIs supported in IICS?",
    answer: (
      <div>
        <p>
          IICS supports REST and SOAP APIs. You can create APIs using Application Integration, and consume APIs via Service Connectors or Web Services consumer transformations.
        </p>
      </div>
    ),
    category: "API"
  },
  {
    id: 94,
    question: "What is a Process Object in IICS CAI?",
    answer: (
      <div>
        <p>
          A Process Object represents a reusable logic component like a subprocess or task that can be invoked from other processes to modularize integration logic.
        </p>
      </div>
    ),
    category: "CAI"
  },
  {
    id: 95,
    question: "How can you schedule a Process in IICS?",
    answer: (
      <div>
        <p>
          You can schedule a process by creating a schedule in the Schedule tab and associating it with the process task, or by using taskflows to run it based on schedule.
        </p>
      </div>
    ),
    category: "Scheduling"
  },
  {
    id: 96,
    question: "What is a Subprocess in IICS?",
    answer: (
      <div>
        <p>
          A Subprocess is a process that is called from a parent process. It helps in reusing logic and structuring integration flows more efficiently.
        </p>
      </div>
    ),
    category: "CAI"
  },
  {
    id: 97,
    question: "What are Fault Handlers in IICS?",
    answer: (
      <div>
        <p>
          Fault Handlers are constructs in a process that catch runtime errors or faults. They help in implementing error handling and recovery logic.
        </p>
      </div>
    ),
    category: "Error Handling"
  },
  {
    id: 98,
    question: "How do you trigger IICS process via REST API?",
    answer: (
      <div>
        <p>
          Use the IICS REST API endpoint for process execution by sending an HTTP POST request with process parameters and required authentication headers.
        </p>
      </div>
    ),
    category: "API"
  },
  {
    id: 99,
    question: "How do you handle parallel execution in IICS Taskflows?",
    answer: (
      <div>
        <p>
          Use the Parallel Path step in Taskflow to run multiple tasks simultaneously. Ensure proper join or wait steps if needed for synchronization.
        </p>
      </div>
    ),
    category: "Taskflow"
  },
  {
    id: 100,
    question: "How can we monitor Taskflows in IICS?",
    answer: (
      <div>
        <p>
          You can monitor Taskflows through the Monitor tab in IICS. It provides real-time status, logs, and execution history of integration tasks.
        </p>
      </div>
    ),
    category: "Monitoring"
  },
  {
    id: 101,
    question: "What is the use of Expression step in Taskflow?",
    answer: (
      <div>
        <p>
          The Expression step allows you to assign values to variables using expressions, logic, or function calls during taskflow execution.
        </p>
      </div>
    ),
    category: "Taskflow"
  },
  {
    id: 102,
    question: "How can you stop Taskflow execution based on condition?",
    answer: (
      <div>
        <p>
          Use the Decision step to evaluate a condition, and then direct the flow accordingly. You can use End step conditionally to stop execution.
        </p>
      </div>
    ),
    category: "Taskflow"
  },
  {
    id: 103,
    question: "What is the difference between a Human Task and Service Task in IICS?",
    answer: (
      <div>
        <p>
          A Human Task requires manual intervention or approval, while a Service Task calls a service like a process or API automatically.
        </p>
      </div>
    ),
    category: "CAI"
  },
  {
    id: 104,
    question: "What is the difference between a Mapping Task and Synchronization Task?",
    answer: (
      <div>
        <p>
          A Mapping Task executes a mapping developed in Mapping Designer, offering complex transformations. A Synchronization Task is used for quick replication and movement of data with limited transformation logic.
        </p>
      </div>
    ),
    category: "Mapping"
  },
  {
    id: 105,
    question: "How can we call a Data Integration task from a Process in CAI?",
    answer: (
      <div>
        <p>
          Use the “Invoke” step in the process to call a Data Integration task by selecting the appropriate task type and parameters.
        </p>
      </div>
    ),
    category: "CAI"
  },
  {
    id: 106,
    question: "What is a Process Call step in IICS?",
    answer: (
      <div>
        <p>
          The Process Call step is used in a parent process to invoke a subprocess or another process. It allows reuse and modular logic implementation.
        </p>
      </div>
    ),
    category: "CAI"
  },
  {
    id: 107,
    question: "How can you loop through records in a Process?",
    answer: (
      <div>
        <p>
          Use the Repeat step or Looping construct with counters or lists in a Process to iterate over records or actions.
        </p>
      </div>
    ),
    category: "CAI"
  },
  {
   id: 108,
    question: "How do you pass parameters between Taskflows and Processes?",
    answer: (
      <div>
        <p>
          Define input/output parameters in both Taskflows and Processes. Map these parameters explicitly while invoking one from the other to ensure correct data flow.
        </p>
      </div>
    ),
    category: "Integration"
  }
];

const InterviewQA: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...new Set(interviewData.map((qa) => qa.category).filter(Boolean))];

  const filteredData = interviewData.filter((qa) => {
    const answerText = React.isValidElement(qa.answer)
      ? (typeof qa.answer.props.children === "string"
          ? qa.answer.props.children
          : Array.isArray(qa.answer.props.children)
            ? qa.answer.props.children.map((child: any) =>
                typeof child === "string" ? child : ""
              ).join(" ")
            : "")
      : "";

    const matchesSearch =
      qa.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      answerText.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || qa.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header Section with Title and Subtitle */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 drop-shadow-md mb-4">
          108 Informatica IICS Interview Q&A in Simple Words – 2025 Edition
        </h1>

        <div className="inline-block bg-blue-700 text-white text-lg font-medium px-6 py-3 rounded-xl shadow-lg">
             💡 Learn Informatica IICS from scratch – Practical, real-life questions with clear answers<br />
  by <span className="font-semibold">Rishab Informatica Group</span>
        </div>
      </div>

      {/* Sticky Search Bar and Category Filter */}
      <div className="sticky top-0 bg-white py-4 z-50 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 mb-4 justify-center items-center">
          <input
            type="text"
            placeholder="🔍 Search IICS questions (e.g., 'task flow')..."
            className="w-full md:w-2/3 p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="w-full md:w-48 p-3 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Questions Accordion */}
      {filteredData.map(({ id, question, answer }) => (
        <div key={id} className="mb-6 border-b pb-4">
          <h2
            className="text-xl font-semibold mb-2 cursor-pointer hover:text-blue-600 flex justify-between items-center"
            onClick={() => toggleExpand(id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && toggleExpand(id)}
            aria-expanded={expandedId === id}
          >
            <span>{id}. {question}</span>
            <span aria-hidden="true">{expandedId === id ? '−' : '+'}</span>
          </h2>
          {expandedId === id && (
            <div
              className="text-gray-700 pl-4 transition-all duration-300 ease-in-out overflow-hidden"
              aria-labelledby={`question-${id}`}
            >
              {answer}
            </div>
          )}
        </div>
      ))}

      {/* No Results Message */}
      {filteredData.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No questions match your search criteria.
        </div>
      )}
    </div>
  );
};

export default InterviewQA;