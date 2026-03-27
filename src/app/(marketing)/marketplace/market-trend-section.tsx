import { useMemo, useState } from 'react';
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ReferenceLine,
  XAxis,
  YAxis,
} from 'recharts';

import { Card, CardContent } from '@/components/ui/card';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import {
  NativeSelect,
  NativeSelectOption,
} from '@/components/ui/native-select';
import { cn } from '@/lib/utils';
import type {
  AiForecastSummary,
  CommodityOption,
  CurrencyCode,
  CurrencyOption,
  ListingCard,
  MarketTrendPoint,
} from './types';

type AseanCurrencyOption = {
  code: CurrencyCode;
};

type MarketTrendSectionProps = {
  selectedCurrency: CurrencyCode;
  activeCurrency: CurrencyOption;
  aseanCurrencies: AseanCurrencyOption[];
  commodityOptions: CommodityOption[];
  activeCommodityValue: string;
  activeListingForTrend: ListingCard | null;
  trendTimelineData: MarketTrendPoint[];
  aiForecast: AiForecastSummary | null;
  onCurrencyChange: (value: CurrencyCode) => void;
  onCommodityChange: (value: string) => void;
};

type TimeframeKey = '1D' | '1W' | '1M' | '3M' | '6M' | '1Y' | 'YTD';

type MetricItem = {
  label: string;
  value: string;
  valueClassName?: string;
};

const timeframeOrder: TimeframeKey[] = [
  '1D',
  '1W',
  '1M',
  '3M',
  '6M',
  '1Y',
  'YTD',
];

const timeframePointCount: Record<
  Exclude<TimeframeKey, '1Y' | 'YTD'>,
  number
> = {
  '1D': 3,
  '1W': 5,
  '1M': 7,
  '3M': 9,
  '6M': 11,
};

const marketTrendChartConfig = {
  historicalPrice: {
    label: 'Historical price',
    color: '#9ac8ff',
  },
  forecastPrice: {
    label: 'AI forecast',
    color: '#6ee7b7',
  },
  forecastUpper: {
    label: 'Upper bound',
    color: '#4ade80',
  },
  forecastLower: {
    label: 'Lower bound',
    color: '#22c55e',
  },
  volume: {
    label: 'Activity volume',
    color: '#7da8d6',
  },
} as const;

