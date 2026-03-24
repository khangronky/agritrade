'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export type StoryImageFrame = {
  src: string;
  alt: string;
};

type StoryImageSlotProps = {
  images: StoryImageFrame[];
  intervalMs?: number;
  className?: string;
};

export function StoryImageSlot({
  images,
  intervalMs = 5200,
  className,
}: StoryImageSlotProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const totalImages = images.length;

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(media.matches);

    const onChange = () => setPrefersReducedMotion(media.matches);
    media.addEventListener('change', onChange);

    return () => {
      media.removeEventListener('change', onChange);
    };
  }, []);

  useEffect(() => {
    if (totalImages <= 1 || isPaused || prefersReducedMotion) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % totalImages);
    }, intervalMs);

    return () => {
      window.clearInterval(timer);
    };
  }, [intervalMs, isPaused, prefersReducedMotion, totalImages]);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  const goToPreviousSlide = () => {
    setActiveIndex((current) => (current - 1 + totalImages) % totalImages);
  };

  const goToNextSlide = () => {
    setActiveIndex((current) => (current + 1) % totalImages);
  };

  return (
    <div
      className={cn(
        'group relative h-64 overflow-hidden rounded-2xl border border-green-200/80 bg-green-900/10 shadow-sm sm:h-72',
        className
      )}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      {images.map((image, index) => {
        const isActive = index === activeIndex;

        return (
          <Image
            key={`${image.src}-${index}`}
            src={image.src}
            alt={image.alt}
            fill
            className={cn(
              'object-cover object-center transition-[opacity,transform,filter] duration-1200 ease-out',
              isActive
                ? 'scale-105 opacity-90 saturate-110'
                : 'scale-100 opacity-0 blur-[2px]'
            )}
            sizes="(max-width: 640px) 100vw, 45vw"
            priority={index === 0}
          />
        );
      })}

      <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
        {images.map((image, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={`${image.src}-indicator`}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`Show image ${index + 1}`}
              className={cn(
                'h-2.5 rounded-full border border-white/70 bg-white/45 transition-all duration-500',
                isActive ? 'w-7 bg-lime-200' : 'w-2.5 hover:bg-white/80'
              )}
            />
          );
        })}
      </div>

      {totalImages > 1 ? (
        <>
          <button
            type="button"
            onClick={goToPreviousSlide}
            aria-label="Previous image"
            className="absolute top-1/2 left-3 hidden -translate-y-1/2 rounded-full border border-green-100/70 bg-white/85 p-2 text-green-900 shadow-md transition-all duration-300 hover:scale-105 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 sm:inline-flex"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={goToNextSlide}
            aria-label="Next image"
            className="absolute top-1/2 right-3 hidden -translate-y-1/2 rounded-full border border-green-100/70 bg-white/85 p-2 text-green-900 shadow-md transition-all duration-300 hover:scale-105 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-400 sm:inline-flex"
          >
            <ChevronRight className="size-4" />
          </button>
        </>
      ) : null}
    </div>
  );
}
