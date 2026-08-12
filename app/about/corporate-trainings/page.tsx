import Image from "next/image";
import Link from "next/link";

const trainingPrograms = [
  {
    title: "Informatica & Cloud Data",
    description:
      "Enterprise data integration and cloud data management training with practical, implementation-focused learning.",
    topics: [
      "Informatica PowerCenter",
      "Informatica IICS / IDMC",
      "Cloud Data Integration",
      "Cloud Application Integration",
      "Data Governance & Data Quality",
    ],
    icon: "01",
  },
  {
    title: "Modern Data Engineering",
    description:
      "Hands-on training around modern data platforms and production-oriented data engineering workflows.",
    topics: ["SQL", "Snowflake", "dbt", "Apache Airflow", "Data Engineering"],
    icon: "02",
  },
  {
    title: "Big Data Analytics",
    description:
      "Practical Big Data training covering distributed processing, analytics and the Hadoop ecosystem.",
    topics: ["Hadoop", "Hive", "Spark", "PySpark", "HBase"],
    icon: "03",
  },
  {
    title: "DataOps & MLOps",
    description:
      "Industry-oriented training covering automation, collaboration, CI/CD and modern data & ML pipelines.",
    topics: ["DataOps", "MLOps", "Git & GitHub", "Docker", "CI/CD", "MLflow"],
    icon: "04",
  },
];

const engagements = [
  {
    location: "Bangalore, Karnataka",
    institution: "Jain University",
    category: "Industry-Oriented Training Program",
    description:
      "Industry-oriented hands-on technical training delivered through a structured academic training program, with practical sessions, demonstrations and guided learning.",
    images: [
      "/corporate-training/jain-1.jpeg",
      "/corporate-training/jain-2.jpeg",
      "/corporate-training/jain-3.jpeg",
    ],
  },
  {
    location: "Hyderabad, Telangana",
    institution: "MLR Institute of Technology",
    category: "Technical Training Program",
    description:
      "Hands-on technical training delivered in a computer-lab environment with live demonstrations, practical exercises and guided implementation.",
    images: [
      "/corporate-training/hyderabad-2.jpeg",
      "/corporate-training/hyderabad-1.jpeg",
      "/corporate-training/hyderabad-3.jpeg",
    ],
  },
  {
    location: "Karur, Tamil Nadu",
    institution: "M. Kumaraswamy College of Engineering",
    category: "Industry-Oriented Training",
    description:
      "Interactive technical sessions combining instructor-led concepts, live demonstrations and practical learning with students.",
    images: [
      "/corporate-training/karur-1.jpeg",
      "/corporate-training/karur-2.jpeg",
      "/corporate-training/karur-3.jpeg",
    ],
  },
  {
    location: "Tiruchirappalli, Tamil Nadu",
    institution: "Technical Training Program",
    category: "Hands-on Technology Training",
    description:
      "Practical sessions focused on real-world technology concepts, implementation and career-oriented technical skills.",
    images: [
      "/corporate-training/trichy-1.jpeg",
      "/corporate-training/trichy-2.jpeg",
      "/corporate-training/trichy-3.jpeg",
    ],
  },
];

const deliveryModes = [
  {
    title: "Corporate Training",
    text: "Customized programs designed around an organization's technology stack, team skill level and business requirements.",
  },
  {
    title: "Institutional Training",
    text: "Industry-oriented programs for colleges and universities with practical labs, projects and structured learning.",
  },
  {
    title: "Hands-on Workshops",
    text: "Focused workshops built around live demonstrations, exercises and real-world implementation.",
  },
  {
    title: "Customized Programs",
    text: "Flexible curriculum, duration and delivery models based on the learning objectives of each organization.",
  },
];

const stats = [
  { value: "15+", label: "Years of Industry Experience" },
  { value: "5000+", label: "Learners Trained" },
  { value: "15+", label: "Technology Areas" },
  { value: "100%", label: "Practical-Focused Learning" },
];

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5">
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

