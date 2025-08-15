export default function ContactUsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-800 mb-3">Contact Us</h1>
          <p className="text-lg text-gray-600">
            We'd love to hear from you! Reach out for any queries, support, or feedback.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-blue-700 mb-6">Get in Touch</h2>
            <div className="space-y-6">
              {/* Phone */}
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <PhoneIcon />
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
                  <EmailIcon />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Email</h3>
                  <p className="text-gray-600">support@rishabinformaticagroup.com</p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <LocationIcon />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Address</h3>
                  <p className="text-gray-600">Rishab Informatica Group</p>
                  <p className="text-gray-600">Chennai, Tamil Nadu, India</p>
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <ClockIcon />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">Working Hours</h3>
                  <p className="text-gray-600">Mon–Fri: 9:00 AM – 6:00 PM</p>
                  <p className="text-gray-600">Saturday: 10:00 AM – 4:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-blue-700 mb-6">Send a Message</h2>
            <form className="space-y-5">
              <InputField id="name" label="Your Name" placeholder="John Doe" />
              <InputField id="email" label="Email Address" type="email" placeholder="john@example.com" />
              <InputField id="phone" label="Phone Number" type="tel" placeholder="+91 XXXXX XXXXX" />
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Write your message here..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Google Map Integration Placeholder */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-blue-700 mb-4">Our Location</h2>
          <div className="w-full h-96 bg-gray-200 rounded-xl shadow-md flex items-center justify-center">
            <p className="text-gray-500">Google Map Integration Coming Soon</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Reusable InputField Component */
function InputField({ id, label, type = "text", placeholder }: { id: string; label: string; type?: string; placeholder: string }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        id={id}
        type={type}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
        placeholder={placeholder}
      />
    </div>
  );
}

/* SVG Icons (can also be moved to a separate component file) */
function PhoneIcon() {
  return (
    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1..." />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2..." />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414..." />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3..." />
    </svg>
  );
}
