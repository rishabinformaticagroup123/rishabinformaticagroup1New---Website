export default function MissionVisionPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">Our Mission & Vision</h1>
          <p className="text-lg text-gray-600">
            Fueling dreams. Shaping careers. Empowering India’s digital future.
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
          <div className="bg-blue-700 text-white p-6">
            <h2 className="text-2xl font-bold">Our Mission</h2>
          </div>
          <div className="p-6 space-y-4 text-gray-700">
            <p>
              Our mission is to uplift job seekers—especially from non-IT backgrounds—by equipping them with
              industry-relevant IT skills through our exclusive Informatica IICS Combo Training and other career-focused programs.
            </p>
            <p>
              We strive to make quality education accessible, affordable, and practical, so anyone with the
              determination to succeed can confidently step into a high-demand IT career, regardless of their past experience.
            </p>
          </div>
        </div>

        {/* Vision Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
          <div className="bg-blue-700 text-white p-6">
            <h2 className="text-2xl font-bold">Our Vision</h2>
          </div>
          <div className="p-6 text-gray-700 space-y-4">
            <p>
              To be India’s most trusted platform for career transformation—where talent meets opportunity and
              hard work is converted into success.
            </p>
            <p>We envision a future where:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>India becomes the global hub for Informatica and Cloud Data professionals.</li>
              <li>We transform 10,000+ lives through IT training and mentorship by 2030.</li>
              <li>Our students achieve a consistent placement rate above 95%.</li>
              <li>We continuously innovate to align with emerging technologies and global demands.</li>
            </ul>
          </div>
        </div>

        {/* Core Values */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
          <div className="bg-blue-700 text-white p-6">
            <h2 className="text-2xl font-bold">Our Core Values</h2>
          </div>
          <div className="p-6 grid md:grid-cols-2 gap-6 text-gray-700">
            {[
              {
                title: "Excellence",
                content:
                  "We pursue the highest standards in everything we do—from training quality to student outcomes.",
              },
              {
                title: "Integrity",
                content:
                  "We operate with transparency, honesty, and respect across all interactions.",
              },
              {
                title: "Empathy",
                content:
                  "We deeply understand the challenges faced by non-IT individuals and offer real solutions with heart.",
              },
              {
                title: "Innovation",
                content:
                  "We embrace change and constantly refine our programs to stay ahead of industry trends.",
              },
              {
                title: "Student Success",
                content:
                  "Your transformation is our mission. We measure success only through your progress.",
              },
            ].map((value, idx) => (
              <div key={idx} className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{value.title}</h3>
                <p>{value.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Future Goals */}
        <div className="bg-blue-50 rounded-xl shadow-md overflow-hidden mb-12 p-6">
          <h2 className="text-2xl font-bold text-blue-800 mb-3">Vision 2030: Where We're Headed</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Build a dedicated LMS platform to deliver real-time, personalized learning.</li>
            <li>Launch scholarships and affordable learning options for underserved communities.</li>
            <li>Expand mentorship and job support network across India & abroad.</li>
            <li>Partner with top IT companies to bridge the demand-supply gap in skilled professionals.</li>
          </ul>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h3 className="text-xl font-semibold text-blue-800 mb-2">Ready to transform your career?</h3>
          <p className="text-gray-600 mb-4">Explore our programs and take the first step today.</p>
          <a
            href="/courses"
            className="inline-block bg-blue-700 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-800 transition"
          >
            View Courses
          </a>
        </div>
      </div>
    </div>
  );
}
