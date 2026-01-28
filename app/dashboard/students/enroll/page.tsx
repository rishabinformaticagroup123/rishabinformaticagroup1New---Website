// app/dashboard/students/enroll/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, UserPlus, Save, User, Mail, Phone, MapPin, GraduationCap, BookOpen } from 'lucide-react';

interface Course {
  COURSE_ID: string;
  COURSE_NAME: string;
  FEE: number;
  MAX_STUDENTS: number;
  ENROLLED_COUNT: number;
}

export default function EnrollStudentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    address: '',
    qualification: '',
    course_id: ''
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses?status=ACTIVE');
      const data = await response.json();
      if (data.success) {
        setCourses(data.courses);
      }
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (data.success) {
        alert(`Student enrolled successfully! Student ID: ${data.student_id}`);
        router.push('/dashboard/students');
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error: any) {
      alert(`Failed to enroll student: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === 'course_id') {
      const course = courses.find(c => c.COURSE_ID === value);
      setSelectedCourse(course || null);
    }
  };

  const calculateSeatsLeft = (course: Course) => {
    return course.MAX_STUDENTS - course.ENROLLED_COUNT;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/dashboard/students" 
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Students
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-100 rounded-xl">
                <UserPlus className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Enroll New Student</h1>
                <p className="text-gray-600 mt-2">Add a new student to the training program</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard/students"
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </Link>
              <button
                type="submit"
                form="student-form"
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
              >
                {loading ? (
                  'Enrolling...'
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Enroll Student
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Student Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
              <form id="student-form" onSubmit={handleSubmit} className="space-y-6">
                {/* Student Information */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Student Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="+91 9876543210"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Highest Qualification *
                      </label>
                      <input
                        type="text"
                        name="qualification"
                        value={formData.qualification}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="e.g., B.Tech, B.Sc, Diploma"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address *
                      </label>
                      <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        rows={3}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Full residential address..."
                      />
                    </div>
                  </div>
                </div>

                {/* Course Selection */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Course Selection
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Course *
                    </label>
                    <select
                      name="course_id"
                      value={formData.course_id}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">-- Select a Course --</option>
                      {courses.map((course) => (
                        <option key={course.COURSE_ID} value={course.COURSE_ID}>
                          {course.COURSE_NAME} (₹{course.FEE.toLocaleString()})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Right Column - Course Info & Summary */}
          <div className="space-y-6">
            {/* Course Information */}
            {selectedCourse && (
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Course Details</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Course Name</p>
                    <p className="font-medium">{selectedCourse.COURSE_NAME}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Course Fee</p>
                    <p className="text-2xl font-bold text-blue-600">
                      ₹{selectedCourse.FEE.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Enrollment Status</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">
                          {selectedCourse.ENROLLED_COUNT}/{selectedCourse.MAX_STUDENTS}
                        </p>
                        <p className="text-sm text-gray-500">seats filled</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        calculateSeatsLeft(selectedCourse) < 5 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {calculateSeatsLeft(selectedCourse)} seats left
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(selectedCourse.ENROLLED_COUNT / selectedCourse.MAX_STUDENTS) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Enrollment Summary */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">Enrollment Summary</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="p-1.5 bg-blue-100 rounded">
                    <UserPlus className="w-4 h-4 text-blue-600" />
                  </div>
                  <p className="text-sm text-blue-800">
                    Student will be added to Snowflake database
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="p-1.5 bg-blue-100 rounded">
                    <GraduationCap className="w-4 h-4 text-blue-600" />
                  </div>
                  <p className="text-sm text-blue-800">
                    Course enrollment count will automatically increase
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="p-1.5 bg-blue-100 rounded">
                    <Mail className="w-4 h-4 text-blue-600" />
                  </div>
                  <p className="text-sm text-blue-800">
                    Enrollment confirmation email will be sent
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Courses</span>
                  <span className="font-medium">{courses.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Courses</span>
                  <span className="font-medium">
                    {courses.filter(c => c.ENROLLED_COUNT < c.MAX_STUDENTS).length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Capacity</span>
                  <span className="font-medium">
                    {courses.reduce((sum, course) => sum + course.MAX_STUDENTS, 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}