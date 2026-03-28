import { parseTrendPercent } from '@/app/(marketing)/market/data';
import type { ListingCard } from '@/app/(marketing)/market/types';
import { clamp } from '@/utils/percentage-helper';

export type CropMetric = {
  listing: ListingCard;
  healthScore: number;
  ndvi: number;
  estimatedYield: string;
  moisture: string;
  harvestWindow: string;
  priceTrend: string;
  complianceRate: number;
};

const harvestWindows = ['10-14 days', '2-3 weeks', '18-24 days', '4 weeks'];

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
    const complianceRate = Math.round(
      clamp(
        healthBase * 0.52 +
          vigorBase * 100 * 0.23 +
          moisturePct * 0.12 +
          logisticsReadiness * 100 * 0.08 +
          statusAdjustment * 100 * 0.05,
        64,
        96
      )
    );

    return {
      listing,
      healthScore: Math.round(healthBase),
      ndvi: Number(vigorBase.toFixed(2)),
      estimatedYield: `${Math.round(volume * yieldMultiplier)} tons`,
      moisture: `${Math.round(moisturePct)}% stable`,
      harvestWindow: harvestWindows[index % harvestWindows.length],
      priceTrend: listing.trend,
      complianceRate,
    };
  });
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
