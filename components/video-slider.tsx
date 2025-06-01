"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface Slide {
  type: 'image' | 'short-video' | 'youtube';
  src?: string;
  alt?: string;
  videoId?: string;
  duration?: number;
}

interface VideoSliderProps {
  slideDuration?: number;
  slides: Slide[];
}

const VideoSlider = ({ slideDuration = 4000, slides }: VideoSliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const current = slides[currentSlide];
    const duration = current.type === 'short-video'
      ? current.duration || 3000
      : slideDuration;

    // Don’t advance if YouTube video is playing
    if (current.type === 'youtube' && isPlaying) return;

    // Reset and play MP4 if needed
    if (current.type === 'short-video' && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(console.error);
    }

    timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
      setIsPlaying(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [currentSlide, isPlaying, slides, slideDuration]);

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePlayYouTube = () => {
    setIsPlaying(true);
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
          {slide.type === 'image' && (
            <Image
              src={slide.src!}
              alt={slide.alt || ''}
              fill
              className="object-cover"
              priority={index === currentSlide}
            />
          )}

          {slide.type === 'short-video' && (
            <video
              ref={index === currentSlide ? videoRef : null}
              src={slide.src}
              autoPlay
              muted
              playsInline
              onEnded={handleVideoEnd}
              className="w-full h-full object-cover"
            />
          )}

          {slide.type === 'youtube' && (
            <div className="w-full h-full relative">
              {index === currentSlide && isPlaying ? (
                <iframe
                  src={`https://www.youtube.com/embed/${slide.videoId}?autoplay=1&modestbranding=1&rel=0`}
                  className="w-full h-full"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="YouTube video player"
                />
              ) : (
                <div
                  className="relative w-full h-full cursor-pointer"
                  onClick={handlePlayYouTube}
                >
                  <Image
                    src={`https://img.youtube.com/vi/${slide.videoId}/hqdefault.jpg`}
                    alt="YouTube thumbnail"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              )}
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
          />
        ))}
      </div>
    </div>
  );
};

export default VideoSlider;
