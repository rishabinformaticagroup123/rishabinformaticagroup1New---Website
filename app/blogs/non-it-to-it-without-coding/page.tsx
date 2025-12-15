export default function BlogNonITtoITPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="bg-green-800 text-white p-10 rounded-xl shadow-md text-center mb-12">
          <h1 className="text-4xl font-bold mb-3">From Non-IT to IT Without Coding — Safely and Practically</h1>
          <p className="text-lg max-w-3xl mx-auto">
            A proven 45-day roadmap to become an Informatica IICS Developer — without quitting your current job.
          </p>
        </div>

        {/* Intro Motivation */}
        <div className="bg-white p-8 rounded-lg shadow mb-12">
          <p className="text-gray-700 text-lg leading-relaxed">
            Are you working in a BPO, delivery job, service coordinator role, mechanical or civil background, or even in the medical field—but dreaming of a better, stable, and well-paying IT job? You’re not alone.
          </p>
          <p className="mt-4 text-gray-700">
            At <strong>Rishab Informatica Group</strong>, we’ve helped hundreds like you move from NON-IT sectors to IT—without coding and without quitting your current job. You just need dedication, basic computer knowledge, and our expert-guided training.
          </p>
        </div>

        {/* Strategy Section */}
        <div className="bg-yellow-50 p-8 rounded-lg shadow mb-12">
          <h2 className="text-2xl font-bold text-yellow-800 mb-4">Your 45-Day Transformation Strategy</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li><strong>Day 1–5:</strong> Introduction to SQL & Basic Concepts of Data</li>
            <li><strong>Day 6–10:</strong> Start with Informatica PowerCenter (ETL Basics)</li>
            <li><strong>Day 11–15:</strong> Learn Informatica IICS (Cloud Data Integration)</li>
            <li><strong>Day 16–20:</strong> Learn Realtime Scenarios + Resume & Naukri Profile Creation</li>
            <li><strong>Day 21–23:</strong> 1st Mock Interview (Confidence Building)</li>
            <li><strong>Day 24–25:</strong> Start attending real-time interviews</li>
            <li><strong>Day 26–35:</strong> Daily practice with recorded videos & Trainer support</li>
            <li><strong>Day 35:</strong> 2nd Mock Interview + Live Doubts Clarification</li>
            <li><strong>Day 36–45:</strong> Cracking Real-time Interviews</li>
            <li><strong>Post 45 Days:</strong> Free Job Support for 2 Months</li>
          </ul>
        </div>

        {/* Why Informatica IICS Combo */}
        <div className="bg-white p-8 rounded-lg shadow mb-12">
          <h2 className="text-2xl font-bold text-blue-800 mb-4">Why Learn Informatica IICS + SQL + PowerCenter?</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>No coding background needed – pure drag-and-drop tools</li>
            <li>High-paying jobs in Data Integration, Cloud, and ETL</li>
            <li>In-demand skill in MNCs and product-based companies</li>
            <li>Hybrid learning – Live + Recorded Classes</li>
            <li>Flexible batches for working professionals</li>
          </ul>
        </div>

        {/* Trainer Info */}
        <div className="bg-blue-50 p-8 rounded-lg shadow mb-12 flex flex-col md:flex-row items-center gap-6">
          <img src="/instructors/hari.png" alt="Hari Krishnan" className="w-40 h-40 rounded-full object-cover" />
          <div>
            <h3 className="text-xl font-bold text-gray-800">Hari Krishnan</h3>
            <p className="text-gray-600">14+ Years in IT | Ex-TCS, IBM | Specialist in ETL, Azure & Informatica</p>
            <p className="mt-2 text-gray-700">
              With a passion for helping non-IT professionals, Hari Sir has mentored 3000+ students successfully.
            </p>
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-white p-8 rounded-lg shadow mb-12">
          <h2 className="text-2xl font-bold text-green-800 mb-6">What Our Students Say</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <blockquote className="border-l-4 pl-4 border-green-500 text-gray-700">
              "I was a medical sales rep. Within 2 months I got placed in a top IT firm. All thanks to Hari Sir’s guidance and mock interviews."
              <footer className="text-sm mt-2 text-gray-500">— Anil, Bangalore</footer>
            </blockquote>
            <blockquote className="border-l-4 pl-4 border-green-500 text-gray-700">
              "From BPO to IT was a dream. The day-wise plan and job support really worked for me."
              <footer className="text-sm mt-2 text-gray-500">— Priya, Chennai</footer>
            </blockquote>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-green-100 p-8 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-green-900 mb-2">Ready to Make the Shift?</h2>
          <p className="mb-4 text-gray-700">Join our <strong>Informatica IICS Combo Live Training</strong> now and transform your career in 45 days.</p>
          <a
            href="https://www.rishabinformaticagroup.com/courses/iics-combo-live"
            target="_blank"
            className="inline-block px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700"
          >
            Join Now
          </a>
          <p className="mt-4 text-gray-700">
            Call / WhatsApp us: <a href="https://wa.me/918970853557" className="text-green-700 font-semibold">+91 89708 53557</a>
          </p>
        </div>
      </div>
    </div>
  );
}
