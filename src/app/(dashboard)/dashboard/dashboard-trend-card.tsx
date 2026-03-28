'use client';

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
import { aseanCurrencies } from '@/app/(marketing)/market/data';
import type {
  AiForecastSummary,
  CommodityOption,
  CurrencyCode,
  CurrencyOption,
  ListingCard,
  MarketTrendPoint,
} from '@/app/(marketing)/market/types';
import {
  averageActivity,
  formatPercentValue,
  formatPointDate,
  formatPriceValue,
  formatSignedPriceValue,
  formatVolumeValue,
  getPriceRange,
  sliceByTimeframe,
  type TimeframeKey,
  timeframeOrder,
  toCommodityCode,
} from '@/app/(marketing)/market/utils';
import { Card, CardContent } from '@/components/ui/card';
import { ChartContainer, ChartTooltip } from '@/components/ui/chart';
import {
  NativeSelect,
  NativeSelectOption,
} from '@/components/ui/native-select';
import { cn } from '@/lib/utils';
import { clamp } from '@/utils/percentage-helper';

type DashboardTrendCardProps = {
  activeListing: ListingCard | null;
  activeCurrency: CurrencyOption;
  commodityOptions: CommodityOption[];
  selectedCommodity: string;
  selectedCurrency: CurrencyCode;
  trendTimelineData: MarketTrendPoint[];
  aiForecast: AiForecastSummary | null;
  onCommodityChange: (value: string) => void;
  onCurrencyChange: (value: CurrencyCode) => void;
};

type MetricItem = {
  label: string;
  value: string;
  valueClassName?: string;
};

