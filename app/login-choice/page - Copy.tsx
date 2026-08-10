"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, Sparkles, ExternalLink } from "lucide-react";

export default function LoginChoicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl w-full"
      >
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-medium mb-4"
          >
            🎓 Rishab Informatica Group
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Welcome Back, <span className="text-blue-600">Learner!</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Choose your learning portal to continue your journey
          </p>
        </div>

        {/* Two Options */}
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Option 1: Classplus (Existing) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-100"
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center text-2xl">
                  📱
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Classplus Portal</h2>
                  <p className="text-sm text-gray-500">Existing Students</p>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">
                Continue using your existing Classplus account. Access your purchased courses, live classes, and learning materials.
              </p>
              
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full">✓ Active</span>
                <span>• 24/7 Access</span>
                <span>• Mobile App</span>
              </div>
              
              <Link
                href="https://login.rishabinformaticagroup.com/login"
                target="_blank"
                className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200"
              >
                <span>Continue with Classplus</span>
                <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
            <div className="bg-orange-50 px-6 py-2 text-xs text-orange-600">
              🔒 Secure login via Classplus
            </div>
          </motion.div>

          {/* Option 2: New LMS */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border-2 border-blue-200 relative"
          >
            {/* New Badge */}
            <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              ✨ NEW
            </div>
            
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-2xl">
                  🚀
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">New LMS Portal</h2>
                  <p className="text-sm text-gray-500">Enhanced Learning Experience</p>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm mb-4">
                Experience our new learning platform with improved features, faster video streaming, and a modern interface.
              </p>
              
              <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-4">
                <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">⚡ Faster</span>
                <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">🎬 Better Video</span>
                <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full">📊 Track Progress</span>
              </div>
              
              <Link
                href="https://lms.rishabinformaticagroup.com/login"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-200"
              >
                <span>Continue with New LMS</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="bg-blue-50 px-6 py-2 text-xs text-blue-600 flex items-center gap-2">
              <Sparkles className="w-3 h-3" />
              No migration needed. Start fresh or continue with Classplus!
            </div>
          </motion.div>
        </div>

        {/* Footer Info */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>
            Having trouble?{' '}
            <a href="https://wa.me/918970853557" className="text-blue-600 hover:underline">
              Contact Support
            </a>
            {' '}• Both portals are active and secure
          </p>
        </div>
      </motion.div>
    </div>
  );
}