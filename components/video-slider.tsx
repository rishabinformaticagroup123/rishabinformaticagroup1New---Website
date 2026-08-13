"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface Slide {
  type: "image" | "short-video" | "youtube";
  src?: string;
  alt?: string;
  videoId?: string;
  duration?: number;
}

interface VideoSliderProps {
  slideDuration?: number;
  slides: Slide[];
}

const VideoSlider = ({
  slideDuration = 4000,
  slides,
}: VideoSliderProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!slides.length) return;

    let timer: NodeJS.Timeout;

    const current = slides[currentSlide];

    const duration =
      current.type === "short-video"
        ? current.duration || 3000
        : slideDuration;

    // Do not automatically move while YouTube video is playing
    if (current.type === "youtube" && isPlaying) {
      return;
    }

    // Reset and play MP4 video
    if (current.type === "short-video" && videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
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
    <div className="relative w-full aspect-video overflow-hidden rounded-xl bg-black shadow-lg">

      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide
              ? "opacity-100"
              : "pointer-events-none opacity-0"
          }`}
        >

          {/* =========================
              IMAGE SLIDE
          ========================== */}
          {slide.type === "image" && (
            <div className="relative w-full h-full bg-black">
              <Image
                src={slide.src!}
                alt={slide.alt || "Training"}
                fill
                priority={index === currentSlide}
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          )}

          {/* =========================
              MP4 SHORT VIDEO
          ========================== */}
          {slide.type === "short-video" && (
            <video
              ref={index === currentSlide ? videoRef : null}
              src={slide.src}
              autoPlay
              muted
              playsInline
              onEnded={handleVideoEnd}
              className="w-full h-full object-contain bg-black"
            />
          )}

          {/* =========================
              YOUTUBE VIDEO
          ========================== */}
          {slide.type === "youtube" && (
            <div className="relative w-full h-full bg-black">

              {index === currentSlide && isPlaying ? (
                <iframe
                  src={`https://www.youtube.com/embed/${slide.videoId}?autoplay=1&modestbranding=1&rel=0`}
                  className="absolute inset-0 w-full h-full"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                  title="YouTube video player"
                />
              ) : (
                <button
                  type="button"
                  onClick={handlePlayYouTube}
                  className="absolute inset-0 w-full h-full cursor-pointer bg-black"
                  aria-label="Play YouTube video"
                >

                  {/* FULL YOUTUBE THUMBNAIL */}
                  <Image
                    src={`https://img.youtube.com/vi/${slide.videoId}/maxresdefault.jpg`}
                    alt="YouTube video thumbnail"
                    fill
                    priority={index === currentSlide}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain"
                  />

                  {/* DARK OVERLAY */}
                  <div className="absolute inset-0 bg-black/20 transition-colors hover:bg-black/30" />

                  {/* PLAY BUTTON */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-black/70 shadow-xl transition-transform duration-200 hover:scale-110">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="ml-1 h-10 w-10 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>

                </button>
              )}

            </div>
          )}

        </div>
      ))}

      {/* =========================
          SLIDE INDICATORS
      ========================== */}
      <div className="absolute bottom-3 left-0 right-0 z-20 flex justify-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => {
              setCurrentSlide(index);
              setIsPlaying(false);
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "w-6 bg-white"
                : "w-2 bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>

    </div>
  );
};

export default VideoSlider;