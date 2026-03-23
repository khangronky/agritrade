'use client';

import { ArrowLeftRight, HandCoins, Zap } from 'lucide-react';
import type { ComponentType } from 'react';
import { useMemo, useState } from 'react';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Input } from '@/components/ui/input';
import {
  NativeSelect,
  NativeSelectOption,
} from '@/components/ui/native-select';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { FarmerYieldStream } from './farmer-yield-stream';

type PriceRow = {
  name: string;
  priceVnd: number;
  change: string;
  positive: boolean;
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

type ListingCard = {
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

type DemandLevel = 'High demand' | 'Balanced demand' | 'Soft demand';

type DemandSignal = {
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

type MarketTrendPoint = {
  label: string;
  priceHistorical: number | null;
  priceForecast: number | null;
  demandHistorical: number | null;
  demandForecast: number | null;
};

type ExchangeCard = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
};

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

const listings: ListingCard[] = [
  {
    name: 'ST25 Rice',
    category: 'Grain',
    region: 'Soc Trang',
    country: 'Vietnam',
    pricePerKgVnd: 15_500,
    volume: '240 tons',
    status: 'Contract based',
    trend: '+0.8%',
    positive: true,
  },
  {
    name: 'Cat Mango',
    category: 'Fruit',
    region: 'Guimaras',
    country: 'Philippines',
    pricePerKgVnd: 34_000,
    volume: '60 tons',
    status: 'Available now',
    trend: '+2.1%',
    positive: true,
  },
  {
    name: 'Mustard Greens',
    category: 'Vegetable',
    region: 'Cameron Highlands',
    country: 'Malaysia',
    pricePerKgVnd: 71_000,
    volume: '40 tons',
    status: 'Needs support',
    trend: '-0.5%',
    positive: false,
  },
  {
    name: 'Pangasius',
    category: 'Aquaculture',
    region: 'Kandal',
    country: 'Cambodia',
    pricePerKgVnd: 28_000,
    volume: '55 tons',
    status: 'Available now',
    trend: '+1.9%',
    positive: true,
  },
  {
    name: 'Jasmine Rice',
    category: 'Grain',
    region: 'Surin',
    country: 'Thailand',
    pricePerKgVnd: 18_200,
    volume: '190 tons',
    status: 'Available now',
    trend: '+1.4%',
    positive: true,
  },
  {
    name: 'Red Chili',
    category: 'Vegetable',
    region: 'West Java',
    country: 'Indonesia',
    pricePerKgVnd: 22_700,
    volume: '72 tons',
    status: 'Available now',
    trend: '+0.6%',
    positive: true,
  },
  {
    name: 'Banana',
    category: 'Fruit',
    region: 'Savannakhet',
    country: 'Laos',
    pricePerKgVnd: 11_300,
    volume: '84 tons',
    status: 'Needs support',
    trend: '-0.3%',
    positive: false,
  },
  {
    name: 'Tilapia',
    category: 'Aquaculture',
    region: 'Ayeyarwady',
    country: 'Myanmar',
    pricePerKgVnd: 26_800,
    volume: '68 tons',
    status: 'Available now',
    trend: '+1.1%',
    positive: true,
  },
];

const demandLevelStyles: Record<DemandLevel, string> = {
  'High demand': 'border-emerald-200 bg-emerald-100 text-emerald-700',
  'Balanced demand': 'border-amber-200 bg-amber-100 text-amber-700',
  'Soft demand': 'border-rose-200 bg-rose-100 text-rose-700',
};

const priceTrendChartConfig = {
  priceHistorical: {
    label: 'Historical price',
    color: '#16a34a',
  },
  priceForecast: {
    label: 'AI forecast',
    color: '#0ea5e9',
  },
} as const;

const demandTrendChartConfig = {
  demandHistorical: {
    label: 'Historical demand',
    color: '#84cc16',
  },
  demandForecast: {
    label: 'AI forecast',
    color: '#f59e0b',
  },
} as const;

function formatPriceByCurrency(priceVnd: number, currency: CurrencyOption) {
  const converted = priceVnd * currency.rateFromVnd;
  return new Intl.NumberFormat(currency.locale, {
    maximumFractionDigits: currency.maxFractionDigits,
  }).format(converted);
}

function formatPricePerKg(priceVnd: number, currency: CurrencyOption) {
  return `${formatPriceByCurrency(priceVnd, currency)} ${currency.code}/kg`;
}

function hashSeed(input: string) {
  return input.split('').reduce((seed, char) => seed + char.charCodeAt(0), 0);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function buildMarketTrendData(
  listing: ListingCard,
  currency: CurrencyOption
): MarketTrendPoint[] {
  const historicalPoints = 8;
  const forecastPoints = 4;
  const totalPoints = historicalPoints + forecastPoints;
  const seed = hashSeed(`${listing.name}-${listing.country}`);
  const trendPct = parseTrendPercent(listing.trend) / 100;
  const baseDemand = parseVolumeTons(listing.volume);
  const points: MarketTrendPoint[] = [];

  for (let index = 0; index < totalPoints; index += 1) {
    const monthOffset = index - (historicalPoints - 1);
    const date = new Date();
    date.setMonth(date.getMonth() + monthOffset);
    const label = date.toLocaleString('en-US', { month: 'short' });
    const isForecast = monthOffset > 0;

    const wave = Math.sin((index + seed * 0.03) * 1.2) * 0.035;
    const drift = trendPct * monthOffset * (isForecast ? 1.2 : 0.75);

    const priceVnd = listing.pricePerKgVnd * (1 + wave + drift);
    const priceConverted = Number(
      (priceVnd * currency.rateFromVnd).toFixed(currency.maxFractionDigits + 2)
    );

    const demandWave = Math.cos((index + seed * 0.02) * 0.95) * 0.12;
    const demandDrift = trendPct * monthOffset * (isForecast ? 1.5 : 0.85);
    const demand = Math.max(
      5,
      Math.round(baseDemand * (1 + demandWave + demandDrift))
    );

    points.push({
      label,
      priceHistorical: isForecast ? null : priceConverted,
      priceForecast:
        isForecast || index === historicalPoints - 1 ? priceConverted : null,
      demandHistorical: isForecast ? null : demand,
      demandForecast:
        isForecast || index === historicalPoints - 1 ? demand : null,
    });
  }

  return points;
}

function parseTrendPercent(trend: string) {
  const parsed = Number.parseFloat(trend.replace('%', ''));
  return Number.isFinite(parsed) ? parsed : 0;
}

function parseVolumeTons(volume: string) {
  const parsed = Number.parseFloat(volume);
  return Number.isFinite(parsed) ? parsed : 0;
}

function buildDemandSignal(listing: ListingCard): DemandSignal {
  const trendPercent = parseTrendPercent(listing.trend);
  const volumeTons = parseVolumeTons(listing.volume);

  const statusScore =
    listing.status === 'Contract based'
      ? 1.8
      : listing.status === 'Available now'
        ? 1
        : -1.4;

  const volumeScore = Math.min(volumeTons / 120, 2);
  const demandScore = trendPercent + statusScore + volumeScore;

  let level: DemandLevel = 'Soft demand';
  if (demandScore >= 4) {
    level = 'High demand';
  } else if (demandScore >= 2) {
    level = 'Balanced demand';
  }

  const activeBuyers = Math.max(
    3,
    Math.round(5 + demandScore * 2 + volumeTons / 70)
  );

  const insight =
    level === 'High demand'
      ? 'Strong buyer competition from momentum and committed orders.'
      : level === 'Balanced demand'
        ? 'Stable bidding activity with healthy transaction potential.'
        : 'Buyer activity is softer; stronger outreach can improve fill speed.';

  return {
    name: listing.name,
    region: listing.region,
    country: listing.country,
    trend: listing.trend,
    status: listing.status,
    activeBuyers,
    level,
    insight,
    positive: listing.positive,
  };
}

const exchangeCards: ExchangeCard[] = [
  {
    icon: ArrowLeftRight,
    title: 'Instant Exchange',
    description:
      'Swap matching lots across regions to optimize load and delivery routes.',
  },
  {
    icon: HandCoins,
    title: 'Pre-Order Contracts',
    description:
      'Lock quantity and delivery windows early to reduce inventory risk.',
  },
  {
    icon: Zap,
    title: 'Fast Transactions',
    description:
      'Confirm within minutes and track lot movement with clear milestones.',
  },
];

type MarketplaceFilterBarProps = {
  searchQuery: string;
  selectedCategory: string;
  selectedCountry: string;
  selectedCurrency: CurrencyCode;
  countries: string[];
  onSearchQueryChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onCountryChange: (value: string) => void;
  onCurrencyChange: (value: CurrencyCode) => void;
  onReset: () => void;
};

function MarketplaceFilterBar({
  searchQuery,
  selectedCategory,
  selectedCountry,
  selectedCurrency,
  countries,
  onSearchQueryChange,
  onCategoryChange,
  onCountryChange,
  onCurrencyChange,
  onReset,
}: MarketplaceFilterBarProps) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
      <Input
        type="text"
        placeholder="Search by commodity"
        value={searchQuery}
        onChange={(event) => onSearchQueryChange(event.target.value)}
        className="h-10 rounded-xl border-emerald-200/90 bg-white/85 text-slate-700 text-xs placeholder:text-slate-400 focus-visible:border-green-500 focus-visible:ring-green-500/20 sm:w-64"
      />
      <NativeSelect
        value={selectedCategory}
        onChange={(event) => onCategoryChange(event.target.value)}
        className="h-10 min-w-40 rounded-xl border-emerald-200/90 bg-white/85 text-slate-700 text-xs focus-visible:border-green-500 focus-visible:ring-green-500/20"
      >
        <NativeSelectOption value="all">
          All listed commodities
        </NativeSelectOption>
        <NativeSelectOption value="grains">Grains</NativeSelectOption>
        <NativeSelectOption value="fruits">Fruits</NativeSelectOption>
        <NativeSelectOption value="vegetables">Vegetables</NativeSelectOption>
        <NativeSelectOption value="aquaculture">Aquaculture</NativeSelectOption>
      </NativeSelect>
      <NativeSelect
        value={selectedCountry}
        onChange={(event) => onCountryChange(event.target.value)}
        className="h-10 min-w-40 rounded-xl border-emerald-200/90 bg-white/85 text-slate-700 text-xs focus-visible:border-green-500 focus-visible:ring-green-500/20"
      >
        <NativeSelectOption value="all">All countries</NativeSelectOption>
        {countries.map((country) => (
          <NativeSelectOption key={country} value={country}>
            {country}
          </NativeSelectOption>
        ))}
      </NativeSelect>
      <NativeSelect
        value={selectedCurrency}
        onChange={(event) =>
          onCurrencyChange(event.target.value as CurrencyCode)
        }
        className="h-10 min-w-36 rounded-xl border-emerald-200/90 bg-white/85 text-slate-700 text-xs focus-visible:border-green-500 focus-visible:ring-green-500/20"
      >
        {aseanCurrencies.map((currency) => (
          <NativeSelectOption key={currency.code} value={currency.code}>
            {currency.code}
          </NativeSelectOption>
        ))}
      </NativeSelect>
      <Button
        variant="outline"
        size="sm"
        onClick={onReset}
        className="h-10 rounded-xl border-emerald-300/90 bg-white/90 text-emerald-800 text-xs hover:bg-emerald-50"
      >
        Reset
      </Button>
    </div>
  );
}

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>('VND');
  const [selectedCommodity, setSelectedCommodity] = useState('auto');

  const countries = useMemo(
    () =>
      Array.from(new Set(listings.map((listing) => listing.country))).sort(
        (a, b) => a.localeCompare(b)
      ),
    []
  );

  const activeCurrency =
    aseanCurrencies.find((currency) => currency.code === selectedCurrency) ??
    aseanCurrencies[0];

  const filteredListings = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return listings.filter((listing) => {
      const matchesCategory =
        selectedCategory === 'all' ||
        (selectedCategory === 'grains' && listing.category === 'Grain') ||
        (selectedCategory === 'fruits' && listing.category === 'Fruit') ||
        (selectedCategory === 'vegetables' &&
          listing.category === 'Vegetable') ||
        (selectedCategory === 'aquaculture' &&
          listing.category === 'Aquaculture');

      const matchesCountry =
        selectedCountry === 'all' || listing.country === selectedCountry;

      const matchesQuery =
        normalizedQuery.length === 0 ||
        listing.name.toLowerCase().includes(normalizedQuery) ||
        listing.region.toLowerCase().includes(normalizedQuery) ||
        listing.country.toLowerCase().includes(normalizedQuery);

      return matchesCategory && matchesCountry && matchesQuery;
    });
  }, [searchQuery, selectedCategory, selectedCountry]);

  const livePriceRows = useMemo<PriceRow[]>(
    () =>
      filteredListings.slice(0, 4).map((listing) => ({
        name: listing.name,
        priceVnd: listing.pricePerKgVnd,
        change: listing.trend,
        positive: listing.positive,
      })),
    [filteredListings]
  );

  const demandSignals = useMemo(
    () => filteredListings.map(buildDemandSignal),
    [filteredListings]
  );

  const commodityOptions = useMemo(
    () =>
      filteredListings.map((listing) => ({
        value: `${listing.name}-${listing.country}`,
        label: `${listing.name} (${listing.country})`,
      })),
    [filteredListings]
  );

  const activeCommodityValue = commodityOptions.some(
    (option) => option.value === selectedCommodity
  )
    ? selectedCommodity
    : 'auto';

  const activeListingForTrend = useMemo(() => {
    if (filteredListings.length === 0) {
      return null;
    }

    if (activeCommodityValue === 'auto') {
      return filteredListings[0];
    }

    return (
      filteredListings.find(
        (listing) =>
          `${listing.name}-${listing.country}` === activeCommodityValue
      ) ?? filteredListings[0]
    );
  }, [filteredListings, activeCommodityValue]);

  const trendTimelineData = useMemo(
    () =>
      activeListingForTrend
        ? buildMarketTrendData(activeListingForTrend, activeCurrency)
        : [],
    [activeListingForTrend, activeCurrency]
  );

  const forecastSummary = useMemo(() => {
    if (!activeListingForTrend || trendTimelineData.length === 0) {
      return null;
    }

    const firstHistoricalPoint =
      trendTimelineData.find((point) => point.priceHistorical !== null) ?? null;
    const lastForecastPoint =
      [...trendTimelineData]
        .reverse()
        .find((point) => point.priceForecast !== null) ?? null;

    if (!firstHistoricalPoint || !lastForecastPoint) {
      return null;
    }

    const priceStart = firstHistoricalPoint.priceHistorical ?? 0;
    const priceEnd = lastForecastPoint.priceForecast ?? priceStart;
    const projectedPriceChange = priceStart
      ? ((priceEnd - priceStart) / priceStart) * 100
      : 0;

    const demandStart = firstHistoricalPoint.demandHistorical ?? 0;
    const demandEnd = lastForecastPoint.demandForecast ?? demandStart;
    const projectedDemandChange = demandStart
      ? ((demandEnd - demandStart) / demandStart) * 100
      : 0;

    const confidence = clamp(
      Math.round(
        68 +
          Math.abs(parseTrendPercent(activeListingForTrend.trend)) * 6 +
          parseVolumeTons(activeListingForTrend.volume) / 25
      ),
      65,
      92
    );

    return {
      projectedPriceChange,
      projectedDemandChange,
      confidence,
    };
  }, [activeListingForTrend, trendTimelineData]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedCountry('all');
    setSelectedCurrency('VND');
    setSelectedCommodity('auto');
  };

  return (
    <div className="relative overflow-hidden bg-linear-to-br from-green-200 via-green-100 to-green-50 text-slate-900 text-sm">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(34,197,94,0.16),transparent_42%),radial-gradient(circle_at_70%_22%,rgba(16,185,129,0.12),transparent_38%),radial-gradient(circle_at_48%_70%,rgba(163,230,53,0.1),transparent_36%)]" />

      <section className="relative border-emerald-200/80 border-b pt-16 pb-12 sm:pt-20 sm:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 xl:grid-cols-2 xl:items-start">
            <div>
              <Badge className="rounded-full border-green-200 bg-green-100 px-3 py-1 text-[11px] text-green-700">
                Reduce waste - Increase transparency - Trade faster
              </Badge>

              <h1 className="mt-5 max-w-xl font-semibold text-3xl leading-tight sm:text-4xl lg:text-5xl">
                A forex for agriculture: see quantity, trade instantly.
              </h1>

              <p className="mt-4 max-w-2xl text-slate-600 text-sm leading-relaxed sm:text-base">
                AgriTrade updates farmer supply in real time so traders,
                businesses, and local communities can buy, exchange, and close
                deals before produce is wasted.
              </p>

              <div className="mt-6 flex flex-wrap gap-2.5">
                <Button className="h-10 rounded-full bg-green-600 px-5 font-semibold text-white text-xs hover:bg-green-700">
                  Create sell order
                </Button>
                <Button
                  variant="outline"
                  className="h-10 rounded-full border-green-300 bg-transparent px-5 font-semibold text-green-800 text-xs"
                >
                  Explore marketplace
                </Button>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div>
                  <p className="font-semibold text-2xl sm:text-3xl">
                    1,248 tons
                  </p>
                  <p className="mt-1 text-slate-500 text-xs sm:text-sm">
                    Available today
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-2xl sm:text-3xl">4,312</p>
                  <p className="mt-1 text-slate-500 text-xs sm:text-sm">
                    Active farmers
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-2xl sm:text-3xl">-23%</p>
                  <p className="mt-1 text-slate-500 text-xs sm:text-sm">
                    Waste reduced
                  </p>
                </div>
              </div>
            </div>

            <Card className="gap-0 rounded-3xl border-emerald-200 bg-white/90 py-0 text-slate-900 shadow-green-100/60 shadow-xl">
              <CardHeader className="px-5 pt-5 pb-4 sm:px-6">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl sm:text-2xl">
                    Live price board
                  </CardTitle>
                  <CardDescription className="text-slate-500 text-xs sm:text-sm">
                    Filtered by country and currency
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-2 px-5 pb-5 sm:px-6 sm:pb-6">
                {livePriceRows.length > 0 ? (
                  livePriceRows.map((row, index) => (
                    <div key={row.name}>
                      <div className="flex items-center justify-between rounded-xl border border-emerald-100 bg-emerald-50/70 px-3 py-2.5 sm:px-4">
                        <p className="font-medium text-sm sm:text-base">
                          {row.name}
                        </p>
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-base sm:text-lg">
                            {formatPriceByCurrency(
                              row.priceVnd,
                              activeCurrency
                            )}{' '}
                            {activeCurrency.code}
                          </span>
                          <span
                            className={cn(
                              'font-semibold text-sm sm:text-base',
                              row.positive ? 'text-green-600' : 'text-amber-600'
                            )}
                          >
                            {row.change}
                          </span>
                        </div>
                      </div>
                      {index < livePriceRows.length - 1 ? (
                        <Separator className="my-2 bg-emerald-100" />
                      ) : null}
                    </div>
                  ))
                ) : (
                  <div className="rounded-xl border border-emerald-100 bg-emerald-50/70 px-4 py-5 text-center text-slate-600 text-sm">
                    No commodities match the current filters.
                  </div>
                )}

                <div className="mt-3 flex items-center justify-between text-slate-500 text-xs sm:text-sm">
                  <p>Reference pricing in {activeCurrency.code}</p>
                  <p className="inline-flex items-center gap-2 font-medium text-green-600">
                    <span className="inline-block size-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.45)]" />
                    Live
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="relative py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-emerald-200/80 bg-white/55 p-5 shadow-[0_22px_48px_rgba(16,185,129,0.12)] backdrop-blur-sm sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="font-semibold text-2xl sm:text-3xl">
                  Market Trend Analysis & Forecasting
                </h2>
                <p className="mt-2 max-w-3xl text-slate-600 text-sm leading-relaxed sm:text-base">
                  Securities-like timeline charts combine historical commodity
                  movement with AI-powered projections for next-cycle price and
                  buyer demand trends.
                </p>
              </div>
              <div className="w-full lg:w-auto">
                <MarketplaceFilterBar
                  searchQuery={searchQuery}
                  selectedCategory={selectedCategory}
                  selectedCountry={selectedCountry}
                  selectedCurrency={selectedCurrency}
                  countries={countries}
                  onSearchQueryChange={setSearchQuery}
                  onCategoryChange={setSelectedCategory}
                  onCountryChange={setSelectedCountry}
                  onCurrencyChange={setSelectedCurrency}
                  onReset={handleResetFilters}
                />
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-slate-500 text-xs sm:text-sm">
                Timeline spans 8 historical periods + 4 AI forecast periods.
              </p>
              <div className="flex items-center gap-2">
                <p className="text-slate-500 text-xs">Commodity view</p>
                <NativeSelect
                  value={activeCommodityValue}
                  onChange={(event) => setSelectedCommodity(event.target.value)}
                  className="h-9 min-w-52 rounded-lg border-emerald-200/90 bg-white/85 text-slate-700 text-xs focus-visible:border-green-500 focus-visible:ring-green-500/20"
                >
                  <NativeSelectOption value="auto">
                    Auto (top matched commodity)
                  </NativeSelectOption>
                  {commodityOptions.map((option) => (
                    <NativeSelectOption key={option.value} value={option.value}>
                      {option.label}
                    </NativeSelectOption>
                  ))}
                </NativeSelect>
              </div>
            </div>

            {activeListingForTrend ? (
              <>
                <div className="mt-6 grid gap-4 lg:grid-cols-2">
                  <Card className="gap-0 rounded-2xl border-emerald-200 bg-white/88 py-0 text-slate-900 shadow-sm">
                    <CardHeader className="px-5 pt-5 pb-2">
                      <CardTitle className="text-lg sm:text-xl">
                        Price timeline ({activeCurrency.code})
                      </CardTitle>
                      <CardDescription>
                        {activeListingForTrend.name} -{' '}
                        {activeListingForTrend.region},{' '}
                        {activeListingForTrend.country}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="px-3 pb-4 sm:px-4">
                      <ChartContainer
                        config={priceTrendChartConfig}
                        className="h-64 w-full"
                      >
                        <LineChart data={trendTimelineData}>
                          <CartesianGrid vertical={false} />
                          <XAxis
                            dataKey="label"
                            tickLine={false}
                            axisLine={false}
                          />
                          <YAxis
                            tickLine={false}
                            axisLine={false}
                            width={60}
                            tickFormatter={(value) => `${value}`}
                          />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <ChartLegend content={<ChartLegendContent />} />
                          <Line
                            type="monotone"
                            dataKey="priceHistorical"
                            stroke="var(--color-priceHistorical)"
                            strokeWidth={2.2}
                            dot={false}
                            name="priceHistorical"
                          />
                          <Line
                            type="monotone"
                            dataKey="priceForecast"
                            stroke="var(--color-priceForecast)"
                            strokeDasharray="6 4"
                            strokeWidth={2.2}
                            dot={false}
                            name="priceForecast"
                          />
                        </LineChart>
                      </ChartContainer>
                    </CardContent>
                  </Card>

                  <Card className="gap-0 rounded-2xl border-emerald-200 bg-white/88 py-0 text-slate-900 shadow-sm">
                    <CardHeader className="px-5 pt-5 pb-2">
                      <CardTitle className="text-lg sm:text-xl">
                        Demand timeline (active buyers)
                      </CardTitle>
                      <CardDescription>
                        Historical demand vs AI demand forecast
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="px-3 pb-4 sm:px-4">
                      <ChartContainer
                        config={demandTrendChartConfig}
                        className="h-64 w-full"
                      >
                        <LineChart data={trendTimelineData}>
                          <CartesianGrid vertical={false} />
                          <XAxis
                            dataKey="label"
                            tickLine={false}
                            axisLine={false}
                          />
                          <YAxis tickLine={false} axisLine={false} width={44} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <ChartLegend content={<ChartLegendContent />} />
                          <Line
                            type="monotone"
                            dataKey="demandHistorical"
                            stroke="var(--color-demandHistorical)"
                            strokeWidth={2.2}
                            dot={false}
                            name="demandHistorical"
                          />
                          <Line
                            type="monotone"
                            dataKey="demandForecast"
                            stroke="var(--color-demandForecast)"
                            strokeDasharray="6 4"
                            strokeWidth={2.2}
                            dot={false}
                            name="demandForecast"
                          />
                        </LineChart>
                      </ChartContainer>
                    </CardContent>
                  </Card>
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <Card className="gap-0 rounded-xl border-emerald-200 bg-white/85 py-0">
                    <CardContent className="px-4 py-4">
                      <p className="text-slate-500 text-xs uppercase tracking-[0.14em]">
                        Predicted price move
                      </p>
                      <p
                        className={cn(
                          'mt-2 font-semibold text-2xl',
                          (forecastSummary?.projectedPriceChange ?? 0) >= 0
                            ? 'text-green-600'
                            : 'text-amber-600'
                        )}
                      >
                        {forecastSummary
                          ? `${forecastSummary.projectedPriceChange.toFixed(1)}%`
                          : '--'}
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="gap-0 rounded-xl border-emerald-200 bg-white/85 py-0">
                    <CardContent className="px-4 py-4">
                      <p className="text-slate-500 text-xs uppercase tracking-[0.14em]">
                        Predicted demand move
                      </p>
                      <p
                        className={cn(
                          'mt-2 font-semibold text-2xl',
                          (forecastSummary?.projectedDemandChange ?? 0) >= 0
                            ? 'text-green-600'
                            : 'text-amber-600'
                        )}
                      >
                        {forecastSummary
                          ? `${forecastSummary.projectedDemandChange.toFixed(1)}%`
                          : '--'}
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="gap-0 rounded-xl border-emerald-200 bg-white/85 py-0">
                    <CardContent className="px-4 py-4">
                      <p className="text-slate-500 text-xs uppercase tracking-[0.14em]">
                        AI confidence
                      </p>
                      <p className="mt-2 font-semibold text-2xl text-emerald-700">
                        {forecastSummary
                          ? `${forecastSummary.confidence}%`
                          : '--'}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </>
            ) : (
              <Card className="mt-6 gap-0 rounded-2xl border-emerald-200 bg-white py-0 text-slate-900 shadow-sm">
                <CardContent className="px-5 py-8 text-center text-slate-600">
                  No timeline data available for current filters.
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      <section className="relative pb-4 sm:pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-emerald-200/80 bg-white/55 p-5 shadow-[0_22px_48px_rgba(16,185,129,0.12)] backdrop-blur-sm sm:p-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h2 className="font-semibold text-2xl sm:text-3xl">
                  Agriculture trading board
                </h2>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {filteredListings.length > 0 ? (
                filteredListings.map((listing) => (
                  <Card
                    key={`${listing.name}-${listing.region}-${listing.country}`}
                    className="group gap-0 overflow-hidden rounded-2xl border-emerald-200/80 bg-linear-to-br from-white via-white to-emerald-50/45 py-0 text-slate-900 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-md"
                  >
                    <CardContent className="px-4 py-4 sm:px-5 sm:py-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-medium text-[11px] text-emerald-700 uppercase tracking-[0.16em]">
                            {listing.category}
                          </p>
                          <p className="mt-1 font-semibold text-base leading-tight sm:text-lg">
                            {listing.name}
                          </p>
                          <p className="mt-1 text-slate-500 text-xs sm:text-sm">
                            {listing.region}, {listing.country}
                          </p>
                        </div>
                        <Badge className="border-green-200 bg-green-100 text-[11px] text-green-700">
                          {listing.status}
                        </Badge>
                      </div>

                      <div className="mt-5 flex items-end justify-between gap-3">
                        <p className="font-semibold text-2xl text-lime-700 sm:text-3xl">
                          {listing.volume}
                        </p>
                        <p className="text-right text-slate-500 text-xs sm:text-sm">
                          {formatPricePerKg(
                            listing.pricePerKgVnd,
                            activeCurrency
                          )}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center justify-between border-emerald-100 border-t pt-3">
                        <p className="text-[11px] text-slate-500 uppercase tracking-[0.14em]">
                          24h move
                        </p>
                        <span
                          className={cn(
                            'font-semibold text-lg sm:text-xl',
                            listing.positive
                              ? 'text-green-600'
                              : 'text-amber-600'
                          )}
                        >
                          {listing.trend}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="gap-0 rounded-2xl border-emerald-200 bg-white py-0 text-slate-900 shadow-sm sm:col-span-2 xl:col-span-4">
                  <CardContent className="px-5 py-8 text-center text-slate-600">
                    No listings found for the selected country/filter.
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="relative pb-4 sm:pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-emerald-200/80 bg-white/55 p-5 shadow-[0_22px_48px_rgba(16,185,129,0.12)] backdrop-blur-sm sm:p-6">
            <div className="flex flex-col gap-2 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="font-semibold text-2xl sm:text-3xl">
                  Commodity demand signals
                </h2>
                <p className="mt-2 max-w-3xl text-slate-600 text-sm leading-relaxed sm:text-base">
                  Buyer interest is inferred from current marketplace data: 24h
                  price move, listing status, and available volume.
                </p>
              </div>
              <Badge
                variant="outline"
                className="w-fit border-emerald-200 bg-emerald-50 text-emerald-700 text-xs"
              >
                Derived from existing ASEAN listing data
              </Badge>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {demandSignals.length > 0 ? (
                demandSignals.map((signal) => (
                  <Card
                    key={`${signal.name}-${signal.region}-${signal.country}`}
                    className="gap-0 rounded-2xl border-emerald-200/80 bg-linear-to-br from-white via-white to-emerald-50/45 py-0 text-slate-900 shadow-sm"
                  >
                    <CardContent className="px-4 py-4 sm:px-5 sm:py-5">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold text-base leading-tight sm:text-lg">
                            {signal.name}
                          </p>
                          <p className="mt-1 text-slate-500 text-xs sm:text-sm">
                            {signal.region}, {signal.country}
                          </p>
                        </div>
                        <Badge
                          className={cn(
                            'text-[11px]',
                            demandLevelStyles[signal.level]
                          )}
                        >
                          {signal.level}
                        </Badge>
                      </div>

                      <div className="mt-4 flex items-end justify-between">
                        <div>
                          <p className="font-semibold text-2xl text-emerald-700 sm:text-3xl">
                            {signal.activeBuyers}
                          </p>
                          <p className="text-[11px] text-slate-500 uppercase tracking-[0.14em]">
                            Active buyers
                          </p>
                        </div>
                        <span
                          className={cn(
                            'font-semibold text-lg sm:text-xl',
                            signal.positive
                              ? 'text-green-600'
                              : 'text-amber-600'
                          )}
                        >
                          {signal.trend}
                        </span>
                      </div>

                      <div className="mt-4 rounded-xl border border-emerald-100 bg-white/80 px-3 py-2.5">
                        <p className="font-medium text-slate-700 text-xs">
                          {signal.status}
                        </p>
                        <p className="mt-1 text-slate-600 text-xs leading-relaxed">
                          {signal.insight}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="gap-0 rounded-2xl border-emerald-200 bg-white py-0 text-slate-900 shadow-sm sm:col-span-2 xl:col-span-4">
                  <CardContent className="px-5 py-8 text-center text-slate-600">
                    No demand signal available for the selected filters.
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-emerald-200/80 border-t py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <h2 className="font-semibold text-2xl sm:text-3xl">
              Exchange & trading market
            </h2>
            <p className="max-w-2xl text-slate-600 text-sm sm:text-base">
              Match lot-based demand: exchange, pre-buy, or lock deliveries by
              season with full visibility.
            </p>
          </div>

          <div className="mt-7 grid gap-4 lg:grid-cols-3">
            {exchangeCards.map((card) => {
              const Icon = card.icon;

              return (
                <Card
                  key={card.title}
                  className="rounded-2xl border-emerald-200 bg-white py-0 text-slate-900 shadow-sm"
                >
                  <CardHeader className="px-5 pt-5 pb-2">
                    <Icon className="size-5 text-lime-600" />
                    <CardTitle className="mt-3 text-lg sm:text-xl">
                      {card.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="px-5 pb-5 text-slate-600 text-sm leading-relaxed">
                    {card.description}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-12 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
            <h2 className="font-semibold text-2xl sm:text-3xl">
              Farmer yield stream
            </h2>
            <p className="max-w-2xl text-slate-600 text-sm sm:text-base">
              Transparent updates: location, quantity, and harvest timing in one
              feed.
            </p>
          </div>

          <div className="mt-6 space-y-3">
            <FarmerYieldStream countryFilter={selectedCountry} />
          </div>
        </div>
      </section>

      <section className="relative px-4 pt-6 pb-14 sm:px-6 sm:pb-16 lg:px-8">
        <Card className="mx-auto max-w-7xl rounded-3xl border-green-200 bg-linear-to-r from-green-100 via-emerald-100/80 to-lime-100 py-0 text-slate-900 shadow-green-100/80 shadow-lg">
          <CardContent className="flex flex-col gap-5 px-6 py-6 sm:px-8 sm:py-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="font-semibold text-2xl leading-tight sm:text-3xl">
                Ready to sell crops today?
              </h2>
              <p className="mt-2 max-w-3xl text-slate-700 text-sm leading-relaxed sm:text-base">
                Create an account to update supply, post sell orders, and
                receive buyer requests in one transparent flow.
              </p>
            </div>

            <Button className="h-10 rounded-full bg-green-600 px-6 font-semibold text-white text-xs shadow-[0_8px_18px_rgba(22,163,74,0.25)] hover:bg-green-700">
              Start for free
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
