import Link from "next/link";
import Image from "next/image";

const units = [
  {
    number: "01",
    title: "Introduction to Big Data Analytics",
    hours: "9 Hours",
    color: "from-blue-600 to-cyan-500",
    summary:
      "Build a strong foundation in Big Data, its characteristics, sources, analytics approaches, challenges and industry applications.",
    topics: [
      "Big Data Definition & Taxonomy",
      "Sources of Big Data",
      "3V's of Big Data",
      "Need for Hadoop",
      "Varying Data Structures",
      "Characteristics of Big Data",
      "Applications of Big Data",
      "Challenges in Big Data",
      "Big Data Implications for Industries",
      "Introduction to Big Data Analytics",
      "Telecom, Banking, Retail, Healthcare, IT & Operations",
    ],
  },
  {
    number: "02",
    title: "Emerging Database Landscape",
    hours: "9 Hours",
    color: "from-violet-600 to-purple-500",
    summary:
      "Understand scale-out database architectures, traditional versus non-relational approaches and the foundations of the Hadoop ecosystem.",
    topics: [
      "Scale-Out Architecture",
      "RDBMS vs Non-Relational Databases",
      "Database Workloads",
      "Database Workload Characteristics",
      "Implications of Big Data Scale",
      "Introduction to Hadoop",
      "Hadoop Architecture",
      "History of Hadoop",
      "Hadoop Ecosystem",
      "Hadoop Components",
      "HDFS",
      "MapReduce",
    ],
  },
  {
    number: "03",
    title: "Application, Architecture & Data Modeling",
    hours: "9 Hours",
    color: "from-emerald-600 to-teal-500",
    summary:
      "Explore Big Data warehouse architectures, enterprise data platforms, data integration patterns and workload design approaches.",
    topics: [
      "Big Data Warehouse & Analytics",
      "Big Data Warehouse System Requirements",
      "Hybrid Architectures",
      "Enterprise Data Platform Ecosystem",
      "Big Data and Master Data Management",
      "Data Integration Patterns",
      "ELT Pattern",
      "Batch Integration",
      "Real-Time Integration",
      "Data Virtualization",
      "Big Data Workload Design",
      "Analytical & Operational Workloads",
      "Batch & Stream Processing",
      "Data Partitioning Strategies",
      "Performance Optimization",
    ],
  },
  {
    number: "04",
    title: "Extracting Value from Big Data",
    hours: "9 Hours",
    color: "from-orange-500 to-amber-500",
    summary:
      "Learn the major technologies used to process Big Data and understand how large-scale data can be transformed into useful analytics and insights.",
    topics: [
      "Big Data Analytics Tools",
      "Apache Pig",
      "Pig Latin",
      "Apache Hive",
      "HiveQL",
      "Hive Architecture",
      "Apache HBase",
      "HBase Architecture",
      "Apache Mahout",
      "Machine Learning with Big Data",
      "Apache Spark",
      "Spark Shell",
      "Spark Architecture",
      "Spark vs MapReduce",
      "Real-Time Analytics",
      "In-Memory Data Grids",
      "MapReduce vs Real-Time Processing",
      "Industry Use Cases",
    ],
  },
  {
    number: "05",
    title: "Big Data Analytics Methodology",
    hours: "9 Hours",
    color: "from-pink-600 to-rose-500",
    summary:
      "Learn a systematic methodology for transforming business problems and raw data into scalable analytics solutions.",
    topics: [
      "Introduction to Big Data Analytics Methodology",
      "Analyze & Evaluate Business Cases",
      "Develop Business Hypothesis",
      "Analyze Outcomes",
      "Build & Prepare Data Sets",
      "Data Collection",
      "Data Cleaning",
      "Data Integration",
      "Select & Build Analytical Models",
      "Model Evaluation",
      "Design for Big Data Scale",
      "Horizontal Scaling",
      "Distributed Processing",
      "Parallel Computing",
      "Production-Ready Analytics Systems",
      "Gathering Data",
      "Batch Processing",
      "Real-Time Streaming",
      "Measure & Monitor Analytics Systems",
      "Healthcare Applications",
      "Banking Applications",
    ],
  },
];

