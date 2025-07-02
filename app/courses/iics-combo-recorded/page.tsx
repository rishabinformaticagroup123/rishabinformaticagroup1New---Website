// app/courses/IICS-Combo/page.tsx
import { Button } from "@/components/ui/button";
import { CheckIcon, DownloadIcon, CalendarIcon, ClockIcon, UserIcon, AwardIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

export const metadata = {
  title: "Informatica IICS COMBO Training | PowerCenter + IICS + Snowflake",
  description: "Join Batch 11 starting June 9, 2025. Master IICS Cloud, PowerCenter, and Snowflake with live projects and placement support.",
};

export default function IICSComboPage() {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <span className={styles.batchBadge}>Recorded course with 24*7 Tech support</span>
            <h1>Informatica IICS <span className={styles.highlight}>COMBO</span> FULL COURSE</h1>
            <h2>SQL + PowerCenter + IICS Cloud + Snowflake</h2>
            <p className={styles.heroDescription}>
              Master both PowerCenter and IICS Cloud with parallel comparisons. 45-day intensive program with real-time projects and placement assistance.
            </p>
            
            <div className={styles.heroStats}>
              <div className={styles.statItem}>
                <CalendarIcon className={styles.statIcon} />
                <span>45 Days Program</span>
              </div>
              <div className={styles.statItem}>
                <ClockIcon className={styles.statIcon} />
                <span>Daily 2hr Sessions</span>
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
              src="/courses/informatica_record.png"
              alt="Informatica IICS COMBO Training"
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
            <h3>Official Completion Certificate</h3>
            <p>Recognized by industry partners</p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className={styles.featuresSection}>
        <h2 className={styles.sectionTitle}>Why Our IICS COMBO Training Stands Out</h2>
        <div className={styles.featuresGrid}>
          {[
            {
              title: "Parallel Learning",
              description: "Compare PowerCenter and IICS concepts side-by-side",
              icon: <CompareIcon />
            },
            {
              title: "Real Cloud Projects",
              description: "Work on AWS/GCP integrated implementations",
              icon: <CloudIcon />
            },
            {
              title: "Snowflake Integration",
              description: "End-to-end data pipelines with Snowflake",
              icon: <DatabaseIcon />
            },
            {
              title: "500+ Interview Q&A",
              description: "Curated question bank for placements",
              icon: <QuestionIcon />
            },
            {
              title: "Lifetime Access",
              description: "To recordings and updated materials",
              icon: <AccessIcon />
            },
            {
              title: "Resume Preparation",
              description: "With 1:1 mock interviews",
              icon: <ResumeIcon />
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

      {/* Course Comparison Table */}
      <section className={styles.comparisonSection}>
        <h2 className={styles.sectionTitle}>PowerCenter vs IICS: What You'll Learn</h2>
        <div className={styles.comparisonTable}>
          <div className={styles.tableHeader}>
            <div>Concept</div>
            <div>PowerCenter</div>
            <div>IICS Cloud</div>
          </div>
          {[
            ["Data Transformation", "Transformations", "Cloud Data Integration"],
            ["Connectivity", "Connectors", "Cloud Application Integration"],
            ["Deployment", "On-premise", "Cloud-native"],
            ["Scalability", "Limited", "Auto-scaling"],
            ["Cost Model", "License-based", "Pay-as-you-go"]
          ].map(([concept, pc, iics], index) => (
            <div key={index} className={styles.tableRow}>
              <div>{concept}</div>
              <div>{pc}</div>
              <div>{iics}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Syllabus Download */}
      <section className={styles.syllabusSection} id="syllabus">
        <div className={styles.syllabusContent}>
          <div>
            <h2 className={styles.sectionTitle}>Detailed Course Syllabus</h2>
            <p>Download complete curriculum with module-wise topics and hands-on exercises</p>
            <Button asChild className={styles.downloadButton}>
              <Link href="/syllabus/course-content.pdf" download>
                <DownloadIcon className={styles.buttonIcon} />
                Download Syllabus PDF
              </Link>
            </Button>
          </div>
          <Image
            src="/syllabus/syllabus1.PNG"
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
            <h3>Batch 11</h3>
            <div className={styles.batchInfo}>
              <CalendarIcon />
              <span>Starts: June 9, 2025</span>
            </div>
            <div className={styles.batchInfo}>
              <ClockIcon />
              <span>Timing: 7:30 PM - 9:30 PM IST</span>
            </div>
            <div className={styles.priceTag}>₹5,100 <span className={styles.originalPrice}>₹18,000</span></div>
            <Button asChild className={styles.enrollButton}>
              <Link href="https://course.rishabinformaticagroup.com/courses/498547" target="_blank">
                Enroll Now
              </Link>
            </Button>
          </div>
          
          {/* Additional batch card if needed */}
        </div>
      </section>

      {/* Instructor Profile */}
      <section className={styles.instructorSection}>
        <div className={styles.instructorContent}>
          <Image
            src="/instructors/hari.png"
            alt="Hari A. - Instructor"
            width={200}
            height={200}
            className={styles.instructorImage}
          />
          <div>
            <h2 className={styles.sectionTitle}>Your Instructor</h2>
            <h3>Hari A.</h3>
            <p className={styles.instructorBio}>
              14+ years experience in ETL development and training. Former consultant at TCS and IBM. 
              Trained 1000+ professionals on Informatica, Azure, and Snowflake.
            </p>
            <div className={styles.expertise}>
              <span>Informatica PowerCenter</span>
              <span>IICS Cloud</span>
              <span>Snowflake</span>
              <span>Azure Data Factory</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.testimonialsSection}>
        <h2 className={styles.sectionTitle}>What Our Students Say</h2>
        <div className={styles.testimonialCards}>
          {[
            {
              quote: "I highly recommend the IICS COMBO course for anyone looking to build a strong oundation in data integration and cloud technologies. This course covers SQL,Informatica PowerCenter, Informatica IICS, and also includes essential Snowflake concepts, which makes it a complete package for both beginners and working professionals The way the topics are structured and explained is very clear and easy to understand. I particularly appreciated how real-time examples were used to connect theory with practical scenarios A big thanks to Hari Sir for his excellent teaching, constant support, and for making complex topics easy to grasp. His guidance throughout the course has been incredibly helpful for my learning journey If you're serious about your career in data engineering or ETL tools, this course is definitely worth it!.",
              name: "Shekar.",
              company: "Infosys"
            },
            {
              quote: "My name is Nitish Chandra Sharma,last year in Dec I planned to get into Data Engineer field,I consulted my friend who is a ETL developer,I searched for courses but the course provided by Rishabh Informatica is the best The answer why, other institutions are taking different batches for Powercenter and IICS which is expensive and time taking unlike here where there is a combo batch at a affordable price with payment ease aswell. Hari Sir is putting efforts day and night to help everyone succeed,if you are interested this is the platform for you.",
              name: "Nithish Sharma.",
              company: "Accenture"
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

// Placeholder icons (replace with actual icon components)
function CompareIcon() { return <div className={styles.icon}>↔️</div> }
function CloudIcon() { return <div className={styles.icon}>☁️</div> }
function DatabaseIcon() { return <div className={styles.icon}>🗄️</div> }
function QuestionIcon() { return <div className={styles.icon}>❓</div> }
function AccessIcon() { return <div className={styles.icon}>♾️</div> }
function ResumeIcon() { return <div className={styles.icon}>📄</div> }