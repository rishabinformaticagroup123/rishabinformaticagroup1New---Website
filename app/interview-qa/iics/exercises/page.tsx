'use client'

import { useState } from 'react'
import { Download } from 'lucide-react'

export default function ExercisesPage() {
  const exercises = [
    {
      id: 'expression-transformation',
      title: 'Expression Transformation Exercises',
      description: 'Practice various expression transformation scenarios in PowerCenter and IICS',
      difficulty: 'Intermediate',
      category: 'Transformations',
      content: [
        {
          title: 'Exercise 1: Phone Number Formatting',
          problem: 'Convert phone numbers from source format (e.g., 944.800.5273) to target format (+91-94480-05273)',
          solution: `IIF(length(PHONE_NUMBER)=12,
            '+91-'||substr(REPLACECHR(0,PHONE_NUMBER,'.',''),1,5)||'-'||
            substr(REPLACECHR(0,PHONE_NUMBER,'.',''),6,5),
            '+91-'||substr(REPLACECHR(0,PHONE_NUMBER,'.',''),1,5)||'-'||
            substr(REPLACECHR(0,PHONE_NUMBER,'.',''),6,5)||'-'||
            substr(REPLACECHR(0,PHONE_NUMBER,'.',''),11,5))`
        },
        {
          title: 'Exercise 2: Epoch Time Conversion',
          problem: 'Convert UNIX epoch timestamp to human-readable date format',
          solution: `ADD_TO_DATE(TO_DATE('01-JAN-1970','dd-mon-yyyy'),'DD',(DOB/60/60/24))`
        },
        {
          title: 'Exercise 3: Reverse Order Loading',
          problem: 'Load input data in reverse order using sequence generation',
          solution: 'Use a variable port to generate reverse sequence numbers'
        },
        {
          title: 'Exercise 4: Conditional Salary Increment',
          problem: 'Apply 10% salary increment for first 10 employees',
          solution: `IIF(V_EMP_KEY<=10,SALARY+(SALARY*0.1),SALARY)`
        },
        {
          title: 'Exercise 5: String Aggregation',
          problem: 'Concatenate names with same IDs (e.g., ID 1 → "Sam,Joe")',
          solution: 'Use variable ports with string concatenation logic'
        }
      ],
      downloadLink: '/exercises/EXPRESSION_TRANSFORM_EXERCISES_1.docx'
    },
    {
      id: 'aggregator',
      title: 'Aggregator Transformation Exercises',
      description: 'Practice aggregation functions and group by operations',
      difficulty: 'Beginner',
      category: 'Transformations',
      downloadLink: '/exercises/AGGREGATOR_EXERCISES.docx'
    },
    {
      id: 'lookup',
      title: 'Lookup Transformation Exercises',
      description: 'Practice connected and unconnected lookups',
      difficulty: 'Intermediate',
      category: 'Transformations',
      downloadLink: '/exercises/LOOKUP_EXERCISES.docx'
    }
  ]

  const [activeExercise, setActiveExercise] = useState<string | null>(null)

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
        Informatica Transformation Exercises
      </h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Practice real-world scenarios with these exercises
        </h2>
        <p className="text-gray-600">
          Download exercise files and practice in both PowerCenter and IICS environments.
          Solutions provided for each exercise.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {exercises.map((exercise) => (
          <div 
            key={exercise.id}
            className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div 
              className="p-4 bg-indigo-50 border-b cursor-pointer"
              onClick={() => setActiveExercise(activeExercise === exercise.id ? null : exercise.id)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-indigo-800">
                  {exercise.title}
                </h3>
                <span className={`transform transition-transform ${activeExercise === exercise.id ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </div>
              <div className="flex items-center mt-2">
                <span className="px-2 py-1 text-xs bg-indigo-100 text-indigo-800 rounded mr-2">
                  {exercise.category}
                </span>
                <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">
                  {exercise.difficulty}
                </span>
              </div>
            </div>

            {activeExercise === exercise.id && (
              <div className="p-4 bg-white">
                <p className="text-gray-700 mb-4">{exercise.description}</p>
                
                {exercise.content && (
                  <div className="space-y-4">
                    {exercise.content.map((item, index) => (
                      <div key={index} className="border-l-4 border-indigo-200 pl-4">
                        <h4 className="font-medium text-gray-800">{item.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{item.problem}</p>
                        {item.solution && (
                          <div className="bg-gray-50 p-3 rounded text-sm font-mono overflow-x-auto">
                            <pre>{item.solution}</pre>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <a
                  href={exercise.downloadLink}
                  download
                  className="mt-4 inline-flex items-center px-3 py-2 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700 transition-colors"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Exercise File
                </a>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-800 mb-3">How to Practice</h3>
        <ol className="list-decimal pl-5 space-y-2 text-blue-700">
          <li>Download the exercise file</li>
          <li>Set up the required tables in your database</li>
          <li>Create mappings in both PowerCenter and IICS</li>
          <li>Compare your solution with the provided examples</li>
          <li>Try variations of each exercise for better understanding</li>
        </ol>
      </div>
    </div>
  )
}