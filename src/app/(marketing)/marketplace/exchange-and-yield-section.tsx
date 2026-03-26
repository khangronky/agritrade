import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { FarmerYieldStream } from './farmer-yield-stream';
import type { ExchangeCard } from './types';

type ExchangeAndYieldSectionProps = {
  selectedCountry: string;
  exchangeCards: ExchangeCard[];
};

export function ExchangeAndYieldSection({
  selectedCountry,
  exchangeCards,
}: ExchangeAndYieldSectionProps) {
  return (
    <section className="relative border-lime-300/80 border-t py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <h2 className="font-semibold text-2xl sm:text-3xl">
            Exchange & trading market
          </h2>
          <p className="max-w-2xl text-slate-600 text-sm sm:text-base">
            Match lot-based demand: exchange, pre-buy, or lock deliveries by
            season with full visibility.
          </p>
        </div>

        <div className="mt-7 grid gap-4 lg:grid-cols-3">
          {exchangeCards.map((card) => (
            <ExchangeFeatureCard key={card.title} card={card} />
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <h2 className="font-semibold text-2xl sm:text-3xl">
            Farmer yield stream
          </h2>
          <p className="max-w-2xl text-slate-600 text-sm sm:text-base">
            Transparent updates: location, quantity, and harvest timing in one
            feed.
          </p>
        </div>

        <div className="mt-6 space-y-3">
          <FarmerYieldStream countryFilter={selectedCountry} />
        </div>
      </div>
    </section>
  );
}

function ExchangeFeatureCard({ card }: { card: ExchangeCard }) {
  const Icon = card.icon;

  return (
    <Card className="rounded-2xl border-lime-300 bg-white py-0 text-slate-900 shadow-sm">
      <CardHeader className="px-5 pt-5 pb-2">
        <Icon className="size-5 text-lime-600" />
        <CardTitle className="mt-3 text-lg sm:text-xl">{card.title}</CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-5 text-slate-600 text-sm leading-relaxed">
        {card.description}
      </CardContent>
    </Card>
  );
}
