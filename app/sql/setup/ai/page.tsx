'use client'
import { ChevronRight, Sparkles } from 'lucide-react'
import Link from 'next/link'

export default function AIAssistant() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="px-2 py-1 border-b border-gray-300 flex justify-between items-center bg-[#2c3e50]">
        <div className="flex items-center gap-1">
          <Sparkles className="text-yellow-400" size={16} />
          <h3 className="font-semibold text-white text-sm">Rishab's SQL Assistant</h3>
        </div>
        <Link href="/sql/setup" className="p-1 rounded hover:bg-gray-600 text-white">
          <ChevronRight size={16} />
        </Link>
      </div>

      <div className="px-2 py-1 border-b border-gray-300 bg-blue-50 overflow-x-auto whitespace-nowrap">
        <div className="inline-flex gap-1">
          {["GROUP BY", "Debug", "JOINs", "Oracle vs PG", "Temp Tables"].map((prompt) => (
            <button
              key={prompt}
              className="text-xs px-2 py-1 bg-white text-blue-700 rounded-full hover:bg-blue-100 border border-blue-200 mx-1"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      <iframe
        src="https://www.chatbase.co/chatbot-iframe/TVtP0qH0gU4mn3sBMHMnL"
        className="flex-1 border-none"
        title="SQL AI Assistant"
      />
    </div>
  )
}