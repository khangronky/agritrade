'use client';

import Image from 'next/image';
import Link from 'next/link';
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

type ExploreSlide = {
  src: string;
  alt: string;
  title: string;
  contentItems: string[];
  ctaLabel: string;
  ctaHref: string;
  imagePosition?: string;
};

const slides: ExploreSlide[] = [
  {
    src: '/business-model-insights.jpg',
    alt: 'Aerial farmland with market and analytics overlays',
    title: 'Real-Time Market Intelligence',
    contentItems: [
      'Live price updates',
      'Historical trends',
      'Demand predictions',
    ],
    ctaLabel: 'View Price Dashboard →',
    ctaHref: '/marketplace',
    imagePosition: 'object-center',
  },
  {
    src: '/about-us/slide-5.jpg',
    alt: 'Farmers working across tea rows in the highlands',
    title: 'Connect with Buyers and Sellers',
    contentItems: [
      'Farmers post available products',
      'Buyers search and compare',
      'Direct negotiation',
    ],
    ctaLabel: 'Explore Marketplace →',
    ctaHref: '/marketplace',
    imagePosition: 'object-center',
  },
  {
    src: '/about-us/slide-6.jpg',
    alt: 'Farmers inspecting crop quality before market delivery',
    title: 'Meet Export Standards with Confidence',
    contentItems: [
      'Country-specific regulations',
      'Quality standards',
      'Alerts & reminders',
    ],
    ctaLabel: 'Access Farmer Tools →',
    ctaHref: '/forum',
    imagePosition: 'object-center',
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
            <CarouselItem key={slide.title} className="pl-0">
              <div className="relative overflow-hidden rounded-2xl bg-[#f8ffec] shadow-[0_12px_20px_rgba(121,177,28,0.16)]">
                <div className="grid min-h-[390px] md:min-h-[330px] md:grid-cols-[1.05fr_0.95fr]">
                  <div className="relative min-h-[200px] md:min-h-full">
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      className={cn('object-cover', slide.imagePosition)}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 88vw, 70vw"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/20 via-black/0 to-transparent" />
                  </div>

                  <article className="flex flex-col justify-between px-4 py-4 text-[#2e4b06] sm:px-5 sm:py-5">
                    <div>
                      <h3 className="font-semibold text-lg leading-tight sm:text-xl">
                        {slide.title}
                      </h3>
                      <ul className="mt-3 space-y-2">
                        {slide.contentItems.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2 text-sm leading-relaxed"
                          >
                            <span className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[#77bf12]" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Link
                      href={slide.ctaHref}
                      className="mt-5 inline-flex w-fit rounded-full border border-[#b8da84] bg-[#ecf9d8] px-3.5 py-1.5 font-semibold text-[#3f620a] text-sm"
                    >
                      {slide.ctaLabel}
                    </Link>
                  </article>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="top-1/2 left-2 size-7 -translate-y-1/2 rounded-full border-[#d3e8b4] bg-white/90 text-[#5ca508]" />
        <CarouselNext className="top-1/2 right-2 size-7 -translate-y-1/2 rounded-full border-[#d3e8b4] bg-white/90 text-[#5ca508]" />

        <div className="pointer-events-none absolute inset-x-0 bottom-2.5 flex justify-center">
          <div className="pointer-events-auto flex items-center gap-1.5 rounded-full border border-[#cfe7af] bg-[#f7fee8]/90 px-2 py-1 backdrop-blur-xs">
            {slides.map((slide, index) => (
              <button
                key={slide.title}
                type="button"
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  'h-2 rounded-full transition-all',
                  activeIndex === index
                    ? 'w-6 bg-[#88d11f]'
                    : 'w-2 bg-[#b5cf90]'
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
