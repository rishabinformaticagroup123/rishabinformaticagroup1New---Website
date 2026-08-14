// app/courses/dataops-mlops/page.tsx

import {
  CheckIcon,
  DownloadIcon,
  CalendarIcon,
  ClockIcon,
  UsersIcon,
  AwardIcon,
  Building2Icon,
  Code2Icon,
  DatabaseIcon,
  WorkflowIcon,
  BrainCircuitIcon,
  CloudIcon,
  BarChart3Icon,
  ShieldCheckIcon,
  GraduationCapIcon,
  BriefcaseBusinessIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

export const metadata = {
  title:
    "DataOps & MLOps Corporate Training | Airflow, MLflow, Docker, FastAPI & Monitoring",
  description:
    "Industry-oriented DataOps and MLOps corporate training covering Apache Airflow, Docker, Jupyter, MLflow, FastAPI, Prometheus, Grafana, CI/CD, model deployment and monitoring. Customized programs for corporates, universities and colleges.",
};

export default function DataOpsMLOpsPage() {
  return (
    <div className={styles.container}>
      {/* HERO SECTION */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <span className={styles.batchBadge}>
              Corporate & Academic Training Program
            </span>

            <h1>
              DataOps & <span className={styles.highlight}>MLOps</span>{" "}
              Training
            </h1>

            <h2>
              Build, Automate, Deploy & Monitor Modern Data and Machine
              Learning Pipelines
            </h2>

            <p className={styles.heroDescription}>
              A hands-on industry-oriented training program covering the
              complete DataOps and MLOps lifecycle — from data pipelines and
              workflow orchestration to machine learning experiment tracking,
              deployment, monitoring and automation.
            </p>

            <div className={styles.heroStats}>
              <div className={styles.statItem}>
                <ClockIcon className={styles.statIcon} />
                <span>20 Hours Program</span>
              </div>

              <div className={styles.statItem}>
                <CalendarIcon className={styles.statIcon} />
                <span>5 Practical Units</span>
              </div>

              <div className={styles.statItem}>
                <UsersIcon className={styles.statIcon} />
                <span>Corporate & Academic Batches</span>
              </div>
            </div>

            <div className={styles.ctaGroup}>
              <Button asChild className={styles.primaryButton}>
                <Link href="#corporate-enquiry">
                  Request Corporate Training
                </Link>
              </Button>

              <Button asChild variant="outline" className={styles.secondaryButton}>
                <Link href="#syllabus">
                  View Course Syllabus
                </Link>
              </Button>
            </div>
          </div>

          <div className={styles.heroImage}>
            <Image
              src="/courses/dataops-mlops.png"
              alt="DataOps and MLOps Corporate Training"
              width={600}
              height={400}
              className={styles.courseImage}
            />
          </div>
        </div>
      </section>

      {/* CORPORATE TRAINING BADGE */}
      <section className={styles.certificationSection}>
        <div className={styles.certificationBadge}>
          <Building2Icon className={styles.badgeIcon} />

          <div>
            <h3>Designed for Corporate & Academic Training</h3>
            <p>
              Programs can be customized based on organizational,
              university or college requirements.
            </p>
          </div>
        </div>
      </section>

      {/* WHY DATAOPS MLOPS */}
      <section className={styles.featuresSection}>
        <h2 className={styles.sectionTitle}>
          Why Choose Our DataOps & MLOps Training
        </h2>

        <p className={styles.sectionDescription}>
          The program combines conceptual understanding with hands-on
          implementation using an integrated DataOps and MLOps technology
          stack.
        </p>

        <div className={styles.featuresGrid}>
          {[
            {
              title: "End-to-End MLOps Lifecycle",
              description:
                "Understand the complete journey from data preparation and model training to deployment and monitoring.",
              icon: <BrainCircuitIcon />,
            },
            {
              title: "Data Pipeline Automation",
              description:
                "Learn workflow orchestration, pipeline automation and scheduling using Apache Airflow.",
              icon: <WorkflowIcon />,
            },
            {
              title: "MLflow Experiment Tracking",
              description:
                "Track experiments, parameters, metrics and model lifecycle using MLflow.",
              icon: <BarChart3Icon />,
            },
            {
              title: "Docker-Based Environment",
              description:
                "Practice multiple DataOps and MLOps components using a ready-to-use Docker environment.",
              icon: <CloudIcon />,
            },
            {
              title: "Model Deployment",
              description:
                "Understand how trained machine learning models can be exposed through APIs using FastAPI.",
              icon: <Code2Icon />,
            },
            {
              title: "Monitoring & Observability",
              description:
                "Introduction to application and ML monitoring using Prometheus and Grafana.",
              icon: <DatabaseIcon />,
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

      {/* TECHNOLOGY STACK */}
      <section className={styles.stackSection}>
        <h2 className={styles.sectionTitle}>
          Technology Stack Covered
        </h2>

        <p className={styles.sectionDescription}>
          Participants work with a practical technology stack representing
          commonly used components across modern DataOps and MLOps workflows.
        </p>

        <div className={styles.stackGrid}>
          {[
            "Python",
            "Jupyter",
            "Docker",
            "Apache Airflow",
            "MLflow",
            "FastAPI",
            "Prometheus",
            "Grafana",
            "Git / CI-CD Concepts",
            "Machine Learning",
            "Data Pipelines",
            "Model Monitoring",
          ].map((tool, index) => (
            <div key={index} className={styles.stackItem}>
              <CheckIcon size={18} />
              <span>{tool}</span>
            </div>
          ))}
        </div>
      </section>

      {/* COURSE STRUCTURE */}
      <section className={styles.curriculumSection} id="syllabus">
        <h2 className={styles.sectionTitle}>
          20-Hour DataOps & MLOps Course Structure
        </h2>

        <p className={styles.sectionDescription}>
          The program is organized into five practical units. Each unit
          consists of two sessions of two hours.
        </p>

        <div className={styles.curriculumGrid}>
          <div className={styles.curriculumCard}>
            <span className={styles.unitNumber}>01</span>

            <h3>DataOps & MLOps Foundations</h3>

            <p>
              DataOps and MLOps concepts, lifecycle, architecture,
              responsibilities, automation and modern ML workflows.
            </p>
          </div>

          <div className={styles.curriculumCard}>
            <span className={styles.unitNumber}>02</span>

            <h3>DataOps & Pipeline Automation</h3>

            <p>
              Data pipelines, workflow orchestration, Apache Airflow,
              automation and pipeline execution concepts.
            </p>
          </div>

          <div className={styles.curriculumCard}>
            <span className={styles.unitNumber}>03</span>

            <h3>MLOps & Experiment Tracking</h3>

            <p>
              Machine learning workflow, Docker, MLflow experiments,
              parameters, metrics, model lifecycle and tracking.
            </p>
          </div>

          <div className={styles.curriculumCard}>
            <span className={styles.unitNumber}>04</span>

            <h3>Model Deployment & Monitoring</h3>

            <p>
              Model serving, FastAPI, monitoring concepts, Prometheus,
              Grafana and operational visibility.
            </p>
          </div>

          <div className={styles.curriculumCard}>
            <span className={styles.unitNumber}>05</span>

            <h3>Cloud, Governance & Future MLOps</h3>

            <p>
              Cloud MLOps concepts, governance, responsible AI,
              LLMOps, RAG and emerging AI operations concepts.
            </p>
          </div>
        </div>

        <div className={styles.syllabusDownload}>
          <div>
            <h3>Detailed Course Syllabus</h3>

            <p>
              Download the complete module-wise DataOps & MLOps syllabus.
            </p>
          </div>

          <Button asChild className={styles.downloadButton}>
            <Link href="/syllabus/dataops-mlops.pdf" download>
              <DownloadIcon className={styles.buttonIcon} />
              Download Syllabus PDF
            </Link>
          </Button>
        </div>
      </section>

      {/* HANDS-ON PRACTICAL */}
      <section className={styles.practicalSection}>
        <div className={styles.practicalContent}>
          <div>
            <h2 className={styles.sectionTitle}>
              Hands-On Practical Environment
            </h2>

            <p className={styles.heroDescription}>
              Participants can practice the complete workflow using a
              containerized environment with multiple DataOps and MLOps
              components.
            </p>

            <div className={styles.checkList}>
              {[
                "Jupyter-based Python and ML practice",
                "Apache Airflow workflow orchestration",
                "MLflow experiment tracking",
                "Docker-based service environment",
                "FastAPI model serving",
                "Prometheus monitoring",
                "Grafana dashboards",
                "End-to-end DataOps and MLOps scenarios",
              ].map((item, index) => (
                <div key={index} className={styles.checkItem}>
                  <CheckIcon size={20} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.practicalBadge}>
            <Code2Icon size={52} />

            <h3>Learn by Doing</h3>

            <p>
              Concepts are supported with practical demonstrations,
              exercises and real-world workflow scenarios.
            </p>
          </div>
        </div>
      </section>

      {/* WHO CAN ATTEND */}
      <section className={styles.audienceSection}>
        <h2 className={styles.sectionTitle}>
          Suitable For
        </h2>

        <div className={styles.audienceGrid}>
          <div className={styles.audienceCard}>
            <Building2Icon />

            <h3>Corporate Teams</h3>

            <p>
              Upskill data engineering, ML engineering and analytics teams
              with practical DataOps and MLOps workflows.
            </p>
          </div>

          <div className={styles.audienceCard}>
            <GraduationCapIcon />

            <h3>Universities & Colleges</h3>

            <p>
              Industry-oriented workshops, curriculum-aligned training,
              technical bootcamps and practical programs.
            </p>
          </div>

          <div className={styles.audienceCard}>
            <BriefcaseBusinessIcon />

            <h3>Working Professionals</h3>

            <p>
              Build practical knowledge of modern ML lifecycle management,
              automation and monitoring.
            </p>
          </div>

          <div className={styles.audienceCard}>
            <ShieldCheckIcon />

            <h3>Faculty Development</h3>

            <p>
              Faculty-oriented technology programs designed to bridge
              academic concepts with current industry practices.
            </p>
          </div>
        </div>
      </section>

      {/* TRAINING FORMAT */}
      <section className={styles.batchSection}>
        <h2 className={styles.sectionTitle}>
          Flexible Training Formats
        </h2>

        <div className={styles.batchCards}>
          <div className={styles.batchCard}>
            <h3>Corporate Training</h3>

            <div className={styles.batchInfo}>
              <UsersIcon />
              <span>Private employee batches</span>
            </div>

            <div className={styles.batchInfo}>
              <ClockIcon />
              <span>Customized duration & schedule</span>
            </div>

            <div className={styles.batchInfo}>
              <CheckIcon />
              <span>Organization-specific use cases</span>
            </div>

            <Button asChild className={styles.enrollButton}>
              <Link href="#corporate-enquiry">
                Discuss Corporate Training
              </Link>
            </Button>
          </div>

          <div className={styles.batchCard}>
            <h3>University / College Program</h3>

            <div className={styles.batchInfo}>
              <GraduationCapIcon />
              <span>Student technical training</span>
            </div>

            <div className={styles.batchInfo}>
              <ClockIcon />
              <span>Workshops / bootcamps / semester programs</span>
            </div>

            <div className={styles.batchInfo}>
              <CheckIcon />
              <span>Hands-on practical environment</span>
            </div>

            <Button asChild className={styles.enrollButton}>
              <Link href="#corporate-enquiry">
                Enquire for Institution
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CERTIFICATE */}
      <section className={styles.certificationSection}>
        <div className={styles.certificationBadge}>
          <AwardIcon className={styles.badgeIcon} />

          <div>
            <h3>Certificate of Completion</h3>

            <p>
              Participants can receive a course completion certificate
              based on the training program and institutional requirements.
            </p>
          </div>
        </div>
      </section>

      {/* CORPORATE ENQUIRY */}
      <section
        className={styles.enquirySection}
        id="corporate-enquiry"
      >
        <div className={styles.enquiryContent}>
          <div>
            <span className={styles.batchBadge}>
              Corporate / University Enquiry
            </span>

            <h2 className={styles.sectionTitle}>
              Bring DataOps & MLOps Training to Your Organization
            </h2>

            <p className={styles.heroDescription}>
              Looking for industry-oriented DataOps and MLOps training for
              your employees, students or faculty? Connect with us to
              discuss customized training programs, batch size, duration,
              syllabus and practical requirements.
            </p>
          </div>

          <div className={styles.enquiryActions}>
            <Button asChild className={styles.primaryButton}>
              <Link href="/contact">
                Contact Us
              </Link>
            </Button>

            <Button asChild variant="outline" className={styles.secondaryButton}>
              <Link href="/courses">
                Explore More Courses
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FOOTER CTA */}
      <section className={styles.finalCta}>
        <h2>
          Build Practical DataOps & MLOps Skills for the Modern AI Era
        </h2>

        <p>
          Industry-oriented training for corporates, universities,
          colleges and technology teams.
        </p>

        <Button asChild className={styles.primaryButton}>
          <Link href="/contact">
            Start a Training Discussion
          </Link>
        </Button>
      </section>
    </div>
  );
}