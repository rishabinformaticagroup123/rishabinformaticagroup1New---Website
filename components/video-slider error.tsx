"use client";
import { useState, useEffect, useRef } from 'react';
import YouTube from 'react-youtube';

const VideoSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const slides = [
    { type: 'short-video', src: "/videos/video3.mp4", duration: 3000 },
    { type: 'youtube', videoId: "4DfifZbfk7w" }
  ];

  // Auto-advance logic (same as before)
  useEffect(() => { /* ... */ }, [currentSlide, isPlaying]);

  const handleDotClick = (index: number) => {
    setIsPlaying(false);
    clearTimeout(timeoutRef.current);
    setCurrentSlide(index);
  };

  return (
    <div className="w-full aspect-video rounded-xl overflow-hidden relative">
      {/* Slides container (same as before) */}
      {slides.map((slide, index) => (
        <div key={index} className={`absolute inset-0 transition-opacity duration-500 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
          {/* Video/YouTube content (same as before) */}
        </div>
      ))}

      {/* Slide Dots Navigation */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-2 transition-all rounded-full ${
              index === currentSlide 
                ? 'w-6 bg-white' 
                : 'w-2 bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};