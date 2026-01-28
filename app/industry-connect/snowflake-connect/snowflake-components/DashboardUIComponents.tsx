"use client";

import Link from 'next/link';
import { 
  Database, BarChart3, Users, BookOpen, 
  Settings, Wrench, FileText, Download, 
  Upload, History, Play, Save, TestTube,
  CheckCircle, AlertCircle, RefreshCw,
  ExternalLink, ChevronRight, Zap,
  TrendingUp, UserCheck, DollarSign,
  Shield, Cpu, Layers, Clock, Share2,
  Copy, Globe, Lock, Cloud, Target,
  Building2, ShoppingCart, Hospital,
  Sparkles, Rocket, Star, Award,
  Key, LogOut, User, Eye, EyeOff,
  HelpCircle, Loader2, PlusCircle
} from 'lucide-react';

// ==== UI COMPONENTS ====
export function FeatureCard({ 
  title, description, icon: Icon, href, color, action 
}: { 
  title: string; description: string; icon: any; href: string; color: string; action: string 
}) {
  return (
    <Link href={href}>
      <div className="group bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl ${color}`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-blue-600">{action}</span>
          <span className="text-xs text-gray-500 group-hover:text-blue-600 transition-colors">
            Click to open →
          </span>
        </div>
      </div>
    </Link>
  );
}

export function ScenarioCard({ scenario }: { scenario: any }) {
  const Icon = scenario.icon;
  return (
    <div className={`group bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer ${
      scenario.status === 'locked' ? 'opacity-75' : ''
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className={`bg-gradient-to-r ${scenario.color} p-3 rounded-xl`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-gray-300">{scenario.number}</span>
        </div>
        {scenario.status === 'locked' ? (
          <Lock className="w-5 h-5 text-gray-400" />
        ) : (
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
        )}
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{scenario.title}</h3>
      <p className="text-gray-600 text-sm mb-4">{scenario.description}</p>
      <div className="flex items-center justify-between">
        <span className={`text-sm font-medium ${
          scenario.status === 'locked' ? 'text-gray-500' : 'text-blue-600'
        }`}>
          {scenario.status === 'locked' ? 'Coming Soon' : 'Start Lab'}
        </span>
        {scenario.status === 'unlocked' && (
          <span className="text-xs text-gray-500 group-hover:text-blue-600 transition-colors">
            Interactive Lab →
          </span>
        )}
      </div>
    </div>
  );
}

export function IndustryCard({ project }: { project: any }) {
  const Icon = project.icon;
  return (
    <Link href={project.featured ? '/custom-project-builder' : `/industry/${project.title.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}>
      <div className={`group bg-white rounded-2xl shadow-lg border-2 ${project.borderColor} p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer relative overflow-hidden`}>
        {project.featured && (
          <div className="absolute top-4 right-4">
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              PREMIUM
            </div>
          </div>
        )}
        
        {/* Image Placeholder with Industry Icon */}
        <div className={`${project.color} rounded-xl h-40 mb-4 flex items-center justify-center relative overflow-hidden`}>
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
          <Icon className="w-16 h-16 text-white/90" />
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-black/10 to-transparent"></div>
        </div>
        
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            {!project.featured ? (
              <Icon className="w-5 h-5 text-gray-600" />
            ) : (
              <Rocket className="w-5 h-5 text-pink-600" />
            )}
            <h3 className="text-lg font-bold text-gray-900">{project.title}</h3>
          </div>
          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
        </div>
        <p className="text-gray-600 text-sm mb-4">{project.description}</p>
        <div className="flex items-center justify-between">
          <span className={`text-sm font-medium ${
            project.featured ? 'text-pink-600' : 'text-blue-600'
          }`}>
            {project.featured ? 'Start Building →' : 'View Project'}
          </span>
          {project.featured && (
            <Sparkles className="w-4 h-4 text-yellow-500" />
          )}
        </div>
      </div>
    </Link>
  );
}

export function TabButton({ id, label, icon: Icon, isActive, onClick }: { 
  id: string, label: string, icon: any, isActive: boolean, onClick: () => void 
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-6 py-4 rounded-xl transition-all duration-300 ${
        isActive 
          ? 'bg-white shadow-lg border border-gray-200 text-blue-600' 
          : 'text-gray-600 hover:bg-gray-50'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{label}</span>
      {isActive && (
        <div className="ml-2 w-2 h-2 bg-blue-500 rounded-full"></div>
      )}
    </button>
  );
}