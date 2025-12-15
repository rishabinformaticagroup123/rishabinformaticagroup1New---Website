// app/courses/internship/page.tsx
import { Button } from "@/components/ui/button";
import { CheckIcon, CalendarIcon, ClockIcon, UserIcon, AwardIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import TestimonialSlider from "@/components/testimonial-slider";

export const metadata = {
  title: "Internship Program | Gain Real-time Project Experience",
  description: "Join our Internship Program with IICS COMBO and Snowflake COMBO courses. Gain hands-on experience, build your resume, and get placement guidance.",
};

export default function InternshipPage() {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <h1>Professional Internship Program</h1>
            <h2>Gain Real-Time Project Experience with Our Courses</h2>
            <p className={styles.heroDescription}>
              Our internship program is designed to bridge the gap between learning and industry experience.
              Students work on live projects, gain practical knowledge, and enhance their resumes for better career opportunities.
            </p>
            <div className={styles.heroStats}>
              <div className={styles.statItem}>
                <CalendarIcon className={styles.statIcon} />
                <span>Duration: 4-6 Weeks</span>
              </div>
              <div className={styles.statItem}>
                <ClockIcon className={styles.statIcon} />
                <span>Flexible Timing (Along with Course)</span>
              </div>
              <div className={styles.statItem}>
                <UserIcon className={styles.statIcon} />
                <span>Hands-on Guidance from Experts</span>
              </div>
            </div>
            <div className={styles.ctaGroup}>
              <Button asChild className={styles.primaryButton}>
                <Link href="/about/contact">Contact Us for Queries</Link>
              </Button>
            </div>
          </div>

          <div className={styles.heroImage}>
            <Image
              src="/courses/internship.png"
              alt="Internship Program"
              width={600}
              height={400}
              className={styles.courseImage}
            />
          </div>
        </div>
      </section>

      {/* Why Internship Section */}
      <section className={styles.featuresSection}>
        <h2 className={styles.sectionTitle}>Why Join Our Internship Program?</h2>
        <div className={styles.featuresGrid}>
          {[
            { title: "Practical Experience", description: "Work on real-time projects included in IICS & Snowflake courses", icon: <CheckIcon /> },
            { title: "Resume Enhancement", description: "Showcase project work and internships to future employers", icon: <CheckIcon /> },
            { title: "Bridge Career Gap", description: "Avoid gaps in your resume and gain industry-ready skills", icon: <CheckIcon /> },
            { title: "Placement Advantage", description: "Get guidance for interviews and improve chances of placement", icon: <CheckIcon /> },
            { title: "Certificate of Internship", description: "Official certificate validating your project and internship experience", icon: <AwardIcon /> },
            { title: "No Extra Fees", description: "Internship included in your current course fee", icon: <CheckIcon /> },
          ].map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Courses for Internship */}
      <section className={styles.comparisonSection}>
        <h2 className={styles.sectionTitle}>Courses Included in Internship</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.featureCard}>
            <h3>IICS COMBO Live Training</h3>
            <p>SQL + PowerCenter + IICS Cloud + Snowflake</p>
            <Button asChild className={styles.enrollButton}>
              <Link href="https://www.rishabinformaticagroup.com/courses/iics-combo-live" target="_blank">
                Enroll Now
              </Link>
            </Button>
          </div>
          <div className={styles.featureCard}>
            <h3>Snowflake COMBO Live Training</h3>
            <p>Snowflake + SQL + ETL & Data Warehouse Concepts</p>
            <Button asChild className={styles.enrollButton}>
              <Link href="https://www.rishabinformaticagroup.com/courses/snowflake-combo-live" target="_blank">
                Enroll Now
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className={styles.featuresSection}>
        <h2 className={styles.sectionTitle}>Benefits of Completing Internship</h2>
        <ul className={styles.benefitsList}>
          <li>Gain hands-on experience on real industry scenarios</li>
          <li>Build strong resumes that stand out to companies</li>
          <li>Showcase skills with practical projects instead of only theoretical knowledge</li>
          <li>Prepare for interviews with guidance from expert trainers</li>
          <li>Get a certificate for internship completion recognized by industry partners</li>
          <li>Bridge gaps in career and demonstrate consistent learning</li>
        </ul>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Student Internship Success Stories
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear from students who benefited from internships with our courses
            </p>
          </div>
          <TestimonialSlider />
        </div>
      </section>

      {/* Contact CTA */}
      <section className={styles.ctaSection}>
        <h2 className={styles.sectionTitle}>Want to Know More or Apply?</h2>
        <p>Contact us for details about the internship, eligibility, and batch schedules.</p>
        <Button asChild className={styles.primaryButton}>
          <Link href="/about/contact">Contact Us</Link>
        </Button>
      </section>
    </div>
  );
}
