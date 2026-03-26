'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

const slides = [
  {
    src: '/about-us/slide-5.jpg',
    alt: 'Farmers working across tea rows in the highlands',
    caption: 'Track field-level updates from trusted farmer communities.',
  },
  {
    src: '/about-us/slide-8.jpg',
    alt: 'Two farmers harvesting together on a tea plantation',
    caption: 'Compare market signals with practical production context.',
  },
  {
    src: '/farm.jpg',
    alt: 'Farmer harvesting crops in a green field',
    caption: 'See clear price movement before deciding where to sell.',
  },
];

export function ExplorePlatformSlideshow() {
  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    const onSelect = () => {
      setActiveIndex(api.selectedScrollSnap());
    };

    onSelect();
    api.on('select', onSelect);
    api.on('reInit', onSelect);

    return () => {
      api.off('select', onSelect);
      api.off('reInit', onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api) {
      return;
    }

    const intervalId = setInterval(() => {
      api.scrollNext();
    }, 4500);

    return () => clearInterval(intervalId);
  }, [api]);

  return (
    <div className="w-full">
      <Carousel
        setApi={setApi}
        opts={{ align: 'start', loop: true }}
        className="w-full"
      >
        <CarouselContent className="ml-0">
          {slides.map((slide) => (
            <CarouselItem key={slide.src} className="pl-0">
              <div className="group relative aspect-[16/9] overflow-hidden rounded-[28px] border border-[#cfe7af] bg-white shadow-[0_12px_20px_rgba(121,177,28,0.16)] lg:aspect-[16/6.6]">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 56vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/28 via-black/5 to-transparent" />
                <p className="absolute right-3 bottom-2.5 left-3 font-medium text-white/95 text-xs sm:text-sm">
                  {slide.caption}
                </p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="top-1/2 left-2 size-8 -translate-y-1/2 rounded-full border-[#d3e8b4] bg-white/90 text-[#5ca508] hover:bg-white" />
        <CarouselNext className="top-1/2 right-2 size-8 -translate-y-1/2 rounded-full border-[#d3e8b4] bg-white/90 text-[#5ca508] hover:bg-white" />

        <div className="pointer-events-none absolute inset-x-0 bottom-2 flex justify-center">
          <div className="pointer-events-auto flex items-center gap-1.5 rounded-full bg-black/15 px-2 py-1 backdrop-blur-xs">
            {slides.map((slide, index) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  'h-2 rounded-full transition-all',
                  activeIndex === index
                    ? 'w-6 bg-[#9ae735]'
                    : 'w-2 bg-white/70 hover:bg-white'
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </Carousel>
    </div>
  );
}
