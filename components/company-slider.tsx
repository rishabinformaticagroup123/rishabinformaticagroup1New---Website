"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface Logo {
  name: string
  src: string
  width: number
  height: number
}

interface CompanySliderProps {
  logos: Logo[]
  speed?: "slow" | "medium" | "fast"
}

const speedMap: Record<string, string> = {
  slow: "60s",
  medium: "30s",
  fast: "15s",
  "very-fast": "8s"
}

export default function CompanySlider({ logos, speed = "medium" }: CompanySliderProps) {
  const [finalSpeed, setFinalSpeed] = useState<string>(speed)

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 768) {
        setFinalSpeed("very-fast")
      } else {
        setFinalSpeed(speed)
      }
    }
  }, [speed])

  const duration = speedMap[finalSpeed] || "30s"

  return (
    <div className="relative overflow-hidden w-full bg-white py-2">
      <div
        className="flex animate-slide gap-12"
        style={{
          animationDuration: duration,
        }}
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

      {/* Optional gradient fade on both sides */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-white to-transparent" />
    </div>
  )
}