export function MarketTrendSection({
  selectedCurrency,
  activeCurrency,
  aseanCurrencies,
  commodityOptions,
  activeCommodityValue,
  activeListingForTrend,
  trendTimelineData,
  aiForecast,
  onCurrencyChange,
  onCommodityChange,
}: MarketTrendSectionProps) {
  const [timeframe, setTimeframe] = useState<TimeframeKey>('1M');

  const selectedSeries = useMemo(
    () => sliceByTimeframe(trendTimelineData, timeframe),
    [trendTimelineData, timeframe]
  );

  const observedSeries = selectedSeries.filter((point) => !point.isForecast);
  const fullObservedSeries = trendTimelineData.filter(
    (point) => !point.isForecast
  );
  const latestPoint = observedSeries.at(-1) ?? selectedSeries.at(-1) ?? null;
  const previousPoint = observedSeries.at(-2) ?? latestPoint;
  const openPoint = observedSeries[0] ?? latestPoint;
  const absoluteChange =
    latestPoint && previousPoint ? latestPoint.price - previousPoint.price : 0;
  const percentChange =
    previousPoint && previousPoint.price !== 0
      ? (absoluteChange / previousPoint.price) * 100
      : 0;

  const selectedRange = getPriceRange(
    observedSeries.length > 0 ? observedSeries : selectedSeries
  );
  const oneYearRange = getPriceRange(
    fullObservedSeries.length > 0 ? fullObservedSeries : trendTimelineData
  );
  const oneYearStart = fullObservedSeries[0]?.price ?? 0;
  const oneYearEnd = latestPoint?.price ?? oneYearStart;
  const oneYearChange =
    oneYearStart !== 0 ? ((oneYearEnd - oneYearStart) / oneYearStart) * 100 : 0;

  const latestActivityVolume = latestPoint?.activityVolume ?? 0;
  const averageActivityVolume = averageActivity(observedSeries.slice(-3));
  const emaSpread = aiForecast ? aiForecast.emaShort - aiForecast.emaLong : 0;

  const statsColumns: MetricItem[][] = [
    [
      {
        label: 'Previous close',
        value: previousPoint
          ? `${formatPriceValue(previousPoint.price, activeCurrency)} ${activeCurrency.code}`
          : '--',
      },
      {
        label: 'Open',
        value: openPoint
          ? `${formatPriceValue(openPoint.price, activeCurrency)} ${activeCurrency.code}`
          : '--',
      },
      {
        label: '1Y change',
        value: `${formatPercentValue(oneYearChange)}`,
        valueClassName: oneYearChange >= 0 ? 'text-[#4e820f]' : 'text-rose-700',
      },
    ],
    [
      {
        label: 'Activity volume',
        value: latestActivityVolume
          ? formatVolumeValue(latestActivityVolume)
          : '--',
      },
      {
        label: 'Average activity (3 periods)',
        value: averageActivityVolume
          ? formatVolumeValue(averageActivityVolume)
          : '--',
      },
      {
        label: 'AI confidence',
        value: aiForecast ? `${aiForecast.confidence}%` : '--',
        valueClassName: aiForecast ? 'text-[#4e820f]' : undefined,
      },
      {
        label: 'Volatility (annualized)',
        value: aiForecast ? `${aiForecast.volatilityPct.toFixed(2)}%` : '--',
      },
    ],
    [
      {
        label: 'Day range',
        value:
          selectedSeries.length > 0
            ? `${formatPriceValue(selectedRange.min, activeCurrency)} - ${formatPriceValue(
                selectedRange.max,
                activeCurrency
              )}`
            : '--',
      },
      {
        label: '52-week range',
        value:
          trendTimelineData.length > 0
            ? `${formatPriceValue(oneYearRange.min, activeCurrency)} - ${formatPriceValue(
                oneYearRange.max,
                activeCurrency
              )}`
            : '--',
      },
      {
        label: 'RSI (6)',
        value: aiForecast ? aiForecast.rsi.toFixed(1) : '--',
        valueClassName:
          aiForecast && aiForecast.rsi >= 70
            ? 'text-rose-700'
            : aiForecast && aiForecast.rsi <= 30
              ? 'text-[#4e820f]'
              : undefined,
      },
      {
        label: 'EMA spread (5-10)',
        value: aiForecast
          ? `${formatSignedPriceValue(emaSpread, activeCurrency)} ${activeCurrency.code}`
          : '--',
        valueClassName: aiForecast
          ? emaSpread >= 0
            ? 'text-[#4e820f]'
            : 'text-rose-700'
          : undefined,
      },
    ],
  ];

  return (
    <section className="relative px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="border border-[#d0e6af] bg-white p-5 sm:p-6">
          <div className="space-y-2">
            <h2 className="font-semibold text-2xl sm:text-3xl">
              Market Trend Analysis & Forecasting
            </h2>
            <p className="max-w-3xl text-sm text-[#6e7f5a] leading-relaxed sm:text-base">
              Quant-style market panel with algorithmic AI forecasting,
              volatility analysis, and professional market indicators.
            </p>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <NativeSelect
              value={activeCommodityValue}
              onChange={(event) => onCommodityChange(event.target.value)}
              className="h-10 min-w-56 rounded-md border-[#d0e6af] bg-[#f5f8ef] text-xs text-[#546a39] focus-visible:border-[#89c11f] focus-visible:ring-[#9dcb4a]/30"
            >
              <NativeSelectOption value="auto">
                Auto (top commodity)
              </NativeSelectOption>
              {commodityOptions.map((option) => (
                <NativeSelectOption key={option.value} value={option.value}>
                  {option.label}
                </NativeSelectOption>
              ))}
            </NativeSelect>
            <NativeSelect
              value={selectedCurrency}
              onChange={(event) =>
                onCurrencyChange(event.target.value as CurrencyCode)
              }
              className="h-10 min-w-28 rounded-md border-[#d0e6af] bg-[#f5f8ef] text-xs text-[#546a39] focus-visible:border-[#89c11f] focus-visible:ring-[#9dcb4a]/30"
            >
              {aseanCurrencies.map((currency) => (
                <NativeSelectOption key={currency.code} value={currency.code}>
                  {currency.code}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </div>

          {activeListingForTrend && selectedSeries.length > 0 ? (
            <Card className="mt-5 gap-0 rounded-xl border-[#d0e6af] bg-white py-0 text-[#1f3800] shadow-sm">
              <CardContent className="px-4 py-4 sm:px-5 sm:py-5">
                <div>
                  <p className="font-medium text-[11px] text-[#6e7f5a] uppercase tracking-[0.16em]">
                    {activeListingForTrend.name} (
                    {toCommodityCode(activeListingForTrend.name)})
                  </p>
                  <div className="mt-2 flex flex-wrap items-end gap-x-3 gap-y-1">
                    <p className="font-semibold text-4xl leading-none tracking-tight sm:text-5xl">
                      {latestPoint
                        ? formatPriceValue(latestPoint.price, activeCurrency)
                        : '--'}
                    </p>
                    <p
                      className={cn(
                        'pb-1 font-semibold text-xl tabular-nums sm:text-2xl',
                        absoluteChange > 0
                          ? 'text-[#5ca508]'
                          : absoluteChange < 0
                            ? 'text-rose-700'
                            : 'text-[#546a39]'
                      )}
                    >
                      {formatSignedPriceValue(absoluteChange, activeCurrency)} (
                      {formatPercentValue(percentChange)})
                    </p>
                  </div>
                  <p className="mt-2 text-xs text-[#6e7f5a] sm:text-sm">
                    Last update: {formatPointDate(latestPoint?.date)} |
                    Currency: {activeCurrency.code}
                  </p>
                </div>

                {aiForecast ? (
                  <div className="mt-4 rounded-lg border border-[#cce4a8] bg-[#f5f8ef] px-3 py-3 sm:px-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-semibold text-sm text-[#1f3800] sm:text-base">
                        AI forecast ({aiForecast.horizonPeriods} periods):{' '}
                        {formatPriceValue(
                          aiForecast.projectedPrice,
                          activeCurrency
                        )}{' '}
                        {activeCurrency.code} (
                        {formatPercentValue(aiForecast.projectedReturnPct)})
                      </p>
                      <span className="rounded-md border border-[#b8d98e] bg-[#edf8dd] px-2 py-0.5 text-[11px] text-[#3d670d]">
                        {aiForecast.regime}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-[#6e7f5a]">
                      Model: {aiForecast.modelName} | Interval:{' '}
                      {formatPriceValue(aiForecast.intervalLow, activeCurrency)}{' '}
                      -{' '}
                      {formatPriceValue(
                        aiForecast.intervalHigh,
                        activeCurrency
                      )}{' '}
                      {activeCurrency.code}
                    </p>
                    <ConfidenceMeter confidence={aiForecast.confidence} />
                  </div>
                ) : null}

                <div className="mt-5 flex flex-wrap gap-2 border-[#d3e9b4] border-y py-3">
                  {timeframeOrder.map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setTimeframe(key)}
                      className={cn(
                        'rounded-md border px-2.5 py-1 font-semibold text-xs tracking-wide transition-colors',
                        timeframe === key
                          ? 'border-[#9dcb4a] bg-[#e7f7cd] text-[#3d670d]'
                          : 'border-[#d3e9b4] bg-[#f5f8ef] text-[#6e7f5a] hover:border-[#b8d98e] hover:text-[#365608]'
                      )}
                    >
                      {key}
                    </button>
                  ))}
                </div>

                <div className="mt-4 rounded-lg border border-[#d3e9b4] bg-[#f5f8ef] p-3 sm:p-4">
                  <ChartContainer
                    config={marketTrendChartConfig}
                    className="h-[360px] w-full"
                  >
                    <ComposedChart
                      data={selectedSeries}
                      margin={{ top: 14, right: 8, left: 0, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="market-historical-fill"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="var(--color-historicalPrice)"
                            stopOpacity={0.34}
                          />
                          <stop
                            offset="100%"
                            stopColor="var(--color-historicalPrice)"
                            stopOpacity={0.08}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid vertical={false} strokeDasharray="3 3" />
                      <XAxis
                        dataKey="label"
                        tickLine={false}
                        axisLine={false}
                        minTickGap={20}
                      />
                      <YAxis
                        yAxisId="price"
                        orientation="right"
                        tickLine={false}
                        axisLine={false}
                        width={84}
                        tickFormatter={(value) =>
                          formatPriceValue(Number(value), activeCurrency)
                        }
                      />
                      <YAxis yAxisId="volume" hide />
                      <ChartTooltip
                        cursor={{
                          stroke: 'rgba(214, 214, 214, 0.34)',
                          strokeDasharray: '5 5',
                        }}
                        content={
                          <MarketTrendTooltip activeCurrency={activeCurrency} />
                        }
                      />
                      <Bar
                        yAxisId="volume"
                        dataKey="activityVolume"
                        fill="var(--color-volume)"
                        opacity={0.38}
                        barSize={10}
                        radius={[3, 3, 0, 0]}
                      />
                      <Area
                        yAxisId="price"
                        type="monotone"
                        dataKey="historicalPrice"
                        stroke="var(--color-historicalPrice)"
                        fill="url(#market-historical-fill)"
                        strokeWidth={2.2}
                        dot={false}
                        activeDot={{ r: 3 }}
                      />
                      <Line
                        yAxisId="price"
                        type="monotone"
                        dataKey="forecastUpper"
                        stroke="var(--color-forecastUpper)"
                        strokeWidth={1.2}
                        strokeOpacity={0.55}
                        strokeDasharray="3 4"
                        dot={false}
                        connectNulls
                      />
                      <Line
                        yAxisId="price"
                        type="monotone"
                        dataKey="forecastLower"
                        stroke="var(--color-forecastLower)"
                        strokeWidth={1.2}
                        strokeOpacity={0.55}
                        strokeDasharray="3 4"
                        dot={false}
                        connectNulls
                      />
                      <Line
                        yAxisId="price"
                        type="monotone"
                        dataKey="forecastPrice"
                        stroke="var(--color-forecastPrice)"
                        strokeWidth={2.1}
                        strokeDasharray="7 4"
                        dot={false}
                        connectNulls
                      />
                      {latestPoint ? (
                        <ReferenceLine
                          yAxisId="price"
                          y={latestPoint.price}
                          stroke="rgba(214, 214, 214, 0.45)"
                          strokeDasharray="5 5"
                          ifOverflow="extendDomain"
                        />
                      ) : null}
                    </ComposedChart>
                  </ChartContainer>
                </div>

                <div className="mt-4 overflow-hidden rounded-lg border border-[#d3e9b4] bg-[#f5f8ef]">
                  <div className="grid divide-[#d3e9b4] md:grid-cols-3 md:divide-x">
                    {statsColumns.map((column, index) => (
                      <div
                        key={`${column[0]?.label}-${index}`}
                        className="p-4 sm:p-5"
                      >
                        <div className="space-y-3">
                          {column.map((metric) => (
                            <div
                              key={metric.label}
                              className="flex items-center justify-between gap-4 border-[#d3e9b4] border-b pb-2 last:border-none last:pb-0"
                            >
                              <p className="font-medium text-sm text-[#6e7f5a]">
                                {metric.label}
                              </p>
                              <p
                                className={cn(
                                  'text-right font-semibold text-sm tabular-nums sm:text-base',
                                  metric.valueClassName ?? 'text-[#1f3800]'
                                )}
                              >
                                {metric.value}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="mt-6 gap-0 rounded-xl border-[#d0e6af] bg-white py-0 text-[#1f3800] shadow-sm">
              <CardContent className="px-5 py-8 text-center text-[#6e7f5a]">
                No timeline data available for current commodity.
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  );
}

function sliceByTimeframe(
  points: MarketTrendPoint[],
  timeframe: TimeframeKey
): MarketTrendPoint[] {
  if (points.length === 0) {
    return [];
  }

  const observed = points.filter((point) => !point.isForecast);
  const forecast = points.filter((point) => point.isForecast);

  if (observed.length === 0) {
    return points;
  }

  const withForecast = (window: MarketTrendPoint[]) => [...window, ...forecast];

  if (timeframe === '1Y') {
    return withForecast(observed);
  }

  if (timeframe === 'YTD') {
    const currentYear = new Date().getFullYear();
    const ytdSeries = observed.filter((point) => {
      const year = new Date(point.date).getFullYear();
      return year === currentYear;
    });

    if (ytdSeries.length >= 2) {
      return withForecast(ytdSeries);
    }

    return withForecast(observed.slice(-Math.min(6, observed.length)));
  }

  const count = timeframePointCount[timeframe];
  return withForecast(observed.slice(-Math.min(count, observed.length)));
}

function getPriceRange(points: MarketTrendPoint[]) {
  if (points.length === 0) {
    return { min: 0, max: 0 };
  }

  let min = Number.POSITIVE_INFINITY;
  let max = Number.NEGATIVE_INFINITY;

  for (const point of points) {
    min = Math.min(min, point.price);
    max = Math.max(max, point.price);
  }

  return { min, max };
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function averageActivity(points: MarketTrendPoint[]) {
  if (points.length === 0) {
    return 0;
  }

  const total = points.reduce((sum, point) => sum + point.activityVolume, 0);
  return Math.round(total / points.length);
}

function formatPriceValue(value: number, currency: CurrencyOption) {
  const fractionDigits = currency.maxFractionDigits === 0 ? 0 : 2;
  return value.toLocaleString(currency.locale, {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
}

function formatSignedPriceValue(value: number, currency: CurrencyOption) {
  const sign = value > 0 ? '+' : value < 0 ? '-' : '';
  return `${sign}${formatPriceValue(Math.abs(value), currency)}`;
}

function formatPercentValue(value: number) {
  const sign = value > 0 ? '+' : '';
  return `${sign}${value.toFixed(2)}%`;
}

function formatVolumeValue(value: number) {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
  }).format(value);
}

function formatPointDate(dateValue?: string) {
  if (!dateValue) {
    return '--';
  }

  return new Date(dateValue).toLocaleString('en-US', {
    month: 'short',
    year: 'numeric',
  });
}

function toCommodityCode(name: string) {
  const tokens = name.trim().split(/\s+/).filter(Boolean);

  if (tokens.length === 0) {
    return 'N/A';
  }

  if (tokens[0].length <= 5) {
    return tokens[0].toUpperCase();
  }

  return tokens
    .slice(0, 4)
    .map((token) => token[0])
    .join('')
    .toUpperCase();
}

function ConfidenceMeter({ confidence }: { confidence: number }) {
  return (
    <div className="mt-2">
      <div className="flex items-center justify-between text-[11px] text-[#6e7f5a]">
        <span>AI confidence</span>
        <span>{confidence}%</span>
      </div>
      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-[#dbeec0]">
        <div
          className="h-full rounded-full bg-[#73bd12] transition-[width]"
          style={{ width: `${clamp(confidence, 0, 100)}%` }}
        />
      </div>
    </div>
  );
}

function MarketTrendTooltip({
  active,
  payload,
  activeCurrency,
}: {
  active?: boolean;
  payload?: Array<{ payload: MarketTrendPoint }>;
  activeCurrency: CurrencyOption;
}) {
  if (!active || !payload?.length) {
    return null;
  }

  const point = payload[0]?.payload;
  if (!point) {
    return null;
  }

  return (
    <div className="min-w-[12rem] rounded-lg border border-[#d3e9b4] bg-white px-3 py-2 text-xs shadow-xl">
      <p className="text-[#6e7f5a]">{formatPointDate(point.date)}</p>
      <div className="mt-1 flex items-center justify-between gap-3">
        <span className="text-[#6e7f5a]">Price</span>
        <span className="font-semibold text-[#3d670d] tabular-nums">
          {formatPriceValue(point.price, activeCurrency)} {activeCurrency.code}
        </span>
      </div>
      <div className="mt-1 flex items-center justify-between gap-3">
        <span className="text-[#6e7f5a]">Activity volume</span>
        <span className="font-semibold tabular-nums">
          {formatVolumeValue(point.activityVolume)}
        </span>
      </div>
      {point.isForecast ? (
        <>
          <div className="mt-1 flex items-center justify-between gap-3">
            <span className="text-[#6e7f5a]">Forecast range</span>
            <span className="font-semibold text-[#3d670d] tabular-nums">
              {point.forecastLower !== null && point.forecastUpper !== null
                ? `${formatPriceValue(point.forecastLower, activeCurrency)} - ${formatPriceValue(point.forecastUpper, activeCurrency)} ${activeCurrency.code}`
                : '--'}
            </span>
          </div>
          <p className="mt-1 text-[11px] text-[#4e820f]/90">
            AI forecast period
          </p>
        </>
      ) : null}
    </div>
  );
}
