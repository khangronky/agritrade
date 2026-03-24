import {
  ArrowRight,
  BrainCircuit,
  Globe2,
  Handshake,
  type LucideIcon,
  Scale,
  Sprout,
  TrendingUp,
  Waves,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { type StoryImageFrame, StoryImageSlot } from './story-image-slot';

type StoryCard = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const missionPillars = [
  'What crops to plant.',
  'When to sell.',
  'The fair price at which to negotiate.',
];

const challengeCards: StoryCard[] = [
  {
    title: 'Non-transparent pricing',
    description:
      'Many farmers selling through middlemen still receive around 15% lower prices than direct wholesale channels.',
    icon: Scale,
  },
  {
    title: 'Decisions based on guesswork',
    description:
      'Without reliable demand signals, production often swings to oversupply or undersupply, creating avoidable losses.',
    icon: Waves,
  },
  {
    title: 'Market instability',
    description:
      'When regional data is fragmented, trade flows distort and price volatility increases between countries.',
    icon: TrendingUp,
  },
];

const solutionCards: StoryCard[] = [
  {
    title: 'AI-powered market analysis and forecasting',
    description:
      'We combine Machine Learning models (CNN, LSTM), historical pricing, trends, and weather signals to forecast short-term demand and likely price ranges.',
    icon: BrainCircuit,
  },
  {
    title: 'Price and demand transparency',
    description:
      'We provide accurate real-time and historical prices by region and quality grade for key agricultural commodities.',
    icon: Scale,
  },
  {
    title: 'Information connection across the supply chain',
    description:
      'Farmers, traders, and exporters can post sell/buy intent to self-connect directly while also improving forecasting through user-generated data.',
    icon: Handshake,
  },
  {
    title: 'Export quality support',
    description:
      'We deliver cultivation reminders and practical guidance so produce can better meet import-export standards.',
    icon: Globe2,
  },
];

const futureCommitments = [
  'Increasing income stability and improving production decisions for farmers.',
  'Enhancing market efficiency so prices reflect real supply and demand.',
  'Accelerating agricultural modernization and productivity growth.',
];

const challengeSlotImages: StoryImageFrame[] = [
  {
    src: '/about-us/slide-5.jpg',
    alt: 'Field conditions showing pressure on farm output.',
    objectPosition: 'object-[center_56%]',
  },
  {
    src: '/about-us/slide-6.jpg',
    alt: 'Crop rows reflecting fluctuating demand and pricing.',
    objectPosition: 'object-[center_44%]',
  },
  {
    src: '/about-us/slide-7.jpg',
    alt: 'Agricultural production scene highlighting uncertainty.',
    objectPosition: 'object-[center_52%]',
  },
  {
    src: '/about-us/slide-8.jpg',
    alt: 'Close-up harvest imagery related to market quality standards.',
    objectPosition: 'object-[center_38%]',
  },
];

function StaticImageSlot({
  title,
  hint,
  objectPosition,
}: {
  title: string;
  hint: string;
  objectPosition: string;
}) {
  return (
    <div className="group relative h-64 overflow-hidden rounded-2xl border border-green-200/80 bg-green-900/10 shadow-sm sm:h-72">
      <Image
        src="/farm.jpg"
        alt={title}
        fill
        className={`object-cover opacity-80 transition-transform duration-700 ease-out group-hover:scale-105 ${objectPosition}`}
        sizes="(max-width: 640px) 100vw, 45vw"
      />
      <div className="absolute inset-0 bg-linear-to-t from-green-950/75 via-green-900/20 to-transparent" />
      <div className="absolute right-4 bottom-4 left-4 rounded-xl border border-green-100/60 bg-white/90 p-3 backdrop-blur-sm">
        <p className="font-semibold text-green-950 text-sm">{title}</p>
        <p className="mt-1 text-green-900/80 text-xs">{hint}</p>
      </div>
    </div>
  );
}

export default function AboutUsPage() {
  return (
    <div className="overflow-hidden bg-linear-to-b from-emerald-50 via-green-50 to-lime-50 text-green-950">
      <section className="relative border-green-200/80 border-b pt-24 pb-16 sm:pt-28 sm:pb-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(163,230,53,0.22),transparent_38%),radial-gradient(circle_at_85%_12%,rgba(34,197,94,0.16),transparent_34%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[1.05fr_minmax(0,0.95fr)] lg:items-center lg:px-8">
          <div>
            <Badge className="border-green-300 bg-green-100 text-green-800">
              About Us
            </Badge>
            <h1 className="mt-5 max-w-3xl font-semibold text-3xl leading-tight sm:text-4xl lg:text-5xl">
              AgriTrade: Unleashing the Power of Agricultural Data
            </h1>
            <p className="mt-6 max-w-3xl text-base text-green-900/85 leading-relaxed sm:text-lg">
              AgriTrade is founded on a profound belief: every farmer deserves
              transparency and fairness. We are a pioneering AgriTech team
              committed to ending the information asymmetry that has held back
              millions of small and medium-scale farmers for years.
            </p>
            <p className="mt-4 max-w-3xl text-base text-green-900/80 leading-relaxed">
              We are not building hype. We are building trust so each harvest
              can realize its true value.
            </p>
            <div className="mt-8">
              <Button
                asChild
                size="lg"
                className="bg-green-900 font-semibold text-lime-100 hover:bg-green-800"
              >
                <Link href="/register">
                  Join AgriTrade
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>

          <StaticImageSlot
            title="Image placeholder: Your farmer community story"
            hint="Replace with your own team/farmer impact photo."
            objectPosition="object-[center_42%]"
          />
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 rounded-3xl border border-green-200 bg-white/85 p-6 shadow-sm lg:grid-cols-[1.2fr_0.8fr] lg:gap-8 lg:p-8">
            <div>
              <p className="font-semibold text-green-700 text-sm uppercase tracking-[0.18em]">
                Our Mission
              </p>
              <p className="mt-3 text-base text-green-900/85 leading-relaxed">
                Deliver accurate, timely, and actionable market intelligence
                that empowers every participant in the agricultural supply chain
                to make smarter decisions.
              </p>
            </div>

            <div className="space-y-3">
              {missionPillars.map((pillar) => (
                <div
                  key={pillar}
                  className="flex items-start gap-3 rounded-xl border border-lime-200/80 bg-lime-50/70 px-4 py-3"
                >
                  <Sprout className="mt-0.5 size-4 shrink-0 text-green-700" />
                  <p className="font-medium text-green-900 text-sm sm:text-base">
                    {pillar}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div className="space-y-4">
              <p className="font-semibold text-green-700 text-sm uppercase tracking-[0.18em]">
                The Challenges We Solve
              </p>
              <h2 className="font-semibold text-3xl text-green-950 leading-tight sm:text-4xl">
                Farmers deserve decisions based on facts, not uncertainty.
              </h2>
              <p className="text-base text-green-900/85 leading-relaxed">
                For too long, agricultural decisions have been shaped by delayed
                information, weak negotiating power, and fragmented market
                visibility.
              </p>
              <StoryImageSlot
                title="Image placeholder: Market pressure in the field"
                hint="Replace with a real scene that reflects pricing pressure and uncertainty."
                images={challengeSlotImages}
              />
            </div>

            <div className="grid gap-4">
              {challengeCards.map((card) => {
                const Icon = card.icon;

                return (
                  <article
                    key={card.title}
                    className="rounded-2xl border border-green-200/85 bg-white/90 p-5 shadow-sm"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-green-900 p-2 text-lime-100">
                        <Icon className="size-4" />
                      </div>
                      <h3 className="font-semibold text-green-950 text-lg">
                        {card.title}
                      </h3>
                    </div>
                    <p className="mt-3 text-green-900/85 text-sm leading-relaxed sm:text-base">
                      {card.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-green-900/10 bg-green-950 px-6 py-8 text-green-50 shadow-lg sm:px-8 sm:py-10">
            <p className="font-semibold text-lime-200 text-sm uppercase tracking-[0.18em]">
              Breakthrough Solution
            </p>
            <h2 className="mt-3 max-w-3xl font-semibold text-3xl text-white leading-tight sm:text-4xl">
              A neutral data platform that helps every actor move smarter.
            </h2>
            <p className="mt-4 max-w-3xl text-green-100/90 leading-relaxed">
              AgriTrade serves as an independent information hub, not a
              marketplace operator. We provide the intelligence and tools that
              reduce uncertainty across the supply chain.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {solutionCards.map((card) => {
                const Icon = card.icon;

                return (
                  <article
                    key={card.title}
                    className="rounded-2xl border border-green-700/60 bg-green-900/60 p-5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-lime-300 p-2 text-green-950">
                        <Icon className="size-4" />
                      </div>
                      <h3 className="font-semibold text-base text-lime-100 sm:text-lg">
                        {card.title}
                      </h3>
                    </div>
                    <p className="mt-3 text-green-100/90 text-sm leading-relaxed">
                      {card.description}
                    </p>
                  </article>
                );
              })}
            </div>

            <div className="mt-6 rounded-2xl border border-lime-200/35 bg-lime-100/10 p-4">
              <p className="font-semibold text-lime-100 text-sm sm:text-base">
                Neutrality commitment: NO TRANSACTIONS are performed on the
                platform.
              </p>
              <p className="mt-2 text-green-100/85 text-sm leading-relaxed">
                Actors self-contact for transactions. AgriTrade exists to make
                information transparent, trusted, and actionable.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-6 pb-16 sm:pt-8 sm:pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div className="rounded-3xl border border-green-200 bg-white/90 p-6 shadow-sm sm:p-8">
              <p className="font-semibold text-green-700 text-sm uppercase tracking-[0.18em]">
                Our Future Vision
              </p>
              <h2 className="mt-3 font-semibold text-3xl text-green-950 leading-tight sm:text-4xl">
                Building a new generation of data-driven farmers.
              </h2>
              <p className="mt-4 text-green-900/85 leading-relaxed">
                We collaborate closely with farmers, cooperatives, traders, and
                government agencies to keep AgriTrade reliable and trusted
                across the regional agricultural community.
              </p>
              <div className="mt-6 space-y-3">
                {futureCommitments.map((commitment) => (
                  <div
                    key={commitment}
                    className="rounded-xl border border-green-200/80 bg-green-50/85 px-4 py-3"
                  >
                    <p className="text-green-900/90 text-sm leading-relaxed sm:text-base">
                      {commitment}
                    </p>
                  </div>
                ))}
              </div>
              <p className="mt-6 font-medium text-green-900">
                Join us as we transform the agricultural supply chain, where
                every harvest realizes its true value.
              </p>
            </div>

            <StaticImageSlot
              title="Image placeholder: Future-ready agriculture"
              hint="Replace with a hopeful image of farmers, cooperatives, or harvest outcomes."
              objectPosition="object-[center_36%]"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
