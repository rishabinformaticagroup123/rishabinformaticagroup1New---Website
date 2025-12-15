// app/courses/IICS-Combo/page.tsx
import { Button } from "@/components/ui/button";
import { CheckIcon, DownloadIcon, CalendarIcon, ClockIcon, UserIcon, AwardIcon, ChevronRightIcon, PhoneIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

export const metadata = {
  title: "45-Day ETL Job Guarantee Program | PowerCenter + IICS + Snowflake",
  description: "Get job-ready in 45 days with our combo course. Learn SQL, Informatica PowerCenter, IICS Cloud, and Snowflake with parallel comparisons and placement support.",
};

export default function IICSComboPage() {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <span className={styles.batchBadge}>🚀 Batch 11: Enroll Before June 9!</span>
            <h1>From <span className={styles.highlight}>Zero to ETL Job</span> in 45 Days</h1>
            <h2>Master SQL + PowerCenter + IICS + Snowflake <u>Together</u></h2>
            
            <ul className={styles.heroBullets}>
              <li><CheckIcon className={styles.bulletIcon} /> <span><strong>Guaranteed</strong> Interviews or 50% Refund</span></li>
              <li><CheckIcon className={styles.bulletIcon} /> <span>Learn "Joins" Across 4 Tools in 1 Session</span></li>
              <li><CheckIcon className={styles.bulletIcon} /> <span>500+ Real Interview Q&A</span></li>
            </ul>

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
                <span>Only 30 Students</span>
              </div>
            </div>

            <div className={styles.ctaGroup}>
              <Button asChild className={styles.primaryButton}>
                <Link href="#enroll">
                  <ChevronRightIcon className={styles.buttonIcon} />
                  Enroll Now
                </Link>
              </Button>
              <Button asChild variant="outline" className={styles.secondaryButton}>
                <Link href="tel:+919448005273">
                  <PhoneIcon className={styles.buttonIcon} />
                  Call for Demo
                </Link>
              </Button>
            </div>
          </div>

          <div className={styles.heroImage}>
            <Image
              src="/courses/etl-combo-visual.webp"
              alt="ETL Combo Course"
              width={600}
              height={400}
              priority
            />
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className={styles.trustBadges}>
        <div className={styles.badge}>
          <Image src="/badge-moneyback.webp" width={80} height={80} alt="Money Back Guarantee" />
          <span>30-Day Money Back</span>
        </div>
        <div className={styles.badge}>
          <Image src="/badge-placement.webp" width={80} height={80} alt="Placement Guarantee" />
          <span>Interview Guarantee</span>
        </div>
        <div className={styles.badge}>
          <Image src="/badge-certified.webp" width={80} height={80} alt="Certified Program" />
          <span>Industry-Recognized</span>
        </div>
      </section>

      {/* Course Demo */}
      <section className={styles.demoSection}>
        <h2 className={styles.sectionTitle}>See How We Teach</h2>
        <div className={styles.demoVideo}>
          <iframe 
            src="https://www.youtube.com/embed/YOUR_VIDEO_ID" 
            title="Course Demo"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          />
        </div>
      </section>

      {/* Key Features */}
      <section className={styles.featuresSection}>
        <h2 className={styles.sectionTitle}>Why This Combo Works</h2>
        <div className={styles.featuresGrid}>
          {[
            {
              title: "Side-by-Side Learning",
              description: "Compare PowerCenter vs IICS in real-time",
              icon: "/icons/compare.svg"
            },
            {
              title: "Snowflake Integration",
              description: "Build cloud pipelines end-to-end",
              icon: "/icons/snowflake.svg"
            },
            {
              title: "Job-Focused Curriculum",
              description: "508 interview questions covered",
              icon: "/icons/interview.svg"
            },
            {
              title: "Resume Builder",
              description: "With 1:1 mock interviews",
              icon: "/icons/resume.svg"
            }
          ].map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <Image src={feature.icon} width={48} height={48} alt={feature.title} />
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Unique Selling Point */}
      <section className={styles.uspSection}>
        <h2 className={styles.sectionTitle}>Learn Concepts Across All Tools</h2>
        <div className={styles.uspContent}>
          <div className={styles.uspText}>
            <h3>Example: Mastering "Joins"</h3>
            <p>In a single 2-hour session, you'll learn:</p>
            <ul>
              <li><strong>SQL Joins</strong> (Traditional syntax)</li>
              <li><strong>PowerCenter Joins</strong> (Transformations)</li>
              <li><strong>IICS Joins</strong> (Cloud mappings)</li>
              <li><strong>Snowflake Joins</strong> (Warehouse optimization)</li>
            </ul>
            <Button asChild className={styles.outlineButton}>
              <Link href="#syllabus">See Full Syllabus</Link>
            </Button>
          </div>
          <div className={styles.uspImage}>
            <Image
              src="/courses/joins-comparison.webp"
              alt="Joins Comparison"
              width={500}
              height={350}
            />
          </div>
        </div>
      </section>

      {/* Pricing Comparison */}
      <section className={styles.pricingSection}>
        <h2 className={styles.sectionTitle}>Cost Breakdown</h2>
        <div className={styles.pricingCards}>
          <div className={styles.pricingCard}>
            <h3>Market Price</h3>
            <ul>
              <li>PowerCenter: ₹15,000</li>
              <li>IICS: ₹18,000</li>
              <li>SQL + Snowflake: ₹10,000</li>
              <li><strong>Total: ₹43,000</strong></li>
            </ul>
          </div>
          <div className={styles.pricingCardHighlight}>
            <span className={styles.bestValue}>Best Value</span>
            <h3>Our Combo</h3>
            <div className={styles.price}>₹9,600</div>
            <p className={styles.savings}>Save ₹33,400</p>
            <Button asChild className={styles.enrollButton}>
              <Link href="#enroll">Enroll Now</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 45-Day Plan */}
      <section className={styles.planSection}>
        <h2 className={styles.sectionTitle}>Your 45-Day Job Plan</h2>
        <div className={styles.timeline}>
          {[
            { day: "1-5", title: "Core SQL + PowerCenter", detail: "Basic to advanced concepts" },
            { day: "6-15", title: "IICS Cloud Deep Dive", detail: "CDI & CAI implementations" },
            { day: "16-25", title: "Snowflake Integration", detail: "Building end-to-end pipelines" },
            { day: "26-35", title: "Mock Interviews", detail: "3 rounds with feedback" },
            { day: "36-45", title: "Placement Drive", detail: "Interview scheduling" }
          ].map((item, index) => (
            <div key={index} className={styles.timelineItem}>
              <div className={styles.timelineDot}></div>
              <div className={styles.timelineContent}>
                <h3>Day {item.day}: {item.title}</h3>
                <p>{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Instructor Section */}
      <section className={styles.instructorSection}>
        <div className={styles.instructorContent}>
          <div className={styles.instructorImage}>
            <Image
              src="/instructors/hari.webp"
              alt="Hari A. - Lead Instructor"
              width={200}
              height={200}
              className={styles.instructorPhoto}
            />
            <div className={styles.socialProof}>
              <Image src="/icons/linkedin-verified.webp" width={120} height={40} alt="LinkedIn Verified" />
            </div>
          </div>
          <div className={styles.instructorBio}>
            <h2 className={styles.sectionTitle}>Your Mentor</h2>
            <h3>Hari A.</h3>
            <p className={styles.instructorTagline}>14+ Years ETL Expert | Trained 1000+ Students</p>
            <ul className={styles.instructorPoints}>
              <li>Ex-TCS, IBM Consultant</li>
              <li>Specialized in Cloud Migrations</li>
              <li>5-Star Rated Instructor</li>
            </ul>
            <div className={styles.expertiseTags}>
              <span>Informatica PowerCenter</span>
              <span>IICS Cloud</span>
              <span>Snowflake</span>
              <span>Azure Data</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className={styles.testimonialsSection}>
        <h2 className={styles.sectionTitle}>Success Stories</h2>
        <div className={styles.testimonialGrid}>
          {[
            {
              quote: "Got placed at Infosys with 9LPA right after this course! The PowerCenter vs IICS comparisons were game-changing.",
              name: "Shekar M.",
              role: "ETL Developer @ Infosys",
              image: "/testimonials/shekar.webp",
              linkedin: "#"
            },
            {
              quote: "From mechanical engineering to ETL developer in 45 days! The mock interviews prepared me perfectly.",
              name: "Nitish S.",
              role: "Data Engineer @ Accenture",
              image: "/testimonials/nitish.webp",
              linkedin: "#"
            }
          ].map((testimonial, index) => (
            <div key={index} className={styles.testimonialCard}>
              <div className={styles.testimonialHeader}>
                <Image 
                  src={testimonial.image} 
                  width={80} 
                  height={80} 
                  alt={testimonial.name}
                  className={styles.testimonialAvatar}
                />
                <div>
                  <h3>{testimonial.name}</h3>
                  <p>{testimonial.role}</p>
                </div>
              </div>
              <p className={styles.testimonialQuote}>"{testimonial.quote}"</p>
              <Link href={testimonial.linkedin} className={styles.linkedinLink}>
                View LinkedIn Profile →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className={styles.finalCta} id="enroll">
        <div className={styles.ctaContent}>
          <h2>Ready to Transform Your Career?</h2>
          <p>Limited to 30 students per batch. Next session starts June 9, 2025.</p>
          <div className={styles.priceBox}>
            <div className={styles.price}>₹9,600</div>
            <div className={styles.originalPrice}>₹43,000</div>
            <div className={styles.discount}>77% OFF</div>
          </div>
          <Button asChild className={styles.ctaButton}>
            <Link href="https://course.rishabinformaticagroup.com/courses/678331">
              Enroll Now →
            </Link>
          </Button>
          <div className={styles.guaranteeBadge}>
            <Image src="/badge-guarantee.webp" width={24} height={24} alt="Guarantee" />
            <span>30-day money-back guarantee</span>
          </div>
        </div>
      </section>
    </div>
  );
}