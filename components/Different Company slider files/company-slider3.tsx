"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

interface Logo {
  name: string
  src: string
  width: number
  height: number
}

interface CompanySliderProps {
  direction?: "left-to-right" | "right-to-left"
  fullWidth?: boolean
  logos: Logo[]
  speed?: "slow" | "medium" | "fast"
}

const speedMap: Record<string, number> = {
  slow: 0.5,
  medium: 1,
  fast: 2,
}

export default function CompanySlider({
  direction = "right-to-left",
  fullWidth = false,
  logos,
  speed = "medium",
}: CompanySliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null)
  const scrollAmount = direction === "right-to-left" ? 1 : -1
  const scrollSpeed = speedMap[speed] || 1

  useEffect(() => {
    const slider = sliderRef.current
    if (!slider) return

    let animationFrameId: number

    const animateScroll = () => {
      if (direction === "right-to-left") {
        if (slider.scrollLeft >= slider.scrollWidth / 2) {
          slider.scrollLeft = 0
        } else {
          slider.scrollLeft += scrollSpeed
        }
      } else {
        if (slider.scrollLeft <= 0) {
          slider.scrollLeft = slider.scrollWidth / 2
        } else {
          slider.scrollLeft += scrollAmount * scrollSpeed
        }
      }

      animationFrameId = requestAnimationFrame(animateScroll)
    }

    animationFrameId = requestAnimationFrame(animateScroll)
    return () => cancelAnimationFrame(animationFrameId)
  }, [direction, scrollSpeed])

  return (
    <div className={`relative overflow-hidden ${fullWidth ? "w-full" : ""}`}>
      <div
        ref={sliderRef}
        className="flex items-center space-x-12 overflow-x-hidden py-6 whitespace-nowrap"
      >
        {[...logos, ...logos].map((logo, index) => (
          <div
            key={`${logo.name}-${index}`}
            className="flex items-center justify-center min-w-[120px]"
          >
            <Image
              src={logo.src}
              width={logo.width}
              height={logo.height}
              alt={logo.name}
              className="transition-all duration-300 w-auto max-h-[40px]"
              priority
            />
          </div>
        ))}
      </div>

      {/* Gradient fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent" />
    </div>
  )
}
