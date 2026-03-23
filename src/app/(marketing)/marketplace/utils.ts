import type { CurrencyOption, DemandLevel } from './types';

export const demandLevelStyles: Record<DemandLevel, string> = {
  'High demand': 'border-emerald-200 bg-emerald-100 text-emerald-700',
  'Balanced demand': 'border-amber-200 bg-amber-100 text-amber-700',
  'Soft demand': 'border-rose-200 bg-rose-100 text-rose-700',
};

export const priceTrendChartConfig = {
  priceHistorical: {
    label: 'Historical price',
    color: '#16a34a',
  },
  priceForecast: {
    label: 'AI forecast',
    color: '#0ea5e9',
  },
} as const;

export const demandTrendChartConfig = {
  demandHistorical: {
    label: 'Historical demand',
    color: '#84cc16',
  },
  demandForecast: {
    label: 'AI forecast',
    color: '#f59e0b',
  },
} as const;

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
