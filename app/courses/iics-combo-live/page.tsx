// app/courses/IICS-Combo/page.tsx
import { Button } from "@/components/ui/button";
import { CheckIcon, DownloadIcon, CalendarIcon, ClockIcon, UserIcon, AwardIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import TestimonialSlider from "@/components/testimonial-slider"; // ✅ ADD THIS IMPORT

export const metadata = {
  title: "Informatica IICS COMBO Training | PowerCenter + IICS + Snowflake",
  description: "Join Batch 13 starting Nov 14, 2025. Master IICS Cloud, PowerCenter, and Snowflake with live projects and placement support.",
};

export default function IICSComboPage() {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <span className={styles.batchBadge}>New Batch 13 Starts Nov 14, 2025, 7.15 PM to 9.00 PM </span>
            <h1>Informatica IICS <span className={styles.highlight}>COMBO</span> Training Live - Batch 13</h1>
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
              src="/courses/informatica.png"
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
              description: "Work on Snowflake/GCP integrated implementations",
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
              description: "With Multiple 1:1 mock interviews",
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
            <h3>Batch 13</h3>
            <div className={styles.batchInfo}>
              <CalendarIcon />
              <span>Starts: Nov 14, 2025</span>
            </div>
            <div className={styles.batchInfo}>
              <ClockIcon />
              <span>Timing: 7:15 PM - 9:00 PM IST</span>
            </div>
            <div className={styles.priceTag}>₹9,600 <span className={styles.originalPrice}>₹18,000</span></div>
            <Button asChild className={styles.enrollButton}>
              <Link href="https://course.rishabinformaticagroup.com/courses/755945" target="_blank">
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

      {/* ✅ UPDATED Testimonials Section - Using TestimonialSlider */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              IICS COMBO Student Success Stories
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Real feedback from students who completed this course
            </p>
          </div>
          
          {/* ✅ USING YOUR TESTIMONIAL SLIDER COMPONENT */}
          <TestimonialSlider />
          
          {/* Course-specific CTA */}
          <div className="text-center mt-12">
            <Link 
              href="#enroll"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              🚀 Join Batch 13 - Enroll Now
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
            <p className="mt-6 text-gray-600">
              Limited seats available - Enroll before batch fills up
            </p>
          </div>
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