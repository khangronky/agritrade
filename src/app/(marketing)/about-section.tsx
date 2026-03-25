import Image from 'next/image';
import { ArrowRightLeft, CheckCircle2 } from 'lucide-react';

const aboutImages = [
  {
    alt: 'Farm rows at sunrise representing resilient production',
    objectPosition: 'object-[center_40%]',
  },
  {
    alt: 'Green field landscape symbolizing steady supply',
    objectPosition: 'object-[center_55%]',
  },
  {
    alt: 'Cultivated farmland showing harvest readiness',
    objectPosition: 'object-[center_35%]',
  },
  {
    alt: 'Agriculture field highlighting crop quality and care',
    objectPosition: 'object-[center_60%]',
  },
];

export function AboutSection() {
  return (
    <section id="about-us" className="scroll-mt-20 py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="font-semibold text-green-700 text-sm uppercase tracking-[0.2em]">
            About Us
          </p>
          <h2 className="mt-3 font-semibold text-3xl text-green-950 sm:text-4xl">
            Why farmers and stakeholders build with AgriTrade
          </h2>
          <p className="mt-5 text-base text-green-900/85 leading-relaxed sm:text-lg">
            We connect producers, buyers, and market supporters in one trusted
            flow so price decisions are clearer, faster, and fairer.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
          <div className="space-y-4 rounded-3xl border border-green-200/80 bg-white/85 p-5 shadow-sm sm:p-6">
            <div className="grid gap-4 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
              <AudienceCard
                title="Farmer"
                description="Posts yield and receives competitive demand signals."
              />
              <div className="flex items-center justify-center text-green-700">
                <ArrowRightLeft className="size-5" />
              </div>
              <AudienceCard
                title="Stakeholder"
                description="Trader, cooperative, or buyer aligns offers in one place."
              />
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {aboutImages.map((image) => (
                <div
                  key={image.alt}
                  className="group relative aspect-4/3 overflow-hidden rounded-2xl border border-green-200/70 bg-green-100 shadow-sm transition-all duration-500 ease-out hover:-translate-y-1 hover:border-green-300/80 hover:shadow-lg"
                >
                  <Image
                    src="/farm.jpg"
                    alt={image.alt}
                    fill
                    className={`object-cover transition-transform duration-700 ease-out group-hover:scale-105 ${image.objectPosition}`}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 40vw, 22vw"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-green-200/80 bg-green-950 p-6 text-green-50 shadow-sm sm:p-7">
            <h3 className="font-semibold text-2xl text-lime-100 sm:text-3xl">
              Why us
            </h3>
            <ul className="mt-5 space-y-3">
              {[
                'Real-time price visibility by area and commodity.',
                'Flexible paths: direct buyer deals or middleman support.',
                'Lower search and negotiation friction for all participants.',
                'Simple tools so adoption does not disrupt existing workflows.',
              ].map((point) => (
                <li key={point} className="flex gap-3 text-green-100/95 text-sm">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-lime-300" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function AudienceCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-2xl border border-green-200/80 bg-lime-50/70 p-4">
      <p className="font-semibold text-green-900">{title}</p>
      <p className="mt-1 text-green-900/80 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}
