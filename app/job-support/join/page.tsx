'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function JobSupportForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    role: '',
    skill: '',
    otherSkill: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch(`${window.location.origin}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          subject: `Job Support Request - ${formData.name}`,
          type: 'job_support',
          role: formData.role === 'seeker' ? 'Job Support Seeker' : 'Job Support Provider',
          skill: formData.skill === 'other' ? formData.otherSkill : formData.skill,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
      } else {
        setError(result.message || 'Failed to submit form. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Network error. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // SUCCESS SCREEN
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          <div className="p-6 sm:p-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-24 h-24 sm:w-32 sm:h-32 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8"
            >
              <svg className="w-12 h-12 sm:w-16 sm:h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>

            <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-4">
              Thank You!
            </h2>

            <p className="text-lg sm:text-xl text-gray-600 text-center mb-6 leading-relaxed">
              Your job support request has been submitted successfully. We will contact you within 24 hours.
            </p>

            <div className="bg-blue-50 rounded-xl p-6 mb-8">
              <h3 className="text-xl sm:text-2xl font-semibold text-blue-800 mb-4 text-center">
                Contact Information
              </h3>

              <div className="grid sm:grid-cols-2 gap-6 text-center sm:text-left">
                <div>
                  <p className="font-semibold text-blue-700">📞 Phone Numbers</p>
                  <p className="text-blue-600 font-medium">+91 8970853557</p>
                  <p className="text-blue-600 font-medium">+91 9448005273</p>
                </div>

                <div>
                  <p className="font-semibold text-blue-700">📧 Email</p>
                  <p className="text-blue-600 font-medium break-all">
                    support@rishabinformaticagroup.com
                  </p>
                </div>
              </div>
            </div>

            {/* ✅ MOBILE-FRIENDLY BUTTONS */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-8">
              <Button
                onClick={() => window.location.href = '/job-support'}
                className="w-full sm:w-auto bg-orange-600 hover:bg-orange-700 text-white py-4 px-6 text-lg font-semibold rounded-xl transition-all duration-200"
              >
                Return to Home
              </Button>

              <Button
                onClick={() => setIsSubmitted(false)}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 text-lg font-semibold rounded-xl transition-all duration-200"
              >
                Submit Another Request
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // FORM SCREEN
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl shadow-2xl p-6 sm:p-8 mb-6"
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
              Job Support Collaboration Initiative
            </h1>
            <p className="text-blue-100 text-lg sm:text-xl">
              Rishab Informatica Group
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-10">
            <p className="text-xl sm:text-2xl text-gray-800 font-semibold mb-4">
              Welcome to the Job Support Collaboration Initiative!
            </p>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-6">
              We connect IT professionals who need job support with experienced individuals who can provide real-time assistance.
            </p>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg p-6 text-left">
              <h3 className="text-lg sm:text-xl font-semibold text-yellow-800 mb-3">
                For any clarifications:
              </h3>
              <div className="grid sm:grid-cols-2 gap-4 text-lg">
                <div>
                  <p className="font-semibold text-yellow-700">📞 8970853557</p>
                  <p className="font-semibold text-yellow-700">📞 9448005273</p>
                </div>
                <div>
                  <p className="font-semibold text-yellow-700 break-all">
                    📧 support@rishabinformaticagroup.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content + Form */}
        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-6">
              Why Choose Our Job Support?
            </h2>

            <div className="space-y-6">
              {[
                ["🎯", "Expert Guidance", "Get support from experts working in top IT companies."],
                ["⚡", "Real-time Solutions", "Instant help for production issues and project tasks."],
                ["🤝", "Career Growth", "Grow faster with personalized expert mentoring."],
                ["💼", "Flexible Timing", "Support based on your timing and needs."]
              ].map(([icon, title, desc], i) => (
                <div key={i} className="flex items-start">
                  <div className="bg-blue-100 p-4 rounded-2xl mr-4">
                    <span className="text-2xl">{icon}</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
                    <p className="text-gray-600">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FORM */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-6">
              Submit Your Request
            </h2>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                <p className="text-red-700 font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name & Phone */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Email ID *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email address"
                />
              </div>

              {/* Role */}
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Select Your Role *
                </label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select your role</option>
                  <option value="seeker">Job Support Seeker</option>
                  <option value="provider">Job Support Provider</option>
                </select>
              </div>

              {/* Skill */}
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Job Support Skill *
                </label>
                <select
                  name="skill"
                  value={formData.skill}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select your skill</option>
                  <option value="Informatica Power Center / IICS - IDMC">Informatica Power Center / IICS - IDMC</option>
                  <option value="Azure Data Engineering (ADF, ADB)">Azure Data Engineering (ADF, ADB)</option>
                  <option value="Power BI / Tableau">Power BI / Tableau</option>
                  <option value="Talend ETL">Talend ETL</option>
                  <option value="other">Other Skills</option>
                </select>
              </div>

              {/* Other Skill */}
              {formData.skill === 'other' && (
                <div>
                  <label className="block text-lg font-medium text-gray-700 mb-2">
                    Other Skills *
                  </label>
                  <input
                    type="text"
                    name="otherSkill"
                    value={formData.otherSkill}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                    placeholder="Specify your skill (e.g., Snowflake, Python, Databricks...)"
                    required
                  />
                </div>
              )}

              {/* Message */}
              <div>
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Additional Message (Optional)
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500"
                  placeholder="Any additional information or project details..."
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 text-xl font-semibold rounded-xl transition-all duration-200"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                    Submitting...
                  </div>
                ) : (
                  'Submit Job Support Request'
                )}
              </Button>
            </form>

            <p className="text-center text-gray-600 mt-6">
              Need help? Call <strong className="text-blue-700">8970853557</strong> /
              <strong className="text-blue-700"> 9448005273</strong><br />
              or email <strong className="text-blue-700">
                support@rishabinformaticagroup.com
              </strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
