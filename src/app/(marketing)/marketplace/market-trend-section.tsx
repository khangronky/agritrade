import type { ReactElement } from 'react';
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Input } from '@/components/ui/input';
import {
  NativeSelect,
  NativeSelectOption,
} from '@/components/ui/native-select';
import { cn } from '@/lib/utils';
import type {
  CommodityOption,
  CurrencyCode,
  CurrencyOption,
  ForecastSummary,
  ListingCard,
  MarketTrendPoint,
} from './types';
import { demandTrendChartConfig, priceTrendChartConfig } from './utils';

type AseanCurrencyOption = {
  code: CurrencyCode;
};

type MarketTrendSectionProps = {
  searchQuery: string;
  selectedCategory: string;
  selectedCountry: string;
  selectedCurrency: CurrencyCode;
  activeCurrency: CurrencyOption;
  countries: string[];
  aseanCurrencies: AseanCurrencyOption[];
  commodityOptions: CommodityOption[];
  activeCommodityValue: string;
  activeListingForTrend: ListingCard | null;
  trendTimelineData: MarketTrendPoint[];
  forecastSummary: ForecastSummary | null;
  onSearchQueryChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onCountryChange: (value: string) => void;
  onCurrencyChange: (value: CurrencyCode) => void;
  onCommodityChange: (value: string) => void;
  onReset: () => void;
};

