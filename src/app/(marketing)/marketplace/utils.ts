import type { CurrencyOption, DemandLevel } from './types';

export const demandLevelStyles: Record<DemandLevel, string> = {
  'High demand': 'border-[#b5d889] bg-[#edf8dd] text-[#4e820f]',
  'Balanced demand': 'border-[#c6dfa0] bg-[#edf8dd] text-[#3d670d]',
  'Soft demand': 'border-[#c7df9f] bg-[#edf7de] text-[#365608]',
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
