'use client';

import { useMemo, useState } from 'react';
import {
  aseanCurrencies,
  buildCommodityOptions,
  buildLivePriceRows,
  buildMarketTrendData,
  listings,
} from '@/app/(marketing)/market/data';
import { FarmerYieldStream } from '@/app/(marketing)/market/farmer-yield-stream';
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
          aiForecast={trendData?.aiForecast ?? null}
          onCommodityChange={setSelectedCommodity}
          onCurrencyChange={setTrendCurrency}
        />

        <div className="min-w-0 space-y-6">
          <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
            <LivePriceBoard
              livePriceRows={livePriceRows}
              selectedCurrency={boardCurrency}
              aseanCurrencies={aseanCurrencies}
              activeCurrency={activeBoardCurrency}
              onCurrencyChange={setBoardCurrency}
            />
          </div>

          <div className="rounded-xl border bg-card p-5 shadow-sm sm:p-6">
            <h2 className="font-semibold text-foreground text-xl sm:text-2xl">
              Farmer yield stream
            </h2>

            <div className="mt-6">
              <FarmerYieldStream />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
