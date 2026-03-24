'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

type Trend = 'up' | 'down' | 'flat';

type BasePrice = {
  product: string;
  basePriceVnd: number;
};

type PriceRow = {
  product: string;
  priceVnd: number;
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
  { product: 'ST25 Rice', basePriceVnd: 15_500 },
  { product: 'Cat Mango', basePriceVnd: 34_000 },
  { product: 'Mustard Greens', basePriceVnd: 71_000 },
  { product: 'Pangasius', basePriceVnd: 28_000 },
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

function trendClass(trend: Trend) {
  if (trend === 'up') {
    return 'text-emerald-600';
  }

  if (trend === 'down') {
    return 'text-rose-500';
  }

  return 'text-slate-500';
}

function formatPriceByCurrency(priceVnd: number, currency: CurrencyOption) {
  const converted = priceVnd * currency.rateFromVnd;

  return new Intl.NumberFormat(currency.locale, {
    maximumFractionDigits: currency.maxFractionDigits,
  }).format(converted);
}

function formatChange(change: number) {
  const sign = change > 0 ? '+' : '';
  return `${sign}${change.toFixed(1)}%`;
}

function createInitialRows() {
  return basePrices.map((item) => ({
    product: item.product,
    priceVnd: item.basePriceVnd,
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

    return {
      product: row.product,
      priceVnd: stablePrice,
      change: swing,
      trend: getTrend(swing),
    };
  });
}

type LivePriceBoardProps = {
  compact?: boolean;
};

export function LivePriceBoard({ compact = false }: LivePriceBoardProps) {
  const [rows, setRows] = useState<PriceRow[]>(createInitialRows);
  const [currencyCode, setCurrencyCode] = useState<CurrencyCode>('VND');
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
        'rounded-[28px] border border-emerald-200/70 bg-linear-to-br from-white/90 via-emerald-50/75 to-slate-100/85 shadow-[0_18px_42px_rgba(16,185,129,0.16)] backdrop-blur-xl',
        compact ? 'p-3.5 sm:p-4' : 'p-4 sm:p-5'
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <h3
          className={cn(
            'font-semibold text-slate-900',
            compact ? 'text-lg sm:text-xl' : 'text-2xl'
          )}
        >
          Live Price Board
        </h3>
        <div className="space-y-2 text-right">
          <p className={cn('text-slate-500', compact ? 'text-[11px]' : 'text-sm')}>
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
              'rounded-lg border border-emerald-200 bg-white/90 text-slate-800 outline-hidden transition-colors focus:border-emerald-400/70',
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
            key={item.product}
            className={cn(
              'flex items-center justify-between rounded-xl border border-emerald-200/75 bg-linear-to-r from-emerald-50 via-teal-50 to-slate-100',
              compact ? 'px-3 py-2' : 'px-4 py-2.5'
            )}
          >
            <span
              className={cn(
                'font-medium text-slate-800',
                compact ? 'text-sm' : 'text-base'
              )}
            >
              {item.product}
            </span>
            <div className={cn('flex items-center', compact ? 'gap-2' : 'gap-3')}>
              <span
                className={cn(
                  'font-semibold text-slate-800',
                  compact ? 'text-sm' : 'text-base'
                )}
              >
                {formatPriceByCurrency(item.priceVnd, selectedCurrency)}{' '}
                {selectedCurrency.code}
              </span>
              <span
                className={cn(
                  'font-semibold',
                  compact ? 'text-xs' : 'text-sm',
                  trendClass(item.trend)
                )}
              >
                {formatChange(item.change)}
              </span>
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
        <p className="text-slate-500">Reference prices (mock FX rates)</p>
        <div className={cn('flex items-center gap-2 text-emerald-600', compact && 'text-xs')}>
          <span className="inline-block size-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.35)]" />
          Live
        </div>
      </div>
    </div>
  );
}
