import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  NativeSelect,
  NativeSelectOption,
} from '@/components/ui/native-select';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import type { CurrencyCode, CurrencyOption, PriceRow } from './types';
import { formatPriceByCurrency } from './utils';

type MarketplaceHeroSectionProps = {
  livePriceRows: PriceRow[];
  selectedCurrency: CurrencyCode;
  aseanCurrencies: CurrencyOption[];
  activeCurrency: CurrencyOption;
  onCurrencyChange: (value: CurrencyCode) => void;
};

export function MarketplaceHeroSection({
  livePriceRows,
  selectedCurrency,
  aseanCurrencies,
  activeCurrency,
  onCurrencyChange,
}: MarketplaceHeroSectionProps) {
  return (
    <section className="relative border-emerald-200/80 border-b pt-16 pb-12 sm:pt-20 sm:pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div>
            <h1 className="max-w-3xl font-semibold text-3xl leading-tight sm:text-4xl lg:text-5xl">
              A forex for agriculture: see quantity, trade instantly.
            </h1>

            <p className="mt-4 max-w-3xl text-slate-600 text-sm leading-relaxed sm:text-base">
              AgriTrade updates farmer supply in real time so traders,
              businesses, and local communities can buy, exchange, and close
              deals before produce is wasted.
            </p>
          </div>

          <LivePriceBoard
            livePriceRows={livePriceRows}
            selectedCurrency={selectedCurrency}
            aseanCurrencies={aseanCurrencies}
            activeCurrency={activeCurrency}
            onCurrencyChange={onCurrencyChange}
          />
        </div>
      </div>
    </section>
  );
}

type LivePriceBoardProps = {
  livePriceRows: PriceRow[];
  selectedCurrency: CurrencyCode;
  aseanCurrencies: CurrencyOption[];
  activeCurrency: CurrencyOption;
  onCurrencyChange: (value: CurrencyCode) => void;
};

function LivePriceBoard({
  livePriceRows,
  selectedCurrency,
  aseanCurrencies,
  activeCurrency,
  onCurrencyChange,
}: LivePriceBoardProps) {
  return (
    <Card className="gap-0 rounded-3xl border-emerald-200 bg-white/90 py-0 text-slate-900 shadow-green-100/60 shadow-xl">
      <CardHeader className="px-5 pt-5 pb-4 sm:px-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-xl sm:text-2xl">
            Live price board
          </CardTitle>
          <div className="flex items-center gap-2 sm:gap-3">
            <CardDescription className="text-slate-500 text-xs sm:text-sm">
              Snapshot of featured commodities
            </CardDescription>
            <NativeSelect
              value={selectedCurrency}
              onChange={(event) =>
                onCurrencyChange(event.target.value as CurrencyCode)
              }
              className="h-8 min-w-24 rounded-lg border-emerald-200/90 bg-white/90 text-slate-700 text-xs focus-visible:border-green-500 focus-visible:ring-green-500/20"
            >
              {aseanCurrencies.map((currency) => (
                <NativeSelectOption key={currency.code} value={currency.code}>
                  {currency.code}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </div>
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
            No featured commodities available right now.
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
