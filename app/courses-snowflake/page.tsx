// app/courses/page.tsx - USE THIS (Good UI version)
"use client";

import { useState, useEffect } from 'react';

interface Course {
  COURSE_ID: string;
  COURSE_NAME: string;
  DESCRIPTION: string;
  DURATION_HOURS: number;
  FEE: number;
  INSTRUCTOR: string;
  START_DATE: string;
  ENROLLED_COUNT: number;
  MAX_STUDENTS: number;
}

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses');
      const data = await response.json();
      
      if (data.success) {
        setCourses(data.courses);  // ✅ Correct
      } else {
        setError(data.error);
      }
    } catch (err: any) {
      setError('Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  const calculateProgress = (enrolled: number, max: number) => {
    return (enrolled / max) * 100;
  };

  if (loading) return <div className="p-8">Loading courses...</div>;
  if (error) return <div className="p-8 text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Training Courses</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.COURSE_ID} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-xl font-semibold text-gray-800">{course.COURSE_NAME}</h2>
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded">
                  ₹{course.FEE.toLocaleString()}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4 line-clamp-2">{course.DESCRIPTION}</p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{course.DURATION_HOURS} hours</span>
                </div>
                
                <div className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Instructor: {course.INSTRUCTOR}</span>
                </div>
                
                <div className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>Starts: {new Date(course.START_DATE).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>Enrollment Progress</span>
                  <span>{course.ENROLLED_COUNT}/{course.MAX_STUDENTS}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${calculateProgress(course.ENROLLED_COUNT, course.MAX_STUDENTS)}%` }}
                  ></div>
                </div>
              </div>
              
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-300">
                Enroll Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}