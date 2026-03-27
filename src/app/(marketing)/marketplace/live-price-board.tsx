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
import { cn } from '@/lib/utils';
import type { CurrencyCode, CurrencyOption, PriceRow } from './types';
import { formatPriceByCurrency } from './utils';

interface LivePriceBoardProps {
  livePriceRows: PriceRow[];
  selectedCurrency: CurrencyCode;
  aseanCurrencies: CurrencyOption[];
  activeCurrency: CurrencyOption;
  onCurrencyChange: (value: CurrencyCode) => void;
}

type Trend = 'up' | 'down' | 'flat';

function parsePercent(change: string) {
  const value = Number.parseFloat(change.replace('%', ''));
  return Number.isFinite(value) ? value : 0;
}

function formatPercent(changePercent: number) {
  const sign = changePercent > 0 ? '+' : '';
  return `${sign}${changePercent.toFixed(1)}%`;
}

function formatAbsoluteDelta(
  priceVnd: number,
  changePercent: number,
  currency: CurrencyOption
) {
  const delta = (priceVnd * changePercent * currency.rateFromVnd) / 100;
  const sign = delta > 0 ? '+' : delta < 0 ? '-' : '';
  const fractionDigits = currency.maxFractionDigits === 0 ? 0 : 2;

  return `${sign}${Math.abs(delta).toLocaleString(currency.locale, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  })}`;
}

function getTrend(changePercent: number): Trend {
  if (changePercent > 0) {
    return 'up';
  }

  if (changePercent < 0) {
    return 'down';
  }

  return 'flat';
}

function trendBadgeClass(trend: Trend) {
  if (trend === 'up') {
    return 'border-lime-300 bg-lime-100 text-lime-700';
  }

  if (trend === 'down') {
    return 'border-rose-300 bg-rose-100 text-rose-700';
  }

  return 'border-lime-200 bg-lime-100 text-muted-foreground';
}

function toCommodityCode(name: string) {
  const tokens = name.trim().split(/\s+/).filter(Boolean);

  if (tokens.length === 0) {
    return 'N/A';
  }

  if (tokens[0].length <= 5) {
    return tokens[0].toUpperCase();
  }

  return tokens
    .slice(0, 4)
    .map((token) => token[0])
    .join('')
    .toUpperCase();
}

function estimateVolume(name: string) {
  const seed = name
    .split('')
    .reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return 450_000 + (seed % 3_500_000);
}

function formatVolume(volume: number) {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  }).format(volume);
}

export default function LivePriceBoard({
  livePriceRows,
  selectedCurrency,
  aseanCurrencies,
  activeCurrency,
  onCurrencyChange,
}: LivePriceBoardProps) {
  return (
    <Card className="gap-0 rounded-none border-lime-200 bg-white py-0 text-lime-950 shadow-none">
      <CardHeader className="border-lime-200 border-b px-5 pt-5 pb-4 sm:px-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-xl sm:text-2xl">
            Live price board
          </CardTitle>
          <div className="flex items-center gap-2 sm:gap-3">
            <CardDescription className="text-muted-foreground text-xs sm:text-sm">
              Snapshot of featured commodities
            </CardDescription>
            <NativeSelect
              value={selectedCurrency}
              onChange={(event) =>
                onCurrencyChange(event.target.value as CurrencyCode)
              }
              className="h-8 min-w-24 rounded-md border-lime-200 bg-white text-muted-foreground text-xs focus-visible:border-ring focus-visible:ring-ring/30"
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
          livePriceRows.map((row) => {
            const changePercent = parsePercent(row.change);
            const trend = getTrend(changePercent);
            const code = toCommodityCode(row.name);
            const volume = estimateVolume(row.name);

            return (
              <div
                key={row.name}
                className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-2 rounded-md border border-lime-200 bg-lime-50 px-3 py-2.5"
              >
                <div className="min-w-0">
                  <p className="font-semibold tracking-[0.08em] text-lime-950">
                    {code}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {row.name}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-semibold text-base tabular-nums text-lime-700">
                    {formatPriceByCurrency(row.priceVnd, activeCurrency)}
                  </p>
                  <p className="mt-0.5 text-xs tabular-nums text-muted-foreground">
                    Vol {formatVolume(volume)}
                  </p>
                </div>

                <div
                  className={cn(
                    'w-fit justify-self-end rounded-md border px-1.5 py-1 text-right tabular-nums sm:px-2',
                    trendBadgeClass(trend)
                  )}
                >
                  <p className="font-semibold text-sm leading-tight">
                    {formatAbsoluteDelta(
                      row.priceVnd,
                      changePercent,
                      activeCurrency
                    )}
                  </p>
                  <p className="mt-0.5 text-xs font-medium leading-tight">
                    {formatPercent(changePercent)}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="rounded-lg border border-lime-200 bg-lime-50 px-4 py-5 text-center text-muted-foreground text-sm">
            No featured commodities available right now.
          </div>
        )}

        <div className="mt-3 flex items-center justify-between text-muted-foreground text-xs sm:text-sm">
          <p>Reference pricing in {activeCurrency.code}</p>
          <p className="inline-flex items-center gap-2 font-medium text-lime-700">
            <span className="inline-block size-2 rounded-full bg-primary shadow-[0_0_8px_rgba(116,189,18,0.35)]" />
            Live
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
