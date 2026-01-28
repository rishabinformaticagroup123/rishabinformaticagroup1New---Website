export const metadata = {
  title: "Informatica IICS Projects - Real-world ETL Solutions",
  description: "Enterprise Informatica PowerCenter and IICS projects with case studies and implementations.",
}

export default function InformaticaProjectsPage() {
  const projects = [
    {
      id: 1,
      title: "Banking Data Migration & Modernization",
      client: "Leading Multinational Bank",
      duration: "4 Months",
      complexity: "Advanced",
      description: "Migrated 15TB of legacy banking data from on-premise Oracle to cloud with zero downtime using IICS",
      technologies: ["IICS", "PowerCenter", "Oracle", "AWS S3", "CDC"],
      challenges: [
        "Zero downtime migration requirement",
        "Complex data validation rules",
        "GDPR compliance implementation"
      ],
      solutions: [
        "Implemented real-time CDC using PowerExchange",
        "Built automated reconciliation framework",
        "Created data quality metrics dashboard"
      ],
      results: [
        "Zero downtime achieved",
        "99.99% data accuracy",
        "Query performance improved by 300%"
      ]
    },
    {
      id: 2,
      title: "Healthcare ETL Pipeline",
      client: "Healthcare Provider Network",
      duration: "3 Months",
      complexity: "Intermediate",
      description: "Built HIPAA compliant ETL pipeline for patient data integration across multiple systems",
      technologies: ["IICS", "HL7", "SQL Server", "REST APIs"],
      challenges: [
        "HIPAA compliance requirements",
        "Multiple source system integration",
        "Real-time data synchronization"
      ],
      solutions: [
        "Implemented secure data masking",
        "Built REST API connectors",
        "Created audit trail system"
      ],
      results: [
        "HIPAA compliance achieved",
        "Real-time data availability",
        "Reduced manual effort by 80%"
      ]
    },
    // Add 6 more projects...
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <h1 className="text-5xl font-bold mb-6">Informatica IICS Projects</h1>
            <p className="text-xl text-blue-100 mb-8">
              Enterprise-grade ETL/ELT solutions with real-world implementations and measurable business impact
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="px-4 py-2 bg-white/20 rounded-full">PowerCenter</span>
              <span className="px-4 py-2 bg-white/20 rounded-full">IICS</span>
              <span className="px-4 py-2 bg-white/20 rounded-full">Data Migration</span>
              <span className="px-4 py-2 bg-white/20 rounded-full">CDC</span>
              <span className="px-4 py-2 bg-white/20 rounded-full">Cloud Integration</span>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
              {/* Project Header */}
              <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-bold">{project.title}</h3>
                    <div className="flex items-center mt-2">
                      <span className="text-blue-100">Client: {project.client}</span>
                      <span className="mx-2">•</span>
                      <span className="text-blue-100">{project.duration}</span>
                      <span className="mx-2">•</span>
                      <span className="px-3 py-1 bg-white/20 rounded-full text-sm">
                        {project.complexity}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Project Body */}
              <div className="p-6">
                <p className="text-gray-600 mb-6">{project.description}</p>
                
                {/* Technologies */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Technologies Used</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Challenges & Solutions */}
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Challenges</h4>
                    <ul className="space-y-2">
                      {project.challenges.map((challenge, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-red-500 mr-2">⚠️</span>
                          <span className="text-gray-700">{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Solutions</h4>
                    <ul className="space-y-2">
                      {project.solutions.map((solution, i) => (
                        <li key={i} className="flex items-start">
                          <span className="text-green-500 mr-2">✅</span>
                          <span className="text-gray-700">{solution}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Results */}
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-gray-900 mb-3">Business Results</h4>
                  <ul className="space-y-2">
                    {project.results.map((result, i) => (
                      <li key={i} className="flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                        <span className="text-gray-700">{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 pt-6 border-t border-gray-200 flex gap-4">
                  <button className="flex-1 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
                    View Detailed Case Study
                  </button>
                  <button className="px-6 py-3 border border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50">
                    Request Source Code
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Path */}
      <div className="container mx-auto px-4 pb-16">
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Learn Through These Projects</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-3">Hands-on Implementation</h3>
              <p className="text-gray-600">Work on real-world scenarios with step-by-step guidance</p>
            </div>
            <div className="bg-white p-6 rounded-xl">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-3">Interview Preparation</h3>
              <p className="text-gray-600">Project-based interview questions and solutions</p>
            </div>
            <div className="bg-white p-6 rounded-xl">
              <div className="text-4xl mb-4">💼</div>
              <h3 className="text-xl font-bold mb-3">Resume Building</h3>
              <p className="text-gray-600">Add these projects to your resume with confidence</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}