export default function CorporateTrainingsPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* HERO - UPDATED WITH PHOTOS ON RIGHT */}
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(37,99,235,0.30),transparent_34%),radial-gradient(circle_at_10%_90%,rgba(14,165,233,0.18),transparent_30%)]" />

        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* LEFT SIDE: Text Content */}
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-400/10 px-4 py-2 text-sm font-semibold text-blue-200">
                <span className="h-2 w-2 rounded-full bg-blue-400" />
                Corporate & Institutional Training
              </div>

              <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                From Industry Knowledge
                <span className="block text-blue-400">to Hands-on Skills.</span>
              </h1>

              <p className="mt-6 text-lg leading-8 text-slate-300 sm:text-xl">
                Rishab Informatica Group delivers practical, industry-oriented
                technology training for organizations, institutions and aspiring
                professionals — combining expert instruction, live demonstrations,
                hands-on exercises and real-world learning.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
                >
                  Discuss Your Training Requirement
                  <ArrowIcon />
                </Link>
                <Link
                  href="#training-programs"
                  className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 font-bold text-white transition hover:bg-white/10"
                >
                  Explore Training Areas
                </Link>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur"
                  >
                    <div className="text-2xl font-black text-white">{stat.value}</div>
                    <div className="mt-1 text-xs leading-4 text-slate-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT SIDE: Photos */}
            <div className="grid grid-cols-2 gap-4">
              {/* Main large photo */}
              <div className="relative rounded-2xl overflow-hidden col-span-2 aspect-[4/3]">
                <Image
                  src="/corporate-training/hyderabad-1.JPEG"
                  alt="Training session main"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute bottom-4 left-4 rounded-full bg-black/60 px-4 py-1.5 text-xs font-bold text-white backdrop-blur-sm">
                  📍 Hyderabad
                </div>
              </div>
              
              {/* Small photo 1 */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                <Image
                  src="/corporate-training/karur-1.JPEG"
                  alt="Training session"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
                  📍 Karur
                </div>
              </div>
              
              {/* Small photo 2 */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                <Image
                  src="/corporate-training/trichy-1.jpeg"
                  alt="Training session"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
                  📍 Trichy
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-blue-600">
              Why Rishab Informatica Group
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Training designed around practical outcomes.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Our programs are built to move beyond theory. Learners work with
              the tools, workflows and problem-solving approaches used in
              real-world data and technology environments.
            </p>

            <div className="mt-7 space-y-3">
              {[
                "Instructor-led sessions with live demonstrations",
                "Hands-on exercises and practical implementation",
                "Industry-oriented curriculum and use cases",
                "Projects, interview preparation and technical Q&A",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 text-slate-700">
                  <span className="mt-0.5 rounded-full bg-blue-50 p-1 text-blue-600">
                    <CheckIcon />
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-gradient-to-br from-blue-50 via-white to-slate-100 p-2 shadow-xl">
            <div className="rounded-[1.35rem] border border-slate-200 bg-white p-7 sm:p-9">
              <p className="text-sm font-bold text-blue-600">OUR APPROACH</p>
              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                {[
                  ["01", "Understand", "Identify the organization's or learner's skill requirements."],
                  ["02", "Demonstrate", "Explain concepts through live, practical demonstrations."],
                  ["03", "Practice", "Reinforce learning through guided hands-on exercises."],
                  ["04", "Apply", "Connect the learning to projects and real-world scenarios."],
                ].map(([number, title, text]) => (
                  <div key={number} className="rounded-2xl border border-slate-200 p-5">
                    <div className="text-sm font-black text-blue-600">{number}</div>
                    <h3 className="mt-2 font-extrabold">{title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRAINING PROGRAMS */}
      <section id="training-programs" className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-blue-600">
              Technology Areas
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Industry-relevant training programs
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Programs can be delivered individually or combined into a
              customized learning path based on the requirement.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {trainingPrograms.map((program) => (
              <article
                key={program.title}
                className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-start justify-between gap-5">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 font-black text-white">
                    {program.icon}
                  </div>
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                    Practical
                  </span>
                </div>

                <h3 className="mt-6 text-2xl font-black">{program.title}</h3>
                <p className="mt-3 leading-7 text-slate-600">{program.description}</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {program.topics.map((topic) => (
                    <span
                      key={topic}
                      className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-700"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ENGAGEMENTS / PHOTOS */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-blue-600">
              Training Experience
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Learning delivered in real classrooms & labs.
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              A glimpse of our instructor-led technical training sessions,
              practical labs and interactive learning environments.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-600">
            Selected Training Engagements
          </div>
        </div>

        <div className="mt-12 space-y-12">
          {engagements.map((engagement) => (
            <article
              key={engagement.institution}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-lg"
            >
              <div className="grid lg:grid-cols-[1.2fr_1.2fr]">
                {/* LEFT SIDE: Detailed Information */}
                <div className="p-8 sm:p-10 lg:p-12">
                  <div className="inline-flex rounded-full bg-blue-50 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-blue-700">
                    {engagement.category}
                  </div>
                  <h3 className="mt-5 text-2xl font-black sm:text-3xl">
                    {engagement.institution}
                  </h3>
                  <p className="mt-2 font-semibold text-blue-600">
                    📍 {engagement.location}
                  </p>
                  <p className="mt-5 leading-7 text-slate-600">
                    {engagement.description}
                  </p>

                  <div className="mt-7 flex flex-wrap gap-2">
                    {["Live Training", "Hands-on Learning", "Practical Sessions"].map(
                      (tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600"
                        >
                          {tag}
                        </span>
                      )
                    )}
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-4 border-t border-slate-100 pt-6">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Duration</p>
                      <p className="mt-1 text-sm font-semibold text-slate-700">15 Days</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Mode</p>
                      <p className="mt-1 text-sm font-semibold text-slate-700">In-Person / Hybrid</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Participants</p>
                      <p className="mt-1 text-sm font-semibold text-slate-700">20-50 Students</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Level</p>
                      <p className="mt-1 text-sm font-semibold text-slate-700">Beginner to Advanced</p>
                    </div>
                  </div>
                </div>

                {/* RIGHT SIDE: Photos */}
                <div className="bg-slate-100 p-4 lg:p-5">
                  <div className="grid grid-cols-2 gap-3 h-full">
                    <div className="relative rounded-xl overflow-hidden aspect-[4/3] col-span-2">
                      <Image
                        src={engagement.images[0]}
                        alt={`${engagement.institution} training session main`}
                        fill
                        sizes="(max-width: 1024px) 50vw, 40vw"
                        className="object-cover transition duration-500 hover:scale-105"
                        priority
                      />
                      <div className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
                        Main Session
                      </div>
                    </div>
                    
                    <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
                      <Image
                        src={engagement.images[1]}
                        alt={`${engagement.institution} training session 2`}
                        fill
                        sizes="(max-width: 1024px) 25vw, 20vw"
                        className="object-cover transition duration-500 hover:scale-105"
                      />
                    </div>
                    
                    <div className="relative rounded-xl overflow-hidden aspect-[4/3]">
                      <Image
                        src={engagement.images[2]}
                        alt={`${engagement.institution} training session 3`}
                        fill
                        sizes="(max-width: 1024px) 25vw, 20vw"
                        className="object-cover transition duration-500 hover:scale-105"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* DELIVERY MODELS */}
      <section className="bg-slate-950">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-blue-400">
              Flexible Delivery
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-white sm:text-4xl">
              Training that fits your requirement.
            </h2>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {deliveryModes.map((mode) => (
              <div
                key={mode.title}
                className="rounded-2xl border border-white/10 bg-white/[0.06] p-6 transition hover:bg-white/[0.10] hover:border-white/20"
              >
                <h3 className="font-extrabold text-white">{mode.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{mode.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
        <div className="relative overflow-hidden rounded-3xl bg-blue-600 px-7 py-12 shadow-2xl shadow-blue-600/20 sm:px-12 sm:py-16">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10" />
          <div className="absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-slate-950/10" />

          <div className="relative max-w-3xl">
            <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-blue-100">
              Let's Build the Right Program
            </p>
            <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">
              Looking for technology training for your team or institution?
            </h2>
            <p className="mt-4 text-lg leading-8 text-blue-100">
              Share your technology stack, audience and training objectives.
              We can help structure a practical learning program around your
              requirements.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-extrabold text-blue-700 transition hover:bg-blue-50"
              >
                Contact Us
                <ArrowIcon />
              </Link>
              <Link
                href="/courses"
                className="inline-flex items-center justify-center rounded-xl border border-white/30 px-6 py-3.5 font-extrabold text-white transition hover:bg-white/10"
              >
                View Our Courses
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}