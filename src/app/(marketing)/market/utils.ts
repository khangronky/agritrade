import type { CurrencyOption, DemandLevel } from './types';

export const demandLevelStyles: Record<DemandLevel, string> = {
  'High demand': 'border-lime-300 bg-lime-100 text-lime-700',
  'Balanced demand': 'border-lime-200 bg-lime-100 text-lime-700',
  'Soft demand': 'border-lime-200 bg-lime-100 text-lime-700',
};

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
