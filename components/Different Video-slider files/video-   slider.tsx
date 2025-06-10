"use client";
import { useState, useEffect, useRef } from 'react';
import YouTube from 'react-youtube';

interface Slide {
  type: 'short-video' | 'youtube';
  src?: string;
  videoId?: string;
  duration?: number;
}

const VideoSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const videoRef = useRef<HTMLVideoElement>(null);

  const slides: Slide[] = [
    { type: 'short-video', src: "/videos/video3.mp4", duration: 3000 },
    { type: 'youtube', videoId: "4DfifZbfk7w" }
  ];

  // Auto-advance logic
  useEffect(() => {
    const current = slides[currentSlide];
    
    if (!isPlaying) {
      timeoutRef.current = setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, current.type === 'short-video' ? current.duration : 4000);
    }

    // Reset video playback when slide changes
    if (current.type === 'short-video' && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(console.error);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [currentSlide, isPlaying]);

  const handleVideoPlay = () => {
    setIsPlaying(true);
    clearTimeout(timeoutRef.current);
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 1000);
  };

  const handleDotClick = (index: number) => {
    setIsPlaying(false);
    clearTimeout(timeoutRef.current);
    setCurrentSlide(index);
  };

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 0,
      modestbranding: 1,
      rel: 0
    },
  };

  return (
    <div className="w-full aspect-video rounded-xl overflow-hidden relative">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        >
          {slide.type === 'short-video' ? (
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
            <YouTube
              videoId={slide.videoId}
              opts={opts}
              onPlay={handleVideoPlay}
              onEnd={handleVideoEnd}
              className="h-full w-full"
            />
          )}
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

export default VideoSlider;