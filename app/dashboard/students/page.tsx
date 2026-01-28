// app/dashboard/students/page.tsx
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Search, Filter, UserPlus, Mail, Phone,
  Calendar, BookOpen, MoreVertical, Download
} from 'lucide-react';

interface Student {
  STUDENT_ID: string;
  FULL_NAME: string;
  EMAIL: string;
  PHONE: string;
  COURSE_NAME: string;
  ENROLLMENT_DATE: string;
  STATUS: string;
}

export default function StudentManagementPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch('/api/students');
      const data = await response.json();
      if (data.success) setStudents(data.students);
    } catch (error) {
      console.error('Failed to fetch students:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = students.filter(student =>
    student.FULL_NAME.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.EMAIL.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.COURSE_NAME?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const StatusBadge = ({ status }: { status: string }) => (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
      status === 'ACTIVE' ? 'bg-green-100 text-green-800' :
      status === 'COMPLETED' ? 'bg-blue-100 text-blue-800' :
      'bg-gray-100 text-gray-800'
    }`}>
      {status}
    </span>
  );

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
            <h1 className="text-2xl font-bold text-gray-900">Student Management</h1>
            <p className="text-gray-600 mt-1">Manage student enrollments and information</p>
          </div>
          <Link href="/dashboard/students/enroll">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg flex items-center">
              <UserPlus className="w-5 h-5 mr-2" />
              Enroll New Student
            </button>
          </Link>
        </div>

        {/* Search */}
        <div className="relative max-w-2xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search students by name, email, or course..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-sm font-medium text-gray-600">Total Students</p>
          <p className="text-2xl font-bold mt-2">{students.length}</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-sm font-medium text-gray-600">Active Students</p>
          <p className="text-2xl font-bold mt-2">
            {students.filter(s => s.STATUS === 'ACTIVE').length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-sm font-medium text-gray-600">This Month</p>
          <p className="text-2xl font-bold mt-2">
            {students.filter(s => {
              const enrollDate = new Date(s.ENROLLMENT_DATE);
              const now = new Date();
              return enrollDate.getMonth() === now.getMonth() && 
                     enrollDate.getFullYear() === now.getFullYear();
            }).length}
          </p>
        </div>
        <div className="bg-white rounded-xl shadow p-6">
          <p className="text-sm font-medium text-gray-600">Completion Rate</p>
          <p className="text-2xl font-bold mt-2">
            {students.length > 0 
              ? `${Math.round((students.filter(s => s.STATUS === 'COMPLETED').length / students.length) * 100)}%`
              : '0%'
            }
          </p>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Enrollment Date
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
              {filteredStudents.map((student) => (
                <tr key={student.STUDENT_ID} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <p className="font-medium text-gray-900">{student.FULL_NAME}</p>
                      <p className="text-sm text-gray-500">ID: {student.STUDENT_ID}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="flex items-center text-sm">
                        <Mail className="w-4 h-4 text-gray-400 mr-2" />
                        {student.EMAIL}
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="w-4 h-4 text-gray-400 mr-2" />
                        {student.PHONE}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <BookOpen className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-gray-900">{student.COURSE_NAME || 'Not assigned'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                      <span>{new Date(student.ENROLLMENT_DATE).toLocaleDateString()}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusBadge status={student.STATUS} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <Link href={`/dashboard/students/${student.STUDENT_ID}`}>
                        <button className="px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700">
                          View
                        </button>
                      </Link>
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
        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <UserPlus className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No students found</p>
            <p className="text-gray-400 mt-1">Try changing your search term</p>
          </div>
        )}
      </div>

      {/* Export Section */}
      <div className="mt-8 bg-white rounded-xl shadow p-6">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-semibold">Student Reports</h3>
            <p className="text-gray-600 mt-1">Generate and export student reports</p>
          </div>
          <div className="flex space-x-3">
            <button className="border border-gray-300 rounded-lg px-4 py-2.5 hover:bg-gray-50 flex items-center">
              <Download className="w-5 h-5 mr-2" />
              Export Student List
            </button>
            <button className="bg-blue-600 text-white rounded-lg px-4 py-2.5 hover:bg-blue-700 flex items-center">
              <Download className="w-5 h-5 mr-2" />
              Generate Certificate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}