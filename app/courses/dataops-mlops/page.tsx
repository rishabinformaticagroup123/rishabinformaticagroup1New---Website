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
    "DataOps & MLOps Training | Corporate, University & Professional Training",
  description:
    "Industry-oriented DataOps and MLOps training covering DataOps, MLOps, Apache Airflow, Docker, MLflow, Jupyter, FastAPI, CI/CD, monitoring and modern AI operations. Customized training programs for corporates, universities, colleges and professionals.",
};

export default function DataOpsMLOpsPage() {
  return (
    <div className={styles.container}>

      {/* =========================================================
          HERO SECTION
      ========================================================= */}

      <section className={styles.hero}>
        <div className={styles.heroContent}>

          <div className={styles.heroText}>

            <span className={styles.batchBadge}>
              Corporate • University • College • Professional Training
            </span>

            <h1>
              DataOps &{" "}
              <span className={styles.highlight}>MLOps</span>{" "}
              Training
            </h1>

            <h2>
              Build, Automate, Deploy & Monitor Modern Data and
              Machine Learning Pipelines
            </h2>

            <p className={styles.heroDescription}>
              Industry-oriented training covering the complete DataOps
              and MLOps lifecycle — from data pipelines and workflow
              automation to machine learning experimentation,
              containerization, deployment, monitoring and modern AI
              operations.
            </p>

            <div className={styles.heroStats}>

              <div className={styles.statItem}>
                <ClockIcon className={styles.statIcon} />
                <span>Customizable Duration</span>
              </div>

              <div className={styles.statItem}>
                <CalendarIcon className={styles.statIcon} />
                <span>5 Core Learning Units</span>
              </div>

              <div className={styles.statItem}>
                <UsersIcon className={styles.statIcon} />
                <span>Flexible Batch Size</span>
              </div>

            </div>

            <div className={styles.ctaGroup}>

              <Button
                asChild
                className={styles.primaryButton}
              >
                <Link href="#training-enquiry">
                  Request Training
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className={styles.secondaryButton}
              >
                <Link href="#syllabus">
                  View Syllabus
                </Link>
              </Button>

            </div>

          </div>

          <div className={styles.heroImage}>

            <Image
              src="/courses/dataops-mlops.png"
              alt="DataOps and MLOps Training"
              width={600}
              height={400}
              className={styles.courseImage}
            />

          </div>

        </div>
      </section>


      {/* =========================================================
          TRAINING POSITIONING
      ========================================================= */}

      <section className={styles.certificationSection}>

        <div className={styles.certificationBadge}>

          <Building2Icon className={styles.badgeIcon} />

          <div>

            <h3>
              Industry-Oriented DataOps & MLOps Training
            </h3>

            <p>
              Training programs can be customized based on the
              organization, university, college, audience level,
              technology requirements and desired duration.
            </p>

          </div>

        </div>

      </section>


      {/* =========================================================
          WHY THIS TRAINING
      ========================================================= */}

      <section className={styles.featuresSection}>

        <h2 className={styles.sectionTitle}>
          Why Choose Our DataOps & MLOps Training
        </h2>

        <p className={styles.sectionDescription}>
          Learn the concepts, tools and workflows used across modern
          DataOps and MLOps environments through practical demonstrations,
          hands-on exercises and real-world scenarios.
        </p>

        <div className={styles.featuresGrid}>

          {[
            {
              title: "DataOps Foundations",
              description:
                "Understand data pipelines, data lifecycle, automation, data quality and modern DataOps practices.",
              icon: <DatabaseIcon />,
            },

            {
              title: "Pipeline Automation",
              description:
                "Learn workflow orchestration, scheduling, dependencies and automation using Apache Airflow.",
              icon: <WorkflowIcon />,
            },

            {
              title: "ML Experiment Tracking",
              description:
                "Track parameters, metrics, artifacts and machine learning experiments using MLflow.",
              icon: <BarChart3Icon />,
            },

            {
              title: "Docker & Containerization",
              description:
                "Understand images, containers, Dockerfiles, Docker Compose and reproducible ML environments.",
              icon: <CloudIcon />,
            },

            {
              title: "Model Deployment",
              description:
                "Learn model serialization, REST APIs and model serving using practical deployment scenarios.",
              icon: <Code2Icon />,
            },

            {
              title: "Monitoring & Observability",
              description:
                "Understand application and ML monitoring using Prometheus, Grafana, logging and operational metrics.",
              icon: <ShieldCheckIcon />,
            },

          ].map((feature, index) => (

            <div
              key={index}
              className={styles.featureCard}
            >

              <div className={styles.featureIcon}>
                {feature.icon}
              </div>

              <h3>{feature.title}</h3>

              <p>{feature.description}</p>

            </div>

          ))}

        </div>

      </section>


      {/* =========================================================
          TECHNOLOGY STACK
      ========================================================= */}

      <section className={styles.stackSection}>

        <h2 className={styles.sectionTitle}>
          Technology Stack
        </h2>

        <p className={styles.sectionDescription}>
          Practical exposure can be customized according to the
          training requirement.
        </p>

        <div className={styles.stackGrid}>

          {[
            "Python",
            "Jupyter",
            "Apache Airflow",
            "Docker",
            "Docker Compose",
            "MLflow",
            "FastAPI",
            "Prometheus",
            "Grafana",
            "Git",
            "CI/CD Concepts",
            "Machine Learning",
            "Data Pipelines",
            "Model Monitoring",
          ].map((tool, index) => (

            <div
              key={index}
              className={styles.stackItem}
            >

              <CheckIcon size={18} />

              <span>{tool}</span>

            </div>

          ))}

        </div>

      </section>


      {/* =========================================================
          COURSE STRUCTURE
      ========================================================= */}

      <section
        className={styles.curriculumSection}
        id="syllabus"
      >

        <h2 className={styles.sectionTitle}>
          DataOps & MLOps Course Structure
        </h2>

        <p className={styles.sectionDescription}>
          The program is organized into five core learning units.
          Training depth, practical sessions and duration can be
          customized according to the audience and requirements.
        </p>

        <div className={styles.curriculumGrid}>

          {/* UNIT 1 */}

          <div className={styles.curriculumCard}>

            <span className={styles.unitNumber}>
              01
            </span>

            <h3>
              Foundations of DataOps & MLOps
            </h3>

            <p>
              Introduction to DataOps and MLOps, modern data and
              machine learning lifecycles, operational challenges,
              workflows and industry concepts.
            </p>

          </div>


          {/* UNIT 2 */}

          <div className={styles.curriculumCard}>

            <span className={styles.unitNumber}>
              02
            </span>

            <h3>
              DataOps & Pipeline Automation
            </h3>

            <p>
              Data pipelines, ingestion concepts, ETL and ELT,
              workflow automation, Apache Airflow, data quality
              and pipeline management.
            </p>

          </div>


          {/* UNIT 3 */}

          <div className={styles.curriculumCard}>

            <span className={styles.unitNumber}>
              03
            </span>

            <h3>
              MLOps Workflow & Model Lifecycle
            </h3>

            <p>
              ML experiment tracking, model packaging and
              serialization, containerization, Docker, CI/CD
              concepts and MLflow.
            </p>

          </div>


          {/* UNIT 4 */}

          <div className={styles.curriculumCard}>

            <span className={styles.unitNumber}>
              04
            </span>

            <h3>
              Model Deployment & Monitoring
            </h3>

            <p>
              Model deployment, REST APIs, FastAPI, monitoring,
              logging, observability, drift detection and
              production ML concepts.
            </p>

          </div>


          {/* UNIT 5 */}

          <div className={styles.curriculumCard}>

            <span className={styles.unitNumber}>
              05
            </span>

            <h3>
              Cloud MLOps, Governance & Future AI Operations
            </h3>

            <p>
              Cloud MLOps, governance, responsible AI, LLMOps,
              RAG, AI Agents and emerging AI operations concepts.
            </p>

          </div>

        </div>


        {/* SYLLABUS DOWNLOAD */}

        <div className={styles.syllabusDownload}>

          <div>

            <h3>
              Detailed Course Syllabus
            </h3>

            <p>
              Download the detailed module-wise DataOps &
              MLOps syllabus.
            </p>

          </div>

          <Button
            asChild
            className={styles.downloadButton}
          >

            <Link
              href="/syllabus/dataops-mlops.pdf"
              download
            >

              <DownloadIcon
                className={styles.buttonIcon}
              />

              Download Syllabus PDF

            </Link>

          </Button>

        </div>

      </section>


      {/* =========================================================
          HANDS-ON ENVIRONMENT
      ========================================================= */}

      <section className={styles.practicalSection}>

        <div className={styles.practicalContent}>

          <div>

            <h2 className={styles.sectionTitle}>
              Hands-On Practical Environment
            </h2>

            <p className={styles.heroDescription}>
              Practical training can be delivered using a
              containerized DataOps and MLOps environment,
              allowing participants to work with multiple
              technologies in an integrated workflow.
            </p>

            <div className={styles.checkList}>

              {[
                "Jupyter-based Python and ML development",
                "Apache Airflow workflow orchestration",
                "MLflow experiment tracking",
                "Docker and Docker Compose",
                "FastAPI model serving",
                "Prometheus monitoring",
                "Grafana dashboards",
                "End-to-end MLOps workflow scenarios",
              ].map((item, index) => (

                <div
                  key={index}
                  className={styles.checkItem}
                >

                  <CheckIcon size={20} />

                  <span>{item}</span>

                </div>

              ))}

            </div>

          </div>


          <div className={styles.practicalBadge}>

            <Code2Icon size={52} />

            <h3>
              Learn by Doing
            </h3>

            <p>
              Concepts are reinforced through practical
              demonstrations, hands-on exercises and
              real-world workflow scenarios.
            </p>

          </div>

        </div>

      </section>


      {/* =========================================================
          TRAINING AUDIENCE
      ========================================================= */}

      <section className={styles.audienceSection}>

        <h2 className={styles.sectionTitle}>
          Training Programs For
        </h2>

        <div className={styles.audienceGrid}>


          {/* CORPORATE */}

          <div className={styles.audienceCard}>

            <Building2Icon />

            <h3>
              Corporate Teams
            </h3>

            <p>
              Customized technical training for data engineering,
              analytics, ML engineering and technology teams.
            </p>

          </div>


          {/* COLLEGES */}

          <div className={styles.audienceCard}>

            <GraduationCapIcon />

            <h3>
              Universities & Colleges
            </h3>

            <p>
              Industry-oriented workshops, technical programs,
              hands-on labs and curriculum-aligned training.
            </p>

          </div>


          {/* PROFESSIONALS */}

          <div className={styles.audienceCard}>

            <BriefcaseBusinessIcon />

            <h3>
              Working Professionals
            </h3>

            <p>
              Instructor-led programs designed to strengthen
              practical DataOps and MLOps skills.
            </p>

          </div>


          {/* FACULTY */}

          <div className={styles.audienceCard}>

            <ShieldCheckIcon />

            <h3>
              Faculty Development
            </h3>

            <p>
              Faculty-oriented programs designed to bridge
              academic concepts with modern industry practices.
            </p>

          </div>

        </div>

      </section>


      {/* =========================================================
          FLEXIBLE TRAINING FORMATS
      ========================================================= */}

      <section className={styles.batchSection}>

        <h2 className={styles.sectionTitle}>
          Flexible Training Formats
        </h2>

        <div className={styles.batchCards}>


          {/* COLLEGE */}

          <div className={styles.batchCard}>

            <h3>
              University / College Program
            </h3>

            <div className={styles.batchInfo}>
              <GraduationCapIcon />
              <span>
                Workshops & structured programs
              </span>
            </div>

            <div className={styles.batchInfo}>
              <ClockIcon />
              <span>
                Duration customized to academic requirements
              </span>
            </div>

            <div className={styles.batchInfo}>
              <CheckIcon />
              <span>
                Hands-on practical environment
              </span>
            </div>

            <Button
              asChild
              className={styles.enrollButton}
            >

              <Link href="#training-enquiry">
                Institutional Enquiry
              </Link>

            </Button>

          </div>


          {/* CORPORATE */}

          <div className={styles.batchCard}>

            <h3>
              Corporate Technical Training
            </h3>

            <div className={styles.batchInfo}>
              <Building2Icon />
              <span>
                Private employee batches
              </span>
            </div>

            <div className={styles.batchInfo}>
              <ClockIcon />
              <span>
                Customized duration and schedule
              </span>
            </div>

            <div className={styles.batchInfo}>
              <CheckIcon />
              <span>
                Role-based technical use cases
              </span>
            </div>

            <Button
              asChild
              className={styles.enrollButton}
            >

              <Link href="#training-enquiry">
                Corporate Enquiry
              </Link>

            </Button>

          </div>


          {/* PROFESSIONAL */}

          <div className={styles.batchCard}>

            <h3>
              Professional Live Batch
            </h3>

            <div className={styles.batchInfo}>
              <UsersIcon />
              <span>
                Instructor-led learning
              </span>
            </div>

            <div className={styles.batchInfo}>
              <ClockIcon />
              <span>
                Extended hands-on program
              </span>
            </div>

            <div className={styles.batchInfo}>
              <CheckIcon />
              <span>
                Projects and practical exercises
              </span>
            </div>

            <Button
              asChild
              className={styles.enrollButton}
            >

              <Link href="/contact">
                Join / Enquire
              </Link>

            </Button>

          </div>

        </div>

      </section>


      {/* =========================================================
          CERTIFICATION
      ========================================================= */}

      <section className={styles.certificationSection}>

        <div className={styles.certificationBadge}>

          <AwardIcon className={styles.badgeIcon} />

          <div>

            <h3>
              Certificate of Completion
            </h3>

            <p>
              Certificate options can be provided based on the
              training program and institutional requirements.
            </p>

          </div>

        </div>

      </section>


      {/* =========================================================
          TRAINING ENQUIRY
      ========================================================= */}

      <section
        className={styles.enquirySection}
        id="training-enquiry"
      >

        <div className={styles.enquiryContent}>

          <div>

            <span className={styles.batchBadge}>
              Corporate & Institutional Enquiry
            </span>

            <h2 className={styles.sectionTitle}>
              Bring DataOps & MLOps Training
              to Your Organization
            </h2>

            <p className={styles.heroDescription}>
              Looking for DataOps and MLOps training for your
              employees, students or faculty? Discuss your
              requirements with us and we can customize the
              duration, syllabus, practical sessions and
              technology stack.
            </p>

          </div>


          <div className={styles.enquiryActions}>

            <Button
              asChild
              className={styles.primaryButton}
            >

              <Link href="/contact">
                Contact Us
              </Link>

            </Button>


            <Button
              asChild
              variant="outline"
              className={styles.secondaryButton}
            >

              <Link href="/courses">
                Explore Courses
              </Link>

            </Button>

          </div>

        </div>

      </section>


      {/* =========================================================
          FINAL CTA
      ========================================================= */}

      <section className={styles.finalCta}>

        <h2>
          Build Practical DataOps & MLOps Skills
          for the Modern Data & AI Era
        </h2>

        <p>
          Industry-oriented training programs for corporates,
          universities, colleges and professionals.
        </p>

        <Button
          asChild
          className={styles.primaryButton}
        >

          <Link href="/contact">
            Start a Training Discussion
          </Link>

        </Button>

      </section>

    </div>
  );
}