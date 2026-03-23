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
  label: string;
  priceHistorical: number | null;
  priceForecast: number | null;
  demandHistorical: number | null;
  demandForecast: number | null;
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

export type ForecastSummary = {
  projectedPriceChange: number;
  projectedDemandChange: number;
  confidence: number;
};
