'use client';

import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import { ReferenceCropImage } from './reference-crop-image';

type DevelopmentItem = {
  id: string;
  label: string;
  description: string;
  images: [{ src: string; alt: string }, { src: string; alt: string }];
};

const developmentItems: DevelopmentItem[] = [
  {
    id: 'construction',
    label: '* Smallholder Farmers & Cooperatives',
    description:
      'The heartbeat of our mission. We provide the tools they need to shift from "guesswork" to "data-work," ensuring fair pricing and reduced post-harvest losses.',
    images: [
      {
        src: '/about-us/slide-5.jpg',
        alt: 'Construction operations and urban development',
      },
      {
        src: '/about-us/slide-6.jpg',
        alt: 'Waterfront engineering and project logistics',
      },
    ],
  },
  {
    id: 'land-selection',
    label: '* Traders and distributors',
    description:
      'Effortless discovery of standardized produce with significantly lower search costs.',
    images: [
      {
        src: '/about-us/slide-1.jpg',
        alt: 'Urban area used for site analysis',
      },
      {
        src: '/about-us/slide-2.jpg',
        alt: 'Regional landscape for location planning',
      },
    ],
  },
  {
    id: 'architectural-design',
    label: '* Processors & Exporters',
    description:
      'Direct access to source data and traceability support to meet international standards.',
    images: [
      {
        src: '/about-us/slide-3.jpg',
        alt: 'Architecture concept and facade composition',
      },
      {
        src: '/about-us/slide-4.jpg',
        alt: 'Villa style design and visual atmosphere',
      },
    ],
  },
  {
    id: 'investment-projects',
    label: '* Regulators & NGOs',
    description:
      'Standardized macro-data to evaluate market health and deploy timely support initiatives.',
    images: [
      {
        src: '/about-us/slide-7.jpg',
        alt: 'Investment project context and market landscape',
      },
      {
        src: '/about-us/slide-8.jpg',
        alt: 'Property investment and asset growth perspective',
      },
    ],
  },
];

export function DevelopmentInteractiveTabs() {
  const [activeId, setActiveId] = useState(developmentItems[0].id);
  const activeItem = useMemo(
    () =>
      developmentItems.find((item) => item.id === activeId) ??
      developmentItems[0],
    [activeId]
  );

  return (
    <div className="mt-6 grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
      <div
        id="development-content"
        role="tabpanel"
        aria-live="polite"
        className="rounded-xl border border-lime-200 bg-white/70 p-4 transition-all duration-500 ease-out sm:p-5"
      >
        <p
          key={`desc-${activeItem.id}`}
          className="max-w-[460px] text-muted-foreground text-sm leading-snug motion-safe:animate-in motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-2 motion-safe:duration-400"
        >
          {activeItem.description}
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3">
          {activeItem.images.map((image) => (
            <ReferenceCropImage
              key={`${activeItem.id}-${image.src}`}
              src={image.src}
              alt={image.alt}
              className="group aspect-square border border-lime-200 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(126,177,45,0.2)]"
              hoverScale={1.08}
              imageClassName="group-hover:brightness-110 group-hover:saturate-105"
              sizes="180px"
            />
          ))}
        </div>
      </div>

      <div
        className="grid grid-cols-2 border border-lime-200 bg-white md:min-h-[320px] md:grid-cols-4"
        role="tablist"
        aria-label="Development services"
      >
        {developmentItems.map((item, index) => {
          const isActive = item.id === activeId;
          const isLast = index === developmentItems.length - 1;

          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls="development-content"
              onClick={() => setActiveId(item.id)}
              className={cn(
                'group relative min-h-28 cursor-pointer overflow-hidden p-4 text-center transition-all duration-500 ease-out focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:ring-offset-2 focus-visible:ring-offset-lime-50 md:min-h-[320px] md:p-2',
                !isLast && 'border-lime-200 border-r',
                isActive ? 'bg-lime-100' : 'hover:bg-lime-50'
              )}
            >
              <span
                className={cn(
                  '-translate-y-0.5 absolute top-0 left-1/2 h-0 w-8 -translate-x-1/2 bg-primary transition-all duration-500 ease-out md:left-0 md:top-1/2 md:w-0 md:-translate-x-0 md:-translate-y-1/2',
                  isActive
                    ? 'h-1 md:h-10 md:w-1'
                    : 'group-hover:h-1 md:group-hover:h-8 md:group-hover:w-1'
                )}
              />

              <span className="relative z-10 flex h-full w-full items-center justify-center">
                <span
                  className={cn(
                    'absolute font-semibold text-lime-950 text-xs uppercase tracking-[0.2em] transition-all duration-500 ease-out md:text-sm md:[writing-mode:vertical-rl] md:rotate-180',
                    isActive
                      ? 'opacity-0 md:-translate-y-6 md:rotate-[150deg]'
                      : 'opacity-100'
                  )}
                >
                  {item.label}
                </span>

                <span
                  className={cn(
                    'absolute max-w-[160px] font-semibold text-lime-700 text-xs uppercase tracking-[0.14em] transition-all duration-500 ease-out md:max-w-[170px] md:text-sm',
                    isActive
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-2 opacity-0'
                  )}
                >
                  {item.label}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
