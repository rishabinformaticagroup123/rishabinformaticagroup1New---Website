export default function OurStoryPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Hero Section */}
        <div className="bg-blue-800 text-white p-8 text-center">
          <h1 className="text-4xl font-bold mb-4">Our Story</h1>
          <p className="text-xl">Transforming careers from Non-IT to IT since 2021</p>
        </div>

        {/* Content Section */}
        <div className="p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">The Challenge We Address</h2>
            <p className="text-gray-700 mb-6">
              Many are struggling to transition from Non-IT to IT careers. We are committed to helping them make this transition successfully!
            </p>
            <p className="text-gray-700">
              At Rishab Informatica Group, we are dedicated to helping individuals from non-IT backgrounds secure software jobs in as little as 45 days. With our proven strategies and structured plan, we guide and support you throughout the process to ensure success.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">Our Approach</h2>
            <p className="text-gray-700">
              Our approach is designed to make the transition to IT careers as smooth and efficient as possible. We focus on practical, job-ready skills that employers actually need.
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg mb-8">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">Founder's Story</h2>
            <p className="text-gray-700 mb-4">
              Hari Krishnan is a highly respected IT engineer with over 20 years of experience as a Technical and ETL Trainer. He has worked with prestigious companies such as Intex Technologies, TCS, IBM, and others.
            </p>
            <p className="text-gray-700">
              Driven by a passion for education and career development, Hari's goal is to help individuals overcome job struggles by equipping them with the skills needed to succeed in the IT industry. His expertise and dedication are at the core of our mission to provide high-quality training that leads to real career opportunities.
            </p>
          </div>

          <div className="bg-white border border-blue-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-blue-700 mb-3">Our Impact</h3>
            <p className="text-gray-700">
              We aim to eliminate the struggle of job seekers and contribute to India's GDP through exclusive Informatica IICS Combo Trainings. Our alumni now work at top companies across India and globally.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}