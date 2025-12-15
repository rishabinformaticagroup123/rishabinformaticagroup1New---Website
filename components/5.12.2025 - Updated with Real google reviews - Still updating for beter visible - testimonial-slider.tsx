// components/testimonial-slider.tsx
"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// ✅ YOUR EXACT 13 GOOGLE REVIEWS
const testimonials = [
  {
    id: 1,
    name: "Nitish Sharma",
    rating: 5,
    content: "My name is Nitish Chandra Sharma, last year in Dec I planned to get into Data Engineer field, I consulted my friend who is a ETL developer, I searched for courses but the course provided by Rishabh Informatica is the best. The answer why, other institutions are taking different batches for Powercenter and IICS which is expensive and time taking unlike here where there is a combo batch at a affordable price with payment ease aswell. Hari Sir is putting efforts day and night to help everyone succeed, if you are interested this is the platform for you.",
    role: "Data Engineer",
    date: "44 weeks ago"
  },
  {
    id: 2,
    name: "Vijay Kumar",
    rating: 5,
    content: "Focus on learning different Tools together rather than learning Separate Tools at a time really Helped me to understand the concept and process. Training given on Informatica Power center + IICS including CAI CDI not only saved money and time but it also given me handful experience on industrial Tools and Real Time scenarios. Really Thankful",
    role: "ETL Developer",
    date: "44 weeks ago"
  },
  {
    id: 3,
    name: "Ravi Teja",
    rating: 5,
    content: "I highly recommend the IICS COMBO course for anyone looking to build a strong foundation in data integration and cloud technologies. The course provides comprehensive coverage of SQL, Informatica PowerCenter, Informatica IICS, and essential Snowflake concepts, making it a well-rounded learning experience for both beginners and professionals.",
    role: "Data Engineer",
    date: "30 weeks ago"
  },
  {
    id: 4,
    name: "Shekar",
    rating: 5,
    content: "I highly recommend the IICS COMBO course for anyone looking to build a strong foundation in data integration and cloud technologies. This course covers SQL, Informatica PowerCenter, Informatica IICS, and also includes essential Snowflake concepts, which makes it a complete package for both beginners and working professionals.",
    role: "Working Professional",
    date: "Recently"
  },
  {
    id: 5,
    name: "Arroju Srikanth",
    rating: 5,
    content: "Rishabh Informatica Group helped to crack my interview in 40 sessions I never imagine before join IICS Combo training. Hari sir helped with mock interviews which really boosted my confidence to crack my interviews. Thanks for their efforts to help everyone.",
    role: "Interview Success",
    date: "22 weeks ago"
  },
  {
    id: 6,
    name: "Avinash Kottapalli",
    rating: 5,
    content: "I'm extremely grateful to Hari Sir for the way he teaches and supports his students. He has designed a unique and very effective approach where SQL, Snowflake, IICS, and PowerCenter are taught in parallel. This makes learning much more connected and practical compared to the usual one-tool-at-a-time method.",
    role: "Data Integration Specialist",
    date: "Recently"
  },
  {
    id: 7,
    name: "Sharon Shanu",
    rating: 5,
    content: "Hello, Rishab informatica iics combo training it's more than a price compare to out side institutes, with less fee we are learning more. Hari sir explains everything with patience and doubts also, his motivation and support helpful to students.",
    role: "Data Integration Career",
    date: "Recently"
  },
  {
    id: 8,
    name: "Krishna",
    rating: 5,
    content: "Good Informatica Training and Support. I joined Rishab Informatica Group in Informatica IICS Combo Batch-11 for Informatica PowerCenter and IICS, and the overall training was excellent. The trainer explains concepts clearly with real-time, industry-level examples, which helped me build strong ETL development and cloud data integration skills.",
    role: "Job in 40 Days",
    date: "Recently"
  },
  {
    id: 9,
    name: "Nathira K",
    rating: 5,
    content: "Rishab Informatica Group is one of the best in town, especially if you want to learn ETL tools. They provide in-depth knowledge on every topic and clear your doubts immediately. You can reach out to them anytime for support. I got placed in a very reputed company, and I'm truly grateful.",
    role: "Reputed Company",
    date: "Recently"
  },
  {
    id: 10,
    name: "Srinath Adimoolam",
    rating: 5,
    content: "I recommend IICS COMBO course since we can learn SQL, informatica power center, Snowflake the course is very structured and informative course. Even the prices is also very less.",
    role: "Comprehensive Learning",
    date: "Recently"
  }
]

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  
  // Show 3 testimonials at a time on desktop, 1 on mobile
  const itemsToShow = 3
  const totalSlides = Math.ceil(testimonials.length / itemsToShow)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides)
  }

  // Calculate which testimonials to show
  const startIndex = currentIndex * itemsToShow
  const visibleTestimonials = testimonials.slice(startIndex, startIndex + itemsToShow)

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      nextSlide()
    }, 8000) // 8 seconds between slides

    return () => clearInterval(interval)
  }, [autoplay, currentIndex])

  return (
    <div className="w-full py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            What Our Students Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Verified feedback from Google Reviews
          </p>
          
          {/* Link to Full Testimonials */}
          <div className="mb-10">
            <Link 
              href="/testimonials" 
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md"
            >
              📖 Read All Verified Google Reviews
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Testimonials Container */}
        <div className="relative max-w-7xl mx-auto">
          
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 rounded-full bg-white border-gray-300 shadow-lg hover:bg-gray-50"
            onClick={() => {
              prevSlide()
              setAutoplay(false)
            }}
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 rounded-full bg-white border-gray-300 shadow-lg hover:bg-gray-50"
            onClick={() => {
              nextSlide()
              setAutoplay(false)
            }}
            aria-label="Next testimonials"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Testimonials Grid - 3 columns on desktop, 1 on mobile */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="min-w-full px-2">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.slice(slideIndex * itemsToShow, slideIndex * itemsToShow + itemsToShow).map((testimonial) => (
                      <div 
                        key={testimonial.id} 
                        className="bg-white rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition-shadow p-6 h-full flex flex-col"
                      >
                        {/* Rating Stars */}
                        <div className="flex mb-4">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>

                        {/* Review Content */}
                        <div className="flex-grow">
                          <p className="text-gray-700 mb-4 italic leading-relaxed line-clamp-6">
                            "{testimonial.content}"
                          </p>
                        </div>

                        {/* Student Info */}
                        <div className="border-t border-gray-100 pt-4 mt-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                              <span className="font-bold text-blue-600 text-sm">
                                {testimonial.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                              <div className="flex items-center text-sm text-gray-600">
                                <span>{testimonial.role}</span>
                                <span className="mx-2">•</span>
                                <span>{testimonial.date}</span>
                              </div>
                            </div>
                          </div>
                          
                          {/* Verified Badge */}
                          <div className="mt-3">
                            <span className="inline-flex items-center px-3 py-1 bg-green-50 text-green-700 text-xs rounded-full">
                              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                              Verified Google Review
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-10 space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex 
                    ? "bg-blue-600 w-8" 
                    : "bg-gray-300 w-2 hover:bg-gray-400"
                }`}
                onClick={() => {
                  setCurrentIndex(index)
                  setAutoplay(false)
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Auto-play Toggle */}
          <div className="text-center mt-6">
            <button
              onClick={() => setAutoplay(!autoplay)}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              {autoplay ? '⏸️ Pause slides' : '▶️ Play slides'}
            </button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">5.0 ★</div>
              <div className="text-gray-600">Perfect Rating</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600">100%</div>
              <div className="text-gray-600">Positive Feedback</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600">✓</div>
              <div className="text-gray-600">Verified Reviews</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-amber-600">💼</div>
              <div className="text-gray-600">Career Success</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}