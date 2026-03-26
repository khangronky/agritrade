import { type LucideIcon, Scale, TrendingUp, Waves } from 'lucide-react';
import type { StoryImageFrame } from './story-image-slot';
import { StoryImageSlot } from './story-image-slot';

interface StoryCard {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const challengeCards: StoryCard[] = [
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

export const challengeSlotImages: StoryImageFrame[] = [
  {
    src: '/about-us/slide-5.jpg',
    alt: 'Field conditions showing pressure on farm output.',
  },
  {
    src: '/about-us/slide-6.jpg',
    alt: 'Crop rows reflecting fluctuating demand and pricing.',
  },
  {
    src: '/about-us/slide-7.jpg',
    alt: 'Agricultural production scene highlighting uncertainty.',
  },
  {
    src: '/about-us/slide-8.jpg',
    alt: 'Close-up harvest imagery related to market quality standards.',
  },
];

export function AboutUsChallengesSection() {
  return (
    <section className="py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="space-y-4">
            <p className="font-semibold text-emerald-300 text-sm uppercase tracking-[0.18em]">
              The Challenges We Solve
            </p>
            <h2 className="font-semibold text-3xl text-zinc-100 leading-tight sm:text-4xl">
              Farmers deserve decisions based on facts, not uncertainty.
            </h2>
            <p className="text-base text-zinc-300/90 leading-relaxed">
              For too long, agricultural decisions have been shaped by delayed
              information, weak negotiating power, and fragmented market
              visibility.
            </p>
            <StoryImageSlot images={challengeSlotImages} />
          </div>

          <div className="grid gap-4">
            {challengeCards.map((card) => {
              const Icon = card.icon;

              return (
                <article
                  key={card.title}
                  className="rounded-2xl border border-emerald-500/25 bg-zinc-900/85 p-5 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-emerald-500/20 p-2 text-emerald-200">
                      <Icon className="size-4" />
                    </div>
                    <h3 className="font-semibold text-zinc-100 text-lg">
                      {card.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-zinc-300/90 text-sm leading-relaxed sm:text-base">
                    {card.description}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

