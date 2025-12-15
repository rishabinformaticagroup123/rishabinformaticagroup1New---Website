// app/courses/performance-engineering/page.tsx
import { Button } from "@/components/ui/button";
import { CheckIcon, DownloadIcon, CalendarIcon, ClockIcon, UserIcon, AwardIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

export const metadata = {
  title: "Performance Engineering Course | JMeter + LoadRunner + Performance Testing",
  description: "Master Performance Testing with tools like JMeter, LoadRunner. Learn from Ramya S with real-time project guidance. New batch starts soon!",
};

export default function PerformanceEngineeringPage() {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <span className={styles.batchBadge}>New Batch Starts Soon</span>
            <h1>Performance Engineering <span className={styles.highlight}>Course</span> Live</h1>
            <h2>Performance Testing + JMeter + LoadRunner + Monitoring Tools</h2>
            <p className={styles.heroDescription}>
              Learn to test and optimize application performance with leading tools. Daily 1.15 hour sessions guided by expert trainer Ramya S.
            </p>

            <div className={styles.heroStats}>
              <div className={styles.statItem}>
                <CalendarIcon className={styles.statIcon} />
                <span>30 Days Program</span>
              </div>
              <div className={styles.statItem}>
                <ClockIcon className={styles.statIcon} />
                <span>Daily 1.15hr Sessions</span>
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
              src="/courses/performance.png"
              alt="Performance Engineering Course"
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
            <p>Recognized by industry professionals</p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className={styles.featuresSection}>
        <h2 className={styles.sectionTitle}>Why Join Our Performance Engineering Course</h2>
        <div className={styles.featuresGrid}>
          {[
            {
              title: "Tool Expertise",
              description: "Hands-on with JMeter, LoadRunner, and monitoring tools",
              icon: <CompareIcon />
            },
            {
              title: "Project Exposure",
              description: "Work on real-world performance testing projects",
              icon: <CloudIcon />
            },
            {
              title: "Monitoring Skills",
              description: "Understand bottlenecks using real-time monitoring",
              icon: <DatabaseIcon />
            },
            {
              title: "Interview Preparation",
              description: "Resume building and scenario-based mock interviews",
              icon: <QuestionIcon />
            },
            {
              title: "Lifetime Access",
              description: "To recordings, notes, and doubt-clearing support",
              icon: <AccessIcon />
            },
            {
              title: "Placement Support",
              description: "End-to-end guidance until you get placed",
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

      {/* Syllabus Download */}
      <section className={styles.syllabusSection} id="syllabus">
        <div className={styles.syllabusContent}>
          <div>
            <h2 className={styles.sectionTitle}>Detailed Course Syllabus</h2>
            <p>Download module-wise topics and real-time exercises</p>
            <Button asChild className={styles.downloadButton}>
              <Link href="/syllabus/performance-engineering.pdf" download>
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
            <h3>Upcoming Batch</h3>
            <div className={styles.batchInfo}>
              <CalendarIcon />
              <span>Starts: June 9, 2025</span>
            </div>
            <div className={styles.batchInfo}>
              <ClockIcon />
              <span>Timing: 7:30 PM - 8:45 PM IST</span>
            </div>
            <div className={styles.priceTag}>₹12,000 <span className={styles.originalPrice}>₹18,000</span></div>
            <Button asChild className={styles.enrollButton}>
              <Link href="https://course.rishabinformaticagroup.com/courses/645842" target="_blank">
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
            src="/instructor-ramya.jpg"
            alt="Ramya S. - Instructor"
            width={200}
            height={200}
            className={styles.instructorImage}
          />
          <div>
            <h2 className={styles.sectionTitle}>Your Instructor</h2>
            <h3>Ramya S.</h3>
            <p className={styles.instructorBio}>
              8+ years of experience in performance testing. Hands-on with JMeter, LoadRunner, and other tools. Passionate about mentoring new testers into experts.
            </p>
            <div className={styles.expertise}>
              <span>JMeter</span>
              <span>LoadRunner</span>
              <span>Performance Monitoring</span>
              <span>Test Strategy</span>
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
              quote: "Ramya's training helped me master JMeter with real-time projects. I'm now confident handling performance bottlenecks.",
              name: "Anil R.",
              company: "Wipro"
            },
            {
              quote: "I cleared three interviews with LoadRunner and monitoring tool knowledge from this course.",
              name: "Sneha V.",
              company: "Tech Mahindra"
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

function CompareIcon() { return <div className={styles.icon}>🛠️</div> }
function CloudIcon() { return <div className={styles.icon}>☁️</div> }
function DatabaseIcon() { return <div className={styles.icon}>📊</div> }
function QuestionIcon() { return <div className={styles.icon}>❓</div> }
function AccessIcon() { return <div className={styles.icon}>🔓</div> }
function ResumeIcon() { return <div className={styles.icon}>📄</div> }