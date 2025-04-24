"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const testimonials = [
  {
    id: 1,
    content:
      "The Informatica IICS training at Rishab Informatica Group was comprehensive and practical. I landed a job at TCS within a month of completing the course.",
    name: "Priya Sharma",
    role: "Data Integration Specialist, TCS",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 2,
    content:
      "The Azure Data Engineering course was exactly what I needed to transition into a cloud role. The hands-on labs and projects were incredibly valuable.",
    name: "Rahul Patel",
    role: "Cloud Data Engineer, Cognizant",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 3,
    content:
      "I took the Snowflake training while working full-time. The flexible schedule and expert instructors made it possible for me to upskill without leaving my job.",
    name: "Ananya Singh",
    role: "Data Analyst, Tech Mahindra",
    image: "/placeholder.svg?height=80&width=80",
  },
  {
    id: 4,
    content:
      "The Performance Engineering course gave me the skills I needed to stand out in interviews. I'm now working at IBM as a Performance Engineer.",
    name: "Vikram Desai",
    role: "Performance Engineer, IBM",
    image: "/placeholder.svg?height=80&width=80",
  },
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
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay, currentIndex])

  return (
    <div className="relative mx-auto max-w-4xl">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="min-w-full px-4">
              <Card className="border-none bg-transparent shadow-none">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <Quote className="h-12 w-12 text-primary/20" />
                  <p className="mt-4 text-lg">{testimonial.content}</p>
                  <div className="mt-6 flex items-center">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      width={80}
                      height={80}
                      alt={testimonial.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div className="ml-4 text-left">
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-8 flex justify-center space-x-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`h-2 w-2 rounded-full ${index === currentIndex ? "bg-primary" : "bg-muted-foreground/30"}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      <Button
        variant="outline"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm"
        onClick={() => {
          prevSlide()
          setAutoplay(false)
        }}
        aria-label="Previous testimonial"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm"
        onClick={() => {
          nextSlide()
          setAutoplay(false)
        }}
        aria-label="Next testimonial"
      >
        <ChevronRight className="h-5 w-5" />
      </Button>
    </div>
  )
}
