"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import YouTube from 'react-youtube';

interface Slide {
  type: 'image' | 'video';
  src?: string;
  alt?: string;
  videoId?: string;
}

interface VideoSliderProps {
  slideDuration?: number;
  slides: Slide[];
}

const VideoSlider = ({ 
  slideDuration = 3000,
  slides 
}: VideoSliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isPlaying) {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }
    }, slideDuration);

    return () => clearInterval(timer);
  }, [isPlaying, slides.length, slideDuration]);

  // YouTube player options
  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      modestbranding: 1,
      rel: 0,
    },
  };

  const handleVideoPlay = () => setIsPlaying(true);
  const handleVideoEnd = () => {
    setIsPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <div className="w-full aspect-video rounded-xl shadow-lg overflow-hidden relative">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {slide.type === 'image' ? (
            <Image
              src={slide.src!}
              alt={slide.alt!}
              fill
              className="object-cover"
              priority={index === currentSlide}
            />
          ) : (
            <div className="h-full w-full">
              <YouTube
                videoId={slide.videoId!}
                opts={opts}
                onPlay={handleVideoPlay}
                onEnd={handleVideoEnd}
                className="h-full w-full"
              />
            </div>
          )}
        </div>
      ))}
      
      {/* Slide indicators */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentSlide(index);
              setIsPlaying(false);
            }}
            className={`h-2 w-2 rounded-full transition-all ${
              index === currentSlide ? 'bg-white w-6' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoSlider;