import type { Metadata } from 'next';
import { DevelopmentInteractiveTabs } from './development-interactive-tabs';
import { ReferenceCropImage } from './reference-crop-image';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about our development company profile and services.',
};

const directionCards = [
  {
    title: 'Development Division',
    description:
      'Comprehensive planning and end-to-end project execution for high-value real estate assets.',
  },
  {
    title: 'Construction Division',
    description:
      'Reliable construction management from technical design to on-site delivery and quality control.',
  },
  {
    title: 'Property Management',
    description:
      'Sustainable property operation with investor-focused maintenance and tenant service standards.',
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
              Development company in bali
            </p>

            <div className="mt-5 grid grid-cols-2 gap-2 sm:max-w-[220px]">
              <ReferenceCropImage
                src="/about-us/slide-1.jpg"
                alt="Villa exterior detail"
                position="center"
                scale={1}
                className="aspect-square border border-lime-200"
                priority
                sizes="120px"
              />
              <ReferenceCropImage
                src="/about-us/slide-2.jpg"
                alt="Tropical landscape detail"
                position="center"
                scale={1}
                className="aspect-square border border-lime-200"
                sizes="120px"
              />
            </div>
            <p className="mt-2 max-w-[220px] text-right text-[10px] text-muted-foreground leading-tight">
              Architectural and interior design
            </p>
          </div>

          <ReferenceCropImage
            src="/about-us/slide-3.jpg"
            alt="Main architecture visual"
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
            Comprehensive solutions for real estate development and investment.
            Architectural projects and construction support with high quality
            environments.
          </p>

          <div className="mx-auto max-w-[760px] space-y-4 text-center">
            <p className="mx-auto max-w-[720px] font-semibold text-base text-lime-950 leading-snug sm:text-lg">
              In an era of rapid economic shifts, the backbone of ASEAN—our
              farmers—remains disconnected from the digital pulse of global
              trade. Relying on intuition rather than data creates systemic
              fragility. By embedding AI and predictive analytics into the heart
              of regional commerce, we are turning historical challenges into a
              competitive advantage for every smallholder and agri-business in
              the region.
            </p>
            <p className="font-semibold text-base text-primary leading-snug sm:text-lg">
              “Actionable Intelligence”
            </p>
          </div>

          <ReferenceCropImage
            src="/about-us/slide-4.jpg"
            alt="Signature pool villa visual"
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
          * Services
        </p>
        <p className="mt-3 max-w-[460px] text-muted-foreground text-sm leading-snug">
          Comprehensive solutions of real estate development and investment
        </p>

        <h2 className="mt-4 font-semibold text-5xl text-primary leading-none sm:text-7xl">
          Vision & Mission
        </h2>

        <DevelopmentInteractiveTabs />
      </section>
    </div>
  );
}
