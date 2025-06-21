import Image from 'next/image'
import styles from './page.module.css'

export const metadata = {
  title: 'Informatica IICS COMBO Batch 11 | Rishab Informatica Group',
  description: 'Join our 45-day Live Combo Training starting 9th June 2025: Oracle SQL, PowerCenter, IICS-IDMC Cloud & Snowflake with real-time projects and placement support.',
}

export default function CoursePage() {
  return (
    <main className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <h1>Informatica IICS COMBO Live Training</h1>
          <p className={styles.startDate}>Batch 11 Starts <span>9th June 2025</span></p>
          <p className={styles.tagline}>Become a Cloud ETL Developer in <strong>45 Days</strong> with hands-on projects!</p>
          <a
            href="https://course.rishabinformaticagroup.com/courses/646766"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.enrollBtn}
          >
            Enroll Now
          </a>
        </div>
        <div className={styles.heroImageWrapper}>
          <Image
            src="/images/iics-combo-batch11-hero.jpg"
            alt="Informatica IICS Combo Batch 11"
            width={600}
            height={400}
            className={styles.heroImage}
          />
        </div>
      </section>

      {/* Why This Course */}
      <section className={styles.sectionAlt}>
        <div className={styles.sectionImage}>
          <Image src="/images/why-course.jpg" alt="Why this course" width={500} height={350}/>
        </div>
        <div className={styles.sectionContent}>
          <h2>Why This Course?</h2>
          <ul>
            <li>Learn SQL, PowerCenter, IICS-IDMC & Snowflake <strong>in parallel</strong></li>
            <li>Real-time CDI & CAI project mappings with detailed docs</li>
            <li>Session recordings & lifetime access to materials</li>
            <li>100% guaranteed placement assistance</li>
            <li>Small batches (max 30) for personalized attention</li>
          </ul>
        </div>
      </section>

      {/* About the Trainer */}
      <section className={styles.section}>
        <div className={styles.sectionContent}>
          <h2>About the Trainer</h2>
          <div className={styles.trainerProfile}>
            <div className={styles.trainerImageWrapper}>
              <Image
                src="/images/hari-a.jpg"
                alt="Hari A"
                width={200}
                height={200}
                className={styles.trainerImage}
              />
            </div>
            <div>
              <p><strong>Hari A.</strong> brings over 14 years of ETL development & training expertise across SSIS, Informatica PowerCenter, IICS-IDMC, Azure & Snowflake. Since July 2023, he’s led successful Combo batches transitioning learners into cloud ETL roles.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Highlights */}
      <section className={styles.sectionAlt}>        
        <div className={styles.sectionContent}>
          <h2>Course Highlights</h2>
          <ul className={styles.highlightsList}>
            <li>Morning & Evening batches: 7:15–8:45 (AM/PM)</li>
            <li>Hands-on exposure to AWS, Azure, GCP integrations</li>
            <li>500+ interview Q&A for PowerCenter, IICS & CAI</li>
            <li>Mock interviews & resume crafting sessions</li>
          </ul>
        </div>
        <div className={styles.sectionImage}>
          <Image src="/images/highlights.jpg" alt="Course highlights" width={500} height={350}/>
        </div>
      </section>

      {/* Contact & CTA */}
      <section className={styles.contactSection}>
        <h2>Ready to Start?</h2>
        <p>Call/WhatsApp us at <strong>8970853557</strong> or email <a href="mailto:support@rishabinformaticagroup.com">support@rishabinformaticagroup.com</a></p>
        <a
          href="https://course.rishabinformaticagroup.com/courses/646766"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.enrollBtnLarge}
        >
          Enroll Now
        </a>
      </section>
    </main>
  )
}