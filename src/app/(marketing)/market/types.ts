import type { ComponentType } from 'react';

export type PriceRow = {
  name: string;
  priceVnd: number;
  change: string;
  positive: boolean;
};

export type CurrencyCode =
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

export type CurrencyOption = {
  code: CurrencyCode;
  country: string;
  rateFromVnd: number;
  locale: string;
  maxFractionDigits: number;
};

export type ListingCard = {
  name: string;
  category: string;
  region: string;
  country: string;
  pricePerKgVnd: number;
  volume: string;
  status: string;
  trend: string;
  positive: boolean;
};

export type DemandLevel = 'High demand' | 'Balanced demand' | 'Soft demand';

export type DemandSignal = {
  name: string;
  region: string;
  country: string;
  trend: string;
  status: string;
  activeBuyers: number;
  level: DemandLevel;
  insight: string;
  positive: boolean;
};

export type MarketTrendPoint = {
  date: string;
  label: string;
  price: number;
  historicalPrice: number | null;
  forecastPrice: number | null;
  forecastUpper: number | null;
  forecastLower: number | null;
  activityVolume: number;
  isForecast: boolean;
};

export type ForecastRegime =
  | 'Trending regime'
  | 'Mean-reverting regime'
  | 'High-volatility regime';

export type AiForecastSummary = {
  modelName: string;
  confidence: number;
  regime: ForecastRegime;
  horizonPeriods: number;
  projectedPrice: number;
  projectedReturnPct: number;
  intervalLow: number;
  intervalHigh: number;
  volatilityPct: number;
  rsi: number;
  emaShort: number;
  emaLong: number;
  reasons: string[];
  recommendation: {
    where: string;
    when: string;
    target: string;
  };
};

export type ExchangeCard = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
};

export type CommodityOption = {
  value: string;
  label: string;
};
