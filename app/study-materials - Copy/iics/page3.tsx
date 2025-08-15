// app/study-materials/sql/page.tsx
import styles from './sql-guide.module.css';

export default function SQLLanguagesPage() {
  return (
    <div className={styles.container}>
      {/* Header Section */}
      <header className={styles.header}>
        <h1 className={styles.title}>SQL BASICS</h1>
        <h2 className={styles.subtitle}>5 DIFFERENT LANGUAGES IN SQL</h2>
        <div className={styles.contactInfo}>
          <p>CALL/WHATSAPP - 8970853557 / 9448005273</p>
          <p>INFORMATICA IICS COMBO ONLINE TRAINING</p>
        </div>
      </header>

      {/* Quick Navigation */}
      <nav className={styles.dataTypes}>
        <strong>Jump to:</strong>
        <ul className={styles.commandList}>
          <li><a href="#ddl">DDL</a></li>
          <li><a href="#dml">DML</a></li>
          <li><a href="#drl">DRL</a></li>
          <li><a href="#tcl">TCL</a></li>
          <li><a href="#dcl">DCL</a></li>
        </ul>
      </nav>

      {/* Data Types Section */}
      <section className={styles.dataTypes}>
        <h3>DATA TYPES (Like Different Box Types for Storage)</h3>
        <ul>
          <li><span className={styles.dataType}>NUMBER</span> - Used for numeric fields, such as <em>MOBILE_NO</em>. Ideal for storing whole numbers like phone numbers or quantities.</li>
          <li><span className={styles.dataType}>VARCHAR2</span> - Stores variable-length character data, such as <em>CUSTOMER NAME</em>. Useful for names, email IDs, etc.</li>
          <li><span className={styles.dataType}>DATE</span> - Used to store date values, like <em>Date of Birth</em> or <em>Project Start Date</em>. Stores complete date info including year, month, and day.</li>
        </ul>
      </section>

      {/* 1. DDL Section */}
      <section id="ddl" className={`${styles.sqlSection} ${styles.ddl}`}>
        <h2>1. DDL – Building the Database (CART-D)</h2>
        <p>DDL (Data Definition Language) is used to define, alter, and manage the structure of database objects such as tables, views, and indexes.</p>

        <div>
          <h3>CREATE TABLE (Building a New Storage Cabinet)</h3>
          <pre className={styles.sqlCode}>
            <code>
{`CREATE TABLE CLIENTS
(
  CLIENT_ID NUMBER(5),
  CLIENT_NAME VARCHAR2(30),
  DATE_OF_PROJECT DATE,
  MOBILE_NO NUMBER(10)
);`}
            </code>
          </pre>
          <p className={styles.explanation}>
            This statement defines a new table named <strong>CLIENTS</strong> with the following structure:
            <ul>
              <li><strong>CLIENT_ID</strong>: Stores numeric IDs up to 5 digits</li>
              <li><strong>CLIENT_NAME</strong>: Stores names up to 30 characters</li>
              <li><strong>DATE_OF_PROJECT</strong>: Stores the project start date</li>
              <li><strong>MOBILE_NO</strong>: Stores 10-digit contact numbers</li>
            </ul>
          </p>
        </div>

        <div>
          <h3>ALTER TABLE (Modifying Cabinet Structure)</h3>

          <h4>Adding a New Shelf (Column):</h4>
          <pre className={styles.sqlCode}>
            <code>
{`ALTER TABLE CLIENTS
ADD COUNTRY VARCHAR2(10);`}
            </code>
          </pre>
          <p className={styles.explanation}>
            This adds a new column <strong>COUNTRY</strong> to the existing table, allowing storage of country names or codes up to 10 characters.
          </p>

          <h4>Expanding Shelf Size (Modifying Column):</h4>
          <pre className={styles.sqlCode}>
            <code>
{`-- First attempt fails (number too big)
INSERT INTO CLIENTS
VALUES(102,'HARI',TO_DATE('06/03/2021','MM/DD/YYYY'),944800525812,'INDIA');

-- Then we modify the column
ALTER TABLE CLIENTS
MODIFY MOBILE_NO NUMBER(15);

-- Now it works
INSERT INTO CLIENTS
VALUES(102,'HARI',TO_DATE('06/03/2021','MM/DD/YYYY'),944800525812,'INDIA');`}
            </code>
          </pre>
          <p className={styles.explanation}>
            Initially, inserting a 12-digit number fails due to column limit. After modifying <strong>MOBILE_NO</strong> to accept 15 digits, the same data inserts successfully.
          </p>

          <h4>Renaming a Shelf (Column):</h4>
          <pre className={styles.sqlCode}>
            <code>
{`ALTER TABLE CLIENTS
RENAME COLUMN MOBILE_NO TO CONTACT_NO;`}
            </code>
          </pre>
          <p className={styles.explanation}>
            Renames the column <strong>MOBILE_NO</strong> to <strong>CONTACT_NO</strong>. The data remains unchanged.
          </p>

          <h4>Removing a Shelf (Column):</h4>
          <pre className={styles.sqlCode}>
            <code>
{`ALTER TABLE CLIENTS
DROP COLUMN COUNTRY;`}
            </code>
          </pre>
          <p className={styles.explanation}>
            Deletes the <strong>COUNTRY</strong> column permanently. All associated data will be lost.
          </p>
        </div>

        <div>
          <h3>RENAME TABLE (Changing Cabinet Label)</h3>
          <pre className={styles.sqlCode}>
            <code>
{`RENAME CLIENTS TO NEW_CLIENTS;`}
            </code>
          </pre>
          <p className={styles.explanation}>
            Renames the entire table from <strong>CLIENTS</strong> to <strong>NEW_CLIENTS</strong>. Table structure and data remain intact.
          </p>
        </div>

        <div>
          <h3>TRUNCATE TABLE (Emptying the Cabinet)</h3>
          <pre className={styles.sqlCode}>
            <code>
{`TRUNCATE TABLE NEW_CLIENTS;`}
            </code>
          </pre>
          <p className={styles.explanation}>
            Removes all rows from the table instantly without logging individual row deletions. Useful for quickly resetting test data.
          </p>
        </div>

        <div>
          <h3>DROP TABLE (Removing the Entire Cabinet)</h3>
          <pre className={styles.sqlCode}>
            <code>
{`DROP TABLE NEW_CLIENTS;`}
            </code>
          </pre>
          <p className={styles.explanation}>
            Deletes the entire table structure and all data permanently. This action is irreversible.
          </p>
        </div>
      </section>

      {/* 2. DML Section */}
      <section id="dml" className={`${styles.sqlSection} ${styles.dml}`}>/* YOUR ORIGINAL DML CONTENT HERE */</section>

      {/* 3. DRL Section */}
      <section id="drl" className={`${styles.sqlSection} ${styles.drl}`}>/* YOUR ORIGINAL DRL CONTENT HERE */</section>

      {/* 4. TCL Section */}
      <section id="tcl" className={`${styles.sqlSection} ${styles.tcl}`}>/* YOUR ORIGINAL TCL CONTENT HERE */</section>

      {/* 5. DCL Section */}
      <section id="dcl" className={`${styles.sqlSection} ${styles.dcl}`}>/* YOUR ORIGINAL DCL CONTENT HERE */</section>

      {/* Summary Table */}
      <section className={styles.dataTypes}>
        <h3>Summary – SQL Language Types</h3>
        <table>
          <thead>
            <tr>
              <th>Language</th>
              <th>Purpose</th>
              <th>Commands</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>DDL</td><td>Structure definition</td><td>CREATE, ALTER, DROP</td></tr>
            <tr><td>DML</td><td>Data manipulation</td><td>INSERT, UPDATE, DELETE</td></tr>
            <tr><td>DRL</td><td>Data retrieval</td><td>SELECT</td></tr>
            <tr><td>TCL</td><td>Transaction control</td><td>COMMIT, ROLLBACK</td></tr>
            <tr><td>DCL</td><td>Permission control</td><td>GRANT, REVOKE</td></tr>
          </tbody>
        </table>
      </section>
    </div>
  );
}