const dashboardTrendChartConfig = {
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

export default function DashboardTrendCard({
  activeListing,
  activeCurrency,
  commodityOptions,
  selectedCommodity,
  selectedCurrency,
  trendTimelineData,
  aiForecast,
  onCommodityChange,
  onCurrencyChange,
}: DashboardTrendCardProps) {
  const [timeframe, setTimeframe] = useState<TimeframeKey>('1M');

  const selectedSeries = useMemo(
    () => sliceByTimeframe(trendTimelineData, timeframe),
    [timeframe, trendTimelineData]
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
        value: formatPercentValue(oneYearChange),
        valueClassName: oneYearChange >= 0 ? 'text-lime-700' : 'text-rose-700',
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
        valueClassName: aiForecast ? 'text-lime-700' : undefined,
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
            ? `${formatPriceValue(selectedRange.min, activeCurrency)} - ${formatPriceValue(selectedRange.max, activeCurrency)}`
            : '--',
      },
      {
        label: '52-week range',
        value:
          trendTimelineData.length > 0
            ? `${formatPriceValue(oneYearRange.min, activeCurrency)} - ${formatPriceValue(oneYearRange.max, activeCurrency)}`
            : '--',
      },
      {
        label: 'RSI (6)',
        value: aiForecast ? aiForecast.rsi.toFixed(1) : '--',
        valueClassName:
          aiForecast && aiForecast.rsi >= 70
            ? 'text-rose-700'
            : aiForecast && aiForecast.rsi <= 30
              ? 'text-lime-700'
              : undefined,
      },
      {
        label: 'EMA spread (5-10)',
        value: aiForecast
          ? `${formatSignedPriceValue(emaSpread, activeCurrency)} ${activeCurrency.code}`
          : '--',
        valueClassName: aiForecast
          ? emaSpread >= 0
            ? 'text-lime-700'
            : 'text-rose-700'
          : undefined,
      },
    ],
  ];

  return (
    <Card className="gap-0 overflow-hidden">
      <CardContent className="px-4">
        <div className="flex flex-wrap gap-2">
          <NativeSelect
            value={selectedCommodity}
            onChange={(event) => onCommodityChange(event.target.value)}
            className="h-10 min-w-56 rounded-md text-xs"
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
            className="h-10 min-w-28 rounded-md text-xs"
          >
            {aseanCurrencies.map((currency) => (
              <NativeSelectOption key={currency.code} value={currency.code}>
                {currency.code}
              </NativeSelectOption>
            ))}
          </NativeSelect>
        </div>

        {activeListing && selectedSeries.length > 0 ? (
          <>
            <div className="mt-5">
              <p className="font-medium text-[11px] text-muted-foreground uppercase tracking-[0.16em]">
                {activeListing.name} ({toCommodityCode(activeListing.name)})
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
                      ? 'text-primary'
                      : absoluteChange < 0
                        ? 'text-rose-700'
                        : 'text-muted-foreground'
                  )}
                >
                  {formatSignedPriceValue(absoluteChange, activeCurrency)} (
                  {formatPercentValue(percentChange)})
                </p>
              </div>
              <p className="mt-2 text-muted-foreground text-xs sm:text-sm">
                Last update: {formatPointDate(latestPoint?.date)} | Currency:{' '}
                {activeCurrency.code}
              </p>
            </div>

            {aiForecast ? (
              <div className="mt-4 rounded-lg border bg-muted/30 px-3 py-3 sm:px-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold text-sm sm:text-base">
                    AI forecast ({aiForecast.horizonPeriods} periods):{' '}
                    {formatPriceValue(
                      aiForecast.projectedPrice,
                      activeCurrency
                    )}{' '}
                    {activeCurrency.code} (
                    {formatPercentValue(aiForecast.projectedReturnPct)})
                  </p>
                  <span className="rounded-md border bg-background px-2 py-0.5 text-[11px]">
                    {aiForecast.regime}
                  </span>
                </div>
                <p className="mt-1 text-muted-foreground text-xs">
                  Model: {aiForecast.modelName} | Interval:{' '}
                  {formatPriceValue(aiForecast.intervalLow, activeCurrency)} -{' '}
                  {formatPriceValue(aiForecast.intervalHigh, activeCurrency)}{' '}
                  {activeCurrency.code}
                </p>
                <ConfidenceMeter confidence={aiForecast.confidence} />
              </div>
            ) : null}

            <div className="mt-5 flex flex-wrap gap-2 border-y py-3">
              {timeframeOrder.map((key) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setTimeframe(key)}
                  className={cn(
                    'rounded-md border px-2.5 py-1 font-semibold text-xs tracking-wide transition-colors',
                    timeframe === key
                      ? 'border-primary bg-primary/10 text-primary'
                      : 'bg-background text-muted-foreground hover:border-primary/30 hover:text-primary'
                  )}
                >
                  {key}
                </button>
              ))}
            </div>

            <div className="mt-4 rounded-lg border bg-muted/30 p-3 sm:p-4">
              <ChartContainer
                config={dashboardTrendChartConfig}
                className="h-90 w-full"
              >
                <ComposedChart
                  data={selectedSeries}
                  margin={{ top: 14, right: 8, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="dashboard-historical-fill"
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
                      <DashboardTrendTooltip activeCurrency={activeCurrency} />
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
                    fill="url(#dashboard-historical-fill)"
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

            <div className="mt-4 overflow-hidden rounded-lg border bg-muted/30">
              <div className="grid md:grid-cols-3 md:divide-x">
                {statsColumns.map((column, index) => (
                  <div
                    key={`${column[0]?.label}-${index}`}
                    className="p-4 sm:p-5"
                  >
                    <div className="space-y-3">
                      {column.map((metric) => (
                        <div
                          key={metric.label}
                          className="flex items-center justify-between gap-4 border-b pb-2 last:border-none last:pb-0"
                        >
                          <p className="font-medium text-muted-foreground text-sm">
                            {metric.label}
                          </p>
                          <p
                            className={cn(
                              'text-right font-semibold text-sm tabular-nums sm:text-base',
                              metric.valueClassName ?? 'text-foreground'
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
          </>
        ) : (
          <Card className="mt-5 gap-0 py-0 shadow-sm">
            <CardContent className="px-5 py-8 text-center text-muted-foreground">
              No timeline data available for current commodity.
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}

function ConfidenceMeter({ confidence }: { confidence: number }) {
  return (
    <div className="mt-2">
      <div className="flex items-center justify-between text-[11px] text-muted-foreground">
        <span>AI confidence</span>
        <span>{confidence}%</span>
      </div>
      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-lime-100">
        <div
          className="h-full rounded-full bg-primary transition-[width]"
          style={{ width: `${clamp(confidence, 0, 100)}%` }}
        />
      </div>
    </div>
  );
}

function DashboardTrendTooltip({
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
    <div className="min-w-48 rounded-lg border bg-card px-3 py-2 text-xs shadow-xl">
      <p className="text-muted-foreground">{formatPointDate(point.date)}</p>
      <div className="mt-1 flex items-center justify-between gap-3">
        <span className="text-muted-foreground">Price</span>
        <span className="font-semibold text-primary tabular-nums">
          {formatPriceValue(point.price, activeCurrency)} {activeCurrency.code}
        </span>
      </div>
      <div className="mt-1 flex items-center justify-between gap-3">
        <span className="text-muted-foreground">Activity volume</span>
        <span className="font-semibold tabular-nums">
          {formatVolumeValue(point.activityVolume)}
        </span>
      </div>
      {point.isForecast ? (
        <>
          <div className="mt-1 flex items-center justify-between gap-3">
            <span className="text-muted-foreground">Forecast range</span>
            <span className="font-semibold text-primary tabular-nums">
              {point.forecastLower !== null && point.forecastUpper !== null
                ? `${formatPriceValue(point.forecastLower, activeCurrency)} - ${formatPriceValue(point.forecastUpper, activeCurrency)} ${activeCurrency.code}`
                : '--'}
            </span>
          </div>
          <p className="mt-1 text-[11px] text-primary/90">AI forecast period</p>
        </>
      ) : null}
    </div>
  );
}
