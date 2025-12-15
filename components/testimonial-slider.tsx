// components/testimonial-slider.tsx
"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// ✅ YOUR EXACT GOOGLE REVIEWS
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
 
  }
]

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  
  const itemsToShow = 3
  const totalSlides = Math.ceil(testimonials.length / itemsToShow)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalSlides)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides)
  }

  const startIndex = currentIndex * itemsToShow
  const visibleTestimonials = testimonials.slice(startIndex, startIndex + itemsToShow)

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      nextSlide()
    }, 8000)

    return () => clearInterval(interval)
  }, [autoplay, currentIndex])

  // Different background colors for better visibility
  const cardColors = [
    "bg-gradient-to-br from-blue-50 via-white to-blue-50 border-l-4 border-blue-500",
    "bg-gradient-to-br from-green-50 via-white to-green-50 border-l-4 border-green-500",
    "bg-gradient-to-br from-purple-50 via-white to-purple-50 border-l-4 border-purple-500",
    "bg-gradient-to-br from-amber-50 via-white to-amber-50 border-l-4 border-amber-500",
    "bg-gradient-to-br from-cyan-50 via-white to-cyan-50 border-l-4 border-cyan-500"
  ]

  return (
    <div className="w-full py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6">
            <Quote className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Verified Google Reviews
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            See why students trust our combo courses
          </p>
          
          {/* Stats Banner */}
          <div className="inline-flex flex-wrap justify-center gap-6 bg-white/80 backdrop-blur-sm px-8 py-4 rounded-2xl shadow-lg mb-10">
            <div className="flex items-center">
              <div className="flex text-yellow-400 mr-2">
                {[...Array(5)].map((_, i) => <Star key={i} className="h-5 w-5 fill-current" />)}
              </div>
              <span className="font-bold text-gray-800">5.0 Perfect Rating</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-gray-300"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-green-600 font-bold">✓</span>
              </div>
              <span className="font-bold text-gray-800">100% Verified</span>
            </div>
          </div>
          
          {/* Link to Full Testimonials */}
          <div className="mb-12">
            <Link 
              href="/testimonials" 
              className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-2xl transition-all duration-300 font-bold text-lg shadow-lg hover:-translate-y-1"
            >
              📚 Read All Verified Reviews
              <ChevronRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Testimonials Container */}
        <div className="relative max-w-7xl mx-auto">
          
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 z-10 rounded-full bg-white border-2 border-gray-200 shadow-xl hover:shadow-2xl hover:bg-white hover:scale-110 transition-all"
            onClick={() => {
              prevSlide()
              setAutoplay(false)
            }}
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="h-6 w-6 text-blue-600" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 z-10 rounded-full bg-white border-2 border-gray-200 shadow-xl hover:shadow-2xl hover:bg-white hover:scale-110 transition-all"
            onClick={() => {
              nextSlide()
              setAutoplay(false)
            }}
            aria-label="Next testimonials"
          >
            <ChevronRight className="h-6 w-6 text-blue-600" />
          </Button>

          {/* Testimonials Grid */}
          <div className="overflow-hidden px-2">
            <div 
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                <div key={slideIndex} className="min-w-full px-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.slice(slideIndex * itemsToShow, slideIndex * itemsToShow + itemsToShow).map((testimonial, cardIndex) => (
                      <div 
                        key={testimonial.id} 
                        className={`${cardColors[cardIndex % cardColors.length]} rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 h-full flex flex-col transform hover:-translate-y-2`}
                      >
                        {/* Google-style Header */}
                        <div className="flex items-start justify-between mb-6">
                          <div>
                            <div className="flex mb-2">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                            <div className="flex items-center">
                              <div className="w-12 h-12 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full flex items-center justify-center mr-4">
                                <span className="font-bold text-blue-700 text-lg">
                                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                                </span>
                              </div>
                              <div>
                                <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                                <p className="text-gray-600 text-sm">{testimonial.role}</p>
                              </div>
                            </div>
                          </div>
                          
                          {/* Google Logo Style */}
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                              <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                                <span className="text-blue-600 font-bold text-xs">G</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Review Content with Highlighted Background */}
                        <div className="flex-grow mb-6">
                          <div className="relative">
                            <Quote className="absolute -top-2 -left-2 h-8 w-8 text-blue-200 opacity-50" />
                            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-gray-100">
                              <p className="text-gray-800 leading-relaxed text-base line-clamp-6">
                                "{testimonial.content}"
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Footer with Date and Verified Badge */}
                        <div className="border-t border-gray-200 pt-6">
                          <div className="flex justify-between items-center">
                            <div className="text-sm text-gray-500">
                              <span className="font-medium">{testimonial.date}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="inline-flex items-center px-3 py-1 bg-green-50 text-green-700 text-xs rounded-full font-medium">
                                <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                Verified
                              </span>
                              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                                Google
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Dots Indicator */}
          <div className="flex justify-center mt-12 space-x-3">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                className={`h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 w-10 shadow-lg" 
                    : "bg-gray-300 w-3 hover:bg-gray-400 hover:w-4"
                }`}
                onClick={() => {
                  setCurrentIndex(index)
                  setAutoplay(false)
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Controls */}
          <div className="flex justify-center items-center mt-8 space-x-6">
            <button
              onClick={() => setAutoplay(!autoplay)}
              className="flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-gray-700 font-medium transition-colors"
            >
              {autoplay ? (
                <>
                  <div className="w-3 h-3 bg-gray-600 mr-2"></div>
                  Pause Auto Slide
                </>
              ) : (
                <>
                  <div className="w-3 h-3 bg-green-500 mr-2 rounded-full animate-pulse"></div>
                  Play Auto Slide
                </>
              )}
            </button>
            
            <div className="text-sm text-gray-500">
              Showing {visibleTestimonials.length} of {testimonials.length} reviews
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-10 border border-blue-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Join These Successful Students?
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Start your journey with our industry-leading combo courses
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/courses"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-xl hover:-translate-y-1 transition-all"
              >
                Explore All Courses
              </Link>
              <Link 
                href="/contact"
                className="px-8 py-4 border-2 border-blue-600 text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors"
              >
                Talk to Counselor
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}