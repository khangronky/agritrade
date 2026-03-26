import type { CurrencyOption, DemandLevel } from './types';

export const demandLevelStyles: Record<DemandLevel, string> = {
  'High demand': 'border-emerald-400/40 bg-emerald-500/10 text-emerald-300',
  'Balanced demand': 'border-emerald-400/30 bg-emerald-500/10 text-emerald-200',
  'Soft demand': 'border-zinc-500/45 bg-zinc-800/55 text-zinc-200',
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

