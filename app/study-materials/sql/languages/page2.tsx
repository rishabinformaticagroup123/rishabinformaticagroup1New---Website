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
        <h3>DATA TYPES</h3>
        <ul>
          <li><span className={styles.dataType}>NUMBER</span> - MOBILE_NO</li>
          <li><span className={styles.dataType}>VARCHAR2</span> - NAME OF THE CUSTOMER</li>
          <li><span className={styles.dataType}>DATE</span> - DOB, DOJ, DOP</li>
        </ul>
      </section>

      {/* 1. DDL Section */}
      <section className={`${styles.sqlSection} ${styles.ddl}`}>
        <h2>1. DDL – DATA DEFINITION LANGUAGE (CART-D)</h2>
        <ul className={styles.commandList}>
          <li>Create</li>
          <li>Alter</li>
          <li>Rename</li>
          <li>Truncate</li>
          <li>Drop</li>
        </ul>

        <div>
          <h3>CREATE TABLE SYNTAX</h3>
          <pre className={styles.sqlCode}>
            <code>
{`CREATE TABLE TABLE_NAME
(
COLUMN_NAME1 DATA_TYPE(LENGTH),
COLUMN_NAME2 DATA_TYPE(LENGTH),
COLUMN_NAME3 DATA_TYPE(LENGTH),
......,
.....
);`}
            </code>
          </pre>
          
          <h4>EXAMPLE:</h4>
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
        </div>

        <div>
          <h3>ALTER TABLE COMMANDS</h3>
          
          <h4>ADD COLUMN:</h4>
          <pre className={styles.sqlCode}>
            <code>
{`ALTER TABLE CLIENTS
ADD COUNTRY VARCHAR2(10);`}
            </code>
          </pre>
          
          <h4>MODIFY COLUMN:</h4>
          <pre className={styles.sqlCode}>
            <code>
{`ALTER TABLE CLIENTS
MODIFY MOBILE_NO NUMBER(15);`}
            </code>
          </pre>
          
          <h4>RENAME COLUMN:</h4>
          <pre className={styles.sqlCode}>
            <code>
{`ALTER TABLE CLIENTS
RENAME COLUMN MOBILE_NO TO CONTACT_NO;`}
            </code>
          </pre>
          
          <h4>DROP COLUMN:</h4>
          <pre className={styles.sqlCode}>
            <code>
{`ALTER TABLE CLIENTS
DROP COLUMN COUNTRY;`}
            </code>
          </pre>
        </div>

        <div>
          <h3>RENAME TABLE:</h3>
          <pre className={styles.sqlCode}>
            <code>
{`RENAME CLIENTS TO NEW_CLIENTS;`}
            </code>
          </pre>
        </div>

        <div>
          <h3>TRUNCATE TABLE:</h3>
          <pre className={styles.sqlCode}>
            <code>
{`TRUNCATE TABLE NEW_CLIENTS;`}
            </code>
          </pre>
        </div>

        <div>
          <h3>DROP TABLE:</h3>
          <pre className={styles.sqlCode}>
            <code>
{`DROP TABLE NEW_CLIENTS;`}
            </code>
          </pre>
        </div>
      </section>

      {/* 2. DML Section */}
      <section className={`${styles.sqlSection} ${styles.dml}`}>
        <h2>2. DML – DATA MANIPULATION LANGUAGE (IDUME)</h2>
        <ul className={styles.commandList}>
          <li>Insert</li>
          <li>Delete</li>
          <li>Update</li>
          <li>Merge</li>
        </ul>

        <div>
          <h3>INSERT EXAMPLES</h3>
          <pre className={styles.sqlCode}>
            <code>
{`INSERT INTO CLIENTS
VALUES(100,'KRISHNAN',TO_DATE('03/02/2022','MM/DD/YYYY'),9742604296);`}
            </code>
          </pre>
          <pre className={styles.sqlCode}>
            <code>
{`INSERT INTO CLIENTS
VALUES(101,'RISHAB',TO_DATE('05/03/2022','MM/DD/YYYY'),9448005255);`}
            </code>
          </pre>
          <pre className={styles.sqlCode}>
            <code>
{`INSERT INTO CLIENTS
VALUES(102,'HARI',TO_DATE('06/03/2021','MM/DD/YYYY'),9448005258);`}
            </code>
          </pre>
        </div>

        <div>
          <h3>DELETE COMMAND</h3>
          <pre className={styles.sqlCode}>
            <code>
{`DELETE FROM CLIENTS
WHERE CLIENT_ID = 101;`}
            </code>
          </pre>
        </div>

        <div>
          <h3>UPDATE COMMANDS</h3>
          <pre className={styles.sqlCode}>
            <code>
{`UPDATE CLIENTS
SET MOBILE_NO = 9448005273
WHERE CLIENT_ID = 100;`}
            </code>
          </pre>
          <pre className={styles.sqlCode}>
            <code>
{`UPDATE CLIENTS
SET CLIENT_NAME = 'HARI'
WHERE CLIENT_ID = 100;`}
            </code>
          </pre>
        </div>
      </section>

      {/* 3. DRL Section */}
      <section className={`${styles.sqlSection} ${styles.drl}`}>
        <h2>3. DRL – DATA RETRIEVAL LANGUAGE</h2>
        <pre className={styles.sqlCode}>
          <code>
{`SELECT * FROM CLIENTS;`}
          </code>
        </pre>
      </section>

      {/* 4. TCL Section */}
      <section className={`${styles.sqlSection} ${styles.tcl}`}>
        <h2>4. TCL – TRANSACTION CONTROL LANGUAGE</h2>
        <pre className={styles.sqlCode}>
          <code>
{`COMMIT;`}
          </code>
        </pre>
        <pre className={styles.sqlCode}>
          <code>
{`ROLLBACK;`}
          </code>
        </pre>
      </section>

      {/* 5. DCL Section */}
      <section className={`${styles.sqlSection} ${styles.dcl}`}>
        <h2>5. DCL – DATA CONTROL LANGUAGE</h2>
        <pre className={styles.sqlCode}>
          <code>
{`GRANT SELECT, INSERT
ON CLIENTS
TO username;`}
          </code>
        </pre>
        <pre className={styles.sqlCode}>
          <code>
{`REVOKE DELETE
ON CLIENTS
FROM username;`}
          </code>
        </pre>
      </section>
    </div>
  );
}