import type { StaticImageFrame } from './static-image-slot';
import StaticImageSlot from './static-image-slot';

const futureCommitments = [
  'Increasing income stability and improving production decisions for farmers.',
  'Enhancing market efficiency so prices reflect real supply and demand.',
  'Accelerating agricultural modernization and productivity growth.',
];

const staticImage: StaticImageFrame = {
  src: '/farm.jpg',
  alt: 'Agricultural landscape with farmers working in the field.',
};

export function AboutUsFutureVisionSection() {
  return (
    <section className="pt-6 pb-16 sm:pt-8 sm:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="rounded-3xl border border-emerald-500/25 bg-zinc-900/85 p-6 shadow-sm sm:p-8">
            <p className="font-semibold text-emerald-300 text-sm uppercase tracking-[0.18em]">
              Our Future Vision
            </p>
            <h2 className="mt-3 font-semibold text-3xl text-zinc-100 leading-tight sm:text-4xl">
              Building a new generation of data-driven farmers.
            </h2>
            <p className="mt-4 text-zinc-300/90 leading-relaxed">
              We collaborate closely with farmers, cooperatives, traders, and
              government agencies to keep AgriTrade reliable and trusted across
              the regional agricultural community.
            </p>
            <div className="mt-6 space-y-3">
              {futureCommitments.map((commitment) => (
                <div
                  key={commitment}
                  className="rounded-xl border border-emerald-500/25 bg-zinc-900/75 px-4 py-3"
                >
                  <p className="text-zinc-200/90 text-sm leading-relaxed sm:text-base">
                    {commitment}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-6 font-medium text-zinc-200">
              Join us as we transform the agricultural supply chain, where every
              harvest realizes its true value.
            </p>
          </div>

          <StaticImageSlot image={staticImage} />
        </div>
      </div>
    </section>
  );
}
