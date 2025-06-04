export default function MissionVisionPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">Our Mission & Vision</h1>
          <p className="text-xl text-gray-600">Guiding principles that drive our training programs</p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-12">
          <div className="bg-blue-700 text-white p-6">
            <h2 className="text-2xl font-bold">Our Mission</h2>
          </div>
          <div className="p-6">
            <p className="text-gray-700 mb-6">
              We aim to eliminate the struggle of job seekers and contribute to India's GDP through exclusive Informatica IICS Combo Trainings.
            </p>
            <p className="text-gray-700">
              Our mission is to democratize access to high-quality IT education, enabling professionals from all backgrounds to launch successful careers in data integration and cloud technologies.
            </p>
          </div>
        </div>

        {/* Vision Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-12">
          <div className="bg-blue-700 text-white p-6">
            <h2 className="text-2xl font-bold">Our Vision</h2>
          </div>
          <div className="p-6">
            <p className="text-gray-700 mb-6">
              To become India's most trusted career transformation platform for non-IT professionals, creating a bridge between talent and opportunity in the technology sector.
            </p>
            <ul className="list-disc pl-5 text-gray-700 space-y-2">
              <li>Make India the global hub for Informatica professionals</li>
              <li>Transform 10,000+ careers in the next 5 years</li>
              <li>Maintain 95%+ placement rate for our students</li>
              <li>Innovate continuously in our training methodologies</li>
            </ul>
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-blue-700 text-white p-6">
            <h2 className="text-2xl font-bold">Our Core Values</h2>
          </div>
          <div className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Excellence",
                  content: "We maintain the highest standards in training quality and outcomes."
                },
                {
                  title: "Integrity",
                  content: "We're transparent and ethical in all our interactions."
                },
                {
                  title: "Student-Centric",
                  content: "Your success is our top priority at every step."
                },
                {
                  title: "Innovation",
                  content: "We continuously improve our programs to stay ahead of industry trends."
                }
              ].map((value, index) => (
                <div key={index} className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}