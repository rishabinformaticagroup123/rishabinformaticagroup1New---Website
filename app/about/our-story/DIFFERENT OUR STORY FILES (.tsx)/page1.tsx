import React from 'react';
import Head from 'next/head';

const OurStoryPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Our Story - Rishab Informatica Group</title>
        <meta name="description" content="Learn about our mission to help non-IT professionals transition to IT careers in just 45 days" />
      </Head>

      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold text-blue-800 mb-6">OUR STORY</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Transforming careers from Non-IT to IT with proven strategies and structured guidance
          </p>
        </section>

        {/* Mission Section */}
        <section className="mb-20">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-4xl mx-auto">
            <h2 className="text-3xl font-semibold text-blue-700 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 mb-6">
              Many talented individuals struggle to transition from Non-IT to IT careers. At Rishab Informatica Group, we're committed to breaking down these barriers and helping you make this transition successfully in just 45 days!
            </p>
            <p className="text-lg text-gray-700 mb-6">
              We are dedicated to helping professionals from non-IT backgrounds secure rewarding software jobs through our proven strategies and structured training programs. Our comprehensive approach provides the guidance and support you need at every step to ensure your success.
            </p>
            <p className="text-lg text-gray-700">
              Our training is designed to make your transition into the IT industry as smooth and efficient as possible, opening doors to new career opportunities you might have thought were out of reach.
            </p>
          </div>
        </section>

        {/* Founder Story */}
        <section className="flex flex-col md:flex-row items-center gap-10 max-w-6xl mx-auto">
          <div className="md:w-1/3">
            <div className="bg-blue-100 rounded-lg overflow-hidden">
              {/* Replace with actual founder image */}
              <div className="h-64 bg-blue-300 flex items-center justify-center">
                <span className="text-white text-lg">Founder Photo</span>
              </div>
            </div>
          </div>
          <div className="md:w-2/3">
            <h2 className="text-3xl font-semibold text-blue-700 mb-6">FOUNDER STORY</h2>
            <p className="text-lg text-gray-700 mb-4">
              Our vision is to eliminate the struggles of job seekers while contributing to India's GDP growth through our exclusive Informatica IICS Combo Training programs.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Hari Krishnan, the founder of Rishab Informatica Group, is a highly respected IT engineer with over 20 years of experience as a Technical and ETL Trainer. His impressive career includes working with prestigious organizations like Intex Technologies, TCS, IBM, and other industry leaders.
            </p>
            <p className="text-lg text-gray-700">
              Driven by a passion for education and career transformation, Hari's mission is to help individuals overcome job search challenges by equipping them with in-demand IT skills. His extensive expertise and unwavering dedication form the foundation of our commitment to delivering high-quality training that translates into real career opportunities for our students.
            </p>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-20 text-center">
          <h2 className="text-2xl font-semibold text-blue-700 mb-6">Ready to Transform Your Career?</h2>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300">
            Join Our Program Today
          </button>
        </section>
      </main>
    </div>
  );
};

export default OurStoryPage;