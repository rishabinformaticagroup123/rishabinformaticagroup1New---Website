import React from "react";

const SQLLanguagesPage = () => {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6 text-base leading-relaxed">
      <h1 className="text-3xl font-bold text-center text-blue-700">5 Different Languages in SQL</h1>
      <p className="text-center text-sm text-gray-600">CALL / WHATSAPP - 8970853557 / 9448005273</p>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">📚 SQL Data Types</h2>
        <ul className="list-disc list-inside">
          <li><strong>NUMBER</strong> – MOBILE_NO</li>
          <li><strong>VARCHAR2</strong> – NAME OF THE CUSTOMER</li>
          <li><strong>DATE</strong> – DOB, DOJ, DOP</li>
        </ul>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-blue-700">1. DDL – Data Definition Language (CART-D)</h2>
        <p>Includes:</p>
        <ul className="list-disc list-inside">
          <li>Create</li>
          <li>Alter</li>
          <li>Rename</li>
          <li>Truncate</li>
          <li>Drop</li>
        </ul>

        <div>
          <h3 className="font-semibold">CREATE TABLE</h3>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
CREATE TABLE CLIENTS (
  CLIENT_ID NUMBER(5),
  CLIENT_NAME VARCHAR2(30),
  DATE_OF_PROJECT DATE,
  MOBILE_NO NUMBER(10)
);</pre>
          <p>Query to fetch data:</p>
          <code className="block bg-gray-100 p-2 rounded">SELECT * FROM CLIENTS;</code>
        </div>

        <div>
          <h3 className="font-semibold">INSERT INTO</h3>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
INSERT INTO CLIENTS VALUES(100, 'KRISHNAN', TO_DATE('03/02/2022', 'MM/DD/YYYY'), 9742604296);
INSERT INTO CLIENTS VALUES(101, 'RISHAB', TO_DATE('05/03/2022', 'MM/DD/YYYY'), 9448005255);
INSERT INTO CLIENTS VALUES(102, 'HARI', TO_DATE('06/03/2021', 'MM/DD/YYYY'), 9448005258);</pre>
        </div>

        <div>
          <h3 className="font-semibold">ALTER TABLE</h3>
          <ul className="list-disc list-inside">
            <li><strong>Adding a column:</strong>
              <pre className="bg-gray-100 p-2 rounded">ALTER TABLE CLIENTS ADD COUNTRY VARCHAR2(10);</pre>
            </li>
            <li><strong>Modifying column datatype/length:</strong>
              <pre className="bg-gray-100 p-2 rounded">ALTER TABLE CLIENTS MODIFY MOBILE_NO NUMBER(15);</pre>
            </li>
            <li><strong>Renaming a column:</strong>
              <pre className="bg-gray-100 p-2 rounded">ALTER TABLE CLIENTS RENAME COLUMN MOBILE_NO TO CONTACT_NO;</pre>
            </li>
            <li><strong>Dropping a column:</strong>
              <pre className="bg-gray-100 p-2 rounded">ALTER TABLE CLIENTS DROP COLUMN COUNTRY;</pre>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold">RENAME TABLE</h3>
          <pre className="bg-gray-100 p-2 rounded">RENAME CLIENTS TO NEW_CLIENTS;</pre>
        </div>

        <div>
          <h3 className="font-semibold">TRUNCATE TABLE</h3>
          <pre className="bg-gray-100 p-2 rounded">TRUNCATE TABLE NEW_CLIENTS;</pre>
        </div>

        <div>
          <h3 className="font-semibold">DROP TABLE</h3>
          <pre className="bg-gray-100 p-2 rounded">DROP TABLE NEW_CLIENTS;</pre>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-green-700">2. DML – Data Manipulation Language (IDUME)</h2>
        <ul className="list-disc list-inside">
          <li>Insert</li>
          <li>Delete</li>
          <li>Update</li>
          <li>Merge</li>
        </ul>

        <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
DELETE FROM CLIENTS WHERE CLIENT_ID = 101;

UPDATE CLIENTS SET MOBILE_NO = 9448005273 WHERE CLIENT_ID = 100;
UPDATE CLIENTS SET CLIENT_NAME = 'HARI' WHERE CLIENT_ID = 100;</pre>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-indigo-700">3. DRL – Data Retrieval Language</h2>
        <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">SELECT * FROM CLIENTS;</pre>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-yellow-700">4. TCL – Transaction Control Language</h2>
        <ul className="list-disc list-inside">
          <li>COMMIT;</li>
          <li>ROLLBACK;</li>
        </ul>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold text-red-700">5. DCL – Data Control Language</h2>
        <p>(Can be added with examples like GRANT and REVOKE if needed.)</p>
      </section>

      <div className="text-center mt-12">
        <a href="/study-material/sql" className="text-blue-600 underline font-semibold">← Back to SQL Study Material</a>
      </div>
    </div>
  );
};

export default SQLLanguagesPage;
