// File: app/courses/IICS-CAI/page.tsx
import TestimonialSlider from "@/components/testimonial-slider"; // ✅ ADD THIS IMPORT
import { Button } from "@/components/ui/button";
import {
  CheckIcon,
  DownloadIcon,
  CalendarIcon,
  ClockIcon,
  UserIcon,
  AwardIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

export const metadata = {
  title: "Informatica IICS CAI Training | Cloud Application Integration Mastery",
  description:
    "Master Informatica IICS CAI (Cloud Application Integration) with real-time API integration, service connectors, and hands-on workflows. Batch 11 starts June 9, 2025.",
};

export default function IICSCaiPage() {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <span className={styles.batchBadge}>Recorded course with 24*7 Tech support</span> 
            <h1>Informatica IICS <span className={styles.highlight}>CAI</span> FULL Course</h1>
            <h2>Cloud Application Integration with Real-Time Projects</h2>
            <p className={styles.heroDescription}>
              Learn to build service connectors, process objects, and APIs using live public data sources like weather, COVID, and currency exchange APIs. Designed for modern ETL/API roles.
            </p>

            <div className={styles.heroStats}>
              <div className={styles.statItem}>
                <CalendarIcon className={styles.statIcon} />
                <span>30 Days Program</span>
              </div>
              <div className={styles.statItem}>
                <ClockIcon className={styles.statIcon} />
                <span>Daily 1.5hr Sessions</span>
              </div>
              <div className={styles.statItem}>
                <UserIcon className={styles.statIcon} />
                <span>Limited to 25 Students</span>
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
              src= "/courses/cai-recorded.png"
              alt="Informatica IICS CAI Training"
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
            <p>Industry-recognized and LinkedIn-shareable</p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className={styles.featuresSection}>
        <h2 className={styles.sectionTitle}>Why This IICS CAI Course is Unique</h2>
        <div className={styles.featuresGrid}>
          {[
            {
              title: "API Integration Projects",
              description: "Use real-time APIs (weather, COVID, currency) for hands-on experience",
              icon: <ApiIcon />,
            },
            {
              title: "Service & App Connectors",
              description: "Create, configure and test live connectors in CAI",
              icon: <ConnectorIcon />,
            },
            {
              title: "Process-Oriented Training",
              description: "Master process objects, fault handling, looping, and decisions",
              icon: <ProcessIcon />,
            },
            {
              title: "Scenario-Based Q&A",
              description: "150+ Cloud Integration Interview Questions",
              icon: <QuestionIcon />,
            },
            {
              title: "Live Mock Interviews",
              description: "Get feedback from experienced professionals",
              icon: <MockIcon />,
            },
            {
              title: "24x7 Tech Support",
              description: "Get help via WhatsApp/Chat anytime",
              icon: <SupportIcon />,
            },
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
            <h2 className={styles.sectionTitle}>Complete CAI Course Syllabus</h2>
            <p>Service Connectors, App Connectors, Process Steps, API Gateways, Use Cases</p>
            <Button asChild className={styles.downloadButton}>
              <Link href="/syllabus/iics-cai.pdf" download>
                <DownloadIcon className={styles.buttonIcon} />
                Download Syllabus PDF
              </Link>
            </Button>
          </div>
          <Image
            src="/syllabus/cai1.PNG"
            alt="CAI Syllabus Preview"
            width={300}
            height={400}
            className={styles.syllabusImage}
          />
        </div>
      </section>

      {/* Batch Details */}
      <section className={styles.batchSection} id="enroll">
        <h2 className={styles.sectionTitle}>Upcoming Batch</h2>
        <div className={styles.batchCards}>
          <div className={styles.batchCard}>
            <h3>Batch 11</h3>
            <div className={styles.batchInfo}>
              <CalendarIcon />
              <span>Starts: June 9, 2025</span>
            </div>
            <div className={styles.batchInfo}>
              <ClockIcon />
              <span>Time: 7:30 PM - 9:00 PM IST</span>
            </div>
            <div className={styles.priceTag}>₹3,999 <span className={styles.originalPrice}>₹9,000</span></div>
            <Button asChild className={styles.enrollButton}>
              <Link href="https://course.rishabinformaticagroup.com/courses/498620" target="_blank">
                Enroll Now
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Instructor Info */}
      <section className={styles.instructorSection}>
        <div className={styles.instructorContent}>
          <Image
            src="/instructors/hari.png"
            alt="Instructor Hari A."
            width={200}
            height={200}
            className={styles.instructorImage}
          />
          <div>
            <h2 className={styles.sectionTitle}>Meet Your Instructor</h2>
            <h3>Hari A.</h3>
            <p className={styles.instructorBio}>
              14+ years in ETL & API integration. Specialized in IICS CAI and cloud architecture. Successfully trained 1000+ students.
            </p>
            <div className={styles.expertise}>
              <span>IICS CAI</span>
              <span>PowerCenter</span>
              <span>Azure</span>
              <span>API Integration</span>
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

// Custom placeholder icons
function ApiIcon() {
  return <div className={styles.icon}>🌐</div>;
}
function ConnectorIcon() {
  return <div className={styles.icon}>🔌</div>;
}
function ProcessIcon() {
  return <div className={styles.icon}>🔁</div>;
}
function QuestionIcon() {
  return <div className={styles.icon}>❓</div>;
}
function MockIcon() {
  return <div className={styles.icon}>🎙️</div>;
}
function SupportIcon() {
  return <div className={styles.icon}>💬</div>;
}
