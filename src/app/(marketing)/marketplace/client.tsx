'use client';

import { ArrowLeftRight, HandCoins, Zap } from 'lucide-react';
import type { Metadata } from 'next';
import { useMemo, useState } from 'react';
import { DemandSignalsSection } from './demand-signals-section';
import { ExchangeAndYieldSection } from './exchange-and-yield-section';
import { MarketTrendSection } from './market-trend-section';
import { MarketplaceCtaSection } from './marketplace-cta-section';
import { MarketplaceHeroSection } from './marketplace-hero-section';
import { TradingBoardSection } from './trading-board-section';
import type {
  AiForecastSummary,
  CommodityOption,
  CurrencyCode,
  CurrencyOption,
  DemandLevel,
  DemandSignal,
  ExchangeCard,
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

function pseudoNoise(seed: number, index: number) {
  const raw = Math.sin(seed * 12.9898 + index * 78.233) * 43758.5453;
  const fraction = raw - Math.floor(raw);
  return fraction * 2 - 1;
}

function mean(values: number[]) {
  if (values.length === 0) {
    return 0;
  }

  return values.reduce((sum, value) => sum + value, 0) / values.length;
}

function standardDeviation(values: number[]) {
  if (values.length < 2) {
    return 0;
  }

  const avg = mean(values);
  const variance =
    values.reduce((sum, value) => sum + (value - avg) ** 2, 0) /
    (values.length - 1);
  return Math.sqrt(variance);
}

function buildEma(values: number[], period: number) {
  if (values.length === 0) {
    return [];
  }

  const alpha = 2 / (period + 1);
  const emaSeries = [values[0]];

  for (let index = 1; index < values.length; index += 1) {
    emaSeries.push(alpha * values[index] + (1 - alpha) * emaSeries[index - 1]);
  }

  return emaSeries;
}

function computeRsi(values: number[], period: number) {
  if (values.length < 2) {
    return 50;
  }

  const startIndex = Math.max(1, values.length - period);
  let gains = 0;
  let losses = 0;

  for (let index = startIndex; index < values.length; index += 1) {
    const delta = values[index] - values[index - 1];
    if (delta >= 0) {
      gains += delta;
    } else {
      losses -= delta;
    }
  }

  const averageGain = gains / period;
  const averageLoss = losses / period;

  if (averageLoss === 0) {
    return 100;
  }

  const relativeStrength = averageGain / averageLoss;
  return 100 - 100 / (1 + relativeStrength);
}

function linearSlopeNormalized(values: number[]) {
  if (values.length < 2) {
    return 0;
  }

  const xMean = (values.length - 1) / 2;
  const yMean = mean(values);
  let numerator = 0;
  let denominator = 0;

  for (let index = 0; index < values.length; index += 1) {
    const deltaX = index - xMean;
    numerator += deltaX * (values[index] - yMean);
    denominator += deltaX * deltaX;
  }

  if (denominator === 0 || yMean === 0) {
    return 0;
  }

  return numerator / denominator / yMean;
}

function holtLinearForecast(
  values: number[],
  horizon: number,
  alpha: number,
  beta: number
) {
  if (values.length === 0) {
    return Array.from({ length: horizon }, () => 0);
  }

  let level = values[0];
  let trend = values.length > 1 ? values[1] - values[0] : 0;

  for (let index = 1; index < values.length; index += 1) {
    const previousLevel = level;
    level = alpha * values[index] + (1 - alpha) * (level + trend);
    trend = beta * (level - previousLevel) + (1 - beta) * trend;
  }

  return Array.from({ length: horizon }, (_, step) =>
    Math.max(500, level + (step + 1) * trend)
  );
}

function formatTrendLabel(date: Date) {
  return date.toLocaleString('en-US', {
    month: 'short',
    year: '2-digit',
  });
}

type TrendModelOutput = {
  points: MarketTrendPoint[];
  aiForecast: AiForecastSummary | null;
};

function buildMarketTrendData(
  listing: ListingCard,
  currency: CurrencyOption
): TrendModelOutput {
  const historicalPoints = 18;
  const forecastPoints = 6;
  const seed = hashSeed(`${listing.name}-${listing.country}`);
  const trendRatio = parseTrendPercent(listing.trend) / 100;
  const baseVolumeTons = parseVolumeTons(listing.volume);
  const baseActivityVolume = Math.max(
    8_000,
    Math.round(baseVolumeTons * 4_200)
  );
  const fractionDigits = currency.maxFractionDigits === 0 ? 0 : 2;
  const convertPrice = (valueVnd: number) =>
    Number((valueVnd * currency.rateFromVnd).toFixed(fractionDigits));

  const historicalPricesVnd: number[] = [];
  const historicalVolumes: number[] = [];

  let evolvingPriceVnd = listing.pricePerKgVnd;
  let previousReturn = trendRatio / 12;

  for (let index = 0; index < historicalPoints; index += 1) {
    const seasonal = 0.012 * Math.sin((index + seed * 0.01) * (Math.PI / 3));
    const volatilityPulse =
      0.009 + Math.abs(Math.sin((index + seed * 0.02) * 0.7)) * 0.018;
    const stochasticShock = pseudoNoise(seed, index + 13) * volatilityPulse;
    const momentum = previousReturn * 0.34;
    const meanReversion =
      -0.08 *
      ((evolvingPriceVnd - listing.pricePerKgVnd) / listing.pricePerKgVnd);
    const drift = trendRatio / historicalPoints;

    const periodReturn = clamp(
      drift + seasonal + momentum + meanReversion + stochasticShock,
      -0.08,
      0.08
    );

    evolvingPriceVnd = Math.max(500, evolvingPriceVnd * (1 + periodReturn));
    previousReturn = periodReturn;
    historicalPricesVnd.push(evolvingPriceVnd);

    const volumeSeasonality = 0.12 * Math.cos((index + seed * 0.015) * 0.9);
    const volumeShock = pseudoNoise(seed, index + 67) * 0.13;
    const volumeMomentum = Math.abs(periodReturn) * 2.5;
    const volumeMultiplier = clamp(
      1 + volumeSeasonality + volumeShock + volumeMomentum,
      0.6,
      1.8
    );

    historicalVolumes.push(
      Math.max(8_000, Math.round(baseActivityVolume * volumeMultiplier))
    );
  }

  const historicalReturns = historicalPricesVnd
    .slice(1)
    .map(
      (price, index) =>
        (price - historicalPricesVnd[index]) / historicalPricesVnd[index]
    );
  const averageReturn = mean(historicalReturns);
  const realizedVolatility = standardDeviation(historicalReturns);
  const annualizedVolatilityPct = realizedVolatility * Math.sqrt(12) * 100;

  const emaShort =
    buildEma(historicalPricesVnd, 5).at(-1) ?? historicalPricesVnd[0];
  const emaLong =
    buildEma(historicalPricesVnd, 10).at(-1) ?? historicalPricesVnd[0];
  const rsi = computeRsi(historicalPricesVnd, 6);
  const trendStrength = linearSlopeNormalized(historicalPricesVnd);

  let regime: AiForecastSummary['regime'] = 'Mean-reverting regime';
  if (realizedVolatility > 0.028) {
    regime = 'High-volatility regime';
  } else if (Math.abs(trendStrength) > 0.0026) {
    regime = 'Trending regime';
  }

  const holtForecastVnd = holtLinearForecast(
    historicalPricesVnd,
    forecastPoints,
    0.46,
    0.3
  );

  const seasonalReturns = historicalReturns.slice(-6);
  const arForecastVnd: number[] = [];
  let arPrice = historicalPricesVnd.at(-1) ?? listing.pricePerKgVnd;
  let arReturn = historicalReturns.at(-1) ?? averageReturn;

  for (let horizon = 0; horizon < forecastPoints; horizon += 1) {
    const seasonalReturn =
      seasonalReturns.length > 0
        ? seasonalReturns[horizon % seasonalReturns.length] * 0.35
        : 0;
    const meanReversionTerm =
      -0.18 * ((arPrice - emaLong) / Math.max(1, emaLong));
    const innovation =
      pseudoNoise(seed, 200 + horizon) * realizedVolatility * 0.45;

    arReturn = clamp(
      0.56 * arReturn +
        0.24 * averageReturn +
        seasonalReturn +
        meanReversionTerm +
        innovation,
      -0.1,
      0.1
    );

    arPrice = Math.max(500, arPrice * (1 + arReturn));
    arForecastVnd.push(arPrice);
  }

  const regimeForecastVnd: number[] = [];
  let regimePrice = historicalPricesVnd.at(-1) ?? listing.pricePerKgVnd;

  for (let horizon = 0; horizon < forecastPoints; horizon += 1) {
    const trendBias =
      regime === 'Trending regime'
        ? trendStrength * (6 + horizon * 0.5)
        : regime === 'Mean-reverting regime'
          ? -0.12 * ((regimePrice - emaLong) / Math.max(1, emaLong))
          : trendStrength * 2.6;
    const volatilityPenalty =
      regime === 'High-volatility regime' ? -realizedVolatility * 0.2 : 0;
    const regimeNoise =
      pseudoNoise(seed, 300 + horizon) * realizedVolatility * 0.35;
    const regimeReturn = clamp(
      averageReturn + trendBias + volatilityPenalty + regimeNoise,
      -0.09,
      0.09
    );

    regimePrice = Math.max(500, regimePrice * (1 + regimeReturn));
    regimeForecastVnd.push(regimePrice);
  }

  const ensembleWeights =
    regime === 'Trending regime'
      ? { holt: 0.5, ar: 0.3, regime: 0.2 }
      : regime === 'High-volatility regime'
        ? { holt: 0.25, ar: 0.4, regime: 0.35 }
        : { holt: 0.3, ar: 0.45, regime: 0.25 };

  const forecastPricesVnd: number[] = [];
  const forecastLowerVnd: number[] = [];
  const forecastUpperVnd: number[] = [];
  const forecastVolumes: number[] = [];

  let evolvingForecastVolume = historicalVolumes.at(-1) ?? baseActivityVolume;
  const forecastSigmaBase =
    Math.max(0.008, realizedVolatility) *
    (regime === 'High-volatility regime' ? 1.35 : 1);

  for (let horizon = 0; horizon < forecastPoints; horizon += 1) {
    const blendedPrice =
      holtForecastVnd[horizon] * ensembleWeights.holt +
      arForecastVnd[horizon] * ensembleWeights.ar +
      regimeForecastVnd[horizon] * ensembleWeights.regime;

    const forecastPriceVnd = Math.max(500, blendedPrice);
    forecastPricesVnd.push(forecastPriceVnd);

    const sigma = forecastSigmaBase * Math.sqrt(horizon + 1);
    forecastLowerVnd.push(Math.max(500, forecastPriceVnd * (1 - 1.64 * sigma)));
    forecastUpperVnd.push(forecastPriceVnd * (1 + 1.64 * sigma));

    const priceReference =
      horizon === 0
        ? (historicalPricesVnd.at(-1) ?? forecastPriceVnd)
        : forecastPricesVnd[horizon - 1];
    const forecastReturn = (forecastPriceVnd - priceReference) / priceReference;
    const forecastVolumeShock = pseudoNoise(seed, 500 + horizon) * 0.08;
    const forecastSeasonality =
      0.1 * Math.sin((horizon + historicalPoints + seed * 0.03) * 1.1);
    const forecastVolumeMultiplier = clamp(
      1 +
        Math.abs(forecastReturn) * 1.8 +
        forecastSeasonality +
        forecastVolumeShock,
      0.72,
      1.42
    );

    evolvingForecastVolume = Math.max(
      8_000,
      Math.round(evolvingForecastVolume * forecastVolumeMultiplier)
    );
    forecastVolumes.push(evolvingForecastVolume);
  }

  const disagreementRatio = mean(
    Array.from({ length: forecastPoints }, (_, horizon) => {
      const sampleMean = mean([
        holtForecastVnd[horizon],
        arForecastVnd[horizon],
        regimeForecastVnd[horizon],
      ]);
      if (sampleMean === 0) {
        return 0;
      }

      const deviations = [
        Math.abs(holtForecastVnd[horizon] - sampleMean),
        Math.abs(arForecastVnd[horizon] - sampleMean),
        Math.abs(regimeForecastVnd[horizon] - sampleMean),
      ];

      return mean(deviations) / sampleMean;
    })
  );
  const modelAgreementScore = 1 - clamp(disagreementRatio / 0.2, 0, 1);

  const directionalConsistency =
    historicalReturns.length < 2
      ? 0.5
      : historicalReturns.slice(1).filter((value, index) => {
          const previousValue = historicalReturns[index];
          return Math.sign(value) === Math.sign(previousValue);
        }).length /
        (historicalReturns.length - 1);

  const confidence = Math.round(
    clamp(
      54 +
        modelAgreementScore * 22 +
        directionalConsistency * 10 +
        clamp(Math.abs(trendStrength) * 1800, 0, 10) -
        clamp(realizedVolatility * 420, 0, 18) -
        (regime === 'High-volatility regime' ? 5 : 0),
      42,
      94
    )
  );

  const projectedPriceVnd =
    forecastPricesVnd.at(-1) ?? historicalPricesVnd.at(-1) ?? 0;
  const currentPriceVnd = historicalPricesVnd.at(-1) ?? projectedPriceVnd;
  const projectedReturnPct =
    currentPriceVnd !== 0
      ? ((projectedPriceVnd - currentPriceVnd) / currentPriceVnd) * 100
      : 0;

  const points: MarketTrendPoint[] = [];

  for (let index = 0; index < historicalPoints; index += 1) {
    const monthOffset = index - (historicalPoints - 1);
    const date = new Date();
    date.setDate(1);
    date.setMonth(date.getMonth() + monthOffset);
    const convertedPrice = convertPrice(historicalPricesVnd[index]);
    const isLastObserved = index === historicalPoints - 1;

    points.push({
      date: date.toISOString(),
      label: formatTrendLabel(date),
      price: convertedPrice,
      historicalPrice: convertedPrice,
      forecastPrice: isLastObserved ? convertedPrice : null,
      forecastUpper: isLastObserved ? convertedPrice : null,
      forecastLower: isLastObserved ? convertedPrice : null,
      activityVolume: historicalVolumes[index],
      isForecast: false,
    });
  }

  for (let horizon = 0; horizon < forecastPoints; horizon += 1) {
    const date = new Date();
    date.setDate(1);
    date.setMonth(date.getMonth() + horizon + 1);

    const convertedForecastPrice = convertPrice(forecastPricesVnd[horizon]);
    points.push({
      date: date.toISOString(),
      label: formatTrendLabel(date),
      price: convertedForecastPrice,
      historicalPrice: null,
      forecastPrice: convertedForecastPrice,
      forecastUpper: convertPrice(forecastUpperVnd[horizon]),
      forecastLower: convertPrice(forecastLowerVnd[horizon]),
      activityVolume: forecastVolumes[horizon],
      isForecast: true,
    });
  }

  return {
    points,
    aiForecast: {
      modelName: 'Ensemble AI (Holt + ARX + Regime)',
      confidence,
      regime,
      horizonPeriods: forecastPoints,
      projectedPrice: convertPrice(projectedPriceVnd),
      projectedReturnPct,
      intervalLow: convertPrice(forecastLowerVnd.at(-1) ?? projectedPriceVnd),
      intervalHigh: convertPrice(forecastUpperVnd.at(-1) ?? projectedPriceVnd),
      volatilityPct: annualizedVolatilityPct,
      rsi,
      emaShort: convertPrice(emaShort),
      emaLong: convertPrice(emaLong),
    },
  };
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

export const metadata: Metadata = {
  title: 'Marketplace',
  description:
    'Explore live market trends, discover demand signals, and trade with confidence on AgriTradeâ€™s transparent agriculture marketplace.',
};

export default function MarketplaceClient() {
  const [trendCurrency, setTrendCurrency] = useState<CurrencyCode>('VND');
  const [marketplaceCurrency, setMarketplaceCurrency] =
    useState<CurrencyCode>('VND');
  const [selectedCommodity, setSelectedCommodity] = useState('auto');

  const activeTrendCurrency =
    aseanCurrencies.find((currency) => currency.code === trendCurrency) ??
    aseanCurrencies[0];

  const activeMarketplaceCurrency =
    aseanCurrencies.find((currency) => currency.code === marketplaceCurrency) ??
    aseanCurrencies[0];

  const livePriceRows = useMemo<PriceRow[]>(
    () =>
      listings.slice(0, 4).map((listing) => ({
        name: listing.name,
        priceVnd: listing.pricePerKgVnd,
        change: listing.trend,
        positive: listing.positive,
      })),
    []
  );

  const demandSignals = useMemo(() => listings.map(buildDemandSignal), []);

  const commodityOptions = useMemo<CommodityOption[]>(
    () =>
      listings.map((listing) => ({
        value: `${listing.name}-${listing.country}`,
        label: `${listing.name} (${listing.country})`,
      })),
    []
  );

  const activeCommodityValue = commodityOptions.some(
    (option) => option.value === selectedCommodity
  )
    ? selectedCommodity
    : 'auto';

  const activeListingForTrend = useMemo(() => {
    if (listings.length === 0) {
      return null;
    }

    if (activeCommodityValue === 'auto') {
      return listings[0];
    }

    return (
      listings.find(
        (listing) =>
          `${listing.name}-${listing.country}` === activeCommodityValue
      ) ?? listings[0]
    );
  }, [activeCommodityValue]);

  const trendTimelineData = useMemo(
    () =>
      activeListingForTrend
        ? buildMarketTrendData(activeListingForTrend, activeTrendCurrency)
        : null,
    [activeListingForTrend, activeTrendCurrency]
  );

  return (
    <>
      <MarketplaceHeroSection
        livePriceRows={livePriceRows}
        selectedCurrency={marketplaceCurrency}
        aseanCurrencies={aseanCurrencies}
        activeCurrency={activeMarketplaceCurrency}
        onCurrencyChange={setMarketplaceCurrency}
      />

      <div className="border-lime-200 border-t">
        <MarketTrendSection
          selectedCurrency={trendCurrency}
          activeCurrency={activeTrendCurrency}
          aseanCurrencies={aseanCurrencies}
          commodityOptions={commodityOptions}
          activeCommodityValue={activeCommodityValue}
          activeListingForTrend={activeListingForTrend}
          trendTimelineData={trendTimelineData?.points ?? []}
          aiForecast={trendTimelineData?.aiForecast ?? null}
          onCurrencyChange={setTrendCurrency}
          onCommodityChange={setSelectedCommodity}
        />
      </div>

      <div className="border-lime-200 border-t">
        <TradingBoardSection
          listings={listings}
          activeCurrency={aseanCurrencies[0]}
        />
      </div>

      <div className="border-lime-200 border-t">
        <DemandSignalsSection demandSignals={demandSignals} />
      </div>

      <div className="border-lime-200 border-t">
        <ExchangeAndYieldSection
          selectedCountry="all"
          exchangeCards={exchangeCards}
        />
      </div>

      <div className="border-lime-200 border-t">
        <MarketplaceCtaSection />
      </div>
    </>
  );
}
