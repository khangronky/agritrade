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
    return 'border-emerald-400/35 bg-emerald-500/14 text-emerald-300';
  }

  if (trend === 'down') {
    return 'border-rose-400/35 bg-rose-500/14 text-rose-300';
  }

  return 'border-zinc-500/40 bg-zinc-700/35 text-zinc-300';
}

function toCommodityCode(name: string) {
  const tokens = name
    .trim()
    .split(/\s+/)
    .filter(Boolean);

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
  const seed = name.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
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
    <Card className="gap-0 rounded-3xl border-emerald-400/22 bg-zinc-950/84 py-0 text-zinc-100 shadow-[0_24px_48px_rgba(0,0,0,0.55)]">
      <CardHeader className="px-5 pt-5 pb-4 sm:px-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-xl sm:text-2xl">Live price board</CardTitle>
          <div className="flex items-center gap-2 sm:gap-3">
            <CardDescription className="text-zinc-400 text-xs sm:text-sm">
              Snapshot of featured commodities
            </CardDescription>
            <NativeSelect
              value={selectedCurrency}
              onChange={(event) =>
                onCurrencyChange(event.target.value as CurrencyCode)
              }
              className="h-8 min-w-24 rounded-lg border-emerald-400/22 bg-zinc-950/82 text-zinc-300 text-xs focus-visible:border-emerald-400/55 focus-visible:ring-emerald-400/20"
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
                className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-2 rounded-xl border border-zinc-700/70 bg-zinc-950/76 px-3 py-2.5"
              >
                <div className="min-w-0">
                  <p className="font-semibold tracking-[0.08em] text-zinc-100">
                    {code}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-zinc-400">{row.name}</p>
                </div>

                <div className="text-right">
                  <p className="font-semibold text-base tabular-nums text-emerald-200">
                    {formatPriceByCurrency(row.priceVnd, activeCurrency)}
                  </p>
                  <p className="mt-0.5 text-xs tabular-nums text-zinc-500">
                    Vol {formatVolume(volume)}
                  </p>
                </div>

                <div
                  className={cn(
                    'min-w-[82px] rounded-lg border px-2 py-1 text-right tabular-nums',
                    trendBadgeClass(trend)
                  )}
                >
                  <p className="font-semibold text-sm leading-tight">
                    {formatAbsoluteDelta(row.priceVnd, changePercent, activeCurrency)}
                  </p>
                  <p className="mt-0.5 text-xs font-medium leading-tight">
                    {formatPercent(changePercent)}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="rounded-xl border border-zinc-700/70 bg-zinc-900/82 px-4 py-5 text-center text-zinc-400 text-sm">
            No featured commodities available right now.
          </div>
        )}

        <div className="mt-3 flex items-center justify-between text-zinc-400 text-xs sm:text-sm">
          <p>Reference pricing in {activeCurrency.code}</p>
          <p className="inline-flex items-center gap-2 font-medium text-emerald-300">
            <span className="inline-block size-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.24)]" />
            Live
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
