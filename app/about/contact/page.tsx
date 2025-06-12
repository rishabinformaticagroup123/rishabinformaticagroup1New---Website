'use client';

import { useState } from 'react';

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (result.success) {
        setStatus('✅ Message sent successfully!');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setStatus('❌ Failed to send message. Please try again.');
      }
    } catch (err) {
      setStatus('❌ Error sending message. Check console.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600">Get in touch with our team for course inquiries and support</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-blue-700 mb-6">Contact Information</h2>

            <div className="space-y-6">
              {/* Phone */}
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  📞
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Phone</h3>
                  <p className="text-gray-600">+91 9448005273</p>
                  <p className="text-gray-600">+91 8970853557</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  📧
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Email</h3>
                  <p className="text-gray-600">support@rishabinformaticagroup.com</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  📍
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Address</h3>
                  <p className="text-gray-600">Rishab Informatica GROUP, No 7, 5th Main, 15th Cross, Subbaraju Layout, Lakkasandra</p>
                  <p className="text-gray-600">Bangalore, Karnataka, India</p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  ⏰
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Working Hours</h3>
                  <p className="text-gray-600">Monday - Friday: 7:00 AM - 9:00 PM</p>
                  <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-blue-700 mb-6">Send Us a Message</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your phone number"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                <textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="How can we help you?"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Send Message
              </button>

              {status && (
                <p className="text-center text-sm text-gray-700 mt-4">{status}</p>
              )}
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12 bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="h-96 w-full bg-gray-200 flex items-center justify-center">
            <p className="text-gray-500">Google Map Integration Here</p>
          </div>
        </div>
      </div>
    </div>
  );
}