const technologies = [
  "Hadoop",
  "HDFS",
  "MapReduce",
  "Apache Pig",
  "Pig Latin",
  "Apache Hive",
  "HiveQL",
  "Apache HBase",
  "Apache Mahout",
  "Apache Spark",
  "Spark Shell",
  "Real-Time Analytics",
];

const outcomes = [
  {
    code: "CO1",
    text:
      "Explain fundamental concepts of Big Data including characteristics, challenges and industry applications.",
  },
  {
    code: "CO2",
    text:
      "Implement basic Big Data processing using Hadoop ecosystem components such as HDFS, MapReduce, Pig and Hive.",
  },
  {
    code: "CO3",
    text:
      "Compare different Big Data architectures and data modeling approaches for various business requirements.",
  },
  {
    code: "CO4",
    text:
      "Assess Big Data solutions for specific industry use cases considering technical and business requirements.",
  },
  {
    code: "CO5",
    text:
      "Design end-to-end Big Data analytics solutions using appropriate technologies and methodologies.",
  },
];

export default function BigDataAnalyticsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* =========================================================
          HERO SECTION
      ========================================================= */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.30),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(14,165,233,0.18),transparent_35%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-24">

          <div className="grid items-center gap-12 lg:grid-cols-2">

            {/* LEFT SIDE */}
            <div>

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-2 text-sm font-semibold text-blue-300">
                Big Data Analytics • University • College • Corporate Training
              </div>

              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                Big Data
                <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                  Analytics
                </span>
                Training
              </h1>

              <h2 className="mt-6 text-xl font-semibold leading-8 text-slate-200">
                Understand. Process. Analyze. Derive Insights.
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                Structured Big Data Analytics training covering Big Data
                fundamentals, Hadoop, HDFS, MapReduce, Big Data architecture,
                Hive, HBase, Pig, Mahout, Spark, real-time analytics and
                end-to-end analytics methodology.
              </p>

{/* STATS */}
<div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">

  <div className="rounded-xl border border-white/10 bg-white/[0.06] p-4">
    <p className="text-sm text-slate-400">Academic Program</p>
    <p className="mt-1 font-bold">45 Hours</p>
  </div>

  <div className="rounded-xl border border-white/10 bg-white/[0.06] p-4">
    <p className="text-sm text-slate-400">University / College</p>
    <p className="mt-1 font-bold">3 Credits</p>
  </div>

  <div className="rounded-xl border border-white/10 bg-white/[0.06] p-4">
    <p className="text-sm text-slate-400">Curriculum</p>
    <p className="mt-1 font-bold">5 Units</p>
  </div>

  <div className="rounded-xl border border-white/10 bg-white/[0.06] p-4">
    <p className="text-sm text-slate-400">Corporate Training</p>
    <p className="mt-1 font-bold">Customizable</p>
  </div>

</div>

