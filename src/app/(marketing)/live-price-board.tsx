'use client';

import { useEffect, useState } from 'react';

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
    return 'text-emerald-300';
  }

  if (trend === 'down') {
    return 'text-amber-300';
  }

  return 'text-green-100';
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

export function LivePriceBoard() {
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
    <div className="rounded-3xl border border-lime-100/20 bg-linear-to-br from-green-950/94 via-green-900/70 to-green-950/94 p-5 shadow-[0_20px_50px_rgba(5,30,20,0.45)] backdrop-blur-xl sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-semibold text-2xl text-white">Live Price Board</h3>
        <div className="space-y-2 text-right">
          <p className="text-green-100/85 text-sm">Updated every 5s</p>
          <label className="sr-only" htmlFor="asean-currency">
            Select currency
          </label>
          <select
            id="asean-currency"
            value={currencyCode}
            onChange={(event) =>
              setCurrencyCode(event.target.value as CurrencyCode)
            }
            className="rounded-lg border border-lime-100/25 bg-green-950/70 px-2.5 py-1.5 text-green-50 text-xs outline-hidden transition-colors focus:border-lime-200/60"
          >
            {aseanCurrencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.code} - {currency.country}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {rows.map((item) => (
          <div
            key={item.product}
            className="flex items-center justify-between rounded-xl bg-linear-to-r from-green-900/60 via-green-900/40 to-green-900/60 px-4 py-3"
          >
            <span className="font-medium text-green-50">{item.product}</span>
            <div className="flex items-center gap-3">
              <span className="font-semibold text-green-50">
                {formatPriceByCurrency(item.priceVnd, selectedCurrency)}{' '}
                {selectedCurrency.code}
              </span>
              <span className={`font-semibold ${trendClass(item.trend)}`}>
                {formatChange(item.change)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between text-sm">
        <p className="text-green-100/72">Reference prices (mock FX rates)</p>
        <div className="flex items-center gap-2 text-emerald-300">
          <span className="inline-block size-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.8)]" />
          Live
        </div>
      </div>
    </div>
  );
}
