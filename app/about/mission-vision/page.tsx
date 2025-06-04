export default function MissionVisionPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">Our Mission & Vision</h1>
          <p className="text-lg text-gray-600">Fueling dreams. Shaping careers. Empowering India’s digital future.</p>
        </div>

        {/* Mission */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
          <div className="bg-blue-700 text-white p-6">
            <h2 className="text-2xl font-bold">Our Mission</h2>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-gray-700">
              Our mission is to uplift job seekers—especially from non-IT backgrounds—by equipping them with industry-relevant IT skills through our exclusive Informatica IICS Combo Trainings.
            </p>
            <p className="text-gray-700">
              We strive to make quality education accessible and practical, so anyone with the determination to succeed can confidently step into a high-demand IT career, regardless of their past.
            </p>
          </div>
        </div>

        {/* Vision */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-12">
          <div className="bg-blue-700 text-white p-6">
            <h2 className="text-2xl font-bold">Our Vision</h2>
          </div>
          <div className="p-6 space-y-4">
            <p className="text-gray-700">
              To be India’s most trusted platform for career transformation—where talent meets opportunity and hard work is converted into success.
            </p>
            <p className="text-gray-700">We envision a future where:</p>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>India becomes the global hub for Informatica and cloud data professionals</li>
              <li>We transform 10,000+ lives through IT training and mentorship by 2030</li>
              <li>Our students achieve a consistent placement rate above 95%</li>
              <li>We continuously innovate to align with future tech demands</li>
            </ul>
          </div>
        </div>

        {/* Core Values */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-blue-700 text-white p-6">
            <h2 className="text-2xl font-bold">Our Core Values</h2>
          </div>
          <div className="p-6 grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Excellence",
                content: "We pursue the highest standards in everything we do—from training quality to student outcomes."
              },
              {
                title: "Integrity",
                content: "We operate with transparency, honesty, and respect across all interactions."
              },
              {
                title: "Empathy",
                content: "We deeply understand the challenges faced by non-IT individuals and offer real solutions with heart."
              },
              {
                title: "Innovation",
                content: "We embrace change and constantly refine our programs to stay ahead of industry trends."
              },
              {
                title: "Student Success",
                content: "Your transformation is our mission. We measure success only through your progress."
              }
            ].map((value, idx) => (
              <div key={idx} className="border-l-4 border-blue-500 pl-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
