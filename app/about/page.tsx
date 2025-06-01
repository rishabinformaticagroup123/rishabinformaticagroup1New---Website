import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">About Rishab Informatica Group</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Premier destination for mastering Informatica PowerCenter & Cloud technologies
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Link href="/about/our-story" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold text-blue-700 mb-3">Our Story</h2>
            <p className="text-gray-600">Discover our journey in transforming IT careers</p>
            <div className="mt-4 text-blue-600 font-medium">Learn more →</div>
          </Link>

          <Link href="/about/mission-vision" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold text-blue-700 mb-3">Mission & Vision</h2>
            <p className="text-gray-600">Our commitment to India's IT growth</p>
            <div className="mt-4 text-blue-600 font-medium">Explore →</div>
          </Link>

          <Link href="/about/contact-us" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold text-blue-700 mb-3">Contact Us</h2>
            <p className="text-gray-600">Get in touch with our team</p>
            <div className="mt-4 text-blue-600 font-medium">Reach out →</div>
          </Link>
        </div>

        {/* Institute Overview */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-16">
          <div className="md:flex">
            <div className="md:w-1/3 bg-blue-50 flex items-center justify-center p-8">
              <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-white shadow-md">
                <Image 
                  src="/harikrishnan.jpg" 
                  alt="Hari Krishnan - Founder"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="md:w-2/3 p-8">
              <h2 className="text-3xl font-bold text-blue-800 mb-4">Our Institute</h2>
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Hari Krishnan</h3>
                <p className="text-gray-600 mb-1">ETL Development Expert</p>
                <p className="text-gray-600">B.Tech, MBA | 15+ years experience</p>
              </div>
              <p className="text-gray-700 mb-6">
                Welcome to Rishab Informatica Group, the premier destination for mastering both Informatica PowerCenter and Informatica Cloud in a single comprehensive online training program.
              </p>
              <Link href="/about/our-story" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Learn Our Full Story
              </Link>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-blue-800 mb-12">Why Choose Us?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Expert Instructors",
                content: "Learn from certified Informatica professionals with extensive real-world project experience."
              },
              {
                title: "Comprehensive Curriculum",
                content: "Covers PowerCenter essentials, advanced ETL, Cloud integration, and performance optimization."
              },
              {
                title: "Hands-On Learning",
                content: "Practical exercises and projects simulating real-world data integration scenarios."
              },
              {
                title: "Flexible Online Classes",
                content: "Study at your convenience from anywhere in the world."
              },
              {
                title: "Career Advancement",
                content: "Career guidance, resume reviews, and interview preparation included."
              },
              {
                title: "Certification Prep",
                content: "Specialized training modules and mock tests for certification exams."
              }
            ].map((item, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}