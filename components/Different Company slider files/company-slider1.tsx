"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

const companies = [
  { name: "TCS", logo: "/placeholder.svg?height=60&width=120" },
  { name: "Tech Mahindra", logo: "/placeholder.svg?height=60&width=120" },
  { name: "Cognizant", logo: "/placeholder.svg?height=60&width=120" },
  { name: "IBM", logo: "/placeholder.svg?height=60&width=120" },
  { name: "Accenture", logo: "/placeholder.svg?height=60&width=120" },
  { name: "Infosys", logo: "/placeholder.svg?height=60&width=120" },
  { name: "Wipro", logo: "/placeholder.svg?height=60&width=120" },
  { name: "HCL", logo: "/placeholder.svg?height=60&width=120" },
]

export default function CompanySlider() {
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return

    const animateScroll = () => {
      if (slider.scrollLeft >= slider.scrollWidth / 2) {
        slider.scrollLeft = 0
      } else {
        slider.scrollLeft += 1
      }
    }

    const interval = setInterval(animateScroll, 30)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="relative overflow-hidden">
      <div ref={sliderRef} className="flex w-full items-center space-x-12 overflow-x-hidden py-8">
        {/* First set of logos */}
        {companies.map((company, index) => (
          <div key={`first-${index}`} className="flex min-w-[150px] items-center justify-center">
            <Image
              src={company.logo || "/placeholder.svg"}
              width={120}
              height={60}
              alt={company.name}
              className="h-12 w-auto grayscale transition-all duration-300 hover:grayscale-0"
            />
          </div>
        ))}
        {/* Duplicate set for seamless looping */}
        {companies.map((company, index) => (
          <div key={`second-${index}`} className="flex min-w-[150px] items-center justify-center">
            <Image
              src={company.logo || "/placeholder.svg"}
              width={120}
              height={60}
              alt={company.name}
              className="h-12 w-auto grayscale transition-all duration-300 hover:grayscale-0"
            />
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
    </div>
  )
}
