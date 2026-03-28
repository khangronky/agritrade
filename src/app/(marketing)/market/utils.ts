import type { CurrencyOption, DemandLevel, MarketTrendPoint } from './types';

export type TimeframeKey = '1D' | '1W' | '1M' | '3M' | '6M' | '1Y' | 'YTD';

export const demandLevelStyles: Record<DemandLevel, string> = {
  'High demand': 'border-lime-300 bg-lime-100 text-lime-700',
  'Balanced demand': 'border-lime-200 bg-lime-100 text-lime-700',
  'Soft demand': 'border-lime-200 bg-lime-100 text-lime-700',
};

export const timeframeOrder: TimeframeKey[] = [
  '1D',
  '1W',
  '1M',
  '3M',
  '6M',
  '1Y',
  'YTD',
];

const timeframePointCount: Record<
  Exclude<TimeframeKey, '1Y' | 'YTD'>,
  number
> = {
  '1D': 3,
  '1W': 5,
  '1M': 7,
  '3M': 9,
  '6M': 11,
};

export function sliceByTimeframe(
  points: MarketTrendPoint[],
  timeframe: TimeframeKey
) {
  if (points.length === 0) {
    return [];
  }

  const observed = points.filter((point) => !point.isForecast);
  const forecast = points.filter((point) => point.isForecast);

  if (observed.length === 0) {
    return points;
  }

  const withForecast = (window: MarketTrendPoint[]) => [...window, ...forecast];

  if (timeframe === '1Y') {
    return withForecast(observed);
  }

  if (timeframe === 'YTD') {
    const currentYear = new Date().getFullYear();
    const ytdSeries = observed.filter((point) => {
      const year = new Date(point.date).getFullYear();
      return year === currentYear;
    });

    if (ytdSeries.length >= 2) {
      return withForecast(ytdSeries);
    }

    return withForecast(observed.slice(-Math.min(6, observed.length)));
  }

  const count = timeframePointCount[timeframe];
  return withForecast(observed.slice(-Math.min(count, observed.length)));
}

export function formatPriceValue(value: number, currency: CurrencyOption) {
  const fractionDigits = currency.maxFractionDigits === 0 ? 0 : 2;
  return value.toLocaleString(currency.locale, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
}

export function formatSignedPriceValue(
  value: number,
  currency: CurrencyOption
) {
  const sign = value > 0 ? '+' : value < 0 ? '-' : '';
  return `${sign}${formatPriceValue(Math.abs(value), currency)}`;
}

export function formatPercentValue(value: number) {
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}

export function formatSignedPercentValue(value: number) {
  const sign = value > 0 ? '+' : value < 0 ? '-' : '';
  return `${sign}${Math.abs(value).toFixed(2)}%`;
}

export function formatVolumeValue(value: number) {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPointDate(dateValue?: string) {
  if (!dateValue) {
    return '--';
  }

  return new Date(dateValue).toLocaleString('en-US', {
    month: 'short',
    year: 'numeric',
  });
}

export function getPriceRange(points: MarketTrendPoint[]) {
  if (points.length === 0) {
    return { min: 0, max: 0 };
  }

  let min = Number.POSITIVE_INFINITY;
  let max = Number.NEGATIVE_INFINITY;

  for (const point of points) {
    min = Math.min(min, point.price);
    max = Math.max(max, point.price);
  }

  return { min, max };
}

export function averageActivity(points: MarketTrendPoint[]) {
  if (points.length === 0) {
    return 0;
  }

  const total = points.reduce((sum, point) => sum + point.activityVolume, 0);
  return Math.round(total / points.length);
}

export function toCommodityCode(name: string) {
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

export function formatPriceByCurrency(
  priceVnd: number,
  currency: CurrencyOption
) {
  const converted = priceVnd * currency.rateFromVnd;
  return new Intl.NumberFormat(currency.locale, {
    maximumFractionDigits: currency.maxFractionDigits,
  }).format(converted);
}

export function formatPricePerKg(priceVnd: number, currency: CurrencyOption) {
  return `${formatPriceByCurrency(priceVnd, currency)} ${currency.code}/kg`;
}
