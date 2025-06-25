// app/page.tsx (or wherever you want to place this)

import React from "react";

const questionsAnswers = [
  {
    question: "What is Informatica Intelligent Cloud Services (IICS)?",
    answer:
      "Informatica Intelligent Cloud Services (IICS) is a cloud-native data integration platform designed to streamline the extraction, transformation, and loading (ETL) processes between different systems and applications.",
  },
  {
    question: "Explain the fundamental parts that constitute Informatica IICS.",
    answer:
      "Informatica IICS consists of several components, including Cloud Data Integration, Cloud Application Integration, Cloud B2B Gateway, Cloud API Integration, and Cloud Data Quality.",
  },
  {
    question: "What are the benefits of using Informatica IICS over traditional on-premises ETL tools?",
    answer:
      "Some benefits include cost-effectiveness, scalability, flexibility, easy collaboration, automated upgrades, and reduced maintenance efforts.",
  },
  {
    question: "How can you create a new task in Informatica IICS?",
    answer:
      'Tasks can be created using the "Designer" section by defining the source, target, transformations, and other settings, then saving and executing the task.',
  },
  {
    question:
      "Explain the differences between a mapping and a task in Informatica IICS.",
    answer:
      "A mapping defines the ETL logic and transformations, whereas a task is a workflow that executes one or more mappings.",
  },
  {
    question: "What is a connection in Informatica IICS?",
    answer:
      "A connection represents the details required to access a data source or target, such as database connection details, API endpoints, etc.",
  },
  {
    question: 'What is the purpose of the "Data Synchronization" task in Informatica IICS?',
    answer:
      "The Data Synchronization task ensures that data between a source and a target remains synchronized by comparing and updating changes.",
  },
  {
    question: "How can you handle errors in Informatica IICS?",
    answer:
      "Informatica IICS provides error handling options such as error logging, error actions, and conditional task execution based on errors encountered during a workflow run.",
  },
  {
    question: "How does Informatica IICS ensure data security and compliance?",
    answer:
      "Informatica IICS offers features like data encryption, role-based access controls, and compliance with industry regulations like GDPR and HIPAA.",
  },
  {
    question: "Explain the concept of mappings in Informatica IICS.",
    answer:
      "Mappings are visual representations of ETL logic, where data is transformed from source to target using various transformations like filtering, aggregation, and lookups.",
  },
  // ... you can add the rest similarly or split into multiple pages if too long
];

export default function Page() {
  return (
    <main className="max-w-4xl mx-auto p-6 font-sans text-gray-900">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold mb-2">
          508 IICS / IDMC Cloud Interview Questions & Answers
        </h1>
        <p className="text-lg font-medium text-indigo-600 mb-1">
          Crack the Next Interview!!
        </p>
        <p className="mb-3 text-gray-700">
          We are committed to help & guide everyone to get software jobs easily!
        </p>
        <p className="text-sm text-gray-600">
          <strong>Visit: </strong>
          <a
            href="https://www.rishabinformaticagroup.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 underline"
          >
            www.rishabinformaticagroup.com
          </a>
          <br />
          <strong>Call/WhatsApp:</strong> 8970853557 / 9448005273
        </p>
      </header>

      <section>
        {questionsAnswers.map(({ question, answer }, index) => (
          <article
            key={index}
            className="mb-6 border-b border-gray-300 pb-4"
            itemScope
            itemType="https://schema.org/Question"
          >
            <h2
              className="text-xl font-semibold text-indigo-800 mb-2"
              itemProp="name"
            >
              {index + 1}. {question}
            </h2>
            <p
              className="text-gray-800 pl-4"
              itemScope
              itemProp="acceptedAnswer"
              itemType="https://schema.org/Answer"
            >
              <span itemProp="text">{answer}</span>
            </p>
          </article>
        ))}
      </section>

      <footer className="mt-12 text-center text-gray-600 text-sm">
        &copy; {new Date().getFullYear()} Rishab Informatica Group. All rights
        reserved.
      </footer>
    </main>
  );
}
