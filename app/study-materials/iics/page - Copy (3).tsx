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
        <p>IICS supports various cloud and on-premise connectors:</p> {/* Added introductory sentence for clarity */}
        <ul className="list-disc pl-5 mt-2">
          <li>Relational connectors like Oracle, SQL Server, ODBC, Teradata.</li> {/* Added period for consistency */}
          <li>Cloud connectors for apps like Salesforce, Snowflake, AWS.</li>
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
          <li>Using the Salesforce Connector in IICS.</li> {/* Added period for consistency */}
          <li>Using the Salesforce Data Loader tool.</li> {/* Added article “the” */}
          <li>Using Salesforce Bulk API.</li>
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
          <li>Data quality issues when integrating multiple sources.</li>
          <li>Complex transformations to match target schemas.</li>
          <li>Handling data dependencies and load order.</li>
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
          <li>Delimited text files (CSV, TSV).</li>
          <li>XML files.</li>
          <li>JSON files.</li>
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
          <li>Proven and robust ETL platform with decades of experience.</li>
          <li>Highly configurable and flexible deployments.</li>
          <li>Extensive support and training resources.</li>
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
          <li>Data synchronization.</li>
          <li>Data replication.</li>
          <li>Mapping and transformation.</li>
          <li>Monitoring and logging.</li>
          <li>System maintenance tasks.</li>
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
          <li><strong>Data Integration:</strong> Combining data from multiple sources for unified reporting and analytics.</li> {/* Added “and” for smoothness */}
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
          <li><strong>PaaS:</strong> Platform as a Service – provides OS, DBMS, and development tools to build applications.</li> {/* Expanded “dev tools” */}
          <li><strong>SaaS:</strong> Software as a Service – provides fully managed applications (e.g., Gmail, Salesforce).</li> {/* Expanded “apps” */}
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
          <li><strong>Informatica-hosted Agent:</strong> Managed by Informatica in the cloud.</li> {/* Added colon for consistency */}
          <li><strong>Secure Agent:</strong> Installed on-premises or cloud to handle local tasks securely.</li>
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
          Metadata in IICS is stored in Informatica's cloud repository. It is managed by Informatica and not accessible to users for direct manipulation.
        </p>
      </div>
    ),
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
];

const InterviewQA: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...Array.from(new Set(interviewData.map(qa => qa.category)))];

  const filteredData = interviewData.filter(qa => {
    const matchesSearch = 
      qa.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      React.isValidElement(qa.answer) 
        ? qa.answer.props.children.toString().toLowerCase().includes(searchTerm.toLowerCase())
        : false;
    
    const matchesCategory = 
      selectedCategory === "All" || qa.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="sticky top-0 bg-white py-4 z-50 shadow-sm">
        <h1 className="text-3xl font-bold mb-4">Informatica IICS Interview Q&A</h1>
        
        <div className="flex flex-col md:flex-row gap-4 mb-4">
          <input
            type="text"
            placeholder="Search questions..."
            className="w-full p-2 border rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <select
            className="w-full md:w-48 p-2 border rounded"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

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

      {filteredData.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No questions match your search criteria.
        </div>
      )}
    </div>
  );
};

export default InterviewQA;