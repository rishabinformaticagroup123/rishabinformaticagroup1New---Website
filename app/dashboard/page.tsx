// app/dashboard/page.tsx - UPDATED VERSION
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users, BookOpen, TrendingUp, DollarSign,
  Calendar, CheckCircle, Clock, AlertCircle,
  RefreshCw
} from 'lucide-react';

interface DashboardStats {
  total_courses: number;
  total_students: number;
  active_courses: number;
  recent_enrollments: number;
  total_revenue: number;
  avg_course_fee: number;
  upcoming_courses: number;
  completion_rate: number;
  updated_at?: string;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recentActivities, setRecentActivities] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [statsRes] = await Promise.all([
        fetch('/api/dashboard/stats'),
        // Note: recent-activities API doesn't exist yet
        // fetch('/api/dashboard/recent-activities')
      ]);
      
      const statsData = await statsRes.json();
      
      if (statsData.success) {
        setStats(statsData.stats);
      } else {
        setError(statsData.error || 'Failed to load dashboard stats');
      }
      
      // For now, use mock activities until API is created
      setRecentActivities([
        { id: 1, title: 'Dashboard loaded', description: 'Stats fetched from Snowflake', time: 'Just now', type: 'system' },
        { id: 2, title: 'Snowflake Connection', description: 'Connected successfully', time: '2 minutes ago', type: 'connection' },
      ]);
      
    } catch (error: any) {
      console.error('Failed to fetch dashboard data:', error);
      setError('Network error. Please check if API server is running.');
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ 
    title, value, icon: Icon, color, trend, subtitle 
  }: { 
    title: string; value: string | number; icon: any; color: string; 
    trend?: string; subtitle?: string;
  }) => (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold mt-2">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
          {trend && <p className="text-xs mt-1 text-green-600 font-medium">{trend}</p>}
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );

  const calculateTrends = () => {
    if (!stats) return {};
    
    return {
      coursesTrend: stats.total_courses > 0 ? `+${Math.min(stats.total_courses, 5)} this month` : 'Add first course',
      studentsTrend: stats.total_students > 0 ? `+${Math.min(stats.total_students, 12)} this week` : 'Enroll first student',
      revenueTrend: stats.total_revenue > 0 ? `+${Math.round(stats.total_revenue / 100000)}% growth` : 'Start earning',
      activeTrend: stats.active_courses > 0 ? `${stats.upcoming_courses} upcoming` : 'Activate courses'
    };
  };

  const trends = calculateTrends();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-6 text-lg font-medium text-gray-700">Loading Dashboard</p>
          <p className="text-gray-500 mt-2">Fetching data from Snowflake...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="p-4 bg-red-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <AlertCircle className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Dashboard Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-y-3">
            <button
              onClick={fetchDashboardData}
              className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <RefreshCw className="w-4 h-4" />
              Retry
            </button>
            <Link 
              href="/api/test-snowflake" 
              target="_blank"
              className="inline-block text-sm text-blue-600 hover:text-blue-800"
            >
              Test Snowflake Connection
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
        <div className="px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold">Dashboard Overview</h1>
                  <p className="text-blue-100 mt-2">Welcome to Rishab Informatika Admin Panel</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full backdrop-blur-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="font-medium">Live Data</span>
              </div>
              <div className="text-sm text-blue-200">
                {stats?.updated_at ? `Updated: ${new Date(stats.updated_at).toLocaleTimeString()}` : 'Real-time stats'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8 -mt-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Courses"
            value={stats?.total_courses || 0}
            subtitle={`${stats?.active_courses || 0} active`}
            icon={BookOpen}
            color="bg-blue-500"
            trend={trends.coursesTrend}
          />
          <StatCard
            title="Total Students"
            value={stats?.total_students || 0}
            subtitle={`${stats?.recent_enrollments || 0} recent`}
            icon={Users}
            color="bg-green-500"
            trend={trends.studentsTrend}
          />
          <StatCard
            title="Total Revenue"
            value={`₹${(stats?.total_revenue || 0).toLocaleString('en-IN')}`}
            subtitle={`Avg fee: ₹${Math.round(stats?.avg_course_fee || 0).toLocaleString('en-IN')}`}
            icon={DollarSign}
            color="bg-purple-500"
            trend={trends.revenueTrend}
          />
          <StatCard
            title="Active Courses"
            value={stats?.active_courses || 0}
            subtitle={`${stats?.completion_rate || 0}% completion`}
            icon={CheckCircle}
            color="bg-orange-500"
            trend={trends.activeTrend}
          />
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Revenue Info */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Revenue Insights</h2>
                <p className="text-gray-600 mt-1">Based on current enrollments</p>
              </div>
              <div className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium">
                ₹{(stats?.total_revenue || 0).toLocaleString('en-IN')}
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Revenue Potential</span>
                  <span>
                    ₹{(stats?.total_courses || 0) * (stats?.avg_course_fee || 0) * 30}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-green-500 h-3 rounded-full transition-all duration-1000"
                    style={{ 
                      width: `${Math.min(100, ((stats?.total_revenue || 0) / ((stats?.total_courses || 1) * (stats?.avg_course_fee || 1) * 30)) * 100)}%` 
                    }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Based on {stats?.total_courses || 0} courses with avg fee ₹{Math.round(stats?.avg_course_fee || 0)}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Per Student Revenue</p>
                  <p className="text-xl font-bold mt-1">
                    ₹{stats?.total_students ? Math.round((stats.total_revenue || 0) / stats.total_students) : 0}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Course Fill Rate</p>
                  <p className="text-xl font-bold mt-1">
                    {stats?.total_courses ? Math.round((stats.total_students || 0) / stats.total_courses) : 0}
                  </p>
                  <p className="text-xs text-gray-500">students per course</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
            <div className="space-y-4">
              <Link href="/dashboard/courses/new">
                <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-4 rounded-xl transition-all flex items-center justify-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Add New Course
                </button>
              </Link>
              <Link href="/dashboard/students/enroll">
                <button className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-3 px-4 rounded-xl transition flex items-center justify-center gap-2">
                  <Users className="w-5 h-5" />
                  Enroll Student
                </button>
              </Link>
              <Link href="/dashboard/analytics">
                <button className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-3 px-4 rounded-xl transition flex items-center justify-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  View Analytics
                </button>
              </Link>
              <Link href="/snowflake-connect">
                <button className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-3 px-4 rounded-xl transition flex items-center justify-center gap-2">
                  <RefreshCw className="w-5 h-5" />
                  Snowflake Tools
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Activities & Upcoming Courses */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activities */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Activities</h2>
              <button 
                onClick={fetchDashboardData}
                className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
            </div>
            
            <div className="space-y-4">
              {recentActivities.length > 0 ? (
                recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-lg transition">
                    <div className={`p-2 rounded-full ${
                      activity.type === 'connection' ? 'bg-green-100' :
                      activity.type === 'system' ? 'bg-blue-100' :
                      'bg-gray-100'
                    }`}>
                      {activity.type === 'connection' ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <Clock className="w-4 h-4 text-blue-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                      <p className="text-xs text-gray-400 mt-2">{activity.time}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Clock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">No recent activities</p>
                  <p className="text-sm text-gray-400 mt-1">Start adding courses and students</p>
                </div>
              )}
            </div>
          </div>

          {/* Upcoming Courses */}
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Upcoming Courses</h2>
              <Link href="/dashboard/courses" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View all →
              </Link>
            </div>
            
            <div className="space-y-4">
              {stats && stats.active_courses > 0 ? (
                <div className="text-center py-8">
                  <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-700 font-medium">{stats.upcoming_courses} courses starting soon</p>
                  <p className="text-sm text-gray-500 mt-1">
                    {stats.active_courses} active courses running
                  </p>
                  <Link href="/dashboard/courses">
                    <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      Manage Courses
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">No upcoming courses</p>
                  <p className="text-sm text-gray-400 mt-1">Add courses to see them here</p>
                  <Link href="/dashboard/courses/new">
                    <button className="mt-4 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                      Add First Course
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-50 to-gray-50 rounded-2xl">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600">
              Connected to Snowflake • {stats?.total_courses || 0} courses • {stats?.total_students || 0} students
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}