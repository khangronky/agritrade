'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type Trend = 'up' | 'down' | 'flat';

type BasePrice = {
  code: string;
  product: string;
  subtitle: string;
  basePriceVnd: number;
  baseVolume: number;
};

type PriceRow = {
  code: string;
  product: string;
  subtitle: string;
  priceVnd: number;
  volume: number;
  change: number;
  trend: Trend;
};

type CurrencyCode =
  | 'VND'
  | 'THB'
  | 'SGD'
  | 'MYR'
  | 'IDR'
  | 'PHP'
  | 'KHR'
  | 'LAK'
  | 'MMK'
  | 'BND';

type CurrencyOption = {
  code: CurrencyCode;
  country: string;
  rateFromVnd: number;
  locale: string;
  maxFractionDigits: number;
};

const basePrices: BasePrice[] = [
  {
    code: 'ST25',
    product: 'ST25 Rice',
    subtitle: 'Premium aromatic rice - Soc Trang',
    basePriceVnd: 15_500,
    baseVolume: 1_542_400,
  },
  {
    code: 'CATM',
    product: 'Cat Mango',
    subtitle: 'Fresh export mango - Tien Giang',
    basePriceVnd: 34_000,
    baseVolume: 814_900,
  },
  {
    code: 'MSGR',
    product: 'Mustard Greens',
    subtitle: 'Hydroponic greens - Cameron Highlands',
    basePriceVnd: 71_000,
    baseVolume: 328_750,
  },
  {
    code: 'PANG',
    product: 'Pangasius',
    subtitle: 'Processed fillet grade - Mekong Delta',
    basePriceVnd: 28_000,
    baseVolume: 1_120_300,
  },
];

const aseanCurrencies: CurrencyOption[] = [
  {
    code: 'VND',
    country: 'Vietnam',
    rateFromVnd: 1,
    locale: 'vi-VN',
    maxFractionDigits: 0,
  },
  {
    code: 'THB',
    country: 'Thailand',
    rateFromVnd: 0.0014,
    locale: 'th-TH',
    maxFractionDigits: 2,
  },
  {
    code: 'SGD',
    country: 'Singapore',
    rateFromVnd: 0.000053,
    locale: 'en-SG',
    maxFractionDigits: 2,
  },
  {
    code: 'MYR',
    country: 'Malaysia',
    rateFromVnd: 0.00018,
    locale: 'ms-MY',
    maxFractionDigits: 2,
  },
  {
    code: 'IDR',
    country: 'Indonesia',
    rateFromVnd: 0.62,
    locale: 'id-ID',
    maxFractionDigits: 0,
  },
  {
    code: 'PHP',
    country: 'Philippines',
    rateFromVnd: 0.0023,
    locale: 'en-PH',
    maxFractionDigits: 2,
  },
  {
    code: 'KHR',
    country: 'Cambodia',
    rateFromVnd: 0.17,
    locale: 'km-KH',
    maxFractionDigits: 0,
  },
  {
    code: 'LAK',
    country: 'Laos',
    rateFromVnd: 0.85,
    locale: 'lo-LA',
    maxFractionDigits: 0,
  },
  {
    code: 'MMK',
    country: 'Myanmar',
    rateFromVnd: 0.086,
    locale: 'my-MM',
    maxFractionDigits: 0,
  },
  {
    code: 'BND',
    country: 'Brunei',
    rateFromVnd: 0.000053,
    locale: 'ms-BN',
    maxFractionDigits: 2,
  },
];

const refreshMs = 5_000;

function getTrend(change: number): Trend {
  if (change > 0) {
    return 'up';
  }

  if (change < 0) {
    return 'down';
  }

  return 'flat';
}

function formatPriceByCurrency(priceVnd: number, currency: CurrencyOption) {
  const converted = priceVnd * currency.rateFromVnd;

  return new Intl.NumberFormat(currency.locale, {
    maximumFractionDigits: currency.maxFractionDigits,
  }).format(converted);
}

