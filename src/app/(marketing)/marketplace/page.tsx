'use client';

import { ArrowLeftRight, HandCoins, Zap } from 'lucide-react';
import { useMemo, useState } from 'react';

import { DemandSignalsSection } from './demand-signals-section';
import { ExchangeAndYieldSection } from './exchange-and-yield-section';
import { MarketTrendSection } from './market-trend-section';
import { MarketplaceCtaSection } from './marketplace-cta-section';
import { MarketplaceHeroSection } from './marketplace-hero-section';
import { TradingBoardSection } from './trading-board-section';
import type {
  CommodityOption,
  CurrencyCode,
  CurrencyOption,
  DemandLevel,
  DemandSignal,
  ExchangeCard,
  ForecastSummary,
  ListingCard,
  MarketTrendPoint,
  PriceRow,
} from './types';

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

  const commodityOptions = useMemo<CommodityOption[]>(
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

  const forecastSummary = useMemo<ForecastSummary | null>(() => {
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

      <MarketplaceHeroSection
        livePriceRows={livePriceRows}
        activeCurrency={activeCurrency}
      />

      <MarketTrendSection
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
        selectedCountry={selectedCountry}
        selectedCurrency={selectedCurrency}
        activeCurrency={activeCurrency}
        countries={countries}
        aseanCurrencies={aseanCurrencies}
        commodityOptions={commodityOptions}
        activeCommodityValue={activeCommodityValue}
        activeListingForTrend={activeListingForTrend}
        trendTimelineData={trendTimelineData}
        forecastSummary={forecastSummary}
        onSearchQueryChange={setSearchQuery}
        onCategoryChange={setSelectedCategory}
        onCountryChange={setSelectedCountry}
        onCurrencyChange={setSelectedCurrency}
        onCommodityChange={setSelectedCommodity}
        onReset={handleResetFilters}
      />

      <TradingBoardSection
        filteredListings={filteredListings}
        activeCurrency={activeCurrency}
      />

      <DemandSignalsSection demandSignals={demandSignals} />

      <ExchangeAndYieldSection
        selectedCountry={selectedCountry}
        exchangeCards={exchangeCards}
      />

      <MarketplaceCtaSection />
    </div>
  );
}
