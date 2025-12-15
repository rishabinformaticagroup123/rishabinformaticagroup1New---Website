'use client';

import { Code, Play, Terminal, CheckCircle, AlertCircle, Clock, Award, Zap, Database, Layers, Cpu, FileText, ChevronRight, Copy, ExternalLink, Star, TrendingUp, Users, Target } from 'lucide-react';
import { useState } from 'react';

export default function AzureDataEngineeringExercises() {
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [completedExercises, setCompletedExercises] = useState<string[]>(['ex1', 'ex3']);
  
  const exercises = {
    beginner: [
      {
        id: 'ex1',
        title: 'Create Your First ADF Pipeline',
        description: 'Build a simple pipeline to copy data from Azure Blob to Azure SQL',
        time: '15-20 mins',
        difficulty: 'Beginner',
        points: 50,
        topics: ['ADF', 'Copy Activity', 'Linked Services'],
        resources: ['Azure Free Account', 'Sample Data Provided'],
        steps: [
          'Create Resource Group',
          'Create ADF instance',
          'Create Blob Storage linked service',
          'Create Azure SQL linked service',
          'Create Copy activity pipeline',
          'Test and monitor pipeline'
        ]
      },
      {
        id: 'ex2',
        title: 'ADF Parameterized Pipeline',
        description: 'Create a reusable pipeline with parameters for different environments',
        time: '20-25 mins',
        difficulty: 'Beginner',
        points: 75,
        topics: ['Parameters', 'Reusability', 'Configuration'],
        resources: ['ADF Documentation'],
        steps: [
          'Define pipeline parameters',
          'Parameterize linked services',
          'Use parameters in activities',
          'Test with different values',
          'Create template for reuse'
        ]
      },
      {
        id: 'ex3',
        title: 'Simple Data Transformation with Mapping Data Flow',
        description: 'Use Mapping Data Flow for basic data cleaning and transformation',
        time: '25-30 mins',
        difficulty: 'Beginner',
        points: 100,
        topics: ['Mapping Data Flow', 'Data Transformation', 'ETL'],
        resources: ['Sample CSV Data'],
        steps: [
          'Create source dataset',
          'Add derived columns',
          'Filter data rows',
          'Aggregate data',
          'Create sink dataset',
          'Execute data flow'
        ]
      }
    ],
    intermediate: [
      {
        id: 'ex4',
        title: 'Incremental Data Load Pattern',
        description: 'Implement incremental load using watermark columns',
        time: '30-40 mins',
        difficulty: 'Intermediate',
        points: 150,
        topics: ['Incremental Load', 'Watermark', 'Control Table'],
        resources: ['SQL Database', 'Time-series Data'],
        steps: [
          'Create control table for watermark',
          'Use Lookup activity to get last watermark',
          'Filter source data based on watermark',
          'Copy incremental data',
          'Update watermark after success',
          'Handle failures and retries'
        ]
      },
      {
        id: 'ex5',
        title: 'ADF Pipeline with Error Handling',
        description: 'Implement comprehensive error handling and logging',
        time: '35-45 mins',
        difficulty: 'Intermediate',
        points: 175,
        topics: ['Error Handling', 'Logging', 'Monitoring'],
        resources: ['Azure Monitor', 'Log Analytics'],
        steps: [
          'Add retry policies',
          'Implement failure paths',
          'Log errors to Azure Storage',
          'Send email alerts on failure',
          'Create monitoring dashboard',
          'Test error scenarios'
        ]
      },
      {
        id: 'ex6',
        title: 'Azure Databricks Notebook Basics',
        description: 'Create and run your first Databricks notebook',
        time: '30-35 mins',
        difficulty: 'Intermediate',
        points: 125,
        topics: ['Databricks', 'Notebooks', 'PySpark'],
        resources: ['Azure Databricks Workspace'],
        steps: [
          'Create Databricks workspace',
          'Launch cluster',
          'Create notebook',
          'Write PySpark code',
          'Read data from storage',
          'Perform basic transformations'
        ]
      }
    ],
    advanced: [
      {
        id: 'ex7',
        title: 'End-to-End ETL Pipeline with ADF + ADB',
        description: 'Build complete ETL pipeline combining ADF and Databricks',
        time: '60-75 mins',
        difficulty: 'Advanced',
        points: 300,
        topics: ['Orchestration', 'Spark', 'Delta Lake'],
        resources: ['Multiple Data Sources', 'Complex Transformations'],
        steps: [
          'ADF for data ingestion',
          'Pass data to Databricks',
          'Complex transformations in PySpark',
          'Write to Delta Lake',
          'ADF for orchestration',
          'Monitoring and optimization'
        ]
      },
      {
        id: 'ex8',
        title: 'Real-time Data Processing with Spark Streaming',
        description: 'Implement streaming pipeline using Databricks and Event Hubs',
        time: '50-60 mins',
        difficulty: 'Advanced',
        points: 250,
        topics: ['Streaming', 'Event Hubs', 'Structured Streaming'],
        resources: ['Azure Event Hubs', 'Streaming Data'],
        steps: [
          'Set up Event Hubs',
          'Create streaming notebook',
          'Process real-time data',
          'Write to Delta Lake',
          'Implement checkpointing',
          'Monitor streaming jobs'
        ]
      },
      {
        id: 'ex9',
        title: 'Optimization and Performance Tuning',
        description: 'Optimize ADF pipelines and Databricks clusters for performance',
        time: '45-55 mins',
        difficulty: 'Advanced',
        points: 225,
        topics: ['Performance', 'Optimization', 'Cost Management'],
        resources: ['Existing Pipeline', 'Monitoring Data'],
        steps: [
          'Analyze pipeline performance',
          'Optimize copy activities',
          'Tune Databricks clusters',
          'Implement caching strategies',
          'Reduce data movement',
          'Monitor cost savings'
        ]
      }
    ]
  };

  const allExercises = [...exercises.beginner, ...exercises.intermediate, ...exercises.advanced];

  const toggleExerciseCompletion = (exerciseId: string) => {
    if (completedExercises.includes(exerciseId)) {
      setCompletedExercises(completedExercises.filter(id => id !== exerciseId));
    } else {
      setCompletedExercises([...completedExercises, exerciseId]);
    }
  };

  const getProgress = () => {
    const total = allExercises.length;
    const completed = completedExercises.length;
    return Math.round((completed / total) * 100);
  };

  const filteredExercises = selectedDifficulty === 'all' 
    ? allExercises 
    : allExercises.filter(ex => ex.difficulty.toLowerCase() === selectedDifficulty);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm font-medium mb-4">
          <Terminal size={16} />
          Hands-on Exercises
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          ADF + ADB Practical Exercises
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Master Azure Data Engineering through hands-on exercises, from beginner to advanced levels
        </p>
        
        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto mt-8">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Progress: {completedExercises.length}/{allExercises.length} exercises
              </span>
            </div>
            <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
              {getProgress()}%
            </span>
          </div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-500"
              style={{ width: `${getProgress()}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={<Users className="text-blue-500" />}
          value={allExercises.length}
          label="Total Exercises"
          color="blue"
        />
        <StatCard
          icon={<CheckCircle className="text-green-500" />}
          value={completedExercises.length}
          label="Completed"
          color="green"
        />
        <StatCard
          icon={<Clock className="text-orange-500" />}
          value="8-10 hrs"
          label="Total Time Required"
          color="orange"
        />
        <StatCard
          icon={<Award className="text-purple-500" />}
          value="1000+"
          label="Points Available"
          color="purple"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Sidebar - Filters & Info */}
        <div className="lg:w-1/4 space-y-6">
          {/* Difficulty Filter */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5">
            <h3 className="font-semibold text-gray-800 dark:text-white mb-4 flex items-center gap-2">
              <Target size={20} className="text-blue-500" />
              Filter by Difficulty
            </h3>
            <div className="space-y-2">
              {['all', 'beginner', 'intermediate', 'advanced'].map((level) => (
                <button
                  key={level}
                  onClick={() => setSelectedDifficulty(level)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all ${
                    selectedDifficulty === level
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      level === 'beginner' ? 'bg-green-500' :
                      level === 'intermediate' ? 'bg-yellow-500' :
                      level === 'advanced' ? 'bg-red-500' :
                      'bg-blue-500'
                    }`}></div>
                    <span className="capitalize font-medium">{level === 'all' ? 'All Levels' : level}</span>
                  </div>
                  <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded">
                    {level === 'all' ? allExercises.length :
                     level === 'beginner' ? exercises.beginner.length :
                     level === 'intermediate' ? exercises.intermediate.length :
                     exercises.advanced.length}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Prerequisites */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-5">
            <h3 className="font-semibold text-blue-700 dark:text-blue-300 mb-3 flex items-center gap-2">
              <AlertCircle size={20} />
              Prerequisites
            </h3>
            <ul className="space-y-2">
              {[
                'Azure Free Account',
                'Basic SQL Knowledge',
                'Python Fundamentals',
                'Understanding of ETL Concepts'
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <CheckCircle size={16} className="text-green-500 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-5">
            <h3 className="font-semibold text-green-700 dark:text-green-300 mb-3 flex items-center gap-2">
              <Zap size={20} />
              Pro Tips
            </h3>
            <div className="space-y-3">
              <TipCard
                icon={<Code size={16} />}
                text="Start with beginner exercises even if you have experience"
              />
              <TipCard
                icon={<Database size={16} />}
                text="Use Azure free tier services to avoid costs"
              />
              <TipCard
                icon={<FileText size={16} />}
                text="Document your solutions for future reference"
              />
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5">
            <h3 className="font-semibold text-gray-800 dark:text-white mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center justify-between px-3 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
                <span>Reset All Progress</span>
                <Play size={16} />
              </button>
              <button className="w-full flex items-center justify-between px-3 py-2.5 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors">
                <span>Share Progress</span>
                <ExternalLink size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content - Exercises */}
        <div className="lg:w-3/4">
          {/* Exercises List */}
          <div className="space-y-6">
            {filteredExercises.map((exercise) => (
              <ExerciseCard
                key={exercise.id}
                exercise={exercise}
                isCompleted={completedExercises.includes(exercise.id)}
                onToggleComplete={() => toggleExerciseCompletion(exercise.id)}
              />
            ))}
          </div>

          {/* Learning Path */}
          <div className="mt-12 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
              <TrendingUp className="text-purple-500" />
              Recommended Learning Path
            </h3>
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-purple-200 dark:bg-purple-800"></div>
              <div className="space-y-8">
                {[
                  { stage: 'Foundation', exercises: exercises.beginner, color: 'green' },
                  { stage: 'Building Skills', exercises: exercises.intermediate, color: 'yellow' },
                  { stage: 'Mastery', exercises: exercises.advanced, color: 'red' }
                ].map((stage, idx) => (
                  <div key={idx} className="relative flex items-start gap-6">
                    <div className="relative z-10 flex-shrink-0">
                      <div className={`w-12 h-12 rounded-full bg-white dark:bg-gray-800 border-4 border-${stage.color}-500 flex items-center justify-center`}>
                        <div className={`text-${stage.color}-600 dark:text-${stage.color}-400 font-bold`}>
                          {idx + 1}
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h4 className="text-lg font-semibold text-gray-800 dark:text-white">{stage.stage}</h4>
                        <span className={`px-2 py-1 text-xs font-medium bg-${stage.color}-100 dark:bg-${stage.color}-900 text-${stage.color}-800 dark:text-${stage.color}-300 rounded-full`}>
                          {stage.exercises.length} exercises
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {stage.exercises.map((ex) => (
                          <div key={ex.id} className={`bg-white dark:bg-gray-800 rounded-lg p-3 border ${
                            completedExercises.includes(ex.id)
                              ? 'border-green-200 dark:border-green-800'
                              : 'border-gray-200 dark:border-gray-700'
                          }`}>
                            <div className="flex items-start justify-between">
                              <div>
                                <h5 className="font-medium text-gray-800 dark:text-white">{ex.title}</h5>
                                <div className="flex items-center gap-2 mt-1">
                                  <Clock size={12} className="text-gray-400" />
                                  <span className="text-xs text-gray-500 dark:text-gray-400">{ex.time}</span>
                                  <span className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">
                                    {ex.points} pts
                                  </span>
                                </div>
                              </div>
                              {completedExercises.includes(ex.id) && (
                                <CheckCircle size={18} className="text-green-500 flex-shrink-0" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Code Challenge Section */}
          <div className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <Code size={24} />
                Weekly Code Challenge
              </h3>
              <p className="text-blue-100 mt-2">Test your skills with this week's special challenge</p>
            </div>
            
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-2/3">
                  <h4 className="font-bold text-gray-800 dark:text-white mb-3">Challenge: Real-time Sales Dashboard</h4>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    Build a real-time dashboard that processes streaming sales data from Event Hubs, transforms it in Databricks, and loads into Power BI via ADF.
                  </p>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-700 dark:text-gray-300">Difficulty:</span>
                      <span className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300 rounded-full text-sm font-medium">
                        Expert
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-700 dark:text-gray-300">Points:</span>
                      <span className="font-bold text-blue-600 dark:text-blue-400">500</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-gray-700 dark:text-gray-300">Time Limit:</span>
                      <span className="font-medium">3 hours</span>
                    </div>
                  </div>
                </div>
                
                <div className="md:w-1/3">
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg p-5 h-full">
                    <h5 className="font-semibold text-purple-700 dark:text-purple-300 mb-3">Requirements</h5>
                    <ul className="space-y-2">
                      {[
                        'Stream processing with Spark',
                        'Real-time aggregations',
                        'Power BI integration',
                        'Error handling',
                        'Performance optimization'
                      ].map((req, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                          <span className="text-gray-700 dark:text-gray-300">{req}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <button className="w-full mt-6 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-semibold transition-all transform hover:scale-105 duration-200">
                      Start Challenge
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Completion Rewards */}
          <div className="mt-12 text-center">
            <div className="inline-flex flex-col items-center p-8 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl max-w-2xl mx-auto">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center mb-4">
                <Award size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
                Complete All Exercises!
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md">
                Finish all {allExercises.length} exercises to unlock the Azure Data Engineering Expert badge and certificate
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-lg">
                <RewardCard
                  icon={<Star className="text-yellow-500" />}
                  title="Expert Badge"
                  description="Digital badge for profile"
                />
                <RewardCard
                  icon={<FileText className="text-blue-500" />}
                  title="Certificate"
                  description="Printable certificate"
                />
                <RewardCard
                  icon={<Users className="text-purple-500" />}
                  title="Community Access"
                  description="Private Discord channel"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Component: Stat Card
function StatCard({ icon, value, label, color }: { icon: React.ReactNode; value: string | number; label: string; color: string }) {
  const colorClasses = {
    blue: 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400',
    green: 'bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-400',
    orange: 'bg-orange-100 dark:bg-orange-900 text-orange-600 dark:text-orange-400',
    purple: 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-400'
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2 rounded-lg ${colorClasses[color as keyof typeof colorClasses]}`}>
          {icon}
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-800 dark:text-white">{value}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
        </div>
      </div>
    </div>
  );
}

// Component: Exercise Card
function ExerciseCard({ exercise, isCompleted, onToggleComplete }: { 
  exercise: any; 
  isCompleted: boolean; 
  onToggleComplete: () => void;
}) {
  const [showSteps, setShowSteps] = useState(false);
  
  const difficultyColor = {
    'Beginner': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    'Intermediate': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    'Advanced': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border-2 ${
      isCompleted ? 'border-green-200 dark:border-green-800' : 'border-transparent'
    }`}>
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${difficultyColor[exercise.difficulty as keyof typeof difficultyColor]}`}>
                {exercise.difficulty}
              </span>
              <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded">
                {exercise.time}
              </span>
              <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded">
                {exercise.points} points
              </span>
              {isCompleted && (
                <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 rounded flex items-center gap-1">
                  <CheckCircle size={12} />
                  Completed
                </span>
              )}
            </div>
            
            <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
              {exercise.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {exercise.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {exercise.topics.map((topic: string, idx: number) => (
                <span key={idx} className="px-3 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full">
                  {topic}
                </span>
              ))}
            </div>
            
            {/* Resources */}
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
              <span className="font-medium">Resources:</span>
              {exercise.resources.map((resource: string, idx: number) => (
                <span key={idx} className="px-2 py-1 bg-gray-50 dark:bg-gray-700/50 rounded">
                  {resource}
                </span>
              ))}
            </div>
            
            {/* Steps (Collapsible) */}
            {showSteps && (
              <div className="mt-4 pl-4 border-l-4 border-blue-500">
                <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-3">Steps to Complete:</h4>
                <ol className="space-y-2">
                  {exercise.steps.map((step: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-blue-600 dark:text-blue-300">{idx + 1}</span>
                      </div>
                      <span className="text-gray-600 dark:text-gray-400">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
          
          <div className="flex flex-col gap-3">
            <button
              onClick={onToggleComplete}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                isCompleted
                  ? 'bg-green-100 hover:bg-green-200 dark:bg-green-900 dark:hover:bg-green-800 text-green-700 dark:text-green-300'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isCompleted ? (
                <>
                  <CheckCircle size={18} />
                  Completed
                </>
              ) : (
                <>
                  <Play size={18} />
                  Mark Complete
                </>
              )}
            </button>
            
            <button
              onClick={() => setShowSteps(!showSteps)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              {showSteps ? 'Hide Steps' : 'Show Steps'}
              <ChevronRight size={18} className={`transition-transform ${showSteps ? 'rotate-90' : ''}`} />
            </button>
            
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
              <Copy size={18} />
              Copy Solution
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Component: Tip Card
function TipCard({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="p-1.5 bg-white dark:bg-gray-800 rounded-lg">
        {icon}
      </div>
      <p className="text-sm text-gray-700 dark:text-gray-300 flex-1">{text}</p>
    </div>
  );
}

// Component: Reward Card
function RewardCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 mb-3">
        {icon}
      </div>
      <h5 className="font-semibold text-gray-800 dark:text-white mb-1">{title}</h5>
      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
}