{/* BUTTONS */}
<div className="mt-8 flex flex-wrap gap-4">

                <Link
                  href="/contact"
                  className="rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white transition hover:bg-blue-500"
                >
                  Request Training
                </Link>

                <a
                  href="#syllabus"
                  className="rounded-xl border border-white/30 bg-white/5 px-7 py-3 font-semibold text-white transition hover:bg-white/10"
                >
                  View Syllabus
                </a>

              </div>

            </div>

            {/* RIGHT SIDE IMAGE */}
            <div className="relative">

              <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl">

                <Image
                  src="/courses/big-data-analytics.png"
                  alt="Big Data Analytics Training"
                  width={800}
                  height={600}
                  priority
                  className="h-auto w-full object-cover"
                />

              </div>

            </div>

          </div>
        </div>
      </section>


      {/* =========================================================
          COURSE OVERVIEW
      ========================================================= */}
      <section className="bg-white py-20 text-slate-900">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:items-center">

            <div>
              <p className="font-semibold uppercase tracking-widest text-blue-600">
                Course Overview
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                From Big Data Fundamentals to Analytics Solutions
              </h2>
            </div>

            <div className="text-lg leading-8 text-slate-600">

              <p>
                This course introduces learners to the concepts,
                technologies, architectures and methodologies required to work
                with Big Data.
              </p>

              <p className="mt-5">
                The learning journey progresses from Big Data fundamentals and
                Hadoop to enterprise architecture, data integration, Big Data
                processing technologies, real-time analytics and end-to-end
                analytics methodology.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          TECHNOLOGY STACK
      ========================================================= */}
      <section className="bg-slate-100 py-16 text-slate-900">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="text-center">

            <p className="font-semibold uppercase tracking-widest text-blue-600">
              Technology Stack
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              Big Data Technologies Covered
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              Learn the major technologies and processing approaches covered
              throughout the five-unit curriculum.
            </p>

          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">

            {technologies.map((technology) => (
              <span
                key={technology}
                className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                {technology}
              </span>
            ))}

          </div>

        </div>

      </section>


      {/* =========================================================
          COMPLETE SYLLABUS
      ========================================================= */}
      <section
        id="syllabus"
        className="bg-white py-20 text-slate-900"
      >

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="max-w-3xl">

            <p className="font-semibold uppercase tracking-widest text-blue-600">
              Complete Curriculum
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              5 Units • 45 Hours
            </h2>

            <p className="mt-4 text-lg text-slate-600">
              A structured five-unit curriculum covering the complete Big Data
              Analytics learning journey.
            </p>

          </div>


          <div className="mt-12 space-y-8">

            {units.map((unit) => (

              <article
                key={unit.number}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >

                <div className="grid lg:grid-cols-[280px_1fr]">

                  {/* UNIT HEADER */}
                  <div
                    className={`bg-gradient-to-br ${unit.color} p-8 text-white`}
                  >

                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/70">
                      Unit {unit.number}
                    </p>

                    <h3 className="mt-4 text-2xl font-bold leading-tight">
                      {unit.title}
                    </h3>

                    <div className="mt-8 inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur">
                      {unit.hours}
                    </div>

                  </div>


                  {/* UNIT CONTENT */}
                  <div className="p-8 lg:p-10">

                    <p className="text-lg leading-8 text-slate-600">
                      {unit.summary}
                    </p>

                    <div className="mt-7">

                      <h4 className="text-sm font-bold uppercase tracking-widest text-slate-900">
                        Key Topics
                      </h4>

                      <div className="mt-4 grid gap-3 sm:grid-cols-2">

                        {unit.topics.map((topic) => (

                          <div
                            key={topic}
                            className="flex items-start gap-3 rounded-xl bg-slate-50 px-4 py-3 transition hover:bg-blue-50"
                          >

                            <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">
                              ✓
                            </span>

                            <span className="text-sm font-medium leading-6 text-slate-700">
                              {topic}
                            </span>

                          </div>

                        ))}

                      </div>

                    </div>

                  </div>

                </div>

              </article>

            ))}

          </div>

        </div>

      </section>


{/* =========================================================
    DOWNLOAD SYLLABUS
========================================================= */}
<section className="bg-slate-100 py-20 text-slate-900">

  <div className="mx-auto max-w-4xl px-6 lg:px-8">

    <div className="rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl md:p-12">

      <p className="font-semibold uppercase tracking-widest text-blue-600">
        Course Syllabus
      </p>

      <h2 className="mt-3 text-3xl font-bold">
        Download Complete Big Data Analytics Syllabus
      </h2>

      <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-600">
        Download the complete five-unit curriculum covering Big Data
        fundamentals, Hadoop, architecture, data modeling, analytics
        technologies and Big Data Analytics methodology.
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm font-medium text-slate-700">

        <span className="rounded-full bg-blue-50 px-4 py-2">
          ✓ 5 Core Learning Units
        </span>

        <span className="rounded-full bg-blue-50 px-4 py-2">
          ✓ 45 Hours Curriculum
        </span>

        <span className="rounded-full bg-blue-50 px-4 py-2">
          ✓ 3 Credits
        </span>

      </div>

      <a
        href="/syllabus/big-data-analytics.pdf"
        download
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white transition hover:bg-blue-700"
      >
        📄 Download Syllabus PDF
      </a>

    </div>

  </div>

