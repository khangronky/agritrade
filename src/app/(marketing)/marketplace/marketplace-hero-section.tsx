import LivePriceBoard from './live-price-board';
import type { CurrencyCode, CurrencyOption, PriceRow } from './types';

type MarketplaceHeroSectionProps = {
  livePriceRows: PriceRow[];
  selectedCurrency: CurrencyCode;
  aseanCurrencies: CurrencyOption[];
  activeCurrency: CurrencyOption;
  onCurrencyChange: (value: CurrencyCode) => void;
};

export function MarketplaceHeroSection({
  livePriceRows,
  selectedCurrency,
  aseanCurrencies,
  activeCurrency,
  onCurrencyChange,
}: MarketplaceHeroSectionProps) {
  return (
    <section className="relative px-4 py-7 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-305">
        <div className="space-y-8">
          <div>
            <p className="font-semibold text-primary text-[11px] uppercase tracking-[0.22em]">
              * Marketplace
            </p>
            <h1 className="max-w-3xl font-semibold text-3xl leading-tight sm:text-4xl lg:text-5xl">
              AI-powered agriculture marketplace: track prices, forecast trends,
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
