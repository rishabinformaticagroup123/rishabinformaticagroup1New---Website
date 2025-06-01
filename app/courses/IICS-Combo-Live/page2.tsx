import type { Metadata } from 'next';
import Link from 'next/link';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Informatica IICS COMBO Training | Become Cloud ETL Developer in 45 Days',
  description: 'Join our live training covering SQL, Informatica PowerCenter, IICS-IDMC & Snowflake with placement assistance. Batch starts March 21, 2025.',
};

export default function IICSComboPage() {
  return (
    <main className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <h1>Become a Cloud ETL Developer in 45 Days!</h1>
        <p className={styles.subtitle}>Join our Informatica IICS COMBO Live Training Batch</p>
        <div className={styles.highlightBox}>
          <p>Next Batch Starts: <strong>March 21, 2025</strong></p>
        </div>
      </section>

      {/* Course Overview */}
      <section className={styles.section}>
        <h2>Comprehensive Training Program</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <h3>What You'll Learn</h3>
            <ul>
              <li>Oracle SQL Fundamentals</li>
              <li>Informatica PowerCenter</li>
              <li>IICS-IDMC (CDI & CAI)</li>
              <li>Snowflake Integration</li>
            </ul>
            <p>Parallel learning of all technologies in each session</p>
          </div>
          
          <div className={styles.card}>
            <h3>Key Benefits</h3>
            <ul>
              <li>100% Placement Assistance</li>
              <li>Real-time Project Experience</li>
              <li>500+ Interview Q&A Preparation</li>
              <li>Lifetime Session Recordings</li>
              <li>Limited Batch Size (Max 30)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Batch Details */}
      <section className={styles.section}>
        <h2>Batch Details</h2>
        <div className={styles.timings}>
          <div>
            <h3>Morning Batch</h3>
            <p>7:15 AM - 8:45 AM IST</p>
          </div>
          <div>
            <h3>Evening Batch</h3>
            <p>7:15 PM - 8:45 PM IST</p>
          </div>
        </div>
        <div className={styles.pricing}>
          <p>Course Fee: <span className={styles.price}>₹9,600</span></p>
          <p className={styles.note}>Special discount for early enrollment</p>
        </div>
      </section>

      {/* Unique Value Proposition */}
      <section className={styles.section}>
        <h2>Why Choose Our Training?</h2>
        <div className={styles.features}>
          <div className={styles.featureItem}>
            <h3>Parallel Learning Approach</h3>
            <p>Learn concepts across SQL, PowerCenter, IICS and Snowflake in integrated sessions for better understanding.</p>
          </div>
          <div className={styles.featureItem}>
            <h3>Industry Expert Trainer</h3>
            <p>Hari A. (14+ years ETL experience) with expertise in multiple tools including IICS, PowerCenter, Azure, and Snowflake.</p>
          </div>
          <div className={styles.featureItem}>
            <h3>Job-Focused Curriculum</h3>
            <p>Specifically designed to help non-IT professionals transition to IT careers within 45 days.</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <h2>Ready to Transform Your Career?</h2>
        <p>Limited seats available for March 2025 batch</p>
        <Link 
          href="https://classplus-link.com/iics-combo" 
          className={styles.enrollButton}
          target="_blank"
        >
          Enroll Now
        </Link>
        <div className={styles.contactInfo}>
          <p>Have questions? Contact us:</p>
          <p>📞 Call/WhatsApp: 8970853557 / 9448005273</p>
          <p>📧 Email: support@rishabinformaticagroup.com</p>
          <Link href="https://www.rishabinformaticagroup.com">
            Visit our website
          </Link>
        </div>
      </section>

      {/* Trainer Profile */}
      <section className={styles.section}>
        <h2>About Your Trainer</h2>
        <div className={styles.trainerProfile}>
          <div>
            <h3>Hari A.</h3>
            <p className={styles.experience}>14+ Years in ETL Development & Training</p>
            <p>Former professional at TCS, IBM and other leading companies with expertise in:</p>
            <ul>
              <li>Informatica PowerCenter & IICS</li>
              <li>Azure Data Factory</li>
              <li>Snowflake & SQL Server</li>
              <li>SSIS and other ETL tools</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
