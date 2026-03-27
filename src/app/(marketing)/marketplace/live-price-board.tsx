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
    return 'border-[#b8d98e] bg-[#eaf7d5] text-[#4e820f]';
  }

  if (trend === 'down') {
    return 'border-rose-300 bg-rose-100 text-rose-700';
  }

  return 'border-[#c7df9f] bg-[#edf7de] text-[#546a39]';
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
    <Card className="gap-0 rounded-3xl border-[#d1e6af] bg-white py-0 text-[#1f3800] shadow-[0_16px_32px_rgba(127,181,44,0.16)]">
      <CardHeader className="px-5 pt-5 pb-4 sm:px-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-xl sm:text-2xl">
            Live price board
          </CardTitle>
          <div className="flex items-center gap-2 sm:gap-3">
            <CardDescription className="text-[#6e7f5a] text-xs sm:text-sm">
              Snapshot of featured commodities
            </CardDescription>
            <NativeSelect
              value={selectedCurrency}
              onChange={(event) =>
                onCurrencyChange(event.target.value as CurrencyCode)
              }
              className="h-8 min-w-24 rounded-lg border-[#d1e6af] bg-white text-[#546a39] text-xs focus-visible:border-[#89c11f] focus-visible:ring-[#9dcb4a]/30"
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
                className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-2 rounded-xl border border-[#d3e9b4] bg-[#f9fef0] px-3 py-2.5"
              >
                <div className="min-w-0">
                  <p className="font-semibold tracking-[0.08em] text-[#1f3800]">
                    {code}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-[#6e7f5a]">
                    {row.name}
                  </p>
                </div>

                <div className="text-right">
                  <p className="font-semibold text-base tabular-nums text-[#3d670d]">
                    {formatPriceByCurrency(row.priceVnd, activeCurrency)}
                  </p>
                  <p className="mt-0.5 text-xs tabular-nums text-[#8a9c72]">
                    Vol {formatVolume(volume)}
                  </p>
                </div>

                <div
                  className={cn(
                    'w-fit justify-self-end rounded-lg border px-1.5 py-1 text-right tabular-nums sm:px-2',
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
          <div className="rounded-xl border border-[#d3e9b4] bg-[#f9fef0] px-4 py-5 text-center text-[#6e7f5a] text-sm">
            No featured commodities available right now.
          </div>
        )}

        <div className="mt-3 flex items-center justify-between text-[#6e7f5a] text-xs sm:text-sm">
          <p>Reference pricing in {activeCurrency.code}</p>
          <p className="inline-flex items-center gap-2 font-medium text-[#4e820f]">
            <span className="inline-block size-2 rounded-full bg-[#73bd12] shadow-[0_0_8px_rgba(116,189,18,0.35)]" />
            Live
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
