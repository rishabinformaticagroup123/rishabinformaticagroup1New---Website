'use client';

import { useState } from 'react';
import styles from './sql-guide.module.css';

const sqlData = [
  {
    id: 'ddl',
    title: '1. 🛠️ DDL – Building the Database',
    description: 'Commands that define the structure of database objects.',
    colorClass: styles.ddl,
    content: [
      {
        heading: 'CREATE TABLE – 🗄️ Build a New Cabinet',
        code: `CREATE TABLE CLIENTS
(
  CLIENT_ID NUMBER(5),
  CLIENT_NAME VARCHAR2(30),
  DATE_OF_PROJECT DATE,
  MOBILE_NO NUMBER(10)
);`,
        explanation: 'Creates a storage structure (table) with client info fields.'
      },
      {
        heading: 'ALTER TABLE – 🔧 Add/Modify/Remove Shelves (Columns)',
        code: `ALTER TABLE CLIENTS ADD COUNTRY VARCHAR2(10);
ALTER TABLE CLIENTS MODIFY MOBILE_NO NUMBER(15);
ALTER TABLE CLIENTS RENAME COLUMN MOBILE_NO TO CONTACT_NO;
ALTER TABLE CLIENTS DROP COLUMN COUNTRY;`,
        explanation: 'Updates the cabinet layout, e.g. adding/removing sections.'
      },
      {
        heading: 'RENAME TABLE – 🏷️ Change the Cabinet Label',
        code: `RENAME CLIENTS TO NEW_CLIENTS;`,
        explanation: 'Renames the table without changing data.'
      },
      {
        heading: 'TRUNCATE TABLE – 🚮 Empty Cabinet Quickly',
        code: `TRUNCATE TABLE NEW_CLIENTS;`,
        explanation: 'Clears all rows but keeps the cabinet structure.'
      },
      {
        heading: 'DROP TABLE – 💣 Remove Cabinet Entirely',
        code: `DROP TABLE NEW_CLIENTS;`,
        explanation: 'Deletes the table and its contents forever.'
      }
    ]
  },
  {
    id: 'dml',
    title: '2. ✏️ DML – Working With Data',
    description: 'Commands to insert, delete, and update rows.',
    colorClass: styles.dml,
    content: [
      {
        heading: 'INSERT – ➕ Add New Records',
        code: `INSERT INTO CLIENTS VALUES(100,'KRISHNAN',TO_DATE('03/02/2022','MM/DD/YYYY'),9742604296);`,
        explanation: 'Adds new records to the table.'
      },
      {
        heading: 'DELETE – ❌ Remove Records',
        code: `DELETE FROM CLIENTS WHERE CLIENT_ID = 101;`,
        explanation: 'Removes a record with matching condition.'
      },
      {
        heading: 'UPDATE – 🔁 Modify Existing Records',
        code: `UPDATE CLIENTS SET CLIENT_NAME = 'HARI' WHERE CLIENT_ID = 100;`,
        explanation: 'Updates specific fields in existing records.'
      }
    ]
  },
  {
    id: 'drl',
    title: '3. 🔍 DRL – Retrieving Data',
    description: 'Commands to query data.',
    colorClass: styles.drl,
    content: [
      {
        heading: 'SELECT – 📋 Get All Records',
        code: `SELECT * FROM CLIENTS;`,
        explanation: 'Fetches every row and column from the CLIENTS table.'
      }
    ]
  },
  {
    id: 'tcl',
    title: '4. 🧾 TCL – Managing Transactions',
    description: 'Commands for saving or undoing changes.',
    colorClass: styles.tcl,
    content: [
      {
        heading: 'COMMIT – ✅ Save Changes',
        code: `COMMIT;`,
        explanation: 'Stores all modifications permanently.'
      },
      {
        heading: 'ROLLBACK – ↩️ Undo Changes',
        code: `ROLLBACK;`,
        explanation: 'Undoes changes since the last commit.'
      }
    ]
  },
  {
    id: 'dcl',
    title: '5. 🔒 DCL – Managing Access',
    description: 'Commands to control user permissions.',
    colorClass: styles.dcl,
    content: [
      {
        heading: 'GRANT – 🪪 Give Access',
        code: `GRANT SELECT, INSERT ON CLIENTS TO username;`,
        explanation: 'Allows the user to view and add data.'
      },
      {
        heading: 'REVOKE – 🛑 Remove Access',
        code: `REVOKE DELETE ON CLIENTS FROM username;`,
        explanation: 'Prevents the user from deleting data.'
      }
    ]
  }
];

export default function SQLLanguagesPage() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    setOpenSection(prev => (prev === id ? null : id));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('SQL code copied to clipboard! 📋');
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>SQL BASICS</h1>
        <h2 className={styles.subtitle}>5 DIFFERENT LANGUAGES IN SQL</h2>
        <div className={styles.contactInfo}>
          <p>📞 CALL/WHATSAPP – 8970853557 / 9448005273</p>
          <p>📚 INFORMATICA IICS COMBO ONLINE TRAINING</p>
        </div>
      </header>

      {sqlData.map(({ id, title, description, content, colorClass }) => (
        <section key={id} className={`${styles.sqlSection} ${colorClass}`}>
          <h2 onClick={() => toggleSection(id)} className={styles.sectionTitle}>
            {title}
          </h2>
          <p>{description}</p>
          {openSection === id && (
            <div className={styles.codeGroup}>
              {content.map(({ heading, code, explanation }, i) => (
                <div key={i} className={styles.codeBlock}>
                  <h3>{heading}</h3>
                  <pre className={styles.sqlCode}>
                    <code>{code}</code>
                  </pre>
                  <button
                    className={styles.copyButton}
                    onClick={() => copyToClipboard(code)}
                  >
                    📋 Copy Code
                  </button>
                  <p className={styles.explanation}>{explanation}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