function formatPercent(change: number) {
  const sign = change > 0 ? '+' : '';
  return `${sign}${change.toFixed(1)}%`;
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

function formatVolume(volume: number) {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  }).format(volume);
}

function createInitialRows() {
  return basePrices.map((item) => ({
    code: item.code,
    product: item.product,
    subtitle: item.subtitle,
    priceVnd: item.basePriceVnd,
    volume: item.baseVolume,
    change: 0,
    trend: 'flat' as const,
  }));
}

function createNextRows(previousRows: PriceRow[]) {
  return previousRows.map((row, index) => {
    const swing = Number((Math.random() * 1.8 - 0.9).toFixed(1));
    const nextPrice = Number((row.priceVnd * (1 + swing / 100)).toFixed(0));
    const floorPrice = basePrices[index].basePriceVnd * 0.7;
    const stablePrice = Math.max(floorPrice, nextPrice);
    const volumeSwing = 1 + (Math.random() * 0.08 - 0.04);
    const nextVolume = Math.max(10_000, Math.round(row.volume * volumeSwing));

    return {
      code: row.code,
      product: row.product,
      subtitle: row.subtitle,
      priceVnd: stablePrice,
      volume: nextVolume,
      change: swing,
      trend: getTrend(swing),
    };
  });
}

type LivePriceBoardProps = {
  compact?: boolean;
  theme?: 'dark' | 'light';
};

function trendBadgeClass(trend: Trend, theme: 'dark' | 'light') {
  if (theme === 'light') {
    if (trend === 'up') {
      return 'border-emerald-300 bg-emerald-100/85 text-emerald-700';
    }

    if (trend === 'down') {
      return 'border-rose-300 bg-rose-100/85 text-rose-700';
    }

    return 'border-zinc-300 bg-zinc-100/80 text-zinc-600';
  }

  if (trend === 'up') {
    return 'border-emerald-400/35 bg-emerald-500/14 text-emerald-300';
  }

  if (trend === 'down') {
    return 'border-rose-400/35 bg-rose-500/14 text-rose-300';
  }

  return 'border-zinc-500/40 bg-zinc-700/35 text-zinc-300';
}

