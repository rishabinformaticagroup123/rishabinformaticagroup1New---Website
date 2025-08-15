export default function OurStoryPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Hero Section */}
        <div className="bg-blue-900 text-white p-10 text-center">
          <h1 className="text-4xl font-bold mb-3">Our Story</h1>
          <p className="text-lg max-w-3xl mx-auto">
            Empowering non-IT professionals to launch successful IT careers since 2021
          </p>
        </div>

        {/* Body Content */}
        <div className="p-10 space-y-12">
          {/* Challenge Section */}
          <section>
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Why We Exist</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              In India, countless graduates and working professionals are stuck in jobs far below their potential—often in non-IT sectors, earning low salaries and facing no career growth. Many are intelligent and hardworking, but simply lack the right technical direction and mentorship.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Rishab Informatica Group</strong> was born from a mission: to bridge this gap and give these individuals a second chance at a better career.
            </p>
          </section>

          {/* Why Informatica IICS Combo First */}
          <section>
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Why We Started with Informatica IICS Combo</h2>
            <p className="text-gray-700 leading-relaxed mb-2">
              We chose Informatica IICS Combo (PowerCenter + IICS + SQL + Snowflake) as our flagship program because it offers:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li>High market demand with less competition</li>
              <li>Logical and learnable even for non-coders</li>
              <li>Immediate placement potential with real-time project exposure</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-2">
              This course has become a life-changer for many of our students from BPO, teaching, and back-office backgrounds.
            </p>
          </section>

          {/* Our Approach Section */}
          <section>
            <h2 className="text-2xl font-bold text-blue-800 mb-4">Our Proven Approach</h2>
            <p className="text-gray-700 leading-relaxed mb-2">
              Our structured 45-day roadmap includes:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li><strong>Concept-based Live Training</strong> with real-time tools (Informatica, Azure, SQL, Snowflake)</li>
              <li><strong>3 Mock Interviews</strong> with resume building & Naukri support</li>
              <li><strong>Scenario-Based Interview Q&A</strong> from Day 1</li>
              <li><strong>24x7 Mentor Support</strong> via WhatsApp & Telegram</li>
            </ul>
          </section>

          {/* Founder's Story */}
          <section className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
            <h2 className="text-2xl font-bold text-blue-800 mb-3">Meet Our Founder</h2>
            <p className="text-gray-700 leading-relaxed mb-2">
              <strong>Hari Krishnan</strong> is an accomplished IT trainer with 14+ years of experience at TCS, IBM, and Intex. Known for his deep knowledge and simple teaching style, he has guided 1000s into the IT world.
            </p>
            <p className="text-gray-700 leading-relaxed">
              He saw how hard it was for capable people to break into IT — especially without a coding background. So, he created a roadmap that works and built <strong>Rishab Informatica Group</strong> to serve this mission.
            </p>
          </section>

          {/* Impact Section */}
          <section className="bg-white border border-blue-100 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-blue-800 mb-3">Our Growing Impact</h2>
            <p className="text-gray-700 leading-relaxed mb-2">
              Many of our students have cracked interviews in 30–45 days and are now working in top companies like Infosys, TCS, Cognizant, and more.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We believe this is not just career training — it’s nation building. Our vision is to help 10,000+ aspirants achieve financial stability and contribute to India's IT and GDP growth.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
