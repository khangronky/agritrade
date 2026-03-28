'use client';

import { useMemo, useState } from 'react';
import {
  aseanCurrencies,
  buildCommodityOptions,
  buildLivePriceRows,
  buildMarketTrendData,
  listings,
} from '@/app/(marketing)/market/data';
import LivePriceBoard from '@/app/(marketing)/market/live-price-board';
import type {
  CommodityOption,
  CurrencyCode,
} from '@/app/(marketing)/market/types';
import CropMetricCard from './crop-metric-card';
import DashboardTrendCard from './dashboard-trend-card';
import { buildCropMetrics } from './data';

export default function DashboardClient() {
  const [trendCurrency, setTrendCurrency] = useState<CurrencyCode>('VND');
  const [boardCurrency, setBoardCurrency] = useState<CurrencyCode>('VND');
  const [selectedCommodity, setSelectedCommodity] = useState('auto');

  const commodityOptions = useMemo<CommodityOption[]>(
    () => buildCommodityOptions(listings),
    []
  );
  const livePriceRows = useMemo(() => buildLivePriceRows(listings), []);
  const cropMetrics = useMemo(() => buildCropMetrics(listings), []);

  const activeTrendCurrency =
    aseanCurrencies.find((currency) => currency.code === trendCurrency) ??
    aseanCurrencies[0];
  const activeBoardCurrency =
    aseanCurrencies.find((currency) => currency.code === boardCurrency) ??
    aseanCurrencies[0];

  const activeCommodityValue = commodityOptions.some(
    (option) => option.value === selectedCommodity
  )
    ? selectedCommodity
    : 'auto';

  const activeListing = useMemo(() => {
    if (activeCommodityValue === 'auto') {
      return listings[0] ?? null;
    }

    return (
      listings.find(
        (listing) =>
          `${listing.name}-${listing.country}` === activeCommodityValue
      ) ??
      listings[0] ??
      null
    );
  }, [activeCommodityValue]);

  const trendData = useMemo(
    () =>
      activeListing
        ? buildMarketTrendData(activeListing, activeTrendCurrency)
        : null,
    [activeListing, activeTrendCurrency]
  );

  return (
    <div className="flex flex-col gap-6">
      <section className="grid gap-4 lg:grid-cols-2 2xl:grid-cols-4">
        {cropMetrics.map((metric) => (
          <CropMetricCard
            key={`${metric.listing.name}-${metric.listing.country}`}
            metric={metric}
          />
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.95fr)]">
        <DashboardTrendCard
          activeListing={activeListing}
          activeCurrency={activeTrendCurrency}
          commodityOptions={commodityOptions}
          selectedCommodity={activeCommodityValue}
          selectedCurrency={trendCurrency}
          trendTimelineData={trendData?.points ?? []}
          onCommodityChange={setSelectedCommodity}
          onCurrencyChange={setTrendCurrency}
        />

        <div className="min-w-0 overflow-hidden rounded-xl border bg-card shadow-sm">
          <LivePriceBoard
            livePriceRows={livePriceRows}
            selectedCurrency={boardCurrency}
            aseanCurrencies={aseanCurrencies}
            activeCurrency={activeBoardCurrency}
            onCurrencyChange={setBoardCurrency}
          />
        </div>
      </section>
    </div>
  );
}
