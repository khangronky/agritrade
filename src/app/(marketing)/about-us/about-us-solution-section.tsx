import {
  BrainCircuit,
  Globe2,
  Handshake,
  type LucideIcon,
  Scale,
} from 'lucide-react';

interface StoryCard {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const solutionCards: StoryCard[] = [
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

export function AboutUsSolutionSection() {
  return (
    <section className="py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-zinc-700/70 bg-zinc-950/90 px-6 py-8 text-zinc-100 shadow-lg sm:px-8 sm:py-10">
          <p className="font-semibold text-emerald-200 text-sm uppercase tracking-[0.18em]">
            Breakthrough Solution
          </p>
          <h2 className="mt-3 max-w-3xl font-semibold text-3xl text-zinc-100 leading-tight sm:text-4xl">
            A neutral data platform that helps every actor move smarter.
          </h2>
          <p className="mt-4 max-w-3xl text-zinc-200/90 leading-relaxed">
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
                  className="rounded-2xl border border-emerald-500/20 bg-zinc-900/62 p-5"
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg border border-emerald-500/25 bg-emerald-500/16 p-2 text-emerald-200">
                      <Icon className="size-4" />
                    </div>
                    <h3 className="font-semibold text-base text-emerald-200 sm:text-lg">
                      {card.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-zinc-200/90 text-sm leading-relaxed">
                    {card.description}
                  </p>
                </article>
              );
            })}
          </div>

          <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-zinc-900/75 p-4">
            <p className="font-semibold text-emerald-200 text-sm sm:text-base">
              Neutrality commitment: NO TRANSACTIONS are performed on the
              platform.
            </p>
            <p className="mt-2 text-zinc-300/85 text-sm leading-relaxed">
              Actors self-contact for transactions. AgriTrade exists to make
              information transparent, trusted, and actionable.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