export function LivePriceBoard({
  compact = false,
  theme = 'dark',
}: LivePriceBoardProps) {
  const [rows, setRows] = useState<PriceRow[]>(createInitialRows);
  const [currencyCode, setCurrencyCode] = useState<CurrencyCode>('VND');
  const isLight = theme === 'light';
  const selectedCurrency =
    aseanCurrencies.find((currency) => currency.code === currencyCode) ??
    aseanCurrencies[0];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRows((previousRows) => createNextRows(previousRows));
    }, refreshMs);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className={cn(
        isLight
          ? 'rounded-none border border-lime-200 bg-lime-50 shadow-md transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg'
          : 'rounded-[28px] border border-emerald-500/20 bg-zinc-950/88 shadow-[0_18px_42px_rgba(0,0,0,0.55)] backdrop-blur-xl',
        compact ? 'p-3.5 sm:p-4' : 'p-4 sm:p-5'
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <h3
          className={cn(
            'font-semibold',
            isLight ? 'text-lime-950' : 'text-zinc-100',
            compact ? 'text-lg sm:text-xl' : 'text-2xl'
          )}
        >
          Live Price Board
        </h3>
        <div className="space-y-2 text-right">
          <p
            className={cn(
              isLight ? 'text-muted-foreground' : 'text-zinc-400',
              compact ? 'text-[11px]' : 'text-sm'
            )}
          >
            Updated every 5s
          </p>
          <label className="sr-only" htmlFor="asean-currency">
            Select currency
          </label>
          <select
            id="asean-currency"
            value={currencyCode}
            onChange={(event) =>
              setCurrencyCode(event.target.value as CurrencyCode)
            }
            className={cn(
              isLight
                ? 'rounded-none border border-lime-200 bg-lime-50 text-lime-700 outline-hidden transition-colors focus:border-ring'
                : 'rounded-lg border border-emerald-500/20 bg-zinc-950/82 text-zinc-200 outline-hidden transition-colors focus:border-emerald-400/55',
              compact ? 'px-2 py-1 text-[11px]' : 'px-2.5 py-1.5 text-xs'
            )}
          >
            {aseanCurrencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.code} - {currency.country}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={cn(compact ? 'mt-3 space-y-2' : 'mt-4 space-y-3')}>
        {rows.map((item) => (
          <div
            key={item.code}
            className={cn(
              isLight
                ? 'grid grid-cols-[minmax(0,1fr)_auto_auto] items-center rounded-none border border-lime-200 bg-lime-50 transition-all duration-300 hover:-translate-y-0.5 hover:border-lime-300 hover:bg-lime-50'
                : 'grid grid-cols-[minmax(0,1fr)_auto_auto] items-center rounded-xl border border-zinc-700/70 bg-zinc-950/76',
              compact ? 'gap-1.5 px-2.5 py-2' : 'gap-2 px-3 py-2.5'
            )}
          >
            <div className="min-w-0">
              <p
                className={cn(
                  'font-semibold tracking-[0.08em]',
                  isLight ? 'text-lime-700' : 'text-zinc-100',
                  compact ? 'text-sm' : 'text-base'
                )}
              >
                {item.code}
              </p>
              <p
                className={cn(
                  'mt-0.5 truncate',
                  isLight ? 'text-muted-foreground' : 'text-zinc-400',
                  compact ? 'text-[10px]' : 'text-xs'
                )}
              >
                {item.product}
              </p>
              {!compact ? (
                <p
                  className={cn(
                    'mt-0.5 truncate text-[11px]',
                    isLight ? 'text-muted-foreground' : 'text-zinc-500'
                  )}
                >
                  {item.subtitle}
                </p>
              ) : null}
            </div>

            <div className="text-right">
              <p
                className={cn(
                  'font-semibold tabular-nums',
                  isLight ? 'text-lime-700' : 'text-emerald-200',
                  compact ? 'text-sm' : 'text-base'
                )}
              >
                {formatPriceByCurrency(item.priceVnd, selectedCurrency)}
              </p>
              <p
                className={cn(
                  'mt-0.5 tabular-nums',
                  isLight ? 'text-muted-foreground' : 'text-zinc-500',
                  compact ? 'text-[10px]' : 'text-xs'
                )}
              >
                Vol {formatVolume(item.volume)}
              </p>
            </div>

            <div
              className={cn(
                'rounded-none border text-right tabular-nums',
                compact
                  ? 'w-fit justify-self-end px-1.5 py-0.5'
                  : 'min-w-[82px] px-2 py-1',
                trendBadgeClass(item.trend, theme)
              )}
            >
              <p
                className={cn(
                  'font-semibold leading-tight',
                  compact ? 'text-xs' : 'text-sm'
                )}
              >
                {formatAbsoluteDelta(
                  item.priceVnd,
                  item.change,
                  selectedCurrency
                )}
              </p>
              <p
                className={cn(
                  'mt-0.5 font-medium leading-tight',
                  compact ? 'text-[10px]' : 'text-xs'
                )}
              >
                {formatPercent(item.change)}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div
        className={cn(
          'flex items-center justify-between',
          compact ? 'mt-4 text-xs' : 'mt-5 text-sm'
        )}
      >
        <p className={cn(isLight ? 'text-muted-foreground' : 'text-zinc-400')}>
          Reference prices (mock FX rates)
        </p>
        <div
          className={cn(
            'flex items-center gap-2',
            isLight ? 'text-lime-700' : 'text-emerald-300',
            compact && 'text-xs'
          )}
        >
          <span
            className={cn(
              'inline-block size-2 rounded-full',
              isLight
                ? 'bg-primary shadow-[0_0_8px_rgba(116,189,18,0.45)]'
                : 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.22)]'
            )}
          />
          Live
        </div>
      </div>
    </div>
  );
}
