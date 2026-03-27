import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { DemandSignal } from './types';
import { demandLevelStyles } from './utils';

export function DemandSignalsSection({
  demandSignals,
}: {
  demandSignals: DemandSignal[];
}) {
  return (
    <section className="relative px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="border border-[#d0e6af] bg-white p-5 sm:p-6">
          <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="font-semibold text-2xl sm:text-3xl">
                Commodity demand signals
              </h2>
              <p className="mt-2 max-w-3xl text-[#6e7f5a] text-sm leading-relaxed sm:text-base">
                Buyer interest is inferred from current marketplace data: 24h
                price move, listing status, and available volume.
              </p>
            </div>
            <Badge
              variant="outline"
              className="w-fit border-[#cce4a8] bg-[#f5f8ef] text-[#3d670d] text-xs"
            >
              Derived from existing ASEAN listing data
            </Badge>
          </div>

          <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {demandSignals.length > 0 ? (
              demandSignals.map((signal) => (
                <DemandSignalCard
                  key={`${signal.name}-${signal.region}-${signal.country}`}
                  signal={signal}
                />
              ))
            ) : (
              <Card className="gap-0 rounded-xl border-[#c6dfa0] bg-[#f5f8ef] py-0 text-[#1f3800] shadow-sm sm:col-span-2 xl:col-span-4">
                <CardContent className="px-5 py-8 text-center text-[#6e7f5a]">
                  No demand signal available for the selected filters.
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function DemandSignalCard({ signal }: { signal: DemandSignal }) {
  return (
    <Card className="gap-0 rounded-xl border-[#d0e6af] bg-white py-0 text-[#1f3800] shadow-sm">
      <CardContent className="px-4 py-4 sm:px-5 sm:py-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-semibold text-base leading-tight sm:text-lg">
              {signal.name}
            </p>
            <p className="mt-1 text-[#6e7f5a] text-xs sm:text-sm">
              {signal.region}, {signal.country}
            </p>
          </div>
          <Badge className={cn('text-[11px]', demandLevelStyles[signal.level])}>
            {signal.level}
          </Badge>
        </div>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="font-semibold text-2xl text-[#3d670d] sm:text-3xl">
              {signal.activeBuyers}
            </p>
            <p className="text-[11px] text-[#6e7f5a] uppercase tracking-[0.14em]">
              Active buyers
            </p>
          </div>
          <span
            className={cn(
              'font-semibold text-lg sm:text-xl',
              signal.positive ? 'text-[#5ca508]' : 'text-amber-300'
            )}
          >
            {signal.trend}
          </span>
        </div>

        <div className="mt-4 rounded-lg border border-[#d3e9b4] bg-[#f5f8ef] px-3 py-2.5">
          <p className="font-medium text-[#546a39] text-xs">{signal.status}</p>
          <p className="mt-1 text-[#6e7f5a] text-xs leading-relaxed">
            {signal.insight}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
