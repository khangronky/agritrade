import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import type { CurrencyOption, PriceRow } from './types';
import { formatPriceByCurrency } from './utils';

type MarketplaceHeroSectionProps = {
  livePriceRows: PriceRow[];
  activeCurrency: CurrencyOption;
};

export function MarketplaceHeroSection({
  livePriceRows,
  activeCurrency,
}: MarketplaceHeroSectionProps) {
  return (
    <section className="relative border-emerald-200/80 border-b pt-16 pb-12 sm:pt-20 sm:pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 xl:grid-cols-2 xl:items-start">
          <div>
            <Badge className="rounded-full border-green-200 bg-green-100 px-3 py-1 text-[11px] text-green-700">
              Reduce waste - Increase transparency - Trade faster
            </Badge>

            <h1 className="mt-5 max-w-xl font-semibold text-3xl leading-tight sm:text-4xl lg:text-5xl">
              A forex for agriculture: see quantity, trade instantly.
            </h1>

            <p className="mt-4 max-w-2xl text-slate-600 text-sm leading-relaxed sm:text-base">
              AgriTrade updates farmer supply in real time so traders,
              businesses, and local communities can buy, exchange, and close
              deals before produce is wasted.
            </p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              <Button className="h-10 rounded-full bg-green-600 px-5 font-semibold text-white text-xs hover:bg-green-700">
                Create sell order
              </Button>
              <Button
                variant="outline"
                className="h-10 rounded-full border-green-300 bg-transparent px-5 font-semibold text-green-800 text-xs"
              >
                Explore marketplace
              </Button>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div>
                <p className="font-semibold text-2xl sm:text-3xl">1,248 tons</p>
                <p className="mt-1 text-slate-500 text-xs sm:text-sm">
                  Available today
                </p>
              </div>
              <div>
                <p className="font-semibold text-2xl sm:text-3xl">4,312</p>
                <p className="mt-1 text-slate-500 text-xs sm:text-sm">
                  Active farmers
                </p>
              </div>
              <div>
                <p className="font-semibold text-2xl sm:text-3xl">-23%</p>
                <p className="mt-1 text-slate-500 text-xs sm:text-sm">
                  Waste reduced
                </p>
              </div>
            </div>
          </div>

          <LivePriceBoard
            livePriceRows={livePriceRows}
            activeCurrency={activeCurrency}
          />
        </div>
      </div>
    </section>
  );
}

function LivePriceBoard({
  livePriceRows,
  activeCurrency,
}: MarketplaceHeroSectionProps) {
  return (
    <Card className="gap-0 rounded-3xl border-emerald-200 bg-white/90 py-0 text-slate-900 shadow-green-100/60 shadow-xl">
      <CardHeader className="px-5 pt-5 pb-4 sm:px-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl sm:text-2xl">
            Live price board
          </CardTitle>
          <CardDescription className="text-slate-500 text-xs sm:text-sm">
            Filtered by country and currency
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-2 px-5 pb-5 sm:px-6 sm:pb-6">
        {livePriceRows.length > 0 ? (
          livePriceRows.map((row, index) => (
            <div key={row.name}>
              <div className="flex items-center justify-between rounded-xl border border-emerald-100 bg-emerald-50/70 px-3 py-2.5 sm:px-4">
                <p className="font-medium text-sm sm:text-base">{row.name}</p>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-base sm:text-lg">
                    {formatPriceByCurrency(row.priceVnd, activeCurrency)}{' '}
                    {activeCurrency.code}
                  </span>
                  <span
                    className={cn(
                      'font-semibold text-sm sm:text-base',
                      row.positive ? 'text-green-600' : 'text-amber-600'
                    )}
                  >
                    {row.change}
                  </span>
                </div>
              </div>
              {index < livePriceRows.length - 1 ? (
                <Separator className="my-2 bg-emerald-100" />
              ) : null}
            </div>
          ))
        ) : (
          <div className="rounded-xl border border-emerald-100 bg-emerald-50/70 px-4 py-5 text-center text-slate-600 text-sm">
            No commodities match the current filters.
          </div>
        )}

        <div className="mt-3 flex items-center justify-between text-slate-500 text-xs sm:text-sm">
          <p>Reference pricing in {activeCurrency.code}</p>
          <p className="inline-flex items-center gap-2 font-medium text-green-600">
            <span className="inline-block size-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.45)]" />
            Live
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
