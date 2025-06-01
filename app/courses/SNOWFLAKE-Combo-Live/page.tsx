import { Button } from "@/components/ui/button";
import { CheckIcon, DownloadIcon, CalendarIcon, ClockIcon, UserIcon, AwardIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

export const metadata = {
  title: "Snowflake Combo Training | Snowflake + ADF + DBT + IICS",
  description: "Join Batch 2 starting June 25, 2025. Master Snowflake, ADF, DBT & IICS with real-time projects and placement assistance.",
};

export default function SnowflakeComboPage() {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <span className={styles.batchBadge}>New Batch 2 Starts June 25, 2025</span>
            <h1>Snowflake <span className={styles.highlight}>COMBO</span> Training Live</h1>
            <h2>Snowflake + ADF + DBT + IICS</h2>
            <p className={styles.heroDescription}>
              Learn industry-demanded skills in cloud data engineering. Master Snowflake with Azure Data Factory, DBT, and IICS. Real-time project experience and interview prep included.
            </p>

            <div className={styles.heroStats}>
              <div className={styles.statItem}>
                <CalendarIcon className={styles.statIcon} />
                <span>45 Days Program</span>
              </div>
              <div className={styles.statItem}>
                <ClockIcon className={styles.statIcon} />
                <span>Daily 1.5hr Sessions</span>
              </div>
              <div className={styles.statItem}>
                <UserIcon className={styles.statIcon} />
                <span>Limited to 30 Students</span>
              </div>
            </div>

            <div className={styles.ctaGroup}>
              <Button asChild className={styles.primaryButton}>
                <Link href="#enroll">Enroll Now</Link>
              </Button>
              <Button asChild variant="outline" className={styles.secondaryButton}>
                <Link href="#syllabus">View Syllabus</Link>
              </Button>
            </div>
          </div>

          <div className={styles.heroImage}>
            <Image
              src="/courses/snowflake.PNG"
              alt="Snowflake Combo Training"
              width={600}
              height={400}
              className={styles.courseImage}
            />
          </div>
        </div>
      </section>

      {/* Certification Badge */}
      <section className={styles.certificationSection}>
        <div className={styles.certificationBadge}>
          <AwardIcon className={styles.badgeIcon} />
          <div>
            <h3>Completion Certificate</h3>
            <p>Recognized by leading data engineering recruiters</p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className={styles.featuresSection}>
        <h2 className={styles.sectionTitle}>Why Choose Our Snowflake Combo?</h2>
        <div className={styles.featuresGrid}>
          {[
            {
              title: "Cloud Pipeline Projects",
              description: "Build real-time projects with Snowflake, ADF, DBT, and IICS",
              icon: <CloudIcon />
            },
            {
              title: "Data Engineering Ready",
              description: "Hands-on training to prepare you for data engineering interviews",
              icon: <DatabaseIcon />
            },
            {
              title: "Scenario-Based Learning",
              description: "Work on real-time business problems from top industries",
              icon: <QuestionIcon />
            },
            {
              title: "Resume & Profile Support",
              description: "Naukri profile + LinkedIn + 3 Mock Interviews",
              icon: <ResumeIcon />
            },
            {
              title: "Lifetime Access",
              description: "Recordings, notes, and interview content forever",
              icon: <AccessIcon />
            },
            {
              title: "Affordable Pricing",
              description: "₹9,600 for a full 45-day live training program",
              icon: <CompareIcon />
            }
          ].map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Syllabus Download */}
      <section className={styles.syllabusSection} id="syllabus">
        <div className={styles.syllabusContent}>
          <div>
            <h2 className={styles.sectionTitle}>Download Course Syllabus</h2>
            <p>Complete curriculum with modules covering Snowflake, ADF, DBT, IICS and more.</p>
            <Button asChild className={styles.downloadButton}>
              <Link href="/syllabus/snowflake-combo.pdf" download>
                <DownloadIcon className={styles.buttonIcon} />
                Download Syllabus PDF
              </Link>
            </Button>
          </div>
          <Image
            src="/syllabus-preview.png"
            alt="Syllabus Preview"
            width={300}
            height={400}
            className={styles.syllabusImage}
          />
        </div>
      </section>

      {/* Batch Details */}
      <section className={styles.batchSection} id="enroll">
        <h2 className={styles.sectionTitle}>Next Batch Details</h2>
        <div className={styles.batchCards}>
          <div className={styles.batchCard}>
            <h3>Batch 2</h3>
            <div className={styles.batchInfo}>
              <CalendarIcon />
              <span>Starts: June 25, 2025</span>
            </div>
            <div className={styles.batchInfo}>
              <ClockIcon />
              <span>Timing: 7:30 PM - 9:30 PM IST</span>
            </div>
            <div className={styles.priceTag}>₹9,600 <span className={styles.originalPrice}>₹18,000</span></div>
            <Button asChild className={styles.enrollButton}>
              <Link href="https://course.rishabinformaticagroup.com/courses/xxxxxx" target="_blank">
                Enroll Now
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Instructor Profile */}
      <section className={styles.instructorSection}>
        <div className={styles.instructorContent}>
          <Image
            src="/instructor-hari.jpg"
            alt="Hari A. - Instructor"
            width={200}
            height={200}
            className={styles.instructorImage}
          />
          <div>
            <h2 className={styles.sectionTitle}>Your Instructor</h2>
            <h3>Hari A.</h3>
            <p className={styles.instructorBio}>
              14+ years of experience in ETL, Data Engineering and Cloud Integration. 
              Ex-TCS & IBM. Delivered 100+ batches and trained 1000+ professionals.
            </p>
            <div className={styles.expertise}>
              <span>Snowflake</span>
              <span>Azure Data Factory</span>
              <span>DBT</span>
              <span>IICS</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.testimonialsSection}>
        <h2 className={styles.sectionTitle}>What Students Are Saying</h2>
        <div className={styles.testimonialCards}>
          {[
            {
              quote: "This combo made me job-ready in less than 2 months. Snowflake and ADF project work helped me stand out.",
              name: "Deepak R.",
              company: "Tata Consultancy Services"
            },
            {
              quote: "Trainer Hari sir’s explanation style and practical DBT sessions were excellent.",
              name: "Anjali S.",
              company: "Cognizant"
            }
          ].map((testimonial, index) => (
            <div key={index} className={styles.testimonialCard}>
              <p className={styles.testimonialQuote}>"{testimonial.quote}"</p>
              <div className={styles.testimonialAuthor}>
                <strong>{testimonial.name}</strong>
                <span>{testimonial.company}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// Updated placeholder icons
function CompareIcon() { return <div className={styles.icon}>💰</div> }
function CloudIcon() { return <div className={styles.icon}>☁️</div> }
function DatabaseIcon() { return <div className={styles.icon}>🧊</div> }
function QuestionIcon() { return <div className={styles.icon}>❓</div> }
function AccessIcon() { return <div className={styles.icon}>♾️</div> }
function ResumeIcon() { return <div className={styles.icon}>📄</div> }
