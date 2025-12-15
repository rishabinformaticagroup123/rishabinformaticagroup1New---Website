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
    question: "What is Informatica PowerCenter?",
    answer: (
      <div>
        <p>A data integration tool that combines data from multiple OLTP source systems, transforms data into homogeneous format and delivers throughout the enterprise.</p>
      </div>
    ),
    category: "Overview"
  },
  {  	 
	id: 2,
    question: "What are the features of complex mapping?",
    answer: (
      <div>
        <ul className="list-disc pl-5 mt-2">
          <li>Difficult requirements</li>
          <li>Numerous transformations</li>
          <li>Complex business logic</li>
        </ul>
      </div>
    ),
    category: "Mappings"
  },
  {     
    id: 3,
    question: "What is the meaning of Enterprise Data Warehousing?",
    answer: (
      <div>
        <p>
          Enterprise Data Warehousing is the data of the organization being created or developed at a single point of access. The data is globally accessed and viewed through a single source since the server is linked to this single source. It also includes the periodic analysis of the source.
        </p>
      </div>
    ),
    category: "Concepts"
  },
  {
    id: 4,
    question: "What is the meaning of Lookup transformation?",
    answer: (
      <div>
        <p>
          To get the relevant data or information, the Lookup transformation is used to find a source qualifier, a target, or other sources. Many types of files can be searched in the Lookup transformation like for example flat files, relational tables, synonym, or views, etc.
        </p>
        <p>The Lookup transformation can be cited as active or passive. It can also be either connected or unconnected. In mapping, multiple lookup transformations can be used.</p>
      </div>
    ),
    category: "Transformations"
  },
  {
    id: 5,
    question: "What are the points of difference between connected lookup and unconnected lookup?",
    answer: (
      <div>
        <ul className="list-disc pl-5 mt-2">
          <li>Connected lookup takes input directly from other transformations while unconnected receives values from LKP expression</li>
          <li>Connected Lookup cache can be both dynamic and static but unconnected can't be dynamic</li>
          <li>Connected can return multiple output ports while unconnected returns only one</li>
          <li>User-defined default values are supported in connected but not in unconnected lookup</li>
        </ul>
      </div>
    ),
    category: "Transformations"
  },
  {
    id: 6,
    question: "How many input parameters can be present in an unconnected lookup?",
    answer: (
      <div>
        <p>The number of parameters that can include in an unconnected lookup is numerous. However, no matter how many parameters are put, the return value would be only one.</p>
      </div>
    ),
    category: "Transformations"
  },
  {
    id: 7,
    question: "How many lookup caches are available?",
    answer: (
      <div>
        <p>Informatica lookup caches can be of different nature:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>Static Cache</li>
          <li>Dynamic Cache</li>
          <li>Persistent Cache</li>
          <li>Shared Cache</li>
          <li>Recached</li>
        </ul>
      </div>
    ),
    category: "Transformations"
  },
  {
    id: 8,
    question: "What is the difference between a data warehouse, a data mart, and a database?",
    answer: (
      <div>
        <ul className="list-disc pl-5 mt-2">
          <li>Data warehouse consists of different kinds of data at enterprise level</li>
          <li>Database contains smaller sets of structured data</li>
          <li>Datamart contains data for specific domains like sales, marketing etc.</li>
        </ul>
      </div>
    ),
    category: "Concepts"
  },
  {
    id: 9,
    question: "What is a domain?",
    answer: (
      <div>
        <p>The main organizational point sometimes undertakes all the interlinked and interconnected nodes and relationships and this is known as the domain. These links are covered mainly by one single point of the organization.</p>
      </div>
    ),
    category: "Architecture"
  },
  {
    id: 10,
    question: "What is the difference between PowerCenter and Repository server?",
    answer: (
      <div>
        <ul className="list-disc pl-5 mt-2">
          <li>PowerCenter server handles integration processes</li>
          <li>Repository server ensures repository integrity and consistency</li>
        </ul>
      </div>
    ),
    category: "Architecture"
  },
  {
    id: 11,
    question: "In Informatica, how many repositories are possible to be made?",
    answer: (
      <div>
        <p>The total figure of repositories created in Informatica mainly depends on the total amounts of the ports of the Informatica.</p>
      </div>
    ),
    category: "Architecture"
  },
  {
    id: 12,
    question: "What are the benefits of a partitioned session?",
    answer: (
      <div>
        <p>A session is partitioned in order to increase and improve the efficiency and the operation of the server. It includes the solo implementation sequences in the session.</p>
      </div>
    ),
    category: "Performance"
  },
  {
    id: 13,
    question: "Define parallel processing?",
    answer: (
      <div>
        <p>Parallel processing helps in further improvement of performance under hardware power. The parallel processing is actually done by using the partitioning sessions.</p>
      </div>
    ),
    category: "Performance"
  },
  {
    id: 14,
    question: "What are the different types of methods for the implementation of parallel processing in Informatica?",
    answer: (
      <div>
        <ul className="list-disc pl-5 mt-2">
          <li>Database Partitioning</li>
          <li>Joiner</li>
          <li>Lookup</li>
        </ul>
      </div>
    ),
    category: "Performance"
  },
  {
    id: 15,
    question: "What are the different mapping design tips for Informatica?",
    answer: (
      <div>
        <ul className="list-disc pl-5 mt-2">
          <li>Standards - Follow consistent naming conventions and documentation</li>
          <li>Reusability - Use reusable transformations</li>
          <li>Scalability - Design for volume</li>
          <li>Simplicity - Create simple logical designs</li>
          <li>Modularity - Use modular techniques</li>
        </ul>
      </div>
    ),
    category: "Design"
  },
  {
    id: 16,
    question: "What is the meaning of the word 'session'?",
    answer: (
      <div>
        <p>Converting data from a source to a target is generally implemented by a teaching service and this is known as a session. Usually, the session manager executes the session.</p>
      </div>
    ),
    category: "Workflow"
  },
  {
    id: 17,
    question: "How many numbers of sessions are grouped in one batch?",
    answer: (
      <div>
        <p>Any number of sessions can be grouped in one batch but however, for an easier migration process, it is better if the number is lesser in one batch.</p>
      </div>
    ),
    category: "Workflow"
  },
  {
    id: 18,
    question: "What is the difference between mapping parameters and mapping variables?",
    answer: (
      <div>
        <ul className="list-disc pl-5 mt-2">
          <li>Mapping variable refers to changing values during session execution</li>
          <li>Mapping parameter values don't change during the session</li>
        </ul>
      </div>
    ),
    category: "Mappings"
  },
  {
    id: 19,
    question: "Explain Partitionings & types in performance tuning?",
    answer: (
      <div>
        <ul className="list-disc pl-5 mt-2">
          <li>Round-Robin Partitioning - Distributes data evenly</li>
          <li>Hash Auto-keys partitioning - Groups data using compound partition</li>
          <li>Hash User-Keys Partitioning - Groups based on user-defined key</li>
          <li>Key Range Partitioning - Data passed based on specified range</li>
          <li>Pass-through Partitioning - Passes data without distribution</li>
        </ul>
      </div>
    ),
    category: "Performance"
  },
  {
    id: 20,
    question: "What are the best mapping development practices?",
    answer: (
      <div>
        <ul className="list-disc pl-5 mt-2">
          <li>Source Qualifier - Extract only necessary data</li>
          <li>Expressions - Use local variables to limit calculations</li>
          <li>Aggregator - Filter data before aggregation</li>
          <li>Filter - Place close to source</li>
          <li>Joiner - Avoid outer joins</li>
          <li>Lookup - Use joins for large lookup tables</li>
        </ul>
      </div>
    ),
    category: "Design"
  },
  {
    id: 21,
    question: "What are the features of complex mapping?",
    answer: (
      <div>
        <ul className="list-disc pl-5 mt-2">
          <li>Difficult requirements</li>
          <li>Numerous transformations</li>
          <li>Complex business logic</li>
        </ul>
      </div>
    ),
    category: "Mappings"
  },
  {
    id: 22,
    question: "Which option helps in finding whether the mapping is correct or not?",
    answer: (
      <div>
        <p>The debugging option helps in judging whether the mapping is correct or not without really connecting to the session.</p>
      </div>
    ),
    category: "Mappings"
  },
  {
    id: 23,
    question: "What do you mean by OLAP?",
    answer: (
      <div>
        <p>OLAP or also known as On-Line Analytical Processing is the method with the assistance of which multi-dimensional analysis occurs.</p>
      </div>
    ),
    category: "Concepts"
  },
  {
    id: 24,
    question: "Mention the different types of OLAP?",
    answer: (
      <div>
        <ul className="list-disc pl-5 mt-2">
          <li>ROLAP</li>
          <li>HOLAP</li>
        </ul>
      </div>
    ),
    category: "Concepts"
  },
  {
    id: 25,
    question: "What is the meaning of the surrogate key?",
    answer: (
      <div>
        <p>The surrogate key is just the replacement in the place of the prime key. The latter is natural in nature. This is a different type of identity for each consisting of different data.</p>
      </div>
    ),
    category: "Design"
  },
  {
    id: 26,
    question: "What is a session task?",
    answer: (
      <div>
        <p>When the Power Centre Server transfers data from the source to the target, it is often guided by a set of instructions and this is known as the session task.</p>
      </div>
    ),
    category: "Workflow"
  },
  {
    id: 27,
    question: "What is the meaning of the command task?",
    answer: (
      <div>
        <p>Command task only allows the flow of more than one shell command or sometimes flow of one shell command in Windows while the work is running.</p>
      </div>
    ),
    category: "Workflow"
  },
  {
    id: 28,
    question: "What is the meaning of a standalone command task?",
    answer: (
      <div>
        <p>The type of command task that allows the shell commands to run anywhere during the workflow is known as the standalone task.</p>
      </div>
    ),
    category: "Workflow"
  },
  {
    id: 29,
    question: "Define workflow?",
    answer: (
      <div>
        <p>The workflow includes a set of instructions that allows the server to communicate for the implementation of tasks.</p>
      </div>
    ),
    category: "Workflow"
  },
  {
    id: 30,
    question: "How many tools are there in the workflow manager?",
    answer: (
      <div>
        <ul className="list-disc pl-5 mt-2">
          <li>Task Designer</li>
          <li>Task Developer</li>
          <li>Workflow Designer</li>
          <li>Worklet Designer</li>
        </ul>
      </div>
    ),
    category: "Workflow"
  },
  {
    id: 31,
    question: "Define target load order?",
    answer: (
      <div>
        <p>Target load order is dependent on the source qualifiers in a mapping. Generally, multiple source qualifiers are linked to a target load order.</p>
      </div>
    ),
    category: "Mappings"
  },
  {
    id: 32,
    question: "Define Power Centre repository of Informatica?",
    answer: (
      <div>
        <p>Informatica Power Centre consists of metadata including source definitions, target definitions, mappings, sessions, workflows, and ODBC connections.</p>
      </div>
    ),
    category: "Architecture"
  },
  {
    id: 33,
    question: "Name the scenario in which the Informatica server rejects files?",
    answer: (
      <div>
        <p>When the server faces rejection of the update strategy transformation, it regrets files. The database consisting of the information and data also gets disrupted.</p>
      </div>
    ),
    category: "Error Handling"
  },
  {
    id: 34,
    question: "How to use Normalizer Transformation in Informatica?",
    answer: (
      <div>
        <ul className="list-disc pl-5 mt-2">
          <li>Active transformation that reads data from COBOL files and VSAM sources</li>
          <li>Acts like Source Qualifier for COBOL files</li>
          <li>Converts each input record into multiple output records (Data pivoting)</li>
        </ul>
      </div>
    ),
    category: "Transformations"
  },
  {
    id: 35,
    question: "What are the Limitations of Pushdown Optimization?",
    answer: (
      <div>
        <ul className="list-disc pl-5 mt-2">
          <li>Rank transformation cannot be pushed</li>
          <li>Transaction control transformation</li>
          <li>Sorted aggregation</li>
        </ul>
      </div>
    ),
    category: "Performance"
  },
  {
    id: 36,
    question: "What is the difference between Copy and Shortcut?",
    answer: (
      <div>
        <ul className="list-disc pl-5 mt-2">
          <li>Copy duplicates the object while shortcut creates dynamic link</li>
          <li>Changes don't reflect in copy but do in shortcut</li>
          <li>Copy duplicates space while shortcut preserves space</li>
        </ul>
      </div>
    ),
    category: "Design"
  },
  {
    id: 37,
    question: "How to use PMCMD Utility Command?",
    answer: (
      <div>
        <ul className="list-disc pl-5 mt-2">
          <li>Command based client program that communicates with integration service</li>
          <li>Can start workflows and schedule workflows</li>
          <li>Operates in Interactive Mode or Command-line Mode</li>
        </ul>
      </div>
    ),
    category: "Administration"
  },
  {
    id: 38,
    question: "How do I scheduling a Workflow?",
    answer: (
      <div>
        <p>There are 2 types of schedulers:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>Reusable scheduler - Can be assigned to multiple workflows</li>
          <li>Non Reusable scheduler - Created specifically for one workflow</li>
        </ul>
      </div>
    ),
    category: "Workflow"
  },
  {
    id: 39,
    question: "What is Dynamic Lookup Cache?",
    answer: (
      <div>
        <ul className="list-disc pl-5 mt-2">
          <li>Cache updates dynamically when lookup at the target table</li>
          <li>Allows synchronization of target lookup table image in memory</li>
          <li>Operated only in connected mode</li>
          <li>Supports only equality conditions</li>
        </ul>
      </div>
    ),
    category: "Transformations"
  },
  {
    id: 40,
    question: "What is the difference between the variable port and the Mapping variable?",
    answer: (
      <div>
        <ul className="list-disc pl-5 mt-2">
          <li>Variable port is local to transformation while mapping variable is local to mapping</li>
          <li>Variable port values are non-persistent</li>
          <li>Mapping variables can be used with SQL override</li>
        </ul>
      </div>
    ),
    category: "Mappings"
  },
  {
    id: 41,
    question: "Which is the T/R that builds only single cache memory?",
    answer: (
      <div>
        <p>Sorter always built only one cache memory (also called Buffer). Rank can build two types of cache memory.</p>
      </div>
    ),
    category: "Transformations"
  },
  {
    id: 42,
    question: "What is XML Source Qualifier Transformation in Informatica?",
    answer: (
      <div>
        <ul className="list-disc pl-5 mt-2">
          <li>Reads data from XML files</li>
          <li>XML files are hierarchical parent-child relationship formats</li>
          <li>Files can be normalized or denormalized</li>
        </ul>
      </div>
    ),
    category: "Transformations"
  },
  {
    id: 43,
    question: "What is Snowflake Schema?",
    answer: (
      <div>
        <p>Snowflake Schema is when a large denormalized dimension table is split into multiple normalized dimensions.</p>
        <p>Advantage: Select Query performance increases.</p>
        <p>Disadvantage: Maintenance cost increases due to more tables.</p>
      </div>
    ),
    category: "Design"
  },
  {
    id: 44,
    question: "What is a Standalone Email task?",
    answer: (
      <div>
        <ul className="list-disc pl-5 mt-2">
          <li>Can be used anywhere in the workflow</li>
          <li>Visible in Flow Diagram</li>
          <li>Email Variables can be defined</li>
        </ul>
      </div>
    ),
    category: "Workflow"
  },
  {
    id: 45,
    question: "What is Mapping Debugger?",
    answer: (
      <div>
        <p>A tool to identify if records are loaded correctly from one transformation to another. Used when session succeeds but records are not loaded.</p>
      </div>
    ),
    category: "Mappings"
  },
  {
    id: 46,
    question: "What is the functionality of F10 in Informatica?",
    answer: (
      <div>
        <p>F10 moves to Next Instance during debugging.</p>
      </div>
    ),
    category: "Mappings"
  },
  {
    id: 47,
    question: "What are Worklet and what types of worklets?",
    answer: (
      <div>
        <p>A worklet is a group of related tasks. There are 2 types:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>Reusable worklet - Created using worklet designer, can be assigned to multiple workflows</li>
          <li>Non-Reusable worklet - Created using workflow designer, specific to one workflow</li>
        </ul>
      </div>
    ),
    category: "Workflow"
  },
  {
    id: 48,
    question: "What is Relative Mode?",
    answer: (
      <div>
        <p>In Relative Mode, the timer task can start the timer from the start time of the timer task, workflow, worklet, or parent workflow.</p>
      </div>
    ),
    category: "Workflow"
  },
  {
    id: 49,
    question: "What is the Difference between Filter and Router T/R?",
    answer: (
      <div>
        <ul className="list-disc pl-5 mt-2">
          <li>Filter has single condition while Router has multiple conditions</li>
          <li>Filter has single target while Router has multiple targets</li>
          <li>Filter cannot capture rejected rows while Router's default group captures them</li>
        </ul>
      </div>
    ),
    category: "Transformations"
  },
  {
    id: 50,
    question: "What is a Repository Manager?",
    answer: (
      <div>
        <p>GUI based administrative client that allows:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>Create, edit and delete folders</li>
          <li>Assign user permissions</li>
          <li>Backup and restore repository objects</li>
        </ul>
      </div>
    ),
    category: "Administration"
  },
  {
    id: 51,
    question: "What is Rank Transformation in Informatica?",
    answer: (
      <div>
        <p>Active transformation that allows finding top or bottom performers. Created with:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>Input Port (I)</li>
          <li>Output Port (O)</li>
          <li>Rank Port (R)</li>
          <li>Variable Port (V)</li>
        </ul>
      </div>
    ),
    category: "Transformations"
  },
  {
    id: 52,
    question: "What is meant by Informatica PowerCenter Architecture?",
    answer: (
      <div>
        <p>Components include:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>Power Center Clients</li>
          <li>Power Center Repository</li>
          <li>Power Center Domain</li>
          <li>Power Center Repository Service (PCRS)</li>
          <li>Power Center Integration Service (PCIS)</li>
          <li>Informatica administrator</li>
        </ul>
      </div>
    ),
    category: "Architecture"
  },
  {
    id: 53,
    question: "What is Workflow Monitor?",
    answer: (
      <div>
        <p>GUI based client application that allows monitoring ETL objects and collecting runtime statistics like:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>Records extracted</li>
          <li>Records loaded</li>
          <li>Records rejected</li>
          <li>Session logs</li>
          <li>Throughput</li>
        </ul>
      </div>
    ),
    category: "Workflow"
  },
  {
    id: 54,
    question: "If Informatica has its own scheduler why using a third-party scheduler?",
    answer: (
      <div>
        <p>Third-party schedulers like Tivoli, Control-M etc. are used to integrate with other applications (mainframes, oracle apps) making it easier to schedule across multiple systems.</p>
      </div>
    ),
    category: "Workflow"
  },
  {
    id: 55,
    question: "What is Workflow Manager?",
    answer: (
      <div>
        <p>GUI-based client that allows creating:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>Sessions - Tasks that execute mappings</li>
          <li>Workflows - Instructions on how and when to run sessions</li>
          <li>Schedulers</li>
        </ul>
      </div>
    ),
    category: "Workflow"
  },
  {
    id: 56,
    question: "What is Informatica PowerCenter?",
    answer: (
      <div>
        <p>A data integration tool that combines data from multiple OLTP source systems, transforms data into homogeneous format and delivers throughout the enterprise.</p>
      </div>
    ),
    category: "Overview"
  },
  {
    id: 57,
    question: "What is a Dimensional Model?",
    answer: (
      <div>
        <p>Process of designing database to fulfill business requirements. Includes schemas like:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>Star Schema</li>
          <li>Snowflake Schema</li>
          <li>Gallery Schema</li>
        </ul>
      </div>
    ),
    category: "Design"
  },
  {
    id: 58,
    question: "How does Rank transformation handle string values?",
    answer: (
      <div>
        <p>Rank transformation can return strings at top or bottom of session sort order. In Unicode mode, sorts using selected code page. In ASCII mode, uses binary sort order.</p>
      </div>
    ),
    category: "Transformations"
  },
  {
    id: 59,
    question: "Is a sorter an active or passive transformation?",
    answer: (
      <div>
        <p>Sorter is active because it discards duplicates from the key, changing the number of rows.</p>
      </div>
    ),
    category: "Transformations"
  },
  {
    id: 60,
    question: "Mention the types of transformations available in Informatica.",
    answer: (
      <div>
        <ul className="list-disc pl-5 mt-2">
          <li>Source Qualifier</li>
          <li>Rank</li>
          <li>Lookup</li>
          <li>Router</li>
          <li>Aggregator</li>
          <li>Joiner</li>
          <li>Sequence Generator</li>
          <li>Transaction Control</li>
          <li>Expression</li>
          <li>Normalizer</li>
          <li>External</li>
        </ul>
      </div>
    ),
    category: "Transformations"
  },
  {
    id: 61,
    question: "What is the difference between active and passive transformation?",
    answer: (
      <div>
        <p>Active transformations change the number of input and output rows while passive transformations maintain the same number.</p>
      </div>
    ),
    category: "Transformations"
  },
  {
    id: 62,
    question: "What are the output files created by the Informatica server at runtime?",
    answer: (
      <div>
        <ul className="list-disc pl-5 mt-2">
          <li>Informatica Server log</li>
          <li>Session log file</li>
          <li>Session detail file</li>
          <li>Performance detail file</li>
          <li>Reject file</li>
          <li>Control file</li>
          <li>Post-session email</li>
          <li>Indicator file</li>
          <li>Output file</li>
          <li>Cache file</li>
        </ul>
      </div>
    ),
    category: "Administration"
  },
  {
    id: 63,
    question: "What is the difference between static cache and dynamic cache?",
    answer: (
      <div>
        <ul className="list-disc pl-5 mt-2">
          <li>Static cache is default and cannot be updated</li>
          <li>Dynamic cache allows inserting/updating data into lookup</li>
          <li>Static handles multiple matches, dynamic doesn't</li>
          <li>Static supports relational operators, dynamic only equality</li>
        </ul>
      </div>
    ),
    category: "Transformations"
  },
  {
    id: 64,
    question: "Can you tell what types of groups does router transformation contains?",
    answer: (
      <div>
        <ul className="list-disc pl-5 mt-2">
          <li>Input group</li>
          <li>Output group (User-defined groups and Default group)</li>
        </ul>
      </div>
    ),
    category: "Transformations"
  },
  {
    id: 65,
    question: "How do you differentiate stop and abort options in a workflow monitor?",
    answer: (
      <div>
        <ul className="list-disc pl-5 mt-2">
          <li>Stop allows other tasks to run while abort turns off the task completely</li>
          <li>Stop processes data to targets while abort waits for services to complete</li>
          <li>Stop shares resources while abort terminates session</li>
        </ul>
      </div>
    ),
    category: "Workflow"
  },
  {
    id: 66,
    question: "Is it possible to store previous session logs in Informatica?",
    answer: (
      <div>
        <p>Yes, by setting session properties:</p>
        <ul className="list-disc pl-5 mt-2">
          <li>Save session log by: SessionRuns</li>
          <li>Save session log for these runs: Set number of log files to save</li>
          <li>Or use Session TimeStamp to save all log files</li>
        </ul>
      </div>
    ),
    category: "Administration"
  },
  {
    id: 67,
    question: "What do you know about Data-Driven sessions?",
    answer: (
      <div>
        <p>Property that decides how data performs when mapping includes Update strategy transformation. Executed using DD_INSERT, DD_DELETE or DD_UPDATE in update strategy.</p>
      </div>
    ),
    category: "Mappings"
  },
  {
    id: 68,
    question: "What is a Mapplet in Informatica?",
    answer: (
      <div>
        <p>Reusable data object created in Mapplet designer containing collection of transformations that can be reused in different mappings.</p>
      </div>
    ),
    category: "Mappings"
  },
  {
    id: 69,
    question: "What is the difference between Mapping and Mapplet?",
    answer: (
      <div>
        <ul className="list-disc pl-5 mt-2">
          <li>Mapping includes sources, targets while Mapplet is collection of transformations</li>
          <li>Mappings are not reusable while Mapplets are reusable</li>
        </ul>
      </div>
    ),
    category: "Mappings"
  },
  {
    id: 70,
    question: "List the transformations used for SQL override.",
    answer: (
      <div>
        <ul className="list-disc pl-5 mt-2">
          <li>Source Qualifier</li>
          <li>Lookup</li>
          <li>Target</li>
        </ul>
      </div>
    ),
    category: "Transformations"
  },
  {
    id: 71,
    question: "State the differences between SQL override and Lookup override.",
    answer: (
      <div>
        <ul className="list-disc pl-5 mt-2">
          <li>SQL override limits rows entering pipeline while Lookup override limits lookup rows</li>
          <li>SQL supports any join while Lookup supports only Non-Equi joins</li>
        </ul>
      </div>
    ),
    category: "Transformations"
  },
  {
    id: 72,
    question: "What is a shared cache?",
    answer: (
      <div>
        <p>Static lookup cache shared by multiple lookup transformations in mapping to reduce cache building time.</p>
      </div>
    ),
    category: "Transformations"
  },
  {
    id: 73,
    question: "Explain code page compatibility.",
    answer: (
      <div>
        <p>Compatibility between code pages used for accurate data movement in Unicode mode. No data loss if code pages are identical or one is subset/superset of another.</p>
      </div>
    ),
    category: "Administration"
  },
  {
    id: 74,
    question: "Define Expression transformation?",
    answer: (
      <div>
        <p>Passive transformation for non-aggregate calculations on single row. Used to test data before passing to target using conditional statements.</p>
      </div>
    ),
    category: "Transformations"
  },
  {
    id: 75,
    question: "What is Aggregator transformation?",
    answer: (
      <div>
        <p>Active transformation for calculations like sum, average over group of rows. Stores estimates in aggregator cache memory.</p>
      </div>
    ),
    category: "Transformations"
  },
  {
    id: 76,
    question: "What do you know about filter transformation?",
    answer: (
      <div>
        <p>Active transformation that changes number of rows based on filter conditions, dropping rows that don't meet requirements.</p>
      </div>
    ),
    category: "Transformations"
  },
  {
    id: 77,
    question: "Why is union transformation active?",
    answer: (
      <div>
        <p>Because it combines multiple data streams into one, changing the data flow. While total rows remain same, position of rows may change.</p>
      </div>
    ),
    category: "Transformations"
  },
  {
    id: 78,
    question: "What is the use of incremental aggregation in Informatica?",
    answer: (
      <div>
        <p>Captures source changes for aggregating calculations, allowing incremental target updates rather than recalculating all data each session run.</p>
      </div>
    ),
    category: "Performance"
  },
  {
    id: 79,
    question: "What does reusable transformation mean?",
    answer: (
      <div>
        <p>Transformation used multiple times in mappings. Changes to reusable transformation reflect in all instances, potentially invalidating mappings.</p>
      </div>
    ),
    category: "Transformations"
  },
  {
    id: 80,
    question: "How does update strategy work in Informatica?",
    answer: (
      <div>
        <p>Active connected transformation that allows insert, delete or update records in target table and restricts files from reaching target.</p>
      </div>
    ),
    category: "Transformations"
  },
  {
    id: 81,
    question: "Differentiate Informatica and Datastage.",
    answer: (
      <div>
        <ul className="list-disc pl-5 mt-2">
          <li>Informatica has service-oriented architecture while Datastage has client-server</li>
          <li>Informatica has dynamic partitioning, Datastage has static</li>
          <li>Informatica supports flat-file lookups, Datastage supports hash files</li>
        </ul>
      </div>
    ),
    category: "Overview"
  },
  {
    id: 82,
    question: "Explain transaction control transformation.",
    answer: (
      <div>
        <p>Active connected transformation that allows committing or rollbacking transactions during mapping execution using built-in variables like TC_COMMIT_BEFORE, TC_ROLLBACK_AFTER etc.</p>
      </div>
    ),
    category: "Transformations"
  },
  {
  id: 83,
  question: "What is a reusable session?",
  answer: <p>A session configuration that can be shared across multiple workflows. Changes made to it automatically apply to all workflows using it.</p>,
  category: "Workflow"
},
{
  id: 84,
  question: "How to handle NULL values in expressions?",
  answer: <p>Use ISNULL() or IIF() functions to check for NULLs. You can also set default values in target definitions to replace NULLs.</p>,
  category: "Transformations"
},
{
  id: 85,
  question: "What is constraint-based loading?",
  answer: <p>Loading method where target tables are loaded based on their primary/foreign key relationships. Parent tables load before child tables.</p>,
  category: "Mappings"
},
{
  id: 86,
  question: "What is a persistent cache?",
  answer: <p>A lookup cache that gets saved to disk after session runs. Subsequent sessions can reuse this cache to improve performance.</p>,
  category: "Performance"
},
{
  id: 87,
  question: "What is a pre-session command?",
  answer: <p>A shell command or script that runs before the session starts. Often used for file cleanup or preparation tasks.</p>,
  category: "Workflow"
},
{
  id: 88,
  question: "What is a worklet?",
  answer: <p>A reusable group of tasks that can be added to multiple workflows. Similar to a subroutine in programming.</p>,
  category: "Workflow"
},
{
  id: 89,
  question: "What is the stop-on-errors property?",
  answer: <p>Defines how many errors a session can encounter before stopping. Helps prevent processing bad data.</p>,
  category: "Error Handling"
},
{
  id: 90,
  question: "What is a target load plan?",
  answer: <p>Controls the loading sequence of multiple targets in a mapping. Overrides default loading order.</p>,
  category: "Mappings"
},
{
  id: 91,
  question: "What is a source filter?",
  answer: <p>A condition added to Source Qualifier to limit extracted data. Reduces data volume early in pipeline.</p>,
  category: "Mappings"
},
{
  id: 92,
  question: "What is a stored procedure transformation?",
  answer: <p>Calls database stored procedures during mapping. Can be used for complex logic or data validation.</p>,
  category: "Transformations"
},
{
  id: 93,
  question: "What is a transaction control transformation?",
  answer: <p>Manages commit/rollback points during mapping. Useful for batching large transactions.</p>,
  category: "Transformations"
},
{
  id: 94,
  question: "What is a union transformation?",
  answer: <p>Merges data from multiple pipelines into single output. All input pipelines must have matching metadata.</p>,
  category: "Transformations"
},
{
  id: 95,
  question: "What is a joiner transformation?",
  answer: <p>Combines data from heterogeneous sources using join conditions. Slower than Source Qualifier joins.</p>,
  category: "Transformations"
},
{
  id: 96,
  question: "What is a router transformation?",
  answer: <p>Routes data to different outputs based on conditions. More flexible than Filter transformation.</p>,
  category: "Transformations"
},
{
  id: 97,
  question: "What is a sequence generator?",
  answer: <p>Generates numeric sequences like IDs. Can be cyclic or non-cyclic.</p>,
  category: "Transformations"
},
{
  id: 98,
  question: "What is a normalizer transformation?",
  answer: <p>Converts COBOL/VSAM data to relational format. Handles array/occurs clauses in source data.</p>,
  category: "Transformations"
},
{
  id: 99,
  question: "What is a pushdown optimization?",
  answer: <p>Pushes transformation logic to source database. Improves performance by leveraging database power.</p>,
  category: "Performance"
},
{
  id: 100,
  question: "What is a grid in PowerCenter?",
  answer: <p>Multiple nodes that process sessions in parallel. Provides load balancing and high availability.</p>,
  category: "Architecture"
},
{
  id: 101,
  question: "What is a node in PowerCenter?",
  answer: <p>A server in the grid that processes workflow tasks. Multiple nodes work together in a domain.</p>,
  category: "Architecture"
},
{
  id: 102,
  question: "What is a domain?",
  answer: <p>Central management unit for PowerCenter services. Contains nodes, services, and security configurations.</p>,
  category: "Architecture"
},
{
  id: 103,
  question: "What is a repository service?",
  answer: <p>Manages metadata in the repository. Handles all metadata requests from clients.</p>,
  category: "Architecture"
},
{
  id: 104,
  question: "What is an integration service?",
  answer: <p>Executes workflows and sessions. Can run on grid for distributed processing.</p>,
  category: "Architecture"
},
{
  id: 105,
  question: "What is a workflow manager?",
  answer: <p>Client tool for creating workflows, sessions, and scheduling. Part of PowerCenter Designer client.</p>,
  category: "Administration"
},
{
  id: 106,
  question: "What is a workflow monitor?",
  answer: <p>Client tool for monitoring running workflows. Shows real-time statistics and logs.</p>,
  category: "Administration"
},
{
  id: 107,
  question: "What is pmcmd?",
  answer: <p>Command line utility for workflow operations. Can start/stop workflows and get status.</p>,
  category: "Administration"
},
{
  id: 108,
  question: "What is a deployment group?",
  answer: <p>Collection of objects migrated together between environments. Simplifies promotion process.</p>,
  category: "Administration"
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
          108 Informatica Power center Interview Q&A in Simple Words – 2025 Edition
        </h1>

        <div className="inline-block bg-blue-700 text-white text-lg font-medium px-6 py-3 rounded-xl shadow-lg">
             💡 Learn Informatica Power center from scratch – Practical, real-life questions with clear answers<br />
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