</section>


{/* =========================================================
    COURSE OUTCOMES
========================================================= */}
      <section className="bg-slate-950 py-20">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="text-center">

            <p className="font-semibold uppercase tracking-widest text-cyan-400">
              Course Outcomes
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              What Students Will Learn
            </h2>

          </div>


          <div className="mx-auto mt-12 max-w-4xl space-y-4">

            {outcomes.map((outcome) => (

              <div
                key={outcome.code}
                className="flex gap-5 rounded-2xl border border-white/10 bg-white/[0.05] p-6"
              >

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-600 font-bold">
                  {outcome.code}
                </div>

                <p className="leading-7 text-slate-300">
                  {outcome.text}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =========================================================
          LEARNING JOURNEY
      ========================================================= */}
      <section className="bg-slate-100 py-20 text-slate-900">

        <div className="mx-auto max-w-7xl px-6 lg:px-8">

          <div className="text-center">

            <p className="font-semibold uppercase tracking-widest text-blue-600">
              Learning Journey
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              From Fundamentals to Analytics
            </h2>

          </div>


          <div className="mt-12 grid gap-5 md:grid-cols-5">

            {[
              ["01", "Understand", "Big Data Fundamentals"],
              ["02", "Build", "Hadoop Foundations"],
              ["03", "Design", "Architecture & Data Modeling"],
              ["04", "Process", "Analytics Technologies"],
              ["05", "Apply", "Analytics Methodology"],
            ].map(([num, title, text]) => (

              <div
                key={num}
                className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >

                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                  {num}
                </div>

                <h3 className="mt-5 text-lg font-bold">
                  {title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {text}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =========================================================
          COLLEGE / CORPORATE TRAINING
      ========================================================= */}
      <section className="bg-white py-20 text-slate-900">

        <div className="mx-auto max-w-6xl px-6 lg:px-8">

          <div className="rounded-3xl bg-gradient-to-br from-blue-50 to-cyan-50 p-8 md:p-12">

            <div className="grid gap-10 md:grid-cols-2 md:items-center">

              <div>

                <p className="font-semibold uppercase tracking-widest text-blue-600">
                  Training Programs
                </p>

                <h2 className="mt-3 text-3xl font-bold">
                  College, University & Corporate Training
                </h2>

                <p className="mt-5 leading-7 text-slate-600">
                  This Big Data Analytics curriculum can be delivered as a
                  structured academic program or customized based on the
                  learning objectives, duration and technical requirements of
                  an institution or organization.
                </p>

              </div>

              <div className="grid gap-4 sm:grid-cols-2">

                <div className="rounded-2xl bg-white p-6 shadow-sm">
                  <div className="text-2xl">🎓</div>
                  <h3 className="mt-3 font-bold">
                    Colleges & Universities
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Structured unit-wise academic delivery with practical
                    demonstrations and analytics concepts.
                  </p>
                </div>

                <div className="rounded-2xl bg-white p-6 shadow-sm">
                  <div className="text-2xl">🏢</div>
                  <h3 className="mt-3 font-bold">
                    Corporate Programs
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Customizable training based on project requirements,
                    technology focus and participant experience.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-blue-600 to-cyan-600 py-20">

        <div className="mx-auto max-w-5xl px-6 text-center lg:px-8">

          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Looking for Big Data Analytics Training?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-blue-100">
            Connect with Rishab Informatica Group for Big Data Analytics
            training programs for colleges, universities and corporate teams.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">

            <Link
              href="/contact"
              className="rounded-xl bg-white px-7 py-3 font-bold text-blue-700 transition hover:bg-blue-50"
            >
              Request Training
            </Link>

            <a
              href="/syllabus/big-data-analytics.pdf"
              download
              className="rounded-xl border border-white/30 bg-white/10 px-7 py-3 font-bold text-white transition hover:bg-white/20"
            >
              Download Syllabus
            </a>

          </div>

        </div>

      </section>

    </main>
  );
}