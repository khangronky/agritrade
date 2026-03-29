import { parseTrendPercent } from '@/app/(marketing)/market/data';
import type { ListingCard } from '@/app/(marketing)/market/types';
import { clamp } from '@/utils/percentage-helper';

type ComplianceMetric =
  | 'health'
  | 'ndvi'
  | 'estimatedYield'
  | 'moisture'
  | 'harvestWindow'
  | 'priceMomentum';

type ComparisonDirection = 'min' | 'max';

type ComplianceStandard = {
  health: number;
  ndvi: number;
  estimatedYield: number;
  moisture: number;
  harvestWindowDays: number;
  priceMomentum: number;
};

export type MetricComparison = {
  label: string;
  metric: ComplianceMetric;
  currentValue: string;
  standardValue: string;
  direction: ComparisonDirection;
  met: boolean;
};

export type CropMetric = {
  listing: ListingCard;
  healthScore: number;
  ndvi: number;
  estimatedYield: string;
  moisture: string;
  harvestWindow: string;
  priceTrend: string;
  complianceRate: number;
  comparisons: MetricComparison[];
};

const harvestWindows = ['10-14 days', '2-3 weeks', '18-24 days', '4 weeks'];

const complianceStandardsByCrop: Record<string, ComplianceStandard> = {
  'ST25 Rice': {
    health: 88,
    ndvi: 0.72,
    estimatedYield: 280,
    moisture: 66,
    harvestWindowDays: 14,
    priceMomentum: 0.5,
  },
  'Cat Mango': {
    health: 84,
    ndvi: 0.67,
    estimatedYield: 68,
    moisture: 60,
    harvestWindowDays: 14,
    priceMomentum: 1.2,
  },
  'Mustard Greens': {
    health: 80,
    ndvi: 0.62,
    estimatedYield: 44,
    moisture: 61,
    harvestWindowDays: 21,
    priceMomentum: 0.4,
  },
  Pangasius: {
    health: 82,
    ndvi: 0.66,
    estimatedYield: 62,
    moisture: 64,
    harvestWindowDays: 21,
    priceMomentum: 1,
  },
};

const fallbackStandard: ComplianceStandard = {
  health: 82,
  ndvi: 0.64,
  estimatedYield: 60,
  moisture: 64,
  harvestWindowDays: 21,
  priceMomentum: 0.8,
};

export function buildCropMetrics(items: ListingCard[]): CropMetric[] {
  return items.slice(0, 4).map((listing, index) => {
    const seed = createSeed(
      `${listing.name}-${listing.country}-${listing.region}`
    );
    const trendPercent = parseTrendPercent(listing.trend);
    const volume = Number.parseFloat(listing.volume) || 0;
    const marketMomentum = clamp(trendPercent / 3, -1, 1);
    const logisticsReadiness = clamp(volume / 240, 0.25, 1);
    const statusAdjustment =
      listing.status === 'Contract based'
        ? 0.11
        : listing.status === 'Available now'
          ? 0.05
          : -0.08;

    const vigorBase = clamp(
      0.58 + seed(0.04) + marketMomentum * 0.06 + logisticsReadiness * 0.05,
      0.56,
      0.89
    );
    const healthBase = clamp(
      74 +
        vigorBase * 18 +
        marketMomentum * 5 +
        logisticsReadiness * 4 +
        statusAdjustment * 100 +
        seed(6),
      68,
      97
    );
    const moisturePct = clamp(
      55 + seed(10) + logisticsReadiness * 8 - Math.max(trendPercent, 0) * 1.2,
      54,
      76
    );
    const yieldMultiplier = clamp(
      1.04 +
        vigorBase * 0.1 +
        logisticsReadiness * 0.07 +
        statusAdjustment * 0.22,
      1.01,
      1.24
    );
    const healthScore = Math.round(healthBase);
    const ndvi = Number(vigorBase.toFixed(2));
    const estimatedYieldTons = Math.round(volume * yieldMultiplier);
    const harvestWindow = harvestWindows[index % harvestWindows.length];
    const harvestWindowDays = getHarvestWindowUpperDays(harvestWindow);
    const standards =
      complianceStandardsByCrop[listing.name] ?? fallbackStandard;
    const comparisons: MetricComparison[] = [
      {
        label: 'Health',
        metric: 'health',
        currentValue: `${healthScore}/100`,
        standardValue: `>= ${standards.health}/100`,
        direction: 'min',
        met: healthScore >= standards.health,
      },
      {
        label: 'NDVI / Vigor',
        metric: 'ndvi',
        currentValue: ndvi.toFixed(2),
        standardValue: `>= ${standards.ndvi.toFixed(2)}`,
        direction: 'min',
        met: ndvi >= standards.ndvi,
      },
      {
        label: 'Estimated yield',
        metric: 'estimatedYield',
        currentValue: `${estimatedYieldTons} tons`,
        standardValue: `>= ${standards.estimatedYield} tons`,
        direction: 'min',
        met: estimatedYieldTons >= standards.estimatedYield,
      },
      {
        label: 'Moisture',
        metric: 'moisture',
        currentValue: `${Math.round(moisturePct)}%`,
        standardValue: `<= ${standards.moisture}%`,
        direction: 'max',
        met: moisturePct <= standards.moisture,
      },
      {
        label: 'Harvest window',
        metric: 'harvestWindow',
        currentValue: harvestWindow,
        standardValue: `<= ${formatHarvestWindowStandard(standards.harvestWindowDays)}`,
        direction: 'max',
        met: harvestWindowDays <= standards.harvestWindowDays,
      },
      {
        label: 'Price momentum',
        metric: 'priceMomentum',
        currentValue: listing.trend,
        standardValue: `>= ${formatPercent(standards.priceMomentum)}`,
        direction: 'min',
        met: trendPercent >= standards.priceMomentum,
      },
    ];
    const metCount = comparisons.filter((comparison) => comparison.met).length;
    const complianceRate = Math.round((metCount / comparisons.length) * 100);

    return {
      listing,
      healthScore,
      ndvi,
      estimatedYield: `${estimatedYieldTons} tons`,
      moisture: `${Math.round(moisturePct)}% stable`,
      harvestWindow,
      priceTrend: listing.trend,
      complianceRate,
      comparisons,
    };
  });
}

function getHarvestWindowUpperDays(value: string) {
  const dayMatch = value.match(/(\d+)\s*-\s*(\d+)\s*days/i);

  if (dayMatch) {
    return Number(dayMatch[2]);
  }

  const weekMatch = value.match(/(\d+)\s*-\s*(\d+)\s*weeks/i);

  if (weekMatch) {
    return Number(weekMatch[2]) * 7;
  }

  const singleWeekMatch = value.match(/(\d+)\s*weeks?/i);

  if (singleWeekMatch) {
    return Number(singleWeekMatch[1]) * 7;
  }

  return Number.POSITIVE_INFINITY;
}

function formatHarvestWindowStandard(days: number) {
  if (days % 7 === 0) {
    const weeks = days / 7;
    return `${weeks} week${weeks === 1 ? '' : 's'}`;
  }

  return `${days} days`;
}

function formatPercent(value: number) {
  return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
}

function createSeed(input: string) {
  let hash = 0;

  for (const char of input) {
    hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  }

  return (spread = 1) => {
    hash = (hash * 1664525 + 1013904223) >>> 0;
    return ((hash / 4294967295) * 2 - 1) * spread;
  };
}
