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
    <section className="relative pb-4 sm:pb-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-emerald-200/80 bg-white/55 p-5 shadow-[0_22px_48px_rgba(16,185,129,0.12)] backdrop-blur-sm sm:p-6">
          <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="font-semibold text-2xl sm:text-3xl">
                Commodity demand signals
              </h2>
              <p className="mt-2 max-w-3xl text-slate-600 text-sm leading-relaxed sm:text-base">
                Buyer interest is inferred from current marketplace data: 24h
                price move, listing status, and available volume.
              </p>
            </div>
            <Badge
              variant="outline"
              className="w-fit border-emerald-200 bg-emerald-50 text-emerald-700 text-xs"
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
              <Card className="gap-0 rounded-2xl border-emerald-200 bg-white py-0 text-slate-900 shadow-sm sm:col-span-2 xl:col-span-4">
                <CardContent className="px-5 py-8 text-center text-slate-600">
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
    <Card className="gap-0 rounded-2xl border-emerald-200/80 bg-linear-to-br from-white via-white to-emerald-50/45 py-0 text-slate-900 shadow-sm">
      <CardContent className="px-4 py-4 sm:px-5 sm:py-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-semibold text-base leading-tight sm:text-lg">
              {signal.name}
            </p>
            <p className="mt-1 text-slate-500 text-xs sm:text-sm">
              {signal.region}, {signal.country}
            </p>
          </div>
          <Badge className={cn('text-[11px]', demandLevelStyles[signal.level])}>
            {signal.level}
          </Badge>
        </div>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="font-semibold text-2xl text-emerald-700 sm:text-3xl">
              {signal.activeBuyers}
            </p>
            <p className="text-[11px] text-slate-500 uppercase tracking-[0.14em]">
              Active buyers
            </p>
          </div>
          <span
            className={cn(
              'font-semibold text-lg sm:text-xl',
              signal.positive ? 'text-green-600' : 'text-amber-600'
            )}
          >
            {signal.trend}
          </span>
        </div>

        <div className="mt-4 rounded-xl border border-emerald-100 bg-white/80 px-3 py-2.5">
          <p className="font-medium text-slate-700 text-xs">{signal.status}</p>
          <p className="mt-1 text-slate-600 text-xs leading-relaxed">
            {signal.insight}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
