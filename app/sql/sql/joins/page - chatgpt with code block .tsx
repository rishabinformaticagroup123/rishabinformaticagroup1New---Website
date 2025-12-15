import React from "react";
import Image from "next/image";
import { CodeBlock } from "@/components/ui/codeblock";

const joinsImage = "/images/sql-joins-diagram.png"; // Add a diagram image in public folder with this name

const SQLJoinsPage = () => {
  return (
    <div className="p-6 bg-white text-gray-800">
      <h1 className="text-3xl font-bold mb-4">SQL Joins – Complete Guide</h1>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">What is Join? Why Join in Real Time?</h2>
        <p className="mb-2">
          Joins are used to combine rows from two or more tables, based on a related column. In real-time databases, records are split into multiple related tables to avoid redundancy and save space.
        </p>
        <p>
          Example:
          Students → Coordinators, Address, Countries<br/>
          Employees → Departments, Locations, Countries<br/>
          Customers → Verticals, Products, Models
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Types of Joins</h2>
        <Image src={joinsImage} alt="SQL Joins Diagram" width={700} height={400} className="mb-4" />
        <ul className="list-disc list-inside space-y-1">
          <li>Inner Join – Only matching records</li>
          <li>Left Join – All from left, matched from right</li>
          <li>Right Join – All from right, matched from left</li>
          <li>Full Outer Join – All records from both sides</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Join Methods in SQL</h2>
        <ul className="list-disc list-inside">
          <li>Implicit Join</li>
          <li>ANSI Join (Standard Method)</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Join Types – SQL vs Informatica Comparison</h2>
        <table className="table-auto w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">SQL Join</th>
              <th className="border px-4 py-2">Informatica Join</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">INNER JOIN</td>
              <td className="border px-4 py-2">NORMAL JOIN</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">LEFT OUTER JOIN</td>
              <td className="border px-4 py-2">MASTER OUTER JOIN</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">RIGHT OUTER JOIN</td>
              <td className="border px-4 py-2">DETAIL OUTER JOIN</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">FULL OUTER JOIN</td>
              <td className="border px-4 py-2">FULL OUTER JOIN</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Examples – Step-by-Step</h2>

        <h3 className="text-xl font-semibold mb-2">🔹 Implicit Method – INNER JOIN</h3>
        <CodeBlock code={`SELECT S.STUDENT_ID, S.FIRST_NAME, S.EMAIL, S.STIPEND, C.COORDINATOR_NAME, C.LOCATION_ID FROM STUDENTS S, COORDINATORS C WHERE S.COORDINATOR_ID = C.COORDINATOR_ID;`} />

        <h3 className="text-xl font-semibold mt-4">🔹 ANSI Method – INNER JOIN</h3>
        <CodeBlock code={`SELECT S.STUDENT_ID, S.FIRST_NAME, S.STIPEND, C.COORDINATOR_NAME, C.LOCATION_ID FROM STUDENTS S JOIN COORDINATORS C ON S.COORDINATOR_ID = C.COORDINATOR_ID;`} />

        <h3 className="text-xl font-semibold mt-4">🔹 Implicit Method – LEFT OUTER JOIN</h3>
        <CodeBlock code={`SELECT S.STUDENT_ID, S.FIRST_NAME, S.EMAIL, S.STIPEND, C.COORDINATOR_NAME, C.LOCATION_ID FROM STUDENTS S, COORDINATORS C WHERE S.COORDINATOR_ID = C.COORDINATOR_ID(+);`} />

        <h3 className="text-xl font-semibold mt-4">🔹 ANSI Method – LEFT OUTER JOIN</h3>
        <CodeBlock code={`SELECT S.STUDENT_ID, S.FIRST_NAME, S.STIPEND, C.COORDINATOR_NAME, C.LOCATION_ID FROM STUDENTS S LEFT JOIN COORDINATORS C ON S.COORDINATOR_ID = C.COORDINATOR_ID;`} />

        <h3 className="text-xl font-semibold mt-4">🔹 Implicit Method – RIGHT OUTER JOIN</h3>
        <CodeBlock code={`SELECT S.STUDENT_ID, S.FIRST_NAME, S.EMAIL, S.STIPEND, C.COORDINATOR_NAME, C.LOCATION_ID FROM STUDENTS S, COORDINATORS C WHERE S.COORDINATOR_ID(+) = C.COORDINATOR_ID;`} />

        <h3 className="text-xl font-semibold mt-4">🔹 ANSI Method – RIGHT OUTER JOIN</h3>
        <CodeBlock code={`SELECT S.STUDENT_ID, S.FIRST_NAME, S.STIPEND, C.COORDINATOR_NAME, C.LOCATION_ID FROM STUDENTS S RIGHT JOIN COORDINATORS C ON S.COORDINATOR_ID = C.COORDINATOR_ID;`} />

        <h3 className="text-xl font-semibold mt-4">🔹 Full Outer Join – ANSI Method</h3>
        <CodeBlock code={`SELECT S.STUDENT_ID, S.FIRST_NAME, S.STIPEND, C.COORDINATOR_NAME, C.LOCATION_ID FROM STUDENTS S FULL JOIN COORDINATORS C ON S.COORDINATOR_ID = C.COORDINATOR_ID;`} />

        <h3 className="text-xl font-semibold mt-4">🔹 Full Outer Join – Implicit Workaround</h3>
        <CodeBlock code={`SELECT S.STUDENT_ID, S.FIRST_NAME, S.EMAIL, S.STIPEND, C.COORDINATOR_NAME, C.LOCATION_ID FROM STUDENTS S, COORDINATORS C WHERE S.COORDINATOR_ID = C.COORDINATOR_ID(+) UNION SELECT S.STUDENT_ID, S.FIRST_NAME, S.EMAIL, S.STIPEND, C.COORDINATOR_NAME, C.LOCATION_ID FROM STUDENTS S, COORDINATORS C WHERE S.COORDINATOR_ID(+) = C.COORDINATOR_ID;`} />

        <h3 className="text-xl font-semibold mt-6">🔹 Join with 3 Tables</h3>
        <CodeBlock code={`SELECT S.STUDENT_ID, S.FIRST_NAME, S.EMAIL, S.STIPEND, C.COORDINATOR_NAME, C.LOCATION_ID, A.COUNTRY_ID FROM STUDENTS S, COORDINATORS C, ADDRESS A WHERE S.COORDINATOR_ID = C.COORDINATOR_ID AND C.LOCATION_ID = A.LOCATION_ID;`} />

        <h3 className="text-xl font-semibold mt-4">🔹 3 Tables + Filter for UK Country</h3>
        <CodeBlock code={`SELECT S.STUDENT_ID, S.FIRST_NAME, S.EMAIL, S.STIPEND, C.COORDINATOR_NAME, C.LOCATION_ID, A.COUNTRY_ID FROM STUDENTS S, COORDINATORS C, ADDRESS A WHERE S.COORDINATOR_ID = C.COORDINATOR_ID AND C.LOCATION_ID = A.LOCATION_ID AND A.COUNTRY_ID = 'UK';`} />
      </section>
    </div>
  );
};

export default SQLJoinsPage;
