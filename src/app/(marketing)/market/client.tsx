'use client';

import { useMemo, useState } from 'react';
import {
  aseanCurrencies,
  buildCommodityOptions,
  buildDemandSignal,
  buildLivePriceRows,
  buildMarketTrendData,
  exchangeCards,
  listings,
} from './data';
import { DemandSignalsSection } from './demand-signals-section';
import { ExchangeAndYieldSection } from './exchange-and-yield-section';
import { MarketCtaSection } from './market-cta-section';
import { MarketHeroSection } from './market-hero-section';
import { MarketTrendSection } from './market-trend-section';
import { TradingBoardSection } from './trading-board-section';
import type { CommodityOption, CurrencyCode } from './types';

export default function MarketClient() {
  const [trendCurrency, setTrendCurrency] = useState<CurrencyCode>('VND');
  const [marketCurrency, setMarketCurrency] = useState<CurrencyCode>('VND');
  const [selectedCommodity, setSelectedCommodity] = useState('auto');

  const activeTrendCurrency =
    aseanCurrencies.find((currency) => currency.code === trendCurrency) ??
    aseanCurrencies[0];

  const activeMarketCurrency =
    aseanCurrencies.find((currency) => currency.code === marketCurrency) ??
    aseanCurrencies[0];

  const livePriceRows = useMemo(() => buildLivePriceRows(listings), []);

  const demandSignals = useMemo(() => listings.map(buildDemandSignal), []);

  const commodityOptions = useMemo<CommodityOption[]>(
    () => buildCommodityOptions(listings),
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
      <MarketHeroSection
        livePriceRows={livePriceRows}
        selectedCurrency={marketCurrency}
        aseanCurrencies={aseanCurrencies}
        activeCurrency={activeMarketCurrency}
        onCurrencyChange={setMarketCurrency}
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
        <MarketCtaSection />
      </div>
    </>
  );
}
