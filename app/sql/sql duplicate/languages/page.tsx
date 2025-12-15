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

      {/* Data Types Section */}
      <section className={styles.dataTypes}>
        <h3>DATA TYPES (Like Different Box Types for Storage)</h3>
        <ul>
          <li><span className={styles.dataType}>NUMBER</span> - For numeric values like <em>MOBILE_NO</em> (stores phone numbers)</li>
          <li><span className={styles.dataType}>VARCHAR2</span> - For text like <em>NAME OF THE CUSTOMER</em> (stores names up to specified length)</li>
          <li><span className={styles.dataType}>DATE</span> - For dates like <em>DOB, DOJ, DOP</em> (stores dates with day/month/year)</li>
        </ul>
      </section>

      {/* 1. DDL Section */}
      <section className={`${styles.sqlSection} ${styles.ddl}`}>
        <h2>1. DDL – Building the Database (CART-D)</h2>
        <p>These commands help create and modify the database structure.</p>
        
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
            Creates a new table called CLIENTS with:
            <ul>
              <li>CLIENT_ID: Number up to 5 digits</li>
              <li>CLIENT_NAME: Text up to 30 characters</li>
              <li>DATE_OF_PROJECT: Date field</li>
              <li>MOBILE_NO: 10-digit phone number</li>
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
            Adds a new column to store country codes (up to 10 characters) to existing client records.
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
            Shows how we first tried to insert a 12-digit number into a 10-digit field (failed), 
            then expanded the field size to 15 digits, and successfully inserted the record.
          </p>
          
          <h4>Renaming a Shelf (Column):</h4>
          <pre className={styles.sqlCode}>
            <code>
{`ALTER TABLE CLIENTS
RENAME COLUMN MOBILE_NO TO CONTACT_NO;`}
            </code>
          </pre>
          <p className={styles.explanation}>
            Changes the column name from MOBILE_NO to CONTACT_NO without affecting the data.
          </p>
          
          <h4>Removing a Shelf (Column):</h4>
          <pre className={styles.sqlCode}>
            <code>
{`ALTER TABLE CLIENTS
DROP COLUMN COUNTRY;`}
            </code>
          </pre>
          <p className={styles.explanation}>
            Permanently removes the COUNTRY column and all its data from the table.
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
            Changes the table name from CLIENTS to NEW_CLIENTS. All data remains intact.
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
            Removes ALL data from the table but keeps the empty structure (columns remain).
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
            Completely deletes the table and all its data. Cannot be undone!
          </p>
        </div>
      </section>

      {/* 2. DML Section */}
      <section className={`${styles.sqlSection} ${styles.dml}`}>
        <h2>2. DML – Working With Data (IDUME)</h2>
        <p>Commands to add, modify, and delete actual data records.</p>

        <div>
          <h3>INSERT (Adding New Records)</h3>
          <pre className={styles.sqlCode}>
            <code>
{`INSERT INTO CLIENTS
VALUES(100,'KRISHNAN',TO_DATE('03/02/2022','MM/DD/YYYY'),9742604296);

INSERT INTO CLIENTS
VALUES(101,'RISHAB',TO_DATE('05/03/2022','MM/DD/YYYY'),9448005255);

INSERT INTO CLIENTS
VALUES(102,'HARI',TO_DATE('06/03/2021','MM/DD/YYYY'),9448005258);`}
            </code>
          </pre>
          <p className={styles.explanation}>
            Adds three new client records with:
            <ul>
              <li>Different IDs (100, 101, 102)</li>
              <li>Names (KRISHNAN, RISHAB, HARI)</li>
              <li>Project dates (formatted as MM/DD/YYYY)</li>
              <li>Phone numbers</li>
            </ul>
            TO_DATE converts text dates to proper date format.
          </p>
        </div>

        <div>
          <h3>DELETE (Removing Records)</h3>
          <pre className={styles.sqlCode}>
            <code>
{`DELETE FROM CLIENTS
WHERE CLIENT_ID = 101;`}
            </code>
          </pre>
          <p className={styles.explanation}>
            Removes ONLY the client with ID 101. Without WHERE, ALL clients would be deleted!
          </p>
        </div>

        <div>
          <h3>UPDATE (Modifying Records)</h3>
          <pre className={styles.sqlCode}>
            <code>
{`UPDATE CLIENTS
SET MOBILE_NO = 9448005273
WHERE CLIENT_ID = 100;

UPDATE CLIENTS
SET CLIENT_NAME = 'HARI'
WHERE CLIENT_ID = 100;`}
            </code>
          </pre>
          <p className={styles.explanation}>
            First changes client 100's phone number to 9448005273, then changes their name to HARI.
            <br />
            <span className={styles.warning}>⚠️ Always verify WHERE conditions before UPDATE/DELETE!</span>
          </p>
        </div>
      </section>

      {/* 3. DRL Section */}
      <section className={`${styles.sqlSection} ${styles.drl}`}>
        <h2>3. DRL – Retrieving Data</h2>
        <pre className={styles.sqlCode}>
          <code>
{`SELECT * FROM CLIENTS;`}
          </code>
        </pre>
        <p className={styles.explanation}>
          Retrieves ALL columns and ALL records from the CLIENTS table. The asterisk (*) means "all columns".
        </p>
      </section>

      {/* 4. TCL Section */}
      <section className={`${styles.sqlSection} ${styles.tcl}`}>
        <h2>4. TCL – Managing Transactions</h2>
        <pre className={styles.sqlCode}>
          <code>
{`COMMIT;`}
          </code>
        </pre>
        <p className={styles.explanation}>
          Saves all recent changes permanently (like saving a document).
        </p>
        <pre className={styles.sqlCode}>
          <code>
{`ROLLBACK;`}
          </code>
        </pre>
        <p className={styles.explanation}>
          Undoes all changes since the last COMMIT (like undo for database changes).
        </p>
      </section>

      {/* 5. DCL Section */}
      <section className={`${styles.sqlSection} ${styles.dcl}`}>
        <h2>5. DCL – Managing Access</h2>
        <pre className={styles.sqlCode}>
          <code>
{`GRANT SELECT, INSERT
ON CLIENTS
TO username;`}
          </code>
        </pre>
        <p className={styles.explanation}>
          Gives "username" permission to view (SELECT) and add (INSERT) data to CLIENTS table.
        </p>
        <pre className={styles.sqlCode}>
          <code>
{`REVOKE DELETE
ON CLIENTS
FROM username;`}
          </code>
        </pre>
        <p className={styles.explanation}>
          Removes permission for "username" to delete records from CLIENTS table.
        </p>
      </section>
    </div>
  );
}