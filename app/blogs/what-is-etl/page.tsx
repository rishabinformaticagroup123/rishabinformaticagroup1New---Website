export default function ETLImportanceBlogPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
        {/* Hero Section */}
        <div className="bg-blue-900 text-white p-10 text-center">
          <h1 className="text-4xl font-bold mb-4">What is ETL and Why It's Crucial for Modern Companies</h1>
          <p className="text-lg max-w-3xl mx-auto">
            Learn why data integration is the backbone of today's business world—and how you can build a career in it with Informatica IICS Combo Training.
          </p>
        </div>

        <div className="p-10 space-y-10">
          {/* Introduction to ETL */}
          <section>
            <h2 className="text-2xl font-bold text-blue-800 mb-2">What is ETL?</h2>
            <p className="text-gray-700 leading-relaxed">
              ETL stands for <strong>Extract, Transform, Load</strong>—a critical process in modern data engineering. It involves extracting data from multiple sources, transforming it into a usable format, and loading it into a data warehouse or data lake.
              Companies use ETL tools to make data-driven decisions, automate reporting, enable analytics, and power machine learning pipelines.
            </p>
          </section>

          {/* Need for ETL */}
          <section>
            <h2 className="text-2xl font-bold text-blue-800 mb-2">Why Do Companies Need ETL?</h2>
            <p className="text-gray-700">
              With massive amounts of data being generated from CRMs, ERPs, web applications, and IoT devices, businesses need a reliable process to consolidate this data. ETL tools solve this challenge by:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1 mt-2">
              <li>Integrating data from diverse sources</li>
              <li>Improving data quality and consistency</li>
              <li>Enabling centralized reporting and analytics</li>
              <li>Saving time and reducing manual errors</li>
            </ul>
          </section>

          {/* Role of ETL Developer */}
          <section>
            <h2 className="text-2xl font-bold text-blue-800 mb-2">Who is an ETL Developer?</h2>
            <p className="text-gray-700">
              An ETL Developer designs and implements pipelines to move and transform data efficiently. They work with tools like <strong>Informatica PowerCenter</strong>, <strong>Informatica IICS</strong>, and write SQL queries to handle data transformations. They play a key role in any data team.
            </p>
            <p className="mt-2 text-gray-700">
              The demand for ETL developers is growing rapidly as more companies move to cloud-based data ecosystems and focus on data-driven decision-making.
            </p>
          </section>

          {/* Informatica IICS Combo Training */}
          <section className="bg-blue-50 border-l-4 border-blue-700 p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-blue-800 mb-3">Master ETL with Our Informatica IICS Combo Training</h2>
            <p className="text-gray-700 mb-3">
              At <strong>Rishab Informatica Group</strong>, we offer a 45-day hands-on training that includes:
            </p>
            <ul className="list-disc pl-6 text-gray-700 space-y-1">
              <li><strong>Informatica PowerCenter</strong> – foundational ETL tool</li>
              <li><strong>Informatica IICS</strong> – cloud-native ETL for modern architecture</li>
              <li><strong>SQL</strong> – to write queries, joins, and transform data</li>
            </ul>
            <p className="mt-3 text-gray-700">
              Real-time projects, mock interviews, and personalized resume support included. This combo gives you everything needed to crack real interviews and land IT jobs—even if you're from a non-IT background.
            </p>
          </section>

          {/* Trainer Info */}
          <section className="flex flex-col md:flex-row items-center gap-6 bg-white p-6 border border-gray-200 rounded-lg">
            <img
              src="/instructors/hari.png"
              alt="Trainer Hari Krishnan"
              className="w-40 h-40 object-cover rounded-full border-4 border-blue-500"
            />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">Meet Your Trainer – Hari Krishnan</h3>
              <p className="text-gray-700">
                14+ years of IT experience in TCS, IBM, and Intex. Specialist in Informatica PowerCenter, IICS, ADF, and Snowflake. Passionate about helping job seekers transform their careers with practical training.
              </p>
            </div>
          </section>

          {/* Testimonials */}
          <section>
            <h2 className="text-2xl font-bold text-blue-800 mb-4">What Our Students Say</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  name: "Sandeep K.",
                  comment:
                    "Thanks to Hari sir’s guidance, I got placed in an MNC within 2 months! Training with real-time scenarios made all the difference."
                },
                {
                  name: "Priya D.",
                  comment:
                    "I was from a BPO background. After this combo training, I now work as a Data Engineer. Highly recommended!"
                }
              ].map((testimonial, idx) => (
                <div key={idx} className="bg-white p-4 shadow rounded border-l-4 border-green-500">
                  <p className="text-gray-700 italic">“{testimonial.comment}”</p>
                  <p className="mt-2 text-sm font-semibold text-gray-800">— {testimonial.name}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Join CTA */}
          <section className="text-center mt-12">
            <h2 className="text-2xl font-bold text-blue-800">Ready to Transform Your Career?</h2>
            <p className="mt-2 text-gray-700">
              Join our Informatica IICS Combo Training today. 100% support. Real-time projects. Lifetime access.
            </p>
            <div className="mt-4 space-y-2">
              <a
                href="https://wa.me/918970853557"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
              >
                WhatsApp Us: +91 89708 53557
              </a>
              <br />
              <a
                href="https://www.rishabinformaticagroup.com"
                className="text-blue-600 hover:underline"
                target="_blank"
              >
                Visit Our Website
              </a>
              <br />
              <a
                href="https://www.rishabinformaticagroup.com/courses/iics-combo-live"
                className="inline-block bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 mt-2"
              >
                Join the Course Now
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
