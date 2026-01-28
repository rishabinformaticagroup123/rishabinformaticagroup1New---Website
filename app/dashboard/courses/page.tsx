// app/dashboard/courses/page.tsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Search, Filter, Plus, Edit, Trash2,
  Eye, Download, MoreVertical
} from 'lucide-react';

interface Course {
  COURSE_ID: string;
  COURSE_NAME: string;
  INSTRUCTOR: string;
  FEE: number;
  START_DATE: string;
  ENROLLED_COUNT: number;
  MAX_STUDENTS: number;
  STATUS: string;
}

export default function CourseManagementPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses');
      const data = await response.json();
      if (data.success) setCourses(data.courses);
    } catch (error) {
      console.error('Failed to fetch courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.COURSE_NAME.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.INSTRUCTOR.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || course.STATUS === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const StatusBadge = ({ status }: { status: string }) => {
    const colors = {
      ACTIVE: 'bg-green-100 text-green-800',
      INACTIVE: 'bg-gray-100 text-gray-800',
      UPCOMING: 'bg-blue-100 text-blue-800',
      FULL: 'bg-red-100 text-red-800'
    };
    
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors[status as keyof typeof colors] || colors.INACTIVE}`}>
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Course Management</h1>
            <p className="text-gray-600 mt-1">Manage all training courses and enrollments</p>
          </div>
          <Link href="/dashboard/courses/new">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg flex items-center">
              <Plus className="w-5 h-5 mr-2" />
              Add New Course
            </button>
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search courses by name or instructor..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <select
              className="border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
              <option value="UPCOMING">Upcoming</option>
              <option value="FULL">Full</option>
            </select>
            <button className="border border-gray-300 rounded-lg px-4 py-2.5 hover:bg-gray-50 flex items-center">
              <Filter className="w-5 h-5 mr-2" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-sm font-medium text-gray-600">Total Courses</p>
          <p className="text-2xl font-bold mt-2">{courses.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-sm font-medium text-gray-600">Active Courses</p>
          <p className="text-2xl font-bold mt-2">
            {courses.filter(c => c.STATUS === 'ACTIVE').length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-sm font-medium text-gray-600">Total Students</p>
          <p className="text-2xl font-bold mt-2">
            {courses.reduce((sum, course) => sum + course.ENROLLED_COUNT, 0)}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-sm font-medium text-gray-600">Total Revenue</p>
          <p className="text-2xl font-bold mt-2">
            ₹{courses.reduce((sum, course) => sum + (course.FEE * course.ENROLLED_COUNT), 0).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Courses Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Instructor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fee
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Start Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Enrollment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCourses.map((course) => (
                <tr key={course.COURSE_ID} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="font-medium text-gray-900">{course.COURSE_NAME}</p>
                      <p className="text-sm text-gray-500">ID: {course.COURSE_ID}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-gray-900">{course.INSTRUCTOR}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="font-medium">₹{course.FEE.toLocaleString()}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-gray-900">{new Date(course.START_DATE).toLocaleDateString()}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-gray-900">
                        {course.ENROLLED_COUNT}/{course.MAX_STUDENTS}
                      </p>
                      <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                        <div 
                          className="bg-blue-600 h-1.5 rounded-full"
                          style={{ width: `${(course.ENROLLED_COUNT / course.MAX_STUDENTS) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={course.STATUS} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <Link href={`/courses/${course.COURSE_ID}`}>
                        <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded">
                          <Eye className="w-4 h-4" />
                        </button>
                      </Link>
                      <Link href={`/dashboard/courses/edit/${course.COURSE_ID}`}>
                        <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded">
                          <Edit className="w-4 h-4" />
                        </button>
                      </Link>
                      <button className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No courses found</p>
            <p className="text-gray-400 mt-1">Try changing your search or filters</p>
          </div>
        )}

        {/* Table Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
          <p className="text-sm text-gray-600">
            Showing {filteredCourses.length} of {courses.length} courses
          </p>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border rounded text-sm hover:bg-gray-100">Previous</button>
            <button className="px-3 py-1 border rounded text-sm bg-blue-600 text-white">1</button>
            <button className="px-3 py-1 border rounded text-sm hover:bg-gray-100">2</button>
            <button className="px-3 py-1 border rounded text-sm hover:bg-gray-100">Next</button>
          </div>
        </div>
      </div>

      {/* Export Section */}
      <div className="mt-8 bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">Export Course Data</h3>
            <p className="text-gray-600 mt-1">Download course list in various formats</p>
          </div>
          <div className="flex space-x-3">
            <button className="border border-gray-300 rounded-lg px-4 py-2.5 hover:bg-gray-50 flex items-center">
              <Download className="w-5 h-5 mr-2" />
              Export as CSV
            </button>
            <button className="border border-gray-300 rounded-lg px-4 py-2.5 hover:bg-gray-50 flex items-center">
              <Download className="w-5 h-5 mr-2" />
              Export as PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}