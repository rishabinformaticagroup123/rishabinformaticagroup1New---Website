export default function OurStoryPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Hero Section */}
        <div className="bg-blue-900 text-white p-10 text-center">
          <h1 className="text-4xl font-bold mb-3">Our Story</h1>
          <p className="text-lg max-w-3xl mx-auto">
            Bridging the gap between Non-IT dreams and IT careers since 2021
          </p>
        </div>

        {/* Body Content */}
        <div className="p-10 space-y-12">
          {/* Challenge Section */}
          <section>
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Why We Exist</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Millions of capable individuals from non-technical backgrounds aspire to transition into IT, but face a lack of structured guidance. Many feel lost, underqualified, or stuck in underpaid roles.
            </p>
            <p className="text-gray-700 leading-relaxed">
              At <strong>Rishab Informatica Group</strong>, we change that. Through a proven, step-by-step system, we help learners gain confidence, build real-world skills, and get hired in just 45 days.
            </p>
          </section>

          {/* Our Approach Section */}
          <section>
            <h2 className="text-2xl font-bold text-blue-800 mb-4">How We Help</h2>
            <p className="text-gray-700 leading-relaxed mb-2">
              Our training is built on 3 core pillars:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li><strong>Industry-Relevant Curriculum:</strong> Focused on tools like Informatica IICS, Azure, Snowflake & SQL.</li>
              <li><strong>Live Projects:</strong> Real-world scenarios that simulate actual work environments.</li>
              <li><strong>Mock Interviews & Career Support:</strong> Personalized resume building, mock interviews, and job portal optimization.</li>
            </ul>
          </section>

          {/* Founder's Story */}
          <section className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
            <h2 className="text-2xl font-bold text-blue-800 mb-3">Meet Our Founder</h2>
            <p className="text-gray-700 leading-relaxed mb-2">
              <strong>Hari Krishnan</strong> is a seasoned IT engineer with 14+ years of experience in companies like TCS, IBM, and Intex Technologies. As a Technical & ETL Trainer, he has helped thousands level up.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Inspired by the struggles of job seekers, he founded Rishab Informatica Group to uplift non-IT aspirants and drive economic growth through practical education.
            </p>
          </section>

          {/* Impact Section */}
          <section className="bg-white border border-blue-100 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-blue-800 mb-3">Our Growing Impact</h2>
            <p className="text-gray-700 leading-relaxed">
              From small towns to metro cities, our students now work at top firms across India and abroad. Every success story fuels our mission: to unlock hidden potential and help India grow—one IT job at a time.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
