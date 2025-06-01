import Image from 'next/image'
import styles from './page.module.css'

export const metadata = {
  title: 'Informatica IICS COMBO Batch 11 | Rishab Informatica Group',
  description: '45-day Live Combo Training from 9th June 2025: SQL, PowerCenter, IICS-IDMC Cloud & Snowflake. Includes real-time projects, placement support, and lifetime access.',
}

export default function CoursePage() {
  return (
    <main className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroText}>
          <h1>Informatica IICS COMBO Live Training</h1>
          <p className={styles.startDate}>Batch 11 Starts <span>9th June 2025</span></p>
          <p className={styles.tagline}>Become a Cloud ETL Developer in <strong>45 Days</strong> with real-time projects and 100% placement support!</p>
          <div className={styles.heroButtons}>
            <a href="/assets/syllabus-iics-combo.pdf" download className={styles.downloadBtn}>
              Download Syllabus
            </a>
            <a
              href="https://course.rishabinformaticagroup.com/courses/646766"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.enrollBtn}
            >
              Enroll Now
            </a>
          </div>
        </div>
        <div className={styles.heroImageWrapper}>
          <Image
            src="/courses/informatica.PNG"
            alt="Informatica IICS Combo Batch 11"
            width={600}
            height={400}
            className={styles.heroImage}
          />
        </div>
      </section>

      {/* Live Sessions & Access */}
      <section className={styles.pricingSection}>
        <h2>Access & Live Sessions</h2>
        <div className={styles.pricingGrid}>
          <div className={styles.pricingCard}>
            <h3>Full Access (CDI + CAI)</h3>
            <p><strong>50+ Hours</strong> Live Sessions</p>
            <p>₹17,000 <span className={styles.originalPrice}>₹23,000</span></p>
            <a href="https://course.rishabinformaticagroup.com/courses/646766" target="_blank" rel="noopener noreferrer" className={styles.pricingBtn}>
              Pay & Enroll Now
            </a>
          </div>
          <div className={styles.pricingCard}>
            <h3>Only CAI Access</h3>
            <p><strong>20+ Hours</strong> Live Sessions</p>
            <p>₹6,000</p>
            <a href="https://course.rishabinformaticagroup.com/courses/646766" target="_blank" rel="noopener noreferrer" className={styles.pricingBtn}>
              Pay & Enroll Now
            </a>
          </div>
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
            <li>Parallel learning: SQL, PowerCenter, IICS-IDMC & Snowflake</li>
            <li>Hands-on real-time CDI & CAI projects with mapping docs</li>
            <li>Lifetime access to session recordings & materials</li>
            <li>Guaranteed placement assistance & resume support</li>
            <li>Small batch size (max 30) for personalized learning</li>
          </ul>
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.testimonialsSection}>
        <h2>What Our Learners Say</h2>
        <div className={styles.testimonialsGrid}>
          <blockquote>
            “This Combo batch helped me land my dream ETL role within weeks!”
            <footer>- Sneha K., ETL Developer</footer>
          </blockquote>
          <blockquote>
            “Excellent training, real-time projects, and fantastic placement support.”
            <footer>- Raj P., Data Engineer</footer>
          </blockquote>
          <blockquote>
            “Hari’s expertise and teaching style transformed my career.”
            <footer>- Anjali M., BI Analyst</footer>
          </blockquote>
        </div>
      </section>

      {/* Reviews */}
      <section className={styles.reviewsSection}>
        <h2>Verified Reviews</h2>
        <div className={styles.reviewsGrid}>
          <div className={styles.reviewBadge}>
            <Image src="/images/trustpilot.png" alt="Trustpilot 4.9" width={100} height={50}/>
            <p>4.9 ★</p>
          </div>
          <div className={styles.reviewBadge}>
            <Image src="/images/sitejabber.png" alt="Sitejabber 4.9" width={100} height={50}/>
            <p>4.9 ★</p>
          </div>
          <div className={styles.reviewBadge}>
            <Image src="/images/google.png" alt="Google 5.0" width={100} height={50}/>
            <p>5.0 ★</p>
          </div>
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
              <p><strong>Hari A.</strong> brings over 14 years of ETL development & training in SSIS, Informatica PowerCenter, IICS-IDMC, Azure & Snowflake. He launched the Combo batches in July 2023, guiding learners to cloud ETL success.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className={styles.contactSection}>
        <h2>Ready to Accelerate Your Career?</h2>
        <p>Call/WhatsApp: <strong>8970853557</strong> | Email: <a href="mailto:support@rishabinformaticagroup.com">support@rishabinformaticagroup.com</a></p>
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
