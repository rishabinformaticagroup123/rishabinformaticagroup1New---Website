import { Button } from "@/components/ui/button";
import { CheckIcon, DownloadIcon, CalendarIcon, ClockIcon, UserIcon, AwardIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

export const metadata = {
  title: "Azure Data Engineering COMBO Training | SQL Server + ADF + Databricks",
  description: "Join Batch 3 starting June 25, 2025. Master Azure Data Engineering with SQL Server, Data Factory, and Databricks with live projects and placement support.",
};

export default function AzureDataEngineeringComboPage() {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <span className={styles.batchBadge}>New Batch 3 Starts June 25, 2025</span>
            <h1>Azure Data Engineering <span className={styles.highlight}>COMBO</span> Training Live</h1>
            <h2>SQL Server + Azure Data Factory + Azure Databricks</h2>
            <p className={styles.heroDescription}>
              Master modern data engineering on Azure with this comprehensive 6-week program. Hands-on training with real-world projects and job placement assistance.
            </p>
            
            <div className={styles.heroStats}>
              <div className={styles.statItem}>
                <CalendarIcon className={styles.statIcon} />
                <span> 60 Days Program</span>
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
              src="/courses/azure.PNG"
              alt="Azure Data Engineering COMBO Training"
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
            <h3>Azure Data Engineering Certificate</h3>
            <p>Recognized by industry partners</p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className={styles.featuresSection}>
        <h2 className={styles.sectionTitle}>Why Our Azure Data Engineering Training Stands Out</h2>
        <div className={styles.featuresGrid}>
          {[
            {
              title: "End-to-End Pipelines",
              description: "Design complete data solutions from ingestion to analytics",
              icon: <PipelineIcon />
            },
            {
              title: "Real Azure Projects",
              description: "Hands-on with actual Azure resources and services",
              icon: <CloudIcon />
            },
            {
              title: "PySpark in Databricks",
              description: "Master big data processing with Spark",
              icon: <SparkIcon />
            },
            {
              title: "500+ Interview Q&A",
              description: "Curated question bank for Azure DE roles",
              icon: <QuestionIcon />
            },
            {
              title: "Lifetime Access",
              description: "To recordings and updated materials",
              icon: <AccessIcon />
            },
            {
              title: "Resume & Interview Prep",
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

      {/* Technology Stack Table */}
      <section className={styles.comparisonSection}>
        <h2 className={styles.sectionTitle}>Azure Data Engineering Stack You'll Master</h2>
        <div className={styles.comparisonTable}>
          <div className={styles.tableHeader}>
            <div>Component</div>
            <div>Technology</div>
            <div>Use Case</div>
          </div>
          {[
            ["Data Storage", "Azure SQL DB, Blob Storage", "Structured and unstructured data storage"],
            ["Data Processing", "Azure Data Factory", "Orchestration and ETL"],
            ["Big Data", "Azure Databricks", "Spark-based processing"],
            ["Data Warehousing", "Synapse Analytics", "Large-scale analytics"],
            ["Monitoring", "Azure Monitor", "Pipeline observability"]
          ].map(([component, tech, useCase], index) => (
            <div key={index} className={styles.tableRow}>
              <div>{component}</div>
              <div>{tech}</div>
              <div>{useCase}</div>
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
              <Link href="/syllabus/azure-de-syllabus.pdf" download>
                <DownloadIcon className={styles.buttonIcon} />
                Download Syllabus PDF
              </Link>
            </Button>
          </div>
          <Image
            src="/syllabus-preview-azure.png"
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
            <h3>Batch 3</h3>
            <div className={styles.batchInfo}>
              <CalendarIcon />
              <span>Starts: June 25, 2025</span>
            </div>
            <div className={styles.batchInfo}>
              <ClockIcon />
              <span>Timing: 7:30 PM - 9:30 PM IST</span>
            </div>
            <div className={styles.priceTag}>₹12,000 <span className={styles.originalPrice}>₹20,000</span></div>
            <Button asChild className={styles.enrollButton}>
              <Link href="https://course.rishabinformaticagroup.com/courses/588339" target="_blank">
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
            src="/courses/azure.PNG"
            alt="Vijay - Azure Instructor"
            width={200}
            height={200}
            className={styles.instructorImage}
          />
          <div>
            <h2 className={styles.sectionTitle}>Your Instructor</h2>
            <h3>Vijay K.</h3>
            <p className={styles.instructorBio}>
              6+ years experience in Azure data engineering and training. Former consultant at Microsoft and Deloitte. 
              Certified Azure Data Engineer with 500+ professionals trained.
            </p>
            <div className={styles.expertise}>
              <span>Azure Data Factory</span>
              <span>Azure Databricks</span>
              <span>SQL Server</span>
              <span>PySpark</span>
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
              quote: "The ADF and Databricks projects helped me get promoted to Senior Data Engineer role.",
              name: "Sanjay P.",
              company: "TCS"
            },
            {
              quote: "Vijay's teaching style made complex Azure concepts easy to understand and implement.",
              name: "Ananya R.",
              company: "Wipro"
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
function PipelineIcon() { return <div className={styles.icon}>⛓️</div> }
function CloudIcon() { return <div className={styles.icon}>☁️</div> }
function SparkIcon() { return <div className={styles.icon}>⚡</div> }
function QuestionIcon() { return <div className={styles.icon}>❓</div> }
function AccessIcon() { return <div className={styles.icon}>♾️</div> }
function ResumeIcon() { return <div className={styles.icon}>📄</div> }