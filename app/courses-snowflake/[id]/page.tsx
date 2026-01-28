// app/courses/[id]/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface Course {
  COURSE_ID: string;
  COURSE_NAME: string;
  DESCRIPTION: string;
  DURATION_HOURS: number;
  FEE: number;
  INSTRUCTOR: string;
  START_DATE: string;
  END_DATE: string;
  MAX_STUDENTS: number;
  ENROLLED_COUNT: number;
  STATUS: string;
}

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const courseId = params.id as string;
  
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (courseId) {
      fetchCourse();
    }
  }, [courseId]);

  const fetchCourse = async () => {
    try {
      const response = await fetch(`/api/courses/${courseId}`);
      const data = await response.json();
      
      if (data.success) {
        setCourse(data.course);
      } else {
        setError(data.error || 'Course not found');
      }
    } catch (err: any) {
      setError('Failed to fetch course details');
    } finally {
      setLoading(false);
    }
  };

  const calculateProgress = (enrolled: number, max: number) => {
    return (enrolled / max) * 100;
  };

  const calculateDaysLeft = (startDate: string) => {
    const start = new Date(startDate);
    const today = new Date();
    const diffTime = start.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  if (loading) return <div className="p-8 text-center">Loading course details...</div>;
  if (error) return <div className="p-8 text-center text-red-500">Error: {error}</div>;
  if (!course) return <div className="p-8 text-center">Course not found</div>;

  const daysLeft = calculateDaysLeft(course.START_DATE);
  const seatsLeft = course.MAX_STUDENTS - course.ENROLLED_COUNT;
  const enrollmentProgress = calculateProgress(course.ENROLLED_COUNT, course.MAX_STUDENTS);

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/courses" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
        ← Back to all courses
      </Link>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Course Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-8 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2">{course.COURSE_NAME}</h1>
              <p className="text-blue-100 mb-4">{course.DESCRIPTION}</p>
              <div className="flex items-center space-x-4">
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {course.DURATION_HOURS} hours
                </span>
                <span className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Instructor: {course.INSTRUCTOR}
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">₹{course.FEE.toLocaleString()}</div>
              <div className="text-sm text-blue-200">Course Fee</div>
            </div>
          </div>
        </div>

        {/* Course Details */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Course Schedule */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Course Schedule</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Start Date:</span>
                  <span className="font-medium">{new Date(course.START_DATE).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">End Date:</span>
                  <span className="font-medium">{new Date(course.END_DATE).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Days Left:</span>
                  <span className={`font-medium ${daysLeft < 10 ? 'text-red-600' : 'text-green-600'}`}>
                    {daysLeft} days
                  </span>
                </div>
              </div>
            </div>

            {/* Enrollment Status */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Enrollment Status</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Seats Filled</span>
                    <span>{course.ENROLLED_COUNT}/{course.MAX_STUDENTS}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        enrollmentProgress > 80 ? 'bg-red-500' : 
                        enrollmentProgress > 50 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${enrollmentProgress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Seats Available:</span>
                  <span className={`font-medium ${seatsLeft < 5 ? 'text-red-600' : 'text-green-600'}`}>
                    {seatsLeft} seats
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`px-2 py-1 rounded text-sm font-medium ${
                    course.STATUS === 'ACTIVE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {course.STATUS}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition">
                  Enroll Now
                </button>
                <button className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-3 px-4 rounded-lg transition">
                  Download Syllabus
                </button>
                <button className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-3 px-4 rounded-lg transition">
                  Contact Instructor
                </button>
              </div>
            </div>
          </div>

          {/* Course Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Course Description</h2>
            <p className="text-gray-700 leading-relaxed">
              {course.DESCRIPTION}
            </p>
          </div>

          {/* What You'll Learn */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Complete hands-on training with real-world projects",
                "Industry-relevant curriculum designed by experts",
                "Personalized mentorship and career guidance",
                "Certificate recognized by top companies",
                "Placement assistance and interview preparation",
                "Lifetime access to course materials and updates"
              ].map((item, index) => (
                <div key={index} className="flex items-start">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}