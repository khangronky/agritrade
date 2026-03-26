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
    <section className="relative border-emerald-400/30 border-b pt-16 pb-12 sm:pt-20 sm:pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          <div>
            <h1 className="max-w-3xl font-semibold text-3xl leading-tight sm:text-4xl lg:text-5xl">
              AI-powered agriculture marketplace: track prices, forecast trends,
              trade smarter.
            </h1>

            <p className="mt-4 max-w-3xl text-zinc-400 text-sm leading-relaxed sm:text-base">
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
