"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import YouTube from 'react-youtube';

interface Slide {
  type: 'image' | 'short-video' | 'youtube';
  src?: string;
  alt?: string;
  videoId?: string;
  duration?: number; // Custom duration for short videos
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
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle slide transitions
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    const startTimer = () => {
      const currentSlideData = slides[currentSlide];
      const duration = currentSlideData.type === 'short-video' 
        ? (currentSlideData.duration || 3000)
        : slideDuration;

      timer = setInterval(() => {
        if (!isPlaying) {
          setCurrentSlide((prev) => (prev + 1) % slides.length);
        }
      }, duration);
    };

    // Reset video playback when slide changes
    if (slides[currentSlide].type === 'short-video' && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(console.error);
    }

    startTimer();
    return () => clearInterval(timer);
  }, [currentSlide, isPlaying, slides, slideDuration]);

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      modestbranding: 1,
      rel: 0,
    },
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
          ) : slide.type === 'short-video' ? (
            <video
              ref={index === currentSlide ? videoRef : null}
              src={slide.src}
              autoPlay
              muted
              playsInline
              onEnded={handleVideoEnd}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="h-full w-full">
              <YouTube
                videoId={slide.videoId!}
                opts={opts}
                onPlay={() => setIsPlaying(true)}
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
            onClick={() => setCurrentSlide(index)}
            className={`h-2 w-2 rounded-full transition-all ${
              index === currentSlide ? 'bg-white w-6' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoSlider;