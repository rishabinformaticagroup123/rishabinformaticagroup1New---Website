"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// ✅ REPLACE WITH YOUR EXACT 13 GOOGLE REVIEWS
const testimonials = [
  {
    id: 1,
    content: "My name is Nitish Chandra Sharma, last year in Dec I planned to get into Data Engineer field, I consulted my friend who is a ETL developer, I searched for courses but the course provided by Rishabh Informatica is the best. The answer why, other institutions are taking different batches for Powercenter and IICS which is expensive and time taking unlike here where there is a combo batch at a affordable price with payment ease aswell. Hari Sir is putting efforts day and night to help everyone succeed, if you are interested this is the platform for you.",
    name: "Nitish Sharma",
    role: "Data Engineer",
    rating: 5,
  },
  {
    id: 2,
    content: "Focus on learning different Tools together rather than learning Separate Tools at a time really Helped me to understand the concept and process. Training given on Informatica Power center + IICS including CAI CDI not only saved money and time but it also given me handful experience on industrial Tools and Real Time scenarios. Really Thankful",
    name: "Vijay Kumar",
    role: "ETL Developer",
    rating: 5,
  },
  {
    id: 3,
    content: "I highly recommend the IICS COMBO course for anyone looking to build a strong foundation in data integration and cloud technologies. The course provides comprehensive coverage of SQL, Informatica PowerCenter, Informatica IICS, and essential Snowflake concepts, making it a well-rounded learning experience for both beginners and professionals.",
    name: "Ravi Teja",
    role: "Data Engineer",
    rating: 5,
  },
  {
    id: 4,
    content: "Rishab Informatica Group helped to crack my interview in 40 sessions I never imagine before join IICS Combo training. Hari sir helped with mock interviews which really boosted my confidence to crack my interviews. Thanks for their efforts to help everyone.",
    name: "Arroju Srikanth",
    role: "Interview Success",
    rating: 5,
  },
  {
    id: 5,
    content: "I joined Rishab Informatica Group in Informatica IICS Combo Batch-11 for Informatica PowerCenter and IICS, and the overall training was excellent. The trainer explains concepts clearly with real-time, industry-level examples, which helped me build strong ETL development and cloud data integration skills.",
    name: "Krishna",
    role: "Job in 40 Days",
    rating: 5,
  },
  // Add 5 more of your best reviews here
  // Remove the dummy "Ananya Singh" testimonial
]

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      nextSlide()
    }, 7000) // Increased to 7 seconds for reading

    return () => clearInterval(interval)
  }, [autoplay, currentIndex])

  return (
    <div className="relative mx-auto max-w-5xl">
      
      {/* Link to Full Testimonials Page */}
      <div className="mb-8 text-center">
        <Link 
          href="/testimonials" 
          className="inline-flex items-center px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          📚 Read All Verified Google Reviews
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
      
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="min-w-full px-4">
              <Card className="border-2 border-blue-100 bg-gradient-to-br from-white to-blue-50 shadow-lg">
                <CardContent className="p-8">
                  
                  {/* Rating Stars */}
                  <div className="flex justify-center mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  
                  {/* Quote Icon */}
                  <Quote className="mx-auto h-10 w-10 text-blue-200" />
                  
                  {/* Testimonial Content */}
                  <p className="mt-4 text-lg text-gray-700 italic leading-relaxed text-center">
                    "{testimonial.content.length > 250 
                      ? `${testimonial.content.substring(0, 250)}...` 
                      : testimonial.content}"
                  </p>
                  
                  {/* Student Info */}
                  <div className="mt-8 flex flex-col items-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full flex items-center justify-center mb-4">
                      <span className="text-2xl font-bold text-blue-700">
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-gray-900 text-lg">{testimonial.name}</div>
                      <div className="text-gray-600 mt-1">{testimonial.role}</div>
                      <div className="mt-2">
                        <span className="inline-block px-3 py-1 bg-green-50 text-green-700 text-sm rounded-full">
                          ⭐ Verified Review
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
      
      {/* Dots Indicator */}
      <div className="mt-8 flex justify-center space-x-3">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`h-3 w-3 rounded-full transition-all ${
              index === currentIndex 
                ? "bg-blue-600 w-6" 
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            onClick={() => {
              setCurrentIndex(index)
              setAutoplay(false)
            }}
            aria-label={`Go to review ${index + 1}`}
          />
        ))}
      </div>
      
      {/* Navigation Buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-white/90 backdrop-blur-sm border-blue-200 shadow-lg hover:bg-white"
        onClick={() => {
          prevSlide()
          setAutoplay(false)
        }}
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="h-5 w-5 text-blue-600" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-white/90 backdrop-blur-sm border-blue-200 shadow-lg hover:bg-white"
        onClick={() => {
          nextSlide()
          setAutoplay(false)
        }}
        aria-label="Next testimonial"
      >
        <ChevronRight className="h-5 w-5 text-blue-600" />
      </Button>
      
      {/* Auto-play Toggle */}
      <div className="mt-6 text-center">
        <button
          onClick={() => setAutoplay(!autoplay)}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          {autoplay ? '⏸️ Pause slides' : '▶️ Play slides'}
        </button>
      </div>
    </div>
  )
}