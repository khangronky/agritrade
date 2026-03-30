import type { Metadata } from 'next';
import { DevelopmentInteractiveTabs } from './development-interactive-tabs';
import { ReferenceCropImage } from './reference-crop-image';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn how AgriTrade helps farmers and traders with live market data, demand insights, and export guidance.',
};

const directionCards = [
  {
    title: 'Market Intelligence',
    description:
      'Live prices, demand signals, and trend forecasts to support planting and selling decisions.',
  },
  {
    title: 'Trade Connectivity',
    description:
      'Connect farmers, traders, and buyers in one transparent network for faster transactions.',
  },
  {
    title: 'Export Readiness',
    description:
      'Country-specific standards and compliance guidance for cross-border agricultural trade.',
  },
];

export default function AboutUsPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] overflow-hidden pt-16">
      <section className="px-4 py-6 sm:px-6 sm:py-7 lg:px-8 lg:py-9">
        <div className="grid gap-6 md:grid-cols-[1fr_1.18fr] md:items-end">
          <div>
            <p className="font-medium text-[11px] text-primary uppercase tracking-[0.24em]">
              [About us]
            </p>
            <h1 className="mt-2 font-semibold text-5xl text-primary leading-none sm:text-6xl">
              About us
            </h1>
            <p className="mt-2 text-muted-foreground text-xs sm:text-sm">
              AI-powered agriculture market platform for ASEAN
            </p>

            <div className="mt-5 grid grid-cols-2 gap-2 sm:max-w-[220px]">
              <ReferenceCropImage
                src="/about-us/slide-1.jpg"
                alt="Farmer field activity during crop season"
                position="center"
                scale={1}
                className="aspect-square border border-lime-200"
                priority
                sizes="120px"
              />
              <ReferenceCropImage
                src="/about-us/slide-2.jpg"
                alt="Data-led planning for agricultural operations"
                position="center"
                scale={1}
                className="aspect-square border border-lime-200"
                sizes="120px"
              />
            </div>
            <p className="mt-2 max-w-[220px] text-right text-[10px] text-muted-foreground leading-tight">
              Market intelligence for every crop cycle
            </p>
          </div>

          <ReferenceCropImage
            src="/about-us/slide-3.jpg"
            alt="Agricultural marketplace dashboard and field operations"
            position="center"
            scale={1}
            className="aspect-[16/10] border border-lime-200"
            priority
            sizes="(max-width: 768px) 100vw, 52vw"
          />
        </div>
      </section>

      <section className="border-lime-200 border-t px-4 py-7 sm:px-6 lg:px-8">
        <p className="font-semibold text-[11px] text-primary uppercase tracking-[0.22em]">
          * About us
        </p>

        <div className="relative mt-5 grid gap-5 md:grid-cols-[0.95fr_1.05fr]">
          <p className="max-w-[260px] text-[11px] text-muted-foreground leading-relaxed">
            Data infrastructure for transparent agricultural trade, from price
            discovery to demand visibility.
          </p>

          <div className="mx-auto max-w-[760px] space-y-4 text-center">
            <p className="mx-auto max-w-[720px] font-semibold text-base text-lime-950 leading-snug sm:text-lg">
              AgriTrade closes the information gap between farms and markets. We
              combine live transaction signals, historical trends, and AI
              forecasts so farmers and traders can plan crops, negotiate fairly,
              and reduce risk across ASEAN trade routes.
            </p>
            <p className="font-semibold text-base text-primary leading-snug sm:text-lg">
              "Actionable Market Intelligence"
            </p>
          </div>

          <ReferenceCropImage
            src="/about-us/carbon-credits-seedling.jpg"
            alt="Farm supply chain and market distribution"
            position="center"
            scale={1}
            className="aspect-[3/4] w-full max-w-[220px] border border-lime-200 md:col-span-2"
            sizes="220px"
          />

          <p className="absolute right-0 bottom-0 -z-0 font-semibold text-6xl text-lime-100 leading-none sm:text-8xl">
            2026
          </p>
        </div>
      </section>

      <section className="motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-3 border-lime-200 border-t px-4 py-7 motion-safe:animate-in motion-safe:duration-700 sm:px-6 lg:px-8">
        <p className="font-semibold text-[11px] text-primary uppercase tracking-[0.22em]">
          * Our Direction
        </p>

        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {directionCards.map((card) => (
            <article
              key={card.title}
              className="group relative min-h-36 overflow-hidden border border-lime-200 bg-white p-4 text-lime-950 shadow-[0_8px_18px_rgba(127,181,44,0.12)] transition-all duration-500 ease-out hover:-translate-y-1 hover:border-lime-300 hover:shadow-[0_16px_28px_rgba(127,181,44,0.18)]"
            >
              <div className="pointer-events-none absolute inset-0 bg-linear-to-br from-lime-50 via-transparent to-lime-100 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <p className="relative z-10 font-semibold text-sm leading-tight transition-transform duration-500 ease-out group-hover:translate-x-1">
                {card.title}
              </p>
              <p className="relative z-10 mt-3 text-[11px] text-muted-foreground leading-relaxed transition-colors duration-500 group-hover:text-primary">
                {card.description}
              </p>
              <span className="absolute top-3 right-3 text-primary text-xs transition-transform duration-500 ease-out group-hover:rotate-90">
                +
              </span>
            </article>
          ))}
        </div>
      </section>

      <section className="motion-safe:fade-in-0 motion-safe:slide-in-from-bottom-3 border-lime-200 border-t px-4 py-8 motion-safe:animate-in motion-safe:delay-150 motion-safe:duration-700 sm:px-6 lg:px-8">
        <p className="font-semibold text-[11px] text-primary uppercase tracking-[0.22em]">
          * Vision & Mission
        </p>
        <p className="mt-3 max-w-[460px] text-muted-foreground text-sm leading-snug">
          Help every farmer and trader decide what to plant, when to sell, and
          where to trade with confidence.
        </p>

        <h2 className="mt-4 font-semibold text-5xl text-primary leading-none sm:text-7xl">
          Vision & Mission
        </h2>

        <DevelopmentInteractiveTabs />
      </section>
    </div>
  );
}
