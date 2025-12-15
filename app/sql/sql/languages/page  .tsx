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

      {/* Introduction */}
      <section className={styles.dataTypes}>
        <h3>What is SQL?</h3>
        <p>
          SQL is like a special language that helps us talk to databases. 
          Just like you use English to ask for information, SQL helps computers 
          understand what data we want to store, change, or retrieve.
        </p>
        
        <h3>DATA TYPES</h3>
        <ul>
          <li><span className={styles.dataType}>NUMBER</span> - Used for numeric values like phone numbers</li>
          <li><span className={styles.dataType}>VARCHAR2</span> - Used for text like customer names</li>
          <li><span className={styles.dataType}>DATE</span> - Used for dates like birth dates or join dates</li>
        </ul>
      </section>

      {/* 1. DDL Section */}
      <section className={`${styles.sqlSection} ${styles.ddl}`}>
        <h2>1. DDL – Building the Database Structure</h2>
        <p>
          These commands help create and change the structure of your database, 
          like building the shelves before putting books in a library.
        </p>
        
        <div>
          <h3>CREATE TABLE</h3>
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
            This creates a new "table" (like an Excel sheet) called CLIENTS with 
            columns for client ID (number), name (text), project date, and phone number.
          </p>
        </div>

        <div>
          <h3>ALTER TABLE - Adding a Column</h3>
          <pre className={styles.sqlCode}>
            <code>
{`ALTER TABLE CLIENTS
ADD COUNTRY VARCHAR2(10);`}
            </code>
          </pre>
          <p className={styles.explanation}>
            Adds a new column to store country information to our existing CLIENTS table.
          </p>
        </div>

        <div>
          <h3>TRUNCATE TABLE</h3>
          <pre className={styles.sqlCode}>
            <code>
{`TRUNCATE TABLE CLIENTS;`}
            </code>
          </pre>
          <p className={styles.explanation}>
            Clears all data from the table but keeps the structure intact - like emptying 
            a filing cabinet but keeping the folders.
          </p>
        </div>
      </section>

      {/* 2. DML Section */}
      <section className={`${styles.sqlSection} ${styles.dml}`}>
        <h2>2. DML – Working With Data</h2>
        <p>
          These commands help you add, change, and delete actual data in your database, 
          like adding or editing entries in a phone book.
        </p>

        <div>
          <h3>INSERT - Adding New Records</h3>
          <pre className={styles.sqlCode}>
            <code>
{`INSERT INTO CLIENTS
VALUES(100,'KRISHNAN',TO_DATE('03/02/2022','MM/DD/YYYY'),9742604296);`}
            </code>
          </pre>
          <p className={styles.explanation}>
            Adds a new client with ID 100, name "KRISHNAN", project date March 2, 2022, 
            and phone number 9742604296.
          </p>
        </div>

        <div>
          <h3>UPDATE - Changing Existing Data</h3>
          <pre className={styles.sqlCode}>
            <code>
{`UPDATE CLIENTS
SET MOBILE_NO = 9448005273
WHERE CLIENT_ID = 100;`}
            </code>
          </pre>
          <p className={styles.explanation}>
            Changes the phone number for client with ID 100. The WHERE clause is crucial - 
            without it, ALL clients' phone numbers would change!
          </p>
        </div>

        <div>
          <h3>DELETE - Removing Data</h3>
          <pre className={styles.sqlCode}>
            <code>
{`DELETE FROM CLIENTS
WHERE CLIENT_ID = 101;`}
            </code>
          </pre>
          <p className={styles.explanation}>
            Removes the client with ID 101 from our database. Always use WHERE to avoid 
            deleting everything accidentally.
          </p>
        </div>
      </section>

      {/* 3. DRL Section */}
      <section className={`${styles.sqlSection} ${styles.drl}`}>
        <h2>3. DRL – Retrieving Information</h2>
        <p>
          The SELECT command is like asking questions to your database. It helps you 
          view the stored information without changing it.
        </p>
        <pre className={styles.sqlCode}>
          <code>
{`SELECT * FROM CLIENTS;`}
          </code>
        </pre>
        <p className={styles.explanation}>
          Shows ALL data from the CLIENTS table. The asterisk (*) means "all columns". 
          Like saying "show me everything in the client records".
        </p>
      </section>

      {/* 4. TCL Section */}
      <section className={`${styles.sqlSection} ${styles.tcl}`}>
        <h2>4. TCL – Managing Changes</h2>
        <p>
          These commands help you control your changes, like an "undo" button or 
          final save for your database work.
        </p>
        <pre className={styles.sqlCode}>
          <code>
{`COMMIT;`}
          </code>
        </pre>
        <p className={styles.explanation}>
          Saves all your recent changes permanently, like clicking "Save" in a document.
        </p>
        <pre className={styles.sqlCode}>
          <code>
{`ROLLBACK;`}
          </code>
        </pre>
        <p className={styles.explanation}>
          Undoes all changes since the last COMMIT, like using "Undo" to revert mistakes.
        </p>
      </section>

      {/* 5. DCL Section */}
      <section className={`${styles.sqlSection} ${styles.dcl}`}>
        <h2>5. DCL – Controlling Access</h2>
        <p>
          These commands manage who can see or change your data, like giving keys 
          to specific filing cabinets.
        </p>
        <pre className={styles.sqlCode}>
          <code>
{`GRANT SELECT, INSERT
ON CLIENTS
TO username;`}
          </code>
        </pre>
        <p className={styles.explanation}>
          Allows "username" to view (SELECT) and add (INSERT) client data, but not modify 
          or delete existing records.
        </p>
      </section>
    </div>
  );
}