export function MarketTrendSection({
  searchQuery,
  selectedCategory,
  selectedCountry,
  selectedCurrency,
  activeCurrency,
  countries,
  aseanCurrencies,
  commodityOptions,
  activeCommodityValue,
  activeListingForTrend,
  trendTimelineData,
  forecastSummary,
  onSearchQueryChange,
  onCategoryChange,
  onCountryChange,
  onCurrencyChange,
  onCommodityChange,
  onReset,
}: MarketTrendSectionProps) {
  return (
    <section className="relative py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-emerald-400/22 bg-zinc-950/80 p-5 shadow-[0_22px_48px_rgba(0,0,0,0.55)] backdrop-blur-sm sm:p-6">
          <div className="flex flex-col gap-4">
            <div className="space-y-2">
              <h2 className="font-semibold text-2xl sm:text-3xl">
                Market Trend Analysis & Forecasting
              </h2>
              <p className="max-w-3xl text-zinc-400 text-sm leading-relaxed sm:text-base">
                Securities-like timeline charts combine historical commodity
                movement with AI-powered projections for next-cycle price and
                buyer demand trends.
              </p>
            </div>
            <div className="flex justify-center">
              <MarketplaceFilterBar
                searchQuery={searchQuery}
                selectedCategory={selectedCategory}
                selectedCountry={selectedCountry}
                selectedCurrency={selectedCurrency}
                countries={countries}
                aseanCurrencies={aseanCurrencies}
                onSearchQueryChange={onSearchQueryChange}
                onCategoryChange={onCategoryChange}
                onCountryChange={onCountryChange}
                onCurrencyChange={onCurrencyChange}
                onReset={onReset}
              />
            </div>
          </div>

          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-zinc-400 text-xs sm:text-sm">
              Timeline spans 8 historical periods + 4 AI forecast periods.
            </p>
            <div className="flex items-center gap-2">
              <p className="text-zinc-400 text-xs">Commodity view</p>
              <NativeSelect
                value={activeCommodityValue}
                onChange={(event) => onCommodityChange(event.target.value)}
                className="h-9 min-w-52 rounded-lg border-emerald-400/22 bg-zinc-950/78 text-zinc-300 text-xs focus-visible:border-emerald-400 focus-visible:ring-emerald-400/20"
              >
                <NativeSelectOption value="auto">
                  Auto (top matched commodity)
                </NativeSelectOption>
                {commodityOptions.map((option) => (
                  <NativeSelectOption key={option.value} value={option.value}>
                    {option.label}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </div>
          </div>

          {activeListingForTrend ? (
            <>
              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                <TrendChartCard
                  title={`Price timeline (${activeCurrency.code})`}
                  description={`${activeListingForTrend.name} - ${activeListingForTrend.region}, ${activeListingForTrend.country}`}
                  config={priceTrendChartConfig}
                >
                  <LineChart data={trendTimelineData}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="label" tickLine={false} axisLine={false} />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      width={60}
                      tickFormatter={(value) => `${value}`}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Line
                      type="monotone"
                      dataKey="priceHistorical"
                      stroke="var(--color-priceHistorical)"
                      strokeWidth={2.2}
                      dot={false}
                      name="priceHistorical"
                    />
                    <Line
                      type="monotone"
                      dataKey="priceForecast"
                      stroke="var(--color-priceForecast)"
                      strokeDasharray="6 4"
                      strokeWidth={2.2}
                      dot={false}
                      name="priceForecast"
                    />
                  </LineChart>
                </TrendChartCard>

                <TrendChartCard
                  title="Demand timeline (active buyers)"
                  description="Historical demand vs AI demand forecast"
                  config={demandTrendChartConfig}
                >
                  <LineChart data={trendTimelineData}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="label" tickLine={false} axisLine={false} />
                    <YAxis tickLine={false} axisLine={false} width={44} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <ChartLegend content={<ChartLegendContent />} />
                    <Line
                      type="monotone"
                      dataKey="demandHistorical"
                      stroke="var(--color-demandHistorical)"
                      strokeWidth={2.2}
                      dot={false}
                      name="demandHistorical"
                    />
                    <Line
                      type="monotone"
                      dataKey="demandForecast"
                      stroke="var(--color-demandForecast)"
                      strokeDasharray="6 4"
                      strokeWidth={2.2}
                      dot={false}
                      name="demandForecast"
                    />
                  </LineChart>
                </TrendChartCard>
              </div>

              <ForecastSummaryGrid forecastSummary={forecastSummary} />
            </>
          ) : (
            <Card className="mt-6 gap-0 rounded-2xl border-emerald-400/22 bg-zinc-950/82 py-0 text-zinc-100 shadow-sm">
              <CardContent className="px-5 py-8 text-center text-zinc-400">
                No timeline data available for current filters.
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}

type MarketplaceFilterBarProps = {
  searchQuery: string;
  selectedCategory: string;
  selectedCountry: string;
  selectedCurrency: CurrencyCode;
  countries: string[];
  aseanCurrencies: AseanCurrencyOption[];
  onSearchQueryChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onCountryChange: (value: string) => void;
  onCurrencyChange: (value: CurrencyCode) => void;
  onReset: () => void;
};

function MarketplaceFilterBar({
  searchQuery,
  selectedCategory,
  selectedCountry,
  selectedCurrency,
  countries,
  aseanCurrencies,
  onSearchQueryChange,
  onCategoryChange,
  onCountryChange,
  onCurrencyChange,
  onReset,
}: MarketplaceFilterBarProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <Input
        type="text"
        placeholder="Search by commodity"
        value={searchQuery}
        onChange={(event) => onSearchQueryChange(event.target.value)}
        className="h-10 rounded-xl border-emerald-400/22 bg-zinc-950/78 text-zinc-300 text-xs placeholder:text-zinc-500 focus-visible:border-emerald-400 focus-visible:ring-emerald-400/20 sm:w-64"
      />
      <NativeSelect
        value={selectedCategory}
        onChange={(event) => onCategoryChange(event.target.value)}
        className="h-10 min-w-40 rounded-xl border-emerald-400/22 bg-zinc-950/78 text-zinc-300 text-xs focus-visible:border-emerald-400 focus-visible:ring-emerald-400/20"
      >
        <NativeSelectOption value="all">
          All listed commodities
        </NativeSelectOption>
        <NativeSelectOption value="grains">Grains</NativeSelectOption>
        <NativeSelectOption value="fruits">Fruits</NativeSelectOption>
        <NativeSelectOption value="vegetables">Vegetables</NativeSelectOption>
        <NativeSelectOption value="aquaculture">Aquaculture</NativeSelectOption>
      </NativeSelect>
      <NativeSelect
        value={selectedCountry}
        onChange={(event) => onCountryChange(event.target.value)}
        className="h-10 min-w-40 rounded-xl border-emerald-400/22 bg-zinc-950/78 text-zinc-300 text-xs focus-visible:border-emerald-400 focus-visible:ring-emerald-400/20"
      >
        <NativeSelectOption value="all">All countries</NativeSelectOption>
        {countries.map((country) => (
          <NativeSelectOption key={country} value={country}>
            {country}
          </NativeSelectOption>
        ))}
      </NativeSelect>
      <NativeSelect
        value={selectedCurrency}
        onChange={(event) =>
          onCurrencyChange(event.target.value as CurrencyCode)
        }
        className="h-10 min-w-36 rounded-xl border-emerald-400/22 bg-zinc-950/78 text-zinc-300 text-xs focus-visible:border-emerald-400 focus-visible:ring-emerald-400/20"
      >
        {aseanCurrencies.map((currency) => (
          <NativeSelectOption key={currency.code} value={currency.code}>
            {currency.code}
          </NativeSelectOption>
        ))}
      </NativeSelect>
      <Button
        variant="outline"
        size="sm"
        onClick={onReset}
        className="h-10 rounded-xl border-emerald-400/30 bg-zinc-950/85 text-emerald-200 text-xs hover:bg-zinc-900/75"
      >
        Reset
      </Button>
    </div>
  );
}

type TrendChartCardProps = {
  title: string;
  description: string;
  config: typeof priceTrendChartConfig | typeof demandTrendChartConfig;
  children: ReactElement;
};

function TrendChartCard({
  title,
  description,
  config,
  children,
}: TrendChartCardProps) {
  return (
    <Card className="gap-0 rounded-2xl border-emerald-400/22 bg-zinc-950/82 py-0 text-zinc-100 shadow-sm">
      <CardHeader className="px-5 pt-5 pb-2">
        <CardTitle className="text-lg sm:text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="px-3 pb-4 sm:px-4">
        <ChartContainer config={config} className="h-64 w-full">
          {children}
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

type ForecastMetricCardProps = {
  label: string;
  value: string;
  valueClassName: string;
};

function ForecastMetricCard({
  label,
  value,
  valueClassName,
}: ForecastMetricCardProps) {
  return (
    <Card className="gap-0 rounded-xl border-emerald-400/22 bg-zinc-950/78 py-0">
      <CardContent className="px-4 py-4">
        <p className="text-zinc-400 text-xs uppercase tracking-[0.14em]">
          {label}
        </p>
        <p className={cn('mt-2 font-semibold text-2xl', valueClassName)}>
          {value}
        </p>
      </CardContent>
    </Card>
  );
}

function ForecastSummaryGrid({
  forecastSummary,
}: {
  forecastSummary: ForecastSummary | null;
}) {
  return (
    <div className="mt-4 grid gap-3 sm:grid-cols-3">
      <ForecastMetricCard
        label="Predicted price move"
        value={
          forecastSummary
            ? `${forecastSummary.projectedPriceChange.toFixed(1)}%`
            : '--'
        }
        valueClassName={
          (forecastSummary?.projectedPriceChange ?? 0) >= 0
            ? 'text-emerald-400'
            : 'text-amber-300'
        }
      />
      <ForecastMetricCard
        label="Predicted demand move"
        value={
          forecastSummary
            ? `${forecastSummary.projectedDemandChange.toFixed(1)}%`
            : '--'
        }
        valueClassName={
          (forecastSummary?.projectedDemandChange ?? 0) >= 0
            ? 'text-emerald-400'
            : 'text-amber-300'
        }
      />
      <ForecastMetricCard
        label="AI confidence"
        value={forecastSummary ? `${forecastSummary.confidence}%` : '--'}
        valueClassName="text-emerald-200"
      />
    </div>
  );
}

