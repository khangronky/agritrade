import type { CurrencyOption, DemandLevel } from './types';

export const demandLevelStyles: Record<DemandLevel, string> = {
  'High demand': 'border-emerald-400/40 bg-emerald-500/10 text-emerald-300',
  'Balanced demand': 'border-amber-300/40 bg-amber-500/10 text-amber-300',
  'Soft demand': 'border-rose-300/40 bg-rose-500/10 text-rose-300',
};

export const priceTrendChartConfig = {
  priceHistorical: {
    label: 'Historical price',
    color: '#34d399',
  },
  priceForecast: {
    label: 'AI forecast',
    color: '#38bdf8',
  },
} as const;

export const demandTrendChartConfig = {
  demandHistorical: {
    label: 'Historical demand',
    color: '#a3e635',
  },
  demandForecast: {
    label: 'AI forecast',
    color: '#fbbf24',
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

