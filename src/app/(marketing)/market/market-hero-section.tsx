import LivePriceBoard from './live-price-board';
import type { CurrencyCode, CurrencyOption, PriceRow } from './types';

type MarketHeroSectionProps = {
  livePriceRows: PriceRow[];
  selectedCurrency: CurrencyCode;
  aseanCurrencies: CurrencyOption[];
  activeCurrency: CurrencyOption;
  onCurrencyChange: (value: CurrencyCode) => void;
};

export function MarketHeroSection({
  livePriceRows,
  selectedCurrency,
  aseanCurrencies,
  activeCurrency,
  onCurrencyChange,
}: MarketHeroSectionProps) {
  return (
    <section className="relative px-4 py-7 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-305">
        <div className="space-y-8">
          <div>
            <p className="font-semibold text-[11px] text-primary uppercase tracking-[0.22em]">
              * Market
            </p>
            <h1 className="max-w-3xl font-semibold text-3xl leading-tight sm:text-4xl lg:text-5xl">
              AI-powered agriculture market: track prices, forecast trends,
              trade smarter.
            </h1>

            <p className="mt-4 max-w-3xl text-muted-foreground text-sm leading-relaxed sm:text-base">
              AgriTrade combines real-time supply, market analytics, and AI
              forecasting so traders, cooperatives, and businesses can execute
              faster decisions with lower risk.
            </p>
          </div>

          <LivePriceBoard
            livePriceRows={livePriceRows}
            selectedCurrency={selectedCurrency}
            aseanCurrencies={aseanCurrencies}
            activeCurrency={activeCurrency}
            onCurrencyChange={onCurrencyChange}
          />
        </div>
      </div>
    </section>
  );
}
