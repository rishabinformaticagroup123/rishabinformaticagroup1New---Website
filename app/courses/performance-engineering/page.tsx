import { Button } from "@/components/ui/button";
import {
  DownloadIcon,
  CalendarIcon,
  ClockIcon,
  UserIcon,
  AwardIcon,
  CodeIcon,
  BriefcaseIcon,
  MonitorIcon,
  MessageCircleIcon,
  BookOpenIcon,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

export const metadata = {
  title: "Next.js & React Course | Live Training | Rishab Informatica Group",
  description:
    "Learn React.js and Next.js with hands-on development, real-world projects, modern web application development and interview preparation.",
};

export default function NextJsReactPage() {
  return (
    <div className={styles.container}>

      {/* ================= HERO SECTION ================= */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>

          <div className={styles.heroText}>

            <span className={styles.batchBadge}>
              Next.js & React – Batch 2
            </span>

            <h1>
              Next.js & React{" "}
              <span className={styles.highlight}>Course</span>
            </h1>

            <h2>
              Build Modern Web Applications with React.js & Next.js
            </h2>

            <p className={styles.heroDescription}>
              Learn modern frontend and full-stack web application development
              using React.js and Next.js through practical, hands-on training,
              real-world projects and guided development.
            </p>

            <div className={styles.heroStats}>

              <div className={styles.statItem}>
                <CalendarIcon className={styles.statIcon} />
                <span>45 Days Program</span>
              </div>

              <div className={styles.statItem}>
                <ClockIcon className={styles.statIcon} />
                <span>80+ Hours Training</span>
              </div>

              <div className={styles.statItem}>
                <UserIcon className={styles.statIcon} />
                <span>Limited Batch Size</span>
              </div>

            </div>

            <div className={styles.ctaGroup}>

              <Button asChild className={styles.primaryButton}>
                <Link href="#enroll">
                  Enroll Now
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
              src="/courses/nextjs.png"
              alt="Next.js and React Course"
              width={600}
              height={400}
              className={styles.courseImage}
              priority
            />
          </div>

        </div>
      </section>


      {/* ================= CERTIFICATION ================= */}
      <section className={styles.certificationSection}>

        <div className={styles.certificationBadge}>

          <AwardIcon className={styles.badgeIcon} />

          <div>
            <h3>Course Completion Certificate</h3>
            <p>
              Certificate provided after successful completion of the course
            </p>
          </div>

        </div>

      </section>


      {/* ================= WHY JOIN ================= */}
      <section className={styles.featuresSection}>

        <h2 className={styles.sectionTitle}>
          Why Join Our Next.js & React Course?
        </h2>

        <div className={styles.featuresGrid}>

          {[
            {
              title: "React.js Development",
              description:
                "Learn components, props, state, hooks, routing and modern React development.",
              icon: <CodeIcon />,
            },
            {
              title: "Next.js Development",
              description:
                "Build modern production-ready applications using Next.js.",
              icon: <MonitorIcon />,
            },
            {
              title: "Hands-on Projects",
              description:
                "Develop practical web applications while learning the concepts.",
              icon: <BriefcaseIcon />,
            },
            {
              title: "Modern Web Development",
              description:
                "Understand modern frontend development practices and application architecture.",
              icon: <BookOpenIcon />,
            },
            {
              title: "Interview Preparation",
              description:
                "Prepare for technical interviews with practical questions and scenarios.",
              icon: <MessageCircleIcon />,
            },
            {
              title: "Project Guidance",
              description:
                "Get guidance while developing real-world style applications.",
              icon: <MonitorIcon />,
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


      {/* ================= TECHNOLOGIES ================= */}
      <section className={styles.featuresSection}>

        <h2 className={styles.sectionTitle}>
          Technologies Covered
        </h2>

        <div className={styles.expertise}>

          <span>React.js</span>
          <span>Next.js</span>
          <span>JavaScript</span>
          <span>HTML5</span>
          <span>CSS3</span>
          <span>REST APIs</span>
          <span>Git & GitHub</span>
          <span>Web Application Development</span>

        </div>

      </section>


      {/* ================= SYLLABUS ================= */}
      <section
        className={styles.syllabusSection}
        id="syllabus"
      >

        <div className={styles.syllabusContent}>

          <div>

            <h2 className={styles.sectionTitle}>
              Detailed Course Syllabus
            </h2>

            <p>
              Download the complete Next.js & React course syllabus
              with module-wise topics and practical exercises.
            </p>

            <Button
              asChild
              className={styles.downloadButton}
            >

              <Link
                href="/syllabus/next-js-react.pdf"
                download
              >

                <DownloadIcon className={styles.buttonIcon} />

                Download Syllabus PDF

              </Link>

            </Button>

          </div>

          <Image
            src="/syllabus-preview.png"
            alt="Next.js and React Course Syllabus Preview"
            width={300}
            height={400}
            className={styles.syllabusImage}
          />

        </div>

      </section>


      {/* ================= BATCH DETAILS ================= */}
      <section
        className={styles.batchSection}
        id="enroll"
      >

        <h2 className={styles.sectionTitle}>
          Next Batch Details
        </h2>

        <div className={styles.batchCards}>

          <div className={styles.batchCard}>

            <h3>
              Next.js & React – Batch 2
            </h3>

            <div className={styles.batchInfo}>
              <CalendarIcon />
              <span>
                New Batch Starts Soon
              </span>
            </div>

            <div className={styles.batchInfo}>
              <ClockIcon />
              <span>
                45 Days / 80+ Hours
              </span>
            </div>

            <div className={styles.batchInfo}>
              <UserIcon />
              <span>
                Limited Batch Size
              </span>
            </div>

            <div className={styles.priceTag}>
              ₹12,000{" "}
              <span className={styles.originalPrice}>
                2 Installments
              </span>
            </div>

            <Button
              asChild
              className={styles.enrollButton}
            >
              <Link href="#contact">
                Enroll Now
              </Link>
            </Button>

          </div>

        </div>

      </section>


      {/* ================= INSTRUCTOR ================= */}
      <section className={styles.instructorSection}>

        <div className={styles.instructorContent}>

          <Image
            src="/instructor-hari.jpg"
            alt="Hari.A - Next.js and React Trainer"
            width={200}
            height={200}
            className={styles.instructorImage}
          />

          <div>

            <h2 className={styles.sectionTitle}>
              Your Instructor
            </h2>

            <h3>
              Hari.A
            </h3>

            <p className={styles.instructorBio}>
              18 Years of Experience in IT Trainings and Developments.
              The course focuses on practical application development,
              modern web technologies and hands-on project-based learning.
            </p>

            <div className={styles.expertise}>

              <span>React.js</span>
              <span>Next.js</span>
              <span>JavaScript</span>
              <span>Web Development</span>
              <span>Project Development</span>

            </div>

          </div>

        </div>

      </section>


      {/* ================= COURSE HIGHLIGHTS ================= */}
      <section className={styles.testimonialsSection}>

        <h2 className={styles.sectionTitle}>
          What You Will Learn
        </h2>

        <div className={styles.testimonialCards}>

          <div className={styles.testimonialCard}>

            <p className={styles.testimonialQuote}>
              Build modern and responsive web applications using
              React.js and Next.js.
            </p>

            <div className={styles.testimonialAuthor}>
              <strong>Hands-on Development</strong>
              <span>Practical Application Building</span>
            </div>

          </div>


          <div className={styles.testimonialCard}>

            <p className={styles.testimonialQuote}>
              Understand modern application architecture and
              develop production-style projects.
            </p>

            <div className={styles.testimonialAuthor}>
              <strong>Real-World Projects</strong>
              <span>Project-Based Learning</span>
            </div>

          </div>


          <div className={styles.testimonialCard}>

            <p className={styles.testimonialQuote}>
              Prepare for technical interviews with practical
              React.js and Next.js development scenarios.
            </p>

            <div className={styles.testimonialAuthor}>
              <strong>Interview Preparation</strong>
              <span>Technical Guidance</span>
            </div>

          </div>

        </div>

      </section>


      {/* ================= CONTACT CTA ================= */}
      <section
        className={styles.batchSection}
        id="contact"
      >

        <h2 className={styles.sectionTitle}>
          Ready to Learn Next.js & React?
        </h2>

        <p>
          Join the Next.js & React Course and start building modern
          web applications with hands-on training.
        </p>

        <div className={styles.ctaGroup}>

          <Button
            asChild
            className={styles.primaryButton}
          >
            <Link href="https://wa.me/918970853557" target="_blank">
              WhatsApp Us
            </Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className={styles.secondaryButton}
          >
            <Link href="tel:+918970853557">
              Call Now
            </Link>
          </Button>

        </div>

      </section>

    </div>
  );
}